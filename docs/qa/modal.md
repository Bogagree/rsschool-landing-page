# QA — feat/modal

- Date: 2026-09-30
- Branch: `feat/modal`
- Base: `landing-page-part-2`
- Commit under test: `0f0c324`
- Variant: Coffee House (P-001 Accepted)
- Pages: `http://127.0.0.1:8765/menu.html` (served path may normalize to `/menu`)
- Spec: `docs/specs/modal.md` (feat/modal); card click hook `docs/specs/catalog.md`

This run **overwrites** `docs/qa/modal.md`. No prior modal QA file on this branch; earlier catalog QA reports do **not** close this stage. No binary screenshots committed. Notes and measurements only.

## What was checked

Interactive Playwright on `menu.html` (`js/catalog.js` → `catalog:open-modal` → `js/modal.js`). Exercised: card click opens dialog for that product (name/price from same card data) without full reload; close via `.modal__close`, overlay (`.modal` click / corner mouse), and `Escape`; body scroll lock (`body.is-modal-open`, `overflow: hidden`) while open and cleared after close; open second card shows that product; no Size/Additives / live-price controls (feat/modal-params out of scope).

Overflow: `document.documentElement.scrollWidth` vs `clientWidth` at 1440 / 768 / 380 (modal closed). Layout open: flex direction of `.modal__body`, `align-items` of `.modal`, dialog vertical position. Theme: `.header__theme` light/dark + modal dialog text/bg. Hover: first `.card` hover — neighbor box unchanged.

| Check | Result |
| --- | --- |
| Open card 0 | Irish coffee / `$7.00` matches card; `aria-hidden="false"`; `modal--open`; no reload |
| Open card 1 | Kahlua coffee / matches card; different from card 0 |
| Close X | closes when `--open` already applied; body unlock |
| Close overlay | closes (mouse corner / `.modal` click) when fully open |
| Close Escape | closes when fully open |
| Click inside dialog | stays open |
| Params UI | absent (only Close control in dialog) |
| Scroll lock | open: `body.is-modal-open`, `overflow: hidden`; close: class removed |

| Page | Width | scrollWidth | clientWidth | overflow |
| --- | --- | --- | --- | --- |
| menu | 1440 | 1425 | 1425 | no |
| menu | 768 | 753 | 753 | no |
| menu | 380 | 365 | 365 | no |

| Width | `.modal` align-items | `.modal__body` | dialog vs viewport |
| --- | --- | --- | --- |
| 1440 | `center` | `row` | centered (mid ≈ vh/2) |
| 768 | `flex-end` | `column` | bottom-aligned (`nearBottom`) |
| 380 | `flex-end` | `column` | bottom-aligned (`nearBottom`) |

Light: body `rgb(225, 212, 201)` / text `rgb(64, 63, 61)`; dialog uses theme bg/text. Dark `data-theme="dark"`: body/dialog `rgb(42, 36, 32)`, text `rgb(225, 212, 201)`. Hover neighbor delta: 0.

### rAF close race (blocking)

`openModal` adds `modal--open` inside `requestAnimationFrame`. If `closeModal` runs in the same turn (before that rAF), close clears state, then the pending rAF re-adds `modal--open` while `aria-hidden="true"` and `hidden` are set. `.modal { display: flex }` overrides UA `[hidden] { display: none }`, and `.modal.modal--open` forces `pointer-events: auto` / visible overlay → page stays blocked. Same-tick open+close reproduced **5/5**. Normal close after `--open` is applied was clean in a 5× loop, but the race is reachable with a fast close before first paint.

### ≤768 centering vs spec AC (blocking)

Spec scope: «модалка по центру»; contract: `.modal` — flex-центр. Adaptive AC only requires column (photo on top) vs row on wide — it does **not** allow bottom alignment. At ≤768 CSS sets `align-items: flex-end` (bottom sheet). Treated as AC fail for this step.

## QA result

- Status: FAIL
- Variant: Coffee House
- Report: overwrote docs/qa/modal.md this run
- Checklist:
  - Semantics: PASS — `header`, `nav`, `main`, `footer`; one `h1`; `#product-modal` + `.modal__dialog[role="dialog"][aria-modal="true"]` + `aria-labelledby="modal-title"`; close `aria-label="Close"`; card/modal photo `alt` from product name
  - No horizontal scroll: PASS — 1440 / 768 / 380 `scrollWidth === clientWidth` (closed)
  - 1440: PASS — modal centered; body row (photo + text); open/close/data OK; no Size/Additives
  - 768: FAIL — column body OK, but `.modal` uses `align-items: flex-end` / bottom sheet vs spec flex-center
  - 380: FAIL — same bottom alignment vs spec flex-center; column body OK; no overflow
  - Theme contrast: PASS — theme control present; light/dark body and modal title/text/price readable
  - Hover stable: PASS — hovering first card does not shift neighbor box
- Blocking defects:
  - `js/modal.js`: pending `requestAnimationFrame` from `openModal` can re-apply `modal--open` after `closeModal`, leaving a visible/pointer-blocking overlay (`hidden` + `aria-hidden="true"` + `modal--open`); worsened by `.modal { display: flex }` overriding `[hidden]`
  - ≤768 / 380: `.modal { align-items: flex-end }` contradicts spec AC «по центру» / flex-центр (no narrow-viewport exception in `docs/specs/modal.md`)
- Non-blocking:
  - Coffee House Figma is checklist reference only; ±10px not scored
  - Size / Additives / live price correctly absent (feat/modal-params)
  - After close, computed `body` overflow may read `clip visible` in Chromium while `is-modal-open` is removed; scroll interaction restored
