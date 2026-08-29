import "dotenv/config";

import { Command, Option } from "commander";

import { generateReport } from "@/src/eval/report";
import { allConfigIds, runEvaluation } from "@/src/eval/runner";
import type { JudgeMode } from "@/src/eval/judge";

async function main(): Promise<void> {
  const command = new Command()
    .option("--config <id>", "pipeline config", "b1-prompt")
    .option("--all", "run every pipeline config")
    .option("--contracts <ids>", "comma-separated contract ids")
    .option("--live", "call models and record responses")
    .option("--allow-live", "allow replay cache misses to call and record")
    .addOption(new Option("--judge <mode>", "independent judge mode").choices(["live", "replay"]).default("replay"))
    .option("--concurrency <number>", "maximum concurrent contract runs", "3")
    .parse();
  const options = command.opts<{
    config: string;
    all?: boolean;
    contracts?: string;
    live?: boolean;
    allowLive?: boolean;
    judge: "live" | "replay";
    concurrency: string;
  }>();
  const concurrency = Number.parseInt(options.concurrency, 10);
  if (!Number.isInteger(concurrency) || concurrency < 1) throw new Error("--concurrency must be a positive integer");
  const judgeWasExplicit = command.getOptionValueSource("judge") !== "default";
  const results = await runEvaluation({
    configs: options.all === true ? allConfigIds() : [options.config],
    contracts: options.contracts?.split(",").map((id) => id.trim()).filter(Boolean),
    mode: options.live === true ? "record" : "replay",
    allowLive: options.allowLive === true,
    judgeMode: (options.judge === "live" || (options.live === true && !judgeWasExplicit) ? "record" : "replay") satisfies JudgeMode,
    concurrency,
  });
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
