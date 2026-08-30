# Brief: video round 2 — re-cut the measurement beats with the round-2 story, ≤ 5:00   (GPT-5.6 Sol · video production)

`plans/video/**` is the working pipeline you built (`plans/video/README.md`). The submitted cut (`renders/playbook-redliner.mp4`, 4:52.6, release
v1.0) tells the round-1 story: detection F1 91.5 → 94.8. Round 2 changed the headline: a pre-registered **complete-redline rate** and a
**long-document tier** where the one-prompt baseline is genuinely weak. Re-cut only the beats that carry numbers; leave the product beats
(landing … memo-drawer) untouched.

## Values (read, do not invent)
`evals/results/changelog-data.json` → `tiers[]`; `IMPROVEMENT_CHANGELOG.md` §"Round 2"; `README.md` §5. Placeholders in `narration.json`
(the lead rewrote the affected beats): `{{B1_CRR}} {{V3_CRR}} {{B1_LONG_F1}} {{V3_LONG_F1}} {{B1_YIELD}} {{V3_YIELD}} {{B1_F1}} {{FINAL_F1}}
{{ROUND2_WHY}} {{HOT_TAKE_LINE}}`. Spell numbers for speech as percentages with one decimal.

## Beats to re-render
- `baseline` card: four tiles → Complete redlines · Long-document F1 · Applied tracked changes · Word output (none).
- `comparison-live`: `/evals?tier=long` on the local server (real data, round-2 dashboard), scroll the ladder slowly, then the tier switch.
- `comparison-card`, `changelog` card (ladder now ends in `final-v3`; the removed monolith stays), `hot-take` card if the line changed.
- New 12-second beat `round2-why` between `comparison-live` and `changelog` (card, narration from `{{ROUND2_WHY}}`); trim `findings-arrive`
  and `precedents` by 4 s each if needed to stay ≤ 300 s — say what you trimmed.
- Regenerate only changed narration (`node bin/tts.mjs`), cards (`node bin/cards.mjs`), assemble, verify with ffprobe, extract 8 frames and
  look at them; write `renders/playbook-redliner-1080p.md`.

## Acceptance
≤ 300 s, h264/aac 1920×1080, no `{{` anywhere, every number on a card equals the JSON to one decimal, the end card URL is
`playbook-redliner.vercel.app`, untouched product beats byte-identical clips.

## Rules
Only `plans/video/**`; port 3110 for the dev server (`REDLINER_LLM_MODE=replay` is enough — no live run needed this time); no git; secrets out
of logs.

## Report (FINAL message — exactly)
```
## Summary
## Files
## Render evidence   (ffprobe, per-beat table, total duration, frame paths + what each shows)
## Numbers on cards  (value → source field)
## Known gaps / risks
```
