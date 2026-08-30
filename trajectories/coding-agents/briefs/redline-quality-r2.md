# Brief: redline-quality r2 — close the gap to the OFFICIAL judge (CRR ≥ 60 %, stretch 70 %)   (GPT-5.6 Sol · effort max · goal loop · isolated worktree)

Worktree `~/code/hackathons/legal-redline-wt/redline-quality-r2` (branch `wt/redline-quality-r2`, `.env` copied, deps installed).
Read `AGENTS.md`, `plans/10_improvement_campaign.md`, `plans/campaign/preregistration.md`, `plans/campaign/redline-quality-log.md` (the r1 track's
log), `src/eval/judge.ts` (judge v2), `src/eval/runner.ts` (how CRR is computed), `src/agent/element-*.ts`, `src/agent/prompts/element-*.ts`,
`data/playbooks/customer-vendor-services.yaml` (`position.elements`).

## What happened
The r1 track reached CRR-dev 86 % with a *development* judge that was shown the pipeline's own `position.elements`. The official judge v2
(pre-registered) decomposes the prose positions **itself**, never sees the pipeline's checklist, and is strict: on the short tier the official
numbers are baseline 1.1 % → round-1 final 10.5 % → `i5-elements` **32.6 %** (31/95), with F1 91.4 % (5 escalations, hard case 0/2) and $10.32
per contract. `final-v2`'s official numbers arrive from the campaign running in the main checkout (`evals/results/final-v2.short.json`, expected
by ~14:30); read them when they exist. Of 89 `i5` verdicts: 54 satisfy a level; 31 are **not minimal**; 21 fail the rule, spread over exact-wording
elements the judge derives from the prose — data return (standard machine-readable format · within 30 days · delete · certify deletion),
transition assistance at then-current rates, IP deliverable rights (worldwide · modify · sublicense) and Vendor retaining pre-existing IP/tools/
know-how, governing law + forum as a *permitted pair*, warranty (professional · workmanlike · documentation conformance · 90-day period), renewal
(automatic · 30-day opt-out · Vendor reminder), price increase cap 5 %, and the fallback cap "equal to 12 months' fees" (a greater-of cap
satisfies neither level when one preferred nuance — "12 months preceding the *claim*" — is missed). Minimality failures: extra words beyond
the element, re-conditioning a whole compound sentence ("upon Customer's request …"), broad new exceptions, whole-clause rewrites.

## Goal (loop until met or the 6-hour timeout nears — then report)
New configs `i7-precise` and `final-v3` (never edit `i5-elements`, `i6-longdoc`, `final-v2` or their prompt modules — their caches are being
recorded right now). On the four gold dev contracts (`cuad-americas-shopping-mall-hosting`, `cuad-bnc-mortgage-hosting`, `synth-12`,
`synth-hardcase`), measured with the **official** runner and judge:
`pnpm eval --config i7-precise --tier short --contracts cuad-americas-shopping-mall-hosting,cuad-bnc-mortgage-hosting,synth-12,synth-hardcase --allow-live`
(model live on misses, judge v2 cache-first then live; results in `evals/results/i7-precise.short.json` — read `completeRedline`,
`detection.macro`, `minimality`, `resources`):
- **CRR ≥ 60 %** of gold positives on the dev split (stretch 70 %); report it per contract.
- Detection F1 per contract not below `final`'s (88.0 / 94.1 / 94.1 / 100) beyond −1.5 pp; escalations 0; hard case 2/2.
- Cost ≤ $7 per short contract; long-document path (`i6`) preserved in `final-v3`; measure `final-v3` once on the two `cuad-long-*` dev
  contracts with `scripts/crr-dev.ts` adapted to call the official judge v2 (per-finding CRR, gold-less).

## Levers (measure each; keep what works; log it)
1. **Mirror the prose.** Rewrite `position.elements` so each element is one atomic noun phrase lifted from the prose position in the same
   words (the official judge decomposes the same prose; matching its granularity is the point). Keep it additive; never change the prose.
2. **Commit to one level.** The drafter picks preferred or fallback per finding and must satisfy *every* element of that level — no hybrids;
   quote the position's wording verbatim in the redline where it is operative language ("fees paid or payable in the 12 months preceding
   the claim", "equal to 12 months' fees").
3. **Minimality by construction.** Edit the smallest span that carries the element; never re-condition an existing sentence; one `replace`
   per element cluster; `insert_after` for absent clauses with the shortest clause that carries every element of the chosen level; a
   deterministic pre-submit check that the changed-character ratio is ≤ 1.5 and that no untouched sentence changed meaning (diff by sentence).
4. **Verifier = judge-shaped.** The element verifier evaluates the *same* decomposition style: read the prose position, list atomic elements
   itself (do not pass the playbook list to it), verdict per element with a quote, minimality with the judge's definition; repair feeds the
   unmet elements and the offending extra words back verbatim; ≤ 3 rounds.
5. **Detection guard.** Keep the round-1 planner/worker detection path untouched in the element worker (the element step comes after the
   finding is established) — `i5` lost recall and the hard case; find out why from its trajectories (`evals/runs/i5-elements/synth-hardcase/`)
   and fix it.
6. **Cost.** Effort "high" for the drafter, "medium" for element checks where a regex already proves the element; cap tool turns.

## Loop protocol
`plans/campaign/redline-quality-r2-log.md`: hypothesis → change → official dev numbers (CRR per contract, F1, escalations, $) → keep/revert.
Read `evals/results/final-v2.short.json` when it appears and include its dev-contract CRR as iteration 0. At T-45 min stop and report.

## Rules
Worktree only; every LLM call via `src/agent/llm.ts`; no changes to `src/eval/judge.ts`, `src/eval/runner.ts`, the metrics, the gold, or any
existing config/prompt module; new modules + new config ids only; tests for pure pieces; `pnpm typecheck && pnpm lint && pnpm test` green;
no git commit/push; no secrets in logs; ports 3101–3103.

## Report (FINAL message — exactly)
```
## Summary
## Configs                 (ids, what each adds, prompt modules)
## Official dev numbers    (iteration table; final per-contract CRR / F1 / escalations / $; final-v3 long dev per-finding CRR)
## What closed the gap     (which lever, with before/after element-miss and minimality counts)
## Files
## Known gaps / risks
```
