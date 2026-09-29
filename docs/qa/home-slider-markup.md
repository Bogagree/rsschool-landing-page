# QA — feat/home-slider-markup

- Date: 2026-09-28
- Branch: `feat/home-slider-markup`
- Base: `landing-page`
- Variant: Coffee House (P-001 Accepted)
- Pages: `http://127.0.0.1:8766/index.html`, `http://127.0.0.1:8766/menu.html`
- Spec: `docs/specs/slider.md`

Part 1 markup only. Three exported photos and inert prev/next buttons. No slide switching. No binary screenshots committed.

## What was checked

Home slider `section#favorite-coffee`. Images `coffee-slider-1.png`, `coffee-slider-2.png`, `coffee-slider-3.png` loaded at 530×530. One `h1` on the home page. Nav link `index.html#favorite-coffee` on both pages. Overflow: `scrollWidth` equals `clientWidth`. Above 1440 the slider column stays 1440px and stays centered (at 1600px, left inset 72px inside the 1585px layout width; the extra 15px is the scrollbar).

| Width | scrollWidth | clientWidth | Slides | Notes |
| --- | --- | --- | --- | --- |
| 1440 | 1425 | 1425 | 3 × 416px in a row | controls 40×40 at the row edges; 15px is the scrollbar |
| 768 | 753 | 753 | 3 × 192px in a row | nav hidden, burger flex; 15px is the scrollbar |
| 380 | 380 | 380 | 3 × 348px stacked | no overflow; controls on one row under the photos |
| 1600 | 1585 | 1585 | column 1440px centered | side margins grow |

Hover on `.slider__control--prev`: opacity `0.7`. Button box stayed 40×40. The next button and the first photo kept their width and height.

`menu.html` at 380: scroll 380/380, Slider href `index.html#favorite-coffee`, nav hidden, burger flex.

## QA result

- Status: PASS
- Variant: Coffee House
- Semantics: PASS — one `h1`, `section#favorite-coffee` labelled by `h2`, photos have alt, controls are buttons
- No horizontal scroll: PASS
- 1440 / 768 / 380: PASS
- Theme contrast: n/a — this step does not add a theme control
- Hover stable: PASS
- Blocking defects: none
- Non-blocking: below 480px the next button sits at the start of the second grid track, not on the right edge. Indicators were not in the export. Slide switching is Part 2.
