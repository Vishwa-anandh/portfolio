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
    id: 9,
    name: "PulseCX",
    type: "Enterprise Monitoring & Incident Response",
    description: "Engineering teams lacked visibility into how API failures impacted customer journeys; I designed an end-to-end monitoring platform that bridges infrastructure health with user experience, cutting incident response times drastically.",
    img: "/pulsecx/02_executive_dashboard.png",
    detailedDescription: "PulseCX is a centralized monitoring and incident response platform designed to bridge the gap between engineering metrics and customer experience. It provides teams with deep visibility into infrastructure health, API latency, SSL/DNS status, and mobile application performance, while mapping these technical metrics directly to Customer Journeys. Featuring a robust RBAC system, specialized dashboards, and real-time ChatOps integrations, PulseCX serves as the ultimate command center for modern ops teams.",
    role: "Lead UI/UX Designer",
    timeline: "Jun 2026",
    technologies: ["Figma", "Data Visualization", "Enterprise UX", "SaaS Dashboard"]
  },
  {
    id: 0,
    name: "Workflow AI",
    type: "Generative Canvas & Workspace (Web)",
    description: "Teams needed a faster way to turn loosely structured ideas into editable workflows; I designed an AI-assisted spatial canvas that combines prompt-based generation, direct manipulation, and collaboration in one workspace.",
    img: "/v14 coer .png",
    detailedDescription: "Workflow AI is a visual workspace for turning goals and scattered notes into editable diagrams. Rather than treating AI as a separate chat surface, the concept places generation inside an infinite canvas: users can create a starting structure, refine nodes, organize sections, and collaborate through comments and sharing. The case study explores onboarding, generative states, spatial editing, collaboration, and a settings system across light and dark themes.",
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
        description: "A focused sign-in and sign-up flow introduces the product without delaying access to the workspace. A split-screen layout pairs the form with a concise preview of the canvas experience.",
        images: [
          "/V14 Workflow AI/1. Sign In.png",
          "/V14 Workflow AI/2. Sign Up.png"
        ]
      },
      {
        title: "The Canvas & Core Interaction",
        description: "The main workspace is an infinite canvas for mapping ideas, creating flows, and arranging notes. A compact toolbar keeps shapes, text, selection, and navigation tools available without competing with the work.",
        images: [
          "/V14 Workflow AI/11. Default.png",
          "/V14 Workflow AI/22. Shape - Open.png",
          "/V14 Workflow AI/16. Note.png"
        ]
      },
      {
        title: "AI-Assisted Workflow Creation",
        description: "AI generation sits inside the canvas rather than in a separate chat. Users can describe a goal, review the proposed structure, and edit every generated node with the same tools used for manual work.",
        images: [
          "/V14 Workflow AI/31. Generating.png",
          "/V14 Workflow AI/32. Generating Result.png"
        ]
      },
      {
        title: "Collaboration and Handoff",
        description: "Presence indicators, contextual comments, sharing controls, and a dedicated discussion sidebar keep feedback attached to the work. The interface supports both live collaboration and asynchronous review.",
        images: [
          "/V14 Workflow AI/28. Comment.png",
          "/V14 Workflow AI/30. Comment Sidebar.png",
          "/V14 Workflow AI/36. Share.png"
        ]
      },
      {
        title: "Account and Workspace Controls",
        description: "The settings area groups profile details, team permissions, security, and integrations into predictable categories for both individual and shared workspaces.",
        images: [
          "/V14 Workflow AI/38. Settings - Profile.png",
          "/V14 Workflow AI/43. Settings - Permissions.png"
        ]
      },
      {
        title: "Light & Dark Mode Parity",
        description: "Light and dark themes use the same hierarchy, interaction states, and component structure so changing appearance does not change how the workspace behaves.",
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
    type: "Multi-Agent Orchestration Dashboard",
    description: "Automation teams need to understand agent health, cost, and failures without reading every raw log; I designed an orchestration dashboard that uses progressive disclosure to connect fleet-level status with detailed agent telemetry.",
    img: "/Agentic14 - AI Agent Orchestration Dashboard/AgentOS - Orchestrate AI Agents At Scale.png",
    detailedDescription: "Agentic14 is a product concept for deploying and monitoring AI agents from one operational workspace. It organizes agent configuration, workflow runs, live logs, model usage, knowledge bases, alerts, and provider settings into a hierarchy that supports both fleet-level scanning and detailed investigation. The visual system uses clear health states and progressive disclosure to keep dense technical information actionable.",
    images: [
      "/Agentic14 - AI Agent Orchestration Dashboard/AgentOS - Home Dashboard.png",
      "/Agentic14 - AI Agent Orchestration Dashboard/AgentOS - All Agents.png",
      "/Agentic14 - AI Agent Orchestration Dashboard/AgentOS - Agent Detail.png",
      "/Agentic14 - AI Agent Orchestration Dashboard/AgentOS - Live Log Stream.png",
      "/Agentic14 - AI Agent Orchestration Dashboard/AgentOS - Pipeline Runs.png",
      "/Agentic14 - AI Agent Orchestration Dashboard/AgentOS - Token Usage.png"
    ],
    role: "Lead Product Designer",
    timeline: "Apr 2025",
    technologies: ["Figma", "Enterprise UX", "Data Visualization", "AI Operations"]
  },

  {
    id: 6,
    name: "SmartyAir",
    type: "Predictive Industrial Monitoring Dashboard",
    description: "Plant operators need to identify abnormal machine behavior without cross-referencing multiple reports; I designed an industrial monitoring dashboard that prioritizes equipment health, trend comparison, and maintenance actions.",
    img: "/SmartyAir - AI-Powered Industrial Monitoring Dashboard/Dashboard - Performance.png",
    detailedDescription: "SmartyAir is an industrial monitoring concept for compressor fleets and connected machinery. It brings equipment status, runtime, cycle count, performance trends, historical comparison, AI-assisted diagnostics, maintenance schedules, and reporting into one interface. The design emphasizes glanceable status, consistent drill-down patterns, and dark surfaces intended for prolonged monitoring environments.",
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
    id: 8,
    name: "Click Cart",
    type: "E-Commerce User Journey Map",
    description: "E-commerce platforms struggled with checkout drop-offs; I mapped an end-to-end user journey that optimized the purchasing flow, identifying key friction points to reduce cart abandonment.",
    img: "/clickkart.png",
    detailedDescription: "Click Cart is an extensive e-commerce user journey map focusing on the complete purchasing flow from discovery to checkout. By mapping the user's emotional and functional needs at each step, we identified significant friction points during the payment and shipping configuration phases. The final deliverable was a structured journey blueprint that optimized conversion rates and streamlined the overall customer experience.",
    role: "UX Researcher & Designer",
    timeline: "Jan 2024",
    technologies: ["Figma", "Journey Mapping", "UX Research"]
  }
];
