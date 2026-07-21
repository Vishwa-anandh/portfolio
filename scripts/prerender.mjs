// =============================================================================
// Build-time prerendering (SSG snapshot).
//
// Runs AFTER `vite build`. Serves the built SPA from ./dist, drives a headless
// browser to each route, waits for React to render, and writes the fully
// rendered HTML into dist/<route>/index.html. Crawlers and AI engines that do
// not execute JavaScript then receive real, readable page content — while the
// client app still boots and takes over for real users (no behavior change).
// =============================================================================

import { createServer } from "node:http";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join, extname, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import puppeteer from "puppeteer";

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, "..", "dist");
const PORT = 4180;

// Routes to prerender (must match src/App.tsx and public/sitemap.xml).
const ROUTES = [
  "/",
  "/about",
  "/projects",
  "/resume",
  "/projects/9",
  "/projects/0",
  "/projects/2",
  "/projects/6",
  "/projects/8",
];

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".xml": "application/xml; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

// Minimal static file server with SPA fallback to index.html.
// `shell` is the PRISTINE built index.html, captured in memory before any
// prerendering overwrites dist/index.html — so every route is snapshotted
// from the same clean shell and never inherits another route's baked-in tags.
function startServer(shell) {
  const server = createServer(async (req, res) => {
    try {
      const urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
      let filePath = join(DIST, urlPath);
      if (urlPath.endsWith("/")) filePath = join(filePath, "index.html");

      // Serve real static assets (they have an extension) straight from disk.
      if (extname(filePath) && extname(filePath) !== ".html" && existsSync(filePath)) {
        const body = await readFile(filePath);
        res.writeHead(200, { "Content-Type": MIME[extname(filePath)] || "application/octet-stream" });
        res.end(body);
        return;
      }
      // Everything else (routes, and index.html itself) → the pristine shell.
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(shell);
    } catch (err) {
      res.writeHead(500);
      res.end(String(err));
    }
  });
  return new Promise((resolve) => server.listen(PORT, () => resolve(server)));
}

async function run() {
  // Capture the clean shell BEFORE the loop writes any snapshots over it.
  const shell = await readFile(join(DIST, "index.html"), "utf-8");
  const server = await startServer(shell);
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  let ok = 0;
  try {
    for (const route of ROUTES) {
      const page = await browser.newPage();
      await page.setViewport({ width: 1366, height: 900 });
      // Flag the app so decorative WebGL is skipped during snapshot.
      await page.evaluateOnNewDocument(() => {
        window.__PRERENDER__ = true;
      });
      // Skip the heavy hero image sequence — not needed for text content.
      await page.setRequestInterception(true);
      page.on("request", (r) => {
        const u = r.url();
        if (u.includes("/sequence/")) r.abort();
        else r.continue();
      });

      const url = `http://localhost:${PORT}${route}`;
      // domcontentloaded (not networkidle) — the hero frame loader keeps the
      // network busy, so we gate on rendered text below instead of idle.
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 45000 });
      // Wait until React has painted real text into #root.
      await page
        .waitForFunction(
          () => {
            const root = document.querySelector("#root");
            return !!root && root.innerText.trim().length > 200;
          },
          { timeout: 20000 },
        )
        .catch(() => console.warn(`  ! ${route}: text threshold not met, snapshotting anyway`));

      const html = "<!doctype html>\n" + (await page.evaluate(() => document.documentElement.outerHTML));

      // Flat files (about.html, projects/9.html) rather than directory
      // indexes (about/index.html) so Netlify serves them at /about with no
      // trailing-slash 301 — keeping the served URL identical to the canonical.
      const outPath =
        route === "/" ? join(DIST, "index.html") : join(DIST, `${route}.html`);
      await mkdir(dirname(outPath), { recursive: true });
      await writeFile(outPath, html, "utf-8");

      const chars = await page.evaluate(() => document.querySelector("#root")?.innerText.trim().length || 0);
      console.log(`  ✓ ${route.padEnd(14)} → ${outPath.replace(DIST, "dist")}  (${chars} chars)`);
      ok++;
      await page.close();
    }
  } finally {
    await browser.close();
    server.close();
  }
  console.log(`\nPrerendered ${ok}/${ROUTES.length} routes.`);
  if (ok < ROUTES.length) process.exit(1);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
