/**
 * Fallback for `GET /api/evals` — the shape `src/eval/report.ts` writes to
 * `evals/results/changelog-data.json`, with illustrative numbers so the dashboard can be designed
 * and reviewed before the eval has been run in an environment. The page labels this "fixture"
 * wherever it is used; real results always win.
 *
 * The aggregates are computed from the per-contract metrics with the same arithmetic as
 * `aggregateMetrics`, so every number on the page adds up the way a real report does.
 */
import type { AggregateMetrics, ContractMetrics } from "@/src/eval/metrics";
import type { ConfigId } from "@/src/agent/types";
import type { EvalConfigResult, EvalsData } from "../lib/evals";

/** The 12 committed contracts (EVAL.md §1): gold positives and length drive the fixture numbers. */
const contracts: { id: string; goldPositives: number; words: number }[] = [
  { id: "cuad-americas-shopping-mall-hosting", goldPositives: 8, words: 2880 },
  { id: "cuad-bluefly-hosting", goldPositives: 11, words: 5136 },
  { id: "cuad-bnc-mortgage-hosting", goldPositives: 10, words: 4738 },
  { id: "cuad-corio-hosting", goldPositives: 13, words: 8396 },
  { id: "cuad-kubient-msa-part1", goldPositives: 9, words: 4014 },
  { id: "cuad-merit-life-master-services", goldPositives: 8, words: 3292 },
  { id: "cuad-sfg-financial-license", goldPositives: 12, words: 7749 },
  { id: "cuad-sparkling-spring-license", goldPositives: 9, words: 3885 },
  { id: "synth-11", goldPositives: 7, words: 4758 },
  { id: "synth-12", goldPositives: 8, words: 4321 },
  { id: "synth-13", goldPositives: 6, words: 4444 },
  { id: "synth-hardcase", goldPositives: 5, words: 4876 },
];

/** Fixed per-contract offsets: real runs are uneven, and a flat table reads as invented. */
const jitter = [0.03, -0.04, 0.02, -0.06, 0.05, -0.02, -0.05, 0.04, 0.06, -0.03, 0.02, 0];

interface Profile {
  id: ConfigId;
  recall: number;
  precision: number;
  statusAccuracy: number;
  validity: number;
  minimality: number;
  hallucination: number;
  /** Extra recall penalty on `synth-hardcase`, the definition-resolution trap. */
  hardPenalty: number;
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

const profiles: Profile[] = [
  { id: "b0-chat", recall: 0.34, precision: 0.29, statusAccuracy: 0.41, validity: 0.11, minimality: 0.18, hallucination: 0.19, hardPenalty: 0.22, callsPerContract: 1, toolCallsPerContract: 0, retriesPerContract: 0, inputPerKWord: 1500, outputPerKWord: 340, cachedShare: 0, costPerContract: 0.09, latencyMsPerContract: 41_000, escalationsPerContract: 0 },
  { id: "b1-prompt", recall: 0.54, precision: 0.51, statusAccuracy: 0.62, validity: 0.38, minimality: 0.44, hallucination: 0.11, hardPenalty: 0.2, callsPerContract: 1, toolCallsPerContract: 0, retriesPerContract: 0, inputPerKWord: 2600, outputPerKWord: 620, cachedShare: 0, costPerContract: 0.22, latencyMsPerContract: 63_000, escalationsPerContract: 0 },
  { id: "i1-docmodel", recall: 0.66, precision: 0.6, statusAccuracy: 0.71, validity: 0.54, minimality: 0.57, hallucination: 0.055, hardPenalty: 0.16, callsPerContract: 4, toolCallsPerContract: 9, retriesPerContract: 1, inputPerKWord: 3100, outputPerKWord: 700, cachedShare: 0.42, costPerContract: 0.39, latencyMsPerContract: 88_000, escalationsPerContract: 0 },
  { id: "i2-workers", recall: 0.74, precision: 0.69, statusAccuracy: 0.79, validity: 0.78, minimality: 0.72, hallucination: 0.018, hardPenalty: 0.12, callsPerContract: 24, toolCallsPerContract: 71, retriesPerContract: 2, inputPerKWord: 8200, outputPerKWord: 1400, cachedShare: 0.71, costPerContract: 0.95, latencyMsPerContract: 152_000, escalationsPerContract: 1 },
  { id: "i3-verifier", recall: 0.79, precision: 0.79, statusAccuracy: 0.85, validity: 0.91, minimality: 0.81, hallucination: 0.009, hardPenalty: 0.08, callsPerContract: 38, toolCallsPerContract: 96, retriesPerContract: 4, inputPerKWord: 11_800, outputPerKWord: 1900, cachedShare: 0.78, costPerContract: 1.43, latencyMsPerContract: 214_000, escalationsPerContract: 2 },
  { id: "i4-memory", recall: 0.83, precision: 0.83, statusAccuracy: 0.88, validity: 0.93, minimality: 0.86, hallucination: 0.007, hardPenalty: 0.06, callsPerContract: 40, toolCallsPerContract: 104, retriesPerContract: 3, inputPerKWord: 12_400, outputPerKWord: 1950, cachedShare: 0.8, costPerContract: 1.52, latencyMsPerContract: 226_000, escalationsPerContract: 2 },
  { id: "x-monolith", recall: 0.62, precision: 0.74, statusAccuracy: 0.8, validity: 0.83, minimality: 0.79, hallucination: 0.015, hardPenalty: 0.18, callsPerContract: 31, toolCallsPerContract: 128, retriesPerContract: 7, inputPerKWord: 17_600, outputPerKWord: 2300, cachedShare: 0.55, costPerContract: 1.94, latencyMsPerContract: 341_000, escalationsPerContract: 1 },
  { id: "final", recall: 0.86, precision: 0.85, statusAccuracy: 0.9, validity: 0.95, minimality: 0.88, hallucination: 0.004, hardPenalty: 0.04, callsPerContract: 41, toolCallsPerContract: 112, retriesPerContract: 3, inputPerKWord: 12_100, outputPerKWord: 1880, cachedShare: 0.82, costPerContract: 1.47, latencyMsPerContract: 219_000, escalationsPerContract: 1 },
];

const clamp = (value: number, low: number, high: number): number => Math.min(high, Math.max(low, value));
const ratio = (numerator: number, denominator: number): number => (denominator === 0 ? 0 : numerator / denominator);
const f1of = (precision: number, recall: number): number =>
  precision + recall === 0 ? 0 : (2 * precision * recall) / (precision + recall);

interface Detection {
  tp: number;
  fp: number;
  fn: number;
}

function detectionFor(profile: Profile, index: number): Detection {
  const contract = contracts[index];
  const offset = jitter[index];
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

function component(eligible: number, passing: number): { eligible: number; passing: number; rate: number } {
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
}

function allocationsFor(profile: Profile, detections: readonly Detection[]): Allocations {
  const tps = detections.map((detection) => detection.tp);
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
  };
}

function contractMetrics(
  profile: Profile,
  index: number,
  detection: Detection,
  allocations: Allocations,
): ContractMetrics {
  const contract = contracts[index];
  const { tp, fp, fn } = detection;
  const precision = ratio(tp, tp + fp);
  const recall = ratio(tp, tp + fn);
  const references = allocations.references[index];
  const hallucinations = allocations.hallucinations[index];
  const located = allocations.located[index];
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
  const validEligible = sum((metric) => metric.redlineValidity.valid.eligible);
  const validPassing = sum((metric) => metric.redlineValidity.valid.passing);
  const minimalEligible = sum((metric) => metric.minimality.eligible);
  const minimalPassing = sum((metric) => metric.minimality.passing);
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
    redlineValidity: { eligible: validEligible, passing: validPassing, rate: ratio(validPassing, validEligible) },
    minimality: { eligible: minimalEligible, passing: minimalPassing, rate: ratio(minimalPassing, minimalEligible) },
    citationHallucination: {
      references,
      hallucinations,
      rate: ratio(hallucinations, references),
      invalidReferences: metrics.flatMap((metric) => metric.citations.invalidReferences),
    },
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

function configResult(profile: Profile): EvalConfigResult {
  const detections = contracts.map((_, index) => detectionFor(profile, index));
  const allocations = allocationsFor(profile, detections);
  const perContract = detections.map((detection, index) =>
    contractMetrics(profile, index, detection, allocations),
  );
  return {
    id: profile.id,
    aggregate: aggregate(perContract),
    contracts: contracts.map((contract, index) => ({ id: contract.id, metrics: perContract[index] })),
  };
}

export const fixtureEvals: EvalsData = {
  generatedFrom: "src/ui/fixtures/evals.ts",
  configs: profiles.map(configResult),
};
