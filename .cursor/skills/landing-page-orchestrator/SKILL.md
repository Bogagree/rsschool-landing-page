---
name: landing-page-orchestrator
description: >-
  Runs one Landing Page plan step through developer, reviewer, QA, and a PR
  into the part branch. Use when the user asks for the factory, orchestrator,
  or full pipeline for a feat step.
disable-model-invocation: true
---

# Landing Page — Orchestrator (agent factory)

## Goal

Ship **one** plan step as a PR into the part branch (`landing-page` for Part 1, `landing-page-part-2` for Part 2). User merges.

Pipeline (strict order):

1. **Developer** → `.cursor/skills/landing-page-developer/SKILL.md`
2. **Reviewer** → `.cursor/skills/landing-page-reviewer/SKILL.md`
3. **QA** → `.cursor/skills/landing-page-qa/SKILL.md`
4. **PR** only if Developer PASS + Reviewer Approve + QA PASS (or QA SKIPPED)

## Input from user

Require:

- Part base (`landing-page` or `landing-page-part-2`)
- Optional: “docs-only” → skip QA stage

If step is not given: read `docs/part-1-plan.md` or `docs/part-2-plan.md` → section **`## Next`** (single `feat/…` line). Do **not** invent a different step. Do **not** jump ahead of `## Next`. Confirm once in the run log.

`feat/choose-variant` (P-001) needs the user to name **Coffee House** or **author project**. Do not invent an author theme. If they did not choose, stop before layout skills; no tokens, header, or hero.

After a green feature PR is ready (or when updating the plan in that PR): mark the step `[done]` in the plan tree and advance `## Next` to the following open `feat/…`.

Part-branch PRs stay open and unmerged:

- Part 1: `landing-page` → `main` — https://github.com/Bogagree/rsschool-landing-page/pull/1
- Part 2: `landing-page-part-2` → `landing-page` (when it exists)

## How to run stages

Prefer **isolated subagents** (`Task`) with `model: inherit`. Each prompt must:

1. Say: read and follow the named `SKILL.md` completely.
2. Pass: repo path, base branch, feat name, relevant spec paths.
3. Demand the skill’s **mandatory handoff/verdict block** as the final message.
4. Forbid merging into `main` / the part branch; forbid skipping stages.

If Task is unavailable, run stages sequentially in one session by reading each skill in order — still emit each stage’s verdict block before continuing.

### Loop on failure (pre-PR)

- Reviewer **Request changes** or QA **FAIL** → hand defects to Developer (same branch), re-run Reviewer, then QA.
- QA **BLOCKED** (P-001 still pending, no layout reference) → stop; no PR for a layout step.
- Max **2** fix loops unless user says continue.
- After max loops still red → stop; no PR; summarize blockers.

### Post-user-review fix (PR already open)

When the user reviews an **open** `feat/*` PR (or local branch) and reports defects:

1. Treat feedback as a **blocking defect list** — do **not** open a new PR.
2. Run on the **same** `feat/…` branch: Developer (fix) → Reviewer → QA.
3. Commit + push to the existing PR head.
4. **Overwrite** `docs/qa/<feat-slug>.md` with a **new** QA run after the latest Developer UI commit. A file that still says PASS is not a closed QA stage. Do **not** reuse the previous report.
5. Emit the run log with `PR: <existing url> (updated)`.
6. Max **2** fix loops per user review batch unless user says continue.

Green PR after user review requires a QA report **from this run** when the diff is user-visible. Post-user-review **without** a fresh `docs/qa/<feat-slug>.md` ≠ green for UI work.

### Docs-only / non-UI

- Skip QA if the diff has no user-visible UI (pure `docs/`, gitignore, tooling with no layout).
- State skip explicitly in the run log (`QA: SKIPPED`).

## PR stage (after all green)

1. For UI steps, ensure QA **overwrote** `docs/qa/<feat-slug>.md` (D-007) in **this** factory run and it is committed. An older PASS on the branch is not enough after UI or user-review changes.
2. Push `feat/…` if needed.
3. `gh pr create --base <part-branch>` with **Summary + Test plan** only. Link touched `docs/specs/…`, `docs/decisions.md`, and the QA report when one exists.  
   **Do not** put the course checklist (Task / Screenshot / Deployment / Done / Score) — that is only for `landing-page` → `main` (and later Part 2 → `landing-page`).  
   **Do not** add `Made with Cursor` (or similar) to the PR body.
4. Return PR URL. **Do not merge.**

## Run log (mandatory at end)

```markdown
## Factory run

- Step: feat/…
- Mode: new-step | post-user-review
- Developer: PASS | FAIL
- Reviewer: Approve | Request changes | Comment
- QA: PASS | FAIL | SKIPPED | BLOCKED (P-001 pending)
- QA report: docs/qa/<feat-slug>.md | n/a
- PR: <url> | updated <url> | not created (<reason>)
```

## Anti-patterns

- Starting Reviewer/QA before Developer PASS
- Creating PR while any stage is red or QA is BLOCKED on a layout step
- Reviewing the entire repository
- Skipping `## Next` (tokens, header, hero before `feat/choose-variant`)
- Inventing Coffee House vs author, or an author theme, when the user did not choose
- Layout QA while P-001 is Pending and there is no accepted variant / Figma in `docs/specs/overview.md`
- Pixel-perfect MiniGames QA (±10px at 375/768/1920, Figma MCP paint tables)
- Introducing SCSS, Vite, TypeScript, React/Vue/Angular, Bootstrap, or Swiper without an `Accepted` decision (D-002 is vanilla)
- Reusing `docs/qa/<slug>.md` PASS after live UI or user-review changed
- Course checklist or `Made with Cursor` on a `feat/*` PR
- Merging the PR, or merging `landing-page` → `main`
