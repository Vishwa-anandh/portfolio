import React, { useState, useEffect } from "react";
import { Project } from "./data/projects";
import { motion, AnimatePresence, useMotionValue, useTransform } from "motion/react";
import { ImageViewer } from "./components/ImageViewer";

// Float perspective mockup for the Hero Image
function HeroPerspectiveMockup({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useTransform(mouseY, [0, 1], [4, -4]);
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
    <div className={`relative w-full max-w-[1240px] mx-auto mt-0 md:mt-4 ${className}`} style={{ perspective: "2000px" }}>
      <motion.div 
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        className="relative mx-auto w-full transition-transform ease-out duration-300"
      >
        {/* Soft elegant glow behind */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-violet-500/30 blur-[100px] opacity-70"
          style={{ transform: "translateZ(-80px)" }}
        />

        <div 
          className="relative rounded-[1rem] md:rounded-[1.5rem] overflow-hidden bg-white dark:bg-neutral-900 border border-black/5 dark:border-white/10 flex flex-col z-10"
          style={{
            transform: "translateZ(0px)",
            boxShadow: '0 30px 60px -15px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.05) inset'
          }}
        >
          {/* Mac-style Top Bar */}
          <div className="h-10 border-b border-black/5 dark:border-white/5 bg-neutral-50 dark:bg-neutral-800/50 flex items-center px-4 gap-2">
            <div className="w-3 h-3 rounded-full bg-rose-400"></div>
            <div className="w-3 h-3 rounded-full bg-amber-400"></div>
            <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
          </div>
          
          <div className="relative w-full aspect-[16/10] md:aspect-[16/9] bg-neutral-100 dark:bg-neutral-950 overflow-hidden">
             {children}
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
      className={`relative group cursor-zoom-in overflow-hidden shadow-lg bg-neutral-100 dark:bg-neutral-800 border border-black/5 dark:border-white/5 ${className || "rounded-xl"}`}
      onClick={() => onClick(src, alt)}
    >
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 dark:group-hover:bg-white/5 transition-colors duration-300 z-10" />
      <img src={src} alt={alt} className="w-full h-auto object-cover relative z-0 opacity-100" />
    </motion.div>
  );
}

function SoftBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
      <div className="absolute inset-0 bg-neutral-50 dark:bg-neutral-950" />
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:24px_24px] opacity-50" />
      
      {/* Static Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none blur-[120px] opacity-20 dark:opacity-10 bg-[radial-gradient(circle,rgba(99,102,241,0.1)_0%,rgba(168,85,247,0.05)_40%,transparent_60%)]" />
    </div>
  );
}

export default function P14CaseStudy({ project: _project }: { project: Project }) {
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
      <SoftBackground />

      <div className="w-full bg-white/40 dark:bg-neutral-900/40 backdrop-blur-3xl border border-black/5 dark:border-white/10 text-neutral-800 dark:text-neutral-300 font-sans mt-8 pt-12 lg:pt-24 rounded-[3rem] px-4 md:px-12 lg:px-24 mb-12 shadow-xl relative overflow-hidden">
        
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
              <div className="inline-block px-4 py-1.5 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-mono uppercase tracking-widest mb-6">SaaS Application</div>
              <h1 className="text-5xl md:text-7xl font-sans tracking-tight font-medium text-neutral-900 dark:text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-violet-600 dark:from-indigo-400 dark:to-violet-400">P14 WorkOS</h1>
              <p className="text-2xl md:text-3xl font-light max-w-2xl leading-tight text-neutral-600 dark:text-neutral-400 mb-12">
                A highly cohesive project management hub infused with AI to modernize task execution, scheduling, and collaboration.
              </p>
              
              <div className="flex flex-wrap gap-8 md:gap-16 pt-8 border-t border-black/5 dark:border-white/10">
                <div>
                  <p className="text-xs uppercase tracking-widest text-neutral-500 mb-2 font-mono">Platform</p>
                  <p className="text-lg text-neutral-900 dark:text-white font-medium flex items-center gap-2">
                    Web Dashboard
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-neutral-500 mb-2 font-mono">Timeline</p>
                  <p className="text-lg text-neutral-900 dark:text-white font-medium flex items-center gap-2">
                    Nov 2023
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-neutral-500 mb-2 font-mono">Competencies</p>
                  <div className="flex flex-wrap gap-3 mt-1">
                    <span className="px-3 py-1 rounded-full bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/10 text-sm">Product UI</span>
                    <span className="px-3 py-1 rounded-full bg-white/50 dark:bg-white/5 border border-black/5 dark:border-white/10 text-sm">AI Interfaces</span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <div className="w-full relative group z-10 pt-4 lg:pt-0">
              <motion.div 
                variants={itemVariants}
                className="relative flex justify-center"
              >
                 <HeroPerspectiveMockup className="transform transition-transform duration-500 hover:scale-[1.02]">
                   <img src="/P14 - AI Project Management Dashboard/Dashboard.png" className="absolute inset-0 w-full h-full object-cover object-left-top cursor-zoom-in" alt="Hero Dashboard" onClick={() => openImage("/P14 - AI Project Management Dashboard/Dashboard.png", "Hero Dashboard")} />
                 </HeroPerspectiveMockup>
              </motion.div>
            </div>
          </motion.div>

          <motion.hr initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={itemVariants} className="border-black/5 dark:border-white/5 my-24" />

          {/* Project Overview */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants} className="mb-32">
            <motion.h3 variants={itemVariants} className="text-sm font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-16 inline-block pb-2 border-b border-indigo-500/30">01 // The Approach</motion.h3>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-left group">
              <div className="col-span-1 md:col-span-4">
                <h4 className="text-2xl font-light text-neutral-900 dark:text-white transition-colors">Unified Command Center</h4>
              </div>
              <div className="col-span-1 md:col-span-8 space-y-6">
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed font-light text-xl">
                  P14 abstracts away the clutter of traditional task trackers by introducing an AI-first paradigm. Teams coordinate calendars, video calls, messages, and task distributions in a singular aesthetic environment. 
                </p>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed font-light text-xl">
                  Designed for high-performance SaaS applications, the UI balances dense informational architecture with clean open spaces, ensuring stakeholders can manage projects without cognitive fatigue. The omnipresent AI Assistant widget unblocks users mid-task.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Core Features */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants} className="mb-32">
            <motion.h3 variants={itemVariants} className="text-sm font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-widest mb-16 inline-block pb-2 border-b border-indigo-500/30">02 // Key Pillars</motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div variants={itemVariants} className="p-8 rounded-2xl bg-white/60 dark:bg-neutral-900/60 border border-black/5 dark:border-white/5 hover:bg-white dark:hover:bg-neutral-800 transition-all duration-300">
                 <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-6 text-xl font-mono">01</div>
                 <h4 className="text-xl font-medium text-neutral-900 dark:text-white mb-4">Granular Management</h4>
                 <p className="text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">Streamlined modals and views for project and task creation. Clean inputs, clear hierarchies, and integrated status trackers give teams an eagle-eye view of progress.</p>
              </motion.div>
              <motion.div variants={itemVariants} className="p-8 rounded-2xl bg-white/60 dark:bg-neutral-900/60 border border-black/5 dark:border-white/5 hover:bg-white dark:hover:bg-neutral-800 transition-all duration-300">
                 <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-6 text-xl font-mono">02</div>
                 <h4 className="text-xl font-medium text-neutral-900 dark:text-white mb-4">Omnipresent AI Agent</h4>
                 <p className="text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">An ever-ready conversational assistant that summarizes threads, calculates risk deadlines, and drafts project communications directly within the dashboard context.</p>
              </motion.div>
              <motion.div variants={itemVariants} className="p-8 rounded-2xl bg-white/60 dark:bg-neutral-900/60 border border-black/5 dark:border-white/5 hover:bg-white dark:hover:bg-neutral-800 transition-all duration-300">
                 <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-6 text-xl font-mono">03</div>
                 <h4 className="text-xl font-medium text-neutral-900 dark:text-white mb-4">Native Communications</h4>
                 <p className="text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">Reducing app-switching by weaving inboxes, direct messaging, and video conferencing directly into the workflow canvas for fluid remote collaboration.</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Visual Gallery */}
          <div className="mb-32">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants} className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div>
                <motion.h3 variants={itemVariants} className="text-sm font-mono text-indigo-600 dark:text-indigo-400 uppercase tracking-widest inline-block pb-2 border-b border-indigo-500/30">03 // Functional Views</motion.h3>
                <motion.h2 variants={itemVariants} className="text-4xl text-neutral-900 dark:text-white font-light mt-8">Dashboard Layouts</motion.h2>
              </div>
              <motion.p variants={itemVariants} className="text-neutral-500 font-mono text-sm">Click any frame to examine.</motion.p>
            </motion.div>

            <div className="space-y-32">

                {/* Primary Desks */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants}>
                   <div className="flex items-center gap-4 mb-12">
                     <div className="h-[1px] bg-black/5 dark:bg-white/10 flex-grow" />
                     <h4 className="text-xl font-medium text-indigo-600 dark:text-indigo-400 px-4 font-mono">1 / App Fundamentals</h4>
                     <div className="h-[1px] bg-black/5 dark:bg-white/10 flex-grow" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ZoomableImage src="/P14 - AI Project Management Dashboard/Dashboard.png" alt="Main Dashboard" onClick={openImage} />
                    <ZoomableImage src="/P14 - AI Project Management Dashboard/Projects.png" alt="Projects Directory" onClick={openImage} />
                    <ZoomableImage src="/P14 - AI Project Management Dashboard/Calendar.png" alt="Calendar Schedule" onClick={openImage} />
                    <ZoomableImage src="/P14 - AI Project Management Dashboard/Notifications.png" alt="Notification Drawer" onClick={openImage} />
                  </div>
                </motion.div>

                {/* Task Engine */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants}>
                   <div className="flex items-center gap-4 mb-12">
                     <div className="h-[1px] bg-black/5 dark:bg-white/10 flex-grow" />
                     <h4 className="text-xl font-medium text-indigo-600 dark:text-indigo-400 px-4 font-mono">2 / Workflow Authoring</h4>
                     <div className="h-[1px] bg-black/5 dark:bg-white/10 flex-grow" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <ZoomableImage src="/P14 - AI Project Management Dashboard/Create New Project.png" alt="Create Project Modal" onClick={openImage} />
                    <ZoomableImage src="/P14 - AI Project Management Dashboard/Create New Task.png" alt="Task Assignment Modal" onClick={openImage} />
                    <ZoomableImage src="/P14 - AI Project Management Dashboard/Create New Schedule.png" alt="Event Scheduling Modal" onClick={openImage} />
                  </div>
                </motion.div>

                {/* AI & Comm */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants}>
                   <div className="flex items-center gap-4 mb-12">
                     <div className="h-[1px] bg-black/5 dark:bg-white/10 flex-grow" />
                     <h4 className="text-xl font-medium text-indigo-600 dark:text-indigo-400 px-4 font-mono">3 / AI & Connectivity</h4>
                     <div className="h-[1px] bg-black/5 dark:bg-white/10 flex-grow" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ZoomableImage src="/P14 - AI Project Management Dashboard/AI Assistant.png" alt="AI Agent Setup" onClick={openImage} />
                    <ZoomableImage src="/P14 - AI Project Management Dashboard/My Inbox.png" alt="Conversational Inbox" onClick={openImage} />
                    <ZoomableImage src="/P14 - AI Project Management Dashboard/Inbox_ Video Call.png" alt="Integrated Video Call" onClick={openImage} />
                    <ZoomableImage src="/P14 - AI Project Management Dashboard/Search.png" alt="Global Command Palette search" onClick={openImage} />
                  </div>
                </motion.div>

                {/* Admin */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants}>
                   <div className="flex items-center gap-4 mb-12">
                     <div className="h-[1px] bg-black/5 dark:bg-white/10 flex-grow" />
                     <h4 className="text-xl font-medium text-indigo-600 dark:text-indigo-400 px-4 font-mono">4 / Access & Account Controls</h4>
                     <div className="h-[1px] bg-black/5 dark:bg-white/10 flex-grow" />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    <ZoomableImage src="/P14 - AI Project Management Dashboard/Log In.png" alt="Authentication Gateway" onClick={openImage} />
                    <ZoomableImage src="/P14 - AI Project Management Dashboard/Settings - General.png" alt="General Settings" onClick={openImage} />
                    <ZoomableImage src="/P14 - AI Project Management Dashboard/Settings - Account.png" alt="Account Management" onClick={openImage} />
                    <ZoomableImage src="/P14 - AI Project Management Dashboard/Settings - Plan & Pricing.png" alt="Subscription Billing" onClick={openImage} />
                    <ZoomableImage src="/P14 - AI Project Management Dashboard/Settings - Time & Language.png" alt="Localization Settings" onClick={openImage} />
                    <ZoomableImage src="/P14 - AI Project Management Dashboard/Export Data.png" alt="Data Escrow Tooling" onClick={openImage} />
                  </div>
                </motion.div>

            </div>
          </div>

           <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants} className="py-24 text-center border-t border-black/5 dark:border-white/5 bg-gradient-to-t from-black/5 dark:from-white/5 to-transparent rounded-b-[3rem] px-4 -mx-4 md:-mx-12 lg:-mx-24 -mb-12">
              <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl text-neutral-900 dark:text-white font-sans tracking-tight mb-6 font-medium">EXPLORATION COMPLETE</motion.h2>
              <motion.p variants={itemVariants} className="text-neutral-500 font-light text-lg">Thank you for reviewing the P14 AI Dashboard layout concepts.</motion.p>
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
