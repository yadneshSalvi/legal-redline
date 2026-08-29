/**
 * The fixture `ReviewRun` rendered by `/review/sample`, plus the per-rule worker results the progress
 * board and the finding cards read. `/review/sample-running` replays the same run as a live stream
 * (see `simulate.ts`). Everything here is shaped exactly like the real API payloads in SCHEMA.md §6.
 */
import type { Finding, ReviewRun, RunStats } from "@/src/agent/types";
import { sampleDocument } from "./sample-document";
import { sampleFindings } from "./sample-findings";

export interface WorkerResult {
  ruleId: string;
  ruleTitle: string;
  state: "done" | "failed";
  note: string;
  durationMs: number;
  costUsd: number;
}

/** One per playbook rule, in playbook order — nine produced findings, nine came back clear. */
export const sampleWorkers: WorkerResult[] = [
  { ruleId: "LOL-CAP", ruleTitle: "Limitation of liability — cap, mutuality and carve-outs", state: "done", note: "One-way cap at 3 months’ Fees; Customer expressly unlimited — redline drafted.", durationMs: 52_400, costUsd: 0.31 },
  { ruleId: "INDEMN", ruleTitle: "Indemnification by Vendor", state: "done", note: "No Vendor indemnity in Section 8 — insertion drafted, repaired once.", durationMs: 61_800, costUsd: 0.28 },
  { ruleId: "NONCOMPETE", ruleTitle: "Non-compete restrictions on Customer", state: "done", note: "No non-compete or field-of-use restriction on Customer.", durationMs: 15_200, costUsd: 0.05 },
  { ruleId: "EXCLUSIVITY", ruleTitle: "Exclusivity obligations binding Customer", state: "done", note: "No exclusivity or sole-source obligation on Customer.", durationMs: 16_100, costUsd: 0.05 },
  { ruleId: "MFN", ruleTitle: "Most-favoured-nation obligations burdening Customer", state: "done", note: "No MFN obligation; § 3.3 is a price-adjustment right — recorded compliant.", durationMs: 18_300, costUsd: 0.06 },
  { ruleId: "NOSOLICIT", ruleTitle: "Non-solicitation of employees binding Customer", state: "done", note: "Mutual, 12 months, general-solicitation carve-out — inside the fallback.", durationMs: 19_400, costUsd: 0.06 },
  { ruleId: "T4C", ruleTitle: "Termination for convenience", state: "done", note: "Convenience right is Vendor-only — redline drafted.", durationMs: 33_600, costUsd: 0.14 },
  { ruleId: "RENEWAL", ruleTitle: "Auto-renewal and non-renewal notice window", state: "done", note: "Three-year evergreen renewals behind a 180-day window — redline drafted.", durationMs: 29_100, costUsd: 0.12 },
  { ruleId: "GOVLAW", ruleTitle: "Governing law and venue", state: "done", note: "England and Wales with English courts — inside the accepted set.", durationMs: 22_500, costUsd: 0.07 },
  { ruleId: "ASSIGN", ruleTitle: "Assignment and change of control", state: "failed", note: "Verifier rejected the drafted fix twice — escalated for your decision.", durationMs: 74_200, costUsd: 0.29 },
  { ruleId: "IP", ruleTitle: "Ownership of deliverables and Customer Data", state: "done", note: "Joint ownership of Deliverables and a perpetual Customer Data licence — redline drafted.", durationMs: 47_700, costUsd: 0.24 },
  { ruleId: "LICENSE", ruleTitle: "Licence grant scope", state: "done", note: "No software licence granted to Customer; hosted access only.", durationMs: 26_400, costUsd: 0.09 },
  { ruleId: "AUDIT", ruleTitle: "Audit rights against Customer", state: "done", note: "Vendor audit right over Customer systems and premises — deletion drafted.", durationMs: 24_800, costUsd: 0.09 },
  { ruleId: "LD", ruleTitle: "Liquidated damages and penalties payable by Customer", state: "done", note: "No liquidated damages or penalties payable by Customer.", durationMs: 14_600, costUsd: 0.05 },
  { ruleId: "WARRANTY", ruleTitle: "Performance warranty and duration", state: "done", note: "90-day conformance warranty with a real remedy, carved out of the disclaimer.", durationMs: 23_300, costUsd: 0.07 },
  { ruleId: "INSURANCE", ruleTitle: "Vendor insurance", state: "done", note: "No insurance covenant anywhere in the document — insertion drafted.", durationMs: 21_200, costUsd: 0.08 },
  { ruleId: "MINCOMMIT", ruleTitle: "Minimum purchase commitments and volume restrictions on Customer", state: "done", note: "No minimum commitment, take-or-pay or volume restriction.", durationMs: 18_900, costUsd: 0.06 },
  { ruleId: "TRANSITION", ruleTitle: "Post-termination transition assistance and data return", state: "done", note: "Six-month transition assistance and 30-day data return present in § 4.4.", durationMs: 17_500, costUsd: 0.06 },
];

/**
 * Per-rule cost and elapsed time, keyed by rule id. During a live run the workspace fills this from
 * SSE `worker` events; the fixture supplies the same shape so the cards read identically.
 */
export const sampleWorkerStats: Record<string, { costUsd: number; durationMs: number }> = Object.fromEntries(
  sampleWorkers.map((w) => [w.ruleId, { costUsd: w.costUsd, durationMs: w.durationMs }]),
);

/**
 * The findings as the API would return them: `Finding.costUsd`/`durationMs` carry the per-rule spend
 * so a card reads the same whether it arrived over SSE or came back from `GET /api/runs/[id]`.
 */
export const sampleRunFindings: Finding[] = sampleFindings.map((finding) => ({
  ...finding,
  costUsd: sampleWorkerStats[finding.ruleId]?.costUsd,
  durationMs: sampleWorkerStats[finding.ruleId]?.durationMs,
}));

export const sampleMemo = `# Issues memo — Web Site Hosting and Managed Services Agreement

**Counterparty:** Brightline Cloud Services Ltd. · **Playbook:** Customer-side Vendor Services Playbook v1.0

**Reviewed:** 29 August 2026 · **Pipeline:** final (planner → per-rule drafters → verifier → assembler)

Eighteen playbook rules were checked against this draft. Nine are engaged: three critical items should be
resolved before signature, one is escalated for your decision, and the remainder are ordinary negotiation.
Every redline below is in the attached document as a tracked change with a margin comment.

## Resolve before signature

| Rule | Clause | What the draft says | Our position |
| --- | --- | --- | --- |
| LOL-CAP | § 9.2 | Vendor capped at 3 months' Fees; Customer expressly unlimited | Mutual cap at the greater of 12 months' fees or USD 1m, with Excluded Claims outside it |
| INDEMN | § 8 | Customer indemnifies Vendor; no Vendor indemnity at all | Vendor indemnity for IP infringement, breach of law, data breach and wilful misconduct |
| IP | § 5.2–5.3 | Deliverables jointly owned; perpetual licence over Customer Data | Deliverables assigned to Customer; data licence limited to running the service |

Note on § 9.2: **"Fees" is defined in § 1.4 to exclude professional services, overages and pass-through
costs**, so the cap as drafted is smaller than it looks. The redline moves the cap onto fees paid or
payable under the Agreement.

## Ordinary negotiation

- **T4C (§ 4.3)** — only Vendor may terminate for convenience. We ask for 30 days for Customer without
  penalty and a pro-rata refund, and 180 days for Vendor so we have time to migrate.
- **RENEWAL (§ 4.1)** — three-year evergreen renewals behind a 180-day notice window. We renew annually
  with a 30-day window.
- **AUDIT (§ 10.3)** — Vendor may inspect Customer records, systems and premises on five business days'
  notice. There is no licence metric to audit in a hosting agreement; the clause is deleted.

## For your decision

- **ASSIGN (§ 10.1)** — the Affiliate and merger carve-out runs to Vendor only. Our drafted fix makes it
  mutual and adds a change-of-control exit, but the verifier rejected the added sentence twice: it
  duplicates § 4.3 as redrafted and "competitor" is undefined. Accept the mutuality edit, and tell us
  whether you want the exit right drafted into § 4 instead.

## Hygiene

- **INSURANCE** — no insurance covenant. A short subsection has been added at the end of § 10
  (USD 1m/2m general liability, USD 2m professional indemnity, USD 5m cyber, statutory workers' comp).

## Checked and clear

- **MFN** — § 3.3 is a unilateral price-adjustment right, not an MFN; nothing obliges Customer to offer
  Vendor best terms.
- Also clear: NONCOMPETE, EXCLUSIVITY, NOSOLICIT, GOVLAW, LICENSE, LD, WARRANTY, MINCOMMIT, TRANSITION.

## How to read the attachment

1. Deletions are struck through and insertions are underlined — real Word tracked changes, author
   *Playbook Redliner*, so **Review → Accept/Reject** works as usual.
2. Every change carries a margin comment naming the playbook rule and the fallback we will take.
3. Rejected findings are absent from the document entirely; edited findings carry your wording, not ours.
`;

const stats: RunStats = {
  startedAt: "2026-08-29T09:14:02.000Z",
  finishedAt: "2026-08-29T09:17:58.000Z",
  durationMs: 236_000,
  llmCalls: 41,
  toolCalls: 118,
  retries: 3,
  usage: {
    inputTokens: 486_212,
    outputTokens: 38_940,
    cacheReadTokens: 412_800,
    cacheWriteTokens: 24_610,
    costUsd: 2.37,
  },
  findings: 9,
  bySeverity: { critical: 3, high: 2, medium: 3, low: 1 },
  byStatus: { deviation: 5, missing: 2, compliant: 1, needs_review: 1 },
  perRule: Object.fromEntries(
    sampleWorkers.map((w) => [
      w.ruleId,
      {
        costUsd: w.costUsd,
        durationMs: w.durationMs,
        llmCalls: w.state === "failed" ? 4 : 2,
        retries: w.ruleId === "INDEMN" ? 1 : w.state === "failed" ? 2 : 0,
      },
    ]),
  ),
};

export const sampleRun: ReviewRun = {
  id: "sample",
  createdAt: "2026-08-29T09:14:02.000Z",
  status: "awaiting_review",
  config: "final",
  playbookId: "customer-vendor-services-v1",
  document: sampleDocument,
  sourceKey: "runs/sample/source.docx",
  findings: sampleRunFindings,
  decisions: {},
  memo: sampleMemo,
  stats,
  tags: ["sample", "hosting"],
};

/** The same contract at t=0: the workspace shows the progress board and streams findings in. */
export const sampleRunningRun: ReviewRun = {
  ...sampleRun,
  id: "sample-running",
  status: "running",
  findings: [],
  memo: undefined,
  stats: {
    ...stats,
    finishedAt: undefined,
    durationMs: undefined,
    llmCalls: 1,
    toolCalls: 0,
    retries: 0,
    usage: { inputTokens: 0, outputTokens: 0, costUsd: 0 },
    findings: 0,
    bySeverity: { critical: 0, high: 0, medium: 0, low: 0 },
    byStatus: { deviation: 0, missing: 0, compliant: 0, needs_review: 0 },
  },
};

export const sampleRunIds = ["sample", "sample-running"] as const;

export function fixtureRun(runId: string): ReviewRun | null {
  if (runId === "sample") return sampleRun;
  if (runId === "sample-running") return sampleRunningRun;
  return null;
}
