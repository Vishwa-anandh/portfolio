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
        <title>About | Vishwa Anandh | AI UI/UX & Product Designer</title>
        <meta name="description" content="Learn more about Vishwa Anandh, a passionate UI/UX Designer who thrives on creating intuitive, AI driven digital experiences." />
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
            Hello! I'm Vishwa Anandh, a <strong className="text-white font-medium">Product Designer</strong> specializing in <strong className="text-white font-medium">complex enterprise workflows</strong> and <strong className="text-white font-medium">AI-native systems</strong>. I translate technical complexity into highly intuitive, scalable digital experiences from deep architectural concept to deployed reality.
          </p>
          <p>
            With over <strong className="text-white font-medium">4 years of experience</strong> shaping digital products, including <strong className="text-white font-medium">2+ years in dedicated UI/UX roles</strong> and <strong className="text-white font-medium">freelance design since 2019</strong>, I have consistently delivered human-centered solutions that bridge the gap between emerging AI capabilities and real-world user needs. Whether designing comprehensive school management suites or enterprise social intranets, I focus on building systems that empower users and drive tangible business outcomes.
          </p>
          <p>
            My core philosophy revolves around "<strong className="text-white font-medium">Architectural Honesty</strong>" and distinctive, polished visual language. Good design comes from intentional pairings, not defaults. By focusing on purposeful animations, intentional variation, and establishing a clear mood, I aim to craft interfaces that are both beautiful and highly foundational. I recently applied this end-to-end on <strong className="text-indigo-300 font-medium">PulseCX</strong>, an <strong className="text-indigo-300 font-medium">AI-native monitoring and incident response platform</strong>, where I not only architected the UX but personally <strong className="text-indigo-300 font-medium">built and deployed the live application</strong> to prove that strong design systems seamlessly translate into functional products.
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
                  <h3 className="text-2xl font-medium text-white mb-2">Product Designer & Developer</h3>
                  <p className="text-indigo-400 font-mono text-sm uppercase tracking-wider font-semibold">PulseCX (Independent Project)</p>
                </div>
                <span className="text-white/40 font-mono text-sm tracking-wider uppercase bg-white/5 px-4 py-2 rounded-full">
                  Deployed
                </span>
              </div>
              <p className="text-white/70 leading-relaxed text-base md:text-lg">
                Architected and designed the end-to-end UX for an <strong className="text-indigo-300 font-medium">AI-native enterprise monitoring</strong> and incident response platform. Beyond designing the complex product architecture, I independently <strong className="text-indigo-300 font-medium">built and deployed</strong> the fully functional web application using AI-assisted development as a non-developer. The live platform features an LLM chatbot that I <strong className="text-indigo-300 font-medium">personally trained</strong>, bridging the gap between deep system infrastructure and actionable visual interfaces.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <span className="px-4 py-2 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-full text-sm font-medium">PulseCX</span>
                <span className="px-4 py-2 bg-white/5 rounded-full text-sm text-white/60">Product Architecture</span>
                <span className="px-4 py-2 bg-white/5 rounded-full text-sm text-white/60">AI Development</span>
              </div>
            </div>

            <div className="bg-neutral-900/30 border border-white/5 p-8 md:p-10 rounded-[2rem]">
              <div className="flex flex-col sm:flex-row justify-between items-start mb-6 gap-4">
                <div>
                  <h3 className="text-2xl font-medium text-white mb-2">UI/UX Designer</h3>
                  <p className="text-indigo-400 font-mono text-sm uppercase tracking-wider font-semibold">Maitsys</p>
                </div>
                <span className="text-white/40 font-mono text-sm tracking-wider uppercase bg-white/5 px-4 py-2 rounded-full">
                  July 2024 to Present
                </span>
              </div>
              <p className="text-white/70 leading-relaxed text-base md:text-lg">
                Driving the <strong className="text-white font-medium">UX architecture</strong> and product design across multiple core enterprise applications. <strong className="text-white font-medium">Streamlined multi-role workflows</strong> and reduced administrative overhead for <strong>Pappa.ai</strong> and <strong>NC STEM Academy</strong> through AI-driven platforms. <strong className="text-white font-medium">Replaced manual tracking</strong> with robust digital ecosystems in <strong>Project.AI</strong>, and overhauled <strong>Getherly</strong> to deliver stricter privacy controls and safer communication. Across all projects, I focus on translating complex data into actionable, accessible dashboards.
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
                  <p className="text-indigo-400 font-mono text-sm uppercase tracking-wider font-semibold">Self Employed</p>
                </div>
                <span className="text-white/40 font-mono text-sm tracking-wider uppercase bg-white/5 px-4 py-2 rounded-full">
                  2019 to Present
                </span>
              </div>
              <p className="text-white/70 leading-relaxed text-base md:text-lg">
                Since 2019, I have partnered directly with founders and marketing teams across various industries, from manufacturing to e-commerce, to build their digital presence from the ground up. By delivering <strong className="text-white font-medium">comprehensive brand identities</strong>, <strong className="text-white font-medium">UI/UX designs</strong>, and <strong className="text-white font-medium">scalable design systems</strong>, I help businesses transform abstract goals into cohesive, professional market experiences.
              </p>
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
