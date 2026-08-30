# Playbook Redliner solution video

This directory is a reproducible, music-free production pipeline for the five-minute solution video. It uses Gemini TTS, a genuine locally recorded agent run, token-faithful HTML title cards, the exported redlined Word output, and ffmpeg assembly.

## Regenerate

Run from this directory:

```sh
cd plans/video
node bin/tts.mjs
PLAYBOOK_URL=http://localhost:3110 zsh bin/record.sh all
node bin/cards.mjs
zsh bin/word-still.sh /absolute/path/to/data/runs/<run-id>/output.docx
node bin/assemble.mjs
```

The recorder defaults to `https://playbook-redliner.vercel.app`. To record a local build, first confirm port 3110 is free, start `pnpm dev -p 3110` yourself, then run:

```sh
PLAYBOOK_URL=http://localhost:3110 zsh bin/record.sh all
```

The final file is `renders/playbook-redliner.mp4`. Intermediate UI captures are in `clips/`, generated cards in `cards/`, Word pages in `word/`, and accessibility snapshots plus recorder logs in `logs/`.

## Final numbers and run data

The cards and narration use the committed Round 2 evaluation values. On the short tier, complete redlines rise from 1.1% for `b1-prompt` to 54.7% for shipped `final-v4`. On the long tier, issue-detection F1 rises from 60.3% to 75.3%, and applied tracked-change yield from 41.7% to 62.5%. The Round 2 rationale retains the round-1 short-tier context: issue-detection F1 moved from 91.5% to 94.8%.

The final UI capture follows local CORIO run `NVDjaRym9fKYVj` from sample selection through the changing planner/worker board and first verified findings. The findings-arrive portion uses `setpts=(PTS-STARTPTS)/2` in `bin/assemble.mjs`. Findings-arrive and precedents keep their full narration-led screen time and their narration plays at 1.000×; their source clips stay byte-identical. The export interaction is compressed to 2× so its button, confirmation, generation wait, and success link fit one narrated beat. Keyboard decisions, precedent lookup, export success, and the memo are all from the completed same run. `logs/live-run.json` records the run evidence and clip offsets.

The evaluation capture opens the real local dashboard at `/evals?tier=long`, scrolls the configuration ladder, and then switches to the short tier. After shortening `problem` by the allowed ten words, a fully native narration timeline is 304.727 seconds. Only the four revised narrations — `problem`, `comparison`, `round2-why`, and `changelog` — play at 1.052×; every product-workflow narration remains at 1.000×. The assembled cut is 299.910 seconds.

The hard-case trajectory is genuine record-mode run `JxR5VovErXWC5F`. Its LOL-CAP worker visibly resolves `get_definition("Fees")` to the Implementation Fee, then follows that term with `search("Implementation Fee")` and `read_section("Definitions")`. Three genuine attempts produced that semantically equivalent tool path rather than a second `get_definition("Implementation Fee")` call; the capture preserves the emitted trace without fabrication. `logs/hardcase-run.json` records the evidence.

Pass a different redlined document to `zsh bin/word-still.sh /absolute/path/to/output.docx`. The script renders every page, selects the page with the most red/blue tracked-change pixels, and builds a slow twelve-second Ken Burns clip. Its default is `data/runs/PFLRALt3w26sfg/output.docx`.

LibreOffice does not display pending Word revisions in its headless PDF export. For the still only, the script makes a temporary render copy that exposes `w:ins`/`w:del` content with blue underline/red strike styling; it never changes the source DOCX.

`assemble.mjs` gives every narrated visual a 0.4-second tail, uses 250 ms visual cross-fades, normalizes each narration beat to −16 LUFS with 300 ms fades, and fails if the result exceeds five minutes.
