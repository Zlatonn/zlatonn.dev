import homePic from "/images/demo_home.webp";

import html5 from "/images/icons/html5.webp";
import css3 from "/images/icons/css3.webp";
import js from "/images/icons/js.webp";
import typescript from "/images/icons/typescript.webp";
import reactjs from "/images/icons/reactjs.webp";
import reactrouter from "/images/icons/reactrouter.webp";
import reactquery from "/images/icons/reactquery.webp";
import redux from "/images/icons/redux.webp";
import vitejs from "/images/icons/vitejs.webp";
import tailwindcss from "/images/icons/tailwindcss.webp";
import materialui from "/images/icons/materialui.webp";
import shadcnui from "/images/icons/shadcnui.webp";
import gsap from "/images/icons/gsap.webp";
import nodejs from "/images/icons/nodejs.webp";
import mysql from "/images/icons/mysql.webp";
import threejs from "/images/icons/threejs.webp";
import vscode from "/images/icons/vscode.webp";
import git from "/images/icons/git.webp";
import github from "/images/icons/github.webp";
import copilotgithub from "/images/icons/copilotgithub.webp";
import postman from "/images/icons/postman.webp";
import docker from "/images/icons/docker.webp";
import netlify2 from "/images/icons/netlify2.webp";
import cloudflare from "/images/icons/cloudflare.webp";
import railway from "/images/icons/railway.webp";
import figma from "/images/icons/figma.webp";
import openai from "/images/icons/openai.webp";

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
    imgURL: "https://github.com/Zlatonn/warranty-expiry-checker/raw/master/frontend/src/assets/home%20page.webp",
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
    { src: html5, alt: "HTML5", title: "HTML" },
    { src: css3, alt: "CSS3", title: "CSS" },
    { src: js, alt: "JavaScript", title: "JavaScript" },
    { src: typescript, alt: "TypeScript", title: "TypeScript" },
    { src: reactjs, alt: "ReactJS", title: "ReactJS" },
    { src: reactrouter, alt: "React Router", title: "React Router" },
    { src: reactquery, alt: "React Query", title: "React Query" },
    { src: redux, alt: "Redux", title: "Redux" },
    { src: vitejs, alt: "Vite", title: "Vite" },
    { src: tailwindcss, alt: "TailwindCSS", title: "TailwindCSS" },
    { src: materialui, alt: "Material UI", title: "Material UI" },
    { src: shadcnui, alt: "Shadcn/UI", title: "Shadcn/UI" },
    { src: gsap, alt: "GSAP", title: "GSAP" },
    { src: nodejs, alt: "NodeJS", title: "NodeJS" },
    { src: mysql, alt: "MySQL", title: "MySQL" },
    { src: threejs, alt: "Three.js", title: "Three.js" },
  ],
  tools: [
    { src: vscode, alt: "VSCode", title: "VSCode" },
    { src: git, alt: "Git", title: "Git" },
    { src: github, alt: "GitHub", title: "GitHub" },
    { src: copilotgithub, alt: "Copilot", title: "Copilot" },
    { src: postman, alt: "Postman", title: "Postman" },
    { src: docker, alt: "Docker", title: "Docker" },
    { src: netlify2, alt: "Netlify", title: "Netlify" },
    { src: cloudflare, alt: "Cloudflare", title: "Cloudflare" },
    { src: railway, alt: "Railway", title: "Railway" },
    { src: figma, alt: "Figma", title: "Figma" },
    { src: openai, alt: "OpenAI", title: "OpenAI" },
  ],
};
