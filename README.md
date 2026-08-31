# Playbook Redliner

**An agentic first-pass contract review that hands in-house counsel a Word file with tracked changes they would sign.**

> Upload the vendor's `.docx`. The agent reads it the way a lawyer does — clause by clause against your playbook —
> drafts surgical redlines and margin comments, has an independent verifier check every one, remembers the language
> your team already approved, and waits for you to accept, edit or reject each finding before it writes a single
> tracked change into the document.

Entry for the **micro1 Frontier Engineering Challenge 2026 (Agentic Workflows Hackathon)**.
Live demo: **<https://playbook-redliner.vercel.app>** · Video: **[4 min 37 s, 1080p](https://github.com/yadneshSalvi/legal-redline/releases/download/v1.2/playbook-redliner.mp4)** (see §10) ·
Reproduction: [`REPRODUCE.md`](REPRODUCE.md) · Changelog with evidence: [`IMPROVEMENT_CHANGELOG.md`](IMPROVEMENT_CHANGELOG.md) ·
Trajectories: [`trajectories/`](trajectories/) · Full results: [`docs/results.md`](docs/results.md)

---

## 1. Who has this problem

**Customer-side in-house counsel and contracts managers** — the people who receive a vendor's paper (a master
services agreement, a SaaS subscription, a software licence and maintenance agreement, a hosting agreement) and
have to send it back marked up. Every mid-size company has one to three of them; every one of them has a queue.

## 2. The bottleneck

A first-pass review of 20–60 pages against the company **playbook** (the pre-agreed preferred / fallback /
walk-away positions on liability caps, indemnities, termination, renewals, IP, licence scope, audit rights,
assignment, governing law …) takes **one to three hours per contract**, and the deliverable is not an opinion —
it is a **Word document with tracked changes and comments** the vendor's lawyer can respond to. The work is
repetitive but unforgiving: the risky term is often hidden in a definition three sections away, the same clause
must be redlined consistently with what the team accepted last quarter, and a sloppy edit (a changed word in the
wrong place, a comment pointing at a section that does not exist) costs credibility in the negotiation.

The naive alternative — paste the contract into a chat assistant and ask for risks — produces a plausible list
in prose. It misses clauses in long documents, cites sections that don't exist, cannot write into the `.docx`,
and forgets everything between contracts. Counsel still has to do the actual work.

## 3. What Playbook Redliner does

```
.docx ─▶ ingest ─▶ planner ─▶ 18 drafter workers (one per playbook rule, tools + validated anchors)
                                   │
                                   ▼
                    independent verifier (fresh context, deterministic checks, repair loop)
                                   │
                                   ▼
        assembler + memo ─▶ YOU: accept / edit / reject every finding ─▶ tracked changes + comments in Word
                                                     │
                                                     └─▶ approved language becomes precedent for the next contract
```

- **Reads like a lawyer.** The document becomes a clause-addressable model (paragraph ids, section tree,
  definitions). Workers read sections and resolve defined terms instead of skimming a wall of text.
- **Edits like a lawyer.** Redlines are minimal, word-level tracked changes (`w:ins` / `w:del`) with a margin
  comment that cites the playbook position — real OOXML, opened in Word or LibreOffice, nothing else in the
  document is touched (verified by re-parsing the output).
- **Checks its own work.** A `propose_redline` tool rejects any edit whose anchor text is not verbatim in the
  paragraph; an independent verifier that never sees the drafter's reasoning judges every proposal against the
  rule and sends failures back for repair. What still fails is escalated to you, not silently applied.
- **Remembers.** Accepted redlines are stored as precedents keyed by rule; drafters retrieve them so the third
  liability cap this month is worded like the first two.
- **Keeps you in charge.** Nothing is written into the document until you decide. Keyboard-first review,
  live agent progress, full trajectory of every model call and tool result.

## 4. What existed before, what we added

| Existed before | Added during the hackathon (everything in this repo) |
|---|---|
| CUAD dataset (The Atticus Project, CC-BY-4.0) — 510 lawyer-labelled contracts | Contract selection, text canonicalisation, gold construction and human labelling protocol (`data/contracts/`) |
| Anthropic / OpenAI SDKs, Next.js, `diff`, `jszip`, `@xmldom/xmldom` | OOXML engine (`src/engine`), agent pipeline (`src/agent`), evaluation harness (`src/eval`), UI (`app/`, `src/ui`), playbook (`data/playbooks`) |
| An orchestration harness pattern from a previous project (`plans/harness`, adapted) | Every brief, review and trajectory of the coding agents used to build this (`trajectories/coding-agents/`) |

## 5. Results (headline)

Two rounds of measurement, one fair baseline throughout: the same model (Claude Opus 5) with the same playbook and the
whole contract in one prompt. Every number replays from the committed cache at zero cost (`pnpm eval --all --tier all`).

**Round 2 — pre-registered, independent judge v2.** Short tier = the 12 contracts of round 1 (3–8k words); long tier =
6 CUAD agreements of 37–45k words chosen by a written rule before any result; gold anchored on CUAD's lawyer-labelled
spans. Metrics are end-to-end: a redline counts only when it applies to the `.docx`, meets **every element** of the
playbook position, is minimal and preserves intent (see [`EVAL.md`](EVAL.md) §9).

| Metric | Baseline | Round-1 final | **Final v4 (shipped)** | Change vs baseline |
|---|---:|---:|---:|---|
| Complete redline rate, short tier | 1.1 % (20.0 % if its whole-clause replacements are exempted from the minimality gate¹) | 10.5 % | 54.7 % (47.6 % on the 8 holdout contracts) | +53.7 pp (+27.6 pp on the format-neutral holdout comparison) |
| Complete redline rate, long tier | 0 % | 0 % | 22.9 % | +22.9 pp |
| Long-document F1 / recall (macro) | 60.3 % / 45.0 % | 58.8 % / 43.7 % | 75.3 % / 68.6 % | +15.1 pp F1 / +23.6 pp recall |
| Applied tracked-change yield, long tier | 41.7 % | 45.8 % | 62.5 % | +20.8 pp |
| Redline validity (judge v2), short tier | 42.7 % | 44.8 % | 74.2 % | +31.5 pp |
| Minimal edits (judge v2), short tier | 3.7 % | 13.8 % | 59.6 % | +55.9 pp |
| Findings the system could not place (escalations), short / long | 12 / 11 | 0 / 3 | 0 / 5 | — |
| Cost per contract, short / long | $0.35 / $0.79 | $3.51 / $5.73 | $5.14 / $11.11 | — |

`final-v4` is a length router over the two configurations that measured best on each tier — `i7-precise` below 15,000
words, `i6-longdoc` above — chosen from the ladder after the results, which we say plainly. Three more things a reader
should know before the number: (1) the short-tier iteration was developed on four contracts (`americas`, `bnc`,
`synth-12`, `synth-hardcase`) and run once on the other eight: **47.6 % on those eight is the figure we stand behind**;
its 68.8 % on the four dev contracts is a per-contract pick between two recordings of the same prompts — a single clean
run scores 53.1 % there (49.5 % pooled) — so the dev figure is inflated by selection, not just by tuning. (2) The
pre-registration set the success criterion at ≥ 70 % holdout CRR; that criterion **failed** (47.6 %), and the pipeline's
dev split is not the pre-registered one (americas, merit, sparkling, kubient), on which `i7` scores 54.5 % dev vs 54.8 %
holdout. (3) ¹ The baseline can only express an inserted clause as a whole-paragraph replacement, which the minimality
gate rejects; 18 of its proposals pass every judge criterion and fail only that gate, so its format-neutral CRR is 20.0 %
(19.0 % on the holdout) against `final-v4`'s 54.7 % / 47.6 %. Memory (precedent adherence) stayed ≈ 0 on independent
contracts, and a builder-side judge that was shown the pipeline's own checklist had reported 86 % where the independent
judge reports a third of that; both are in the changelog. The last configuration we built (`final-v3`: i7 +
long-document planner + memory) regressed on long documents and is reported, not shipped.

**Round 1 — issue detection, 12 short contracts, judge v1** (retained; this is where a one-prompt baseline is already
strong):

| Metric | Baseline | Round-1 final | Change |
|---|---:|---:|---|
| Issue-detection F1 (macro) | 91.5 % | 94.8 % | +3.3 pp (inside run-to-run variance, ≈ 1.2 pp) |
| Recall / precision | 87.1 % / 98.0 % | 92.3 % / 97.7 % | +5.2 pp recall at the same precision |
| Deviation-status accuracy | 77.6 % | 86.8 % | +9.2 pp |
| Redline validity (judge v1) / minimal edits | 42.7 % / 11.0 % | 50.6 % / 35.6 % | +7.9 pp / +24.6 pp |
| Document integrity (untouched paragraphs identical; LibreOffice round-trip) | n/a — no `.docx` output | 12/12 | — |
| Output | JSON + replacement strings | `.docx` with tracked changes + comments, issues memo | — |

Why round 2 exists, what each iteration bought, the one that was removed, the calibration pass, the pre-registration,
the hard case and the main failure mode: [`IMPROVEMENT_CHANGELOG.md`](IMPROVEMENT_CHANGELOG.md). Full tables:
[`evals/results/summary.md`](evals/results/summary.md) · interactive: `/evals` on the live demo (tier switch).

## 6. Repository map

```
app/            Next.js 16 UI + route handlers (SSE progress, apply, precedents, evals)
src/engine/     pure-TS OOXML: parse .docx → DocumentModel; tracked changes + comments writer; validation
src/agent/      llm client (live/record/replay), planner, drafters + tools, verifier, assembler, memory, baselines, configs
src/eval/       datasets (CUAD + seeded synthetic), gold, matching, metrics, independent judge, runner, report
data/           playbooks · contracts (eval set + gold) · precedents seed · templates
evals/          cache (committed model outputs → zero-cost replay) · results · runs
trajectories/   representative app-agent trajectories + coding-agent traces
scripts/        CLIs: review, baseline, eval, report, build-dataset, synth, validate-docx, export-trajectories
```

Contracts that govern the code: [`AGENTS.md`](AGENTS.md) · [`SCHEMA.md`](SCHEMA.md) · [`PLAYBOOK.md`](PLAYBOOK.md) ·
[`EVAL.md`](EVAL.md) · [`STYLE.md`](STYLE.md).

## 7. Main failure mode and hot take

**Failure mode — the redline is still only half right, and long documents are the hard half.** On short contracts the
shipped pipeline completes 55 % of the gold redlines (48 % on the eight contracts it was not tuned on); on 40k-word
agreements it now *finds* most issues (recall 69 % vs the baseline's 45 %) but completes only 23 % of the redlines — the
paginated workers draft repairs that are broad, incomplete or not minimal, and the precise protocol that fixed this on
short contracts did not transfer (our last configuration, `final-v3`, lost long-document recall instead and is reported,
not shipped). Precedent memory measured as a non-result in both rounds. The next fix is a long-document repair loop with
the same single-level, prose-mirrored discipline as `i7`, measured on gold we do not tune against. Details, dev/holdout
splits and the judge comparison: [`IMPROVEMENT_CHANGELOG.md`](IMPROVEMENT_CHANGELOG.md).

**Hot take.** Give a specialist agent one rule and it will find a violation; give it a *direction* instead of a
*checklist* and it will write half a redline. The two largest quality jumps in this project came from writing the
playbook more precisely — classification semantics in round 1, atomic elements that mirror the prose in round 2 — not
from any model, tool or extra agent. Never let the grader use the student's rubric (ours inflated completeness 2.5×),
and before you believe a one-point gain, record the same configuration twice.

## 8. Tools disclosure

Built with coding agents: GPT-5.6 Sol via the Codex CLI (engine, agent core, evaluation, reviews), Claude Opus 5 via the
Claude Agent SDK (UI), orchestrated by Claude Fable 5 in Claude Code (planning, contracts, briefs, merges, gates). Their
trajectories are in `trajectories/coding-agents/`. The product itself runs Claude Opus 5 (drafter, verifier, planner, memo)
and GPT-5.6 Sol (independent evaluation judge and gold-label drafting).

## 9. Licences and data

Code: MIT. Evaluation contracts: CUAD v1 © The Atticus Project, CC BY 4.0 (public SEC filings). Synthetic contracts and
the playbook: original, MIT. No private or personal data is used anywhere.

## 10. Video

4 minutes 37 seconds, 1080p, every on-screen event timed to word-level Deepgram timestamps: one genuine end-to-end run on a
CUAD hosting agreement, keyboard review with real tracked changes, export, the hard case's trajectory, and the round-2
evaluation ladder — **[playbook-redliner.mp4](https://github.com/yadneshSalvi/legal-redline/releases/download/v1.2/playbook-redliner.mp4)** (GitHub release [`v1.2`](https://github.com/yadneshSalvi/legal-redline/releases/tag/v1.2), 55 MB, H.264). Earlier cuts: `v1.1`
(round-2 first cut), `v1.0` (round-1). Music: "Perspectives" by Kevin MacLeod (incompetech.com), CC BY 4.0. Script and
production pipeline: [`plans/07_video.md`](plans/07_video.md), [`plans/video/`](plans/video/).
