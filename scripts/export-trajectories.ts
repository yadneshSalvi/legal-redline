import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

import { Command } from "commander";

import { createDeterministicMemo } from "@/src/agent/memo";
import { renderSystemPrompts, renderTrajectoryNarration, type NarrationParties } from "@/src/agent/trajectory-narrator";
import type { ConfigId, Finding, ReviewRun, RunStats, RunStatus, TrajectoryEvent } from "@/src/agent/types";
import { parseDocx } from "@/src/engine";
import { loadContractMeta } from "@/src/eval/gold";
import { atomicWrite, stableStringify } from "@/src/eval/io";
import { loadPlaybook } from "@/src/playbook/loader";
import type { Playbook } from "@/src/playbook/schema";
import { redactSubmissionText } from "@/src/submission/redact";

interface ExportOptions {
  run?: string;
  contract?: string;
  config?: string;
  contracts?: string[];
  allFinal?: boolean;
}

interface ExportSource {
  run: ReviewRun;
  events: TrajectoryEvent[];
  trajectoryText: string;
  contractId: string;
  parties?: NarrationParties;
  playbook: Playbook;
}

function parseTrajectory(text: string, filename: string): TrajectoryEvent[] {
  return text.split("\n").filter(Boolean).map((line, index) => {
    try {
      return JSON.parse(line) as TrajectoryEvent;
    } catch (error) {
      throw new Error(`${filename}:${index + 1}: ${error instanceof Error ? error.message : String(error)}`);
    }
  });
}

async function directoryNames(root: string): Promise<string[]> {
  try {
    return (await readdir(root, { withFileTypes: true }))
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort((left, right) => left.localeCompare(right));
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") return [];
    throw error;
  }
}

function contractTag(run: ReviewRun): string | undefined {
  return run.tags?.find((tag) => tag !== "eval");
}

function memoFromEvents(events: readonly TrajectoryEvent[], findings: Finding[], title: string): string {
  const response = [...events].reverse().find((event) => event.agent === "memo" && event.type === "llm_response");
  if (response?.payload !== null && typeof response?.payload === "object" && !Array.isArray(response.payload)) {
    const parsed = (response.payload as { parsed_output?: unknown }).parsed_output;
    if (parsed !== null && typeof parsed === "object" && !Array.isArray(parsed)) {
      const markdown = (parsed as { markdown?: unknown }).markdown;
      if (typeof markdown === "string") return markdown;
    }
  }
  return createDeterministicMemo(findings, title);
}

function runStatus(events: readonly TrajectoryEvent[]): RunStatus {
  const event = [...events].reverse().find((candidate) => candidate.type === "run_end");
  if (event?.payload !== null && typeof event?.payload === "object" && !Array.isArray(event.payload)) {
    const status = (event.payload as { status?: unknown }).status;
    if (status === "queued" || status === "running" || status === "awaiting_review" || status === "applied" || status === "failed") {
      return status;
    }
  }
  return "awaiting_review";
}

async function loadStoredRun(root: string, runId: string, contractOverride?: string): Promise<ExportSource> {
  const directory = path.join(root, runId);
  const [runText, trajectoryText] = await Promise.all([
    readFile(path.join(directory, "run.json"), "utf8"),
    readFile(path.join(directory, "trajectory.jsonl"), "utf8"),
  ]);
  const run = JSON.parse(runText) as ReviewRun;
  const events = parseTrajectory(trajectoryText, path.join(directory, "trajectory.jsonl"));
  return {
    run,
    events,
    trajectoryText,
    contractId: contractOverride ?? contractTag(run) ?? run.document.id,
    playbook: await loadPlaybook(run.playbookId),
  };
}

async function loadCampaignRun(root: string, config: string, contractId: string): Promise<ExportSource> {
  const runDirectory = path.join(root, "evals/runs", config, contractId);
  const contractDirectory = path.join(root, "data/contracts", contractId);
  const [findingsText, statsText, trajectoryText, docx, meta, playbook] = await Promise.all([
    readFile(path.join(runDirectory, "findings.json"), "utf8"),
    readFile(path.join(runDirectory, "stats.json"), "utf8"),
    readFile(path.join(runDirectory, "trajectory.jsonl"), "utf8"),
    readFile(path.join(contractDirectory, "contract.docx")),
    loadContractMeta(path.join(contractDirectory, "meta.json")),
    loadPlaybook("customer-vendor-services-v1"),
  ]);
  const events = parseTrajectory(trajectoryText, path.join(runDirectory, "trajectory.jsonl"));
  const findings = JSON.parse(findingsText) as Finding[];
  const stats = JSON.parse(statsText) as RunStats;
  const document = await parseDocx(new Uint8Array(docx), `${contractId}.docx`);
  const run: ReviewRun = {
    id: `eval-${config}-${contractId}`,
    createdAt: events[0]?.t ?? stats.startedAt,
    status: runStatus(events),
    config: config as ConfigId,
    playbookId: playbook.id,
    document,
    sourceKey: `data/contracts/${contractId}/contract.docx`,
    findings,
    decisions: {},
    memo: memoFromEvents(events, findings, document.title),
    stats,
    tags: ["eval", contractId],
  };
  return {
    run,
    events,
    trajectoryText,
    contractId,
    parties: meta.ourParty === null || meta.counterparty === null
      ? undefined
      : { ourParty: meta.ourParty.name, counterparty: meta.counterparty.name },
    playbook,
  };
}

async function exportRun(root: string, source: ExportSource): Promise<string> {
  const destination = path.join(root, "trajectories/app", source.run.config, source.contractId);
  const files: Array<[string, string]> = [
    ["run.json", `${stableStringify(source.run, 2)}\n`],
    ["findings.json", `${stableStringify(source.run.findings, 2)}\n`],
    ["trajectory.jsonl", source.trajectoryText.endsWith("\n") ? source.trajectoryText : `${source.trajectoryText}\n`],
    ["README.md", renderTrajectoryNarration(source)],
    ["prompts.md", renderSystemPrompts(source.events)],
  ];
  await Promise.all(files.map(([filename, contents]) =>
    atomicWrite(path.join(destination, filename), redactSubmissionText(contents)),
  ));
  return path.relative(root, destination);
}

function contractIds(values: readonly string[] | undefined): string[] | undefined {
  if (values === undefined) return undefined;
  return [...new Set(values.flatMap((value) => value.split(",")).map((value) => value.trim()).filter(Boolean))]
    .sort((left, right) => left.localeCompare(right));
}

function validateOptions(options: ExportOptions): void {
  const modes = Number(options.run !== undefined) + Number(options.config !== undefined) + Number(options.allFinal === true);
  if (modes > 1) throw new Error("Choose only one of --run, --config, or --all-final.");
  if (options.contract !== undefined && options.run === undefined) throw new Error("--contract is only valid with --run.");
  if (options.contracts !== undefined && options.config === undefined) throw new Error("--contracts requires --config.");
}

async function main(): Promise<void> {
  const program = new Command()
    .option("--run <id>", "Export one data/runs run")
    .option("--contract <id>", "Override the per-run contract directory name")
    .option("--config <id>", "Export campaign runs from evals/runs/<config>")
    .option("--contracts <ids...>", "Campaign contract ids (space- or comma-separated)")
    .option("--all-final", "Export final and b1-prompt for all 12 contracts")
    .parse();
  const options = program.opts<ExportOptions>();
  validateOptions(options);
  const root = process.cwd();
  const sources: Array<() => Promise<ExportSource>> = [];
  if (options.allFinal === true) {
    const ids = await directoryNames(path.join(root, "data/contracts"));
    for (const config of ["b1-prompt", "final"]) {
      for (const id of ids) sources.push(() => loadCampaignRun(root, config, id));
    }
  } else if (options.config !== undefined) {
    const ids = contractIds(options.contracts) ?? await directoryNames(path.join(root, "evals/runs", options.config));
    for (const id of ids) sources.push(() => loadCampaignRun(root, options.config as string, id));
  } else {
    const ids = options.run === undefined ? await directoryNames(path.join(root, "data/runs")) : [options.run];
    for (const id of ids) sources.push(() => loadStoredRun(path.join(root, "data/runs"), id, options.contract));
  }

  const exported: string[] = [];
  const failures: string[] = [];
  for (const load of sources) {
    try {
      exported.push(await exportRun(root, await load()));
    } catch (error) {
      failures.push(error instanceof Error ? error.message : String(error));
    }
  }
  for (const destination of exported) console.log(`Exported ${destination}`);
  for (const failure of failures) console.warn(`Skipped: ${failure}`);
  console.log(`Exported ${exported.length} run trajectories.`);
  if (failures.length > 0 && (options.run !== undefined || options.config !== undefined || options.allFinal === true)) {
    process.exitCode = 1;
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
