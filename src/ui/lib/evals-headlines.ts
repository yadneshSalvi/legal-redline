/**
 * The headline strip: baseline versus the shipped pipeline on the numbers that decide the story.
 * Round 2 leads with the complete-redline rate; round-1-only reports fall back to the four cards
 * the changelog was originally judged on.
 */
import {
  BASELINE_CONFIG,
  FINAL_CONFIG,
  metricColumns,
  type EvalsData,
  type LadderRow,
  type MetricKey,
} from "./evals";
import { contractIdsInView, shippedConfig, tierLabels, tierLadderRows, tiersInView, type TierView } from "./evals-round2";

export interface Headline {
  label: string;
  hint: string;
  scope: string;
  baselineId: string;
  finalId: string;
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
  crr: "Complete redline rate",
  appliedYield: "Applied tracked-change yield",
  validity: "Redline validity",
  hallucination: "Citation hallucinations",
  cost: "Cost per contract",
};

function card(
  rows: readonly LadderRow[],
  key: MetricKey,
  scope: string,
  finalId: string,
  label?: string,
): Headline[] {
  const column = metricColumns.find((candidate) => candidate.key === key);
  const baseline = rows.find((row) => row.id === BASELINE_CONFIG);
  const final = rows.find((row) => row.id === finalId);
  if (!column || !baseline?.present || !final?.present) return [];
  const from = baseline[key];
  const to = final[key];
  if (from === null || to === null) return [];
  // Rates move in percentage points; money moves in money.
  const deltaFormat = key === "cost" ? column.format : (value: number) => `${(value * 100).toFixed(1)} pts`;
  const { delta, improved } = deltaLabel(from, to, column.higherIsBetter, deltaFormat);
  return [{
    label: label ?? headlineLabels[key] ?? column.label,
    hint: column.hint,
    scope,
    baselineId: baseline.id,
    finalId: final.id,
    baseline: column.format(from),
    final: column.format(to),
    delta,
    improved,
    primary: key === "crr",
  }];
}

function scopeLabel(data: EvalsData, view: TierView): string {
  const count = contractIdsInView(data, view).length;
  return `${tierLabels[view].toLowerCase()} · ${count} contract${count === 1 ? "" : "s"}`;
}

/**
 * The round-2 story in four cards: what fraction of issues get a redline a lawyer could sign, how
 * detection holds up on long documents, how much of that redline survives into Word, and the
 * round-1 headline kept in view.
 */
export function tierHeadlines(data: EvalsData): Headline[] {
  if (data.tiers.length === 0) return [];
  const finalId = shippedConfig(data);
  const pooledView: TierView = tiersInView(data, "all").length > 1 ? "all" : "short";
  const pooled = tierLadderRows(data, pooledView);
  const long = tierLadderRows(data, "long");
  const short = tierLadderRows(data, "short");
  return [
    ...card(pooled, "crr", scopeLabel(data, pooledView), finalId),
    ...card(long, "f1", scopeLabel(data, "long"), finalId, "Long-document F1"),
    ...card(pooled, "appliedYield", scopeLabel(data, pooledView), finalId),
    ...card(short, "f1", scopeLabel(data, "short"), finalId, "Issue-detection F1"),
  ];
}

/** Round-1 fallback: the four numbers the changelog was judged on before the tiers existed. */
export function legacyHeadlines(rows: readonly LadderRow[], scope: string): Headline[] {
  const keys: MetricKey[] = ["f1", "validity", "hallucination", "cost"];
  return keys.flatMap((key) => card(rows, key, scope, FINAL_CONFIG));
}
