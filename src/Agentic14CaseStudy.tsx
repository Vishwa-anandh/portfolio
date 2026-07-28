import React, { useState, useEffect } from "react";
import { Project } from "./data/projects";
import { motion, AnimatePresence, useMotionValue, useTransform } from "motion/react";
import { ImageViewer } from "./components/ImageViewer";

// A futuristic dashboard command center mockup for the hero section
function HeroDashboardMockup({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useTransform(mouseY, [0, 1], [3, -3]);
  const rotateY = useTransform(mouseX, [0, 1], [-6, 6]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth);
      mouseY.set(e.clientY / window.innerHeight);
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className={`relative w-full max-w-[1200px] mx-auto mt-0 md:mt-4 ${className}`} style={{ perspective: "2500px" }}>
      <motion.div 
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        className="relative mx-auto w-full transition-transform ease-out duration-300"
      >
        {/* Glow behind */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-800/30 blur-[120px] opacity-80"
          style={{ transform: "translateZ(-150px)" }}
        />

        {/* Abstract Backend Windows Behind */}
        <div 
          className="hidden md:block absolute -right-16 -top-16 w-72 h-48 rounded-2xl bg-[#080808] border border-white/5 shadow-[0_0_30px_rgba(0,0,0,0.5)] z-[-1]"
          style={{ transform: "translateZ(-80px) rotate(5deg)" }}
        >
           <div className="h-8 border-b border-white/5 bg-[#111] flex items-center px-4 justify-between">
              <span className="text-[10px] text-emerald-500 font-mono">NODE.STATUS</span>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/100"></div>
           </div>
           <div className="p-4 space-y-3">
              <div className="h-2 w-full bg-neutral-900/5 rounded-full overflow-hidden"><div className="h-full w-[85%] bg-emerald-500/100/30 rounded-full"></div></div>
              <div className="h-2 w-full bg-neutral-900/5 rounded-full overflow-hidden"><div className="h-full w-[60%] bg-teal-500/30 rounded-full"></div></div>
              <div className="h-2 w-full bg-neutral-900/5 rounded-full overflow-hidden"><div className="h-full w-[45%] bg-emerald-500/100/30 rounded-full"></div></div>
              <div className="h-2 w-full bg-neutral-900/5 rounded-full overflow-hidden"><div className="h-full w-[90%] bg-teal-500/30 rounded-full"></div></div>
           </div>
        </div>

        <div 
          className="hidden md:block absolute -left-12 -bottom-12 w-64 h-40 rounded-2xl bg-[#080808] border border-white/5 shadow-[0_0_30px_rgba(0,0,0,0.5)] z-[-1]"
          style={{ transform: "translateZ(-50px) rotate(-3deg)" }}
        >
           <div className="h-8 border-b border-white/5 bg-[#111] flex items-center px-4 justify-between">
              <span className="text-[10px] text-teal-500 font-mono">CLUSTER.METRICS</span>
           </div>
           <div className="p-4 grid grid-cols-2 gap-3">
              <div className="bg-neutral-900/5 rounded-lg p-2"><div className="text-[10px] text-white/40 font-mono">CPU</div><div className="text-sm text-teal-400 font-mono">42%</div></div>
              <div className="bg-neutral-900/5 rounded-lg p-2"><div className="text-[10px] text-white/40 font-mono">RAM</div><div className="text-sm text-teal-400 font-mono">16GB</div></div>
              <div className="bg-neutral-900/5 rounded-lg p-2"><div className="text-[10px] text-white/40 font-mono">GPU</div><div className="text-sm text-teal-400 font-mono">98%</div></div>
              <div className="bg-neutral-900/5 rounded-lg p-2"><div className="text-[10px] text-white/40 font-mono">NET</div><div className="text-sm text-teal-400 font-mono">1.2G</div></div>
           </div>
        </div>

        {/* Main Browser Window */}
        <div 
          className="relative rounded-2xl md:rounded-[1.5rem] overflow-hidden bg-neutral-950 border border-white/5 flex flex-col z-10"
          style={{
            boxShadow: '0 40px 80px -20px rgba(0,0,0,1), 0 0 0 1px rgba(255,255,255,0.05) inset'
          }}
        >
          {/* Top Bar */}
          <div className="h-9 md:h-12 border-b border-white/5 bg-[#0e0e0e] flex items-center px-3 md:px-5 gap-4">
            <div className="flex gap-1.5 md:gap-2">
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-rose-500/80"></div>
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-amber-500/80"></div>
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-emerald-500/100/80"></div>
            </div>
            
            {/* URL Bar */}
            <div className="flex-grow flex justify-center">
               <div className="w-full max-w-sm h-6 md:h-7 bg-neutral-900/5 border border-white/5 rounded-md flex items-center justify-center gap-2 px-3 shadow-inner">
                 <svg className="w-3 h-3 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                 <span className="text-[10px] md:text-xs text-white/40 font-mono tracking-wide">agentic14.corp.network/dashboard</span>
               </div>
            </div>

            <div className="w-12 md:w-16"></div> {/* Spacer for balance */}
          </div>

          <div className="relative w-full h-auto aspect-[16/10] md:aspect-[16/9] bg-neutral-900 overflow-hidden">
             {children}
             {/* Subtle internal reflection */}
             <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none mix-blend-overlay" />
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
      className={`relative group cursor-zoom-in overflow-hidden shadow-2xl shadow-black/50 bg-neutral-900 shadow-lg shadow-black/50 ${className || "rounded-2xl border border-white/5"}`}
      onClick={() => onClick(src, alt)}
    >
      <div className="absolute inset-0 bg-black/0 group-hover:bg-neutral-900/5 transition-colors duration-300 z-10" />
      <img src={src} alt={alt} className="w-full h-auto object-cover relative z-0 opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
}

function ModernBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 mix-blend-screen">
      {/* Subtle Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_50%,#000_10%,transparent_80%)] opacity-70" />
      
      {/* Static Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none blur-3xl opacity-50 bg-[radial-gradient(circle,rgba(16,185,129,0.05)_0%,rgba(20,184,166,0.02)_40%,transparent_60%)]" />
      
      {/* Diagonal light rays */}
      <div className="absolute -top-[20%] left-[-10%] w-[40%] h-[150%] bg-emerald-500/100/5 rotate-45 blur-[120px]" />
      <div className="absolute top-[20%] right-[-10%] w-[30%] h-[150%] bg-teal-600/5 -rotate-45 blur-[120px]" />
    </div>
  );
}

export default function Agentic14CaseStudy({ project }: { project: Project }) {
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
      <ModernBackground />

      <div className="w-full bg-neutral-950/80 backdrop-blur-xl border border-white/5 text-white/80 font-sans mt-8 pt-12 lg:pt-24 rounded-[3rem] px-4 md:px-12 lg:px-24 mb-12 shadow-[0_0_80px_-20px_rgba(0,0,0,0.05)] relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/100/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-teal-600/10 rounded-full blur-[150px] -z-10 pointer-events-none" />

        <div className="relative z-10">
          {/* Header */}
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
            className="flex flex-col-reverse lg:grid lg:grid-cols-2 lg:items-center mb-24 gap-12 lg:gap-8 xl:gap-16"
          >
            <motion.div variants={itemVariants} className="w-full">
              <div className="inline-block px-4 py-1.5 rounded-full border border-emerald-600/30 bg-emerald-800/20 text-emerald-300 text-xs font-mono uppercase tracking-widest mb-6">Case Study</div>
              <h1 className="text-5xl md:text-7xl font-sans tracking-tighter text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-100 via-teal-200 to-emerald-500">{project.name}</h1>
              <p className="text-2xl md:text-3xl font-light max-w-2xl leading-tight text-white/60 mb-12">
                A systems dashboard that helps operations teams configure, observe, and investigate AI agents without losing the path from fleet status to individual execution.
              </p>
              
              <div className="flex flex-wrap gap-8 md:gap-16 pt-8 border-t border-white/5">
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/50 mb-2 font-mono">Platform</p>
                  <p className="text-lg text-white font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    Web & Dashboard
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/50 mb-2 font-mono">Timeline</p>
                  <p className="text-lg text-white font-medium flex items-center gap-2">
                    Apr 2025
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/50 mb-2 font-mono">Role</p>
                  <p className="text-lg text-white font-medium">{project.role}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/50 mb-2 font-mono">Tools</p>
                  <div className="flex flex-wrap gap-3 mt-1">
                    <span className="px-3 py-1 rounded-full bg-neutral-900/5 border border-white/10 text-sm text-white/70">Figma</span>
                    <span className="px-3 py-1 rounded-full bg-neutral-900/5 border border-white/10 text-sm text-white/70">High Fidelity Prototyping</span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <div className="w-full relative group z-10 hidden md:block pt-4 lg:pt-0">
              <motion.div 
                variants={itemVariants}
                className="relative flex justify-center"
              >
                 <div className="absolute -inset-8 bg-gradient-to-tr from-emerald-600/20 via-teal-700/10 to-emerald-800/20 rounded-[2rem] blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
                 <HeroDashboardMockup className="transform transition-transform duration-500 hover:scale-[1.02]">
                   <img src="/Agentic14 - AI Agent Orchestration Dashboard/AgentOS - Home Dashboard.png" className="absolute inset-0 w-full h-full object-cover object-left-top bg-neutral-900 cursor-zoom-in" alt="Hero" onClick={() => openImage("/Agentic14 - AI Agent Orchestration Dashboard/AgentOS - Home Dashboard.png", "Hero")} />
                 </HeroDashboardMockup>
              </motion.div>
            </div>
            
            <motion.div variants={itemVariants} className="w-full md:hidden relative flex justify-center mt-12 mb-16 px-4">
               <div className="absolute -inset-1 bg-gradient-to-tr from-emerald-600/20 to-teal-800/20 rounded-3xl blur-xl opacity-50" />
               <HeroDashboardMockup>
                 <img src="/Agentic14 - AI Agent Orchestration Dashboard/AgentOS - Home Dashboard.png" className="absolute inset-0 w-full h-full object-cover cursor-zoom-in bg-neutral-900" alt="Hero" onClick={() => openImage("/Agentic14 - AI Agent Orchestration Dashboard/AgentOS - Home Dashboard.png", "Hero")} />
               </HeroDashboardMockup>
            </motion.div>
          </motion.div>

          <motion.hr initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={itemVariants} className="border-white/5 my-24" />

          {/* Project Overview */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants} className="mb-32">
            <motion.h3 variants={itemVariants} className="text-sm font-mono text-emerald-400 uppercase tracking-widest mb-16 inline-block pb-2 border-b border-emerald-600/30">01 // The Platform</motion.h3>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-left group">
              <div className="col-span-1 md:col-span-4">
                <h4 className="text-2xl font-light text-white group-hover:text-emerald-400 transition-colors">From Raw Activity to Operational Clarity</h4>
              </div>
              <div className="col-span-1 md:col-span-8 space-y-6">
                <p className="text-white/60 leading-relaxed font-light text-xl">
                  Agent-based systems introduce a new observability problem. Operators need to know what is running, what changed, where cost is accumulating, and which failure needs attention. Raw logs contain the detail, but they are inefficient as the primary interface for scanning system health.
                </p>
                <p className="text-white/60 leading-relaxed font-light text-xl">
                  Agentic14 organizes that complexity into a hierarchy: fleet health at the top, workflow and cluster activity in the middle, and agent configuration, logs, knowledge, and run history at the deepest level. The goal is to make investigation progressive instead of overwhelming.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Core Objectives */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants} className="mb-32">
            <motion.h3 variants={itemVariants} className="text-sm font-mono text-emerald-400 uppercase tracking-widest mb-16 inline-block pb-2 border-b border-emerald-600/30">02 // Core Systems</motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div variants={itemVariants} className="p-8 rounded-3xl bg-neutral-900 shadow-lg shadow-black/50 border border-white/5 hover:bg-neutral-900 hover:border-emerald-500/20 transition-all duration-300">
                 <div className="w-12 h-12 rounded-xl bg-neutral-900/5 text-emerald-300 flex items-center justify-center mb-6 text-xl">01</div>
                 <h4 className="text-xl font-medium text-white mb-4">Live Telemetry</h4>
                 <p className="text-white/60 font-light leading-relaxed">Dense activity streams are summarized into health, failure, latency, and usage states. Raw execution logs remain available on demand, so operators can scan first and inspect evidence only when needed.</p>
              </motion.div>
              <motion.div variants={itemVariants} className="p-8 rounded-3xl bg-neutral-900 shadow-lg shadow-black/50 border border-white/5 hover:bg-neutral-900 hover:border-emerald-500/20 transition-all duration-300">
                 <div className="w-12 h-12 rounded-xl bg-neutral-900/5 text-emerald-300 flex items-center justify-center mb-6 text-xl">02</div>
                 <h4 className="text-xl font-medium text-white mb-4">Agent Detail Topology</h4>
                 <p className="text-white/60 font-light leading-relaxed">Configuration, provider settings, knowledge sources, performance, and run history are grouped into one agent workspace. This keeps investigation context attached to the agent being reviewed.</p>
              </motion.div>
              <motion.div variants={itemVariants} className="p-8 rounded-3xl bg-neutral-900 shadow-lg shadow-black/50 border border-white/5 hover:bg-neutral-900 hover:border-emerald-500/20 transition-all duration-300">
                 <div className="w-12 h-12 rounded-xl bg-neutral-900/5 text-emerald-300 flex items-center justify-center mb-6 text-xl">03</div>
                 <h4 className="text-xl font-medium text-white mb-4">State-Driven Visual Hierarchy</h4>
                 <p className="text-white/60 font-light leading-relaxed">A restrained dark interface keeps dense data readable, while emerald, amber, and red are reserved for meaningful system states. Decorative styling supports the product identity without replacing status labels or hierarchy.</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Architectural Trade-offs */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants} className="mb-32">
            <motion.h3 variants={itemVariants} className="text-sm font-mono text-emerald-400 uppercase tracking-widest mb-16 inline-block pb-2 border-b border-emerald-600/30">03 // Key Trade-off</motion.h3>
            
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-12 gap-8 text-left group">
              <div className="col-span-1 md:col-span-4">
                <h4 className="text-2xl font-light text-white group-hover:text-emerald-400 transition-colors">Data Density vs. Legibility</h4>
              </div>
              <div className="col-span-1 md:col-span-8 space-y-6">
                <p className="text-white/60 leading-relaxed font-light text-xl">
                  The central design decision was how much live telemetry to expose before the dashboard became another log viewer. Fleet status, usage, failures, and latency all matter, but they do not need equal prominence at every level.
                </p>
                <p className="text-white/60 leading-relaxed font-light text-xl">
                  <strong>The Trade-off:</strong> A dense table could expose every metric at once, but it would make prioritization harder. The selected approach uses progressive disclosure: health and urgency are summarized at the fleet level, while exact logs and parameters sit one level deeper. This adds a deliberate click before raw detail, in exchange for a dashboard that communicates what deserves investigation first.
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Competitor Analysis */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants} className="mb-32">
            <motion.h3 variants={itemVariants} className="text-sm font-mono text-emerald-400 uppercase tracking-widest mb-16 inline-block pb-2 border-b border-emerald-600/30">04 // Reference Review</motion.h3>
            
            <motion.div variants={itemVariants} className="space-y-8 bg-neutral-900 shadow-xl shadow-black/50 p-8 md:p-12 lg:p-16 rounded-[3rem] border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/100/5 rounded-full blur-[100px] pointer-events-none" />
              
              <div className="max-w-3xl relative z-10">
                <h4 className="text-3xl font-medium text-white mb-6">Mapping the Orchestration Landscape</h4>
                <p className="text-white/60 leading-relaxed font-light text-xl mb-12">
                  The reference review compared infrastructure consoles with visual automation products. Infrastructure tools offer deep control but assume technical familiarity; visual automation tools lower the entry barrier but intentionally hide much of the underlying runtime detail.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                <div className="p-8 rounded-3xl bg-neutral-800/50 border border-white/5">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="w-10 h-10 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center text-xl">✕</span>
                    <h5 className="text-xl font-medium text-white">Developer Consoles</h5>
                  </div>
                  <p className="text-white/60 font-light mb-6">AWS, Google Cloud, Azure</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-white/50 text-sm"><span className="text-red-500/70 mt-0.5">•</span> Deep operational control and detailed telemetry.</li>
                    <li className="flex items-start gap-3 text-white/50 text-sm"><span className="text-red-500/70 mt-0.5">•</span> Navigation follows infrastructure rather than agent workflows.</li>
                    <li className="flex items-start gap-3 text-white/50 text-sm"><span className="text-red-500/70 mt-0.5">•</span> High learning cost for cross-functional operators.</li>
                  </ul>
                </div>

                <div className="p-8 rounded-3xl bg-neutral-800/50 border border-white/5">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="w-10 h-10 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center text-xl">✕</span>
                    <h5 className="text-xl font-medium text-white">Consumer Abstractions</h5>
                  </div>
                  <p className="text-white/60 font-light mb-6">Zapier Actions, Make</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-white/50 text-sm"><span className="text-red-500/70 mt-0.5">•</span> Clear setup flows and approachable visual builders.</li>
                    <li className="flex items-start gap-3 text-white/50 text-sm"><span className="text-red-500/70 mt-0.5">•</span> Runtime complexity is intentionally abstracted.</li>
                    <li className="flex items-start gap-3 text-white/50 text-sm"><span className="text-red-500/70 mt-0.5">•</span> Less suited to detailed model and agent investigation.</li>
                  </ul>
                </div>
              </div>
              
              <div className="p-8 mt-8 rounded-2xl bg-emerald-900/10 border border-emerald-500/20 relative z-10 flex flex-col md:flex-row gap-6 items-center">
                <div className="w-16 h-16 shrink-0 rounded-full bg-emerald-500/100/20 flex items-center justify-center text-emerald-400 text-2xl">✓</div>
                <div>
                  <h5 className="text-lg font-medium text-emerald-300 mb-2">The Agentic14 Opportunity</h5>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Preserve access to operational evidence while organizing it around the questions an operator asks: what is unhealthy, what changed, and where should I investigate next?
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Validation & Measurement */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants} className="mb-32">
            <motion.h3 variants={itemVariants} className="text-sm font-mono text-emerald-400 uppercase tracking-widest mb-16 inline-block pb-2 border-b border-emerald-600/30">05 // Validation & Measurement</motion.h3>
            
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 text-left">
              <div className="p-8 rounded-3xl bg-neutral-900 border border-emerald-500/20 shadow-lg shadow-black/50">
                <h4 className="text-xl font-medium text-emerald-400 mb-4 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Key Design Hypothesis</h4>
                <p className="text-white/70 leading-relaxed font-light text-lg">
                  Operators should be able to identify an unhealthy agent and reach supporting evidence without scanning every log stream. Status summaries must be specific enough to guide action, while configuration forms should explain technical choices in context.
                </p>
                <div className="mt-6 pt-6 border-t border-white/5">
                  <p className="text-white font-medium text-lg leading-relaxed">
                    Validation should test whether users can move from fleet alert to probable cause, then verify the diagnosis in logs or run history without losing the selected agent and workflow context.
                  </p>
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-neutral-900 border border-white/5 shadow-lg shadow-black/50 flex flex-col justify-center">
                <h4 className="text-xl font-medium text-white mb-6">Success Metrics Strategy</h4>
                <div className="space-y-4 w-full">
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-white/60 font-light">Configuration Completion</span>
                    <span className="text-emerald-400 font-mono text-sm">Measure</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-white/60 font-light">Time to Probable Cause</span>
                    <span className="text-emerald-400 font-mono text-sm">Compare</span>
                  </div>
                  <div className="flex justify-between items-center pb-2">
                    <span className="text-white/60 font-light">Alerts Leading to Investigation</span>
                    <span className="text-emerald-400 font-mono text-sm">Observe</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="p-8 rounded-3xl bg-emerald-900/10 border border-emerald-500/20 text-left">
              <h4 className="text-sm font-medium text-emerald-300 mb-4 font-mono uppercase tracking-widest">Suggested Product Signals</h4>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <li>
                  <div className="text-emerald-400 font-mono text-xs mb-2 bg-emerald-500/10 inline-block px-2 py-1 rounded">event: agent_configuration_completed</div>
                  <p className="text-white/60 text-sm font-light leading-relaxed">Measures whether users can finish setup and identifies the fields that create friction.</p>
                </li>
                <li>
                  <div className="text-emerald-400 font-mono text-xs mb-2 bg-emerald-500/10 inline-block px-2 py-1 rounded">event: alert_investigation_started</div>
                  <p className="text-white/60 text-sm font-light leading-relaxed">Distinguishes actionable alerts from warnings that users repeatedly dismiss.</p>
                </li>
                <li>
                  <div className="text-emerald-400 font-mono text-xs mb-2 bg-emerald-500/10 inline-block px-2 py-1 rounded">metric: alert_to_evidence_time</div>
                  <p className="text-white/60 text-sm font-light leading-relaxed">Tracks how quickly an operator reaches the relevant log, run, or configuration evidence.</p>
                </li>
              </ul>
            </motion.div>
          </motion.div>

          {/* User Flow */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants} className="mb-32">
            <motion.h3 variants={itemVariants} className="text-sm font-mono text-emerald-400 uppercase tracking-widest mb-16 inline-block pb-2 border-b border-emerald-600/30">06 // Investigation Flow</motion.h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 group">
               <div className="lg:col-span-5 relative">
                 <motion.div variants={itemVariants} className="sticky top-32">
                   <h4 className="text-3xl font-medium text-white mb-6">From Fleet Signal to Evidence</h4>
                   <p className="text-white/60 leading-relaxed font-light text-lg mb-8">
                      The primary investigation flow begins with a fleet-level signal, narrows to a workflow or agent, and ends with the logs, run history, knowledge source, or configuration responsible for the state.
                   </p>
                   <div className="p-6 rounded-2xl bg-neutral-900/5 border border-white/5 backdrop-blur-md">
                     <p className="text-white/60 font-mono text-sm leading-relaxed">
                        "Summaries should guide attention; evidence should remain one deliberate step away."
                     </p>
                   </div>
                 </motion.div>
               </div>
               
               <div className="lg:col-span-7">
                  <div className="relative border-l border-white/5 ml-6 md:ml-12 space-y-20 pb-8 pt-4">
                    <motion.div variants={itemVariants} className="relative pl-8 md:pl-16">
                      <div className="absolute w-8 h-8 rounded-full bg-neutral-900 border-2 border-indigo-800 text-indigo-400 left-[-17px] top-0 flex items-center justify-center text-xs font-mono text-white/50">1</div>
                      <h4 className="text-2xl font-medium text-white mb-4">Global Dashboard</h4>
                      <p className="text-white/60 font-light text-lg leading-relaxed">
                        The entry point summarizes active agents, usage, workflow health, and recent alerts. It answers whether the system needs attention before asking the operator to inspect individual runs.
                      </p>
                    </motion.div>
                    
                    <motion.div variants={itemVariants} className="relative pl-8 md:pl-16">
                      <div className="absolute w-8 h-8 rounded-full bg-neutral-900 border-2 border-indigo-800 text-indigo-400 left-[-17px] top-0 flex items-center justify-center text-xs font-mono text-white/50">2</div>
                      <h4 className="text-2xl font-medium text-white mb-4">Swarm Activity Index</h4>
                      <p className="text-white/60 font-light text-lg leading-relaxed">
                        Workflow and swarm views show task status, agent ownership, dependencies, and run progress for a shared objective. This connects a fleet-level warning to the work currently in motion.
                      </p>
                    </motion.div>
                    
                    <motion.div variants={itemVariants} className="relative pl-8 md:pl-16">
                      <div className="absolute w-8 h-8 rounded-full bg-emerald-900/30 border-2 border-emerald-500 left-[-17px] top-0 flex items-center justify-center text-xs font-mono text-emerald-400 animate-pulse">3</div>
                      <h4 className="text-2xl font-medium text-emerald-400 mb-4">Individual Agent Hub</h4>
                      <p className="text-white/60 font-light text-lg leading-relaxed mb-6">
                        Selecting an agent opens a consistent investigation workspace where configuration, knowledge sources, performance, execution history, and live activity can be reviewed together.
                      </p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-neutral-900 shadow-md border border-white/5 hover:border-emerald-500/30 transition-colors">
                          <h6 className="text-white font-medium text-sm mb-2">Live Logs</h6>
                          <p className="text-white/50 text-xs">Timestamped execution, tool, and error events for the selected run.</p>
                        </div>
                        <div className="p-4 rounded-xl bg-neutral-900 shadow-md border border-white/5 hover:border-emerald-500/30 transition-colors">
                          <h6 className="text-white font-medium text-sm mb-2">Knowledge Base</h6>
                          <p className="text-white/50 text-xs">The semantic RAG documents feeding the agent's context.</p>
                        </div>
                        <div className="p-4 rounded-xl bg-neutral-900 shadow-md border border-white/5 hover:border-emerald-500/30 transition-colors">
                          <h6 className="text-white font-medium text-sm mb-2">Parameter Tuning</h6>
                          <p className="text-white/50 text-xs">Adjusting temperature, API provider, and system prompts.</p>
                        </div>
                        <div className="p-4 rounded-xl bg-neutral-900 shadow-md border border-white/5 hover:border-emerald-500/30 transition-colors">
                          <h6 className="text-white font-medium text-sm mb-2">Pipeline History</h6>
                          <p className="text-white/50 text-xs">Historical ledger of all previous successful and failed tasks.</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
               </div>
            </div>
          </motion.div>

          {/* Visual Execution Gallery */}
          <div className="mb-32">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants} className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div>
                <motion.h3 variants={itemVariants} className="text-sm font-mono text-emerald-400 uppercase tracking-widest inline-block pb-2 border-b border-emerald-600/30">07 // Full Product System</motion.h3>
                <motion.h2 variants={itemVariants} className="text-4xl text-white font-light mt-8">A Complete Operational Workspace</motion.h2>
              </div>
              <motion.p variants={itemVariants} className="text-white/50 font-mono text-sm">Click any frame to examine.</motion.p>
            </motion.div>

            <div className="space-y-32">

                {/* Operations & Monitoring */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants}>
                   <div className="flex items-center gap-4 mb-12">
                     <div className="h-[1px] bg-emerald-500/100/10 flex-grow" />
                     <h4 className="text-xl font-medium text-emerald-300 px-4 font-mono">1 / Global Monitoring & Execution</h4>
                     <div className="h-[1px] bg-emerald-500/100/10 flex-grow" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <ZoomableImage src="/Agentic14 - AI Agent Orchestration Dashboard/AgentOS - Home Dashboard.png" alt="Home Dashboard" onClick={openImage} />
                    <ZoomableImage src="/Agentic14 - AI Agent Orchestration Dashboard/AgentOS - Cluster Nodes.png" alt="Cluster Nodes" onClick={openImage} />
                    <ZoomableImage src="/Agentic14 - AI Agent Orchestration Dashboard/AgentOS - GPU Cluster Detail.png" alt="GPU Clusters" onClick={openImage} />
                    <ZoomableImage src="/Agentic14 - AI Agent Orchestration Dashboard/AgentOS - Model Performance.png" alt="Model Performance" onClick={openImage} />
                    <ZoomableImage src="/Agentic14 - AI Agent Orchestration Dashboard/AgentOS - Token Usage.png" alt="Token Usage" onClick={openImage} />
                    <ZoomableImage src="/Agentic14 - AI Agent Orchestration Dashboard/Recent Alerts.png" alt="Recent Alerts" onClick={openImage} />
                  </div>
                </motion.div>

                {/* Agent & Workflows */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants}>
                   <div className="flex items-center gap-4 mb-12">
                     <div className="h-[1px] bg-emerald-500/100/10 flex-grow" />
                     <h4 className="text-xl font-medium text-emerald-300 px-4 font-mono">2 / Agent Identity & Workflows</h4>
                     <div className="h-[1px] bg-emerald-500/100/10 flex-grow" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <ZoomableImage src="/Agentic14 - AI Agent Orchestration Dashboard/AgentOS - All Agents.png" alt="All Agents" onClick={openImage} />
                    <ZoomableImage src="/Agentic14 - AI Agent Orchestration Dashboard/Create New Agent.png" alt="Create Agent" onClick={openImage} />
                    <ZoomableImage src="/Agentic14 - AI Agent Orchestration Dashboard/AgentOS - Agent Detail.png" alt="Agent Detail" onClick={openImage} />
                    <ZoomableImage src="/Agentic14 - AI Agent Orchestration Dashboard/AgentOS - Edit Agent.png" alt="Edit Agent" onClick={openImage} />
                    <ZoomableImage src="/Agentic14 - AI Agent Orchestration Dashboard/AgentOS - Task Detail.png" alt="Task Detail" onClick={openImage} />
                    <ZoomableImage src="/Agentic14 - AI Agent Orchestration Dashboard/AgentOS - Swarm Activity.png" alt="Swarm Activity" onClick={openImage} />
                    <ZoomableImage src="/Agentic14 - AI Agent Orchestration Dashboard/AgentOS - Workflow List.png" alt="Workflows" onClick={openImage} />
                    <ZoomableImage src="/Agentic14 - AI Agent Orchestration Dashboard/AgentOS - Workflow Run History.png" alt="Workflow Runs" onClick={openImage} />
                    <ZoomableImage src="/Agentic14 - AI Agent Orchestration Dashboard/AgentOS - Pipeline Runs.png" alt="Pipeline Runs" onClick={openImage} />
                  </div>
                </motion.div>

                {/* Telemetry & Logs */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants}>
                   <div className="flex items-center gap-4 mb-12">
                     <div className="h-[1px] bg-emerald-500/100/10 flex-grow" />
                     <h4 className="text-xl font-medium text-emerald-300 px-4 font-mono">3 / Telemetry & Observations</h4>
                     <div className="h-[1px] bg-emerald-500/100/10 flex-grow" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <ZoomableImage src="/Agentic14 - AI Agent Orchestration Dashboard/AgentOS - Live Log Stream.png" alt="Live Log Stream" onClick={openImage} />
                    <ZoomableImage src="/Agentic14 - AI Agent Orchestration Dashboard/AgentOS - Agent Logs.png" alt="Agent Logs" onClick={openImage} />
                    <ZoomableImage src="/Agentic14 - AI Agent Orchestration Dashboard/AgentOS - Inference Jobs.png" alt="Inference Jobs" onClick={openImage} />
                  </div>
                </motion.div>

                {/* Knowledge Base */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants}>
                   <div className="flex items-center gap-4 mb-12">
                     <div className="h-[1px] bg-emerald-500/100/10 flex-grow" />
                     <h4 className="text-xl font-medium text-emerald-300 px-4 font-mono">4 / Knowledge Base & RAG</h4>
                     <div className="h-[1px] bg-emerald-500/100/10 flex-grow" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <ZoomableImage src="/Agentic14 - AI Agent Orchestration Dashboard/AgentOS - KB Settings.png" alt="KB Settings" onClick={openImage} />
                    <ZoomableImage src="/Agentic14 - AI Agent Orchestration Dashboard/AgentOS - KB Semantic Search.png" alt="KB Search" onClick={openImage} />
                    <ZoomableImage src="/Agentic14 - AI Agent Orchestration Dashboard/AgentOS - KB Document Preview.png" alt="Document Preview" onClick={openImage} />
                    <ZoomableImage src="/Agentic14 - AI Agent Orchestration Dashboard/AgentOS - KB Upload Modal.png" alt="Upload Modals" onClick={openImage} />
                  </div>
                </motion.div>
                
                {/* Settings & Billing */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants}>
                   <div className="flex items-center gap-4 mb-12">
                     <div className="h-[1px] bg-emerald-500/100/10 flex-grow" />
                     <h4 className="text-xl font-medium text-emerald-300 px-4 font-mono">5 / Hub Settings & Billing</h4>
                     <div className="h-[1px] bg-emerald-500/100/10 flex-grow" />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <ZoomableImage src="/Agentic14 - AI Agent Orchestration Dashboard/AgentOS - Settings_ Workspace.png" alt="Workspace" onClick={openImage} />
                    <ZoomableImage src="/Agentic14 - AI Agent Orchestration Dashboard/AgentOS - Settings_ API Providers.png" alt="API Providers" onClick={openImage} />
                    <ZoomableImage src="/Agentic14 - AI Agent Orchestration Dashboard/AgentOS - Settings_ Team Members.png" alt="Team Members" onClick={openImage} />
                    <ZoomableImage src="/Agentic14 - AI Agent Orchestration Dashboard/AgentOS - Settings_ Team Members-1.png" alt="Team Modal" onClick={openImage} />
                    <ZoomableImage src="/Agentic14 - AI Agent Orchestration Dashboard/AgentOS - Settings_ Billing.png" alt="Billing" onClick={openImage} />
                    <ZoomableImage src="/Agentic14 - AI Agent Orchestration Dashboard/AgentOS - Pricing & Upgrade.png" alt="Pricing" onClick={openImage} />
                    <ZoomableImage src="/Agentic14 - AI Agent Orchestration Dashboard/AgentOS - Checkout.png" alt="Checkout" onClick={openImage} />
                    <ZoomableImage src="/Agentic14 - AI Agent Orchestration Dashboard/AgentOS - Payment Success.png" alt="Payment Success" onClick={openImage} />
                    <ZoomableImage src="/Agentic14 - AI Agent Orchestration Dashboard/AgentOS - User Profile.png" alt="User Profile" onClick={openImage} />
                    <ZoomableImage src="/Agentic14 - AI Agent Orchestration Dashboard/AgentOS - Notifications.png" alt="Notifications" onClick={openImage} />
                  </div>
                </motion.div>

                {/* System States */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants}>
                   <div className="flex items-center gap-4 mb-12">
                     <div className="h-[1px] bg-emerald-500/100/10 flex-grow" />
                     <h4 className="text-xl font-medium text-emerald-300 px-4 font-mono">6 / Error States & System Responses</h4>
                     <div className="h-[1px] bg-emerald-500/100/10 flex-grow" />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <ZoomableImage src="/Agentic14 - AI Agent Orchestration Dashboard/AgentOS - Delete Agent Modal.png" alt="Delete Agent" onClick={openImage} />
                    <ZoomableImage src="/Agentic14 - AI Agent Orchestration Dashboard/AgentOS - Test Agent Modal.png" alt="Test Agent" onClick={openImage} />
                    <ZoomableImage src="/Agentic14 - AI Agent Orchestration Dashboard/AgentOS - No Data.png" alt="No Data" onClick={openImage} />
                    <ZoomableImage src="/Agentic14 - AI Agent Orchestration Dashboard/AgentOS - No Results.png" alt="No Results" onClick={openImage} />
                    <ZoomableImage src="/Agentic14 - AI Agent Orchestration Dashboard/AgentOS - Not Found.png" alt="404 Error" onClick={openImage} />
                    <ZoomableImage src="/Agentic14 - AI Agent Orchestration Dashboard/AgentOS - Server Error.png" alt="Server Error" onClick={openImage} />
                  </div>
                </motion.div>
                
                {/* Landing Page & Auth */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants}>
                   <div className="flex items-center gap-4 mb-12">
                     <div className="h-[1px] bg-emerald-500/100/10 flex-grow" />
                     <h4 className="text-xl font-medium text-emerald-300 px-4 font-mono">7 / Landing Page & Authentication</h4>
                     <div className="h-[1px] bg-emerald-500/100/10 flex-grow" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="lg:col-span-4">
                       <ZoomableImage src="/Agentic14 - AI Agent Orchestration Dashboard/AgentOS - Orchestrate AI Agents At Scale.png" alt="Landing Page" onClick={openImage} />
                    </div>
                    <ZoomableImage src="/Agentic14 - AI Agent Orchestration Dashboard/AgentOS - Sign In.png" alt="Sign In" onClick={openImage} />
                    <ZoomableImage src="/Agentic14 - AI Agent Orchestration Dashboard/AgentOS - Sign Up.png" alt="Sign Up" onClick={openImage} />
                    <ZoomableImage src="/Agentic14 - AI Agent Orchestration Dashboard/AgentOS - Forgot Password.png" alt="Forgot Password" onClick={openImage} />
                    <ZoomableImage src="/Agentic14 - AI Agent Orchestration Dashboard/AgentOS - Onboarding Guide.png" alt="Onboarding Guide" onClick={openImage} />
                  </div>
                </motion.div>

            </div>
          </div>

           <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants} className="py-24 text-center border-t border-white/5 bg-gradient-to-t from-indigo-500/5 to-transparent rounded-b-[3rem] px-4 -mx-4 md:-mx-12 lg:-mx-24 -mb-12">
              <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl text-white font-sans tracking-tight mb-6">ORCHESTRATION COMPLETE</motion.h2>
              <motion.p variants={itemVariants} className="text-white/60 font-light text-lg">Thank you for exploring the Agentic14 case study.</motion.p>
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
