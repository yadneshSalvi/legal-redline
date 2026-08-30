import { mkdir, mkdtemp, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { basename, join } from "node:path";

import { describe, expect, it } from "vitest";

import { createIndependentJudgeV2, type JudgeV2Input } from "@/src/eval/judge";

const input: JudgeV2Input = {
  ruleId: "TEST",
  ruleTitle: "Test rule",
  preferredPosition: "Preferred position",
  fallbackPosition: "Fallback position",
  preferredElements: ["Preferred element"],
  fallbackElements: ["Fallback element"],
  originalClause: "Old clause",
  renderedClause: "New clause",
  comment: "Comment",
};

describe("independent judge v2", () => {
  it("replays structured per-element verdicts and derives level satisfaction", async () => {
    const cacheDir = await mkdtemp(join(tmpdir(), "judge-v2-test-"));
    const judge = createIndependentJudgeV2({ mode: "replay", cacheDir, allowLive: false });
    let cachePath = "";
    try {
      await judge.judge(input);
    } catch (error) {
      cachePath = (error instanceof Error ? error.message : String(error)).replace(/^.*miss: /, "");
    }
    expect(basename(cachePath)).toMatch(/^[a-f0-9]{64}\.json$/);
    await mkdir(cacheDir, { recursive: true });
    await writeFile(cachePath, JSON.stringify({
      result: {
        elements: [
          { element: "Preferred element", level: "preferred", met: false, evidence: "Absent" },
          { element: "Fallback element", level: "fallback", met: true, evidence: "Present" },
        ],
        satisfies_preferred: true,
        satisfies_fallback: false,
        minimal: true,
        preserves_intent: true,
        drafting_quality: 4,
        reason: "Fallback only",
      },
      usage: { inputTokens: 10, outputTokens: 5 },
    }));
    const replayed = await judge.judge(input);
    expect(replayed.replayed).toBe(true);
    expect(replayed.result.satisfies_preferred).toBe(false);
    expect(replayed.result.satisfies_fallback).toBe(true);
  });
});
