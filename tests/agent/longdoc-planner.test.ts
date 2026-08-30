import { describe, expect, it } from "vitest";

import { deterministicLongDocumentPlan } from "@/src/agent/longdoc-planner";
import { parseText } from "@/src/engine";
import { loadPlaybook } from "@/src/playbook/loader";

describe("long-document deterministic planning", () => {
  it("searches a 40k-word document through its final paragraph without dropping rule plans", async () => {
    const filler = "ordinary commercial provision ".repeat(100);
    const blocks = Array.from({ length: 134 }, (_, index) => `${index + 1}. Section ${index + 1}\n${filler}`);
    blocks.push(
      "135. Termination\nCustomer may terminate this Agreement for convenience on ninety days' written notice.",
      "136. Transition\nVendor shall provide transition assistance and return Customer Data after termination.",
    );
    const document = parseText(blocks.join("\n\n"), "long.txt");
    const playbook = await loadPlaybook("customer-vendor-services-v1");

    expect(document.stats.words).toBeGreaterThan(40_000);
    const plan = deterministicLongDocumentPlan(document, playbook, {
      ourParty: "Customer",
      counterparty: "Vendor",
    });

    expect(plan.plans).toHaveLength(playbook.rules.length);
    expect(plan.plans.find((item) => item.ruleId === "T4C")?.candidateParagraphIds).toContain("p0134");
    expect(plan.plans.find((item) => item.ruleId === "TRANSITION")?.candidateParagraphIds).toContain("p0135");
  }, 5_000);
});
