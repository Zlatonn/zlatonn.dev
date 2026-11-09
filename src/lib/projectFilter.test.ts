import { describe, it, expect } from "vitest";

import { filterProjects, getTechs } from "@/lib/projectFilter";
import { projects } from "@/contents/ProjectContent";
import { Project } from "@/types/projects";

const make = (link: string, techStack: string[][]): Project => ({
  imgURL: `${link}.png`,
  link,
  title: link,
  duration: "",
  detail: "",
  techStack,
});

const a = make("a", [["React", "Tailwind"]]);
const b = make("b", [["React"], ["Node.js", "Express"]]);
const c = make("c", [["HTML"]]);

describe("getTechs", () => {
  it("returns unique techs in first-appearance order", () => {
    expect(getTechs([a, b, c])).toEqual(["React", "Tailwind", "Node.js", "Express", "HTML"]);
  });

  it("dedupes across groups and projects", () => {
    expect(getTechs([a, a, b]).filter((t) => t === "React")).toHaveLength(1);
  });

  it("gives the 12 techs from real content", () => {
    expect(getTechs(projects)).toEqual([
      "React",
      "Tailwind",
      "GSAP",
      "DaisyUI",
      "Node.js",
      "TypeScript",
      "Express",
      "SQLite",
      "Zustand",
      "HTML",
      "CSS",
      "JavaScript",
    ]);
  });
});

describe("filterProjects", () => {
  it("returns all projects in order when tech is null", () => {
    expect(filterProjects([a, b, c], null)).toEqual([a, b, c]);
  });

  it("matches a tech in any group", () => {
    expect(filterProjects([a, b, c], "Express")).toEqual([b]);
  });

  it("keeps order for several matches", () => {
    expect(filterProjects([a, b, c], "React")).toEqual([a, b]);
  });

  it("matches case-sensitively", () => {
    expect(filterProjects([a, b, c], "react")).toEqual([]);
  });
});
