# QA — feat/home-hero

- Date: 2026-09-23
- Branch: `feat/home-hero`
- Base: `landing-page`
- Variant: Coffee House (P-001 Accepted)
- Page: `http://127.0.0.1:8766/index.html`
- Spec: `docs/specs/hero.md`

The previous PASS on this file scored the hero **without** `assets/images/img-hero.jpg`. This run rewrote the report after the latte photo was added. No binary screenshots were committed.

## What was checked

Home page only (this step). Image `assets/images/img-hero.jpg` loaded (`naturalWidth` 1440, `naturalHeight` 745). One `h1`. CTA `Menu` → `menu.html`. Overflow: `scrollWidth` equals `clientWidth`.

| Width | scrollWidth | clientWidth | Banner | Notes |
| --- | --- | --- | --- | --- |
| 1440 | 1440 | 1440 | 1408×640 | nav visible |
| 768 | 753 | 753 | 721×640 | nav hidden, burger flex; 15px is the scrollbar |
| 380 | 380 | 380 | 348×415 | no overflow |

Hover on `.hero__cta`: opacity `0.85`. CTA box stayed `56,555 128×58`. Title box stayed `56,209 528×227`.

## QA result

- Status: PASS
- Variant: Coffee House
- Semantics: PASS — one `h1`, `section#hero`, photo has alt
- No horizontal scroll: PASS
- 1440 / 768 / 380: PASS
- Theme contrast: n/a — theme control unchanged; banner text is `#fff` on the photo
- Hover stable: PASS
- Blocking defects: none
- Non-blocking: other Figma exports remain untracked in `src/assets/` for later steps
