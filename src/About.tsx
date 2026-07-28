import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Seo } from "./components/Seo";
import { Background3D } from "./components/Background3D";
import { Button } from "./components/ui/button";
import { PageBar } from "./components/ui/site-controls";
import { breadcrumbNode, faqNode, graph, personNode, webPageNode } from "./lib/seo";

const FAQS = [
  {
    q: "Who is Vishwa Anandh?",
    a: "Vishwa Anandh is a Product Designer based in Madurai, India, specializing in AI-native systems and complex enterprise workflows. He translates technical complexity into intuitive, scalable digital experiences and has over 5 years of experience shaping digital products.",
  },
  {
    q: "What does Vishwa Anandh specialize in?",
    a: "He specializes in UI/UX and product design for AI-native systems, enterprise dashboards, design systems, and data visualization. His work spans monitoring platforms, multi-agent orchestration tools, and industrial IoT dashboards.",
  },
  {
    q: "What is Vishwa Anandh's design philosophy?",
    a: "His philosophy centers on architectural clarity, evidence-based decisions, and a polished visual language. He believes strong interfaces make complex systems understandable without hiding the operational detail users need.",
  },
  {
    q: "Can Vishwa Anandh build products, not just design them?",
    a: "Yes. On PulseCX, an AI-native monitoring and incident response platform, he architected the UX and independently built and deployed the live web application using AI-assisted development, including training the platform's LLM chatbot.",
  },
  {
    q: "How can I contact Vishwa Anandh?",
    a: "You can reach Vishwa Anandh by email at Anandhvishwa12@gmail.com or by phone at +91 9150281870. He is based in Madurai, India and available for product design engagements.",
  },
];

const stats = [
  ["5+", "years designing digital products"],
  ["7", "enterprise products shipped"],
  ["650+", "users across 5 organisations"],
  ["10+", "research and usability sessions"],
];

const principles = [
  {
    number: "01",
    title: "Make complexity legible",
    description: "I begin with the system: roles, decisions, dependencies, and failure states. Visual polish comes after the product has a clear information hierarchy.",
  },
  {
    number: "02",
    title: "Use evidence, not theatre",
    description: "Research, prototype evaluation, and product signals help separate a convincing concept from a workflow people can understand and trust.",
  },
  {
    number: "03",
    title: "Design through delivery",
    description: "I stay close to implementation, working with engineers and product managers to turn ambiguous requirements into buildable, reusable systems.",
  },
];

const experience = [
  {
    role: "UI/UX Designer",
    organisation: "Maitsys",
    period: "July 2024 - Present",
    accent: "cyan",
    description:
      "Sole designer across seven enterprise products, owning research, information architecture, interaction design, design systems, and developer handoff for web and mobile platforms.",
    tags: ["Enterprise UX", "Design Systems", "User Research", "650+ Users"],
  },
  {
    role: "Product Designer & Developer",
    organisation: "Independent Products",
    period: "2025 - Present",
    accent: "indigo",
    description:
      "Designed, built, and deployed PulseCX, an AI-native monitoring platform that connects infrastructure health with customer journeys and provides LLM-assisted diagnostic guidance.",
    tags: ["PulseCX", "AI Product Design", "Product Architecture", "Live Deployment"],
  },
  {
    role: "Brand & Digital Designer",
    organisation: "Self-Employed",
    period: "2019 - Present",
    accent: "neutral",
    description:
      "Partnered directly with founders across manufacturing, food and beverage, technology, and e-commerce to deliver brand systems, websites, and product interfaces from discovery to launch.",
    tags: ["Brand Identity", "Web Design", "Mobile UI", "Founder Collaboration"],
  },
];

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-transparent pb-24 font-sans text-white">
      <Seo
        title="About Vishwa Anandh - AI-Native Product & UI/UX Designer"
        description="Meet Vishwa Anandh, a Product Designer with 5+ years of experience designing AI-native systems, enterprise workflows, and scalable design systems."
        path="/about"
        keywords="About Vishwa Anandh, UI/UX Designer, Product Designer, Enterprise UX, AI-Native Design, Madurai"
        jsonLd={graph(
          personNode(),
          webPageNode({
            path: "/about",
            name: "About Vishwa Anandh",
            description: "About Vishwa Anandh, a Product Designer specializing in AI-native systems and enterprise UX.",
            type: "AboutPage",
          }),
          faqNode(FAQS),
          breadcrumbNode([
            ["Home", "/"],
            ["About", "/about"],
          ]),
        )}
      />

      <div className="fixed inset-0 z-[-2] bg-black" />
      <Background3D />

      <div className="relative z-10">
        <PageBar to="/" label="Back to Home">
          <Button asChild variant="outline">
            <Link to="/resume">View Resume</Link>
          </Button>
        </PageBar>

        <main className="w-full px-4 pt-8 sm:px-6 md:pt-12 lg:px-10 xl:px-12">
          <header className="apple-card relative grid min-h-[560px] overflow-hidden rounded-[2.5rem] p-6 md:p-10 lg:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)] lg:items-end lg:gap-16 xl:p-14">
            <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl" />

            <div className="relative self-center">
              <div className="mb-8 flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_14px_rgba(34,211,238,0.8)]" />
                <span className="font-mono text-xs uppercase tracking-[0.22em] text-white/45">Product Designer / Madurai, India</span>
              </div>
              <h1 className="max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.055em] text-white md:text-7xl lg:text-8xl xl:text-[6.5rem]">
                I design the systems behind
                <span className="block bg-gradient-to-r from-cyan-300 via-indigo-300 to-white/70 bg-clip-text text-transparent">
                  complex work.
                </span>
              </h1>
              <p className="mt-8 max-w-3xl text-base font-light leading-[1.8] text-white/60 md:text-xl">
                I turn dense enterprise workflows and emerging AI capabilities into products that feel clear, credible, and ready to scale.
              </p>
            </div>

            <div className="relative mt-12 rounded-[2rem] border border-white/10 bg-black/25 p-6 backdrop-blur-sm lg:mt-0">
              <p className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-cyan-300">Currently</p>
              <p className="text-xl leading-relaxed text-white/80">
                Designing multi-role enterprise platforms at Maitsys and building independent AI products from architecture through deployment.
              </p>
              <div className="mt-8 border-t border-white/10 pt-6">
                <a href="mailto:Anandhvishwa12@gmail.com" className="apple-control inline-flex items-center gap-3 px-3 -ml-3 text-sm text-white/55 transition-colors hover:bg-white/[0.06] hover:text-[#64D2FF]">
                  Available for thoughtful product work <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </header>

          <section aria-label="Career highlights" className="mt-6 grid grid-cols-2 overflow-hidden rounded-2xl border border-white/10 bg-black/25 md:grid-cols-4">
            {stats.map(([value, label], index) => (
              <div
                key={value}
                className={`p-5 md:p-7 ${index % 2 === 1 ? "border-l border-white/10" : ""} ${index > 0 ? "md:border-l md:border-white/10" : ""} ${index > 1 ? "border-t border-white/10 md:border-t-0" : ""}`}
              >
                <div className="mb-2 text-3xl font-semibold tracking-tight text-cyan-400 md:text-4xl">{value}</div>
                <p className="max-w-[14rem] text-xs leading-relaxed text-white/45 md:text-sm">{label}</p>
              </div>
            ))}
          </section>

          <section className="grid gap-10 border-b border-white/10 py-20 lg:grid-cols-[minmax(280px,0.7fr)_minmax(0,1.3fr)] lg:gap-20">
            <div>
              <p className="mb-5 font-mono text-xs uppercase tracking-[0.22em] text-indigo-300">About my practice</p>
              <h2 className="max-w-xl text-4xl font-medium leading-tight tracking-[-0.035em] text-white md:text-5xl">
                Product thinking grounded in real operational detail.
              </h2>
            </div>
            <div className="grid gap-8 text-lg font-light leading-[1.85] text-white/60 md:grid-cols-2">
              <p>
                My work sits at the intersection of <strong className="font-medium text-white">enterprise UX, design systems, and AI-native products</strong>. I map roles, information, permissions, and edge cases before shaping the interface that holds them together.
              </p>
              <p>
                Across seven shipped enterprise products, I have worked from research and early architecture through high-fidelity design and developer handoff. On PulseCX, I extended that responsibility into <strong className="font-medium text-white">building and deploying the live product</strong>.
              </p>
            </div>
          </section>

          <section className="py-20">
            <div className="mb-10 flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-cyan-300">How I work</p>
                <h2 className="text-4xl font-medium tracking-[-0.035em] text-white md:text-5xl">Three principles behind the work</h2>
              </div>
              <p className="max-w-lg text-sm leading-relaxed text-white/40 md:text-right">
                A practical approach for making complex products understandable without stripping away the detail experts need.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {principles.map((principle) => (
                <article key={principle.number} className="apple-card group min-h-[300px] rounded-[2rem] p-7 transition-colors hover:border-[#0A84FF]/35 md:p-8">
                  <div className="mb-16 font-mono text-sm text-cyan-400">{principle.number}</div>
                  <h3 className="mb-4 text-2xl font-medium tracking-tight text-white">{principle.title}</h3>
                  <p className="leading-relaxed text-white/50">{principle.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="border-t border-white/10 py-20">
            <div className="mb-10">
              <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-indigo-300">Experience</p>
              <h2 className="text-4xl font-medium tracking-[-0.035em] text-white md:text-5xl">Where I have applied the approach</h2>
            </div>

            <div className="grid gap-5 lg:grid-cols-2">
              {experience.map((item, index) => (
                <article
                  key={item.organisation}
                  className={`relative overflow-hidden rounded-[2rem] border p-7 md:p-8 ${index === 0 ? "border-cyan-500/20 bg-gradient-to-br from-cyan-950/25 to-white/[0.025] lg:col-span-2" : "border-white/10 bg-white/[0.025]"}`}
                >
                  <div className="flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-start">
                    <div>
                      <h3 className="text-2xl font-medium text-white">{item.role}</h3>
                      <p className={`mt-2 font-mono text-sm uppercase tracking-wider ${item.accent === "cyan" ? "text-cyan-400" : item.accent === "indigo" ? "text-indigo-300" : "text-white/45"}`}>
                        {item.organisation}
                      </p>
                    </div>
                    <span className="font-mono text-xs text-white/35">{item.period}</span>
                  </div>
                  <p className={`mt-7 max-w-4xl leading-[1.75] text-white/60 ${index === 0 ? "text-lg" : ""}`}>{item.description}</p>
                  <div className="mt-8 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-xs text-white/55">
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section aria-label="Frequently Asked Questions" className="sr-only">
            <h2>Frequently Asked Questions</h2>
            {FAQS.map((faq) => (
              <div key={faq.q}>
                <h3>{faq.q}</h3>
                <p>{faq.a}</p>
              </div>
            ))}
          </section>

          <section className="mb-8 flex flex-col items-start justify-between gap-8 rounded-[2.5rem] border border-white/10 bg-gradient-to-r from-indigo-950/30 via-white/[0.035] to-cyan-950/20 p-7 md:flex-row md:items-center md:p-10">
            <div>
              <p className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-cyan-300">Continue exploring</p>
              <h2 className="text-3xl font-medium tracking-tight text-white md:text-4xl">See the decisions behind the finished interfaces.</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/projects">View Projects</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/resume">View Resume</Link>
              </Button>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
