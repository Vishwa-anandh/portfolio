import { Suspense, lazy } from "react";

// three.js + @react-three/* is by far the heaviest dependency in the app and
// this backdrop is purely decorative, so it loads as its own chunk after the
// page content rather than blocking the initial bundle.
const Background3DScene = lazy(() => import("./Background3DScene"));

export function Background3D() {
  // Skip the WebGL canvas during build-time prerendering (headless Chrome).
  // It's purely decorative, and rendering it offscreen only slows the
  // snapshot and adds no content for crawlers. Real users always get it.
  if (typeof window !== "undefined" && (window as unknown as { __PRERENDER__?: boolean }).__PRERENDER__) {
    return null;
  }

  // No fallback: every page already paints a black backdrop behind this, so
  // the backdrop simply fades in once its chunk arrives.
  return (
    <Suspense fallback={null}>
      <Background3DScene />
    </Suspense>
  );
}
