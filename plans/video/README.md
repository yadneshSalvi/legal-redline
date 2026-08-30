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

The cards and narration use the recorded evaluation values: baseline F1 91.5%, validity 42.7%, minimality 11.0%; final F1 94.8%, precision 97.7%, validity 50.6%, minimality 35.6%.

The final UI capture follows local CORIO run `NVDjaRym9fKYVj` from sample selection through the changing planner/worker board and first verified findings. The findings-arrive portion uses `setpts=(PTS-STARTPTS)/2` in `bin/assemble.mjs`, so that source passage is shown at 2× while the narration remains natural speed. The export interaction is also compressed to 2× so its button, confirmation, generation wait, and success link fit one narrated beat. Keyboard decisions, precedent lookup, export success, and the memo are all from the completed same run. `logs/live-run.json` records the run evidence and clip offsets.

The hard-case trajectory is genuine record-mode run `JxR5VovErXWC5F`. Its LOL-CAP worker visibly resolves `get_definition("Fees")` to the Implementation Fee, then follows that term with `search("Implementation Fee")` and `read_section("Definitions")`. Three genuine attempts produced that semantically equivalent tool path rather than a second `get_definition("Implementation Fee")` call; the capture preserves the emitted trace without fabrication. `logs/hardcase-run.json` records the evidence.

Pass a different redlined document to `zsh bin/word-still.sh /absolute/path/to/output.docx`. The script renders every page, selects the page with the most red/blue tracked-change pixels, and builds a slow twelve-second Ken Burns clip. Its default is `data/runs/PFLRALt3w26sfg/output.docx`.

LibreOffice does not display pending Word revisions in its headless PDF export. For the still only, the script makes a temporary render copy that exposes `w:ins`/`w:del` content with blue underline/red strike styling; it never changes the source DOCX.

`assemble.mjs` gives every narrated visual a 0.4-second tail, uses 250 ms visual cross-fades, normalizes each narration beat to −16 LUFS with 300 ms fades, and fails if the result exceeds five minutes.
