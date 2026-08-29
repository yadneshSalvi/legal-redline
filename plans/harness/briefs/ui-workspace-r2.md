# Revision 2: workspace — required fixes from the adversarial UI review

Your session context is retained. An independent Opus reviewer (report `plans/harness/reports/20260830-002722-review-ui.md`, screenshots
`plans/harness/logs/review-r1-*.png`) returned `revise` (quality 9/10, correctness 7/10) with twelve required fixes. Since your build, the lead
merged a backend round that (a) changed `src/ui/lib/redline.ts` to use the engine's `wordDiff`/`renderParagraph` (so preview == docx grouping), (b) added
`Finding.costUsd`/`durationMs` and `ReviewRun.stats.perRule`, and (c) made `sectionRef` short. Re-read those files before editing. The engine now also
classifies headings correctly (numbered prose is body text), so real runs will have sane sections — but keep the UI-side guard.
Port **3101**. Do not touch `src/engine`, `src/agent`, `src/eval`, `app/api`, `scripts`. An evaluation campaign is running in this checkout — do not run
`pnpm test`/`pnpm build` more than needed and never kill node processes you did not start.

## Required fixes (all twelve)
1. `useRun.ts`: take `seq` from the parsed payload (`data.seq`) — the server emits `data:` only — so `?after=<seq>` advances; dedupe `logs`/`stage`/`stats` on re-apply.
2. Rejected cards must fade to 60 %: the `rl-fade` keyframe with `fill-mode: both` overrides `opacity-60`. Fix per the reviewer (wrapper or `@layer components` rule with `animation: none`), verify `getComputedStyle(card).opacity === "0.6"`.
3. Word diff: with the engine diff now in place, verify the `< 30 % retained` collapse is gone; STYLE §2 is unconditional — never one strike + one insert when a word diff exists. Remove any remaining UI-only coarsening beyond what `@/src/engine/diff` does.
4. `Dialog.tsx`: never spread `aria-labelledby={undefined}`; delete the unused `labelledBy` prop so Radix's default `titleId` wiring applies. Verify every dialog has an accessible name.
5. Selected finding: add `aria-current="true"` on the selected article + a non-colour cue (2 px left rule, matching the paper idiom) and a roving `tabindex` so selection follows focus with J/K.
6. Nav: `/evals` and `/precedents` are being built by another agent (they will exist); add `app/not-found.tsx` on `paper` using the same card treatment as the run-not-found state, and point the card's `trajectory` link at `/trajectories/[runId]?finding=<id>` (page also in progress) — keep the link.
7. Outline: extract `isRenderedHeading(paragraph)` (shared with `Paragraph.tsx`) and fold non-rendered "sections" into their parent in `Outline.tsx`.
8. Re-attach state: seed the progress board and doc-bar counters from the persisted `ReviewRun` when stage/worker events are absent (findings > 0 or `stats.llmCalls` > 0 ⇒ ingest + planner done; `n of 18` from `stats.perRule` keys or `stats.findings`); show "resumed — live stage detail unavailable" rather than "waiting". Test against `/review/<any real run id from /runs>`.
9. `proposalPreview`: separator between every pair of ops (fixes `INDEMNIFICATIONVendor shall…`).
10. Paper: sheet max 760 px column (`max-w-[824px]` with `px-8`), `--paper-gutter: 64px` at every width ≥ 1024; use or delete the unused `src/tokens.ts` layout exports (one source of truth).
11. Fixture numbering: insert "8.2 Indemnity by Vendor" and renumber the existing Procedure clause to 8.3 (update ops/anchors), and add a vitest that asserts every fixture `replace.oldText` occurs exactly once and no duplicate `numbering` within a section.
12. Contrast: precedent chip hover stays on `bg-sheet`; `×N` attempt count → `text-ink-muted` without opacity; CUAD attribution → `text-ink-muted`.

## Do these suggestions too (cheap)
- STYLE §1 says 12 px small-caps labels are `ink.faint`; keep `ink.muted` in code and tell the lead in the report (the lead amends STYLE.md).
- `verifying` progress chip → a `navy-soft` treatment (amber is reserved for comments/high severity).
- Replace the `✗` glyph with a lucide `X` icon; severity dots on `/runs` get visually-hidden text, not `title`.
- `/runs` error strings: truncate to the message (no absolute paths).
- Show a one-line "prepared example — decisions are not saved" note in the doc bar for fixture runs.
- Show `cost · time` on cards from `Finding.costUsd`/`durationMs` (already wired by the backend round — verify it renders).

## Verification loop (mandatory)
Same as your original brief: `agent-browser`, 1440×900 screenshots of `/review/sample` (default, rejected card, selected card focus), `/review/sample-running`,
`/review/<real run>`, `/runs`, `/nope` (not-found) → Read each PNG → console/errors clean → 1280 and 1920 checks. `pnpm typecheck && pnpm lint` clean;
`pnpm exec vitest run tests/ui` passes. Atomic writes. No git.

## Report (FINAL message must follow this structure exactly)
```
## Summary
## Fixes   (1–12 + suggestions, each: what changed + evidence: screenshot path or measured value)
## Verification evidence
## Known gaps / risks
```
