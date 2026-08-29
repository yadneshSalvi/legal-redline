import { readFile } from "node:fs/promises";
import path from "node:path";
import { nanoid } from "nanoid";

import type { Decision, Finding, Precedent, ReviewRun } from "@/src/agent/types";
import type { RedlineOp } from "@/src/engine/types";
import { normalizeForMatch } from "@/src/engine/text";
import { renderParagraph } from "@/src/engine";
import type { Store } from "@/src/store";

const INDEX_KEY = "precedents/index.json";
const SEED_PATH = path.resolve(process.cwd(), "data/precedents/seed.json");
const indexQueues = new WeakMap<Store, Promise<void>>();

async function withIndexLock<T>(store: Store, work: () => Promise<T>): Promise<T> {
  const previous = indexQueues.get(store) ?? Promise.resolve();
  const result = previous.catch(() => undefined).then(work);
  const next = result.then(() => undefined, () => undefined);
  indexQueues.set(store, next);
  try {
    return await result;
  } finally {
    if (indexQueues.get(store) === next) indexQueues.delete(store);
  }
}

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

function renderedAfter(run: ReviewRun, finding: Finding, ops: RedlineOp[]): string {
  const ids = [...new Set([...finding.paragraphIds, ...ops.map((op) => op.paragraphId)])];
  return ids.flatMap((id) => {
    const visible = renderParagraph(run.document, id, ops)
      .filter((segment) => segment.type !== "delete")
      .map((segment) => segment.text)
      .join("");
    const inserted = ops.flatMap((op) => op.kind === "insert_after" && op.paragraphId === id ? [op.text] : []);
    const full = [visible, ...inserted].filter(Boolean).join("\n");
    return full ? [full] : [];
  }).join("\n");
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
    await withIndexLock(this.store, async () => {
      for (let attempt = 0; attempt < 2; attempt += 1) {
        const existing = await this.store.getJson<Precedent[]>(INDEX_KEY);
        const without = (existing ?? []).filter((item) => item.id !== precedent.id);
        await this.store.putJson(INDEX_KEY, [...without, precedent]);
        const verified = await this.store.getJson<Precedent[]>(INDEX_KEY);
        if (verified?.some((item) => item.id === precedent.id)) return;
      }
      throw new Error(`Precedent index update was lost for ${precedent.id}`);
    });
  }

  async delete(id: string): Promise<boolean> {
    return withIndexLock(this.store, async () => {
      const existing = await this.store.getJson<Precedent[]>(INDEX_KEY);
      if (!existing?.some((item) => item.id === id)) return false;
      await this.store.putJson(INDEX_KEY, existing.filter((item) => item.id !== id));
      return true;
    });
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
      clauseBefore: contextParagraphs.join("\n"),
      clauseAfter: renderedAfter(run, finding, ops),
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
