# QA — feat/header-footer

- Date: 2026-09-23
- Branch: `feat/header-footer` @ `1f0f832` (matches `origin/feat/header-footer`)
- Base: `origin/landing-page` @ `5d11c92`
- Variant: Coffee House (P-001 Accepted)
- Pages: `http://127.0.0.1:8765/index.html`, `http://127.0.0.1:8765/menu.html` (existing static server, reused)
- Specs: `docs/specs/header.md`, `docs/specs/footer.md`, `docs/specs/theme.md`

Fresh run against `1f0f832`. No `docs/qa/header-footer.md` was on this branch, so there is no in-repo PASS to reuse. Figma file `yuc5s9NCc4jENkk5LdFfvX` node `0:1` was not re-fetched. `assets/icons/` is empty. The wordmark is the text `Coffee House`. The burger is three CSS bars.

## What was checked

`index.html` and `menu.html` at 1440, 768, 380, 769, 1600, and 1800. `documentElement.scrollWidth` compared with `clientWidth` (body `scrollWidth` checked the same way). Header, main, and footer `.container` boxes measured for width and side gaps. Nav and burger `display` recorded at each width.

| Page | Width | scrollWidth | clientWidth | Container width | Side gaps | Nav | Burger |
| --- | --- | --- | --- | --- | --- | --- | --- |
| index, menu | 1440 | 1440 | 1440 | 1440 | 0 / 0 | block | none |
| index, menu | 769 | 769 | 769 | 769 | 0 / 0 | block | none |
| index, menu | 768 | 768 | 768 | 768 | 0 / 0 | none | flex |
| index, menu | 380 | 380 | 380 | 380 | 0 / 0 | none | flex |
| index, menu | 1600 | 1600 | 1600 | 1440 | 80 / 80 | block | none |
| index, menu | 1800 | 1800 | 1800 | 1440 | 180 / 180 | block | none |

Above 1440 the column stays 1440px and the side gaps grow (80px at 1600, 180px at 1800). At 380 the footer wraps onto a second line and still does not overflow. Both pages match. Screenshots of the light home page at 1440, 768, and 380, and of the menu page at 1440, match those measurements.

Landmarks on both pages: one `header`, one `nav`, one `main`, one `footer`, one `address`. `nav` is `ul` / `li` / `a`. No `h1`. No `img`. Stylesheets are local `base.css`, `layout.css`, `components.css`, `themes.css`. The only script is the `js/theme.js` stub. No React, Vue, Angular, Swiper, or Bootstrap. No `url()` background images.

| Control | index.html | menu.html |
| --- | --- | --- |
| Logo | `Coffee House` → `index.html` | same |
| Nav | Home `index.html#hero`, Slider `index.html#slider`, About `index.html#about`, Extra `index.html#extra`, Menu `menu.html` | same; Menu has `aria-current="page"` |
| Theme | `button.header__theme`, text `Theme` | same |
| Burger | `aria-label="Open menu"`, `aria-expanded="false"`, `aria-disabled="true"`, not the `disabled` attribute | same |
| Phone | `+375 29 000-00-00` → `tel:+375290000000` | same |
| Address | `Minsk` → Google Maps query `Minsk`, `target="_blank"`, `rel="noopener noreferrer"` | same |
| External | GitHub `https://github.com/Bogagree`, RS School `https://rs.school/`, new tab, `noopener noreferrer` | same |
| Copy | `© 2026 Coffee House` | same |

Smoke, both pages:

- Menu link from home opens `menu.html`. The current-page link text is `Menu`.
- Logo from the menu page returns to `index.html`.
- About link lands on `index.html#about`. `#about` exists.
- Theme click leaves `data-theme` unset.
- Burger click at 380 leaves `aria-expanded="false"`, does not open a panel, and leaves `.header__nav` at `display: none`.

Hover at 1440 on `.header__logo`, `.header__link`, `.header__theme`, and `.footer__link`, and at 380 on `.header__burger`: neighbor boxes did not move (no change above 0.5px). Hover rules change only color, background-color, or opacity.

Contrast. Default and `data-theme="light"`: header, footer, logo, nav, theme button, and footer links are `rgb(0, 0, 0)` on `rgb(255, 255, 255)`, ratio 21:1. Forced `data-theme="dark"` (the button does not set it): painted pixels of the logo, theme label, and footer link are `rgb(255, 255, 255)` on background `rgb(18, 18, 18)`, ratio 18.73:1. `getComputedStyle` reports `rgb(0, 0, 0)` for `CanvasText` on `a` and `button` in that state; the screenshot pixels are white, same as `header` / `footer` / a `span` with the link class.

Console: no page errors. The browser requested `/favicon.ico` and received 404.

## QA result

- Status: PASS
- Variant: Coffee House
- Report: overwrote docs/qa/header-footer.md this run
- Checklist:
  - Semantics: PASS — `header`, `nav` (`ul`/`li`/`a`), `main`, `footer`, and `address` on both pages. No images. No `h1`: the header spec keeps the wordmark as a link, and section content is out of scope.
  - No horizontal scroll: PASS — `scrollWidth` equals `clientWidth` at 380, 768, 769, 1440, 1600, and 1800 on both pages.
  - 1440: PASS — nav visible, burger hidden, containers 1440px, side gaps 0, no overflow.
  - 768: PASS — nav hidden, burger visible, containers fill the viewport, no overflow.
  - 380: PASS — same chrome as 768; footer wraps inside the viewport; no overflow.
  - Theme contrast: PASS — light/default 21:1. Forced dark paints white on `rgb(18, 18, 18)` (18.73:1). The button does not set `data-theme`, as specified.
  - Hover stable: PASS — color, background, and opacity only; measured boxes do not shift.
- Blocking defects:
  - none
- Non-blocking:
  - No `h1` on either page. Header spec does not put one on the wordmark.
  - Burger stays focusable (`aria-disabled="true"`, not the `disabled` attribute), which matches the spec.
  - Burger uses raw lengths (`0.3rem`, `2.5rem`, `1.25rem`, `2px`) for the CSS bars. No icon file is available.
  - `/favicon.ico` 404 on load. Favicon is a later asset.
  - `getComputedStyle` on `a` and `button` reports black for `CanvasText` under `data-theme="dark"` while the painted text is white.
