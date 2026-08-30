import { describe, expect, it } from "vitest";

import { withSectionReference } from "@/src/agent/assembler";
import { parseText } from "@/src/engine";
import type { Finding } from "@/src/agent/types";

const base: Omit<Finding, "paragraphIds"> = { id: "f", ruleId: "LICENSE", ruleTitle: "Licence", severity: "high", status: "deviation", quote: "", rationale: "", confidence: 0.9, producedBy: "drafter" };

describe("withSectionReference", () => {
  it("does not double-number headings that carry their own label", () => {
    const doc = parseText("TITLE\n\n2. GRANT OF RIGHTS\n\n2.1 Licensor grants Licensee a licence.\n\nSHARED RESOURCES\n\nThe parties share resources.", "t.txt");
    const licence = doc.paragraphs.find((p) => p.text.startsWith("2.1"))!;
    const ref = withSectionReference(doc, { ...base, paragraphIds: [licence.id] }).sectionRef ?? "";
    expect(ref).toMatch(/^§ 2\.? GRANT OF RIGHTS/);
    expect(ref).not.toMatch(/^§ \d+ 2\./);
  });
});
