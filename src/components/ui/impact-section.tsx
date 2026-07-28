import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Project } from "../../data/projects";
import { Link } from "react-router-dom";

export default function ImpactSection({ projects }: { projects: Project[] }) {
  const [openCard, setOpenCard] = useState(0);

  return (
    <section className="w-full bg-transparent py-12 sm:py-16 md:py-20" id="work">
      <div className="w-full">
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

            return (
              <div
                key={project.id}
                onMouseEnter={() => setOpenCard(idx)}
                className={`
                  relative overflow-hidden border shrink-0 md:shrink h-[420px] md:h-auto cursor-pointer rounded-[1.75rem]
                  snap-center text-white transition-[flex,width,background-color,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                  ${isOpen
                    ? "bg-[rgba(10,132,255,0.14)] border-[#0A84FF]/45"
                    : "bg-[rgba(28,28,30,0.72)] border-white/10 hover:bg-[rgba(44,44,46,0.78)]"}
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
                            <span className="text-[11px] tracking-[1.1px] uppercase font-semibold text-[#64D2FF] border border-[#0A84FF]/30 bg-[#0A84FF]/10 rounded-full px-2.5 py-1 whitespace-nowrap">
                              {project.timeline}
                            </span>
                          )}
                          <span className="text-[11px] tracking-[1.1px] uppercase font-semibold text-white/55 truncate">
                            {project.type}
                          </span>
                        </div>
                        <h3 className="text-[26px] sm:text-[30px] md:text-[36px] leading-[1.08] font-semibold tracking-[-0.025em]">
                          {project.name}
                        </h3>
                        <p className="mt-3 text-[14px] sm:text-[15px] leading-[1.65] text-white/70 line-clamp-3">
                          {project.description}
                        </p>
                        <Link
                          to={`/projects/${project.id}`}
                          className="apple-control mt-5 inline-flex items-center gap-2 bg-[#0A84FF] px-5 text-sm font-semibold text-white hover:bg-[#409CFF]"
                        >
                          View case study <ArrowRight size={16} />
                        </Link>
                      </div>

                      <div className="mt-8 w-full h-[180px] sm:h-[220px] rounded-2xl overflow-hidden border border-white/10 relative shadow-2xl shadow-black/30">
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
                    <button
                      type="button"
                      onClick={() => setOpenCard(idx)}
                      aria-expanded="false"
                      aria-label={`Show details for ${project.name}`}
                      className="h-full w-full p-4 md:p-6 flex flex-col items-center justify-between min-w-[70px] text-left"
                    >
                      <div className="font-mono text-sm text-white/45 font-semibold whitespace-nowrap">
                        0{idx + 1}
                      </div>
                      <div className="flex-1 flex items-end pb-2">
                        <p 
                          className="text-[11px] md:text-[13px] tracking-[2px] uppercase font-semibold whitespace-nowrap text-white/70"
                          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
                        >
                          {project.name}
                        </p>
                      </div>
                    </button>
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
