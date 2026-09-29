# QA — feat/theme-localstorage

- Date: 2026-09-29
- Branch: `feat/theme-localstorage` @ `59dd514` (+ `2fed0a8`); matches `origin/feat/theme-localstorage`
- Variant: Coffee House (P-001 Accepted in `docs/decisions.md` and `docs/specs/overview.md`)
- Pages: `http://127.0.0.1:61046/` (`index.html`), `http://127.0.0.1:61046/menu` (`menu.html`)
- Specs: `docs/specs/theme.md`, `docs/specs/header.md`, `docs/specs/architecture.md`, `docs/specs/overview.md`
- Method: `npx serve` on `127.0.0.1:61046`; Playwright MCP (`user-playwright`); click `.header__theme`; read `localStorage.theme` and `document.documentElement` `data-theme`; computed `display` on theme icons; `scrollWidth` vs `clientWidth`; hero pixel sampling vs text color; hover neighbor boxes
- Figma: visual reference only — no Δ ≤ 10px, no 375/768/1920 paint tables

Fresh overwrite this run. No prior `docs/qa/theme-localstorage.md` on the branch.

Part 2 (burger panel, slider JS, category switch, show-more) is out of scope — not failed.

## What was checked

### Theme toggle + localStorage

| Check | Result |
| --- | --- |
| Default (no key) → `data-theme="light"` | PASS |
| Click `.header__theme` on index → `data-theme="dark"`, `localStorage.theme === "dark"` | PASS |
| Reload index → dark restored, icon state matches | PASS |
| Navigate index → menu → dark survives | PASS |
| Click theme on menu → `light` stored; navigate menu → index → light survives | PASS |
| Light icons: `.header__theme-icon--light` `display:block`, `--dark` `display:none` | PASS |
| Dark icons: light `none`, dark `block` | PASS |

Key confirmed: `theme` (`light` \| `dark`).

### Overflow (both themes, both pages)

| Page | Theme | Width | scrollWidth | clientWidth | H-scroll |
| --- | --- | --- | --- | --- | --- |
| index | light | 1440 | 1425 | 1425 | no |
| index | light | 768 | 753 | 753 | no |
| index | dark | 1440 | 1425 | 1425 | no |
| index | dark | 768 | 753 | 753 | no |
| index | dark | 380 | 365 | 365 | no |
| menu | dark | 1440 | 1425 | 1425 | no |
| menu | dark | 768 | 753 | 753 | no |
| menu | dark | 380 | 365 | 365 | no |
| menu | light | 380 | 365 | 365 | no |
| menu | light | 768 | 753 | 753 | no |
| menu | light | 1440 | 1425 | 1425 | no |

Theme does not introduce horizontal overflow. (`clientWidth` ~15px under `innerWidth` = vertical scrollbar gutter.)

### Semantics

Both pages: `header`, `nav`, `main`, `footer`; one `h1`; all `img` have `alt`. Local CSS only (`base`, `layout`, `components`, `themes`). No Bootstrap/React/etc.

### Hover

All `:hover` rules under `@media (hover: hover)`; properties opacity/color only. Live hover on first nav link and theme button: neighbor `getBoundingClientRect` deltas all 0.

### Theme contrast

| Surface | Light | Dark |
| --- | --- | --- |
| Body / header / footer text on page bg | ~21:1 (black on white) | ~18.73:1 (white on `rgb(18,18,18)`) |
| Nav links | ~21:1 | ~18.73:1 |
| Section headings / catalog chrome | readable | readable |
| Hero title/text on photo | `rgb(255,255,255)` on dark photo samples ~20:1 | **FAIL** — `rgb(18,18,18)` (`var(--color-bg)`) on dark photo samples ~1.05–1.1 |

Root cause: `.hero__banner { color: var(--color-bg); }` — in dark theme `--color-bg` resolves to near-black, so hero copy over the dark latte photo is effectively invisible. CTA remains readable (inverted button). Header/footer/main outside hero stay fine.

## QA result

- Status: FAIL
- Variant: Coffee House
- Report: overwrote docs/qa/theme-localstorage.md this run
- Checklist:
  - Semantics: PASS — landmarks + one `h1` + `alt` on both pages
  - No horizontal scroll: PASS — `scrollWidth === clientWidth` at 1440/768/380 on index and menu in light and dark
  - 1440: PASS — no H-scroll; theme toggle + icons OK
  - 768: PASS — no H-scroll either theme
  - 380: PASS — no H-scroll either theme
  - Theme contrast: FAIL — dark theme hero title/text (~1.05:1 on photo); other chrome OK; light hero OK
  - Hover stable: PASS — opacity/color only; measured neighbor boxes unchanged
- Blocking defects:
  - Dark theme: `.hero__title` / `.hero__text` / `.hero__accent` use `color: var(--color-bg)` → `rgb(18,18,18)` on a dark hero photo (~1.05–1.1 contrast). Unreadable. Fix so hero copy stays readable on the photo in both themes (e.g. fixed light overlay color, or theme-aware hero text token that stays light over the image).
- Non-blocking:
  - Burger panel / slider JS / category switch / show-more are Part 2 — not scored.
  - `serve` clean-URLs rewrites `menu.html` → `/menu`; fine for static smoke.
