# QA — feat/home-hero

- Date: 2026-09-23
- Branch: `feat/home-hero` @ `05d21c8`
- Base: `origin/landing-page` (branch ahead by 2)
- Variant: Coffee House (P-001 Accepted)
- Pages: `http://127.0.0.1:8766/index.html`, `http://127.0.0.1:8766/menu.html` (Node static server; `python` is not on PATH)
- Specs: `docs/specs/hero.md`

First QA run for this slug. No prior `docs/qa/home-hero.md` to invalidate. Figma node `216:1370` is a visual reference only; no Δ≤10px. Photo is intentionally absent per the spec. Two unrelated uncommitted comment/spec lines (`css/components.css`, `docs/specs/architecture.md`) do not change layout.

## What was checked

`index.html` and `menu.html` at 1440, 768, 380, 769, 1600, and 1800. `documentElement.scrollWidth` compared with `clientWidth` (body `scrollWidth` checked the same way). Hero inner `.container` (home) or first `.container` (menu) measured for width and side gaps.

| Page | Width | scrollWidth | clientWidth | Container width | Side gaps | Hero / banner | Nav | Burger |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| index | 1440 | 1440 | 1440 | 1440 | 0 / 0 | 1440 × 688 / 1408 × 640 | block | none |
| index | 769 | 769 | 769 | 769 | 0 / 0 | 769 × 688 / 737 × 640 | block | none |
| index | 768 | 768 | 768 | 768 | 0 / 0 | 768 × 688 / 736 × 640 | none | flex |
| index | 380 | 380 | 380 | 380 | 0 / 0 | 380 × 463 / 348 × 415 | none | flex |
| index | 1600 | 1600 | 1600 | 1440 | 80 / 80 | 1600 × 688 / 1408 × 640 | block | none |
| index | 1800 | 1800 | 1800 | 1440 | 180 / 180 | 1800 × 688 / 1408 × 640 | block | none |
| menu | 1440 | 1440 | 1440 | 1440 | 0 / 0 | none | block | none |
| menu | 768 | 768 | 768 | 768 | 0 / 0 | none | none | flex |
| menu | 380 | 380 | 380 | 380 | 0 / 0 | none | none | flex |
| menu | 1600 | 1600 | 1600 | 1440 | 80 / 80 | none | block | none |
| menu | 1800 | 1800 | 1800 | 1440 | 180 / 180 | none | block | none |

Above 1440 the column stays 1440px and the side gaps grow (80px at 1600, 180px at 1800). Hero section stretches to the viewport; the banner stays inside the 1440 column. No horizontal overflow.

Home landmarks: one `header`, one `nav`, one `main`, one `footer`, one `h1`. Section is `section.hero#hero`. Heading text is «Enjoy premium coffee at our charming cafe»; `Enjoy` is `em.hero__accent`. Body matches the spec sentence. CTA `.hero__cta` text `Menu`, `href="menu.html"`. No `img`. Banner `background-image: none`. Banner paint is inverted tokens: page `rgb(255, 255, 255)` / `rgb(0, 0, 0)`; banner `rgb(0, 0, 0)` / `rgb(255, 255, 255)`; CTA `rgb(255, 255, 255)` / `rgb(0, 0, 0)`. Computed `--color-text` / `--color-bg` are `CanvasText` / `Canvas`.

Stylesheets: local `base.css`, `layout.css`, `components.css`, `themes.css`. Script: `js/theme.js`. No React, Vue, Angular, Swiper, or Bootstrap.

Smoke:

- CTA from home opens `http://127.0.0.1:8766/menu.html`.
- `menu.html` has no `.hero` and no `#hero`. Header, nav, footer, and `#catalog` are present. Menu nav link has `aria-current="page"`.
- Logo on the menu page returns to `index.html`; `#hero` is present again.

Hover at 1440: `.hero__cta` opacity 0.85; box 128 × 58 at (56, 555.39) unchanged. Title and body boxes unchanged. `.header__logo` and first `.header__link` boxes unchanged (delta 0). At 380: CTA 128 × 58 at (48, 421.78) unchanged on hover; title and text unchanged; burger 40 × 40 at (324, 16) unchanged.

Theme contrast: this step does not change the theme control (`data-theme` stays unset). Skipped.

Page console on `index.html`: `/favicon.ico` 404. No application JS errors.

## QA result

- Status: PASS
- Variant: Coffee House
- Report: overwrote docs/qa/home-hero.md this run
- Checklist:
  - Semantics: PASS — home has `header`, `nav`, `main`, `footer`, one `h1`, `section.hero#hero`. No images. Menu has the same chrome and no hero.
  - No horizontal scroll: PASS — `scrollWidth` equals `clientWidth` at 380, 768, 769, 1440, 1600, and 1800 on both pages.
  - 1440: PASS — nav visible, burger hidden, hero column 1440, banner 1408 × 640, side gaps 0, no overflow.
  - 768: PASS — nav hidden, burger visible, hero fills the viewport, banner 736 × 640, no overflow.
  - 380: PASS — same chrome as 768; hero 380 × 463, banner 348 × 415; no overflow.
  - Theme contrast: n/a — no theme control change in this step.
  - Hover stable: PASS — CTA hover is opacity only; CTA, title, body, logo, and nav boxes do not shift.
- Blocking defects:
  - none
- Non-blocking:
  - Background photo is absent, as specified until an export exists in `assets/images/`.
  - `menu.html` has no `h1`; catalog content is out of scope.
  - `/favicon.ico` 404 on load. Favicon is a later asset.
