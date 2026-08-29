/**
 * The shape of `evals/results/changelog-data.json` (written by `src/eval/report.ts`, served by
 * `GET /api/evals`) and the derivations the `/evals` page renders from it: the documented config
 * ladder, the headline comparison, the charts and the per-contract matrix. EVAL.md §4 and §7 define
 * every metric named here; nothing is computed in a component.
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

export interface EvalsData {
  generatedFrom?: string;
  configs: EvalConfigResult[];
}

/** The official baseline and the shipped pipeline — the two rows the headline compares. */
export const BASELINE_CONFIG: ConfigId = "b1-prompt";
export const FINAL_CONFIG: ConfigId = "final";
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

/**
 * `GET /api/evals` answers `[]` when no report has been generated yet, so an empty or unrecognised
 * payload resolves to `null` and the page falls back to its fixture.
 */
export function normalizeEvals(raw: unknown): EvalsData | null {
  if (!isRecord(raw)) return null;
  const configs = Array.isArray(raw.configs) ? raw.configs.filter(isConfigResult) : [];
  if (configs.length === 0) return null;
  return {
    generatedFrom: typeof raw.generatedFrom === "string" ? raw.generatedFrom : undefined,
    configs,
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
  "x-monolith": "removed",
  final: "final",
};

/** The stage column of IMPROVEMENT_CHANGELOG.md, so the table reads like the document. */
const stages: Record<ConfigId, string> = {
  "b0-chat": "Baseline 0",
  "b1-prompt": "Baseline",
  "i1-docmodel": "Iteration 1",
  "i2-workers": "Iteration 2",
  "i3-verifier": "Iteration 3",
  "i4-memory": "Iteration 4",
  "x-monolith": "Removed",
  final: "Final",
};

export interface LadderRow {
  id: ConfigId;
  /** "i2 · Per-rule drafter workers" → "Per-rule drafter workers". */
  label: string;
  stage: string;
  description: string;
  role: ConfigRole;
  present: boolean;
  contracts: number;
  f1: number;
  f1Micro: number;
  precision: number;
  recall: number;
  statusAccuracy: number;
  validity: number;
  minimality: number;
  hallucination: number;
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
  f1: 0,
  f1Micro: 0,
  precision: 0,
  recall: 0,
  statusAccuracy: 0,
  validity: 0,
  minimality: 0,
  hallucination: 0,
  escalations: 0,
  calls: 0,
  tokens: 0,
  cost: 0,
  latency: 0,
});

function perContract(value: number, contracts: number): number {
  return contracts === 0 ? 0 : value / contracts;
}

/** One row per documented config, in changelog order; configs with no result are marked absent. */
export function ladderRows(data: EvalsData): LadderRow[] {
  const byId = new Map(data.configs.map((config) => [config.id, config]));
  return configCatalog.map((entry) => {
    const base = {
      id: entry.id,
      label: shortLabel(entry.label),
      stage: stages[entry.id],
      description: entry.description,
      role: roles[entry.id],
    };
    const result = byId.get(entry.id);
    if (!result) return { ...base, ...emptyRow() };
    const aggregate = result.aggregate;
    const contracts = aggregate.contracts || result.contracts.length;
    const resources = aggregate.resources;
    return {
      ...base,
      present: true,
      contracts,
      f1: aggregate.detection.macro.f1,
      f1Micro: aggregate.detection.micro.f1,
      precision: aggregate.detection.macro.precision,
      recall: aggregate.detection.macro.recall,
      statusAccuracy: aggregate.deviationAccuracy.accuracy,
      validity: aggregate.redlineValidity.rate,
      minimality: aggregate.minimality.rate,
      hallucination: aggregate.citationHallucination.rate,
      escalations: aggregate.detection.micro.escalations,
      calls: perContract(resources.calls, contracts),
      tokens: perContract(resources.inputTokens + resources.outputTokens, contracts),
      cost: perContract(resources.costUsd, contracts),
      latency: perContract(resources.latencyMs, contracts),
    };
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
  | "calls"
  | "tokens"
  | "cost";

export interface MetricColumn {
  key: MetricKey;
  label: string;
  hint: string;
  group: "quality" | "resources";
  higherIsBetter: boolean;
  format: (value: number) => string;
  primary?: boolean;
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

/** Primary metric first (EVAL.md §4), quality before resources. */
export const metricColumns: MetricColumn[] = [
  { key: "f1", label: "F1 macro", hint: "Issue-detection F1 against gold, macro-averaged over contracts — the primary metric.", group: "quality", higherIsBetter: true, format: (v) => percent(v), primary: true },
  { key: "f1Micro", label: "F1 micro", hint: "The same F1 pooled over every gold item instead of averaged per contract.", group: "quality", higherIsBetter: true, format: (v) => percent(v) },
  { key: "precision", label: "Precision", hint: "Share of raised findings that match a gold deviation or missing clause.", group: "quality", higherIsBetter: true, format: (v) => percent(v) },
  { key: "recall", label: "Recall", hint: "Share of gold deviations and missing clauses the run found.", group: "quality", higherIsBetter: true, format: (v) => percent(v) },
  { key: "statusAccuracy", label: "Status acc.", hint: "Of the gold items located, the share given the correct status.", group: "quality", higherIsBetter: true, format: (v) => percent(v) },
  { key: "validity", label: "Redline validity", hint: "Proposals that apply cleanly, pass the rule checks and satisfy the independent judge.", group: "quality", higherIsBetter: true, format: (v) => percent(v) },
  { key: "minimality", label: "Minimality", hint: "Proposals the judge calls minimal with a changed-character ratio at or below 0.6.", group: "quality", higherIsBetter: true, format: (v) => percent(v) },
  { key: "hallucination", label: "Citation halluc.", hint: "Section references in rationales, comments and the memo that do not exist in the document. Lower is better.", group: "quality", higherIsBetter: false, format: (v) => percent(v, 1) },
  { key: "calls", label: "LLM calls", hint: "Model calls per contract.", group: "resources", higherIsBetter: false, format: (v) => v.toFixed(0) },
  { key: "tokens", label: "Tokens", hint: "Input plus output tokens per contract (cache reads excluded).", group: "resources", higherIsBetter: false, format: compact },
  { key: "cost", label: "$ / contract", hint: "Recorded cost of the live run, per contract. Replay is free.", group: "resources", higherIsBetter: false, format: (v) => money(v) },
];

/** The best value in each column, so the table can emphasise it without a component doing maths. */
export function bestByColumn(rows: readonly LadderRow[]): Record<MetricKey, number | null> {
  const present = rows.filter((row) => row.present);
  const entries = metricColumns.map((column) => {
    if (present.length === 0) return [column.key, null] as const;
    const values = present.map((row) => row[column.key]);
    return [column.key, column.higherIsBetter ? Math.max(...values) : Math.min(...values)] as const;
  });
  return Object.fromEntries(entries) as Record<MetricKey, number | null>;
}

export interface ContractRow {
  id: string;
  kind: "cuad" | "synthetic";
  hard: boolean;
  /** F1 per config id; `null` when the config was not run on this contract. */
  f1: Record<string, number | null>;
  goldItems: number;
}

/** Contracts × configs, F1 per cell, with the hard case pinned to the top (EVAL.md §1). */
export function contractRows(data: EvalsData): ContractRow[] {
  const ids = new Set<string>();
  for (const config of data.configs) for (const contract of config.contracts) ids.add(contract.id);
  const rows = [...ids].sort().map((id) => {
    const f1: Record<string, number | null> = {};
    let goldItems = 0;
    for (const config of data.configs) {
      const contract = config.contracts.find((candidate) => candidate.id === id);
      f1[config.id] = contract ? contract.metrics.detection.f1 : null;
      if (contract) {
        const detection = contract.metrics.detection;
        goldItems = Math.max(goldItems, detection.tp + detection.fn);
      }
    }
    return { id, kind: id.startsWith("cuad-") ? ("cuad" as const) : ("synthetic" as const), hard: id === HARD_CASE_ID, f1, goldItems };
  });
  return [...rows.filter((row) => row.hard), ...rows.filter((row) => !row.hard)];
}

export interface Headline {
  label: string;
  hint: string;
  baseline: string;
  final: string;
  /** Signed delta in the direction that is good, already formatted. */
  delta: string;
  improved: boolean;
  primary?: boolean;
}

function deltaLabel(baseline: number, final: number, higherIsBetter: boolean, format: (v: number) => string): {
  delta: string;
  improved: boolean;
} {
  const difference = final - baseline;
  const improved = higherIsBetter ? difference > 0 : difference < 0;
  const sign = difference > 0 ? "+" : difference < 0 ? "−" : "";
  return { delta: `${sign}${format(Math.abs(difference))}`, improved };
}

const headlineLabels: Partial<Record<MetricKey, string>> = {
  f1: "Issue-detection F1",
  validity: "Redline validity",
  hallucination: "Citation hallucinations",
  cost: "Cost per contract",
};

/** Baseline (`b1-prompt`) versus the shipped pipeline for the four numbers that decide the story. */
export function headlines(rows: readonly LadderRow[]): Headline[] {
  const baseline = rows.find((row) => row.id === BASELINE_CONFIG);
  const final = rows.find((row) => row.id === FINAL_CONFIG);
  if (!baseline || !final) return [];
  const keys: MetricKey[] = ["f1", "validity", "hallucination", "cost"];
  return keys.flatMap((key) => {
    const column = metricColumns.find((candidate) => candidate.key === key);
    if (!column) return [];
    // Rates move in percentage points; money moves in money.
    const deltaFormat = key === "cost" ? column.format : (value: number) => `${(value * 100).toFixed(1)} pts`;
    const { delta, improved } = deltaLabel(baseline[key], final[key], column.higherIsBetter, deltaFormat);
    return [
      {
        label: headlineLabels[column.key] ?? column.label,
        hint: column.hint,
        baseline: column.format(baseline[key]),
        final: column.format(final[key]),
        delta,
        improved,
        primary: column.primary,
      },
    ];
  });
}
