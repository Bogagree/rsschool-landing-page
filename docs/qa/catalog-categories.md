# QA — feat/catalog-categories

- Date: 2026-09-30
- Branch: `feat/catalog-categories`
- Base: `landing-page-part-2`
- Commit: `79d7507`
- Variant: Coffee House (P-001 Accepted)
- Pages: `http://127.0.0.1:8767/menu.html`
- Spec: `docs/specs/catalog.md` (переключение категорий)

This run writes `docs/qa/catalog-categories.md` for this step. It does **not** reuse `docs/qa/catalog-data.md` or `docs/qa/catalog-layout.md`. Prior catalog-data PASS covered coffee-only render and is invalid as evidence for tea/dessert tab switching. No binary screenshots committed.

## What was checked

Category tabs on `menu.html` (`js/catalog.js`): click Coffee / Tea / Dessert; confirm sole active tab (`catalog__tab--active`, `aria-pressed`), list re-render from `data/products.json` without full reload. Overflow via `documentElement.scrollWidth` vs `clientWidth` at 1440 / 768 / 380 (and 1600). Theme via `.header__theme`. Hover via positions + stylesheet rules under `@media (hover: hover)`.

Not scored: show-more click/reset, modal, burger panel, slider JS, pixel Δ vs Figma.

### Category switching (clicked, not screenshot-only)

| Action | Active tab | `aria-pressed` | Cards | Photos | URL / reload |
| --- | --- | --- | --- | --- | --- |
| Load | coffee | coffee `true`, others `false`; no `aria-disabled` | 8 coffee titles | `coffee-1.jpg` … `coffee-8.jpg` | `menu.html` |
| Click Tea | tea only | tea `true` | 4: Moroccan, Ginger, Cranberry, Sea buckthorn | `tea-1.png` … `tea-4.png` | same URL; `window.__qaMark` preserved |
| Click Dessert | dessert only | dessert `true` | 8 desserts | `dessert-1.png` … `dessert-8.png` | no reload |
| Click Coffee | coffee only | coffee `true` | 8 coffee again | coffee jpgs | no reload |

Show-more stays `aria-disabled="true"` (desktop `display: none`; ≤768 `display: flex`).

### Overflow / breakpoints

| Width | Category | scrollWidth | clientWidth | Visible items | Notes |
| --- | --- | --- | --- | --- | --- |
| 1440 | coffee | 1425 | 1425 | 8 | 4-col grid; Show more hidden |
| 1440 | tea / dessert | 1425 | 1425 | 4 / 8 | no overflow |
| 768 | coffee | 753 | 753 | 4 | 2-col; items 5–8 `display: none`; Show more visible |
| 768 | tea / dessert | 753 | 753 | 4 / 4 | no overflow |
| 380 | coffee | 365 | 365 | 4 | 2-col; Show more visible |
| 380 | tea / dessert | 365 | 365 | 4 / 4 | no overflow |
| 1600 | — | 1585 | 1585 | — | container 1440px centered (gaps ~72.5 / 87.5) |

### Theme / hover / semantics

Light (`data-theme="light"`): body `rgb(225, 212, 201)` / text `rgb(64, 63, 61)`; active tab fill `rgb(80, 74, 66)`, text `rgb(225, 212, 201)`.  
Dark (`data-theme="dark"`): body `rgb(42, 36, 32)` / text `rgb(225, 212, 201)`; active tab readable. Toggle works on menu page.

Hover: `.card:hover` → opacity only; inactive `.catalog__tab:hover` → `border-color` only. Tab bounding boxes unchanged on hover (no neighbor shift).

Landmarks: `header`, `nav`, `main`, `section.catalog#catalog`, `footer`; one `h1`; tabs are `button`; cards `li.catalog__item` → `article.card` with `img`/`h2`/`p.card__text`/`p.card__price`. No Bootstrap / forbidden UI libs (`theme.js`, `burger.js`, `catalog.js` only).

## QA result

- Status: PASS
- Variant: Coffee House
- Report: overwrote docs/qa/catalog-categories.md this run
- Checklist:
  - Semantics: PASS — landmarks, one `h1`, button tabs, article cards with meaningful `alt`
  - No horizontal scroll: PASS — 380 / 768 / 1440 / 1600, `scrollWidth` equals `clientWidth` for coffee/tea/dessert
  - 1440: PASS — 4 columns; category switch re-renders; Show more hidden
  - 768: PASS — 2 columns; coffee/dessert show 4 cards; no overflow on tab switch
  - 380: PASS — no overflow; 2-col; Show more still disabled
  - Theme contrast: PASS — light and dark body/title/card/active-tab readable; toggle present
  - Hover stable: PASS — opacity / border-color only; tab positions stable
- Blocking defects:
  - none
- Non-blocking:
  - Tea category has 4 products in course JSON (coffee/dessert meet ≥8)
  - Show-more click/reset and modal not in this step
