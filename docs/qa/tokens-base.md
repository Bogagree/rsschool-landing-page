# QA — feat/tokens-base

- Date: 2026-09-23
- Branch: `feat/tokens-base` @ `df38243` (matches `origin/feat/tokens-base`)
- Base: `origin/landing-page` (PR #3 merged)
- Variant: Coffee House (P-001 Accepted)
- Pages: `http://127.0.0.1:8765/index.html`, `http://127.0.0.1:8765/menu.html` (existing static server, reused)
- Scope: CSS variables, base element styles, centered `.container`. Header, hero, slider, catalog, and the theme toggle are later steps.

First QA run for this slug. No prior PASS to invalidate.

Figma file access was already recorded as missing in the spec. Assets were not re-fetched. Missing binaries are not a failure for this step.

## What was checked

`index.html` and `menu.html` at 1440, 768, 380, 1600, and 1800. `documentElement.scrollWidth` compared with `clientWidth` (body `scrollWidth` checked the same way). `.container` box measured for width and side gaps.

| Page | Width | scrollWidth | clientWidth | Container width | Side gaps |
| --- | --- | --- | --- | --- | --- |
| index, menu | 1440 | 1440 | 1440 | 1440 | 0 / 0 |
| index, menu | 768 | 768 | 768 | 768 | 0 / 0 |
| index, menu | 380 | 380 | 380 | 380 | 0 / 0 |
| index, menu | 1600 | 1600 | 1600 | 1440 | 80 / 80 |
| index, menu | 1800 | 1800 | 1800 | 1440 | 180 / 180 |

`box-sizing` on `.container` is `border-box`. Inline padding is 16px and stays inside the width, so it does not create overflow. Above 1440 the column stays 1440px and the side gaps grow with the viewport (80px at 1600, 180px at 1800). Both pages match.

Landmarks on both pages: one `header`, one `main`, one `footer`. No `nav`, no `h1`, no images. This diff only added `container` on `main`. `h1` and `nav` belong to `feat/header-footer`. No screenshot-as-layout. Stylesheets are local `base.css`, `layout.css`, `components.css`, `themes.css`. The only script is the empty `js/theme.js` stub. No forbidden UI library.

No `:hover` rules in the loaded stylesheets. No theme control (`button` count 0, `data-theme` unset). Token sets exist (`Canvas` / `CanvasText` / `LinkText`); the default computed body is black text on white. Contrast of a toggle is out of scope until `feat/theme-localstorage`.

Console: no page errors. The browser requested `/favicon.ico` and received 404. Favicon is not part of this step.

## QA result

- Status: PASS
- Variant: Coffee House
- Report: overwrote docs/qa/tokens-base.md this run
- Checklist:
  - Semantics: PASS — `header`, `main`, `footer` on both pages; this diff did not remove them or add screenshot layout / forbidden libraries. No `h1` or `nav` yet (`feat/header-footer`).
  - No horizontal scroll: PASS — `scrollWidth` equals `clientWidth` at 380, 768, 1440, 1600, and 1800 on both pages.
  - 1440: PASS — container is 1440px wide, side gaps 0, no overflow.
  - 768: PASS — container fills the viewport, no overflow.
  - 380: PASS — container fills the viewport, padding stays inside the border box, no overflow.
  - Theme contrast: n/a — no theme control in this step (`js/theme.js` is a stub). Token sets exist; toggle is `feat/theme-localstorage`.
  - Hover stable: n/a — this step added no `:hover` rules.
- Blocking defects:
  - none
- Non-blocking:
  - `/favicon.ico` 404 on load. Favicon is a later asset, not this step.
  - Semantic colors are system `Canvas` / `CanvasText` / `LinkText`, as specified, until Coffee House variables replace them.
