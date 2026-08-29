import type { Usage } from "@/src/agent/types";

interface Price {
  input: number;
  output: number;
  cacheRead: number;
  cacheWrite: number;
}

const PRICES: Record<string, Price> = {
  "claude-opus-5": { input: 5, output: 25, cacheRead: 0.5, cacheWrite: 6.25 },
  "gpt-5.6-sol": { input: 5, output: 30, cacheRead: 5, cacheWrite: 5 },
};

export interface TokenUsage {
  inputTokens: number;
  outputTokens: number;
  cacheReadTokens?: number;
  cacheWriteTokens?: number;
}

export function calculateCost(model: string, tokens: TokenUsage): number {
  const price = PRICES[model] ?? PRICES["claude-opus-5"];
  const cost =
    (tokens.inputTokens * price.input +
      tokens.outputTokens * price.output +
      (tokens.cacheReadTokens ?? 0) * price.cacheRead +
      (tokens.cacheWriteTokens ?? 0) * price.cacheWrite) /
    1_000_000;
  return Number(cost.toFixed(8));
}

export function usageWithCost(model: string, tokens: TokenUsage): Usage {
  return { ...tokens, costUsd: calculateCost(model, tokens) };
}
