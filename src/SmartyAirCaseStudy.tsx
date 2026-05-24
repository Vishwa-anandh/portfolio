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
          className="hidden md:block absolute -right-12 -top-12 w-64 h-36 rounded-xl bg-[#050505] border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.8)] z-[-1]"
          style={{ transform: "translateZ(-60px) rotate(4deg)" }}
        >
           <div className="h-8 border-b border-white/10 bg-[#111] flex items-center px-4 justify-between">
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
          className="relative rounded-2xl md:rounded-[1rem] overflow-hidden bg-[#0A0A0A] border border-white/10 flex flex-col z-10"
          style={{
            transform: "translateZ(0px)",
            boxShadow: '0 40px 80px -20px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.05) inset'
          }}
        >
          {/* Top Bar matching dark theme */}
          <div className="h-8 md:h-10 border-b border-white/5 bg-[#111] flex items-center px-4 gap-2">
            <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-rose-500/80"></div>
            <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-amber-500/80"></div>
            <div className="w-2 h-2 md:w-2.5 md:h-2.5 rounded-full bg-emerald-500/80"></div>
            
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
      className={`relative group cursor-zoom-in overflow-hidden shadow-2xl bg-neutral-900 border border-white/5 ${className || "rounded-xl"}`}
      onClick={() => onClick(src, alt)}
    >
      <div className="absolute inset-0 bg-black/0 group-hover:bg-white/5 transition-colors duration-300 z-10" />
      <img src={src} alt={alt} className="w-full h-auto object-cover relative z-0 opacity-100" />
    </motion.div>
  );
}

function ModernBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 mix-blend-screen">
      {/* Industrial Dark Grid */}
      <div className="absolute inset-0 bg-[#050505]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] md:bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_50%,#000_10%,transparent_80%)] opacity-40" />
      
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
      <div className="w-full bg-[#0a0a0a]/90 backdrop-blur-xl border border-white/5 text-neutral-300 font-sans mt-8 pt-12 lg:pt-24 rounded-[3rem] px-4 md:px-12 lg:px-24 mb-12 shadow-[0_0_80px_-20px_rgba(6,182,212,0.1)] relative overflow-hidden">
        
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
              <p className="text-2xl md:text-3xl font-light max-w-2xl leading-tight text-neutral-400 mb-12">
                An advanced industrial IoT dashboard focusing on real-time machine monitoring and AI-driven performance recommendations.
              </p>
              
              <div className="flex flex-wrap gap-8 md:gap-16 pt-8 border-t border-white/10">
                <div>
                  <p className="text-xs uppercase tracking-widest text-neutral-500 mb-2 font-mono">Platform</p>
                  <p className="text-lg text-white font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.8)]"></span>
                    Web / Tablet App
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-neutral-500 mb-2 font-mono">Timeline</p>
                  <p className="text-lg text-white font-medium flex items-center gap-2">
                    Feb 2024
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-neutral-500 mb-2 font-mono">Tools</p>
                  <div className="flex flex-wrap gap-3 mt-1">
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-neutral-300">Figma</span>
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-neutral-300">Data Dashboards</span>
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
                   <img src="/SmartyAir - AI-Powered Industrial Monitoring Dashboard/Dashboard-9.png" className="absolute inset-0 w-full h-full object-cover object-left-top cursor-zoom-in" alt="Hero Dashboard" onClick={() => openImage("/SmartyAir - AI-Powered Industrial Monitoring Dashboard/Dashboard-9.png", "Hero Dashboard")} />
                 </HeroIndustrialMockup>
              </motion.div>
            </div>
          </motion.div>

          <motion.hr initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={itemVariants} className="border-white/5 my-24" />

          {/* Project Overview */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants} className="mb-32">
            <motion.h3 variants={itemVariants} className="text-sm font-mono text-cyan-400 uppercase tracking-widest mb-16 inline-block pb-2 border-b border-cyan-500/30">01 // The Architecture</motion.h3>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-left group">
              <div className="col-span-1 md:col-span-4">
                <h4 className="text-2xl font-light text-white group-hover:text-cyan-400 transition-colors">Industrial Telemetry</h4>
              </div>
              <div className="col-span-1 md:col-span-8 space-y-6">
                <p className="text-neutral-400 leading-relaxed font-light text-xl">
                  SmartyAir functions as a central nervous system for factory floors and heavy machinery environments. Utilizing dark-mode aesthetics to reduce glare in industrial settings, the dashboard acts as a direct relay between IoT-enabled compressors and plant operators.
                </p>
                <p className="text-neutral-400 leading-relaxed font-light text-xl">
                  Instead of static spreadsheets, the interface processes real-time sensor streams mapping active cycles, temperatures, efficiencies, and pressure gradients. By translating complex industrial metrics into highly visible, actionable widgets, operators can optimize output and perform predictive maintenance instantly.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Core Features */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants} className="mb-32">
            <motion.h3 variants={itemVariants} className="text-sm font-mono text-cyan-400 uppercase tracking-widest mb-16 inline-block pb-2 border-b border-cyan-500/30">02 // Key Instrumentation</motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div variants={itemVariants} className="p-8 rounded-2xl bg-[#111] border border-white/5 hover:bg-[#1a1a1a] hover:border-cyan-500/20 transition-all duration-300">
                 <div className="w-12 h-12 rounded-xl bg-white/5 text-cyan-400 flex items-center justify-center mb-6 text-xl font-mono">01</div>
                 <h4 className="text-xl font-medium text-white mb-4">Live Performance Matrix</h4>
                 <p className="text-neutral-400 font-light leading-relaxed">Continuous data relays present operational efficiencies, compressor utilization, runtime statuses, and energy consumption metrics across intuitive, glanceable chart visualizations.</p>
              </motion.div>
              <motion.div variants={itemVariants} className="p-8 rounded-2xl bg-[#111] border border-white/5 hover:bg-[#1a1a1a] hover:border-cyan-500/20 transition-all duration-300">
                 <div className="w-12 h-12 rounded-xl bg-white/5 text-cyan-400 flex items-center justify-center mb-6 text-xl font-mono">02</div>
                 <h4 className="text-xl font-medium text-white mb-4">AI Diagnostic Agent</h4>
                 <p className="text-neutral-400 font-light leading-relaxed">Integrated AI capabilities process historical incident logs and ongoing anomalies, providing "chat-room" style recommendations to engineers—preventing mechanical failures before they arise.</p>
              </motion.div>
              <motion.div variants={itemVariants} className="p-8 rounded-2xl bg-[#111] border border-white/5 hover:bg-[#1a1a1a] hover:border-cyan-500/20 transition-all duration-300">
                 <div className="w-12 h-12 rounded-xl bg-white/5 text-cyan-400 flex items-center justify-center mb-6 text-xl font-mono">03</div>
                 <h4 className="text-xl font-medium text-white mb-4">Lifecycle Management</h4>
                 <p className="text-neutral-400 font-light leading-relaxed">Deep dive technical profiles for individual machines, combining documentation, scheduled service calendars, operational lifespans, and direct QR-code-based inventory addition protocols.</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Visual Gallery */}
          <div className="mb-32">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants} className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div>
                <motion.h3 variants={itemVariants} className="text-sm font-mono text-cyan-400 uppercase tracking-widest inline-block pb-2 border-b border-cyan-500/30">03 // System Schematics</motion.h3>
                <motion.h2 variants={itemVariants} className="text-4xl text-white font-light mt-8">Monitoring Terminals</motion.h2>
              </div>
              <motion.p variants={itemVariants} className="text-neutral-500 font-mono text-sm">Click any frame to examine.</motion.p>
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

           <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants} className="py-24 text-center border-t border-white/5 bg-gradient-to-t from-white/5 to-transparent rounded-b-[3rem] px-4 -mx-4 md:-mx-12 lg:-mx-24 -mb-12">
              <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl text-white font-sans tracking-tight mb-6">TELEMETRY COMPLETE</motion.h2>
              <motion.p variants={itemVariants} className="text-neutral-400 font-light text-lg">Thank you for reviewing the SmartyAir architectural overview.</motion.p>
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
