import type { Finding, RunStats } from "@/src/agent/types";
import type { DocumentModel } from "@/src/engine/types";

export function documentFixture(): DocumentModel {
  return {
    id: "doc-test",
    title: "Test contract",
    source: { kind: "txt", filename: "test.txt", sha256: "0".repeat(64), bytes: 100 },
    paragraphs: [
      { id: "p0000", index: 0, text: "1. Liability", isHeading: true, level: 1, numbering: "1", sectionId: "sec-1" },
      { id: "p0001", index: 1, text: "Cap is three months.", isHeading: false, sectionId: "sec-1" },
      { id: "p0002", index: 2, text: "2. Insurance", isHeading: true, level: 1, numbering: "2", sectionId: "sec-2" },
      { id: "p0003", index: 3, text: "3. MFN", isHeading: true, level: 1, numbering: "3", sectionId: "sec-3" },
      { id: "p0004", index: 4, text: "Vendor gives Customer its best price.", isHeading: false, sectionId: "sec-3" },
    ],
    sections: [
      { id: "sec-1", number: "1", heading: "Liability", level: 1, paragraphIds: ["p0000", "p0001"], childIds: [] },
      { id: "sec-2", number: "2", heading: "Insurance", level: 1, paragraphIds: ["p0002"], childIds: [] },
      { id: "sec-3", number: "3", heading: "MFN", level: 1, paragraphIds: ["p0003", "p0004"], childIds: [] },
    ],
    definitions: [],
    stats: { words: 15, paragraphs: 5, sections: 3, definitions: 0 },
  };
}

export function findingFixture(overrides: Partial<Finding> & Pick<Finding, "id" | "ruleId" | "status">): Finding {
  const { id, ruleId, status, ...rest } = overrides;
  return {
    id,
    ruleId,
    ruleTitle: ruleId,
    severity: "medium",
    status,
    paragraphIds: [],
    quote: "",
    rationale: "",
    confidence: 0.8,
    producedBy: "baseline",
    ...rest,
  };
}

export function statsFixture(): RunStats {
  return {
    startedAt: "2026-01-01T00:00:00.000Z",
    finishedAt: "2026-01-01T00:00:01.500Z",
    durationMs: 1_500,
    llmCalls: 3,
    toolCalls: 4,
    retries: 1,
    usage: { inputTokens: 100, outputTokens: 20, cacheReadTokens: 30, cacheWriteTokens: 10, costUsd: 0.25 },
    findings: 3,
    bySeverity: { critical: 1, high: 0, medium: 2, low: 0 },
    byStatus: { deviation: 2, missing: 1, compliant: 0, needs_review: 0 },
  };
}
