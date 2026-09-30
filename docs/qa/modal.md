# QA — feat/modal

- Date: 2026-09-30
- Branch: `feat/modal`
- Base: `landing-page-part-2`
- Commit under test: `ac40f7a` (`fix: close modal reliably and keep it centered`)
- Variant: Coffee House (P-001 Accepted)
- Pages: `http://127.0.0.1:8765/menu.html` (served path may normalize to `/menu`)
- Spec: `docs/specs/modal.md` (feat/modal); card click hook `docs/specs/catalog.md`

This run **overwrites** `docs/qa/modal.md`. Prior FAIL on `0f0c324` does **not** close this stage; re-tested by interaction after the fix. No binary screenshots committed. Notes and measurements only.

## What was checked

Interactive Playwright on `menu.html` (`js/catalog.js` → `catalog:open-modal` → `js/modal.js`, SHA256 match local vs `:8765`). Exercised: card click opens dialog for that product (name/price/alt from same card data) without full reload; second card shows the other product; close via `.modal__close`, overlay (`.modal` click), and `Escape`; click inside `.modal__dialog` keeps open; body scroll lock (`body.is-modal-open`, `overflow: hidden`) while open and class cleared after close; no Size/Additives / live-price controls.

**Prior FAIL #1 — same-tick open+close race:** open card then immediately close (X / overlay / Escape) in the same turn, wait ≥5 animation frames, assert closed (`hidden`, `aria-hidden="true"`, no `modal--open`, no `is-modal-open`, `display: none`). Repeated **5/5** at 1440, and again **5/5** at 768 and 380. Page remained clickable (could reopen another card).

**Prior FAIL #2 — centering ≤768:** with modal open, computed `.modal` `align-items` / `justify-content` and dialog vertical mid vs viewport. Spec flex-center required; bottom sheet (`flex-end` / nearBottom) would FAIL.

Overflow: `document.documentElement.scrollWidth` vs `clientWidth` at 1440 / 768 / 380 (modal closed). Theme: light/dark body + modal title/price. Hover: first `.card` hover — neighbor box unchanged.

| Check | Result |
| --- | --- |
| Open card 0 | Irish coffee / `$7.00` matches card; `aria-hidden="false"`; `modal--open`; no reload |
| Open card 1 | Kahlua coffee / matches card; different from card 0 |
| Close X | closes; body unlock |
| Close overlay | closes |
| Close Escape | closes |
| Click inside dialog | stays open |
| Same-tick open+close ×5 | all closed (X/overlay/Escape mix); page clickable after |
| Params UI | absent (only Close control in dialog) |
| Scroll lock | open: `body.is-modal-open`, `overflow: hidden`; close: class removed |

| Page | Width | scrollWidth | clientWidth | overflow |
| --- | --- | --- | --- | --- |
| menu | 1440 | 1425 | 1425 | no |
| menu | 768 | 753 | 753 | no |
| menu | 380 | 365 | 365 | no |

| Width | `.modal` align-items | justify-content | `.modal__body` | dialog mid / vh | nearBottom |
| --- | --- | --- | --- | --- | --- |
| 1440 | `center` | `center` | `row` | 450 / 900 | no |
| 768 | `center` | `center` | `column` | 450 / 900 | no |
| 380 | `center` | `center` | `column` | 400 / 800 | no |

Light (`data-theme="light"`): body/dialog `rgb(225, 212, 201)` / text `rgb(64, 63, 61)`. Dark: body/dialog `rgb(42, 36, 32)`, text `rgb(225, 212, 201)`. Hover neighbor delta: 0.

## QA result

- Status: PASS
- Variant: Coffee House
- Report: overwrote docs/qa/modal.md this run
- Checklist:
  - Semantics: PASS — `header`, `nav`, `main`, `footer`; one `h1`; `#product-modal` + `.modal__dialog[role="dialog"][aria-modal="true"]` + `aria-labelledby="modal-title"`; close `aria-label="Close"`; card/modal photo `alt` from product name
  - No horizontal scroll: PASS — 1440 / 768 / 380 `scrollWidth === clientWidth` (closed)
  - 1440: PASS — modal flex-centered; body row; open/close/data OK; same-tick ×5 clean; no Size/Additives
  - 768: PASS — `align-items: center` (not `flex-end`); dialog mid ≈ vh/2; column body; same-tick ×5 clean; no overflow
  - 380: PASS — `align-items: center`; dialog mid ≈ vh/2; column body; same-tick ×5 clean; no overflow
  - Theme contrast: PASS — theme control present; light/dark body and modal title/text/price readable
  - Hover stable: PASS — hovering first card does not shift neighbor box
- Blocking defects:
  - none
- Non-blocking:
  - Coffee House Figma is checklist reference only; ±10px not scored
  - Size / Additives / live price correctly absent (feat/modal-params)
  - After close, computed `body` overflow may read `clip visible` in Chromium while `is-modal-open` is removed; scroll interaction restored
