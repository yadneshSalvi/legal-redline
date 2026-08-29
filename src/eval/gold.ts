import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { z } from "zod";

import { normalizeForMatch } from "@/src/engine/text";

export const GoldStatusSchema = z.enum(["deviation", "missing", "compliant", "ambiguous"]);

export const GoldItemSchema = z.object({
  id: z.string().min(1),
  ruleId: z.string().regex(/^[A-Z0-9-]{2,16}$/),
  paragraphIds: z.array(z.string().regex(/^p\d{4}(?:\.\d+)?$/)),
  status: GoldStatusSchema,
  cuadCategory: z.string().min(1).optional(),
  cuadCategories: z.array(z.string().min(1)).optional(),
  spanText: z.string().min(1).optional(),
  labeler: z.string().min(1),
  distinct: z.boolean().optional(),
  mergedFrom: z.array(z.string().min(1)).optional(),
  note: z.string().min(1).optional(),
  expectedFix: z.string().min(1).optional(),
  reviewedAt: z.string().min(1).optional(),
  reviewedBy: z.string().min(1).optional(),
});

export const GoldFileSchema = z
  .object({
    contractId: z.string().min(1),
    items: z.array(GoldItemSchema),
  })
  .superRefine((gold, context) => {
    const ids = new Set<string>();
    for (const item of gold.items) {
      if (ids.has(item.id)) {
        context.addIssue({ code: "custom", message: `Duplicate gold item id: ${item.id}` });
      }
      ids.add(item.id);
      if (item.status === "missing" && item.paragraphIds.length > 0) {
        context.addIssue({
          code: "custom",
          message: `Missing item ${item.id} must not identify existing paragraphs`,
        });
      }
    }
  });

export const ContractPartySchema = z.object({
  name: z.string().min(1),
  role: z.string().min(1),
});

export const ContractMetaSchema = z.object({
  id: z.string().min(1),
  source: z.string().min(1),
  title: z.string().min(1),
  words: z.number().int().nonnegative(),
  paragraphs: z.number().int().nonnegative().optional(),
  ourParty: ContractPartySchema.nullable(),
  counterparty: ContractPartySchema.nullable(),
  cuadTitle: z.string().min(1).optional(),
  seed: z.number().int().optional(),
  hardCase: z.boolean().optional(),
  hardCaseNotes: z.array(z.string().min(1)).optional(),
  maxParagraphWords: z.number().int().nonnegative().optional(),
  unmatchedSpans: z.array(z.unknown()).optional(),
});

export type GoldStatus = z.infer<typeof GoldStatusSchema>;
export type GoldItem = z.infer<typeof GoldItemSchema>;
export type GoldFile = z.infer<typeof GoldFileSchema>;
export type ContractMeta = z.infer<typeof ContractMetaSchema>;

export interface CarryDraftResult {
  gold: GoldFile;
  carried: number;
  needsDraft: number;
}

function spanIdentity(item: GoldItem): string | null {
  if (item.cuadCategory === undefined || item.spanText === undefined) return null;
  return `${item.ruleId}\0${item.cuadCategory}\0${normalizeForMatch(item.spanText)}`;
}

function nextGoldId(used: ReadonlySet<string>): string {
  for (let index = 1; ; index += 1) {
    const id = `g${String(index).padStart(3, "0")}`;
    if (!used.has(id)) return id;
  }
}

/** Carry reviewed labels onto freshly mapped CUAD spans without retaining stale paragraph ids. */
export function carryDraftLabels(generated: GoldFile, existing: GoldFile): CarryDraftResult {
  const priorBySpan = new Map<string, GoldItem[]>();
  for (const item of existing.items) {
    const identity = spanIdentity(item);
    if (identity === null) continue;
    const matches = priorBySpan.get(identity) ?? [];
    matches.push(item);
    priorBySpan.set(identity, matches);
  }

  const items: GoldItem[] = [];
  const usedIds = new Set<string>();
  let carried = 0;
  let needsDraft = 0;
  for (const generatedItem of generated.items) {
    const identity = spanIdentity(generatedItem);
    const prior = identity === null ? undefined : priorBySpan.get(identity)?.shift();
    let id = prior?.id ?? generatedItem.id;
    if (usedIds.has(id)) id = nextGoldId(usedIds);
    usedIds.add(id);
    if (prior === undefined) {
      needsDraft += 1;
      items.push({ ...generatedItem, id });
      continue;
    }
    carried += 1;
    items.push({
      ...generatedItem,
      id,
      status: prior.status,
      labeler: prior.labeler,
      note: prior.note,
      expectedFix: prior.expectedFix,
      cuadCategories: prior.cuadCategories,
      distinct: prior.distinct,
      mergedFrom: prior.mergedFrom,
      reviewedAt: prior.reviewedAt,
      reviewedBy: prior.reviewedBy,
    });
  }

  for (const prior of existing.items.filter((item) => spanIdentity(item) === null)) {
    let id = prior.id;
    if (usedIds.has(id)) id = nextGoldId(usedIds);
    usedIds.add(id);
    items.push({ ...prior, id });
  }
  return { gold: GoldFileSchema.parse({ contractId: generated.contractId, items }), carried, needsDraft };
}

export function hasOnlyHumanLabels(gold: GoldFile): boolean {
  return gold.items.every((item) => item.labeler === "human" || item.labeler === "cuad+human");
}

/** Reject assisted CUAD drafts while retaining exact, generated labels for synthetic fixtures. */
export function assertEvaluationLabelers(contractId: string, gold: GoldFile): void {
  const synthetic = contractId.startsWith("synth-");
  const approved = (item: GoldItem): boolean => synthetic
    ? item.labeler === "synthetic-exact" || (item.labeler === "human" && item.reviewedBy !== undefined)
    : item.labeler === "human" || item.labeler === "cuad+human";
  if (!gold.items.every(approved)) {
    const invalid = [...new Set(gold.items.filter((item) => !approved(item)).map((item) =>
      item.labeler === "human" && item.reviewedBy === undefined
        ? "human (missing reviewedBy)"
        : item.labeler,
    ))].sort();
    throw new Error(
      `${contractId}: gold.json contains unapproved labelers (${invalid.join(", ")}). ` +
        "Review every draft item with scripts/gold-review.ts before promotion.",
    );
  }
}

export async function loadGold(path: string): Promise<GoldFile> {
  const value = JSON.parse(await readFile(path, "utf8")) as unknown;
  return GoldFileSchema.parse(value);
}

export async function loadContractMeta(path: string): Promise<ContractMeta> {
  const value = JSON.parse(await readFile(path, "utf8")) as unknown;
  return ContractMetaSchema.parse(value);
}

export async function listGoldContracts(root: string): Promise<string[]> {
  const entries = await readdir(root, { withFileTypes: true });
  const ids: string[] = [];
  for (const entry of entries) {
    if (!entry.isDirectory()) continue;
    try {
      const gold = await loadGold(join(root, entry.name, "gold.json"));
      if (gold.contractId === entry.name) ids.push(entry.name);
    } catch {
      // Draft-only and unrelated directories are intentionally omitted.
    }
  }
  return ids.sort();
}
