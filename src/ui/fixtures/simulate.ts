/**
 * Replays the fixture run as a timed `ProgressEvent` stream so `/review/sample-running` exercises the
 * same code path as a live SSE run (5× compressed). Nothing here is used once the API is wired up.
 */
import type { ProgressEvent, RunStats } from "@/src/agent/types";
import { sampleRun, sampleRunFindings, sampleRunningRun, sampleWorkers, type WorkerResult } from "./sample-run";

export interface ScheduledEvent {
  at: number;
  event: ProgressEvent;
}

const RUN_ID = sampleRunningRun.id;
const COMPRESS = 5;
const CONCURRENCY = 6;
const WAVE_START = 2500;

const findingByRule = new Map(sampleRunFindings.map((f) => [f.ruleId, f]));

function statsAt(completed: WorkerResult[], elapsedMs: number): RunStats {
  const findings = completed.map((w) => findingByRule.get(w.ruleId)).filter((f) => f !== undefined);
  const bySeverity: RunStats["bySeverity"] = { critical: 0, high: 0, medium: 0, low: 0 };
  const byStatus: RunStats["byStatus"] = { deviation: 0, missing: 0, compliant: 0, needs_review: 0 };
  for (const f of findings) {
    bySeverity[f.severity] += 1;
    byStatus[f.status] += 1;
  }
  const costUsd = completed.reduce((sum, w) => sum + w.costUsd, 0.11);
  return {
    ...sampleRunningRun.stats,
    durationMs: elapsedMs * COMPRESS,
    llmCalls: 2 + completed.length * 2,
    toolCalls: completed.length * 6,
    retries: completed.some((w) => w.ruleId === "INDEMN") ? 1 : 0,
    usage: {
      inputTokens: 24_000 + completed.length * 25_600,
      outputTokens: completed.length * 2_100,
      cacheReadTokens: completed.length * 22_900,
      cacheWriteTokens: 24_610,
      costUsd: Math.round(costUsd * 100) / 100,
    },
    findings: findings.length,
    bySeverity,
    byStatus,
  };
}

export function buildSampleTimeline(): ScheduledEvent[] {
  const events: ScheduledEvent[] = [
    { at: 0, event: { type: "status", runId: RUN_ID, status: "running", message: "Reading the document" } },
    { at: 0, event: { type: "stage", runId: RUN_ID, agent: "ingest", state: "start", label: "Parsing Brightline-Hosting-Agreement-v3.docx" } },
    {
      at: 400,
      event: { type: "stage", runId: RUN_ID, agent: "ingest", state: "end", label: "50 paragraphs · 11 sections · 6 definitions", durationMs: 1_900 },
    },
    { at: 420, event: { type: "stage", runId: RUN_ID, agent: "planner", state: "start", label: "Mapping 18 playbook rules onto the outline" } },
    { at: 1_200, event: { type: "log", runId: RUN_ID, agent: "planner", line: "Parties resolved: Northwind Analytics (Customer) · Brightline Cloud Services (Vendor)" } },
    { at: 2_100, event: { type: "log", runId: RUN_ID, agent: "planner", line: "INSURANCE and TRANSITION flagged as likely absent" } },
    {
      at: 2_400,
      event: { type: "stage", runId: RUN_ID, agent: "planner", state: "end", label: "18 rules → 11 sections · 2 flagged likely absent", durationMs: 12_000 },
    },
    { at: 2_450, event: { type: "stage", runId: RUN_ID, agent: "drafter", state: "start", label: "18 rule workers, 6 at a time" } },
    { at: 2_450, event: { type: "stage", runId: RUN_ID, agent: "verifier", state: "start", label: "Verifying each redline independently" } },
  ];

  for (const w of sampleWorkers) {
    events.push({
      at: 2_400,
      event: { type: "worker", runId: RUN_ID, ruleId: w.ruleId, ruleTitle: w.ruleTitle, state: "queued" },
    });
  }

  const completed: WorkerResult[] = [];
  let waveStart = WAVE_START;

  for (let i = 0; i < sampleWorkers.length; i += CONCURRENCY) {
    const wave = sampleWorkers.slice(i, i + CONCURRENCY);
    let waveEnd = waveStart;

    for (const w of wave) {
      const span = Math.round(w.durationMs / COMPRESS);
      const verifyAt = waveStart + Math.round(span * 0.62);
      const doneAt = waveStart + span;
      waveEnd = Math.max(waveEnd, doneAt);

      events.push({
        at: waveStart,
        event: { type: "worker", runId: RUN_ID, ruleId: w.ruleId, ruleTitle: w.ruleTitle, state: "running", note: "Reading the clauses the planner flagged" },
      });
      events.push({
        at: verifyAt,
        event: { type: "worker", runId: RUN_ID, ruleId: w.ruleId, ruleTitle: w.ruleTitle, state: "verifying", note: "Independent verifier reviewing the redline" },
      });
      events.push({
        at: doneAt,
        event: {
          type: "worker",
          runId: RUN_ID,
          ruleId: w.ruleId,
          ruleTitle: w.ruleTitle,
          state: w.state,
          note: w.note,
          durationMs: w.durationMs,
          costUsd: w.costUsd,
        },
      });

      const finding = findingByRule.get(w.ruleId);
      if (finding) {
        events.push({ at: doneAt + 60, event: { type: "finding", runId: RUN_ID, finding } });
      }
      completed.push(w);
      events.push({ at: doneAt + 80, event: { type: "stats", runId: RUN_ID, stats: statsAt([...completed], doneAt) } });
    }

    waveStart = waveEnd + 120;
  }

  const draftersDone = waveStart;
  events.push({
    at: draftersDone,
    event: { type: "stage", runId: RUN_ID, agent: "drafter", state: "end", label: "18 workers finished · 9 findings", durationMs: 168_000 },
  });
  events.push({
    at: draftersDone + 100,
    event: { type: "stage", runId: RUN_ID, agent: "verifier", state: "end", label: "8 redlines verified · 1 escalated", durationMs: 61_000 },
  });
  events.push({
    at: draftersDone + 200,
    event: { type: "stage", runId: RUN_ID, agent: "assembler", state: "start", label: "Merging findings and writing the memo" },
  });
  events.push({
    at: draftersDone + 2_200,
    event: { type: "stage", runId: RUN_ID, agent: "assembler", state: "end", label: "9 findings ordered by severity · memo written", durationMs: 11_000 },
  });
  events.push({ at: draftersDone + 2_300, event: { type: "stats", runId: RUN_ID, stats: sampleRun.stats } });
  events.push({
    at: draftersDone + 2_400,
    event: { type: "status", runId: RUN_ID, status: "awaiting_review", message: "Ready for your review" },
  });
  events.push({
    at: draftersDone + 2_500,
    event: { type: "done", runId: RUN_ID, run: { ...sampleRun, id: RUN_ID, status: "awaiting_review" } },
  });

  return events.sort((a, b) => a.at - b.at);
}

/** Schedules the timeline on real timers. Returns a cancel function. */
export function playSampleTimeline(onEvent: (event: ProgressEvent) => void): () => void {
  const timers = buildSampleTimeline().map((scheduled) =>
    setTimeout(() => onEvent(scheduled.event), scheduled.at),
  );
  return () => {
    for (const t of timers) clearTimeout(t);
  };
}
