import { readFile } from "node:fs/promises";
import { join, relative, resolve } from "node:path";
import { pathToFileURL } from "node:url";

import {
  loadCuad,
  mapCuadContract,
  PRIMARY_CUAD_SELECTIONS,
  selectCuadContracts,
} from "@/src/eval/cuad";
import { atomicWrite, atomicWriteJson } from "@/src/eval/io";
import { loadPlaybookFile } from "@/src/eval/playbook";
import { carryDraftLabels, GoldFileSchema } from "@/src/eval/gold";

interface EngineModule {
  textToDocx?: (text: string, options?: { title?: string }) => Promise<Uint8Array>;
}

const datasetPath = resolve("data/raw/cuad/CUADv1.json");
const contractsRoot = resolve("data/contracts");
const playbookPath = resolve("data/playbooks/customer-vendor-services.yaml");

async function loadTextToDocx(): Promise<EngineModule["textToDocx"]> {
  try {
    const moduleName = pathToFileURL(resolve("src/engine/docx-write.ts")).href;
    const engine = (await import(moduleName)) as EngineModule;
    return engine.textToDocx;
  } catch {
    return undefined;
  }
}

async function writeDocx(
  id: string,
  title: string,
  text: string,
  textToDocx: NonNullable<EngineModule["textToDocx"]>,
): Promise<void> {
  const bytes = await textToDocx(text, { title });
  await atomicWrite(join(contractsRoot, id, "contract.docx"), bytes);
}

async function existingJson(path: string): Promise<unknown | null> {
  try {
    return JSON.parse(await readFile(path, "utf8")) as unknown;
  } catch (error) {
    if (error instanceof Error && "code" in error && error.code === "ENOENT") return null;
    throw error;
  }
}

async function mergeExistingDraft(
  path: string,
  generated: ReturnType<typeof mapCuadContract>["gold"],
): Promise<{ gold: ReturnType<typeof mapCuadContract>["gold"]; carried: number; needsDraft: number }> {
  const value = await existingJson(path);
  const parsed = GoldFileSchema.safeParse(value);
  if (!parsed.success || !parsed.data.items.some((item) => item.labeler !== "cuad-draft")) {
    return { gold: generated, carried: 0, needsDraft: 0 };
  }
  return carryDraftLabels(generated, parsed.data);
}

async function main(): Promise<void> {
  const docxOnly = process.argv.includes("--docx-only");
  const textToDocx = await loadTextToDocx();
  if (docxOnly && textToDocx === undefined) {
    throw new Error("--docx-only requires @/src/engine to export textToDocx; the engine is not available yet.");
  }

  if (docxOnly) {
    if (textToDocx === undefined) throw new Error("The DOCX writer is unavailable.");
    for (const selection of PRIMARY_CUAD_SELECTIONS) {
      const id = `cuad-${selection.slug}`;
      const directory = join(contractsRoot, id);
      const text = await readFile(join(directory, "contract.txt"), "utf8");
      const meta = JSON.parse(await readFile(join(directory, "meta.json"), "utf8")) as { title: string };
      await writeDocx(id, meta.title, text, textToDocx);
    }
    console.log("Added deterministic contract.docx files to all eight CUAD contract folders.");
    return;
  }

  const [dataset, playbook] = await Promise.all([loadCuad(datasetPath), loadPlaybookFile(playbookPath)]);
  const selected = selectCuadContracts(dataset);
  for (const { selection, contract } of selected) {
    const id = `cuad-${selection.slug}`;
    const directory = join(contractsRoot, id);
    const mapped = mapCuadContract(id, contract, playbook.rules);
    const previousMeta = (await existingJson(join(directory, "meta.json"))) as Record<string, unknown> | null;
    const paragraphWordCounts = mapped.paragraphs.map((paragraph) => paragraph.split(/\s+/).filter(Boolean).length);
    const meta = {
      id,
      source: "CUAD v1 (The Atticus Project, CC-BY-4.0)",
      title: contract.title,
      words: mapped.text.trim().split(/\s+/).filter(Boolean).length,
      paragraphs: mapped.paragraphs.length,
      maxParagraphWords: Math.max(0, ...paragraphWordCounts),
      ourParty: previousMeta?.ourParty ?? null,
      counterparty: previousMeta?.counterparty ?? null,
      cuadTitle: contract.title,
      unmatchedSpans: mapped.unmatchedSpans,
    };
    await atomicWrite(join(directory, "contract.txt"), mapped.text);
    const draftPath = join(directory, "gold.draft.json");
    const merged = await mergeExistingDraft(draftPath, mapped.gold);
    await atomicWriteJson(draftPath, merged.gold);
    await atomicWriteJson(join(directory, "meta.json"), meta);
    if (textToDocx !== undefined) await writeDocx(id, contract.title, mapped.text, textToDocx);
    console.log(
      `${id}: ${mapped.paragraphs.length} paragraphs, ${mapped.gold.items.length} mapped spans, ` +
        `${mapped.unmatchedSpans.length} unmatched, ${merged.carried} labels carried` +
        (merged.needsDraft > 0 ? `, ${merged.needsDraft} spans need label-assist` : ""),
    );
  }

  if (textToDocx === undefined) {
    console.log(
      "Notice: @/src/engine does not yet export textToDocx, so contract.docx files were not written. " +
        "Run `pnpm build-dataset --docx-only` after the engine is available.",
    );
  } else {
    console.log(`Dataset written under ${relative(process.cwd(), contractsRoot)} with deterministic DOCX files.`);
  }
}

void main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
