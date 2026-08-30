# Brief: redline-quality — make the pipeline's redlines complete, minimal and right (CRR ≥ 70 %)   (GPT-5.6 Sol · effort max · goal loop · isolated worktree)

You are a senior agent engineer on **Playbook Redliner** (read `AGENTS.md`, `SCHEMA.md`, `PLAYBOOK.md`, `EVAL.md`, `IMPROVEMENT_CHANGELOG.md`
§"Main failure mode", `plans/10_improvement_campaign.md` — its rules are binding). Worktree:
`~/code/hackathons/legal-redline-wt/redline-quality` (branch `wt/redline-quality`, `.env` copied, deps installed). Another agent
builds the harder evaluation in parallel (`wt/metrics-hard`: long-document tier, judge v2 with per-element verdicts, CRR metric); you do not wait
for it — build your own dev measurement (below) and the lead merges.

## The problem you are solving
The judge says only 38 % of the final pipeline's redlines are complete ∧ minimal ∧ intent-preserving (baseline: 40 %). The failure mode is known:
the drafter reads a playbook position as a *direction*; the judge (and a lawyer) reads it as a *checklist* — the successor-transfer right in a
licence, the 60-day renewal reminder, a stated warranty period, the duty to defend in an indemnity get dropped; insurance/transition clauses are
inserted as whole rewrites. The verifier cannot catch it because its deterministic checks only cover regexes. Long documents (20–60k words) will
also stress the planner/worker tool budget.

## Goal (loop until met, or the 7-hour timeout is near — then report)
On the **dev split** — `cuad-americas-shopping-mall-hosting`, `cuad-bnc-mortgage-hosting`, `synth-12`, `synth-hardcase`, plus two long CUAD
contracts you pick by the campaign rule (families {hosting, license, services, maintenance, outsourcing, development}, ≥ 15k words, shortest two
that parse cleanly — gold-less, so measure per-finding quality on them) — a new config reaches:
- **CRR-dev ≥ 70 %**: of produced deviation/missing findings with a proposal, the share that applies ∧ passes checks ∧ meets *every* element of
  the preferred-or-fallback position ∧ minimal ∧ intent-preserving, judged by a per-element GPT-5.6 judge you implement for dev use
  (`src/eval/judge-elements.ts`, structured outputs, cached under `evals/cache/judge-dev/`; the other track ships the official judge v2 — same
  shape as far as you can: `{ elements:[{element, level, met, evidence}], satisfies_preferred, satisfies_fallback, minimal, preserves_intent }`).
- Detection F1 on the four gold dev contracts not below `final`'s (88.0 / 94.1 / 94.1 / 100 per contract) beyond noise (−1.5 pp).
- Escalations stay 0; integrity 12/12 on anything you export; cost per short contract ≤ 2× `final`'s $3.51.

## Levers (in the order we believe they pay; measure each, keep what works, revert what does not)
1. **Playbook `position.elements`** (`src/playbook/schema.ts` + `data/playbooks/customer-vendor-services.yaml`): for every rule, an explicit
   atomic checklist for preferred and fallback (e.g. LOL-CAP preferred: mutual · basis = greater of 12 months' fees paid-or-payable and USD 1M ·
   consequential exclusion mutual · carve-outs {confidentiality, data, indemnity, gross negligence, wilful misconduct, fraud, IP} · payment
   obligations excluded). **Additive field only** — the prose fields (`summary`, `position.preferred/fallback/walkaway`, `detect`, `redline`,
   `checks`) stay byte-identical so round-1 caches remain valid.
2. **Element-aware drafter** (new prompt module, new config id — old prompt modules untouched): the worker sees the checklist, must map each
   element to either "already met (quote)" or "addressed by op N", and cannot submit with an unaddressed element unless it explains why (a
   `needs_review` path). Prefer surgical edits; for `missing` clauses draft the shortest clause that carries every element.
3. **Element-aware verifier + repair** (new verifier prompt): a fresh-context check per element (met / not met / cannot tell, with quote),
   deterministic regexes as evidence, repair loop ≤ 3 rounds feeding the unmet elements back verbatim; escalate only when still unmet.
4. **Minimality discipline**: word-level ops on the existing sentence, one op per element cluster, insertion-only for absent clauses; a
   deterministic minimality gate before submit (ratio ≤ 1.5 for replaces, or `insert_after`).
5. **Long-document planning**: planner uses `search` over the whole document per rule (defined terms map first), workers get a raised but
   bounded tool budget with `read_section` pagination; verify the planner does not time out on 40k-word inputs; parallelism as in `final`.
6. **Memory**: precedent language injected as a template *with the elements marked*, so adherence and completeness reinforce each other.
Name the configs `i5-elements` (levers 1–4), `i6-longdoc` (…+5), and `final-v2` (all, incl. memory). Register them in `src/agent/configs.ts`
with faithful descriptions; keep `final` as the round-1 config.

## Measurement loop
`plans/campaign/redline-quality-log.md`: one entry per iteration — hypothesis, change, dev numbers (CRR-dev, per-element miss table, F1 on the
gold dev contracts, cost), keep/revert. Use `pnpm review <file> --config <id> --mode record --cache-dir evals/cache/<id>/<contract>` for dev
runs and a small script `scripts/crr-dev.ts` that runs the element judge over a run and prints the table. Check the clock; at T-45 min stop and
write the report even if the goal is unmet. Keep every recorded cache — the lead replays them.

## Rules
Worktree only. Every LLM call through `src/agent/llm.ts`; Claude Opus 5, adaptive thinking, `output_config.effort`, structured outputs, tool
runner; judge via the `openai` SDK; no `budget_tokens`, no prefill, no temperature. Tool handlers never throw. Do not touch the round-1 prompt
modules, tool schemas, config ids or playbook prose; new behaviour = new modules + new config ids + additive YAML fields. Tests for every pure
piece (schema, element gate, minimality gate) in `tests/agent/`; `pnpm typecheck && pnpm lint && pnpm test` green. No git commit/push. Secrets
stay out of logs. Ports 3101–3103.

## Report (FINAL message — exactly this structure)
```
## Summary
## Configs                 (ids, what each adds, prompt modules)
## Dev numbers             (per iteration table; final: CRR-dev, F1 per dev contract, escalations, cost; per-element miss table before/after)
## Playbook elements       (rules covered, example)
## Files                   (created / changed)
## Known gaps / risks      (what may not transfer to the holdout; where the judge might disagree)
```
