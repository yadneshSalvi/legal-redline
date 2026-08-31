# Brief: video round 3 — the director's cut (user feedback, 10 items)   (GPT-5.6 Sol · effort xhigh · video production)

`plans/video/**` is your pipeline (`plans/video/README.md`; last report `plans/harness/reports/20260830-195805-video-round2-fix.md`).
The user watched the v1.1 cut and gave ten notes. The lead rewrote the whole narration (`plans/video/narration.json`, 18 beats — a new
`opening` beat is first; no `{{…}}` placeholders this time, numbers are spelled out). Rebuild the number cards and the affected visuals;
keep every product clip you can. Target ≤ 5:00; the narration is ~247 s at natural pace, so there is room. **No narration above 1.05×.**

## Word-level sync (user item 3) — the backbone of this cut
`DEEPGRAM_API_KEY` is in `.env`. After TTS, send each beat's WAV to Deepgram pre-recorded
(`POST https://api.deepgram.com/v1/listen?model=nova-2&smart_format=false&punctuate=false`, `Authorization: Token …`,
`Content-Type: audio/wav`) and store per-beat word timestamps in `plans/video/word-timings.json`
(`{ beatId: [{word, start, end}] }`). Use them to time every on-screen event named below to the exact word. Never log the key.

## Beat-by-beat spec (narration text is authoritative in narration.json)
1. **opening** (new, ~7 s): a title card in the existing card style. Line 1 large serif: "Agentic contract review". Line 2:
   "for negotiating legal contracts". The narration says the user's framing sentence; card appears on "We built", line 2 fades in
   on "negotiating". Soft music starts here (see Audio).
2. **cold-open** (user item 2): NO Ken Burns, no drift — the v1.1 zoompan visibly shakes. Sequence, word-timed:
   a. Static full-page shot of the redlined output page (re-render the LibreOffice page still at 2× and scale down for crispness)
      from "This is what" until the word "vendor".
   b. On "Tracked changes": a single smooth 1.0 s zoom into the redlined paragraph (animate a crop with eased keyframes on the 2×
      source — cubic ease-in-out; verify two consecutive frames have no jitter by extracting and diffing them), then HOLD static.
   c. On "one to three hours": overlay bottom-right in the deletion red from `src/tokens.ts`, mono font: "Time taken: 1–3 hrs!"
      (fade in 200 ms). Keep it until the beat ends.
3. **problem** (user item 4): rebuild the problem card so the three positions appear as three small tiles labelled
   "Preferred / Fallback / Walk-away", each fading in exactly on its spoken word. The rest of the card carries the two pain points
   ("terms hide in definitions", "must match last month") appearing on their sentences.
4. **baseline** (user item 5): the card's four tiles stay (Complete redlines 1.1% · Long-document F1 60.3% · Applied tracked
   changes 41.7% · Word output none) — the narration no longer mentions short-contract F1, and each tile gets a subtle highlight
   ring exactly when its number is spoken.
5. **landing**: unchanged clip; on "eighteen rules" punch in ~1 s to the playbook panel if it is visible, else leave as is.
6. **pick-sample** (user item 6): the visual MUST show the sample picker with the CORIO row highlighted from the first word.
   Re-cut the source clip so the picker (not the landing hero) is on screen for this whole beat; punch in to the CORIO row on
   "Corio, the customer".
7. **workspace-run** (user item 7): the Ingest board bug is FIXED in the app (the Ingest row now shows
   "N paragraphs · sections · defined terms" as completed). Re-record this clip: start the dev server
   (`REDLINER_LLM_MODE=live pnpm dev -p 3110`, keys in `.env`) and run one live review of **cuad-corio-hosting** (~$5, 4–5 min),
   or resume from the sample picker recording in one session so pick-sample and workspace-run come from the same run. Verify in
   the captured frames that Ingest shows the green check while Planner runs. Word-sync: on "planner" punch in ~1 s to the Working
   panel; on "eighteen drafters" zoom out to full screen; on "six at a time" punch in to the running chips.
8. **findings-arrive**: from the same new recording; 2× if needed; on "word for word" punch in to a chip line; on "findings appear
   here" punch in to the findings pane as one slides in.
9. **keyboard-review**: keep the v1.1 clip if its timing fits the new narration; word-sync the punch-ins: on "J and K" show the
   list moving; on "Watch the liability cap" punch in to the LOL-CAP card and HOLD through "floor".
10. **precedents / export-dialog / memo-drawer**: keep the clips; add one gentle punch-in each (precedent card · success banner
    with the download link · memo walk-away section), timed to the matching words.
11. **hard-case**: keep the trajectory clip; on "follows the definition" punch in to the get_definition/search rows; on "one clean
    redline" cut to the redline preview if the clip has it, else hold.
12. **comparison**: dashboard clip (`/evals?tier=long` then the tier switch) — re-time so each metric row/card is in view exactly
    when spoken; the comparison-card that follows gets a small footnote line: "47.6% on the 8 held-out contracts".
13. **round2-why / changelog / hot-take / closing**: cards; regenerate from the new narration with `bin/cards.mjs` data updated to
    the new wording (changelog card ladder still ends at final-v4; keep the removed monolith chip). End card URL
    `playbook-redliner.vercel.app`.

## Camera language (user item 8)
Punch-ins are the only camera move: ~1.0 s eased zoom to the active region, hold 2–6 s, ~1.0 s back out. Implement as eased crop
keyframes on 2× sources (no per-frame zoompan jitter — extract consecutive frames of every move and confirm sub-pixel smoothness).
Never two moves inside 3 s. Static is fine; shaking is not.

## Audio (user item 8)
- Background music: one instrumental bed, CC0, from Pixabay Music (direct CDN download, no key) or Kevin MacLeod/incompetech
  (CC-BY — then credit in `plans/video/README.md` AND the release notes text you put in the report). Calm, modern, no vocals.
  Mix at ≈ −28 LUFS under narration with ~6 dB ducking while words play; fade in over the opening, fade out under closing.
- SFX, sparse and quiet (−24 dB): a soft whoosh on each punch-in, a subtle tick when A/E/R decisions land in keyboard-review,
  one soft chime on the export success banner. CC0 sources only; list every file + source + licence in plans/video/README.md.
## Acceptance
≤ 300 s; h264/aac 1920×1080; narration ≤ 1.05× everywhere; word-timed events verified against `word-timings.json` (list 8 spot
checks in the report: word → timestamp → what changed on screen); no visible jitter in any camera move (state how you verified);
Ingest row completed in the workspace clip; no `{{`; extract 10 frames and look at them; update `renders/playbook-redliner-1080p.md`.

## Rules
Only `plans/video/**` (the app fix is already in the checkout — do not edit app/src). Port 3110 for the dev server; kill only what
you start. Do not overwrite `renders/playbook-redliner.mp4` until the new master passes acceptance; keep the v1.1 file as
`renders/playbook-redliner-v1.1.mp4` first. No git. Secrets out of logs.

## Report (FINAL message — exactly)
```
## Summary
## Render evidence     (ffprobe, per-beat table with narration rate + camera moves, total duration)
## Word-sync spot checks (8 rows: beat · word · Deepgram t · on-screen event)
## Live run            (id, cost, duration — or which existing recording was reused)
## Audio               (music + SFX sources, licences, LUFS)
## Known gaps / risks
```
