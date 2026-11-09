# Project Tech Filter — Design

Date: 2026-11-09
Branch: `feat/project-filter-a`

## Intent

On the Projects section, a visitor picks one tech (for example `React`) and sees only the projects that use it. This helps a visitor find work in the tech they care about.

## Goals

- A row of filter chips sits between the "PROJECTS" title and the project list.
- The first chip is `All`. It is selected by default and shows every project.
- The other chips are every unique tech found in `projects[].techStack`, in order of first appearance (project 1 first, then project 2, and so on). Today this gives 12 techs: React, Tailwind, GSAP, DaisyUI, Node.js, TypeScript, Express, SQLite, Zustand, HTML, CSS, JavaScript.
- Only one chip can be selected at a time. Clicking a tech chip shows only the projects whose `techStack` contains that tech in any group (frontend or backend group, it does not matter).
- After the list changes, the pinned image on the right and its scroll range stay correct.

## Non-goals

- Multi-select, AND/OR logic.
- Saving the selected tech in the URL or in storage. Reload goes back to `All`.
- Enter/leave animation when the list changes.
- Fixing the name mismatch between project tech names (`React`, `Node.js`) and the "MY TECH STACK" icon list (`ReactJS`, `NodeJS`). The filter does not use the icon list.
- Making the "MY TECH STACK" icons clickable.

## Anti-goals

- A chip that gives an empty result. This cannot happen, because chips come only from tech that some project uses.
- The pinned image showing a project that is hidden, or pinning at the wrong height.

## Decided behaviour

### Data and logic

Two pure functions, outside any component, with Vitest tests:

- `getTechs(projects)` returns the unique tech names in first-appearance order, flattening all groups of `techStack`.
- `filterProjects(projects, tech)` returns all projects when `tech` is `null`, otherwise only projects whose flattened `techStack` contains `tech`. Order is kept.

Matching is exact, case-sensitive string equality on the names already in `ProjectContent.ts`. No names are changed.

### State

`Projects.tsx` holds `selectedTech: string | null` in React state. `null` means `All`.

### When the selection changes

1. `activeProject` is set to the first project in the filtered list.
2. `ScrollTrigger.refresh()` is called after the DOM updates, so the image pin end point (computed from the list height) is recalculated.

### Repo conventions to follow

- The `All` label lives in `src/contents/ProjectContent.ts`, not in the component.
- New prop and data types live in `src/types/projects.ts`.
- Imports use the `@/` alias.
- GSAP plugins are already registered in `App.tsx`. Do not register them again.

### Chips (look and feel)

- Each chip is a `<button type="button">`, so it works with the keyboard. The selected chip has `aria-pressed="true"`.
- Size and shape match the existing tech tags on project cards: `px-2 py-1 text-xs rounded-md`.
- The selected chip uses `bg-accent text-secondary`.
- The row uses `flex flex-wrap justify-center gap-2`, so on mobile the chips wrap to new lines instead of scrolling sideways.

### Glossary

Create `GLOSSARY.md` at the repo root with one term:

- **Tech**: one technology name in a project's `techStack` (for example `React`). It is what the project filter uses. It is not the same as the icons in the "MY TECH STACK" section, which come from a separate list with different names.

No ADR. The decision is small and easy to reverse.

## Builder's calls (made by Claude, not discussed with the user)

- **File for the pure functions:** `src/lib/projectFilter.ts`, test in `src/lib/projectFilter.test.ts`. `src/lib/` already holds non-component helpers (`utils.ts`).
- **A `Project` type** is added to `src/types/projects.ts` (`imgURL`, `link`, `title`, `duration`, `detail`, `techStack: string[][]`), because the functions need a parameter type. `projects` in `ProjectContent.ts` gets typed as `Project[]`.
- **Card `key` must change from the index to `link`.** `ProjectCard` sets up its ScrollTrigger once on mount, and that trigger captures `imgURL` and `link`. With an index key, React would reuse a card for a different project after filtering, and the trigger would set the wrong image. A stable key makes React mount a fresh card.
- **Unselected chip style:** `border border-light/50 text-light`, with hover `border-light`. The filled `bg-light` style of card tags would look too close to the selected style on mobile.
- **Filter component:** a small `src/components/projects/TechFilter.tsx` that receives the tech list, the selected tech and a change handler. `Projects.tsx` owns the state.

## Left to the builder

- Exact place to call `ScrollTrigger.refresh()` (for example a `useGSAP` or `useEffect` with `selectedTech` as dependency), as long as it runs after the filtered list is in the DOM.
- Spacing between the chip row and the list.

## How we check it is done

- `npm test`: tests for `getTechs` and `filterProjects` pass (unique + order, flatten groups, `null` returns all, exact match).
- `npm run build` and `npm run lint` pass.
- Manual check in `npm run dev`, desktop and mobile widths:
  - `All` shows 4 projects. `React` shows 3. `HTML` shows 1. `Express` shows only Warranty Expiry Checker.
  - On desktop, after each filter change, the right image shows the first visible project, and the image stops pinning at the end of the shorter list.
  - Chips wrap on mobile and can be used with Tab and Enter.
