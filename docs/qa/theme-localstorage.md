# QA — feat/theme-localstorage

- Date: 2026-09-29
- Branch: `feat/theme-localstorage` @ `eaea0f2` (`fix: keep hero overlay text white in both themes`); matches `origin/feat/theme-localstorage` at start of run
- Variant: Coffee House (P-001 Accepted in `docs/decisions.md` and `docs/specs/overview.md`)
- Pages: `http://127.0.0.1:61047/` (`index.html`), `http://127.0.0.1:61047/menu.html`
- Specs: `docs/specs/theme.md`, `docs/specs/header.md`, `docs/specs/architecture.md`, `docs/specs/overview.md`
- Method: `npx serve` on `127.0.0.1:61047`; Playwright MCP (`user-playwright`); click `.header__theme`; read `localStorage.theme` and `document.documentElement` `data-theme`; computed `display` on theme icons; `scrollWidth` vs `clientWidth`; hero image pixel sampling vs text color; hover neighbor boxes
- Figma: visual reference only — no Δ ≤ 10px, no 375/768/1920 paint tables

Fresh overwrite this run. Prior `docs/qa/theme-localstorage.md` FAIL (dark hero ~1.05:1) scored the UI **before** `eaea0f2` and is invalid for this re-run.

Part 2 (burger panel, slider JS, category switch, show-more) is out of scope — not failed.

## What was checked

### Theme toggle + localStorage

| Check | Result |
| --- | --- |
| Default (no key) → `data-theme="light"` | PASS |
| Click `.header__theme` on index → `data-theme="dark"`, `localStorage.theme === "dark"` | PASS |
| Reload index → dark restored; light icon `display:none`, dark icon `display:block` | PASS |
| Navigate index → menu.html → dark survives; icons match | PASS |
| Back to index → dark kept | PASS |
| Click theme → `light` stored; light icon `block`, dark `none` | PASS |

Key confirmed: `theme` (`light` \| `dark`).

### Overflow (both themes, both pages)

| Page | Theme | Width | scrollWidth | clientWidth | H-scroll |
| --- | --- | --- | --- | --- | --- |
| index | light | 1440 | 1425 | 1425 | no |
| index | light | 768 | 753 | 753 | no |
| index | light | 380 | 365 | 365 | no |
| index | dark | 1440 | 1425 | 1425 | no |
| index | dark | 768 | 753 | 753 | no |
| index | dark | 380 | 365 | 365 | no |
| menu | light | 1440 | 1425 | 1425 | no |
| menu | light | 768 | 753 | 753 | no |
| menu | light | 380 | 365 | 365 | no |
| menu | dark | 1440 | 1425 | 1425 | no |
| menu | dark | 768 | 753 | 753 | no |
| menu | dark | 380 | 365 | 365 | no |

Theme does not introduce horizontal overflow. (`clientWidth` ~15px under viewport = vertical scrollbar gutter.)

### Semantics

Both pages: `header`, `nav`, `main`, `footer`; one `h1`; all `img` have `alt`. Local CSS only. No Bootstrap/React/etc.

### Hover

Live hover on first nav link and `.header__theme` @1440 light: neighbor `getBoundingClientRect` deltas all 0.

### Theme contrast

| Surface | Light | Dark |
| --- | --- | --- |
| Header / nav / footer / section titles on page bg | black on white ~21:1 (index + menu) | white / `#ccc` on `rgb(18,18,18)` ~11.7–18.7:1 |
| Hero `.hero__title` / `.hero__text` / `.hero__accent` on photo | `rgb(255,255,255)` vs dark photo samples ~19.9–20.7:1 | same white overlay ~19.9–20.7:1 (was ~1.05:1 before `eaea0f2`) |

Root of prior FAIL fixed: `.hero__banner { color: #fff; }` keeps overlay copy readable on the photo in both themes (no longer `var(--color-bg)` → near-black in dark).

## QA result

- Status: PASS
- Variant: Coffee House
- Report: overwrote docs/qa/theme-localstorage.md this run
- Checklist:
  - Semantics: PASS — landmarks + one `h1` + `alt` on both pages
  - No horizontal scroll: PASS — `scrollWidth === clientWidth` at 1440/768/380 on index and menu in light and dark
  - 1440: PASS — no H-scroll; theme toggle + icons OK
  - 768: PASS — no H-scroll either theme
  - 380: PASS — no H-scroll either theme
  - Theme contrast: PASS — dark + light hero overlay white on photo ~20:1; header/catalog/footer readable both themes both pages
  - Hover stable: PASS — measured neighbor boxes unchanged
- Blocking defects:
  - none
- Non-blocking:
  - Burger panel / slider JS / category switch / show-more are Part 2 — not scored.
  - Prior FAIL report (pre-`eaea0f2`) invalidated by this re-run.
