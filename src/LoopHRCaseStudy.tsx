import { useState, useEffect } from "react";
import { Project } from "./data/projects";
import { motion, AnimatePresence, useMotionValue, useTransform } from "motion/react";
import { ImageViewer } from "./components/ImageViewer";

// Mobile devices composite for the hero section
function HeroMobileComposite({ mainSrc, secondarySrc, className = "", onMainClick, onSecondaryClick }: { mainSrc: string, secondarySrc: string, className?: string, onMainClick?: () => void, onSecondaryClick?: () => void }) {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useTransform(mouseY, [0, 1], [4, -4]);
  const rotateY = useTransform(mouseX, [0, 1], [-6, 6]);
  
  // Parallax offset for the floating secondary device
  const secondaryX = useTransform(mouseX, [0, 1], [25, -25]);
  const secondaryY = useTransform(mouseY, [0, 1], [15, -15]);

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
    <div className={`relative w-full max-w-[800px] mx-auto mt-0 md:mt-4 flex justify-center ${className}`} style={{ perspective: "2500px" }}>
      <motion.div 
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        className="relative flex justify-center w-full transition-transform ease-out duration-300"
      >
        {/* Deep ambient glow behind */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-teal-800/30 blur-[120px] opacity-80"
          style={{ transform: "translateZ(-150px)" }}
        />

        {/* Main Mobile Window */}
        <div 
          className="relative w-[50%] md:w-[45%] min-w-[200px] max-w-[320px] rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-white dark:bg-neutral-950 border-[8px] md:border-[12px] border-neutral-200 dark:border-neutral-800 z-10 mr-12 md:mr-24"
          style={{
            transform: "translateZ(0px)",
            boxShadow: '0 40px 80px -20px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05) inset'
          }}
        >
          {/* Phone Notch/Island */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-5 md:h-7 bg-neutral-200 dark:bg-neutral-800 rounded-b-[12px] md:rounded-b-[18px] z-30" />
           
          <div className="relative w-full aspect-[9/19.5] bg-white dark:bg-neutral-900 group">
             <img src={mainSrc} alt="Main Mobile View" onClick={onMainClick} className="w-full h-full object-cover object-top cursor-zoom-in" />
             <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 pointer-events-none" />
          </div>
        </div>

        {/* Overlapping Secondary Mobile Device */}
        <motion.div 
          className="absolute right-[5%] md:right-[15%] top-[10%] w-[45%] md:w-[40%] min-w-[180px] max-w-[300px] rounded-[1.75rem] md:rounded-[2.5rem] overflow-hidden bg-white dark:bg-neutral-950 border-[6px] md:border-[10px] border-neutral-200 dark:border-neutral-800 z-20 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)]"
          style={{ 
            x: secondaryX, 
            y: secondaryY,
            transform: "translateZ(80px)"
          }}
        >
           {/* Phone Notch/Island */}
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-4 md:h-6 bg-neutral-200 dark:bg-neutral-800 rounded-b-[10px] md:rounded-b-[14px] z-30" />
           
           <div className="relative w-full aspect-[9/19.5] bg-white dark:bg-neutral-900 group">
             <img src={secondarySrc} alt="Secondary Mobile View" onClick={onSecondaryClick} className="w-full h-full object-cover object-top cursor-zoom-in" />
             <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 pointer-events-none" />
             <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent mix-blend-overlay pointer-events-none opacity-50" />
           </div>
        </motion.div>

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
      className={`relative group cursor-zoom-in overflow-hidden shadow-xl bg-neutral-100 dark:bg-neutral-900/50 ${className || "rounded-3xl border border-black/5 dark:border-white/5"}`}
      onClick={() => onClick(src, alt)}
    >
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 dark:group-hover:bg-white/5 transition-colors duration-300 z-10" />
      <img src={src} alt={alt} className="w-full h-auto object-cover relative z-0 opacity-100" />
    </motion.div>
  );
}

function ModernBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0 mix-blend-screen">
      {/* Subtle Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_50%,#000_10%,transparent_80%)] opacity-50" />
      
      {/* Static Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none blur-3xl opacity-40 bg-[radial-gradient(circle,rgba(20,184,166,0.05)_0%,rgba(13,148,136,0.02)_40%,transparent_60%)]" />
      
      {/* Soft color highlights */}
      <div className="absolute -top-[10%] left-[10%] w-[40%] h-[50%] bg-teal-500/10 rounded-full blur-[140px]" />
    </div>
  );
}

export default function LoopHRCaseStudy({ project }: { project: Project }) {
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

      <div className="w-full bg-white/5 dark:bg-neutral-950/50 backdrop-blur-xl border border-black/5 dark:border-white/10 text-neutral-800 dark:text-neutral-300 font-sans mt-8 pt-12 lg:pt-24 rounded-[3rem] px-4 md:px-12 lg:px-24 mb-12 shadow-xl dark:shadow-[0_0_80px_-20px_rgba(255,255,255,0.05)] relative overflow-hidden">
        
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
              <div className="inline-block px-4 py-1.5 rounded-full border border-teal-600/30 bg-teal-800/10 dark:bg-teal-800/20 text-teal-600 dark:text-teal-400 text-xs font-mono uppercase tracking-widest mb-6">Case Study</div>
              <h1 className="text-5xl md:text-7xl font-sans tracking-tighter text-neutral-900 dark:text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-teal-500 via-emerald-500 to-teal-500 dark:from-teal-200 dark:via-emerald-200 dark:to-teal-400">{project.name}</h1>
              <p className="text-2xl md:text-3xl font-light max-w-2xl leading-tight text-neutral-600 dark:text-neutral-400 mb-12">
                An AI-powered mobile HR management system designed for seamless attendance tracking, scheduling, and engaged collaboration.
              </p>
              
              <div className="flex flex-wrap gap-8 md:gap-16 pt-8 border-t border-black/5 dark:border-white/10">
                <div>
                  <p className="text-xs uppercase tracking-widest text-neutral-500 mb-2 font-mono">Platform</p>
                  <p className="text-lg text-neutral-900 dark:text-white font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
                    Mobile App (iOS & Android)
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-neutral-500 mb-2 font-mono">Timeline</p>
                  <p className="text-lg text-neutral-900 dark:text-white font-medium flex items-center gap-2">
                    May 2024
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-neutral-500 mb-2 font-mono">Tools</p>
                  <div className="flex flex-wrap gap-3 mt-1">
                    <span className="px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-sm text-neutral-700 dark:text-neutral-300">Figma</span>
                    <span className="px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-sm text-neutral-700 dark:text-neutral-300">Mobile UI/UX</span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <div className="w-full relative group z-10 pt-8 lg:pt-0">
               <motion.div 
                variants={itemVariants}
                className="relative flex justify-center"
               >
                 <HeroMobileComposite 
                   mainSrc="/loop - Your AI-Powered HR System/13. Home – Default.png"
                   secondarySrc="/loop - Your AI-Powered HR System/19. AI Chat – Home.png"
                   onMainClick={() => openImage("/loop - Your AI-Powered HR System/13. Home – Default.png", "Home Screen")}
                   onSecondaryClick={() => openImage("/loop - Your AI-Powered HR System/19. AI Chat – Home.png", "AI Chat")}
                 />
               </motion.div>
            </div>
          </motion.div>

          <motion.hr initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={itemVariants} className="border-black/5 dark:border-white/5 my-24" />

          {/* Project Overview */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants} className="mb-32">
            <motion.h3 variants={itemVariants} className="text-sm font-mono text-teal-600 dark:text-teal-400 uppercase tracking-widest mb-16 inline-block pb-2 border-b border-teal-600/30">01 // The Solution</motion.h3>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-left group">
              <div className="col-span-1 md:col-span-4">
                <h4 className="text-2xl font-light text-neutral-900 dark:text-white group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">Frictionless HR</h4>
              </div>
              <div className="col-span-1 md:col-span-8 space-y-6">
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed font-light text-xl">
                  Loop HR was designed with a mobile-first philosophy, replacing complex enterprise web portals with an accessible and modern native application. The primary design objective was to reduce the cognitive load for standard employee processes. 
                </p>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed font-light text-xl">
                  Through dynamic widgets, intuitive AI-driven conversational interfaces, and intelligent attendance validation via Face Recognition and Location data, the app streamlines everything from clocking in to reviewing monthly payslips and managing leaves.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Core Features */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants} className="mb-32">
            <motion.h3 variants={itemVariants} className="text-sm font-mono text-teal-600 dark:text-teal-400 uppercase tracking-widest mb-16 inline-block pb-2 border-b border-teal-600/30">02 // Core Interventions</motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div variants={itemVariants} className="p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-900/50 border border-black/5 dark:border-white/5 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:border-teal-500/20 transition-all duration-300">
                 <div className="w-12 h-12 rounded-xl bg-black/5 dark:bg-white/5 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-6 text-xl">01</div>
                 <h4 className="text-xl font-medium text-neutral-900 dark:text-white mb-4">Intelligent Attendance</h4>
                 <p className="text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">By shifting from a standard button-tap checkout to multi-factor verifications including GPS geofencing and facial recognition, ensuring robust data precision seamlessly.</p>
              </motion.div>
              <motion.div variants={itemVariants} className="p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-900/50 border border-black/5 dark:border-white/5 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:border-teal-500/20 transition-all duration-300">
                 <div className="w-12 h-12 rounded-xl bg-black/5 dark:bg-white/5 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-6 text-xl">02</div>
                 <h4 className="text-xl font-medium text-neutral-900 dark:text-white mb-4">AI-Backed Guidance</h4>
                 <p className="text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">Integrated a conversational AI bot to instantly resolve policy questions, guide expense claims, and act as a persistent digital HR assistant inside the employee's pocket.</p>
              </motion.div>
              <motion.div variants={itemVariants} className="p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-900/50 border border-black/5 dark:border-white/5 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:border-teal-500/20 transition-all duration-300">
                 <div className="w-12 h-12 rounded-xl bg-black/5 dark:bg-white/5 text-teal-600 dark:text-teal-400 flex items-center justify-center mb-6 text-xl">03</div>
                 <h4 className="text-xl font-medium text-neutral-900 dark:text-white mb-4">Unified Management Center</h4>
                 <p className="text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">Aggregated separated workflows (Payslips, Expenses, Leaves, Approvals) into single, highly scannable profile and action centers with streamlined request forms.</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Visual Gallery */}
          <div className="mb-32">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants} className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div>
                <motion.h3 variants={itemVariants} className="text-sm font-mono text-teal-600 dark:text-teal-400 uppercase tracking-widest inline-block pb-2 border-b border-teal-600/30">03 // Interface Details</motion.h3>
                <motion.h2 variants={itemVariants} className="text-4xl text-neutral-900 dark:text-white font-light mt-8">App Modules Gallery</motion.h2>
              </div>
              <motion.p variants={itemVariants} className="text-neutral-500 font-mono text-sm">Click any frame to examine.</motion.p>
            </motion.div>

            <div className="space-y-32">

                {/* Dashboard & Onboarding */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants}>
                   <div className="flex items-center gap-4 mb-12">
                     <div className="h-[1px] bg-teal-500/10 flex-grow" />
                     <h4 className="text-xl font-medium text-teal-600 dark:text-teal-400 px-4 font-mono">1 / App Launch & Home Hub</h4>
                     <div className="h-[1px] bg-teal-500/10 flex-grow" />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    <ZoomableImage src="/loop - Your AI-Powered HR System/1. Splash Screen.png" alt="Splash Screen" onClick={openImage} />
                    <ZoomableImage src="/loop - Your AI-Powered HR System/2. Onboarding - 1.png" alt="Onboarding" onClick={openImage} />
                    <ZoomableImage src="/loop - Your AI-Powered HR System/5. Login - Default.png" alt="Login" onClick={openImage} />
                    <ZoomableImage src="/loop - Your AI-Powered HR System/12. PIN Verification.png" alt="Authentication" onClick={openImage} />
                    <ZoomableImage src="/loop - Your AI-Powered HR System/13. Home – Default.png" alt="Home Default" onClick={openImage} />
                    <ZoomableImage src="/loop - Your AI-Powered HR System/14. Home – Checked In.png" alt="Checked In" onClick={openImage} />
                    <ZoomableImage src="/loop - Your AI-Powered HR System/17. Home – Shortcut Expanded.png" alt="Shortcuts" onClick={openImage} />
                    <ZoomableImage src="/loop - Your AI-Powered HR System/18. Home – Notification Preview.png" alt="Notifications" onClick={openImage} />
                  </div>
                </motion.div>

                {/* AI Assistant */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants}>
                   <div className="flex items-center gap-4 mb-12">
                     <div className="h-[1px] bg-teal-500/10 flex-grow" />
                     <h4 className="text-xl font-medium text-teal-600 dark:text-teal-400 px-4 font-mono">2 / AI Conversational Agent</h4>
                     <div className="h-[1px] bg-teal-500/10 flex-grow" />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    <ZoomableImage src="/loop - Your AI-Powered HR System/19. AI Chat – Home.png" alt="AI Chat Home" onClick={openImage} />
                    <ZoomableImage src="/loop - Your AI-Powered HR System/20. AI Chat – Home Expanded.png" alt="AI Chat Experience" onClick={openImage} />
                    <ZoomableImage src="/loop - Your AI-Powered HR System/21. AI Chat – Suggested Prompts.png" alt="Suggested Prompts" onClick={openImage} />
                    <ZoomableImage src="/loop - Your AI-Powered HR System/22. AI Chat – Referenced Document View.png" alt="Document Reference view" onClick={openImage} />
                  </div>
                </motion.div>

                {/* Operational: Attendance & Timesheets */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants}>
                   <div className="flex items-center gap-4 mb-12">
                     <div className="h-[1px] bg-teal-500/10 flex-grow" />
                     <h4 className="text-xl font-medium text-teal-600 dark:text-teal-400 px-4 font-mono">3 / Operations: Attendance & Timesheets</h4>
                     <div className="h-[1px] bg-teal-500/10 flex-grow" />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    <ZoomableImage src="/loop - Your AI-Powered HR System/25. Attendance – Face Validation.png" alt="Face Validation" onClick={openImage} />
                    <ZoomableImage src="/loop - Your AI-Powered HR System/24. Attendance – Location Validation.png" alt="Location Validation" onClick={openImage} />
                    <ZoomableImage src="/loop - Your AI-Powered HR System/26. Attendance – QR Validation.png" alt="QR Code Validation" onClick={openImage} />
                    <ZoomableImage src="/loop - Your AI-Powered HR System/32. Attendance Calendar.png" alt="Attendance Calendar" onClick={openImage} />
                    <ZoomableImage src="/loop - Your AI-Powered HR System/30. Attendance History – Monthly Summary.png" alt="Attendance Summary" onClick={openImage} />
                    <ZoomableImage src="/loop - Your AI-Powered HR System/42. Timesheet – Weekly.png" alt="Weekly Timesheet" onClick={openImage} />
                    <ZoomableImage src="/loop - Your AI-Powered HR System/43. Timesheet – Monthly.png" alt="Monthly Timesheet" onClick={openImage} />
                    <ZoomableImage src="/loop - Your AI-Powered HR System/45. Timesheet – Submitted Successfully.png" alt="Submit Success" onClick={openImage} />
                    <ZoomableImage src="/loop - Your AI-Powered HR System/46. Timesheet – Approval Status.png" alt="Approval Status" onClick={openImage} />
                  </div>
                </motion.div>

                {/* Self Service: Leaves & Expenses */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants}>
                   <div className="flex items-center gap-4 mb-12">
                     <div className="h-[1px] bg-teal-500/10 flex-grow" />
                     <h4 className="text-xl font-medium text-teal-600 dark:text-teal-400 px-4 font-mono">4 / Self Service: Leaves, Payslips, Expenses</h4>
                     <div className="h-[1px] bg-teal-500/10 flex-grow" />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    <ZoomableImage src="/loop - Your AI-Powered HR System/48. Leave - Home.png" alt="Leave Management" onClick={openImage} />
                    <ZoomableImage src="/loop - Your AI-Powered HR System/50. Leave - Select Type.png" alt="Leave Type Selection" onClick={openImage} />
                    <ZoomableImage src="/loop - Your AI-Powered HR System/54. Leave - Review Summary.png" alt="Leave Review" onClick={openImage} />
                    <ZoomableImage src="/loop - Your AI-Powered HR System/60. Overtime - Home.png" alt="Overtime Request" onClick={openImage} />
                    <ZoomableImage src="/loop - Your AI-Powered HR System/64. Payslip – Home.png" alt="Payslip Overview" onClick={openImage} />
                    <ZoomableImage src="/loop - Your AI-Powered HR System/67. Payslip - Basic Salary.png" alt="Payslip Data" onClick={openImage} />
                    <ZoomableImage src="/loop - Your AI-Powered HR System/71. Expense - Overview.png" alt="Expense Overview" onClick={openImage} />
                    <ZoomableImage src="/loop - Your AI-Powered HR System/74. Expense – Create Request.png" alt="Expense Creation" onClick={openImage} />
                    <ZoomableImage src="/loop - Your AI-Powered HR System/79. Expense – Detail.png" alt="Expense Details" onClick={openImage} />
                  </div>
                </motion.div>

            </div>
          </div>

           <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants} className="py-24 text-center border-t border-black/5 dark:border-white/5 bg-gradient-to-t from-black/5 dark:from-white/5 to-transparent rounded-b-[3rem] px-4 -mx-4 md:-mx-12 lg:-mx-24 -mb-12">
              <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl text-neutral-900 dark:text-white font-sans tracking-tight mb-6">EXPLORATION COMPLETE</motion.h2>
              <motion.p variants={itemVariants} className="text-neutral-500 font-light text-lg">Thank you for reviewing the Loop HR integration study.</motion.p>
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
