# Final gate review — Playbook Redliner (2026-08-30, HEAD d6c52f1, reviewer: Fable 5 redline-critical-reviewer)

Scope: plans/harness/briefs/gate-final.md. Replay only (no live model calls); no files in the main checkout modified; video not reviewed per lead instruction. All commands were run in a clean `git clone` of `main` (d6c52f1 == origin/main) under the scratchpad with `ANTHROPIC_API_KEY`/`OPENAI_API_KEY` unset. The one production side effect is sample run `ZPXbp77-_fEMQw` (created per checklist item 7).

```json
{
  "verdict": "revise",
  "lead_verdict": "approve-with-fixes",
  "required_fixes": [
    {
      "n": 1,
      "where": "REPRODUCE.md:39 · scripts/review.ts:34,75 · src/eval/runner.ts:238-241",
      "what": "`pnpm review data/contracts/synth-hardcase/contract.docx --config final --mode replay --accept-all` cannot replay in a clean clone: ReplayCacheMiss on the first (planner) call.",
      "why": "Two causes, both proven: (a) createLlmClient defaults cacheDir to `evals/cache` root, which holds no entries (they live in evals/cache/<config>/<contract>/); (b) even with `--cache-dir evals/cache/final/synth-hardcase` the planner hash differs (54468d88… vs cached 531e61bf…) because the eval passes `our party=Northwind Analytics, Inc.; counterparty=Brightline Cloud Services Ltd.` from meta.json while the CLI defaults to `Customer`/`Vendor` and has no `--counterparty` flag (diff isolated with requestHash: the only differing bytes are the parties line). A judge following §3 gets a hard failure.",
      "how": "Add `--counterparty <name>` to scripts/review.ts (or auto-read meta.json beside the contract) and document `--cache-dir evals/cache/final/synth-hardcase --party \"Northwind Analytics, Inc.\" --counterparty \"Brightline Cloud Services Ltd.\"`. Verified in a scratch clone with that 3-line patch: replays in 1.1 s, $0, 18 verified findings (2 deviations), data/runs/<id>/output.docx written with validation ok. Note: the CLI reads data/precedents/index.json when present (gitignored; 72 KB in the lead checkout), which changes drafter prompts — use the eval's memory store (createStore(\"memory\")) in replay or say so."
    },
    {
      "n": 2,
      "where": "REPRODUCE.md:50",
      "what": "`pnpm baseline data/contracts/synth-hardcase/contract.docx --mode replay` fails with ReplayCacheMiss (…/evals/cache/9c48bd74….json).",
      "why": "Same root-cache default as fix 1.",
      "how": "Document `--cache-dir evals/cache/b1-prompt/synth-hardcase` (verified: 0.1 s, $0, findings deviation 2 / compliant 16) or default the cache dir per config+contract."
    },
    {
      "n": 3,
      "where": "REPRODUCE.md:41 · scripts/validate-docx.ts:50 · src/engine/package-validation.ts:76",
      "what": "`pnpm validate-docx <original> <output> --pdf` as documented reports `ok:false` and exits 1 on every real output.",
      "why": "Without `--ops` the CLI validates against an empty ApplyRequest, so it errors with `expected 0 new comments but found N`, `bookmarkStart count 0 -> N` and lists the edited paragraphs as `collateral`. Evidence: replayed hardcase output → errors `expected 0 new comments but found 2`, `collateral paragraph changes: p0032, p0089` while the same file's run.json output.validation is ok:true and the LibreOffice section says `PDF conversion and DOCX round-trip preserved 4 insertions, 3 deletions, and 2 comments`; identical failure on a known-good local run (data/runs/9fRwojOyi5kkYY) and on the production kubient output.",
      "how": "Add `--run <runId>` that rebuilds the request from run.json decisions (or write data/runs/<id>/apply-request.json in applyDecisions and document `--ops`), or reword §3 to read the report from run.json → output.validation and use validate-docx only for the LibreOffice/PDF check."
    },
    {
      "n": 4,
      "where": "app/api/runs/[id]/stream/route.ts:75 · REPRODUCE.md:58",
      "what": "\"Open a sample from the landing page (replays are instant)\" is false: in replay mode every sample run fails immediately; production works only because it is running live.",
      "why": "The stream route creates the client with `cacheDir: data/runs/${id}/cache`, which is empty for a new run. Local server on :3220 with REDLINER_LLM_MODE=replay and no keys: POST /api/runs (sampleId=synth-hardcase) → SSE `error` at seq 4, run failed `Replay cache miss: …/data/runs/V6XOlOtj2JlUnd/cache/54468d88….json` after 30 ms. The two failed runs visible on production /runs (UjvSgELUQYe96T, 8OPIDi9icRqAn2) carry the same error. My production sample run ZPXbp77-_fEMQw ran live: planner 39 s, 101 LLM calls, $2.02, ~3 min.",
      "how": "For packaged samples, replay from `evals/cache/<config>/<sampleId>` and pass meta.json parties (then sample runs really are instant and free), or change REPRODUCE §5 / landing copy to say sample runs are live (~3 min, ~$2) and keep the key in production. Also delete/hide the two failed production runs."
    },
    {
      "n": 5,
      "where": "IMPROVEMENT_CHANGELOG.md:83-87 · README.md:75",
      "what": "The bluefly failure-mode paragraph contradicts gold.json and the matcher, and \"gold of one item per rule\" is false.",
      "why": "data/contracts/cuad-bluefly-hosting/gold.json has three LICENSE items (g009 compliant p0202, g010 deviation p0149 \"Base Components license is revocable\", g026 deviation p0085 Type II). Re-running matchFindings on evals/runs/final/cuad-bluefly-hosting/findings.json: TP includes `LICENSE deviation [p0149]`; FP = `IP deviation [p0082,p0085,p0086]`; FN = `g025 IP [p0083,p0084]` and `g026 LICENSE [p0085]`. So p0149 is a true positive, not the FP/FN pair described; the LICENSE miss is a second gold item the pipeline did not flag. Across the gold, 6 rules have >1 item (144 items / 12 contracts: americas NONCOMPETE, bluefly LICENSE×3, synth-11/12 T4C, synth-13 INDEMN/NONCOMPETE).",
      "how": "Rewrite the paragraph: 1 FP + 1 FN are the IP \"right rule, neighbouring paragraph\" case (p0082/p0085/p0086 vs p0083/p0084); the second FN is the missed Type II licence (p0085) while the Base Components licence (p0149) was correctly caught. Remove the \"one item per rule\" claims in both files (say \"at most one deviation per rule except where CUAD labels two distinct clauses\")."
    },
    {
      "n": 6,
      "where": "IMPROVEMENT_CHANGELOG.md:23,22,38",
      "what": "Three figures do not match evals/results/*.json.",
      "why": "Line 23: \"inside noise on 260 references\" — final.json citationHallucination.references = 1371 (52 hallucinations = 3.8%); b1-prompt.json = 272 (8 = 2.9%). Line 22: \"Recall 90.2% vs 92.6–94.2%\" — worker-config macro recall is i2 92.6%, i3 94.2%, i4 92.6%, final 92.3%, so the range is 92.3–94.2%. Line 38: \"at unchanged recall\" — pre-calibration → calibrated macro recall is 96.2% → 92.6% (i2) and 97.1% → 94.2% (i3); the changelog itself says the two ladders are on different gold, so say that instead of \"unchanged\".",
      "how": "Replace with \"on 272 baseline / 1,371 final references\", \"92.3–94.2%\", and \"(recall is not comparable across the two golds: 96.2% → 92.6% for i2)\"."
    },
    {
      "n": 7,
      "where": "README.md:138 · repository root",
      "what": "README says \"Code: MIT\" but there is no LICENSE file.",
      "why": "`ls LICENSE` → missing; a licence claim without the file is what a judge checking §9 will notice.",
      "how": "Add an MIT LICENSE file (and keep the CUAD CC-BY-4.0 attribution, which is present in README §9 and data/contracts/README.md)."
    },
    {
      "n": 8,
      "where": "trajectories/README.md:15 · trajectories/app/final/*/README.md:28-29 (all 12)",
      "what": "The trajectory tree documents `app/judge/` which does not exist, and every one of the 12 narrated final READMEs has an empty human checkpoint and apply stage.",
      "why": "`ls trajectories/app/judge` → No such file; `trajectories/app/i3-verifier/` exists but is not in the tree and holds only run.json + trajectory.jsonl. All 12 final READMEs show `| human | 0 | 0 | 0 | 0 decision(s) |`, `| apply | … | not applied |` and \"No human decision was recorded.\" under every rule; 0 human_decision events in their trajectory.jsonl. The brief requires the walk-through to run instructions → tool responses → verifier feedback → human checkpoint → apply; the only human/apply evidence is raw (trajectories/human/*.json: 8/11/13/10 accepts; i3-verifier/synth-12 trajectory.jsonl: 13 human_decision events + \"Output validation passed\").",
      "how": "Export one human-reviewed product run with a narrated README (e.g. `pnpm export-trajectories --run 9fRwojOyi5kkYY` — local run with 8 accepts and output.docx, or W6aXqNXLJrTHid with 13) and link it from trajectories/README.md as the human-checkpoint example; fix the tree (drop `judge/`, add or remove `i3-verifier/`)."
    },
    {
      "n": 9,
      "where": "README.md:11,144",
      "what": "Video link is still the placeholder text \"_link added on upload_\".",
      "why": "Not a `{{` placeholder, but the judge-facing README has no video link; the video is out of my scope per the lead.",
      "how": "Fill both spots with the unlisted URL when the render is uploaded."
    }
  ],
  "suggestions": [
    "plans/video/card-data.json:4 uses `playbook-redliner.yadneshsalvi.com`, which does not resolve (curl: Could not resolve host) — make sure the end card and narration say playbook-redliner.vercel.app (video itself not reviewed, per lead instruction).",
    "Run execution is bound to the SSE GET invocation: when my stream client disconnected after 75 s the run stalled (lease went stale) and the next connection re-claimed and restarted it from the planner (stats reset from 32 calls/$0.60 to 28 calls/$0.59; total spend ≈ $2.6 for one $2.0 run). A judge who navigates away mid-run pays twice; consider a keep-alive fetch in the workspace or a background job.",
    "REPRODUCE.md:25 says `pnpm eval --all` takes ~50 min; it took 5 m 15 s here (07:10:24 → 07:15:39) — say \"≈ 5–10 min\".",
    "trajectories/app/i3-verifier/synth-12 is an incomplete export (no README.md/prompts.md/findings.json) — complete it or delete it.",
    "Two failed runs with `Replay cache miss` errors are visible on production /runs (UjvSgELUQYe96T, 8OPIDi9icRqAn2) — remove them so the first thing a judge sees on /runs is not a failure.",
    "pnpm lint: 2 warnings in plans/video/bin/cdp.mjs:27 and rec.mjs:48 (no-unused-expressions) — add plans/video/bin to the ESLint ignore list.",
    "Working tree has uncommitted changes in plans/video/** and plans/09_submission.md (video job); the review covered HEAD d6c52f1 == origin/main only."
  ],
  "evidence": [
    "Clean clone of d6c52f1 (== origin/main) into scratchpad; `pnpm install --frozen-lockfile` OK (4.2 s); `pnpm typecheck` OK; `pnpm lint` 0 errors / 2 warnings; `pnpm test` 30 files, 125 tests passed (5.8 s).",
    "With ANTHROPIC_API_KEY and OPENAI_API_KEY unset: `pnpm eval --all` exit 0 in 5 m 15 s, `pnpm report` exit 0; evals/results/summary.md and all nine JSONs (b0-chat, b1-prompt, i1-docmodel, i2-workers, i3-verifier, i4-memory, final, x-monolith, changelog-data) byte-identical to the committed files (cmp); docs/results.md unchanged. No ReplayCacheMiss/ReplayDrift in the log.",
    "Numbers verified against evals/results/*.json (README §5/§7 and changelog): macro F1 b0 71.7 · b1 91.5 · i1 91.8 · i2 94.4 · i3 94.5 · i4 93.6 · x 94.1 · final 94.8; validity 23.5/42.7/41.5/48.3/51.7/50.6/42.4/50.6; hallucination 4.4/2.9/3.6/4.9/3.8/4.3/2.1/3.8; $/contract 0.51/0.35/1.24/2.97/4.00/4.02/0.99/3.51; recall/precision b1 87.1/98.0 → final 92.3/97.7; deviation accuracy 77.6 → 86.8 (i1 81.3, i2 89.6, i3 90.6, i4 87.7, x 84.1); minimality 11.0 → 35.6 (i1 45.1, i2 33.3, i3 28.1, i4 32.2, x 42.4); escalations 12 → 0 (b0 13, i2 1); i4 vs final F1 gap 1.2 pp; b0 40 FP, precision 70.0%, 3/51 minimal; final integrity 12/12 pass; hard-case table matches summary.md; ×10 cost (3.51/0.349).",
    "final.json per-contract judgements: 87 judged, satisfies_rule=false 34, minimal=false 29 (9 both) — matches README §7 and changelog; redlineValidity 44/87, minimality 31/87.",
    "Pre-calibration (evals/results/pre-calibration): b1 F1 94.9% / precision 93.5%; i2 F1 84.0% / precision 75.7% / 34 FP; i3 83.7% / 74.5% / 36 FP; calibrated precision i2 96.6%, i3 95.3% — all as quoted.",
    "Mismatches: changelog:23 '260 references' (JSON: 1371 final / 272 baseline); changelog:22 '92.6–94.2%' (final recall 92.3%); changelog:38 'unchanged recall' (96.2→92.6 i2, 97.1→94.2 i3); changelog:83-87 bluefly narrative (matcher: TP LICENSE p0149; FN g026 LICENSE p0085 + g025 IP; FP IP p0082/p0085/p0086); README:75 'one item per rule' (6 rules with >1 gold item).",
    "Placeholders: no `{{` in README, IMPROVEMENT_CHANGELOG, REPRODUCE, docs/; hits only inside coding-agent transcripts/briefs that quote the pattern. No absolute home paths in docs or anywhere under trajectories/ (0 files).",
    "Secrets: strict key patterns (sk-ant-api…, sk-proj-…, vercel_blob_rw_…, ghp_, AKIA) → 0 hits in tracked files and in trajectories/evals/data; none of the four .env values (39–167 chars) appear in any tracked file or under trajectories/evals/data/docs/plans; .env untracked (.gitignore `.env*`, `!.env.example`); .env.example present with empty keys; tests/agent/submission-redaction.test.ts contains only fake fixtures. CUAD CC-BY-4.0 attribution in README §9 and data/contracts/README.md.",
    "Deployed app: /, /review/sample, /runs, /evals, /trajectories/sample, /precedents all HTTP 200; /api/evals serves evals/results/changelog-data.json (real aggregates; the dashboard's fixture chip is only shown when that payload is null). Sample run ZPXbp77-_fEMQw started via POST /api/runs (sampleId=synth-hardcase, config=final): SSE board progressed (status → planner start/end 39 s → 18 workers queued/running → findings), completed awaiting_review with 18 findings (2 deviations LD + LOL-CAP, identical to the eval), verifier 18 pass, 101 LLM calls, $2.02; POST decisions 200; POST apply 200 with validation ok (5 ins / 3 del / 2 comments, untouchedIdentical); GET output.docx 200, 15,749 bytes, Content-Disposition attachment; unzip: w:ins 5, w:del 3, w:comment 2. Production is running live, not replay.",
    "Docx checks: production run -QiColwui8Kpan output (12 ins / 3 del / 6 comments) converted with LibreOffice headless to PDF (73 KB) and passed the LibreOffice round-trip; replayed CLI output (scratch clone with --counterparty) 4 ins / 3 del / 2 comments with w:author 'Playbook Redliner', run.json validation ok, soffice → PDF 104 KB.",
    "Trajectories: 12/12 trajectories/app/final/<contract>/README.md (2.4k–3.5k lines) with per-rule 'Drafter instructions → Tool trace → Submitted finding → Verifier and repair feedback → Human checkpoint and applied ops'; synth-hardcase shows get_definition calls at seq 49/50 and 273–296 and the verifier's illusory-cap verdict at seq 233; trajectories/coding-agents/INDEX.md lists 27 sessions with brief → report → trace and every relative link in README/CHANGELOG/REPRODUCE/EVAL/trajectories README/INDEX resolves.",
    "Video: not reviewed (lead instruction); only checked that plans/video/narration.json has 0 occurrences of the custom domain and card-data.json has 1.",
    "No file in the main checkout was modified; the port-3220 dev server I started was stopped; port 3110 untouched."
  ],
  "score": {
    "correctness": 7,
    "contract_compliance": 8,
    "quality": 8
  },
  "rubric_self_check": {
    "problem": "Supports a top score: a named persona (customer-side in-house counsel), a quantified bottleneck (1–3 h per contract, output must be Word tracked changes) and a deliverable that is the actual artefact (.docx with w:ins/w:del + comments, verified by re-parse and LibreOffice); nothing material missing.",
    "agent_engineering": "Strong evidence — planner → 18 per-rule tool-using drafters with anchor validation at the tool boundary → independent verifier with repair loop → assembler/memo → human checkpoint → precedent memory, all with per-event trajectories and an exact-prompt appendix; what is missing for a top score is a narrated trajectory that actually shows the human checkpoint and apply (all 12 say 'No human decision was recorded') and an in-app replay path that works (fix 4, 8).",
    "e2e_quality": "The deployed app completes a genuine run → review → apply → download loop (verified live: 18 findings, apply validation ok, docx with tracked changes) and the integrity check is 12/12; against a top score stand the ≈50% redline validity the authors report honestly, sample runs that take ~3 min and ~$2 instead of the promised instant replay, two visible failed runs on /runs, and the restart-on-disconnect behaviour.",
    "measured_improvement": "Fair same-model-same-playbook baseline, an 8-config ladder with a measured run-to-run variance (1.2 pp), a removed experiment and a calibration step each with evidence, and honest non-results (memory, hard case); the detection gain is modest (+3.3 pp F1) and the strongest deltas are post-detection (validity +7.9 pp, minimality +24.6 pp, escalations 12 → 0), and one narrative paragraph (bluefly) and three figures must be corrected (fix 5, 6) before a judge can trace every claim to the JSON.",
    "reproducibility": "The core is excellent — clean clone, frozen lockfile, typecheck/lint/test green, `pnpm eval --all` byte-identical in 5 min with no API keys — but a judge following REPRODUCE §3–§5 verbatim hits three broken commands (review replay, baseline replay, validate-docx) and a false 'replays are instant' claim, and the MIT licence file is missing (fix 1–4, 7); Docker path not exercised.",
    "hot_take": "Present, specific and grounded in the project's own numbers (calibration moved precision 75.7 → 96.6 with no model change; the same pipeline recorded twice differs by 1.2 pp, more than many published gains) — supports a top score once the surrounding figures are corrected."
  }
}
```

## Re-verification at 6f79c83 (2026-08-30 07:35–07:45 IST)

Method: fresh `git clone` of `main` at 6f79c83 into the scratchpad (`clone2`), `pnpm install --frozen-lockfile` OK; every command run with `ANTHROPIC_API_KEY`/`OPENAI_API_KEY` unset; no file in the main checkout modified; no server started; port 3110 untouched. `git diff --stat d6c52f1 6f79c83` touches nothing under `evals/`, `data/contracts/` or `src/eval/match.ts`, so the eval results verified above still stand.

1. **Review / baseline replay — PASS.** `pnpm review data/contracts/synth-hardcase/contract.docx --config final --mode replay --accept-all` (no extra flags; cache dir and parties resolved from `evals/cache/final/synth-hardcase` + `meta.json` by `src/eval/replay-context.ts`): Duration 0.5 s, Cost $0.000000, findings deviation 2 / compliant 16, verifier pass 18, `Output: data/runs/HqZsBkKmCj_6Jr/output.docx`; run.json status `applied`, 2 decisions, llmCalls 0, `output.validation = {ok:true, parsedParagraphs:136, trackedInsertions:4, trackedDeletions:3, comments:2, untouchedIdentical:true, errors:[]}`; unzip of output.docx: `w:ins` 4, `w:del` 3, `w:comment` 2; `data/precedents/` still holds only `seed.json` (local index neither read nor written in replay). `pnpm baseline data/contracts/synth-hardcase/contract.docx --mode replay` (spawns review.ts with `--config b1-prompt`): 0.0 s, $0, deviation 2 / compliant 16, verifier skipped 18, run `92xksnFsXRuPSG` awaiting_review.
2. **validate-docx — PASS.** `pnpm validate-docx --run HqZsBkKmCj_6Jr` → `ok:true`, 4/3/2, `untouchedIdentical:true`, `errors:[]`, exit 0 (stderr note: "no apply-request.json for run …; request rebuilt from its decisions (date taken from the output)"). Two-path form `pnpm validate-docx data/contracts/synth-hardcase/contract.docx data/runs/HqZsBkKmCj_6Jr/output.docx --run HqZsBkKmCj_6Jr --pdf` → `ok:true`, `libreoffice: {attempted:true, ok:true, message:"PDF conversion and DOCX round-trip preserved 4 insertions, 3 deletions, and 2 comments"}`, exit 0.
3. **Changelog vs matcher — PASS.** `matchFindings` at 6f79c83 on `evals/runs/final/cuad-bluefly-hosting/findings.json` vs `gold.json`: TP includes `LICENSE deviation [p0149]`; FP = `IP deviation [p0082,p0085,p0086]`; FN = `g025 IP [p0083,p0084]`, `g026 LICENSE [p0085]`. The rewritten "Main failure mode" paragraph states exactly this (FP + one FN = the IP finding on a./c./d. vs gold b./1.; the other FN = the missed Type II licence p0085 while p0149 was caught). Line 23 now reads "3.8% of 1,371 final references vs 2.9% of 272 baseline references" (final.json 52/1371, b1-prompt.json 8/272); line 22 "Recall 90.2% vs 92.3–94.2%"; line 38 "Recall (96.2% → 92.6% for `i2`) and the baseline's own F1 (94.9% → 91.5%) moved too, because the gold changed" — all match the JSONs.
4. **Files — PASS.** `LICENSE` present (MIT, 26 lines, "Copyright (c) 2026 Yadnesh Salvi"). README.md:75 "gold of 144 items (one per rule per contract, plus a second where CUAD labels two distinct clauses)" — 144 = sum of `data/contracts/*/gold.json` items. `trajectories/README.md` tree now lists `app/final`, `app/b1-prompt`, `app/i3-verifier/human-reviewed-msa`, `human/`, `coding-agents/` and matches `ls` (no `judge/`; the partial `i3-verifier/synth-12` export is gone). `trajectories/app/i3-verifier/human-reviewed-msa/README.md`: stage timeline `human | 13 | … | 13 decision(s) | seq 607–619` and `apply | 2 | … | output written | seq 620–621`; 13 of the 18 per-rule "Human checkpoint and applied ops" sections carry an accept with applied ops (the 5 undecided findings say "No human decision was recorded"); "## Apply and validation" ends with seq 621 "Output validation passed"; 13 `human_decision` events in trajectory.jsonl.
5. **Checks — PASS.** `pnpm typecheck` exit 0; `pnpm lint` exit 0 with 0 warnings (`plans/**` now ignored in eslint.config.mjs); `pnpm test` 31 files / 129 tests passed in 4.4 s (+1 file, +4 tests: tests/eval/replay-context.test.ts).

Open (known, deferred by the lead): `app/api/runs/[id]/stream/route.ts:75` is unchanged at 6f79c83, so REPRODUCE.md §5 ("every sample contract on the landing page replays from the committed cache … in seconds") and the new `.env.example` default `REDLINER_LLM_MODE=replay` are ahead of the code — with the default `.env`, a local `pnpm dev` sample run still fails with ReplayCacheMiss until item 4 lands. Do not treat 6f79c83 as the final submission commit without it.
