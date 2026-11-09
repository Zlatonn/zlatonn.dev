import { describe, expect, it } from "vitest";

import { getTechOptions } from "@/lib/techFilter";
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
