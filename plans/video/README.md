# Playbook Redliner solution video

This directory is a reproducible, music-free production pipeline for the five-minute solution video. It uses Gemini TTS, deterministic fixture routes in the deployed app, token-faithful HTML title cards, the real redlined Word output, and ffmpeg assembly.

## Regenerate

Run from this directory:

```sh
cd plans/video
node bin/tts.mjs
zsh bin/record.sh all
node bin/cards.mjs
zsh bin/word-still.sh
node bin/assemble.mjs
```

The recorder defaults to `https://playbook-redliner.vercel.app`. To record a local build, first confirm port 3110 is free, start `pnpm dev -p 3110` yourself, then run:

```sh
PLAYBOOK_URL=http://localhost:3110 zsh bin/record.sh all
```

The final file is `renders/playbook-redliner.mp4`. Intermediate UI captures are in `clips/`, generated cards in `cards/`, Word pages in `word/`, and accessibility snapshots plus recorder logs in `logs/`.

## Final numbers and run data

1. Replace placeholders in `narration.json` and `card-data.json`. Keep narration ids unchanged, then rerun TTS and cards. TTS hashes each beat's text, so unchanged WAV files stay cached.
2. To use a real app run, replace `/review/sample-running` and `/review/sample` in `bin/record.sh` with `/review/<run-id>`. Replace `/trajectories/sample` with `/trajectories/<run-id>`. Keep a replay-cached run available so capture timing remains deterministic.
3. Pass a different redlined document to `zsh bin/word-still.sh /absolute/path/to/output.docx`. The script renders every page and selects the page with the most red/blue tracked-change pixels. Its default is `data/runs/PFLRALt3w26sfg/output.docx`.
4. Reorder visuals or change non-narrated card holds in `timeline.json`, then rerun assembly.

LibreOffice does not display pending Word revisions in its headless PDF export. For the still only, the script makes a temporary render copy that exposes `w:ins`/`w:del` content with blue underline/red strike styling; it never changes the source DOCX.

`assemble.mjs` gives every narrated visual a 0.4-second tail, uses 250 ms visual cross-fades, normalizes each narration beat to −16 LUFS with 300 ms fades, and fails if the result exceeds five minutes.
