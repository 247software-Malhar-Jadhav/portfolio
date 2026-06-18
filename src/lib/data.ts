import {
  Github,
  Linkedin,
  Mail,
  Phone,
  PenLine,
  Code2,
  type LucideIcon,
} from "lucide-react";

export const profile = {
  name: "Malhar Jadhav",
  initials: "MJ",
  role: "Frontend-focused Full-Stack Software Engineer",
  company: "Josh Software",
  location: "India",
  tagline: "I build fast, intelligent interfaces.",
  blurb:
    "Frontend-focused software engineer with 4.6 years building scalable, high-performance web apps with React.js, Next.js and TypeScript. Lately I'm deep in AI-driven development - GenAI apps, RAG pipelines and vector database integrations - alongside micro-frontends and performance optimization. I ship clean, reliable solutions on a strong foundation of Computer Science, DSA, OOP, DBMS and System Design.",
  email: "malharjadhav8999@gmail.com",
  phone: "+91 9767446751",
  resumeUrl: "/Malhar-Jadhav-Resume.pdf",
};

export type SocialLink = {
  label: string;
  handle: string;
  href: string;
  icon: LucideIcon;
};

export const socials: SocialLink[] = [
  {
    label: "GitHub",
    handle: "malharjadhav8999",
    href: "https://github.com/malharjadhav8999",
    icon: Github,
  },
  {
    label: "LinkedIn",
    handle: "malhar-jadhav",
    href: "https://www.linkedin.com/in/malhar-jadhav-137b2a215",
    icon: Linkedin,
  },
  {
    label: "Medium",
    handle: "@malharjadhav8999",
    href: "https://medium.com/@malharjadhav8999",
    icon: PenLine,
  },
  {
    label: "LeetCode",
    handle: "malharjadhav8999",
    href: "https://leetcode.com/u/malharjadhav8999/",
    icon: Code2,
  },
  {
    label: "Email",
    handle: profile.email,
    href: `mailto:${profile.email}`,
    icon: Mail,
  },
  {
    label: "Phone",
    handle: profile.phone,
    href: `tel:${profile.phone.replace(/\s/g, "")}`,
    icon: Phone,
  },
];

export const stats = [
  { value: "Open", label: "to opportunities" },
  { value: "200+", label: "LeetCode solved" },
  { value: "Active", label: "Medium writer" },
];

// Skill constellation - grouped, used for the orbit section
export const skillGroups: { title: string; items: string[] }[] = [
  {
    title: "Programming Languages",
    items: ["React.js", "Next.js", "TypeScript", "SQL", "JavaScript", "CSS3", "HTML5"],
  },
  {
    title: "Developer Tools / Cloud",
    items: ["AWS", "Docker", "CI/CD", "Linux", "Claude.ai CLI", "Cursor.ai", "Copilot"],
  },
  {
    title: "AI / GenAI",
    items: ["GenAI Apps", "RAG Pipelines", "Vector Databases", "LLM Integration"],
  },
  {
    title: "Frameworks & Libraries",
    items: ["Micro Frontend", "AWS-SDK", "PostgreSQL", "Redux", "Tailwind CSS", "React-Router", "React Query", "Redux-Saga"],
  },
  {
    title: "Foundations",
    items: ["DSA", "OOP", "System Design", "Performance Optimization"],
  },
];

// Rendered as a full-width row of three at the bottom of the Skills section.
export const certifications: { name: string; issuer: string }[] = [
  { name: "Generative AI Mastermind", issuer: "Outskill" },
  { name: "AWS Academy Cloud Foundations", issuer: "AWS Academy" },
  { name: "Zensar Employment Training", issuer: "Zensar" },
];

// Placeholder projects - swap these for your real GitHub repos next.
export type Project = {
  name: string;
  blurb: string;
  tags: string[];
  href: string;
  status: "live" | "wip" | "repo";
};

const GH = "https://github.com/malharjadhav8999";

export const projects: Project[] = [
  {
    name: "Velora AI",
    blurb:
      "An agentic AI sales team (AI SDR) that autonomously finds and researches leads, writes personalized multilingual outreach, and follows up across Email, WhatsApp and LinkedIn - with human-in-the-loop approval. Built on LLM-driven agents and orchestrated workflows to help SMBs scale outbound affordably.",
    tags: ["Agentic AI", "Next.js", "LLM", "AI SDR"],
    href: "https://velora-ai-peach.vercel.app/",
    status: "wip",
  },
  {
    name: "AI IPO Assistant",
    blurb:
      "An AI-powered research assistant that turns IPO prospectuses into clear, conversational insights. Combines large language models with prompt engineering and structured data pipelines to surface key financials and answer natural-language queries in real time.",
    tags: ["GenAI", "Next.js", "TypeScript", "LLM"],
    href: "https://ai-ipo-assistant.vercel.app/",
    status: "wip",
  },
  {
    name: "PDF Chatbot",
    blurb:
      "A Retrieval-Augmented Generation (RAG) app that lets users chat with any PDF. Built with Next.js and LangChain, it chunks and embeds documents into a vector store for semantic search, then grounds a Groq-hosted LLM on the retrieved context for accurate, source-aware answers - using free, local embeddings.",
    tags: ["Next.js", "RAG", "LangChain", "Vector DB", "Groq"],
    href: "https://pdf-chatbot-woad.vercel.app/",
    status: "live",
  },

  // ── Hidden for now. Uncomment any of these to show them again. ──
  // {
  //   name: "Product Listing App",
  //   blurb:
  //     "A clean storefront with product listing, filtering and cart - built in TypeScript and React.",
  //   tags: ["TypeScript", "React"],
  //   href: `${GH}/product-listing-app`,
  //   status: "repo",
  // },
  // {
  //   name: "Netflix Clone",
  //   blurb:
  //     "A Netflix-style UI in React - hero banner, content rows and a responsive, polished layout.",
  //   tags: ["React", "JavaScript"],
  //   href: `${GH}/Netflix-React`,
  //   status: "repo",
  // },
  // {
  //   name: "Moonlight Parallax",
  //   blurb:
  //     "A smooth parallax-scrolling landing page crafted with vanilla JavaScript, HTML and CSS.",
  //   tags: ["JavaScript", "HTML / CSS"],
  //   href: `${GH}/Moonlight-Parallax-Scrolli-Website`,
  //   status: "repo",
  // },
  // {
  //   name: "Chrome Extension POC",
  //   blurb:
  //     "A Chrome extension proof-of-concept - a popup with a button that opens my LinkedIn profile.",
  //   tags: ["JavaScript", "Chrome API"],
  //   href: `${GH}/Chrome-Extentions-POC`,
  //   status: "repo",
  // },
];

// Medium posts (newest first).
export const writing = [
  {
    title: "CSR vs SSR vs SSG vs ISR in Next.js",
    excerpt:
      "Understanding rendering strategies with real code examples and visual diagrams.",
    href: "https://medium.com/@malharjadhav8999/csr-vs-ssr-vs-ssg-vs-isr-in-next-js-7b89926e8e81",
    date: "Nov 2025",
  },
  {
    title: "Docker Volumes Explained: The Right Way to Handle Data in Containers",
    excerpt:
      "Ever deleted a container and lost your data? A clear guide to persisting data the right way.",
    href: "https://medium.com/@malharjadhav8999/docker-volumes-explained-the-right-way-to-handle-data-in-containers-b86df58cf010",
    date: "Oct 2025",
  },
  {
    title: "Microfrontends with React: A Complete Guide",
    excerpt:
      "How to break a monolithic React app into independent, scalable microfrontends.",
    href: "https://medium.com/@malharjadhav8999/microfrontends-with-react-a-complete-guide-d49b8932d74c",
    date: "Sep 2025",
  },
  {
    title: "How React Actually Renders: From JSX to DOM",
    excerpt:
      "What really happens between writing JSX and pixels on screen - the render pipeline, demystified.",
    href: "https://medium.com/@malharjadhav8999/how-react-actually-renders-from-jsx-to-dom-4c68c7952d04",
    date: "Jul 2025",
  },
];
