/**
 * Fallback for `GET /api/precedents` — the committed seed bank, one approved redline per playbook
 * rule (`data/precedents/seed.json`, loaded by `src/agent/memory.ts`). Imported rather than copied
 * so the page and the agent always retrieve the same language.
 */
import type { Precedent } from "@/src/agent/types";
import seed from "@/data/precedents/seed.json";

function isLevel(value: unknown): value is Precedent["level"] {
  return value === "preferred" || value === "fallback";
}

/** The JSON is committed data, not a typed module, so it is narrowed on the way in. */
export const seedPrecedents: Precedent[] = (seed as unknown[]).flatMap((item) => {
  if (typeof item !== "object" || item === null) return [];
  const value = item as Record<string, unknown>;
  if (typeof value.id !== "string" || typeof value.ruleId !== "string" || !isLevel(value.level)) return [];
  return [
    {
      id: value.id,
      ruleId: value.ruleId,
      title: String(value.title ?? value.ruleId),
      source: String(value.source ?? "Unknown source"),
      clauseBefore: String(value.clauseBefore ?? ""),
      clauseAfter: String(value.clauseAfter ?? ""),
      comment: String(value.comment ?? ""),
      level: value.level,
      approvedAt: String(value.approvedAt ?? ""),
      approvedBy: String(value.approvedBy ?? ""),
      tags: Array.isArray(value.tags) ? value.tags.map(String) : [],
      ...(typeof value.runId === "string" ? { runId: value.runId } : {}),
      ...(typeof value.findingId === "string" ? { findingId: value.findingId } : {}),
    },
  ];
});
