import type {
  CompleteRequest,
  CompleteResult,
  LlmClient,
  LlmEvent,
  LlmTotals,
  ToolLoopRequest,
  ToolLoopResult,
} from "@/src/agent/llm";
import type { Usage } from "@/src/agent/types";

const CALL_USAGE: Usage = { inputTokens: 100, outputTokens: 20, cacheReadTokens: 0, cacheWriteTokens: 0, costUsd: 0.001 };

export class FakeLlmClient implements LlmClient {
  readonly mode = "replay" as const;
  private calls = 0;
  private toolCalls = 0;
  private eventHandler?: (event: LlmEvent) => void | Promise<void>;

  constructor(
    private readonly completeHandler: (request: CompleteRequest<unknown>, call: number) => unknown,
    private readonly toolHandler: (request: ToolLoopRequest, call: number) => Promise<void>,
  ) {}

  setEventHandler(handler: (event: LlmEvent) => void | Promise<void>): void {
    this.eventHandler = handler;
  }

  async complete<T>(request: CompleteRequest<T>): Promise<CompleteResult<T>> {
    this.calls += 1;
    await this.eventHandler?.({ agent: request.agent, type: "llm_request", title: "fake request", ruleId: request.ruleId });
    const data = this.completeHandler(request as CompleteRequest<unknown>, this.calls) as T;
    await this.eventHandler?.({ agent: request.agent, type: "llm_response", title: "fake response", ruleId: request.ruleId, usage: CALL_USAGE });
    return { data, text: typeof data === "string" ? data : JSON.stringify(data), usage: CALL_USAGE, stopReason: "end_turn", raw: data };
  }

  async runTools(request: ToolLoopRequest): Promise<ToolLoopResult> {
    this.calls += 1;
    await this.eventHandler?.({ agent: request.agent, type: "llm_request", title: "fake tool request", ruleId: request.ruleId });
    await this.toolHandler(request, this.calls);
    this.toolCalls += 1;
    await this.eventHandler?.({ agent: request.agent, type: "llm_response", title: "fake tool response", ruleId: request.ruleId, usage: CALL_USAGE });
    return {
      text: "done",
      messages: [...request.messages, { role: "assistant", content: "done" }],
      usage: CALL_USAGE,
      iterations: 1,
      stopReason: "end_turn",
      raw: {},
    };
  }

  getTotals(): LlmTotals {
    return {
      calls: this.calls,
      toolCalls: this.toolCalls,
      retries: 0,
      usage: {
        inputTokens: this.calls * CALL_USAGE.inputTokens,
        outputTokens: this.calls * CALL_USAGE.outputTokens,
        cacheReadTokens: 0,
        cacheWriteTokens: 0,
        costUsd: Number((this.calls * CALL_USAGE.costUsd).toFixed(8)),
      },
    };
  }
}

export async function callTool(request: ToolLoopRequest, name: string, input: unknown): Promise<unknown> {
  const tool = request.tools.find((candidate) => candidate.name === name);
  if (!tool) throw new Error(`Missing fake tool: ${name}`);
  const output = await tool.run(tool.parse(input));
  if (typeof output !== "string") return output;
  return JSON.parse(output) as unknown;
}
