# Improvement campaign — "measured improvement" round 2 (2026-08-30 → 08-31)

## Why
The first ladder measures issue-detection F1, and a frontier model with the playbook in one prompt already detects
91.5 % — the headline gain (+3.3 pp) is small and inside a reviewer's suspicion band. The *product* gap is elsewhere
and the current numbers show it honestly: of the redlines the independent judge assessed, only **40 % of the
baseline's** are complete, minimal and intent-preserving — and only **38 % of the final pipeline's**. Detection is
saturated on 3–8k-word contracts; the redline is not solved; and long documents (20–60k words, the real in-house
workload) are not in the evaluation set at all.

## Goal (what "much better than baseline" must mean)
Pre-registered, product-relevant metrics on which the fair baseline is genuinely weak (≤ 50 %) and the final
pipeline is genuinely strong (≥ 70 %), measured identically for both, on tiers defined by a rule written down
before any pipeline run on them. Candidates (Track A pre-registers the exact definitions):

1. **Complete redline rate (CRR)** — of gold deviation/missing items: the system produced a redline that applies to
   the `.docx`, passes deterministic checks, meets **every element** of the preferred-or-fallback position (judge
   gives per-element verdicts), is minimal and preserves intent. End-to-end: recall × quality.
2. **Long-document recall / F1** — detection on a tier of ≥ 15k-word CUAD contracts of the playbook's contract
   families, chosen by a written rule, with gold anchored on CUAD's lawyer-labelled spans.
3. **Applied tracked-change yield** — of gold deviation/missing items, the share that ends up as a valid tracked
   change in an output document (applies ∧ integrity ∧ judge), using each system's own apply path.
4. **Precedent adherence** (secondary) — with a seeded precedent bank, redlines for those rules reuse the approved
   language (judge "consistent" or token overlap ≥ 0.6).

## Rules of evidence (non-negotiable — the gate reviewer checks them)
- The baseline stays the fair baseline: same model (Claude Opus 5), same playbook, the whole contract, one direct
  prompt, its own naive apply. It is never weakened; if a long contract fits the context window it gets all of it.
- Tiers are defined by a rule (families × length × parse-cleanly, sorted, take the first N) **before** results.
- Gold for new contracts follows `data/contracts/LABELING.md`: GPT-5.6 drafts, CUAD expert spans as anchors where a
  rule maps to a CUAD category, `ambiguous` when unsure, never edited after seeing system output.
- Metric definitions, tiers and the dev/holdout split are written to `plans/campaign/preregistration.md` and
  committed **before** the final configuration is measured on them. Post-hoc metric changes are disclosed as such.
- Pipeline iteration uses the **dev split only**; the holdout is run once, at the end, by the lead.
- Negative results are reported. Nothing is tuned to the gold. The changelog says why round 2 exists (detection
  saturated) and labels every new row/metric as round 2.
- Existing configs' prompt text, tool schemas and playbook prose stay byte-identical so their replay caches remain
  valid; new behaviour lives in new config ids and new playbook fields that old prompts do not read.

## Tracks (GPT-5.6 Sol, effort max, isolated worktrees, loop until goals or timeout)
- **A — `metrics-hard`** (`wt/metrics-hard`): long-document tier + gold, judge v2 with per-element verdicts, CRR /
  yield / adherence metrics, tiered runner + report + changelog data, pre-registration, baseline numbers.
- **B — `redline-quality`** (`wt/redline-quality`): new config(s) that raise CRR ≥ 70 % on the dev split without
  losing detection — playbook `position.elements` checklists, element-aware drafter + verifier with repair,
  minimality discipline, long-document planning/search — measured on the dev split in a hypothesis → change →
  measure loop with a written log.

## After the tracks (lead)
Merge A then B → gate check → **full live campaign** on both tiers for `b1-prompt`, `i3-verifier`, `final` (round 1)
and the new final (round 2), judge v2 → report → docs (README §5, changelog "round 2" section, EVAL.md) → `/evals`
dashboard tiers/metrics (Opus) → video refresh of the baseline / comparison / changelog beats → gate review → submit.

## Timeline (IST)
Sun 09:15 launch A+B · ~15:00 merge · 16:00–22:00 campaign · 22:00–01:00 docs/dashboard/video · Mon gate + buffer ·
submission well before Mon 23:30.
