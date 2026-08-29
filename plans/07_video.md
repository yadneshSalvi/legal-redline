# Solution video plan (≤ 5:00, 1920×1080, 60 fps)

Required beats (from the brief): **problem + simple baseline → one realistic execution start to finish → final comparison →
changelog (biggest contribution + one removed experiment)**. Narration: AI voice (Gemini TTS, warm, unhurried) over screen capture
(agent-browser `record start` / QuickTime) + a few title cards. Assemble with ffmpeg (or HyperFrames if time allows).

| t | Beat | Screen | Narration (draft) |
|---|---|---|---|
| 0:00 | Cold open | Word document with red/blue tracked changes appearing paragraph by paragraph | "This is what in-house counsel actually sends back to a vendor: tracked changes and comments in Word. Producing it takes one to three hours per contract." |
| 0:15 | The user & bottleneck | Title card: customer-side counsel, playbook, 20–60 pages | "Every company has a playbook — preferred, fallback, walk-away positions. The bottleneck is applying it, clause by clause, consistently, without missing the term hidden in a definition three sections away." |
| 0:35 | The baseline | Chat window: contract pasted, "find risks" → prose list; then the eval row for `b1-prompt` | "The naive approach: paste it into a chat assistant. Here is our fair baseline — same model, same playbook, one prompt. It finds {{B1_F1}} of the issues, cites sections that don't exist {{B1_HALL}} of the time, and cannot touch the document." |
| 1:00 | The run begins | Landing → upload `{{DEMO_CONTRACT}}` → workspace; progress board: planner, 18 drafters lighting up, verifier | "Playbook Redliner turns the document into a clause-addressable model, plans which sections matter for each rule, and runs one drafter per rule with tools that read sections, resolve definitions and validate every edit anchor." |
| 1:40 | Findings arrive | Cards slide in; click a critical one: quote, rationale, word-level redline, comment, verifier badge | "Each finding quotes the clause, explains the deviation against the playbook, proposes the smallest redline that reaches our position and drafts the margin comment. An independent verifier checked it — this one was repaired once." |
| 2:15 | Human gate | Keyboard: J/K, accept, edit one (change the cap), reject one; precedent chip | "Nothing is written until I decide. Accept, edit, reject — with keyboard shortcuts. This liability cap language came from a precedent the team approved last month." |
| 2:45 | Export | Export → open `output.docx` in Word/LibreOffice: tracked changes, comments, author "Playbook Redliner"; memo drawer | "Export. Real Word tracked changes, real comments, nothing else touched — verified by re-parsing the file. Plus the issues memo." |
| 3:15 | The hard case | `synth-hardcase`: illusory cap via defined "Fees"; decoys not flagged | "The hard case: a cap that says twelve months' Fees — but Fees is defined elsewhere as a one-off implementation fee. The baseline calls it compliant. The drafter resolved the definition." |
| 3:40 | Comparison | `/evals` dashboard: table baseline vs final, F1 / validity / hallucination / cost | "On twelve contracts — eight real, lawyer-labelled SEC filings and four seeded synthetic ones — detection F1 went from {{B1_F1}} to {{FINAL_F1}}, redline validity from {{B1_VALID}} to {{FINAL_VALID}}, hallucinated citations from {{B1_HALL}} to {{FINAL_HALL}}." |
| 4:05 | Changelog | Timeline: b0 → b1 → i1 → i2 → i3 → i4 → final, with the removed `x-monolith` greyed | "The biggest single gain came from {{BIGGEST}}. We removed the monolith — one agent for all rules — because {{X_REASON}}." |
| 4:35 | Hot take + close | Title card; URL | "{{HOT_TAKE_LINE}} Playbook Redliner — playbook-redliner.yadneshsalvi.com. Everything reproduces from the repo with one command." |

## Production checklist
- [ ] Demo contract chosen (a CUAD hosting agreement ~5k words) and a replay-cached run so the demo is instant and deterministic.
- [ ] Record at 1920×1080 with `agent-browser record start` (headless) or QuickTime (headed) — cursor visible for the review beat.
- [ ] LibreOffice open of `output.docx` (tracked changes visible; "Edit ▸ Track Changes ▸ Show").
- [ ] Narration TTS (Gemini) → `plans/video/narration/*.wav`; music bed low; title cards from `STYLE.md` tokens.
- [ ] Assemble with ffmpeg; ≤ 5:00; export `plans/video/renders/playbook-redliner.mp4`; upload (unlisted YouTube) → `{{VIDEO_URL}}`.
