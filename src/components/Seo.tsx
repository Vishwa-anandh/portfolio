import { Helmet } from "react-helmet-async";
import { canonical, SITE } from "../lib/seo";

interface SeoProps {
  /** Full <title> text. */
  title: string;
  /** Meta description (aim for 140–160 chars). */
  description: string;
  /** Route path for canonical + og:url, e.g. "/about". */
  path: string;
  /** Absolute or root-relative image for social cards. */
  image?: string;
  /** og:type — "website", "profile", "article". */
  type?: string;
  /** Optional comma-separated keywords. */
  keywords?: string;
  /** One or more JSON-LD graph objects to inject. */
  jsonLd?: object | object[];
}

/**
 * Centralized per-page SEO: title, description, canonical, Open Graph,
 * Twitter card, and structured data (JSON-LD). Used on every route so
 * search engines and AI answer engines get page-specific signals.
 */
export function Seo({
  title,
  description,
  path,
  image,
  type = "website",
  keywords,
  jsonLd,
}: SeoProps) {
  const url = canonical(path);
  const img = image
    ? image.startsWith("http")
      ? image
      : `${SITE.url}${image}`
    : SITE.defaultImage;
  const blocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet prioritizeSeoTags>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords ? <meta name="keywords" content={keywords} /> : null}
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE.name} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={img} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={img} />

      {blocks.map((block, i) => (
        <script type="application/ld+json" key={i}>
          {JSON.stringify(block)}
        </script>
      ))}
    </Helmet>
  );
}
