import { beforeAll, describe, expect, it } from "vitest";

import { getConfig } from "@/src/agent/configs";
import { runReview } from "@/src/agent/orchestrator";
import type { Finding, ReviewRun } from "@/src/agent/types";
import { createTrajectoryWriter } from "@/src/agent/trajectory";
import { parseText } from "@/src/engine";
import { loadPlaybook } from "@/src/playbook/loader";
import type { Playbook } from "@/src/playbook/schema";
import { MemoryStore } from "@/src/store";
import { callTool, FakeLlmClient } from "@/tests/agent/fake-llm";

let playbook: Playbook;

beforeAll(async () => { playbook = await loadPlaybook("customer-vendor-services-v1"); });

function oneRule(id = "LOL-CAP"): Playbook {
  const rule = playbook.rules.find((candidate) => candidate.id === id);
  if (!rule) throw new Error(`Missing test rule ${id}`);
  return { ...playbook, rules: [rule] };
}

function queuedRun(document: ReturnType<typeof parseText>, config: ReviewRun["config"]): ReviewRun {
  const at = "2026-08-29T00:00:00.000Z";
  return {
    id: `test-${Math.random().toString(36).slice(2)}`,
    createdAt: at,
    status: "queued",
    config,
    playbookId: playbook.id,
    document,
    sourceKey: "runs/test/source.txt",
    findings: [],
    decisions: {},
    stats: {
      startedAt: at, llmCalls: 0, toolCalls: 0, retries: 0,
      usage: { inputTokens: 0, outputTokens: 0, costUsd: 0 }, findings: 0,
      bySeverity: { critical: 0, high: 0, medium: 0, low: 0 },
      byStatus: { deviation: 0, missing: 0, compliant: 0, needs_review: 0 },
    },
  };
}

function plannerOrMemo(request: { agent: string }, verifier: () => "pass" | "fail" = () => "pass"): unknown {
  if (request.agent === "planner") return { parties: { ourParty: "Customer", counterparty: "Vendor" }, plans: [{ ruleId: "LOL-CAP", candidateSectionIds: ["sec-9"], candidateParagraphIds: ["p0001"], likelyAbsent: false, note: "cap" }] };
  if (request.agent === "verifier") {
    const verdict = verifier();
    return { verdict, reasons: verdict === "pass" ? [] : ["Proposal needs repair"] };
  }
  if (request.agent === "memo") return { markdown: "# Issues memo\n" };
  throw new Error(`Unexpected fake agent ${request.agent}`);
}

describe("orchestrator", () => {
  it("persists findings, emits events, and sums stats", async () => {
    const document = parseText("9. Limitation of Liability\n\nVendor liability is capped at three months of fees.", "contract.txt");
    const store = new MemoryStore();
    const config = { ...getConfig("i2-workers"), concurrency: 1 };
    const run = queuedRun(document, config.id);
    await store.putBytes(run.sourceKey, new TextEncoder().encode("source"));
    const progress: string[] = [];
    const streamedFindings: Finding[] = [];
    const llm = new FakeLlmClient(
      (request) => plannerOrMemo(request),
      async (request) => { await callTool(request, "submit_finding", { status: "compliant", paragraphIds: ["p0001"], quote: "Vendor liability is capped at three months of fees.", rationale: "Test compliant result", confidence: 0.8 }); },
    );
    const reviewed = await runReview({
      run, originalBytes: new TextEncoder().encode("source"), playbook: oneRule(), config, store, llm,
      trajectory: createTrajectoryWriter(store, run.id),
      onProgress: (event) => {
        progress.push(event.type);
        if (event.type === "finding") streamedFindings.push(event.finding);
      },
    });
    expect(reviewed.status).toBe("awaiting_review");
    expect(reviewed.findings).toHaveLength(1);
    expect(reviewed.stats.findings).toBe(1);
    expect(reviewed.stats.llmCalls).toBeGreaterThanOrEqual(3);
    expect(reviewed.stats.perRule?.["LOL-CAP"]).toMatchObject({ costUsd: 0.001, llmCalls: 1, retries: 0 });
    expect(reviewed.findings[0]).toMatchObject({ costUsd: 0.001, durationMs: expect.any(Number) });
    expect(reviewed.stats.perRule?.["LOL-CAP"]?.durationMs).toBe(reviewed.findings[0]?.durationMs);
    expect(streamedFindings[0]).toMatchObject({ costUsd: 0.001, durationMs: expect.any(Number) });
    expect(progress).toContain("finding");
    expect(await store.getJson(`runs/${run.id}/run.json`)).toMatchObject({
      status: "awaiting_review",
      stats: { perRule: { "LOL-CAP": { costUsd: 0.001, llmCalls: 1 } } },
      findings: [{ costUsd: 0.001, durationMs: expect.any(Number) }],
    });
    const trajectory = new TextDecoder().decode((await store.getBytes(`runs/${run.id}/trajectory.jsonl`)) ?? new Uint8Array());
    expect(trajectory).toContain("llm_request");
    expect(trajectory).toContain("checkpoint");
  });

  it("continues the same drafter loop after verifier failure and passes a repair", async () => {
    const text = "9. Limitation of Liability\n\nVendor liability is capped at three months of fees.";
    const document = parseText(text, "contract.txt");
    const store = new MemoryStore();
    const config = { ...getConfig("i3-verifier"), concurrency: 1, maxRepairRounds: 1 };
    const run = queuedRun(document, config.id);
    let verifierCalls = 0;
    let draftCalls = 0;
    const llm = new FakeLlmClient(
      (request) => plannerOrMemo(request, () => (++verifierCalls === 1 ? "fail" : "pass")),
      async (request) => {
        draftCalls += 1;
        const proposal = {
          ops: [{ kind: "replace", paragraphId: "p0001", oldText: "three months", newText: "twelve (12) months" }],
          comment: "[Playbook] We aligned the mutual cap to twelve months' fees.", level: "fallback", summary: "Use twelve months' fees",
        };
        expect(await callTool(request, "propose_redline", proposal)).toMatchObject({ ok: true });
        await callTool(request, "submit_finding", { status: "deviation", paragraphIds: ["p0001"], quote: "Vendor liability is capped at three months of fees.", rationale: "Cap is too low", confidence: 0.9, proposal });
      },
    );
    const reviewed = await runReview({ run, originalBytes: new TextEncoder().encode(text), playbook: oneRule(), config, store, llm, trajectory: createTrajectoryWriter(store, run.id) });
    expect(draftCalls).toBe(2);
    expect(reviewed.findings[0]?.verification?.verdict).toBe("repaired");
    expect(reviewed.findings[0]?.status).toBe("deviation");
    expect(reviewed.stats.perRule?.["LOL-CAP"]).toMatchObject({
      costUsd: 0.004,
      llmCalls: 4,
      retries: 1,
    });
  });

  it("marks a finding needs_review when repair rounds are exhausted", async () => {
    const text = "9. Limitation of Liability\n\nVendor liability is capped at three months of fees.";
    const document = parseText(text, "contract.txt");
    const store = new MemoryStore();
    const config = { ...getConfig("i3-verifier"), concurrency: 1, maxRepairRounds: 1 };
    const run = queuedRun(document, config.id);
    const llm = new FakeLlmClient(
      (request) => plannerOrMemo(request, () => "fail"),
      async (request) => {
        const proposal = { ops: [{ kind: "replace", paragraphId: "p0001", oldText: "three months", newText: "twelve (12) months" }], comment: "[Playbook] We aligned the cap.", level: "fallback", summary: "Annual cap" };
        await callTool(request, "propose_redline", proposal);
        await callTool(request, "submit_finding", { status: "deviation", paragraphIds: ["p0001"], quote: "Vendor liability is capped at three months of fees.", rationale: "Cap is too low", confidence: 0.9, proposal });
      },
    );
    const reviewed = await runReview({ run, originalBytes: new TextEncoder().encode(text), playbook: oneRule(), config, store, llm, trajectory: createTrajectoryWriter(store, run.id) });
    expect(reviewed.findings[0]?.status).toBe("needs_review");
    expect(reviewed.findings[0]?.verification?.attempts).toBe(2);
  });

  it("does not pass a noncompliant three-month cap labelled compliant", async () => {
    const text = "9. Limitation of Liability\n\nVendor liability is capped at three months of fees.";
    const document = parseText(text, "contract.txt");
    const store = new MemoryStore();
    const config = { ...getConfig("i3-verifier"), concurrency: 1, maxRepairRounds: 0 };
    const run = queuedRun(document, config.id);
    const llm = new FakeLlmClient(
      (request) => plannerOrMemo(request, () => "pass"),
      async (request) => {
        await callTool(request, "submit_finding", {
          status: "compliant", paragraphIds: ["p0001"], quote: "Vendor liability is capped at three months of fees.",
          rationale: "Incorrectly claims compliance", confidence: 0.9,
        });
      },
    );
    const reviewed = await runReview({
      run, originalBytes: new TextEncoder().encode(text), playbook: oneRule(), config, store, llm,
      trajectory: createTrajectoryWriter(store, run.id),
    });
    expect(reviewed.findings[0]?.verification?.verdict).toBe("fail");
    expect(reviewed.findings[0]?.status).toBe("needs_review");
    expect(reviewed.findings[0]?.verification?.checks).toContainEqual(expect.objectContaining({
      name: "cap references 12 months of fees or a fixed floor", ok: false,
    }));
  });
});
