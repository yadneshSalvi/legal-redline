<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Playbook Redliner — project conventions (read before writing any code)

Playbook Redliner is an agentic first-pass contract review for customer-side in-house counsel: it reads a
vendor's `.docx`, checks it against the company playbook with a planner → per-rule drafter workers →
independent verifier → assembler pipeline, lets a human accept/edit/reject every finding, and writes
**real Word tracked changes + comments** into a copy of the document. Entry for the micro1 Agentic
Workflows Hackathon (rubric: agent engineering 30, end-to-end quality 20, problem 15, measured
improvement 15, reproducibility 15, hot take 5). Production: https://playbook-redliner.yadneshsalvi.com (later).

## Contracts (the law; change the contract first, then code)
- `SCHEMA.md` + `src/engine/types.ts` + `src/agent/types.ts` — document model, redline ops, findings, runs,
  decisions, trajectories, precedents, pipeline configs, SSE protocol, function signatures.
- `PLAYBOOK.md` + `src/playbook/schema.ts` + `data/playbooks/customer-vendor-services.yaml` — the rules.
- `EVAL.md` — datasets, gold, matching, metrics, replay cache, report format. The changelog is built from it.
- `STYLE.md` — tokens, type, layout, tracked-change rendering, motion, forbidden list. Every UI change is judged against it.

## Layout
`app/` routes + route handlers (`app/api/**` — the only place secrets are read besides `scripts/**`) ·
`src/engine/` pure TS OOXML (no React/DOM, 100 % unit-tested) · `src/playbook/` schema + loader ·
`src/agent/` planner/drafters/verifier/assembler/memory/trajectory/baseline/orchestrator/llm ·
`src/eval/` datasets, gold, metrics, judge, runner, report · `src/store/` fs | blob | memory ·
`src/ui/` components · `src/tokens.ts` · `scripts/` CLIs (`tsx`) · `tests/` vitest (`tests/engine`, `tests/agent`,
`tests/eval`) + Playwright (`tests/e2e`) · `data/` playbooks, contracts (eval set), precedents, templates ·
`evals/cache` (committed model outputs for replay), `evals/results` · `trajectories/` curated, committed.

## Rules
- TypeScript strict, no `any`, no `@ts-ignore`; `import type` for types; named exports; files ≤ ~400 lines.
- ESM everywhere; scripts run with `tsx`; never `__dirname` in ESM — use `import.meta.url`.
- Engine functions are pure and deterministic (fixed tracked-change dates in tests); ids are stable (`p0042`).
- Every LLM call goes through `src/agent/llm.ts` (`LlmClient`): it records usage/cost, writes trajectory events,
  and supports `live | record | replay` so evals are reproducible at zero cost. No direct SDK calls elsewhere.
- Claude via `@anthropic-ai/sdk` 0.122: model `claude-opus-5`, adaptive thinking (omit `thinking` or `{type:"adaptive"}`),
  `output_config.effort`, structured outputs via `zodOutputFormat` / `client.messages.parse`, tools via
  `betaZodTool` + `client.beta.messages.toolRunner` (or a manual loop when we need per-turn control), prompt caching
  with `cache_control` on the frozen system+playbook prefix. **No** `budget_tokens`, **no** prefill, **no** temperature.
  Independent eval judge = OpenAI `gpt-5.6-sol` via the `openai` SDK (`reasoning: {effort}`), never the model under test.
- Tool handlers never throw: return `{ ok: false, error }` and let the agent recover; every tool call is a trajectory event.
- Secrets only from `process.env` in `app/api/**`, `scripts/**`, `src/agent/llm.ts`, `src/store/blob.ts`. Never log or echo `.env` values.
- Colors, radii, shadows, fonts only from `src/tokens.ts` / `@theme` tokens in `app/globals.css` (see STYLE.md).
- Client components declare `"use client"`; server-only modules import `server-only`.
- Accessibility: every control focusable with a visible 2 px `navy` focus ring and an accessible name; `Escape` closes overlays; keyboard shortcuts documented in the UI.
- Tests: `pnpm typecheck && pnpm lint && pnpm test` must pass before a task is reported done; UI tasks also ship 1440×900 screenshots.
- Writes are atomic (temp file + rename) because a dev server may be watching. Agents never `git commit`/`push`; the lead does.
- Ports: lead dev server 3000; builder agents 3101–3103; reviewers 3201+.
- Data: only public (CUAD, CC-BY-4.0 — attribute "The Atticus Project") or synthetic contracts. No private documents.

## Version pins (verified 2026-08-29)
next 16.3.3 · react 19.2.8 · typescript 5.9.3 · tailwindcss 4.3.3 · @anthropic-ai/sdk 0.122.0 · openai 7.8.0 · zod 4.5.2 ·
jszip 3.10.1 · @xmldom/xmldom 0.9.12 · docx 9.7.1 · diff 9.0.0 · motion 13.1.1 (package `motion`, not `framer-motion`) ·
zustand 5.0.15 · vitest 4.1.11 · tsx 4.23.12 · @playwright/test 1.62.1 · pnpm 10.15.

## Commands
`pnpm dev` · `pnpm build` · `pnpm typecheck` · `pnpm lint` · `pnpm test` · `pnpm test:e2e` ·
`pnpm fetch-cuad` · `pnpm build-dataset` · `pnpm synth` · `pnpm review <file.docx> [--config final]` ·
`pnpm baseline <file>` · `pnpm eval [--config …] [--live]` · `pnpm report` · `pnpm validate-docx <file>` · `pnpm export-trajectories`
