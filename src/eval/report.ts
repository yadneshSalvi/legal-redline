import { readFile, readdir } from "node:fs/promises";
import { join, resolve } from "node:path";

import { atomicWrite, atomicWriteJson } from "./io";
import type { ConfigEvaluationResult } from "./runner";

function percent(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

function money(value: number): string {
  return `$${value.toFixed(4)}`;
}

async function loadResults(root: string): Promise<ConfigEvaluationResult[]> {
  const files = (await readdir(root))
    .filter((file) => file.endsWith(".json") && file !== "changelog-data.json")
    .sort();
  const results: ConfigEvaluationResult[] = [];
  for (const file of files) {
    const value = JSON.parse(await readFile(join(root, file), "utf8")) as Partial<ConfigEvaluationResult>;
    if (typeof value.config === "string" && Array.isArray(value.contracts) && value.aggregate !== undefined) {
      results.push(value as ConfigEvaluationResult);
    }
  }
  return results.sort((left, right) => left.config.localeCompare(right.config));
}

function comparisonTable(results: readonly ConfigEvaluationResult[]): string {
  const rows = results.map((result) => {
    const aggregate = result.aggregate;
    return `| ${result.config} | ${percent(aggregate.detection.macro.f1)} | ${percent(aggregate.detection.micro.f1)} | ${percent(aggregate.deviationAccuracy.accuracy)} | ${percent(aggregate.redlineValidity.rate)} | ${percent(aggregate.minimality.rate)} | ${percent(aggregate.citationHallucination.rate)} |`;
  });
  return [
    "| Config | F1 macro | F1 micro | Deviation accuracy | Redline validity | Minimality | Citation hallucination |",
    "|---|---:|---:|---:|---:|---:|---:|",
    ...rows,
  ].join("\n");
}

function contractTable(results: readonly ConfigEvaluationResult[]): string {
  const rows = results.flatMap((result) =>
    result.contracts.map((contract) => {
      const metrics = contract.metrics;
      return `| ${result.config} | ${contract.contractId} | ${metrics.detection.tp} | ${metrics.detection.fp} | ${metrics.detection.fn} | ${metrics.detection.escalations} | ${percent(metrics.detection.f1)} | ${percent(metrics.redlineValidity.valid.rate)} | ${metrics.integrity?.ok === true ? "pass" : metrics.integrity?.attempted === true ? "fail" : "—"} |`;
    }),
  );
  return [
    "| Config | Contract | TP | FP | FN | Escalations | F1 | Valid redlines | Integrity |",
    "|---|---|---:|---:|---:|---:|---:|---:|---|",
    ...rows,
  ].join("\n");
}

function hardCaseTable(results: readonly ConfigEvaluationResult[]): string {
  const rows = results.flatMap((result) =>
    result.contracts
      .filter((contract) => contract.contractId === "synth-hardcase")
      .map((contract) => {
        const metrics = contract.metrics;
        return `| ${result.config} | ${metrics.detection.tp} | ${metrics.detection.fp} | ${metrics.detection.fn} | ${percent(metrics.detection.f1)} | ${percent(metrics.deviationAccuracy.accuracy)} |`;
      }),
  );
  if (rows.length === 0) return "No hard-case result is present.";
  return [
    "| Config | TP | FP | FN | F1 | Status accuracy |",
    "|---|---:|---:|---:|---:|---:|",
    ...rows,
  ].join("\n");
}

function resourcesTable(results: readonly ConfigEvaluationResult[]): string {
  const rows = results.map((result) => {
    const value = result.aggregate.resources;
    return `| ${result.config} | ${value.calls} | ${value.toolCalls} | ${value.inputTokens} | ${value.outputTokens} | ${value.cacheReadTokens} | ${value.cacheWriteTokens} | ${money(value.costUsd)} | ${(value.latencyMs / 1000).toFixed(1)} s |`;
  });
  return [
    "| Config | LLM calls | Tool calls | Input tokens | Output tokens | Cache-read tokens | Cache-write tokens | Cost | Latency |",
    "|---|---:|---:|---:|---:|---:|---:|---:|---:|",
    ...rows,
  ].join("\n");
}

export async function generateReport(resultsRoot = resolve("evals/results")): Promise<string> {
  const results = await loadResults(resultsRoot);
  if (results.length === 0) throw new Error(`No config results found in ${resultsRoot}`);
  const markdown = [
    "# Evaluation summary",
    "",
    "## Config comparison",
    "",
    comparisonTable(results),
    "",
    "## Per-contract results",
    "",
    contractTable(results),
    "",
    "## Hard case",
    "",
    hardCaseTable(results),
    "",
    "The hard case tests definition resolution, party direction, a cross-referenced convenience right, and a stand-alone late-payment penalty.",
    "",
    "## Resources",
    "",
    resourcesTable(results),
    "",
    "Replay uses committed model and judge caches. Cost and token numbers describe the recorded live run; replay itself incurs no API cost.",
    "",
  ].join("\n");
  await atomicWrite(join(resultsRoot, "summary.md"), markdown);
  await atomicWriteJson(join(resultsRoot, "changelog-data.json"), {
    generatedFrom: "evals/results/*.json",
    configs: results.map((result) => ({
      id: result.config,
      aggregate: result.aggregate,
      contracts: result.contracts.map((contract) => ({ id: contract.contractId, metrics: contract.metrics })),
    })),
  });
  return markdown;
}
