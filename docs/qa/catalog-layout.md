# QA — feat/catalog-layout

- Date: 2026-09-29
- Branch: `feat/catalog-layout`
- Base: `landing-page`
- Variant: Coffee House (P-001 Accepted)
- Page: `http://127.0.0.1:8765/menu.html` (catalog)
- Specs: `docs/specs/catalog.md`, `docs/specs/overview.md`, `docs/decisions.md`
- Reviewer: Approve

This run overwrites any prior catalog-layout QA notes. No binary screenshots were committed. Theme toggle is from earlier header work — not scored here. Header/footer only smoke-checked for landmarks (this step did not redesign them).

## What was checked

`section.catalog#catalog` in `main`: one `h1` «Menu», three category tabs (Coffee active; Tea/Dessert `aria-disabled`), eight `article.card` with meaningful photo alts, «Show more» UI (`aria-disabled`). Styles/scripts are project CSS + `js/theme.js` only — no Bootstrap/React/UI libs; cards use real `coffee-*.jpg` imgs, not screenshot-as-layout.

Overflow: `scrollWidth` equals `clientWidth` at each width (15px gap vs CSS viewport is the vertical scrollbar). Above 1440, `.catalog__inner` stays 1440px wide with growing side margins (at 1600: left ~73 / right ~88 inside layout width 1585).

| Width | scrollWidth | clientWidth | Grid | Notes |
| --- | --- | --- | --- | --- |
| 380 | 365 | 365 | 1 col | no overflowers |
| 480 | 465 | 465 | 1 col | |
| 600 | 585 | 585 | 2 col | |
| 768 | 753 | 753 | 2×352.5 | |
| 1024 | 1009 | 1009 | 4 col | |
| 1280 | 1265 | 1265 | 4 col | |
| 1440 | 1425 | 1425 | 4×336.25 | |
| 1600 | 1585 | 1585 | container 1440 | centered |

Hover: card and tab hover change opacity only — neighbor `getBoundingClientRect` unchanged. Show-more hover same size (146×58); Playwright scroll-into-view shifted Y, not layout.

Controls exercised as UI only (tabs / show-more stay disabled for Part 2 logic). Console: only missing `/favicon.ico` 404 (non-blocking).

## QA result

- Status: PASS
- Variant: Coffee House
- Report: overwrote `docs/qa/catalog-layout.md` this run
- Checklist:
  - Semantics: PASS — `header` / `nav` / `main` / `footer` / `section.catalog`; one `h1` «Menu»; eight card alts meaningful
  - No horizontal scroll: PASS — 380→1600, `scrollWidth === clientWidth`
  - 1440: PASS — 4-column grid, no H-scroll
  - 768: PASS — 2-column grid, no H-scroll
  - 380: PASS — 1-column grid, no H-scroll
  - Theme contrast: n/a — this step did not add a theme control
  - Hover stable: PASS — card/tab opacity hover; neighbors do not move
- Blocking defects: none
- Non-blocking:
  - `/favicon.ico` 404 on local serve (site-wide; not catalog layout)
  - Category / show-more icons still absent from `assets/icons/` (documented in catalog spec)
