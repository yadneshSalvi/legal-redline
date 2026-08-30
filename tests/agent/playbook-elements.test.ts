import { describe, expect, it } from "vitest";

import { ruleFull } from "@/src/playbook/loader";
import { loadPlaybook } from "@/src/playbook/loader";
import { RuleSchema } from "@/src/playbook/schema";

describe("playbook position elements", () => {
  it("loads an explicit preferred and fallback checklist for every packaged rule", async () => {
    const playbook = await loadPlaybook("customer-vendor-services-v1");
    expect(playbook.rules).toHaveLength(18);
    for (const rule of playbook.rules) {
      expect(rule.position.elements.preferred.length, `${rule.id} preferred`).toBeGreaterThan(0);
      expect(rule.position.elements.fallback.length, `${rule.id} fallback`).toBeGreaterThan(0);
      expect(new Set(rule.position.elements.preferred).size).toBe(rule.position.elements.preferred.length);
      expect(new Set(rule.position.elements.fallback).size).toBe(rule.position.elements.fallback.length);
    }
  });

  it("does not expose additive elements through the round-1 rule serializer", async () => {
    const playbook = await loadPlaybook("customer-vendor-services-v1");
    const rule = playbook.rules.find((candidate) => candidate.id === "LICENSE");
    expect(rule).toBeDefined();
    const serialized = ruleFull(rule!);
    expect(serialized).toContain(rule!.position.preferred.trim());
    expect(serialized).not.toContain("The licence is transferable to Customer's successors.");
  });

  it("rejects a rule whose element lists are empty", async () => {
    const playbook = await loadPlaybook("customer-vendor-services-v1");
    const parsed = RuleSchema.safeParse({
      ...playbook.rules[0],
      position: { ...playbook.rules[0]!.position, elements: { preferred: [], fallback: [] } },
    });
    expect(parsed.success).toBe(false);
  });
});
