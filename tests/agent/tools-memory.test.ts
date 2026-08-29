import { describe, expect, it } from "vitest";

import { getConfig } from "@/src/agent/configs";
import { createPrecedentMemory } from "@/src/agent/memory";
import { createDrafterTools } from "@/src/agent/tools";
import { parseText } from "@/src/engine";
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
});
