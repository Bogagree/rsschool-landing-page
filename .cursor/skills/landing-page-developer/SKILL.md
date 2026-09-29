---
name: landing-page-developer
description: >-
  Implements one Landing Page plan step (feat/*) under SDD: reads specs and
  decisions, codes only in scope, updates docs, commits. Use when the user
  asks to implement a feat step, or when the orchestrator runs the developer
  stage.
disable-model-invocation: true
---

# Landing Page — Developer

## Role

Implement **one** plan step. Do not review the whole repo. Do not open PR (orchestrator does).

## Required reads (before code)

1. `docs/part-1-plan.md` or `docs/part-2-plan.md` — **`## Next`** + step / branch (must match unless user overrode)
2. Matching `docs/specs/…`
3. `docs/decisions.md` (stack is D-002; variant is P-001 until Accepted)
4. `docs/conventions/code.md`, `docs/conventions/git.md`
5. Course task: links in `docs/README.md` — do not paste the whole TZ

## Workflow

1. Branch `feat/<kebab>` from the current part base (`landing-page`, later `landing-page-part-2`).
2. Implement only that step’s acceptance criteria.
3. Vanilla HTML/CSS/JS, page-first, BEM, CSS custom properties. No React/Vue/Angular, TypeScript, Bootstrap, Swiper or other UI libs. No `console.log`. SCSS or Vite only if a **new** `Accepted` decision exists (D-002 does not allow them).
4. Update spec status if behavior clarified; new arch → `Accepted` in `decisions.md` **before** code that depends on it.
5. In the same PR: mark this step `[done]` in the part plan and set **`## Next`** to the following open feat (do not mark done before the work is actually in the PR).
6. There is no lint/build script until a toolchain decision exists. Do not add one in a layout step.
7. Commit(s) with RS convention (`feat:`, `fix:`, `docs:`, …). PowerShell here-string for the message, not a bash heredoc. Push if orchestrator will PR.

## Stop conditions

- `## Next` is `feat/choose-variant` and the user did **not** name Coffee House or author project → **FAIL**. Do not invent a theme. Do not start tokens, header, or hero.
- Layout step while P-001 is still Pending → **FAIL**.
- Missing / conflicting AC → ask user; do not guess across parts.
- Neighbor steps (e.g. burger **logic** while doing header markup) → leave a hook only if AC requires it; no Part 2 behavior in Part 1.
- Coffee House asset export fails and the file is not already in `assets/` → **FAIL**. Do not invent, redraw, or placeholder-illustrate.

```markdown
## ASSET BLOCKED

- Source: Coffee House Figma <node or frame>
- Put file at: assets/<images|icons|fonts>/...
- Action: скачай экспорт из макета и положи по пути выше
```

## Handoff output (mandatory)

```markdown
## Developer result

- Status: PASS | FAIL
- Branch: feat/…
- Step: feat/…
- Specs touched: …
- Commits: …
- Notes: …
```
