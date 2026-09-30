# QA — feat/modal-params

- Date: 2026-09-30
- Branch: `feat/modal-params`
- Base: `origin/landing-page-part-2` (branch ahead with feature commits)
- Commit under test: `c148f23` (`docs: describe modal-params and advance part-2 plan`) — UI from prior commits on this branch
- Variant: Coffee House (P-001 Accepted)
- Pages: `http://127.0.0.1:8767/menu.html` (existing Node static server)
- Spec: `docs/specs/modal.md` (feat/modal-params)

This run **overwrites** `docs/qa/modal-params.md`. No binary screenshots committed. Notes and measurements only.

## What was checked

Playwright on `menu.html` for Size / Additives / live price introduced by this step. Modal open/close already existed; scored the new controls and their layout at 1440 / 768 / 380 in light and dark.

### Behavior smoke

| Step | Result |
| --- | --- |
| Open Irish coffee | Size `S` selected (`aria-pressed="true"`, `modal__option--active`); additives off; price `$7.00` |
| Select M | price `$7.50`; modal stays open |
| Toggle Sugar | price `$8.00`; Sugar pressed; modal stays open |
| Open different card (Honey raf / Espresso) | Size `S` selected; additives off; base price of that card (`$5.50` / `$4.50`), not leftover `$8.00` |
| Close: button, overlay (click outside dialog), Escape | all close |
| Click inside dialog / click size option | does not close |

### Checklist notes

**Semantics:** Size and Additives options are `button.modal__option` with `aria-pressed`. Dialog keeps `role="dialog"`, `aria-modal="true"`, `aria-labelledby="modal-title"`. Close has `aria-label="Close"`. One `h1` on the page. Labels “Size” / “Additives” present.

**No horizontal scroll:** `document.documentElement.scrollWidth` ≤ `clientWidth` at 380–1440 with modal open and closed (sample widths 380, 480, 640, 768, 1024, 1280, 1440). Client width is viewport minus scrollbar (~15px).

**1440 / 768 / 380 (modal open):** Size block, Additives block, close control, and price all in viewport and inside dialog scrollport. At 1440: row photo + info. At 768/380: column layout. Dialog `overflow-y: auto` when needed.

**Theme contrast:** Dialog title/price/labels vs dialog background — light ≈ 7.24:1, dark ≈ 10.54:1. Readable in both themes with existing theme toggle.

**Hover stable:** `.modal__option:hover` and `.modal__close:hover` change only `opacity` (no border/padding/layout shift).

**Libraries / screenshot layout:** Only project scripts (`theme.js`, `burger.js`, `catalog.js`, `modal.js`). No Bootstrap/Materialize/etc. No screenshot-as-layout backgrounds.

| Page | Width | scrollWidth | clientWidth | modal | overflow |
| --- | --- | --- | --- | --- | --- |
| menu | 1440 | 1425 | 1425 | open / closed | no |
| menu | 768 | 753 | 753 | open / closed | no |
| menu | 380 | 365 | 365 | open / closed | no |

## QA result

- Status: PASS
- Variant: Coffee House
- Report: overwrote docs/qa/modal-params.md this run
- Checklist:
  - Semantics: PASS — option buttons + `aria-pressed`; one `h1`; dialog labelled
  - No horizontal scroll: PASS — 380–1440 open and closed
  - 1440: PASS — Size, Additives, close, price usable; row layout
  - 768: PASS — Size, Additives, close, price usable; column layout
  - 380: PASS — Size, Additives, close, price in viewport (~800 height)
  - Theme contrast: PASS — light ~7.2:1, dark ~10.5:1 on dialog text
  - Hover stable: PASS — opacity-only hover on options/close
- Blocking defects:
  - none
- Non-blocking:
  - Size option accessible names are volume strings (`200 ml` / `300 ml` / `400 ml`) because badge `S`/`M`/`L` is `aria-hidden`; visual badges remain correct
