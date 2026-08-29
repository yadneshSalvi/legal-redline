import { createStore } from "@/src/store";
import type { Store } from "@/src/store";
import type { ProgressEvent, ReviewRun, RunStats } from "@/src/agent/types";

export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

export function store(): Store {
  return createStore();
}

export function runKey(id: string): string {
  return `runs/${safeId(id)}/run.json`;
}

export function safeId(id: string): string {
  if (!/^[A-Za-z0-9_-]{1,100}$/.test(id)) throw new Error("Invalid id");
  return id;
}

export function initialStats(at: string): RunStats {
  return {
    startedAt: at,
    llmCalls: 0,
    toolCalls: 0,
    retries: 0,
    usage: { inputTokens: 0, outputTokens: 0, cacheReadTokens: 0, cacheWriteTokens: 0, costUsd: 0 },
    findings: 0,
    bySeverity: { critical: 0, high: 0, medium: 0, low: 0 },
    byStatus: { deviation: 0, missing: 0, compliant: 0, needs_review: 0 },
  };
}

export async function loadRun(id: string): Promise<ReviewRun | null> {
  return store().getJson<ReviewRun>(runKey(id));
}

export function jsonError(message: string, status = 400): Response {
  return Response.json({ error: message }, { status });
}

export interface BufferedProgress {
  seq: number;
  event: ProgressEvent;
}

export function parseJsonLines<T>(bytes: Uint8Array | null): T[] {
  if (!bytes) return [];
  return new TextDecoder()
    .decode(bytes)
    .split("\n")
    .filter(Boolean)
    .flatMap((line) => {
      try {
        return [JSON.parse(line) as T];
      } catch {
        return [];
      }
    });
}
