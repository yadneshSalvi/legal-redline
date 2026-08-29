# STYLE.md — Playbook Redliner art direction (the law for every UI change)

**Mood:** a premium legal workspace. The calm confidence of a top-tier firm's letterhead meets the
precision of Linear. Paper, ink, hairlines, generous whitespace; redlines rendered exactly the way
lawyers read them in Word (red strike-through deletions, blue underlined insertions, amber comment
anchors). Every screen should look composed, quiet, and expensive. Nothing may read as "AI-generated
dashboard". Single light theme — paint every color explicitly; no dark mode.

## 1. Tokens — the only source of color, type, radius, shadow (`src/tokens.ts` + `app/globals.css` `@theme`)

| Token | Value | Use |
|---|---|---|
| `paper` | `#FBFAF7` | app background (never pure white, never gray-100) |
| `sheet` | `#FFFFFF` | the document page, cards, panels |
| `ink` | `#1B1B1F` | primary text, icons |
| `ink.muted` | `#5C5B66` | secondary text (≥ 4.5:1 on sheet and paper) |
| `ink.faint` | `#8A8994` | tertiary text: counts, units, timestamps |
| `hairline` | `#E6E3DC` | 1 px rules, borders, table lines |
| `hairline.strong` | `#D5D1C7` | active borders, dividers between panes |
| `navy` | `#1E2A47` | brand / primary buttons / active nav / focus ring (2 px) |
| `navy.soft` | `#E9EDF6` | selected rows, primary-tinted backgrounds |
| `deletion` | `#B3261E` | tracked-change deletions (strike-through), critical severity |
| `deletion.soft` | `#FBE9E7` | deletion background wash (≤ 100 % only on hover) |
| `insertion` | `#1E5AA8` | tracked-change insertions (underline), links |
| `insertion.soft` | `#E7F0FB` | insertion background wash |
| `comment` | `#B98A1F` | comment anchors, high severity |
| `comment.soft` | `#FFF4D6` | comment highlight in the document |
| `verified` | `#2A7F6F` | verifier pass, accepted state, success |
| `verified.soft` | `#E4F3EF` | accepted wash |
| `medium` | `#4A5B8C` | medium severity |
| `low` | `#6B6B75` | low severity, disabled |

Severity color mapping: critical → `deletion`, high → `comment`, medium → `medium`, low → `low`.
These are the **only** saturated colors allowed anywhere. No default Tailwind palette. No new hex
values without editing `src/tokens.ts` and this file. Gradients are forbidden except a single
optional `paper → sheet` top-to-bottom wash on the landing hero.

**Type.**
- UI: **Inter** (via `next/font/google`), 13 px base in dense panels, 14 px in forms, 12 px small-caps
  labels (`letter-spacing: 0.08em`, uppercase, `ink.muted` — `ink.faint` is below 4.5:1 at that size and is reserved for icons, list markers and disabled text).
- Document ("the paper"): **Source Serif 4** 15.5 px / 1.65 line-height, max column 760 px, 64 px
  horizontal padding, headings 600 weight with their original numbering preserved.
- Mono (JSON, tokens, ids, cost): **Geist Mono** or system monospace, 12 px, `font-variant-numeric: tabular-nums`.
- Headlines (landing, page titles): Source Serif 4 600, tight tracking (-0.01em).

**Radius:** 6 px inputs/chips · 10 px cards/panels · 999 px pills. **Borders** over shadows; when a
shadow is needed: `0 1px 2px rgba(27,27,31,.06), 0 8px 24px -12px rgba(27,27,31,.18)`.
**Spacing:** 4 px base; panel padding 16/20; card gap 12; section gap 24; page gutter 32.

## 2. Tracked-change rendering (must match Word conventions exactly)

- Deleted text: `color: deletion; text-decoration: line-through; text-decoration-thickness: 1.5px`.
- Inserted text: `color: insertion; text-decoration: underline; text-underline-offset: 3px`.
- Proposed (not yet accepted) changes render at 100 % with a 2 px `hairline.strong` left rule on the
  paragraph; accepted → left rule `verified`; rejected → change hidden, original text restored,
  paragraph rule removed. Hovering a finding card highlights its paragraph (`navy.soft` wash, 160 ms).
- Comment anchors: a numbered pill (`comment.soft` bg, **`ink` text**, `comment` border/dot, 11 px mono) at the end of
  the anchored text; the comment body lives in the finding card, and in the exported docx. Amber (`comment`) is never
  used as text on white or on `comment.soft` (3.1:1) — it is a border, wash or dot colour; the same rule applies to the
  High severity pill. `verified` text sits on `sheet`, not on `verified.soft`.
- A word-level diff (`diff` package, `diffWords`) drives rendering; never show a whole-paragraph
  replace as one strike + one insert when a word diff is possible.

## 3. Layout — the review workspace (`/review/[runId]`)

```
┌ top bar 56px: ◀ Runs · ContractName.docx · [Playbook chip] · progress ring/status · cost · [Memo] [Export .docx ▸]
├───────────────┬──────────────────────────────────────┬────────────────────────────────┐
│ outline 240px │ THE PAPER (sheet on paper bg, 760px)  │ FINDINGS 420px                 │
│ sections with │ scrolls independently; redlines inline│ filter chips: All · Critical ·  │
│ severity dots │ paragraph anchors; sticky section hdr │ High · Open · Accepted         │
│ + jump        │                                       │ cards (see §4), keyboard J/K/A/│
│               │                                       │ R/E; sticky summary footer     │
└───────────────┴──────────────────────────────────────┴────────────────────────────────┘
```
- While the run is in progress the findings pane shows the **agent progress board**: planner →
  drafters (one chip per rule: queued / running / done with elapsed and a one-line result) →
  verifier → assembler, streamed over SSE; findings appear as they are verified. Users can start
  reviewing before the run finishes.
- Empty, loading, error states are designed (skeleton lines in `hairline`, copy in Source Serif italic).
- Responsive: ≥ 1440 three panes; 1280 collapses the outline into a popover; < 1024 stacks paper
  over findings with a bottom sheet. Never a horizontal page scroll.

## 4. Finding card anatomy

```
[severity pill] Rule title                                  [verified ✓ | repaired ↻ | unverified]
§ 9.2 Limitation of Liability · status: Deviation · confidence 0.92
"…quoted clause text (truncated 2 lines, expand)…"
Why: one–two sentence rationale citing the playbook position (preferred / fallback).
Proposed redline: inline word-diff preview (≤ 6 lines, expand)
Comment (goes into Word): "…"                     From precedent: Acme MSA (2025) ▸
[Accept  A] [Edit  E] [Reject  R]                            cost $0.11 · 38 s · trajectory ▸
```
Accepted cards collapse to one line with a `verified` check; rejected fade to 60 % with strike on
the title; edited show an "edited by you" tag. Accept-all-verified is available in the footer with a
confirmation.

## 5. Motion
- 150–250 ms ease-out for chrome; paragraph highlight 160 ms; card state changes cross-fade.
- Progress chips animate queued → running (soft pulse of `navy.soft`) → done (settle, no bounce).
- Findings arriving during a run slide in 8 px from the right with a fade; never bounce.
- Respect `prefers-reduced-motion` (fades only).

## 6. Forbidden
Dark mode · default Tailwind blues/purples/zinc · emoji in UI · toast libraries · gradients (except the
one landing wash) · stock shadcn look (primitives are fine when re-themed with our tokens) · placeholder
lorem ipsum · unlabelled icons · console noise · any font outside Inter / Source Serif 4 / mono ·
pure black text · alert-red backgrounds at full opacity.

## 7. Sign-off
Every UI task ships 1440×900 screenshots (plus 1280 and 1920 checks) under `plans/harness/logs/`.
Reviewers judge screenshots against this file first, code second. Looks off = defect.
