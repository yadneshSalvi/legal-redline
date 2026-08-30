# Brief: design system + app shell + landing + the review workspace   (Opus 5 · frontend build)

You are a senior product designer-engineer on **Playbook Redliner**, a micro1 Agentic Workflows Hackathon entry
(agentic contract redlining with human approval). Repo: `~/code/hackathons/legal-redline`.
Dev server port for you: **3101** (`pnpm dev -p 3101`). Do not touch other ports. Other agents are concurrently building
`src/engine`, `src/agent`, `src/eval`, `app/api/**`, `scripts/**` — never edit those directories.

The judges score **End-to-End Quality (20 pts)** as "the finish of something a person would sign their name to, not an obvious
AI draft". The UI is the first thing they see in the video and the deployed demo. It must look like a premium legal product,
and the redlines must read exactly like Word tracked changes.

## Read first (mandatory, in this order)
1. `AGENTS.md` (conventions, pins), `node_modules/next/dist/docs/` (Next 16 App Router conventions — this Next is newer than your training)
2. **`STYLE.md`** — the law: tokens, type, tracked-change rendering, workspace layout, card anatomy, motion, forbidden list
3. `SCHEMA.md` §1, §5–6 and **`src/agent/types.ts`**, `src/engine/types.ts` (the data you render; the HTTP + SSE protocol you consume)
4. `PLAYBOOK.md` (rule ids/titles/severities) and `plans/00_master_plan.md` §1–2 (what the product is)

## Goal
Ship the design system, the app shell, the landing page and the complete **review workspace** working against a realistic fixture, with
a data layer already written to the real API/SSE protocol (it will light up when the backend lands — until then it falls back to the fixture).

## Scope (exactly this; nothing more)
- `src/tokens.ts` + `app/globals.css` (`@theme` tokens from STYLE.md §1, fonts via `next/font/google`: Inter, Source Serif 4, Geist Mono
  exposed as CSS variables; base styles; focus ring; selection color; `prefers-reduced-motion`). Remove the scaffold's dark-mode media query.
- `app/layout.tsx` — shell: 56 px top bar with a small wordmark ("Playbook Redliner" in Source Serif 4 + a minimal monogram drawn in SVG, no emoji),
  nav (Review · Runs · Evals · Precedents), right side: a "Sample contracts" quick menu and a keyboard-shortcuts button (`?`). Metadata/title/favicon (SVG).
- `app/page.tsx` — landing: headline + one-paragraph value statement for in-house counsel; an upload dropzone (`.docx`/`.txt`, drag or click; posts
  `FormData` to `POST /api/runs` per SCHEMA §6 with `playbookId` + `config`), a "or try a sample" row (fetch `GET /api/samples`, fixture fallback:
  3 sample cards), playbook select (fetch `/api/playbooks`, fallback to the single default), an "Advanced" disclosure with the pipeline config select
  (labels from `src/agent/types.ts` ConfigId — default `final`), then a quiet "How it works" strip (ingest → planner → drafters → verifier → you approve →
  Word tracked changes), and a footer with CUAD attribution ("Evaluation contracts from CUAD, The Atticus Project, CC BY 4.0").
- `app/review/[runId]/page.tsx` — **the workspace** per STYLE.md §3–4, three panes: outline (sections with severity dots, click to jump), the paper
  (Source Serif, 760 px column, paragraphs with anchors `#p0042`, section headings sticky, redlines rendered inline from `Finding.proposal.ops` with
  word-level diff — `diff.diffWords` — deletions strike/red, insertions underline/blue, comment pills, accepted/rejected/edited visual states, hover
  sync with the cards), findings pane (filter chips, cards per STYLE §4 with Accept/Edit/Reject, expandable quote/diff, verifier badge, precedent chip,
  cost/time, "trajectory ▸" link to `/trajectories/[runId]?finding=…` (page not yours; link only), keyboard: `J`/`K` move, `A` accept, `R` reject, `E` edit,
  `Enter` expand, `/` focus filter; sticky footer with counts + "Accept all verified" (confirm dialog) + "Export .docx" (POST `/api/runs/[id]/apply`
  then download `/api/runs/[id]/output.docx`) + "Memo" drawer rendering Markdown (write a tiny renderer for headings/lists/tables/bold — no new deps).
  Edit = modal with the rule title, original text, editable `newText` per op and the comment; saving records a `Decision{action:"edit"}`.
  While the run is `running`: the **agent progress board** (planner → drafter chips per rule (queued/running/verifying/done/failed with elapsed +
  one-line note) → verifier → assembler) driven by SSE `ProgressEvent`s; findings slide in as they arrive; users can start deciding immediately.
  States: loading skeleton, empty (no findings yet), error, `awaiting_review`, `applied` (success banner with download).
- `app/runs/page.tsx` — list of runs (`GET /api/runs`; fixture fallback) as a clean table: contract, playbook, config, status, findings by severity, cost, date.
- `src/ui/**` — small typed components: `Button`, `Chip`, `SeverityPill`, `Kbd`, `Dialog`/`Drawer`/`Tooltip` (build on `radix-ui` primitives, themed with our
  tokens only), `Skeleton`, `EmptyState`, `TopBar`, `Outline`, `Paper`, `Paragraph`, `RedlineText`, `FindingCard`, `ProgressBoard`, `MemoDrawer`, `EditDialog`,
  `ShortcutsDialog`, `Dropzone`, `SampleCard`; `src/ui/state/reviewStore.ts` (zustand: run, decisions, selection, filters; decisions POST to
  `/api/runs/[id]/decisions` when the API exists, else kept locally); `src/ui/data/useRun.ts` (GET run → if `running` open `EventSource` on
  `/api/runs/[id]/stream?after=<seq>`, apply events, reconnect with backoff; 404 on `sample` → fixture).
- `src/ui/fixtures/sample-run.ts` — a realistic `ReviewRun`: a ~45-paragraph "Web Site Hosting Agreement" between "Northwind Analytics, Inc." (Customer)
  and "Brightline Cloud Services Ltd." (Vendor) with numbered sections and definitions (write real contract prose; no lorem), 9 findings covering
  critical/high/medium/low, statuses deviation/missing/compliant/needs_review, proposals with `replace` (multi-word diffs), `insert_after` (a new insurance
  paragraph) and `delete_paragraph`, verification pass/repaired/fail, one precedent chip, realistic rationale/comments in the playbook tone, stats/costs.
  `/review/sample` renders it (status `awaiting_review`); `/review/sample-running` renders a simulated in-progress run (timers drive the board and findings arrival).
- `public/` favicon + og image (SVG/PNG generated by you, on-brand).

## Acceptance criteria (all must be true)
- Screenshots at 1440×900 of: landing, `/review/sample` (default, one card expanded, one accepted, one rejected, edit dialog open, memo drawer open,
  shortcuts dialog), `/review/sample-running` (mid-run), `/runs`; plus 1280×800 and 1920×1080 of the workspace. They must satisfy STYLE.md on
  first glance: paper/ink palette, Word-accurate redlines, hairlines not shadows, no emoji, no default Tailwind colors.
- Keyboard-only review works (J/K/A/R/E/Enter, visible focus rings). Escape closes dialogs/drawers. Contrast ≥ 4.5:1 for text.
- Zero console errors/warnings; `pnpm typecheck && pnpm lint` clean (run `pnpm exec next typegen` if `LayoutProps` typing is missing).
- Never a horizontal page scroll at 1024–1920.

## Verification loop (mandatory — do not skip, do not shorten)
1. Run `agent-browser skills get core --full` once and use that workflow.
2. `pnpm dev -p 3101`; `agent-browser open http://localhost:3101/…`; `agent-browser set viewport 1440 900`; wait `--load networkidle`.
3. `agent-browser screenshot plans/harness/logs/ui-workspace-<screen>-pass<N>.png`, then **Read the PNG** and critique it like a hostile
   design director against STYLE.md: alignment, rhythm, type scale, hairlines, redline colors, empty space, truncation, focus states.
4. `agent-browser console` / `agent-browser errors` → zero errors, zero React warnings, zero hydration warnings.
5. Exercise every interaction (click, keyboard, drag-drop) via snapshot/refs; screenshot after each.
6. Fix, re-run typecheck/lint, repeat from step 3. Minimum **two full passes**; stop only when you would sign your name to the screenshots.
7. Capture 1280×800 and 1920×1080 of the workspace.

## Rules
- Only STYLE.md tokens; fonts only Inter / Source Serif 4 / Geist Mono; no emoji; no toast libs; no gradients except the landing wash.
- Installed deps only (`radix-ui`, `class-variance-authority`, `clsx`, `tailwind-merge`, `motion`, `zustand`, `lucide-react`, `diff`, `recharts`). Do NOT run `pnpm add`.
- Client components `"use client"`; no `any`; no dead code; no console noise; files ≤ ~400 lines.
- Write files atomically (temp + `mv`) — the dev server is watching. Do not modify files outside your scope; list any incidental edits.
- No `git commit` / `git push`.

## Report (your FINAL message must follow this structure exactly)
```
## Summary
## Files
## Verification evidence   (screenshot paths + what each proves; console/errors status; typecheck/lint output)
## Known gaps / risks
## Suggestions for reviewer
```
