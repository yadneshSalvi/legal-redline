import { resolve, join } from "node:path";

import { parseDocx, parseText, textToDocx } from "@/src/engine";
import { canonicalizeCuadText, loadCuad, type CuadContract } from "@/src/eval/cuad";
import { atomicWrite, atomicWriteJson } from "@/src/eval/io";

const SOURCE = resolve("data/raw/cuad/CUADv1.json");
const CONTRACTS_ROOT = resolve("data/contracts");
const FAMILY = /(hosting|licen[sc]e|services|maintenance|outsourcing|development)/iu;
const MIN_WORDS = 15_000;

interface Candidate {
  contract: CuadContract;
  text: string;
  words: number;
}

interface Profile {
  id: string;
  ourParty: { name: string; role: string };
  counterparty: { name: string; role: string };
}

function countWords(text: string): number {
  return text.trim().split(/\s+/u).filter(Boolean).length;
}

function contractText(contract: CuadContract): string {
  return canonicalizeCuadText(contract.paragraphs.map((paragraph) => paragraph.context).join("\n\n"));
}

function profile(title: string): Profile {
  if (title.startsWith("TELEGLOBEINTERNATIONALHOLDINGSLTD_")) {
    return {
      id: "cuad-long-teleglobe-construction-maintenance",
      ourParty: { name: "Teleglobe USA Inc.", role: "represented APCN 2 participant" },
      counterparty: { name: "the other APCN 2 Parties", role: "other consortium participants" },
    };
  }
  if (title.startsWith("TRICITYBANKSHARESCORP_")) {
    return {
      id: "cuad-long-tri-city-outsourcing",
      ourParty: { name: "Tri City National Bank", role: "customer" },
      counterparty: { name: "M&I Data Services", role: "vendor" },
    };
  }
  throw new Error(`The mechanical selection changed; assign explicit party roles before using ${title}`);
}

function exactParagraphRoundTrip(expectedText: string, actual: Awaited<ReturnType<typeof parseDocx>>): boolean {
  const expected = parseText(expectedText, "expected.txt");
  return expected.paragraphs.length === actual.paragraphs.length && expected.paragraphs.every(
    (paragraph, index) => paragraph.text === actual.paragraphs[index]?.text,
  );
}

async function main(): Promise<void> {
  const dataset = await loadCuad(SOURCE);
  const candidates: Candidate[] = dataset.data
    .filter((contract) => FAMILY.test(contract.title))
    .map((contract) => {
      const text = contractText(contract);
      return { contract, text, words: countWords(text) };
    })
    .filter((candidate) => candidate.words >= MIN_WORDS)
    .sort((left, right) => left.words - right.words || left.contract.title.localeCompare(right.contract.title));

  const selected: Array<Candidate & { docx: Uint8Array; parsed: Awaited<ReturnType<typeof parseDocx>> }> = [];
  for (const candidate of candidates) {
    const docx = await textToDocx(candidate.text, { title: candidate.contract.title });
    const parsed = await parseDocx(docx, `${candidate.contract.title}.docx`);
    if (!exactParagraphRoundTrip(candidate.text, parsed)) continue;
    selected.push({ ...candidate, docx, parsed });
    if (selected.length === 2) break;
  }
  if (selected.length !== 2) throw new Error(`Expected two parse-clean long CUAD contracts, found ${selected.length}`);

  for (const candidate of selected) {
    const details = profile(candidate.contract.title);
    const directory = join(CONTRACTS_ROOT, details.id);
    const paragraphWordCounts = candidate.parsed.paragraphs.map((paragraph) => countWords(paragraph.text));
    await Promise.all([
      atomicWrite(join(directory, "contract.txt"), candidate.text),
      atomicWrite(join(directory, "contract.docx"), candidate.docx),
      atomicWriteJson(join(directory, "meta.json"), {
        id: details.id,
        source: "CUAD v1 (The Atticus Project, CC-BY-4.0)",
        title: candidate.contract.title,
        cuadTitle: candidate.contract.title,
        words: candidate.parsed.stats.words,
        paragraphs: candidate.parsed.stats.paragraphs,
        maxParagraphWords: Math.max(0, ...paragraphWordCounts),
        ourParty: details.ourParty,
        counterparty: details.counterparty,
        devSelection: "Shortest parse-clean CUAD contract at >=15,000 words in hosting/license/services/maintenance/outsourcing/development families.",
      }),
    ]);
    console.log(
      `${details.id}: ${candidate.parsed.stats.words} words, ${candidate.parsed.stats.paragraphs} paragraphs, ` +
      `${candidate.parsed.stats.sections} sections, exact paragraph round-trip`,
    );
  }
}

void main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
