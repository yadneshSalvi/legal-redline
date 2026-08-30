/**
 * The shape of `evals/results/changelog-data.json` (written by `src/eval/report.ts`, served by
 * `GET /api/evals`) and the derivations the `/evals` page renders from it: the documented config
 * ladder, the charts and the metric columns. EVAL.md §4, §7 and §9 define every metric named here;
 * nothing is computed in a component.
 *
 * Round 2 added `tiers[]` beside the round-1 `configs[]`. The tier-aware derivations live in
 * `./evals-round2`; this module owns the payload shape, the column catalogue and the row builder
 * both of them share.
 */
import type { ConfigId } from "@/src/agent/types";
import type { AggregateMetrics, ContractMetrics } from "@/src/eval/metrics";
import { configCatalog } from "./configs";

export interface EvalContractResult {
  id: string;
  metrics: ContractMetrics;
}

export interface EvalConfigResult {
  id: string;
  aggregate: AggregateMetrics;
  contracts: EvalContractResult[];
}

/** `short` = the twelve round-1 contracts (`cuad-*`, `synth-*`); `long` = the six `long-*` ones. */
export type TierId = "short" | "long";

/**
 * A playbook position element the judge marked unmet, aggregated over a tier. Optional in the
 * payload: `pnpm report` does not write it yet, and the panel that reads it is omitted when it is
 * absent rather than inventing rows.
 */
export interface ElementMiss {
  ruleId: string;
  ruleTitle?: string;
  element: string;
  level?: "preferred" | "fallback";
  /** Judged occurrences of the element, when the report supplies a denominator. */
  eligible?: number;
  unmet: number;
  /** Present when the report breaks misses down per configuration. */
  configId?: string;
}

export interface EvalTierResult {
  id: TierId;
  configs: EvalConfigResult[];
  elementMisses?: ElementMiss[];
}

export interface EvalsData {
  generatedFrom?: string;
  configs: EvalConfigResult[];
  tiers: EvalTierResult[];
}

/** The official baseline and the shipped pipeline — the two rows the headline compares. */
export const BASELINE_CONFIG: ConfigId = "b1-prompt";
export const FINAL_CONFIG: ConfigId = "final";
/** Round 2's shipped candidate; the headline prefers it whenever the report contains it. */
export const FINAL_V2_CONFIG: ConfigId = "final-v2";
export const HARD_CASE_ID = "synth-hardcase";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isConfigResult(value: unknown): value is EvalConfigResult {
  return (
    isRecord(value) &&
    typeof value.id === "string" &&
    isRecord(value.aggregate) &&
    Array.isArray(value.contracts)
  );
}

function text(value: unknown): string | undefined {
  return typeof value === "string" && value.trim().length > 0 ? value : undefined;
}

function count(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) && value >= 0 ? value : undefined;
}

/**
 * `elementMisses` is not in the report contract yet, so it is read leniently: a row needs an element
 * and a miss count, everything else is optional and anything unrecognised is dropped.
 */
function normalizeElementMisses(raw: unknown): ElementMiss[] | undefined {
  if (!Array.isArray(raw)) return undefined;
  const rows = raw.flatMap((entry): ElementMiss[] => {
    if (!isRecord(entry)) return [];
    const element = text(entry.element) ?? text(entry.label) ?? text(entry.text);
    const unmet = count(entry.unmet) ?? count(entry.misses) ?? count(entry.missed) ?? count(entry.failing);
    if (element === undefined || unmet === undefined) return [];
    const level = entry.level === "preferred" || entry.level === "fallback" ? entry.level : undefined;
    return [{
      ruleId: text(entry.ruleId) ?? text(entry.rule) ?? "—",
      ruleTitle: text(entry.ruleTitle) ?? text(entry.title),
      element,
      level,
      eligible: count(entry.eligible) ?? count(entry.judged) ?? count(entry.total),
      unmet,
      configId: text(entry.configId) ?? text(entry.config),
    }];
  });
  return rows.length === 0 ? undefined : rows;
}

function normalizeTier(value: unknown): EvalTierResult[] {
  if (!isRecord(value)) return [];
  if (value.id !== "short" && value.id !== "long") return [];
  const configs = Array.isArray(value.configs) ? value.configs.filter(isConfigResult) : [];
  if (configs.length === 0) return [];
  const elementMisses = normalizeElementMisses(value.elementMisses);
  return [{ id: value.id, configs, ...(elementMisses ? { elementMisses } : {}) }];
}

/**
 * `GET /api/evals` answers `[]` when no report has been generated yet, so an empty or unrecognised
 * payload resolves to `null` and the page falls back to its fixture.
 */
export function normalizeEvals(raw: unknown): EvalsData | null {
  if (!isRecord(raw)) return null;
  const configs = Array.isArray(raw.configs) ? raw.configs.filter(isConfigResult) : [];
  const tiers = Array.isArray(raw.tiers) ? raw.tiers.flatMap(normalizeTier) : [];
  if (configs.length === 0 && tiers.length === 0) return null;
  return {
    generatedFrom: typeof raw.generatedFrom === "string" ? raw.generatedFrom : undefined,
    configs,
    tiers,
  };
}

export type ConfigRole = "chat" | "baseline" | "iteration" | "removed" | "final";

const roles: Record<ConfigId, ConfigRole> = {
  "b0-chat": "chat",
  "b1-prompt": "baseline",
  "i1-docmodel": "iteration",
  "i2-workers": "iteration",
  "i3-verifier": "iteration",
  "i4-memory": "iteration",
  "i5-elements": "iteration",
  "i6-longdoc": "iteration",
  "i7-precise": "iteration",
  "x-monolith": "removed",
  final: "final",
  "final-v2": "final",
  "final-v3": "final",
  "final-v4": "final",
};

/** The stage column of IMPROVEMENT_CHANGELOG.md, so the table reads like the document. */
const stages: Record<ConfigId, string> = {
  "b0-chat": "Baseline 0",
  "b1-prompt": "Baseline",
  "i1-docmodel": "Iteration 1",
  "i2-workers": "Iteration 2",
  "i3-verifier": "Iteration 3",
  "i4-memory": "Iteration 4",
  "i5-elements": "Iteration 5",
  "i6-longdoc": "Iteration 6",
  "i7-precise": "Iteration 7",
  "x-monolith": "Removed",
  final: "Final",
  "final-v2": "Final v2",
  "final-v3": "Final v3",
  "final-v4": "Final v4 · length router (i7 below 15k words, i6 above)",
};

/** Which independent judge scored the judge-dependent columns of a row (EVAL.md §9). */
export type JudgeVersion = "v1" | "v2";

export interface LadderRow {
  id: ConfigId;
  /** "i2 · Per-rule drafter workers" → "Per-rule drafter workers". */
  label: string;
  stage: string;
  description: string;
  role: ConfigRole;
  present: boolean;
  contracts: number;
  judge: JudgeVersion;
  f1: number;
  f1Micro: number;
  precision: number;
  recall: number;
  statusAccuracy: number;
  validity: number;
  minimality: number;
  hallucination: number;
  /** Round-2 metrics: `null` when this configuration was not scored for them. */
  crr: number | null;
  appliedYield: number | null;
  adherence: number | null;
  escalations: number;
  calls: number;
  tokens: number;
  cost: number;
  latency: number;
}

function shortLabel(label: string): string {
  const parts = label.split(" · ");
  return parts.length > 1 ? parts[1] : label;
}

const emptyRow = (): Omit<LadderRow, "id" | "label" | "stage" | "description" | "role"> => ({
  present: false,
  contracts: 0,
  judge: "v1",
  f1: 0,
  f1Micro: 0,
  precision: 0,
  recall: 0,
  statusAccuracy: 0,
  validity: 0,
  minimality: 0,
  hallucination: 0,
  crr: null,
  appliedYield: null,
  adherence: null,
  escalations: 0,
  calls: 0,
  tokens: 0,
  cost: 0,
  latency: 0,
});

function perContract(value: number, contracts: number): number {
  return contracts === 0 ? 0 : value / contracts;
}

export interface ConfigDescriptor {
  id: ConfigId;
  label: string;
  stage: string;
  description: string;
  role: ConfigRole;
}

/** Every documented config in `src/agent/configs.ts` order, which is the changelog's order. */
export function configDescriptors(): ConfigDescriptor[] {
  return configCatalog.map((entry) => ({
    id: entry.id,
    label: shortLabel(entry.label),
    stage: stages[entry.id],
    description: entry.description,
    role: roles[entry.id],
  }));
}

/** One ladder row from one aggregate. `fallbackContracts` covers reports without `contracts`. */
export function rowFromAggregate(
  base: ConfigDescriptor,
  aggregate: AggregateMetrics,
  judge: JudgeVersion,
  fallbackContracts: number,
): LadderRow {
  const contracts = aggregate.contracts || fallbackContracts;
  const resources = aggregate.resources;
  return {
    ...base,
    present: true,
    contracts,
    judge,
    f1: aggregate.detection.macro.f1,
    f1Micro: aggregate.detection.micro.f1,
    precision: aggregate.detection.macro.precision,
    recall: aggregate.detection.macro.recall,
    statusAccuracy: aggregate.deviationAccuracy.accuracy,
    validity: aggregate.redlineValidity.rate,
    minimality: aggregate.minimality.rate,
    hallucination: aggregate.citationHallucination.rate,
    crr: aggregate.completeRedline?.rate ?? null,
    appliedYield: aggregate.appliedTrackedChangeYield?.rate ?? null,
    adherence: aggregate.precedentAdherence?.rate ?? null,
    escalations: aggregate.detection.micro.escalations,
    calls: perContract(resources.calls, contracts),
    tokens: perContract(resources.inputTokens + resources.outputTokens, contracts),
    cost: perContract(resources.costUsd, contracts),
    latency: perContract(resources.latencyMs, contracts),
  };
}

export function absentRow(base: ConfigDescriptor): LadderRow {
  return { ...base, ...emptyRow() };
}

/**
 * The round-1 ladder: one row per documented config from `configs[]`, in changelog order, scored by
 * judge v1. Configs with no result are marked absent.
 */
export function ladderRows(data: EvalsData): LadderRow[] {
  const byId = new Map(data.configs.map((config) => [config.id, config]));
  return configDescriptors().map((base) => {
    const result = byId.get(base.id);
    if (!result) return absentRow(base);
    return rowFromAggregate(base, result.aggregate, "v1", result.contracts.length);
  });
}

export type MetricKey =
  | "f1"
  | "f1Micro"
  | "precision"
  | "recall"
  | "statusAccuracy"
  | "validity"
  | "minimality"
  | "hallucination"
  | "crr"
  | "appliedYield"
  | "adherence"
  | "calls"
  | "tokens"
  | "cost";

export interface MetricColumn {
  key: MetricKey;
  label: string;
  hint: string;
  group: "quality" | "redline" | "resources";
  higherIsBetter: boolean;
  format: (value: number) => string;
  primary?: boolean;
  /** Scored by the independent judge, so its value depends on the judge version of the row. */
  judged?: boolean;
}

export function percent(value: number, digits = 1): string {
  return `${(value * 100).toFixed(digits)}%`;
}

export function money(value: number, digits = 2): string {
  return `$${value.toFixed(digits)}`;
}

export function compact(value: number): string {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${Math.round(value / 1_000)}k`;
  return `${Math.round(value)}`;
}

export function seconds(ms: number): string {
  return ms >= 60_000 ? `${Math.round(ms / 60_000)}m ${Math.round((ms % 60_000) / 1000)}s` : `${Math.round(ms / 1000)}s`;
}

/** Primary metric first (EVAL.md §4), round-1 quality, then the round-2 redline block, then cost. */
export const metricColumns: MetricColumn[] = [
  { key: "f1", label: "F1 macro", hint: "Issue-detection F1 against gold, macro-averaged over contracts — round 1's primary metric.", group: "quality", higherIsBetter: true, format: (v) => percent(v), primary: true },
  { key: "f1Micro", label: "F1 micro", hint: "The same F1 pooled over every gold item instead of averaged per contract.", group: "quality", higherIsBetter: true, format: (v) => percent(v) },
  { key: "precision", label: "Precision", hint: "Share of raised findings that match a gold deviation or missing clause.", group: "quality", higherIsBetter: true, format: (v) => percent(v) },
  { key: "recall", label: "Recall", hint: "Share of gold deviations and missing clauses the run found.", group: "quality", higherIsBetter: true, format: (v) => percent(v) },
  { key: "statusAccuracy", label: "Status acc.", hint: "Of the gold items located, the share given the correct status.", group: "quality", higherIsBetter: true, format: (v) => percent(v) },
  { key: "validity", label: "Redline validity", hint: "Proposals that apply cleanly, pass the rule checks and satisfy the independent judge.", group: "quality", higherIsBetter: true, format: (v) => percent(v), judged: true },
  { key: "minimality", label: "Minimality", hint: "Proposals the judge calls minimal with a changed-character ratio at or below 0.6.", group: "quality", higherIsBetter: true, format: (v) => percent(v), judged: true },
  { key: "hallucination", label: "Citation halluc.", hint: "Section references in rationales, comments and the memo that do not exist in the document. Lower is better.", group: "quality", higherIsBetter: false, format: (v) => percent(v, 1) },
  { key: "crr", label: "CRR", hint: "Complete redline rate: gold items whose matched proposal meets every element of the preferred or fallback position, validates, is judge-minimal and intent-preserving (EVAL.md §9).", group: "redline", higherIsBetter: true, format: (v) => percent(v), primary: true },
  { key: "appliedYield", label: "Applied yield", hint: "Gold items whose complete proposal survives into the system's own accept-all tracked-change document and passes package, collateral, change-count and LibreOffice validation.", group: "redline", higherIsBetter: true, format: (v) => percent(v) },
  { key: "adherence", label: "Adherence", hint: "Precedent adherence: matched proposals on seeded rules whose operative text reaches 0.60 token-set Jaccard against approved language.", group: "redline", higherIsBetter: true, format: (v) => percent(v) },
  { key: "calls", label: "LLM calls", hint: "Model calls per contract.", group: "resources", higherIsBetter: false, format: (v) => v.toFixed(0) },
  { key: "tokens", label: "Tokens", hint: "Input plus output tokens per contract (cache reads excluded).", group: "resources", higherIsBetter: false, format: compact },
  { key: "cost", label: "$ / contract", hint: "Recorded cost of the live run, per contract. Replay is free.", group: "resources", higherIsBetter: false, format: (v) => money(v) },
];

/** The best value in each column, so the table can emphasise it without a component doing maths. */
export function bestByColumn(rows: readonly LadderRow[]): Record<MetricKey, number | null> {
  const present = rows.filter((row) => row.present);
  const entries = metricColumns.map((column) => {
    const values = present
      .map((row) => row[column.key])
      .filter((value): value is number => value !== null);
    // Nothing is "best" when every configuration tied — a column of zeroes washed green is a lie.
    if (new Set(values).size < 2) return [column.key, null] as const;
    return [column.key, column.higherIsBetter ? Math.max(...values) : Math.min(...values)] as const;
  });
  return Object.fromEntries(entries) as Record<MetricKey, number | null>;
}
