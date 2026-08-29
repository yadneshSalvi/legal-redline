import { afterEach, describe, expect, it } from "vitest";

import { GET as streamRun } from "@/app/api/runs/[id]/stream/route";
import type { ReviewRun } from "@/src/agent/types";
import { parseText } from "@/src/engine";
import { createStore } from "@/src/store";

const originalStore = process.env.REDLINER_STORE;

afterEach(() => {
  if (originalStore === undefined) delete process.env.REDLINER_STORE;
  else process.env.REDLINER_STORE = originalStore;
});

describe("cross-instance SSE fallback", () => {
  it("polls a fresh remote lease and closes when persisted state becomes terminal", async () => {
    process.env.REDLINER_STORE = "memory";
    const id = `remote-${Date.now()}`;
    const document = parseText("1. Services\n\nVendor provides services.", "remote.txt");
    const run: ReviewRun = {
      id, createdAt: "2026-08-30T00:00:00.000Z", status: "running", config: "i3-verifier",
      playbookId: "customer-vendor-services-v1", document, sourceKey: `runs/${id}/source.txt`, findings: [], decisions: {},
      lease: { owner: "another-instance", heartbeatAt: new Date().toISOString() },
      stats: {
        startedAt: new Date().toISOString(), llmCalls: 1, toolCalls: 0, retries: 0,
        usage: { inputTokens: 1, outputTokens: 1, costUsd: 0 }, findings: 0,
        bySeverity: { critical: 0, high: 0, medium: 0, low: 0 },
        byStatus: { deviation: 0, missing: 0, compliant: 0, needs_review: 0 },
      },
    };
    const memory = createStore("memory");
    await memory.putJson(`runs/${id}/run.json`, run);
    const response = await streamRun(new Request(`http://localhost/api/runs/${id}/stream`), {
      params: Promise.resolve({ id }),
    });
    setTimeout(() => {
      const finding = {
        id: "remote-finding", ruleId: "LOL-CAP", ruleTitle: "Cap", severity: "critical" as const,
        status: "needs_review" as const, paragraphIds: ["p0001"], quote: "Vendor provides services.",
        rationale: "Remote result", confidence: 0.5, producedBy: "drafter" as const,
      };
      run.findings = [finding];
      run.stats.findings = 1;
      run.stats.bySeverity.critical = 1;
      run.stats.byStatus.needs_review = 1;
      run.status = "awaiting_review";
      void memory.putJson(`runs/${id}/run.json`, run);
    }, 50);
    const body = await response.text();
    expect(response.status).toBe(200);
    expect(body).toContain('"type":"finding"');
    expect(body).toContain('"status":"awaiting_review"');
    expect(body).toContain('"type":"done"');
  }, 5_000);
});
