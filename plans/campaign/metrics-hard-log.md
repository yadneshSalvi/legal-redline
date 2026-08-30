# Metrics-hard iteration log

Entries are append-only. “Number” is a deterministic check or a measured result; live runs must be followed
by a replay check before the next iteration.

## Iteration 0 — population audit and pre-registration freeze

- **Hypothesis:** a title-family, length, paragraph, and parse rule will yield at least six reproducible long
  CUAD contracts without lowering the 15,000-word threshold.
- **Changed:** fetched the ignored public CUAD archive; enumerated candidates through the existing CUAD
  canonicaliser and engine parser; wrote the pre-registration before any new-tier system or judge run.
- **Number:** 31 eligible contracts at 15,000 words; selected six contain 37,789–45,074 words and 679–1,597
  paragraphs.
- **Freeze evidence:** `plans/campaign/preregistration.md` SHA-256
  `88109e8c0401b04d083708f19b34ac5e3719156d8eaef9dde6e36cf507d64230`, computed 2026-08-30 09:00 IST.
- **Decision:** keep. The 12,000-word fallback is not used.

## Iteration 1 — long-tier construction and gold

- **Hypothesis:** rule-complete assisted gold can retain every CUAD expert anchor while isolating genuinely
  uncertain/redacted provisions as ambiguous.
- **Changed:** built six deterministic `long-*` text/DOCX/meta/source-gold folders without rewriting an
  existing DOCX; drafted labels with GPT-5.6 Sol; replay-checked each labelling cache; audited and promoted gold.
- **Number:** 121 items across all 18 rules per contract: 44 deviation, 4 missing, 58 compliant, 15 ambiguous;
  80 items (66.1%) carry CUAD evidence and all 294 source spans are retained. One empty-anchor T4C status was
  corrected from deviation to missing before any system run.
- **Decision:** keep. Author legal-exposure spot-check remains pending and is disclosed in `LABELING.md`.

## Iteration 2 — judge-v2 and registered metric implementation

- **Hypothesis:** additive per-element judging and gold-denominator metrics can be introduced without changing
  legacy result files or any model-under-test prompt/config.
- **Changed:** added judge v2 with explicit-or-cached element decomposition; CRR, system-output tracked-change
  yield, and deterministic precedent Jaccard; tier routing/artifacts/report data; deterministic tests.
- **Number:** 37/37 eval tests and 135/135 full tests pass; typecheck and lint pass. Legacy runs still select
  only the 12 short contracts and write `<config>.json`; tiered runs write `<config>.<tier>.json`.
- **Decision:** keep and proceed to the first measured model/judge run.

## Iteration 3 — live judge-v2 smoke

- **Hypothesis:** the cached round-1 baseline can be scored end-to-end with judge v2 and its own naive
  tracked-change output, then reproduced without an API call.
- **Changed:** scored `b1-prompt` on `synth-12`; after observing sequential judge latency, bounded independent
  judge calls to four per contract without changing prompts or metric semantics.
- **Number:** F1/recall 100%, CRR 0/9 (0%), yield 9/9 (100%), adherence 2/9 (22.2%), cost $0.271087.
  The exact replay completed in 5.1 seconds with all nine judge verdicts read from cache.
- **Decision:** keep bounded judge concurrency. The 100% yield and 0% CRR are contrary to the respective point
  predictions in opposite directions and will be reported; this is a one-contract smoke, not the tier estimate.

## Iteration 4 — full short-tier baseline

- **Hypothesis:** pooled judge-v2 CRR will keep the fair baseline below 50% even though most detected edits can
  be written as tracked changes.
- **Changed:** scored all 12 frozen short contracts live with judge v2; immediately replayed all 82 verdicts.
- **Number:** macro F1 91.5%, micro recall 86.3%, CRR 1/95 (1.1%), yield 82/95 (86.3%), adherence 2/82
  (2.4%), proposal minimality 3/82 (3.7%), model-under-test cost $4.1912255. Replay completed in 23.9 seconds.
- **Decision:** keep. Baseline weakness is substantially stronger than predicted for CRR/adherence, while yield
  is 21.3 points above its point prediction; report both rather than changing thresholds.

## Iteration 5 — full short-tier verifier

- **Hypothesis:** independent verifier/repair raises end-to-end completeness over baseline while preserving
  detection and tracked-change integrity.
- **Changed:** scored the frozen `i3-verifier` round-1 cache on all 12 short contracts with judge v2 and replayed it.
- **Number:** macro F1 94.5%, micro recall 93.7%, CRR 11/95 (11.6%), yield 84/95 (88.4%), adherence 4/89
  (4.5%), proposal minimality 14/89 (15.7%), model-under-test cost $47.97329875. Replay completed in 52.6 seconds.
- **Decision:** keep. CRR improves 10.5 points over baseline but remains far below the 70% engineering target.

## Iteration 6 — full short-tier current final

- **Hypothesis:** the frozen round-1 `final` will beat baseline CRR by at least the pre-registered 10-point
  substantive threshold.
- **Changed:** scored all 12 short contracts with judge v2 and replayed all verdicts.
- **Number:** macro F1 94.8%, micro recall 91.6%, CRR 10/95 (10.5%), yield 82/95 (86.3%), adherence 6/87
  (6.9%), proposal minimality 12/87 (13.8%), model-under-test cost $42.146808. Replay completed in 56.4 seconds.
- **Decision:** keep the negative result. The 9.5-point CRR gain over baseline misses the registered 10-point
  substantive threshold, and `i3-verifier` is one passing item better than current `final`.

## Iteration 7 — full long-tier baseline

- **Hypothesis:** the deterministic long tier is materially harder for the one-prompt baseline than the frozen
  short tier, with long-tier F1 near the registered 65% point prediction.
- **Changed:** recorded `b1-prompt` on all six long contracts, replay-checked the five-contract batch and then
  replayed the complete tier from cache.
- **Number:** macro F1 60.3%, micro recall 45.8%, CRR 0/48 (0%), yield 20/48 (41.7%), adherence 0/20 (0%),
  proposal minimality 0/20 (0%), model-under-test cost $4.7510125. The complete replay finished in 21.2 seconds.
- **Decision:** keep. Long-tier macro F1 is 31.2 points below short and 4.7 points below the registered point
  prediction; the result strengthens the registered workload-difficulty claim without changing the tier.

## Iteration 8 — full long-tier current final

- **Hypothesis:** the frozen round-1 `final` pipeline will retain enough benefit on long contracts to approach
  the registered 80% F1 / 78% recall predictions and beat the one-prompt baseline.
- **Changed:** recorded the six long contracts as three isolated two-contract batches, replay-checked every
  batch, then replayed and aggregated the complete tier without live calls.
- **Number:** macro F1 58.8%, micro recall 47.9%, CRR 0/48 (0%), yield 22/48 (45.8%), adherence 1/23
  (4.3%), proposal minimality 0/23 (0%), model-under-test cost $34.38350175. The full-tier replay completed
  in 65.4 seconds.
- **Decision:** keep the falsifying result. Final is 1.5 macro-F1 points below baseline (while pooled recall is
  2.1 points higher), CRR does not improve, and every registered final-long quality prediction is missed.

## Iteration 9 — reproducibility and release gate

- **Hypothesis:** every required baseline tier and judge result can replay without a live call, while legacy
  round-1 result and trajectory artifacts remain frozen.
- **Changed:** regenerated the additive tier report data; ran the exact all-tier replay; removed only
  replay-order/duration churn from tracked short-tier trajectories while retaining all new long trajectories.
- **Number:** `pnpm eval --tier all` completed in 44.2 seconds from cache (short F1 91.5%, long F1 60.3%);
  `pnpm typecheck && pnpm lint && pnpm test` passed with 34 files / 135 tests. Pre-registration SHA-256 remains
  `88109e8c0401b04d083708f19b34ac5e3719156d8eaef9dde6e36cf507d64230`; secret-pattern scan found no key.
- **Decision:** keep. The workspace is ready for reviewer inspection; no commit or push was made.

## Iteration 10 — gold-provenance correction

- **Hypothesis:** machine-readable provenance should distinguish evaluation-scientist review from human legal
  confirmation without changing any registered label or metric.
- **Changed:** replaced misleading `human` / `cuad+human` values on the six long files with explicit
  `agent-reviewed` / `cuad+agent-reviewed` values; promotion now requires `--allow-agent-review` and logs the
  labeler modes. No status, rule, paragraph anchor, note, expected fix, or split membership changed.
- **Number:** 41 agent-reviewed and 80 CUAD+agent-reviewed items; totals remain 121 items, 48 scored positives,
  15 ambiguous, 80 anchored, and 13 CUAD-anchored distinct clauses. Draft and promoted files are identical.
- **Decision:** keep. A human legal-exposure spot-check remains pending and is no longer overstated in metadata.

## Iteration 11 — full long-tier verifier matrix cell

- **Hypothesis:** scoring the frozen `i3-verifier` on long documents completes the literal config-by-tier matrix
  without tuning, even though no point prediction was registered for that cell.
- **Changed:** because no long i3 cache existed, recorded the six contracts in three isolated two-contract
  batches, replay-checked each, then replayed and aggregated the complete tier.
- **Number:** macro F1 57.2%, micro recall 45.8%, CRR 0/48 (0%), yield 22/48 (45.8%), adherence 0/22 (0%),
  proposal minimality 1/22 (4.5%), model-under-test cost $33.9354755. The full replay finished in 53.4 seconds.
- **Decision:** keep and disclose the unpredicted extension. It does not rescue the architecture story: long-tier
  CRR remains zero and detection is 1.6 F1 points below current `final`.

## Iteration 12 — final reproducibility audit

- **Hypothesis:** the complete six-cell report and corrected gold provenance replay on final code without
  changing any frozen round-1 artifact.
- **Changed:** extracted cache-stat reconstruction to keep `runner.ts` under the repository line limit,
  regenerated the six-row report, and removed only generated short-trajectory ordering/timing churn.
- **Number:** the exact `pnpm eval --tier all` command passed from cache on the final code (short F1 91.5%,
  long F1 60.3%); all tracked round-1 trajectories and legacy result JSON files remain unchanged. Final
  typecheck, lint, and 34-file / 135-test suite pass.
- **Decision:** keep. No live cache miss, secret pattern, commit, or push remains in the release path.

## Iteration 13 — immutable replay artifacts

- **Hypothesis:** a cache replay should not rewrite a previously recorded trajectory merely because concurrent
  events complete in a different order or local integrity checks take a different duration.
- **Changed:** replay now preserves existing run artifacts when a recorded `stats.json` is present; added a
  deterministic runner regression assertion.
- **Number:** the exact all-tier replay again produced short F1 91.5% / long F1 60.3%, exited successfully,
  and left zero tracked trajectory diffs. Final typecheck, lint, and 34-file / 135-test suite pass.
- **Decision:** keep. Replay is now both zero-cost and working-tree stable.
