import homePic from "../assets/demo_home.webp";

export const projects = [
  {
    imgURL: homePic,
    link: "https://github.com/Zlatonn/zlatonn.dev",
    title: "Zlatonn's Space",
    duration: "Feb 2025 ~ Mar 2025",
    detail:
      "A personal portfolio website showcasing my projects, skills, and experience in frontend development. It highlights my expertise in React, Tailwind CSS, and modern web development practices.",
    techStack: [["React", "Tailwind", "GSAP"]],
  },
  {
    imgURL: "https://github.com/Zlatonn/warranty-expiry-checker/raw/master/frontend/src/assets/home%20page.png",
    link: "https://github.com/Zlatonn/warranty-expiry-checker",
    title: "Warranty Expiry Checker",
    duration: "Jan 2025 ~ Feb 2025",
    detail:
      "A web application for tracking warranty expiration dates of items. Users can log in, add items, edit detail, delete items, and filter items based on warranty status.",
    techStack: [
      ["React", "Tailwind", "DaisyUI"],
      ["Node.js", "TypeScript", "Express", "SQLite"],
    ],
  },
  {
    imgURL: "https://github.com/Zlatonn/react-money-tracker/raw/main/src/assets/screenshots/income.png",
    link: "https://github.com/Zlatonn/react-money-tracker",
    title: "React Money Tracker",
    duration: "Dec 2024 ~ Jan 2025",
    detail:
      "A financial management application, React Money Tracker helps users track their income and expenses, summarize financial data, and categorize users into different income sections for a clear understanding of their financial standing.",

    techStack: [["React", "Tailwind", "Zustand"]],
  },
  {
    imgURL: "https://github.com/Zlatonn/multi-step-form/raw/main/images/login.png",
    link: "https://github.com/Zlatonn/multi-step-form",
    title: "Multi Step Form",
    duration: "Sep 2024 ~ Oct 2024",
    detail: "A web-based multi-step quiz application that allows users to answer questions step by step and get results at the end.",
    techStack: [["HTML", "CSS", "JavaScript"]],
  },
];

export const techStacks = {
  development: [
    { icon: "html5", title: "HTML" },
    { icon: "css3", title: "CSS" },
    { icon: "js", title: "JavaScript" },
    { icon: "typescript", title: "TypeScript" },
    { icon: "reactjs", title: "ReactJS" },
    { icon: "reactrouter", title: "React Router" },
    { icon: "reactquery", title: "React Query" },
    { icon: "redux", title: "Redux" },
    { icon: "vitejs", title: "Vite" },
    { icon: "tailwindcss", title: "TailwindCSS" },
    { icon: "materialui", title: "Material UI" },
    { icon: "shadcnui", title: "Shadcn/UI" },
    { icon: "gsap", title: "GSAP" },
    { icon: "nodejs", title: "NodeJS" },
    { icon: "mysql", title: "MySQL" },
  ],
  tools: [
    { icon: "git", title: "Git" },
    { icon: "github", title: "GitHub" },
    { icon: "copilotgithub", title: "Copilot" },
    { icon: "postman", title: "Postman" },
    { icon: "docker", title: "Docker" },
    { icon: "netlify2", title: "Netlify" },
    { icon: "cloudflare", title: "Cloudflare" },
    { icon: "railway", title: "Railway" },
    { icon: "figma", title: "Figma" },
  ],
};
