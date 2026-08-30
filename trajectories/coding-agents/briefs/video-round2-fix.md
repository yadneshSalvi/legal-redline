# Brief: video round 2 — fix pacing (no time-compressed narration), keep everything else   (GPT-5.6 Sol · video production · short job)

The round-2 cut (`plans/video/renders/playbook-redliner.mp4`, 4:58.1) is correct in content — see `plans/harness/reports/20260830-193759-video-round2.md`
and `plans/video/renders/playbook-redliner-1080p.md`. Its one flaw: to fit 300 s, `findings-arrive` and `precedents` were trimmed by 4 s each and
their narration (and the `round2-why` beat) time-compressed (atempo 1.24×, 1.67×, 1.40×). Speech above ~1.15× sounds rushed. The lead has
shortened the narration texts of `round2-why`, `changelog` and `comparison` in `plans/video/narration.json` (fewer words, same placeholders).

## Do exactly this
1. Regenerate TTS only for beats whose text changed (`node bin/tts.mjs` skips unchanged beats); fill the placeholders from
   `evals/results/changelog-data.json` exactly as before (same values as the 19:37 report's table).
2. Remove the 4-second trims on `findings-arrive` and `precedents` (restore their previous clip lengths / timeline entries) and remove any
   atempo compression: every narration plays at 1.00× (a ≤ 1.10× is acceptable only if the total would otherwise exceed 300 s — say so).
3. Re-assemble. Acceptance: ≤ 300.0 s total, h264/aac 1920×1080, no `{{`, product beats byte-identical to the 19:37 render (SHA-256 of
   the clips), cards unchanged, end card URL `playbook-redliner.vercel.app`. If the total exceeds 300 s at 1.00×, shorten only the
   `problem` beat's narration by up to 10 words (keep meaning) and re-TTS it; do not touch product beats.
4. Extract 8 evenly spaced frames, look at them, update `renders/playbook-redliner-1080p.md` (per-beat table, durations, narration rates).

## Rules
Only `plans/video/**`; no dev-server needed (the dashboard clip is already captured); no git; secrets out of logs; `bin/tts.mjs` uses the
configured TTS key from `.env`.

## Report (FINAL message — exactly)
```
## Summary
## Render evidence   (ffprobe, per-beat table with narration rate per beat, total duration)
## Changed / unchanged   (which wavs regenerated; SHA-256 match for product clips)
## Known gaps / risks
```
