import { describe, expect, it } from "vitest";

import { normalizeNumberWords } from "@/src/agent/verifier";

describe("normalizeNumberWords", () => {
  it("rewrites written numbers as digits", () => {
    expect(normalizeNumberWords("at least thirty days' written notice")).toBe("at least 30 days' written notice");
    expect(normalizeNumberWords("twenty-four months after")).toBe("24 months after");
    expect(normalizeNumberWords("one hundred eighty days")).toBe("180 days");
    expect(normalizeNumberWords("ninety (90) days")).toBe("90 (90) days");
  });
  it("leaves ordinary words alone", () => {
    expect(normalizeNumberWords("the Vendor shall provide notice")).toBe("the Vendor shall provide notice");
  });
});
