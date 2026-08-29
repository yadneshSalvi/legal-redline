import type { Finding, FindingStatus, RunStats, Severity } from "@/src/agent/types";
import type { LlmTotals } from "@/src/agent/llm";
import type { DocumentModel, Section } from "@/src/engine/types";

const SEVERITY_ORDER: Record<Severity, number> = { critical: 0, high: 1, medium: 2, low: 3 };
const MAX_SECTION_HEADING_LENGTH = 60;

function shortHeading(heading: string): string {
  const normalized = heading.trim().replace(/\s+/gu, " ");
  if (normalized.length <= MAX_SECTION_HEADING_LENGTH) return normalized;
  return `${normalized.slice(0, MAX_SECTION_HEADING_LENGTH - 1).trimEnd()}…`;
}

function formatSectionReference(section: Section | undefined): string {
  if (!section) return "§ —";
  const heading = shortHeading(section.heading);
  return ["§", section.number, heading].filter(Boolean).join(" ");
}

/** Add a compact, document-derived location after a model has submitted its finding. */
export function withSectionReference(
  document: DocumentModel,
  finding: Finding,
  suggestedInsertionSectionId?: string,
): Finding {
  const paragraph = finding.paragraphIds
    .map((id) => document.paragraphs.find((candidate) => candidate.id === id))
    .find((candidate) => candidate !== undefined);
  const sectionId = paragraph?.sectionId ??
    (finding.status === "missing" && !paragraph ? suggestedInsertionSectionId : undefined);
  const section = document.sections.find((candidate) => candidate.id === sectionId);
  return {
    ...finding,
    sectionId: section?.id,
    sectionRef: formatSectionReference(section),
  };
}

function overlaps(left: Finding, right: Finding): boolean {
  if (left.ruleId !== right.ruleId) return false;
  if (left.status === "missing" && right.status === "missing") return true;
  return left.paragraphIds.some((id) => right.paragraphIds.includes(id));
}

export function assembleFindings(findings: Finding[]): Finding[] {
  const merged: Finding[] = [];
  for (const finding of findings) {
    const index = merged.findIndex((candidate) => overlaps(candidate, finding));
    if (index < 0) {
      merged.push(finding);
      continue;
    }
    const current = merged[index];
    const winner = finding.confidence > current.confidence ? finding : current;
    merged[index] = { ...winner, paragraphIds: [...new Set([...current.paragraphIds, ...finding.paragraphIds])] };
  }
  return merged.sort(
    (left, right) =>
      SEVERITY_ORDER[left.severity] - SEVERITY_ORDER[right.severity] ||
      left.ruleId.localeCompare(right.ruleId) ||
      left.id.localeCompare(right.id),
  );
}

export function statsFor(
  startedAt: string,
  findings: Finding[],
  totals: LlmTotals,
  finishedAt?: string,
  perRule?: NonNullable<RunStats["perRule"]>,
): RunStats {
  const bySeverity: Record<Severity, number> = { critical: 0, high: 0, medium: 0, low: 0 };
  const byStatus: Record<FindingStatus, number> = { deviation: 0, missing: 0, compliant: 0, needs_review: 0 };
  for (const finding of findings) {
    bySeverity[finding.severity] += 1;
    byStatus[finding.status] += 1;
  }
  const startedMs = Date.parse(startedAt);
  const finishedMs = finishedAt ? Date.parse(finishedAt) : undefined;
  return {
    startedAt,
    ...(finishedAt ? { finishedAt } : {}),
    ...(finishedMs === undefined || Number.isNaN(startedMs) ? {} : { durationMs: Math.max(0, finishedMs - startedMs) }),
    llmCalls: totals.calls,
    toolCalls: totals.toolCalls,
    retries: totals.retries,
    usage: totals.usage,
    findings: findings.length,
    bySeverity,
    byStatus,
    ...(perRule
      ? { perRule: Object.fromEntries(Object.entries(perRule).map(([ruleId, stats]) => [ruleId, { ...stats }])) }
      : {}),
  };
}
