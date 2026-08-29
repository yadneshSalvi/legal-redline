import { afterEach, describe, expect, it } from "vitest";

import { applyDecisions } from "@/src/agent/apply";
import type { ReviewRun } from "@/src/agent/types";
import { parseDocx, textToDocx } from "@/src/engine";
import { MemoryStore } from "@/src/store";
import { GET as getRun } from "@/app/api/runs/[id]/route";
import { POST as createRun } from "@/app/api/runs/route";
import { POST as saveDecisions } from "@/app/api/runs/[id]/decisions/route";
import { GET as getSamples } from "@/app/api/samples/route";
import { createStore } from "@/src/store";
import { createTrajectoryWriter } from "@/src/agent/trajectory";

const originalStore = process.env.REDLINER_STORE;
const originalVercel = process.env.VERCEL;
const originalBlobToken = process.env.BLOB_READ_WRITE_TOKEN;

afterEach(() => {
  if (originalStore === undefined) delete process.env.REDLINER_STORE;
  else process.env.REDLINER_STORE = originalStore;
  if (originalVercel === undefined) delete process.env.VERCEL;
  else process.env.VERCEL = originalVercel;
  if (originalBlobToken === undefined) delete process.env.BLOB_READ_WRITE_TOKEN;
  else process.env.BLOB_READ_WRITE_TOKEN = originalBlobToken;
});

describe("apply decisions", () => {
  it("writes tracked changes and one comment for an accepted finding", async () => {
    const text = "9. Limitation of Liability\n\nVendor liability is capped at three months of fees.";
    const original = await textToDocx(text, { title: "Apply test" });
    const document = await parseDocx(original, "apply-test.docx");
    const at = "2026-08-29T00:00:00.000Z";
    const run: ReviewRun = {
      id: "apply-test",
      createdAt: at,
      status: "awaiting_review",
      config: "i3-verifier",
      playbookId: "customer-vendor-services-v1",
      document,
      sourceKey: "runs/apply-test/source.docx",
      findings: [{
        id: "finding-1", ruleId: "LOL-CAP", ruleTitle: "Limitation of liability", severity: "critical", status: "deviation",
        paragraphIds: ["p0001"], quote: "Vendor liability is capped at three months of fees.", rationale: "Cap is too low.",
        proposal: { ops: [{ kind: "replace", paragraphId: "p0001", oldText: "three months", newText: "twelve (12) months" }], comment: "[Playbook] We aligned the cap to twelve months' fees.", level: "fallback", summary: "Annual cap" },
        verification: { verdict: "pass", attempts: 1, notes: "ok", checks: [] }, confidence: 0.9, producedBy: "drafter",
      }],
      decisions: { "finding-1": { findingId: "finding-1", action: "accept", at, by: "Test reviewer" } },
      memo: "# Issues memo\n",
      stats: { startedAt: at, llmCalls: 1, toolCalls: 1, retries: 0, usage: { inputTokens: 1, outputTokens: 1, costUsd: 0 }, findings: 1, bySeverity: { critical: 1, high: 0, medium: 0, low: 0 }, byStatus: { deviation: 1, missing: 0, compliant: 0, needs_review: 0 } },
    };
    const store = new MemoryStore();
    await createTrajectoryWriter(store, run.id).event("human", "human_decision", "accept LOL-CAP", {
      findingId: "finding-1", ruleId: "LOL-CAP", payload: run.decisions["finding-1"],
      idempotencyKey: `human-decision:${run.id}:finding-1:accept:${at}`,
    });
    const applied = await applyDecisions({ run, originalBytes: original, store });
    expect(applied.status).toBe("applied");
    expect(applied.output?.validation).toMatchObject({ ok: true, comments: 1 });
    expect(await store.getBytes("runs/apply-test/output.docx")).not.toBeNull();
    const events = new TextDecoder().decode((await store.getBytes("runs/apply-test/trajectory.jsonl")) ?? new Uint8Array())
      .trim().split("\n").map((line) => JSON.parse(line) as { type: string });
    expect(events.filter((event) => event.type === "human_decision")).toHaveLength(1);
  });
});

describe("run route handlers", () => {
  it("creates a run from text and retrieves it directly", async () => {
    process.env.REDLINER_STORE = "memory";
    const form = new FormData();
    form.set("file", new File(["1. Services\n\nVendor provides hosted services."], "route-test.txt", { type: "text/plain" }));
    form.set("config", "i3-verifier");
    form.set("playbookId", "customer-vendor-services-v1");
    const created = await createRun(new Request("http://localhost/api/runs", { method: "POST", body: form }));
    expect(created.status).toBe(201);
    const { runId } = await created.json() as { runId: string };
    const response = await getRun(new Request(`http://localhost/api/runs/${runId}`), { params: Promise.resolve({ id: runId }) });
    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({ id: runId, status: "queued", config: "i3-verifier", stats: { startedAt: "" } });
  });

  it("rejects an invalid decision batch before persistence or trajectory writes", async () => {
    process.env.REDLINER_STORE = "memory";
    const form = new FormData();
    form.set("file", new File(["1. Services\n\nVendor provides hosted services."], "decision-test.txt", { type: "text/plain" }));
    const created = await createRun(new Request("http://localhost/api/runs", { method: "POST", body: form }));
    const { runId } = await created.json() as { runId: string };
    const memory = createStore("memory");
    const run = await memory.getJson<ReviewRun>(`runs/${runId}/run.json`);
    if (!run) throw new Error("Missing test run");
    run.findings = [{
      id: "finding-invalid", ruleId: "LOL-CAP", ruleTitle: "Cap", severity: "critical", status: "deviation",
      paragraphIds: ["p0001"], quote: "Vendor provides hosted services.", rationale: "test", confidence: 0.5, producedBy: "drafter",
    }];
    await memory.putJson(`runs/${runId}/run.json`, run);
    const response = await saveDecisions(new Request(`http://localhost/api/runs/${runId}/decisions`, {
      method: "POST", headers: { "content-type": "application/json" },
      body: JSON.stringify({ decisions: [{
        findingId: "finding-invalid", action: "edit", ops: ["not-a-redline-op"], comment: "edit",
        at: "2026-08-30T00:00:00.000Z", by: "Reviewer",
      }] }),
    }), { params: Promise.resolve({ id: runId }) });
    expect(response.status).toBe(400);
    expect(await response.json()).toMatchObject({ error: expect.stringContaining("decisions.0.ops.0") });
    expect((await memory.getJson<ReviewRun>(`runs/${runId}/run.json`))?.decisions).toEqual({});
    expect(await memory.getBytes(`runs/${runId}/trajectory.jsonl`)).toBeNull();

    const unknown = await saveDecisions(new Request(`http://localhost/api/runs/${runId}/decisions`, {
      method: "POST", headers: { "content-type": "application/json" },
      body: JSON.stringify({ decisions: [
        { findingId: "finding-invalid", action: "accept", at: "2026-08-30T00:00:00.000Z", by: "Reviewer" },
        { findingId: "unknown-finding", action: "reject", at: "2026-08-30T00:00:00.000Z", by: "Reviewer" },
      ] }),
    }), { params: Promise.resolve({ id: runId }) });
    expect(unknown.status).toBe(400);
    expect((await memory.getJson<ReviewRun>(`runs/${runId}/run.json`))?.decisions).toEqual({});
    expect(await memory.getBytes(`runs/${runId}/trajectory.jsonl`)).toBeNull();
  });

  it("rejects path-like public playbook ids with a generic 404", async () => {
    process.env.REDLINER_STORE = "memory";
    const form = new FormData();
    form.set("file", new File(["1. Services\n\nVendor provides services."], "path-test.txt", { type: "text/plain" }));
    form.set("playbookId", "./package.json");
    const response = await createRun(new Request("http://localhost/api/runs", { method: "POST", body: form }));
    expect(response.status).toBe(404);
    expect(await response.json()).toEqual({ error: "Playbook not found" });
  });

  it("uses the same packaged samples on Vercel without a blob token", async () => {
    delete process.env.REDLINER_STORE;
    process.env.VERCEL = "1";
    delete process.env.BLOB_READ_WRITE_TOKEN;
    const samplesResponse = await getSamples();
    const samples = await samplesResponse.json() as Array<{ id: string }>;
    expect(samples.length).toBeGreaterThan(0);
    for (const sample of samples) {
      const form = new FormData();
      form.set("sampleId", sample.id);
      const response = await createRun(new Request("http://localhost/api/runs", { method: "POST", body: form }));
      expect(response.status, sample.id).toBe(201);
    }
  }, 30_000);
});
