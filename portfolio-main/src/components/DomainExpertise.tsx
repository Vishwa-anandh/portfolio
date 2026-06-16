import React from 'react';
import { motion } from 'framer-motion';

export function DomainExpertise() {
  const domains = [
    {
      title: "AI Agent Orchestration",
      description: "Designing conversational and autonomous agent workflows that simplify complex tasks."
    },
    {
      title: "Enterprise Telemetry",
      description: "Structuring dense, real-time data for industrial and B2B dashboards to ensure fast diagnostic triage."
    },
    {
      title: "Spatial & Canvas UI",
      description: "Building non-linear, node-based generative workspaces that reduce activation energy."
    },
    {
      title: "Systems Architecture",
      description: "Scaling component libraries for highly technical platforms, aligning engineering with user needs."
    }
  ];

  return (
    <section className="relative w-full mx-auto mb-20 max-w-6xl px-4 md:px-8" id="expertise">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-white leading-tight mix-blend-plus-lighter">
          Domain Expertise
        </h2>
        <p className="mt-4 text-white/60 text-lg">
          Specialized in scaling complex technical architectures into intuitive systems.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {domains.map((domain, idx) => (
          <motion.div
            key={domain.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="group relative p-8 md:p-10 rounded-3xl bg-neutral-900/30 border border-white/5 hover:bg-neutral-900/60 hover:border-indigo-500/30 transition-colors duration-500 overflow-hidden"
          >
            {/* Subtle background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
              <div className="text-indigo-400 font-mono text-sm tracking-widest uppercase mb-4 opacity-80 group-hover:opacity-100 transition-opacity">
                0{idx + 1} //
              </div>
              <h3 className="text-2xl font-medium text-white mb-4">
                {domain.title}
              </h3>
              <p className="text-white/60 leading-relaxed font-light text-base md:text-lg">
                {domain.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
