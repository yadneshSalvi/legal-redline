import { describe, expect, it } from "vitest";

import { scanCitationHallucinations } from "@/src/eval/metrics";

describe("citation scanner", () => {
  it("checks every Section and section-symbol reference against document sections", () => {
    const result = scanCitationHallucinations(
      {
        sections: [
          { id: "sec-2.1", number: "2.1", heading: "Term", level: 2, paragraphIds: [], childIds: [] },
          { id: "sec-9", number: "9", heading: "Liability", level: 1, paragraphIds: [], childIds: [] },
        ],
      },
      ["See Section 2.1 and § 9. Section 404 does not exist."],
    );
    expect(result.references).toBe(3);
    expect(result.hallucinations).toBe(1);
    expect(result.invalidReferences).toEqual(["404"]);
  });
});
