import { nanoid } from "nanoid";

import { getConfig } from "@/src/agent/configs";
import { createLlmClient, type LlmMode } from "@/src/agent/llm";
import { runReview } from "@/src/agent/orchestrator";
import { createTrajectoryWriter } from "@/src/agent/trajectory";
import type { ProgressEvent, ReviewRun } from "@/src/agent/types";
import { loadPlaybookById } from "@/src/playbook/loader";
import { type BufferedProgress, jsonError, loadRun, parseJsonLines, safeId, store } from "@/app/api/_shared";

export const runtime = "nodejs";
export const maxDuration = 800;
export const dynamic = "force-dynamic";

const encoder = new TextEncoder();
const INSTANCE_ID = `instance-${nanoid(10)}`;
const HEARTBEAT_MS = 10_000;
const LEASE_TIMEOUT_MS = 60_000;
const POLL_MS = 2_000;

interface ActiveRun {
  subscribers: Map<ReadableStreamDefaultController<Uint8Array>, ReturnType<typeof setInterval>>;
  seq: number;
  writes: Promise<void>;
  done: boolean;
  buffer: BufferedProgress[];
}

const activeRuns = new Map<string, ActiveRun>();

function sseData(buffered: BufferedProgress): Uint8Array {
  return encoder.encode(`data: ${JSON.stringify({ seq: buffered.seq, ...buffered.event })}\n\n`);
}

function terminal(run: ReviewRun): boolean {
  return run.status === "awaiting_review" || run.status === "applied" || run.status === "failed";
}

function freshLease(run: ReviewRun): boolean {
  const heartbeat = run.lease ? Date.parse(run.lease.heartbeatAt) : Number.NaN;
  return Number.isFinite(heartbeat) && Date.now() - heartbeat < LEASE_TIMEOUT_MS;
}

function publish(id: string, state: ActiveRun, event: ProgressEvent): void {
  const buffered = { seq: ++state.seq, event };
  state.buffer.push(buffered);
  for (const controller of state.subscribers.keys()) {
    try {
      controller.enqueue(sseData(buffered));
    } catch {
      const timer = state.subscribers.get(controller);
      if (timer) clearInterval(timer);
      state.subscribers.delete(controller);
    }
  }
  state.writes = state.writes.then(() => store().appendLine(`runs/${id}/progress.jsonl`, JSON.stringify(buffered)));
}

async function execute(id: string, run: ReviewRun, state: ActiveRun): Promise<void> {
  const fs = store();
  const heartbeat = setInterval(() => {
    state.writes = state.writes.then(async () => {
      if (terminal(run)) return;
      run.lease = { owner: INSTANCE_ID, heartbeatAt: new Date().toISOString() };
      await fs.putJson(`runs/${id}/run.json`, run);
    });
  }, HEARTBEAT_MS);
  try {
    const originalBytes = await fs.getBytes(run.sourceKey);
    if (!originalBytes) throw new Error("Run source is missing");
    const playbook = await loadPlaybookById(run.playbookId);
    const trajectory = createTrajectoryWriter(fs, id);
    const configuredMode = process.env.REDLINER_LLM_MODE;
    const mode: LlmMode = configuredMode === "record" || configuredMode === "replay" ? configuredMode : "live";
    const llm = createLlmClient({ mode, cacheDir: `data/runs/${id}/cache` });
    await runReview({
      run, originalBytes, playbook, config: getConfig(run.config), store: fs, trajectory, llm,
      onProgress: (event) => publish(id, state, event),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const failed = await fs.getJson<ReviewRun>(`runs/${id}/run.json`) ?? run;
    if (!terminal(failed)) {
      failed.status = "failed";
      failed.error = message;
      await fs.putJson(`runs/${id}/run.json`, failed);
    }
    publish(id, state, { type: "error", runId: id, message });
  } finally {
    clearInterval(heartbeat);
    await state.writes;
    state.done = true;
    for (const [controller, timer] of state.subscribers) {
      clearInterval(timer);
      try { controller.close(); } catch { /* already closed */ }
    }
    state.subscribers.clear();
    activeRuns.delete(id);
  }
}

async function claim(id: string, run: ReviewRun, existing: BufferedProgress[]): Promise<ActiveRun> {
  run.status = "running";
  run.lease = { owner: INSTANCE_ID, heartbeatAt: new Date().toISOString() };
  await store().putJson(`runs/${id}/run.json`, run);
  const state: ActiveRun = {
    subscribers: new Map(),
    seq: existing.reduce((max, item) => Math.max(max, item.seq), 0),
    writes: Promise.resolve(),
    done: false,
    buffer: [...existing],
  };
  activeRuns.set(id, state);
  void execute(id, run, state);
  return state;
}

export async function GET(request: Request, context: { params: Promise<{ id: string }> }): Promise<Response> {
  try {
    const { id: rawId } = await context.params;
    const id = safeId(rawId);
    const run = await loadRun(id);
    if (!run) return jsonError("Run not found", 404);
    const after = Number(new URL(request.url).searchParams.get("after") ?? 0) || 0;
    const existing = parseJsonLines<BufferedProgress>(await store().getBytes(`runs/${id}/progress.jsonl`));
    let state = activeRuns.get(id);
    if (!state && (run.status === "queued" || (run.status === "running" && !freshLease(run)))) {
      state = await claim(id, run, existing);
    }
    const pollPersisted = !state && run.status === "running" && freshLease(run);
    const currentState = state;
    let controllerRef: ReadableStreamDefaultController<Uint8Array> | undefined;
    let keepAlive: ReturnType<typeof setInterval> | undefined;
    let pollTimer: ReturnType<typeof setInterval> | undefined;
    let closed = false;
    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        controllerRef = controller;
        const replay = currentState?.buffer ?? existing;
        for (const buffered of replay.filter((item) => item.seq > after)) controller.enqueue(sseData(buffered));
        if (!currentState && !pollPersisted) {
          controller.close();
          return;
        }
        keepAlive = setInterval(() => {
          try { controller.enqueue(encoder.encode(": keep-alive\n\n")); } catch { /* cancellation cleans up */ }
        }, 15_000);
        if (currentState) {
          currentState.subscribers.set(controller, keepAlive);
          return;
        }
        let sequence = replay.reduce((max, item) => Math.max(max, item.seq), 0);
        const seen = new Set(replay.flatMap((item) => item.event.type === "finding" ? [item.event.finding.id] : []));
        let lastStats = "";
        let lastStatus = "";
        let polling = false;
        const poll = async (): Promise<void> => {
          if (polling || closed) return;
          polling = true;
          try {
            const latest = await loadRun(id);
            if (!latest) throw new Error("Run disappeared while polling");
            for (const finding of latest.findings) {
              if (seen.has(finding.id)) continue;
              seen.add(finding.id);
              controller.enqueue(sseData({ seq: ++sequence, event: { type: "finding", runId: id, finding } }));
            }
            const stats = JSON.stringify(latest.stats);
            if (stats !== lastStats) {
              lastStats = stats;
              controller.enqueue(sseData({ seq: ++sequence, event: { type: "stats", runId: id, stats: latest.stats } }));
            }
            if (latest.status !== lastStatus) {
              lastStatus = latest.status;
              controller.enqueue(sseData({ seq: ++sequence, event: { type: "status", runId: id, status: latest.status } }));
            }
            if (terminal(latest)) {
              controller.enqueue(sseData({ seq: ++sequence, event: { type: "done", runId: id, run: latest } }));
              closed = true;
              if (pollTimer) clearInterval(pollTimer);
              if (keepAlive) clearInterval(keepAlive);
              controller.close();
            }
          } catch (error) {
            closed = true;
            if (pollTimer) clearInterval(pollTimer);
            if (keepAlive) clearInterval(keepAlive);
            controller.error(error);
          } finally {
            polling = false;
          }
        };
        void poll();
        pollTimer = setInterval(() => void poll(), POLL_MS);
      },
      cancel() {
        closed = true;
        if (keepAlive) clearInterval(keepAlive);
        if (pollTimer) clearInterval(pollTimer);
        if (controllerRef && currentState) currentState.subscribers.delete(controllerRef);
      },
    });
    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive",
        "X-Accel-Buffering": "no",
      },
    });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : String(error));
  }
}
