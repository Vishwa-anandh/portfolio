import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import { Helmet } from "react-helmet-async";
import { projects, Project } from "./data/projects";
import { Background3D } from "./components/Background3D";

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scrollY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };
  
  const handleMouseOut = () => {
    mouseX.set(0);
    mouseY.set(0);
    setHovered(false);
  };
  
  const springConfig = { damping: 20, stiffness: 150, mass: 0.5 };
  const rx = useSpring(useTransform(mouseY, [-200, 200], [8, -8]), springConfig);
  const ry = useSpring(useTransform(mouseX, [-200, 200], [-8, 8]), springConfig);
  const scale = useSpring(hovered ? 1.03 : 1, springConfig);

  return (
    <motion.div
      ref={ref}
      style={{
        scale,
        rotateX: rx,
        rotateY: ry,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseOut}
      className="relative block w-full aspect-[4/3] rounded-[2rem] z-0 hover:z-10 perspective-1000"
    >
      <Link
        to={`/projects/${project.id}`}
        className="group absolute inset-0 block w-full h-full bg-neutral-900 rounded-[2rem] overflow-hidden cursor-pointer transition-colors duration-500 hover:shadow-[0_0_40px_rgba(99,102,241,0.4)] border border-transparent hover:border-indigo-500/50"
      >
        <motion.div
          className="absolute inset-x-0 inset-y-[-15%] w-full h-[130%]"
          style={{ y: scrollY }}
        >
          <motion.img
            src={project.img}
            alt={project.name}
            className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-80 group-hover:scale-105 transition-transform duration-700 ease-out grayscale group-hover:grayscale-0"
            style={{
              x: useSpring(useTransform(mouseX, [-200, 200], [-10, 10]), springConfig),
              y: useSpring(useTransform(mouseY, [-200, 200], [-10, 10]), springConfig)
            }}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6 md:p-8 pointer-events-none transform-gpu" style={{ transform: 'translateZ(30px)' }}>
          <div className="transform transition-transform duration-500 ease-out group-hover:-translate-y-2">
            <span className="text-white/60 font-mono text-xs mb-3 block uppercase tracking-wider">
              {project.type}
            </span>
            <h3 className="text-2xl md:text-3xl text-white font-medium mb-3">
              {project.name}
            </h3>
            <p className="text-white/70 line-clamp-3 text-sm opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
              {project.description}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Projects() {
  useEffect(() => {
    
  }, []);

  return (
    <div className="min-h-screen bg-transparent text-white font-sans w-full selection:bg-indigo-500/30 relative">
      <Helmet>
        <title>Projects | Vishwa Anandh — AI UI/UX & Product Designer</title>
        <meta name="description" content="Explore selected case studies and UI/UX projects designed by Vishwa Anandh." />
        <meta name="keywords" content="Portfolio, UI/UX Projects, Case Studies, Product Design, Vishwa Anandh" />
      </Helmet>
      <div className="fixed inset-0 z-[-2] bg-black"></div>
      <Background3D />
      <div className="max-w-7xl mx-auto px-2 md:px-4 xl:px-0 py-12 md:py-24 relative z-10">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 pb-8 border-b border-white/10">
          <div>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors font-mono text-sm underline-offset-4 hover:underline"
            >
              <span>← Back to Home</span>
            </Link>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-2 mix-blend-plus-lighter">
              All Projects
            </h1>
            <h2 className="text-xl md:text-2xl text-white/60 font-medium tracking-tight">
              Case Studies
            </h2>
          </div>
        </header>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10 pb-32">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
}
