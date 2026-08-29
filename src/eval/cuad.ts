import { readFile } from "node:fs/promises";

import { normalizeForMatch, paragraphId, splitParagraphs } from "@/src/engine/text";
import type { Rule } from "@/src/playbook/schema";

import type { GoldFile, GoldItem } from "./gold";

interface CuadAnswer {
  text: string;
  answer_start: number;
}

interface CuadQuestion {
  id: string;
  question: string;
  answers: CuadAnswer[];
  is_impossible?: boolean;
}

interface CuadParagraph {
  context: string;
  qas: CuadQuestion[];
}

export interface CuadContract {
  title: string;
  paragraphs: CuadParagraph[];
}

interface CuadDataset {
  data: CuadContract[];
}

export interface CuadSelection {
  titleSubstring: string;
  slug: string;
}

export const PRIMARY_CUAD_SELECTIONS: readonly CuadSelection[] = [
  { titleSubstring: "AMERICASSHOPPINGMALLINC", slug: "americas-shopping-mall-hosting" },
  { titleSubstring: "MERITLIFEINSURANCECO", slug: "merit-life-master-services" },
  { titleSubstring: "SPARKLINGSPRINGWATERHOLDINGS", slug: "sparkling-spring-license" },
  { titleSubstring: "KUBIENT,INC_07_02_2020-EX-10.14-MASTER SERVICES AGREEMENT_Part1", slug: "kubient-msa-part1" },
  { titleSubstring: "BLUEFLYINC", slug: "bluefly-hosting" },
  { titleSubstring: "BNCMORTGAGEINC", slug: "bnc-mortgage-hosting" },
  { titleSubstring: "CORIOINC", slug: "corio-hosting" },
  { titleSubstring: "SFGFINANCIALCORP", slug: "sfg-financial-license" },
] as const;

export const ALTERNATE_CUAD_SELECTIONS: readonly CuadSelection[] = [
  { titleSubstring: "DYNTEKINC", slug: "dyntek-hosting" },
  { titleSubstring: "PAXMEDICA", slug: "paxmedica-msa" },
  { titleSubstring: "MidwestEnergyEmissions", slug: "midwest-energy-content-license" },
  { titleSubstring: "ClickstreamCorp", slug: "clickstream-development" },
  { titleSubstring: "GlobalTechnologiesGroup", slug: "global-technologies-content-license" },
  { titleSubstring: "DYNAMEXINC", slug: "dynamex-transportation-services" },
] as const;

export interface UnmatchedCuadSpan {
  category: string;
  questionId: string;
  answerStart: number;
  spanText: string;
}

export interface MappedCuadContract {
  text: string;
  paragraphs: string[];
  gold: GoldFile;
  unmatchedSpans: UnmatchedCuadSpan[];
}

const CLAUSE_START = /^\s*(?:\d+(?:\.\d+)*\.?|\([a-z]\)|[A-Z]\.)\s+/;
const SENTENCE_END = /[.!?][\s"'”’)]*$/;
const BOILERPLATE = /^(?:source\s*:.*|(?:page\s+)?\d+\s+(?:of\s+)?\d+|-+\s*\d+\s*-+)$/i;
const INLINE_TOP_LEVEL = /(?<=[.;:])\s+(?=\d{1,2}(?:\.\d{1,2})*\.?\s+[A-Z(“"])/g;
const INLINE_ARTICLE_OR_SECTION = /(?<=[.;:])\s+(?=(?:ARTICLE|SECTION)\s+[IVX\d]+\b)/g;
const INLINE_LETTERED_ITEM = /(?<=[.;:])\s+(?=\([a-z]{1,3}\)\s)/g;
const INLINE_ROMAN_ITEM = /(?<=[.;:])\s+(?=\([ivx]+\)\s)/gi;
const SENTENCE_BOUNDARY = /(?<=[.!?])\s+(?=[A-Z])/g;

function countWords(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

function chunkAtSentences(block: string): string[] {
  const sentences = block.split(SENTENCE_BOUNDARY).filter(Boolean);
  const chunks: string[] = [];
  let current = "";
  let currentWords = 0;
  for (const sentence of sentences) {
    const sentenceWords = countWords(sentence);
    if (current.length > 0 && currentWords + sentenceWords > 150) {
      chunks.push(current);
      current = sentence;
      currentWords = sentenceWords;
    } else {
      current = current.length === 0 ? sentence : `${current} ${sentence}`;
      currentWords += sentenceWords;
    }
  }
  if (current.length > 0) chunks.push(current);
  return chunks;
}

/** Split flattened PDF extraction only at legal-clause or complete-sentence boundaries. */
export function splitFlatCuadBlock(block: string): string[] {
  if (countWords(block) <= 120) return [block];
  let clauses = [block];
  for (const boundary of [
    INLINE_TOP_LEVEL,
    INLINE_ARTICLE_OR_SECTION,
    INLINE_LETTERED_ITEM,
    INLINE_ROMAN_ITEM,
  ]) {
    clauses = clauses.flatMap((clause) => clause.split(boundary).filter(Boolean));
  }
  return clauses.flatMap((clause) => (countWords(clause) > 250 ? chunkAtSentences(clause) : [clause]));
}

/** Canonicalise common SEC/PDF extraction artefacts before the engine assigns paragraph ids. */
export function canonicalizeCuadText(input: string): string {
  const lines = input
    .replace(/\r\n?/g, "\n")
    .replace(/ /g, " ")
    .replace(/\t/g, " ")
    .split("\n");
  const paragraphs: string[] = [];
  let current: string[] = [];

  const flush = (): void => {
    const value = current.join(" ").replace(/\s+/g, " ").trim();
    if (value.length > 0) paragraphs.push(value);
    current = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.replace(/\s+/g, " ").trim();
    if (line.length === 0) {
      flush();
      continue;
    }
    if (BOILERPLATE.test(line)) continue;
    if (current.length > 0 && CLAUSE_START.test(line) && SENTENCE_END.test(current.at(-1) ?? "")) {
      flush();
    }
    current.push(line);
  }
  flush();
  return `${paragraphs.flatMap(splitFlatCuadBlock).join("\n\n")}\n`;
}

export async function loadCuad(path: string): Promise<CuadDataset> {
  const parsed = JSON.parse(await readFile(path, "utf8")) as CuadDataset;
  if (!Array.isArray(parsed.data)) throw new Error(`Invalid CUAD dataset at ${path}`);
  return parsed;
}

export function selectCuadContracts(
  dataset: CuadDataset,
  selections: readonly CuadSelection[] = PRIMARY_CUAD_SELECTIONS,
): Array<{ selection: CuadSelection; contract: CuadContract }> {
  return selections.map((selection) => {
    const needle = selection.titleSubstring.toLocaleLowerCase("en-US");
    const matches = dataset.data.filter((entry) => entry.title.toLocaleLowerCase("en-US").includes(needle));
    if (matches.length !== 1) {
      throw new Error(`Expected one CUAD title containing "${selection.titleSubstring}", found ${matches.length}`);
    }
    return { selection, contract: matches[0] };
  });
}

export function extractCuadCategory(question: string): string | null {
  return question.match(/["“]([^"”]+)["”]/)?.[1]?.trim() ?? null;
}

function longestSentence(text: string): string {
  const sentences = text.match(/[^.!?]+(?:[.!?]+|$)/g) ?? [text];
  return sentences.reduce((longest, sentence) =>
    normalizeForMatch(sentence).length > normalizeForMatch(longest).length ? sentence : longest,
  );
}

function locateSpan(paragraphs: readonly string[], span: string): string[] {
  const normalized = paragraphs.map(normalizeForMatch);
  const starts: number[] = [];
  let joined = "";
  for (const value of normalized) {
    if (joined.length > 0) joined += " ";
    starts.push(joined.length);
    joined += value;
  }

  const attempts = [span, span.slice(0, 120), longestSentence(span)]
    .map(normalizeForMatch)
    .filter((value, index, all) => value.length >= 12 && all.indexOf(value) === index);
  for (const needle of attempts) {
    const start = joined.indexOf(needle);
    if (start < 0) continue;
    const end = start + needle.length;
    return normalized
      .map((value, index) => ({ index, start: starts[index], end: starts[index] + value.length }))
      .filter((range) => range.start < end && range.end > start)
      .map((range) => paragraphId(range.index));
  }
  return [];
}

export function mapCuadContract(
  contractId: string,
  contract: CuadContract,
  rules: readonly Rule[],
): MappedCuadContract {
  const rawText = contract.paragraphs.map((paragraph) => paragraph.context).join("\n\n");
  const text = canonicalizeCuadText(rawText);
  const paragraphs = splitParagraphs(text);
  const categoryToRule = new Map<string, string>();
  for (const rule of rules) {
    for (const category of rule.cuad) categoryToRule.set(category, rule.id);
  }

  const unmatchedSpans: UnmatchedCuadSpan[] = [];
  const items: GoldItem[] = [];
  const seen = new Set<string>();
  for (const sourceParagraph of contract.paragraphs) {
    for (const question of sourceParagraph.qas) {
      const category = extractCuadCategory(question.question);
      const ruleId = category === null ? undefined : categoryToRule.get(category);
      if (category === null || ruleId === undefined) continue;
      for (const answer of question.answers) {
        const paragraphIds = locateSpan(paragraphs, answer.text);
        if (paragraphIds.length === 0) {
          unmatchedSpans.push({
            category,
            questionId: question.id,
            answerStart: answer.answer_start,
            spanText: answer.text,
          });
          continue;
        }
        const key = `${ruleId}\0${category}\0${normalizeForMatch(answer.text)}`;
        if (seen.has(key)) continue;
        seen.add(key);
        items.push({
          id: `g${String(items.length + 1).padStart(3, "0")}`,
          ruleId,
          paragraphIds,
          status: "compliant",
          cuadCategory: category,
          spanText: answer.text,
          labeler: "cuad-draft",
          note: "Unreviewed placeholder; run label-assist before promoting this draft.",
        });
      }
    }
  }

  return {
    text,
    paragraphs,
    gold: { contractId, items },
    unmatchedSpans,
  };
}
