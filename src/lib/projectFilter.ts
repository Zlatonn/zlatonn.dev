import { Project } from "@/types/projects";

export const getTechs = (projects: Project[]): string[] => [...new Set(projects.flatMap((p) => p.techStack.flat()))];

export const filterProjects = (projects: Project[], tech: string | null): Project[] =>
  tech === null ? projects : projects.filter((p) => p.techStack.flat().includes(tech));
