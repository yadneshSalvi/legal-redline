import { readFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";

import { Command } from "commander";

import {
  buildHardCase,
  type EvalParagraph,
} from "@/src/eval/deviations";
import type { GoldFile } from "@/src/eval/gold";
import { atomicWrite, atomicWriteJson } from "@/src/eval/io";
import { applySeededDeviations } from "@/src/eval/seed";
import { buildSyntheticGold } from "@/src/eval/synthetic-gold";
import { splitParagraphs } from "@/src/engine/text";

interface EngineModule {
  textToDocx?: (text: string, options?: { title?: string }) => Promise<Uint8Array>;
}

const PARTY_PAIRS = [
  ["Aster Peak Industries, Inc.", "Nimbus Harbor Software LLC"],
  ["Redwood Commerce Group, Inc.", "Silverline Systems Ltd."],
  ["Juniper Ridge Health, Inc.", "Cobalt Cloud Services LLC"],
  ["Meridian Fieldworks, Inc.", "Copperleaf Technology Ltd."],
  ["Atlas Grove Markets, Inc.", "Bluewater Platform Services LLC"],
] as const;

function baseParagraphs(template: string): EvalParagraph[] {
  return splitParagraphs(template).map((text, index) => ({ key: `source-${index}`, text }));
}

function renameParties(text: string, customer: string, vendor: string): string {
  return text
    .replaceAll("Northwind Analytics, Inc.", customer)
    .replaceAll("NORTHWIND ANALYTICS, INC.", customer.toLocaleUpperCase("en-US"))
    .replaceAll("Brightline Cloud Services Ltd.", vendor)
    .replaceAll("BRIGHTLINE CLOUD SERVICES LTD.", vendor.toLocaleUpperCase("en-US"));
}

async function loadTextToDocx(): Promise<EngineModule["textToDocx"]> {
  try {
    const moduleName = pathToFileURL(resolve("src/engine/docx-write.ts")).href;
    return ((await import(moduleName)) as EngineModule).textToDocx;
  } catch {
    return undefined;
  }
}

async function writeContract(input: {
  id: string;
  title: string;
  text: string;
  gold: GoldFile;
  meta: Record<string, unknown>;
  textToDocx?: EngineModule["textToDocx"];
}): Promise<void> {
  const directory = resolve("data/contracts", input.id);
  await atomicWrite(join(directory, "contract.txt"), input.text);
  await atomicWriteJson(join(directory, "gold.json"), input.gold);
  await atomicWriteJson(join(directory, "meta.json"), input.meta);
  if (input.textToDocx !== undefined) {
    await atomicWrite(join(directory, "contract.docx"), await input.textToDocx(input.text, { title: input.title }));
  }
}

async function writeSeeded(template: string, seed: number, textToDocx: EngineModule["textToDocx"]): Promise<void> {
  const id = `synth-${seed}`;
  const pair = PARTY_PAIRS[Math.abs(seed) % PARTY_PAIRS.length];
  const generated = applySeededDeviations(baseParagraphs(template), seed);
  const renamed = generated.paragraphs.map((paragraph) => ({
    ...paragraph,
    text: renameParties(paragraph.text, pair[0], pair[1]),
  }));
  const text = `${renamed.map((paragraph) => paragraph.text).join("\n\n")}\n`;
  const title = `Synthetic Master Services Agreement ${seed}`;
  await writeContract({
    id,
    title,
    text,
    gold: buildSyntheticGold(id, renamed, generated.items),
    meta: {
      id,
      source: "synthetic",
      title,
      words: text.trim().split(/\s+/).length,
      paragraphs: renamed.length,
      ourParty: { name: pair[0], role: "Customer" },
      counterparty: { name: pair[1], role: "Vendor" },
      seed,
      deviations: generated.items.map((item) => ({ ruleId: item.ruleId, variant: item.variant })),
    },
    textToDocx,
  });
  console.log(`${id}: ${generated.items.length} exact injected deviations`);
}

async function writeHardCase(template: string, textToDocx: EngineModule["textToDocx"]): Promise<void> {
  const id = "synth-hardcase";
  const generated = buildHardCase(baseParagraphs(template));
  const text = `${generated.paragraphs.map((paragraph) => paragraph.text).join("\n\n")}\n`;
  const title = "Synthetic MSA — deterministic hard case";
  await writeContract({
    id,
    title,
    text,
    gold: buildSyntheticGold(id, generated.paragraphs, generated.items),
    meta: {
      id,
      source: "synthetic",
      title,
      words: text.trim().split(/\s+/).length,
      paragraphs: generated.paragraphs.length,
      ourParty: { name: "Northwind Analytics, Inc.", role: "Customer" },
      counterparty: { name: "Brightline Cloud Services Ltd.", role: "Vendor" },
      hardCase: true,
      hardCaseNotes: [
        "LOL-CAP requires resolving Fees through the separate USD 12,000 Implementation Fee definition.",
        "NONCOMPETE and MFN are natural directionality decoys that benefit Customer.",
        "T4C requires following the Section 9.4 cross-reference to the notice period in Section 29.4.",
        "LD is a stand-alone weekly late-invoice charge and does not qualify Customer's termination right.",
      ],
    },
    textToDocx,
  });
  console.log(`${id}: five deterministic definition, directionality, cross-reference, and late-payment labels`);
}

async function main(): Promise<void> {
  const command = new Command()
    .option("--seed <number>", "first deterministic seed", "11")
    .option("--count <number>", "number of sequential seed contracts", "3")
    .option("--hardcase", "build only the deterministic hard case")
    .parse();
  const options = command.opts<{ seed: string; count: string; hardcase?: boolean }>();
  const seed = Number.parseInt(options.seed, 10);
  const count = Number.parseInt(options.count, 10);
  if (!Number.isInteger(seed) || !Number.isInteger(count) || count < 1) {
    throw new Error("Invalid --seed or --count");
  }

  const template = await readFile(resolve("data/templates/msa-clean.md"), "utf8");
  const textToDocx = await loadTextToDocx();
  if (options.hardcase === true) {
    await writeHardCase(template, textToDocx);
  } else {
    for (let offset = 0; offset < count; offset += 1) await writeSeeded(template, seed + offset, textToDocx);
  }
  if (textToDocx === undefined) {
    console.log("Notice: @/src/engine does not export textToDocx yet; rerun this command after the engine is available.");
  }
}

void main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
