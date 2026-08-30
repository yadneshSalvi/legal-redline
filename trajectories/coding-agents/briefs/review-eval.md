# Review brief: dataset + metrics + judge + eval runner   (GPT-5.6 Sol at max · adversarial, read-only)

You are an independent, adversarial reviewer with a statistician's suspicion of evaluation code. Do not fix anything; find what is
wrong and prove it. Repo: `~/code/hackathons/legal-redline`. Scope: `src/eval/**`, `scripts/{fetch-cuad,build-dataset,
synth,label-assist,eval,report}.ts`, `data/templates/**`, `data/contracts/**`, `tests/eval/**`. Contracts: `EVAL.md` (the law),
`PLAYBOOK.md` + `data/playbooks/customer-vendor-services.yaml`, `SCHEMA.md` §4–5, `src/agent/types.ts`, `src/engine/text.ts`, `AGENTS.md`.
The builder's report is at `{{BUILDER_REPORT}}` — read it, then verify every claim yourself. Judges of this hackathon will run `pnpm eval`
from a clean clone; anything that makes the numbers non-reproducible, unfair, or inflated is a blocker.

## What to verify (run commands; do not trust the report)
1. `pnpm typecheck && pnpm lint && pnpm test -- tests/eval` — paste the summary.
2. Determinism: run `pnpm synth --seed 11 --count 3` twice into temp dirs (or compare against the committed files) → byte-identical
   `contract.txt`/`gold.json`; `pnpm synth --hardcase` deterministic; `pnpm build-dataset` idempotent (same `contract.txt` and paragraph ids).
3. Paragraph-id alignment: for 3 contracts, `splitParagraphs(contract.txt)` index → id equals `parseDocx(contract.docx)` ids (use the engine);
   every gold `paragraphIds` entry exists and the gold `spanText` (or its normalised first 120 chars) is found in that paragraph.
4. CUAD canonicalisation: inspect `contract.txt` of `cuad-corio-hosting` and one other for broken paragraphs (sentences split mid-way,
   page numbers, "Source:" boilerplate, table debris); count unmatched spans in `meta.json` — more than 10 % unmatched for a contract is a blocker.
5. Gold quality (be a lawyer for an hour): open `gold.json`/`gold.draft.json` for `synth-hardcase`, `synth-11` and two CUAD contracts; for each item
   read the paragraph(s) and judge whether the status is defensible under the playbook position. Flag any item where the playbook's own
   *preferred* position would accept the clause but gold says `deviation` (e.g. a liability cap with a USD 1,000,000 floor), any `compliant`
   item that plainly deviates, direction mistakes (obligation binds the Vendor, not Customer), and decoys that "telegraph" the answer
   (sentences like "This restriction binds Vendor only").
6. Matching + metrics (`src/eval/match.ts`, `metrics.ts`): construct adversarial cases by hand — a finding overlapping two gold items,
   two findings for one gold item (one-to-one by confidence), a `needs_review` finding, a compliant clause flagged as deviation (must be FP),
   a `missing` finding for a rule whose gold is `deviation` (must not match), empty findings (P=R=F1=0, not NaN), macro vs micro correctness,
   citation-hallucination scanner on rationale that cites "Section 9.4" when the doc has `sec-9.4` (must not count) vs "Section 47" (must count).
7. Judge (`src/eval/judge.ts`): model `gpt-5.6-sol`, structured output, temperature not set or 0, cached by canonical hash, replay mode fails
   loudly on a miss; the prompt shows the judge the *rendered* redlined clause and the rule position and asks exactly the four fields.
8. Runner + report: `pnpm eval --config b1-prompt --contracts synth-hardcase` in replay mode works if a cache exists, otherwise fails with a clear
   message (not a silent live call); results JSON contains per-contract + aggregate + resources (calls/tokens/cost); `summary.md` table has the
   configs as columns/rows with the primary metric first; `changelog-data.json` shape is documented in `src/eval/report.ts`.
9. Fairness: the baseline receives the same playbook and `ourParty`; no config gets extra data; the CUAD attribution exists in `data/contracts/README.md`.
10. Hygiene: `any`, files > 400 lines, unseeded `Math.random`, `Date.now()` in outputs, network calls in tests.

## Hold the bar consistently
- Required fixes only for genuine defects: non-determinism, id misalignment, unmatched-span rates, indefensible gold items, metric bugs,
  silent live calls, unfair baselines, missing attribution. Polish → suggestions.
- Quote evidence: file:line, command output, contract paragraph text.

## FINAL message must be exactly this JSON (no prose outside the block)
```json
{
  "verdict": "approve" | "revise",
  "required_fixes": [{"where": "file:line or data/contracts/<id>/gold.json#gNN", "what": "…", "why": "…", "how": "…"}],
  "suggestions": ["…"],
  "evidence": ["…"],
  "score": {"correctness": 0-10, "contract_compliance": 0-10, "quality": 0-10}
}
```
