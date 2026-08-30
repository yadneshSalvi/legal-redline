import "dotenv/config";

import { readFile, readdir } from "node:fs/promises";
import { join, resolve } from "node:path";

import OpenAI from "openai";
import { zodTextFormat } from "openai/helpers/zod";
import { z } from "zod";

import { GoldFileSchema, type GoldFile, type GoldItem } from "@/src/eval/gold";
import { atomicWriteJson, requestHash } from "@/src/eval/io";
import { loadPlaybookFile } from "@/src/eval/playbook";
import { splitParagraphs } from "@/src/engine/text";

const MissingRuleResultSchema = z.object({
  ruleId: z.enum(["INDEMN", "INSURANCE", "TRANSITION", "T4C", "WARRANTY"]),
  status: z.enum(["missing", "present"]),
  note: z.string().min(1),
  expectedFix: z.string().min(1),
});

const LabelResponseSchema = z.object({
  ourParty: z.object({ name: z.string().min(1), role: z.string().min(1) }),
  counterparty: z.object({ name: z.string().min(1), role: z.string().min(1) }),
  spans: z.array(
    z.object({
      id: z.string().min(1),
      status: z.enum(["deviation", "compliant"]),
      note: z.string().min(1),
      expectedFix: z.string().min(1),
    }),
  ),
  missingRules: z.array(MissingRuleResultSchema),
});

type LabelResponse = z.infer<typeof LabelResponseSchema>;

const LongLabelResponseSchema = z.object({
  ourParty: z.object({ name: z.string().min(1), role: z.string().min(1) }),
  counterparty: z.object({ name: z.string().min(1), role: z.string().min(1) }),
  items: z.array(z.object({
    ruleId: z.string().min(1),
    status: z.enum(["deviation", "missing", "compliant", "ambiguous"]),
    paragraphIds: z.array(z.string().regex(/^p\d{4}$/)),
    sourceSpanIds: z.array(z.string().min(1)),
    distinct: z.boolean(),
    note: z.string().min(1),
    expectedFix: z.string().min(1),
  })),
});

type LongLabelResponse = z.infer<typeof LongLabelResponseSchema>;

const SYSTEM =
  "You assist a human lawyer preparing gold labels for a customer-side contract-review evaluation. " +
  "Apply the supplied playbook literally, resolve party direction and defined terms, and return a concise " +
  "assessment for every supplied CUAD span. A CUAD span merely locates a clause; it is not automatically a deviation.";

async function cachedLabel(input: {
  contractId: string;
  prompt: string;
  cacheDir: string;
}): Promise<LabelResponse> {
  const body = {
    model: "gpt-5.6-sol",
    reasoning: { effort: "high" },
    system: SYSTEM,
    messages: [{ role: "user", content: input.prompt }],
    output_config: { format: "LabelResponseSchema-v1" },
  };
  const hash = requestHash(body);
  const cachePath = join(input.cacheDir, `${hash}.json`);
  try {
    return LabelResponseSchema.parse(JSON.parse(await readFile(cachePath, "utf8")));
  } catch (error) {
    if (!(error instanceof Error && "code" in error && error.code === "ENOENT")) throw error;
  }

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const response = await client.responses.parse({
    model: "gpt-5.6-sol",
    reasoning: { effort: "high" },
    input: [
      { role: "system", content: SYSTEM },
      { role: "user", content: input.prompt },
    ],
    text: { format: zodTextFormat(LabelResponseSchema, "contract_gold_draft") },
  });
  if (response.output_parsed === null) throw new Error(`No parsed label response for ${input.contractId}`);
  await atomicWriteJson(cachePath, response.output_parsed);
  return response.output_parsed;
}

async function cachedLongLabel(input: {
  contractId: string;
  prompt: string;
  cacheDir: string;
}): Promise<LongLabelResponse> {
  const body = {
    model: "gpt-5.6-sol",
    reasoning: { effort: "high" },
    system: SYSTEM,
    messages: [{ role: "user", content: input.prompt }],
    output_config: { format: "LongLabelResponseSchema-v1" },
  };
  const hash = requestHash(body);
  const cachePath = join(input.cacheDir, `${hash}.json`);
  try {
    return LongLabelResponseSchema.parse(JSON.parse(await readFile(cachePath, "utf8")));
  } catch (error) {
    if (!(error instanceof Error && "code" in error && error.code === "ENOENT")) throw error;
  }

  const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const response = await client.responses.parse({
    model: "gpt-5.6-sol",
    reasoning: { effort: "high" },
    input: [
      { role: "system", content: SYSTEM },
      { role: "user", content: input.prompt },
    ],
    text: { format: zodTextFormat(LongLabelResponseSchema, "long_contract_gold_draft") },
  });
  if (response.output_parsed === null) throw new Error(`No parsed long-tier labels for ${input.contractId}`);
  await atomicWriteJson(cachePath, response.output_parsed);
  return response.output_parsed;
}

function labelingPrompt(input: {
  contractId: string;
  text: string;
  draft: GoldFile;
  playbook: Awaited<ReturnType<typeof loadPlaybookFile>>;
}): string {
  const numbered = splitParagraphs(input.text)
    .map((paragraph, index) => `[p${String(index).padStart(4, "0")}] ${paragraph}`)
    .join("\n\n");
  const spans = input.draft.items.map((item) => ({
    id: item.id,
    ruleId: item.ruleId,
    category: item.cuadCategory,
    paragraphIds: item.paragraphIds,
    spanText: item.spanText,
  }));
  const rules = input.playbook.rules.map((rule) => ({
    id: rule.id,
    kind: rule.kind,
    title: rule.title,
    position: rule.position,
    detect: rule.detect,
  }));
  return [
    `Contract id: ${input.contractId}`,
    "Identify the legal parties and select the customer/licensee/client side as ourParty.",
    "For every span id, return deviation or compliant plus a one-line note and expectedFix. For a compliant span, expectedFix must say that no change is needed and why.",
    "Also assess whether each of INDEMN, INSURANCE, TRANSITION, T4C, and WARRANTY is wholly absent. Return exactly those five rule ids with status missing or present. T4C and WARRANTY count as missing when no usable customer convenience right or express performance warranty exists.",
    `Playbook rules:\n${JSON.stringify(rules)}`,
    `CUAD-mapped spans:\n${JSON.stringify(spans)}`,
    `Numbered contract:\n${numbered}`,
  ].join("\n\n");
}

function longLabelingPrompt(input: {
  contractId: string;
  text: string;
  draft: GoldFile;
  playbook: Awaited<ReturnType<typeof loadPlaybookFile>>;
}): string {
  const numbered = splitParagraphs(input.text)
    .map((paragraph, index) => `[p${String(index).padStart(4, "0")}] ${paragraph}`)
    .join("\n\n");
  const sourceSpans = input.draft.items.map((item, index) => ({
    sourceSpanId: `s${String(index + 1).padStart(3, "0")}`,
    ruleId: item.ruleId,
    category: item.cuadCategory,
    paragraphIds: item.paragraphIds,
    spanText: item.spanText,
  }));
  const rules = input.playbook.rules.map((rule) => ({
    id: rule.id,
    kind: rule.kind,
    title: rule.title,
    position: rule.position,
    detect: rule.detect,
  }));
  return [
    `Contract id: ${input.contractId}`,
    "This is a gold-label draft, not a system evaluation. Identify the legal parties and treat the customer/licensee/client side as ourParty.",
    "Return at least one item for EVERY supplied rule id and no unknown rule ids. Ordinarily return exactly one item per rule. Return a second item for a rule only when CUAD identifies a genuinely separate operative clause; mark only the additional item distinct=true.",
    "Use deviation only when customer-side counsel would redline under the preferred/fallback standard; use compliant when the clause reaches fallback or a presence/direction rule is absent or benefits Customer; use missing when a required provision is absent; use ambiguous whenever careful lawyers could differ or a CUAD-located clause conflicts with a missing/presence assessment.",
    "Anchor each present item to the full operative paragraph ids. Assign every relevant CUAD sourceSpanId to an item of the same rule. CUAD spans locate expert-labelled categories but do not determine compliance. For a genuinely absent clause return no paragraph or source span ids. Explain the status in note and the required change (or why none is needed) in expectedFix.",
    `Playbook rules:\n${JSON.stringify(rules)}`,
    `CUAD expert source spans:\n${JSON.stringify(sourceSpans)}`,
    `Numbered contract:\n${numbered}`,
  ].join("\n\n");
}

async function labelContract(input: {
  id: string;
  contractsRoot: string;
  cacheDir: string;
  playbook: Awaited<ReturnType<typeof loadPlaybookFile>>;
}): Promise<void> {
  const directory = join(input.contractsRoot, input.id);
  const [text, rawDraft, rawMeta] = await Promise.all([
    readFile(join(directory, "contract.txt"), "utf8"),
    readFile(join(directory, "gold.draft.json"), "utf8"),
    readFile(join(directory, "meta.json"), "utf8"),
  ]);
  const draft = GoldFileSchema.parse(JSON.parse(rawDraft));
  const meta = JSON.parse(rawMeta) as Record<string, unknown>;
  const response = await cachedLabel({
    contractId: input.id,
    prompt: labelingPrompt({ contractId: input.id, text, draft, playbook: input.playbook }),
    cacheDir: input.cacheDir,
  });
  const results = new Map(response.spans.map((span) => [span.id, span]));
  const items: GoldItem[] = draft.items.map((item) => {
    const result = results.get(item.id);
    if (result === undefined) throw new Error(`${input.id}: model omitted mapped span ${item.id}`);
    return {
      ...item,
      status: result.status,
      labeler: "cuad+llm-draft",
      note: result.note,
      expectedFix: result.expectedFix,
    };
  });
  for (const result of response.missingRules.sort((left, right) => left.ruleId.localeCompare(right.ruleId))) {
    if (result.status !== "missing") continue;
    items.push({
      id: `g${String(items.length + 1).padStart(3, "0")}`,
      ruleId: result.ruleId,
      paragraphIds: [],
      status: "missing",
      labeler: "llm-draft",
      note: result.note,
      expectedFix: result.expectedFix,
    });
  }
  const labelled = GoldFileSchema.parse({ contractId: input.id, items });
  await atomicWriteJson(join(directory, "gold.draft.json"), labelled);
  await atomicWriteJson(join(directory, "meta.json"), {
    ...meta,
    ourParty: response.ourParty,
    counterparty: response.counterparty,
  });
  console.log(`${input.id}: labelled ${items.length} draft gold items; human confirmation still required`);
}

async function labelLongContract(input: {
  id: string;
  contractsRoot: string;
  cacheDir: string;
  playbook: Awaited<ReturnType<typeof loadPlaybookFile>>;
}): Promise<void> {
  const directory = join(input.contractsRoot, input.id);
  const [text, rawDraft, rawMeta] = await Promise.all([
    readFile(join(directory, "contract.txt"), "utf8"),
    readFile(join(directory, "gold.cuad.json"), "utf8"),
    readFile(join(directory, "meta.json"), "utf8"),
  ]);
  const mappedDraft = GoldFileSchema.parse(JSON.parse(rawDraft));
  const meta = JSON.parse(rawMeta) as Record<string, unknown>;
  const paragraphs = splitParagraphs(text);
  const response = await cachedLongLabel({
    contractId: input.id,
    prompt: longLabelingPrompt({ contractId: input.id, text, draft: mappedDraft, playbook: input.playbook }),
    cacheDir: input.cacheDir,
  });
  const rules = new Set(input.playbook.rules.map((rule) => rule.id));
  const sourceSpans = new Map(mappedDraft.items.map((item, index) => [
    `s${String(index + 1).padStart(3, "0")}`,
    item,
  ]));
  const grouped = new Map<string, LongLabelResponse["items"]>();
  for (const item of response.items) {
    if (!rules.has(item.ruleId)) throw new Error(`${input.id}: unknown rule ${item.ruleId}`);
    for (const paragraphId of item.paragraphIds) {
      const index = Number.parseInt(paragraphId.slice(1), 10);
      if (paragraphs[index] === undefined) throw new Error(`${input.id}: unknown paragraph ${paragraphId}`);
    }
    for (const sourceSpanId of item.sourceSpanIds) {
      const source = sourceSpans.get(sourceSpanId);
      if (source === undefined) throw new Error(`${input.id}: unknown source span ${sourceSpanId}`);
      if (source.ruleId !== item.ruleId) throw new Error(`${input.id}: ${sourceSpanId} belongs to ${source.ruleId}, not ${item.ruleId}`);
    }
    const values = grouped.get(item.ruleId) ?? [];
    values.push(item);
    grouped.set(item.ruleId, values);
  }
  for (const ruleId of rules) {
    const values = grouped.get(ruleId) ?? [];
    if (values.length === 0 || values.length > 2) throw new Error(`${input.id}: expected one or two ${ruleId} items, found ${values.length}`);
  }

  const items: GoldItem[] = [];
  for (const rule of input.playbook.rules) {
    const values = grouped.get(rule.id) ?? [];
    const claimed = new Set(values.flatMap((item) => item.sourceSpanIds));
    const unclaimed = [...sourceSpans.entries()]
      .filter(([id, source]) => source.ruleId === rule.id && !claimed.has(id))
      .map(([id]) => id);
    values[0].sourceSpanIds.push(...unclaimed);
    for (const [index, value] of values.entries()) {
      const sources = value.sourceSpanIds.map((id) => sourceSpans.get(id)).filter((item): item is GoldItem => item !== undefined);
      const categories = [...new Set(sources.flatMap((source) =>
        source.cuadCategories ?? (source.cuadCategory === undefined ? [] : [source.cuadCategory])))];
      let status = value.status;
      let note = value.note;
      let paragraphIds = status === "missing"
        ? []
        : [...new Set([...value.paragraphIds, ...sources.flatMap((source) => source.paragraphIds)])].sort();
      if (status === "missing" && sources.length > 0) {
        status = "ambiguous";
        paragraphIds = [...new Set(sources.flatMap((source) => source.paragraphIds))].sort();
        note = `CUAD locates a mapped clause although the assisted assessment called the rule missing; treated as ambiguous. ${note}`;
      }
      items.push({
        id: `g${String(items.length + 1).padStart(3, "0")}`,
        ruleId: rule.id,
        paragraphIds,
        status,
        ...(categories.length === 0 ? {} : {
          cuadCategory: categories[0],
          cuadCategories: categories,
          spanText: sources.map((source) => source.spanText).filter(Boolean).join("\n---\n"),
        }),
        labeler: categories.length === 0 ? "llm-draft" : "cuad+llm-draft",
        ...(index === 0 ? {} : { distinct: true }),
        note,
        expectedFix: value.expectedFix,
      });
    }
  }
  const labelled = GoldFileSchema.parse({ contractId: input.id, items });
  await atomicWriteJson(join(directory, "gold.draft.json"), labelled);
  await atomicWriteJson(join(directory, "meta.json"), {
    ...meta,
    ourParty: response.ourParty,
    counterparty: response.counterparty,
  });
  console.log(`${input.id}: drafted ${items.length} rule-complete gold items; independent review still required`);
}

async function main(): Promise<void> {
  const contractsRoot = resolve("data/contracts");
  const promoteIndex = process.argv.indexOf("--promote");
  if (promoteIndex >= 0) {
    const id = process.argv[promoteIndex + 1];
    if (id === undefined) throw new Error("--promote requires a contract id");
    throw new Error(
      `Automatic promotion is disabled for ${id}. Use scripts/gold-review.ts to review each item, then run its promote command.`,
    );
  }
  const playbook = await loadPlaybookFile(resolve("data/playbooks/customer-vendor-services.yaml"));
  const entries = await readdir(contractsRoot, { withFileTypes: true });
  const tierIndex = process.argv.indexOf("--tier");
  const tier = tierIndex < 0 ? undefined : process.argv[tierIndex + 1];
  const contractsIndex = process.argv.indexOf("--contracts");
  const requested = contractsIndex < 0 ? undefined : new Set(
    (process.argv[contractsIndex + 1] ?? "").split(",").map((id) => id.trim()).filter(Boolean),
  );
  const prefix = tier === "long" ? "long-" : "cuad-";
  const ids = entries
    .filter((entry) => entry.isDirectory() && entry.name.startsWith(prefix) && (requested === undefined || requested.has(entry.name)))
    .map((entry) => entry.name)
    .sort();
  if (requested !== undefined && ids.length !== requested.size) {
    const found = new Set(ids);
    throw new Error(`Unknown requested contracts: ${[...requested].filter((id) => !found.has(id)).join(", ")}`);
  }
  for (const id of ids) {
    if (id.startsWith("long-")) {
      await labelLongContract({ id, contractsRoot, cacheDir: resolve("evals/cache/labeling-long-v1"), playbook });
    } else {
      await labelContract({ id, contractsRoot, cacheDir: resolve("evals/cache/labeling"), playbook });
    }
  }
}

void main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
