/**
 * Round-2 derivations for `/evals` (EVAL.md §9): the short/long/all tier views, the pooling
 * arithmetic behind "All", the per-contract groups and the headline comparison.
 *
 * Two rules keep the page honest.
 *  1. A row shows a number only when that configuration was measured on exactly the population the
 *     view names — so "All" needs both tiers, and a config run on one tier only renders as "—".
 *  2. Round-1 rows keep their round-1 (judge v1) values. Judge v2 is stricter on the identical runs,
 *     so every judge-scored cell carries the version that produced it and the table marks it.
 */
import type { ConfigId } from "@/src/agent/types";
import type { AggregateMetrics, ComponentMetrics } from "@/src/eval/metrics";
import {
  FINAL_CONFIG,
  HARD_CASE_ID,
  absentRow,
  configDescriptors,
  rowFromAggregate,
  type ConfigDescriptor,
  type ElementMiss,
  type EvalConfigResult,
  type EvalsData,
  type LadderRow,
  type TierId,
} from "./evals";

export type TierView = TierId | "all";

export const tierViews: TierView[] = ["short", "long", "all"];

export const tierLabels: Record<TierView, string> = { short: "Short", long: "Long", all: "All" };

function ratio(numerator: number, denominator: number): number {
  return denominator === 0 ? 0 : numerator / denominator;
}

function f1of(precision: number, recall: number): number {
  return precision + recall === 0 ? 0 : (2 * precision * recall) / (precision + recall);
}

function tierOf(data: EvalsData, id: TierId): EvalConfigResult[] {
  return data.tiers.find((tier) => tier.id === id)?.configs ?? [];
}

function byId(configs: readonly EvalConfigResult[]): Map<string, EvalConfigResult> {
  return new Map(configs.map((config) => [config.id, config]));
}

/** Sum two component metrics, or `undefined` unless every part reported one. */
function poolComponent(
  parts: readonly AggregateMetrics[],
  pick: (aggregate: AggregateMetrics) => ComponentMetrics | undefined,
): ComponentMetrics | undefined {
  const values = parts.map(pick);
  if (values.some((value) => value === undefined)) return undefined;
  const present = values as ComponentMetrics[];
  const eligible = present.reduce((total, value) => total + value.eligible, 0);
  const passing = present.reduce((total, value) => total + value.passing, 0);
  return { eligible, passing, rate: ratio(passing, eligible) };
}

/**
 * Pool tier aggregates into one. Counts add, rates are recomputed from the pooled counts, and the
 * macro detection means are re-weighted by contract count — which is exactly the unweighted mean
 * over the union of contracts, so "All" is the same number a single 18-contract run would print.
 */
export function poolAggregates(parts: readonly AggregateMetrics[]): AggregateMetrics {
  const sum = (pick: (aggregate: AggregateMetrics) => number): number =>
    parts.reduce((total, aggregate) => total + pick(aggregate), 0);
  const contracts = sum((aggregate) => aggregate.contracts);
  const weighted = (pick: (aggregate: AggregateMetrics) => number): number =>
    contracts === 0 ? 0 : parts.reduce((total, a) => total + pick(a) * a.contracts, 0) / contracts;

  const tp = sum((a) => a.detection.micro.tp);
  const fp = sum((a) => a.detection.micro.fp);
  const fn = sum((a) => a.detection.micro.fn);
  const microPrecision = ratio(tp, tp + fp);
  const microRecall = ratio(tp, tp + fn);
  const located = sum((a) => a.deviationAccuracy.located);
  const correct = sum((a) => a.deviationAccuracy.correct);
  const references = sum((a) => a.citationHallucination.references);
  const hallucinations = sum((a) => a.citationHallucination.hallucinations);
  const validity = poolComponent(parts, (a) => a.redlineValidity) ?? { eligible: 0, passing: 0, rate: 0 };
  const minimality = poolComponent(parts, (a) => a.minimality) ?? { eligible: 0, passing: 0, rate: 0 };

  return {
    contracts,
    detection: {
      macro: {
        precision: weighted((a) => a.detection.macro.precision),
        recall: weighted((a) => a.detection.macro.recall),
        f1: weighted((a) => a.detection.macro.f1),
      },
      micro: {
        tp,
        fp,
        fn,
        escalations: sum((a) => a.detection.micro.escalations),
        ambiguousItems: sum((a) => a.detection.micro.ambiguousItems),
        ambiguousMatches: sum((a) => a.detection.micro.ambiguousMatches),
        precision: microPrecision,
        recall: microRecall,
        f1: f1of(microPrecision, microRecall),
      },
    },
    deviationAccuracy: { located, correct, accuracy: ratio(correct, located) },
    redlineValidity: validity,
    minimality,
    citationHallucination: {
      references,
      hallucinations,
      rate: ratio(hallucinations, references),
      invalidReferences: parts.flatMap((a) => a.citationHallucination.invalidReferences),
    },
    completeRedline: poolComponent(parts, (a) => a.completeRedline),
    appliedTrackedChangeYield: poolComponent(parts, (a) => a.appliedTrackedChangeYield),
    precedentAdherence: poolComponent(parts, (a) => a.precedentAdherence),
    resources: {
      calls: sum((a) => a.resources.calls),
      toolCalls: sum((a) => a.resources.toolCalls),
      retries: sum((a) => a.resources.retries),
      inputTokens: sum((a) => a.resources.inputTokens),
      outputTokens: sum((a) => a.resources.outputTokens),
      cacheReadTokens: sum((a) => a.resources.cacheReadTokens),
      cacheWriteTokens: sum((a) => a.resources.cacheWriteTokens),
      costUsd: sum((a) => a.resources.costUsd),
      latencyMs: sum((a) => a.resources.latencyMs),
    },
  };
}

/** The shipped row is the latest `final*` the report carries (round 1: `final`; round 2: `final-v4`). */
export function shippedConfig(data: EvalsData): ConfigId {
  // The shipped configuration is the latest `final*` (configs.ts order) the report actually carries — round 1: final;
  // round 2: final-v2 … final-v4 (the length router). A final that regressed and was not shipped still renders, as an
  // iteration, because it stays in the ladder.
  const present = new Set<string>([
    ...data.configs.map((config) => config.id),
    ...data.tiers.flatMap((tier) => tier.configs.map((config) => config.id)),
  ]);
  const finals = configDescriptors().filter((descriptor) => descriptor.role === "final" && present.has(descriptor.id));
  return finals.length > 0 ? finals[finals.length - 1]!.id : FINAL_CONFIG;
}

/** Only one row wears the shipped accent; the superseded final drops back to an iteration. */
function descriptorsFor(data: EvalsData): ConfigDescriptor[] {
  const shipped = shippedConfig(data);
  return configDescriptors().map((descriptor) =>
    descriptor.role === "final" && descriptor.id !== shipped
      ? { ...descriptor, role: "iteration" as const }
      : descriptor,
  );
}

/** Which tiers a view is made of; "all" needs every tier present in the report. */
export function tiersInView(data: EvalsData, view: TierView): TierId[] {
  const present = (["short", "long"] as const).filter((id) => tierOf(data, id).length > 0);
  return view === "all" ? present : present.filter((id) => id === view);
}

/** The contracts a view scores over, from the data rather than a hard-coded twelve. */
export function contractIdsInView(data: EvalsData, view: TierView): string[] {
  const ids = new Set<string>();
  const tiers = tiersInView(data, view);
  if (tiers.includes("short")) for (const config of data.configs) for (const c of config.contracts) ids.add(c.id);
  for (const tier of tiers) for (const config of tierOf(data, tier)) for (const c of config.contracts) ids.add(c.id);
  if (tiers.length === 0 && view === "short") {
    for (const config of data.configs) for (const c of config.contracts) ids.add(c.id);
  }
  return [...ids].sort();
}

/**
 * The ladder for one tier view. Short prefers the round-1 result so those rows render exactly as
 * they did in round 1, and takes only the three round-2 columns from the re-scored tier run.
 */
export function tierLadderRows(data: EvalsData, view: TierView): LadderRow[] {
  const legacy = byId(data.configs);
  const short = byId(tierOf(data, "short"));
  const long = byId(tierOf(data, "long"));

  return descriptorsFor(data).map((base) => {
    if (view === "long") {
      const result = long.get(base.id);
      return result ? rowFromAggregate(base, result.aggregate, "v2", result.contracts.length) : absentRow(base);
    }
    if (view === "all") {
      const parts = [short.get(base.id), long.get(base.id)];
      if (parts.some((part) => part === undefined)) return absentRow(base);
      const present = parts as EvalConfigResult[];
      const pooled = poolAggregates(present.map((part) => part.aggregate));
      const contracts = present.reduce((total, part) => total + part.contracts.length, 0);
      return rowFromAggregate(base, pooled, "v2", contracts);
    }
    const round1 = legacy.get(base.id);
    const round2 = short.get(base.id);
    if (round1) {
      const row = rowFromAggregate(base, round1.aggregate, "v1", round1.contracts.length);
      const aggregate = round2?.aggregate;
      return {
        ...row,
        crr: aggregate?.completeRedline?.rate ?? null,
        appliedYield: aggregate?.appliedTrackedChangeYield?.rate ?? null,
        adherence: aggregate?.precedentAdherence?.rate ?? null,
      };
    }
    return round2 ? rowFromAggregate(base, round2.aggregate, "v2", round2.contracts.length) : absentRow(base);
  });
}

export interface ContractRow {
  id: string;
  kind: "cuad" | "synthetic";
  tier: TierId;
  hard: boolean;
  words: number | null;
  goldItems: number;
  /** F1 per config id; `null` when the config was not run on this contract. */
  f1: Record<string, number | null>;
}

export interface ContractGroup {
  tier: TierId;
  label: string;
  caption: string;
  rows: ContractRow[];
}

const groupCopy: Record<TierId, { label: string; caption: string }> = {
  short: {
    label: "Short tier",
    caption: "3–8k words · eight SEC-filed CUAD agreements and four seeded synthetics",
  },
  long: {
    label: "Long tier",
    caption: "37–45k words · picked by the frozen rule in the pre-registration, gold anchored on CUAD expert spans",
  },
};

function rowsForTier(
  data: EvalsData,
  tier: TierId,
  words: Readonly<Record<string, number>>,
): ContractRow[] {
  const sources = tier === "short" ? [...data.configs, ...tierOf(data, "short")] : tierOf(data, "long");
  const ids = new Set<string>();
  for (const config of sources) for (const contract of config.contracts) ids.add(contract.id);
  const rows = [...ids].sort().map((id): ContractRow => {
    const f1: Record<string, number | null> = {};
    let goldItems = 0;
    for (const config of sources) {
      const contract = config.contracts.find((candidate) => candidate.id === id);
      if (f1[config.id] === undefined || contract) f1[config.id] = contract ? contract.metrics.detection.f1 : null;
      if (contract) goldItems = Math.max(goldItems, contract.metrics.detection.tp + contract.metrics.detection.fn);
    }
    return {
      id,
      kind: id.startsWith("synth-") ? "synthetic" : "cuad",
      tier,
      hard: id === HARD_CASE_ID,
      words: words[id] ?? null,
      goldItems,
      f1,
    };
  });
  // EVAL.md §1: the hard case is the contract the pipeline was designed against, so it leads.
  return [...rows.filter((row) => row.hard), ...rows.filter((row) => !row.hard)];
}

/** Contracts × configs, grouped by tier, for the tiers the current view covers. */
export function contractGroups(
  data: EvalsData,
  view: TierView,
  words: Readonly<Record<string, number>> = {},
): ContractGroup[] {
  const tiers = tiersInView(data, view);
  const scope = tiers.length === 0 && view !== "long" ? (["short"] as TierId[]) : tiers;
  return scope.flatMap((tier) => {
    const rows = rowsForTier(data, tier, words);
    return rows.length === 0 ? [] : [{ tier, ...groupCopy[tier], rows }];
  });
}

/** Playbook elements the judge marked unmet, for the shipped config, most-missed first. */
export function elementMissRows(data: EvalsData, view: TierView, limit = 6): ElementMiss[] {
  const shipped = shippedConfig(data);
  const tiers = tiersInView(data, view);
  const rows = data.tiers
    .filter((tier) => tiers.includes(tier.id))
    .flatMap((tier) => tier.elementMisses ?? [])
    .filter((miss) => miss.configId === undefined || miss.configId === shipped);
  const merged = new Map<string, ElementMiss>();
  for (const miss of rows) {
    const key = `${miss.ruleId}::${miss.level ?? "-"}::${miss.element}`;
    const previous = merged.get(key);
    merged.set(key, previous
      ? {
          ...previous,
          unmet: previous.unmet + miss.unmet,
          eligible: previous.eligible === undefined || miss.eligible === undefined
            ? undefined
            : previous.eligible + miss.eligible,
        }
      : miss);
  }
  return [...merged.values()].sort((left, right) => right.unmet - left.unmet).slice(0, limit);
}
