# QA: feat/polish-validate-deploy

- Branch: `feat/polish-validate-deploy` @ `828d003`
- Date: 2026-09-29
- Variant: Coffee House (P-001 Accepted)
- Server: `http://127.0.0.1:57799` (static `serve`)
- Scope: favicon link on both pages; semantics / overflow / theme smoke / hover stable. No pixel-perfect. Part 2 gaps not scored.

## Method

Playwright against local static server. Viewports 1440 → 768 → 380 on `index.html` and `menu.html`. Favicon checked via `page.request.get`. Theme: one click on `.header__theme`. Hover: measured bounding boxes for a nav link, CTA/theme button, and catalog card vs neighbors.

## Notes

| Check | Result |
| --- | --- |
| Semantics | Both pages: `header`, `nav`, `main`, `footer`; one `h1`; content images have meaningful `alt`. Theme icons `light.svg` / `dark.svg` use empty `alt` (decorative). |
| Favicon (branch) | Both pages: `<link rel="icon" href="assets/icons/logo.svg" type="image/svg+xml">`. GET `/assets/icons/logo.svg` → **200**, `Content-Type: image/svg+xml`, body starts with `<svg`. |
| Overflow | `scrollWidth === clientWidth` at 1440 / 768 / 380 on index and menu (no H-scroll). |
| Theme | Smoke: `data-theme` `light` → `dark` after one click. Persistence not retested (theme code unchanged this step). |
| Hover | Nav link, `.hero__cta`, `.header__theme`, `li.catalog__item`: neighbor boxes unchanged; self size unchanged. |
| GitHub Pages | Live site HTML has **no** `rel=icon` yet (feat unmerged; Pages deploys `landing-page`). Asset URL can still 200 from earlier tree — non-blocking for this branch. |

Part 2 not failed: burger panel, slider JS, categories, show-more.

## QA result

- Status: PASS
- Variant: Coffee House
- Report: overwrote docs/qa/polish-validate-deploy.md this run
- Checklist:
  - Semantics: PASS — landmarks + one `h1` + meaningful content `alt` on both pages; decorative theme icons empty alt
  - No horizontal scroll: PASS — `scrollWidth === clientWidth` at 1440/768/380 on index and menu
  - 1440: PASS — no H-scroll; favicon link present; theme + hover checked
  - 768: PASS — no H-scroll both pages
  - 380: PASS — no H-scroll both pages
  - Theme contrast: PASS — smoke: one click flips `data-theme` light→dark (full persistence not required)
  - Hover stable: PASS — link, button (CTA + theme), card: neighbors do not shift
- Blocking defects:
  - none
- Non-blocking:
  - GitHub Pages (`https://bogagree.github.io/rsschool-landing-page/`) does not yet include `rel=icon` in HTML — expected until this feat merges into the Pages branch.
  - Burger panel / slider JS / category switch / show-more are Part 2 — not scored.
