import { readFile, readdir } from "node:fs/promises";
import { join, resolve } from "node:path";

import pLimit from "p-limit";

import {
  CONFIGS,
  createLlmClient,
  createTrajectoryWriter,
  getConfig,
  runReview,
} from "@/src/agent";
import { usageWithCost } from "@/src/agent/pricing";
import type { LlmClient, LlmMode } from "@/src/agent/llm";
import type { ConfigId, PipelineConfig, ReviewRun, RunStats, TrajectoryEvent } from "@/src/agent/types";
import type { TrajectoryWriter } from "@/src/agent/trajectory";
import { parseDocx } from "@/src/engine";
import type { DocumentModel } from "@/src/engine/types";
import type { Playbook } from "@/src/playbook/schema";
import { createStore } from "@/src/store";
import type { Store } from "@/src/store";

import { assertEvaluationLabelers, loadContractMeta, loadGold } from "./gold";
import { evaluateDocumentIntegrity } from "./integrity";
import { atomicWrite, atomicWriteJson } from "./io";
import { createIndependentJudge, type IndependentJudge, type JudgeMode, type JudgeResult } from "./judge";
import { aggregateMetrics, computeContractMetrics, renderProposalText, type AggregateMetrics, type ContractMetrics } from "./metrics";
import { matchFindings } from "./match";
import { loadPlaybookFile } from "./playbook";

export interface EvaluationDependencies {
  parseDocx: (bytes: Uint8Array, filename: string) => Promise<DocumentModel>;
  runReview: typeof runReview;
  getConfig: (id: string) => PipelineConfig;
  createLlmClient: (options: Parameters<typeof createLlmClient>[0]) => LlmClient;
  createTrajectoryWriter: (store: Store, runId: string) => TrajectoryWriter;
  createStore: (kind?: string) => Store;
  createJudge: (options: { mode: JudgeMode; cacheDir: string; allowLive: boolean }) => IndependentJudge;
}

export interface EvaluationOptions {
  configs: string[];
  contracts?: string[];
  mode: LlmMode;
  allowLive: boolean;
  judgeMode: JudgeMode;
  concurrency: number;
  contractsRoot?: string;
  cacheRoot?: string;
  runsRoot?: string;
  resultsRoot?: string;
  playbookPath?: string;
  libreoffice?: boolean;
}

export interface ContractEvaluationResult {
  contractId: string;
  metrics: ContractMetrics;
  judgements: Record<string, JudgeResult>;
}

export interface ConfigEvaluationResult {
  config: string;
  contracts: ContractEvaluationResult[];
  aggregate: AggregateMetrics;
}

const DEFAULT_DEPENDENCIES: EvaluationDependencies = {
  parseDocx,
  runReview,
  getConfig,
  createLlmClient,
  createTrajectoryWriter,
  createStore,
  createJudge: createIndependentJudge,
};

function initialStats(): RunStats {
  return {
    startedAt: new Date().toISOString(),
    llmCalls: 0,
    toolCalls: 0,
    retries: 0,
    usage: { inputTokens: 0, outputTokens: 0, cacheReadTokens: 0, cacheWriteTokens: 0, costUsd: 0 },
    findings: 0,
    bySeverity: { critical: 0, high: 0, medium: 0, low: 0 },
    byStatus: { deviation: 0, missing: 0, compliant: 0, needs_review: 0 },
  };
}

async function discoverContracts(root: string): Promise<string[]> {
  const entries = await readdir(root, { withFileTypes: true });
  const contracts: string[] = [];
  const drafts: string[] = [];
  for (const entry of entries.sort((left, right) => left.name.localeCompare(right.name))) {
    if (!entry.isDirectory()) continue;
    try {
      await readFile(join(root, entry.name, "gold.json"));
      contracts.push(entry.name);
    } catch {
      try {
        await readFile(join(root, entry.name, "gold.draft.json"));
        drafts.push(entry.name);
      } catch {
        // Not an evaluation-contract directory.
      }
    }
  }
  if (drafts.length > 0) {
    throw new Error(
      `Draft-only contracts cannot be evaluated as gold: ${drafts.join(", ")}. ` +
        "Have a human review and promote their labels with scripts/gold-review.ts promote <id>.",
    );
  }
  return contracts;
}

function stableTrajectory(events: readonly TrajectoryEvent[]): TrajectoryEvent[] {
  const ids = new Map(events.map((event, index) => [event.id, `e${String(index + 1).padStart(4, "0")}`]));
  return events.map((event, index) => ({
    ...event,
    id: ids.get(event.id) ?? `e${String(index + 1).padStart(4, "0")}`,
    t: "2026-01-01T00:00:00.000Z",
    ...(event.parentId === undefined ? {} : { parentId: ids.get(event.parentId) ?? event.parentId }),
  }));
}

async function existingReplayStats(path: string): Promise<RunStats | null> {
  try {
    return JSON.parse(await readFile(path, "utf8")) as RunStats;
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") return null;
    throw error;
  }
}

interface CachedAnthropicResponse {
  response?: {
    model?: string;
    usage?: {
      input_tokens?: number;
      output_tokens?: number;
      cache_read_input_tokens?: number;
      cache_creation_input_tokens?: number;
    };
    content?: Array<{ type?: string }>;
  };
}

async function replayStatsFromCache(cacheDir: string, stats: RunStats): Promise<RunStats> {
  let files: string[];
  try {
    files = (await readdir(cacheDir)).filter((file) => file.endsWith(".json")).sort();
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") return stats;
    throw error;
  }
  const usage = { inputTokens: 0, outputTokens: 0, cacheReadTokens: 0, cacheWriteTokens: 0, costUsd: 0 };
  let toolCalls = 0;
  for (const file of files) {
    const cached = JSON.parse(await readFile(join(cacheDir, file), "utf8")) as CachedAnthropicResponse;
    const response = cached.response;
    if (response?.usage === undefined) continue;
    const priced = usageWithCost(response.model ?? "claude-opus-5", {
      inputTokens: response.usage.input_tokens ?? 0,
      outputTokens: response.usage.output_tokens ?? 0,
      cacheReadTokens: response.usage.cache_read_input_tokens ?? 0,
      cacheWriteTokens: response.usage.cache_creation_input_tokens ?? 0,
    });
    usage.inputTokens += priced.inputTokens;
    usage.outputTokens += priced.outputTokens;
    usage.cacheReadTokens += priced.cacheReadTokens ?? 0;
    usage.cacheWriteTokens += priced.cacheWriteTokens ?? 0;
    usage.costUsd += priced.costUsd;
    toolCalls += response.content?.filter((block) => block.type === "tool_use").length ?? 0;
  }
  return {
    ...stats,
    llmCalls: files.length,
    toolCalls,
    usage: { ...usage, costUsd: Number(usage.costUsd.toFixed(8)) },
  };
}

async function evaluateOne(input: {
  configId: string;
  contractId: string;
  options: Required<Pick<EvaluationOptions, "mode" | "allowLive" | "judgeMode" | "libreoffice">> & {
    contractsRoot: string;
    cacheRoot: string;
    runsRoot: string;
  };
  playbook: Playbook;
  dependencies: EvaluationDependencies;
}): Promise<ContractEvaluationResult> {
  const { contractId, configId, dependencies } = input;
  const directory = join(input.options.contractsRoot, contractId);
  const [original, gold, meta] = await Promise.all([
    readFile(join(directory, "contract.docx")).then((bytes) => new Uint8Array(bytes)),
    loadGold(join(directory, "gold.json")),
    loadContractMeta(join(directory, "meta.json")),
  ]);
  assertEvaluationLabelers(contractId, gold);
  const document = await dependencies.parseDocx(original, `${contractId}.docx`);
  const runId = `eval-${configId}-${contractId}`;
  const sourceKey = `runs/${runId}/source.docx`;
  const store = dependencies.createStore("memory");
  await store.putBytes(sourceKey, original);
  const trajectory = dependencies.createTrajectoryWriter(store, runId);
  const cacheDir = join(input.options.cacheRoot, configId, contractId);
  const llm = dependencies.createLlmClient({
    mode: input.options.mode,
    cacheDir,
    allowLive: input.options.allowLive,
  });
  const baseConfig = dependencies.getConfig(configId);
  const run: ReviewRun = {
    id: runId,
    createdAt: "2026-01-01T00:00:00.000Z",
    status: "queued",
    config: baseConfig.id,
    playbookId: input.playbook.id,
    document,
    sourceKey,
    findings: [],
    decisions: {},
    stats: initialStats(),
    tags: ["eval", contractId],
  };
  const reviewed = await dependencies.runReview({
    run,
    originalBytes: original,
    playbook: input.playbook,
    config: baseConfig,
    store,
    trajectory,
    llm,
    parties:
      meta.ourParty === null || meta.counterparty === null
        ? undefined
        : { ourParty: meta.ourParty.name, counterparty: meta.counterparty.name },
  });
  const outputDir = join(input.options.runsRoot, configId, contractId);
  const statsPath = join(outputDir, "stats.json");
  const priorStats = input.options.mode === "replay" ? await existingReplayStats(statsPath) : null;
  if (input.options.mode === "replay") {
    reviewed.stats = priorStats ?? (await replayStatsFromCache(cacheDir, reviewed.stats));
  }

  const matched = matchFindings(reviewed.findings, gold);
  const tp = new Set(matched.truePositiveFindingIds);
  const judge = dependencies.createJudge({
    mode: input.options.judgeMode,
    cacheDir: join(input.options.cacheRoot, "judge"),
    allowLive: input.options.allowLive,
  });
  const judgements: Record<string, JudgeResult> = {};
  for (const finding of reviewed.findings.filter((candidate) => tp.has(candidate.id) && candidate.proposal !== undefined)) {
    const rule = input.playbook.rules.find((candidate) => candidate.id === finding.ruleId);
    if (rule === undefined || finding.proposal === undefined) continue;
    const originalClause = finding.paragraphIds
      .map((id) => document.paragraphs.find((paragraph) => paragraph.id === id)?.text ?? "")
      .filter(Boolean)
      .join("\n\n");
    const judgement = await judge.judge({
      ruleId: rule.id,
      ruleTitle: rule.title,
      preferredPosition: rule.position.preferred,
      fallbackPosition: rule.position.fallback,
      originalClause,
      renderedClause: renderProposalText(document, finding),
      comment: finding.proposal.comment,
    });
    judgements[finding.id] = judgement.result;
  }
  const integrity = await evaluateDocumentIntegrity({
    originalBytes: original,
    document,
    findings: reviewed.findings,
    truePositiveFindingIds: matched.truePositiveFindingIds,
    author: input.playbook.style.author,
    libreoffice: input.options.libreoffice,
  });
  const metrics = computeContractMetrics({
    gold,
    findings: reviewed.findings,
    document,
    rules: input.playbook.rules,
    judgements,
    memo: reviewed.memo,
    stats: reviewed.stats,
    integrity,
  });
  const stableEvents = stableTrajectory(trajectory.events);
  await atomicWriteJson(join(outputDir, "findings.json"), reviewed.findings);
  await atomicWrite(join(outputDir, "trajectory.jsonl"), `${stableEvents.map((event) => JSON.stringify(event)).join("\n")}\n`);
  await atomicWriteJson(statsPath, reviewed.stats);
  return { contractId, metrics, judgements };
}

export async function runEvaluation(
  options: EvaluationOptions,
  overrides: Partial<EvaluationDependencies> = {},
): Promise<ConfigEvaluationResult[]> {
  const dependencies = { ...DEFAULT_DEPENDENCIES, ...overrides };
  const contractsRoot = resolve(options.contractsRoot ?? "data/contracts");
  const cacheRoot = resolve(options.cacheRoot ?? "evals/cache");
  const runsRoot = resolve(options.runsRoot ?? "evals/runs");
  const resultsRoot = resolve(options.resultsRoot ?? "evals/results");
  const playbook = await loadPlaybookFile(options.playbookPath ?? resolve("data/playbooks/customer-vendor-services.yaml"));
  const contractIds = options.contracts ?? (await discoverContracts(contractsRoot));
  const limit = pLimit(options.concurrency);
  const allResults: ConfigEvaluationResult[] = [];
  for (const configId of options.configs) {
    dependencies.getConfig(configId);
    const contracts = await Promise.all(
      contractIds.map((contractId) =>
        limit(() =>
          evaluateOne({
            configId,
            contractId,
            options: {
              mode: options.mode,
              allowLive: options.allowLive,
              judgeMode: options.judgeMode,
              libreoffice: options.libreoffice ?? true,
              contractsRoot,
              cacheRoot,
              runsRoot,
            },
            playbook,
            dependencies,
          }),
        ),
      ),
    );
    contracts.sort((left, right) => left.contractId.localeCompare(right.contractId));
    const result: ConfigEvaluationResult = {
      config: configId,
      contracts,
      aggregate: aggregateMetrics(contracts.map((contract) => contract.metrics)),
    };
    await atomicWriteJson(join(resultsRoot, `${configId}.json`), result);
    allResults.push(result);
  }
  return allResults;
}

export function allConfigIds(): string[] {
  return Object.keys(CONFIGS satisfies Record<ConfigId, PipelineConfig>);
}
