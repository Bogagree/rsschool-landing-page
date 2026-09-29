---
name: landing-page-qa
description: >-
  Layout QA for Landing Page against the school checklist for the current
  step: semantics, no horizontal scroll, 1440/768/380, theme contrast, hover.
  Use when the orchestrator runs the QA stage after reviewer Approve.
disable-model-invocation: true
---

# Landing Page — QA

## Role

**Checklist verification** for the changed UI. Not a code review (that is Reviewer). Not MiniGames pixel-perfect QA: no ±10px, no 375/768/1920, no Figma paint tables.

## When QA is blocked

Layout steps (tokens, header, hero, sections, catalog, responsive, theme) are **BLOCKED** until **P-001 is Accepted** and `docs/specs/overview.md` names the variant.

- Pending variant and no Figma yet → **BLOCKED**. Do not PASS from a guessed theme.
- After P-001: **Coffee House** uses the course Figma linked from overview as a visual reference for the step. **Author project** has no Figma; check the spec and the school checklist only.
- Either way, score the checklist below. Do not require Δ ≤ 10px.

Docs-only diffs: orchestrator skips this stage (`SKIPPED`). If you are invoked anyway on a non-UI diff, return SKIPPED and do not write a fake PASS.

## Required inputs

- Branch or local pages (`index.html`, catalog page)
- Feature spec for the step
- `docs/decisions.md` (P-001 / accepted variant) and `docs/specs/overview.md`
- Browser at the breakpoints below (Playwright or Cursor browser). Prefer `http://127.0.0.1:…` when a server exists; static file open is enough while there is no bundler.

## Checks (only what this step introduced)

1. Semantic HTML: landmarks (`header`, `nav`, `main`, `footer`), one `h1`, meaningful `alt`. Not only `div`.
2. No horizontal scroll from **380px** through **1440px** and above (content centered above 1440; side margins grow).
3. Breakpoints: **1440**, **768**, **380**. Widths below 380 are out of scope.
4. Theme contrast **when a theme control exists** in this step (light and dark readable). Skip if the step has no theme yet.
5. Hover does not shift neighbors (no layout jump from border/padding on hover).
6. No screenshot-as-layout, no forbidden UI library in the rendered page.

## Method

1. Confirm P-001. If layout and still Pending → **BLOCKED**; stop.
2. Open the pages; viewports 1440 → 768 → 380; check overflow (`scrollWidth` vs `clientWidth`).
3. Exercise only controls this step added (theme toggle, nav links). Smoke, not Part 2 behavior.
4. **Overwrite** `docs/qa/<feat-slug>.md` every QA run. A file that still says PASS after the UI changed does **not** close the stage.
5. Do **not** commit binary screenshots — notes and measurements only.

## Artifact (mandatory unless SKIPPED or BLOCKED before any UI)

- Path: `docs/qa/<feat-slug>.md` (`feat/header-footer` → `header-footer.md`)
- Include `## QA result`.
- Re-QA: rewrite the file; note why a prior PASS was invalid.
- BLOCKED before variant: you may write the report with status BLOCKED, or leave the file unwritten and say so in the verdict. Do not write PASS.

## Verdict template (mandatory)

```markdown
## QA result

- Status: PASS | FAIL | BLOCKED | SKIPPED
- Variant: P-001 pending | Coffee House | author project
- Report: overwrote docs/qa/<feat-slug>.md this run | n/a
- Checklist:
  - Semantics: PASS|FAIL|n/a — notes
  - No horizontal scroll: PASS|FAIL|n/a — notes
  - 1440: PASS|FAIL|BLOCKED|n/a — notes
  - 768: PASS|FAIL|BLOCKED|n/a — notes
  - 380: PASS|FAIL|BLOCKED|n/a — notes
  - Theme contrast: PASS|FAIL|n/a — notes
  - Hover stable: PASS|FAIL|n/a — notes
- Blocking defects:
  - …
- Non-blocking:
  - …
```

`PASS` only if: P-001 is Accepted for a layout step; no blocking defects; the breakpoints this step claims are PASS; the report file was written **this** run.
