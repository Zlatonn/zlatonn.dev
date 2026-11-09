# Spec — Filter Projects by Tech

**Date:** 2026-11-09
**Comps:** `docs/requirements/designs/projects-filter.html` (reviewed and approved by the user, 2026-11-09)
**Glossary:** `docs/CONTEXT.md` (Project, Tech, Tech showcase)

## Goal

On the Projects section, a visitor picks one Tech and sees only the Projects that use it. One click on the same Tech again shows all Projects.

## Behaviour

1. A row of Tech chips sits right under the "PROJECTS" title. It is not sticky. It is the same control on every screen size; chips wrap to more rows on narrow screens.
2. The first chip is "All". The other chips are every Tech that at least one Project uses, taken from all of its tech groups, each listed once, spelled exactly as the Project spells it.
3. Chip order: by the number of Projects that use the Tech, most first. Ties are sorted A→Z with `localeCompare(…, "en")`. With today's data: React, Tailwind, CSS, DaisyUI, Express, GSAP, HTML, JavaScript, Node.js, SQLite, TypeScript, Zustand.
4. A Tech used twice inside one Project (for example in both its frontend and backend group) counts as one Project.
5. Exactly one chip is selected at a time. On load, "All" is selected.
6. Clicking a Tech that is not selected selects it. The list shows only Projects that list that Tech in any of their groups, in their original order.
7. Clicking the selected Tech selects "All" again. Clicking "All" selects "All".
8. Matching is exact and case-sensitive. This is safe because chips are built from the same data.
9. After any click, the pinned image (wide screens) shows the first Project of the new list. The page does not scroll.
10. No empty state: every chip matches at least one Project by construction.

## Design

"All" is stored as `null`, so a real Tech named "All" could never clash with it.

### Units

| Unit | File | Job |
|---|---|---|
| Pure functions | `src/lib/techFilter.ts` | `getTechOptions(projects)` → ordered Tech list (rules 2–4). `filterProjectsByTech(projects, tech)` → `null` returns all, else matches in original order (rule 6). `toggleTech(current, clicked)` → `null` if `clicked === current`, else `clicked` (rule 7). |
| Filter bar | `src/components/projects/TechFilter.tsx` | Display only. Props `techs`, `selectedTech`, `onSelect`. Renders "All" + one `<button aria-pressed>` per Tech inside a `role="group"` with an `aria-label`. Clicking "All" calls `onSelect(null)`; clicking a Tech calls `onSelect(tech)`. |
| Types | `src/types/projects.ts` | Add `Project` (the shape of one entry in `projects`) and `TechFilterProps`. |
| Content | `src/contents/ProjectContent.ts` | Type `projects` as `Project[]`. Add `techFilterContent` with `allLabel: "All"` and `ariaLabel: "Filter projects by tech"`. |
| Page | `src/pages/Projects.tsx` | Holds `selectedTech` state; computes `techOptions` once at module level; renders the filter bar under the title and `filteredProjects` as `ProjectCard`s with `key={link}`. |

Chip styles follow `docs/requirements/designs/components.css`: outline when not selected, `primary` border and text on hover, filled `primary` with `secondary` text when selected.

### Data flow on click

1. `next = toggleTech(selectedTech, clickedValue)` — `TechFilter` passes the clicked Tech, or `null` for "All", and the page decides.
2. `setSelectedTech(next)`.
3. `setActiveProject` to the first Project of `filterProjectsByTech(projects, next)`, in the same click handler. Not in an effect: an effect would render one frame with the old image.
4. React re-renders the list. Cards that leave unmount, and `useGSAP` reverts their ScrollTriggers.
5. `useEffect(() => ScrollTrigger.refresh(), [selectedTech])` recalculates the pin length. The pin's `end` is already a function (`getScrollEndPoint`), so refresh is enough; the pin is not recreated.

Where `toggleTech` runs: `TechFilter` calls `onSelect` with the clicked value, and the page applies `toggleTech`. The toggle rule then lives in one tested function, not in the component.

### GSAP notes

- Keying cards by `link` fixes a real bug: with index keys, React would reuse a card with new props, but its `onEnter` callback would still hold the old `imgURL`/`link` and set the wrong pinned image.
- Cards that mount again (for example back to "All") start at `opacity: 0` from `gsap.from`. Cards below the viewport stay hidden until scrolled to, as today. Cards already past their start point are expected to play at once; this is **unverified** and is part of the Done check.

## Decisions (from the grill and brainstorm)

| Decision | Chosen | Rejected and why |
|---|---|---|
| Where chips come from | Techs that Projects use | Tech showcase list: about 5 of 40 names match Projects, so most chips would show nothing. Renaming Project Techs to showcase names: data edits and missing showcase entries (DaisyUI, SQLite, Zustand) for no gain now. |
| Select mode | One Tech, default All, click again → All | Multi-select OR: with 4 Projects, 2–3 picks return almost everything. Multi-select AND: empty results are easy, so an empty state or disabled chips would be needed. |
| Placement | Under the title, not sticky, all screens | Sticky bar: fights the GSAP image pin and the Navbar. Dropdown on mobile: two UIs; the comp shows wrapped chips are acceptable. |
| Chip order | Project count, then A→Z | First seen in data: looks random and changes when Projects are reordered. A→Z only: React lands mid-row. |
| How cards leave | Unmount, `key={link}` | Hide with `hidden`: hidden cards keep live ScrollTriggers that can set the pinned image to a filtered-out Project. Remount the whole list on each click: cards that stay replay their animation. Fallback if the Done check fails on stuck cards. |

## Out of scope

- Clicking a box in the Tech showcase to filter (names do not match, by decision).
- Keeping the selected Tech in the URL (single page, no router).
- Empty `projects` array (already breaks `projects[0]` today).
- Marking the matching chip on each card (shown in the comp only to explain matches).

## Testing

Unit tests in `src/lib/techFilter.test.ts` with small fixtures, not the real content:

- `getTechOptions`: orders by count then A→Z; a Tech repeated in two groups of one Project counts once.
- `filterProjectsByTech`: `null` returns all; finds a Tech in a second group; keeps original order.
- `toggleTech`: new Tech → that Tech; same Tech → `null`; `null` clicked → `null`.

One test on the real `projects` data: every option from `getTechOptions(projects)` filters to at least one Project. This guards rule 10 when content changes.

## Done check

`npm test`, `npm run lint` and `npm run build` pass, and in the browser (`npm run dev`) at 1280px and at 375px:

1. Load: "All" selected, 4 cards.
2. Click React: 3 cards; at 1280px the pinned image shows Zlatonn's Space.
3. Click Express: 1 card (Warranty Expiry Checker); the pinned image shows it and sits beside the card, not below it.
4. Click Express again: "All" selected, 4 cards, none stuck invisible after scrolling through the list.
5. Scroll to the Tech showcase: the pinned image does not overlap it.
