# QA — feat/catalog-show-more

- Date: 2026-09-30
- Branch: `feat/catalog-show-more`
- Base: `landing-page-part-2`
- Commit under test: `7d0823c`
- Variant: Coffee House (P-001 Accepted)
- Pages: `http://127.0.0.1:5500/menu.html`
- Spec: `docs/specs/catalog.md` (Show-more / feat/catalog-show-more)

This run **overwrites** `docs/qa/catalog-show-more.md`. Prior `catalog-categories` / `catalog-data` PASS reports do **not** close this stage — they did not exercise Show more click, category reset of expansion, or resize sync of `catalog--expanded`. No binary screenshots committed. Notes and measurements only.

## What was checked

Interactive Playwright on `menu.html` (`js/catalog.js`). Exercised: coffee/dessert collapsed start (4 cards + Show more), click expand, tea (no button), category switch resets expansion, desktop 1440 (all cards, button hidden), resize 1440 ↔ 768 with expanded and collapsed state. Not scored: modal, burger panel, slider JS.

Overflow: `document.documentElement.scrollWidth` vs `clientWidth` at 1440 / 768 / 380. Hover: Playwright `.catalog__item` hover — neighbor bounding box unchanged. Theme: `.header__theme` toggle light → dark.

| Scenario | Width | Visible cards | `catalog--expanded` | Show more |
| --- | --- | --- | --- | --- |
| Coffee start | 768 | 4 | false | visible (`catalog__more--visible`, `display: flex`) |
| Coffee after click | 768 | 8 | true | hidden (`aria-hidden="true"`, `tabindex="-1"`) |
| Tea | 768 | 4 | false | hidden (4 products, no button) |
| Dessert start | 768 | 4 | false | visible |
| Dessert after click | 768 | 8 | true | hidden |
| Back to coffee after dessert expand | 768 | 4 | false | visible (reset) |
| Expanded → resize desktop | 1440 | 8 | true (kept) | hidden |
| Desktop → back mobile (still expanded) | 768 | 8 | true | hidden |
| Fresh coffee desktop | 1440 | 8 | false | hidden |
| Collapsed 768 → 1440 → 768 | 768 | 4 | false | visible again |
| Coffee start / expand | 380 | 4 → 8 | false → true | visible → hidden |

| Page | Width | scrollWidth | clientWidth | overflow |
| --- | --- | --- | --- | --- |
| menu | 1440 | 1425 | 1425 | no |
| menu | 768 | 753 | 753 | no |
| menu | 380 | 365 | 365 | no |

Light body `rgb(225, 212, 201)` / text via theme; dark `data-theme="dark"` body `rgb(42, 36, 32)`, text `rgb(225, 212, 201)`. Neighbor card position after hover: unchanged (x/y/width stable).

## QA result

- Status: PASS
- Variant: Coffee House
- Report: overwrote docs/qa/catalog-show-more.md this run
- Checklist:
  - Semantics: PASS — `header`, `nav`, `main`, `footer`; one `h1`; card photo `alt` present; Show more uses `aria-hidden` / `tabindex="-1"` when not visible; no `aria-disabled` on the live button
  - No horizontal scroll: PASS — 1440 / 768 / 380 `scrollWidth === clientWidth`
  - 1440: PASS — all 8 coffee cards visible; Show more hidden; resize from expanded mobile keeps cards visible and button hidden
  - 768: PASS — coffee/dessert start with 4 cards + working Show more; click reveals rest and hides button; tea has no button; category switch resets expansion
  - 380: PASS — same mobile contract as 768; expand works; no overflow
  - Theme contrast: PASS — theme control present; light/dark body and text readable
  - Hover stable: PASS — hovering first catalog card does not shift neighbor box
- Blocking defects:
  - none
- Non-blocking:
  - Modal / card click dialog not in this step (later)
  - Coffee House Figma is checklist reference only; ±10px not scored
