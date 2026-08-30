# Brief: solution-video production pipeline (≤ 5:00)   (GPT-5.6 Sol · tooling build)

You are a senior engineer + video producer on **Playbook Redliner** (read `AGENTS.md`, `plans/07_video.md` — the beat sheet and narration draft —,
`STYLE.md` §1 for title-card tokens, `README.md`). Repo: `~/code/hackathons/legal-redline`. You only write under `plans/video/**`
(scripts, assets, renders) — never touch `src/`, `app/`, `scripts/`, `data/`, `evals/`. An evaluation campaign is running in this checkout: do not
run `pnpm test`/`pnpm build`, and never kill node processes you did not start. Dev server for you: `pnpm dev -p 3110` (only if 3110 is free; the
app also runs at https://playbook-redliner.vercel.app — prefer the deployed URL for recordings unless it lags).

## Goal
A reproducible pipeline that turns the beat sheet into `plans/video/renders/playbook-redliner.mp4` (1920×1080, 30/60 fps, AAC audio, ≤ 5:00):
narration (Gemini TTS) + screen recordings of the real app + title/metric cards + a light music-free mix. Build and test it end to end now with the
**current** app and placeholder numbers; the lead will re-run it with final numbers and a real pipeline run tomorrow.

## Scope
1. `plans/video/bin/tts.mjs` — Gemini TTS via REST (`GEMINI_API_KEY` from `.env`, never printed): model `gemini-2.5-flash-preview-tts` (or the current
   TTS-capable model if that id 404s — probe `https://generativelanguage.googleapis.com/v1beta/models?key=…` and pick the newest `*tts*` model), voice
   `Charon` or `Kore` with a warm, unhurried style prompt, 24 kHz mono PCM → WAV (add the header yourself). Input: `plans/video/narration.json` (an array of
   `{ id, text }` beats — seed it from the narration column in `plans/07_video.md`, placeholders like `{{B1_F1}}` left literally for now); output
   `plans/video/narration/<id>.wav` + `plans/video/narration/manifest.json` (durations via ffprobe). Cache by text hash so re-runs only synthesise changed beats.
2. `plans/video/bin/lib.sh`, `rec.mjs`, `cdp.mjs` already exist (copied from a previous project; `rec.mjs` records the agent-browser page via CDP screencast
   into an H.264 mp4). Adapt `lib.sh` to this app (session name, URL, viewport 1920×1080) and write `plans/video/bin/record.sh` with one function per beat
   from the beat sheet: landing → pick sample → workspace during run (`/review/sample-running` for now) → findings arrive → keyboard review (J/K/A/E/R with
   the edit dialog) → export dialog → memo drawer → `/evals` dashboard → `/trajectories/sample` → precedents. Each beat: `rec_start <beat>`, drive the UI
   with `agent-browser` (snapshot/refs, keyboard), `rec_stop`, producing `plans/video/clips/<beat>.mp4`. Move the mouse visibly for clicks (CDP
   `Input.dispatchMouseEvent` moves) so viewers can follow. Keep each clip a little longer than its narration.
3. `plans/video/bin/cards.mjs` — renders title/metric cards as 1920×1080 PNGs from small HTML templates (STYLE.md tokens, Source Serif 4 + Inter via
   Google Fonts, paper background): cold-open title, "who has this problem", "the baseline", the comparison card (table with placeholders), the changelog
   ladder card, hot-take card, closing card with the URL. Use `agent-browser` to screenshot the HTML (`file://`), or Playwright if simpler.
4. `plans/video/bin/word-still.sh` — converts a redlined docx to PNG pages with LibreOffice (`/Applications/LibreOffice.app/Contents/MacOS/soffice
   --headless --convert-to pdf` + `pdftoppm -r 150`) for the "real Word output" beat; input defaults to `data/runs/PFLRALt3w26sfg/output.docx` (exists).
   Produce a 6-second Ken-Burns clip from the most redlined page with ffmpeg (`zoompan`).
5. `plans/video/bin/assemble.mjs` — reads `plans/video/timeline.json` (ordered beats: `{ id, kind: "clip"|"card"|"still", src, narration?, hold? }`),
   trims/pads each visual to its narration duration (+0.4 s tail), concatenates with 250 ms cross-fades, mixes narration at −16 LUFS with 300 ms fades,
   burns nothing (no captions), outputs `plans/video/renders/playbook-redliner.mp4` and prints the total duration; fail if > 300 s.
6. `plans/video/README.md` — how to regenerate: `node bin/tts.mjs`, `zsh bin/record.sh all`, `node bin/cards.mjs`, `zsh bin/word-still.sh`,
   `node bin/assemble.mjs`; plus how to swap in final numbers (edit `narration.json` + card data) and a real run id.

## Acceptance
- A complete `playbook-redliner.mp4` renders now (with placeholder text/numbers), plays (ffprobe: h264 + aac, 1920×1080), duration ≤ 5:00, narration
  audible and in sync, clips readable at 1080p, no dev overlays/cursors stuck, no console error banners visible.
- `plans/video/narration/manifest.json` lists every beat with its duration; total narration ≤ 4:30.
- Report the per-beat durations and the total.

## Rules
Only Node built-ins + ffmpeg/ffprobe/pdftoppm/soffice/agent-browser (installed). No `pnpm add`. Keep secrets out of logs. Atomic writes. No git.

## Report (FINAL message structure — exactly)
```
## Summary
## Files
## Render evidence   (ffprobe summary, per-beat table, total duration, path)
## Known gaps / risks
```
