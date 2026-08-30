import { readFile } from "node:fs/promises";
import { join, resolve } from "node:path";

import { z } from "zod";

import { completeOpenAiStructured } from "@/src/agent/llm";
import type { PositionLevel } from "@/src/agent/types";
import { atomicWriteJson, requestHash } from "@/src/eval/io";

export const ElementJudgeResultSchema = z.object({
  elements: z.array(z.object({
    element: z.string(),
    level: z.enum(["preferred", "fallback"]),
    met: z.boolean(),
    evidence: z.string(),
  })),
  satisfies_preferred: z.boolean(),
  satisfies_fallback: z.boolean(),
  minimal: z.boolean(),
  preserves_intent: z.boolean(),
});

export type ElementJudgeResult = z.infer<typeof ElementJudgeResultSchema>;
export type ElementJudgeMode = "live" | "record" | "replay";

export interface ElementJudgeInput {
  ruleId: string;
  ruleTitle: string;
  preferredPosition: string;
  fallbackPosition: string;
  preferredElements: readonly string[];
  fallbackElements: readonly string[];
  originalClause: string;
  renderedClause: string;
  definitions: string;
  comment: string;
}

export interface ElementJudgement {
  result: ElementJudgeResult;
  usage: { inputTokens: number; outputTokens: number };
  replayed: boolean;
  hash: string;
}

export interface ElementJudge {
  judge(input: ElementJudgeInput): Promise<ElementJudgement>;
}

interface CachedElementJudgement {
  result: ElementJudgeResult;
  usage: { inputTokens: number; outputTokens: number };
}

const SYSTEM = `You are an independent contract-redline evaluator. Evaluate operative language, including supplied defined terms, not the margin comment's promises.
Assess the preferred and fallback checklists separately. Copy every element string exactly, assign its supplied level, and give a boolean met verdict with concise evidence from the rendered language. Treat a conditional element as met when its condition is demonstrably absent, and explain that conclusion. A level is satisfied only when every element at that level is met.

Minimal means the proposal changes no more than needed to reach at least one complete level and adds no unrelated requirement. A concise insertion for a genuinely missing clause can be minimal even though every inserted word is new. Preserves intent means unrelated commercial terms remain effective and the edit introduces no contradiction. A customary other-court carve-out solely for temporary injunctive relief preserves an otherwise exclusive merits forum. Be strict about omitted duties, triggers, durations, remedies, and party direction.`;

function prompt(input: ElementJudgeInput): string {
  return [
    `Rule: ${input.ruleId} — ${input.ruleTitle}`,
    `Preferred position: ${input.preferredPosition}`,
    `Preferred elements (copy each JSON string value exactly):\n${JSON.stringify(input.preferredElements, null, 2)}`,
    `Fallback position: ${input.fallbackPosition}`,
    `Fallback elements (copy each JSON string value exactly):\n${JSON.stringify(input.fallbackElements, null, 2)}`,
    `Relevant defined terms:\n${input.definitions || "none"}`,
    `Original clause:\n${input.originalClause || "No responsive clause; proposal is an insertion."}`,
    `Rendered redlined clause:\n${input.renderedClause}`,
    `Margin comment (non-operative):\n${input.comment}`,
  ].join("\n\n");
}

export function judgeSatisfiesLevel(
  input: ElementJudgeInput,
  result: ElementJudgeResult,
  level: PositionLevel,
): boolean {
  const expected = level === "preferred" ? input.preferredElements : input.fallbackElements;
  const declared = level === "preferred" ? result.satisfies_preferred : result.satisfies_fallback;
  return declared && expected.every((element) =>
    judgeElementMet(result, level, element));
}

/** Accept legacy dev-cache marker prefixes while requiring the underlying element text verbatim. */
export function judgeElementMet(result: ElementJudgeResult, level: PositionLevel, element: string): boolean {
  return result.elements.some((candidate) =>
    candidate.level === level && candidate.element.replace(/^[PF]\d+\.\s*/u, "") === element && candidate.met);
}

export function createElementJudge(options: {
  mode: ElementJudgeMode;
  cacheDir?: string;
  allowLive?: boolean;
  apiKey?: string;
}): ElementJudge {
  const cacheDir = resolve(options.cacheDir ?? "evals/cache/judge-dev");
  return {
    async judge(input) {
      const user = prompt(input);
      const body = {
        model: "gpt-5.6-sol",
        reasoning: { effort: "high" },
        system: SYSTEM,
        messages: [{ role: "user", content: user }],
        output_config: { format: "ElementJudgeResultSchema-v1" },
      };
      const hash = requestHash(body);
      const cachePath = join(cacheDir, `${hash}.json`);
      if (options.mode === "replay") {
        try {
          const cached = JSON.parse(await readFile(cachePath, "utf8")) as CachedElementJudgement;
          return {
            result: ElementJudgeResultSchema.parse(cached.result),
            usage: cached.usage,
            replayed: true,
            hash,
          };
        } catch (error) {
          const missing = error instanceof Error && "code" in error && error.code === "ENOENT";
          if (!missing) throw error;
          if (options.allowLive !== true) throw new Error(`Element judge replay cache miss: ${cachePath}`);
        }
      }
      const response = await completeOpenAiStructured({
        model: "gpt-5.6-sol",
        effort: "high",
        system: SYSTEM,
        user,
        schema: ElementJudgeResultSchema,
        schemaName: "element_redline_judgement",
        apiKey: options.apiKey,
      });
      const cached: CachedElementJudgement = { result: response.data, usage: response.usage };
      if (options.mode === "record" || (options.mode === "replay" && options.allowLive === true)) {
        await atomicWriteJson(cachePath, cached);
      }
      return { ...cached, replayed: false, hash };
    },
  };
}
