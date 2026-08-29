import { readFile } from "node:fs/promises";
import path from "node:path";
import { nanoid } from "nanoid";

import type { Decision, Finding, Precedent, ReviewRun } from "@/src/agent/types";
import type { RedlineOp } from "@/src/engine/types";
import { normalizeForMatch } from "@/src/engine/text";
import type { Store } from "@/src/store";

const INDEX_KEY = "precedents/index.json";
const SEED_PATH = path.resolve(process.cwd(), "data/precedents/seed.json");

function tokens(text: string): Set<string> {
  return new Set(
    normalizeForMatch(text)
      .replace(/[^a-z0-9 ]/g, " ")
      .split(/\s+/)
      .filter((word) => word.length > 2),
  );
}

function jaccard(left: Set<string>, right: Set<string>): number {
  if (!left.size && !right.size) return 1;
  let intersection = 0;
  for (const word of left) if (right.has(word)) intersection += 1;
  return intersection / (left.size + right.size - intersection || 1);
}

function opText(op: RedlineOp, before: boolean): string {
  if (op.kind === "replace") return before ? op.oldText : op.newText;
  if (op.kind === "insert_after") return before ? "" : op.text;
  return before ? "Deleted paragraph" : "";
}

export class PrecedentMemory {
  constructor(private readonly store: Store) {}

  async all(): Promise<Precedent[]> {
    const [stored, seedText] = await Promise.all([
      this.store.getJson<Precedent[]>(INDEX_KEY),
      readFile(SEED_PATH, "utf8").catch(() => "[]"),
    ]);
    const seed = JSON.parse(seedText) as Precedent[];
    const merged = new Map<string, Precedent>();
    for (const item of [...seed, ...(stored ?? [])]) merged.set(item.id, item);
    return [...merged.values()];
  }

  async lookup(ruleId: string, context = ""): Promise<Precedent[]> {
    const query = tokens(context);
    return (await this.all())
      .filter((item) => item.ruleId === ruleId)
      .map((item) => ({ item, score: jaccard(query, tokens(`${item.clauseBefore} ${item.clauseAfter}`)) }))
      .sort((left, right) => right.score - left.score || right.item.approvedAt.localeCompare(left.item.approvedAt))
      .slice(0, 3)
      .map(({ item }) => item);
  }

  async put(precedent: Precedent): Promise<void> {
    const existing = await this.store.getJson<Precedent[]>(INDEX_KEY);
    const without = (existing ?? []).filter((item) => item.id !== precedent.id);
    await this.store.putJson(INDEX_KEY, [...without, precedent]);
  }

  async delete(id: string): Promise<boolean> {
    const existing = await this.store.getJson<Precedent[]>(INDEX_KEY);
    if (!existing?.some((item) => item.id === id)) return false;
    await this.store.putJson(INDEX_KEY, existing.filter((item) => item.id !== id));
    return true;
  }

  async promote(run: ReviewRun, finding: Finding, decision?: Decision): Promise<Precedent | null> {
    const proposal = finding.proposal;
    const ops = decision?.action === "edit" ? decision.ops ?? [] : proposal?.ops ?? [];
    if (!ops.length) return null;
    const contextParagraphs = finding.paragraphIds
      .map((id) => run.document.paragraphs.find((paragraph) => paragraph.id === id)?.text)
      .filter((text): text is string => Boolean(text));
    const precedent: Precedent = {
      id: `pr-${nanoid(10)}`,
      ruleId: finding.ruleId,
      title: finding.ruleTitle,
      source: run.document.title,
      clauseBefore: contextParagraphs.join("\n") || ops.map((op) => opText(op, true)).join("\n"),
      clauseAfter: ops.map((op) => opText(op, false)).join("\n"),
      comment: decision?.comment ?? proposal?.comment ?? "",
      level: proposal?.level ?? "preferred",
      approvedAt: decision?.at ?? new Date().toISOString(),
      approvedBy: decision?.by ?? "Reviewer",
      tags: ["approved"],
      runId: run.id,
      findingId: finding.id,
    };
    await this.put(precedent);
    return precedent;
  }
}

export function createPrecedentMemory(store: Store): PrecedentMemory {
  return new PrecedentMemory(store);
}
