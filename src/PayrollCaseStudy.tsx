import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { Project } from "./data/projects";

function ZoomableImage({ src, alt, onClick }: { src: string, alt: string, onClick: (src: string, alt: string) => void }) {
  return (
    <div 
      className="w-full relative aspect-[16/10] bg-neutral-900 rounded-xl md:rounded-2xl border border-white/5 overflow-hidden group cursor-zoom-in"
      onClick={() => onClick(src, alt)}
    >
       <img 
         src={src} 
         alt={alt} 
         className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
       />
       <div className="absolute inset-0 bg-indigo-500/0 group-hover:bg-indigo-500/10 transition-colors duration-300 flex items-center justify-center">
         <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-black/50 backdrop-blur-md text-white text-sm px-4 py-2 rounded-full border border-white/10">
           View Fullscreen
         </div>
       </div>
    </div>
  );
}

function PhoneMockup({ src, alt }: { src: string, alt: string }) {
  return (
    <div className="relative w-full max-w-[320px] mx-auto overflow-hidden rounded-[2.5rem] md:rounded-[3rem] border-[6px] md:border-[8px] border-neutral-900 bg-neutral-950 shadow-2xl">
       <div className="absolute top-0 inset-x-0 h-6 bg-neutral-900 z-20 flex justify-center rounded-b-xl max-w-[150px] mx-auto blur-[1px]"></div>
       <img src={src} alt={alt} className="w-full h-auto relative z-10" />
    </div>
  );
}

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
          rotateY
        }}
        className="relative mx-auto w-full transition-transform ease-out duration-300"
      >
        <div 
          className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-violet-800/30 blur-[120px] opacity-80"
          style={{ transform: "translateZ(-150px)" }}
        />
        <div 
          className="relative rounded-2xl md:rounded-[1.5rem] overflow-hidden bg-neutral-950 border border-white/10 flex flex-col z-10"
          style={{ boxShadow: '0 40px 80px -20px rgba(0,0,0,1), 0 0 0 1px rgba(255,255,255,0.05) inset' }}
        >
          <div className="h-9 md:h-12 border-b border-white/10 bg-[#0e0e0e] flex items-center px-3 md:px-5 gap-4">
            <div className="flex gap-1.5 md:gap-2">
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-rose-500/80"></div>
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-amber-500/80"></div>
              <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-indigo-500/80"></div>
            </div>
            
            <div className="flex-grow flex justify-center">
               <div className="w-full max-w-sm h-6 md:h-7 bg-white/5 border border-white/5 rounded-md flex items-center justify-center gap-2 px-3 shadow-inner">
                 <svg className="w-3 h-3 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                 <span className="text-[10px] md:text-xs text-white/40 font-mono tracking-wide">payroll.dashboard.app</span>
               </div>
            </div>
            <div className="w-12 md:w-16"></div>
          </div>
          <div className="relative w-full h-auto aspect-[16/10] bg-neutral-900 overflow-hidden">
             {children}
             <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 pointer-events-none mix-blend-overlay" />
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function PayrollCaseStudy({ project: _project }: { project: Project }) {
  const [fullscreenImage, setFullscreenImage] = useState<{src: string, alt: string} | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFullscreenImage(null);
    };
    if (fullscreenImage) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [fullscreenImage]);

  const openImage = (src: string, alt: string) => {
    setFullscreenImage({ src, alt });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 1.8, ease: [0.16, 1, 0.3, 1] as const }
    }
  };

  return (
    <div className="w-full">
      {/* Fullscreen Image Modal */}
      <AnimatePresence>
        {fullscreenImage && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-8 cursor-zoom-out"
            onClick={() => setFullscreenImage(null)}
          >
            <motion.img 
               initial={{ scale: 0.95, y: 10, opacity: 0 }}
               animate={{ scale: 1, y: 0, opacity: 1 }}
               exit={{ scale: 0.98, opacity: 0, transition: { duration: 0.2 } }}
               transition={{ type: "spring", stiffness: 300, damping: 30 }}
               src={fullscreenImage.src} 
               alt={fullscreenImage.alt}
               className="max-w-full max-h-full object-contain rounded-lg rounded-xl shadow-2xl"
               onClick={(e) => e.stopPropagation()} // Prevent clicking image from closing if we wanted, but zoom out on image click is nice
            />
            <button 
              className="absolute top-6 right-6 md:top-8 md:right-8 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors backdrop-blur-md border border-white/10"
              onClick={() => setFullscreenImage(null)}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div initial="hidden" animate="visible" variants={containerVariants} className="pt-20">
            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight mb-8 text-white mix-blend-plus-lighter">
              Payroll System
            </motion.h1>
            <motion.div variants={itemVariants} className="text-white/50 mb-16 md:mb-24 max-w-3xl">
              <p className="text-xl md:text-2xl font-light leading-relaxed mb-8">
                A unified shift tracking and automated payroll platform designed to manage workforces effortlessly. Bridging the gap between staff mobile presence and enterprise administrative overview.
              </p>
              
              <div className="flex flex-wrap gap-8 md:gap-16 pt-8 border-t border-white/10">
                <div>
                  <p className="text-xs uppercase tracking-widest text-neutral-500 mb-2 font-mono">Platform</p>
                  <p className="text-lg text-white font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
                    Web Dashboard
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-neutral-500 mb-2 font-mono">Timeline</p>
                  <p className="text-lg text-white font-medium flex items-center gap-2">
                    Dec 2024
                  </p>
                </div>
              </div>
            </motion.div>

            <div className="w-full relative group z-10 hidden md:block pt-4 lg:pt-0">
              <motion.div 
                variants={itemVariants}
                className="relative flex justify-center"
              >
                 <div className="absolute -inset-8 bg-gradient-to-tr from-indigo-600/20 via-violet-700/10 to-indigo-800/20 rounded-[2rem] blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
                 <HeroDashboardMockup className="transform transition-transform duration-500 hover:scale-[1.02]">
                   <img src="/Payroll Management System/Dashboard.png" className="absolute inset-0 w-full h-full object-cover object-left-top bg-neutral-900 cursor-zoom-in" alt="Hero" onClick={() => openImage("/Payroll Management System/Dashboard.png", "Hero")} />
                 </HeroDashboardMockup>
              </motion.div>
            </div>
            
            <motion.div variants={itemVariants} className="w-full md:hidden relative flex justify-center mt-12 mb-16 px-4">
               <div className="absolute -inset-1 bg-gradient-to-tr from-indigo-600/20 to-violet-800/20 rounded-3xl blur-xl opacity-50" />
               <HeroDashboardMockup>
                 <img src="/Payroll Management System/Dashboard.png" className="absolute inset-0 w-full h-full object-cover cursor-zoom-in bg-neutral-900" alt="Hero" onClick={() => openImage("/Payroll Management System/Dashboard.png", "Hero")} />
               </HeroDashboardMockup>
            </motion.div>
          </motion.div>

          <motion.hr initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={itemVariants} className="border-white/5 my-24" />

          {/* The Problem */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants} className="mb-32">
            <motion.h3 variants={itemVariants} className="text-sm font-mono text-indigo-400 uppercase tracking-widest mb-16 inline-block pb-2 border-b border-indigo-600/30">01 // The Problem Space</motion.h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
              <motion.div variants={itemVariants} className="space-y-8">
                <h4 className="text-3xl md:text-4xl text-white font-medium">Navigating shift chaos.</h4>
                <div className="space-y-6 text-neutral-400 text-lg font-light leading-relaxed">
                  <p>
                    Shift-based businesses struggle with tracking staff attendance, managing branch rosters, and correctly processing end-of-month payouts. Traditional solutions are paper-based or rely on cumbersome spreadsheets, leading to lost hours and payroll disputes.
                  </p>
                  <p>
                    The challenge was to design a platform that accommodated two completely different mental models: the on-the-go shift worker scanning in via a mobile screen, and the HR administrator doing complex filtering and report generation on desktop.
                  </p>
                </div>
              </motion.div>
              <motion.div variants={itemVariants} className="bg-white/5 rounded-3xl p-8 md:p-12 border border-white/10 flex flex-col justify-center">
                 <h5 className="text-xl font-medium text-white mb-6">Core Demands</h5>
                 <ul className="space-y-6">
                   <li className="flex gap-4">
                     <span className="text-indigo-400 text-xl">01</span>
                     <div>
                       <strong className="text-white block mb-1">Dual-Sided UX</strong>
                       <span className="text-neutral-500 text-sm">Consumer-grade mobile interface for staff alongside an enterprise-dense admin dashboard.</span>
                     </div>
                   </li>
                   <li className="flex gap-4">
                     <span className="text-indigo-400 text-xl">02</span>
                     <div>
                       <strong className="text-white block mb-1">Frictionless Check-Ins</strong>
                       <span className="text-neutral-500 text-sm">QR Code and fast workflow actions for starting and ending shifts seamlessly.</span>
                     </div>
                   </li>
                   <li className="flex gap-4">
                     <span className="text-indigo-400 text-xl">03</span>
                     <div>
                       <strong className="text-white block mb-1">Data Consolidation</strong>
                       <span className="text-neutral-500 text-sm">Aggregating multiple branches, admins, and staffs into a clear financial reporting view.</span>
                     </div>
                   </li>
                 </ul>
              </motion.div>
            </div>
          </motion.div>

          {/* Core App / Mobile View */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants} className="mb-32">
            <motion.h3 variants={itemVariants} className="text-sm font-mono text-indigo-400 uppercase tracking-widest mb-16 inline-block pb-2 border-b border-indigo-600/30">02 // The Staff Mobile App</motion.h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16">
              <motion.div variants={itemVariants} className="lg:col-span-5 flex flex-col justify-center">
                 <h4 className="text-3xl font-medium tracking-tight mb-6 text-white">Empowering the Frontline</h4>
                 <p className="text-neutral-400 font-light leading-relaxed mb-8">
                   For staff members, the mobile app acts as their primary interface to the company. The design eliminates unnecessary clutter, focusing on the immediate daily actions: scanning into a shift, checking today's roster, and reviewing personal earnings history. 
                 </p>
                 <p className="text-neutral-400 font-light leading-relaxed">
                   Using clear typographic hierarchy and bold call-to-action buttons, the mobile experience is designed for high-contrast usability, whether indoors or outdoors.
                 </p>
              </motion.div>

              <motion.div variants={itemVariants} className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8 items-center bg-indigo-950/10 p-8 rounded-[3rem] border border-indigo-500/10">
                <PhoneMockup src="/Payroll Management System/Landing - Today.png" alt="Mobile App Today View" />
                <div className="hidden sm:block mt-16">
                  <PhoneMockup src="/Payroll Management System/Login - Show QR.png" alt="QR Login View" />
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Admin Dashboard */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants} className="mb-32">
            <motion.h3 variants={itemVariants} className="text-sm font-mono text-indigo-400 uppercase tracking-widest mb-16 inline-block pb-2 border-b border-indigo-600/30">03 // The Admin Dashboard</motion.h3>
            
            <motion.div variants={itemVariants} className="space-y-8 bg-neutral-900/30 p-8 md:p-12 lg:p-16 rounded-[3rem] border border-white/5 relative overflow-hidden mb-16">
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
              
              <div className="max-w-3xl relative z-10">
                <h4 className="text-3xl font-medium text-white mb-6">Centralized Operations</h4>
                <p className="text-neutral-400 leading-relaxed font-light text-xl mb-12">
                  The desktop dashboard empowers administrators and branch managers to oversee operations at bird's eye view, quickly drilling down into specific staff profiles and earning reports. Complex financial and time-tracking data is visualized in easily digestible formats.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
                <div className="p-8 rounded-3xl bg-black/40 border border-white/5">
                  <h5 className="text-xl font-medium text-white mb-3">Shift Approvals</h5>
                  <p className="text-neutral-400 font-light text-sm leading-relaxed mb-6">Review, approve, or reject shift requests natively with complete transparency on shift overlaps.</p>
                  <img src="/Payroll Management System/Dashboard - Approve Staff.png" className="rounded-xl w-full border border-white/5 shadow-md" alt="Flow" />
                </div>

                <div className="p-8 rounded-3xl bg-black/40 border border-white/5">
                  <div className="mb-4">
                    <h5 className="text-xl font-medium text-white mb-3">Branch & Staff Management</h5>
                    <p className="text-neutral-400 font-light text-sm leading-relaxed mb-6">Quickly add admins, onboard new staff members, and assign them to various physical branches.</p>
                  </div>
                  <div className="flex gap-4">
                     <img src="/Payroll Management System/Branches.png" className="rounded-xl w-1/2 object-cover object-left-top h-32 border border-white/5 shadow-md" alt="Branches" />
                     <img src="/Payroll Management System/Staffs.png" className="rounded-xl w-1/2 object-cover object-left-top h-32 border border-white/5 shadow-md" alt="Staffs" />
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Competitor Analysis */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants} className="mb-32">
            <motion.h3 variants={itemVariants} className="text-sm font-mono text-indigo-400 uppercase tracking-widest mb-16 inline-block pb-2 border-b border-indigo-600/30">04 // Competitor Analysis</motion.h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
               <motion.div variants={itemVariants} className="bg-neutral-900/50 p-8 rounded-3xl border border-white/5">
                 <h4 className="text-xl font-medium text-white mb-4">Legacy Systems</h4>
                 <p className="text-neutral-400 font-light text-sm leading-relaxed mb-6">Traditional tools like ADP or paper ledgers heavily focus on HR compliance but lack modern, consumer-grade interfaces for ground-level staff.</p>
                 <div className="text-rose-400 text-sm font-mono">Cons: High friction, low mobile adoption.</div>
               </motion.div>
               <motion.div variants={itemVariants} className="bg-neutral-900/50 p-8 rounded-3xl border border-white/5">
                 <h4 className="text-xl font-medium text-white mb-4">Clock-in Only Apps</h4>
                 <p className="text-neutral-400 font-light text-sm leading-relaxed mb-6">Tools like TSheets excel at time tracking but lack seamless financial integration directly into admin shift approval workflows and multi-branch rollups.</p>
                 <div className="text-orange-400 text-sm font-mono">Cons: Fragmented data, complex integrations.</div>
               </motion.div>
               <motion.div variants={itemVariants} className="bg-indigo-900/20 p-8 rounded-3xl border border-indigo-500/20">
                 <h4 className="text-xl font-medium text-white mb-4">Our Methodology</h4>
                 <p className="text-neutral-400 font-light text-sm leading-relaxed mb-6">Combining the ease of consumer mobile applications with the density of enterprise dashboards. Staff use QR scans, while admins review financial rollups in real-time.</p>
                 <div className="text-emerald-400 text-sm font-mono">Pros: Unified data, zero training.</div>
               </motion.div>
            </div>
          </motion.div>

          {/* User Flow */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants} className="mb-32">
            <motion.h3 variants={itemVariants} className="text-sm font-mono text-indigo-400 uppercase tracking-widest mb-16 inline-block pb-2 border-b border-indigo-600/30">05 // User Flow</motion.h3>
            <div className="bg-black/30 rounded-[3rem] p-8 md:p-16 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent hidden md:block"></div>
               
               <motion.div variants={itemVariants} className="bg-neutral-900 border border-white/10 rounded-2xl p-6 w-full md:w-1/3 relative z-10 text-center">
                  <div className="w-12 h-12 rounded-full bg-indigo-500/20 text-indigo-400 mx-auto flex items-center justify-center mb-4">
                     <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" /></svg>
                  </div>
                  <h5 className="text-white font-medium mb-2">Staff Request Shift</h5>
                  <p className="text-neutral-500 text-sm font-light">Staff members apply for upcoming shifts via the mobile application calendar.</p>
               </motion.div>
               
               <motion.div variants={itemVariants} className="bg-neutral-900 border border-white/10 rounded-2xl p-6 w-full md:w-1/3 relative z-10 text-center shadow-[0_0_30px_rgba(79,70,229,0.15)]">
                  <div className="w-12 h-12 rounded-full bg-violet-500/20 text-violet-400 mx-auto flex items-center justify-center mb-4">
                     <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <h5 className="text-white font-medium mb-2">Admin Approval</h5>
                  <p className="text-neutral-500 text-sm font-light">Managers review shift schedules and approve or modify requests directly from the dashboard.</p>
               </motion.div>
               
               <motion.div variants={itemVariants} className="bg-neutral-900 border border-white/10 rounded-2xl p-6 w-full md:w-1/3 relative z-10 text-center">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center mb-4">
                     <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  </div>
                  <h5 className="text-white font-medium mb-2">QR Scan & Earning</h5>
                  <p className="text-neutral-500 text-sm font-light">Staff generate unique QR codes to start the shift; earnings calculate automatically.</p>
               </motion.div>
            </div>
          </motion.div>

          {/* Full Dashboard Gallery Categorized */}
          <div className="mb-32">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants} className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div>
                <motion.h3 variants={itemVariants} className="text-sm font-mono text-indigo-400 uppercase tracking-widest inline-block pb-2 border-b border-indigo-600/30">06 // Complete Interface Ecosystem</motion.h3>
                <motion.h2 variants={itemVariants} className="text-4xl text-white font-light mt-8">Extensive Surface Area</motion.h2>
              </div>
              <motion.p variants={itemVariants} className="text-neutral-500 font-mono text-sm max-w-sm text-right">Explore the various modules of the system grouped by functionality.</motion.p>
            </motion.div>

            <div className="space-y-24">
              
              {/* Category 1 */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants} className="space-y-8">
                <div className="border-l-2 border-indigo-500 pl-4 py-1">
                  <h4 className="text-2xl font-medium text-white mb-2">Staff Mobile Application</h4>
                  <p className="text-neutral-500 text-sm">Consumer-grade screens for employees on the ground.</p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <ZoomableImage src="/Payroll Management System/Landing - Menu.png" alt="Menu" onClick={openImage} />
                  <ZoomableImage src="/Payroll Management System/Landing - Today.png" alt="Today Screen" onClick={openImage} />
                  <ZoomableImage src="/Payroll Management System/Landing - Today - Calendar.png" alt="Calendar" onClick={openImage} />
                  <ZoomableImage src="/Payroll Management System/Apply Shift.png" alt="Apply Shift" onClick={openImage} />
                  
                  <ZoomableImage src="/Payroll Management System/Profile.png" alt="Profile" onClick={openImage} />
                  <ZoomableImage src="/Payroll Management System/Earning History.png" alt="Earnings" onClick={openImage} />
                  <ZoomableImage src="/Payroll Management System/Cancel Shift.png" alt="Cancel Shift" onClick={openImage} />
                  <ZoomableImage src="/Payroll Management System/Start.png" alt="Start Shift" onClick={openImage} />

                  <ZoomableImage src="/Payroll Management System/Login.png" alt="Login" onClick={openImage} />
                  <ZoomableImage src="/Payroll Management System/OTP.png" alt="OTP Verify" onClick={openImage} />
                  <ZoomableImage src="/Payroll Management System/Create new password.png" alt="New Password" onClick={openImage} />
                  <ZoomableImage src="/Payroll Management System/Login - Show QR.png" alt="Show QR" onClick={openImage} />
                </div>
              </motion.div>

              {/* Category 2 */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants} className="space-y-8">
                <div className="border-l-2 border-violet-500 pl-4 py-1">
                  <h4 className="text-2xl font-medium text-white mb-2">Admin Dashboard</h4>
                  <p className="text-neutral-500 text-sm">Centralized overview of pending requests, branches, and financials.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <ZoomableImage src="/Payroll Management System/Dashboard.png" alt="Dashboard Overview" onClick={openImage} />
                  </div>
                  <ZoomableImage src="/Payroll Management System/Dashboard - Approve Staff.png" alt="Approve Request" onClick={openImage} />
                  <ZoomableImage src="/Payroll Management System/Dashboard - Shift Rejected.png" alt="Reject Request" onClick={openImage} />
                  <ZoomableImage src="/Payroll Management System/Dashboard - Add Shift.png" alt="Add Shift" onClick={openImage} />
                  <ZoomableImage src="/Payroll Management System/Dashboard - Notifications.png" alt="Notifications" onClick={openImage} />
                </div>
              </motion.div>

              {/* Category 3 */}
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants} className="space-y-8">
                <div className="border-l-2 border-emerald-500 pl-4 py-1">
                  <h4 className="text-2xl font-medium text-white mb-2">Entity Management & Reports</h4>
                  <p className="text-neutral-500 text-sm">Dense data tables for staffs, branches, and monthly earning reports.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <ZoomableImage src="/Payroll Management System/Reports.png" alt="Reports View" onClick={openImage} />
                  </div>
                  <ZoomableImage src="/Payroll Management System/Staffs.png" alt="Staff Directory" onClick={openImage} />
                  <ZoomableImage src="/Payroll Management System/Staff Details v1 (Sliding Panel).png" alt="Staff Detail" onClick={openImage} />
                  <ZoomableImage src="/Payroll Management System/Branches.png" alt="Branches List" onClick={openImage} />
                  <ZoomableImage src="/Payroll Management System/Branch details.png" alt="Branch Details" onClick={openImage} />
                  <ZoomableImage src="/Payroll Management System/Admins.png" alt="Admins" onClick={openImage} />
                  <ZoomableImage src="/Payroll Management System/Add New Staff.png" alt="Onboarding Modal" onClick={openImage} />
                </div>
              </motion.div>

            </div>
          </div>
          
          {/* Outro */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={containerVariants} className="max-w-3xl mx-auto text-center mt-32 mb-16">
              <motion.h4 variants={itemVariants} className="text-3xl font-medium text-white mb-6">Conclusion</motion.h4>
              <motion.p variants={itemVariants} className="text-neutral-400 font-light text-lg">Thank you for exploring the Payroll Management System case study.</motion.p>
          </motion.div>

      </div>
    </div>
  );
}
