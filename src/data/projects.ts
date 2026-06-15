export interface CaseStudySection {
  title: string;
  description: string;
  images: string[];
}

export interface Project {
  id: number;
  name: string;
  type: string;
  description: string;
  img: string;
  detailedDescription?: string;
  images?: string[];
  role?: string;
  timeline?: string;
  technologies?: string[];
  caseStudy?: CaseStudySection[];
}

export const projects: Project[] = [
  {
    id: 1,
    name: "SEO PRO",
    type: "AI-Powered SEO & Traffic Analytics Suite (Web & Mobile)",
    description: "Designed a comprehensive AI-powered SEO analytics dashboard with domain overview, keyword research, site audits, and competitor analysis tools.",
    img: "/SEO PRO/SEO Dashboard - Desktop 1441.png",
    detailedDescription: "SEO PRO is an AI-powered all-in-one SEO platform tailored for marketing agencies and growth teams. The platform centralizes Traffic Analytics, Desktop & Mobile Domain Overviews, Keyword Exploration, and Site Auditing into a cohesive, data-dense interface. Emphasis was placed on creating legible data visualizations, responsive multi-device layouts (optimized extensively for iPad and iPhone), and actionable competitive insights.",
    images: [
      "/SEO PRO/SEO Dashboard - Desktop 1441.png",
      "/SEO PRO/Domain Overview - Desktop 1440.png",
      "/SEO PRO/Site Audit - Desktop 1448.png",
      "/SEO PRO/Keyword Explorer - Desktop 1444.png",
      "/SEO PRO/Organic Research - Desktop 1444.png",
      "/SEO PRO/iPhone 16 Pro Max - 1.png",
      "/SEO PRO/iPad mini 8.3 - 1.png"
    ],
    role: "Lead Product Designer",
    timeline: "Jan 2026",
    technologies: ["Figma", "Data Visualization", "Responsive Design"]
  },
  {
    id: 0,
    name: "Workflow AI",
    type: "AI-Powered Visual Canvas & Workspace (Web)",
    description: "Designed a comprehensive canvas-based workspace with AI generation capabilities, real-time collaboration tools, and extensive project management workflows.",
    img: "/v14 coer .png",
    detailedDescription: "Workflow AI represents a new generation of visual workspace. Combining endless canvas interaction with native AI tools, it allows users to 'Generate' workflows on the fly. The design scales from simple onboarding directly into an advanced spatial editor featuring templates, smart object modeling (notes, shapes, texts, sections), deep collaboration (comments sidebar, member invites, real-time presence), and a modular settings architecture. Both a sleek Dark Theme and a clean Light Theme were developed to support various user preferences and lighting contexts.",
    images: [
      "/V14 Workflow AI/6. Homepage.png",
      "/V14 Workflow AI/11. Default.png",
      "/V14 Workflow AI/31. Generating.png",
      "/V14 Workflow AI/32. Generating Result.png",
      "/V14 Workflow AI/28. Comment.png",
      "/V14 Workflow AI/38. Settings - Profile.png"
    ],
    role: "Lead Product Designer",
    timeline: "Aug 2025",
    technologies: ["Figma", "Design Systems", "Prototyping", "AI Integrations"],
    caseStudy: [
      {
        title: "Authentication & Onboarding",
        description: "A streamlined sign-in and sign-up experience designed to get users into their workspace quickly. The layout features a split-screen design highlighting core platform capabilities.",
        images: [
          "/V14 Workflow AI/1. Sign In.png",
          "/V14 Workflow AI/2. Sign Up.png"
        ]
      },
      {
        title: "The Canvas & Core Interaction",
        description: "The main workspace is an infinite canvas optimized for spatial organization. Users can map out ideas, create flowcharts, and arrange sticky notes with ease. The toolbar provides quick access to shapes, texts, and hand tools.",
        images: [
          "/V14 Workflow AI/11. Default.png",
          "/V14 Workflow AI/22. Shape - Open.png",
          "/V14 Workflow AI/16. Note.png"
        ]
      },
      {
        title: "AI Workflows Integration",
        description: "Moving beyond a static whiteboard, the platform integrates AI directly into the canvas. Users can prompt the system to generate complex layouts and workflow diagrams automatically, drastically reducing manual setup time.",
        images: [
          "/V14 Workflow AI/31. Generating.png",
          "/V14 Workflow AI/32. Generating Result.png"
        ]
      },
      {
        title: "Real-Time Collaboration",
        description: "Built for teams, the platform supports real-time presence, contextual commenting, and easy sharing. A dedicated comment sidebar and inline sticker reactions foster asynchronous and synchronous collaboration.",
        images: [
          "/V14 Workflow AI/28. Comment.png",
          "/V14 Workflow AI/30. Comment Sidebar.png",
          "/V14 Workflow AI/36. Share.png"
        ]
      },
      {
        title: "Account & Enterprise Settings",
        description: "A robust settings dashboard handles profile management, team permissions, security, and third-party integrations, catering to both individual power users and enterprise teams.",
        images: [
          "/V14 Workflow AI/38. Settings - Profile.png",
          "/V14 Workflow AI/43. Settings - Permissions.png"
        ]
      },
      {
        title: "Light & Dark Mode Parity",
        description: "Recognizing that power users have diverse preferences and lighting environments, a complete light mode was designed with a soft, clean aesthetic, ensuring parity with the sleek default dark theme.",
        images: [
          "/V14 Workflow AI/11. Default.png",
          "/V14 Workflow AI/38. Settings - Profile.png"
        ]
      }
    ]
  },
  {
    id: 2,
    name: "Agentic14",
    type: "AI Agent Orchestration Dashboard",
    description: "Designed a comprehensive orchestration dashboard for managing, deploying, and tracking autonomous AI agents.",
    img: "/Agentic14 - AI Agent Orchestration Dashboard/AgentOS - Orchestrate AI Agents At Scale.png",
    detailedDescription: "Agentic14 is an orchestration platform designed to help teams orchestrate AI agents at scale. The platform allows users to deploy agents, track real-time logs, monitor token usages and model performance, and seamlessly integrate API providers. Built with a futuristic dark mode identity, Agentic14 provides a unified environment to scale your artificial workforce.",
    images: [
      "/Agentic14 - AI Agent Orchestration Dashboard/AgentOS - Home Dashboard.png",
      "/Agentic14 - AI Agent Orchestration Dashboard/AgentOS - All Agents.png",
      "/Agentic14 - AI Agent Orchestration Dashboard/AgentOS - Agent Detail.png",
      "/Agentic14 - AI Agent Orchestration Dashboard/AgentOS - Live Log Stream.png",
      "/Agentic14 - AI Agent Orchestration Dashboard/AgentOS - Pipeline Runs.png",
      "/Agentic14 - AI Agent Orchestration Dashboard/AgentOS - Token Usage.png"
    ],
    role: "Lead Product Designer",
    timeline: "Apr 2025"
  },
  {
    id: 3,
    name: "Payroll Management System",
    type: "Staff & Shift Management Dashboard",
    description: "Designed a comprehensive payroll and staff management dashboard with shift tracking, approval workflows, and earning histories.",
    img: "/Cover.png",
    detailedDescription: "A fully responsive end-to-end Payroll Management System tailored for businesses requiring shift scheduling and staff payouts. The platform includes a responsive mobile presence for staff to check schedules and scan QR codes, alongside a robust administrative dashboard for shift application reviews, branch overview, and automated earning calculations.",
    images: [
      "/Payroll Management System/Dashboard.png",
      "/Payroll Management System/Staffs.png",
      "/Payroll Management System/Admins.png",
      "/Payroll Management System/Branches.png",
      "/Payroll Management System/Reports.png",
      "/Payroll Management System/Landing - Menu.png",
      "/Payroll Management System/Login - Show QR.png"
    ],
    role: "Lead Product Designer",
    timeline: "Dec 2024"
  },
  {
    id: 4,
    name: "Educourse - AI for Online Course",
    type: "AI-Powered Online Course Platform",
    description: "A comprehensive AI-powered platform for online course creation, coaching, and community building, with built-in analytics and marketing tools.",
    img: "/Educourse - AI for Online Course/Home Page - Dekstop.png",
    detailedDescription: "Educourse is a powerful all-in-one platform for online course creators and educators. With native AI tools, it simplifies syllabus generation, course building, podcasting, and certificate generation. The system also includes coaching session booking, community spaces, and robust analytics dashboards to track student progress and revenue.",
    role: "Lead Product Designer",
    timeline: "Aug 2024",
    technologies: ["Figma", "UI/UX Design", "Web App", "Mobile App"],
    images: [
      "/Educourse - AI for Online Course/Home Page - Dekstop.png",
      "/Educourse - AI for Online Course/Analystics - Dekstop.png",
      "/Educourse - AI for Online Course/Create Courses - Dekstop.png",
      "/Educourse - AI for Online Course/Curriculum Add Course - Dekstop.png",
      "/Educourse - AI for Online Course/Create Lesson - Dekstop.png",
      "/Educourse - AI for Online Course/Course Pricing - Dekstop.png",
      "/Educourse - AI for Online Course/Coaching Page - Dekstop.png",
      "/Educourse - AI for Online Course/Community Details - Desktop.png",
      "/Educourse - AI for Online Course/Create New Podcast - Dekstop.png",
      "/Educourse - AI for Online Course/Create Certificate - Dekstop.png",
      "/Educourse - AI for Online Course/Home Page - Mobile.png",
      "/Educourse - AI for Online Course/Analystics - Mobile.png"
    ],
    caseStudy: [
      {
        title: "Platform Dashboard & Analytics",
        description: "The core dashboard gives course creators complete visibility into their online business, tracking revenue, upcoming sessions, and course performance metrics.",
        images: [
          "/Educourse - AI for Online Course/Home Page - Dekstop.png",
          "/Educourse - AI for Online Course/Analystics - Dekstop.png"
        ]
      },
      {
        title: "AI-Powered Course Creation",
        description: "An intuitive course builder utilizing AI to generate syllabuses, populate lesson content, and manage curriculum modules seamlessly.",
        images: [
          "/Educourse - AI for Online Course/Create Courses - Dekstop.png",
          "/Educourse - AI for Online Course/Curriculum Add Course - Dekstop.png",
          "/Educourse - AI for Online Course/Create Lesson - Dekstop.png"
        ]
      },
      {
        title: "Coaching & Communities",
        description: "Built-in tools for scheduling coaching sessions and fostering paid community spaces without needing external platforms.",
        images: [
          "/Educourse - AI for Online Course/Coaching Page - Dekstop.png",
          "/Educourse - AI for Online Course/Community Details - Desktop.png"
        ]
      },
      {
        title: "Podcasts & Certificates",
        description: "Extending creator capabilities with native podcast management and automated course completion certificates.",
        images: [
          "/Educourse - AI for Online Course/Create New Podcast - Dekstop.png",
          "/Educourse - AI for Online Course/Create Certificate - Dekstop.png"
        ]
      },
      {
        title: "Mobile Experience",
        description: "A fully responsive design ensuring course creators can manage their courses and students right from their mobile devices.",
        images: [
          "/Educourse - AI for Online Course/Home Page - Mobile.png",
          "/Educourse - AI for Online Course/Analystics - Mobile.png"
        ]
      }
    ]
  },
  {
    id: 5,
    name: "Loop HR",
    type: "AI-Powered HR System (Mobile)",
    description: "An AI-powered mobile HR management system designed for seamless attendance tracking, scheduling, leave management, and AI-assisted employee engagement.",
    img: "/loop - Your AI-Powered HR System/13. Home – Default.png",
    detailedDescription: "Loop HR reinvents the employee experience with an AI-first mobile platform. It replaces clunky web forms with a streamlined native feeling experience; employees can clock in using Face Valdiation or QR codes, engage with an integrated AI chat for policy queries, and effortlessly manage leaves, overtime, and expenses directly from their smartphones. By reducing friction in daily HR tasks, users save time and managers gain real-time visibility into operational metrics.",
    role: "Lead Product Designer",
    timeline: "May 2024",
    technologies: ["Figma", "Mobile UI/UX", "AI Integration", "Prototyping"],
    images: [
      "/loop - Your AI-Powered HR System/1. Splash Screen.png",
      "/loop - Your AI-Powered HR System/13. Home – Default.png",
      "/loop - Your AI-Powered HR System/19. AI Chat – Home.png",
      "/loop - Your AI-Powered HR System/25. Attendance – Face Validation.png",
      "/loop - Your AI-Powered HR System/32. Attendance Calendar.png",
      "/loop - Your AI-Powered HR System/43. Timesheet – Monthly.png",
      "/loop - Your AI-Powered HR System/48. Leave - Home.png",
      "/loop - Your AI-Powered HR System/60. Overtime - Home.png",
      "/loop - Your AI-Powered HR System/64. Payslip – Home.png",
      "/loop - Your AI-Powered HR System/71. Expense - Overview.png",
      "/loop - Your AI-Powered HR System/81. Profile – Default.png"
    ]
  },
  {
    id: 6,
    name: "SmartyAir",
    type: "AI-Powered Industrial Monitoring Dashboard",
    description: "An advanced industrial IoT dashboard focusing on real-time machine monitoring, AI-driven performance recommendations, and predictive maintenance schedules.",
    img: "/SmartyAir - AI-Powered Industrial Monitoring Dashboard/Dashboard - Performance.png",
    detailedDescription: "SmartyAir is a robust industrial monitoring panel designed to oversee factories and heavy machinery operations. Through real-time data streams and connected sensors, plant managers can monitor compressor statuses, analyze cycle counts, and review machine runtime hours. Built with dark-mode optimized components to reduce glare in industrial environments, it features deeper analytical views, AI performance recommendations (chat-room style diagnostics), and comprehensive historical data comparisons to prevent breakdowns before they happen.",
    role: "Lead Product Designer",
    timeline: "Feb 2024",
    technologies: ["Figma", "Data Dashboard", "IoT UX", "Industrial Design"],
    images: [
      "/SmartyAir - AI-Powered Industrial Monitoring Dashboard/Dashboard - Performance.png",
      "/SmartyAir - AI-Powered Industrial Monitoring Dashboard/Real Time Data - Machines- Status.png",
      "/SmartyAir - AI-Powered Industrial Monitoring Dashboard/Compressor - Grid.png",
      "/SmartyAir - AI-Powered Industrial Monitoring Dashboard/Compressor - Machines - Machine Details.png",
      "/SmartyAir - AI-Powered Industrial Monitoring Dashboard/AI Recommendation.png",
      "/SmartyAir - AI-Powered Industrial Monitoring Dashboard/Maintenance Schedule.png",
      "/SmartyAir - AI-Powered Industrial Monitoring Dashboard/General Report.png",
      "/SmartyAir - AI-Powered Industrial Monitoring Dashboard/Historical Data.png"
    ]
  },
  {
    id: 7,
    name: "P14 Dashboard",
    type: "AI Project Management Dashboard",
    description: "A comprehensive project management suite integrated with an AI assistant for optimizing workflows, scheduling, and team collaboration.",
    img: "/P14 - AI Project Management Dashboard/Dashboard.png",
    detailedDescription: "The P14 AI Project Management Dashboard streamlines project planning and team execution via a highly modern, sleek interface. Key features include an integrated AI Assistant for instant data lookup and schedule optimization, robust calendar synchronization, and granular task creation templates. The UI embraces clean typography and negative space with a focus on scannable, data-dense overview screens.",
    role: "Lead Product Designer",
    timeline: "Nov 2023",
    technologies: ["Figma", "SaaS Dashboard", "AI Capabilities", "Product Design"],
    images: [
      "/P14 - AI Project Management Dashboard/Dashboard.png",
      "/P14 - AI Project Management Dashboard/Projects.png",
      "/P14 - AI Project Management Dashboard/Create New Project.png",
      "/P14 - AI Project Management Dashboard/Calendar.png",
      "/P14 - AI Project Management Dashboard/AI Assistant.png",
      "/P14 - AI Project Management Dashboard/Inbox_ Video Call.png",
      "/P14 - AI Project Management Dashboard/Settings - General.png",
      "/P14 - AI Project Management Dashboard/Log In.png"
    ]
  },
  {
    id: 8,
    name: "Click Cart",
    type: "E-Commerce Experience",
    description: "An end-to-end e-commerce platform focusing on intuitive product discovery and seamless checkout workflows.",
    img: "/clickkart.png",
    detailedDescription: "Click Cart is a concept e-commerce application exploring seamless product discovery, intuitive sorting mechanisms, and frictionless checkout experiences.",
    role: "Lead Product Designer",
    timeline: "Aug 2023",
    technologies: ["UI/UX Design", "E-Commerce", "Prototyping"],
    images: ["/clickkart.png"]
  }
];
