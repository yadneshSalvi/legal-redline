import { readFile } from "node:fs/promises";
import { join, resolve } from "node:path";

import { Command } from "commander";

import {
  GoldFileSchema,
  GoldStatusSchema,
  hasOnlyAgentReviewLabels,
  hasOnlyHumanLabels,
  type GoldFile,
  type GoldItem,
} from "@/src/eval/gold";
import { atomicWrite, atomicWriteJson } from "@/src/eval/io";
import { loadPlaybookFile } from "@/src/eval/playbook";
import { paragraphId, splitParagraphs } from "@/src/engine/text";
import type { Rule } from "@/src/playbook/schema";

const CONTRACTS_ROOT = resolve("data/contracts");
const PLAYBOOK_PATH = resolve("data/playbooks/customer-vendor-services.yaml");
const LOG_PATH = join(CONTRACTS_ROOT, "LABELING_LOG.md");
const STOPWORDS = new Set([
  "about", "against", "apply", "clause", "customer", "detect", "does", "from", "have", "into",
  "must", "only", "other", "party", "read", "resolve", "rule", "should", "than", "that", "their",
  "there", "these", "this", "when", "where", "which", "with", "vendor",
]);

interface SetOptions {
  status: string;
  rule?: string;
  paragraphs?: string;
  note?: string;
  expectedFix?: string;
  distinct?: boolean;
  by: string;
}

interface AddOptions {
  rule: string;
  paragraphs: string;
  status: string;
  note: string;
  expectedFix?: string;
  by: string;
}

interface MergeOptions {
  status?: string;
  note?: string;
  mechanical?: boolean;
  by: string;
}

interface AttestOptions {
  by: string;
  basis: string;
}

interface PromoteOptions {
  allowAgentReview?: boolean;
}

function contractDirectory(contractId: string): string {
  if (!/^[a-z0-9-]+$/.test(contractId)) throw new Error(`Invalid contract id: ${contractId}`);
  return join(CONTRACTS_ROOT, contractId);
}

async function readDraft(contractId: string): Promise<GoldFile> {
  const path = join(contractDirectory(contractId), "gold.draft.json");
  return GoldFileSchema.parse(JSON.parse(await readFile(path, "utf8")) as unknown);
}

async function readParagraphs(contractId: string): Promise<Map<string, string>> {
  const text = await readFile(join(contractDirectory(contractId), "contract.txt"), "utf8");
  return new Map(splitParagraphs(text).map((paragraph, index) => [paragraphId(index), paragraph]));
}

function compact(text: string, limit: number): string {
  return text.length <= limit ? text : `${text.slice(0, limit - 1)}…`;
}

function itemCategories(item: GoldItem): string[] {
  return [...new Set([...(item.cuadCategories ?? []), ...(item.cuadCategory === undefined ? [] : [item.cuadCategory])])];
}

function keywordCandidates(rule: Rule, paragraphs: ReadonlyMap<string, string>): Array<[string, string]> {
  const keywords = [...new Set(
    `${rule.detect} ${rule.cuad.join(" ")}`
      .toLocaleLowerCase("en-US")
      .match(/[a-z][a-z'-]{3,}/g)
      ?.filter((word) => !STOPWORDS.has(word)) ?? [],
  )];
  return [...paragraphs.entries()]
    .map(([id, text]) => {
      const normalized = text.toLocaleLowerCase("en-US");
      const score = keywords.reduce((total, keyword) => {
        const matches = normalized.match(new RegExp(`\\b${keyword.replaceAll("'", "\\'")}\\b`, "g"));
        return total + (matches?.length ?? 0);
      }, 0);
      return { id, text, score };
    })
    .sort((left, right) => right.score - left.score || left.id.localeCompare(right.id))
    .slice(0, 3)
    .map(({ id, text }) => [id, text]);
}

async function listDraft(contractId: string): Promise<void> {
  const [draft, paragraphs, playbook] = await Promise.all([
    readDraft(contractId),
    readParagraphs(contractId),
    loadPlaybookFile(PLAYBOOK_PATH),
  ]);
  for (const item of draft.items) {
    console.log(`${item.id} · ${item.ruleId} · ${item.status} · ${item.labeler}`);
    const provenance = item.mergedFrom === undefined ? "" : ` · mergedFrom ${item.mergedFrom.join(",")}`;
    const distinct = item.distinct === true ? " · distinct" : "";
    if (provenance.length > 0 || distinct.length > 0) console.log(`  metadata:${provenance}${distinct}`);
    if (item.paragraphIds.length === 0) console.log("  paragraphs: (none — clause marked missing)");
    for (const id of item.paragraphIds) console.log(`  ${id}: ${compact(paragraphs.get(id) ?? "[paragraph not found]", 350)}`);
    console.log(`  note: ${item.note ?? "(none)"}`);
    console.log(`  expectedFix: ${item.expectedFix ?? "(none)"}\n`);
  }

  const represented = new Set(draft.items.map((item) => item.ruleId));
  for (const rule of playbook.rules.filter((candidate) => !represented.has(candidate.id))) {
    console.log(`NO ITEM · ${rule.id} · ${rule.title}`);
    for (const [id, text] of keywordCandidates(rule, paragraphs)) console.log(`  ${id}: ${compact(text, 200)}`);
    console.log();
  }
}

function reviewedItem(item: GoldItem, options: SetOptions): GoldItem {
  const status = GoldStatusSchema.parse(options.status);
  const categories = itemCategories(item);
  return {
    ...item,
    ruleId: options.rule ?? item.ruleId,
    status,
    paragraphIds: status === "missing" ? [] : item.paragraphIds,
    labeler: categories.length === 0 ? "human" : "cuad+human",
    cuadCategory: categories[0],
    cuadCategories: categories.length === 0 ? undefined : categories,
    distinct: options.distinct === true ? true : item.distinct,
    note: options.note ?? item.note,
    expectedFix: options.expectedFix ?? item.expectedFix,
    reviewedAt: new Date().toISOString(),
    reviewedBy: options.by,
  };
}

async function setItem(contractId: string, itemId: string, options: SetOptions): Promise<void> {
  const [draft, playbook, paragraphs] = await Promise.all([
    readDraft(contractId),
    loadPlaybookFile(PLAYBOOK_PATH),
    readParagraphs(contractId),
  ]);
  if (options.rule !== undefined && !playbook.rules.some((rule) => rule.id === options.rule)) {
    throw new Error(`Unknown rule id: ${options.rule}`);
  }
  const index = draft.items.findIndex((item) => item.id === itemId);
  if (index < 0) throw new Error(`${contractId}: item ${itemId} not found`);
  const items = [...draft.items];
  items[index] = reviewedItem(items[index], options);
  if (options.paragraphs !== undefined) {
    items[index] = {
      ...items[index],
      paragraphIds: parseParagraphIds(options.paragraphs, items[index].status, paragraphs),
    };
  }
  await atomicWriteJson(join(contractDirectory(contractId), "gold.draft.json"), GoldFileSchema.parse({ ...draft, items }));
  console.log(`${contractId}: reviewed ${itemId} as ${options.status} by ${options.by}`);
}

function combineText(values: Array<string | undefined>, reviewerNote?: string): string | undefined {
  const combined = [...new Set([...values.filter((value): value is string => value !== undefined), reviewerNote].filter(
    (value): value is string => value !== undefined && value.length > 0,
  ))];
  return combined.length === 0 ? undefined : combined.join("\n");
}

async function mergeItems(contractId: string, itemIdsValue: string, options: MergeOptions): Promise<void> {
  const draft = await readDraft(contractId);
  const itemIds = [...new Set(itemIdsValue.split(",").map((id) => id.trim()).filter(Boolean))];
  if (itemIds.length < 2) throw new Error("merge requires at least two comma-separated item ids");
  const selected = itemIds.map((id) => {
    const item = draft.items.find((candidate) => candidate.id === id);
    if (item === undefined) throw new Error(`${contractId}: item ${id} not found`);
    return item;
  });
  const rules = [...new Set(selected.map((item) => item.ruleId))];
  if (rules.length !== 1) throw new Error(`Cannot merge different rules: ${rules.join(", ")}`);
  const statuses = [...new Set(selected.map((item) => item.status))];
  if (options.status === undefined && statuses.length !== 1) {
    throw new Error(`Mixed statuses require --status (${statuses.join(", ")})`);
  }
  const status = GoldStatusSchema.parse(options.status ?? statuses[0]);
  const categories = [...new Set(selected.flatMap(itemCategories))];
  const mergedFrom = [...new Set(selected.flatMap((item) => item.mergedFrom ?? [item.id]))];
  const item: GoldItem = {
    id: nextId(draft.items),
    ruleId: rules[0],
    paragraphIds:
      status === "missing" ? [] : [...new Set(selected.flatMap((source) => source.paragraphIds))].sort(),
    status,
    cuadCategory: categories[0],
    cuadCategories: categories.length === 0 ? undefined : categories,
    spanText: selected.find((source) => source.spanText !== undefined)?.spanText,
    labeler:
      options.mechanical === true
        ? categories.length === 0
          ? "llm-draft"
          : "cuad+llm-draft"
        : categories.length === 0
          ? "human"
          : "cuad+human",
    note: combineText(selected.map((source) => source.note), options.note),
    expectedFix: combineText(selected.map((source) => source.expectedFix)),
    mergedFrom,
    reviewedAt: options.mechanical === true ? undefined : new Date().toISOString(),
    reviewedBy: options.mechanical === true ? undefined : options.by,
  };
  const selectedSet = new Set(itemIds);
  const items = [...draft.items.filter((candidate) => !selectedSet.has(candidate.id)), item];
  await atomicWriteJson(join(contractDirectory(contractId), "gold.draft.json"), GoldFileSchema.parse({ ...draft, items }));
  console.log(`${contractId}: merged ${itemIds.join(",")} into ${item.id}`);
}

function parseParagraphIds(value: string, status: string, paragraphs: ReadonlyMap<string, string>): string[] {
  if (status === "missing") return [];
  const ids = value.split(",").map((id) => id.trim()).filter(Boolean);
  if (ids.length === 0) throw new Error("A non-missing item requires at least one paragraph id");
  for (const id of ids) if (!paragraphs.has(id)) throw new Error(`Unknown paragraph id: ${id}`);
  return [...new Set(ids)];
}

function nextId(items: readonly GoldItem[]): string {
  const highest = items.reduce((maximum, item) => {
    const numeric = /^g(\d+)$/.exec(item.id)?.[1];
    return numeric === undefined ? maximum : Math.max(maximum, Number.parseInt(numeric, 10));
  }, 0);
  return `g${String(highest + 1).padStart(3, "0")}`;
}

async function addItem(contractId: string, options: AddOptions): Promise<void> {
  const [draft, paragraphs, playbook] = await Promise.all([
    readDraft(contractId),
    readParagraphs(contractId),
    loadPlaybookFile(PLAYBOOK_PATH),
  ]);
  if (!playbook.rules.some((rule) => rule.id === options.rule)) throw new Error(`Unknown rule id: ${options.rule}`);
  const status = GoldStatusSchema.parse(options.status);
  const item: GoldItem = {
    id: nextId(draft.items),
    ruleId: options.rule,
    paragraphIds: parseParagraphIds(options.paragraphs, status, paragraphs),
    status,
    labeler: "human",
    note: options.note,
    expectedFix: options.expectedFix,
    reviewedAt: new Date().toISOString(),
    reviewedBy: options.by,
  };
  await atomicWriteJson(
    join(contractDirectory(contractId), "gold.draft.json"),
    GoldFileSchema.parse({ ...draft, items: [...draft.items, item] }),
  );
  console.log(`${contractId}: added ${item.id} for ${item.ruleId}`);
}

async function removeItem(contractId: string, itemId: string): Promise<void> {
  const draft = await readDraft(contractId);
  const items = draft.items.filter((item) => item.id !== itemId);
  if (items.length === draft.items.length) throw new Error(`${contractId}: item ${itemId} not found`);
  await atomicWriteJson(join(contractDirectory(contractId), "gold.draft.json"), { ...draft, items });
  console.log(`${contractId}: removed ${itemId}`);
}

async function attestDraft(contractId: string, options: AttestOptions): Promise<void> {
  const [draft, playbook, paragraphs] = await Promise.all([
    readDraft(contractId),
    loadPlaybookFile(PLAYBOOK_PATH),
    readParagraphs(contractId),
  ]);
  if (options.basis.trim().length < 10) throw new Error("--basis must describe the review performed");
  const knownRules = new Set(playbook.rules.map((rule) => rule.id));
  const represented = new Set(draft.items.map((item) => item.ruleId));
  const missingRules = [...knownRules].filter((ruleId) => !represented.has(ruleId));
  if (missingRules.length > 0) throw new Error(`${contractId}: missing rules ${missingRules.join(", ")}`);
  const invalid = draft.items.filter((item) =>
    !knownRules.has(item.ruleId) || item.note === undefined || item.expectedFix === undefined ||
    item.paragraphIds.some((id) => !paragraphs.has(id)) ||
    (item.status === "missing" && item.paragraphIds.length > 0));
  if (invalid.length > 0) throw new Error(`${contractId}: invalid reviewed items ${invalid.map((item) => item.id).join(", ")}`);
  const now = new Date().toISOString();
  const items = draft.items.map((item) => {
    const categories = itemCategories(item);
    return {
      ...item,
      labeler: categories.length === 0 ? "agent-reviewed" : "cuad+agent-reviewed",
      reviewedAt: item.reviewedAt ?? now,
      reviewedBy: item.reviewedBy ?? options.by,
    };
  });
  await atomicWriteJson(join(contractDirectory(contractId), "gold.draft.json"), GoldFileSchema.parse({ ...draft, items }));
  console.log(`${contractId}: attested ${items.length} reviewed items by ${options.by} (${options.basis})`);
}

async function appendPromotionLog(contractId: string, draft: GoldFile): Promise<void> {
  let existing: string;
  try {
    existing = await readFile(LOG_PATH, "utf8");
  } catch (error) {
    if (!(error instanceof Error && "code" in error && error.code === "ENOENT")) throw error;
    existing = "# Gold-label promotion log\n\n";
  }
  const reviewers = [...new Set(draft.items.map((item) => item.reviewedBy ?? "unrecorded"))].sort().join(", ");
  const labelers = [...new Set(draft.items.map((item) => item.labeler))].sort().join(", ");
  const count = (status: GoldItem["status"]): number => draft.items.filter((item) => item.status === status).length;
  const distinct = draft.items.filter((item) => item.distinct === true).length;
  const line =
    `- ${new Date().toISOString()} · ${contractId} · ${draft.items.length} items ` +
    `(deviation ${count("deviation")}, compliant ${count("compliant")}, missing ${count("missing")}, ` +
    `ambiguous ${count("ambiguous")}; distinct ${distinct}) · labelers: ${labelers} · reviewedBy: ${reviewers}\n`;
  await atomicWrite(LOG_PATH, `${existing.trimEnd()}\n${line}`);
}

async function promote(contractId: string, options: PromoteOptions): Promise<void> {
  const draft = await readDraft(contractId);
  const humanReviewed = hasOnlyHumanLabels(draft);
  const agentReviewed = options.allowAgentReview === true && hasOnlyAgentReviewLabels(draft);
  if (!humanReviewed && !agentReviewed) {
    const expected = options.allowAgentReview === true
      ? "human or explicit agent review"
      : "human review";
    throw new Error(`${contractId}: labels do not satisfy ${expected}; inspect every draft item before promotion`);
  }
  const nonDistinctByRule = new Map<string, string[]>();
  for (const item of draft.items.filter((candidate) => candidate.distinct !== true)) {
    const ids = nonDistinctByRule.get(item.ruleId) ?? [];
    ids.push(item.id);
    nonDistinctByRule.set(item.ruleId, ids);
  }
  const duplicate = [...nonDistinctByRule.entries()].find(([, ids]) => ids.length > 1);
  if (duplicate !== undefined) {
    throw new Error(`${contractId}: rule ${duplicate[0]} has multiple non-distinct items (${duplicate[1].join(", ")})`);
  }
  await atomicWriteJson(join(contractDirectory(contractId), "gold.json"), draft);
  await appendPromotionLog(contractId, draft);
  const reviewKind = humanReviewed ? "human-reviewed" : "agent-reviewed";
  console.log(`${contractId}: promoted ${draft.items.length} ${reviewKind} items to gold.json`);
}

const program = new Command().name("gold-review").description("Review and promote CUAD gold-label drafts");
program.command("list").argument("<contractId>").action(listDraft);
program
  .command("set")
  .argument("<contractId>")
  .argument("<itemId>")
  .requiredOption("--status <status>")
  .option("--rule <ruleId>")
  .option("--paragraphs <ids>")
  .option("--note <note>")
  .option("--expected-fix <expectedFix>")
  .option("--distinct", "mark this as a genuinely separate clause")
  .option("--by <reviewer>", "reviewer name", "lead")
  .action(setItem);
program
  .command("add")
  .argument("<contractId>")
  .requiredOption("--rule <ruleId>")
  .requiredOption("--paragraphs <ids>")
  .requiredOption("--status <status>")
  .requiredOption("--note <note>")
  .option("--expected-fix <expectedFix>")
  .option("--by <reviewer>", "reviewer name", "lead")
  .action(addItem);
program
  .command("merge")
  .argument("<contractId>")
  .argument("<itemIds>")
  .option("--status <status>")
  .option("--note <note>")
  .option("--mechanical", "merge draft fragments without marking them human-reviewed")
  .option("--by <reviewer>", "reviewer name", "lead")
  .action(mergeItems);
program.command("remove").argument("<contractId>").argument("<itemId>").action(removeItem);
program
  .command("attest")
  .argument("<contractId>")
  .requiredOption("--by <reviewer>")
  .requiredOption("--basis <description>")
  .action(attestDraft);
program
  .command("promote")
  .argument("<contractId>")
  .option("--allow-agent-review", "promote transparently agent-reviewed evaluation gold")
  .action(promote);

void program.parseAsync().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
