# QA — feat/responsive

- Date: 2026-09-29
- Branch: `feat/responsive` @ `ca17e80` (matches `origin/feat/responsive`)
- Variant: Coffee House (P-001 Accepted in `docs/decisions.md` and `docs/specs/overview.md`)
- Pages: `http://127.0.0.1:8765/index.html`, `http://127.0.0.1:8765/menu.html`
- Specs: `docs/specs/part-1.md`, `docs/specs/architecture.md`, `docs/specs/overview.md`, header, footer, hero, slider, home-sections, catalog
- Method: Node static server on `127.0.0.1:8765`; Playwright MCP (`user-playwright`); `documentElement`/`body` `scrollWidth` vs `clientWidth`; element `getBoundingClientRect` overflow scan
- Figma: visual reference only — no Δ ≤ 10px, no 375/768/1920 paint tables

Fresh overwrite this run. No prior `docs/qa/responsive.md` on the branch; any earlier PASS from another step does not close this stage.

Theme persistence / burger panel / slider JS are **not** this step — smoke only; not failed for missing Part 2 behavior. `js/theme.js` is still a stub.

## What was checked

Both pages at **1440**, **768**, **380**, mid widths **1100** / **500**, and **1600** (above 1440). Horizontal overflow: `scrollWidth` vs `clientWidth` (equal → no H-scroll). Side-by-side element scan for `getBoundingClientRect().right > innerWidth`.

| Page | Width | scrollWidth | clientWidth | H-scroll | Notes |
| --- | --- | --- | --- | --- | --- |
| index | 1440 | 1425 | 1425 | no | nav `block`, burger `none`; 3 `.slider__item`; 4 `.about__item` |
| index | 1100 | 1085 | 1085 | no | desktop chrome; 3 slides; 4 about photos |
| index | 768 | 753 | 753 | no | burger `flex`, nav `none`; 1 slide (CSS `display:none` on 2–3); about items 3–4 hidden |
| index | 500 | 485 | 485 | no | burger visible, nav hidden |
| index | 380 | 365 | 365 | no | same mobile chrome; 1 slide; 2 about photos |
| index | 1600 | 1585 | 1585 | no | `.container` max-width 1440px; side margins grow (~73 / ~88; 15px skew = vertical scrollbar) |
| menu | 1440 | 1425 | 1425 | no | 8 `.catalog__item`; `.catalog__more` `display:none` |
| menu | 768 | 753 | 753 | no | burger on / nav off; 4 cards visible, 4 hidden; Show more `flex` |
| menu | 500 | 485 | 485 | no | 4 visible / 4 hidden; Show more visible |
| menu | 380 | 365 | 365 | no | same as 768 card policy |
| menu | 1600 | 1585 | 1585 | no | container capped at 1440px, centered |

(`clientWidth` is ~15px under `innerWidth` because of the vertical scrollbar; that is not horizontal overflow.)

### Step UI claims (verified)

- **≤768 burger / nav:** at 768 and 380 on both pages, `.header__burger` is `display:flex`, `.header__nav` is `display:none`. Above (1100, 1440) burger `none`, nav `block`.
- **About hides 2 photos at tablet/mobile:** at 768/380, `.about__item:nth-child(n+3)` are `display:none` (2 visible). At 1440 all 4 visible.
- **Menu hides 4 cards + Show more:** at 768/380/500, items 5–8 `display:none`, `.catalog__more` visible (`flex`). At 1440 all 8 visible, Show more `none`.
- **Slider 1 slide via CSS only:** at 768/380 only first `.slider__item` visible; siblings `display:none`. No `script[src*="slider"]`. Controls remain markup-only (no slider JS — Part 2).
- **Hover under `@media (hover: hover)`:** all `:hover` rules in loaded CSS are inside `(hover: hover)`; properties are opacity or color only (no padding/border/margin/size). Neighbor boxes do not shift.

### Semantics

Both pages: `header`, `nav`, `main`, `footer`; one `h1` each (home hero title; menu “Menu”). All `img` have `alt`. Local CSS only (`base`, `layout`, `components`, `themes`). No Bootstrap/Tailwind/etc. No full-page screenshot layout.

### Theme contrast

Toggle `.header__theme` and `css/themes.css` exist from an earlier step (system `Canvas` / `CanvasText`). Forced `data-theme="light"`: body/header/footer text black on white (~21:1). Forced `data-theme="dark"`: header/footer/body white on `rgb(18,18,18)` (~18.73:1). Persistence / working toggle is the next step (`js/theme.js` stub) — not a blocker here.

## QA result

- Status: PASS
- Variant: Coffee House
- Report: overwrote docs/qa/responsive.md this run
- Checklist:
  - Semantics: PASS — landmarks + one `h1` + meaningful `alt` on both pages
  - No horizontal scroll: PASS — `scrollWidth === clientWidth` at 380/500/768/1100/1440/1600 on index and menu; no overflowing elements
  - 1440: PASS — desktop chrome; full about gallery; 3 slides; 8 catalog cards; no H-scroll
  - 768: PASS — burger on / nav off; about 2 photos; 1 slide (CSS); 4 cards + Show more; no H-scroll
  - 380: PASS — same mobile policies as 768; no H-scroll
  - Theme contrast: PASS — light/dark readable via system Canvas tokens; toggle present; persistence not this step
  - Hover stable: PASS — `@media (hover: hover)` only; opacity/color; no layout jump
- Blocking defects:
  - none
- Non-blocking:
  - `js/theme.js` is an empty stub — theme click does not flip `data-theme` (next step).
  - Burger does not open a panel (Part 2).
  - Slider controls have no JS (Part 2); mobile shows first slide via CSS only, as claimed.
  - Above 1440, left/right container gaps differ by ~15px because of the vertical scrollbar gutter — content still capped at 1440px and centered.
