# Playbook Redliner — Master Plan
### An agentic first-pass contract review that hands counsel a Word file with tracked changes they'd sign.
**Target: WIN the micro1 Frontier Engineering Challenge 2026 (Agentic Workflows Hackathon).**
**Deadline: 2026-08-31 18:00 UTC (23:30 IST). Plan written 2026-08-29 23:10 IST (~47 h left).**

---

## 0. Why this wins (rubric → design)

| Criterion (pts) | What judges look for | How Playbook Redliner scores it |
|---|---|---|
| Problem & User Value (15) | clearly defined user, real bottleneck | In-house counsel / contracts manager on the **customer side** receiving vendor paper; 1–3 h per first-pass review against the company playbook; output must be a Word doc with tracked changes + comments they can send back |
| Agent Solution & Engineering (30, tie-break #1) | purposeful design choices: context, tools, memory, verification, skills, orchestration | Clause-addressable **document model** (context) · per-rule **drafter workers with validated tools** (tools + orchestration) · independent **verifier** with repair loop (verification) · **precedent memory** of approved language (memory) · playbook rules as **skills** · every choice measured in the changelog |
| End-to-End Quality (20) | output a person would sign, not an AI draft | Real OOXML tracked changes (`w:ins`/`w:del`) + margin comments citing the playbook rule + an issues memo; surgical word-level edits; human approve/edit/reject gate; premium review UI |
| Measured Improvement (15) | fair baseline, same cases, evidence per iteration | 12-contract eval set (8 real CUAD contracts with lawyer-labelled gold + 4 seeded synthetic incl. a hard case); baseline = one prompt with the same playbook; every iteration is a named config run on the same set |
| Reproducibility (15, tie-break #2) | clean-env path to the main result | `pnpm install && pnpm eval` replays committed model outputs at zero cost; `pnpm eval --live` re-runs; pinned versions; seeded synthetic data; Docker validation of docx; one-command dataset build |
| Hot Take (5) | failure mode → practical lesson | Written from real eval data (candidates in §8) |

Qualification gate (must pass before scoring): runnable from clean env, trajectories for every agent (app agents **and** the coding agents used to build), no secrets, licences respected (CUAD CC-BY-4.0 attribution).

## 1. Product definition

**Name:** Playbook Redliner. **User:** customer-side in-house counsel / contracts manager.
**Bottleneck:** first-pass review of vendor paper against the company playbook — reading 20–60 pages, finding every clause the playbook cares about, deciding preferred/fallback positions, drafting surgical redlines and explanatory comments in Word, and staying consistent with what the team accepted last time.
**Contract types:** vendor services / SaaS / software licence & maintenance / hosting agreements (the CUAD-rich, playbook-standard case).

**Input:** counterparty `.docx` (or `.txt`) + a playbook (YAML; default: *Customer-side Vendor Services Playbook v1*, 16 rules with preferred / fallback / walk-away positions).
**Output:** (1) `.docx` with **real tracked changes and comments**, author "Playbook Redliner", written to a *new* file; (2) issues memo (Markdown → also rendered in UI); (3) a full trajectory of every agent step; (4) the precedent bank grows with each approved redline.
**Human gate:** nothing is written into the document until a reviewer accepts (or edits) each finding in the review workspace. Rule 4/5 of the hackathon (sandbox + qualified human) satisfied by construction.

## 2. Architecture (one TypeScript runtime)

```
app/                         Next.js 16.3 App Router (UI + route handlers; Vercel Pro, maxDuration 800, SSE streaming)
  page.tsx                   Landing: upload / pick a sample contract, choose playbook, start review
  review/[runId]/page.tsx    Review workspace (paper + findings + approvals + live agent progress)
  runs/page.tsx              Run history
  evals/page.tsx             Evaluation dashboard (baseline vs iterations, changelog timeline)
  trajectories/[runId]/…     Trajectory viewer (every LLM/tool step, cost, retries, human checkpoints)
  precedents/page.tsx        Precedent memory bank
  api/**                     analyze (SSE), apply, runs, precedents, evals, samples
src/engine/                  pure TS OOXML: docx → DocumentModel; tracked-changes + comments writer; word diff; validation
src/playbook/                playbook schema (zod) + loader + default playbook (data/playbooks/*.yaml)
src/agent/                   configs (iteration flags), planner, drafters (tools), verifier, assembler, memory, trajectory, baseline, orchestrator
src/eval/                    dataset builders (CUAD, synthetic), gold, matching, metrics, judge (GPT-5.6 independent), runner, report
src/store/                   Store interface: fs (local) | Vercel Blob (prod) | memory (fallback)
src/ui/                      components (design system in STYLE.md)
scripts/                     CLI: fetch-cuad, build-dataset, synth, review, baseline, eval, report, export-trajectories, validate-docx
data/playbooks · data/contracts (eval set, committed) · data/precedents/seed.json · data/runs (gitignored)
evals/cache (committed model outputs for replay) · evals/results (per-config tables) · trajectories/ (curated, committed)
tests/ (vitest unit + engine fixtures; Playwright smoke)
README.md · REPRODUCE.md · IMPROVEMENT_CHANGELOG.md · AGENTS.md · STYLE.md · SCHEMA.md · PLAYBOOK.md · EVAL.md
```

**Contracts (the law; change the contract first, then code):** `SCHEMA.md` (+ `src/engine/types.ts`, `src/agent/types.ts`), `PLAYBOOK.md` (+ YAML), `EVAL.md`, `STYLE.md`, `AGENTS.md`.

### 2.1 Agent pipeline (each box is a measured design choice)

```
docx ──ingest──▶ DocumentModel (paragraph ids, section tree, definitions)          [deterministic]
        │
        ▼
   PLANNER (1 structured call, sees TOC + definitions + rule list; tools: search/get_section)
        │  RulePlan[] : candidate paragraphs per rule, "absent" flags
        ▼
   DRAFTERS (parallel, one per rule; toolRunner with validated tools)
        │  tools: read_section · search · get_definition · list_sections · lookup_precedent ·
        │         propose_redline(ops, comment, level)  ← rejects ops whose oldText isn't verbatim in the paragraph
        │  → Finding{status, quote, rationale, proposal, confidence}
        ▼
   VERIFIER (independent session per finding; sees rule + clause + rendered redline + definitions; never sees drafter reasoning)
        │  verdict pass | fail(+reasons) → drafter repair round (≤ 2) ; deterministic checks (ops apply, minimality, numeric bounds)
        ▼
   ASSEMBLER (dedupe/merge overlapping ops, severity order, memo via 1 call, stats)     [mostly deterministic]
        ▼
   HUMAN GATE (UI: accept / edit / reject per finding; keyboard-first)
        ▼
   APPLY (engine writes w:ins/w:del/comments into a copy; re-parse validation; optional LibreOffice headless)
        ▼
   PRECEDENT MEMORY ← approved (rule, ops, comment, context) ; drafters retrieve top-k per rule next time
```

Models: drafter/planner/verifier/memo = **Claude Opus 5** (`claude-opus-5`, adaptive thinking, effort high; xhigh for verifier), structured outputs via `zodOutputFormat`, prompt caching on the frozen system + playbook prefix. Independent judge for eval = **GPT-5.6 Sol** (OpenAI SDK) so the judge is a different model family from the system under test. Baseline uses the *same* Claude model with one prompt — fair.

### 2.2 Iteration configs (the changelog is real runs of these flags on the same 12 contracts)

| Config | Flags | Story |
|---|---|---|
| `b0-chat` | whole contract in one prompt, **no playbook**, free-text answer parsed to findings | "paste it into ChatGPT" — the naive approach |
| `b1-prompt` (official baseline) | one prompt, contract + playbook, structured JSON findings + replacement text, naive string apply | one direct prompt with basic instructions |
| `i1-docmodel` | + DocumentModel + planner (paragraph-addressed context, section-scoped reading) | context beats stuffing |
| `i2-workers` | + per-rule drafter workers with validated tools (propose_redline rejects non-verbatim anchors) | tools + orchestration + boundary validation |
| `i3-verifier` | + independent verifier with repair loop + deterministic checks | verification |
| `i4-memory` | + precedent memory (seeded bank; retrieval by rule + lexical similarity) | memory / consistency |
| `x-monolith` (removed) | one big agent handling all rules in a single loop with the same tools | the experiment we removed (cost/recall) |
| `final` | i4 (+ any kept tweak) | the combination that worked |

## 3. Evaluation (EVAL.md has the exact definitions)

**Set:** 8 CUAD contracts (services / hosting / licence & maintenance, 2.7k–8.5k words, clean numbering) converted to `.docx` deterministically from the CUAD text (paragraph ids stable) + 4 synthetic vendor MSAs generated from a clean, playbook-compliant template with a **seeded injector** (known deviations; one *hard case* with a definition-based trap and a decoy clause).
**Gold:** CUAD lawyer-labelled spans for the categories our rules map to (objective, public) + human-confirmed deviation status per present clause (LLM-assisted labelling, every label confirmed by a human with legal exposure; recorded in `gold.json`) + exact synthetic gold.
**Metrics (macro-averaged):** primary **Issue-detection F1** (rule × clause match vs gold); **Deviation accuracy**; **Redline validity** (applies cleanly ∧ satisfies rule per deterministic checker or independent judge ∧ minimal); **Document integrity** (re-parse, untouched paragraphs identical, change count == accepted ops, LibreOffice opens); **Citation hallucination rate**; **cost / latency / tokens**; **human review load** (edits+rejects per finding in recorded sessions).
**Replay:** every model call is cached under `evals/cache/<config>/<contract>/…` keyed by request hash; `pnpm eval` reproduces all tables at zero cost; `pnpm eval --live` re-runs with keys. Judge outputs cached too.

## 4. Roles & harness (see `plans/02_orchestration_guide.md`)

| Role | Who | Effort | Scope |
|---|---|---|---|
| Lead | Fable 5 (this session) | — | plan, contracts, briefs, playbook, merges, gates, submission |
| Backend builders/reviewers | GPT-5.6 Sol via `codex exec` | xhigh (reviews max) | engine, agent, eval, scripts, API, tests |
| Frontend builders/reviewers | Opus 5 via Claude Agent SDK | xhigh | UI, motion, screenshots-driven polish |
| Phase-gate reviewer | Fable 5 Agent (`redline-critical-reviewer`) | high | end-of-phase adversarial verification |

Deterministic gates before any model review: `pnpm typecheck && pnpm lint && pnpm test`. Ports: lead 3000 · Opus builders 3101–3103 · reviewers 3201+. Agents never commit; the lead commits after gates.

## 5. Phases & timeline (IST)

| Phase | Window | Deliverable | Gate |
|---|---|---|---|
| **P0 Foundations** | Sat 23:00 → Sun 00:30 | plan, contracts (SCHEMA/PLAYBOOK/EVAL/STYLE/AGENTS), scaffold, briefs, playbook YAML | lead |
| **P1 Parallel build** | Sun 00:30 → 06:00 | S1 engine · S2 dataset+eval · S3 agent core+API · O1 design system+shell+review workspace (fixtures) | typecheck/test/lint + Sol/Opus reviews |
| **P2 Integration** | Sun 06:00 → 11:00 | first end-to-end run (upload → findings → approve → docx); UI on real API + SSE; b0/b1/i1 eval runs | Fable gate 1 |
| **P3 Iterate & measure** | Sun 11:00 → 19:00 | i2/i3/i4 + x-monolith runs; hard-case analysis; changelog entries with numbers; O2 evals dashboard + trajectory viewer + precedents page; human labelling confirmed | Fable gate 2 |
| **P4 Polish & deploy** | Sun 19:00 → Mon 01:00 | UI polish passes (reviewer loop), Vercel deploy, Blob store, samples, precedents seed, validation in LibreOffice, README/REPRODUCE/CHANGELOG drafts | Fable gate 3 |
| **P5 Submission** | Mon 01:00 → 14:00 | clean-env reproduction in Docker, trajectories export (app + coding agents), video (≤5 min), final docs, submission on HackerEarth | lead |
| **Buffer / stretch** | Mon 14:00 → 22:30 | round-2 counter-redline diff (stretch), fixes | submit by **Mon 21:00 IST** latest |

## 6. Submission package checklist (from the brief)

- [ ] Repo with README: intended user, bottleneck, value; **Improvement Changelog** (labelled) with an entry per iteration tied to `evals/results/*`; main failure mode; hot take; what existed before vs what we added; licences (CUAD CC-BY-4.0)
- [ ] REPRODUCE.md: clean-env setup, exact commands for solution / baseline / eval, data requirements, expected outputs, versions, runtime, cost
- [ ] ≤5-min video: problem → baseline → one realistic run start→finish → comparison → changelog (biggest win + removed experiment)
- [ ] Trajectories: representative app-agent trajectories (planner, drafters, verifier, assembler, baseline, judge) + coding-agent traces (Codex JSONL, Opus logs, Claude Code session) with secrets redacted
- [ ] Deployed demo (Vercel) with samples + replay mode
- [ ] No credentials in the repo; `.env.example` only

## 7. Risks & mitigations

| Risk | Mitigation |
|---|---|
| OOXML tracked changes subtly invalid | Engine round-trip tests; LibreOffice headless conversion in Docker as a validator; keep edits at run level with `w:delText`; fixtures from real docx |
| Long contracts blow context/latency | Planner + section-scoped reading; drafters only read relevant sections; parallel workers; SSE progress |
| LLM judge credibility | Different model family; fixed rubric; temp 0; cached; deterministic checkers first; human spot-check table |
| Vercel timeouts | `maxDuration=800`, streaming, per-rule parallelism; replay mode for the deployed demo |
| Scope creep | Round-2 negotiation diff is stretch-only; UI pages beyond the workspace are secondary to the eval + docx |
| Agents drift from contracts | Contracts written first; every brief points to them; reviewers check compliance; lead merges |

## 8. Hot-take candidates (choose the one the data supports)

1. "Address, don't paste": a clause-addressable document model beat every prompt change combined.
2. Validation at the tool boundary (reject non-verbatim anchors) removed hallucinated edits better than any instruction.
3. The verifier's real value was permission for the drafter to be aggressive.
4. Memory made the agent consistent — and consistently wrong when a precedent was wrong; memory needs provenance and expiry.
