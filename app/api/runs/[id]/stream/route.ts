import { createLlmClient } from "@/src/agent/llm";
import type { LlmMode } from "@/src/agent/llm";
import { getConfig } from "@/src/agent/configs";
import { runReview } from "@/src/agent/orchestrator";
import { createTrajectoryWriter } from "@/src/agent/trajectory";
import type { ProgressEvent, ReviewRun } from "@/src/agent/types";
import { loadPlaybook } from "@/src/playbook/loader";
import { type BufferedProgress, jsonError, loadRun, parseJsonLines, safeId, store } from "@/app/api/_shared";

export const runtime = "nodejs";
export const maxDuration = 800;
export const dynamic = "force-dynamic";

const encoder = new TextEncoder();

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

function publish(id: string, state: ActiveRun, event: ProgressEvent): void {
  const buffered = { seq: ++state.seq, event };
  state.buffer.push(buffered);
  for (const controller of state.subscribers.keys()) {
    try { controller.enqueue(sseData(buffered)); } catch {
      const timer = state.subscribers.get(controller);
      if (timer) clearInterval(timer);
      state.subscribers.delete(controller);
    }
  }
  state.writes = state.writes.then(() => store().appendLine(`runs/${id}/progress.jsonl`, JSON.stringify(buffered)));
}

async function execute(id: string, run: ReviewRun, state: ActiveRun): Promise<void> {
  try {
    const fs = store();
    const originalBytes = await fs.getBytes(run.sourceKey);
    if (!originalBytes) throw new Error("Run source is missing");
    const playbook = await loadPlaybook(run.playbookId);
    const trajectory = createTrajectoryWriter(fs, id);
    const configuredMode = process.env.REDLINER_LLM_MODE;
    const mode: LlmMode = configuredMode === "record" || configuredMode === "replay" ? configuredMode : "live";
    const llm = createLlmClient({ mode, cacheDir: `data/runs/${id}/cache` });
    await runReview({ run, originalBytes, playbook, config: getConfig(run.config), store: fs, trajectory, llm, onProgress: (event) => publish(id, state, event) });
  } catch (error) {
    publish(id, state, { type: "error", runId: id, message: error instanceof Error ? error.message : String(error) });
  } finally {
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

export async function GET(request: Request, context: { params: Promise<{ id: string }> }): Promise<Response> {
  try {
    const { id: rawId } = await context.params;
    const id = safeId(rawId);
    const run = await loadRun(id);
    if (!run) return jsonError("Run not found", 404);
    const after = Number(new URL(request.url).searchParams.get("after") ?? 0) || 0;
    const existing = parseJsonLines<BufferedProgress>(await store().getBytes(`runs/${id}/progress.jsonl`));
    let state = activeRuns.get(id);
    if (!state && run.status === "queued") {
      state = {
        subscribers: new Map(),
        seq: existing.reduce((max, item) => Math.max(max, item.seq), 0),
        writes: Promise.resolve(),
        done: false,
        buffer: [...existing],
      };
      activeRuns.set(id, state);
      void execute(id, run, state);
    }
    const currentState = state;
    let controllerRef: ReadableStreamDefaultController<Uint8Array> | undefined;
    let keepAlive: ReturnType<typeof setInterval> | undefined;
    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        controllerRef = controller;
        const replay = currentState?.buffer ?? existing;
        for (const buffered of replay.filter((item) => item.seq > after)) controller.enqueue(sseData(buffered));
        if (!currentState || currentState.done) {
          controller.close();
          return;
        }
        keepAlive = setInterval(() => {
          try { controller.enqueue(encoder.encode(": keep-alive\n\n")); } catch {
            if (keepAlive) clearInterval(keepAlive);
            currentState.subscribers.delete(controller);
          }
        }, 15_000);
        currentState.subscribers.set(controller, keepAlive);
      },
      cancel() {
        if (keepAlive) clearInterval(keepAlive);
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
