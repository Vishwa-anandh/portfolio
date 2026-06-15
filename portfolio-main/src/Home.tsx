import { useEffect, useRef, MouseEvent } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";
import Lenis from "lenis";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { projects } from "./data/projects";
import { Background3D } from "./components/Background3D";
import { LandingAccordionItem } from "./components/ui/interactive-image-accordion";
import { DomainExpertise } from './components/DomainExpertise';
import { ToolsKnown } from './components/ToolsKnown';
import { LetsTalk } from "./components/LetsTalk";

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
    const firstImg = loadedImages[100];
    const frameNumber = '100';
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
      
      // Stage 1: Critical early frames (101 to 140) for immediate scrolling response
      const stage1: number[] = [];
      for (let i = 101; i <= 140; i++) {
        stage1.push(i);
      }
      groups.push(stage1);
      
      // Stage 2: Coarse interlaced timeline (every 4th frame) to cover full scroll range quickly
      const stage2: number[] = [];
      for (let i = 144; i < frameCount; i += 4) {
        stage2.push(i);
      }
      groups.push(stage2);
      
      // Stage 3: Medium interlaced timeline (every 2nd frame)
      const stage3: number[] = [];
      for (let i = 142; i < frameCount; i += 4) {
        stage3.push(i);
      }
      groups.push(stage3);
      
      // Stage 4: Fine details (all remaining odd frames)
      const stage4: number[] = [];
      for (let i = 141; i < frameCount; i += 2) {
        stage4.push(i);
      }
      // Fill in previous frames just in case
      for (let i = 0; i < 100; i++) {
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
              const startIndex = 100;
              const currentIndex = Math.min(Math.max(Math.floor(startIndex + frameProgress * (frameCount - 1 - startIndex)), 0), frameCount - 1);
              
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

      const startIndex = 100;
      const index = Math.min(Math.max(Math.floor(startIndex + frameProgress * (frameCount - 1 - startIndex)), 0), frameCount - 1);
      
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
        <title>Vishwa Anandh — Senior Product Designer</title>
        <meta name="description" content="Portfolio of Vishwa Anandh, a Senior Product Designer specializing in complex enterprise workflows and AI-native systems." />
        <meta name="keywords" content="Senior Product Designer, UI/UX, Enterprise Workflows, AI Integration, Vishwa Anandh" />
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
              className="hero-title absolute text-white font-medium text-[8vw] md:text-[6vw] left-4 md:left-12 xl:left-16 top-[15%] md:top-[12%] mix-blend-plus-lighter leading-[1.05] tracking-tight z-10 drop-shadow-2xl"
            >
              Senior Product <br />
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

            {/* Description paragraph and CTA */}
            <motion.div 
              style={{ opacity: restOpacity, y: restY, filter: restBlur }}
              className="absolute left-6 md:left-16 top-[40%] md:top-[42%] max-w-[320px] pointer-events-auto mix-blend-plus-lighter drop-shadow-sm flex flex-col items-start gap-6"
            >
              <p className="text-lg md:text-xl font-medium leading-snug text-white font-sans">
                specializing in complex enterprise workflows and AI-native systems.
              </p>
              <button 
                onClick={(e) => handleScrollTo(e, 'work')}
                className="px-6 py-2.5 rounded-full bg-white text-black font-medium text-sm hover:bg-neutral-200 transition-colors shadow-lg"
              >
                Explore Case Studies ↓
              </button>
            </motion.div>




            {/* Stat block — middle-left */}
            <motion.div 
              style={{ opacity: restOpacity, x: restXRight }}
              className="absolute left-6 md:left-20 top-[60%] md:top-[65%] flex flex-col items-start pointer-events-auto mix-blend-plus-lighter drop-shadow-sm z-20"
            >
              <div className="flex items-center gap-3 justify-start">
                <span className="text-3xl md:text-4xl font-medium tracking-tight font-mono text-white">
                  3+
                </span>
                <div className="hidden md:block h-px w-16 bg-white/40 rotate-[20deg]" />
              </div>
              <span className="text-xs md:text-sm text-white/80 mt-1 text-left font-sans uppercase tracking-widest max-w-[120px]">
                Enterprise AI Systems Shipped
              </span>
            </motion.div>
          </div>

          {/* Bottom gradient overlay removed */}
        </section>
      </div>

      {/* Scrollable Content Below Hero */}
      <div className="relative z-30 bg-transparent w-full pb-16 md:pb-32" id="work">
        <div className="max-w-7xl mx-auto px-2 md:px-4 xl:px-0 py-16 md:py-24">

          {/* The Manifesto Section */}
          <motion.div
            id="manifesto"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as const }}
            className="mb-24 md:mb-32 text-center max-w-4xl mx-auto px-4"
          >
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-8 mix-blend-plus-lighter leading-[1.2]">
              Bridging the gap between beautiful aesthetics and highly technical AI implementations.
            </h2>
            <p className="text-white/60 leading-relaxed text-lg md:text-xl font-light">
              I align engineering constraints with user needs to build systems that feel effortless—even when powering autonomous agents and dense industrial telemetry.
            </p>
          </motion.div>

          {/* Selected Work Accordion */}
          <div className="relative mb-16 md:mb-32 w-full">
            <LandingAccordionItem />
          </div>

          {/* Domain Expertise Section */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as const }}
            className="pt-16 md:pt-32 border-t border-white/10 mt-16 md:mt-32"
          >
            <DomainExpertise />
          </motion.div>

          {/* Tools Known Section */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as const }}
            className="pt-16 md:pt-32 border-t border-white/10 mt-16 md:mt-32"
          >
            <ToolsKnown />
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as const }}
            className="pt-16 md:pt-32 pb-24 border-t border-white/10 mt-16 md:mt-32"
          >
            <LetsTalk />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
