import { mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { canonicalRequest, createLlmClient, requestHash } from "@/src/agent/llm";

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
      .rejects.toThrow("Replay cache miss");
  });
});
