import { describe, expect, it } from "vitest";

import { getConfig, resolveConfig } from "../../src/agent/configs";

const doc = (words: number) => ({ stats: { words } });

describe("resolveConfig (length router)", () => {
  it("routes final-v4 to i7-precise below the threshold and to i6-longdoc at or above it", () => {
    const router = getConfig("final-v4");
    expect(router.routes).toEqual({ thresholdWords: 15_000, below: "i7-precise", atOrAbove: "i6-longdoc" });
    expect(resolveConfig(router, doc(4_000)).id).toBe("i7-precise");
    expect(resolveConfig(router, doc(14_999)).id).toBe("i7-precise");
    expect(resolveConfig(router, doc(15_000)).id).toBe("i6-longdoc");
    expect(resolveConfig(router, doc(42_742)).id).toBe("i6-longdoc");
  });

  it("returns the routed member unchanged, so its prompts and caches are reused byte-for-byte", () => {
    const short = resolveConfig(getConfig("final-v4"), doc(5_000));
    expect(short).toBe(getConfig("i7-precise"));
    const long = resolveConfig(getConfig("final-v4"), doc(40_000));
    expect(long).toBe(getConfig("i6-longdoc"));
  });

  it("leaves ordinary configs alone", () => {
    for (const id of ["b1-prompt", "final", "i7-precise", "final-v3"] as const) {
      expect(resolveConfig(getConfig(id), doc(50_000))).toBe(getConfig(id));
    }
  });

  it("keeps the router itself memory-free (adherence measured ≈ 0) and out of the prompt path", () => {
    const router = getConfig("final-v4");
    expect(router.precedentMemory).toBe(false);
    expect(router.preciseElementProtocol).toBe(false);
  });
});
