import { describe, expect, it } from "vitest";

import { getConfig } from "@/src/agent/configs";
import { createPrecedentMemory } from "@/src/agent/memory";
import { createDrafterTools } from "@/src/agent/tools";
import { applyDecisions } from "@/src/agent/apply";
import type { Finding, ReviewRun } from "@/src/agent/types";
import { parseDocx, parseText, textToDocx } from "@/src/engine";
import { MemoryStore } from "@/src/store";

describe("drafter tool validation", () => {
  it("rejects a non-verbatim anchor and accepts the corrected proposal", async () => {
    const document = parseText("9. Limitation of Liability\n\nVendor liability is capped at three months of fees.", "test.txt");
    const { tools } = createDrafterTools({ document, config: getConfig("i2-workers"), ruleId: "LOL-CAP" });
    const tool = tools.find((candidate) => candidate.name === "propose_redline");
    expect(tool).toBeDefined();
    const invalid = JSON.parse(String(await tool?.run(tool.parse({
      ops: [{ kind: "replace", paragraphId: "p0001", oldText: "Vendor liability is capped at 3 months", newText: "Each party is capped at twelve months" }],
      comment: "[Playbook] Aligning the cap.", level: "fallback", summary: "Mutual annual cap",
    })))) as { ok: boolean; errors: string[] };
    expect(invalid.ok).toBe(false);
    expect(invalid.errors.join(" ")).toContain("oldText not found");

    const valid = JSON.parse(String(await tool?.run(tool.parse({
      ops: [{ kind: "replace", paragraphId: "p0001", oldText: "Vendor liability is capped at three months of fees.", newText: "Each party's liability is capped at twelve months of fees." }],
      comment: "[Playbook] We made the cap mutual and aligned it to twelve months' fees.", level: "fallback", summary: "Mutual annual cap",
    })))) as { ok: boolean };
    expect(valid.ok).toBe(true);
  });
});

describe("precedent ranking", () => {
  it("ranks same-rule precedents by lexical overlap", async () => {
    const memory = createPrecedentMemory(new MemoryStore());
    const results = await memory.lookup("LOL-CAP", "aggregate liability twelve months fees mutual");
    expect(results).toHaveLength(2);
    expect(results[0]?.ruleId).toBe("LOL-CAP");
    expect(results[0]?.clauseAfter.toLowerCase()).toContain("twelve months");
  });

  it("serializes concurrent promotions and stores the full post-edit clause", async () => {
    const document = parseText("9. Liability\n\nVendor liability is capped at three months of fees.", "test.txt");
    const at = "2026-08-30T00:00:00.000Z";
    const run: ReviewRun = {
      id: "promotion-test", createdAt: at, status: "awaiting_review", config: "i3-verifier",
      playbookId: "customer-vendor-services-v1", document, sourceKey: "runs/promotion-test/source.txt",
      findings: [], decisions: {},
      stats: {
        startedAt: at, llmCalls: 0, toolCalls: 0, retries: 0, usage: { inputTokens: 0, outputTokens: 0, costUsd: 0 }, findings: 0,
        bySeverity: { critical: 0, high: 0, medium: 0, low: 0 }, byStatus: { deviation: 0, missing: 0, compliant: 0, needs_review: 0 },
      },
    };
    const finding = (id: string): Finding => ({
      id, ruleId: "LOL-CAP", ruleTitle: "Liability cap", severity: "critical", status: "deviation",
      paragraphIds: ["p0001"], quote: "Vendor liability is capped at three months of fees.", rationale: "Cap too low",
      proposal: {
        ops: [{ kind: "replace", paragraphId: "p0001", oldText: "three months", newText: "twelve months" }],
        comment: "[Playbook] Annual cap.", level: "fallback", summary: "Annual cap",
      },
      confidence: 0.9, producedBy: "drafter",
    });
    const store = new MemoryStore();
    const memory = createPrecedentMemory(store);
    await Promise.all([
      memory.promote(run, finding("finding-a"), { findingId: "finding-a", action: "accept", at, by: "A" }),
      memory.promote(run, finding("finding-b"), { findingId: "finding-b", action: "accept", at, by: "B" }),
    ]);
    const stored = await store.getJson<Array<{ clauseAfter: string }>>("precedents/index.json");
    expect(stored).toHaveLength(2);
    expect(stored?.every((precedent) => precedent.clauseAfter === "Vendor liability is capped at twelve months of fees.")).toBe(true);
  });

  it("does not promote a precedent when document application fails", async () => {
    const original = await textToDocx("9. Liability\n\nVendor liability is capped at three months of fees.");
    const document = await parseDocx(original, "invalid.docx");
    const at = "2026-08-30T00:00:00.000Z";
    const run: ReviewRun = {
      id: "failed-promotion", createdAt: at, status: "awaiting_review", config: "i3-verifier",
      playbookId: "customer-vendor-services-v1", document, sourceKey: "runs/failed-promotion/source.docx",
      findings: [{
        id: "bad-finding", ruleId: "LOL-CAP", ruleTitle: "Cap", severity: "critical", status: "deviation",
        paragraphIds: ["p0001"], quote: document.paragraphs[1]?.text ?? "", rationale: "bad anchor",
        proposal: {
          ops: [{ kind: "replace", paragraphId: "p0001", oldText: "not present", newText: "twelve months" }],
          comment: "[Playbook] Annual cap.", level: "fallback", summary: "Annual cap",
        },
        confidence: 0.9, producedBy: "drafter",
      }],
      decisions: { "bad-finding": { findingId: "bad-finding", action: "accept", at, by: "Reviewer" } },
      stats: {
        startedAt: at, llmCalls: 0, toolCalls: 0, retries: 0, usage: { inputTokens: 0, outputTokens: 0, costUsd: 0 }, findings: 1,
        bySeverity: { critical: 1, high: 0, medium: 0, low: 0 }, byStatus: { deviation: 1, missing: 0, compliant: 0, needs_review: 0 },
      },
    };
    const store = new MemoryStore();
    await expect(applyDecisions({ run, originalBytes: original, store })).rejects.toThrow();
    expect(await store.getJson("precedents/index.json")).toBeNull();
  });
});
