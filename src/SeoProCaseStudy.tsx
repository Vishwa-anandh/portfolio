import React, { useState, useEffect } from "react";
import { Project } from "./data/projects";
import { motion, AnimatePresence, useMotionValue, useTransform } from "motion/react";
import { ImageViewer } from "./components/ImageViewer";

// An elegant, floating glassmorphic showcase for the hero section
function HeroAestheticShowcase({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useTransform(mouseY, [0, 1], [4, -4]);
  const rotateY = useTransform(mouseX, [0, 1], [-8, 8]);

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
    <div className={`relative w-full max-w-[900px] mx-auto mt-12 md:mt-20 ${className}`} style={{ perspective: "2000px" }}>
      <motion.div 
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        className="relative mx-auto w-full transition-transform ease-out duration-300"
      >
        {/* Decorative background blur */}
        <div 
          className="absolute inset-0 bg-gradient-to-r from-neutral-500/30 to-neutral-700/30 blur-[100px] opacity-70"
          style={{ transform: "translateZ(-50px)" }}
        />
        
        {/* Main Dashboard Frame */}
        <div 
          className="relative rounded-xl md:rounded-3xl overflow-hidden bg-neutral-950 border border-white/10 shadow-2xl aspect-[16/10] z-10 p-1 md:p-2"
          style={{
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7), 0 0 0 1px rgba(255,255,255,0.05) inset'
          }}
        >
          <div className="relative w-full h-full rounded-lg md:rounded-2xl overflow-hidden bg-neutral-900 border border-white/5">
             {children}
             
             {/* Glass Reflection */}
             <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none mix-blend-overlay" />
             <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>
        </div>

        {/* Floating accents */}
        <div 
           className="absolute -right-8 -top-8 md:-right-16 md:-top-12 w-24 h-24 md:w-48 md:h-48 rounded-2xl bg-gradient-to-br from-neutral-400/20 to-transparent border border-white/10 backdrop-blur-xl -z-10"
           style={{ transform: "translateZ(-80px) rotate(15deg)" }}
        />
        <div 
           className="absolute -left-4 -bottom-4 md:-left-12 md:-bottom-8 w-20 h-20 md:w-32 md:h-32 rounded-full bg-gradient-to-tr from-neutral-600/20 to-transparent border border-white/10 backdrop-blur-xl z-20"
           style={{ transform: "translateZ(50px)" }}
        />
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
      <div className="absolute inset-0 bg-neutral-500/0 group-hover:bg-neutral-500/20 transition-colors duration-300 z-10" />
      <img src={src} alt={alt} className="w-full h-auto object-cover relative z-0 opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
}

function ModernBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 mix-blend-screen">
      {/* Subtle Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_50%,#000_10%,transparent_80%)] opacity-70" />
      
      {/* Static Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none blur-3xl opacity-50 bg-[radial-gradient(circle,rgba(34,197,94,0.05)_0%,rgba(20,184,166,0.02)_40%,transparent_60%)]" />
      
      {/* Diagonal light rays */}
      <div className="absolute -top-[20%] left-[-10%] w-[40%] h-[150%] bg-neutral-500/10 rotate-45 blur-[120px]" />
      <div className="absolute top-[20%] right-[-10%] w-[30%] h-[150%] bg-neutral-600/10 -rotate-45 blur-[120px]" />
    </div>
  );
}

export default function SeoProCaseStudy({ project }: { project: Project }) {
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

      <div className="w-full bg-neutral-950/50 backdrop-blur-xl border border-white/10 text-neutral-300 font-sans mt-8 pt-12 lg:pt-24 rounded-[3rem] px-4 md:px-12 lg:px-24 mb-12 shadow-[0_0_80px_-20px_rgba(255,255,255,0.05)] relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-neutral-500/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-neutral-600/10 rounded-full blur-[150px] -z-10 pointer-events-none" />

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
              <div className="inline-block px-4 py-1.5 rounded-full border border-neutral-600/30 bg-neutral-800/50 text-neutral-300 text-xs font-mono uppercase tracking-widest mb-6">Case Study</div>
              <h1 className="text-5xl md:text-7xl font-sans tracking-tighter text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-neutral-200 to-neutral-500">{project.name}</h1>
              <p className="text-2xl md:text-3xl font-light max-w-2xl leading-tight text-neutral-400 mb-12">
                An AI-powered SEO platform transforming complex traffic data into actionable, elegant dashboards.
              </p>
              
              <div className="flex flex-wrap gap-8 md:gap-16 pt-8 border-t border-white/10">
                <div>
                  <p className="text-xs uppercase tracking-widest text-neutral-500 mb-2 font-mono">Platform</p>
                  <p className="text-lg text-white font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-neutral-400 animate-pulse"></span>
                    Web & Mobile App
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-neutral-500 mb-2 font-mono">Timeline</p>
                  <p className="text-lg text-white font-medium flex items-center gap-2">
                    Jan 2026
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-neutral-500 mb-2 font-mono">Tools</p>
                  <div className="flex flex-wrap gap-3 mt-1">
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-neutral-300">Figma</span>
                    <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-neutral-300">Data Visualization</span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <div className="w-full relative group z-10 hidden md:block pt-16 lg:pt-0">
              <motion.div 
                variants={itemVariants}
                className="relative flex justify-center"
              >
                 <div className="absolute -inset-8 bg-gradient-to-tr from-neutral-600/20 via-neutral-700/10 to-neutral-800/20 rounded-[2rem] blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
                 <HeroAestheticShowcase className="transform transition-transform duration-500 hover:scale-[1.02]">
                   <img src="/SEO PRO/SEO Dashboard - Desktop 1441.png" className="absolute inset-0 w-full h-full object-cover object-left-top bg-neutral-900 cursor-zoom-in" alt="Hero" onClick={() => openImage("/SEO PRO/SEO Dashboard - Desktop 1441.png", "Hero")} />
                 </HeroAestheticShowcase>
              </motion.div>
            </div>
            
            <motion.div variants={itemVariants} className="w-full md:hidden relative flex justify-center mt-32 mb-16 px-4">
               <div className="absolute -inset-1 bg-gradient-to-tr from-neutral-600/20 to-neutral-800/20 rounded-3xl blur-xl opacity-50" />
               <HeroAestheticShowcase>
                 <img src="/SEO PRO/SEO Dashboard - Desktop 1441.png" className="absolute inset-0 w-full h-full object-cover cursor-zoom-in bg-neutral-900" alt="Hero" onClick={() => openImage("/SEO PRO/SEO Dashboard - Desktop 1441.png", "Hero")} />
               </HeroAestheticShowcase>
            </motion.div>
          </motion.div>

          <motion.hr initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={itemVariants} className="border-white/5 my-24" />

          {/* Project Overview */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants} className="mb-32">
            <motion.h3 variants={itemVariants} className="text-sm font-mono text-neutral-400 uppercase tracking-widest mb-16 inline-block pb-2 border-b border-neutral-600/30">01 // The Genesis</motion.h3>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-left group">
              <div className="col-span-1 md:col-span-4">
                <h4 className="text-2xl font-light text-white group-hover:text-neutral-400 transition-colors">A Fragmented Landscape</h4>
              </div>
              <div className="col-span-1 md:col-span-8 space-y-6">
                <p className="text-neutral-400 leading-relaxed font-light text-xl">
                  In the rapidly evolving world of digital marketing, agencies and growth teams faced a persistent issue: fragmentation. Professionals were forced to juggle half a dozen disparate tools to get a complete picture of their organic traffic, technical site health, and competitive positioning. This friction was costing teams hours of manual data aggregation every single week.
                </p>
                <p className="text-neutral-400 leading-relaxed font-light text-xl">
                   SEO PRO was born from a simple thesis—what if we could unify the entire SEO lifecycle into a single, cohesive command center? We set out to build an incredibly powerful suite that acts not just as a reporting tool, but as a proactive growth engine. By consolidating complex data streams into legible, highly responsive dashboards, the platform transforms raw metrics into an elegant and actionable narrative.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Core Objectives */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants} className="mb-32">
            <motion.h3 variants={itemVariants} className="text-sm font-mono text-neutral-400 uppercase tracking-widest mb-16 inline-block pb-2 border-b border-neutral-600/30">02 // The Journey</motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div variants={itemVariants} className="p-8 rounded-3xl bg-neutral-900/50 border border-white/5 hover:bg-neutral-900 hover:border-white/20 transition-all duration-300">
                 <div className="w-12 h-12 rounded-xl bg-white/5 text-neutral-300 flex items-center justify-center mb-6 text-xl">01</div>
                 <h4 className="text-xl font-medium text-white mb-4">Taming the Data Beast</h4>
                 <p className="text-neutral-400 font-light leading-relaxed">Our first major hurdle was data density. We engaged with dozens of agency owners to understand their daily workflows. The clear mandate: turn heavy analytical metrics into digestible and visually appealing charts, helping marketers find insights instantly without feeling overwhelmed by numbers.</p>
              </motion.div>
              <motion.div variants={itemVariants} className="p-8 rounded-3xl bg-neutral-900/50 border border-white/5 hover:bg-neutral-900 hover:border-white/20 transition-all duration-300">
                 <div className="w-12 h-12 rounded-xl bg-white/5 text-neutral-300 flex items-center justify-center mb-6 text-xl">02</div>
                 <h4 className="text-xl font-medium text-white mb-4">The Mobile Imperative</h4>
                 <p className="text-neutral-400 font-light leading-relaxed">Most SEO tools fall apart on smaller screens. We challenged ourselves to build deeper. We ensured all complex data tables and intricate line charts remained fully functional, beautiful, and intuitive across the entire Apple ecosystem—from wide desktops down to the iPad and iPhone.</p>
              </motion.div>
              <motion.div variants={itemVariants} className="p-8 rounded-3xl bg-neutral-900/50 border border-white/5 hover:bg-neutral-900 hover:border-white/20 transition-all duration-300">
                 <div className="w-12 h-12 rounded-xl bg-white/5 text-neutral-300 flex items-center justify-center mb-6 text-xl">03</div>
                 <h4 className="text-xl font-medium text-white mb-4">A Unified State of Mind</h4>
                 <p className="text-neutral-400 font-light leading-relaxed">Ultimately, it was about tool consolidation. We seamlessly combined domain overviews, organic research, and site audits natively. The result is a fluid experience where marketers never have to context-switch between applications, maintaining their strategic flow state.</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Competitor Analysis */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants} className="mb-32">
            <motion.h3 variants={itemVariants} className="text-sm font-mono text-neutral-400 uppercase tracking-widest mb-16 inline-block pb-2 border-b border-neutral-600/30">03 // Competitor Analysis</motion.h3>
            
            <motion.div variants={itemVariants} className="space-y-8 bg-neutral-900/30 p-8 md:p-12 lg:p-16 rounded-[3rem] border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-[100px] pointer-events-none" />
              
              <div className="max-w-3xl relative z-10">
                <h4 className="text-3xl font-medium text-white mb-6">Analyzing the SEO Landscape</h4>
                <p className="text-neutral-400 leading-relaxed font-light text-xl mb-12">
                  During our research, we evaluated the active SEO tool landscape. Most existing platforms were heavily fractured or visually overwhelming, prioritizing raw data density over workflow efficiency and user experience.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                <div className="p-8 rounded-3xl bg-black/40 border border-white/5">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="w-10 h-10 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center text-xl">✕</span>
                    <h5 className="text-xl font-medium text-white">Legacy Enterprise Tools</h5>
                  </div>
                  <p className="text-neutral-400 font-light mb-6">Ahrefs, Semrush, Moz</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-neutral-500 text-sm"><span className="text-red-500/50 mt-0.5">•</span> Extremely data-rich but visually cluttered.</li>
                    <li className="flex items-start gap-3 text-neutral-500 text-sm"><span className="text-red-500/50 mt-0.5">•</span> Steep learning curves for new marketers.</li>
                    <li className="flex items-start gap-3 text-neutral-500 text-sm"><span className="text-red-500/50 mt-0.5">•</span> Dated interfaces that resist modern workflows.</li>
                  </ul>
                </div>

                <div className="p-8 rounded-3xl bg-black/40 border border-white/5">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="w-10 h-10 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center text-xl">✕</span>
                    <h5 className="text-xl font-medium text-white">Lightweight Point Solutions</h5>
                  </div>
                  <p className="text-neutral-400 font-light mb-6">Ubersuggest, Mangools</p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3 text-neutral-500 text-sm"><span className="text-red-500/50 mt-0.5">•</span> Great UX but lack technical depth.</li>
                    <li className="flex items-start gap-3 text-neutral-500 text-sm"><span className="text-red-500/50 mt-0.5">•</span> Insufficient for serious enterprise audits.</li>
                    <li className="flex items-start gap-3 text-neutral-500 text-sm"><span className="text-red-500/50 mt-0.5">•</span> Often require buying multiple disjointed tools.</li>
                  </ul>
                </div>
              </div>
              
              <div className="p-8 mt-8 rounded-2xl bg-white/5 border border-white/20 relative z-10 flex flex-col md:flex-row gap-6 items-center">
                <div className="w-16 h-16 shrink-0 rounded-full bg-white/10 flex items-center justify-center text-white text-2xl">✓</div>
                <div>
                  <h5 className="text-lg font-medium text-white mb-2">The SeoPro Opportunity</h5>
                  <p className="text-neutral-400 text-sm leading-relaxed">
                    A unified ecosystem that brings consumer-grade design and thoughtful UX to enterprise-grade SEO data, enabling marketers to find insights faster without feeling overwhelmed.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* User Flow */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants} className="mb-32">
            <motion.h3 variants={itemVariants} className="text-sm font-mono text-neutral-400 uppercase tracking-widest mb-16 inline-block pb-2 border-b border-neutral-600/30">04 // User Flow</motion.h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 group">
               <div className="lg:col-span-5 relative">
                 <motion.div variants={itemVariants} className="sticky top-32">
                   <h4 className="text-3xl font-medium text-white mb-6">Guiding the Marketer</h4>
                   <p className="text-neutral-400 leading-relaxed font-light text-lg mb-8">
                     The user journey is structured to guide marketers from high-level discovery down to granular, actionable insights without friction. Every view is designed to answer a specific question.
                   </p>
                   <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                     <p className="text-white/60 font-mono text-sm leading-relaxed">
                       "Data without direction is just noise. The interface must act as a structured funnel, narrowing focus from the macro domain level down to the micro technical fix."
                     </p>
                   </div>
                 </motion.div>
               </div>
               
               <div className="lg:col-span-7">
                  <div className="relative border-l border-white/10 ml-6 md:ml-12 space-y-20 pb-8 pt-4">
                    <motion.div variants={itemVariants} className="relative pl-8 md:pl-16">
                      <div className="absolute w-8 h-8 rounded-full bg-black border-2 border-white/20 left-[-17px] top-0 flex items-center justify-center text-xs font-mono text-white/50">1</div>
                      <h4 className="text-2xl font-medium text-white mb-4">Domain Discovery</h4>
                      <p className="text-neutral-400 font-light text-lg leading-relaxed">
                        Users enter their target domain to receive an immediate, high-level summary of organic traffic, authority score, and backlink health. Clear data visualizations highlight trends.
                      </p>
                    </motion.div>
                    
                    <motion.div variants={itemVariants} className="relative pl-8 md:pl-16">
                      <div className="absolute w-8 h-8 rounded-full bg-black border-2 border-white/20 left-[-17px] top-0 flex items-center justify-center text-xs font-mono text-white/50">2</div>
                      <h4 className="text-2xl font-medium text-white mb-4">Targeted Keyword Research</h4>
                      <p className="text-neutral-400 font-light text-lg leading-relaxed">
                        From the general overview, users launch into targeted keyword research. They can filter millions of data points using advanced boolean logic to pinpoint low-competition, high-yield search terms.
                      </p>
                    </motion.div>
                    
                    <motion.div variants={itemVariants} className="relative pl-8 md:pl-16">
                      <div className="absolute w-8 h-8 rounded-full bg-white/10 border-2 border-white left-[-17px] top-0 flex items-center justify-center text-xs font-mono text-white">3</div>
                      <h4 className="text-2xl font-medium text-white mb-4">Technical Site Audit</h4>
                      <p className="text-neutral-400 font-light text-lg leading-relaxed mb-6">
                        Finally, users run comprehensive site audits. The tool surfaces critical errors, warnings, and performance bottlenecks, providing actionable remediation steps directly within the dashboard ecosystem.
                      </p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-black/30 border border-white/5 hover:border-white/20 transition-colors">
                          <h6 className="text-white font-medium text-sm mb-2">Error Logs</h6>
                          <p className="text-neutral-500 text-xs">Categorized list of broken links, missing tags, and slow pages.</p>
                        </div>
                        <div className="p-4 rounded-xl bg-black/30 border border-white/5 hover:border-white/20 transition-colors">
                          <h6 className="text-white font-medium text-sm mb-2">Remediation Steps</h6>
                          <p className="text-neutral-500 text-xs">Clear, step-by-step developer instructions to fix surfaced issues.</p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
               </div>
            </div>
          </motion.div>

          {/* Visual Execution */}
          <div className="mb-32">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants} className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div>
                <motion.h3 variants={itemVariants} className="text-sm font-mono text-neutral-400 uppercase tracking-widest inline-block pb-2 border-b border-neutral-600/30">05 // Visual Execution</motion.h3>
                <motion.h2 variants={itemVariants} className="text-4xl text-white font-light mt-8">Dashboard Ecosystem</motion.h2>
              </div>
              <motion.p variants={itemVariants} className="text-neutral-500 font-mono text-sm">Click any frame to examine.</motion.p>
            </motion.div>

            <div className="space-y-32">
                {/* Core Dashboards */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants}>
                  <div className="flex items-center gap-4 mb-12">
                     <div className="h-[1px] bg-white/10 flex-grow" />
                     <h4 className="text-xl font-medium text-white px-4 font-mono">Core SEO Dashboards</h4>
                     <div className="h-[1px] bg-white/10 flex-grow" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <ZoomableImage src="/SEO PRO/SEO Dashboard - Desktop 1441.png" alt="SEO Dashboard Main" onClick={openImage} />
                    <ZoomableImage src="/SEO PRO/SEO Dashboard - Desktop 1442.png" alt="SEO Dashboard Overview" onClick={openImage} />
                    <ZoomableImage src="/SEO PRO/Domain Overview - Desktop 1440.png" alt="Domain Overview" onClick={openImage} />
                    <ZoomableImage src="/SEO PRO/Domain Overview - Desktop 1443.png" alt="Domain Overview 2" onClick={openImage} />
                  </div>
                </motion.div>

                {/* Analytical Modules */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants}>
                   <div className="flex items-center gap-4 mb-12">
                     <div className="h-[1px] bg-white/10 flex-grow" />
                     <h4 className="text-xl font-medium text-white px-4 font-mono">Analytical Modules</h4>
                     <div className="h-[1px] bg-white/10 flex-grow" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <ZoomableImage src="/SEO PRO/Site Audit - Desktop 1448.png" alt="Site Audit" onClick={openImage} />
                    <ZoomableImage src="/SEO PRO/Traffic Analytics - Desktop 1443.png" alt="Traffic Analytics" onClick={openImage} />
                    <ZoomableImage src="/SEO PRO/Organic Research - Desktop 1444.png" alt="Organic Research" onClick={openImage} />
                    <ZoomableImage src="/SEO PRO/Keyword Explorer - Desktop 1444.png" alt="Keyword Explorer" onClick={openImage} />
                  </div>
                </motion.div>
                
                {/* Competitive Intelligence */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants}>
                   <div className="flex items-center gap-4 mb-12">
                     <div className="h-[1px] bg-white/10 flex-grow" />
                     <h4 className="text-xl font-medium text-white px-4 font-mono">Competitive Analysis & Links</h4>
                     <div className="h-[1px] bg-white/10 flex-grow" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <ZoomableImage src="/SEO PRO/Competitive Analysis - Desktop 1445.png" alt="Competitive Analysis" onClick={openImage} />
                    <ZoomableImage src="/SEO PRO/Link Opportunities - Desktop 1447.png" alt="Link Opportunities" onClick={openImage} />
                  </div>
                </motion.div>

                {/* Responsive Design */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants}>
                   <div className="flex items-center gap-4 mb-12">
                     <div className="h-[1px] bg-white/10 flex-grow" />
                     <h4 className="text-xl font-medium text-neutral-300 px-4 font-mono">Responsive Ecosystem</h4>
                     <div className="h-[1px] bg-white/10 flex-grow" />
                   </div>
                   <p className="text-neutral-400 text-center max-w-2xl mx-auto mb-12">Adapting intense data visualizations natively for iPad and iPhone ensures marketers can monitor critical metrics on the go.</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <ZoomableImage className="rounded-[2.5rem]" src="/SEO PRO/iPhone 16 Pro Max - 1.png" alt="iPhone View" onClick={openImage} />
                    <ZoomableImage className="rounded-[2.5rem]" src="/SEO PRO/iPhone 16 Pro Max - 2.png" alt="iPhone View 2" onClick={openImage} />
                    <ZoomableImage className="rounded-[1.5rem]" src="/SEO PRO/iPad mini 8.3 - 1.png" alt="iPad View" onClick={openImage} />
                    <ZoomableImage className="rounded-[1.5rem]" src="/SEO PRO/iPad mini 8.3 - 2.png" alt="iPad View 2" onClick={openImage} />
                  </div>
                </motion.div>
                
            </div>
          </div>

           <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants} className="py-24 text-center border-t border-white/5 bg-gradient-to-t from-white/5 to-transparent rounded-b-[3rem] px-4 -mx-4 md:-mx-12 lg:-mx-24 -mb-12">
              <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl text-white font-sans tracking-tight mb-6">ANALYSIS COMPLETE</motion.h2>
              <motion.p variants={itemVariants} className="text-neutral-400 font-light text-lg">Thank you for exploring the SEO PRO case study.</motion.p>
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
