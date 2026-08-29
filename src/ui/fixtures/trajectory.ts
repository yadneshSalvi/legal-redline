/**
 * Fallback for `GET /api/runs/sample/trajectory` — a full event log for the fixture run rendered by
 * `/review/sample`, built from the same findings and per-rule worker results so the two pages tell
 * one story. Shapes follow `TrajectoryEvent` (SCHEMA.md §7) exactly; the recorded token, cache and
 * cost totals add up to the run's `RunStats`, and the drafter events are interleaved in batches of
 * six because that is the configured worker concurrency.
 */
import type { TrajectoryEvent } from "@/src/agent/types";
import { sampleFindings } from "./sample-findings";
import { sampleRun, sampleWorkers } from "./sample-run";
import { CONCURRENCY, preview, requestPayload, type Draft } from "./trajectory-prompts";
import { drafterDrafts, interleave, verifierDrafts } from "./trajectory-workers";

function buildDrafts(): Draft[] {
  const findingByRule = new Map(sampleFindings.map((finding) => [finding.ruleId, finding]));
  const drafts: Draft[] = [];

  drafts.push({
    agent: "ingest",
    type: "run_start",
    title: "run sample — final pipeline, Customer-side Vendor Services Playbook v1.0",
    dt: 0,
    payload: {
      runId: sampleRun.id,
      config: sampleRun.config,
      playbookId: sampleRun.playbookId,
      rules: sampleWorkers.length,
      concurrency: CONCURRENCY,
      mode: "replay",
      source: sampleRun.document.source,
    },
  });
  drafts.push({ agent: "ingest", type: "stage_start", title: "ingest — parsing the .docx", dt: 40, payload: { agent: "ingest" } });
  drafts.push({
    agent: "ingest",
    type: "tool_call",
    title: "parse_docx(Brightline-Hosting-Agreement-v3.docx)",
    dt: 900,
    payload: { tool: "parse_docx", input: { filename: sampleRun.document.source.filename, bytes: sampleRun.document.source.bytes } },
  });
  drafts.push({
    agent: "ingest",
    type: "tool_result",
    title: "parse_docx → 50 paragraphs, 10 sections, 6 definitions",
    dt: 120,
    payload: { tool: "parse_docx", ok: true, result: sampleRun.document.stats },
  });
  drafts.push({
    agent: "ingest",
    type: "validation",
    title: "document model checked — ids stable, numbering preserved",
    dt: 160,
    payload: {
      verdict: "pass",
      checks: [
        { name: "paragraph_ids_stable", ok: true, detail: "p0001…p0050" },
        { name: "section_tree_complete", ok: true, detail: "10 sections, max depth 2" },
        { name: "definitions_resolved", ok: true, detail: "6 terms, all anchored" },
        { name: "round_trip_text_identical", ok: true },
      ],
    },
  });
  drafts.push({ agent: "ingest", type: "stage_end", title: "ingest done", dt: 20, durationMs: 1240, payload: { agent: "ingest" } });

  drafts.push({ agent: "planner", type: "stage_start", title: "planner — mapping 18 rules onto the document", dt: 40, payload: { agent: "planner", rules: 18 } });
  drafts.push({
    agent: "planner",
    type: "llm_request",
    title: "planner → claude-opus-5 (effort high)",
    dt: 1400,
    payload: requestPayload({
      turn: 1,
      system: `You are the planner. Map every playbook rule onto the sections of this contract that could carry it.
Return, per rule, the candidate section ids in priority order and a one-line reason. Never guess a
section that is not in the outline. Rules with no candidate section are still checked — mark them
"search" so the worker scans the document.`,
      user: `Outline (10 sections, 50 paragraphs, 6 defined terms):
1 Definitions · 2 Services and Service Levels · 3 Fees and Payment · 4 Term and Termination ·
5 Intellectual Property · 6 Confidentiality · 7 Warranties and Disclaimer · 8 Indemnification ·
9 Limitation of Liability · 10 General Provisions

Playbook rules: LOL-CAP, INDEMN, NONCOMPETE, EXCLUSIVITY, MFN, NOSOLICIT, T4C, RENEWAL, GOVLAW,
ASSIGN, IP, LICENSE, AUDIT, LD, WARRANTY, INSURANCE, MINCOMMIT, TRANSITION`,
    }),
  });
  drafts.push({
    agent: "planner",
    type: "llm_response",
    title: "planner → 18 rules mapped, 11 with candidate sections",
    dt: 18_400,
    weight: 6,
    payload: {
      stop_reason: "end_turn",
      parsed: {
        plan: [
          { ruleId: "LOL-CAP", sections: ["sec-9", "sec-1"], reason: "§ 9.2 caps liability; “Fees” is defined in § 1.4." },
          { ruleId: "INDEMN", sections: ["sec-8"], reason: "§ 8 has a Customer indemnity only." },
          { ruleId: "IP", sections: ["sec-5"], reason: "§ 5.2–5.3 assign Deliverables and licence Customer Data." },
          { ruleId: "T4C", sections: ["sec-4"], reason: "§ 4.3 gives Vendor a convenience right." },
          { ruleId: "RENEWAL", sections: ["sec-4"], reason: "§ 4.1 sets the renewal term and notice window." },
          { ruleId: "AUDIT", sections: ["sec-10"], reason: "§ 10.3 is an audit right over Customer systems." },
          { ruleId: "ASSIGN", sections: ["sec-10"], reason: "§ 10.1 restricts assignment." },
          { ruleId: "GOVLAW", sections: ["sec-10"], reason: "§ 10.5 names England and Wales." },
          { ruleId: "WARRANTY", sections: ["sec-7"], reason: "§ 7.1 warranty, § 7.3 disclaimer." },
          { ruleId: "TRANSITION", sections: ["sec-4"], reason: "§ 4.4 transition assistance." },
          { ruleId: "MFN", sections: ["sec-3"], reason: "§ 3.3 is a price-adjustment right; check direction." },
          { ruleId: "INSURANCE", sections: [], reason: "search — no insurance language in the outline." },
        ],
        searchOnly: ["NONCOMPETE", "EXCLUSIVITY", "NOSOLICIT", "LICENSE", "LD", "MINCOMMIT"],
      },
    },
  });
  drafts.push({ agent: "planner", type: "stage_end", title: "planner done", dt: 30, durationMs: 19_800, payload: { agent: "planner" } });

  drafts.push({
    agent: "drafter",
    type: "stage_start",
    title: `drafters — 18 workers, ${CONCURRENCY} at a time`,
    dt: 40,
    payload: { agent: "drafter", workers: sampleWorkers.length, concurrency: CONCURRENCY },
  });
  for (let start = 0; start < sampleWorkers.length; start += CONCURRENCY) {
    const batch = sampleWorkers.slice(start, start + CONCURRENCY);
    drafts.push(
      ...interleave(batch.map((worker) => drafterDrafts(worker, findingByRule.get(worker.ruleId)))),
    );
  }
  drafts.push({
    agent: "drafter",
    type: "stage_end",
    title: "drafters done — 9 redlines proposed, 9 rules clear",
    dt: 40,
    payload: { agent: "drafter", proposed: 9, clear: 9 },
  });

  drafts.push({ agent: "verifier", type: "stage_start", title: "verifier — independent review of 9 redlines", dt: 40, payload: { agent: "verifier", findings: 9 } });
  for (const finding of sampleFindings) {
    if (!finding.proposal) continue;
    drafts.push(...verifierDrafts(finding));
  }
  drafts.push({
    agent: "verifier",
    type: "stage_end",
    title: "verifier done — 7 pass, 1 repaired, 1 escalated",
    dt: 40,
    payload: { agent: "verifier", pass: 7, repaired: 1, escalated: 1 },
  });

  drafts.push({ agent: "assembler", type: "stage_start", title: "assembler — ordering findings and numbering comments", dt: 40, payload: { agent: "assembler" } });
  drafts.push({
    agent: "assembler",
    type: "tool_call",
    title: "order_findings(by severity, then document order)",
    dt: 90,
    payload: { tool: "order_findings", input: { by: ["severity", "documentOrder"], findings: 9 } },
  });
  drafts.push({
    agent: "assembler",
    type: "tool_result",
    title: "order_findings → 9 findings, 3 critical first",
    dt: 70,
    payload: {
      tool: "order_findings",
      ok: true,
      result: { findings: 9, bySeverity: sampleRun.stats.bySeverity, comments: 8 },
    },
  });
  drafts.push({
    agent: "assembler",
    type: "validation",
    title: "assembled 9 findings — no overlapping anchors, comments numbered 1–8",
    dt: 140,
    payload: {
      verdict: "pass",
      checks: [
        { name: "no_overlapping_ops", ok: true, detail: "17 ops across 12 paragraphs" },
        { name: "comment_numbers_unique", ok: true, detail: "1–8" },
        { name: "every_finding_cites_a_rule", ok: true },
        { name: "escalations_marked_needs_review", ok: true, detail: "ASSIGN" },
      ],
    },
  });
  drafts.push({ agent: "assembler", type: "stage_end", title: "assembler done", dt: 30, durationMs: 2400, payload: { agent: "assembler" } });

  drafts.push({ agent: "memo", type: "stage_start", title: "memo — drafting the issues memo", dt: 30, payload: { agent: "memo" } });
  drafts.push({
    agent: "memo",
    type: "llm_request",
    title: "memo → claude-opus-5 (effort high)",
    dt: 1200,
    payload: requestPayload({
      turn: 1,
      system: `You write the issues memo a general counsel will read in three minutes. Group by what must be
resolved before signature, ordinary negotiation, escalations and hygiene. Name the section, say what
the draft does, say what we ask for. No hedging, no restating the redline verbatim.`,
      user: "9 findings (3 critical, 2 high, 3 medium, 1 low), 1 escalation, 18 rules checked.",
    }),
  });
  drafts.push({
    agent: "memo",
    type: "llm_response",
    title: "memo → 1 markdown document, 812 words",
    dt: 22_600,
    weight: 5,
    payload: { stop_reason: "end_turn", text: preview(sampleRun.memo ?? "", 900), words: 812 },
  });
  drafts.push({ agent: "memo", type: "stage_end", title: "memo done", dt: 30, durationMs: 23_900, payload: { agent: "memo" } });

  drafts.push({
    agent: "human",
    type: "checkpoint",
    title: "awaiting your review — 9 findings, nothing written to the document yet",
    dt: 40,
    payload: {
      status: "awaiting_review",
      findings: 9,
      escalated: ["ASSIGN"],
      note: "Accept, edit or reject each finding in the workspace. The apply step writes tracked changes only for the findings you accept.",
    },
  });
  drafts.push({
    agent: "assembler",
    type: "run_end",
    title: "pipeline finished — awaiting review",
    dt: 20,
    payload: { status: "awaiting_review", findings: 9, durationMs: sampleRun.stats.durationMs, usage: sampleRun.stats.usage },
  });

  return drafts;
}

/** One weight unit is a tenth of a cent, so the weights below are simply the recorded costs. */
const UNITS_PER_USD = 1000;

/**
 * Re-scales the relative weights so each rule's share of the run's cost matches the per-rule figure
 * the workspace shows on its finding cards, and the planner and memo take the remainder. Without
 * this the two pages would quote different costs for the same worker.
 */
function rescaleWeights(drafts: Draft[]): Draft[] {
  const targets = new Map(sampleWorkers.map((worker) => [worker.ruleId, worker.costUsd * UNITS_PER_USD]));
  const totals = new Map<string, number>();
  for (const draft of drafts) {
    if (!draft.weight || !draft.ruleId) continue;
    totals.set(draft.ruleId, (totals.get(draft.ruleId) ?? 0) + draft.weight);
  }
  const spent = [...targets.values()].reduce((total, value) => total + value, 0);
  const remainder = sampleRun.stats.usage.costUsd * UNITS_PER_USD - spent;
  return drafts.map((draft) => {
    if (!draft.weight) return draft;
    if (draft.ruleId) {
      const target = targets.get(draft.ruleId) ?? 0;
      const total = totals.get(draft.ruleId) ?? 1;
      return { ...draft, weight: (draft.weight / total) * target };
    }
    // Planner and memo split what the workers did not spend, two to one.
    return { ...draft, weight: draft.agent === "planner" ? (remainder * 2) / 3 : remainder / 3 };
  });
}

/** Distributes the run's recorded tokens and cost over the model turns, remainder on the last one. */
function attachUsage(input: Draft[]): Draft[] {
  const drafts = rescaleWeights(input);
  const usage = sampleRun.stats.usage;
  const weighted = drafts.map((draft, index) => ({ index, weight: draft.weight ?? 0 })).filter((entry) => entry.weight > 0);
  const totalWeight = weighted.reduce((total, entry) => total + entry.weight, 0);
  const share = (total: number, weight: number): number => Math.round((total * weight) / totalWeight);
  const remaining = {
    inputTokens: usage.inputTokens,
    outputTokens: usage.outputTokens,
    cacheReadTokens: usage.cacheReadTokens ?? 0,
    cacheWriteTokens: usage.cacheWriteTokens ?? 0,
    costUsd: usage.costUsd,
  };
  const byIndex = new Map<number, Draft["usage"]>();
  weighted.forEach((entry, position) => {
    const last = position === weighted.length - 1;
    const value = last
      ? { ...remaining }
      : {
          inputTokens: share(usage.inputTokens, entry.weight),
          outputTokens: share(usage.outputTokens, entry.weight),
          cacheReadTokens: share(usage.cacheReadTokens ?? 0, entry.weight),
          cacheWriteTokens: share(usage.cacheWriteTokens ?? 0, entry.weight),
          costUsd: Math.round(((usage.costUsd * entry.weight) / totalWeight) * 10_000) / 10_000,
        };
    if (!last) {
      remaining.inputTokens -= value.inputTokens;
      remaining.outputTokens -= value.outputTokens;
      remaining.cacheReadTokens -= value.cacheReadTokens ?? 0;
      remaining.cacheWriteTokens -= value.cacheWriteTokens ?? 0;
      remaining.costUsd = Math.round((remaining.costUsd - value.costUsd) * 10_000) / 10_000;
    }
    byIndex.set(entry.index, value);
  });
  return drafts.map((draft, index) => {
    const own = byIndex.get(index);
    return own ? { ...draft, usage: own } : draft;
  });
}

function toEvents(runId: string, drafts: Draft[]): TrajectoryEvent[] {
  const withUsage = attachUsage(drafts);
  const totalDt = withUsage.reduce((total, draft) => total + draft.dt, 0);
  const scale = (sampleRun.stats.durationMs ?? totalDt) / (totalDt || 1);
  const start = Date.parse(sampleRun.stats.startedAt);
  let elapsed = 0;
  return withUsage.map((draft, index) => {
    elapsed += draft.dt;
    return {
      id: `ev-${String(index + 1).padStart(4, "0")}`,
      runId,
      seq: index + 1,
      t: new Date(start + Math.round(elapsed * scale)).toISOString(),
      agent: draft.agent,
      type: draft.type,
      title: draft.title,
      ...(draft.ruleId ? { ruleId: draft.ruleId } : {}),
      ...(draft.findingId ? { findingId: draft.findingId } : {}),
      ...(draft.payload !== undefined ? { payload: draft.payload } : {}),
      ...(draft.usage ? { usage: draft.usage } : {}),
      ...(draft.durationMs !== undefined ? { durationMs: draft.durationMs } : {}),
    };
  });
}

let cached: TrajectoryEvent[] | null = null;

/** The committed example trajectory, for the two fixture run ids only. */
export function fixtureTrajectory(runId: string): TrajectoryEvent[] | null {
  if (runId !== "sample" && runId !== "sample-running") return null;
  cached ??= toEvents("sample", buildDrafts());
  if (runId === "sample") return cached;
  // `/review/sample-running` is the same run at t=0: the log stops inside the drafter stage.
  return cached.slice(0, 46).map((event) => ({ ...event, runId }));
}
