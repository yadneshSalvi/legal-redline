import { mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { betaZodTool } from "@anthropic-ai/sdk/helpers/beta/zod";
import { z } from "zod";

import { canonicalRequest, createLlmClient, ReplayCacheMiss, ReplayDrift, requestHash, type LlmTransport } from "@/src/agent/llm";

const system = [{ type: "text" as const, text: "stable", cache_control: { type: "ephemeral" as const } }];
const messages = [{ role: "user" as const, content: "hello" }];

describe("LLM replay cache", () => {
  it("returns a cache hit at zero cost and errors clearly on a miss", async () => {
    const directory = await mkdtemp(path.join(tmpdir(), "redliner-cache-"));
    const body = { model: "claude-opus-5", max_tokens: 16000, system, messages, output_config: { effort: "high" } };
    const response = {
      id: "msg_test", type: "message", role: "assistant", model: "claude-opus-5",
      content: [{ type: "text", text: "cached answer", citations: null }],
      stop_reason: "end_turn", stop_sequence: null, usage: { input_tokens: 10, output_tokens: 2, cache_creation_input_tokens: 0, cache_read_input_tokens: 0 },
    };
    await writeFile(path.join(directory, `${requestHash(body)}.json`), JSON.stringify({ response }));
    const client = createLlmClient({ mode: "replay", cacheDir: directory });
    const hit = await client.complete<string>({ agent: "baseline", effort: "high", system, messages });
    expect(hit.text).toBe("cached answer");
    expect(hit.usage.costUsd).toBe(0);
    expect(client.getTotals().calls).toBe(0);
    expect(canonicalRequest({ b: 1, a: 2 })).toBe('{"a":2,"b":1}');

    await expect(client.complete<string>({ agent: "baseline", effort: "high", system, messages: [{ role: "user", content: "miss" }] }))
      .rejects.toBeInstanceOf(ReplayCacheMiss);
  });

  it("records and verifies deterministic tool-result hashes", async () => {
    const directory = await mkdtemp(path.join(tmpdir(), "redliner-tools-"));
    const responses = [
      {
        id: "msg_tool", type: "message", role: "assistant", model: "claude-opus-5",
        content: [{ type: "tool_use", id: "tool_1", name: "echo", input: { value: "stable" } }],
        stop_reason: "tool_use", stop_sequence: null,
        usage: { input_tokens: 10, output_tokens: 2, cache_creation_input_tokens: 0, cache_read_input_tokens: 0 },
      },
      {
        id: "msg_done", type: "message", role: "assistant", model: "claude-opus-5",
        content: [{ type: "text", text: "done" }], stop_reason: "end_turn", stop_sequence: null,
        usage: { input_tokens: 10, output_tokens: 2, cache_creation_input_tokens: 0, cache_read_input_tokens: 0 },
      },
    ];
    const transport: LlmTransport = {
      complete: async () => { throw new Error("unexpected complete"); },
      tools: async () => {
        const response = responses.shift();
        if (!response) throw new Error("No scripted response");
        return response;
      },
    };
    const tool = betaZodTool({
      name: "echo", description: "Echo a value", inputSchema: z.object({ value: z.string() }),
      run: ({ value }) => JSON.stringify({ ok: true, value }),
    });
    const request = { agent: "drafter" as const, ruleId: "TEST", effort: "high" as const, system, messages, tools: [tool], maxIterations: 3 };
    await createLlmClient({ mode: "record", cacheDir: directory, transport }).runTools(request);
    await expect(createLlmClient({ mode: "replay", cacheDir: directory }).runTools(request)).resolves.toMatchObject({ text: "done" });

    const changed = betaZodTool({
      name: "echo", description: "Echo a value", inputSchema: z.object({ value: z.string() }),
      run: ({ value }) => JSON.stringify({ ok: false, value }),
    });
    await expect(createLlmClient({ mode: "replay", cacheDir: directory }).runTools({ ...request, tools: [changed] }))
      .rejects.toBeInstanceOf(ReplayDrift);
  });

  it("continues pause_turn content and rejects an exhausted pause", async () => {
    const paused = {
      id: "msg_pause", type: "message", role: "assistant", model: "claude-opus-5",
      content: [{ type: "text", text: "paused work" }], stop_reason: "pause_turn", stop_sequence: null,
      usage: { input_tokens: 1, output_tokens: 1, cache_creation_input_tokens: 0, cache_read_input_tokens: 0 },
    };
    const done = { ...paused, id: "msg_done", content: [{ type: "text", text: "complete" }], stop_reason: "end_turn" };
    const seenMessages: unknown[] = [];
    const responses = [paused, done];
    const transport: LlmTransport = {
      complete: async () => { throw new Error("unexpected complete"); },
      tools: async (body) => {
        seenMessages.push(body.messages);
        const response = responses.shift();
        if (!response) throw new Error("No scripted response");
        return response;
      },
    };
    const result = await createLlmClient({ mode: "live", transport }).runTools({
      agent: "drafter", effort: "high", system, messages, tools: [], maxIterations: 2,
    });
    expect(result.text).toBe("complete");
    expect(JSON.stringify(seenMessages[1])).toContain("paused work");

    const exhausted: LlmTransport = { complete: transport.complete, tools: async () => paused };
    await expect(createLlmClient({ mode: "live", transport: exhausted }).runTools({
      agent: "drafter", effort: "high", system, messages, tools: [], maxIterations: 1,
    })).rejects.toThrow("remained paused");
  });
});
