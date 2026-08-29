import { afterEach, describe, expect, it } from "vitest";

import { applyDecisions } from "@/src/agent/apply";
import type { ReviewRun } from "@/src/agent/types";
import { parseDocx, textToDocx } from "@/src/engine";
import { MemoryStore } from "@/src/store";
import { GET as getRun } from "@/app/api/runs/[id]/route";
import { POST as createRun } from "@/app/api/runs/route";

const originalStore = process.env.REDLINER_STORE;

afterEach(() => {
  if (originalStore === undefined) delete process.env.REDLINER_STORE;
  else process.env.REDLINER_STORE = originalStore;
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
    const applied = await applyDecisions({ run, originalBytes: original, store });
    expect(applied.status).toBe("applied");
    expect(applied.output?.validation).toMatchObject({ ok: true, comments: 1 });
    expect(await store.getBytes("runs/apply-test/output.docx")).not.toBeNull();
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
    expect(await response.json()).toMatchObject({ id: runId, status: "queued", config: "i3-verifier" });
  });
});
