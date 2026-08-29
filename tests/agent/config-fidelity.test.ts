import { beforeAll, describe, expect, it } from "vitest";

import { getConfig } from "@/src/agent/configs";
import { runReview } from "@/src/agent/orchestrator";
import { createTrajectoryWriter } from "@/src/agent/trajectory";
import type { ConfigId, ReviewRun } from "@/src/agent/types";
import { parseText } from "@/src/engine";
import { loadPlaybook } from "@/src/playbook/loader";
import type { Playbook } from "@/src/playbook/schema";
import { MemoryStore } from "@/src/store";
import { callTool, FakeLlmClient } from "@/tests/agent/fake-llm";

let playbook: Playbook;

beforeAll(async () => {
  const full = await loadPlaybook("customer-vendor-services-v1");
  playbook = { ...full, rules: full.rules.slice(0, 2) };
});

class SnapshotStore extends MemoryStore {
  readonly findingSnapshots: number[] = [];

  override async putJson(key: string, value: unknown): Promise<void> {
    if (key.endsWith("/run.json")) {
      const run = value as ReviewRun;
      this.findingSnapshots.push(run.findings.length);
    }
    await super.putJson(key, value);
  }
}

function queuedRun(config: ConfigId, document: ReturnType<typeof parseText>): ReviewRun {
  const createdAt = "2025-01-01T00:00:00.000Z";
  return {
    id: `${config}-fidelity`, createdAt, status: "queued", config, playbookId: playbook.id,
    document, sourceKey: `runs/${config}-fidelity/source.txt`, findings: [], decisions: {},
    stats: {
      startedAt: createdAt, llmCalls: 0, toolCalls: 0, retries: 0,
      usage: { inputTokens: 0, outputTokens: 0, costUsd: 0 }, findings: 0,
      bySeverity: { critical: 0, high: 0, medium: 0, low: 0 },
      byStatus: { deviation: 0, missing: 0, compliant: 0, needs_review: 0 },
    },
  };
}

function baselineOutput(document: ReturnType<typeof parseText>): unknown {
  const paragraph = document.paragraphs.find((candidate) => !candidate.isHeading);
  if (!paragraph) throw new Error("Missing body paragraph");
  return {
    findings: playbook.rules.map((rule) => ({
      ruleId: rule.id, status: "compliant", paragraphIds: [paragraph.id], quote: paragraph.text,
      rationale: `${rule.id} reviewed`, confidence: 0.8,
    })),
  };
}

async function execute(configId: "b0-chat" | "b1-prompt" | "x-monolith"): Promise<{ run: ReviewRun; store: SnapshotStore }> {
  const document = parseText("1. Services\n\nVendor provides services.", "contract.txt");
  const store = new SnapshotStore();
  const output = baselineOutput(document);
  const llm = new FakeLlmClient(
    (_request, call) => configId === "b0-chat" && call === 1 ? "Free-form review" : output,
    async (request) => {
      for (const rule of playbook.rules) {
        await callTool(request, "submit_finding", {
          ruleId: rule.id, status: "compliant", paragraphIds: ["p0001"],
          quote: "Vendor provides services.", rationale: `${rule.id} reviewed`, confidence: 0.8,
        });
      }
    },
  );
  const run = queuedRun(configId, document);
  const reviewed = await runReview({
    run, originalBytes: new Uint8Array(), playbook, config: getConfig(configId), store, llm,
    trajectory: createTrajectoryWriter(store, run.id),
  });
  return { run: reviewed, store };
}

describe("configuration fidelity", () => {
  it("keeps exact model-call budgets for baselines and monolith", async () => {
    expect((await execute("b1-prompt")).run.stats.llmCalls).toBe(1);
    expect((await execute("b0-chat")).run.stats.llmCalls).toBe(2);
    expect((await execute("x-monolith")).run.stats.llmCalls).toBe(1);
  });

  it.each([
    ["b1-prompt", 0.001, 1],
    ["b0-chat", 0.002, 2],
  ] as const)("attributes shared baseline resources for %s", async (configId, costUsd, llmCalls) => {
    const { run } = await execute(configId);
    expect(run.stats.perRule?.["*"]).toMatchObject({ costUsd, llmCalls, retries: 0 });
    expect(run.findings).toHaveLength(2);
    expect(run.findings.reduce((sum, finding) => sum + (finding.costUsd ?? 0), 0)).toBeCloseTo(costUsd, 8);
    expect(run.findings.every((finding) => finding.durationMs !== undefined)).toBe(true);
    expect(run.findings.reduce((sum, finding) => sum + (finding.durationMs ?? 0), 0))
      .toBe(run.stats.perRule?.["*"]?.durationMs);
  });

  it.each(["b1-prompt", "x-monolith"] as const)("checkpoints %s after each finding", async (configId) => {
    const { run, store } = await execute(configId);
    expect(store.findingSnapshots).toContain(1);
    expect(store.findingSnapshots).toContain(2);
    expect(run.stats.startedAt).not.toBe(run.createdAt);
  });
});
