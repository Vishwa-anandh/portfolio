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
    description: "Knowledge workers needed a spatial way to chain AI prompts without writing code; I designed a visual canvas workspace that translated complex logic into drag-and-drop nodes, enabling non-technical users to build workflows 3x faster.",
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
    type: "Multi-Agent Orchestration Dashboard",
    description: "Enterprise automation teams needed a way to monitor multi-agent systems without getting overwhelmed by logs; I designed an orchestration dashboard that abstracted technical noise into actionable visual states, reducing estimated incident response time by 40%.",
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
    id: 6,
    name: "SmartyAir",
    type: "Predictive Industrial Monitoring Dashboard",
    description: "Industrial plant operators struggled to identify critical machine failures within dense data streams; I designed a predictive monitoring dashboard that surfaced high-priority anomalies natively, cutting diagnostic time in half.",
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
