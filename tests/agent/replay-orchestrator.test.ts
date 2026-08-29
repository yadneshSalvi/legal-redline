import { mkdtemp, readFile, readdir, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { beforeAll, describe, expect, it } from "vitest";

import { getConfig } from "@/src/agent/configs";
import { createLlmClient, ReplayCacheMiss, type LlmTransport } from "@/src/agent/llm";
import { runReview } from "@/src/agent/orchestrator";
import { createTrajectoryWriter } from "@/src/agent/trajectory";
import type { ReviewRun } from "@/src/agent/types";
import { parseText } from "@/src/engine";
import { loadPlaybook } from "@/src/playbook/loader";
import type { Playbook } from "@/src/playbook/schema";
import { MemoryStore } from "@/src/store";

let playbook: Playbook;

beforeAll(async () => {
  const full = await loadPlaybook("customer-vendor-services-v1");
  const rule = full.rules.find((candidate) => candidate.id === "LOL-CAP");
  if (!rule) throw new Error("Missing LOL-CAP rule");
  playbook = { ...full, rules: [rule] };
});

function queuedRun(id: string, document: ReturnType<typeof parseText>): ReviewRun {
  return {
    id, createdAt: "2026-08-30T00:00:00.000Z", status: "queued", config: "i2-workers",
    playbookId: playbook.id, document, sourceKey: `runs/${id}/source.txt`, findings: [], decisions: {},
    stats: {
      startedAt: "", llmCalls: 0, toolCalls: 0, retries: 0,
      usage: { inputTokens: 0, outputTokens: 0, costUsd: 0 }, findings: 0,
      bySeverity: { critical: 0, high: 0, medium: 0, low: 0 },
      byStatus: { deviation: 0, missing: 0, compliant: 0, needs_review: 0 },
    },
  };
}

function message(id: string, content: unknown[], parsedOutput?: unknown): unknown {
  return {
    id, type: "message", role: "assistant", model: "claude-opus-5", content,
    stop_reason: content.some((block) => typeof block === "object" && block !== null && "type" in block && block.type === "tool_use") ? "tool_use" : "end_turn",
    stop_sequence: null,
    usage: { input_tokens: 10, output_tokens: 2, cache_creation_input_tokens: 0, cache_read_input_tokens: 0 },
    ...(parsedOutput === undefined ? {} : { parsed_output: parsedOutput }),
  };
}

describe("orchestrator replay contract", () => {
  it("replays recorded findings byte-identically and propagates a removed cache entry", async () => {
    const directory = await mkdtemp(path.join(tmpdir(), "redliner-run-replay-"));
    const document = parseText("9. Limitation of Liability\n\nVendor liability is capped at twelve months of fees.", "contract.txt");
    let completeCalls = 0;
    const transport: LlmTransport = {
      complete: async () => {
        completeCalls += 1;
        if (completeCalls === 1) {
          const output = {
            parties: { ourParty: "Customer", counterparty: "Vendor" },
            plans: [{ ruleId: "LOL-CAP", candidateSectionIds: ["sec-9"], candidateParagraphIds: ["p0001"], likelyAbsent: false, note: "cap" }],
          };
          return message("planner", [{ type: "text", text: JSON.stringify(output) }], output);
        }
        const output = { markdown: "# Issues memo\n" };
        return message("memo", [{ type: "text", text: JSON.stringify(output) }], output);
      },
      tools: async (body) => {
        if (JSON.stringify(body.messages).includes("tool_result")) return message("draft-done", [{ type: "text", text: "done" }]);
        return message("draft-submit", [{
          type: "tool_use", id: "tool-submit", name: "submit_finding",
          input: {
            status: "compliant", paragraphIds: ["p0001"],
            quote: "Vendor liability is capped at twelve months of fees.", rationale: "Annual cap is present.", confidence: 0.9,
          },
        }]);
      },
    };
    const config = { ...getConfig("i2-workers"), concurrency: 1 };
    const firstStore = new MemoryStore();
    const first = await runReview({
      run: queuedRun("recorded", document), originalBytes: new Uint8Array(), playbook, config,
      store: firstStore, trajectory: createTrajectoryWriter(firstStore, "recorded"),
      llm: createLlmClient({ mode: "record", cacheDir: directory, transport }),
    });
    const secondStore = new MemoryStore();
    const second = await runReview({
      run: queuedRun("replayed", document), originalBytes: new Uint8Array(), playbook, config,
      store: secondStore, trajectory: createTrajectoryWriter(secondStore, "replayed"),
      llm: createLlmClient({ mode: "replay", cacheDir: directory }),
    });
    expect(JSON.stringify(second.findings)).toBe(JSON.stringify(first.findings));

    const cacheFiles = (await readdir(directory)).sort();
    let cacheFile: string | undefined;
    for (const candidate of cacheFiles) {
      const cached = JSON.parse(await readFile(path.join(directory, candidate), "utf8")) as {
        response?: { content?: Array<{ type?: string }> };
      };
      if (cached.response?.content?.some((block) => block.type === "tool_use")) {
        cacheFile = candidate;
        break;
      }
    }
    if (!cacheFile) throw new Error("Expected recorded cache files");
    await rm(path.join(directory, cacheFile));
    const missStore = new MemoryStore();
    await expect(runReview({
      run: queuedRun("missing", document), originalBytes: new Uint8Array(), playbook, config,
      store: missStore, trajectory: createTrajectoryWriter(missStore, "missing"),
      llm: createLlmClient({ mode: "replay", cacheDir: directory }),
    })).rejects.toBeInstanceOf(ReplayCacheMiss);
  });
});
