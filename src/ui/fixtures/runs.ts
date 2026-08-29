/** Fallback for `GET /api/runs` — the run history table before the store is wired up. */
import type { ReviewRun, RunStats, Severity } from "@/src/agent/types";
import type { DocumentModel } from "@/src/engine/types";
import { sampleRun } from "./sample-run";

function stubDocument(title: string, filename: string, words: number): DocumentModel {
  return {
    id: filename.slice(0, 12),
    title,
    source: { kind: "docx", filename, sha256: "0".repeat(64), bytes: words * 7 },
    paragraphs: [],
    sections: [],
    definitions: [],
    stats: { words, paragraphs: 0, sections: 0, definitions: 0 },
  };
}

function stubStats(
  bySeverity: Record<Severity, number>,
  costUsd: number,
  durationMs: number,
  startedAt: string,
): RunStats {
  const findings = Object.values(bySeverity).reduce((a, b) => a + b, 0);
  return {
    startedAt,
    finishedAt: startedAt,
    durationMs,
    llmCalls: 20 + findings * 2,
    toolCalls: 40 + findings * 8,
    retries: 1,
    usage: {
      inputTokens: 300_000 + findings * 20_000,
      outputTokens: 20_000 + findings * 1_800,
      cacheReadTokens: 240_000,
      cacheWriteTokens: 18_000,
      costUsd,
    },
    findings,
    bySeverity,
    byStatus: { deviation: findings - 2, missing: 2, compliant: 0, needs_review: 0 },
  };
}

export const sampleRunList: ReviewRun[] = [
  sampleRun,
  {
    id: "r-8f2c41",
    createdAt: "2026-08-28T16:41:19.000Z",
    status: "applied",
    config: "final",
    playbookId: "customer-vendor-services-v1",
    document: stubDocument("Corio — Licence and Hosting Agreement", "corio-license-hosting.docx", 6412),
    sourceKey: "runs/r-8f2c41/source.docx",
    findings: [],
    decisions: {},
    stats: stubStats({ critical: 2, high: 4, medium: 5, low: 1 }, 2.81, 271_000, "2026-08-28T16:41:19.000Z"),
    output: {
      docxKey: "runs/r-8f2c41/output.docx",
      memoKey: "runs/r-8f2c41/memo.md",
      appliedAt: "2026-08-28T17:12:02.000Z",
    },
    tags: ["cuad-corio-hosting"],
  },
  {
    id: "r-71ad09",
    createdAt: "2026-08-28T11:07:44.000Z",
    status: "applied",
    config: "i4-memory",
    playbookId: "customer-vendor-services-v1",
    document: stubDocument("Bluefly — e-business Hosting Agreement", "bluefly-ebusiness-hosting.docx", 5180),
    sourceKey: "runs/r-71ad09/source.docx",
    findings: [],
    decisions: {},
    stats: stubStats({ critical: 1, high: 3, medium: 4, low: 2 }, 2.16, 233_000, "2026-08-28T11:07:44.000Z"),
    output: {
      docxKey: "runs/r-71ad09/output.docx",
      memoKey: "runs/r-71ad09/memo.md",
      appliedAt: "2026-08-28T11:39:51.000Z",
    },
    tags: ["cuad-bluefly-ebusiness-hosting"],
  },
  {
    id: "r-5c93be",
    createdAt: "2026-08-27T19:22:03.000Z",
    status: "awaiting_review",
    config: "final",
    playbookId: "customer-vendor-services-v1",
    document: stubDocument("Vendor MSA — seeded hard case", "synth-hardcase.docx", 3940),
    sourceKey: "runs/r-5c93be/source.docx",
    findings: [],
    decisions: {},
    stats: stubStats({ critical: 2, high: 2, medium: 3, low: 1 }, 1.74, 196_000, "2026-08-27T19:22:03.000Z"),
    tags: ["synth-hardcase", "hard-case"],
  },
  {
    id: "r-2e4471",
    createdAt: "2026-08-27T09:58:30.000Z",
    status: "applied",
    config: "b1-prompt",
    playbookId: "customer-vendor-services-v1",
    document: stubDocument("Sparkling Spring — Software Licence and Maintenance", "sparkling-license.docx", 8460),
    sourceKey: "runs/r-2e4471/source.docx",
    findings: [],
    decisions: {},
    stats: stubStats({ critical: 1, high: 1, medium: 2, low: 0 }, 0.42, 61_000, "2026-08-27T09:58:30.000Z"),
    output: {
      docxKey: "runs/r-2e4471/output.docx",
      memoKey: "runs/r-2e4471/memo.md",
      appliedAt: "2026-08-27T10:26:14.000Z",
    },
    tags: ["cuad-sparkling-license", "baseline"],
  },
  {
    id: "r-1b7702",
    createdAt: "2026-08-26T14:03:11.000Z",
    status: "failed",
    config: "x-monolith",
    playbookId: "customer-vendor-services-v1",
    document: stubDocument("Meritlife — Master Services Agreement", "meritlife-msa.docx", 7220),
    sourceKey: "runs/r-1b7702/source.docx",
    findings: [],
    decisions: {},
    stats: stubStats({ critical: 0, high: 0, medium: 0, low: 0 }, 1.09, 402_000, "2026-08-26T14:03:11.000Z"),
    error: "Monolith loop hit the 40-iteration ceiling with 6 rules unanswered",
    tags: ["cuad-meritlife-msa", "experiment"],
  },
];
