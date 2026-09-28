# QA — feat/home-extra-sections

- Date: 2026-09-28
- Branch: `feat/home-extra-sections`
- Base: `landing-page`
- Variant: Coffee House (P-001 Accepted)
- Pages: `http://127.0.0.1:8766/index.html`, `http://127.0.0.1:8766/menu.html`
- Specs: `docs/specs/home-sections.md`, `docs/specs/footer.md`

This run is after the Contact us footer commit. Earlier About/Extra measurements from before that commit do not close this stage. No binary screenshots were committed.

## What was checked

Home: `section#about` (four photos) and `section#extra` (`mobile-screens.png`). One `h1`. Images loaded: about 726×726, app screens 630×630. Footer on both pages: `Contact us`, `+1 (603) 555-0123` (`tel:+16035550123`), `8558 Green Rd., LA` (maps, `target="_blank"`), `Mon–Sat: 9:00–23:00`. Overflow: `scrollWidth` equals `clientWidth`. Above 1440 the About and footer columns stay 1440px and stay centered (at 1600px, left inset 72px inside the 1585px layout width; the extra 15px is the scrollbar).

| Width | scrollWidth | clientWidth | About | Extra | Notes |
| --- | --- | --- | --- | --- | --- |
| 1440 | 1425 | 1425 | 2×2, 688px | 640px | 15px is the scrollbar |
| 768 | 753 | 753 | 2×2, 352px | 640px centered | 15px is the scrollbar |
| 380 | 380 | 380 | 2×2, 166px | 348px | footer text stays inside the viewport |
| 1600 | 1585 | 1585 | column 1440px | same | side margins grow |

Hover on the footer phone link: color changes, box stays 131×24. Copyright and hours stay 153×24 and 146×24 at the same position.

`menu.html` at 380: scroll 380/380, same Contact us text and hours.

## QA result

- Status: PASS
- Variant: Coffee House
- Semantics: PASS — one `h1`, `section#about` and `section#extra` with `h2`, photos have alt, footer has `address`
- No horizontal scroll: PASS
- 1440 / 768 / 380: PASS
- Theme contrast: n/a — this step does not add a theme control
- Hover stable: PASS — footer link hover does not move neighbors; About and Extra have no hover rule
- Blocking defects: none
- Non-blocking: pin, phone, and clock icons are not in `assets/icons/`. Catalog cards are still out of this step.
