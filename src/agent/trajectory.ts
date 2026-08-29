import { nanoid } from "nanoid";

import type { AgentName, TrajectoryEvent, TrajectoryEventType, Usage } from "@/src/agent/types";
import type { Store } from "@/src/store";

export interface EventOptions {
  ruleId?: string;
  findingId?: string;
  payload?: unknown;
  usage?: Usage;
  durationMs?: number;
  parentId?: string;
}

export interface TrajectoryWriter {
  readonly runId: string;
  readonly events: readonly TrajectoryEvent[];
  event(agent: AgentName, type: TrajectoryEventType, title: string, options?: EventOptions): Promise<TrajectoryEvent>;
}

function redact(value: unknown): unknown {
  if (typeof value === "string") return value.replace(/sk-[A-Za-z0-9_-]{8,}/g, "[REDACTED]");
  if (Array.isArray(value)) return value.map(redact);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, item]) =>
        /api[-_]?key|authorization|token|secret/i.test(key) ? [key, "[REDACTED]"] : [key, redact(item)],
      ),
    );
  }
  return value;
}

export function createTrajectoryWriter(store: Store, runId: string): TrajectoryWriter {
  const mirror: TrajectoryEvent[] = [];
  let sequence = 0;
  let pending = Promise.resolve();
  const initialize = (async () => {
    const bytes = await store.getBytes(`runs/${runId}/trajectory.jsonl`);
    if (!bytes) return;
    for (const line of new TextDecoder().decode(bytes).split("\n").filter(Boolean)) {
      try {
        const parsed = JSON.parse(line) as TrajectoryEvent;
        mirror.push(parsed);
        sequence = Math.max(sequence, parsed.seq);
      } catch {
        // Ignore an incomplete final line; appendLine always writes complete records.
      }
    }
  })();

  return {
    runId,
    get events() {
      return mirror;
    },
    async event(agent, type, title, options = {}) {
      await initialize;
      const item: TrajectoryEvent = {
        id: nanoid(),
        runId,
        seq: ++sequence,
        t: new Date().toISOString(),
        agent,
        type,
        title,
        ...options,
        payload: redact(options.payload),
      };
      mirror.push(item);
      pending = pending.then(() => store.appendLine(`runs/${runId}/trajectory.jsonl`, JSON.stringify(item)));
      await pending;
      return item;
    },
  };
}
