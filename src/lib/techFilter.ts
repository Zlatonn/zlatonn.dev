import { Project } from "@/types/projects";

export function getTechOptions(projects: Project[]): string[] {
  const counts = new Map<string, number>();
  for (const project of projects) {
    for (const tech of new Set(project.techStack.flat())) {
      counts.set(tech, (counts.get(tech) ?? 0) + 1);
    }
  }
  return [...counts]
    .sort(([techA, countA], [techB, countB]) => countB - countA || techA.localeCompare(techB, "en"))
    .map(([tech]) => tech);
}

export function filterProjectsByTech(projects: Project[], tech: string | null): Project[] {
  if (tech === null) return projects;
  return projects.filter((project) => project.techStack.some((group) => group.includes(tech)));
}
