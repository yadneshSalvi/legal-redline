import { readFile, readdir } from "node:fs/promises";
import { join, resolve } from "node:path";

import { diffChars } from "diff";

import type { Finding, RunStats } from "@/src/agent/types";
import { validateOp } from "@/src/engine";
import type { DocumentModel, RedlineOp } from "@/src/engine/types";
import type { Check, Rule } from "@/src/playbook/schema";

import type { GoldFile } from "./gold";
import type { DocumentIntegrityMetrics } from "./integrity";
import type { JudgeResult } from "./judge";
import { matchFindings, type MatchResult } from "./match";

export interface DetectionMetrics {
  tp: number;
  fp: number;
  fn: number;
  escalations: number;
  ambiguousItems: number;
  ambiguousMatches: number;
  precision: number;
  recall: number;
  f1: number;
}

export interface DeviationAccuracyMetrics {
  located: number;
  correct: number;
  accuracy: number;
}

export interface ComponentMetrics {
  eligible: number;
  passing: number;
  rate: number;
}

export interface RedlineValidityMetrics {
  eligible: number;
  applies: ComponentMetrics;
  checks: ComponentMetrics;
  judge: ComponentMetrics;
  valid: ComponentMetrics;
}

export interface CitationMetrics {
  references: number;
  hallucinations: number;
  rate: number;
  invalidReferences: string[];
}

export interface HumanReviewLoadMetrics {
  findings: number;
  accepts: number;
  edits: number;
  rejects: number;
  load: number;
}

export interface ContractMetrics {
  detection: DetectionMetrics;
  deviationAccuracy: DeviationAccuracyMetrics;
  redlineValidity: RedlineValidityMetrics;
  minimality: ComponentMetrics;
  citations: CitationMetrics;
  integrity?: DocumentIntegrityMetrics;
  resources: {
    calls: number;
    toolCalls: number;
    retries: number;
    inputTokens: number;
    outputTokens: number;
    cacheReadTokens: number;
    cacheWriteTokens: number;
    costUsd: number;
    latencyMs: number;
  };
}

export interface AggregateMetrics {
  contracts: number;
  detection: {
    macro: Omit<DetectionMetrics, "tp" | "fp" | "fn" | "escalations" | "ambiguousItems" | "ambiguousMatches">;
    micro: DetectionMetrics;
  };
  deviationAccuracy: DeviationAccuracyMetrics;
  redlineValidity: ComponentMetrics;
  minimality: ComponentMetrics;
  citationHallucination: CitationMetrics;
  resources: ContractMetrics["resources"];
}

function ratio(numerator: number, denominator: number): number {
  return denominator === 0 ? 0 : numerator / denominator;
}

function mean(values: readonly number[]): number {
  return values.length === 0 ? 0 : values.reduce((total, value) => total + value, 0) / values.length;
}

export function detectionMetrics(result: MatchResult): DetectionMetrics {
  const tp = result.truePositiveFindingIds.length;
  const fp = result.falsePositiveFindingIds.length;
  const fn = result.falseNegativeGoldIds.length;
  const precision = ratio(tp, tp + fp);
  const recall = ratio(tp, tp + fn);
  return {
    tp,
    fp,
    fn,
    escalations: result.escalationFindingIds.length,
    ambiguousItems: result.ambiguousItemIds.length,
    ambiguousMatches: result.ambiguousMatchFindingIds.length,
    precision,
    recall,
    f1: precision + recall === 0 ? 0 : (2 * precision * recall) / (precision + recall),
  };
}

export function changedCharacterRatio(op: Extract<RedlineOp, { kind: "replace" }>): number {
  const changed = diffChars(op.oldText, op.newText)
    .filter((part) => part.added === true || part.removed === true)
    .reduce((total, part) => total + part.value.length, 0);
  return ratio(changed, Math.max(op.oldText.length, op.newText.length, 1));
}

export function renderProposalText(doc: DocumentModel, finding: Finding): string {
  const targets = new Set(finding.paragraphIds);
  for (const op of finding.proposal?.ops ?? []) targets.add(op.paragraphId);
  const text = new Map(
    doc.paragraphs.filter((paragraph) => targets.has(paragraph.id)).map((paragraph) => [paragraph.id, paragraph.text]),
  );
  const inserted: string[] = [];
  for (const op of finding.proposal?.ops ?? []) {
    if (op.kind === "replace") {
      const current = text.get(op.paragraphId) ?? "";
      text.set(op.paragraphId, current.replace(op.oldText, op.newText));
    } else if (op.kind === "delete_paragraph") {
      text.delete(op.paragraphId);
    } else {
      inserted.push(op.text);
    }
  }
  return [...text.values(), ...inserted].join("\n\n");
}

function checkRule(check: Check, text: string): boolean {
  if (check.type === "regex_present") return new RegExp(check.pattern, check.flags).test(text);
  if (check.type === "regex_absent") return !new RegExp(check.pattern, check.flags).test(text);
  if (check.type === "one_of") {
    const normalized = text.toLocaleLowerCase("en-US");
    return check.phrases.some((phrase) => normalized.includes(phrase.toLocaleLowerCase("en-US")));
  }
  const match = new RegExp(check.pattern, "i").exec(text);
  const value = Number(match?.[1]);
  if (!Number.isFinite(value)) return false;
  return check.type === "number_min" ? value >= check.min : value <= check.max;
}

export function proposalPassesChecks(doc: DocumentModel, finding: Finding, rule: Rule): boolean {
  const rendered = renderProposalText(doc, finding);
  return rule.checks.every((check) => checkRule(check, rendered));
}

function normalizeSection(value: string): string {
  return value.replace(/^0+(?=\d)/, "").replace(/\.0+(?=\d)/g, ".");
}

export function scanCitationHallucinations(
  doc: Pick<DocumentModel, "sections">,
  texts: readonly string[],
): CitationMetrics {
  const sections = new Set(
    doc.sections.flatMap((section) => {
      const number = section.number ?? section.id.match(/^sec-(.+)$/)?.[1];
      return number === undefined ? [] : [normalizeSection(number)];
    }),
  );
  const references: string[] = [];
  const pattern = /(?:\bSection|§)\s*([A-Z]?\d+(?:\.\d+)*)/gi;
  for (const text of texts) {
    for (const match of text.matchAll(pattern)) references.push(match[1]);
  }
  const invalid = references.filter((reference) => !sections.has(normalizeSection(reference)));
  return {
    references: references.length,
    hallucinations: invalid.length,
    rate: ratio(invalid.length, references.length),
    invalidReferences: invalid,
  };
}

function decisionsInSession(session: unknown): unknown[] {
  if (Array.isArray(session)) return session;
  if (session === null || typeof session !== "object") return [];
  const decisions = (session as { decisions?: unknown }).decisions;
  if (Array.isArray(decisions)) return decisions;
  if (decisions !== null && typeof decisions === "object") return Object.values(decisions);
  return [];
}

/** Observational edit/reject share for recorded human-review sessions. */
export function humanReviewLoad(sessions: readonly unknown[]): HumanReviewLoadMetrics {
  let findings = 0;
  let accepts = 0;
  let edits = 0;
  let rejects = 0;
  for (const session of sessions) {
    const decisions = decisionsInSession(session);
    if (session !== null && typeof session === "object" && !Array.isArray(session)) {
      const recordedFindings = (session as { findings?: unknown }).findings;
      findings += Array.isArray(recordedFindings)
        ? recordedFindings.length
        : typeof recordedFindings === "number"
          ? recordedFindings
          : decisions.length;
    } else {
      findings += decisions.length;
    }
    for (const decision of decisions) {
      if (decision === null || typeof decision !== "object") continue;
      const action = (decision as { action?: unknown }).action;
      if (action === "accept") accepts += 1;
      else if (action === "edit") edits += 1;
      else if (action === "reject") rejects += 1;
    }
  }
  return { findings, accepts, edits, rejects, load: ratio(edits + rejects, findings) };
}

/** Read the committed observational sessions exported by scripts/export-human-sessions.ts. */
export async function readHumanReviewLoad(
  root = resolve("trajectories/human"),
): Promise<HumanReviewLoadMetrics> {
  let files: string[];
  try {
    files = (await readdir(root)).filter((file) => file.endsWith(".json")).sort();
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") return humanReviewLoad([]);
    throw error;
  }
  const sessions = await Promise.all(files.map(async (file) =>
    JSON.parse(await readFile(join(root, file), "utf8")) as unknown));
  return humanReviewLoad(sessions);
}

function resources(stats: RunStats): ContractMetrics["resources"] {
  return {
    calls: stats.llmCalls,
    toolCalls: stats.toolCalls,
    retries: stats.retries,
    inputTokens: stats.usage.inputTokens,
    outputTokens: stats.usage.outputTokens,
    cacheReadTokens: stats.usage.cacheReadTokens ?? 0,
    cacheWriteTokens: stats.usage.cacheWriteTokens ?? 0,
    costUsd: stats.usage.costUsd,
    latencyMs: stats.durationMs ?? 0,
  };
}

export function computeContractMetrics(input: {
  gold: GoldFile;
  findings: readonly Finding[];
  document: DocumentModel;
  rules: readonly Rule[];
  judgements?: Readonly<Record<string, JudgeResult>>;
  memo?: string;
  stats: RunStats;
  integrity?: DocumentIntegrityMetrics;
}): ContractMetrics {
  const matched = matchFindings(input.findings, input.gold);
  const detection = detectionMetrics(matched);
  const scoredMatches = matched.matches.filter(({ gold }) => gold.status !== "ambiguous");
  const located = scoredMatches.length;
  const correct = scoredMatches.filter(({ finding, gold }) => finding.status === gold.status).length;
  const tp = new Set(matched.truePositiveFindingIds);
  const proposals = input.findings.filter((finding) => tp.has(finding.id) && finding.proposal !== undefined);
  const applies = new Set(
    proposals.filter((finding) => finding.proposal?.ops.every((op) => validateOp(input.document, op).ok)).map((finding) => finding.id),
  );
  const checks = new Set(
    proposals
      .filter((finding) => {
        const rule = input.rules.find((candidate) => candidate.id === finding.ruleId);
        return rule !== undefined && proposalPassesChecks(input.document, finding, rule);
      })
      .map((finding) => finding.id),
  );
  const judged = new Set(
    proposals.filter((finding) => input.judgements?.[finding.id]?.satisfies_rule === true).map((finding) => finding.id),
  );
  const valid = proposals.filter(
    (finding) => applies.has(finding.id) && checks.has(finding.id) && judged.has(finding.id),
  ).length;
  const minimal = proposals.filter((finding) => {
    if (input.judgements?.[finding.id]?.minimal !== true) return false;
    return (finding.proposal?.ops ?? []).every(
      (op) => op.kind !== "replace" || changedCharacterRatio(op) <= 0.6,
    );
  }).length;
  const eligible = proposals.length;
  const citationTexts = input.findings.flatMap((finding) => [finding.rationale, finding.proposal?.comment ?? ""]);
  if (input.memo !== undefined) citationTexts.push(input.memo);

  return {
    detection,
    deviationAccuracy: { located, correct, accuracy: ratio(correct, located) },
    redlineValidity: {
      eligible,
      applies: { eligible, passing: applies.size, rate: ratio(applies.size, eligible) },
      checks: { eligible, passing: checks.size, rate: ratio(checks.size, eligible) },
      judge: { eligible, passing: judged.size, rate: ratio(judged.size, eligible) },
      valid: { eligible, passing: valid, rate: ratio(valid, eligible) },
    },
    minimality: { eligible, passing: minimal, rate: ratio(minimal, eligible) },
    citations: scanCitationHallucinations(input.document, citationTexts),
    integrity: input.integrity,
    resources: resources(input.stats),
  };
}

export function aggregateMetrics(metrics: readonly ContractMetrics[]): AggregateMetrics {
  const sum = (select: (metric: ContractMetrics) => number): number =>
    metrics.reduce((total, metric) => total + select(metric), 0);
  const tp = sum((metric) => metric.detection.tp);
  const fp = sum((metric) => metric.detection.fp);
  const fn = sum((metric) => metric.detection.fn);
  const microPrecision = ratio(tp, tp + fp);
  const microRecall = ratio(tp, tp + fn);
  const located = sum((metric) => metric.deviationAccuracy.located);
  const correct = sum((metric) => metric.deviationAccuracy.correct);
  const redlineEligible = sum((metric) => metric.redlineValidity.valid.eligible);
  const redlinePassing = sum((metric) => metric.redlineValidity.valid.passing);
  const minimalEligible = sum((metric) => metric.minimality.eligible);
  const minimalPassing = sum((metric) => metric.minimality.passing);
  const references = sum((metric) => metric.citations.references);
  const hallucinations = sum((metric) => metric.citations.hallucinations);
  const resourceKeys: Array<keyof ContractMetrics["resources"]> = [
    "calls", "toolCalls", "retries", "inputTokens", "outputTokens", "cacheReadTokens", "cacheWriteTokens", "costUsd", "latencyMs",
  ];
  const aggregatedResources = Object.fromEntries(
    resourceKeys.map((key) => [key, sum((metric) => metric.resources[key])]),
  ) as unknown as ContractMetrics["resources"];

  return {
    contracts: metrics.length,
    detection: {
      macro: {
        precision: mean(metrics.map((metric) => metric.detection.precision)),
        recall: mean(metrics.map((metric) => metric.detection.recall)),
        f1: mean(metrics.map((metric) => metric.detection.f1)),
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
        f1: microPrecision + microRecall === 0 ? 0 : (2 * microPrecision * microRecall) / (microPrecision + microRecall),
      },
    },
    deviationAccuracy: { located, correct, accuracy: ratio(correct, located) },
    redlineValidity: { eligible: redlineEligible, passing: redlinePassing, rate: ratio(redlinePassing, redlineEligible) },
    minimality: { eligible: minimalEligible, passing: minimalPassing, rate: ratio(minimalPassing, minimalEligible) },
    citationHallucination: { references, hallucinations, rate: ratio(hallucinations, references), invalidReferences: metrics.flatMap((metric) => metric.citations.invalidReferences) },
    resources: aggregatedResources,
  };
}
