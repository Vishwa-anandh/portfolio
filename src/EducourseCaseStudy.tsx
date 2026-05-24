import { useState, useEffect } from "react";
import { Project } from "./data/projects";
import { motion, AnimatePresence, useMotionValue, useTransform } from "motion/react";
import { ImageViewer } from "./components/ImageViewer";

// A layered desktop and mobile multi-device composite for the hero section
function HeroDevicesComposite({ desktopSrc, mobileSrc, className = "", onDesktopClick, onMobileClick }: { desktopSrc: string, mobileSrc: string, className?: string, onDesktopClick?: () => void, onMobileClick?: () => void }) {
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useTransform(mouseY, [0, 1], [3, -3]);
  const rotateY = useTransform(mouseX, [0, 1], [-4, 4]);
  
  // Parallax offset for the floating mobile device
  const mobileX = useTransform(mouseX, [0, 1], [15, -15]);
  const mobileY = useTransform(mouseY, [0, 1], [15, -15]);

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
    <div className={`relative w-full max-w-[1000px] mx-auto mt-0 md:mt-4 ${className}`} style={{ perspective: "2500px" }}>
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
          className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-800/30 blur-[120px] opacity-80"
          style={{ transform: "translateZ(-150px)" }}
        />

        {/* Main Desktop Window */}
        <div 
          className="relative rounded-xl md:rounded-[1.25rem] overflow-hidden bg-white dark:bg-neutral-950 border border-black/10 dark:border-white/10 flex flex-col z-10 w-[90%] md:w-[85%] ml-0 md:ml-4"
          style={{
            transform: "translateZ(0px)",
            boxShadow: '0 40px 80px -20px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05) inset'
          }}
        >
          {/* Subtle MacOS-like Top Bar */}
          <div className="h-8 md:h-10 border-b border-black/5 dark:border-white/10 bg-[#f9f9f9] dark:bg-[#111] flex items-center px-4 gap-2">
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-black/10 dark:bg-white/10"></div>
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-black/10 dark:bg-white/10"></div>
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-black/10 dark:bg-white/10"></div>
          </div>

          <div className="relative w-full aspect-[16/10] bg-white dark:bg-neutral-900 group">
             <img src={desktopSrc} alt="Desktop View" onClick={onDesktopClick} className="absolute inset-0 w-full h-full object-cover object-left-top cursor-zoom-in" />
             <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 pointer-events-none" />
             <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 mix-blend-overlay pointer-events-none" />
          </div>
        </div>

        {/* Overlapping Mobile Device */}
        <motion.div 
          className="absolute -right-2 -bottom-6 md:-right-8 md:-bottom-12 w-[35%] md:w-[28%] min-w-[140px] max-w-[280px] rounded-[1.75rem] md:rounded-[2.5rem] overflow-hidden bg-white dark:bg-neutral-950 border-[6px] md:border-[10px] border-neutral-200 dark:border-neutral-800 z-20 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)]"
          style={{ 
            x: mobileX, 
            y: mobileY,
            transform: "translateZ(80px)"
          }}
        >
           {/* Phone Notch/Island */}
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-4 md:h-6 bg-neutral-200 dark:bg-neutral-800 rounded-b-[10px] md:rounded-b-[14px] z-30" />
           
           <div className="relative w-full aspect-[9/19.5] bg-white dark:bg-neutral-900 group">
             <img src={mobileSrc} alt="Mobile View" onClick={onMobileClick} className="w-full h-full object-cover object-top cursor-zoom-in" />
             <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 pointer-events-none" />
             <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent mix-blend-overlay pointer-events-none opacity-50" />
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
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      className={`relative group cursor-zoom-in overflow-hidden shadow-2xl bg-neutral-100 dark:bg-neutral-900/50 ${className || "rounded-2xl border border-black/5 dark:border-white/5"}`}
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
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_100%_100%_at_50%_50%,#000_10%,transparent_80%)] opacity-70" />
      
      {/* Static Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none blur-3xl opacity-50 bg-[radial-gradient(circle,rgba(99,102,241,0.05)_0%,rgba(168,85,247,0.02)_40%,transparent_60%)]" />
      
      {/* Diagonal light rays */}
      <div className="absolute -top-[20%] left-[-10%] w-[40%] h-[150%] bg-indigo-500/5 rotate-45 blur-[120px]" />
      <div className="absolute top-[20%] right-[-10%] w-[30%] h-[150%] bg-purple-600/5 -rotate-45 blur-[120px]" />
    </div>
  );
}

export default function EducourseCaseStudy({ project }: { project: Project }) {
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
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] -z-10 pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px] -z-10 pointer-events-none" />

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
              <div className="inline-block px-4 py-1.5 rounded-full border border-indigo-600/30 bg-indigo-800/10 dark:bg-indigo-800/20 text-indigo-600 dark:text-indigo-300 text-xs font-mono uppercase tracking-widest mb-6">Case Study</div>
              <h1 className="text-5xl md:text-7xl font-sans tracking-tighter text-neutral-900 dark:text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 dark:from-indigo-100 dark:via-purple-200 dark:to-indigo-500">{project.name}</h1>
              <p className="text-2xl md:text-3xl font-light max-w-2xl leading-tight text-neutral-600 dark:text-neutral-400 mb-12">
                A comprehensive AI-powered platform for online course creation, coaching, and community building.
              </p>
              
              <div className="flex flex-wrap gap-8 md:gap-16 pt-8 border-t border-black/5 dark:border-white/10">
                <div>
                  <p className="text-xs uppercase tracking-widest text-neutral-500 mb-2 font-mono">Platform</p>
                  <p className="text-lg text-neutral-900 dark:text-white font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse"></span>
                    Web & Mobile App
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-neutral-500 mb-2 font-mono">Timeline</p>
                  <p className="text-lg text-neutral-900 dark:text-white font-medium flex items-center gap-2">
                    Aug 2024
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-widest text-neutral-500 mb-2 font-mono">Tools</p>
                  <div className="flex flex-wrap gap-3 mt-1">
                    <span className="px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-sm text-neutral-700 dark:text-neutral-300">Figma</span>
                    <span className="px-3 py-1 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10 text-sm text-neutral-700 dark:text-neutral-300">UI/UX Design</span>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <div className="w-full relative group z-10 hidden md:block pt-4 lg:pt-0">
              <motion.div 
                variants={itemVariants}
                className="relative flex justify-center"
              >
                 <div className="absolute -inset-8 bg-gradient-to-tr from-indigo-600/20 via-purple-700/10 to-indigo-800/20 rounded-[2rem] blur-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-700 -z-10" />
                 <HeroDevicesComposite 
                   desktopSrc="/Educourse - AI for Online Course/Home Page - Dekstop.png"
                   mobileSrc="/Educourse - AI for Online Course/Home Page - Mobile.png"
                   onDesktopClick={() => openImage("/Educourse - AI for Online Course/Home Page - Dekstop.png", "Hero Desktop")}
                   onMobileClick={() => openImage("/Educourse - AI for Online Course/Home Page - Mobile.png", "Hero Mobile")}
                   className="transform transition-transform duration-500 hover:scale-[1.02]"
                 />
              </motion.div>
            </div>
            
            <motion.div variants={itemVariants} className="w-full md:hidden relative flex justify-center mt-12 mb-16 px-4">
               <div className="absolute -inset-1 bg-gradient-to-tr from-indigo-600/20 to-purple-800/20 rounded-3xl blur-xl opacity-50" />
               <HeroDevicesComposite 
                 desktopSrc="/Educourse - AI for Online Course/Home Page - Dekstop.png"
                 mobileSrc="/Educourse - AI for Online Course/Home Page - Mobile.png"
                 onDesktopClick={() => openImage("/Educourse - AI for Online Course/Home Page - Dekstop.png", "Hero Desktop")}
                 onMobileClick={() => openImage("/Educourse - AI for Online Course/Home Page - Mobile.png", "Hero Mobile")}
               />
            </motion.div>
          </motion.div>

          <motion.hr initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={itemVariants} className="border-black/5 dark:border-white/5 my-24" />

          {/* Project Overview */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants} className="mb-32">
            <motion.h3 variants={itemVariants} className="text-sm font-mono text-indigo-500 dark:text-indigo-400 uppercase tracking-widest mb-16 inline-block pb-2 border-b border-indigo-600/30">01 // The Platform</motion.h3>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 text-left group">
              <div className="col-span-1 md:col-span-4">
                <h4 className="text-2xl font-light text-neutral-900 dark:text-white group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors">Empowering Creators</h4>
              </div>
              <div className="col-span-1 md:col-span-8 space-y-6">
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed font-light text-xl">
                  Educourse is designed to be the ultimate all-in-one platform for modern educators and online course creators. Instead of connecting multiple disparate tools for hosting, billing, community management, and coaching, Educourse brings them into a single, cohesive dashboard empowered by AI.
                </p>
                <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed font-light text-xl">
                  By integrating native AI tools, creators can generate course syllabuses, synthesize lessons, and draft marketing materials rapidly. The platform also offers robust features like podcast hosting, coaching scheduling, and built-in community spaces, ensuring students stay engaged and creators maximize revenue.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Core Features */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants} className="mb-32">
            <motion.h3 variants={itemVariants} className="text-sm font-mono text-indigo-500 dark:text-indigo-400 uppercase tracking-widest mb-16 inline-block pb-2 border-b border-indigo-600/30">02 // Core Systems</motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div variants={itemVariants} className="p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-900/50 border border-black/5 dark:border-white/5 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:border-indigo-500/20 transition-all duration-300">
                 <div className="w-12 h-12 rounded-xl bg-black/5 dark:bg-white/5 text-indigo-600 dark:text-indigo-300 flex items-center justify-center mb-6 text-xl">01</div>
                 <h4 className="text-xl font-medium text-neutral-900 dark:text-white mb-4">AI-Driven Creation</h4>
                 <p className="text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">Integrated AI assistant helps creators structure their curriculum, draft lesson content, and automatically generate quizzes and knowledge checks to accelerate the course building process.</p>
              </motion.div>
              <motion.div variants={itemVariants} className="p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-900/50 border border-black/5 dark:border-white/5 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:border-indigo-500/20 transition-all duration-300">
                 <div className="w-12 h-12 rounded-xl bg-black/5 dark:bg-white/5 text-indigo-600 dark:text-indigo-300 flex items-center justify-center mb-6 text-xl">02</div>
                 <h4 className="text-xl font-medium text-neutral-900 dark:text-white mb-4">Communities & Coaching</h4>
                 <p className="text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">Beyond passive video courses, the platform offers integrated social feeds, community groups, and 1-on-1 coaching scheduling to create high-value hybrid learning experiences.</p>
              </motion.div>
              <motion.div variants={itemVariants} className="p-8 rounded-3xl bg-neutral-50 dark:bg-neutral-900/50 border border-black/5 dark:border-white/5 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:border-indigo-500/20 transition-all duration-300">
                 <div className="w-12 h-12 rounded-xl bg-black/5 dark:bg-white/5 text-indigo-600 dark:text-indigo-300 flex items-center justify-center mb-6 text-xl">03</div>
                 <h4 className="text-xl font-medium text-neutral-900 dark:text-white mb-4">Robust Analytics</h4>
                 <p className="text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">Detailed dashboards provide immediate visibility into course sales, student progress, engagement metrics, and revenue tracking across web and mobile platforms.</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Visual Gallery */}
          <div className="mb-32">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants} className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
              <div>
                <motion.h3 variants={itemVariants} className="text-sm font-mono text-indigo-500 dark:text-indigo-400 uppercase tracking-widest inline-block pb-2 border-b border-indigo-600/30">03 // Full Architecture</motion.h3>
                <motion.h2 variants={itemVariants} className="text-4xl text-neutral-900 dark:text-white font-light mt-8">Platform Interfaces</motion.h2>
              </div>
              <motion.p variants={itemVariants} className="text-neutral-500 font-mono text-sm">Click any frame to examine.</motion.p>
            </motion.div>

            <div className="space-y-32">

                {/* Dashboard & Analytics */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants}>
                   <div className="flex items-center gap-4 mb-12">
                     <div className="h-[1px] bg-indigo-500/10 flex-grow" />
                     <h4 className="text-xl font-medium text-indigo-600 dark:text-indigo-300 px-4 font-mono">1 / Dashboards & Reporting</h4>
                     <div className="h-[1px] bg-indigo-500/10 flex-grow" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <ZoomableImage src="/Educourse - AI for Online Course/Home Page - Dekstop.png" alt="Home Dashboard" onClick={openImage} />
                    <ZoomableImage src="/Educourse - AI for Online Course/Analystics - Dekstop.png" alt="Analytics" onClick={openImage} />
                    <ZoomableImage src="/Educourse - AI for Online Course/Analystics Courses - Dekstop.png" alt="Course Analytics" onClick={openImage} />
                    <ZoomableImage src="/Educourse - AI for Online Course/Filter Analystics Courses - Dekstop.png" alt="Filter Analytics" onClick={openImage} />
                    <ZoomableImage src="/Educourse - AI for Online Course/Product Page - Dekstop.png" alt="Product Page" onClick={openImage} />
                    <ZoomableImage src="/Educourse - AI for Online Course/Sales Page - Dekstop.png" alt="Sales Page" onClick={openImage} />
                  </div>
                </motion.div>

                {/* Course Creation */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants}>
                   <div className="flex items-center gap-4 mb-12">
                     <div className="h-[1px] bg-indigo-500/10 flex-grow" />
                     <h4 className="text-xl font-medium text-indigo-600 dark:text-indigo-300 px-4 font-mono">2 / Course Builder & Curriculum</h4>
                     <div className="h-[1px] bg-indigo-500/10 flex-grow" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <ZoomableImage src="/Educourse - AI for Online Course/Create Courses - Dekstop.png" alt="Create Course" onClick={openImage} />
                    <ZoomableImage src="/Educourse - AI for Online Course/Course Setup Guide - Dekstop.png" alt="Setup Guide" onClick={openImage} />
                    <ZoomableImage src="/Educourse - AI for Online Course/Curriculum Page - Dekstop.png" alt="Curriculum Page" onClick={openImage} />
                    <ZoomableImage src="/Educourse - AI for Online Course/Curriculum Add Course - Dekstop.png" alt="Add to Curriculum" onClick={openImage} />
                    <ZoomableImage src="/Educourse - AI for Online Course/Create Lesson - Dekstop.png" alt="Create Lesson" onClick={openImage} />
                    <ZoomableImage src="/Educourse - AI for Online Course/Reorder Curriculum - Dekstop.png" alt="Reorder Curriculum" onClick={openImage} />
                    <ZoomableImage src="/Educourse - AI for Online Course/Reorder Courses - Dekstop.png" alt="Reorder Courses" onClick={openImage} />
                    <ZoomableImage src="/Educourse - AI for Online Course/Course Pricing - Dekstop.png" alt="Course Pricing" onClick={openImage} />
                    <ZoomableImage src="/Educourse - AI for Online Course/Selec Your Courses Type - Dekstop.png" alt="Select Course Type" onClick={openImage} />
                  </div>
                </motion.div>

                {/* Coaching & Community */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants}>
                   <div className="flex items-center gap-4 mb-12">
                     <div className="h-[1px] bg-indigo-500/10 flex-grow" />
                     <h4 className="text-xl font-medium text-indigo-600 dark:text-indigo-300 px-4 font-mono">3 / Coaching & Community</h4>
                     <div className="h-[1px] bg-indigo-500/10 flex-grow" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <ZoomableImage src="/Educourse - AI for Online Course/Coaching Page - Dekstop.png" alt="Coaching Overview" onClick={openImage} />
                    <ZoomableImage src="/Educourse - AI for Online Course/Create New Coaching Program - Dekstop.png" alt="New Coaching Program" onClick={openImage} />
                    <ZoomableImage src="/Educourse - AI for Online Course/Choose Price Coaching Program - Dekstop.png" alt="Coaching Pricing" onClick={openImage} />
                    <ZoomableImage src="/Educourse - AI for Online Course/Community Details - Desktop.png" alt="Community Overview" onClick={openImage} />
                    <ZoomableImage src="/Educourse - AI for Online Course/Create Community - Dekstop.png" alt="Create Community" onClick={openImage} />
                    <ZoomableImage src="/Educourse - AI for Online Course/Create New Community - Desktop.png" alt="New Community Details" onClick={openImage} />
                    <ZoomableImage src="/Educourse - AI for Online Course/Feed Community - Dekstop.png" alt="Community Feed" onClick={openImage} />
                  </div>
                </motion.div>

                {/* Features & Growth */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants}>
                   <div className="flex items-center gap-4 mb-12">
                     <div className="h-[1px] bg-indigo-500/10 flex-grow" />
                     <h4 className="text-xl font-medium text-indigo-600 dark:text-indigo-300 px-4 font-mono">4 / Engagement & Growth</h4>
                     <div className="h-[1px] bg-indigo-500/10 flex-grow" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <ZoomableImage src="/Educourse - AI for Online Course/Create New Podcast - Dekstop.png" alt="Create Podcast" onClick={openImage} />
                    <ZoomableImage src="/Educourse - AI for Online Course/Create Certificate - Dekstop.png" alt="Create Certificate" onClick={openImage} />
                    <ZoomableImage src="/Educourse - AI for Online Course/Active Course Certificate - Dekstop.png" alt="Active Certificates" onClick={openImage} />
                    <ZoomableImage src="/Educourse - AI for Online Course/Coupon Page - Dekstop.png" alt="Coupons" onClick={openImage} />
                    <ZoomableImage src="/Educourse - AI for Online Course/Testimonial Page - Dekstop.png" alt="Testimonials" onClick={openImage} />
                    <ZoomableImage src="/Educourse - AI for Online Course/Knowlage Check - Dekstop.png" alt="Knowledge Checks" onClick={openImage} />
                  </div>
                </motion.div>
                
                {/* Mobile Views */}
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants}>
                   <div className="flex items-center gap-4 mb-12">
                     <div className="h-[1px] bg-indigo-500/10 flex-grow" />
                     <h4 className="text-xl font-medium text-indigo-600 dark:text-indigo-300 px-4 font-mono">5 / Mobile Experience</h4>
                     <div className="h-[1px] bg-indigo-500/10 flex-grow" />
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                    <ZoomableImage src="/Educourse - AI for Online Course/Home Page - Mobile.png" alt="Mobile Dashboard" onClick={openImage} className="rounded-3xl border border-black/10 dark:border-white/10" />
                    <ZoomableImage src="/Educourse - AI for Online Course/Analystics - Mobile.png" alt="Mobile Analytics" onClick={openImage} className="rounded-3xl border border-black/10 dark:border-white/10" />
                    <ZoomableImage src="/Educourse - AI for Online Course/Create Courses - Mobile.png" alt="Mobile Create Course" onClick={openImage} className="rounded-3xl border border-black/10 dark:border-white/10" />
                    <ZoomableImage src="/Educourse - AI for Online Course/Curriculum Page - Mobile.png" alt="Mobile Curriculum" onClick={openImage} className="rounded-3xl border border-black/10 dark:border-white/10" />
                    <ZoomableImage src="/Educourse - AI for Online Course/Coaching Page - Mobile.png" alt="Mobile Coaching" onClick={openImage} className="rounded-3xl border border-black/10 dark:border-white/10" />
                    <ZoomableImage src="/Educourse - AI for Online Course/Community Details - Mobile.png" alt="Mobile Community" onClick={openImage} className="rounded-3xl border border-black/10 dark:border-white/10" />
                    <ZoomableImage src="/Educourse - AI for Online Course/Create New Podcast - Mobile.png" alt="Mobile Podcast" onClick={openImage} className="rounded-3xl border border-black/10 dark:border-white/10" />
                    <ZoomableImage src="/Educourse - AI for Online Course/Create Certificate - Mobile.png" alt="Mobile Certificate" onClick={openImage} className="rounded-3xl border border-black/10 dark:border-white/10" />
                  </div>
                </motion.div>

            </div>
          </div>

           <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants} className="py-24 text-center border-t border-black/5 dark:border-white/5 bg-gradient-to-t from-black/5 dark:from-white/5 to-transparent rounded-b-[3rem] px-4 -mx-4 md:-mx-12 lg:-mx-24 -mb-12">
              <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl text-neutral-900 dark:text-white font-sans tracking-tight mb-6">EXPLORATION COMPLETE</motion.h2>
              <motion.p variants={itemVariants} className="text-neutral-500 font-light text-lg">Thank you for reviewing the Educourse case study.</motion.p>
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
