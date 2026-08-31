# Brief: video round 4 — user's rough-edge fixes + a full audio↔screen consistency audit   (GPT-5.6 Sol · effort xhigh · video production)

Base: the promoted master `plans/video/renders/playbook-redliner.mp4` (= the candidate the user liked; SHA f3d184fc…, 276.978 s).
Pipeline: `plans/video/README.md`; last report `plans/harness/reports/20260831-095544-video-round3.md`; word timings in
`plans/video/word-timings.json` (regenerate via Deepgram only for beats whose narration changed). Keep every beat you are not told to
change byte-identical. Keep the current master as `renders/playbook-redliner-v1.2.mp4` before promoting anything.

## Fix 1 — keyboard-review (~2:05–2:24): show the cap change, then a gentle pass
The lead re-wrote this beat's narration (`narration.json`): counsel EDITS the cap, and the true on-screen wording is an
**eighteen-month cap with a USD 1,500,000 floor** (run `NVDjaRym9fKYVj`, decision `edit` on LOL-CAP). Re-TTS this beat, re-run
Deepgram for it, then re-choreograph:
- From "Watch the liability cap" to "million dollar floor": HOLD on the cap redline in the document pane (no scrolling). Draw a
  rectangle annotation around the changed cap text — 3 px, the deletion red from `src/tokens.ts`, fade in 200 ms on "Watch",
  stays through "floor". Frame it so the full edited sentence (18 months / 1,500,000) is legible.
- On "The other findings get the same treatment": remove the rectangle and do ONE slow, gentle scroll over the other redlined
  clauses (no per-clause commentary, ≤ 1/3 screen-height per second), ending before the beat's tail.
- The A/E/R decision moments earlier in the beat keep their existing footage and tick SFX.

## Fix 2 — hard-case punch-in (~3:05–3:10): truncation
The current zoom into the trajectory tool rows cuts off the left part of the screen that the viewer needs. Reframe: zoom less or
target further left so the complete tool-call rows (tool name + arguments) are inside the frame. Then audit EVERY punch-in in the
video for the same defect: nothing the narration refers to may be cropped out; list each move and its visible region in the report.

## Fix 3 — comparison-live (~3:11–3:37): the numbers on screen must be the numbers spoken
The narration (unchanged) says: complete redlines 1.1 → 54.7 (short tier), long-document F1 60.3 → 75.3, applied tracked changes
41.7 → 62.5 (long tier). The current footage shows the pooled headline cards (0.7 → 44.1 CRR, 71.3 → 81.8 yield) — wrong scope.
Re-record `clips/evals-dashboard.mp4` on the local dev server (replay mode is enough: `pnpm dev -p 3110`; `/evals` renders from the
committed report) and choreograph by word timing:
- "Now the results" → brief full-page view (headline strip may pass by, no hold on it).
- "Complete redlines … fifty-four point seven" → Short tier selected; punch in to the ladder's CRR column framing the `b1-prompt`
  row (1.1%) and the `final-v4` row (54.7%) together.
- "On the forty-thousand-word contracts" → click the Long tier control (visible click), punch in to F1 MACRO column (60.3 → 75.3).
- "applied tracked changes …" → pan/track right to the APPLIED YIELD column (41.7 → 62.5), keeping row labels visible.
- "Nothing is applied silently" → zoom out to the full ladder.
- The static `comparison-card` that follows: rebuild its lines with scope labels so they read exactly
  "Complete redlines (12 short): 1.1% → 54.7%" · "Long-document F1 (6 long): 60.3% → 75.3%" · "Applied tracked changes (long):
  41.7% → 62.5%", keeping the existing footnote "47.6% on the 8 held-out contracts".

## Fix 4 — baseline tile highlight
The 41.7% tile currently gets a highlight ring on "falls short" although the narration never mentions it. Remove that ring; only
the three spoken tiles (1.1% · 60.3% · Word output none) get rings, on their words.

## Full consistency audit (report it)
Walk the whole video against `word-timings.json` and produce a table: every spoken number/name → timestamp → what is visible on
screen at that moment → MATCH/FIXED. This includes: 1–3 hrs overlay, three playbook positions, 18 rules, Corio, ingest stats,
"six at a time", the cap wording (now 18 months / 1.5M), hard-case "twelve months' Fees", all comparison numbers, changelog-card
numbers, closing URL. Anything inconsistent that this brief did not anticipate: fix it the same way (prefer fixing the visual;
change narration only when the visual is the ground truth, and say so).

## Acceptance
≤ 300 s; narration ≤ 1.05× everywhere (re-TTS'd keyboard-review at 1.000×); all unchanged beats byte-identical (SHA table);
no truncated punch-ins; frame-diff smoothness on any new/changed move; audio mix as before (music ducked, credit unchanged);
extract 10 frames incl. the cap-rectangle moment, the fixed hard-case zoom and each comparison column punch-in, and look at them;
update `renders/playbook-redliner-1080p.md`.

## Rules
Only `plans/video/**`. Port 3110; kill only what you start; replay mode needs no keys. No git. Secrets out of logs.

## Report (FINAL message — exactly)
```
## Summary
## Render evidence      (ffprobe, per-beat table, changed vs byte-identical beats)
## Consistency audit    (the full spoken↔screen table)
## Frames               (paths + what each shows)
## Known gaps / risks
```
