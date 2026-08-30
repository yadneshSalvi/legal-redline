# Review brief: OOXML engine — revision 2 verification   (GPT-5.6 Sol at max · adversarial, read-only)

You reviewed this engine before (`plans/harness/reports/20260829-233431-review-engine.md`, verdict revise, 8 required fixes). The builder
applied a revision (`plans/harness/briefs/engine-r2.md`, report `plans/harness/reports/20260829-234539-engine.md`). Verify every one of the
11 numbered fixes with your own probes (same style as before: build hostile docx with the `docx` library, apply, unzip, inspect XML, re-parse).
Hold the same bar as last time: required fixes only for genuine defects that remain or were introduced. Note: LibreOffice cannot run inside your
sandbox (code-signature check) — do not report that as a defect; the lead verified `libreoffice.ok = true` outside the sandbox.

Scope: `src/engine/**`, `tests/engine/**`, `scripts/validate-docx.ts`. Contracts: `SCHEMA.md` §1–2, `src/engine/types.ts`, `AGENTS.md`.

Specifically re-probe: (1) bookmarks/fields/SDT/prior-revision preservation counts on an edited paragraph; (2) apply → re-parse → apply with a
subordinate inserted paragraph; (3) overlapping anchors; (4) `"2. The Vendor shall…"` is body text, `"9.1 Vendor's aggregate liability … claim."`
is body text with numbering, `"9. LIMITATION OF LIABILITY"` is a heading, `w:numPr` list labels; (5) definitions positive/negative set including
`(the "Customer")`, `“Affiliate” (as defined in Section 2)`, `"Bogus" meanslessness`; (6) date grammar; (7) control characters; (8) validateDocx
catches duplicate ids / wrong author / structural loss; (9) comment anchor fallback + warning; (10) dense-change grouping in both docx and
`renderParagraph` (the governing-law sentence should be one delete + one insert; "three (3) → twelve (12)" one pair); (11) code hygiene (files ≤ 400
lines, no `any`, determinism). Run `pnpm exec vitest run tests/engine` and paste the summary (the LibreOffice test may fail in your sandbox only).

## FINAL message must be exactly this JSON (no prose outside the block)
```json
{"verdict":"approve|revise","required_fixes":[{"where":"","what":"","why":"","how":""}],"suggestions":[],"evidence":[],
 "score":{"correctness":0,"contract_compliance":0,"quality":0}}
```
