# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

- `npm run dev` — start Vite dev server
- `npm run build` — type-check (`tsc -b`) then `vite build`
- `npm run lint` — run ESLint over the repo
- `npm run preview` — serve the production build locally

There is no test runner configured.

## Architecture

Single-page personal portfolio (React 18 + TypeScript + Vite + Tailwind). The whole site is one scrollable page assembled in `src/App.tsx`: `Navbar` plus four full-viewport `<section>`s (`#home`, `#about`, `#projects`, `#contact`) rendered from `src/pages/*`. The `#home` section is pinned via a GSAP `ScrollTrigger` in `App.tsx` to create the parallax hand-off into the next section.

Three conventions to keep when adding code:

1. **Content vs. components.** Static copy (paragraphs, project lists, nav items, form field configs) lives in `src/contents/*.ts` and is imported by the matching page/component. Don't hardcode user-facing strings inside components — add or extend the matching content module.
2. **Types are centralized.** Per-feature prop and data shapes live in `src/types/{about,contact,hero,navbar,projects,common}.ts`. Import from there rather than defining inline `interface Props` in components.
3. **Path alias `@/`** maps to `src/` (configured in both `vite.config.ts` and `tsconfig`). Use it instead of long relative imports.

### Animation & 3D

GSAP plugins (`ScrollTrigger`, `ScrollToPlugin`, `TextPlugin`) are registered once globally in `App.tsx` — do not re-register in components. Smooth in-page navigation goes through `src/hooks/useScrollToSection.ts`, which wraps `gsap.to(window, { scrollTo })`; navbar/CTA buttons should use this hook rather than calling `scrollIntoView` directly.

The contact section renders a Three.js logo via `@react-three/fiber` + `@react-three/drei` inside `src/components/contact/CanvasWrapper.tsx` and `Logo3D.tsx`.

### Contact form

`src/pages/Contact.tsx` uses `react-hook-form` and POSTs to the EmailJS REST endpoint with hardcoded `SERVICE_ID`, `TEMPLATE_ID`, and `PUBLIC_KEY` constants at the top of the file. The public key is intentionally client-side (EmailJS public key), but treat the IDs as the contact-form's "config" and update them in that file when the EmailJS template changes. `react-toastify`'s `<ToastContainer>` is mounted once in `App.tsx`; feature code just calls `toast(...)`.

### UI primitives

`src/components/ui/*` are shadcn/ui components (style `new-york`, base color `neutral`, no CSS variables — see `components.json`). Add new primitives via `npx shadcn@latest add <name>` so they land in this directory with the right aliases. Icons: Lucide is the configured library, but FontAwesome is also installed and used in places — match the surrounding file rather than forcing a swap.
