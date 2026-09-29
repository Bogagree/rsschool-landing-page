# QA — feat/catalog-layout

- Date: 2026-09-29
- Branch: `feat/catalog-layout`
- Base: `landing-page`
- Commit: `094d6ba`
- Variant: Coffee House (P-001 Accepted)
- Pages: `http://127.0.0.1:8766/menu.html`, `http://127.0.0.1:8766/index.html`
- Spec: `docs/specs/catalog.md`

This run replaces the catalog-layout QA note already on the branch. Figures below were measured on port 8766 after `094d6ba`. No binary screenshots were committed.

## What was checked

`menu.html`: one `h1` (`Menu`), three category buttons (Coffee pressed, Tea and Dessert `aria-disabled`), eight coffee cards (image, title, description, price), `Show more` with `aria-disabled="true"`. Photos `coffee-1.jpg` … `coffee-8.jpg` loaded at 340×340. Clicking Tea and Show more left the URL on `menu.html` and kept the eight coffee cards. Home `Menu` link `href` is `menu.html`. `index.html` still has one `h1` and no horizontal scroll.

Overflow: `documentElement.scrollWidth` equals `clientWidth`. At 1440 and 768 the layout width is 15px under the requested width because of the scrollbar.

| Page | Width | scrollWidth | clientWidth | Catalog grid | Nav | Burger |
| --- | --- | --- | --- | --- | --- | --- |
| menu | 1440 | 1425 | 1425 | 4 columns | block | none |
| menu | 768 | 753 | 753 | 2 columns | none | flex |
| menu | 380 | 380 | 380 | 1 column, card 348px | none | flex |
| menu | 1600 | 1585 | 1585 | column 1440px, side gaps 72 / 73 | — | — |
| menu | 1800 | 1785 | 1785 | column 1440px, side gaps 172 / 173 | — | — |
| index | 1440 | 1425 | 1425 | — | block | — |
| index | 768 | 753 | 753 | — | none | flex |
| index | 380 | 380 | 380 | — | — | — |

Hover (`CSS.forcePseudoState`): card stays 336×450 and opacity becomes 0.85. Category tab stays 104×42, Show more stays 146×58, both opacity 0.7.

Light: body white, title black. With `data-theme="dark"`: body `rgb(18, 18, 18)`, title white, active Coffee pill white on that dark text color. The theme button still does not switch themes (`feat/theme-localstorage`).

## QA result

- Status: PASS
- Variant: Coffee House
- Report: overwrote docs/qa/catalog-layout.md this run
- Checklist:
  - Semantics: PASS — `header`, `nav`, `main`, `section#catalog`, `footer`; one `h1`; card titles are `h2`; photo alts match the drink names
  - No horizontal scroll: PASS — 380 through 1800, `scrollWidth` equals `clientWidth`; above 1440 the column stays 1440px and stays centered
  - 1440: PASS — four columns, eight cards, category controls and Show more visible
  - 768: PASS — two columns, nav hidden, burger shown
  - 380: PASS — one column, card stays inside the viewport
  - Theme contrast: PASS — light is black on white; `data-theme="dark"` is white on `rgb(18, 18, 18)`. The toggle itself is a later step
  - Hover stable: PASS — card, tab, and Show more change opacity only
- Blocking defects:
  - none
- Non-blocking:
  - Tea and Dessert cards are not in the markup; only the controls are. Switching them is Part 2.
  - Category and Show more clicks do nothing, as specified for Part 1.
