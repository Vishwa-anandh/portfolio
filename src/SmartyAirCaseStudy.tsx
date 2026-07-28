import React, { useState, useEffect } from "react";
import { Project } from "./data/projects";
import { motion, AnimatePresence, useMotionValue, useTransform } from "motion/react";
import { ImageViewer } from "./components/ImageViewer";

// A high-tech IoT dashboard mockup for the hero section
function HeroIndustrialMockup({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useTransform(mouseY, [0, 1], [3, -3]);
  const rotateY = useTransform(mouseX, [0, 1], [-5, 5]);

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
    <div className={`relative w-full max-w-[1240px] mx-auto mt-0 md:mt-4 ${className}`} style={{ perspective: "2500px" }}>
      <motion.div 
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        className="relative mx-auto w-full transition-transform ease-out duration-300"
      >
        {/* Deep ambient glow behind */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-blue-800/30 blur-[120px] opacity-80"
          style={{ transform: "translateZ(-150px)" }}
        />

        {/* Floating Data Display Behind */}
        <div 
          className="hidden md:block absolute -right-12 -top-12 w-64 h-36 rounded-xl bg-[#050505] border border-white/5 shadow-[0_0_30px_rgba(0,0,0,0.8)] z-[-1]"
          style={{ transform: "translateZ(-60px) rotate(4deg)" }}
        >
           <div className="h-8 border-b border-white/5 bg-[#111] flex items-center px-4 justify-between">
              <span className="text-[10px] text-cyan-400 font-mono">SYS_STATUS // ACTIVE</span>
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse"></div>
           </div>
           <div className="p-4 space-y-4">
              <div className="flex justify-between items-center">
                 <span className="text-xs text-white/50 font-mono">COMPRESSOR_01</span>
                 <span className="text-xs text-green-400 font-mono">98.4%</span>
              </div>
              <div className="flex justify-between items-center">
                 <span className="text-xs text-white/50 font-mono">COMPRESSOR_02</span>
                 <span className="text-xs text-amber-400 font-mono">82.1%</span>
              </div>
              <div className="flex justify-between items-center">
                 <span className="text-xs text-white/50 font-mono">COMPRESSOR_03</span>
                 <span className="text-xs text-cyan-400 font-mono">100%</span>
              </div>
           </div>
        </div>

        {/* Main Interface Window */}
        <div 
          className="relative rounded-2xl md:rounded-[1rem] overflow-hidden bg-[#0A0A0A] border border-white/5 flex flex-col z-10"
          style={{
            transform: "translateZ(0px)",
            boxShadow: '0 40px 80px -20px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05) inset'
          }}
        >
          {/* Top Bar matching dark theme */}
          <div className="h-8 md:h-10 border-b border-white/5 bg-[#111] flex items-center px-4 gap-2">
            <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-rose-500/80"></div>
            <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-amber-500/80"></div>
            <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-emerald-500/100/80"></div>
            
            <div className="flex-grow flex justify-center">
               <div className="text-[10px] md:text-xs text-white/30 font-mono tracking-widest">SMARTYAIR_CENTRAL_COMMAND</div>
            </div>
            
            <div className="w-8"></div>
          </div>

          <div className="relative w-full aspect-[16/10] md:aspect-[16/9] bg-[#0A0A0A] overflow-hidden">
             {children}
             {/* Subtle internal reflection and scanlines overlay for industrial feel */}
             <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none mix-blend-overlay" />
             <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-[length:100%_4px] pointer-events-none opacity-20" />
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
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`relative group cursor-zoom-in overflow-hidden shadow-2xl shadow-black/50 bg-neutral-900 border border-white/5 ${className || "rounded-xl"}`}
      onClick={() => onClick(src, alt)}
    >
      <div className="absolute inset-0 bg-black/0 group-hover:bg-neutral-900/5 transition-colors duration-300 z-10" />
      <img src={src} alt={alt} loading="lazy" decoding="async" fetchPriority="low" className="w-full h-auto object-cover relative z-0 opacity-100" />
    </motion.div>
  );
}

function ModernBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 mix-blend-screen">
      {/* Industrial Dark Grid */}
      <div className="absolute inset-0 bg-[#050505]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:32px_32px] md:bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_50%,#000_10%,transparent_80%)] opacity-40" />
      
      {/* Static Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none blur-[100px] opacity-20 bg-[radial-gradient(circle,rgba(6,182,212,0.1)_0%,rgba(59,130,246,0.02)_50%,transparent_70%)]" />
      
      {/* Static light leaks */}
      <div className="absolute -top-[20%] right-[10%] w-[40%] h-[50%] bg-blue-900/10 rounded-full blur-[140px]" />
    </div>
  );
}

export default function SmartyAirCaseStudy({ project }: { project: Project }) {
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

      {/* Wrapping in an inverted theme forcing dark mode look regardless of system */}
      <div className="case-study-shell w-full bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/5 text-white/80 font-sans mt-8 pt-12 lg:pt-24 rounded-[3rem] px-4 sm:px-6 lg:px-8 xl:px-10 mb-12 shadow-[0_0_80px_-20px_rgba(6,182,212,0.1)] relative overflow-hidden">
        
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
              <div className="inline-block px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-mono uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(6,182,212,0.2)]">Case Study</div>
              <h1 className="text-5xl md:text-7xl font-sans tracking-tighter text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-500">{project.name}</h1>
              <p className="text-2xl md:text-3xl font-light max-w-2xl leading-tight text-white/60 mb-12">
                An industrial monitoring workspace that helps operators scan equipment health, compare performance, investigate anomalies, and plan maintenance from one interface.
              </p>
              
              <div className="flex flex-wrap gap-8 md:gap-16 pt-8 border-t border-white/5">
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/50 mb-2 font-mono">Platform</p>
                  <p className="text-lg text-white font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.8)]"></span>
                    Web / Tablet App
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/50 mb-2 font-mono">Timeline</p>
                  <p className="text-lg text-white font-medium flex items-center gap-2">
                    Feb 2024
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
                    <span className="px-3 py-1 rounded-full bg-neutral-900/5 border border-white/10 text-sm text-white/70">Data Dashboards</span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <div className="w-full relative group z-10 pt-4 lg:pt-0">
              <motion.div 
                variants={itemVariants}
                className="relative flex justify-center"
              >
                 <HeroIndustrialMockup className="transform transition-transform duration-500 hover:scale-[1.02]">
                   <img src="/SmartyAir - AI-Powered Industrial Monitoring Dashboard/Dashboard-9.png" loading="eager" decoding="async" fetchPriority="high" className="absolute inset-0 w-full h-full object-cover object-left-top cursor-zoom-in" alt="Hero Dashboard" onClick={() => openImage("/SmartyAir - AI-Powered Industrial Monitoring Dashboard/Dashboard-9.png", "Hero Dashboard")} />
                 </HeroIndustrialMockup>
              </motion.div>
            </div>
          </motion.div>

          <motion.hr initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={itemVariants} className="border-white/5 my-24" />

          {/* Project Overview */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants} className="mb-32">
            <motion.h3 variants={itemVariants} className="text-sm font-mono text-cyan-400 uppercase tracking-widest mb-16 inline-block pb-2 border-b border-cyan-500/30">01 // The Operating Context</motion.h3>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-left group">
              <div className="col-span-1 md:col-span-4">
                <h4 className="text-2xl font-light text-white group-hover:text-cyan-400 transition-colors">Make Machine Health Scannable</h4>
              </div>
              <div className="col-span-1 md:col-span-8 space-y-6">
                <p className="text-white/60 leading-relaxed font-light text-xl">
                  Plant operators may need to monitor several compressors at once while separating routine variation from conditions that deserve attention. That task becomes harder when status, history, maintenance, and reporting live in separate views or manual records.
                </p>
                <p className="text-white/60 leading-relaxed font-light text-xl">
                  SmartyAir groups fleet status, runtime, cycle count, performance trends, historical comparison, and service planning into a consistent hierarchy. Dark surfaces support prolonged monitoring, while status is communicated through labels and values as well as color.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Operator Research & Environmental Constraints */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants} className="mb-32">
            <motion.h3 variants={itemVariants} className="text-sm font-mono text-cyan-400 uppercase tracking-widest mb-16 inline-block pb-2 border-b border-cyan-500/30">02 // Operator Research & Constraints</motion.h3>

            <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
              <div className="lg:col-span-5 p-8 md:p-10 rounded-3xl bg-[#111] border border-cyan-500/20">
                <p className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-5">Research Plan</p>
                <h4 className="text-3xl font-light text-white mb-6">Validate the workflow with the people responsible for the machines</h4>
                <p className="text-white/60 leading-relaxed font-light text-lg mb-8">
                  The current concept is based on a task analysis of monitoring, diagnosis, maintenance, and handoff. Before treating those assumptions as findings, the next research round should involve control-room operators, maintenance engineers, and a reliability or safety lead.
                </p>
                <div className="p-5 rounded-2xl bg-cyan-950/30 border border-cyan-500/20">
                  <p className="text-cyan-100/80 text-sm leading-relaxed">
                    This case study does not claim completed field interviews. The plan below defines the evidence needed before product decisions are finalized.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-7 rounded-3xl bg-[#111] border border-white/5">
                  <div className="text-cyan-400 font-mono text-sm mb-5">01 / PARTICIPANTS</div>
                  <p className="text-white/70 leading-relaxed">Recruit operators from different shifts, maintenance engineers who diagnose faults, and a safety or reliability lead who defines escalation rules.</p>
                </div>
                <div className="p-7 rounded-3xl bg-[#111] border border-white/5">
                  <div className="text-cyan-400 font-mono text-sm mb-5">02 / CONTEXTUAL INQUIRY</div>
                  <p className="text-white/70 leading-relaxed">Observe shift handover, routine monitoring, alarm response, and maintenance coordination. Record the tools, workarounds, and evidence used at each step.</p>
                </div>
                <div className="p-7 rounded-3xl bg-[#111] border border-white/5">
                  <div className="text-cyan-400 font-mono text-sm mb-5">03 / QUESTIONS</div>
                  <p className="text-white/70 leading-relaxed">Learn how teams distinguish nuisance alerts from urgent conditions, decide ownership, verify a diagnosis, and preserve context during escalation.</p>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="p-8 md:p-12 rounded-[2rem] bg-[#0d0d0d] border border-white/5">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                <div>
                  <p className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-4">Environmental Design Inputs</p>
                  <h4 className="text-3xl font-light text-white">The interface has to work beyond a quiet desktop</h4>
                </div>
                <p className="text-white/50 max-w-xl leading-relaxed">These constraints are design requirements to validate on-site, not assumptions that should be hidden behind visual polish.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-6 rounded-2xl bg-black/30 border border-white/5">
                  <h5 className="text-white font-medium mb-3">Viewing Distance</h5>
                  <p className="text-white/55 text-sm leading-relaxed">Primary status and severity must remain legible at a seated workstation and on a shared control-room display. Dense detail is reserved for drill-down.</p>
                </div>
                <div className="p-6 rounded-2xl bg-black/30 border border-white/5">
                  <h5 className="text-white font-medium mb-3">Lighting and Glare</h5>
                  <p className="text-white/55 text-sm leading-relaxed">Dark surfaces reduce large bright areas, while text contrast, focus states, and charts must remain readable under low light and reflected overhead lighting.</p>
                </div>
                <div className="p-6 rounded-2xl bg-black/30 border border-white/5">
                  <h5 className="text-white font-medium mb-3">Noise, PPE, and Attention</h5>
                  <p className="text-white/55 text-sm leading-relaxed">Critical information cannot depend on sound, hover, or fine pointer control. Actions need visible labels, generous targets, and keyboard support.</p>
                </div>
                <div className="p-6 rounded-2xl bg-black/30 border border-white/5">
                  <h5 className="text-white font-medium mb-3">Safety and Accountability</h5>
                  <p className="text-white/55 text-sm leading-relaxed">AI guidance never suppresses a safety alert or makes the final operational decision. Acknowledgment, ownership, timestamps, and action history stay visible.</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Incident Journey */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants} className="mb-32">
            <motion.h3 variants={itemVariants} className="text-sm font-mono text-cyan-400 uppercase tracking-widest mb-16 inline-block pb-2 border-b border-cyan-500/30">03 // Incident Journey</motion.h3>

            <motion.div variants={itemVariants} className="p-8 md:p-12 rounded-[2rem] bg-gradient-to-br from-[#111] to-cyan-950/20 border border-cyan-500/20 mb-8">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 mb-12">
                <div className="max-w-3xl">
                  <p className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-4">Prototype Evaluation Scenario</p>
                  <h4 className="text-3xl md:text-4xl font-light text-white mb-5">Compressor 07 shows rising discharge temperature and declining efficiency</h4>
                  <p className="text-white/60 text-lg leading-relaxed">
                    This is a designed test scenario—not a reported production incident. It checks whether an operator can move from a fleet-level signal to evidence, ownership, and a safe next action without losing context.
                  </p>
                </div>
                <div className="shrink-0 rounded-2xl border border-red-500/30 bg-red-950/20 px-6 py-5">
                  <div className="text-red-300 font-mono text-xs uppercase tracking-widest mb-2">Priority</div>
                  <div className="text-white text-2xl font-medium">Critical</div>
                  <div className="text-white/50 text-sm mt-1">Multiple signals • Active</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {[
                  ["01", "Detect", "The fleet view raises Compressor 07 above healthy assets and shows severity, duration, and the signals outside their expected range."],
                  ["02", "Triage", "The operator confirms that temperature and efficiency changed together, then checks whether the alert is acknowledged or already owned."],
                  ["03", "Investigate", "Machine detail compares the current window with a stable period and connects telemetry with recent maintenance history."],
                  ["04", "Decide", "AI guidance suggests checks and explains its evidence. The operator chooses to monitor, assign maintenance, or escalate."],
                  ["05", "Handoff", "The decision, owner, timestamp, and notes remain attached to the incident for the next shift and the maintenance team."]
                ].map(([number, title, description]) => (
                  <div key={number} className="relative p-6 rounded-2xl bg-black/30 border border-white/5">
                    <div className="text-cyan-400 font-mono text-sm mb-6">{number}</div>
                    <h5 className="text-white text-lg font-medium mb-3">{title}</h5>
                    <p className="text-white/55 text-sm leading-relaxed">{description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Alert Prioritization */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants} className="mb-32">
            <motion.h3 variants={itemVariants} className="text-sm font-mono text-cyan-400 uppercase tracking-widest mb-16 inline-block pb-2 border-b border-cyan-500/30">04 // Alert Prioritization</motion.h3>

            <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-4">
                <h4 className="text-3xl font-light text-white mb-6">Rank alerts by operational risk—not by notification volume</h4>
                <p className="text-white/60 text-lg leading-relaxed mb-6">
                  The proposed queue sorts first by safety severity, then considers corroborating signals, duration, asset criticality, and whether someone already owns the issue. Recency is visible, but a new low-risk alert should not hide an older critical condition.
                </p>
                <p className="text-white/50 leading-relaxed">
                  Color reinforces the state but never carries it alone. Every alert includes a severity label, affected asset, location, start time, duration, contributing signals, acknowledgment state, and owner.
                </p>
              </div>

              <div className="lg:col-span-8 space-y-3">
                {[
                  ["Critical", "Immediate safety risk or rapid multi-signal deviation", "Persistent placement • acknowledgment and escalation required", "border-red-500/30 bg-red-950/20", "text-red-300"],
                  ["High", "Material performance degradation or repeated warning", "Top of the active queue • investigate during the current shift", "border-amber-500/30 bg-amber-950/20", "text-amber-300"],
                  ["Advisory", "Early drift, maintenance due, or a single low-confidence signal", "Non-interruptive • review and schedule follow-up", "border-cyan-500/30 bg-cyan-950/20", "text-cyan-300"],
                  ["Normal", "Operating within the expected range", "Visible in fleet status • no action required", "border-white/10 bg-white/[0.02]", "text-white/70"]
                ].map(([level, condition, response, surface, accent]) => (
                  <div key={level} className={`grid grid-cols-1 md:grid-cols-12 gap-4 items-center p-6 rounded-2xl border ${surface}`}>
                    <div className={`md:col-span-2 font-mono uppercase tracking-widest text-sm ${accent}`}>{level}</div>
                    <div className="md:col-span-5 text-white/75">{condition}</div>
                    <div className="md:col-span-5 text-white/50 text-sm">{response}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Prototype Iteration */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants} className="mb-32">
            <motion.h3 variants={itemVariants} className="text-sm font-mono text-cyan-400 uppercase tracking-widest mb-16 inline-block pb-2 border-b border-cyan-500/30">05 // Prototype Evaluation & Iteration</motion.h3>

            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="p-8 md:p-10 rounded-3xl bg-[#111] border border-white/5">
                <p className="text-xs font-mono uppercase tracking-widest text-white/40 mb-5">Initial Direction</p>
                <h4 className="text-2xl font-light text-white mb-6">A dashboard optimized for data availability</h4>
                <ul className="space-y-4">
                  <li className="flex gap-3 text-white/60 leading-relaxed"><span className="text-red-300">•</span> Severity, trend evidence, and the next action appeared in separate views.</li>
                  <li className="flex gap-3 text-white/60 leading-relaxed"><span className="text-red-300">•</span> Status depended too heavily on red, amber, and green.</li>
                  <li className="flex gap-3 text-white/60 leading-relaxed"><span className="text-red-300">•</span> AI recommendations could appear before the operator reviewed supporting signals.</li>
                </ul>
              </div>

              <div className="p-8 md:p-10 rounded-3xl bg-cyan-950/20 border border-cyan-500/30">
                <p className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-5">Revised Direction</p>
                <h4 className="text-2xl font-light text-white mb-6">An incident-first path from signal to accountable action</h4>
                <ul className="space-y-4">
                  <li className="flex gap-3 text-white/70 leading-relaxed"><span className="text-cyan-300">•</span> The alert summary groups severity, recency, deviation, ownership, and the primary action.</li>
                  <li className="flex gap-3 text-white/70 leading-relaxed"><span className="text-cyan-300">•</span> Labels, ordering, and persistent placement communicate state without relying on color.</li>
                  <li className="flex gap-3 text-white/70 leading-relaxed"><span className="text-cyan-300">•</span> Telemetry and history establish evidence before optional AI guidance proposes diagnostic checks.</li>
                </ul>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="p-8 rounded-3xl bg-[#0d0d0d] border border-white/5">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-4">
                  <p className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-4">Evaluation Method</p>
                  <h4 className="text-2xl font-light text-white mb-4">Internal scenario walkthrough completed; operator validation remains next</h4>
                  <p className="text-white/55 leading-relaxed">The incident scenario was used to expose gaps in hierarchy, evidence, and accountability. The revised prototype should now be tested with representative operators before these decisions are treated as validated.</p>
                </div>
                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-6 rounded-2xl bg-black/30 border border-white/5">
                    <div className="text-cyan-400 font-mono text-xs mb-3">TASK 01</div>
                    <p className="text-white/70 mb-2">Identify the machine requiring attention.</p>
                    <p className="text-white/40 text-sm">Observe scan path, time, and severity interpretation.</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-black/30 border border-white/5">
                    <div className="text-cyan-400 font-mono text-xs mb-3">TASK 02</div>
                    <p className="text-white/70 mb-2">Explain the evidence behind the alert.</p>
                    <p className="text-white/40 text-sm">Check whether trend, history, and confidence are understood.</p>
                  </div>
                  <div className="p-6 rounded-2xl bg-black/30 border border-white/5">
                    <div className="text-cyan-400 font-mono text-xs mb-3">TASK 03</div>
                    <p className="text-white/70 mb-2">Choose, assign, and hand off the next action.</p>
                    <p className="text-white/40 text-sm">Observe safety, ownership, and context preservation.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Core Features */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants} className="mb-32">
            <motion.h3 variants={itemVariants} className="text-sm font-mono text-cyan-400 uppercase tracking-widest mb-16 inline-block pb-2 border-b border-cyan-500/30">06 // Key Instrumentation</motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div variants={itemVariants} className="p-8 rounded-2xl bg-[#111] border border-white/5 hover:bg-[#1a1a1a] hover:border-cyan-500/20 transition-all duration-300">
                 <div className="w-12 h-12 rounded-xl bg-neutral-900/5 text-cyan-400 flex items-center justify-center mb-6 text-xl font-mono">01</div>
                 <h4 className="text-xl font-medium text-white mb-4">Live Performance Matrix</h4>
                 <p className="text-white/60 font-light leading-relaxed">Fleet cards and dashboard summaries prioritize current status, utilization, runtime, cycle count, and performance trends so operators can decide which machine needs investigation.</p>
              </motion.div>
              <motion.div variants={itemVariants} className="p-8 rounded-2xl bg-[#111] border border-white/5 hover:bg-[#1a1a1a] hover:border-cyan-500/20 transition-all duration-300">
                 <div className="w-12 h-12 rounded-xl bg-neutral-900/5 text-cyan-400 flex items-center justify-center mb-6 text-xl font-mono">02</div>
                 <h4 className="text-xl font-medium text-white mb-4">AI Diagnostic Agent</h4>
                 <p className="text-white/60 font-light leading-relaxed">The AI recommendation panel brings anomaly context, historical patterns, and suggested checks into a conversational view. Recommendations support an engineer's diagnosis rather than presenting an automatic decision.</p>
              </motion.div>
              <motion.div variants={itemVariants} className="p-8 rounded-2xl bg-[#111] border border-white/5 hover:bg-[#1a1a1a] hover:border-cyan-500/20 transition-all duration-300">
                 <div className="w-12 h-12 rounded-xl bg-neutral-900/5 text-cyan-400 flex items-center justify-center mb-6 text-xl font-mono">03</div>
                 <h4 className="text-xl font-medium text-white mb-4">Lifecycle Management</h4>
                 <p className="text-white/60 font-light leading-relaxed">Each machine profile connects telemetry with historical comparison, service schedules, reports, and setup information. QR-assisted device addition reduces manual identification during onboarding.</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Validation & Measurement */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants} className="mb-32">
            <motion.h3 variants={itemVariants} className="text-sm font-mono text-cyan-400 uppercase tracking-widest mb-16 inline-block pb-2 border-b border-cyan-500/30">07 // Validation & Measurement</motion.h3>
            
            <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 text-left">
              <div className="p-8 rounded-3xl bg-[#111] border border-cyan-500/20 shadow-lg shadow-black/50">
                <h4 className="text-xl font-medium text-cyan-400 mb-4 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span> Key Design Hypothesis</h4>
                <p className="text-white/70 leading-relaxed font-light text-lg">
                  A fleet overview should help an operator identify the machine that needs attention without comparing several reports. Status, severity, recency, and the most relevant performance signal must be visible before drill-down.
                </p>
                <div className="mt-6 pt-6 border-t border-white/5">
                  <p className="text-white font-medium text-lg leading-relaxed">
                    Validation should compare the dashboard with the existing monitoring workflow and test whether operators can identify an abnormal machine, explain why it is abnormal, and choose the next action.
                  </p>
                </div>
              </div>

              <div className="p-8 rounded-3xl bg-[#111] border border-white/5 shadow-lg shadow-black/50 flex flex-col justify-center">
                <h4 className="text-xl font-medium text-white mb-6">Success Metrics Strategy</h4>
                <div className="space-y-4 w-full">
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-white/60 font-light">Time to Identify Abnormal Equipment</span>
                    <span className="text-cyan-400 font-mono text-sm">Compare</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-white/60 font-light">Correct Severity Interpretation</span>
                    <span className="text-cyan-400 font-mono text-sm">Validate</span>
                  </div>
                  <div className="flex justify-between items-center pb-2">
                    <span className="text-white/60 font-light">Alert to Investigation</span>
                    <span className="text-cyan-400 font-mono text-sm">Observe</span>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="p-8 rounded-3xl bg-cyan-900/10 border border-cyan-500/20 text-left">
              <h4 className="text-sm font-medium text-cyan-300 mb-4 font-mono uppercase tracking-widest">Suggested Product Signals</h4>
              <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <li>
                  <div className="text-cyan-400 font-mono text-xs mb-2 bg-cyan-500/10 inline-block px-2 py-1 rounded">event: recommendation_opened</div>
                  <p className="text-white/60 text-sm font-light leading-relaxed">Shows which anomaly types lead operators to request AI-assisted guidance.</p>
                </li>
                <li>
                  <div className="text-cyan-400 font-mono text-xs mb-2 bg-cyan-500/10 inline-block px-2 py-1 rounded">event: historical_comparison_opened</div>
                  <p className="text-white/60 text-sm font-light leading-relaxed">Measures when historical trends are used to support an active investigation.</p>
                </li>
                <li>
                  <div className="text-cyan-400 font-mono text-xs mb-2 bg-cyan-500/10 inline-block px-2 py-1 rounded">metric: alert_to_action_time</div>
                  <p className="text-white/60 text-sm font-light leading-relaxed">Tracks the time between opening an alert and starting a diagnostic or maintenance action.</p>
                </li>
              </ul>
            </motion.div>
          </motion.div>

          {/* Visual Gallery */}
          <div className="mb-32">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants} className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div>
                <motion.h3 variants={itemVariants} className="text-sm font-mono text-cyan-400 uppercase tracking-widest inline-block pb-2 border-b border-cyan-500/30">08 // System Schematics</motion.h3>
                <motion.h2 variants={itemVariants} className="text-4xl text-white font-light mt-8">A Consistent Monitoring System</motion.h2>
              </div>
              <motion.p variants={itemVariants} className="text-white/50 font-mono text-sm">Click any frame to examine.</motion.p>
            </motion.div>

            <div className="space-y-32">

                {/* Main Operations */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants}>
                   <div className="flex items-center gap-4 mb-12">
                     <div className="h-[1px] bg-cyan-500/10 flex-grow" />
                     <h4 className="text-xl font-medium text-cyan-400 px-4 font-mono">1 / Core Dashboards</h4>
                     <div className="h-[1px] bg-cyan-500/10 flex-grow" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ZoomableImage src="/SmartyAir - AI-Powered Industrial Monitoring Dashboard/Dashboard - Performance.png" alt="Performance Dashboard" onClick={openImage} />
                    <ZoomableImage src="/SmartyAir - AI-Powered Industrial Monitoring Dashboard/Dashboard - Cycle Count.png" alt="Cycle Count Overview" onClick={openImage} />
                    <ZoomableImage src="/SmartyAir - AI-Powered Industrial Monitoring Dashboard/Dashboard - Runtime Hours.png" alt="Runtime Hours" onClick={openImage} />
                    <ZoomableImage src="/SmartyAir - AI-Powered Industrial Monitoring Dashboard/Real Time Data - Machines- Status.png" alt="Real Time Status" onClick={openImage} />
                  </div>
                </motion.div>

                {/* Analytics & Machine Management */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants}>
                   <div className="flex items-center gap-4 mb-12">
                     <div className="h-[1px] bg-cyan-500/10 flex-grow" />
                     <h4 className="text-xl font-medium text-cyan-400 px-4 font-mono">2 / Machine Drill-down & Analytics</h4>
                     <div className="h-[1px] bg-cyan-500/10 flex-grow" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ZoomableImage src="/SmartyAir - AI-Powered Industrial Monitoring Dashboard/Compressor - Machines - Machine Details.png" alt="Machine Details" onClick={openImage} />
                    <ZoomableImage src="/SmartyAir - AI-Powered Industrial Monitoring Dashboard/Real Time Data - Machines - Graphic.png" alt="Hardware Telemetry" onClick={openImage} />
                    <ZoomableImage src="/SmartyAir - AI-Powered Industrial Monitoring Dashboard/Historical Data.png" alt="Historical Data" onClick={openImage} />
                    <ZoomableImage src="/SmartyAir - AI-Powered Industrial Monitoring Dashboard/Historical Data - Select Device Comparasion.png" alt="Device Comparison" onClick={openImage} />
                  </div>
                </motion.div>

                {/* AI & Reporting */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants}>
                   <div className="flex items-center gap-4 mb-12">
                     <div className="h-[1px] bg-cyan-500/10 flex-grow" />
                     <h4 className="text-xl font-medium text-cyan-400 px-4 font-mono">3 / AI Guidance & Maintenance</h4>
                     <div className="h-[1px] bg-cyan-500/10 flex-grow" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ZoomableImage src="/SmartyAir - AI-Powered Industrial Monitoring Dashboard/AI Recommendation.png" alt="AI Recommendation Panel" onClick={openImage} />
                    <ZoomableImage src="/SmartyAir - AI-Powered Industrial Monitoring Dashboard/AI Recommendation - Chat Room.png" alt="AI Diagnostics Chat" onClick={openImage} />
                    <ZoomableImage src="/SmartyAir - AI-Powered Industrial Monitoring Dashboard/Maintenance Schedule.png" alt="Maintenance Schedule" onClick={openImage} />
                    <ZoomableImage src="/SmartyAir - AI-Powered Industrial Monitoring Dashboard/General Report.png" alt="General Reporting" onClick={openImage} />
                  </div>
                </motion.div>
                
                {/* Onboarding & Admin */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants}>
                   <div className="flex items-center gap-4 mb-12">
                     <div className="h-[1px] bg-cyan-500/10 flex-grow" />
                     <h4 className="text-xl font-medium text-cyan-400 px-4 font-mono">4 / Authentication & Setup</h4>
                     <div className="h-[1px] bg-cyan-500/10 flex-grow" />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <ZoomableImage src="/SmartyAir - AI-Powered Industrial Monitoring Dashboard/On Boarding.png" alt="Onboarding" onClick={openImage} />
                    <ZoomableImage src="/SmartyAir - AI-Powered Industrial Monitoring Dashboard/Sign In.png" alt="Sign In" onClick={openImage} />
                    <ZoomableImage src="/SmartyAir - AI-Powered Industrial Monitoring Dashboard/Compressor - Grid.png" alt="Fleet Overview Grid" onClick={openImage} />
                    <ZoomableImage src="/SmartyAir - AI-Powered Industrial Monitoring Dashboard/Compressor - Add Device Qr Code.png" alt="Add via QR" onClick={openImage} />
                  </div>
                </motion.div>

            </div>
          </div>

           <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants} className="py-24 text-center border-t border-white/5 bg-gradient-to-t from-indigo-500/5 to-transparent rounded-b-[3rem] px-4 -mx-4 sm:-mx-6 lg:-mx-8 xl:-mx-10 -mb-12">
              <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl text-white font-sans tracking-tight mb-6">TELEMETRY COMPLETE</motion.h2>
              <motion.p variants={itemVariants} className="text-white/60 font-light text-lg">Thank you for reviewing the SmartyAir architectural overview.</motion.p>
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
