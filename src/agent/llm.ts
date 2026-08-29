import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import type { BetaRunnableTool } from "@anthropic-ai/sdk/lib/tools/BetaRunnableTool";
import { createHash, randomUUID } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import type { z } from "zod";

import { usageWithCost } from "@/src/agent/pricing";
import type { AgentName, Effort, TrajectoryEventType, Usage } from "@/src/agent/types";

export type LlmMode = "live" | "record" | "replay";
export type RunnableTool = BetaRunnableTool;

export interface SystemBlock {
  type: "text";
  text: string;
  cache_control?: { type: "ephemeral"; ttl?: "5m" | "1h" };
}

export interface CompleteRequest<T> {
  agent: AgentName;
  ruleId?: string;
  findingId?: string;
  model?: string;
  effort: Effort;
  system: SystemBlock[];
  messages: Anthropic.MessageParam[];
  schema?: z.ZodType<T>;
  maxTokens?: number;
}

export interface CompleteResult<T> {
  data: T;
  text: string;
  usage: Usage;
  stopReason: string | null;
  raw: unknown;
}

export interface ToolLoopRequest {
  agent: AgentName;
  ruleId?: string;
  findingId?: string;
  model?: string;
  effort: Effort;
  system: SystemBlock[];
  messages: Anthropic.Beta.BetaMessageParam[];
  tools: RunnableTool[];
  maxIterations: number;
  maxTokens?: number;
  onToolCall?: (name: string, input: unknown, output: unknown) => void | Promise<void>;
}

export interface ToolLoopResult {
  text: string;
  messages: Anthropic.Beta.BetaMessageParam[];
  usage: Usage;
  iterations: number;
  stopReason: string | null;
  raw: unknown;
}

export interface LlmEvent {
  agent: AgentName;
  type: Extract<TrajectoryEventType, "llm_request" | "llm_response" | "tool_call" | "tool_result" | "retry">;
  title: string;
  ruleId?: string;
  findingId?: string;
  payload?: unknown;
  usage?: Usage;
  durationMs?: number;
}

export interface LlmTotals {
  calls: number;
  toolCalls: number;
  retries: number;
  usage: Usage;
}

export interface LlmClient {
  readonly mode: LlmMode;
  complete<T>(req: CompleteRequest<T>): Promise<CompleteResult<T>>;
  runTools(req: ToolLoopRequest): Promise<ToolLoopResult>;
  getTotals(): LlmTotals;
  setEventHandler?(handler: (event: LlmEvent) => void | Promise<void>): void;
}

export interface CreateLlmClientOptions {
  mode: LlmMode;
  cacheDir?: string;
  model?: string;
  allowLive?: boolean;
  onEvent?: (event: LlmEvent) => void | Promise<void>;
}

interface CachedResponse {
  response: unknown;
}

const EMPTY_USAGE: Usage = { inputTokens: 0, outputTokens: 0, cacheReadTokens: 0, cacheWriteTokens: 0, costUsd: 0 };

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

function addUsage(target: Usage, addition: Usage): void {
  target.inputTokens += addition.inputTokens;
  target.outputTokens += addition.outputTokens;
  target.cacheReadTokens = (target.cacheReadTokens ?? 0) + (addition.cacheReadTokens ?? 0);
  target.cacheWriteTokens = (target.cacheWriteTokens ?? 0) + (addition.cacheWriteTokens ?? 0);
  target.costUsd = Number((target.costUsd + addition.costUsd).toFixed(8));
}

function messageUsage(model: string, raw: { usage: Anthropic.Usage | Anthropic.Beta.BetaUsage }): Usage {
  return usageWithCost(model, {
    inputTokens: raw.usage.input_tokens,
    outputTokens: raw.usage.output_tokens,
    cacheReadTokens: raw.usage.cache_read_input_tokens ?? 0,
    cacheWriteTokens: raw.usage.cache_creation_input_tokens ?? 0,
  });
}

function textFromContent(content: ReadonlyArray<{ type: string; text?: string }>): string {
  return content.filter((block) => block.type === "text").map((block) => block.text ?? "").join("\n").trim();
}

function assertStop(message: { stop_reason: string | null; stop_details?: unknown }): void {
  if (message.stop_reason === "refusal") {
    throw new Error(`Claude refused the request: ${JSON.stringify(message.stop_details ?? {})}`);
  }
  if (message.stop_reason === "max_tokens") {
    throw new Error("Claude reached max_tokens before completing the response");
  }
}

function apiTool(tool: RunnableTool): Anthropic.Beta.BetaTool {
  const custom = tool as Anthropic.Beta.BetaTool;
  return {
    type: "custom",
    name: custom.name,
    description: custom.description,
    input_schema: custom.input_schema,
    ...(custom.strict === undefined ? {} : { strict: custom.strict }),
    ...(custom.cache_control === undefined ? {} : { cache_control: custom.cache_control }),
  };
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function createLlmClient(options: CreateLlmClientOptions): LlmClient {
  const modelDefault = options.model ?? "claude-opus-5";
  const cacheDir = path.resolve(options.cacheDir ?? "evals/cache");
  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY, maxRetries: 5, timeout: 10 * 60 * 1000 });
  const totals: LlmTotals = { calls: 0, toolCalls: 0, retries: 0, usage: { ...EMPTY_USAGE } };
  let attachedEventHandler: ((event: LlmEvent) => void | Promise<void>) | undefined;

  const emit = async (event: LlmEvent): Promise<void> => {
    await options.onEvent?.(event);
    await attachedEventHandler?.(event);
  };

  const cachePath = (body: unknown): string => path.join(cacheDir, `${requestHash(body)}.json`);

  const readCache = async (body: unknown): Promise<unknown | null> => {
    try {
      const raw = JSON.parse(await readFile(cachePath(body), "utf8")) as CachedResponse;
      return raw.response;
    } catch (error) {
      if (error instanceof Error && "code" in error && error.code === "ENOENT") return null;
      throw error;
    }
  };

  const writeCache = async (body: unknown, response: unknown): Promise<void> => {
    const filename = cachePath(body);
    await mkdir(path.dirname(filename), { recursive: true });
    const temp = `${filename}.${randomUUID()}.tmp`;
    await writeFile(temp, `${JSON.stringify({ response }, null, 2)}\n`, "utf8");
    await rename(temp, filename);
  };

  const withRetry = async <T>(operation: () => Promise<T>, context: Omit<LlmEvent, "type" | "title">): Promise<T> => {
    for (let attempt = 0; ; attempt += 1) {
      try {
        return await operation();
      } catch (error) {
        const retryable =
          error instanceof Anthropic.RateLimitError ||
          error instanceof Anthropic.APIConnectionError ||
          (error instanceof Anthropic.APIError && error.status >= 500);
        if (!retryable || attempt >= 2) throw error;
        const waitMs = 1_000 * 2 ** attempt;
        totals.retries += 1;
        await emit({ ...context, type: "retry", title: `LLM request retry ${attempt + 1}`, payload: { waitMs } });
        await delay(waitMs);
      }
    }
  };

  const getOrCreate = async <T>(
    body: unknown,
    context: Omit<LlmEvent, "type" | "title">,
    create: () => Promise<T>,
  ): Promise<{ value: T; replayed: boolean }> => {
    if (options.mode === "replay") {
      const cached = await readCache(body);
      if (cached !== null) return { value: cached as T, replayed: true };
      if (!options.allowLive) throw new Error(`Replay cache miss: ${cachePath(body)}`);
    }
    const value = await withRetry(create, context);
    if (options.mode === "record" || (options.mode === "replay" && options.allowLive)) await writeCache(body, value);
    return { value, replayed: false };
  };

  return {
    mode: options.mode,
    setEventHandler(handler) {
      attachedEventHandler = handler;
    },
    getTotals() {
      return { ...totals, usage: { ...totals.usage } };
    },
    async complete<T>(req: CompleteRequest<T>): Promise<CompleteResult<T>> {
      const model = req.model ?? modelDefault;
      const outputFormat = req.schema ? zodOutputFormat(req.schema) : undefined;
      const body = {
        model,
        max_tokens: req.maxTokens ?? 16_000,
        system: req.system,
        messages: req.messages,
        output_config: { effort: req.effort, ...(outputFormat ? { format: outputFormat } : {}) },
      } satisfies Anthropic.MessageCreateParamsNonStreaming;
      const context = { agent: req.agent, ruleId: req.ruleId, findingId: req.findingId };
      await emit({ ...context, type: "llm_request", title: `${req.agent} LLM request`, payload: body });
      const started = Date.now();
      const result = await getOrCreate(body, context, async () => {
        if ((req.maxTokens ?? 16_000) > 16_000) return anthropic.messages.stream(body).finalMessage();
        if (req.schema) return anthropic.messages.parse(body);
        return anthropic.messages.create(body);
      });
      const message = result.value as Anthropic.Message & { parsed_output?: T | null };
      assertStop(message);
      const text = textFromContent(message.content);
      let data: T;
      if (req.schema) {
        data = message.parsed_output ?? req.schema.parse(JSON.parse(text));
      } else {
        data = text as T;
      }
      const usage = result.replayed ? { ...EMPTY_USAGE } : messageUsage(model, message);
      totals.calls += result.replayed ? 0 : 1;
      addUsage(totals.usage, usage);
      await emit({
        ...context,
        type: "llm_response",
        title: `${req.agent} LLM response${result.replayed ? " (replay)" : ""}`,
        payload: message,
        usage,
        durationMs: Date.now() - started,
      });
      return { data, text, usage, stopReason: message.stop_reason, raw: message };
    },
    async runTools(req: ToolLoopRequest): Promise<ToolLoopResult> {
      const model = req.model ?? modelDefault;
      const messages = [...req.messages];
      const aggregate: Usage = { ...EMPTY_USAGE };
      let finalRaw: Anthropic.Beta.BetaMessage | null = null;
      let iterations = 0;
      for (; iterations < req.maxIterations; iterations += 1) {
        const body = {
          model,
          max_tokens: req.maxTokens ?? 16_000,
          system: req.system,
          messages,
          tools: req.tools.map(apiTool),
          cache_control: { type: "ephemeral" },
          output_config: { effort: req.effort },
        } satisfies Anthropic.Beta.MessageCreateParamsNonStreaming;
        const context = { agent: req.agent, ruleId: req.ruleId, findingId: req.findingId };
        await emit({ ...context, type: "llm_request", title: `${req.agent} tool-loop request ${iterations + 1}`, payload: body });
        const started = Date.now();
        const result = await getOrCreate(body, context, () => anthropic.beta.messages.create(body));
        const message = result.value as Anthropic.Beta.BetaMessage;
        finalRaw = message;
        assertStop(message);
        const usage = result.replayed ? { ...EMPTY_USAGE } : messageUsage(model, message);
        totals.calls += result.replayed ? 0 : 1;
        addUsage(totals.usage, usage);
        addUsage(aggregate, usage);
        await emit({
          ...context,
          type: "llm_response",
          title: `${req.agent} tool-loop response ${iterations + 1}${result.replayed ? " (replay)" : ""}`,
          payload: message,
          usage,
          durationMs: Date.now() - started,
        });
        const calls = message.content.filter((block): block is Anthropic.Beta.BetaToolUseBlock => block.type === "tool_use");
        messages.push({ role: "assistant", content: message.content });
        if (!calls.length) break;
        const results: Anthropic.Beta.BetaToolResultBlockParam[] = [];
        for (const call of calls) {
          totals.toolCalls += 1;
          await emit({ ...context, type: "tool_call", title: `${req.agent} → ${call.name}`, payload: call.input });
          const runnable = req.tools.find((tool) => tool.name === call.name);
          let output: string;
          let isError = false;
          try {
            if (!runnable) throw new Error(`Unknown tool: ${call.name}`);
            const parsed = runnable.parse(call.input);
            const toolResult = await runnable.run(parsed, { toolUse: call, toolUseBlock: call });
            output = typeof toolResult === "string" ? toolResult : JSON.stringify(toolResult);
          } catch (error) {
            isError = true;
            output = JSON.stringify({ ok: false, error: error instanceof Error ? error.message : String(error) });
          }
          let parsedOutput: unknown = output;
          try {
            parsedOutput = JSON.parse(output) as unknown;
          } catch {
            // A tool may intentionally return plain text.
          }
          await req.onToolCall?.(call.name, call.input, parsedOutput);
          await emit({ ...context, type: "tool_result", title: `${call.name} result`, payload: parsedOutput });
          results.push({ type: "tool_result", tool_use_id: call.id, content: output, is_error: isError });
        }
        messages.push({ role: "user", content: results });
      }
      if (!finalRaw) throw new Error("Tool loop did not execute");
      if (iterations >= req.maxIterations && finalRaw.stop_reason === "tool_use") {
        throw new Error(`Tool loop exceeded ${req.maxIterations} iterations`);
      }
      return {
        text: textFromContent(finalRaw.content),
        messages,
        usage: aggregate,
        iterations: Math.min(iterations + 1, req.maxIterations),
        stopReason: finalRaw.stop_reason,
        raw: finalRaw,
      };
    },
  };
}
