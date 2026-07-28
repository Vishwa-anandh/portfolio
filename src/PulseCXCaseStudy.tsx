import React, { useState, useEffect } from "react";
import { Project } from "./data/projects";
import { motion, AnimatePresence, useMotionValue, useTransform } from "motion/react";

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
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative mx-auto w-full transition-transform ease-out duration-300"
      >
        <div 
          className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-800/30 blur-[120px] opacity-80"
          style={{ transform: "translateZ(-150px)" }}
        />

        <div 
          className="relative rounded-2xl md:rounded-[1.5rem] overflow-hidden bg-neutral-950 border border-white/5 flex flex-col z-10"
          style={{ boxShadow: '0 40px 80px -20px rgba(0,0,0,1), 0 0 0 1px rgba(255,255,255,0.05) inset' }}
        >
          <div className="h-9 md:h-12 border-b border-white/5 bg-[#0e0e0e] flex items-center px-3 md:px-5 gap-4">
            <div className="flex gap-1.5 md:gap-2">
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-rose-500/80"></div>
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-amber-500/80"></div>
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-indigo-500/100/80"></div>
            </div>
            
            <div className="flex-grow flex justify-center">
               <div className="w-full max-w-sm h-6 md:h-7 bg-neutral-900/5 border border-white/5 rounded-md flex items-center justify-center gap-2 px-3 shadow-inner">
                 <span className="text-[10px] md:text-xs text-white/40 font-mono tracking-wide">pulsecx.dashboard.app</span>
               </div>
            </div>
            <div className="w-12 md:w-16"></div>
          </div>

          <div className="relative w-full h-auto aspect-[16/10] md:aspect-[16/9] bg-neutral-900 overflow-hidden">
             {children}
             <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none mix-blend-overlay" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function ZoomableImage({ src, alt, onClick, caption, className = "" }: { src: string, alt: string, onClick: (src: string, alt: string) => void, caption?: string, className?: string }) {
  return (
    <div className="flex flex-col gap-3">
      <motion.div 
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className={`relative group cursor-zoom-in overflow-hidden shadow-2xl bg-neutral-900 shadow-black/50 ${className || "rounded-2xl border border-white/5"}`}
        onClick={() => onClick(src, alt)}
      >
        <div className="absolute inset-0 bg-black/0 group-hover:bg-neutral-900/5 transition-colors duration-300 z-10" />
        <img src={src} alt={alt} loading="lazy" decoding="async" fetchPriority="low" className="w-full h-auto object-cover relative z-0 opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
      </motion.div>
      {caption && <p className="text-white/60 text-sm font-light px-3 py-2 border-l-2 border-indigo-500/40 bg-indigo-900/10 rounded-r">{caption}</p>}
    </div>
  );
}

function ModernBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 mix-blend-screen">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_50%,#000_10%,transparent_80%)] opacity-70" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none blur-3xl opacity-50 bg-[radial-gradient(circle,rgba(99,102,241,0.05)_0%,rgba(168,85,247,0.02)_40%,transparent_60%)]" />
      <div className="absolute -top-[20%] left-[-10%] w-[40%] h-[150%] bg-indigo-500/100/5 rotate-45 blur-[120px]" />
      <div className="absolute top-[20%] right-[-10%] w-[30%] h-[150%] bg-purple-600/5 -rotate-45 blur-[120px]" />
    </div>
  );
}

export default function PulseCXCaseStudy({ project }: { project: Project }) {
  const [activeImage, setActiveImage] = useState<{src: string, alt: string} | null>(null);

  const openImage = (src: string, alt: string) => setActiveImage({ src, alt });
  const closeImage = () => setActiveImage(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const } }
  };

  return (
    <>
      <ModernBackground />

      <div className="w-full bg-neutral-950/80 backdrop-blur-xl border border-white/5 text-white/80 font-sans mt-8 pt-12 lg:pt-24 rounded-[3rem] px-4 md:px-12 lg:px-24 mb-12 shadow-[0_0_80px_-20px_rgba(0,0,0,0.05)] relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/100/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] -z-10 pointer-events-none" />

        <div className="relative z-10">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants} className="mb-24 flex flex-col md:items-center text-left md:text-center max-w-4xl mx-auto pt-8">
            <motion.div variants={itemVariants} className="w-full">
              <div className="inline-block px-4 py-1.5 rounded-full border border-indigo-600/30 bg-indigo-800/20 text-indigo-300 text-xs font-mono uppercase tracking-widest mb-6">Case Study</div>
              <h1 className="text-5xl md:text-7xl font-sans tracking-tighter text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-100 via-blue-200 to-indigo-500">{project.name}</h1>
              <p className="text-2xl md:text-3xl font-light leading-tight text-white/60 mb-6 mx-auto">
                The centralized monitoring and incident response platform bridging the gap between engineering metrics and customer experience.
              </p>
              
              {/* Added Designed and Deployed Line */}
              <p className="text-lg md:text-xl font-medium text-indigo-400 mb-12">
                A fully functional, deployed application taking this concept from initial UX architecture to a live product environment.
              </p>
              
              <div className="flex flex-wrap justify-center gap-8 md:gap-16 pt-8 border-t border-white/5 mb-10 text-left md:text-center">
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/50 mb-2 font-mono">Platform</p>
                  <p className="text-lg text-white font-medium flex items-center justify-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span> Web & Dashboard
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-white/50 mb-2 font-mono">Timeline</p>
                  <p className="text-lg text-white font-medium flex items-center justify-center gap-2">{project.timeline}</p>
                </div>
              </div>

              {/* Added How This Was Built callout */}
              <div className="p-6 rounded-2xl bg-indigo-900/10 border border-indigo-500/20 text-white/70 text-sm leading-relaxed text-left max-w-3xl mx-auto">
                <strong className="text-indigo-300 block mb-2 font-medium">How this was built:</strong>
                As a product designer, my primary focus was on the UX, system architecture, and interface design. To demonstrate the viability of these concepts in a real-world environment, I then built and deployed this fully functional application using Google Antigravity as an AI-assisted development partner—bridging the gap between static design and a live, technical product.
              </div>

            </motion.div>
          </motion.div>

          <motion.hr initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={itemVariants} className="border-white/5 my-24" />

          {/* Live Interactive Demo */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants} className="mb-32">
            <motion.h3 variants={itemVariants} className="text-sm font-mono text-indigo-400 uppercase tracking-widest mb-10 inline-block pb-2 border-b border-indigo-600/30">Live Interactive Demo</motion.h3>
            <motion.div variants={itemVariants} className="relative rounded-2xl md:rounded-[1.5rem] overflow-hidden bg-neutral-950 border border-white/10 shadow-[0_0_80px_-20px_rgba(99,102,241,0.2)] w-full h-[600px] md:h-[800px] flex flex-col z-10 group">
              {/* Top Browser Bar */}
              <div className="h-9 md:h-12 border-b border-white/5 bg-[#0e0e0e] flex items-center px-3 md:px-5 gap-4 shrink-0 transition-colors group-hover:bg-[#111]">
                <div className="flex gap-1.5 md:gap-2">
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-rose-500/80"></div>
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-amber-500/80"></div>
                  <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-indigo-500/100/80"></div>
                </div>
                <div className="flex-grow flex justify-center">
                   <div className="w-full max-w-sm h-6 md:h-7 bg-neutral-900 border border-white/10 rounded-md flex items-center justify-center gap-2 px-3 shadow-inner">
                     <svg className="w-3 h-3 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                     <span className="text-[10px] md:text-xs text-white/50 font-mono tracking-wide">pulsecx-gold.vercel.app</span>
                   </div>
                </div>
                <div className="w-12 md:w-16"></div>
              </div>
              
              <div className="w-full h-full relative bg-neutral-900 flex-grow">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-white/30 font-mono text-sm gap-4 z-0">
                  <div className="w-8 h-8 rounded-full border-2 border-indigo-500/20 border-t-indigo-500 animate-spin"></div>
                  Connecting to deployment...
                </div>
                
                <iframe 
                  src="https://pulsecx-gold.vercel.app/" 
                  className="w-full h-full border-none relative z-10"
                  title="PulseCX Live Demo"
                  allow="fullscreen"
                />
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="mt-6 flex flex-col items-center justify-center">
              <p className="text-white/50 text-sm font-light text-center">
                Fully functional application deployed via Vercel. 
              </p>
              <div className="flex gap-4 mt-3 text-xs font-mono">
                <div className="px-3 py-1.5 rounded-md bg-indigo-900/20 border border-indigo-500/20 text-indigo-300">User: <span className="text-white">mark.bennet@pulsecx.com</span></div>
                <div className="px-3 py-1.5 rounded-md bg-indigo-900/20 border border-indigo-500/20 text-indigo-300">Pass: <span className="text-white">admin123</span></div>
              </div>
            </motion.div>
          </motion.div>

          {/* 00 The Problem */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants} className="mb-32">
            <motion.h3 variants={itemVariants} className="text-sm font-mono text-indigo-400 uppercase tracking-widest mb-16 inline-block pb-2 border-b border-indigo-600/30">00 // The Disconnected Reality</motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-left group">
              <div className="col-span-1 md:col-span-4">
                <h4 className="text-2xl font-light text-white group-hover:text-indigo-400 transition-colors">The Core Problem</h4>
              </div>
              <div className="col-span-1 md:col-span-8 space-y-6">
                <p className="text-white/60 leading-relaxed font-light text-xl">
                  Engineering teams had deep infrastructure metrics. Support teams had the customer complaints. But because these systems remained isolated, incidents were frequently discovered by frustrated users long before they triggered backend monitoring tools. We needed a platform that mapped technical anomalies directly to the user journeys they disrupted.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Success Metrics */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants} className="mb-32">
            <div className="p-8 md:p-12 rounded-[2rem] bg-neutral-900 border border-white/5 shadow-xl">
              <h4 className="text-xl font-medium text-white mb-8 border-b border-white/10 pb-4">Success Metrics Strategy</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h5 className="text-indigo-400 font-medium mb-3">Incident Detection Time</h5>
                  <p className="text-white/60 text-sm leading-relaxed">Reduce reliance on user-reported tickets by flagging journey-impactful anomalies earlier.</p>
                </div>
                <div>
                  <h5 className="text-indigo-400 font-medium mb-3">Alert Fatigue Ratio</h5>
                  <p className="text-white/60 text-sm leading-relaxed">Decrease the volume of non-actionable, low-confidence alerts sent to on-call engineers.</p>
                </div>
                <div>
                  <h5 className="text-indigo-400 font-medium mb-3">Mean Time to Resolution (MTTR)</h5>
                  <p className="text-white/60 text-sm leading-relaxed">Accelerate triage by routing actionable context (not just error codes) directly to ChatOps.</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 01 The Platform */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants} className="mb-32">
            <motion.h3 variants={itemVariants} className="text-sm font-mono text-indigo-400 uppercase tracking-widest mb-16 inline-block pb-2 border-b border-indigo-600/30">01 // The Platform</motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-left group">
              <div className="col-span-1 md:col-span-4">
                <h4 className="text-2xl font-light text-white group-hover:text-indigo-400 transition-colors">Monitor. Analyze. Resolve.</h4>
              </div>
              <div className="col-span-1 md:col-span-8 space-y-6">
                <p className="text-white/60 leading-relaxed font-light text-xl">
                  PulseCX is designed to provide teams with deep visibility into infrastructure health, API latency, SSL/DNS status, and mobile app performance. But raw metrics aren't enough. We needed a way to map these technical metrics directly to Customer Journeys.
                </p>
                <p className="text-white/60 leading-relaxed font-light text-xl">
                  When anomalies are detected, PulseCX generates alerts and escalates them into incidents, seamlessly routing them to the right teams via ChatOps integrations like Slack and Jira.
                </p>
                <p className="text-white/60 leading-relaxed font-light text-xl">
                  To accelerate resolution times, PulseCX features an integrated AI Chatbot powered by an LLM that I personally trained. This intelligent assistant parses raw JSON logs and historical incident data to offer instant diagnostic insights and remediation steps directly within the war room.
                </p>
              </div>
            </div>
          </motion.div>

          {/* 02 User Roles */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants} className="mb-32">
            <motion.h3 variants={itemVariants} className="text-sm font-mono text-indigo-400 uppercase tracking-widest mb-16 inline-block pb-2 border-b border-indigo-600/30">02 // Access & Roles</motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div variants={itemVariants} className="p-8 rounded-3xl bg-neutral-900 shadow-lg border border-white/5 hover:border-indigo-500/20 transition-all">
                 <h4 className="text-xl font-medium text-white mb-4">Global Admin</h4>
                 <p className="text-white/60 font-light leading-relaxed text-sm">Full read/write/delete access across all modules, including system administration and audit logs.</p>
              </motion.div>
              <motion.div variants={itemVariants} className="p-8 rounded-3xl bg-neutral-900 shadow-lg border border-white/5 hover:border-indigo-500/20 transition-all">
                 <h4 className="text-xl font-medium text-white mb-4">Ops Manager</h4>
                 <p className="text-white/60 font-light leading-relaxed text-sm">Focuses on operations, monitoring, and infrastructure health, with limited administration access.</p>
              </motion.div>
              <motion.div variants={itemVariants} className="p-8 rounded-3xl bg-neutral-900 shadow-lg border border-white/5 hover:border-indigo-500/20 transition-all">
                 <h4 className="text-xl font-medium text-white mb-4">Engineer</h4>
                 <p className="text-white/60 font-light leading-relaxed text-sm">Manages customer journeys, monitors APIs, and handles deep technical incident investigations.</p>
              </motion.div>
              <motion.div variants={itemVariants} className="p-8 rounded-3xl bg-neutral-900 shadow-lg border border-white/5 hover:border-indigo-500/20 transition-all">
                 <h4 className="text-xl font-medium text-white mb-4">Support Tier 1</h4>
                 <p className="text-white/60 font-light leading-relaxed text-sm">Read-only access to dashboards to triage frontline alerts before escalating to engineering.</p>
              </motion.div>
            </div>
            {/* Added Design Rationale */}
            <motion.div variants={itemVariants} className="mt-8 p-6 rounded-2xl bg-indigo-900/10 border border-indigo-500/20 text-white/70 text-sm leading-relaxed">
              <strong className="text-indigo-300">Design Rationale:</strong> By separating Support Tier 1 from Engineering access, we ensured frontline agents had the immediate, read-only visibility required for rapid triage without the systemic risk of accidental escalations or configuration changes during a live incident.
            </motion.div>
          </motion.div>

          {/* 03 Workflow */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants} className="mb-32">
            <motion.h3 variants={itemVariants} className="text-sm font-mono text-indigo-400 uppercase tracking-widest mb-16 inline-block pb-2 border-b border-indigo-600/30">03 // The Workflow</motion.h3>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 group">
               <div className="lg:col-span-5 relative">
                 <motion.div variants={itemVariants} className="sticky top-32">
                   <h4 className="text-3xl font-medium text-white mb-6">End-to-End Resolution</h4>
                   <p className="text-white/60 leading-relaxed font-light text-lg mb-8">
                     From data ingestion via synthetic monitoring to automated ticketing and resolution. PulseCX provides the complete lifecycle of modern incident response.
                   </p>
                 </motion.div>
               </div>
               
               <div className="lg:col-span-7">
                  <div className="relative border-l border-white/5 ml-6 md:ml-12 space-y-20 pb-8 pt-4">
                    <motion.div variants={itemVariants} className="relative pl-8 md:pl-16">
                      <div className="absolute w-8 h-8 rounded-full bg-neutral-900 border-2 border-indigo-800 text-indigo-400 left-[-17px] top-0 flex items-center justify-center text-xs font-mono">1</div>
                      <h4 className="text-2xl font-medium text-white mb-4">Data Ingestion</h4>
                      <p className="text-white/60 font-light text-lg leading-relaxed">Monitoring agents constantly ping APIs and run synthetic tests. Engineers use the Journey Builder to map out critical user flows like "Checkout Process".</p>
                    </motion.div>
                    
                    <motion.div variants={itemVariants} className="relative pl-8 md:pl-16">
                      <div className="absolute w-8 h-8 rounded-full bg-neutral-900 border-2 border-indigo-800 text-indigo-400 left-[-17px] top-0 flex items-center justify-center text-xs font-mono">2</div>
                      <h4 className="text-2xl font-medium text-white mb-4">Visualization & Analysis</h4>
                      <p className="text-white/60 font-light text-lg leading-relaxed">Data flows into role-tailored dashboards: Executive views for business metrics, Ops for system load, and Engineering for deep error traces.</p>
                    </motion.div>
                    
                    <motion.div variants={itemVariants} className="relative pl-8 md:pl-16">
                      <div className="absolute w-8 h-8 rounded-full bg-indigo-900/30 border-2 border-indigo-500 left-[-17px] top-0 flex items-center justify-center text-xs font-mono text-indigo-400 animate-pulse">3</div>
                      <h4 className="text-2xl font-medium text-indigo-400 mb-4">Anomaly Detection</h4>
                      <p className="text-white/60 font-light text-lg leading-relaxed mb-6">Alerts are generated when a SLA drops. Critical alerts escalate into the Incident Center.</p>
                    </motion.div>

                    {/* Added Trust Callout */}
                    <motion.div variants={itemVariants} className="relative pl-8 md:pl-16 mt-12">
                      <div className="p-6 rounded-2xl bg-neutral-900 border border-white/10 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 blur-3xl rounded-full" />
                        <h5 className="text-lg font-medium text-indigo-300 mb-2 flex items-center gap-2">
                          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                          Designing for Trust
                        </h5>
                        <p className="text-white/70 text-sm leading-relaxed">
                          To combat alert fatigue, the interface actively distinguishes between critical SLA breaches and low-confidence anomalies. By visually downgrading likely-false alarms and requiring manual escalation, the system calibrates engineer trust, ensuring that when a red alert fires, it is treated as an actual emergency rather than background noise.
                        </p>
                      </div>
                    </motion.div>

                  </div>
               </div>
            </div>
          </motion.div>

          {/* 03.5 Intended Impact */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants} className="mb-32">
            <motion.h3 variants={itemVariants} className="text-sm font-mono text-indigo-400 uppercase tracking-widest mb-16 inline-block pb-2 border-b border-indigo-600/30">03.5 // Intended Impact</motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-left group">
              <div className="col-span-1 md:col-span-4">
                <h4 className="text-2xl font-light text-white group-hover:text-indigo-400 transition-colors">Prioritizing User Disruption</h4>
              </div>
              <div className="col-span-1 md:col-span-8 space-y-6">
                <p className="text-white/60 leading-relaxed font-light text-xl">
                  While live telemetry data is pending, the intended architectural outcome is a dramatic reduction in incident detection time. By surfacing the customer-impact severity alongside raw technical alerts, we stop treating every minor API blip as an emergency, allowing teams to prioritize fixes based on actual user disruption.
                </p>
              </div>
            </div>
          </motion.div>

          {/* 04 Gallery */}
          <div className="mb-32">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants} className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div>
                <motion.h3 variants={itemVariants} className="text-sm font-mono text-indigo-400 uppercase tracking-widest inline-block pb-2 border-b border-indigo-600/30">04 // Full Architecture</motion.h3>
                <motion.h2 variants={itemVariants} className="text-4xl text-white font-light mt-8">Dashboard Gallery</motion.h2>
              </div>
            </motion.div>

            <div className="space-y-32">
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants}>
                   <div className="flex items-center gap-4 mb-12">
                     <div className="h-[1px] bg-indigo-500/100/10 flex-grow" />
                     <h4 className="text-xl font-medium text-indigo-300 px-4 font-mono">Dashboards & Overview</h4>
                     <div className="h-[1px] bg-indigo-500/100/10 flex-grow" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Added annotation */}
                    <ZoomableImage src="/pulsecx/02_executive_dashboard.png" alt="Executive" onClick={openImage} caption="Designed for high-level scanability, abstracting raw logs into top-down infrastructure health and SLA compliance metrics." />
                    <ZoomableImage src="/pulsecx/03_operations_dashboard.png" alt="Operations" onClick={openImage} />
                    <ZoomableImage src="/pulsecx/04_engineering_dashboard.png" alt="Engineering" onClick={openImage} />
                    <ZoomableImage src="/pulsecx/14_analytics_hub.png" alt="Analytics" onClick={openImage} />
                  </div>
                </motion.div>

                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants}>
                   <div className="flex items-center gap-4 mb-12">
                     <div className="h-[1px] bg-indigo-500/100/10 flex-grow" />
                     <h4 className="text-xl font-medium text-indigo-300 px-4 font-mono">Journey & Synthetics</h4>
                     <div className="h-[1px] bg-indigo-500/100/10 flex-grow" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <ZoomableImage src="/pulsecx/05_journey_catalog.png" alt="Journey Catalog" onClick={openImage} />
                    <ZoomableImage src="/pulsecx/06_create_journey.png" alt="Create Journey" onClick={openImage} />
                    {/* Added annotation */}
                    <ZoomableImage src="/pulsecx/07_journey_builder.png" alt="Journey Builder" onClick={openImage} caption="A visual node-based editor allowing engineers to map critical user flows to underlying API dependencies." />
                    <ZoomableImage src="/pulsecx/08_monitoring_dashboard.png" alt="Monitoring Dashboard" onClick={openImage} />
                    <ZoomableImage src="/pulsecx/11_api_dashboard.png" alt="API Hub" onClick={openImage} />
                    <ZoomableImage src="/pulsecx/12_ssldns_hub.png" alt="SSL DNS Hub" onClick={openImage} />
                  </div>
                </motion.div>

                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants}>
                   <div className="flex items-center gap-4 mb-12">
                     <div className="h-[1px] bg-indigo-500/100/10 flex-grow" />
                     <h4 className="text-xl font-medium text-indigo-300 px-4 font-mono">Alerts, Incidents & ChatOps</h4>
                     <div className="h-[1px] bg-indigo-500/100/10 flex-grow" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Added annotation */}
                    <ZoomableImage src="/pulsecx/10_alerts_hub.png" alt="Alerts Hub" onClick={openImage} caption="Utilizes progressive disclosure to keep the war room interface clean, burying raw JSON traces behind the actionable incident summary." />
                    <ZoomableImage src="/pulsecx/09_incident_center.png" alt="Incident Center" onClick={openImage} />
                    <ZoomableImage src="/pulsecx/18_ai_chatbot.png" alt="AI Chatbot" onClick={openImage} caption="Powered by an LLM that I personally trained, the chatbot instantly synthesizes complex error traces into plain-English diagnostic summaries." />
                    <ZoomableImage src="/pulsecx/integrations.png" alt="Integrations" onClick={openImage} />
                  </div>
                </motion.div>

                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants}>
                   <div className="flex items-center gap-4 mb-12">
                     <div className="h-[1px] bg-indigo-500/100/10 flex-grow" />
                     <h4 className="text-xl font-medium text-indigo-300 px-4 font-mono">Administration</h4>
                     <div className="h-[1px] bg-indigo-500/100/10 flex-grow" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <ZoomableImage src="/pulsecx/15_administration_hub.png" alt="Admin Hub" onClick={openImage} />
                    <ZoomableImage src="/pulsecx/team_management.png" alt="Team Management" onClick={openImage} />
                    <ZoomableImage src="/pulsecx/audit_log.png" alt="Audit Log" onClick={openImage} />
                    <ZoomableImage src="/pulsecx/agents.png" alt="Agents" onClick={openImage} />
                  </div>
                </motion.div>
            </div>
          </div>

        </div>
      </div>

      <AnimatePresence>
        {activeImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 cursor-zoom-out"
            onClick={closeImage}
          >
            <motion.img 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={activeImage.src} 
              alt={activeImage.alt} 
              loading="eager"
              decoding="async"
              fetchPriority="high"
              className="max-w-[95vw] max-h-[95vh] object-contain rounded-xl shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
            <button className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors p-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
