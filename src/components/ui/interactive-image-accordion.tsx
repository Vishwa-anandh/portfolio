import React, { useState } from 'react';
import { Project } from "../../data/projects";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

// --- Accordion Item Component ---
const AccordionItem = ({ item, isActive, onMouseEnter, onClick }: { item: Project, isActive: boolean, onMouseEnter: () => void, onClick: (e: React.MouseEvent) => void }) => {
  return (
    <div
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className={`
        block relative h-[300px] md:h-[450px] rounded-3xl overflow-hidden cursor-pointer snap-center shrink-0 md:shrink
        transition-all duration-700 ease-in-out border border-white/10
        ${isActive ? 'w-[280px] md:w-[400px] lg:w-[450px]' : 'w-[60px] md:w-[80px]'}
      `}
    >
      {/* If active, make the entire card a clickable link to navigate */}
      {isActive && (
        <Link to={`/projects/${item.id}`} className="absolute inset-0 z-30" aria-label={`View ${item.name}`} />
      )}
      
      {/* Background Image */}
      <img
        src={item.img}
        alt={item.name}
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${isActive ? 'scale-105 grayscale-0' : 'scale-100 grayscale'}`}
        onError={(e) => { (e.target as HTMLImageElement).onerror = null; (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2940'; }}
      />
      {/* Dark overlay for better text readability */}
      <div className={`absolute inset-0 transition-all duration-500 z-10 ${isActive ? 'bg-black/10' : 'bg-black/60'}`}></div>

      {/* Caption Text */}
      <span
        className={`
          absolute text-white font-mono uppercase tracking-widest text-xs md:text-sm whitespace-nowrap z-20
          transition-all duration-500 ease-in-out
          ${
            isActive
              ? 'opacity-0' // Active state: hidden because the left side shows details
              : 'bottom-16 left-1/2 -translate-x-1/2 -rotate-90 opacity-100'
          }
        `}
      >
        {item.name}
      </span>
    </div>
  );
};


// --- Main App Component ---
export function LandingAccordionItem({ projects }: { projects: Project[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleItemHover = (index: number) => {
    setActiveIndex(index);
  };

  const activeProject = projects[activeIndex];

  if (!activeProject) return null;

  return (
    <div className="bg-transparent font-sans w-full">
      <section className="w-full py-4 md:py-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
          
          {/* Left Side: Text Content */}
          <div className="w-full lg:w-1/3 text-left flex flex-col justify-center min-h-[250px]">
            <div className="mb-4 transition-all duration-500">
              <span className="inline-block px-3 py-1 rounded-full bg-white/10 border border-white/20 text-white font-mono text-[10px] md:text-xs tracking-wide backdrop-blur-md uppercase">
                {activeProject.type}
              </span>
            </div>
            <h3 className="text-3xl md:text-5xl font-medium text-white leading-tight tracking-tight mb-4 transition-all duration-500">
              {activeProject.name}
            </h3>
            <p className="mt-2 text-base md:text-lg text-white/60 line-clamp-3 transition-all duration-500">
              {activeProject.description}
            </p>
          </div>

          {/* Right Side: Image Accordion */}
          <div className="w-full lg:w-2/3 min-w-0">
            <div className="flex flex-row items-center justify-start gap-3 md:gap-4 overflow-x-auto pb-4 hide-scrollbar snap-x snap-mandatory w-full max-w-[100vw] px-4 lg:px-0">
              {projects.map((item, index) => (
                <AccordionItem
                  key={item.id}
                  item={item}
                  isActive={index === activeIndex}
                  onMouseEnter={() => handleItemHover(index)}
                  onClick={(e) => {
                    if (index !== activeIndex) {
                      e.preventDefault(); // Prevent default link/click behavior
                      handleItemHover(index);
                    }
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
