# Improvement Changelog

Every row is a named pipeline configuration (`src/agent/configs.ts`) run on the **same 12 contracts** with the
**same playbook** by `pnpm eval --config <id>`; the numbers come from `evals/results/<id>.json` and reproduce from the
committed replay cache. Primary metric: **issue-detection F1** against gold. Secondary: redline validity (applies ∧
deterministic checks ∧ independent GPT-5.6 judge), citation hallucination rate, cost per contract. See
[`EVAL.md`](EVAL.md) for definitions and [`evals/results/summary.md`](evals/results/summary.md) for the full tables.

**How to read the evidence.** Two rows of this table (`i4-memory` and `final`) are the *same configuration recorded
twice*; they differ by 1.2 pp macro F1. That is our measured run-to-run variance, so F1 differences under about 1.5 pp
are noise and we do not claim them. The differences we stand behind are the ones far outside it: recall, redline
validity, minimality, escalations and status accuracy.

| Stage | Config | What we tried and why | Evidence (macro F1 · validity · halluc. · $/contract) | Decision / learning |
|---|---|---|---|---|
| Baseline 0 | `b0-chat` | Whole contract in one prompt, no playbook — "paste it into a chat assistant". Represents what people do today. | 71.7% · 23.5% · 4.4% · $0.51 | Without a playbook the model flags everything that looks vendor-friendly (40 false positives across 12 contracts, precision 70%) and its "redlines" are prose rewrites: 3 of 51 minimal. It exists to show why the fair baseline must include the playbook. |
| **Baseline** | `b1-prompt` | One direct prompt with basic instructions: contract (numbered paragraphs) + playbook → JSON findings + replacement text; naive string apply. The official fair baseline (same model, same playbook). | 91.5% · 42.7% · 2.9% · $0.35 | The honest surprise of the project. A frontier model with the whole contract and the playbook in one prompt detects issues nearly as well as anything we built (precision 98%, recall 87%). Where it fails is everything *after* detection: 12 findings it could not place in the document, 57% of its redlines rejected by the judge, 11% minimal edits, no path into the `.docx`. Detection was near-saturated on day one; the remaining validity and the document itself became the target. |
| Iteration 1 | `i1-docmodel` | Clause-addressable document model + planner: paragraph ids, section tree, resolved definitions; workers read sections instead of the whole text. (Context) | 91.8% · 41.5% · 3.6% · $1.24 | No F1 change (+0.3 pp, inside variance) — but escalations 12 → 0 and minimal edits 11% → 45%, because every finding must now name a paragraph id and every edit is anchored to verbatim text before it can be written. The document model's value is structural, not statistical: it is what makes real tracked changes possible at all. **Kept.** |
| Iteration 2 | `i2-workers` | One drafter worker per rule with tools (`read_section`, `search`, `get_definition`, `propose_redline`); `propose_redline` rejects non-verbatim anchors. (Tools + orchestration + validation at the tool boundary) | 94.4% · 48.3% · 4.9% · $2.97 | The biggest measured step: recall 87.6% → 92.6% (macro F1 +2.6 pp), validity +6.8 pp, status accuracy 81% → 90%. One rule per worker with tools finds the clauses a single pass skims past — the *missing* insurance, transition and audit items. Cost ×2.4, and the first run showed the price of specialists: precision 75.7% before calibration, because a worker asked about one rule finds a violation (see *Iteration 5* below). **Kept, after calibration.** |
| Iteration 3 | `i3-verifier` | Independent verifier in a fresh context with deterministic pre-checks and a repair loop (≤ 2 rounds); unresolved → escalated to the human. (Verification) | 94.5% · 51.7% · 3.8% · $4.00 | F1 flat (inside variance): the verifier's job is the redline, not detection. Validity 48.3% → 51.7% (best in the ladder), status accuracy 90.6%, hallucinated citations 4.9% → 3.8%, and every failing proposal is repaired or escalated instead of applied — nothing silently written. The first version was too strict (it rejected "thirty (30) days" against a `30 days` regex and any edit longer than 1.5× the original); soft checks became advisory, only anchor / render / contradiction checks stay hard. **Kept.** |
| Iteration 4 | `i4-memory` | Precedent memory: approved redlines keyed by rule, retrieved as model language. (Memory) | 93.6% · 50.6% · 4.3% · $4.02 | On this benchmark memory does not move accuracy (−1.0 pp, inside variance): the 12 contracts are independent, so there is nothing to be consistent *with*. Its value is consistency across a team's contracts — the approved LOL-CAP wording reused verbatim on the next contract, visible in the app — and it is free (+$0.02). **Kept for the product; honestly labelled a non-result for the eval.** |
| Removed | `x-monolith` | One agent handling all 18 rules in a single tool loop with the same tools — to test whether per-rule workers were worth their cost. | 94.1% · 42.4% · 2.1% · $0.99 | The cheapest agent that scores well on detection (F1 within variance of the workers at a third of the cost, best hallucination rate) — and we still removed it. Recall 90.2% vs 92.3–94.2%: one context stops looking after the obvious clauses. Validity 42.4%: back at baseline level, because one context drafting eighteen redlines writes worse redlines. If detection were the product this is the config to ship; the product is the redline. **Removed.** |
| **Final** | `final` | The combination that worked: document model + per-rule workers + verifier + memory, with the calibrated playbook semantics. | 94.8% · 50.6% · 3.8% · $3.51 | Versus the baseline: macro F1 +3.3 pp (recall +5.2 pp at the same precision), validity +7.9 pp, minimal edits 11% → 36%, escalations 12 → 0, status accuracy 77.6% → 86.8%, document integrity 12/12, and the output is a `.docx` with tracked changes rather than JSON. Ten times the cost — $3.51 per contract, about two minutes of a lawyer's time. Citation hallucination is +0.9 pp (3.8% of 1,371 final references vs 2.9% of 272 baseline references — the pipeline cites five times more often), and we report it as it is. |

## Iteration 5 — the one that was not a model change

After the first full ladder, the specialist configs were *worse* than the one-prompt baseline: `i2-workers` 84.0% F1
at 75.7% precision (34 false positives), `i3-verifier` 83.7% at 74.5% (36), against `b1-prompt` at 93.5% precision
(archived in `evals/results/pre-calibration/`; scored against the gold as it was then). Reading the false positives one
by one showed a pattern, not noise: a worker given a single rule flagged clauses that already met the rule's *fallback*
(a 60-day renewal notice where the fallback allows 60; a cap at 12 months' fees without the preferred USD floor), and the
playbook never said what "compliant" meant.

The fix was prose, not code: the classification semantics were written into the playbook preamble shared by **every**
config including the baseline (`src/agent/prompts/common.ts`) — *preferred or fallback met = compliant; deviation only
when the fallback fails on a material term; missing = no usable clause* — the regex checks that encoded one phrasing were
relaxed, the gold review corrected the items where the labeller had made the same mistake, and the whole ladder was
re-recorded. Precision moved from 75.7% → 96.6% (`i2`) and 74.5% → 95.3% (`i3`). Recall (96.2% → 92.6% for `i2`) and
the baseline's own F1 (94.9% → 91.5%) moved too, because the gold changed in the same pass; the two ladders are not on
the same gold and we do not compare them row by row — the precision jump is the one difference large enough to survive
that caveat. What we take from it: the largest quality jump in the project came from reviewing our own false
positives and fixing the specification, and no metric would have found it for us.

## The hard case

`synth-hardcase` — a liability cap that reads "12 months' Fees" where "Fees" is defined elsewhere as a one-off
implementation fee (illusory cap), a non-compete that binds the *vendor* (decoy), an MFN in the customer's favour
(decoy), a convenience-termination right split across two sections, and a customer-payable early-termination fee
buried in the fee schedule.

| Config | TP | FP | FN | F1 | Status accuracy |
|---|---:|---:|---:|---:|---:|
| `b0-chat` | 2 | 8 | 0 | 33.3% | 60.0% |
| `b1-prompt` | 2 | 0 | 0 | 100.0% | 100.0% |
| `i1-docmodel` | 2 | 0 | 0 | 100.0% | 100.0% |
| `i2-workers` | 2 | 0 | 0 | 100.0% | 100.0% |
| `i3-verifier` | 2 | 0 | 0 | 100.0% | 100.0% |
| `i4-memory` | 2 | 0 | 0 | 100.0% | 100.0% |
| `x-monolith` | 2 | 0 | 0 | 100.0% | 100.0% |
| `final` | 2 | 0 | 0 | 100.0% | 100.0% |

We designed this case to show the pipeline beating the baseline, and it did not: every playbook-aware configuration,
including the single prompt, resolved "Fees" to the implementation fee and left both decoys alone. A frontier model with
the whole contract in context does not fall into a definition trap. Only the playbook-less `b0-chat` took the bait (8
false positives: the vendor-side non-compete, the customer-favourable MFN, and everything vendor-friendly around them).
The case still earns its place for what the *trajectory* shows — `get_definition("Fees")` →
`get_definition("Implementation Fee")` → one anchored redline that caps all charges with a floor
([`trajectories/app/final/synth-hardcase/README.md`](trajectories/app/final/synth-hardcase/README.md)) — and for
being the contract where the pipeline's redline is a minimal tracked change and the baseline's is a paragraph rewrite.

## Main failure mode

**The redline is only half right, and the judge can tell.** Redline validity plateaus at ≈ 50% for every agentic
config. Of the 87 final-run redlines the independent judge assessed, 34 fail `satisfies_rule` — almost always a *partial*
fix: the edit improves the clause but omits one element of a multi-part playbook position (the successor-transfer right
in a licence grant, the 60-day renewal reminder, a stated warranty period, the duty to defend inside an indemnity), and
29 are not minimal because a clause that has to be inserted whole (insurance, transition assistance) is scored as a
rewrite. The drafter reads a position as a *direction*; the judge reads it as a *checklist*. The verifier cannot close
the gap today because its deterministic checks only cover the regexes in the playbook, not the position's elements. The
fix we would ship next is a schema change, not another agent: positions as explicit element lists that the verifier can
enumerate and the memo can report as "3 of 4 elements met".

**On detection, the residual errors are "right rule, neighbouring paragraph" — and one genuine miss.** The weakest
final-run contract, `cuad-bluefly-hosting` (82.4% F1: 1 FP, 2 FN), has no wrong rules in it. The false positive and one
of the false negatives are the same finding: the Section 7 `IP` deviation, which the pipeline anchored on paragraphs
a./c./d. (`p0082`, `p0085`, `p0086`) where gold has b./1. (`p0083`, `p0084`) — the paragraph-overlap matcher scores that
once as an FP and once as an FN. The other false negative is a real miss: this contract's gold carries two distinct
`LICENSE` deviations — the revocable Base Components licence in § 12.1 (`p0149`), which the pipeline caught, and the
Type II Materials licence in Section 7 (`p0085`), which it did not; a worker given one rule tends to stop after its
first deviation. We left the gold as it is rather than tune it to the system.

## Hot take

Give a specialist agent one rule and it will find a violation — the biggest quality jump in this project came from
writing the semantics into the playbook, not from any model, tool or extra agent. Everything else in the ladder was
worth building for what it does *after* detection: anchoring, verification and the document itself. And before you
believe a one-point gain on an agent benchmark, record the same configuration twice: two rows of our table are the same
pipeline and they differ by more than most published "improvements".
