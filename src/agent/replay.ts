import { createHash } from "node:crypto";

export interface CachedToolResult {
  name: string;
  ruleId?: string;
  sha256: string;
}

export interface CachedResponse {
  response: unknown;
  toolResults?: CachedToolResult[];
}

export class ReplayCacheMiss extends Error {
  constructor(readonly cacheFile: string) {
    super(`Replay cache miss: ${cacheFile}`);
    this.name = "ReplayCacheMiss";
  }
}

export class ReplayDrift extends Error {
  constructor(readonly toolName: string, readonly ruleId: string | undefined, detail: string) {
    super(`Replay tool drift for ${toolName}${ruleId ? ` (${ruleId})` : ""}: ${detail}`);
    this.name = "ReplayDrift";
  }
}

export function isReplayFailure(error: unknown): error is ReplayCacheMiss | ReplayDrift {
  return error instanceof ReplayCacheMiss || error instanceof ReplayDrift;
}

function canonicalize(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(canonicalize);
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value)
        .filter(([, item]) => item !== undefined && typeof item !== "function")
        .sort(([left], [right]) => left.localeCompare(right))
        .map(([key, item]) => [key, canonicalize(item)]),
    );
  }
  return value;
}

export function canonicalRequest(value: unknown): string {
  return JSON.stringify(canonicalize(value));
}

export function requestHash(value: unknown): string {
  return createHash("sha256").update(canonicalRequest(value)).digest("hex");
}
