import { readFile } from "node:fs/promises";
import { join, resolve } from "node:path";

import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";

import { atomicWriteJson, requestHash } from "./io";

export const JudgeResultSchema = z.object({
  satisfies_rule: z.boolean(),
  minimal: z.boolean(),
  preserves_intent: z.boolean(),
  drafting_quality: z.number().int().min(1).max(5),
  reason: z.string().min(1),
});

export type JudgeResult = z.infer<typeof JudgeResultSchema>;
export type JudgeMode = "live" | "record" | "replay";

export interface JudgeInput {
  ruleId: string;
  ruleTitle: string;
  preferredPosition: string;
  fallbackPosition: string;
  originalClause: string;
  renderedClause: string;
  comment: string;
}

export interface JudgeUsage {
  inputTokens: number;
  outputTokens: number;
}

export interface Judgement {
  result: JudgeResult;
  usage: JudgeUsage;
  replayed: boolean;
  hash: string;
}

export interface IndependentJudge {
  judge(input: JudgeInput): Promise<Judgement>;
}

interface CachedJudgement {
  result: JudgeResult;
  usage: JudgeUsage;
}

const SYSTEM =
  "You are an independent contract-redline evaluator. Assess only whether the proposed clause reaches " +
  "the supplied playbook position, changes no more than needed, preserves unrelated commercial intent, " +
  "and is professionally drafted. Do not reward a persuasive comment when the operative language fails.";

function prompt(input: JudgeInput): string {
  return [
    `Rule: ${input.ruleId} — ${input.ruleTitle}`,
    `Preferred position: ${input.preferredPosition}`,
    `Fallback position: ${input.fallbackPosition}`,
    "Original clause:",
    input.originalClause,
    "Rendered redlined clause:",
    input.renderedClause,
    "Margin comment:",
    input.comment,
  ].join("\n\n");
}

export function createIndependentJudge(options: {
  mode: JudgeMode;
  cacheDir?: string;
  allowLive?: boolean;
  apiKey?: string;
}): IndependentJudge {
  const cacheDir = resolve(options.cacheDir ?? "evals/cache/judge");

  return {
    async judge(input) {
      const body = {
        model: "gpt-5.6-sol",
        reasoning: { effort: "high" },
        system: SYSTEM,
        messages: [{ role: "user", content: prompt(input) }],
        output_config: { format: "JudgeResultSchema-v1" },
      };
      const hash = requestHash(body);
      const cachePath = join(cacheDir, `${hash}.json`);
      if (options.mode === "replay") {
        try {
          const cached = JSON.parse(await readFile(cachePath, "utf8")) as CachedJudgement;
          return {
            result: JudgeResultSchema.parse(cached.result),
            usage: cached.usage,
            replayed: true,
            hash,
          };
        } catch (error) {
          const missing = error instanceof Error && "code" in error && error.code === "ENOENT";
          if (!missing) throw error;
          if (options.allowLive !== true) throw new Error(`Judge replay cache miss: ${cachePath}`);
        }
      }

      const client = new OpenAI({ apiKey: options.apiKey ?? process.env.OPENAI_API_KEY });
      const response = await client.responses.parse({
        model: "gpt-5.6-sol",
        reasoning: { effort: "high" },
        input: [
          { role: "system", content: SYSTEM },
          { role: "user", content: prompt(input) },
        ],
        text: { format: zodTextFormat(JudgeResultSchema, "redline_judgement") },
      });
      if (response.output_parsed === null) throw new Error("Independent judge returned no parsed output");
      const cached: CachedJudgement = {
        result: response.output_parsed,
        usage: {
          inputTokens: response.usage?.input_tokens ?? 0,
          outputTokens: response.usage?.output_tokens ?? 0,
        },
      };
      if (options.mode === "record" || (options.mode === "replay" && options.allowLive === true)) {
        await atomicWriteJson(cachePath, cached);
      }
      return { ...cached, replayed: false, hash };
    },
  };
}
