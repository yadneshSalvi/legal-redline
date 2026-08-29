import { describe, expect, it } from "vitest";

import type { ProgressEvent, ReviewRun } from "@/src/agent/types";
import { RESUMED_STAGE_LABEL, deriveBoard } from "@/src/ui/state/board";
import { useReviewStore, type SequencedProgressEvent } from "@/src/ui/state/reviewStore";
import { sampleRun, sampleRunningRun } from "@/src/ui/fixtures/sample-run";

const RUN_ID = "stream-test";

function frame(seq: number, event: ProgressEvent): SequencedProgressEvent {
  return { ...event, seq };
}

describe("stream frames", () => {
  it("drops frames the client has already applied", () => {
    const store = useReviewStore.getState();
    store.reset();
    store.setRun({ ...sampleRunningRun, id: RUN_ID }, { persist: true });

    const log = frame(4, { type: "log", runId: RUN_ID, agent: "planner", line: "mapped 18 rules" });
    useReviewStore.getState().applyEvent(frame(3, { type: "stage", runId: RUN_ID, agent: "ingest", state: "end", label: "50 paragraphs" }));
    useReviewStore.getState().applyEvent(log);
    // A backoff reconnect that replays from an earlier cursor must be a no-op.
    useReviewStore.getState().applyEvent(frame(3, { type: "stage", runId: RUN_ID, agent: "ingest", state: "start", label: "reading" }));
    useReviewStore.getState().applyEvent(log);

    const state = useReviewStore.getState();
    expect(state.lastSeq).toBe(4);
    expect(state.logs).toEqual(["planner · mapped 18 rules"]);
    expect(state.stages.ingest?.state).toBe("end");
  });

  it("never appends the same log line twice even without a seq", () => {
    const store = useReviewStore.getState();
    store.reset();
    store.setRun({ ...sampleRunningRun, id: RUN_ID }, { persist: true });
    const event: ProgressEvent = { type: "log", runId: RUN_ID, agent: "planner", line: "same line" };
    useReviewStore.getState().applyEvent(event);
    useReviewStore.getState().applyEvent(event);
    expect(useReviewStore.getState().logs).toEqual(["planner · same line"]);
  });

  it("applies a fresh stats frame", () => {
    const store = useReviewStore.getState();
    store.reset();
    store.setRun({ ...sampleRunningRun, id: RUN_ID }, { persist: true });
    useReviewStore.getState().applyEvent(frame(9, { type: "stats", runId: RUN_ID, stats: sampleRun.stats }));
    expect(useReviewStore.getState().run?.stats.usage.costUsd).toBe(sampleRun.stats.usage.costUsd);
    expect(useReviewStore.getState().lastSeq).toBe(9);
  });
});

describe("progress board", () => {
  it("uses live stage events when they are present", () => {
    const board = deriveBoard({
      run: sampleRun,
      stages: { ingest: { agent: "ingest", state: "end", label: "50 paragraphs" } },
      workers: [
        { ruleId: "LOL-CAP", ruleTitle: "Cap", state: "done" },
        { ruleId: "INDEMN", ruleTitle: "Indemnity", state: "running" },
      ],
    });
    expect(board.resumed).toBe(false);
    expect(board.rulesDone).toBe(1);
    expect(board.rulesTotal).toBe(2);
  });

  it("seeds completed stages from a run that has already done work", () => {
    const resumedRun: ReviewRun = {
      ...sampleRun,
      status: "running",
      stats: { ...sampleRun.stats, llmCalls: 132, findings: 8 },
      findings: sampleRun.findings.slice(0, 8),
    };
    const board = deriveBoard({ run: resumedRun, stages: {}, workers: [] });
    expect(board.resumed).toBe(true);
    expect(board.stages.ingest?.state).toBe("end");
    expect(board.stages.planner?.state).toBe("end");
    expect(board.stages.drafter?.state).toBe("start");
    // Eighteen rules have per-rule stats, so the counter is honest rather than 0 of 18.
    expect(board.rulesTotal).toBe(18);
    expect(board.rulesDone).toBe(18);
    expect(board.stages.assembler).toBeUndefined();
    expect(RESUMED_STAGE_LABEL).toContain("resumed");
  });

  it("falls back to the finding count when there are no per-rule stats", () => {
    const resumedRun: ReviewRun = {
      ...sampleRun,
      status: "running",
      stats: { ...sampleRun.stats, perRule: undefined, llmCalls: 40, findings: 5 },
      findings: sampleRun.findings.slice(0, 5),
    };
    const board = deriveBoard({ run: resumedRun, stages: {}, workers: [] });
    expect(board.resumed).toBe(true);
    expect(board.rulesDone).toBe(5);
    expect(board.rulesTotal).toBe(18);
    expect(board.stages.drafter?.label).toBe("5 of 18 rules finished");
  });

  it("does not invent stages for a run that has not started", () => {
    const board = deriveBoard({
      run: { ...sampleRun, status: "queued", findings: [], stats: { ...sampleRun.stats, llmCalls: 0, findings: 0, perRule: undefined } },
      stages: {},
      workers: [],
    });
    expect(board.resumed).toBe(false);
    expect(board.stages).toEqual({});
  });
});
