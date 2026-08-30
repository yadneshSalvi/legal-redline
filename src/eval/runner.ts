import { readFile, readdir } from "node:fs/promises";
import { join, resolve } from "node:path";

import pLimit from "p-limit";

import {
  CONFIGS,
  createLlmClient,
  createTrajectoryWriter,
  getConfig,
  resolveConfig,
  runReview,
} from "@/src/agent";
import type { LlmClient, LlmMode } from "@/src/agent/llm";
import type { ConfigId, PipelineConfig, Precedent, ReviewRun, RunStats, TrajectoryEvent } from "@/src/agent/types";
import type { TrajectoryWriter } from "@/src/agent/trajectory";
import { parseDocx } from "@/src/engine";
import type { DocumentModel } from "@/src/engine/types";
import type { Playbook } from "@/src/playbook/schema";
import { createStore } from "@/src/store";
import type { Store } from "@/src/store";

import { assertEvaluationLabelers, loadContractMeta, loadGold } from "./gold";
import { evaluateDocumentIntegrity } from "./integrity";
import { atomicWrite, atomicWriteJson } from "./io";
import {
  createIndependentJudge,
  createIndependentJudgeV2,
  type IndependentJudge,
  type IndependentJudgeV2,
  type JudgeMode,
  type JudgeResult,
  type JudgeV2Result,
} from "./judge";
import { aggregateMetrics, computeContractMetrics, renderProposalText, type AggregateMetrics, type ContractMetrics } from "./metrics";
import { computeRound2Metrics } from "./metrics-round2";
import { matchFindings } from "./match";
import { loadPlaybookFile } from "./playbook";
import { existingReplayStats, replayStatsFromCache } from "./replay-stats";
import { evaluateTrackedChangeYield } from "./tracked-change-yield";

export type EvaluationTier = "short" | "long";

export interface EvaluationDependencies {
  parseDocx: (bytes: Uint8Array, filename: string) => Promise<DocumentModel>;
  runReview: typeof runReview;
  getConfig: (id: string) => PipelineConfig;
  resolveConfig: typeof resolveConfig;
  createLlmClient: (options: Parameters<typeof createLlmClient>[0]) => LlmClient;
  createTrajectoryWriter: (store: Store, runId: string) => TrajectoryWriter;
  createStore: (kind?: string) => Store;
  createJudge: (options: { mode: JudgeMode; cacheDir: string; allowLive: boolean }) => IndependentJudge;
  createJudgeV2: (options: { mode: JudgeMode; cacheDir: string; allowLive: boolean }) => IndependentJudgeV2;
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
  tier?: EvaluationTier;
  judgeConcurrency?: number;
}

export interface ContractEvaluationResult {
  contractId: string;
  metrics: ContractMetrics;
  judgements: Record<string, JudgeResult | JudgeV2Result>;
}

export interface ConfigEvaluationResult {
  config: string;
  tier?: EvaluationTier;
  contracts: ContractEvaluationResult[];
  aggregate: AggregateMetrics;
}

const DEFAULT_DEPENDENCIES: EvaluationDependencies = {
  parseDocx,
  runReview,
  getConfig,
  resolveConfig,
  createLlmClient,
  createTrajectoryWriter,
  createStore,
  createJudge: createIndependentJudge,
  createJudgeV2: createIndependentJudgeV2,
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

export function contractTier(contractId: string): EvaluationTier | null {
  if (contractId.startsWith("cuad-") || contractId.startsWith("synth-")) return "short";
  if (contractId.startsWith("long-")) return "long";
  return null;
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

async function evaluateOne(input: {
  configId: string;
  contractId: string;
  options: Required<Pick<EvaluationOptions, "mode" | "allowLive" | "judgeMode" | "libreoffice">> & {
    contractsRoot: string;
    cacheRoot: string;
    runsRoot: string;
    tier?: EvaluationTier;
    judgeConcurrency: number;
  };
  playbook: Playbook;
  precedents: readonly Precedent[];
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
  // A router config shares the replay cache of the member it resolves to for this document.
  const resolvedConfigId = dependencies.resolveConfig(dependencies.getConfig(configId), document).id;
  const cacheDir = join(input.options.cacheRoot, resolvedConfigId, contractId);
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
  const tiered = input.options.tier !== undefined;
  const judge = tiered ? undefined : dependencies.createJudge({
    mode: input.options.judgeMode,
    cacheDir: join(input.options.cacheRoot, "judge"),
    allowLive: input.options.allowLive,
  });
  const judgeV2 = tiered ? dependencies.createJudgeV2({
    mode: input.options.judgeMode,
    cacheDir: join(input.options.cacheRoot, "judge-v2"),
    allowLive: input.options.allowLive,
  }) : undefined;
  const judgements: Record<string, JudgeResult> = {};
  const judgementsV2: Record<string, JudgeV2Result> = {};
  const judgeLimit = pLimit(input.options.judgeConcurrency ?? 4);
  const judgeFindings = reviewed.findings.filter((candidate) => tp.has(candidate.id) && candidate.proposal !== undefined);
  await Promise.all(judgeFindings.map((finding) => judgeLimit(async () => {
    const rule = input.playbook.rules.find((candidate) => candidate.id === finding.ruleId);
    if (rule === undefined || finding.proposal === undefined) return;
    const originalClause = finding.paragraphIds
      .map((id) => document.paragraphs.find((paragraph) => paragraph.id === id)?.text ?? "")
      .filter(Boolean)
      .join("\n\n");
    const judgeInput = {
      ruleId: rule.id,
      ruleTitle: rule.title,
      preferredPosition: rule.position.preferred,
      fallbackPosition: rule.position.fallback,
      originalClause,
      renderedClause: renderProposalText(document, finding),
      comment: finding.proposal.comment,
    };
    if (judgeV2 !== undefined) {
      // The independent judge decomposes the prose positions itself (pre-registered); it never sees the playbook's
      // `position.elements`, which the element-aware pipeline drafts against — the grader does not use the student's rubric.
      const judgement = await judgeV2.judge(judgeInput);
      judgementsV2[finding.id] = judgement.result;
      judgements[finding.id] = {
        satisfies_rule: judgement.result.satisfies_preferred || judgement.result.satisfies_fallback,
        minimal: judgement.result.minimal,
        preserves_intent: judgement.result.preserves_intent,
        drafting_quality: judgement.result.drafting_quality,
        reason: judgement.result.reason,
      };
    } else if (judge !== undefined) {
      const judgement = await judge.judge(judgeInput);
      judgements[finding.id] = judgement.result;
    }
  })));
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
    ...(tiered ? {
      round2: computeRound2Metrics({
        gold,
        findings: reviewed.findings,
        document,
        rules: input.playbook.rules,
        judgements: judgementsV2,
        trackedChangeYield: await evaluateTrackedChangeYield({
          originalBytes: original,
          document,
          findings: reviewed.findings,
          strategy: baseConfig.singlePrompt ? "baseline-naive" : "pipeline-reconciled",
          author: input.playbook.style.author,
          libreoffice: input.options.libreoffice,
        }),
        precedents: input.precedents,
      }),
    } : {}),
  });
  if (input.options.mode !== "replay" || priorStats === null) {
    const stableEvents = stableTrajectory(trajectory.events);
    await atomicWriteJson(join(outputDir, "findings.json"), reviewed.findings);
    await atomicWrite(
      join(outputDir, "trajectory.jsonl"),
      `${stableEvents.map((event) => JSON.stringify(event)).join("\n")}\n`,
    );
    await atomicWriteJson(statsPath, reviewed.stats);
  }
  return { contractId, metrics, judgements: tiered ? judgementsV2 : judgements };
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
  const precedents = JSON.parse(await readFile(resolve("data/precedents/seed.json"), "utf8")) as Precedent[];
  const discovered = options.contracts ?? (await discoverContracts(contractsRoot));
  const contractIds = options.tier === undefined
    ? discovered.filter((id) => contractTier(id) === "short")
    : discovered.filter((id) => contractTier(id) === options.tier);
  if (options.contracts !== undefined && contractIds.length !== options.contracts.length) {
    const wrong = options.contracts.filter((id) => contractTier(id) !== options.tier);
    throw new Error(`Contracts outside requested tier ${options.tier ?? "legacy short"}: ${wrong.join(", ")}`);
  }
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
              tier: options.tier,
              judgeConcurrency: options.judgeConcurrency ?? 4,
              contractsRoot,
              cacheRoot,
              runsRoot,
            },
            playbook,
            precedents,
            dependencies,
          }),
        ),
      ),
    );
    contracts.sort((left, right) => left.contractId.localeCompare(right.contractId));
    const result: ConfigEvaluationResult = {
      config: configId,
      ...(options.tier === undefined ? {} : { tier: options.tier }),
      contracts,
      aggregate: aggregateMetrics(contracts.map((contract) => contract.metrics)),
    };
    const filename = options.tier === undefined ? `${configId}.json` : `${configId}.${options.tier}.json`;
    await atomicWriteJson(join(resultsRoot, filename), result);
    allResults.push(result);
  }
  return allResults;
}

export function allConfigIds(): string[] {
  return Object.keys(CONFIGS satisfies Record<ConfigId, PipelineConfig>);
}
