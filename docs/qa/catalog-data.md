# QA — feat/catalog-data

- Date: 2026-09-29
- Branch: `feat/catalog-data`
- Base: `landing-page-part-2`
- Commit: `385deff`
- Variant: Coffee House (P-001 Accepted)
- Pages: `http://127.0.0.1:8766/menu.html`
- Spec: `docs/specs/catalog.md` (Part 2 data/render contract)

This run writes `docs/qa/catalog-data.md` for the first time on this step. It does **not** reuse `docs/qa/catalog-layout.md`. Prior catalog-layout PASS covered static markup only and is invalid as evidence for dynamic render from `data/products.json`. No binary screenshots committed. Untracked burger PNGs ignored.

## What was checked

`menu.html` with `js/catalog.js` (`defer`) and empty `ul.catalog__list` filled from `data/products.json` (coffee only). Not scored: category switching, show-more clicks, burger panel, slider JS, modal.

Measured overflow via `documentElement.scrollWidth` vs `clientWidth`. Hover via stylesheet `:hover` rules under `@media (hover: hover)`. Theme via `.header__theme` toggle + `data-theme`.

| Page | Width | scrollWidth | clientWidth | Cards visible | Grid | Show more |
| --- | --- | --- | --- | --- | --- | --- |
| menu | 1440 | 1425 | 1425 | 8 | 4 cols | `display: none` |
| menu | 768 | 753 | 753 | 4 (items 5–8 `display: none`) | 2 cols | `display: flex`, `aria-disabled="true"` |
| menu | 380 | 365 | 365 | 4 (items 5–8 hidden) | 2 cols | `display: flex`, `aria-disabled="true"` |
| menu | 1600 | 1585 | 1585 | 8 | column `max-width: 1440px`, side gaps ~73 / 88 (scrollbar) | hidden |

Rendered coffee titles match `products.json`: Irish coffee, Kahlua coffee, Honey raf, Ice cappuccino, Espresso, Latte, Latte macchiato, Coffee with cognac. Photos `assets/images/coffee-1.jpg` … `coffee-8.jpg`. Prices `$7.00` … `$6.50`. No modal / dialog in DOM. No UI library on the page.

Light: body `rgb(225, 212, 201)`, text `rgb(64, 63, 61)` (~7.2:1). Dark (`data-theme="dark"`): body `rgb(42, 36, 32)`, text `rgb(225, 212, 201)` (~10.5:1). Active Coffee tab keeps readable fg/bg in both themes.

Hover rules for `.card`, `.catalog__tab`, `.catalog__more`, `.header__theme` change **opacity only** (no padding / border / margin / size).

## QA result

- Status: PASS
- Variant: Coffee House
- Report: overwrote docs/qa/catalog-data.md this run
- Checklist:
  - Semantics: PASS — `header`, `nav`, `main`, `section.catalog#catalog`, `footer`; one `h1` (`Menu`); eight `li.catalog__item` → `article.card` with `h2`, description, price; photo `alt` matches drink names
  - No horizontal scroll: PASS — 380 / 768 / 1440 / 1600, `scrollWidth` equals `clientWidth`; above 1440 content column stays 1440px and centered
  - 1440: PASS — four columns, eight coffee cards from JSON, Show more hidden
  - 768: PASS — two columns, cards 5–8 hidden by CSS, Show more visible and still `aria-disabled="true"`
  - 380: PASS — no overflow; four cards visible, Show more disabled; two-column grid (≤768 contract)
  - Theme contrast: PASS — light and dark body/title/card text readable; theme toggle works
  - Hover stable: PASS — opacity-only hover under `(hover: hover)`
- Blocking defects:
  - none
- Non-blocking:
  - Tea / Dessert tabs remain `aria-disabled="true"` (later step)
  - Show more stays disabled; click behavior not in this step
  - Modal not present (later step)
