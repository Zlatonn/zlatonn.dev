# Project Tech Filter Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans (inline, per user preference) to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Let a visitor pick one tech chip above the project list and see only the projects that use that tech.

**Architecture:** Two pure functions in `src/lib/projectFilter.ts` derive the chip list and the filtered list from the existing `projects` content. `Projects.tsx` owns `selectedTech` state, renders a new `TechFilter` component, and keeps the GSAP image pin correct after each change.

**Tech Stack:** React 18, TypeScript, Tailwind, GSAP ScrollTrigger, Vitest (Node environment, no DOM).

**Spec:** `docs/superpowers/specs/2026-11-09-project-tech-filter-design.md`

## Global Constraints

- No user-facing strings in components: the `All` label lives in `src/contents/ProjectContent.ts`.
- Prop and data types live in `src/types/projects.ts`; no inline `interface Props` in components.
- Imports use the `@/` alias.
- Do not register GSAP plugins in components (already done in `App.tsx`).
- Tech names are matched by exact, case-sensitive equality; no tech names in `ProjectContent.ts` are changed.
- No comments in code unless the why is non-obvious; one line max.
- Commit messages: short, plain words, no `Co-Authored-By` or `Claude-Session` trailer.

## Review Focus

1. **Stale card trigger after filtering:** after choosing a chip, scrolling a card into view must show that card's own image on the right (depends on `key={link}`). Manual check in Task 2.
2. **Filter while the image is pinned:** the image must stop pinning at the end of the shorter list and never overlap the "MY TECH STACK" section. Manual check in Task 2.
3. **Newly shown cards stay invisible:** cards that mount after a filter change run `gsap.from(... opacity: 0)`; every visible card must end fully shown. Manual check in Task 2, desktop and mobile widths.
4. **Clicking the already-selected chip:** expected to keep it selected (no toggle back to `All`). Builder's call, not in the spec. Manual check in Task 2.
5. **Tech name in more than one group or project:** must appear once in the chip list. Unit test in Task 1 (`dedupes across groups and projects`).

---

### Task 1: Filter logic, `Project` type, glossary

**Files:**
- Modify: `src/types/projects.ts`
- Modify: `src/contents/ProjectContent.ts` (type `projects` as `Project[]`)
- Create: `src/lib/projectFilter.ts`
- Test: `src/lib/projectFilter.test.ts`
- Create: `GLOSSARY.md`

**Interfaces:**
- Produces:
  - `export interface Project { imgURL: string; link: string; title: string; duration: string; detail: string; techStack: string[][]; }` in `@/types/projects`
  - `getTechs(projects: Project[]): string[]` in `@/lib/projectFilter`
  - `filterProjects(projects: Project[], tech: string | null): Project[]` in `@/lib/projectFilter`

- [ ] **Step 1: Write the failing tests** in `src/lib/projectFilter.test.ts`, importing `describe, it, expect` from `vitest`. Use a small local fixture built with a `make(link, techStack)` helper, plus the real `projects` for one check.

```ts
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
    expect(getTechs(projects)).toEqual(["React", "Tailwind", "GSAP", "DaisyUI", "Node.js", "TypeScript", "Express", "SQLite", "Zustand", "HTML", "CSS", "JavaScript"]);
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
```

- [ ] **Step 2: Run the tests to see them fail**

Run: `npx vitest run src/lib/projectFilter.test.ts`
Expected: FAIL, cannot resolve `@/lib/projectFilter`.

- [ ] **Step 3: Add `Project` to `src/types/projects.ts`, type `projects` as `Project[]`, and implement `getTechs` and `filterProjects` in `src/lib/projectFilter.ts`.** Flatten with `techStack.flat()`; dedupe with a `Set`, which keeps insertion order.

- [ ] **Step 4: Run the tests to see them pass**

Run: `npx vitest run src/lib/projectFilter.test.ts`
Expected: 7 passed.

- [ ] **Step 5: Create `GLOSSARY.md`** with this exact entry:

```markdown
# Glossary

- **Tech**: one technology name in a project's `techStack` (for example `React`). It is what the project filter uses. It is not the same as the icons in the "MY TECH STACK" section, which come from a separate list with different names.
```

- [ ] **Step 6: Commit**

```bash
git add src/types/projects.ts src/contents/ProjectContent.ts src/lib/projectFilter.ts src/lib/projectFilter.test.ts GLOSSARY.md
git commit -m "add project filter logic and glossary"
```

---

### Task 2: Filter chips in the Projects section

**Files:**
- Modify: `src/types/projects.ts` (add `TechFilterProps`)
- Modify: `src/contents/ProjectContent.ts` (add `allTechLabel`)
- Create: `src/components/projects/TechFilter.tsx`
- Modify: `src/pages/Projects.tsx`

**Interfaces:**
- Consumes: `Project`, `getTechs`, `filterProjects` from Task 1.
- Produces:
  - `export interface TechFilterProps { techs: string[]; selectedTech: string | null; onSelect: (tech: string | null) => void; }` in `@/types/projects`
  - `export const allTechLabel = "All";` in `@/contents/ProjectContent`
  - default export `TechFilter` from `@/components/projects/TechFilter`

- [ ] **Step 1: Add `allTechLabel` and `TechFilterProps`.**

- [ ] **Step 2: Create `TechFilter.tsx`.** Renders, in a `flex flex-wrap justify-center gap-2` row, one `<button type="button">` for `allTechLabel` (selects `null`) followed by one per tech. Each button has `px-2 py-1 text-xs rounded-md` and `aria-pressed` set to whether it is selected. Selected: `bg-accent text-secondary`. Not selected: `border border-light/50 text-light hover:border-light`.

- [ ] **Step 3: Wire it into `Projects.tsx`.**
  - Module level: `const techs = getTechs(projects);`
  - State: `selectedTech: string | null`, start `null`. `visibleProjects = filterProjects(projects, selectedTech)`.
  - Render `<TechFilter>` between `<ProjectTitle title={"PROJECTS"} />` and the project list wrapper.
  - Map `visibleProjects` instead of `projects`, and change the card `key` to `link`.
  - In the chip `onSelect` handler: set `selectedTech`, and set `activeProject` to the first project of `filterProjects(projects, tech)` (`{ imgURL, link }`).
  - After the DOM updates for a new `selectedTech`, call `ScrollTrigger.refresh()` (a `useEffect` with `[selectedTech]` is enough).

- [ ] **Step 4: Run the automatic checks**

Run: `npm test && npm run lint && npm run build`
Expected: all tests pass, no lint errors, build succeeds.

- [ ] **Step 5: Manual check in `npm run dev`** at desktop width (≥ 1024px) and mobile width (375px):
  - `All` shows 4 projects; `React` shows 3; `HTML` shows 1; `Express` shows only "Warranty Expiry Checker".
  - Desktop: after each change, the right image shows the first visible project; scrolling to each card shows that card's image (Review Focus 1); the pin ends at the bottom of the shorter list and does not cover "MY TECH STACK" (Review Focus 2).
  - Every visible card is fully shown after a change, on both widths (Review Focus 3).
  - Clicking the selected chip again keeps it selected (Review Focus 4).
  - Chips wrap on mobile; Tab moves between chips and Enter selects.

- [ ] **Step 6: Commit**

```bash
git add src/types/projects.ts src/contents/ProjectContent.ts src/components/projects/TechFilter.tsx src/pages/Projects.tsx
git commit -m "add tech filter chips to projects section"
```
