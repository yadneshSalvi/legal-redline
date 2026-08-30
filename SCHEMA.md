# SCHEMA.md — data model, interfaces and protocols (source of truth: the TypeScript files)

The types live in **`src/engine/types.ts`** (document model, redline ops, apply/validate) and
**`src/agent/types.ts`** (findings, proposals, verification, runs, decisions, trajectories, precedents,
configs, SSE protocol). **`src/playbook/schema.ts`** is the playbook zod schema. This file explains how the
pieces fit and fixes the interfaces the type files only mention.

Each rule position also carries an additive `elements` checklist:

```ts
position: {
  preferred: string;
  fallback: string;
  walkaway: string;
  elements: { preferred: string[]; fallback: string[] };
}
```

The strings are atomic operative requirements, not summaries. Round-1 prompt serializers continue to read
only the three prose fields. Element-aware configs persist a `Finding.elementCoverage` target level and one
mapping per target element (`already_met` with a verbatim quote, `addressed_by_operation` with one-based op
indexes, or `unaddressed` with an explanation). `unaddressed` is valid only on a `needs_review` submission.

## 1. Document model

`parseDocx(bytes)` → `DocumentModel`: every `w:p` becomes a `Paragraph` with a stable id `p0000…` in document
order (tables: each cell paragraph is a paragraph too; headers/footers ignored). Headings are detected from
Word styles (`Heading N`), numbering (`1.`, `1.2`, `ARTICLE IV`, `Section 3.`) and ALL-CAPS short lines;
sections form a tree; a paragraph belongs to the nearest heading above. Definitions are parsed from
`"Term" means/shall mean …` and `“Term” (as defined …)` patterns. `parseText` applies the same detection to
plain text (blank-line separated paragraphs). `textToDocx` writes a simple, deterministic docx (Normal + Heading
styles, fixed core properties, fixed timestamps) so the eval set is reproducible byte-for-byte.

## 2. Redlines in OOXML

`applyRedlines(original, doc, req)` edits **a copy** of the original package:
- `replace`: word-level diff (`diff.diffWords`) of `oldText → newText` inside the paragraph; equal segments keep
  the original run formatting; deleted segments become `<w:del w:id w:author w:date><w:r><w:delText xml:space="preserve">…`;
  inserted segments become `<w:ins …><w:r><w:t xml:space="preserve">…` (formatting copied from the run the anchor starts in).
- `insert_after`: a new `w:p` after the anchor with `<w:pPr><w:rPr><w:ins …/></w:rPr></w:pPr>` (paragraph-mark insertion)
  and its runs wrapped in `w:ins`.
- `delete_paragraph`: all runs wrapped in `w:del` + paragraph-mark deletion (`<w:pPr><w:rPr><w:del …/></w:rPr></w:pPr>`).
- comments: `word/comments.xml` (+ content type + relationship) with `w:commentRangeStart/End` around the anchor
  text and a `w:commentReference` run; author/date from the request; initials "PR".
- ids: `w:id` unique across ins/del/comments; dates ISO; author from playbook `style.author`.
`validateDocx` re-parses the result, asserts every untouched paragraph is identical, counts ins/del/comments and
(optionally) shells out to `soffice --headless --convert-to pdf` (skipped gracefully when absent).

## 3. Store (`src/store/`)

```ts
export interface Store {
  putBytes(key: string, bytes: Uint8Array, contentType?: string): Promise<void>;
  getBytes(key: string): Promise<Uint8Array | null>;
  putJson(key: string, value: unknown): Promise<void>;
  getJson<T>(key: string): Promise<T | null>;
  appendLine(key: string, line: string): Promise<void>;          // trajectory.jsonl
  list(prefix: string): Promise<string[]>;
  delete(key: string): Promise<void>;
}
```
Keys: `runs/<runId>/run.json`, `runs/<runId>/source.<docx|txt>`, `runs/<runId>/trajectory.jsonl`,
`runs/<runId>/output.docx`, `runs/<runId>/memo.md`, `precedents/index.json`, `uploads/<id>`.
Implementations: `fs` (root `data/runs`, default locally), `blob` (Vercel Blob, `BLOB_READ_WRITE_TOKEN`), `memory`.
`createStore()` picks by `REDLINER_STORE` env (default `fs` locally, `blob` on Vercel when the token exists, else `memory`).

## 4. LLM client (`src/agent/llm.ts`)

```ts
export interface LlmClient {
  mode: "live" | "record" | "replay";
  complete<T>(req: CompleteRequest<T>): Promise<CompleteResult<T>>;   // one structured (zod) or text call
  runTools(req: ToolLoopRequest): Promise<ToolLoopResult>;           // agentic loop with our tools (toolRunner or manual loop)
}
// CompleteRequest: { agent, ruleId?, findingId?, model?, effort, system: SystemBlock[] (cache_control on the frozen prefix),
//                    messages: MessageParam[], schema?: ZodType<T>, maxTokens? }
// ToolLoopRequest adds: tools: RunnableTool[]; maxIterations; onToolCall?(name, input, output)
```
Every call → trajectory events (`llm_request` with the full prompt, `llm_response` with content + usage + cost,
`tool_call`/`tool_result`), usage accumulated into `RunStats`. Cost from a static price table (`src/agent/pricing.ts`).
Cache key = sha256 of the canonical JSON of the request body (excluding nothing volatile — prompts must not contain
timestamps). Judge calls use the same interface with the OpenAI backend (`src/eval/judge.ts`).

## 5. Drafter tools (names, inputs → outputs)

| Tool | Input | Output |
|---|---|---|
| `list_sections` | — | `{ id, number, heading, level, paragraphCount }[]` |
| `read_section` | `{ sectionId }` | `{ sectionRef, paragraphs: { id, text }[] }` |
| `read_paragraphs` | `{ paragraphIds }` | `{ id, sectionRef, text }[]` |
| `search` | `{ query, regex?, limit? }` | `{ paragraphId, sectionRef, snippet }[]` |
| `get_definition` | `{ term }` | `{ found, term, paragraphId, text }` or `{ found: false, nearest: string[] }` |
| `lookup_precedent` | `{ ruleId, context? }` | `{ precedents: { id, source, clauseAfter, comment, level }[] }` (empty when memory disabled) |
| `propose_redline` | `{ ops, comment, level, summary }` | `{ ok, errors: string[], rendered: { paragraphId, segments: DiffSegment[] }[] }` — validates every op (verbatim anchor, single occurrence, paragraph exists) when `config.toolValidation`, otherwise echoes ok |
| `submit_finding` | `{ status, paragraphIds, quote, rationale, confidence, proposal? }` | `{ ok, errors }` — final answer; the loop ends after a successful submit |

Round-1 verifier (no tools): structured call → `{ verdict: "pass" | "fail", reasons: string[], severityAdjustment?: Severity }`.
Deterministic pre-checks (ops apply, rule.checks, minimality) are included in the verifier prompt as evidence.
Fail → feedback message appended to the **drafter's** loop (`"Verifier feedback: …"`) for a repair round
(≤ `config.maxRepairRounds`); still failing → `verification.verdict = "fail"`, `status = "needs_review"`.

Element-aware verifier (fresh context, no tools): structured call → `{ elements: [{ element, level, status,
evidence }], satisfies_preferred, satisfies_fallback, minimal, preserves_intent, reasons,
severityAdjustment? }`, where `status ∈ met | not_met | cannot_tell`. The runtime recomputes preferred and
fallback completeness from the per-element verdicts, treats operation/check/minimality gates as deterministic
evidence, and feeds exact unmet element strings into at most three repair rounds.

Planner (one structured call, tools `search`/`read_section` allowed): input = parties, section outline
(id, heading, first 200 chars), definitions (terms only), rule list → `{ parties, plans: { ruleId,
candidateSectionIds, candidateParagraphIds, likelyAbsent, note }[] }`.

Baselines: `b1-prompt` = one `messages.parse` with the numbered paragraphs + playbook → findings with
`replacement { paragraphId, oldText, newText }` mapped to `replace` ops (invalid anchors are counted, not fixed).
`b0-chat` = the same contract, no playbook, free-text answer; a second cheap extraction call maps it to rule ids.
`x-monolith` = one tool loop for all rules at once with the same tools.

## 6. HTTP API (`app/api/**`)

| Route | Method | Body / result |
|---|---|---|
| `/api/runs` | POST (multipart: `file` or `sampleId`, `playbookId`, `config`) | `{ runId }` — parses, stores source + run (queued) |
| `/api/runs` | GET | `ReviewRun[]` (summaries) |
| `/api/runs/[id]` | GET | `ReviewRun` |
| `/api/runs/[id]/stream` | GET (SSE) | starts the pipeline if queued, streams `ProgressEvent`s; `maxDuration = 800` |
| `/api/runs/[id]/decisions` | POST `{ decisions: Decision[] }` | merged `decisions` |
| `/api/runs/[id]/apply` | POST | applies accepted/edited findings → `{ output }` |
| `/api/runs/[id]/output.docx`, `/memo.md` | GET | files |
| `/api/runs/[id]/trajectory` | GET `?after=<seq>` | `TrajectoryEvent[]` |
| `/api/precedents` | GET / POST / DELETE | precedent bank |
| `/api/samples` | GET | eval-set contracts available as samples `{ id, title, words, kind }` |
| `/api/playbooks` | GET | `{ id, name, version, rules: { id, title, severity, category }[] }[]` |
| `/api/evals` | GET | `evals/results/changelog-data.json` |

Run state is persisted after every finding, so a page reload during a run shows partial results and can
re-attach to the stream (`?after=<seq>`).

Execution is single-instance at any moment via a best-effort lease in `run.json`; another instance polls
persisted findings/stats every two seconds while the lease is fresh, and may resume incomplete rules after
the 60-second lease timeout. This polling fallback is not a transactional distributed job queue.

## 7. Trajectories

`runs/<runId>/trajectory.jsonl` — one `TrajectoryEvent` per line, `seq` monotonic. `scripts/export-trajectories.ts`
copies representative runs into `trajectories/app/<config>/<contractId>/` with secrets redacted, plus
`trajectories/coding-agents/` (Codex JSONL, Opus SDK logs, Claude Code session) for the submission.

Each persisted and streamed `Finding` carries deterministic display metadata: `sectionRef` is derived from
its first valid paragraph's enclosing section as `§ {number?} {heading}` (heading capped at 60 characters),
with the planner's first candidate section used for an unanchored missing clause and `§ —` as the fallback.
When available, `costUsd` and `durationMs` cover only that rule's drafter, verifier, and repair work. The same
figures are retained in `ReviewRun.stats.perRule` with LLM-call and retry counts. Whole-contract shared calls
use the `"*"` entry and distribute their cost and elapsed time across the findings they produced.
