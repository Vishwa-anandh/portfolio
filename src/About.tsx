import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Background3D } from "./components/Background3D";

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
    
  }, []);

  return (
    <div className="min-h-screen bg-transparent text-white font-sans w-full selection:bg-indigo-500/30 pb-24 relative">
      <Helmet>
        <title>About | Vishwa Anandh — AI UI/UX & Product Designer</title>
        <meta name="description" content="Learn more about Vishwa Anandh, a passionate UI/UX Designer who thrives on creating intuitive, AI-driven digital experiences." />
        <meta name="keywords" content="About, UI/UX, Product Designer, Experience, Background, Vishwa Anandh" />
      </Helmet>
      <div className="fixed inset-0 z-[-2] bg-black"></div>
      <Background3D />
      <div className="relative z-10 block">
      {/* Top Navigation Bar */}
      <nav className="border-b border-white/10 sticky top-0 bg-black/80 backdrop-blur-md z-50">
        <div className="max-w-6xl mx-auto px-4 xl:px-0 py-4 flex justify-between items-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors font-mono text-sm underline-offset-4 hover:underline"
          >
            <span>← Back to Home</span>
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 xl:px-0 mt-16 md:mt-24">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 md:mb-12 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
          About Me
        </h1>
        
        <div className="space-y-8 text-lg md:text-xl text-white/70 leading-relaxed font-light">
          <p>
            Hello! I'm Vishwa Anandh, a passionate UI/UX Designer who thrives on smoothing out complex user interfaces, translating intricate ideas into intuitive UI designs, and creating delightful user interactions. 
          </p>
          <p>
            With over 4 years of experience shaping digital products, I specialize in human-centered design deeply integrated with artificial intelligence. From developing comprehensive school management suites to enterprise social intranets, I've had the privilege of consistently shipping AI-driven experiences that put the user first.
          </p>
          <p>
            My core philosophy revolves around "Architectural Honesty" and distinctive, polished visual language. Good design comes from intentional pairings—not defaults. By focusing on purposeful animations, intentional variation, and establishing a clear mood, I aim to craft interfaces that are both beautiful and highly foundational.
          </p>
        </div>

        <div className="mt-16 pt-16 border-t border-white/10">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-white mb-8">
            Experience Highlights
          </h2>
          <div className="space-y-6">
            <div className="bg-neutral-900/30 border border-white/5 p-8 md:p-10 rounded-[2rem]">
              <div className="flex flex-col sm:flex-row justify-between items-start mb-6 gap-4">
                <div>
                  <h3 className="text-2xl font-medium text-white mb-2">Lead UI/UX Designer</h3>
                  <p className="text-indigo-400 font-mono text-sm uppercase tracking-wider font-semibold">Maitsys</p>
                </div>
                <span className="text-white/40 font-mono text-sm tracking-wider uppercase bg-white/5 px-4 py-2 rounded-full">
                  July 2024 — Present
                </span>
              </div>
              <p className="text-white/70 leading-relaxed text-base md:text-lg">
                Spearheading UI/UX design across multiple pivotal products. Designed seamless experiences for Pappa.ai, NC STEM Academy, and Project.AI covering web and mobile. Redesigned Getherly and created complex workspaces and dashboards for diverse enterprise clients.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-white/5 rounded-full text-sm text-white/60">UI/UX Design</span>
                <span className="px-4 py-2 bg-white/5 rounded-full text-sm text-white/60">Figma</span>
                <span className="px-4 py-2 bg-white/5 rounded-full text-sm text-white/60">Prototyping</span>
                <span className="px-4 py-2 bg-white/5 rounded-full text-sm text-white/60">AI Integration</span>
              </div>
            </div>

            <div className="bg-neutral-900/30 border border-white/5 p-8 md:p-10 rounded-[2rem]">
              <div className="flex flex-col sm:flex-row justify-between items-start mb-6 gap-4">
                <div>
                  <h3 className="text-2xl font-medium text-white mb-2">Freelance Brand & Digital Designer</h3>
                  <p className="text-indigo-400 font-mono text-sm uppercase tracking-wider font-semibold">Self-Employed</p>
                </div>
                <span className="text-white/40 font-mono text-sm tracking-wider uppercase bg-white/5 px-4 py-2 rounded-full">
                  2019 — Present
                </span>
              </div>
              <p className="text-white/70 leading-relaxed text-base md:text-lg mb-6">
                I have been freelancing since 2019, working with startups and established businesses across industries such as granite manufacturing, food outlets, IT startups, and e-commerce brands. My focus has been on creating strong branding assets and digital design solutions that help businesses build a professional and impactful market presence.
              </p>
              <p className="text-white/70 leading-relaxed text-base md:text-lg mb-6">
                I collaborated closely with business owners, founders, and marketing teams to understand brand goals and transform ideas into effective visual experiences that improve customer engagement, brand visibility, and business growth.
              </p>
              <p className="text-white/70 leading-relaxed text-base md:text-lg mb-6">
                My freelance experience spans industries including manufacturing, hospitality, food & beverage, technology, and online retail, allowing me to deliver versatile and business-focused design solutions.
              </p>
              <div>
                <h4 className="text-white/90 font-medium mb-3">Key Deliverables:</h4>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-white/70 text-sm md:text-base">
                  <li className="flex items-start"><span className="text-indigo-400 mr-2">•</span> Brand Identity Design</li>
                  <li className="flex items-start"><span className="text-indigo-400 mr-2">•</span> Logo Design & Brand Guidelines</li>
                  <li className="flex items-start"><span className="text-indigo-400 mr-2">•</span> Social Media & Ad Creatives</li>
                  <li className="flex items-start"><span className="text-indigo-400 mr-2">•</span> Website UI/UX & Landing Pages</li>
                  <li className="flex items-start"><span className="text-indigo-400 mr-2">•</span> Product Presentation Decks</li>
                  <li className="flex items-start"><span className="text-indigo-400 mr-2">•</span> Investor Pitch Decks</li>
                  <li className="flex items-start"><span className="text-indigo-400 mr-2">•</span> Mobile App UI Design</li>
                  <li className="flex items-start"><span className="text-indigo-400 mr-2">•</span> E-commerce Product Branding</li>
                  <li className="flex items-start"><span className="text-indigo-400 mr-2">•</span> Brochures, Banners & Flyers</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        

        <div className="mt-16 pt-16 border-t border-white/10 flex justify-center">
            <Link
                to="/resume"
                className="px-8 py-4 rounded-full bg-white text-black hover:bg-neutral-200 hover:scale-105 transition-all font-medium flex items-center justify-center gap-3 group w-max shadow-[0_0_20px_rgba(255,255,255,0.1)]"
            >
                <span>View Full Resume</span>
                <svg
                className="w-4 h-4 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
                </svg>
            </Link>
        </div>
      </div>
      </div>
    </div>
  );
}
