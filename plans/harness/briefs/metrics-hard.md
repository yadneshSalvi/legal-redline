# Brief: metrics-hard — a harder, pre-registered evaluation where the fair baseline is genuinely weak   (GPT-5.6 Sol · effort max · goal loop · isolated worktree)

You are a senior engineer + evaluation scientist on **Playbook Redliner** (read `AGENTS.md`, `EVAL.md`, `SCHEMA.md`, `PLAYBOOK.md`,
`plans/10_improvement_campaign.md` — the campaign rules there are binding). You work in the worktree
`/Users/yadneshsalvi/code/hackathons/legal-redline-wt/metrics-hard` (branch `wt/metrics-hard`, `.env` copied, `pnpm install --frozen-lockfile` done).
Another agent works in parallel on the pipeline (`wt/redline-quality`); you do **not** change agent prompts, tools, configs or playbook prose.

## The problem you are solving
Round 1 measured issue-detection F1 on 12 contracts of 3–8k words; the one-prompt baseline scores 91.5 % and the final pipeline 94.8 % — a gap
inside run-to-run variance. Yet the judge data shows the real gap: of judged redlines, only 40 % of the baseline's (and 38 % of the final's) are
complete ∧ minimal ∧ intent-preserving; the baseline cannot write a `.docx`; and no contract in the set is long. Your job: build the evaluation
that measures what the product is for, on inputs that look like the real workload, with the fair baseline kept fair — and produce the baseline
numbers. The engineering target for the other track is CRR ≥ 70 %; your target is a measurement a sceptical reviewer signs off on.

## Goal (loop until all are met, or the 7-hour timeout is near — then write the report)
1. **Pre-registration** (`plans/campaign/preregistration.md`, committed in your branch before any pipeline run on the new tier): exact metric
   definitions with formulas and denominators, tier rules, the dev/holdout split (dev = 4 round-1 contracts + 2 long-tier contracts, named by
   rule, e.g. shortest two of the tier), predictions for baseline and final, and what would falsify the story.
2. **Long-document tier** `data/contracts/long-*/` from `data/raw/cuad/CUADv1.json`: rule = titles whose CUAD category / filename family is one of
   {hosting, license, services, maintenance, outsourcing, development, SaaS/subscription, master agreement} ∧ canonicalised text ≥ 15,000 words ∧
   parses into ≥ 150 paragraphs with a section tree ∧ not already in the set; sort by length descending and take the first **6** that meet the
   rule (if fewer, lower the threshold to 12,000 and say so). Reuse `src/eval/cuad.ts` canonicalisation and `pnpm build-dataset` conventions
   (`contract.txt`, `contract.docx` via the engine's `textToDocx`, `meta.json` with parties, `gold.json`). **Never regenerate existing
   contracts' docx.**
3. **Gold** for the tier per `data/contracts/LABELING.md`: draft with `scripts/label-assist.ts` (GPT-5.6, never the model under test), anchor
   each item to CUAD's expert span for the rule's `cuad` categories where one exists (paragraph ids via `normalizeForMatch` overlap), status
   `ambiguous` where the span and the draft disagree or the clause is genuinely unclear, gold notes with the reason. One item per rule per
   contract, plus a second where CUAD labels two distinct clauses. Write `data/contracts/LABELING.md` §"Long tier" with the protocol and counts.
4. **Judge v2** (`src/eval/judge.ts`, new cache namespace `evals/cache/judge-v2/`, keep v1 intact): per-element verdicts. Input adds the
   position's elements — from `rule.position.elements` when the playbook has them (the other track may add that field; read it if present),
   otherwise the judge decomposes the preferred and fallback positions into atomic elements itself (deterministic given the cached output).
   Output: `{ elements: [{ element, level: "preferred"|"fallback", met: boolean, evidence }], satisfies_preferred, satisfies_fallback,
   minimal, preserves_intent, drafting_quality, reason }`. Structured outputs, `reasoning: { effort: "high" }`, zero-cost replay.
5. **Metrics** (`src/eval/metrics.ts` + `types`): **CRR** (complete redline rate: gold deviation/missing items → redline applies ∧ checks ∧ all
   elements of preferred *or* all of fallback met ∧ minimal ∧ intent), **applied tracked-change yield** (gold deviation/missing items → a valid
   tracked change in that system's own output document: baseline = its naive apply; pipeline = `applyRedlines` with accept-all; integrity via
   the existing LibreOffice/round-trip path), **long-document recall/F1** (existing detection metrics, reported per tier), **precedent
   adherence** (seed a precedent bank for ≥ 6 rules from `data/precedents/seed.json`; a redline for those rules "adheres" when judge v2 says
   consistent-with-precedent or normalised token Jaccard ≥ 0.6 — define one and stick to it), plus every round-1 metric unchanged.
6. **Runner / report / data**: `pnpm eval --tier {short|long|all}` (tier = folder prefix rule: `cuad-*`/`synth-*` = short, `long-*` = long),
   results per tier `evals/results/<config>.<tier>.json` (round-1 files untouched), `summary.md` with a tier section, `changelog-data.json`
   gains `tiers[]` and the new metrics per config per tier (keep the round-1 shape for what exists so `/evals` keeps working). Tests in
   `tests/eval/` for the new matcher/metric code (fixtures, deterministic).
7. **Baseline numbers, live** (keys are in `.env`; Claude Opus 5 via `src/agent/llm.ts` only): `b1-prompt` on the long tier (record mode
   into `evals/cache/b1-prompt/<long-id>/`), judge v2 on both tiers for `b1-prompt`, `i3-verifier` and `final` round-1 runs (replay the
   pipeline from the existing caches; judge live → cached), and `final` on the long tier (record). Then the table: config × tier × {F1,
   recall, CRR, yield, adherence, minimality, $}. If a number contradicts the pre-registered prediction, report it as is.
8. `pnpm typecheck && pnpm lint && pnpm test` green; `pnpm eval --tier all` replays at zero cost from your caches.

## Loop protocol
Keep `plans/campaign/metrics-hard-log.md`: one entry per iteration — hypothesis, what you changed, the number, keep/revert. Prefer
small, checked steps; after each live run, verify the replay of it hits the cache before moving on. Budget is not a constraint; time is:
check the clock, and at T-45 min stop and write the report even if a goal is unmet.

## Rules
Worktree only; no edits to `src/agent/**` prompts/tools/configs or playbook prose; no `pnpm add` without saying why in the report; atomic writes;
no git commit/push (the lead merges); keep secrets out of logs; ports 3101–3103 if you need the app. LibreOffice:
`/Applications/LibreOffice.app/Contents/MacOS/soffice` (headless, isolated profile).

## Report (FINAL message — exactly this structure)
```
## Summary
## Pre-registration        (path, what was fixed before measuring)
## Long tier               (the rule, the 6 contracts with word counts, gold counts by status, CUAD-anchored share)
## Judge v2 + metrics      (definitions in one line each, cache namespaces)
## Numbers                 (config × tier table; baseline vs final round 1; predictions vs outcome)
## Files                   (created / changed)
## Known gaps / risks      (incl. anything a reviewer could call cherry-picking, and how it is disclosed)
```
