import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";

import type { ConfigEvaluationResult, ContractEvaluationResult } from "@/src/eval/runner";

const CONFIG_ORDER = ["b0-chat", "b1-prompt", "i1-docmodel", "i2-workers", "i3-verifier", "i4-memory", "x-monolith", "final"];

function percent(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

function signedPoints(value: number): string {
  return `${value >= 0 ? "+" : ""}${(value * 100).toFixed(1)} pp`;
}

function money(value: number): string {
  return `$${value.toFixed(4)}`;
}

function signedMoney(value: number): string {
  return `${value >= 0 ? "+" : "−"}$${Math.abs(value).toFixed(4)}`;
}

function perContractCost(result: ConfigEvaluationResult): number {
  return result.aggregate.contracts === 0 ? 0 : result.aggregate.resources.costUsd / result.aggregate.contracts;
}

function evidence(result: ConfigEvaluationResult): string {
  const aggregate = result.aggregate;
  return `${percent(aggregate.detection.macro.f1)} · ${percent(aggregate.redlineValidity.rate)} · ${percent(aggregate.citationHallucination.rate)} · ${money(perContractCost(result))}`;
}

export async function loadEvaluationResults(root: string): Promise<ConfigEvaluationResult[]> {
  let files: string[];
  try {
    files = (await readdir(root)).filter((file) => file.endsWith(".json") && file !== "changelog-data.json").sort();
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") return [];
    throw error;
  }
  const results: ConfigEvaluationResult[] = [];
  for (const file of files) {
    const value = JSON.parse(await readFile(join(root, file), "utf8")) as Partial<ConfigEvaluationResult>;
    if (typeof value.config === "string" && Array.isArray(value.contracts) && value.aggregate !== undefined) {
      results.push(value as ConfigEvaluationResult);
    }
  }
  return results.sort((left, right) => {
    const leftIndex = CONFIG_ORDER.indexOf(left.config);
    const rightIndex = CONFIG_ORDER.indexOf(right.config);
    return (leftIndex < 0 ? CONFIG_ORDER.length : leftIndex) - (rightIndex < 0 ? CONFIG_ORDER.length : rightIndex) ||
      left.config.localeCompare(right.config);
  });
}

function integrity(result: ConfigEvaluationResult): string {
  const attempted = result.contracts.filter((contract) => contract.metrics.integrity?.attempted === true);
  if (attempted.length === 0) return "n/a";
  const passing = attempted.filter((contract) => contract.metrics.integrity?.ok === true).length;
  return `${passing}/${attempted.length} pass`;
}

function learning(current: ConfigEvaluationResult, reference: ConfigEvaluationResult): string {
  return [
    `Versus \`${reference.config}\`: macro F1 ${signedPoints(current.aggregate.detection.macro.f1 - reference.aggregate.detection.macro.f1)},`,
    `validity ${signedPoints(current.aggregate.redlineValidity.rate - reference.aggregate.redlineValidity.rate)},`,
    `hallucination ${signedPoints(current.aggregate.citationHallucination.rate - reference.aggregate.citationHallucination.rate)},`,
    `cost ${signedMoney(perContractCost(current) - perContractCost(reference))}/contract.`,
  ].join(" ");
}

function hardCase(results: readonly ConfigEvaluationResult[]): string | undefined {
  const rows = results.flatMap((result) => result.contracts
    .filter((contract) => contract.contractId === "synth-hardcase")
    .map((contract) => `| \`${result.config}\` | ${contract.metrics.detection.tp} | ${contract.metrics.detection.fp} | ${contract.metrics.detection.fn} | ${percent(contract.metrics.detection.f1)} | ${percent(contract.metrics.deviationAccuracy.accuracy)} |`));
  if (rows.length === 0) return undefined;
  return [
    "| Config | TP | FP | FN | F1 | Status accuracy |",
    "|---|---:|---:|---:|---:|---:|",
    ...rows,
  ].join("\n");
}

function failureMode(final: ConfigEvaluationResult): string | undefined {
  const worst = [...final.contracts].sort((left, right) =>
    left.metrics.detection.f1 - right.metrics.detection.f1 || left.contractId.localeCompare(right.contractId))[0];
  if (worst === undefined) return undefined;
  return `The weakest final-run contract is \`${worst.contractId}\` at ${percent(worst.metrics.detection.f1)} F1 (${worst.metrics.detection.fp} FP, ${worst.metrics.detection.fn} FN); inspect its per-finding judgements in \`evals/results/final.json\`.`;
}

function hotTake(final: ConfigEvaluationResult, baseline: ConfigEvaluationResult): string {
  const f1 = signedPoints(final.aggregate.detection.macro.f1 - baseline.aggregate.detection.macro.f1);
  const validity = signedPoints(final.aggregate.redlineValidity.rate - baseline.aggregate.redlineValidity.rate);
  return `Agent count is not the result: accountable tool boundaries and independent verification are. Against the one-prompt baseline, the final pipeline moves macro F1 by ${f1} and valid redlines by ${validity}; the trajectory shows where those changes came from.`;
}

interface Replacement {
  value?: string;
  missingConfigs?: string[];
}

export function resultReplacements(results: readonly ConfigEvaluationResult[]): Map<string, Replacement> {
  const byId = new Map(results.map((result) => [result.config, result]));
  const replacement = new Map<string, Replacement>();
  const configTokens: Array<[string, string]> = [
    ["B0", "b0-chat"], ["B1", "b1-prompt"], ["I1", "i1-docmodel"], ["I2", "i2-workers"],
    ["I3", "i3-verifier"], ["I4", "i4-memory"], ["X", "x-monolith"], ["FINAL", "final"],
  ];
  for (const [token, id] of configTokens) {
    const result = byId.get(id);
    replacement.set(`${token}_ROW`, result === undefined ? { missingConfigs: [id] } : { value: evidence(result) });
  }
  const learningReferences: Array<[string, string, string]> = [
    ["B0_LEARN", "b0-chat", "b0-chat"], ["B1_LEARN", "b1-prompt", "b0-chat"],
    ["I1_LEARN", "i1-docmodel", "b1-prompt"], ["I2_LEARN", "i2-workers", "i1-docmodel"],
    ["I3_LEARN", "i3-verifier", "i2-workers"], ["I4_LEARN", "i4-memory", "i3-verifier"],
    ["X_LEARN", "x-monolith", "i2-workers"], ["FINAL_LEARN", "final", "b1-prompt"],
  ];
  for (const [token, id, referenceId] of learningReferences) {
    const current = byId.get(id);
    const reference = byId.get(referenceId);
    if (id === referenceId && current !== undefined) replacement.set(token, { value: "Reference point for subsequent measured iterations." });
    else replacement.set(token, current !== undefined && reference !== undefined
      ? { value: learning(current, reference) }
      : { missingConfigs: [...new Set([id, referenceId].filter((config) => !byId.has(config)))] });
  }
  const baseline = byId.get("b1-prompt");
  const final = byId.get("final");
  const direct: Array<[string, ConfigEvaluationResult | undefined, (result: ConfigEvaluationResult) => string]> = [
    ["B1_F1", baseline, (result) => percent(result.aggregate.detection.macro.f1)],
    ["B1_VALID", baseline, (result) => percent(result.aggregate.redlineValidity.rate)],
    ["B1_HALL", baseline, (result) => percent(result.aggregate.citationHallucination.rate)],
    ["B1_COST", baseline, (result) => money(perContractCost(result))],
    ["FINAL_F1", final, (result) => percent(result.aggregate.detection.macro.f1)],
    ["FINAL_VALID", final, (result) => percent(result.aggregate.redlineValidity.rate)],
    ["FINAL_HALL", final, (result) => percent(result.aggregate.citationHallucination.rate)],
    ["FINAL_COST", final, (result) => money(perContractCost(result))],
    ["FINAL_INTEGRITY", final, integrity],
  ];
  for (const [token, result, render] of direct) {
    replacement.set(token, result === undefined ? { missingConfigs: [token.startsWith("B1") ? "b1-prompt" : "final"] } : { value: render(result) });
  }
  const comparisons: Array<[string, ((left: ConfigEvaluationResult, right: ConfigEvaluationResult) => string)]> = [
    ["F1_DELTA", (left, right) => signedPoints(right.aggregate.detection.macro.f1 - left.aggregate.detection.macro.f1)],
    ["VALID_DELTA", (left, right) => signedPoints(right.aggregate.redlineValidity.rate - left.aggregate.redlineValidity.rate)],
    ["HALL_DELTA", (left, right) => signedPoints(right.aggregate.citationHallucination.rate - left.aggregate.citationHallucination.rate)],
    ["COST_DELTA", (left, right) => signedMoney(perContractCost(right) - perContractCost(left))],
  ];
  for (const [token, render] of comparisons) replacement.set(token, baseline !== undefined && final !== undefined
    ? { value: render(baseline, final) }
    : { missingConfigs: ["b1-prompt", "final"].filter((config) => !byId.has(config)) });
  const missingHardCaseConfigs = CONFIG_ORDER.filter((config) => !byId.has(config));
  const hardCaseValue = hardCase(results);
  replacement.set("HARD_CASE_ANALYSIS", missingHardCaseConfigs.length === 0 && hardCaseValue !== undefined
    ? { value: hardCaseValue }
    : { missingConfigs: missingHardCaseConfigs.length > 0 ? missingHardCaseConfigs : ["a config with synth-hardcase"] });
  replacement.set("FAILURE_MODE", final === undefined ? { missingConfigs: ["final"] } : { value: failureMode(final) });
  replacement.set("HOT_TAKE", baseline === undefined || final === undefined
    ? { missingConfigs: ["b1-prompt", "final"].filter((config) => !byId.has(config)) }
    : { value: hotTake(final, baseline) });
  replacement.set("FAILURE_MODE_AND_HOT_TAKE", baseline !== undefined && final !== undefined
    ? { value: `${failureMode(final) ?? ""}\n\n${hotTake(final, baseline)}` }
    : { missingConfigs: ["b1-prompt", "final"].filter((config) => !byId.has(config)) });
  return replacement;
}

export function replaceResultPlaceholders(
  document: string,
  replacements: ReadonlyMap<string, Replacement>,
  filename: string,
): { document: string; warnings: string[] } {
  const warnings: string[] = [];
  const rendered = document.replace(/\{\{([A-Z0-9_]+)\}\}/gu, (placeholder, token: string) => {
    const replacement = replacements.get(token);
    if (replacement === undefined) return placeholder;
    if (replacement.value === undefined) {
      warnings.push(`${filename}: left ${placeholder}; missing ${replacement.missingConfigs?.join(", ") ?? "evidence"}.`);
      return placeholder;
    }
    return replacement.value;
  });
  return { document: rendered, warnings };
}

function resultRow(contract: ContractEvaluationResult): string {
  const metrics = contract.metrics;
  return `| ${contract.contractId} | ${metrics.detection.tp} | ${metrics.detection.fp} | ${metrics.detection.fn} | ${metrics.detection.escalations} | ${percent(metrics.detection.precision)} | ${percent(metrics.detection.recall)} | ${percent(metrics.detection.f1)} | ${percent(metrics.deviationAccuracy.accuracy)} | ${percent(metrics.redlineValidity.valid.rate)} | ${percent(metrics.minimality.rate)} | ${percent(metrics.citations.rate)} | ${metrics.integrity?.ok === true ? "pass" : metrics.integrity?.attempted === true ? "fail" : "—"} |`;
}

function resourceRow(contract: ContractEvaluationResult): string {
  const value = contract.metrics.resources;
  return `| ${contract.contractId} | ${value.calls} | ${value.toolCalls} | ${value.retries} | ${value.inputTokens} | ${value.outputTokens} | ${value.cacheReadTokens} | ${value.cacheWriteTokens} | ${money(value.costUsd)} | ${(value.latencyMs / 1_000).toFixed(1)} s |`;
}

export function renderFullResults(results: readonly ConfigEvaluationResult[]): string {
  const sections = results.flatMap((result) => [
    `## ${result.config}`,
    "",
    `Aggregate evidence: ${evidence(result)} (macro F1 · validity · hallucination · cost/contract).`,
    "",
    "### Per-contract quality",
    "",
    "| Contract | TP | FP | FN | Esc. | Precision | Recall | F1 | Status accuracy | Validity | Minimality | Hallucination | Integrity |",
    "|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|",
    ...result.contracts.map(resultRow),
    "",
    "### Per-contract resources",
    "",
    "| Contract | Calls | Tools | Retries | Input tokens | Output tokens | Cache read | Cache write | Cost | Latency |",
    "|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|",
    ...result.contracts.map(resourceRow),
    "",
  ]);
  return [
    "# Full evaluation results",
    "",
    "Generated deterministically from `evals/results/*.json` by `pnpm render-docs`. Percentages use the unrounded JSON values.",
    "",
    ...sections,
  ].join("\n");
}
