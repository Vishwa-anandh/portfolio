// =============================================================================
// Central SEO / GEO / AEO configuration and JSON-LD builders.
//
// Single source of truth for site identity, canonical URLs, and the structured
// data emitted per page. Edit `SITE` below to update everything.
//
// The `sameAs` links in SITE below are what Google's Knowledge Graph and AI
// answer engines (ChatGPT, Perplexity, Gemini) use to verify and cite the
// person. Keep them in sync with the static copy in index.html.
// =============================================================================

export const SITE = {
  url: "https://vishwaanandh.netlify.app",
  name: "Vishwa Anandh — Portfolio",
  person: {
    name: "Vishwa Anandh",
    givenName: "Vishwa",
    familyName: "Anandh",
    jobTitle: "Product Designer",
    email: "Anandhvishwa12@gmail.com",
    telephone: "+91-9150281870",
    locality: "Madurai",
    region: "Tamil Nadu",
    country: "IN",
    employer: "Maitsys",
    image: "https://vishwaanandh.netlify.app/Cover.png",
  },
  // Verified public profiles used for entity verification / AI citations.
  sameAs: [
    "https://www.linkedin.com/in/vishwaanandh/",
    "https://www.behance.net/vishwaanandh",
  ],
  defaultImage: "https://vishwaanandh.netlify.app/Cover.png",
} as const;

const PERSON_ID = `${SITE.url}/#person`;
const WEBSITE_ID = `${SITE.url}/#website`;

/** Absolute canonical URL for a given path ("/", "/about", ...). */
export function canonical(path: string): string {
  if (!path || path === "/") return `${SITE.url}/`;
  return `${SITE.url}${path.startsWith("/") ? path : `/${path}`}`;
}

/** The core Person node — referenced by @id from every page-level node. */
export function personNode() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: SITE.person.name,
    givenName: SITE.person.givenName,
    familyName: SITE.person.familyName,
    url: `${SITE.url}/`,
    email: `mailto:${SITE.person.email}`,
    telephone: SITE.person.telephone,
    jobTitle: SITE.person.jobTitle,
    image: SITE.person.image,
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.person.locality,
      addressRegion: SITE.person.region,
      addressCountry: SITE.person.country,
    },
    worksFor: { "@type": "Organization", name: SITE.person.employer },
    knowsAbout: [
      "UI/UX Design",
      "Product Design",
      "AI-Native Systems",
      "Design Systems",
      "Enterprise UX",
      "Data Visualization",
      "Figma",
      "Prototyping",
    ],
    sameAs: SITE.sameAs,
  };
}

/** BreadcrumbList builder — items are [name, path] pairs. */
export function breadcrumbNode(items: Array<[string, string]>) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map(([name, path], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item: canonical(path),
    })),
  };
}

/** FAQPage builder — for Answer Engine Optimization (AEO). */
export function faqNode(faqs: Array<{ q: string; a: string }>) {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
}

/** WebPage node linked to the site + person graph from index.html. */
export function webPageNode(opts: {
  path: string;
  name: string;
  description: string;
  type?: string;
}) {
  return {
    "@type": opts.type || "WebPage",
    "@id": `${canonical(opts.path)}#webpage`,
    url: canonical(opts.path),
    name: opts.name,
    description: opts.description,
    isPartOf: { "@id": WEBSITE_ID },
    // `mainEntity` is required for the ProfilePage rich result; harmless and
    // valid on every other WebPage type too.
    mainEntity: { "@id": PERSON_ID },
    about: { "@id": PERSON_ID },
    inLanguage: "en",
  };
}

/** CreativeWork node for a project/case study. */
export function creativeWorkNode(opts: {
  path: string;
  name: string;
  description: string;
  image?: string;
  keywords?: string[];
  dateCreated?: string;
}) {
  return {
    "@type": "CreativeWork",
    "@id": `${canonical(opts.path)}#work`,
    name: opts.name,
    headline: opts.name,
    description: opts.description,
    url: canonical(opts.path),
    image: opts.image ? `${SITE.url}${opts.image}` : SITE.defaultImage,
    ...(opts.keywords ? { keywords: opts.keywords.join(", ") } : {}),
    ...(opts.dateCreated ? { dateCreated: opts.dateCreated } : {}),
    creator: { "@id": PERSON_ID },
    author: { "@id": PERSON_ID },
    inLanguage: "en",
  };
}

/** Wrap one or more schema nodes into a single @graph document. */
export function graph(...nodes: object[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}
