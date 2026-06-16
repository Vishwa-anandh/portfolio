import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { projects } from '../../data/projects';
import { ArrowRight } from 'lucide-react';

// --- Accordion Item Component ---
const AccordionItem = ({ project, isActive, onMouseEnter }: { project: any, isActive: boolean, onMouseEnter: () => void }) => {
  return (
    <div
      className={`
        relative h-[400px] md:h-[450px] rounded-3xl overflow-hidden cursor-pointer
        border border-white/10 min-w-[40px] md:min-w-[50px]
        transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
      `}
      style={{ flex: isActive ? '8 1 0%' : '1 1 0%' }}
      onMouseEnter={onMouseEnter}
    >
      {/* Background Image */}
      <img
        src={project.img}
        alt={project.name}
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${isActive ? 'scale-105 grayscale-0' : 'scale-100 grayscale'}`}
        onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://placehold.co/400x450/2d3748/ffffff?text=Image+Error'; }}
      />
      {/* Dark overlay for better text readability */}
      <div className={`absolute inset-0 transition-all duration-500 z-10 ${isActive ? 'bg-black/20' : 'bg-black/60'}`}></div>

      {/* Content Container */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-4 md:p-6 pointer-events-none">
        {isActive ? (
          <div className="flex flex-col items-start justify-end h-full opacity-100 transition-opacity duration-500 delay-200">
            <span className="text-[10px] tracking-[1.3px] uppercase font-bold text-white border border-white/20 bg-black/40 backdrop-blur-md rounded-full px-2.5 py-0.5 whitespace-nowrap mb-3">
              {project.type}
            </span>
            <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-2 drop-shadow-lg">
              {project.name}
            </h3>
            <Link
              to={`/projects/${project.id}`}
              className="mt-2 inline-flex items-center gap-2 text-xs tracking-widest uppercase font-bold text-white hover:gap-3 transition-all pointer-events-auto"
            >
              View case study <ArrowRight size={16} />
            </Link>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-between opacity-100 transition-opacity duration-300 py-2">
            <div className="font-mono text-xs text-white/60 font-bold whitespace-nowrap">
              {project.id < 10 ? `0${project.id}` : project.id}
            </div>
            <div className="flex flex-col justify-end mt-auto">
              <p 
                className="text-[10px] md:text-[11px] text-white tracking-[2px] uppercase font-bold whitespace-nowrap opacity-90 drop-shadow-md" 
                style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
              >
                {project.name}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Main App Component ---
export function LandingAccordionItem() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleItemHover = (index: number) => {
    setActiveIndex(index);
  };

  // Show core case study projects
  const displayedProjects = projects.filter(p => p.id !== 8);

  return (
    <div className="bg-transparent font-sans">
      <section className="container mx-auto px-0 md:px-4 py-8 md:py-16 w-full max-w-7xl">
        <div className="flex flex-col items-center justify-center gap-12 lg:gap-16 w-full">
          
          {/* Top Side: Text Content */}
          <div className="w-full text-center flex flex-col items-center justify-center px-4 lg:px-0 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-semibold text-white leading-[1.1] tracking-tight">
              Selected Work
            </h2>
            <p className="mt-6 text-base md:text-lg text-white/60 leading-relaxed text-center">
              Translating complex technical architectures into intuitive, scalable interfaces that drive user adoption and operational efficiency.
            </p>
          </div>

          {/* Bottom Side: Image Accordion */}
          <div className="w-full mt-2 md:mt-4">
            <div className="flex flex-row items-center justify-center gap-1.5 md:gap-2 w-full">
              {displayedProjects.map((project, index) => (
                <AccordionItem
                  key={project.id}
                  project={project}
                  isActive={index === activeIndex}
                  onMouseEnter={() => handleItemHover(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
