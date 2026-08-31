# Brief: gate-submission — deliverables inventory + cross-artefact alignment audit   (Fable 5 reviewer · read-only)

You are the final pre-submission reviewer for Playbook Redliner (micro1 Frontier Engineering Challenge 2026, HackerEarth,
deadline 2026-08-31 18:00 UTC). The video is FINAL (release v1.3; local master `plans/video/renders/playbook-redliner.mp4`,
281.0 s, SHA 7489f18f…). Your job is NOT to review quality — two gate reviews already approved the evaluation — but to verify
(1) every required deliverable exists and is reachable, and (2) the video, code, README, live site, release notes and the
HackerEarth submission text all say the same thing, with no stale references or contradicting numbers.

Work in the main checkout READ-ONLY (you may run ffmpeg/ffprobe/curl/gh and replay commands; write nothing except your report
file). Canonical ground truth for every number: `evals/results/changelog-data.json` and `evals/results/*.{short,long}.json`.

## A. Deliverables inventory (against the organiser's own words)
Read `hackathon-docs/micro1 - First Hackathon97ce7c5.pdf` (Read tool, pages as needed) and list every required deliverable it
names. For each: where it lives in this submission (file/URL), and PRESENT / MISSING / PARTIAL. Expected set at minimum:
public repo; README with intended user + bottleneck + value; labelled Improvement Changelog with a failed experiment; main
failure mode; hot take; reproduction guide; ≤ 5-minute video; agent trajectories incl. the coding agents; tools disclosure.
Also verify: repo is public (gh repo view yadneshSalvi/legal-redline --json visibility), LICENSE exists, live demo responds
(https://playbook-redliner.vercel.app — /, /evals, /runs return 200), releases v1.3/v1.2/v1.1/v1.0 exist and v1.3's asset
downloads (HTTP 200 via curl -I on the download URL).

## B. Number and wording alignment (the core of this audit)
Build one table: claim → value in each artefact → MATCH/MISMATCH. Artefacts:
1. `README.md` (§5 both tables, §7, §10, header line).
2. `IMPROVEMENT_CHANGELOG.md` (round-1 table, calibration section, Round-2 section incl. disclosures, hard case, failure
   mode, hot take).
3. `REPRODUCE.md` (commands and their claims — actually run: `pnpm typecheck && pnpm lint && pnpm test`;
   `pnpm eval --all --tier all` full replay, expect 0 misses and a clean git tree; `pnpm review data/contracts/synth-hardcase/contract.docx
   --config final-v4 --mode replay --accept-all` then `pnpm validate-docx --run <id> --pdf`).
4. `plans/09_submission.md` — the text the author will paste into HackerEarth: title, short description (must be ≤ 1,000
   characters — count it), long description, links (repo, demo, video v1.3), tools disclosure. Every number in it must match
   the canonical JSON and the README.
5. The video: `plans/video/narration.json` (the spoken text), `plans/video/card-data.json`, and frames you extract yourself
   from `plans/video/renders/playbook-redliner.mp4` (ffmpeg -ss <t> …; the beat table is in
   `plans/video/renders/playbook-redliner-1080p.md`). Check at least: baseline tiles (1.1 / 60.3 / 41.7 / none), the
   comparison numbers spoken and shown (1.1→54.7 short CRR; 60.3→75.3 long F1; 41.7→62.5 long yield; 47.6 % holdout
   footnote), the cap narration (eighteen-month / USD 1,500,000) vs the frame, ingest stats frame, changelog card, end-card
   URL, total duration ≤ 300 s.
6. GitHub release notes v1.3 (gh release view v1.3 --json body) — numbers and claims consistent with the README; music
   credit (Kevin MacLeod CC BY 4.0) present in BOTH the release notes and README §10.
7. Live site: https://playbook-redliner.vercel.app/api/evals must be JSON-identical to the committed
   `evals/results/changelog-data.json`; spot-check the /evals page text (curl) references nothing stale.

## C. Stale-reference and placeholder sweep
Grep the user-facing artefacts (README, IMPROVEMENT_CHANGELOG, REPRODUCE, EVAL, PLAYBOOK, SCHEMA, STYLE, LICENSE,
docs/**, trajectories/README, plans/09_submission.md, plans/video/{narration.json,card-data.json}) for:
- `{{` and `⟨` placeholders; TODO/TBD/XXX;
- download links to v1.0/v1.1/v1.2 presented as THE video (historical mentions labelled as earlier cuts are fine);
- durations that contradict 281 s (e.g. "4 min 37 s", "5 min," "4:52");
- "final-v2"/"final-v3" described as shipped; "final" described as the shipped config outside round-1 context;
- the custom domain playbook-redliner.yadneshsalvi.com anywhere user-facing (it does not resolve);
- dead relative links in README/CHANGELOG/REPRODUCE/trajectories README (every referenced path must exist);
- absolute paths (/Users/…) in any user-facing doc.

## D. Honesty guardrails (must remain present — flag if any got lost in editing)
README/changelog still state: the ≥ 70 % pre-registered criterion failed (47.6 % holdout); dev 68.8 % is a best-of-two
selection (clean run 53.1 %); baseline format-neutral 20.0 %; memory ≈ 0; final-v3 regressed and is not shipped; judge never
sees the pipeline's checklists; run-to-run variance ≈ 1.2 pp.

## Report
Write the full report to `plans/harness/reports/<UTC-stamp>-gate-submission.md` (the ONLY file you write) and reply with a
compact version (< 3,000 chars): verdict SUBMIT-READY / FIX-FIRST, the deliverables table (one line each), and every
discrepancy as `severity · artefact:line · what · fix`. Severity: BLOCKER (wrong number / missing deliverable / broken
command), MINOR (stale wording), NIT. Do not fix anything yourself.
