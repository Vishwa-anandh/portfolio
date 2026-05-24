import { useEffect, useRef, MouseEvent } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";
import Lenis from "lenis";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { projects } from "./data/projects";
import { Background3D } from "./components/Background3D";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const scrollProg = useMotionValue(0);

  // Preload images
  const frameCount = 225;
  const imagesRef = useRef<HTMLImageElement[]>([]);
  
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = new Array(frameCount);
    
    // Create image objects without setting src to defer network load
    for (let i = 0; i < frameCount; i++) {
      loadedImages[i] = new Image();
    }
    imagesRef.current = loadedImages;

    // Load and draw the critical first frame immediately
    const firstImg = loadedImages[0];
    const frameNumber = '000';
    firstImg.src = `/sequence/frame_${frameNumber}_delay-0.067s.webp`;
    
    firstImg.onload = () => {
      if (canvasRef.current) {
        canvasRef.current.width = firstImg.width;
        canvasRef.current.height = firstImg.height;
        const ctx = canvasRef.current.getContext('2d');
        if (ctx && firstImg.naturalWidth > 0) {
          try {
            ctx.drawImage(firstImg, 0, 0, firstImg.width, firstImg.height);
          } catch (error) {
            console.warn("Canvas drawImage firstImg error:", error);
          }
        }
      }
      // Start downloading the remaining frames in a staged background queue
      startStagedLoading();
    };
    
    firstImg.onerror = () => {
      startStagedLoading();
    };

    const startStagedLoading = () => {
      const groups: number[][] = [];
      
      // Stage 1: Critical early frames (1 to 40) for immediate scrolling response
      const stage1: number[] = [];
      for (let i = 1; i <= 40; i++) {
        stage1.push(i);
      }
      groups.push(stage1);
      
      // Stage 2: Coarse interlaced timeline (every 4th frame) to cover full scroll range quickly
      const stage2: number[] = [];
      for (let i = 44; i < frameCount; i += 4) {
        stage2.push(i);
      }
      groups.push(stage2);
      
      // Stage 3: Medium interlaced timeline (every 2nd frame)
      const stage3: number[] = [];
      for (let i = 42; i < frameCount; i += 4) {
        stage3.push(i);
      }
      groups.push(stage3);
      
      // Stage 4: Fine details (all remaining odd frames)
      const stage4: number[] = [];
      for (let i = 41; i < frameCount; i += 2) {
        stage4.push(i);
      }
      groups.push(stage4);

      const loadQueue = groups.flat();
      
      // Batch download with max concurrency of 6 to avoid network/thread congestion
      const maxConcurrency = 6;
      let queueIndex = 0;
      
      const loadNext = () => {
        if (queueIndex >= loadQueue.length) return;
        
        const frameIndex = loadQueue[queueIndex++];
        const img = loadedImages[frameIndex];
        
        const handleImageLoad = () => {
          // Immediately schedule next request
          loadNext();
          
          // Redraw current frame immediately if the user is currently viewing it
          if (canvasRef.current && containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const maxScroll = rect.height - window.innerHeight;
            if (maxScroll > 0) {
              let progress = -rect.top / maxScroll;
              progress = Math.min(Math.max(progress, 0), 1);
              let frameProgress = progress / 0.85;
              frameProgress = Math.min(Math.max(frameProgress, 0), 1);
              const currentIndex = Math.min(Math.max(Math.floor(frameProgress * (frameCount - 1)), 0), frameCount - 1);
              
              if (currentIndex === frameIndex) {
                const ctx = canvasRef.current.getContext('2d');
                if (ctx && img.complete && img.naturalWidth > 0) {
                  ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                  ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
                }
              }
            }
          }
        };
        
        img.onload = handleImageLoad;
        img.onerror = handleImageLoad;
        
        // Start network request
        const fn = frameIndex.toString().padStart(3, '0');
        img.src = `/sequence/frame_${fn}_delay-0.067s.webp`;
      };
      
      for (let i = 0; i < Math.min(maxConcurrency, loadQueue.length); i++) {
        loadNext();
      }
    };
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.1,
      wheelMultiplier: 1,
      smoothWheel: true,
    });

    const handleScroll = () => {
      if (!containerRef.current || imagesRef.current.length === 0 || !canvasRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const maxScroll = rect.height - window.innerHeight;
      
      if (maxScroll <= 0) return;
      
      let progress = -rect.top / maxScroll;
      progress = Math.min(Math.max(progress, 0), 1);
      
      scrollProg.set(progress);

      let frameProgress = progress / 0.85;
      frameProgress = Math.min(Math.max(frameProgress, 0), 1);

      const index = Math.min(Math.max(Math.floor(frameProgress * (frameCount - 1)), 0), frameCount - 1);
      
      let img = imagesRef.current[index];
      const ctx = canvasRef.current.getContext('2d');
      
      // Nearest loaded frame fallback to prevent blank frames or freezes during scrolling
      if (img && (!img.complete || img.naturalWidth === 0)) {
        let nearestImg = null;
        let minDiff = Infinity;
        for (let i = 0; i < imagesRef.current.length; i++) {
          const tempImg = imagesRef.current[i];
          if (tempImg && tempImg.complete && tempImg.naturalWidth > 0) {
            const diff = Math.abs(i - index);
            if (diff < minDiff) {
              minDiff = diff;
              nearestImg = tempImg;
            }
          }
        }
        if (nearestImg) {
          img = nearestImg;
        }
      }
      
      if (ctx && img && img.complete && img.naturalWidth > 0) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        try {
          ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height);
        } catch (error) {
          console.warn("Canvas drawImage error:", error);
        }
      }
    };

    lenis.on('scroll', handleScroll);
    // Trigger once
    handleScroll();

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleScrollTo = (e: MouseEvent, targetId: string) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Scroll animations mapped from layout progress
  const nameRevealStart = 0.53; // Frame ~140
  const nameRevealEnd = 0.60; 
  const restRevealStart = 0.61;
  const restRevealEnd = 0.68;

  const nameOpacity = useTransform(scrollProg, [nameRevealStart, nameRevealEnd], [0, 1]);
  const nameY = useTransform(scrollProg, [nameRevealStart, nameRevealEnd], [60, 0]);
  const nameBlur = useTransform(scrollProg, [nameRevealStart, nameRevealEnd], ["blur(12px)", "blur(0px)"]);

  const restOpacity = useTransform(scrollProg, [restRevealStart, restRevealEnd], [0, 1]);
  const restY = useTransform(scrollProg, [restRevealStart, restRevealEnd], [40, 0]);
  const restBlur = useTransform(scrollProg, [restRevealStart, restRevealEnd], ["blur(12px)", "blur(0px)"]);
  const restXRight = useTransform(scrollProg, [restRevealStart, restRevealEnd], [20, 0]);
  const restXLeft = useTransform(scrollProg, [restRevealStart, restRevealEnd], [-20, 0]);

  return (
    <div className="w-full bg-transparent font-sans min-h-screen relative z-0">
      <Helmet>
        <title>Vishwa Anandh — AI UI/UX & Product Designer</title>
        <meta name="description" content="Portfolio of Vishwa Anandh, a passionate UI/UX Designer crafting human-centered digital products integrated with artificial intelligence." />
        <meta name="keywords" content="UI/UX, Product Design, Portfolio, AI Integration, Web Design, Figma, Vishwa Anandh" />
      </Helmet>
      <div className="fixed inset-0 z-[-2] bg-black"></div>
      <div className="fixed inset-0 z-[-1]">
        <Background3D />
      </div>
      
      <div ref={containerRef} className="relative w-full bg-black h-[400vh] z-20">
        <section className="sticky top-0 h-screen w-full overflow-hidden bg-black">
          {/* Background sequence canvas */}
          <div className="absolute inset-0 z-0 bg-neutral-900">
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full object-cover object-center scale-[1.15]"
            />
          </div>

          {/* Floating pill-shaped navbar with liquid glass UI */}
          <header className="absolute top-4 md:top-6 left-0 right-0 z-50 px-2 md:px-4 max-w-[100vw] mx-auto w-full pointer-events-auto">
            <nav className="flex items-center justify-between gap-4">
              {/* Navigation pill (visible on both mobile and desktop) */}
              <div className="flex items-center gap-0.5 md:gap-1 liquid-glass rounded-full p-1 md:px-3 md:py-2">
                <Link
                  to="/projects"
                  className="text-white/80 hover:text-white transition-colors text-xs md:text-sm px-3 md:px-5 py-1.5 md:py-2 rounded-full hover:bg-white/10"
                >
                  projects
                </Link>
                <Link
                  to="/about"
                  className="text-white/80 hover:text-white transition-colors text-xs md:text-sm px-3 md:px-5 py-1.5 md:py-2 rounded-full hover:bg-white/10"
                >
                  about
                </Link>
                <a
                  href="#contact"
                  onClick={(e) => handleScrollTo(e, 'contact')}
                  className="text-white/80 hover:text-white transition-colors text-xs md:text-sm px-3 md:px-5 py-1.5 md:py-2 rounded-full hover:bg-white/10"
                >
                  contact
                </a>
              </div>

              {/* Right button */}
              <button 
                onClick={(e) => handleScrollTo(e, 'contact')}
                className="liquid-glass text-white text-xs md:text-sm font-normal rounded-full px-4 md:px-6 py-2.5 md:py-3 hover:bg-white/20 transition-all hover:scale-105"
              >
                let's talk
              </button>
            </nav>
          </header>

          {/* Foreground content wrapper */}
          <div className="relative h-full w-full z-10 pointer-events-none overflow-hidden flex inset-0">
            {/* Giant staggered headline words */}
            <motion.h1
              style={{ opacity: restOpacity, y: restY, filter: restBlur, x: restXRight }}
              className="hero-title absolute text-white font-medium text-[9vw] md:text-[7vw] left-4 md:left-12 xl:left-16 top-[15%] md:top-[12%] mix-blend-plus-lighter leading-[1.05] tracking-tight z-10 drop-shadow-2xl"
            >
              Product <br />
              Designer
            </motion.h1>

            <motion.h1
              style={{
                opacity: nameOpacity,
                y: nameY,
                filter: nameBlur,
              }}
              className="hero-title absolute text-white font-medium text-[10vw] md:text-[7.5vw] right-4 md:right-12 xl:right-16 bottom-[15%] md:bottom-[12%] text-right mix-blend-plus-lighter leading-[1.05] tracking-tight z-10 drop-shadow-2xl"
            >
              Vishwa <br />
              Anandh
            </motion.h1>

            {/* Description paragraph */}
            <motion.p 
              style={{ opacity: restOpacity, y: restY, filter: restBlur }}
              className="absolute left-6 md:left-16 top-[40%] md:top-[42%] max-w-[260px] text-[15px] md:text-[16px] leading-snug text-white/95 font-sans pointer-events-auto mix-blend-plus-lighter drop-shadow-sm border-none bg-transparent shadow-none backdrop-blur-none p-0 rounded-none"
            >
              crafting exceptional digital experiences at the intersection of
              human-centered design and artificial intelligence.
            </motion.p>

            {/* Stat block — top-right */}
            <motion.div 
              style={{ opacity: restOpacity, x: restXLeft }}
              className="absolute right-6 md:right-20 top-[25%] md:top-[20%] flex flex-col items-end pointer-events-auto mix-blend-plus-lighter drop-shadow-sm"
            >
              <div className="flex items-center gap-3 justify-end">
                <div className="hidden md:block h-px w-24 bg-white/40 rotate-[20deg]" />
                <span className="text-4xl md:text-5xl font-medium tracking-tight font-mono text-white">
                  2+
                </span>
              </div>
              <span className="text-xs md:text-sm text-white/80 mt-1 text-right font-sans lowercase">
                years experience
              </span>
            </motion.div>



            {/* Stat block — middle-left */}
            <motion.div 
              style={{ opacity: restOpacity, x: restXRight }}
              className="absolute left-6 md:left-20 top-[60%] md:top-[65%] flex flex-col items-start pointer-events-auto mix-blend-plus-lighter drop-shadow-sm z-20"
            >
              <div className="flex items-center gap-3 justify-start">
                <span className="text-4xl md:text-5xl font-medium tracking-tight font-mono text-white">
                  100%
                </span>
                <div className="hidden md:block h-px w-24 bg-white/40 rotate-[20deg]" />
              </div>
              <span className="text-xs md:text-sm text-white/80 mt-1 text-left font-sans lowercase">
                ai driven
              </span>
            </motion.div>
          </div>

          {/* Bottom gradient overlay */}
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black to-transparent z-20" />
        </section>
      </div>

      {/* Scrollable Content Below Hero */}
      <div className="relative z-30 bg-transparent w-full pb-16 md:pb-32" id="work">
        <div className="max-w-7xl mx-auto px-2 md:px-4 xl:px-0 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as const }}
          >
            <div className="flex items-center justify-between mb-8 md:mb-12">
            <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-white mix-blend-plus-lighter">
              Selected Work
            </h2>
            <Link
              to="/projects"
              className="hidden md:flex items-center gap-2 text-white/50 hover:text-white transition-colors font-mono uppercase tracking-wider text-sm under"
            >
              View All <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
          </motion.div>

          {/* Case Studies Carousel */}
          <div className="relative group/carousel -mx-4 md:-mx-8 xl:-mx-0 px-4 md:px-8 xl:px-0 mb-16 md:mb-24">
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pt-6 pb-12" style={{ scrollBehavior: 'smooth' }}>
              {projects.map((project, index) => {
                const cardHoverStyles = [
                  "hover:shadow-[0_30px_80px_rgba(34,197,94,0.15)] hover:border-green-500/40",
                  "hover:shadow-[0_30px_80px_rgba(255,255,255,0.1)] hover:border-white/40",
                  "hover:shadow-[0_30px_80px_rgba(79,70,229,0.25)] hover:border-indigo-500/40",
                  "hover:shadow-[0_30px_80px_rgba(59,130,246,0.2)] hover:border-blue-500/40"
                ];
                const hoverStyle = cardHoverStyles[index % cardHoverStyles.length];

                return (
                  <motion.div
                    key={project.id}
                    className="shrink-0 w-[85vw] md:w-[65vw] lg:w-[55vw] snap-center first:ml-0 md:first:ml-0 lg:first:ml-0 last:mr-4"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-10%" }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as const }}
                  >
                    <Link
                      to={`/projects/${project.id}`}
                      className={`group relative block w-full aspect-[4/3] md:aspect-[16/9] bg-neutral-900/40 rounded-[2.5rem] overflow-hidden cursor-pointer transition-all duration-700 hover:-translate-y-3 hover:scale-[1.02] border border-white/5 ${hoverStyle}`}
                    >
                      <img
                        src={project.img}
                        alt={`${project.name} thumbnail`}
                        className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-75 group-hover:scale-110 transition-all duration-700 ease-out grayscale group-hover:grayscale-0"
                      />
                      <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col justify-end p-8 md:p-12 transition-opacity duration-500"></div>
                      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-10 z-10 pointer-events-none">
                        <div className="transform transition-all duration-500 ease-out translate-y-4 group-hover:-translate-y-2 group-hover:translate-y-0">
                          <span className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white font-mono text-[10px] md:text-xs mb-3 tracking-wide backdrop-blur-md uppercase">
                            {project.type}
                          </span>
                          <h3 className="text-2xl md:text-4xl text-white font-medium mb-2 tracking-tight">
                            {project.name}
                          </h3>
                          <p className="text-white/60 max-w-xl line-clamp-2 text-xs md:text-sm opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                            {project.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
            
            <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 pointer-events-none hidden md:flex justify-between px-2 xl:-mx-8">
              <div className="w-16 h-full bg-gradient-to-r from-[#f7f8fc] dark:from-neutral-950 to-transparent absolute left-0 top-0"></div>
              <div className="w-16 h-full bg-gradient-to-l from-[#f7f8fc] dark:from-neutral-950 to-transparent absolute right-0 top-0"></div>
            </div>
          </div>

          {/* Resume / Experience Section */}
          <motion.div
            id="experience"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as const }}
            className="pt-16 md:pt-28 border-t border-white/10 md:mt-16"
          >
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
              <div className="w-full lg:w-1/3">
                <h2 className="text-5xl lg:text-6xl font-medium tracking-tight text-white mb-6 mix-blend-plus-lighter">
                  Experience
                </h2>
                <p className="text-white/60 leading-relaxed text-lg mb-10">
                  Bridging the gap between beautiful aesthetics and highly
                  technical AI implementations.
                </p>
                <Link
                  to="/resume"
                  className="px-8 py-4 rounded-full bg-white text-black hover:bg-neutral-200 hover:scale-105 transition-all font-medium flex items-center justify-center gap-3 group w-max shadow-lg"
                >
                  <span>View Resume</span>
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
              </div>

              <div className="w-full lg:w-2/3 relative flex flex-col gap-12 lg:gap-16 pt-2 lg:pt-0">
                <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/50 via-pink-500/50 to-transparent hidden lg:block" />
                <motion.div 
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] as const }}
                  className="group relative flex flex-col sm:flex-row gap-6 sm:gap-12 hover:translate-x-3 transition-transform duration-500 lg:pl-12"
                >
                  <div className="absolute w-4 h-4 bg-indigo-500 rounded-full -left-[8px] lg:-left-[60px] top-1.5 ring-4 ring-black shadow-[0_0_20px_rgba(99,102,241,0.8)] z-10 hidden lg:block"></div>
                  <div className="w-32 lg:w-40 shrink-0 text-white/40 font-mono pt-1 text-sm tracking-wider uppercase">
                    July 2024 — Present
                  </div>
                  <div className="bg-neutral-900/30 border border-white/5 p-6 md:p-8 rounded-[2rem] w-full transition-colors hover:bg-neutral-900/50 hover:border-indigo-500/20">
                    <h4 className="text-3xl font-medium text-white mb-2">
                      UI/UX Designer
                    </h4>
                    <p className="text-indigo-400 mb-6 font-mono text-sm uppercase tracking-wider font-semibold">
                      Maitsys
                    </p>
                    <p className="text-white/70 leading-relaxed text-base md:text-lg">
                      Spearheading UI/UX design. Designed seamless experiences for Workflow AI covering web and workspace canvases. Created complex spatial layouts and dashboards for diverse AI-powered workflows.
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as const }}
            id="contact"
            className="pt-16 md:pt-32 pb-24 border-t border-white/10 mt-16 md:mt-32"
          >
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">
              <div className="w-full lg:w-1/3 sticky top-32">
                <h2 className="text-5xl lg:text-6xl font-medium tracking-tight text-white mb-6 mix-blend-plus-lighter">
                  Let's Talk
                </h2>
                <p className="text-white/60 leading-relaxed text-lg mb-8">
                  Interested in working together or have a question? Send me a
                  message.
                </p>
                <div className="flex flex-col gap-4 text-white/50 font-mono text-sm">
                  <p className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-neutral-400 animate-pulse"></span>
                    Available for work
                  </p>
                  <p className="hover:text-white transition-colors cursor-pointer w-max">
                    Anandhvishwa12@gmail.com
                  </p>
                </div>
              </div>

              <div className="w-full lg:w-2/3 bg-neutral-900/20 border border-white/5 p-8 md:p-12 rounded-[2.5rem]">
                <form
                  action="mailto:Anandhvishwa12@gmail.com"
                  method="POST"
                  encType="text/plain"
                  className="flex flex-col gap-10"
                >
                  <div className="flex flex-col gap-4">
                    <label
                      htmlFor="name"
                      className="text-sm font-mono text-white/40 uppercase tracking-widest pl-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white text-xl focus:outline-none focus:border-indigo-500 focus:bg-white/10 transition-all placeholder:text-white/20"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="flex flex-col gap-4">
                    <label
                      htmlFor="email"
                      className="text-sm font-mono text-white/40 uppercase tracking-widest pl-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white text-xl focus:outline-none focus:border-indigo-500 focus:bg-white/10 transition-all placeholder:text-white/20"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div className="flex flex-col gap-4">
                    <label
                      htmlFor="message"
                      className="text-sm font-mono text-white/40 uppercase tracking-widest pl-2"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white text-xl focus:outline-none focus:border-indigo-500 focus:bg-white/10 transition-all resize-none placeholder:text-white/20"
                      placeholder="Tell me about your project..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="mt-4 px-10 py-5 rounded-full bg-white text-black hover:bg-neutral-200 hover:scale-105 transition-all font-medium self-start text-lg shadow-[0_0_20px_rgba(255,255,255,0.1)] flex items-center gap-3"
                  >
                    <span>Send Message</span>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
