import { describe, expect, it } from "vitest";

import {
  canonicalizePartyAliases,
  canonicalizeLegalNumerals,
  elementCoverageGate,
  minimalityGate,
  proposalPassesElementChecks,
  renderElementProposal,
  replacementExpansionRatio,
} from "@/src/agent/element-gates";
import { parseText } from "@/src/engine";
import type { Rule } from "@/src/playbook/schema";

const rule: Rule = {
  id: "LICENSE",
  title: "Licence",
  category: "licence",
  severity: "high",
  kind: "parametric",
  cuad: [],
  summary: "Licence scope",
  position: {
    preferred: "Affiliates and successors.",
    fallback: "Affiliates.",
    walkaway: "Customer alone.",
    elements: {
      preferred: ["The licence covers Affiliates.", "The licence transfers to successors."],
      fallback: ["The licence covers Affiliates."],
    },
  },
  detect: "Find licence.",
  redline: "Edit narrowly.",
  checks: [],
};

describe("element minimality gate", () => {
  it("accepts replacements at the 1.5 word expansion boundary", () => {
    const op = {
      kind: "replace" as const,
      paragraphId: "p0000",
      oldText: "Customer may use software",
      newText: "Customer and Affiliates may use software",
    };
    expect(replacementExpansionRatio(op)).toBe(1.5);
    expect(minimalityGate("deviation", [op])).toEqual({ ok: true, errors: [] });
  });

  it("rejects expansive replacements, paragraph deletion, and replacement of a missing clause", () => {
    const expansive = {
      kind: "replace" as const,
      paragraphId: "p0000",
      oldText: "Customer may use",
      newText: "Customer and every Affiliate and contractor may perpetually use and transfer",
    };
    expect(minimalityGate("deviation", [expansive]).ok).toBe(false);
    expect(minimalityGate("deviation", [{ kind: "delete_paragraph", paragraphId: "p0000" }]).ok).toBe(false);
    expect(minimalityGate("missing", [expansive]).errors).toContain("A missing clause must use insert_after operations only");
    expect(minimalityGate("missing", [{ kind: "insert_after", paragraphId: "p0000", text: "Short clause." }]).ok).toBe(true);
  });
});

describe("element proposal rendering", () => {
  it("places an insertion immediately after its anchor in document order", () => {
    const document = parseText("A. Vendor shall maintain:\n\n4. Property insurance.\n\nB. Vendor provides certificates.", "insurance.txt");
    expect(renderElementProposal(document, ["p0002", "p0000", "p0001"], [{
      kind: "insert_after",
      paragraphId: "p0001",
      text: "5. Cyber insurance.",
    }])).toBe([
      "A. Vendor shall maintain:",
      "4. Property insurance.",
      "5. Cyber insurance.",
      "B. Vendor provides certificates.",
    ].join("\n"));
  });
});

describe("element coverage gate", () => {
  const document = parseText("1. Licence\n\nCustomer and its Affiliates may use the software.", "test.txt");

  it("accepts exact target coverage using an existing quote and a one-based operation reference", () => {
    const evidenceId = document.paragraphs.find((paragraph) => paragraph.text.includes("Customer and its Affiliates"))?.id;
    expect(evidenceId).toBeDefined();
    const result = elementCoverageGate({
      document,
      rule,
      status: "deviation",
      paragraphIds: [evidenceId!],
      proposalLevel: "preferred",
      operationCount: 1,
      coverage: {
        level: "preferred",
        mappings: [
          { element: "The licence covers Affiliates.", status: "already_met", quote: "Customer and its Affiliates may use the software." },
          { element: "The licence transfers to successors.", status: "addressed_by_operation", operationIndexes: [1] },
        ],
      },
    });
    expect(result).toEqual({ ok: true, errors: [] });
  });

  it("rejects missing, invented, and unaddressed coverage on an actionable finding", () => {
    const result = elementCoverageGate({
      document,
      rule,
      status: "deviation",
      paragraphIds: [],
      proposalLevel: "preferred",
      operationCount: 1,
      coverage: {
        level: "preferred",
        mappings: [
          { element: "The licence covers Affiliates.", status: "already_met", quote: "Invented quote" },
          { element: "The licence transfers to successors.", status: "unaddressed", explanation: "Unsure" },
        ],
      },
    });
    expect(result.ok).toBe(false);
    expect(result.errors.join(" ")).toContain("not verbatim");
    expect(result.errors.join(" ")).toContain("requires status needs_review");
  });

  it("allows a fully explained unaddressed element only on the needs-review path", () => {
    const result = elementCoverageGate({
      document,
      rule,
      status: "needs_review",
      paragraphIds: [],
      operationCount: 0,
      coverage: {
        level: "fallback",
        mappings: [{ element: "The licence covers Affiliates.", status: "unaddressed", explanation: "The grant is illegible." }],
      },
    });
    expect(result).toEqual({ ok: true, errors: [] });
  });

  it("requires the source paragraph for already-met evidence to be cited", () => {
    const result = elementCoverageGate({
      document,
      rule,
      status: "deviation",
      paragraphIds: [],
      proposalLevel: "fallback",
      operationCount: 1,
      coverage: {
        level: "fallback",
        mappings: [{
          element: "The licence covers Affiliates.",
          status: "already_met",
          quote: "Customer and its Affiliates may use the software.",
        }],
      },
    });
    expect(result.errors).toContain("Evidence quote paragraph must be cited in paragraphIds: The licence covers Affiliates.");
  });
});

describe("element check aliases", () => {
  it("canonicalizes the prompt's customer and vendor aliases without changing other terms", () => {
    expect(canonicalizePartyAliases("Company may terminate; Service Provider must assist."))
      .toBe("Customer may terminate; Vendor must assist.");
  });

  it("normalizes a quoted defined-party label before an operative verb", () => {
    expect(canonicalizePartyAliases(
      'Teleglobe USA Inc. (the "Customer") may terminate for convenience.',
    )).toContain("Customer may terminate for convenience");
  });

  it("normalizes word-and-numeral legal durations for legacy number checks", () => {
    expect(canonicalizeLegalNumerals("upon sixty (60) days' prior written notice"))
      .toBe("upon 60 days' prior written notice");
  });

  it("passes a Customer regex when operative language uses a defined-party alias", () => {
    const document = parseText("Company may terminate this Agreement for convenience on ninety days' notice.", "test.txt");
    const finding = {
      id: "f-t4c-test",
      ruleId: "T4C",
      ruleTitle: "Termination for convenience",
      severity: "high" as const,
      status: "deviation" as const,
      paragraphIds: ["p0000"],
      quote: "Company may terminate",
      rationale: "Alias-aware evidence.",
      confidence: 1,
      producedBy: "drafter" as const,
      proposal: {
        level: "fallback" as const,
        summary: "Express convenience termination.",
        comment: "[Playbook] Express convenience termination.",
        ops: [{
          kind: "replace" as const,
          paragraphId: "p0000",
          oldText: "Company may terminate",
          newText: "Company may terminate",
        }],
      },
    };
    expect(proposalPassesElementChecks(document, finding, {
      ...rule,
      id: "T4C",
      checks: [{
        type: "regex_present",
        label: "Customer convenience termination present",
        pattern: "customer may terminate[\\s\\S]{0,160}(convenience|without cause|for any reason)",
        flags: "i",
      }],
    })).toBe(true);
  });

  it("rejects broadened or shifted preferred liability-cap bases", () => {
    const makeFinding = (text: string) => {
      const document = parseText(text, "cap.txt");
      return {
        document,
        finding: {
          id: "f-cap-test",
          ruleId: "LOL-CAP",
          ruleTitle: "Cap",
          severity: "critical" as const,
          status: "deviation" as const,
          paragraphIds: ["p0000"],
          quote: text,
          rationale: "Cap basis.",
          confidence: 1,
          producedBy: "drafter" as const,
          proposal: {
            level: "preferred" as const,
            summary: "Cap basis.",
            comment: "[Playbook] Cap basis.",
            ops: [{ kind: "replace" as const, paragraphId: "p0000", oldText: text, newText: text }],
          },
        },
      };
    };
    const capRule: Rule = { ...rule, id: "LOL-CAP", checks: [] };
    const shifted = makeFinding(
      "The cap is the greater of all amounts paid or payable in the twelve months preceding the event giving rise to the claim and USD 1,000,000. Customer's obligation to pay amounts due is excluded from the cap.",
    );
    const exact = makeFinding(
      "The cap is the greater of fees paid or payable in the twelve months preceding the claim and USD 1,000,000. Customer's obligation to pay amounts due is excluded from the cap.",
    );
    const narrowPaymentCarveOut = makeFinding(
      "The cap is the greater of fees paid or payable in the twelve months preceding the claim and USD 1,000,000. Customer's obligation to pay Fees is excluded from the cap.",
    );
    expect(proposalPassesElementChecks(shifted.document, shifted.finding, capRule)).toBe(false);
    expect(proposalPassesElementChecks(narrowPaymentCarveOut.document, narrowPaymentCarveOut.finding, capRule)).toBe(false);
    expect(proposalPassesElementChecks(exact.document, exact.finding, capRule)).toBe(true);
  });

  it("does not apply retained-covenant fallback checks after a preferred non-solicit removal", () => {
    const text = "Customer may solicit or hire Vendor personnel without restriction.";
    const document = parseText(text, "non-solicit.txt");
    const finding = {
      id: "f-nosolicit-test",
      ruleId: "NOSOLICIT",
      ruleTitle: "Non-solicitation",
      severity: "medium" as const,
      status: "deviation" as const,
      paragraphIds: ["p0000"],
      quote: text,
      rationale: "Remove the restriction.",
      confidence: 1,
      producedBy: "drafter" as const,
      proposal: {
        level: "preferred" as const,
        summary: "Remove the restriction.",
        comment: "[Playbook] Remove the restriction.",
        ops: [{ kind: "replace" as const, paragraphId: "p0000", oldText: text, newText: text }],
      },
    };
    expect(proposalPassesElementChecks(document, finding, {
      ...rule,
      id: "NOSOLICIT",
      checks: [
        { type: "number_max", label: "duration", pattern: "(\\d+) months", max: 12 },
        { type: "regex_present", label: "general solicitation", pattern: "general solicitation", flags: "i" },
      ],
    })).toBe(true);
  });
});
