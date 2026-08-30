import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";

import { usageWithCost } from "@/src/agent/pricing";
import type { RunStats } from "@/src/agent/types";

interface CachedAnthropicResponse {
  response?: {
    model?: string;
    usage?: {
      input_tokens?: number;
      output_tokens?: number;
      cache_read_input_tokens?: number;
      cache_creation_input_tokens?: number;
    };
    content?: Array<{ type?: string }>;
  };
}

export async function existingReplayStats(path: string): Promise<RunStats | null> {
  try {
    return JSON.parse(await readFile(path, "utf8")) as RunStats;
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") return null;
    throw error;
  }
}

export async function replayStatsFromCache(cacheDir: string, stats: RunStats): Promise<RunStats> {
  let files: string[];
  try {
    files = (await readdir(cacheDir)).filter((file) => file.endsWith(".json")).sort();
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") return stats;
    throw error;
  }
  const usage = { inputTokens: 0, outputTokens: 0, cacheReadTokens: 0, cacheWriteTokens: 0, costUsd: 0 };
  let toolCalls = 0;
  for (const file of files) {
    const cached = JSON.parse(await readFile(join(cacheDir, file), "utf8")) as CachedAnthropicResponse;
    const response = cached.response;
    if (response?.usage === undefined) continue;
    const priced = usageWithCost(response.model ?? "claude-opus-5", {
      inputTokens: response.usage.input_tokens ?? 0,
      outputTokens: response.usage.output_tokens ?? 0,
      cacheReadTokens: response.usage.cache_read_input_tokens ?? 0,
      cacheWriteTokens: response.usage.cache_creation_input_tokens ?? 0,
    });
    usage.inputTokens += priced.inputTokens;
    usage.outputTokens += priced.outputTokens;
    usage.cacheReadTokens += priced.cacheReadTokens ?? 0;
    usage.cacheWriteTokens += priced.cacheWriteTokens ?? 0;
    usage.costUsd += priced.costUsd;
    toolCalls += response.content?.filter((block) => block.type === "tool_use").length ?? 0;
  }
  return {
    ...stats,
    llmCalls: files.length,
    toolCalls,
    usage: { ...usage, costUsd: Number(usage.costUsd.toFixed(8)) },
  };
}
