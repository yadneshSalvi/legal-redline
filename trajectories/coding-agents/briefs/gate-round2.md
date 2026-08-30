# Brief: gate-round2 — adversarial review of the round-2 "measured improvement" claims   (Fable 5 reviewer · read-only · clean clone)

Round 2 (`plans/10_improvement_campaign.md`, `plans/campaign/preregistration.md`, `plans/campaign/*-log.md`) added a long-document tier,
judge v2 with per-element verdicts, three end-to-end metrics (complete redline rate, applied tracked-change yield, precedent adherence) and
new configs (`i5-elements`, `i6-longdoc`, `final-v2`). The submission now claims the baseline is weak on these and the final strong.
Your job is to try to break that claim the way a sceptical judge would, and to verify every number a reader will see.

## Verify (clean clone of the commit named in the lead's message; keys unset; replay only)
1. **Pre-registration integrity** — `plans/campaign/preregistration.md` SHA-256 equals the hash logged in `metrics-hard-log.md` before the
   first measured long-tier run; the tier rule reproduces the six `long-*` contracts (re-run the selector if there is a script; else recompute
   from `data/raw/cuad/CUADv1.json`); metric formulas in code match the registered text; the dev/holdout split and the *second* dev split used
   by the pipeline track (`plans/campaign/redline-quality-log.md`) are both disclosed in `IMPROVEMENT_CHANGELOG.md`.
2. **Fairness of the baseline** — `b1-prompt`'s prompt, context (whole contract), model, effort and apply path are unchanged from round 1
   (diff the prompt module and config against the round-1 tag/commit); on the long tier it received the whole document.
3. **Judge independence** — `src/eval/runner.ts` passes no `position.elements` to judge v2; judge v2 decomposes the prose positions itself;
   the same cached decomposition is used for every config; judge model is GPT-5.6, never the model under test.
4. **Gold hygiene** — long-tier `gold.json` files were not modified after the first pipeline run on them (git history + timestamps in the
   campaign log); CUAD-anchored share as reported; `ambiguous` items excluded by the matcher.
5. **Reproduction** — `pnpm eval --tier all` (all configs) replays with no cache miss and reproduces `evals/results/*.{short,long}.json` and
   `summary.md` byte-for-byte; `pnpm review data/contracts/long-<one>/contract.docx --config final-v4 --mode replay --accept-all` (replays from `evals/cache/i6-longdoc/<id>` at $0; a short contract replays from `evals/cache/i7-precise/<id>`) works with
   no keys and its output validates (`validate-docx --run`); typecheck/lint/test green.
6. **Numbers** — every figure in README §5, `IMPROVEMENT_CHANGELOG.md` §"Round 2", `docs/results.md`, the `/evals` dashboard (round-2 cards,
   tier switch) and the video cards (`plans/video/card-data.json`) equals `evals/results/changelog-data.json` to one decimal.
7. **Cherry-picking probes** — compute CRR/F1 for `i7-precise`/`final-v4` on the eight short contracts *outside* the dev split (americas, bnc, synth-12, synth-hardcase) vs the four inside; on the
   long tier compare the four biopharma agreements vs the two others; report both splits. If the headline survives only on the dev split,
   say so as a blocker. Sample 5 judge-v2 verdicts (3 baseline, 2 final-v4) and read the clauses: do you agree with "complete"/"not complete"?
8. **Representativeness** — state plainly whether the long tier's contract families fit a customer-side vendor-services playbook and how
   the docs disclose it.

## Report (FINAL message — exactly; also write it verbatim to plans/harness/reports/<stamp>-gate-round2.md)
```json
{ "verdict": "approve | approve-with-fixes | block",
  "required_fixes": [ { "n": 1, "where": "file:line", "what": "", "why": "evidence", "how": "" } ],
  "cherry_picking_probe": { "final_v2_short_dev_vs_holdout": "", "long_biopharma_vs_other": "", "judge_sample_agreement": "" },
  "numbers_verified": "", "evidence": [ "" ], "rubric_self_check": { "measured_improvement": "", "reproducibility": "" } }
```
Rules: no live model calls; modify nothing in the main checkout; kill only servers you start (use port 3230); under 3,000 characters in the
chat reply, full detail in the file.
