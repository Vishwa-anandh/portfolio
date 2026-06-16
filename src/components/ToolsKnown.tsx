import React from 'react';
import { PixelCanvas } from "./ui/pixel-logo-grid";

export function ToolsKnown() {
  const tools = [
    { name: "Adobe", src: "/logos/Company=Adobe.png", colors: ["#FF0000", "#FF4444"] },
    { name: "Canva", src: "/logos/Company=Canva.png", colors: ["#00C4CC", "#8B3DFF"] },
    { name: "Docker", src: "/logos/Company=Docker.png", colors: ["#2496ED", "#1D63ED"] },
    { name: "Framer", src: "/logos/Company=Framer.png", colors: ["#0055FF", "#FF3366", "#000000"] },
    { name: "GitHub", src: "/logos/Company=GitHub.png", colors: ["#ffffff", "#555555"] },
    { name: "GitLab", src: "/logos/Company=Gitlab.png", colors: ["#FC6D26", "#E24329"] },
    { name: "Google", src: "/logos/Company=Google.png", colors: ["#4285F4", "#34A853", "#FBBC05", "#EA4335"] },
    { name: "Slack", src: "/logos/Company=Slack.png", colors: ["#E01E5A", "#36C5F0", "#2EB67D", "#ECB22E"] },
    { name: "Webflow", src: "/logos/Company=Webflow.png", colors: ["#4353FF", "#146EF5"] },
    { name: "Jira", src: "/logos/jira-software-logo-svg-150px.png", colors: ["#0052CC", "#2684FF"] },
    { name: "Mid Journey", src: "/logos/Mid Journey.png", colors: ["#ffffff", "#aaaaaa"] },
    { name: "Cloudflare", src: "/logos/cloudflare-logo-svg-150px.png", colors: ["#F38020", "#FAAD3F"] },
    { name: "Monday", src: "/logos/monday-logo-svg-150px.png", colors: ["#FF3D57", "#00C875", "#FFCB00", "#579BFC"] },
    { name: "Google AI", src: "/logos/Google AI.png", colors: ["#1A73E8", "#A142F4"] },
  ];

  const renderLogo = (t: any) => (
    <div
      key={t.name}
      className="relative flex items-center justify-center p-6 md:p-8 h-32 md:h-48 border-r border-b border-white/10 overflow-hidden group cursor-pointer hover:bg-neutral-900/30 transition-colors"
    >
      <PixelCanvas colors={t.colors} speed={40} gap={4} />
      <div className="relative z-10 w-full h-full flex items-center justify-center opacity-70 group-hover:opacity-100 transition-all duration-500 pointer-events-none group-hover:scale-110">
        <img src={t.src} alt={t.name} className="max-w-[60%] max-h-[60%] object-contain drop-shadow-md brightness-0 invert opacity-60 group-hover:brightness-100 group-hover:invert-0 group-hover:opacity-100 transition-all duration-500" />
      </div>
    </div>
  );

  return (
    <section className="relative w-full mx-auto mb-20 max-w-[1400px] px-4 md:px-8" id="tools">
      <div className="grid grid-cols-2 md:grid-cols-5 border-l border-t border-white/10 bg-[#0a0a0a]/40 shadow-2xl">
        {tools.slice(0, 6).map(renderLogo)}

        <div key="center-text" className="col-span-2 md:col-span-3 row-span-1 md:row-span-2 border-r border-b border-white/10 flex flex-col items-center justify-center p-8 md:p-12 text-center bg-transparent">
          <h2 className="text-4xl md:text-6xl font-medium tracking-tight text-white max-w-lg leading-tight">
            Tools known
          </h2>
        </div>

        {tools.slice(6, 14).map(renderLogo)}
      </div>
    </section>
  );
}
