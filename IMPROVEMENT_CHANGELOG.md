# Improvement Changelog

Every row is a named pipeline configuration (`src/agent/configs.ts`) run on the **same 12 contracts** with the
**same playbook** by `pnpm eval --config <id>`; the numbers come from `evals/results/<id>.json` and reproduce from the
committed replay cache. Primary metric: **issue-detection F1** against gold. Secondary: redline validity, citation
hallucination rate, cost per contract. See [`EVAL.md`](EVAL.md) for definitions.

| Stage | Config | What we tried and why | Evidence (macro F1 · validity · halluc. · $/contract) | Decision / learning |
|---|---|---|---|---|
| Baseline 0 | `b0-chat` | Whole contract in one prompt, no playbook — "paste it into a chat assistant". Represents what people do today. | {{B0_ROW}} | {{B0_LEARN}} |
| **Baseline** | `b1-prompt` | One direct prompt with basic instructions: contract (numbered paragraphs) + playbook → JSON findings + replacement text; naive string apply. The official fair baseline (same model, same playbook). | {{B1_ROW}} | {{B1_LEARN}} |
| Iteration 1 | `i1-docmodel` | Clause-addressable document model + planner: paragraph ids, section tree, resolved definitions; workers read sections instead of the whole text. (Context) | {{I1_ROW}} | {{I1_LEARN}} |
| Iteration 2 | `i2-workers` | One drafter worker per rule with tools (`read_section`, `search`, `get_definition`, `propose_redline`); `propose_redline` rejects non-verbatim anchors. (Tools + orchestration + validation at the tool boundary) | {{I2_ROW}} | {{I2_LEARN}} |
| Iteration 3 | `i3-verifier` | Independent verifier in a fresh context with deterministic pre-checks and a repair loop (≤ 2 rounds); unresolved → escalated to the human. (Verification) | {{I3_ROW}} | {{I3_LEARN}} |
| Iteration 4 | `i4-memory` | Precedent memory: approved redlines keyed by rule, retrieved as model language. (Memory) | {{I4_ROW}} | {{I4_LEARN}} |
| Removed | `x-monolith` | One agent handling all 18 rules in a single tool loop with the same tools — to test whether per-rule workers were worth their cost. | {{X_ROW}} | {{X_LEARN}} |
| **Final** | `final` | The combination that worked. | {{FINAL_ROW}} | {{FINAL_LEARN}} |

## The hard case

`synth-hardcase` — a liability cap that reads "12 months' Fees" where "Fees" is defined elsewhere as a one-off
implementation fee (illusory cap), a non-compete that binds the *vendor* (decoy), an MFN in the customer's favour
(decoy), a convenience-termination right split across two sections, and a customer-payable early-termination fee
buried in the fee schedule.

{{HARD_CASE_ANALYSIS}}

## Main failure mode

{{FAILURE_MODE}}

## Hot take

{{HOT_TAKE}}
