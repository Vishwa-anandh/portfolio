import { Link } from "react-router-dom";
import { Seo } from "./components/Seo";
import { Background3D } from "./components/Background3D";
import { PageBar } from "./components/ui/site-controls";
import { breadcrumbNode, graph, personNode, webPageNode } from "./lib/seo";

const maitsysAchievements = [
  <>
    Sole designer across <strong>7 enterprise products</strong> (web and mobile), owning research through developer handoff for platforms serving <strong>650+ users across 5 client organisations</strong>.
  </>,
  <>
    Rebuilt Getherly&apos;s onboarding from <strong>30 clicks to 5 - an 83% reduction</strong>, removing the platform&apos;s largest setup drop-off point.
  </>,
  <>
    Built and maintain the Maitsys design system - <strong>30+ components across 6 products</strong> - so new screens ship from existing, tested parts.
  </>,
  <>
    Ran <strong>10+ usability tests and user interviews</strong>, feeding findings into flow and information architecture decisions before build.
  </>,
  <>
    Embedded with <strong>20 engineers and 4 PMs</strong>, turning ambiguous requirements into specced, buildable flows and presenting direction to the CEO.
  </>,
];

const selectedProducts = [
  {
    name: "Project.AI",
    type: "Timesheet, Projects & Payroll (Web & Mobile)",
    description: <>Role-based timesheets and automated payroll used by <strong>4 organisations and 500+ employees</strong>, replacing manual spreadsheet tracking.</>,
  },
  {
    name: "Pappa.ai",
    type: "School Management (Web & Mobile)",
    description: <>Unified attendance, fees, communication, and notifications for parents, teachers, and admins, live with <strong>100+ users</strong>.</>,
  },
  {
    name: "Getherly",
    type: "Family Social Network (Mobile redesign)",
    description: <>Multi-age accessibility and granular privacy controls designed to <strong>WCAG 2.2 AA</strong> standards.</>,
  },
  {
    name: "LobbyLink",
    type: "Visitor & Employee Management (Web)",
    description: <>Check-in flows, digital badging, and analytics for <strong>50+ users</strong>, replacing paper logs.</>,
  },
  {
    name: "Additional products",
    type: "Web & mobile",
    description: <>Also shipped NC STEM Academy for research tracking, Getherly Workspace for enterprise communication, and Recycle Contamination Log for sustainability analytics.</>,
  },
];

const highlights = [
  ["650+", "users across 5 client organisations"],
  ["83%", "fewer clicks in onboarding (30 to 5)"],
  ["30+", "design system components in 6 products"],
  ["7", "enterprise products shipped, web and mobile"],
];

const skills = [
  "Product & Interaction Design",
  "Design Systems",
  "Enterprise UX Architecture",
  "Information Architecture",
  "Prototyping & Wireframing",
  "User Research & Testing",
  "Accessibility (WCAG 2.2 AA)",
  "Data-Informed Design",
  "AI-Native Product Design",
  "LLM Chatbot UX & Training",
];

const tools = [
  "Figma",
  "Framer",
  "Adobe Illustrator",
  "Affinity Designer",
  "Google AI Studio",
  "Google Antigravity",
  "Claude",
  "VS Code",
  "GitHub",
];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <div className="h-px w-12 bg-indigo-500" />
      <h2 className="text-3xl font-medium tracking-tight text-white">{children}</h2>
    </div>
  );
}

function BulletList({ children }: { children: React.ReactNode[] }) {
  return (
    <ul className="space-y-3 text-[15px] leading-relaxed text-white/65">
      {children.map((item, index) => (
        <li key={index} className="flex gap-3">
          <span className="mt-[0.65rem] h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400" />
          <span className="[&_strong]:font-semibold [&_strong]:text-white">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function Resume() {
  return (
    <div className="relative min-h-screen bg-transparent pb-24 font-sans text-white">
      <Seo
        title="Resume - Vishwa Anandh, Product Designer"
        description="Resume of Vishwa Anandh, a Product Designer with 5+ years of experience across enterprise SaaS, AI-native systems, design systems, and user research."
        path="/resume"
        keywords="Resume, Product Designer, Enterprise UX, AI-Native Design, Design Systems, User Research, Vishwa Anandh"
        jsonLd={graph(
          personNode(),
          webPageNode({
            path: "/resume",
            name: "Resume - Vishwa Anandh",
            description: "Professional experience, impact, skills, tools, and education of Product Designer Vishwa Anandh.",
            type: "ProfilePage",
          }),
          breadcrumbNode([
            ["Home", "/"],
            ["Resume", "/resume"],
          ]),
        )}
      />

      <div className="fixed inset-0 z-[-2] bg-black" />
      <Background3D />

      <div className="relative z-10">
        <PageBar fallback="/" navClassName="print:hidden">
            <a
              href="/resume.pdf"
              download="Vishwa_Anandh_Resume.pdf"
              className="apple-control flex items-center gap-2 bg-[#0A84FF] px-5 text-sm font-semibold text-white transition-colors hover:bg-[#409CFF]"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download PDF
            </a>
        </PageBar>

        <main className="mt-8 w-full px-4 sm:px-6 md:mt-12 lg:px-10 xl:px-12">
          <header className="apple-card relative mb-8 grid overflow-hidden rounded-[2rem] p-6 md:p-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-16">
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 left-1/3 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl" />
            <div>
              <div className="mb-6 flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_14px_rgba(34,211,238,0.8)]" />
                <span className="font-mono text-xs uppercase tracking-[0.22em] text-white/45">Resume / 2026</span>
              </div>
              <h1 className="mb-3 bg-gradient-to-r from-white via-white to-white/55 bg-clip-text text-5xl font-bold tracking-[-0.055em] text-transparent md:text-7xl xl:text-8xl">
                VISHWA ANANDH
              </h1>
              <p className="mb-7 text-lg font-medium tracking-[0.2em] text-cyan-300 md:text-xl">PRODUCT DESIGNER</p>
              <p className="max-w-4xl text-base font-light leading-[1.8] text-white/65 md:text-lg">
                Product designer with 5+ years in enterprise SaaS and AI-native systems, owning multi-role workflow platforms end to end for <strong className="font-semibold text-white">650+ users across 5 organisations</strong>. I also independently designed, built, and deployed a live AI monitoring platform with an LLM chatbot I trained myself.
              </p>
            </div>

            <address className="relative mt-8 grid min-w-[260px] gap-1 rounded-2xl border border-white/10 bg-black/25 p-2 text-sm not-italic text-white/60 backdrop-blur-sm lg:mt-0">
              <a href="mailto:Anandhvishwa12@gmail.com" className="rounded-xl px-4 py-3 transition-colors hover:bg-white/5 hover:text-cyan-300">Anandhvishwa12@gmail.com</a>
              <a href="tel:+919150281870" className="rounded-xl px-4 py-3 transition-colors hover:bg-white/5 hover:text-cyan-300">+91 9150281870</a>
              <span className="rounded-xl px-4 py-3">Madurai, India</span>
              <Link to="/" className="rounded-xl px-4 py-3 transition-colors hover:bg-white/5 hover:text-cyan-300">vishwaanandh.netlify.app</Link>
            </address>
          </header>

          <section className="mb-14 grid grid-cols-2 overflow-hidden rounded-2xl border border-white/10 bg-black/20 md:grid-cols-4">
            {highlights.map(([value, label], index) => (
              <div key={value} className={`relative p-5 md:p-6 ${index % 2 === 1 ? "border-l border-white/10" : ""} ${index > 0 ? "md:border-l md:border-white/10" : ""} ${index > 1 ? "border-t border-white/10 md:border-t-0" : ""}`}>
                <div className="mb-2 text-3xl font-bold tracking-tight text-cyan-400 md:text-4xl">{value}</div>
                <p className="max-w-[18rem] text-xs leading-relaxed text-white/50 md:text-sm">{label}</p>
              </div>
            ))}
          </section>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.75fr)] xl:gap-12">
            <div className="min-w-0">
              <section>
                <div className="mb-9 flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end">
                  <SectionTitle>Work Experience</SectionTitle>
                  <p className="max-w-md text-sm leading-relaxed text-white/40 sm:text-right">Enterprise systems, independent AI products, and client work from research through delivery.</p>
                </div>

                <article className="relative mb-10 overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.055] to-white/[0.015] p-6 shadow-xl shadow-black/20 md:p-8">
                  <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-cyan-400 via-indigo-500 to-transparent" />
                  <div className="mb-7 flex flex-col justify-between gap-3 border-b border-white/10 pb-6 sm:flex-row sm:items-end">
                    <div>
                      <h3 className="text-2xl font-semibold text-white">UI/UX Designer</h3>
                      <p className="mt-1 font-mono text-lg text-cyan-400">Maitsys</p>
                    </div>
                    <span className="font-mono text-sm text-white/45">July 2024 - Present</span>
                  </div>

                  <BulletList>{maitsysAchievements}</BulletList>

                  <h4 className="mb-5 mt-9 font-mono text-xs uppercase tracking-[0.2em] text-white/40">Selected Products</h4>
                  <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
                    {selectedProducts.map((product) => (
                      <div key={product.name} className={`rounded-2xl border border-white/5 bg-black/20 p-5 transition-colors hover:border-white/10 hover:bg-white/[0.035] ${product.name === "Additional products" ? "xl:col-span-2" : ""}`}>
                        <h5 className="font-semibold text-white">
                          {product.name}
                          <span className="font-normal text-white/45"> - {product.type}</span>
                        </h5>
                        <p className="mt-2 text-sm leading-relaxed text-white/60 [&_strong]:font-semibold [&_strong]:text-white">{product.description}</p>
                      </div>
                    ))}
                  </div>
                </article>

                <article className="relative mb-10 overflow-hidden rounded-[2rem] border border-indigo-500/20 bg-gradient-to-br from-indigo-950/30 to-cyan-950/10 p-6 shadow-xl shadow-black/20 md:p-8">
                  <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl" />
                  <div className="mb-7 flex flex-col justify-between gap-3 border-b border-white/10 pb-6 sm:flex-row sm:items-end">
                    <div>
                      <h3 className="text-2xl font-semibold text-white">Product Designer & Developer</h3>
                      <p className="mt-1 font-mono text-lg text-cyan-400">Independent Products</p>
                    </div>
                    <span className="font-mono text-sm text-white/45">2025 - Present</span>
                  </div>

                  <div className="mb-8">
                    <div className="mb-4 flex flex-wrap items-center gap-3">
                      <Link to="/projects/9" className="text-xl font-semibold text-indigo-300 transition-colors hover:text-white hover:underline">
                        PulseCX
                      </Link>
                      <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-indigo-300">
                        Deployed June 2026
                      </span>
                    </div>
                    <BulletList>
                      {[
                        <>Designed and independently built and deployed an AI-native enterprise monitoring and incident-response platform linking API and infrastructure health to real customer-journey impact.</>,
                        <>Trained and integrated an LLM diagnostic chatbot that surfaces probable root cause in plain language, collapsing alert-to-hypothesis into one conversational step.</>,
                        <>Built the full production front end with AI-assisted development as a non-developer.</>,
                      ]}
                    </BulletList>
                  </div>

                  <div className="border-t border-white/10 pt-7">
                    <div className="mb-3 flex flex-wrap items-center gap-3">
                      <h4 className="text-xl font-semibold text-white">Enterprise HRMS</h4>
                      <span className="rounded-full border border-amber-500/20 bg-amber-500/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-amber-300">
                        In progress
                      </span>
                    </div>
                    <p className="text-[15px] leading-relaxed text-white/65">
                      Leading UX architecture for a platform scaling from <strong className="font-semibold text-white">500 to 50,000 employees</strong>, covering organisation modelling, role hierarchies, and approval automation.
                    </p>
                  </div>
                </article>

                <article className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.045] to-transparent p-6 shadow-xl shadow-black/20 md:p-8">
                  <div className="mb-7 flex flex-col justify-between gap-3 border-b border-white/10 pb-6 sm:flex-row sm:items-end">
                    <div>
                      <h3 className="text-2xl font-semibold text-white">Freelance Brand & Digital Designer</h3>
                      <p className="mt-1 font-mono text-lg text-cyan-400">Self-Employed</p>
                    </div>
                    <span className="font-mono text-sm text-white/45">2019 - Present</span>
                  </div>
                  <BulletList>
                    {[
                      <>Sole designer for <strong>5 clients across 4 industries</strong> - granite manufacturing, food and beverage, IT startups, and e-commerce - delivering brand identity, guidelines, and shipped web and app UI.</>,
                      <>Ran engagements end to end with founders, from discovery to launch.</>,
                    ]}
                  </BulletList>
                </article>
              </section>

            </div>

            <aside className="flex flex-col gap-6">
              <section className="overflow-hidden rounded-[2rem] border border-cyan-500/20 bg-gradient-to-br from-cyan-950/25 to-white/[0.025] p-7">
                <div className="mb-6 flex items-center justify-between border-b border-white/10 pb-4">
                  <h2 className="font-mono text-sm uppercase tracking-widest text-cyan-300">Education</h2>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-white/30">Academic</span>
                </div>
                <div className="space-y-6">
                  {[
                    ["2021 - 2023", "Master of Computer Applications", "KLN College of Engineering", "Pottapalayam"],
                    ["2018 - 2021", "Bachelor of Computer Applications", "Hindusthan College of Arts and Science", "Coimbatore"],
                  ].map(([dates, degree, institution, location]) => (
                    <div key={degree} className="relative border-l border-cyan-400/30 pl-5">
                      <span className="absolute -left-1 top-1 h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.65)]" />
                      <span className="mb-2 block font-mono text-xs text-cyan-400">{dates}</span>
                      <h3 className="font-semibold leading-snug text-white">{degree}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/55">{institution}</p>
                      <p className="mt-1 text-xs text-white/30">{location}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-7">
                <h2 className="mb-6 border-b border-white/10 pb-4 font-mono text-sm uppercase tracking-widest text-white/45">Skills</h2>
                <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-1">
                  {skills.map((skill) => (
                    <li key={skill} className="flex items-center gap-3 rounded-xl border border-transparent px-3 py-2 text-sm text-white/70 transition-colors hover:border-white/5 hover:bg-white/[0.035]">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.5)]" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </section>

              <section className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-7">
                <h2 className="mb-6 border-b border-white/10 pb-4 font-mono text-sm uppercase tracking-widest text-white/45">Tools</h2>
                <div className="flex flex-wrap gap-2">
                  {tools.map((tool) => (
                    <span key={tool} className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-sm text-white/65 transition-colors hover:border-cyan-400/30 hover:text-cyan-200">
                      {tool}
                    </span>
                  ))}
                </div>
              </section>

              <section className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-7">
                <h2 className="mb-6 border-b border-white/10 pb-4 font-mono text-sm uppercase tracking-widest text-white/45">Language</h2>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-1">
                  <div className="flex items-center justify-between rounded-xl border border-white/5 bg-black/20 px-4 py-3">
                    <span>Tamil</span>
                    <span className="font-mono text-xs uppercase tracking-wider text-cyan-400">Native</span>
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-white/5 bg-black/20 px-4 py-3">
                    <span>English</span>
                    <span className="font-mono text-xs uppercase tracking-wider text-indigo-400">Proficient</span>
                  </div>
                </div>
              </section>

              <section className="rounded-[2rem] border border-indigo-500/20 bg-gradient-to-br from-indigo-950/30 to-transparent p-7">
                <div className="mb-4 h-1 w-10 rounded-full bg-indigo-400" />
                <p className="mb-3 font-mono text-xs uppercase tracking-widest text-indigo-300">Current focus</p>
                <p className="text-sm leading-relaxed text-white/60">
                  Designing enterprise systems where complex workflows, responsible AI, and clear operational decision-making meet.
                </p>
              </section>
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}
