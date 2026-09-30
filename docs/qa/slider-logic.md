# QA — feat/slider-logic

- Date: 2026-09-30
- Branch: `feat/slider-logic`
- Base: `origin/landing-page-part-2`
- Variant: Coffee House (P-001 Accepted in `docs/decisions.md`)
- Pages: `http://127.0.0.1:8765/` (`index.html`), `http://127.0.0.1:8765/menu` (`menu.html` via serve cleanUrls)
- Spec: `docs/specs/slider.md` Part 2
- Method: Playwright MCP (`user-playwright`); static server `npx serve` on `127.0.0.1:8765`; viewports 1440 / 768 / 380 / 1600; `documentElement.scrollWidth` vs `clientWidth`; prev/next exercise; theme toggle smoke; hover box stability
- Figma: visual reference only — no Δ ≤ 10px

Fresh overwrite this run. No prior `docs/qa/slider-logic.md` on branch. No PNG screenshots committed.

Out of scope: catalog categories, show-more, modal.

## What was checked

### Semantics (index)

| Check | Result |
| --- | --- |
| `header` / `nav` / `main` / `footer` | yes (1 / 2 / 1 / 1) |
| One `h1` | yes — “Enjoy premium coffee…” |
| Slider imgs `alt` | yes — S'mores Frappuccino…; Caramel Macchiato…; Ice coffee… |
| Controls | `button[type=button].slider__control--prev/next`, `aria-label` Previous/Next slide |
| `aria-disabled` / `disabled` on controls | none |
| Forbidden UI libs | none observed |

### Overflow (page)

| Page | Width | scrollWidth | clientWidth | H-scroll |
| --- | --- | --- | --- | --- |
| index | 1440 | 1425 | 1425 | no |
| index | 768 | 753 | 753 | no |
| index | 380 | 365 | 365 | no |
| index | 1600 | 1585 | 1585 | no |
| menu | 380 | 365 | 365 | no |

(`clientWidth` under viewport ≈ vertical scrollbar gutter.)

### Slider behavior (1440 / 768 / 380)

At each width: 3 × `li.slider__item`, `display: list-item` (not `none`), `.slider__stage` `overflow: hidden`. Only one slide mostly visible in the stage; neighbors clipped (not painted outside stage).

| Width | start → next → next → next (cycle) | prev from first → last | transition | caption slide 1 |
| --- | --- | --- | --- | --- |
| 1440 | 0 → 1 → 2 → 0 | 0 → 2 | `transform` 0.45s | each slide has name, description, price |
| 768 | 0 → 1 → 2 → 0 | 0 → 2 | same | same |
| 380 | 0 → 1 → 2 → 0 | 0 → 2 | same | same |

Recheck after captions were added to slides 2 and 3: next from S'mores Frappuccino `$5.50` shows Caramel Macchiato `$5.00`, then Ice coffee `$4.50`. At 380 the visible slide stayed Ice coffee and `scrollWidth` stayed `365/365`.

Transforms (examples): 1440 `translateX(0)` → `matrix(…, -1233, 0)`; 768 → `-561`; 380 → `-221`.

### Resize

1440 on slide 1 (index 1) → resize to 768: still slide 1 visible; transform recalculated `-1233` → `-561`; no page H-scroll.

### Hover

At 1440, hover next: prev/next/photo `x`/`w`/`h` unchanged; opacity-only on control (≈0.74 when `:hover` applies). No layout jump of the other control or photo.

### Theme contrast (slider, 1440)

Toggle `.header__theme` dark ↔ light. Slider title/name text readable both ways (approx contrast vs section/body bg: dark ~10.5, light ~7.2).

| Theme | section/body bg | text color |
| --- | --- | --- |
| dark | `rgb(42, 36, 32)` | `rgb(225, 212, 201)` |
| light | `rgb(225, 212, 201)` | `rgb(64, 63, 61)` |

### Rapid double-click next

Second click during animation ignored; after transition ends further next clicks advance. Does not lock forever. Non-blocking.

### menu.html smoke

Loads (title “Coffee House — Menu”, has `main`). No H-scroll at 380. Slider JS not required.

## QA result

- Status: PASS
- Variant: Coffee House
- Report: overwrote docs/qa/slider-logic.md this run
- Checklist:
  - Semantics: PASS — landmarks, one h1, alts, labeled buttons, no aria-disabled
  - No horizontal scroll: PASS — 1440/768/380/1600 index; menu 380
  - 1440: PASS — cyclic prev/next, one visible slide, transform transition, name/description/price on each slide
  - 768: PASS — same; resize from 1440 keeps slide
  - 380: PASS — same
  - Theme contrast: PASS — light/dark slider text readable
  - Hover stable: PASS — opacity-only; neighbors do not shift
- Blocking defects:
  - none
- Non-blocking:
  - Rapid double-click next ignores the second click while animating; recovers after transitionend (expected lock during animation, not a stuck slider)
