import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Project } from "../../data/projects";
import { Link } from "react-router-dom";

export default function ImpactSection({ projects }: { projects: Project[] }) {
  const [openCard, setOpenCard] = useState(0);

  const bgColors = [
    { bg: "bg-[#CCFF00]", text: "text-[#111111]" },
    { bg: "bg-[#B8E8FF]", text: "text-[#111111]" },
    { bg: "bg-[#222222]", text: "text-[#ffffff]", border: "border-white/20" },
    { bg: "bg-[#FF5CBA]", text: "text-[#111111]" },
    { bg: "bg-[#FF8A00]", text: "text-[#111111]" },
    { bg: "bg-[#111111]", text: "text-[#ffffff]", border: "border-white/20" },
    { bg: "bg-[#FF0055]", text: "text-[#ffffff]" },
    { bg: "bg-[#111111]", text: "text-[#ffffff]", border: "border-white/20" },
    { bg: "bg-[#00FF55]", text: "text-[#111111]" },
  ];

  return (
    <section className="w-full bg-transparent py-12 sm:py-16 md:py-20" id="work">
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex items-start justify-between gap-6 mb-8 sm:mb-12">
          <div className="max-w-[620px]">
            <h2 className="text-[32px] sm:text-[40px] md:text-[56px] leading-[1.05] font-semibold text-white tracking-tight">
              Selected Work
            </h2>
            <p className="mt-4 text-[15px] sm:text-[18px] text-white/60 leading-[1.7] max-w-[560px]">
              Architecting scalable workflows and AI interfaces that turn technical complexity into intuitive user outcomes.
            </p>
          </div>
          

        </div>

        <div className="flex flex-row md:items-end md:h-[480px] gap-3 md:gap-0 overflow-x-auto md:overflow-visible pb-4 md:pb-0 snap-x hide-scrollbar">
          {projects.map((project, idx) => {
            const isOpen = openCard === idx;
            const targetHeight = isOpen ? 480 : 400;
            const color = bgColors[idx % bgColors.length];

            return (
              <div
                key={project.id}
                onMouseEnter={() => setOpenCard(idx)}
                onFocus={() => setOpenCard(idx)}
                onClick={() => setOpenCard(idx)}
                tabIndex={0}
                className={`
                  ${color.bg} ${color.text} ${color.border || "border-black/10"} 
                  relative overflow-hidden border shrink-0 md:shrink h-[420px] md:h-auto cursor-pointer rounded-3xl md:rounded-none
                  ${idx === 0 ? "md:rounded-l-3xl" : ""}
                  ${idx === projects.length - 1 ? "md:rounded-r-3xl" : ""}
                  snap-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
                  ${isOpen 
                    ? "w-[280px] sm:w-[320px] md:w-auto md:flex-[6_1_0%]" 
                    : "w-[70px] sm:w-[80px] md:w-auto md:flex-[1_1_0%]"}
                `}
              >
                <motion.div
                  animate={{ height: targetHeight }}
                  transition={{ type: "spring", stiffness: 260, damping: 30 }}
                  className="h-full w-full"
                >
                  {isOpen ? (
                    <div className="h-full p-6 sm:p-8 flex flex-col justify-between w-full">
                      <div className="w-full">
                        <div className="flex items-center gap-2 mb-3">
                          {project.timeline && (
                            <span className="text-[10px] tracking-[1.3px] uppercase font-bold opacity-90 border border-black/20 bg-black/5 rounded-full px-2.5 py-0.5 whitespace-nowrap">
                              {project.timeline}
                            </span>
                          )}
                          <span className="text-[10px] tracking-[1.3px] uppercase font-bold opacity-70 truncate">
                            {project.type}
                          </span>
                        </div>
                        <h3 className="text-[26px] sm:text-[30px] md:text-[36px] leading-[1.08] font-bold">
                          {project.name}
                        </h3>
                        <p className="mt-3 text-[14px] sm:text-[15px] leading-[1.6] opacity-90 line-clamp-3">
                          {project.description}
                        </p>
                        <Link
                          to={`/projects/${project.id}`}
                          className="mt-6 inline-flex items-center gap-2 text-[12px] tracking-[1.4px] uppercase font-bold hover:gap-3 transition-all"
                        >
                          View case study <ArrowRight size={16} />
                        </Link>
                      </div>

                      <div className="mt-8 w-full h-[180px] sm:h-[220px] rounded-xl overflow-hidden border border-black/10 relative shadow-xl">
                        <img
                          src={project.img}
                          alt={project.name}
                          loading="lazy"
                          decoding="async"
                          fetchPriority="low"
                          className="absolute inset-0 w-full h-full object-cover"
                          onError={(e) => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2940'; }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="h-full p-4 md:p-6 flex flex-col items-center justify-between min-w-[70px]">
                      <div className="font-mono text-sm opacity-60 font-bold whitespace-nowrap">
                        0{idx + 1}
                      </div>
                      <div className="flex-1 flex items-end pb-2">
                        <p 
                          className="text-[11px] md:text-[13px] tracking-[3px] uppercase font-bold whitespace-nowrap opacity-90" 
                          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                        >
                          {project.name}
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
