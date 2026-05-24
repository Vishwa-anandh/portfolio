import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { projects } from "./data/projects";
import WorkflowAICaseStudy from "./WorkflowAICaseStudy";
import SeoProCaseStudy from "./SeoProCaseStudy";

import Agentic14CaseStudy from "./Agentic14CaseStudy";
import PayrollCaseStudy from "./PayrollCaseStudy";
import EducourseCaseStudy from "./EducourseCaseStudy";
import LoopHRCaseStudy from "./LoopHRCaseStudy";
import SmartyAirCaseStudy from "./SmartyAirCaseStudy";
import P14CaseStudy from "./P14CaseStudy";

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const project = projects.find((p) => p.id === Number(id));

  useEffect(() => {
    window.scrollTo(0, 0);
    
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Helmet>
          <title>Project Not Found | Vishwa Anandh</title>
        </Helmet>
        <div className="text-center">
          <h1 className="text-3xl mb-4">Project not found</h1>
          <Link to="/projects" className="text-indigo-400 hover:text-indigo-300">
            ← Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const keywords = project.technologies?.join(', ') || `${project.type}, portfolio, project, design`;

  if (project.id === 0) {
    return (
      <div className="min-h-screen bg-neutral-950 font-sans w-full selection:bg-blue-500/30 pb-24 text-neutral-300">
        <Helmet>
          <title>{`${project.name} - Case Study | Vishwa Anandh`}</title>
          <meta name="description" content={project.detailedDescription || project.description} />
        </Helmet>
        
        {/* Simple navigation back to projects */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 xl:px-0 pt-12 relative z-50">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/10 text-blue-400 hover:bg-blue-600/20 rounded-full mb-8 transition-colors font-mono text-sm underline-offset-4"
          >
            <span>← Back to Projects</span>
          </Link>
          <WorkflowAICaseStudy project={project} />
          
          {/* Next Project / Footer Nav */}
          <div className="mt-32 pt-16 border-t border-neutral-800 text-center pb-12">
            <h3 className="text-neutral-500 text-sm font-mono uppercase tracking-widest mb-6">
              Next Project
            </h3>
            <Link
              to={`/projects/1`}
              className="group inline-block"
            >
              <h2 className="text-4xl md:text-6xl font-medium text-neutral-100 group-hover:text-blue-500 transition-colors">
                SEO PRO
              </h2>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (project.id === 1) {
    return (
      <div className="min-h-screen bg-neutral-950 font-sans w-full selection:bg-neutral-500/30 pb-24 text-neutral-300">
        <Helmet>
          <title>{`${project.name} - Case Study | Vishwa Anandh`}</title>
          <meta name="description" content={project.detailedDescription || project.description} />
        </Helmet>
        
        {/* Simple navigation back to projects */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 xl:px-0 pt-12 relative z-50">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-800 text-neutral-300 hover:bg-neutral-700 rounded-full mb-8 transition-colors font-mono text-sm underline-offset-4"
          >
            <span>← Back to Projects</span>
          </Link>
          <SeoProCaseStudy project={project} />
          
          {/* Next Project / Footer Nav */}
          <div className="mt-32 pt-16 border-t border-neutral-800 text-center pb-12">
            <h3 className="text-neutral-500 text-sm font-mono uppercase tracking-widest mb-6">
              Next Project
            </h3>
            <Link
              to={`/projects/2`}
              className="group inline-block"
            >
              <h2 className="text-4xl md:text-6xl font-medium text-neutral-100 group-hover:text-neutral-400 transition-colors">
                Agentic14
              </h2>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (project.id === 2) {
    return (
      <div className="min-h-screen bg-neutral-950 font-sans w-full selection:bg-emerald-500/30 pb-24 text-neutral-300">
        <Helmet>
          <title>{`${project.name} - Case Study | Vishwa Anandh`}</title>
          <meta name="description" content={project.detailedDescription || project.description} />
        </Helmet>
        
        {/* Simple navigation back to projects */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 xl:px-0 pt-12 relative z-50">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-600/10 text-emerald-400 hover:bg-emerald-600/20 rounded-full mb-8 transition-colors font-mono text-sm underline-offset-4"
          >
            <span>← Back to Projects</span>
          </Link>
          <Agentic14CaseStudy project={project} />
          
          {/* Next Project / Footer Nav */}
          <div className="mt-32 pt-16 border-t border-neutral-800 text-center pb-12">
            <h3 className="text-neutral-500 text-sm font-mono uppercase tracking-widest mb-6">
              Next Project
            </h3>
            <Link
              to={`/projects/3`}
              className="group inline-block"
            >
              <h2 className="text-4xl md:text-6xl font-medium text-neutral-100 group-hover:text-emerald-500 transition-colors">
                Payroll System
              </h2>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (project.id === 3) {
    return (
      <div className="min-h-screen bg-neutral-950 font-sans w-full selection:bg-purple-500/30 pb-24 text-neutral-300">
        <Helmet>
          <title>{`${project.name} - Case Study | Vishwa Anandh`}</title>
          <meta name="description" content={project.detailedDescription || project.description} />
        </Helmet>
        
        {/* Simple navigation back to projects */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 xl:px-0 pt-12 relative z-50">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600/10 text-purple-400 hover:bg-purple-600/20 rounded-full mb-8 transition-colors font-mono text-sm underline-offset-4"
          >
            <span>← Back to Projects</span>
          </Link>
          <PayrollCaseStudy project={project} />
          
          {/* Next Project / Footer Nav */}
          <div className="mt-32 pt-16 border-t border-neutral-800 text-center pb-12">
            <h3 className="text-neutral-500 text-sm font-mono uppercase tracking-widest mb-6">
              Next Project
            </h3>
            <Link
              to={`/projects/4`}
              className="group inline-block"
            >
              <h2 className="text-4xl md:text-6xl font-medium text-neutral-100 group-hover:text-purple-500 transition-colors">
                Educourse
              </h2>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (project.id === 4) {
    return (
      <div className="min-h-screen bg-white dark:bg-neutral-950 font-sans w-full selection:bg-indigo-500/30 pb-24 text-neutral-800 dark:text-neutral-300">
        <Helmet>
          <title>{`${project.name} - Case Study | Vishwa Anandh`}</title>
          <meta name="description" content={project.detailedDescription || project.description} />
        </Helmet>
        
        {/* Simple navigation back to projects */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 xl:px-0 pt-12 relative z-50">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600/10 text-indigo-500 hover:bg-indigo-600/20 rounded-full mb-8 transition-colors font-mono text-sm underline-offset-4"
          >
            <span>← Back to Projects</span>
          </Link>
          <EducourseCaseStudy project={project} />
          
          {/* Next Project / Footer Nav */}
          <div className="mt-32 pt-16 border-t border-black/5 dark:border-white/10 text-center pb-12">
            <h3 className="text-neutral-500 text-sm font-mono uppercase tracking-widest mb-6">
              Next Project
            </h3>
            <Link
              to={`/projects/5`}
              className="group inline-block"
            >
              <h2 className="text-4xl md:text-6xl font-medium text-neutral-900 dark:text-white group-hover:text-indigo-500 transition-colors">
                Loop HR
              </h2>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (project.id === 5) {
    return (
      <div className="min-h-screen bg-white dark:bg-neutral-950 font-sans w-full selection:bg-teal-500/30 pb-24 text-neutral-800 dark:text-neutral-300">
        <Helmet>
          <title>{`${project.name} - Case Study | Vishwa Anandh`}</title>
          <meta name="description" content={project.detailedDescription || project.description} />
        </Helmet>
        
        {/* Simple navigation back to projects */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 xl:px-0 pt-12 relative z-50">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-4 py-2 bg-teal-600/10 text-teal-600 hover:bg-teal-600/20 rounded-full mb-8 transition-colors font-mono text-sm underline-offset-4"
          >
            <span>← Back to Projects</span>
          </Link>
          <LoopHRCaseStudy project={project} />
          
          {/* Next Project / Footer Nav */}
          <div className="mt-32 pt-16 border-t border-black/5 dark:border-white/10 text-center pb-12">
            <h3 className="text-neutral-500 text-sm font-mono uppercase tracking-widest mb-6">
              Next Project
            </h3>
            <Link
              to={`/projects/6`}
              className="group inline-block"
            >
              <h2 className="text-4xl md:text-6xl font-medium text-neutral-900 dark:text-white group-hover:text-teal-500 transition-colors">
                SmartyAir
              </h2>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (project.id === 6) {
    return (
      <div className="min-h-screen bg-black font-sans w-full selection:bg-cyan-500/30 pb-24 text-neutral-300">
        <Helmet>
          <title>{`${project.name} - Case Study | Vishwa Anandh`}</title>
          <meta name="description" content={project.detailedDescription || project.description} />
        </Helmet>
        
        {/* Simple navigation back to projects */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 xl:px-0 pt-12 relative z-50">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-600/10 text-cyan-400 hover:bg-cyan-600/20 rounded-full mb-8 transition-colors font-mono text-sm underline-offset-4"
          >
            <span>← Back to Projects</span>
          </Link>
          <SmartyAirCaseStudy project={project} />
          
          {/* Next Project / Footer Nav */}
          <div className="mt-32 pt-16 border-t border-white/10 text-center pb-12">
            <h3 className="text-neutral-500 text-sm font-mono uppercase tracking-widest mb-6">
              Next Project
            </h3>
            <Link
              to={`/projects/7`}
              className="group inline-block"
            >
              <h2 className="text-4xl md:text-6xl font-medium text-white group-hover:text-cyan-400 transition-colors">
                P14 Dashboard
              </h2>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (project.id === 7) {
    return (
      <div className="min-h-screen bg-[#f7f8fc] dark:bg-neutral-950 font-sans w-full selection:bg-indigo-500/30 pb-24 text-neutral-800 dark:text-neutral-300">
        <Helmet>
          <title>{`${project.name} - Case Study | Vishwa Anandh`}</title>
          <meta name="description" content={project.detailedDescription || project.description} />
        </Helmet>
        
        {/* Simple navigation back to projects */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 xl:px-0 pt-12 relative z-50">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-600/10 text-indigo-500 hover:bg-indigo-600/20 rounded-full mb-8 transition-colors font-mono text-sm underline-offset-4"
          >
            <span>← Back to Projects</span>
          </Link>
          <P14CaseStudy project={project} />
          
          {/* Next Project / Footer Nav */}
          <div className="mt-32 pt-16 border-t border-black/5 dark:border-white/10 text-center pb-12">
            <h3 className="text-neutral-500 text-sm font-mono uppercase tracking-widest mb-6">
              Next Project
            </h3>
            <Link
              to={`/projects/0`}
              className="group inline-block"
            >
              <h2 className="text-4xl md:text-6xl font-medium text-neutral-900 dark:text-white group-hover:text-indigo-500 transition-colors">
                Workflow AI
              </h2>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (project.id === 8) {
    return (
      <div className="min-h-screen bg-[#111111] dark:bg-[#111111] font-sans w-full text-white">
        <Helmet>
          <title>{`${project.name} - Case Study | Vishwa Anandh`}</title>
          <meta name="description" content={project.detailedDescription || project.description} />
        </Helmet>
        
        <div className="w-full relative z-50">
          <Link
            to="/projects"
            className="fixed top-8 left-8 z-50 inline-flex items-center gap-2 px-4 py-2 bg-black/60 backdrop-blur-md text-white/90 hover:bg-black/80 hover:text-white rounded-full transition-colors font-mono text-sm border border-white/10 shadow-2xl underline-offset-4"
          >
            <span>← Back to Projects</span>
          </Link>
          <img src={project.img} alt={project.name} className="w-full h-auto block" />
          
          {/* Next Project / Footer Nav */}
          <div className="pt-24 border-t border-white/5 text-center pb-24 bg-[#111111]">
            <h3 className="text-white/50 text-sm font-mono uppercase tracking-widest mb-6">
              Next Project
            </h3>
            <Link
              to={`/projects/0`}
              className="group inline-block"
            >
              <h2 className="text-4xl md:text-6xl font-medium text-white group-hover:text-indigo-500 transition-colors">
                Workflow AI
              </h2>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white font-sans w-full selection:bg-indigo-500/30">
      <Helmet>
        <title>{`${project.name} - ${project.type} | Vishwa Anandh`}</title>
        <meta name="description" content={project.detailedDescription || project.description} />
        <meta name="keywords" content={`UI/UX Design, ${keywords}`} />
        <meta property="og:title" content={`${project.name} | Vishwa Anandh`} />
        <meta property="og:description" content={project.detailedDescription || project.description} />
        <meta property="og:image" content={project.img} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>
      <div className="max-w-7xl mx-auto px-4 md:px-8 xl:px-0 py-12 md:py-24">
        {/* Header */}
        <header className="mb-16">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-12 transition-colors font-mono text-sm underline-offset-4 hover:underline"
          >
            <span>← Back to Projects</span>
          </Link>
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 justify-between items-start">
            <div className="w-full lg:w-2/3">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight mb-6 mix-blend-plus-lighter">
                {project.name}
              </h1>
              <h2 className="text-xl md:text-2xl text-white/60 mb-8 max-w-2xl">
                {project.type}
              </h2>
              <p className="text-lg md:text-xl text-white/80 leading-relaxed font-light">
                {project.detailedDescription || project.description}
              </p>
            </div>

            {/* Meta Info Sidebar */}
            <div className="w-full lg:w-1/3 flex flex-col gap-8 bg-white/5 border border-white/10 rounded-3xl p-8">
              {project.role && (
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-white/40 mb-2 font-mono">
                    Role
                  </h3>
                  <p className="text-white/90 text-lg">{project.role}</p>
                </div>
              )}
              {project.timeline && (
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-white/40 mb-2 font-mono">
                    Timeline
                  </h3>
                  <p className="text-white/90 text-lg">{project.timeline}</p>
                </div>
              )}
              {project.technologies && (
                <div>
                  <h3 className="text-xs uppercase tracking-widest text-white/40 mb-2 font-mono">
                    Technologies
                  </h3>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-white/10 rounded-full text-sm text-white/80"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Main Image */}
        <div className="w-full aspect-video md:aspect-[21/9] rounded-[2rem] overflow-hidden mb-16 border border-white/5 shadow-2xl">
          <img
            src={project.img}
            alt={project.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Case Study Sections */}
        {project.caseStudy && project.caseStudy.length > 0 ? (
          <div className="space-y-32 mt-24">
            {project.caseStudy.map((section, idx) => (
              <div key={idx} className="flex flex-col gap-12">
                <div className="max-w-3xl mx-auto text-center px-4">
                  <h3 className="text-3xl md:text-5xl font-medium tracking-tight mb-6 mix-blend-plus-lighter">
                    {section.title}
                  </h3>
                  <p className="text-lg md:text-xl text-white/70 font-light leading-relaxed">
                    {section.description}
                  </p>
                </div>
                <div className={`grid grid-cols-1 ${section.images.length > 1 ? 'md:grid-cols-2' : ''} gap-8 lg:gap-12`}>
                  {section.images.map((imgUrl, i) => (
                    <div
                      key={i}
                      className={`w-full rounded-2xl md:rounded-[2rem] overflow-hidden border border-white/10 bg-neutral-900 shadow-2xl ${
                        section.images.length === 3 && i === 2 ? 'md:col-span-2' : ''
                      }`}
                    >
                      <img
                        src={imgUrl}
                        alt={`${section.title} preview`}
                        className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-700"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Backward compatible standard gallery */
          project.images && project.images.length > 1 && (
            <div className="space-y-16 mt-24">
              <h3 className="text-3xl md:text-4xl font-medium tracking-tight text-white mb-12 text-center mix-blend-plus-lighter">
                Gallery
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                {project.images.slice(1).map((imgUrl, i) => (
                  <div
                    key={i}
                    className={`w-full rounded-3xl overflow-hidden border border-white/10 bg-neutral-900 ${
                      i === 2 && project.images!.length % 2 !== 0
                        ? "md:col-span-2 aspect-[21/9]"
                        : "aspect-[4/3]"
                    }`}
                  >
                    <img
                      src={imgUrl}
                      alt={`${project.name} frame ${i + 1}`}
                      className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-700"
                    />
                  </div>
                ))}
              </div>
            </div>
          )
        )}

        {/* Next Project / Footer Nav */}
        <div className="mt-32 pt-16 border-t border-white/10 text-center">
          <h3 className="text-white/50 text-sm font-mono uppercase tracking-widest mb-6">
            Next Project
          </h3>
          <Link
            to={`/projects/${project.id >= projects.length ? 1 : project.id + 1}`}
            className="group inline-block"
          >
            <h2 className="text-4xl md:text-6xl font-medium text-white group-hover:text-indigo-400 transition-colors mix-blend-plus-lighter">
              {projects[project.id >= projects.length ? 0 : project.id]?.name || "View Next"}
            </h2>
          </Link>
        </div>
      </div>
    </div>
  );
}
