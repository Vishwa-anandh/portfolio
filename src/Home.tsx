import { useEffect, useRef, MouseEvent } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";
import Lenis from "lenis";
import { Link } from "react-router-dom";
import { Seo } from "./components/Seo";
import { graph, webPageNode, personNode } from "./lib/seo";
import { projects } from "./data/projects";
import { Background3D } from "./components/Background3D";
import ImpactSection from "./components/ui/impact-section";
import { LetsTalk } from "./components/LetsTalk";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const scrollProg = useMotionValue(0);

  // Preload images
  const frameCount = 225;
  const imagesRef = useRef<HTMLImageElement[]>([]);
  // Shared between the loader and the scroll effect so newly-decoded frames
  // can repaint the frame currently in view, coalesced through one rAF.
  const targetIndexRef = useRef(100);
  const requestDrawRef = useRef<() => void>(() => {});

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
      requestDrawRef.current();
      startStagedLoading();
    };

    firstImg.onerror = () => {
      startStagedLoading();
    };

    const startStagedLoading = () => {
      // Build a de-duplicated load order that covers the whole scroll range
      // coarsely first (so any scroll position quickly has a near frame),
      // then progressively fills in the detail. Frames only exist from 100.
      const order: number[] = [];
      const seen = new Set<number>();
      const enqueue = (i: number) => {
        if (i >= 100 && i < frameCount && !seen.has(i)) {
          seen.add(i);
          order.push(i);
        }
      };
      enqueue(100);
      [8, 4, 2, 1].forEach((step) => {
        for (let i = 100; i < frameCount; i += step) enqueue(i);
      });

      // Modest concurrency keeps the pipe full without thrashing the network.
      const maxConcurrency = 6;
      let queueIndex = 0;

      const loadNext = () => {
        if (queueIndex >= order.length) return;
        const frameIndex = order[queueIndex++];
        const img = loadedImages[frameIndex];
        if (!img) {
          loadNext();
          return;
        }

        const onReady = () => {
          // Repaint whatever frame is in view now, then fetch the next one.
          requestDrawRef.current();
          loadNext();
        };

        const fn = frameIndex.toString().padStart(3, '0');
        img.src = `/sequence/frame_${fn}_delay-0.067s.webp`;

        // Decode off the main thread so the first draw never blocks or janks.
        if (typeof img.decode === 'function') {
          img.decode().then(onReady).catch(onReady);
        } else {
          img.onload = onReady;
          img.onerror = onReady;
        }
      };

      for (let i = 0; i < Math.min(maxConcurrency, order.length); i++) {
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

    const canvas = canvasRef.current;
    const ctx = canvas ? canvas.getContext('2d', { alpha: false }) : null;
    let rafId: number | null = null;

    const draw = () => {
      rafId = null;
      if (!ctx || !canvas) return;

      const index = targetIndexRef.current;
      let img = imagesRef.current[index];

      // Fall back to the nearest already-decoded frame, searching outward,
      // so scrubbing never shows a blank or frozen canvas mid-download.
      if (!img || !img.complete || img.naturalWidth === 0) {
        let nearest: HTMLImageElement | null = null;
        for (let d = 1; d < frameCount; d++) {
          const lo = imagesRef.current[index - d];
          if (lo && lo.complete && lo.naturalWidth > 0) { nearest = lo; break; }
          const hi = imagesRef.current[index + d];
          if (hi && hi.complete && hi.naturalWidth > 0) { nearest = hi; break; }
        }
        if (!nearest) return;
        img = nearest;
      }

      if (canvas.width !== img.naturalWidth) {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
      }
      // Opaque frames fully cover the canvas, so no clearRect is needed —
      // painting straight over the previous frame avoids any flicker.
      try {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      } catch (error) {
        console.warn("Canvas drawImage error:", error);
      }
    };

    // Coalesce every scroll event / load callback into one paint per frame.
    const requestDraw = () => {
      if (rafId === null) rafId = requestAnimationFrame(draw);
    };
    requestDrawRef.current = requestDraw;

    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const maxScroll = rect.height - window.innerHeight;
      if (maxScroll <= 0) return;

      const progress = Math.min(Math.max(-rect.top / maxScroll, 0), 1);
      scrollProg.set(progress);

      const frameProgress = Math.min(Math.max(progress / 0.85, 0), 1);
      const startIndex = 100;
      targetIndexRef.current = Math.min(
        Math.max(Math.round(startIndex + frameProgress * (frameCount - 1 - startIndex)), startIndex),
        frameCount - 1,
      );
      requestDraw();
    };

    lenis.on('scroll', handleScroll);
    window.addEventListener('resize', requestDraw);
    // Trigger once
    handleScroll();

    return () => {
      lenis.destroy();
      window.removeEventListener('resize', requestDraw);
      if (rafId !== null) cancelAnimationFrame(rafId);
      requestDrawRef.current = () => {};
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
      <Seo
        title="Vishwa Anandh — AI-Native Product & UI/UX Designer | Portfolio"
        description="Portfolio of Vishwa Anandh, a Product Designer in Madurai, India specializing in AI-native systems and complex enterprise workflows — from architectural concept to deployed reality."
        path="/"
        type="profile"
        keywords="Vishwa Anandh, UI/UX Designer, Product Designer, AI-native design, enterprise UX, design systems, Figma, portfolio"
        jsonLd={graph(
          personNode(),
          webPageNode({
            path: "/",
            name: "Vishwa Anandh — AI-Native Product & UI/UX Designer",
            description:
              "Portfolio of Vishwa Anandh, a Product Designer specializing in AI-native systems and complex enterprise workflows.",
            type: "ProfilePage",
          }),
        )}
      />
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
                  to="/resume"
                  className="text-white/80 hover:text-white transition-colors text-xs md:text-sm px-3 md:px-5 py-1.5 md:py-2 rounded-full hover:bg-white/10"
                >
                  resume
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

            {/* Description paragraph & CTA */}
            <motion.div 
              style={{ opacity: restOpacity, y: restY, filter: restBlur }}
              className="absolute left-6 md:left-16 top-[48%] md:top-[48%] lg:top-[46%] flex flex-col items-start gap-4 md:gap-6 pointer-events-auto z-30"
            >
              <p className="max-w-[320px] md:max-w-[400px] text-base md:text-2xl leading-snug text-white/95 font-sans mix-blend-plus-lighter drop-shadow-sm font-light">
                specializing in complex enterprise workflows and AI-native systems.
              </p>
              <Link
                to="/projects"
                className="px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 transition-all text-sm font-medium flex items-center gap-2 shadow-xl"
              >
                Explore Case Studies &rarr;
              </Link>
            </motion.div>

            {/* Stat block — top-right */}
            <motion.div 
              style={{ opacity: restOpacity, x: restXLeft }}
              className="absolute right-6 md:right-20 top-[25%] md:top-[20%] flex flex-col items-end pointer-events-auto mix-blend-plus-lighter drop-shadow-sm"
            >
              <div className="flex items-center gap-3 justify-end">
                <div className="hidden md:block h-px w-16 bg-white/40 rotate-[20deg]" />
                <span className="text-2xl md:text-3xl font-medium tracking-tight font-sans text-white text-right max-w-[200px] leading-tight">
                  AI UX Strategy & Systems
                </span>
              </div>
            </motion.div>



            {/* Stat block — middle-left */}
            <motion.div 
              style={{ opacity: restOpacity, x: restXRight }}
              className="absolute left-6 md:left-20 top-[65%] md:top-[70%] flex flex-col items-start pointer-events-auto mix-blend-plus-lighter drop-shadow-sm z-20"
            >
              <div className="flex items-center gap-3 justify-start">
                <span className="text-4xl md:text-5xl font-medium tracking-tight font-mono text-white">
                  5+
                </span>
                <div className="hidden md:block h-px w-16 bg-white/40 rotate-[20deg]" />
              </div>
              <span className="text-xs md:text-sm text-white/80 mt-1 text-left font-sans uppercase tracking-widest max-w-[150px] leading-tight">
                Complex Systems Shipped
              </span>
            </motion.div>
          </div>

          {/* Bottom gradient overlay removed */}
        </section>
      </div>

      {/* Scrollable Content Below Hero */}
      <div className="relative z-30 bg-transparent w-full pb-16 md:pb-32" id="work">
        <div className="max-w-7xl mx-auto px-2 md:px-4 xl:px-0 py-16 md:py-24">

          {/* Case Studies Accordion (Impact Section) */}
          <div className="relative mb-12 md:mb-16 w-full">
            <ImpactSection projects={projects} />
          </div>

          {/* Resume / Experience Section */}
          <motion.div
            id="experience"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] as const }}
            className="pt-12 md:pt-16 border-t border-white/10 md:mt-8"
          >
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
              <div className="w-full lg:w-1/3 lg:sticky lg:top-32 self-start">
                <h2 className="text-5xl lg:text-6xl font-medium tracking-tight text-white mb-6 mix-blend-plus-lighter">
                  Experience
                </h2>
                <p className="text-white font-medium leading-relaxed text-2xl md:text-3xl mb-6 mix-blend-plus-lighter">
                  Bridging the gap between beautiful aesthetics and highly technical AI implementations.
                </p>
                <p className="text-white/60 leading-relaxed text-lg mb-10 max-w-xl">
                  I specialize in translating ambiguous product requirements into structured, scalable design systems. From 0-to-1 concepts to enterprise-grade platforms, I design interfaces that empower users to leverage complex AI without the cognitive overload.
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
                    Deployed
                  </div>
                  <div className="bg-neutral-900/30 border border-white/5 p-6 md:p-8 rounded-[2rem] w-full transition-colors hover:bg-neutral-900/50 hover:border-indigo-500/20">
                    <h4 className="text-3xl font-medium text-white mb-2">
                      Product Designer & Developer
                    </h4>
                    <p className="text-indigo-400 mb-6 font-mono text-sm uppercase tracking-wider font-semibold">
                      PulseCX (Independent Project)
                    </p>
                    <p className="text-white/70 leading-relaxed text-base md:text-lg">
                      Architected and designed the end-to-end UX for an <strong className="text-indigo-300 font-medium">AI-native enterprise monitoring</strong> and incident response platform. Beyond designing the complex product architecture, I independently <strong className="text-indigo-300 font-medium">built and deployed</strong> the fully functional web application using AI-assisted development as a non-developer. The live platform features an LLM chatbot that I <strong className="text-indigo-300 font-medium">personally trained</strong>, bridging the gap between deep system infrastructure and actionable visual interfaces.
                    </p>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] as const }}
                  className="group relative flex flex-col sm:flex-row gap-6 sm:gap-12 hover:translate-x-3 transition-transform duration-500 lg:pl-12"
                >
                  <div className="absolute w-4 h-4 bg-white/20 rounded-full -left-[8px] lg:-left-[60px] top-1.5 ring-4 ring-black group-hover:bg-pink-500 group-hover:shadow-[0_0_20px_rgba(236,72,153,0.8)] transition-all duration-500 z-10 hidden lg:block"></div>
                  <div className="w-32 lg:w-40 shrink-0 text-white/40 font-mono pt-1 text-sm tracking-wider uppercase">
                    July 2024 to Present
                  </div>
                  <div className="bg-neutral-900/30 border border-white/5 p-6 md:p-8 rounded-[2rem] w-full transition-colors hover:bg-neutral-900/50 hover:border-pink-500/20">
                    <h4 className="text-3xl font-medium text-white mb-2">
                      UI/UX Designer
                    </h4>
                    <p className="text-pink-400 mb-6 font-mono text-sm uppercase tracking-wider font-semibold">
                      Maitsys
                    </p>
                    <p className="text-white/70 leading-relaxed text-base md:text-lg">
                      Driving the <strong className="text-white font-medium">UX architecture</strong> and product design across multiple core enterprise applications. <strong className="text-white font-medium">Streamlined multi-role workflows</strong> and reduced administrative overhead for <strong className="text-white font-medium">Pappa.ai</strong> and <strong className="text-white font-medium">NC STEM Academy</strong> through AI-driven platforms. <strong className="text-white font-medium">Replaced manual tracking</strong> with robust digital ecosystems in <strong className="text-white font-medium">Project.AI</strong>, and overhauled <strong className="text-white font-medium">Getherly</strong> to deliver stricter privacy controls and safer communication. Across all projects, I focus on translating complex data into actionable, accessible dashboards.
                    </p>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
                  className="group relative flex flex-col sm:flex-row gap-6 sm:gap-12 hover:translate-x-3 transition-transform duration-500 lg:pl-12"
                >
                  <div className="absolute w-4 h-4 bg-white/20 rounded-full -left-[8px] lg:-left-[60px] top-1.5 ring-4 ring-black group-hover:bg-purple-500 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.8)] transition-all duration-500 z-10 hidden lg:block"></div>
                  <div className="w-32 lg:w-40 shrink-0 text-white/40 font-mono pt-1 text-sm tracking-wider uppercase">
                    2019 to Present
                  </div>
                  <div className="bg-neutral-900/30 border border-white/5 p-6 md:p-8 rounded-[2rem] w-full transition-colors hover:bg-neutral-900/50 hover:border-purple-500/20">
                    <h4 className="text-3xl font-medium text-white mb-2">
                      Freelance Brand & Digital Designer
                    </h4>
                    <p className="text-purple-400 mb-6 font-mono text-sm uppercase tracking-wider font-semibold">
                      Self Employed
                    </p>
                    <p className="text-white/70 leading-relaxed text-base md:text-lg">
                      Since 2019, I have partnered directly with founders and marketing teams across various industries, from manufacturing to e-commerce, to build their digital presence from the ground up. By delivering <strong className="text-white font-medium">comprehensive brand identities</strong>, <strong className="text-white font-medium">UI/UX designs</strong>, and <strong className="text-white font-medium">scalable design systems</strong>, I help businesses transform abstract goals into cohesive, professional market experiences.
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
            className="pt-12 md:pt-16 pb-16 border-t border-white/10 mt-12 md:mt-16"
          >
            <LetsTalk />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
