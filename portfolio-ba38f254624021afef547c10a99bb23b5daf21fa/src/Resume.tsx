import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Background3D } from "./components/Background3D";

export default function Resume() {
  const navigate = useNavigate();
  useEffect(() => {
    
  }, []);

  const projects = [
    {
      title: "Pappa.ai – School Management (Web & Mobile)",
      desc: <>Streamlined <strong className="text-white font-medium">multi-role school management</strong> (parents, teachers, admins) into a unified <strong className="text-white font-medium">AI-driven platform</strong>, reducing administrative overhead through <strong className="text-white font-medium">smart alerts</strong> and intuitive dashboards.</>,
    },
    {
      title: "NC STEM Academy – Research Program App (Web & Mobile)",
      desc: <>Designed <strong className="text-white font-medium">end-to-end research tracking</strong> workflows and mentor dashboards, simplifying <strong className="text-white font-medium">complex lab scheduling</strong> and certification processes into a centralized portal.</>,
    },
    {
      title: "LobbyLink – Visitor & Employee Management (Web)",
      desc: <>Optimized <strong className="text-white font-medium">enterprise visitor management</strong> by designing <strong className="text-white font-medium">scalable check-in flows</strong> and robust <strong className="text-white font-medium">analytics dashboards</strong>, replacing manual tracking with a digital badge ecosystem.</>,
    },
    {
      title: "Project.AI – Timesheet, Project & Payroll App (Web & Mobile)",
      desc: <>Architected a <strong className="text-white font-medium">comprehensive timesheet</strong> and <strong className="text-white font-medium">automated payroll platform</strong>, reducing reporting friction through <strong className="text-white font-medium">real-time analytics</strong> and role-based mobile and web interfaces.</>,
    },
    {
      title: "Getherly – Family Social Network (Redesign) (Mobile)",
      desc: <>Overhauled the mobile app experience for <strong className="text-white font-medium">multi-age accessibility</strong> and <strong className="text-white font-medium">strict privacy controls</strong>, driving safer family-based sharing and communication.</>,
    },
    {
      title: "Getherly Workspace – Enterprise Social Intranet (Web & Mobile)",
      desc: <>Designed an <strong className="text-white font-medium">enterprise social intranet</strong> from the ground up, streamlining corporate communication and engagement through <strong className="text-white font-medium">role-based community spaces</strong> and project channels.</>,
    },
    {
      title: "Recycle Contamination Log – Sustainability Tracker (Web)",
      desc: <>Improved <strong className="text-white font-medium">sustainability compliance</strong> by designing intuitive issue-reporting flows and location dashboards that translate <strong className="text-white font-medium">complex analytics</strong> into <strong className="text-white font-medium">actionable insights</strong>.</>,
    },
  ];

  return (
    <div className="min-h-screen bg-transparent text-white font-sans selection:bg-indigo-500/30 pb-24 relative">
      <Helmet>
        <title>Resume | Vishwa Anandh — Product Designer</title>
        <meta name="description" content="View the professional resume of Vishwa Anandh, detailing UI/UX expertise, key product experiences, and core competencies." />
        <meta name="keywords" content="Resume, CV, UI/UX Design, Experience, Education, Vishwa Anandh" />
      </Helmet>
      <div className="fixed inset-0 z-[-2] bg-black"></div>
      <Background3D />
      <div className="relative z-10 block">
      {/* Top Navigation Bar */}
      <nav className="border-b border-white/10 sticky top-0 bg-black/80 backdrop-blur-md z-50 print:hidden">
        <div className="max-w-6xl mx-auto px-2 md:px-4 xl:px-0 py-4 flex justify-between items-center">
          <button onClick={() => window.history.length > 2 ? navigate(-1) : navigate('/')} className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors font-mono text-sm underline-offset-4 hover:underline"><span>← Back</span></button>
          <a
            href="/resume.pdf"
            download="Vishwa_Anandh_Resume.pdf"
            className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full text-sm font-medium hover:bg-indigo-50 transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download PDF
          </a>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-2 md:px-4 xl:px-0 mt-8 md:mt-16">
        {/* Header Section */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-10 mb-12 md:mb-16 pb-8 md:pb-10 border-b border-white/10">
          <div className="flex-1">
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
              VISHWA ANANDH
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
              <h2 className="text-2xl md:text-3xl text-white font-medium tracking-tight">
                PRODUCT DESIGNER
              </h2>
              <span className="hidden sm:block w-2 h-2 rounded-full bg-indigo-500"></span>
              <span className="inline-block px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-mono uppercase tracking-widest self-start">
                AI-Powered Design Innovation
              </span>
            </div>
            <p className="max-w-2xl text-lg text-white/70 leading-relaxed font-light">
              Product Designer specializing in complex enterprise workflows and AI-native systems. I translate technical complexity into intuitive, scalable product experiences from architectural concept to deployed reality.
            </p>
          </div>

          <div className="flex flex-col gap-3 text-sm text-left md:text-right font-mono text-white/60 bg-neutral-900/50 p-6 rounded-2xl border border-white/5">
            <a
              href="mailto:Anandhvishwa12@gmail.com"
              className="hover:text-indigo-400 transition-colors flex items-center md:justify-end gap-3 group"
            >
              <span className="hidden md:inline">Anandhvishwa12@gmail.com</span>
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-indigo-500/20 group-hover:text-indigo-400 text-white">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="md:hidden">Anandhvishwa12@gmail.com</span>
            </a>
            <div className="flex items-center md:justify-end gap-3">
              <span className="hidden md:inline">+91 9150281870</span>
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <span className="md:hidden">+91 9150281870</span>
            </div>
            <div className="flex items-center md:justify-end gap-3">
              <span className="hidden md:inline">Madurai, India</span>
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span className="md:hidden">Madurai, India</span>
            </div>
            <Link
              to="/"
              className="hover:text-indigo-400 transition-colors flex items-center md:justify-end gap-3 group"
            >
              <span className="hidden md:inline">Portfolio Site</span>
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 text-indigo-400 flex items-center justify-center border border-indigo-500/30">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
              </div>
              <span className="md:hidden">Portfolio</span>
            </Link>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Main Column */}
          <div className="lg:col-span-8 flex flex-col gap-16">
            {/* Experience */}
            <section>
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-px bg-indigo-500"></div>
                <h3 className="text-3xl font-medium tracking-tight text-white">
                  Experience
                </h3>
              </div>

              {/* Independent Projects Entry */}
              <div className="mb-16">
                <div className="sticky top-[68px] bg-black/90 backdrop-blur pb-6 pt-6 z-10 -mx-2 px-2 md:-mx-4 md:px-4 xl:mx-0 xl:px-0">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-2">
                    <div>
                      <h4 className="text-2xl font-semibold text-white">
                        Independent Enterprise Projects
                      </h4>
                      <p className="text-indigo-400 font-mono mt-1 text-lg">
                        Product Design & AI Development
                      </p>
                    </div>
                    <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-500/30 text-indigo-300 font-mono text-sm self-start sm:self-auto">
                      2024 to Present
                    </span>
                  </div>
                </div>

                <div className="relative border-l border-indigo-500/30 ml-3 pl-8 md:pl-12 flex flex-col gap-10 mt-4">
                  <div className="relative group">
                    <div className="absolute w-3 h-3 bg-indigo-500 rounded-full -left-[38px] md:-left-[54px] top-1.5 ring-4 ring-black shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
                    <div className="flex items-center gap-3 mb-3">
                      <h6 className="text-white font-medium text-lg leading-snug text-indigo-300">
                        <Link to="/projects/9" className="hover:text-white hover:underline underline-offset-4 transition-colors">PulseCX</Link> — AI-Native Monitoring Platform
                      </h6>
                      <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">Deployed - Jun 2026</span>
                    </div>
                    <p className="text-white/80 leading-relaxed text-[15px]">
                      Architected and designed the end-to-end UX for an <strong className="text-indigo-300 font-medium">AI-native enterprise monitoring</strong> and incident response platform, featuring an integrated <strong className="text-indigo-300 font-medium">AI chatbot</strong> powered by an LLM that I <strong className="text-indigo-300 font-medium">personally trained</strong> for intelligent diagnostic support. Leveraged AI-assisted development to independently <strong className="text-indigo-300 font-medium">build and deploy</strong> the fully functional web application, demonstrating the ability to bridge complex system design with live product execution.
                    </p>
                  </div>

                  <div className="relative group">
                    <div className="absolute w-3 h-3 bg-indigo-500 rounded-full -left-[38px] md:-left-[54px] top-1.5 ring-4 ring-black shadow-[0_0_10px_rgba(99,102,241,0.5)]"></div>
                    <div className="flex items-center gap-3 mb-3">
                      <h6 className="text-white font-medium text-lg leading-snug text-indigo-300">
                        Enterprise HRMS 
                      </h6>
                      <span className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500/80 border border-amber-500/20">Currently Building</span>
                    </div>
                    <p className="text-white/80 leading-relaxed text-[15px]">
                      Currently leading the <strong className="text-indigo-300 font-medium">UX architecture</strong> for an <strong className="text-indigo-300 font-medium">enterprise HRMS platform</strong> designed to handle <strong className="text-indigo-300 font-medium">500 to 50,000 employees</strong>, focusing on <strong className="text-indigo-300 font-medium">scalable organizational structures</strong> and <strong className="text-indigo-300 font-medium">complex workflow automation</strong>.
                    </p>
                  </div>
                </div>
              </div>

              {/* Maitsys Entry */}
              <div className="mb-16">
                <div className="sticky top-[68px] bg-black/90 backdrop-blur pb-6 pt-6 z-10 -mx-2 px-2 md:-mx-4 md:px-4 xl:mx-0 xl:px-0">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-2">
                    <div>
                      <h4 className="text-2xl font-semibold text-white">
                        UI/UX Designer
                      </h4>
                      <p className="text-indigo-400 font-mono mt-1 text-lg">
                        Maitsys
                      </p>
                    </div>
                    <span className="inline-block px-3 py-1 rounded-full border border-white/20 text-white/60 font-mono text-sm self-start sm:self-auto">
                      July 2024 to Present
                    </span>
                  </div>
                </div>

                <h5 className="text-white/50 font-mono text-sm uppercase tracking-widest mt-4 mb-8">
                  Enterprise Product Experience
                </h5>

                <div className="relative border-l border-white/10 ml-3 pl-8 md:pl-12 flex flex-col gap-10">
                  {projects.map((proj, idx) => (
                    <div key={idx} className="relative group">
                      <div className="absolute w-3 h-3 bg-neutral-600 rounded-full -left-[38px] md:-left-[54px] top-1.5 ring-4 ring-black group-hover:bg-white transition-colors"></div>
                      <h6 className="text-white font-medium text-lg leading-snug mb-3 group-hover:text-white transition-colors">
                        {proj.title}
                      </h6>
                      <p className="text-white/60 leading-relaxed text-[15px]">
                        {proj.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="sticky top-[68px] bg-black/90 backdrop-blur pb-6 pt-6 z-10 -mx-2 px-2 md:-mx-4 md:px-4 xl:mx-0 xl:px-0">
                  <div className="flex flex-col sm:flex-row justify-between sm:items-end gap-2">
                    <div>
                      <h4 className="text-2xl font-semibold text-white">
                        Freelance Brand & Digital Designer
                      </h4>
                      <p className="text-indigo-400 font-mono mt-1 text-lg">
                        Self-Employed
                      </p>
                    </div>
                    <span className="inline-block px-3 py-1 rounded-full border border-white/20 text-white/60 font-mono text-sm self-start sm:self-auto">
                      2019 to Present
                    </span>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-white/70 leading-relaxed text-[15px] mb-4">
                    I have been freelancing since 2019, working with startups and established businesses across industries such as granite manufacturing, food outlets, IT startups, and e-commerce brands. My focus has been on creating strong branding assets and digital design solutions that help businesses build a professional and impactful market presence.
                  </p>
                  <p className="text-white/70 leading-relaxed text-[15px] mb-4">
                    I collaborated closely with business owners, founders, and marketing teams to understand brand goals and transform ideas into effective visual experiences that improve customer engagement, brand visibility, and business growth.
                  </p>

                  <h5 className="text-white/50 font-mono text-sm uppercase tracking-widest mt-6 mb-4">
                    Key Deliverables
                  </h5>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-white/70 text-[15px]">
                    <li className="flex items-start"><span className="text-indigo-400 mr-2">•</span> Brand Identity Design</li>
                    <li className="flex items-start"><span className="text-indigo-400 mr-2">•</span> Logo Design & Brand Guidelines</li>
                    <li className="flex items-start"><span className="text-indigo-400 mr-2">•</span> Website UI/UX & Landing Pages</li>
                    <li className="flex items-start"><span className="text-indigo-400 mr-2">•</span> Mobile App UI Design</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Education */}
            <section>
              <div className="flex items-center gap-4 mb-10">
                <div className="w-12 h-px bg-pink-500"></div>
                <h3 className="text-3xl font-medium tracking-tight text-white">
                  Education
                </h3>
              </div>

              <div className="relative border-l border-white/10 ml-3 pl-8 md:pl-12 flex flex-col gap-8 md:gap-10">
                <div className="relative group">
                  <div className="absolute w-3 h-3 bg-pink-500 rounded-full -left-[38px] md:-left-[54px] top-1.5 ring-4 ring-black shadow-[0_0_10px_rgba(236,72,153,0.5)]"></div>
                  <span className="text-pink-400 font-mono text-xs tracking-wider mb-2 block">
                    2021 to 2023
                  </span>
                  <h4 className="text-xl font-medium text-white mb-1">
                    MASTER OF COMPUTER APPLICATIONS
                  </h4>
                  <p className="text-white/60">
                    KLN College of Engineering, Pottapalayam
                  </p>
                </div>

                <div className="relative group">
                  <div className="absolute w-3 h-3 bg-pink-500 rounded-full -left-[38px] md:-left-[54px] top-1.5 ring-4 ring-black shadow-[0_0_10px_rgba(236,72,153,0.5)]"></div>
                  <span className="text-pink-400 font-mono text-xs tracking-wider mb-2 block">
                    2018 to 2021
                  </span>
                  <h4 className="text-xl font-medium text-white mb-1">
                    BACHELOR OF COMPUTER APPLICATIONS
                  </h4>
                  <p className="text-white/60">
                    Hindusthan College of Arts and Science, Coimbatore
                  </p>
                </div>

                <div className="relative group">
                  <div className="absolute w-3 h-3 bg-neutral-600 rounded-full -left-[38px] md:-left-[54px] top-1.5 ring-4 ring-black"></div>
                  <span className="text-neutral-400 font-mono text-xs tracking-wider mb-2 block">
                    2017 to 2018
                  </span>
                  <h4 className="text-xl font-medium text-neutral-300 mb-1">
                    HSC
                  </h4>
                  <p className="text-neutral-500">
                    Mahatma Montessori Hr Sec School, Madurai
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-10 lg:gap-16 mt-8 lg:mt-0">
            {/* Skills */}
            <section className="bg-neutral-900/40 border border-white/5 rounded-3xl p-8">
              <h3 className="text-lg font-mono text-white/50 uppercase tracking-widest mb-6 border-b border-white/10 pb-4">
                Competencies
              </h3>
              <ul className="flex flex-col gap-4 text-white/90">
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]"></span>{" "}
                  AI-powered Design Innovation
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]"></span>{" "}
                  Enterprise UX & Architecture
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]"></span>{" "}
                  User Research & Testing
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]"></span>{" "}
                  UI/UX Design
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]"></span>{" "}
                  Interaction Design
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]"></span>{" "}
                  Prototyping & Wireframing
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]"></span>{" "}
                  Design Systems
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.6)]"></span>{" "}
                  Data-Informed Design
                </li>
              </ul>
            </section>

            {/* Tools */}
            <section className="bg-neutral-900/40 border border-white/5 rounded-3xl p-8">
              <h3 className="text-lg font-mono text-white/50 uppercase tracking-widest mb-6 border-b border-white/10 pb-4">
                Tools
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {[
                  "Figma",
                  "Google Labs",
                  "Google Antigravity",
                  "AI Studio",
                  "Claude",
                  "VS Code",
                  "Framer",
                  "GitHub",
                  "Adobe Creative Suite",
                ].map((tool) => (
                  <span
                    key={tool}
                    className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white/80 text-sm hover:bg-white/10 transition-colors cursor-default"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </section>

            {/* Languages */}
            <section className="bg-neutral-900/40 border border-white/5 rounded-3xl p-8">
              <h3 className="text-lg font-mono text-white/50 uppercase tracking-widest mb-6 border-b border-white/10 pb-4">
                Language
              </h3>
              <div className="flex flex-col gap-5">
                <div className="flex justify-between items-center bg-white/5 px-4 py-3 rounded-xl border border-white/5">
                  <h4 className="text-white font-medium">Tamil</h4>
                  <span className="text-pink-400 text-xs px-2 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 uppercase tracking-wider font-mono">
                    Native
                  </span>
                </div>
                <div className="flex justify-between items-center bg-white/5 px-4 py-3 rounded-xl border border-white/5">
                  <h4 className="text-white font-medium">English</h4>
                  <span className="text-indigo-400 text-xs px-2 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 uppercase tracking-wider font-mono">
                    Proficient
                  </span>
                </div>
              </div>
            </section>

            {/* Interests */}
            <section className="bg-neutral-900/40 border border-white/5 rounded-3xl p-8">
              <h3 className="text-lg font-mono text-white/50 uppercase tracking-widest mb-6 border-b border-white/10 pb-4">
                Interests
              </h3>
              <div className="flex flex-wrap gap-x-4 gap-y-3 text-white/70">
                <span className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-indigo-500"></div>Enterprise UX
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-indigo-500"></div>AI
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-pink-500"></div>Basketball
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-pink-500"></div>Technology
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-pink-500"></div>Arts
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-pink-500"></div>Photography
                </span>
                <span className="flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-pink-500"></div>Video Games
                </span>
              </div>
            </section>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
