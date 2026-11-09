# Design notes

Comps for the Projects tech filter. Colors and fonts come from `tailwind.config.js` (see `tokens.css`); nothing new is added to the theme.

## Tech chip

- Looks like the existing Tech chips on project cards (`rounded-md`, small text), so it reads as "the same Techs".
- Not selected: outline only (`light/30` border, `light` text). Hover: `primary` border and text.
- Selected: filled `primary` with `secondary` text, semibold. Only one chip is selected at a time; "All" counts as a chip.
- Chips wrap onto more rows on narrow screens. No horizontal scroll.
- Each chip is a `<button aria-pressed>`; the row has an `aria-label`.

## Screens

- `projects-filter.html`: the Projects section with every filter state.
