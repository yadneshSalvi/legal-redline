import "dotenv/config";

import { access, readFile } from "node:fs/promises";
import path from "node:path";

import { Command, Option } from "commander";
import pLimit from "p-limit";

import type { Finding, ReviewRun, RunStats } from "@/src/agent/types";
import { parseDocx, validateOp } from "@/src/engine";
import type { DocumentModel } from "@/src/engine/types";
import {
  createIndependentJudgeV2,
  type JudgeMode,
  type JudgeV2Input,
  type JudgeV2Result,
} from "@/src/eval/judge";
import {
  changedCharacterRatio,
  detectionMetrics,
  proposalPassesChecks,
  renderProposalText,
} from "@/src/eval/metrics";
import { matchFindings } from "@/src/eval/match";
import { loadGold } from "@/src/eval/gold";
import { loadPlaybook } from "@/src/playbook/loader";

interface Artifact {
  label: string;
  contractId?: string;
  document: DocumentModel;
  findings: Finding[];
  stats: RunStats;
}

interface Assessment {
  artifact: Artifact;
  finding: Finding;
  judgeInput: JudgeV2Input;
  judgeResult: JudgeV2Result;
  applies: boolean;
  checks: boolean;
  deterministicMinimal: boolean;
  elements: boolean;
  complete: boolean;
}

async function exists(target: string): Promise<boolean> {
  try {
    await access(target);
    return true;
  } catch {
    return false;
  }
}

async function taggedContractId(run: ReviewRun): Promise<string | undefined> {
  for (const tag of run.tags ?? []) {
    if (await exists(path.resolve("data/contracts", tag, "meta.json"))) return tag;
  }
  return undefined;
}

async function readLocalRun(runPath: string): Promise<Artifact> {
  const run = JSON.parse(await readFile(runPath, "utf8")) as ReviewRun;
  const contractId = await taggedContractId(run);
  return {
    label: contractId ?? run.id,
    contractId,
    document: run.document,
    findings: run.findings,
    stats: run.stats,
  };
}

async function readEvaluationRun(directory: string): Promise<Artifact> {
  const contractId = path.basename(directory);
  const configId = path.basename(path.dirname(directory));
  const [findings, stats, original] = await Promise.all([
    readFile(path.join(directory, "findings.json"), "utf8").then((text) => JSON.parse(text) as Finding[]),
    readFile(path.join(directory, "stats.json"), "utf8").then((text) => JSON.parse(text) as RunStats),
    readFile(path.resolve("data/contracts", contractId, "contract.docx")).then((bytes) => new Uint8Array(bytes)),
  ]);
  return {
    label: `${configId}/${contractId}`,
    contractId,
    document: await parseDocx(original, `${contractId}.docx`),
    findings,
    stats,
  };
}

async function resolveArtifact(specifier: string): Promise<Artifact> {
  const explicit = path.resolve(specifier);
  if (await exists(explicit)) {
    if ((await readFile(explicit).catch(() => null)) !== null && path.basename(explicit) === "run.json") {
      return readLocalRun(explicit);
    }
    if (path.basename(explicit) === "findings.json") return readEvaluationRun(path.dirname(explicit));
    if (await exists(path.join(explicit, "run.json"))) return readLocalRun(path.join(explicit, "run.json"));
    if (await exists(path.join(explicit, "findings.json"))) return readEvaluationRun(explicit);
  }
  const localRun = path.resolve("data/runs", specifier, "run.json");
  if (await exists(localRun)) return readLocalRun(localRun);
  const shorthand = /^([^/]+)\/([^/]+)$/u.exec(specifier);
  if (shorthand) {
    const evaluation = path.resolve("evals/runs", shorthand[1]!, shorthand[2]!);
    if (await exists(path.join(evaluation, "findings.json"))) return readEvaluationRun(evaluation);
  }
  throw new Error(`Cannot resolve run artifact: ${specifier}`);
}

function percent(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

function bool(value: boolean): string {
  return value ? "yes" : "no";
}

function missingElements(result: JudgeV2Result): Array<{ level: "preferred" | "fallback"; element: string }> {
  return result.elements
    .filter((element) => !element.met)
    .map((element) => ({ level: element.level, element: element.element }));
}

async function main(): Promise<void> {
  const command = new Command()
    .name("crr-dev")
    .argument("<runs...>", "run ids, run.json/findings.json paths, run directories, or <config>/<contract> shorthands")
    .addOption(new Option("--mode <mode>", "official judge-v2 cache mode").choices(["live", "record", "replay"]).default("replay"))
    .option("--allow-live", "call and record the judge on replay cache misses", false)
    .option("--cache-dir <path>", "official judge-v2 cache", "evals/cache/judge-v2")
    .option("--rules <ids>", "comma-separated rule ids for a focused iteration")
    .option("--concurrency <number>", "maximum parallel judge calls", "4")
    .parse();
  const options = command.opts<{
    mode: JudgeMode;
    allowLive: boolean;
    cacheDir: string;
    concurrency: string;
    rules?: string;
  }>();
  const concurrency = Number.parseInt(options.concurrency, 10);
  if (!Number.isInteger(concurrency) || concurrency < 1) throw new Error("--concurrency must be a positive integer");
  const artifacts = await Promise.all(command.args.map(resolveArtifact));
  const selectedRules = options.rules
    ? new Set(options.rules.split(",").map((value) => value.trim()).filter(Boolean))
    : null;
  const playbook = await loadPlaybook("customer-vendor-services-v1");
  const rules = new Map(playbook.rules.map((rule) => [rule.id, rule]));
  const judge = createIndependentJudgeV2({
    mode: options.mode,
    cacheDir: options.cacheDir,
    allowLive: options.allowLive,
  });
  const work = artifacts.flatMap((artifact) => artifact.findings
    .filter((finding) => (finding.status === "deviation" || finding.status === "missing") && finding.proposal !== undefined)
    .filter((finding) => selectedRules === null || selectedRules.has(finding.ruleId))
    .map((finding) => ({ artifact, finding })));
  const limit = pLimit(concurrency);
  const assessments = await Promise.all(work.map(({ artifact, finding }) => limit(async (): Promise<Assessment> => {
    const rule = rules.get(finding.ruleId);
    if (!rule || !finding.proposal) throw new Error(`Missing rule or proposal for ${artifact.label}/${finding.ruleId}`);
    const originalClause = finding.paragraphIds
      .map((id) => artifact.document.paragraphs.find((paragraph) => paragraph.id === id)?.text ?? "")
      .filter(Boolean)
      .join("\n\n");
    const judgeInput: JudgeV2Input = {
      ruleId: rule.id,
      ruleTitle: rule.title,
      preferredPosition: rule.position.preferred,
      fallbackPosition: rule.position.fallback,
      originalClause,
      renderedClause: renderProposalText(artifact.document, finding),
      comment: finding.proposal.comment,
    };
    const judgement = await judge.judge(judgeInput);
    const applies = finding.proposal.ops.every((op) => validateOp(artifact.document, op).ok);
    const checks = proposalPassesChecks(artifact.document, finding, rule);
    const deterministicMinimal = finding.proposal.ops.every(
      (op) => op.kind !== "replace" || changedCharacterRatio(op) <= 0.6,
    );
    const elements = judgement.result.satisfies_preferred || judgement.result.satisfies_fallback;
    const complete = applies && checks && deterministicMinimal && elements &&
      judgement.result.minimal && judgement.result.preserves_intent;
    return {
      artifact,
      finding,
      judgeInput,
      judgeResult: judgement.result,
      applies,
      checks,
      deterministicMinimal,
      elements,
      complete,
    };
  })));

  console.log("\nFinding quality");
  console.log("contract\trule\ttarget\tapplies\tchecks\telements\tminimal\tintent\tCRR");
  for (const item of assessments) {
    console.log([
      item.artifact.label,
      item.finding.ruleId,
      item.finding.proposal?.level ?? "—",
      bool(item.applies),
      bool(item.checks),
      bool(item.elements),
      bool(item.deterministicMinimal && item.judgeResult.minimal),
      bool(item.judgeResult.preserves_intent),
      item.complete ? "PASS" : "FAIL",
    ].join("\t"));
  }

  console.log("\nPer-contract summary");
  console.log("contract\tCRR-dev\tF1\tescalations\tcost");
  for (const artifact of artifacts) {
    const rows = assessments.filter((assessment) => assessment.artifact === artifact);
    const passing = rows.filter((assessment) => assessment.complete).length;
    let f1 = "n/a";
    if (artifact.contractId && await exists(path.resolve("data/contracts", artifact.contractId, "gold.json"))) {
      const gold = await loadGold(path.resolve("data/contracts", artifact.contractId, "gold.json"));
      f1 = percent(detectionMetrics(matchFindings(artifact.findings, gold)).f1);
    }
    const escalations = artifact.findings.filter((finding) => finding.status === "needs_review").length;
    console.log([
      artifact.label,
      `${passing}/${rows.length} (${percent(rows.length ? passing / rows.length : 0)})`,
      f1,
      String(escalations),
      `$${artifact.stats.usage.costUsd.toFixed(4)}`,
    ].join("\t"));
  }

  const misses = new Map<string, number>();
  for (const assessment of assessments) {
    for (const miss of missingElements(assessment.judgeResult)) {
      const key = `${assessment.finding.ruleId}\t${miss.level}\t${miss.element}`;
      misses.set(key, (misses.get(key) ?? 0) + 1);
    }
  }
  console.log("\nPer-element misses");
  console.log("rule\tlevel\tmisses\telement");
  for (const [key, count] of [...misses].sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))) {
    const [ruleId, level, element] = key.split("\t");
    console.log(`${ruleId}\t${level}\t${count}\t${element}`);
  }

  const passing = assessments.filter((assessment) => assessment.complete).length;
  const escalations = artifacts.reduce(
    (total, artifact) => total + artifact.findings.filter((finding) => finding.status === "needs_review").length,
    0,
  );
  const cost = artifacts.reduce((total, artifact) => total + artifact.stats.usage.costUsd, 0);
  console.log(`\nCRR-dev ${passing}/${assessments.length} (${percent(assessments.length ? passing / assessments.length : 0)})`);
  console.log(`Escalations ${escalations}; pipeline cost $${cost.toFixed(4)} total / $${(cost / Math.max(artifacts.length, 1)).toFixed(4)} per contract.`);
}

void main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
