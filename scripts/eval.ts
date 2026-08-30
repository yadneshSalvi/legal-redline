import "dotenv/config";

import { Command, Option } from "commander";

import { generateReport } from "@/src/eval/report";
import { allConfigIds,
  tieredConfigIds, contractTier, runEvaluation, type EvaluationTier } from "@/src/eval/runner";
import type { JudgeMode } from "@/src/eval/judge";

async function main(): Promise<void> {
  const command = new Command()
    .option("--config <id>", "pipeline config", "b1-prompt")
    .option("--all", "run every pipeline config")
    .option("--contracts <ids>", "comma-separated contract ids")
    .addOption(new Option("--tier <tier>", "evaluation tier").choices(["short", "long", "all"]))
    .option("--live", "call models and record responses")
    .option("--allow-live", "allow replay cache misses to call and record")
    .addOption(new Option("--judge <mode>", "independent judge mode").choices(["live", "replay"]).default("replay"))
    .option("--concurrency <number>", "maximum concurrent contract runs", "3")
    .option("--judge-concurrency <number>", "maximum concurrent judge calls per contract", "4")
    .parse();
  const options = command.opts<{
    config: string;
    all?: boolean;
    contracts?: string;
    live?: boolean;
    allowLive?: boolean;
    judge: "live" | "replay";
    concurrency: string;
    tier?: "short" | "long" | "all";
    judgeConcurrency: string;
  }>();
  const concurrency = Number.parseInt(options.concurrency, 10);
  if (!Number.isInteger(concurrency) || concurrency < 1) throw new Error("--concurrency must be a positive integer");
  const judgeConcurrency = Number.parseInt(options.judgeConcurrency, 10);
  if (!Number.isInteger(judgeConcurrency) || judgeConcurrency < 1) {
    throw new Error("--judge-concurrency must be a positive integer");
  }
  const judgeWasExplicit = command.getOptionValueSource("judge") !== "default";
  const requested = options.contracts?.split(",").map((id) => id.trim()).filter(Boolean);
  const tiers: Array<EvaluationTier | undefined> = options.tier === "all"
    ? ["short", "long"]
    : [options.tier];
  const results: Awaited<ReturnType<typeof runEvaluation>> = [];
  for (const tier of tiers) {
    const contracts = requested === undefined || tier === undefined
      ? requested
      : requested.filter((id) => contractTier(id) === tier);
    results.push(...await runEvaluation({
      configs: options.all === true ? (tier === undefined ? allConfigIds() : tieredConfigIds(tier)) : [options.config],
      contracts,
      mode: options.live === true ? "record" : "replay",
      allowLive: options.allowLive === true,
      judgeMode: (options.judge === "live" || (options.live === true && !judgeWasExplicit) ? "record" : "replay") satisfies JudgeMode,
      concurrency,
      judgeConcurrency,
      tier,
    }));
  }
  await generateReport();
  for (const result of results) {
    console.log(
      `${result.config}: ${result.contracts.length} contracts, macro F1 ${(result.aggregate.detection.macro.f1 * 100).toFixed(1)}%, ` +
        `micro F1 ${(result.aggregate.detection.micro.f1 * 100).toFixed(1)}%`,
    );
  }
}

void main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
