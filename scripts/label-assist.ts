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
  const ids = entries.filter((entry) => entry.isDirectory() && entry.name.startsWith("cuad-")).map((entry) => entry.name).sort();
  for (const id of ids) {
    await labelContract({ id, contractsRoot, cacheDir: resolve("evals/cache/labeling"), playbook });
  }
}

void main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
