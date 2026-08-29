import { describe, expect, it } from "vitest";

import { withSectionReference } from "@/src/agent/assembler";
import type { Finding } from "@/src/agent/types";
import { parseDocx, parseText } from "@/src/engine";
import { realisticFixture } from "@/tests/engine/fixture";

function finding(overrides: Partial<Finding> = {}): Finding {
  return {
    id: "finding-1",
    ruleId: "IP",
    ruleTitle: "Intellectual property",
    severity: "high",
    status: "deviation",
    paragraphIds: ["p0001"],
    quote: "Customer owns the deliverables.",
    rationale: "Test finding.",
    confidence: 0.9,
    producedBy: "drafter",
    ...overrides,
  };
}

describe("finding section references", () => {
  it("uses a numbered section's number and heading", () => {
    const document = parseText(
      "14.2 Intellectual Property\n\nCustomer owns the deliverables.",
      "numbered.txt",
    );
    expect(withSectionReference(document, finding()).sectionRef)
      .toBe("§ 14.2 Intellectual Property");
  });

  it("prefixes an unnumbered heading with the section mark", () => {
    const document = parseText("INTELLECTUAL PROPERTY\n\nCustomer owns the deliverables.", "unnumbered.txt");
    expect(withSectionReference(document, finding()).sectionRef)
      .toBe("§ INTELLECTUAL PROPERTY");
  });

  it("uses the enclosing section for a paragraph inside a table", async () => {
    const document = await parseDocx(await realisticFixture(), "fixture.docx");
    const tableFinding = finding({
      paragraphIds: ["p0004"],
      quote: "Table cell obligation must be removed.",
    });
    expect(withSectionReference(document, tableFinding).sectionRef).toBe("§ 1 Services");
  });

  it("uses the planner suggestion for an unanchored missing finding, then falls back cleanly", () => {
    const document = parseText("8. Indemnification\n\nVendor has no indemnity obligation.", "missing.txt");
    const missing = finding({ status: "missing", paragraphIds: [], quote: "" });
    const suggestedSectionId = document.sections[0]?.id;
    expect(withSectionReference(document, missing, suggestedSectionId)).toMatchObject({
      sectionId: suggestedSectionId,
      sectionRef: "§ 8 Indemnification",
    });
    expect(withSectionReference(document, missing).sectionRef).toBe("§ —");
  });

  it("ellipsizes headings after sixty characters", () => {
    const document = parseText("14.2 Intellectual Property\n\nCustomer owns the deliverables.", "long.txt");
    const section = document.sections[0];
    if (!section) throw new Error("Missing test section");
    section.heading = "Ownership of Intellectual Property Deliverables Customer Data and All Related Materials";
    const sectionRef = withSectionReference(document, finding()).sectionRef;
    expect(sectionRef).toBe("§ 14.2 Ownership of Intellectual Property Deliverables Customer Da…");
    expect(sectionRef?.slice("§ 14.2 ".length)).toHaveLength(60);
  });
});
