import { mkdtemp } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { createTrajectoryWriter } from "@/src/agent/trajectory";
import { FsStore, MemoryStore, type Store } from "@/src/store";

async function expectOrderedAppends(store: Store): Promise<void> {
  await Promise.all(Array.from({ length: 50 }, (_, index) => store.appendLine("events/log.jsonl", String(index))));
  const bytes = await store.getBytes("events/log.jsonl");
  expect(new TextDecoder().decode(bytes ?? new Uint8Array()).trim().split("\n"))
    .toEqual(Array.from({ length: 50 }, (_, index) => String(index)));
}

describe("serialized appendLine", () => {
  it("preserves 50 concurrent memory appends in call order", async () => {
    await expectOrderedAppends(new MemoryStore());
  });

  it("preserves 50 concurrent filesystem appends in call order", async () => {
    await expectOrderedAppends(new FsStore(await mkdtemp(path.join(tmpdir(), "redliner-store-"))));
  });
});

describe("trajectory redaction", () => {
  it("keeps token telemetry while removing credential-shaped values", async () => {
    const store = new MemoryStore();
    const writer = createTrajectoryWriter(store, "redaction");
    await writer.event("planner", "llm_request", "request", {
      payload: {
        max_tokens: 16_000,
        usage: { input_tokens: 12, output_tokens: 4, cache_read_input_tokens: 8 },
        apiKey: "sk-secretcredential123",
        authorization: "Bearer secret-token-value",
        note: "credential sk-anothersecret123",
      },
    });
    const line = new TextDecoder().decode((await store.getBytes("runs/redaction/trajectory.jsonl")) ?? new Uint8Array());
    const event = JSON.parse(line) as { payload: Record<string, unknown> };
    expect(event.payload).toMatchObject({
      max_tokens: 16_000,
      usage: { input_tokens: 12, output_tokens: 4, cache_read_input_tokens: 8 },
      apiKey: "[REDACTED]",
      authorization: "[REDACTED]",
      note: "credential [REDACTED]",
    });
  });
});
