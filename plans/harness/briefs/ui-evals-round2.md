# Brief: /evals round 2 — tiers, the complete-redline story, honest framing   (Claude Opus 5 · UI build · isolated worktree)

You are the UI engineer on **Playbook Redliner** (`AGENTS.md`, `STYLE.md` are binding; `src/tokens.ts`; existing `src/ui/evals/*`,
`app/evals/page.tsx`, `app/api/evals/route.ts`). Round 2 of the evaluation added a **long-document tier** and new end-to-end metrics —
**complete redline rate (CRR)**, **applied tracked-change yield**, **precedent adherence** — plus judge v2 per-element verdicts. The data
now in `evals/results/changelog-data.json` has (read it, it is the contract): `configs[]` as before (round-1 shape) and
`tiers[{ id: "short"|"long", configs[{ id, aggregate, contracts }] }]` where `aggregate` carries `detection`, `redlineValidity`,
`minimality`, `citationHallucination`, `deviationAccuracy`, `resources` (round-1 shapes) plus `completeRedline`, `appliedTrackedChangeYield`
and `precedentAdherence` (each `{ eligible, passing, rate }`). Configs present today: b1-prompt, i3-verifier, final; the campaign running in
parallel adds i5-elements (short only), i6-longdoc and final-v2 — render whatever configs the file contains, in `src/agent/configs.ts` order. Round-1 numbers must keep rendering exactly as they do today.

## What to build (1440×900 screenshots for each state in `docs/screenshots/evals-round2-*.png`)
1. **Headline strip** becomes the round-2 story: CRR baseline → final-v2 (the big one), long-document F1 baseline → final-v2, applied yield,
   then detection F1 (short tier) as the fourth card. Same card component; the delta pill logic unchanged (green when better, red when worse,
   including cost).
2. **Tier switch** above the config ladder: `Short (12) · Long (6) · All` — segmented control, keyboard-operable, URL-synced (`?tier=long`),
   remembered in `localStorage`. The ladder gains columns CRR · yield · adherence (with `—` where a metric is not applicable to a config) and
   keeps the green-wash best-in-column rule.
3. **"Why round 2" panel** under the ladder, verbatim from the lead's copy (below). Never hide round 1: the panel explains that detection
   saturated on short contracts and that the redline metric and long tier were pre-registered before measuring the final configuration; link
   `plans/campaign/preregistration.md` via `repoFileUrl`.
4. **Per-element panel** (new): for the final-v2 config, a small table of playbook elements most often unmet (from `tiers[].elementMisses` if
   present; otherwise omit the panel — do not invent data).
5. **Per-contract matrix** gains the long-tier rows under a "Long tier" group header with word counts.
6. Reproduce block: add `pnpm eval --tier all`.

Copy for the "Why round 2" panel (edit only for fit):
> Round 1 measured issue detection on twelve 3–8k-word contracts, and a frontier model with the playbook in one prompt already found 91.5 % of
> the issues; the pipeline's +3.3 pp sits inside run-to-run variance. What the product is for — a redline a lawyer would sign, on the long
> documents in-house counsel actually receive — was not being measured. Round 2 pre-registered a complete-redline metric (every element of the
> playbook position met, applied to the document, minimal), a long-document tier chosen by a written rule with gold anchored on CUAD's expert
> spans, and a dev/holdout split, before the final configuration was run on them. The baseline stayed the same one prompt with the whole
> contract.

## Rules
STYLE.md tokens only; every control focusable with the 2 px navy ring and an accessible name; `Escape` closes nothing new here; no new deps;
"use client" where state lives; typecheck/lint/test green; screenshots via Playwright at 1440×900 for tiers short/long/all and the fixture
state. Do not edit `src/eval/**` or `evals/**`; if the data shape is missing something, say so in the report rather than faking it.

## Report (FINAL message — exactly)
```
## Summary
## Files
## Screenshots
## Data shape used / gaps
## Known gaps / risks
```
