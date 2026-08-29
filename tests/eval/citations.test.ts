import { describe, expect, it } from "vitest";

import { parseText } from "@/src/engine";
import { scanCitationHallucinations } from "@/src/eval/metrics";

const doc = parseText(
  "AGREEMENT\n\n9. LIMITATION OF LIABILITY\n\n9.1 Each party's liability is capped.\n\n9.2 No consequential damages.\n\n14. GENERAL\n\n14.1 Notices.",
  "t.txt",
);

describe("scanCitationHallucinations", () => {
  it("accepts section and sub-clause numbers, rejects numbers that do not exist", () => {
    const result = scanCitationHallucinations(doc, ["See Section 9.2 and § 14.1; also Section 9.", "Section 47 is invented, as is § 9.9."]);
    expect(result.references).toBe(5);
    expect(result.invalidReferences).toEqual(["47", "9.9"]);
  });
});
