"use client";

import { useMemo } from "react";
import type { AgentName, ReviewRun } from "@/src/agent/types";
import { defaultPlaybook } from "../fixtures/samples";
import { useReviewStore, type StageState, type WorkerChip } from "./reviewStore";

export const RESUMED_STAGE_LABEL = "resumed — live stage detail unavailable";

export interface BoardView {
  stages: Partial<Record<AgentName, StageState>>;
  /** True when the rows were reconstructed from the persisted run rather than from live SSE. */
  resumed: boolean;
  rulesDone: number;
  rulesTotal: number;
}

function ruleCounts(run: ReviewRun | null, workers: WorkerChip[], rulesInPlaybook: number) {
  const perRuleKeys = Object.keys(run?.stats.perRule ?? {});
  if (workers.length > 0) {
    return {
      rulesDone: workers.filter((w) => w.state === "done" || w.state === "failed").length,
      rulesTotal: workers.length,
    };
  }
  return {
    rulesDone: perRuleKeys.length > 0 ? perRuleKeys.length : (run?.stats.findings ?? 0),
    rulesTotal: Math.max(perRuleKeys.length, rulesInPlaybook),
  };
}

/**
 * The progress board, live or reconstructed.
 *
 * SCHEMA §6 promises that a reload during a run shows partial results and re-attaches. The polling
 * fallback in the stream route replays only `finding`/`stats`/`status`, so there may be no `stage`
 * or `worker` frames at all — in which case telling the user "Ingest — waiting" for a run that has
 * already delivered eight verified findings is worse than saying nothing. When stage frames are
 * absent but the run has evidently done work, seed the completed stages from the persisted run and
 * label the rest honestly.
 */
export function deriveBoard(input: {
  run: ReviewRun | null;
  stages: Partial<Record<AgentName, StageState>>;
  workers: WorkerChip[];
  rulesInPlaybook?: number;
}): BoardView {
  const { run, stages, workers } = input;
  const rulesInPlaybook = input.rulesInPlaybook ?? defaultPlaybook.rules.length;
  const { rulesDone, rulesTotal } = ruleCounts(run, workers, rulesInPlaybook);

  const hasLiveStages = Object.keys(stages).length > 0;
  const started = Boolean(run) && (run!.findings.length > 0 || run!.stats.llmCalls > 0);
  if (hasLiveStages || !run || !started) {
    return { stages, resumed: false, rulesDone, rulesTotal };
  }

  const doc = run.document.stats;
  const verified = run.findings.filter(
    (f) => f.verification?.verdict === "pass" || f.verification?.verdict === "repaired",
  ).length;
  const finished = run.status === "awaiting_review" || run.status === "applied";

  const seeded: Partial<Record<AgentName, StageState>> = {
    ingest: {
      agent: "ingest",
      state: "end",
      label: `${doc.paragraphs} paragraphs · ${doc.sections} sections · ${doc.definitions} defined terms`,
    },
    planner: { agent: "planner", state: "end", label: `${rulesTotal} rules mapped onto the outline` },
    drafter: {
      agent: "drafter",
      state: finished ? "end" : "start",
      label: `${rulesDone} of ${rulesTotal} rules finished`,
    },
    verifier: {
      agent: "verifier",
      state: finished ? "end" : "start",
      label: `${verified} redline${verified === 1 ? "" : "s"} verified`,
    },
  };
  if (finished) {
    seeded.assembler = {
      agent: "assembler",
      state: "end",
      label: `${run.stats.findings} findings ordered by severity`,
    };
  }

  return { stages: seeded, resumed: true, rulesDone, rulesTotal };
}

/** Store-backed view of the board, shared by the findings pane and the document bar. */
export function useBoard(): BoardView {
  const run = useReviewStore((s) => s.run);
  const stages = useReviewStore((s) => s.stages);
  const workers = useReviewStore((s) => s.workers);
  return useMemo(() => deriveBoard({ run, stages, workers }), [run, stages, workers]);
}
