import { mkdtemp, mkdir, readFile, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import { runReview } from "@/src/agent";
import type { LlmClient } from "@/src/agent/llm";
import { runEvaluation } from "@/src/eval/runner";
import { textToDocx } from "@/src/engine";

describe("evaluation runner", () => {
  it("supports an injected fake pipeline without network calls", async () => {
    const root = await mkdtemp(join(tmpdir(), "redliner-eval-test-"));
    const contractId = "fake-contract";
    const contractDir = join(root, "contracts", contractId);
    await mkdir(contractDir, { recursive: true });
    const text = "1. TERM\n\n1.1 Customer may terminate for convenience on thirty days' notice.\n";
    await Promise.all([
      writeFile(join(contractDir, "contract.docx"), await textToDocx(text, { title: "Fake" })),
      writeFile(join(contractDir, "gold.json"), `${JSON.stringify({ contractId, items: [] })}\n`),
      writeFile(
        join(contractDir, "meta.json"),
        `${JSON.stringify({ id: contractId, source: "synthetic", title: "Fake", words: 12, paragraphs: 2, ourParty: { name: "Customer", role: "Customer" }, counterparty: { name: "Vendor", role: "Vendor" } })}\n`,
      ),
    ]);
    const fakeRunReview: typeof runReview = async ({ run }) => ({
      ...run,
      status: "awaiting_review",
      findings: [],
      stats: { ...run.stats, finishedAt: "2026-01-01T00:00:00.010Z", durationMs: 10 },
    });
    const fakeLlm: LlmClient = {
      mode: "replay",
      async complete() {
        throw new Error("fake pipeline must not call complete");
      },
      async runTools() {
        throw new Error("fake pipeline must not call runTools");
      },
      getTotals() {
        return {
          calls: 0,
          toolCalls: 0,
          retries: 0,
          usage: { inputTokens: 0, outputTokens: 0, costUsd: 0 },
        };
      },
    };
    const results = await runEvaluation(
      {
        configs: ["b1-prompt"],
        contracts: [contractId],
        mode: "replay",
        allowLive: false,
        judgeMode: "replay",
        concurrency: 1,
        contractsRoot: join(root, "contracts"),
        cacheRoot: join(root, "cache"),
        runsRoot: join(root, "runs"),
        resultsRoot: join(root, "results"),
        libreoffice: false,
      },
      { runReview: fakeRunReview, createLlmClient: () => fakeLlm },
    );
    expect(results[0].aggregate.contracts).toBe(1);
    expect(results[0].aggregate.detection.micro.tp).toBe(0);
    const artifact = JSON.parse(await readFile(join(root, "results", "b1-prompt.json"), "utf8")) as { config: string };
    expect(artifact.config).toBe("b1-prompt");
  });
});
