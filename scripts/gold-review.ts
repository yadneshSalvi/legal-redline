import { readFile } from "node:fs/promises";
import { join, resolve } from "node:path";

import { Command } from "commander";

import {
  GoldFileSchema,
  GoldStatusSchema,
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
  note?: string;
  expectedFix?: string;
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

function compact(text: string): string {
  return text.length <= 900 ? text : `${text.slice(0, 899)}…`;
}

function keywordCandidates(rule: Rule, paragraphs: ReadonlyMap<string, string>): Array<[string, string]> {
  const keywords = [...new Set(
    rule.detect
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
    if (item.paragraphIds.length === 0) console.log("  paragraphs: (none — clause marked missing)");
    for (const id of item.paragraphIds) console.log(`  ${id}: ${compact(paragraphs.get(id) ?? "[paragraph not found]")}`);
    console.log(`  note: ${item.note ?? "(none)"}`);
    console.log(`  expectedFix: ${item.expectedFix ?? "(none)"}\n`);
  }

  const represented = new Set(draft.items.map((item) => item.ruleId));
  for (const rule of playbook.rules.filter((candidate) => !represented.has(candidate.id))) {
    console.log(`NO ITEM · ${rule.id} · ${rule.title}`);
    for (const [id, text] of keywordCandidates(rule, paragraphs)) console.log(`  ${id}: ${compact(text)}`);
    console.log();
  }
}

function reviewedItem(item: GoldItem, options: SetOptions): GoldItem {
  const status = GoldStatusSchema.parse(options.status);
  return {
    ...item,
    status,
    paragraphIds: status === "missing" ? [] : item.paragraphIds,
    labeler: item.cuadCategory === undefined ? "human" : "cuad+human",
    note: options.note ?? item.note,
    expectedFix: options.expectedFix ?? item.expectedFix,
    reviewedAt: new Date().toISOString(),
    reviewedBy: options.by,
  };
}

async function setItem(contractId: string, itemId: string, options: SetOptions): Promise<void> {
  const draft = await readDraft(contractId);
  const index = draft.items.findIndex((item) => item.id === itemId);
  if (index < 0) throw new Error(`${contractId}: item ${itemId} not found`);
  const items = [...draft.items];
  items[index] = reviewedItem(items[index], options);
  await atomicWriteJson(join(contractDirectory(contractId), "gold.draft.json"), GoldFileSchema.parse({ ...draft, items }));
  console.log(`${contractId}: reviewed ${itemId} as ${options.status} by ${options.by}`);
}

function parseParagraphIds(value: string, status: string, paragraphs: ReadonlyMap<string, string>): string[] {
  if (status === "missing") return [];
  const ids = value.split(",").map((id) => id.trim()).filter(Boolean);
  if (ids.length === 0) throw new Error("A non-missing item requires at least one paragraph id");
  for (const id of ids) if (!paragraphs.has(id)) throw new Error(`Unknown paragraph id: ${id}`);
  return [...new Set(ids)];
}

function nextId(items: readonly GoldItem[]): string {
  const used = new Set(items.map((item) => item.id));
  for (let index = 1; ; index += 1) {
    const id = `g${String(index).padStart(3, "0")}`;
    if (!used.has(id)) return id;
  }
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

async function appendPromotionLog(contractId: string, draft: GoldFile): Promise<void> {
  let existing: string;
  try {
    existing = await readFile(LOG_PATH, "utf8");
  } catch (error) {
    if (!(error instanceof Error && "code" in error && error.code === "ENOENT")) throw error;
    existing = "# Gold-label promotion log\n\n";
  }
  const reviewers = [...new Set(draft.items.map((item) => item.reviewedBy ?? "unrecorded"))].sort().join(", ");
  const line = `- ${new Date().toISOString()} · ${contractId} · ${draft.items.length} items · ${reviewers}\n`;
  await atomicWrite(LOG_PATH, `${existing.trimEnd()}\n${line}`);
}

async function promote(contractId: string): Promise<void> {
  const draft = await readDraft(contractId);
  if (!hasOnlyHumanLabels(draft)) {
    const pending = draft.items.filter((item) => item.labeler !== "human" && item.labeler !== "cuad+human");
    throw new Error(`${contractId}: ${pending.length} items still need human review (${pending.map((item) => item.id).join(", ")})`);
  }
  await atomicWriteJson(join(contractDirectory(contractId), "gold.json"), draft);
  await appendPromotionLog(contractId, draft);
  console.log(`${contractId}: promoted ${draft.items.length} human-reviewed items to gold.json`);
}

const program = new Command().name("gold-review").description("Review and promote CUAD gold-label drafts");
program.command("list").argument("<contractId>").action(listDraft);
program
  .command("set")
  .argument("<contractId>")
  .argument("<itemId>")
  .requiredOption("--status <status>")
  .option("--note <note>")
  .option("--expected-fix <expectedFix>")
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
program.command("remove").argument("<contractId>").argument("<itemId>").action(removeItem);
program.command("promote").argument("<contractId>").action(promote);

void program.parseAsync().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
