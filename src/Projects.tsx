import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import { Seo } from "./components/Seo";
import { graph, webPageNode, breadcrumbNode, canonical } from "./lib/seo";
import { projects, Project } from "./data/projects";
import { Background3D } from "./components/Background3D";
import { PageBar } from "./components/ui/site-controls";

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
  const rx = useSpring(useTransform(mouseY, [-200, 200], [3, -3]), springConfig);
  const ry = useSpring(useTransform(mouseX, [-200, 200], [-3, 3]), springConfig);
  const scale = useSpring(hovered ? 1.01 : 1, springConfig);

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
      className="relative block w-full aspect-[4/3] rounded-[1.75rem] z-0 hover:z-10 perspective-1000"
    >
      <Link
        to={`/projects/${project.id}`}
        className="group apple-card absolute inset-0 block w-full h-full rounded-[1.75rem] overflow-hidden cursor-pointer transition-[border-color,box-shadow] duration-300 hover:border-[#0A84FF]/50 hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
      >
        <motion.div
          className="absolute inset-x-0 inset-y-[-15%] w-full h-[130%]"
          style={{ y: scrollY }}
        >
          <motion.img
            src={project.img}
            alt={project.name}
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-85 group-hover:scale-[1.025] transition-[transform,opacity] duration-500 ease-out"
            style={{
              x: useSpring(useTransform(mouseX, [-200, 200], [-10, 10]), springConfig),
              y: useSpring(useTransform(mouseY, [-200, 200], [-10, 10]), springConfig)
            }}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6 md:p-8 pointer-events-none transform-gpu" style={{ transform: 'translateZ(30px)' }}>
          <div className="transform transition-transform duration-500 ease-out group-hover:-translate-y-2">
            <span className="text-[#64D2FF] font-mono text-xs mb-3 block uppercase tracking-wider">
              {project.type}
            </span>
            <h3 className="text-2xl md:text-3xl text-white font-medium mb-3">
              {project.name}
            </h3>
            <p className="text-white/70 line-clamp-3 text-sm opacity-100 translate-y-0 transition-opacity duration-300">
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
    <div className="min-h-screen bg-transparent text-white font-sans w-full relative">
      <Seo
        title="Projects & Case Studies | Vishwa Anandh"
        description="Explore selected UI/UX and product design case studies by Vishwa Anandh — AI-native monitoring platforms, multi-agent orchestration dashboards, and enterprise design systems."
        path="/projects"
        keywords="Portfolio, UI/UX Projects, Case Studies, Product Design, AI dashboards, Vishwa Anandh"
        jsonLd={graph(
          webPageNode({
            path: "/projects",
            name: "Projects & Case Studies",
            description:
              "Selected UI/UX and product design case studies by Vishwa Anandh.",
            type: "CollectionPage",
          }),
          {
            "@type": "ItemList",
            name: "Design Case Studies by Vishwa Anandh",
            itemListElement: projects.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: canonical(`/projects/${p.id}`),
              name: `${p.name} — ${p.type}`,
            })),
          },
          breadcrumbNode([
            ["Home", "/"],
            ["Projects", "/projects"],
          ]),
        )}
      />
      <div className="fixed inset-0 z-[-2] bg-black"></div>
      <Background3D />
      <PageBar to="/" label="Back to Home" />
      <div className="relative z-10 w-full px-4 py-12 sm:px-6 md:py-24 lg:px-10 xl:px-12">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-16 pb-8 border-b border-white/10">
          <div>
            <h1 className="text-5xl md:text-7xl font-semibold tracking-[-0.045em] mb-2">
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
