# QA — feat/polish-deploy-part-2 (self-check on live deploy)

- Date: 2026-09-30
- Branch: `feat/polish-deploy-part-2`
- Base: `origin/landing-page-part-2`
- Live URL: https://bogagree.github.io/rsschool-landing-page/ (Pages → `landing-page-part-2`, `/`)
- Checklist: [docs/part-2-cross-check.md](../part-2-cross-check.md) (29 sliders, max 100)
- Method: Playwright against the live deploy; widths **1440 / 768 / 380**; light + dark for modal theme row
- D-007: notes only — no binary screenshots committed

This run **creates** `docs/qa/polish-deploy-part-2.md`. Score below is from exercised rows, not a guessed 100.

## Penalties (README Part 2)

| Penalty | Result |
| --- | --- |
| Forbidden libs (−100) | none — scripts: `theme.js`, `burger.js`, `catalog.js`, `modal.js`, `slider.js` |
| Screenshot layout (−100) | none |

## Scored rows (29)

| # | Max | Points | Row | Note (what was seen) |
| --- | ---: | ---: | --- | --- |
| 1.1 | 6 | 6 | Cards from array of objects in `.js`/`.json` | `menu.html`: `data/products.json` — 20 objects with `name`, `description`, `price`, `category`, `sizes`, `additives`; cards via `js/catalog.js` (`data-product-index`). Image path derived in `catalog.js` (`imagePath(category, index)`), same for card + modal |
| 1.2 | 4 | 4 | Card + modal from one object | `menu.html@1440`: Irish / Kahlua / Honey raf — modal title, price, img match card; no static “Black forest” in `#product-modal` shell |
| 2.1 | 4 | 4 | Burger opens/closes smoothly ≤768 | `menu.html@380`: `#burger-panel` transition `opacity/transform/visibility 0.35s`; after ~500ms `opacity:1`, class `burger--open` |
| 2.2 | 3 | 3 | Scroll locked while open, restored after | `menu.html@380`: `scrollY` before=753; while open wheel/`scrollTo` stay 753; after Escape=753; `body.is-burger-open { overflow: hidden }` |
| 2.3 | 4 | 4 | Panel under header; icon animates | `menu.html@380`: panel `top` = header height 80px; `.header__burger-bar` transition `0.3s` |
| 2.4 | 4 | 4 | Links + Escape close menu | `menu.html@380`: links `index.html#…` / `menu.html`; Escape and link click set `aria-expanded=false`. `index.html@380`: hash links `#favorite-coffee` etc. |
| 2.5 | 3 | 3 | ≥769 menu closed, burger hidden | `menu.html@900`: burger `display:none`; `aria-expanded=false`; desktop `.header__nav` visible |
| 2.6 | 2 | 2 | Same on both pages | Burger present and opens on `index.html@380` and `menu.html@380` |
| 3.1 | 6 | 6 | Next/prev move in own direction | `index.html@1440` `#favorite-coffee`: after `transitionend`, Next S'mores→Caramel→Ice; Prev back |
| 3.2 | 4 | 4 | ≥3 items, cyclic | 3 slides; Next from Ice→S'mores; Prev from S'mores→Ice (`translateX(-200%)`) |
| 3.3 | 4 | 4 | Smooth change | `.slider__list` `transition: transform 0.45s`; new frame visible after wait > transition |
| 3.4 | 3 | 3 | One frame visible; no indicators | `.slider__stage` `overflow:hidden`; one slide overlap; no indicator dots in markup |
| 3.5 | 3 | 3 | Works at 1440 / 768 / 380 + resize | `@768` Ice↔S'mores; `@380` Ice↔S'mores; one visible frame each |
| 4.1 | 4 | 4 | First category active on load | `menu.html@1440`: tab Coffee active; 8 coffee cards |
| 4.2 | 6 | 6 | Other category sole active, cards change | Tea→4 cards; Dessert→8; without reload |
| 4.3 | 2 | 2 | Exactly one active, no reload | After each switch only one tab `aria-selected` / active class |
| 5.1 | 5 | 5 | Initial set; control only if hidden | `@768` Coffee: 4 visible + `.catalog__more--visible`; Tea: 4 visible, button hidden |
| 5.2 | 4 | 4 | Show-more reveals rest and hides | `@768` Coffee: click more → 8 cards, button hidden, modal not opened |
| 5.3 | 2 | 2 | Category change resets set | After expand Coffee, Tea→Coffee again: 4 + button visible |
| 5.4 | 2 | 2 | Resize updates count/button | 1440: 8, no btn → 768: 4+btn → 380: 4+btn → 1440: 8, no btn |
| 6.1 | 3 | 3 | Click card opens that item | Card Irish `$7.00` / coffee-1.jpg → modal same |
| 6.2 | 2 | 2 | Dim overlay, centered, project style | `#product-modal` full-viewport flex center; dialog bg token `rgb(225,212,201)` light |
| 6.3 | 2 | **0** | Scroll locked while open; restored after | **Fail** `menu.html@1440`: `scrollY` 600→ open 600; `window.scrollTo(+400)` while open → **703**; after Escape → **859** (not restored). Wheel while open also moves page. `body.is-modal-open{overflow:hidden}` but `html` `overflow-y:visible` (trap from part-2-cross-check.md) |
| 6.4 | 3 | 3 | Close: button, overlay, Escape; inside no close | Overlay click on `.modal` (e.g. 20,90) closes; Esc + `.modal__close` close; click `.modal__dialog` keeps open |
| 6.5 | 2 | 2 | 1440/768/380 light + dark | Close + price inside viewport @800h; light dialog `rgb(225,212,201)` vs dark `rgb(42,36,32)` via `.header__theme` |
| 7.1 | 3 | 3 | ≥2 params, selected highlighted | Size + Additives; S has `modal__option--active` / `aria-pressed=true` |
| 7.2 | 3 | 3 | Open state matches card | Irish: S + no additives, price `$7.00` |
| 7.3 | 5 | 5 | Param change updates price live | S `$7.00` → M `$7.50` → Sugar `$8.00` |
| 7.4 | 2 | 2 | Other card resets params | Kahlua: `$7.00`, S pressed, additives off |

## Sum

| Block | Max | Got |
| --- | ---: | ---: |
| 1 Data | 10 | 10 |
| 2 Burger | 20 | 20 |
| 3 Slider | 20 | 20 |
| 4 Categories | 12 | 12 |
| 5 Show cards | 13 | 13 |
| 6 Modal | 12 | **10** |
| 7 Params | 13 | 13 |
| **Total** | **100** | **98** |

## Rows below max

- **6.3 (0/2):** modal scroll lock — `scrollY` grows while `#product-modal` open (`window.scrollTo` / wheel); position not restored on close. Cause: only `body` overflow hidden; document scroll continues on `html`.

## QA result

- Status: PASS (report written; live site exercised)
- Self-check score: **98 / 100**
- Blocking for “100/100” claim: row 6.3
- Non-blocking: PR screenshot still Part 1 desktop home frame
