import { describe, expect, it } from "vitest";

import { projects as realProjects } from "@/contents/ProjectContent";
import { filterProjectsByTech, getTechOptions, toggleTech } from "@/lib/techFilter";
import { Project } from "@/types/projects";

const project = (title: string, techStack: string[][]): Project => ({
  imgURL: "",
  link: `https://example.com/${title}`,
  title,
  duration: "",
  detail: "",
  techStack,
});

describe("getTechOptions", () => {
  it("orders by project count, then A to Z", () => {
    const projects = [project("a", [["Vue", "React"]]), project("b", [["React", "Angular"]])];

    expect(getTechOptions(projects)).toEqual(["React", "Angular", "Vue"]);
  });

  it("counts a tech once per project even when it is in two groups", () => {
    const projects = [project("a", [["TypeScript"], ["TypeScript"]]), project("b", [["Zod"]]), project("c", [["Zod"]])];

    expect(getTechOptions(projects)).toEqual(["Zod", "TypeScript"]);
  });
});

describe("filterProjectsByTech", () => {
  const projects = [project("a", [["React"], ["Express"]]), project("b", [["Vue"]]), project("c", [["React"]])];

  it("returns every project when no tech is selected", () => {
    expect(filterProjectsByTech(projects, null)).toEqual(projects);
  });

  it("finds a tech in any group and keeps the original order", () => {
    expect(filterProjectsByTech(projects, "React").map((p) => p.title)).toEqual(["a", "c"]);
    expect(filterProjectsByTech(projects, "Express").map((p) => p.title)).toEqual(["a"]);
  });

  it("matches at least one real project for every tech option", () => {
    for (const tech of getTechOptions(realProjects)) {
      expect(filterProjectsByTech(realProjects, tech).length).toBeGreaterThan(0);
    }
  });
});

describe("toggleTech", () => {
  it("selects a tech that is not selected", () => {
    expect(toggleTech(null, "React")).toBe("React");
    expect(toggleTech("Vue", "React")).toBe("React");
  });

  it("goes back to all when the selected tech is clicked again", () => {
    expect(toggleTech("React", "React")).toBeNull();
  });

  it("selects all when all is clicked", () => {
    expect(toggleTech(null, null)).toBeNull();
    expect(toggleTech("React", null)).toBeNull();
  });
});
