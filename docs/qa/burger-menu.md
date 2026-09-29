# QA — feat/burger-menu

- Date: 2026-09-29
- Branch: `feat/burger-menu` @ `86da1de` (matches `origin/feat/burger-menu` at start of run)
- Base: `landing-page-part-2`
- Variant: Coffee House (P-001 Accepted in `docs/decisions.md`)
- Pages: `http://127.0.0.1:8765/` (`index.html`); `menu.html` via `file://` (see Method) and confirmed HTTP 200 from `127.0.0.1:8765/menu.html`
- Spec: `docs/specs/burger-menu.md`
- Method: Playwright MCP (`user-playwright`); viewports 1440 / 768 / 380 (+ 769 for resize-close); `scrollWidth` vs `clientWidth`; burger open/close; theme toggle smoke for contrast; hover neighbor boxes
- Figma: visual reference only — no Δ ≤ 10px

Fresh overwrite this run. No prior `docs/qa/burger-menu.md` on branch.

Out of scope: category switching / catalog JS. Uncommitted menu-page visual edits (`menu.html`, `css/components.css`, category `*_pic.png`) were left untouched and not scored.

## Method notes

Port `8765` has two listeners (`npx serve` on `0.0.0.0` / `[::]`, and a plain Node static server on `127.0.0.1`). Browser `page.goto('…/menu.html')` followed `serve` cleanUrls to `/menu` → 404. Index was checked on `http://127.0.0.1:8765/`. Menu markup/behavior was checked on `file:///…/menu.html` after `page.request.get('http://127.0.0.1:8765/menu.html')` returned 200 with the Coffee House Menu document.

## What was checked

### Semantics (both pages)

| Check | index | menu |
| --- | --- | --- |
| `header` / `nav` / `main` / `footer` | yes | yes |
| One `h1` | yes | yes |
| `img` without `alt` | 0 | 0 |
| `button.header__burger` + `aria-controls="burger-panel"` | yes | yes |
| `nav#burger-panel.burger` after header | yes | yes |
| `js/burger.js` | yes | yes |
| Forbidden UI libs in page | none | none |

### Overflow

| Page | Width | scrollWidth | clientWidth | H-scroll |
| --- | --- | --- | --- | --- |
| index | 1440 | 1425 | 1425 | no |
| index | 768 | 753 | 753 | no |
| index | 380 | 365 | 365 | no |
| menu | 1440 | 1440 | 1440 | no |
| menu | 768 | 768 | 768 | no |
| menu | 380 | 365 | 365 | no |

(`clientWidth` under viewport on index ≈ vertical scrollbar gutter.)

### Breakpoints / burger chrome

| Width | Desktop nav | Burger button | Panel (closed) |
| --- | --- | --- | --- |
| 1440 | visible (`display: block`) | hidden (`none`) | hidden (`none`) |
| ≥769 | visible | hidden | hidden |
| 768 | hidden | `flex` | in DOM (`flex`, `visibility: hidden` until open) |
| 380 | hidden | `flex` | same |

### Burger behavior (≤768, both pages)

| Check | Result |
| --- | --- |
| Button open → `aria-expanded="true"`, `aria-label="Close menu"`, `.burger--open`, `body.is-burger-open`, `overflow: hidden` | PASS |
| Panel `position: fixed` under header (`top: 80px`, height ≈ `100vh − header`) | PASS |
| Icon → X via transform on first two bars (3rd bar `display: none`) | PASS |
| Close on toggle click | PASS |
| Close on panel link click | PASS |
| Close on `Escape` | PASS |
| Open then resize to 769 → closes; burger hidden; desktop nav visible | PASS |
| Panel links (index): `#favorite-coffee`, `#about`, `#extra`, `#contact`, `menu.html` | PASS |
| Panel links (menu): `index.html#…` + `menu.html` | PASS |

### Theme contrast

Theme control present (prior step). Toggled light ↔ dark on both pages while panel open/closed:

| Theme | `--color-bg` / body bg | `--color-text` / body color |
| --- | --- | --- |
| light | `#e1d4c9` / `rgb(225, 212, 201)` | `#403f3d` / `rgb(64, 63, 61)` |
| dark | `#2a2420` / `rgb(42, 36, 32)` | `#e1d4c9` / `rgb(225, 212, 201)` |

Panel background tracks page bg; link color tracks text. Readable in both themes.

### Hover

- Burger hover (≤768): opacity only; logo / burger boxes unchanged.
- Desktop nav link hover @1440 (menu): neighbor boxes unchanged (deltas 0).

## QA result

- Status: PASS
- Variant: Coffee House
- Report: overwrote docs/qa/burger-menu.md this run
- Checklist:
  - Semantics: PASS — landmarks, one `h1`, meaningful `alt`, burger `button` + `nav#burger-panel` on index and menu
  - No horizontal scroll: PASS — `scrollWidth === clientWidth` at 1440/768/380 on both pages (open and closed)
  - 1440: PASS — desktop nav visible, burger/panel hidden, no H-scroll
  - 768: PASS — burger opens panel under header, X + scroll lock; closes on link / Escape / resize ≥769
  - 380: PASS — same burger behavior; no H-scroll open or closed
  - Theme contrast: PASS — light and dark text/bg on panel and page remain readable
  - Hover stable: PASS — opacity/color only; measured neighbor boxes do not shift
- Blocking defects:
  - none
- Non-blocking:
  - DOM has three `.header__burger-bar` spans; third is `display: none` (effective two-bar X per spec).
  - Dual listeners on `:8765` (`serve` cleanUrls vs plain Node) broke Playwright navigation to `/menu.html` → `/menu` 404; menu verified via `file://` + HTTP GET 200 from `127.0.0.1`.
  - Uncommitted catalog visual WIP present in working tree — ignored for this step (no category-switch scoring).
