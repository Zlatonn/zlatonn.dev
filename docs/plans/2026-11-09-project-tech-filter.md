# Project Tech Filter Implementation Plan

> **For agentic workers:** Use `/executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax as a checklist — progress is tracked in git (one commit per task), not by editing this file.

**Goal:** Let a visitor pick one Tech on the Projects section and see only the Projects that use it.

**Source:** `docs/specs/2026-11-09-project-tech-filter.md`

**Done check:** `npm test`, `npm run lint` and `npm run build` pass, and the 7 browser steps in the "Done check" section at the end of this plan pass at 1280px and at 375px.

**Branch:** `feat/project-filter-b`

**Architecture:** Three pure functions in `src/lib/techFilter.ts` hold every filter rule (option order, matching, toggle) and are unit-tested in Node. A display-only `TechFilter` component renders the chips. `Projects.tsx` holds the selected Tech (`null` = All), renders only the matching cards keyed by `link`, sets the pinned image to the first match on click, and calls `ScrollTrigger.refresh()` after the list changes.

**Tech Stack:** React 18, TypeScript, Tailwind 3.4, GSAP ScrollTrigger, Vitest (Node environment, no DOM).

**Baseline (checked 2026-11-09):** `npm run lint` shows 0 errors and 1 existing warning in `src/components/ui/button.tsx`; leave it. `npm test` finds no test files yet. `npm run build` passes.

**Commit style:** this repo uses a gitmoji prefix (`✨ feat: …`). Every task below gives its exact message.

---

## File map

| File | Change | Responsibility |
|---|---|---|
| `src/types/projects.ts` | Modify | Add `Project` and `TechFilterProps`; `ProjectCardProps` extends `Project` |
| `src/contents/ProjectContent.ts` | Modify | Type `projects` as `Project[]`; add `techFilterContent` |
| `src/lib/techFilter.ts` | Create | `getTechOptions`, `filterProjectsByTech`, `toggleTech` |
| `src/lib/techFilter.test.ts` | Create | Unit tests for the three functions + one real-content guard |
| `src/components/projects/TechFilter.tsx` | Create | Chip row, display only |
| `src/pages/Projects.tsx` | Modify | State, filtering, `key={link}`, pinned image on click, refresh |

---

### Task 1: Add the Project type

**Files:**
- Modify: `src/types/projects.ts:5-13`
- Modify: `src/contents/ProjectContent.ts:1`

**No test — reason:** type-only change, no runtime behaviour; `tsc` (inside `npm run build`) is the check.

- [ ] **Step 1: Add `Project` and make `ProjectCardProps` extend it**

In `src/types/projects.ts`, replace the whole `ProjectCardProps` interface (lines 5-13) with:

```typescript
export interface Project {
  imgURL: string;
  link: string;
  title: string;
  duration: string;
  detail: string;
  techStack: string[][];
}

export interface ProjectCardProps extends Project {
  setActiveProject: React.Dispatch<React.SetStateAction<{ imgURL: string; link: string }>>;
}
```

- [ ] **Step 2: Type the content**

In `src/contents/ProjectContent.ts`, replace line 1:

```typescript
export const projects = [
```

with:

```typescript
import { Project } from "@/types/projects";

export const projects: Project[] = [
```

- [ ] **Step 3: Verify it compiles**

Run: `npm run build`
Expected: build succeeds, no type errors.

- [ ] **Step 4: Commit this task**

```bash
git add src/types/projects.ts src/contents/ProjectContent.ts
git commit -m "🏷️ refactor: add Project type"
```

---

### Task 2: Build the ordered Tech list

**Files:**
- Create: `src/lib/techFilter.ts`
- Test: `src/lib/techFilter.test.ts`

- [ ] **Step 1: Write failing test**

Create `src/lib/techFilter.test.ts`:

```typescript
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
```

Why the second test can fail: without the once-per-project rule, TypeScript and Zod both count 2, the tie goes A→Z, and the result is `["TypeScript", "Zod"]`.

- [ ] **Step 2: Verify it fails correctly**

Run: `npx vitest run src/lib/techFilter.test.ts`
Expected: FAIL because `@/lib/techFilter` cannot be resolved (the file does not exist yet).

- [ ] **Step 3: Write minimal implementation**

Create `src/lib/techFilter.ts`:

```typescript
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
```

- [ ] **Step 4: Verify it passes**

Run: `npx vitest run src/lib/techFilter.test.ts`
Expected: 2 tests pass.

- [ ] **Step 5: Commit this task**

```bash
git add src/lib/techFilter.ts src/lib/techFilter.test.ts
git commit -m "✨ feat: list techs used by projects, most used first"
```

---

### Task 3: Filter Projects by one Tech

**Files:**
- Modify: `src/lib/techFilter.ts`
- Test: `src/lib/techFilter.test.ts`

- [ ] **Step 1: Write failing test**

In `src/lib/techFilter.test.ts`, replace the import line:

```typescript
import { getTechOptions } from "@/lib/techFilter";
```

with:

```typescript
import { projects as realProjects } from "@/contents/ProjectContent";
import { filterProjectsByTech, getTechOptions } from "@/lib/techFilter";
```

Then append at the end of the file:

```typescript
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
```

The last test guards the "no empty state" rule: if someone later changes how options are built or matched, a chip that shows nothing fails here.

- [ ] **Step 2: Verify it fails correctly**

Run: `npx vitest run src/lib/techFilter.test.ts`
Expected: the 3 new tests FAIL because `filterProjectsByTech` is not exported (`is not a function`); the 2 `getTechOptions` tests still pass.

- [ ] **Step 3: Write minimal implementation**

Append to `src/lib/techFilter.ts`:

```typescript
export function filterProjectsByTech(projects: Project[], tech: string | null): Project[] {
  if (tech === null) return projects;
  return projects.filter((project) => project.techStack.some((group) => group.includes(tech)));
}
```

- [ ] **Step 4: Verify it passes**

Run: `npx vitest run src/lib/techFilter.test.ts`
Expected: 5 tests pass.

- [ ] **Step 5: Commit this task**

```bash
git add src/lib/techFilter.ts src/lib/techFilter.test.ts
git commit -m "✨ feat: filter projects by one tech"
```

---

### Task 4: Toggle rule for chips

**Files:**
- Modify: `src/lib/techFilter.ts`
- Test: `src/lib/techFilter.test.ts`

- [ ] **Step 1: Write failing test**

In `src/lib/techFilter.test.ts`, replace:

```typescript
import { filterProjectsByTech, getTechOptions } from "@/lib/techFilter";
```

with:

```typescript
import { filterProjectsByTech, getTechOptions, toggleTech } from "@/lib/techFilter";
```

Then append at the end of the file:

```typescript
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
```

- [ ] **Step 2: Verify it fails correctly**

Run: `npx vitest run src/lib/techFilter.test.ts`
Expected: the 3 new tests FAIL because `toggleTech` is not exported; the 5 earlier tests pass.

- [ ] **Step 3: Write minimal implementation**

Append to `src/lib/techFilter.ts`:

```typescript
export function toggleTech(current: string | null, clicked: string | null): string | null {
  return clicked === current ? null : clicked;
}
```

- [ ] **Step 4: Verify it passes**

Run: `npm test`
Expected: 8 tests pass.

- [ ] **Step 5: Commit this task**

```bash
git add src/lib/techFilter.ts src/lib/techFilter.test.ts
git commit -m "✨ feat: click the selected tech again to show all"
```

---

### Task 5: TechFilter chip row

**Files:**
- Modify: `src/types/projects.ts` (append)
- Modify: `src/contents/ProjectContent.ts` (append)
- Create: `src/components/projects/TechFilter.tsx`

**No test — reason:** display-only component and the repo has no DOM test setup (spec, "Testing" section). Its only rule, the toggle, is already tested in Task 4. The browser Done check covers the rendering.

- [ ] **Step 1: Add the props type**

Append to `src/types/projects.ts`:

```typescript
export interface TechFilterProps {
  techs: string[];
  selectedTech: string | null;
  onSelect: (tech: string | null) => void;
}
```

- [ ] **Step 2: Add the copy**

Append to `src/contents/ProjectContent.ts`:

```typescript
export const techFilterContent = {
  allLabel: "All",
  ariaLabel: "Filter projects by tech",
};
```

- [ ] **Step 3: Create the component**

Create `src/components/projects/TechFilter.tsx`. Styles follow `docs/requirements/designs/components.css`: outline when not selected, `primary` on hover, filled `primary` with `secondary` text when selected. The selected style has no hover change, so the text never turns `primary` on a `primary` background.

```tsx
import { cn } from "@/lib/utils";

import { techFilterContent } from "@/contents/ProjectContent";
import { TechFilterProps as Props } from "@/types/projects";

const TechFilter = ({ techs, selectedTech, onSelect }: Props) => {
  const chips = [
    { key: "all", label: techFilterContent.allLabel, value: null },
    ...techs.map((tech) => ({ key: `tech-${tech}`, label: tech, value: tech })),
  ];

  return (
    <div role="group" aria-label={techFilterContent.ariaLabel} className="max-w-3xl px-4 flex flex-wrap justify-center gap-2">
      {chips.map(({ key, label, value }) => {
        const selected = value === selectedTech;
        return (
          <button
            key={key}
            type="button"
            aria-pressed={selected}
            onClick={() => onSelect(value)}
            className={cn(
              "px-3 py-1 md:px-4 md:py-1.5 text-xs md:text-sm font-medium rounded-md border transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
              selected ? "bg-primary border-primary text-secondary font-semibold" : "border-light/30 text-light hover:border-primary hover:text-primary"
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default TechFilter;
```

- [ ] **Step 4: Verify it compiles and lints**

Run: `npm run lint && npm run build`
Expected: lint shows 0 errors and only the existing `button.tsx` warning; build succeeds. The component is not on the page yet; Task 6 wires it.

- [ ] **Step 5: Commit this task**

```bash
git add src/types/projects.ts src/contents/ProjectContent.ts src/components/projects/TechFilter.tsx
git commit -m "✨ feat: add tech filter chip row"
```

---

### Task 6: Wire the filter into the Projects section

**Files:**
- Modify: `src/pages/Projects.tsx`

**No test — reason:** page wiring around GSAP and React state, no DOM test setup (spec, "Testing" section). All rules it calls are tested in Tasks 2-4. The browser Done check below is the proof.

- [ ] **Step 1: Imports and module-level options**

In `src/pages/Projects.tsx`, replace line 1:

```typescript
import { useCallback, useRef, useState } from "react";
```

with:

```typescript
import { useCallback, useEffect, useRef, useState } from "react";
```

Replace lines 10-12:

```typescript
import TechBox from "@/components/projects/TechBox";

import { projects, techStacks } from "@/contents/ProjectContent";
```

with:

```typescript
import TechBox from "@/components/projects/TechBox";
import TechFilter from "@/components/projects/TechFilter";

import { projects, techStacks } from "@/contents/ProjectContent";
import { filterProjectsByTech, getTechOptions, toggleTech } from "@/lib/techFilter";

const techOptions = getTechOptions(projects);
```

- [ ] **Step 2: State, click handler and refresh**

Directly after the existing `activeProject` state (the `useState({ imgURL: projects[0].imgURL, link: projects[0].link })` block), add:

```typescript
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const filteredProjects = filterProjectsByTech(projects, selectedTech);

  const handleSelectTech = (clicked: string | null) => {
    const next = toggleTech(selectedTech, clicked);
    const [first] = filterProjectsByTech(projects, next);
    setSelectedTech(next);
    setActiveProject({ imgURL: first.imgURL, link: first.link });
  };

  // The image pin's end depends on the list height, which changes when the filter changes.
  useEffect(() => {
    ScrollTrigger.refresh();
  }, [selectedTech]);
```

`setActiveProject` runs in the click handler, not in an effect, so there is no frame with the old image.

- [ ] **Step 3: Render the chip row under the title**

Replace:

```tsx
        {/* Title for the Projects section */}
        <ProjectTitle title={"PROJECTS"} />
```

with:

```tsx
        {/* Title and tech filter */}
        <div className="flex flex-col items-center gap-8 lg:gap-10">
          <ProjectTitle title={"PROJECTS"} />
          <TechFilter techs={techOptions} selectedTech={selectedTech} onSelect={handleSelectTech} />
        </div>
```

The wrapper keeps the chips close to the title, as in the comp; without it the parent's `gap-20 lg:gap-40` would push them far apart.

- [ ] **Step 4: Render only matching cards, keyed by link**

Replace:

```tsx
            {projects.map(({ imgURL, link, title, duration, detail, techStack }, i) => (
              <ProjectCard
                key={`project-${i}`}
```

with:

```tsx
            {filteredProjects.map(({ imgURL, link, title, duration, detail, techStack }) => (
              <ProjectCard
                key={link}
```

`key={link}` matters: with index keys React would reuse a card with new props, but its GSAP `onEnter` callback would still hold the old `imgURL`/`link` and set the wrong pinned image.

- [ ] **Step 5: Verify**

Run: `npm test && npm run lint && npm run build`
Expected: 8 tests pass; lint shows 0 errors and only the existing `button.tsx` warning; build succeeds.

- [ ] **Step 6: Commit this task**

```bash
git add src/pages/Projects.tsx
git commit -m "✨ feat: filter the projects list by tech"
```

---

## Done check

Run `npm test && npm run lint && npm run build` (all pass), then `npm run dev` and open the Projects section. Do every step at 1280px wide and again at 375px wide:

1. On load, "All" is selected and 4 cards show.
2. Click **React**: 3 cards show. At 1280px the pinned image shows Zlatonn's Space.
3. Click **Express**: 1 card shows (Warranty Expiry Checker). At 1280px the pinned image shows it and sits beside the card, not below it.
4. Still on **Express** at 1280px, scroll down past the card and back up: the pinned image still shows Warranty Expiry Checker. (The click alone sets the right image even with index keys; only this scroll catches the key bug.)
5. Click **Express** again: "All" is selected, 4 cards show, the pinned image shows Zlatonn's Space, and after scrolling through the list no card stays invisible.
6. Click **HTML** (one short card, possibly shorter than the 320px image): at 1280px the image sits beside the card, and when you scroll down to "MY TECH STACK" the image does not overlap it.
7. Click **HTML** again to go back to "All", scroll down to "MY TECH STACK": the pinned image does not overlap it.

**If step 5 fails (a card stays invisible):** use the fallback the spec already chose (remount the whole list on each filter change). In `src/pages/Projects.tsx`, add `key={selectedTech ?? "all"}` to the `<div ref={contentWrapperRef} …>` element, re-run the Done check, and commit with:

```bash
git add src/pages/Projects.tsx
git commit -m "🐛 fix: remount project list when the filter changes"
```

**If step 6 fails (the pin breaks when the list is shorter than the image):** use the spec's fallback (clamp the pin length to at least 0). In `src/pages/Projects.tsx`, inside `getScrollEndPoint`, replace:

```typescript
      return "+=" + (contentWrapperRef.current.offsetHeight - imageRef.current.offsetHeight + 50);
```

with:

```typescript
      return "+=" + Math.max(0, contentWrapperRef.current.offsetHeight - imageRef.current.offsetHeight + 50);
```

Re-run the Done check, and commit with:

```bash
git add src/pages/Projects.tsx
git commit -m "🐛 fix: keep image pin length at zero or more"
```

Any other failure: stop and report; it means the plan is wrong.
