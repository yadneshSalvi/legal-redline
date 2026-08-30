/**
 * The generator behind `./evals`: turns a per-configuration profile and a list of contracts into
 * results of exactly the shape `src/eval/report.ts` writes, with the same arithmetic
 * `aggregateMetrics` uses, so every fixture number on `/evals` adds up the way a real report does.
 * Illustrative only — the page labels this path "fixture" and real results always win.
 */
import type { AggregateMetrics, ComponentMetrics, ContractMetrics } from "@/src/eval/metrics";
import type { ConfigId } from "@/src/agent/types";
import type { EvalConfigResult } from "../lib/evals";

export interface ContractSpec {
  id: string;
  goldPositives: number;
  words: number;
}

export interface Profile {
  id: ConfigId;
  recall: number;
  precision: number;
  statusAccuracy: number;
  validity: number;
  minimality: number;
  hallucination: number;
  /** Extra recall penalty on `synth-hardcase`, the definition-resolution trap. */
  hardPenalty: number;
  /** Round-2 rates (EVAL.md §9); omitted for the round-1-only configurations. */
  crr?: number;
  appliedYield?: number;
  adherence?: number;
  callsPerContract: number;
  toolCallsPerContract: number;
  retriesPerContract: number;
  /** Input tokens per thousand words of contract. */
  inputPerKWord: number;
  outputPerKWord: number;
  cachedShare: number;
  costPerContract: number;
  latencyMsPerContract: number;
  escalationsPerContract: number;
}

const clamp = (value: number, low: number, high: number): number => Math.min(high, Math.max(low, value));
const ratio = (numerator: number, denominator: number): number => (denominator === 0 ? 0 : numerator / denominator);
const f1of = (precision: number, recall: number): number =>
  precision + recall === 0 ? 0 : (2 * precision * recall) / (precision + recall);

interface Detection {
  tp: number;
  fp: number;
  fn: number;
}

function detectionFor(profile: Profile, contract: ContractSpec, offset: number): Detection {
  const hard = contract.id === "synth-hardcase" ? profile.hardPenalty : 0;
  const recall = clamp(profile.recall + offset - hard, 0.05, 0.97);
  const precision = clamp(profile.precision + offset / 2, 0.05, 0.97);
  const tp = Math.max(1, Math.round(contract.goldPositives * recall));
  return {
    tp,
    fp: Math.max(0, Math.round((tp * (1 - precision)) / precision)),
    fn: Math.max(0, contract.goldPositives - tp),
  };
}

/**
 * Spreads a target rate over the contracts as whole counts, carrying the fraction forward. Real
 * per-contract rates are ragged (7 of 9, 8 of 8) and only the pooled rate lands on the target;
 * rounding each contract independently would print a table of 100 %s.
 */
function allocate(eligible: readonly number[], rate: number): number[] {
  let exact = 0;
  let issued = 0;
  return eligible.map((count) => {
    exact += count * rate;
    const target = Math.floor(exact + 1e-9);
    const passing = Math.min(count, Math.max(0, target - issued));
    issued += passing;
    return passing;
  });
}

function component(eligible: number, passing: number): ComponentMetrics {
  return { eligible, passing, rate: ratio(passing, eligible) };
}

interface Allocations {
  applies: number[];
  checks: number[];
  judge: number[];
  valid: number[];
  minimal: number[];
  correct: number[];
  hallucinations: number[];
  references: number[];
  located: number[];
  gold: number[];
  crr: number[] | null;
  yield: number[] | null;
  adherence: number[] | null;
}

function allocationsFor(
  profile: Profile,
  contracts: readonly ContractSpec[],
  detections: readonly Detection[],
): Allocations {
  const tps = detections.map((detection) => detection.tp);
  const gold = contracts.map((contract) => contract.goldPositives);
  const located = detections.map((detection) => detection.tp + 2);
  const references = tps.map((tp) => tp * 3 + 4);
  return {
    applies: allocate(tps, clamp(profile.validity + 0.05, 0, 1)),
    checks: allocate(tps, clamp(profile.validity + 0.03, 0, 1)),
    judge: allocate(tps, clamp(profile.validity + 0.02, 0, 1)),
    valid: allocate(tps, profile.validity),
    minimal: allocate(tps, profile.minimality),
    correct: allocate(located, profile.statusAccuracy),
    hallucinations: allocate(references, profile.hallucination),
    references,
    located,
    gold,
    crr: profile.crr === undefined ? null : allocate(gold, profile.crr),
    yield: profile.appliedYield === undefined ? null : allocate(gold, profile.appliedYield),
    adherence: profile.adherence === undefined ? null : allocate(tps, profile.adherence),
  };
}

function contractMetrics(
  profile: Profile,
  index: number,
  contract: ContractSpec,
  detection: Detection,
  allocations: Allocations,
): ContractMetrics {
  const { tp, fp, fn } = detection;
  const precision = ratio(tp, tp + fp);
  const recall = ratio(tp, tp + fn);
  const references = allocations.references[index];
  const hallucinations = allocations.hallucinations[index];
  const located = allocations.located[index];
  const gold = allocations.gold[index];
  const kWords = contract.words / 1000;
  const inputTokens = Math.round(profile.inputPerKWord * kWords);

  return {
    detection: {
      tp,
      fp,
      fn,
      escalations: profile.escalationsPerContract,
      ambiguousItems: index % 4 === 0 ? 1 : 0,
      ambiguousMatches: index % 4 === 0 && profile.recall > 0.6 ? 1 : 0,
      precision,
      recall,
      f1: f1of(precision, recall),
    },
    deviationAccuracy: {
      located,
      correct: allocations.correct[index],
      accuracy: ratio(allocations.correct[index], located),
    },
    redlineValidity: {
      eligible: tp,
      applies: component(tp, allocations.applies[index]),
      checks: component(tp, allocations.checks[index]),
      judge: component(tp, allocations.judge[index]),
      valid: component(tp, allocations.valid[index]),
    },
    minimality: component(tp, allocations.minimal[index]),
    citations: {
      references,
      hallucinations,
      rate: ratio(hallucinations, references),
      invalidReferences: Array.from({ length: hallucinations }, (_, offset) => `${11 + offset}.4`),
    },
    integrity: {
      attempted: true,
      ok: profile.validity > 0.5,
      ops: tp * 2,
      applied: tp * 2,
      changeCountMatches: profile.validity > 0.5,
      collateralParagraphIds: [],
      libreoffice: { attempted: false, ok: false, message: "LibreOffice not installed" },
      errors: [],
    },
    ...(allocations.crr ? { completeRedline: component(gold, allocations.crr[index]) } : {}),
    ...(allocations.yield ? { appliedTrackedChangeYield: component(gold, allocations.yield[index]) } : {}),
    ...(allocations.adherence ? { precedentAdherence: component(tp, allocations.adherence[index]) } : {}),
    resources: {
      calls: profile.callsPerContract,
      toolCalls: profile.toolCallsPerContract,
      retries: profile.retriesPerContract,
      inputTokens,
      outputTokens: Math.round(profile.outputPerKWord * kWords),
      cacheReadTokens: Math.round(inputTokens * profile.cachedShare),
      cacheWriteTokens: Math.round(inputTokens * profile.cachedShare * 0.08),
      costUsd: profile.costPerContract,
      latencyMs: profile.latencyMsPerContract,
    },
  };
}

function poolField(
  metrics: readonly ContractMetrics[],
  pick: (metric: ContractMetrics) => ComponentMetrics | undefined,
): ComponentMetrics | undefined {
  const parts = metrics.map(pick);
  if (parts.some((part) => part === undefined)) return undefined;
  const present = parts as ComponentMetrics[];
  const eligible = present.reduce((total, part) => total + part.eligible, 0);
  const passing = present.reduce((total, part) => total + part.passing, 0);
  return component(eligible, passing);
}

/** The same arithmetic as `aggregateMetrics`, so the fixture is internally consistent. */
function aggregate(metrics: readonly ContractMetrics[]): AggregateMetrics {
  const sum = (select: (metric: ContractMetrics) => number): number =>
    metrics.reduce((total, metric) => total + select(metric), 0);
  const mean = (select: (metric: ContractMetrics) => number): number => sum(select) / metrics.length;
  const tp = sum((metric) => metric.detection.tp);
  const fp = sum((metric) => metric.detection.fp);
  const fn = sum((metric) => metric.detection.fn);
  const microPrecision = ratio(tp, tp + fp);
  const microRecall = ratio(tp, tp + fn);
  const located = sum((metric) => metric.deviationAccuracy.located);
  const correct = sum((metric) => metric.deviationAccuracy.correct);
  const references = sum((metric) => metric.citations.references);
  const hallucinations = sum((metric) => metric.citations.hallucinations);

  return {
    contracts: metrics.length,
    detection: {
      macro: {
        precision: mean((metric) => metric.detection.precision),
        recall: mean((metric) => metric.detection.recall),
        f1: mean((metric) => metric.detection.f1),
      },
      micro: {
        tp,
        fp,
        fn,
        escalations: sum((metric) => metric.detection.escalations),
        ambiguousItems: sum((metric) => metric.detection.ambiguousItems),
        ambiguousMatches: sum((metric) => metric.detection.ambiguousMatches),
        precision: microPrecision,
        recall: microRecall,
        f1: f1of(microPrecision, microRecall),
      },
    },
    deviationAccuracy: { located, correct, accuracy: ratio(correct, located) },
    redlineValidity: poolField(metrics, (metric) => metric.redlineValidity.valid) ?? component(0, 0),
    minimality: poolField(metrics, (metric) => metric.minimality) ?? component(0, 0),
    citationHallucination: {
      references,
      hallucinations,
      rate: ratio(hallucinations, references),
      invalidReferences: metrics.flatMap((metric) => metric.citations.invalidReferences),
    },
    completeRedline: poolField(metrics, (metric) => metric.completeRedline),
    appliedTrackedChangeYield: poolField(metrics, (metric) => metric.appliedTrackedChangeYield),
    precedentAdherence: poolField(metrics, (metric) => metric.precedentAdherence),
    resources: {
      calls: sum((metric) => metric.resources.calls),
      toolCalls: sum((metric) => metric.resources.toolCalls),
      retries: sum((metric) => metric.resources.retries),
      inputTokens: sum((metric) => metric.resources.inputTokens),
      outputTokens: sum((metric) => metric.resources.outputTokens),
      cacheReadTokens: sum((metric) => metric.resources.cacheReadTokens),
      cacheWriteTokens: sum((metric) => metric.resources.cacheWriteTokens),
      costUsd: sum((metric) => metric.resources.costUsd),
      latencyMs: sum((metric) => metric.resources.latencyMs),
    },
  };
}

export function configResult(
  profile: Profile,
  contracts: readonly ContractSpec[],
  jitter: readonly number[],
): EvalConfigResult {
  const detections = contracts.map((contract, index) => detectionFor(profile, contract, jitter[index] ?? 0));
  const allocations = allocationsFor(profile, contracts, detections);
  const perContract = detections.map((detection, index) =>
    contractMetrics(profile, index, contracts[index], detection, allocations),
  );
  return {
    id: profile.id,
    aggregate: aggregate(perContract),
    contracts: contracts.map((contract, index) => ({ id: contract.id, metrics: perContract[index] })),
  };
}
