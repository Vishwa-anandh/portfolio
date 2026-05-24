import { useState, useEffect } from "react";
import { Project } from "./data/projects";
import { motion, AnimatePresence, useMotionValue, useTransform } from "motion/react";
import { ImageViewer } from "./components/ImageViewer";

// A 3D animated laptop mockup for the hero section
function HeroLaptopMockup({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useTransform(mouseY, [0, 1], [65, 45]);
  const rotateY = useTransform(mouseX, [0, 1], [-15, 15]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className={`relative w-full max-w-[800px] mx-auto mt-20 md:mt-32 lg:mt-48 ${className}`} style={{ perspective: "1500px" }}>
      <motion.div 
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        className="relative mx-auto w-full transition-transform ease-out duration-300"
      >
        {/* Base / Keyboard */}
        <div className="bg-gradient-to-b from-neutral-800 to-neutral-900 rounded-2xl md:rounded-3xl p-3 md:p-6 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.9)] border border-neutral-700 relative z-0">
           {/* Keyboard Area - with glowing keys */}
           <div className="bg-neutral-950 rounded-lg p-2 md:p-4 border border-neutral-800/80 mb-3 md:mb-4 shadow-inner">
             <div className="flex flex-col gap-1 md:gap-1.5 w-full">
                {[...Array(5)].map((_, row) => (
                  <div key={row} className="flex gap-1 md:gap-1.5 justify-center w-full">
                    {[...Array(14)].map((_, col) => (
                      <div key={col} className={`h-2.5 md:h-5 rounded-[2px] md:rounded-[4px] bg-neutral-800 border-t border-neutral-600/30 shadow-[0_0_8px_rgba(59,130,246,0.6)] flex-1`} />
                    ))}
                  </div>
                ))}
                 {/* Spacebar Row */}
                 <div className="flex gap-1 md:gap-1.5 justify-center w-full">
                   <div className="h-2.5 md:h-5 rounded-[2px] md:rounded-[4px] bg-neutral-800 border-t border-neutral-600/30 shadow-[0_0_8px_rgba(59,130,246,0.6)] flex-[2] w-full" />
                   <div className="h-2.5 md:h-5 rounded-[2px] md:rounded-[4px] bg-neutral-800 border-t border-neutral-600/30 shadow-[0_0_8px_rgba(59,130,246,0.8)] flex-[7] w-full" />
                   <div className="h-2.5 md:h-5 rounded-[2px] md:rounded-[4px] bg-neutral-800 border-t border-neutral-600/30 shadow-[0_0_8px_rgba(59,130,246,0.6)] flex-[2] w-full" />
                   <div className="h-2.5 md:h-5 rounded-[2px] md:rounded-[4px] bg-neutral-800 border-t border-neutral-600/30 shadow-[0_0_8px_rgba(59,130,246,0.6)] flex-1 w-full" />
                 </div>
             </div>
           </div>
           
           {/* Trackpad */}
           <div className="w-1/3 aspect-[3/1] bg-neutral-900 mx-auto rounded-md border border-neutral-800/80 shadow-inner" />
           
           <div className="absolute bottom-0 left-0 right-0 h-1.5 md:h-2 bg-gradient-to-b from-neutral-600 to-neutral-900 rounded-b-2xl md:rounded-b-3xl" />
        </div>

        {/* Screen / Lid */}
        <div 
          className="absolute bottom-full left-0 right-0 bg-neutral-900 p-1.5 md:p-3 rounded-t-xl md:rounded-t-3xl border-2 border-neutral-700/60 shadow-[0_-20px_60px_rgba(59,130,246,0.3)] z-10"
          style={{ transform: "rotateX(-95deg)", transformOrigin: "bottom center", transformStyle: "preserve-3d", marginBottom: "-2px" }}
        >
          <div className="absolute top-1 md:top-2 left-1/2 -translate-x-1/2 w-1 h-1 md:w-1.5 md:h-1.5 bg-black rounded-full shadow-[0_0_3px_rgba(255,255,255,0.2)]" />
          <div className="rounded-lg md:rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800/80 aspect-[16/10] relative mt-1 md:mt-2">
            {children}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// A reusable zoomable image container
function ZoomableImage({ src, alt, onClick, className = "" }: { src: string, alt: string, onClick: (src: string, alt: string) => void, className?: string }) {
  return (
    <motion.div 
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={`relative group cursor-zoom-in overflow-hidden shadow-2xl bg-neutral-900/50 ${className || "rounded-2xl border border-white/5"}`}
      onClick={() => onClick(src, alt)}
    >
      <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/20 transition-colors duration-300 z-10" />
      <img src={src} alt={alt} className="w-full h-auto object-cover relative z-0 opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
}

// Modern aesthetic background with grid and static glow
function ModernBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 mix-blend-screen">
      {/* Subtle Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_50%,#000_10%,transparent_80%)] opacity-70" />
      
      {/* Static Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none blur-3xl opacity-50 bg-[radial-gradient(circle,rgba(59,130,246,0.15)_0%,rgba(147,51,234,0.05)_40%,transparent_60%)]" />
      
      {/* Diagonal light rays */}
      <div className="absolute -top-[20%] left-[-10%] w-[40%] h-[150%] bg-blue-500/15 rotate-45 blur-[120px]" />
      <div className="absolute top-[20%] right-[-10%] w-[30%] h-[150%] bg-purple-500/15 -rotate-45 blur-[120px]" />
    </div>
  );
}

// The layout mimics a detailed futuristic case study
export default function WorkflowAICaseStudy({ project }: { project: Project }) {
  const [activeImage, setActiveImage] = useState<{src: string, alt: string} | null>(null);

  const openImage = (src: string, alt: string) => setActiveImage({ src, alt });
  const closeImage = () => setActiveImage(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,

        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const } }
  };

  return (
    <>
      {/* Animated Background Elements */}
      <ModernBackground />

      <div className="w-full bg-neutral-950/50 backdrop-blur-xl border border-white/10 text-neutral-300 font-sans mt-8 pt-12 lg:pt-24 rounded-[3rem] px-4 md:px-12 lg:px-24 mb-12 shadow-[0_0_80px_-20px_rgba(59,130,246,0.15)] relative overflow-hidden">
        {/* Futuristic glowing orbs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[150px] -z-10 pointer-events-none" />

        <div className="relative z-10">
          {/* Date & Title Header */}
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
            className="flex flex-col-reverse lg:grid lg:grid-cols-2 lg:items-center mb-24 gap-12 lg:gap-8 xl:gap-16"
          >
            <motion.div variants={itemVariants} className="w-full">
              <div className="inline-block px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-mono uppercase tracking-widest mb-6">Case Study</div>
              <h1 className="text-5xl md:text-7xl font-sans tracking-tighter text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-neutral-200 to-neutral-500">{project.name}</h1>
              <p className="text-2xl md:text-3xl font-light max-w-2xl leading-tight text-neutral-400 mb-12">
                An AI-powered workspace that helps teams visualize, generate, and collaborate on ideas seamlessly securely in a spatial environment.
              </p>
              
              <div className="flex flex-wrap gap-8 md:gap-16 pt-8 border-t border-white/10">
                <div>
                  <p className="text-xs uppercase tracking-widest text-neutral-500 mb-2 font-mono">Platform</p>
                  <p className="text-lg text-white font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
                    Web Application
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-neutral-500 mb-2 font-mono">Timeline</p>
                  <p className="text-lg text-white font-medium flex items-center gap-2">
                    Aug 2025
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-neutral-500 mb-2 font-mono">Tools</p>
                  <div className="flex flex-wrap gap-3 mt-1">
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-neutral-300">Figma</span>
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-neutral-300">React</span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <div className="w-full relative group z-10 hidden md:block pt-16 lg:pt-0">
              <motion.div 
                variants={itemVariants}
                className="relative flex justify-center"
              >
                 <div className="absolute -inset-8 bg-gradient-to-tr from-blue-500/30 via-indigo-500/20 to-purple-500/30 rounded-[2rem] blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
                 <HeroLaptopMockup className="transform transition-transform duration-500 hover:scale-[1.02]">
                   <img src="/V14 Workflow AI/6. Homepage.png" className="absolute inset-0 w-full h-full object-cover object-[center_top] bg-neutral-900 cursor-zoom-in" alt="Hero" onClick={() => openImage("/V14 Workflow AI/6. Homepage.png", "Hero")} />
                 </HeroLaptopMockup>
              </motion.div>
            </div>
            
            <motion.div variants={itemVariants} className="w-full md:hidden relative flex justify-center mt-32 mb-16 px-4">
               <div className="absolute -inset-1 bg-gradient-to-tr from-blue-500/30 to-indigo-500/30 rounded-3xl blur-xl opacity-50" />
               <HeroLaptopMockup>
                 <img src="/V14 Workflow AI/6. Homepage.png" className="absolute inset-0 w-full h-full object-cover object-[center_top] cursor-zoom-in bg-neutral-900" alt="Hero" onClick={() => openImage("/V14 Workflow AI/6. Homepage.png", "Hero")} />
               </HeroLaptopMockup>
            </motion.div>
          </motion.div>

          <motion.hr initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={itemVariants} className="border-white/5 my-24" />

          {/* Project Overview */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants} className="mb-32">
            <motion.h3 variants={itemVariants} className="text-sm font-mono text-blue-500 uppercase tracking-widest mb-16 inline-block pb-2 border-b border-blue-500/30">01 // The Origins</motion.h3>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-left group">
              <div className="col-span-1 md:col-span-4">
                <h4 className="text-2xl font-light text-white group-hover:text-blue-400 transition-colors">The Blank Canvas Syndrome</h4>
              </div>
              <div className="col-span-1 md:col-span-8">
                <p className="text-neutral-400 leading-relaxed font-light text-xl space-y-6">
                  <span>Traditional digital whiteboarding tools all share a common flaw: the initial barrier to entry. Every time a team sits down to map out a new architecture or brainstorm a campaign, they are met with a completely blank stare. Staring at an empty grid can be paralyzing, leading to scattered workflows and chaotic starting points.</span>
                  <br/><br/>
                  <span>We envisioned Workflow AI not just as a drawing tool, but as an active collaborator. The mission was to revolutionize the way users map out ideas by introducing a context-aware generative engine right into the canvas. By merging spatial collaboration with language models, we transform ideation from a manual absolute chore into an intuitive dialogue with the workspace itself.</span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Defining the goals */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants} className="mb-32">
            <motion.h3 variants={itemVariants} className="text-sm font-mono text-blue-500 uppercase tracking-widest mb-16 inline-block pb-2 border-b border-blue-500/30">02 // The Engineering Challenge</motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div variants={itemVariants} className="p-8 rounded-3xl bg-neutral-900/50 border border-white/5 hover:bg-neutral-900 hover:border-blue-500/30 transition-all duration-300">
                 <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-6 text-xl">01</div>
                 <h4 className="text-xl font-medium text-white mb-4">Combating Friction</h4>
                 <p className="text-neutral-400 font-light leading-relaxed">Lower the activation energy needed to begin ideating. We engineered an initial setup where simply typing a goal dynamically generates an entire architectural template, complete with structured nodes, directly onto the canvas.</p>
              </motion.div>
              <motion.div variants={itemVariants} className="p-8 rounded-3xl bg-neutral-900/50 border border-white/5 hover:bg-neutral-900 hover:border-blue-500/30 transition-all duration-300">
                 <div className="w-12 h-12 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center mb-6 text-xl">02</div>
                 <h4 className="text-xl font-medium text-white mb-4">Empowering Synthesis</h4>
                 <p className="text-neutral-400 font-light leading-relaxed">It is easy to generate noise. The real challenge is synthesis. We designed our generative engine to evaluate existing, chaotic notes, and seamlessly cluster, route, and group them into logical diagrams within milliseconds.</p>
              </motion.div>
              <motion.div variants={itemVariants} className="p-8 rounded-3xl bg-neutral-900/50 border border-white/5 hover:bg-neutral-900 hover:border-blue-500/30 transition-all duration-300">
                 <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center mb-6 text-xl">03</div>
                 <h4 className="text-xl font-medium text-white mb-4">Synchronized Telemetry</h4>
                 <p className="text-neutral-400 font-light leading-relaxed">Collaboration breaks down when it lags behind thought. We optimized our web-socket telemetry to guarantee sub-50ms latency for all multiplayer cursors and real-time element manipulations, creating a true sense of co-presence.</p>
              </motion.div>
            </div>
          </motion.div>
          
          {/* Competitor Analysis */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants} className="mb-32">
            <motion.h3 variants={itemVariants} className="text-sm font-mono text-blue-500 uppercase tracking-widest mb-16 inline-block pb-2 border-b border-blue-500/30">03 // Competitor Analysis</motion.h3>
            
            <motion.div variants={itemVariants} className="space-y-8 bg-neutral-900/30 p-8 md:p-12 lg:p-16 rounded-[3rem] border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />
              
              <div className="max-w-3xl relative z-10">
                <h4 className="text-3xl font-medium text-white mb-6">Evaluating the Whiteboard Landscape</h4>
                <p className="text-neutral-400 leading-relaxed font-light text-xl mb-12">
                  During our initial research, we mapped out the whiteboarding and documentation landscape. Existing tools forced users to choose between rigid structural documents or entirely unstructured brainstorming canvases, with AI feeling bolted on rather than natively integrated.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                <div className="p-8 rounded-3xl bg-black/40 border border-white/5">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="w-10 h-10 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center text-xl">✕</span>
                    <h5 className="text-xl font-medium text-white">Traditional Whiteboards</h5>
                  </div>
                  <p className="text-neutral-400 font-light mb-6">Miro, FigJam, Mural</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-neutral-500 text-sm"><span className="text-red-500/50 mt-0.5">•</span> Great for spatial thinking and brainstorming.</li>
                    <li className="flex items-start gap-3 text-neutral-500 text-sm"><span className="text-red-500/50 mt-0.5">•</span> Lack deep structural capabilities.</li>
                    <li className="flex items-start gap-3 text-neutral-500 text-sm"><span className="text-red-500/50 mt-0.5">•</span> AI features are often superficial additions.</li>
                  </ul>
                </div>

                <div className="p-8 rounded-3xl bg-black/40 border border-white/5">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="w-10 h-10 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center text-xl">✕</span>
                    <h5 className="text-xl font-medium text-white">Linear Document Editors</h5>
                  </div>
                  <p className="text-neutral-400 font-light mb-6">Notion, Google Docs</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-neutral-500 text-sm"><span className="text-red-500/50 mt-0.5">•</span> Excellent for structured text and reading.</li>
                    <li className="flex items-start gap-3 text-neutral-500 text-sm"><span className="text-red-500/50 mt-0.5">•</span> Native AI generation for prose.</li>
                    <li className="flex items-start gap-3 text-neutral-500 text-sm"><span className="text-red-500/50 mt-0.5">•</span> Heavily constrain visual and non-linear ideation.</li>
                  </ul>
                </div>
              </div>
              
              <div className="p-8 mt-8 rounded-2xl bg-blue-900/10 border border-blue-500/20 relative z-10 flex flex-col md:flex-row gap-6 items-center">
                <div className="w-16 h-16 shrink-0 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 text-2xl">✓</div>
                <div>
                  <h5 className="text-lg font-medium text-blue-300 mb-2">The Workflow AI Opportunity</h5>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    A spatial engine infused with AI from the ground up, capable of seamlessly bridging creative chaos and structured output without forcing the user to switch platforms.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* User Flow */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants} className="mb-32">
            <motion.h3 variants={itemVariants} className="text-sm font-mono text-blue-500 uppercase tracking-widest mb-16 inline-block pb-2 border-b border-blue-500/30">04 // User Flow</motion.h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 group">
               <div className="lg:col-span-5 relative">
                 <motion.div variants={itemVariants} className="sticky top-32">
                   <h4 className="text-3xl font-medium text-white mb-6">From Chaos to Structure</h4>
                   <p className="text-neutral-400 leading-relaxed font-light text-lg mb-8">
                     The primary user journey was designed to seamlessly bridge high-level ideation with structural synthesis. The flow mirrors natural human creative processes.
                   </p>
                   <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                     <p className="text-white/60 font-mono text-sm leading-relaxed">
                       "Ideas don't start in a grid. We must let users spread out spatially, and then utilize AI to gather, organize, and synthesize that spatial mess into a linear format."
                     </p>
                   </div>
                 </motion.div>
               </div>
               
               <div className="lg:col-span-7">
                  <div className="relative border-l border-white/10 ml-6 md:ml-12 space-y-20 pb-8 pt-4">
                    <motion.div variants={itemVariants} className="relative pl-8 md:pl-16">
                      <div className="absolute w-8 h-8 rounded-full bg-black border-2 border-white/20 left-[-17px] top-0 flex items-center justify-center text-xs font-mono text-white/50">1</div>
                      <h4 className="text-2xl font-medium text-white mb-4">Onboarding & Setup</h4>
                      <p className="text-neutral-400 font-light text-lg leading-relaxed">
                        Users authenticate their account, arriving at the dashboard to either open an existing spatial workspace or create a new objective-driven project. 
                      </p>
                    </motion.div>
                    
                    <motion.div variants={itemVariants} className="relative pl-8 md:pl-16">
                      <div className="absolute w-8 h-8 rounded-full bg-black border-2 border-white/20 left-[-17px] top-0 flex items-center justify-center text-xs font-mono text-white/50">2</div>
                      <h4 className="text-2xl font-medium text-white mb-4">Spatial Ideation</h4>
                      <p className="text-neutral-400 font-light text-lg leading-relaxed">
                        Users drop markers, shape elements, and textual notes onto the infinite canvas. Interaction includes real-time synchronized dragging, clustering, and drawing boundaries.
                      </p>
                    </motion.div>
                    
                    <motion.div variants={itemVariants} className="relative pl-8 md:pl-16">
                      <div className="absolute w-8 h-8 rounded-full bg-blue-900/30 border-2 border-blue-500 left-[-17px] top-0 flex items-center justify-center text-xs font-mono text-blue-400 animate-pulse">3</div>
                      <h4 className="text-2xl font-medium text-blue-400 mb-4">AI Expansion Phase</h4>
                      <p className="text-neutral-400 font-light text-lg leading-relaxed mb-6">
                        At any point, a user selects a node or group and triggers the Generative Engine to evaluate the context and suggest sub-nodes.
                      </p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-black/30 border border-white/5 hover:border-blue-500/30 transition-colors">
                          <h6 className="text-white font-medium text-sm mb-2">Synthesize Notes</h6>
                          <p className="text-neutral-500 text-xs">AI automatically organizes chaotic notes into structured outlines.</p>
                        </div>
                        <div className="p-4 rounded-xl bg-black/30 border border-white/5 hover:border-blue-500/30 transition-colors">
                          <h6 className="text-white font-medium text-sm mb-2">Export Actionables</h6>
                          <p className="text-neutral-500 text-xs">Transform canvas clusters into actionable JIRA or linear tickets.</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
               </div>
            </div>
          </motion.div>

          {/* High Fidelity Wireframes */}
          <div className="mb-32">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants} className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div>
                <motion.h3 variants={itemVariants} className="text-sm font-mono text-blue-500 uppercase tracking-widest inline-block pb-2 border-b border-blue-500/30">05 // Visual Execution</motion.h3>
                <motion.h2 variants={itemVariants} className="text-4xl text-white font-light mt-8">Futuristic Interface Engineering</motion.h2>
              </div>
              <motion.p variants={itemVariants} className="text-neutral-500 font-mono text-sm">Click any frame to examine.</motion.p>
            </motion.div>

            {/* Categories of screens */}
            <div className="space-y-32">
                
                {/* Authentication */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants}>
                  <div className="flex items-center gap-4 mb-12">
                     <div className="h-[1px] bg-white/10 flex-grow" />
                     <h4 className="text-xl font-medium text-white px-4 font-mono">Authentication Protocol</h4>
                     <div className="h-[1px] bg-white/10 flex-grow" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <ZoomableImage src="/V14 Workflow AI/1. Sign In.png" alt="Sign In" onClick={openImage} />
                    <ZoomableImage src="/V14 Workflow AI/2. Sign Up.png" alt="Sign Up" onClick={openImage} />
                    <ZoomableImage src="/V14 Workflow AI/3. Sign Up - Success.png" alt="Sign Up Success" onClick={openImage} />
                    <ZoomableImage src="/V14 Workflow AI/4. Forgot Password.png" alt="Forgot Password" onClick={openImage} />
                    <ZoomableImage src="/V14 Workflow AI/5. Forgot Password - Change Password.png" alt="Change Password" onClick={openImage} />
                    <ZoomableImage src="/V14 Workflow AI/10. Upgrade to PRO.png" alt="Upgrade to PRO" onClick={openImage} />
                  </div>
                </motion.div>

                {/* Core Experience */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants}>
                   <div className="flex items-center gap-4 mb-12">
                     <div className="h-[1px] bg-white/10 flex-grow" />
                     <h4 className="text-xl font-medium text-white px-4 font-mono">Core Operating System</h4>
                     <div className="h-[1px] bg-white/10 flex-grow" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <ZoomableImage src="/V14 Workflow AI/6. Homepage.png" alt="Homepage" onClick={openImage} />
                    <ZoomableImage src="/V14 Workflow AI/7. Create New Project.png" alt="Create Project" onClick={openImage} />
                    <div className="col-span-1 md:col-span-2 mt-4 grid grid-cols-1 md:grid-cols-2 gap-8">
                       <ZoomableImage src="/V14 Workflow AI/11. Default.png" alt="Canvas Default" onClick={openImage} />
                       <ZoomableImage src="/V14 Workflow AI/12. Hand Tool.png" alt="Hand Tool" onClick={openImage} />
                    </div>
                  </div>
                </motion.div>

                {/* AI Generation */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants}>
                  <div className="flex items-center gap-4 mb-12">
                     <div className="h-[1px] bg-white/10 flex-grow" />
                     <h4 className="text-xl font-medium text-blue-400 px-4 font-mono">AI Generative Engine</h4>
                     <div className="h-[1px] bg-white/10 flex-grow" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <ZoomableImage src="/V14 Workflow AI/31. Generating.png" alt="Generating" onClick={openImage} />
                    <ZoomableImage src="/V14 Workflow AI/32. Generating Result.png" alt="Generated" onClick={openImage} />
                    <ZoomableImage src="/V14 Workflow AI/33. Generating.png" alt="Generating State 2" onClick={openImage} />
                    <ZoomableImage src="/V14 Workflow AI/14. Template.png" alt="Templates" onClick={openImage} />
                    <ZoomableImage src="/V14 Workflow AI/15. Template - Open.png" alt="Templates Overview" onClick={openImage} />
                    <ZoomableImage src="/V14 Workflow AI/37. Preview.png" alt="Preview Output" onClick={openImage} />
                  </div>
                </motion.div>

                {/* Tools & Elements */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants}>
                   <div className="flex items-center gap-4 mb-12">
                     <div className="h-[1px] bg-white/10 flex-grow" />
                     <h4 className="text-xl font-medium text-white px-4 font-mono">Spatial Tools Matrix</h4>
                     <div className="h-[1px] bg-white/10 flex-grow" />
                   </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    <ZoomableImage src="/V14 Workflow AI/16. Note.png" alt="Note" onClick={openImage} />
                    <ZoomableImage src="/V14 Workflow AI/17. Note - Open.png" alt="Note Editing" onClick={openImage} />
                    <ZoomableImage src="/V14 Workflow AI/18. Note - Selected.png" alt="Note Selected" onClick={openImage} />
                    <ZoomableImage src="/V14 Workflow AI/19. Text.png" alt="Text" onClick={openImage} />
                    <ZoomableImage src="/V14 Workflow AI/20. Text - Type Something.png" alt="Text Content" onClick={openImage} />
                    <ZoomableImage src="/V14 Workflow AI/21. Shape.png" alt="Shape Menu" onClick={openImage} />
                    <ZoomableImage src="/V14 Workflow AI/23. Shape - Created Rectangle.png" alt="Created Shape" onClick={openImage} />
                    <ZoomableImage src="/V14 Workflow AI/26. Section.png" alt="Section Tool" onClick={openImage} />
                    <ZoomableImage src="/V14 Workflow AI/27. Section - Created.png" alt="Section Group" onClick={openImage} />
                    <ZoomableImage src="/V14 Workflow AI/24. Marker.png" alt="Marker" onClick={openImage} />
                    <ZoomableImage src="/V14 Workflow AI/34. Sticker - Emoji Open.png" alt="Emoji Panel" onClick={openImage} />
                    <ZoomableImage src="/V14 Workflow AI/35. Sticker - Sticker Open.png" alt="Stickers Panel" onClick={openImage} />
                  </div>
                </motion.div>

                {/* Collaboration */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants}>
                   <div className="flex items-center gap-4 mb-12">
                     <div className="h-[1px] bg-white/10 flex-grow" />
                     <h4 className="text-xl font-medium text-white px-4 font-mono">Synapse Network (Collab)</h4>
                     <div className="h-[1px] bg-white/10 flex-grow" />
                   </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <ZoomableImage src="/V14 Workflow AI/8. Invite Member.png" alt="Invite Member" onClick={openImage} />
                    <ZoomableImage src="/V14 Workflow AI/36. Share.png" alt="Share" onClick={openImage} />
                    <ZoomableImage src="/V14 Workflow AI/9. Notifications.png" alt="Notifications Center" onClick={openImage} />
                    <ZoomableImage src="/V14 Workflow AI/28. Comment.png" alt="Comment Overlay" onClick={openImage} />
                    <ZoomableImage src="/V14 Workflow AI/29. Comment Open.png" alt="Comment Active" onClick={openImage} />
                    <ZoomableImage src="/V14 Workflow AI/30. Comment Sidebar.png" alt="Comment Sidebar" onClick={openImage} />
                  </div>
                </motion.div>

                {/* Settings */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants}>
                   <div className="flex items-center gap-4 mb-12">
                     <div className="h-[1px] bg-white/10 flex-grow" />
                     <h4 className="text-xl font-medium text-white px-4 font-mono">User Environment Config</h4>
                     <div className="h-[1px] bg-white/10 flex-grow" />
                   </div>
                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-wrap">
                     <ZoomableImage src="/V14 Workflow AI/38. Settings - Profile.png" alt="Profile Settings" onClick={openImage} />
                     <ZoomableImage src="/V14 Workflow AI/39. Settings - Notifications.png" alt="Notifications Settings" onClick={openImage} />
                     <ZoomableImage src="/V14 Workflow AI/42. Settings - Security.png" alt="Security" onClick={openImage} />
                     <ZoomableImage src="/V14 Workflow AI/40. Settings - Your Apps.png" alt="Apps Settings" onClick={openImage} />
                     <ZoomableImage src="/V14 Workflow AI/41. Settings - Integrations.png" alt="Integrations" onClick={openImage} />
                     <ZoomableImage src="/V14 Workflow AI/43. Settings - Permissions.png" alt="Permissions" onClick={openImage} />
                     <ZoomableImage src="/V14 Workflow AI/44. Settings - Data Usages.png" alt="Data Usage" onClick={openImage} />
                     <ZoomableImage src="/V14 Workflow AI/45. Settings - About.png" alt="About App" onClick={openImage} />
                   </div>
                </motion.div>
                
            </div>
          </div>

           {/* Thank you */}
           <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants} className="py-24 text-center border-t border-white/5 bg-gradient-to-t from-white/5 to-transparent rounded-b-[3rem] px-4 -mx-4 md:-mx-12 lg:-mx-24 -mb-12">
              <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl text-white font-sans tracking-tight mb-6">TRANSMISSION COMPLETE</motion.h2>
              <motion.p variants={itemVariants} className="text-neutral-400 font-light text-lg">Thank you for exploring this spatial design record.</motion.p>
           </motion.div>
        </div>
      </div>

      {activeImage && (
        <ImageViewer 
          src={activeImage.src} 
          alt={activeImage.alt} 
          onClose={closeImage} 
        />
      )}
    </>
  );
}
