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

export const JudgeV2ResultSchema = z.object({
  elements: z.array(z.object({
    element: z.string().min(1),
    level: z.enum(["preferred", "fallback"]),
    met: z.boolean(),
    evidence: z.string().min(1),
  })).min(2),
  satisfies_preferred: z.boolean(),
  satisfies_fallback: z.boolean(),
  minimal: z.boolean(),
  preserves_intent: z.boolean(),
  drafting_quality: z.number().int().min(1).max(5),
  reason: z.string().min(1),
});

export type JudgeV2Result = z.infer<typeof JudgeV2ResultSchema>;

export interface JudgeV2Input extends JudgeInput {
  preferredElements?: readonly string[];
  fallbackElements?: readonly string[];
}

export interface JudgeV2Judgement {
  result: JudgeV2Result;
  usage: JudgeUsage;
  replayed: boolean;
  hash: string;
}

export interface IndependentJudgeV2 {
  judge(input: JudgeV2Input): Promise<JudgeV2Judgement>;
}

interface CachedJudgement {
  result: JudgeResult;
  usage: JudgeUsage;
}

const SYSTEM =
  "You are an independent contract-redline evaluator. Assess only whether the proposed clause reaches " +
  "the supplied playbook position, changes no more than needed, preserves unrelated commercial intent, " +
  "and is professionally drafted. Do not reward a persuasive comment when the operative language fails.";

const V2_SYSTEM =
  "You are an independent contract-redline evaluator. Evaluate operative language, not promises in the margin comment. " +
  "Assess preferred and fallback separately at the atomic-element level. When checklists are supplied, copy every " +
  "element exactly once with its supplied level. Otherwise first decompose each position into a complete, non-overlapping " +
  "set of atomic operative requirements, then judge each requirement. A conditional requirement is met only when its " +
  "condition is demonstrably absent or the required language is present; explain the evidence. A level is satisfied only " +
  "when every element at that level is met. Minimal means no more is changed than needed to reach a complete level and no " +
  "unrelated requirement is added. Preserves intent means unrelated commercial terms remain effective and no contradiction " +
  "is introduced. Be strict about omitted duties, triggers, durations, remedies, and party direction.";

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

function v2Prompt(input: JudgeV2Input): string {
  const explicit = input.preferredElements !== undefined && input.fallbackElements !== undefined;
  return [
    `Rule: ${input.ruleId} — ${input.ruleTitle}`,
    `Preferred position: ${input.preferredPosition}`,
    explicit
      ? `Preferred elements (copy every JSON string exactly once):\n${JSON.stringify(input.preferredElements, null, 2)}`
      : "Preferred elements: decompose the preferred position into atomic requirements.",
    `Fallback position: ${input.fallbackPosition}`,
    explicit
      ? `Fallback elements (copy every JSON string exactly once):\n${JSON.stringify(input.fallbackElements, null, 2)}`
      : "Fallback elements: decompose the fallback position into atomic requirements.",
    `Original clause:\n${input.originalClause || "No responsive clause; the proposal is an insertion."}`,
    `Rendered redlined clause:\n${input.renderedClause}`,
    `Margin comment (non-operative):\n${input.comment}`,
  ].join("\n\n");
}

function normalizeV2Result(input: JudgeV2Input, value: JudgeV2Result): JudgeV2Result {
  for (const level of ["preferred", "fallback"] as const) {
    const expected = level === "preferred" ? input.preferredElements : input.fallbackElements;
    const actual = value.elements.filter((item) => item.level === level);
    if (actual.length === 0) throw new Error(`Judge v2 returned no ${level} elements for ${input.ruleId}`);
    if (expected !== undefined) {
      const counts = new Map(actual.map((item) => [item.element, (actual.filter((other) => other.element === item.element).length)]));
      const missing = expected.filter((element) => counts.get(element) !== 1);
      const unexpected = actual.filter((item) => !expected.includes(item.element));
      if (missing.length > 0 || unexpected.length > 0 || actual.length !== expected.length) {
        throw new Error(`Judge v2 element mismatch for ${input.ruleId}/${level}`);
      }
    }
  }
  const complete = (level: "preferred" | "fallback"): boolean => {
    const elements = value.elements.filter((item) => item.level === level);
    return elements.length > 0 && elements.every((item) => item.met);
  };
  return {
    ...value,
    satisfies_preferred: complete("preferred"),
    satisfies_fallback: complete("fallback"),
  };
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

export function createIndependentJudgeV2(options: {
  mode: JudgeMode;
  cacheDir?: string;
  allowLive?: boolean;
  apiKey?: string;
}): IndependentJudgeV2 {
  const cacheDir = resolve(options.cacheDir ?? "evals/cache/judge-v2");
  return {
    async judge(input) {
      const user = v2Prompt(input);
      const body = {
        model: "gpt-5.6-sol",
        reasoning: { effort: "high" },
        system: V2_SYSTEM,
        messages: [{ role: "user", content: user }],
        output_config: { format: "JudgeV2ResultSchema-v1" },
      };
      const hash = requestHash(body);
      const cachePath = join(cacheDir, `${hash}.json`);
      if (options.mode === "replay") {
        try {
          const cached = JSON.parse(await readFile(cachePath, "utf8")) as { result: JudgeV2Result; usage: JudgeUsage };
          return {
            result: normalizeV2Result(input, JudgeV2ResultSchema.parse(cached.result)),
            usage: cached.usage,
            replayed: true,
            hash,
          };
        } catch (error) {
          const missing = error instanceof Error && "code" in error && error.code === "ENOENT";
          if (!missing) throw error;
          if (options.allowLive !== true) throw new Error(`Judge v2 replay cache miss: ${cachePath}`);
        }
      }
      const client = new OpenAI({ apiKey: options.apiKey ?? process.env.OPENAI_API_KEY });
      const response = await client.responses.parse({
        model: "gpt-5.6-sol",
        reasoning: { effort: "high" },
        input: [
          { role: "system", content: V2_SYSTEM },
          { role: "user", content: user },
        ],
        text: { format: zodTextFormat(JudgeV2ResultSchema, "redline_judgement_v2") },
      });
      if (response.output_parsed === null) throw new Error("Independent judge v2 returned no parsed output");
      const cached = {
        result: normalizeV2Result(input, response.output_parsed),
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
