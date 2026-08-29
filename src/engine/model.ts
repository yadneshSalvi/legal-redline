import { createHash } from "node:crypto";

import type {
  Definition,
  DocumentModel,
  DocumentSource,
  Paragraph,
  RunSpan,
  Section,
} from "./types";
import { paragraphId } from "./text";

export interface ParagraphInput {
  text: string;
  style?: string;
  runs?: RunSpan[];
  insertedId?: string;
}

interface HeadingInfo {
  heading: string;
  level: number;
  number?: string;
}

const NUMBERED_HEADING = /^(\d+(?:\.\d+)*)(?:\.|\))?\s+(.+)$/;
const ARTICLE_HEADING = /^ARTICLE\s+([IVXLCDM]+|\d+)(?:(?:\s*[-–—.:]\s*|\s+)(.*))?$/i;
const SECTION_HEADING = /^Section\s+(\d+(?:\.\d+)*)(?:\.|\))?\s*(.*)$/i;
const SUB_ITEM = /^\([a-zivxlcdm\d]+\)\s+/i;

function wordCount(text: string): number {
  return text.trim() === "" ? 0 : text.trim().split(/\s+/u).length;
}

function cleanHeading(value: string, fallback: string): string {
  const cleaned = value.replace(/^[-–—.:\s]+/, "").trim();
  return cleaned || fallback.trim();
}

function headingInfo(text: string, style?: string): HeadingInfo | undefined {
  const styleMatch = /^Heading\s*([1-6])$/i.exec(style ?? "");
  if (styleMatch) {
    const level = Number(styleMatch[1]);
    const numbered = NUMBERED_HEADING.exec(text);
    if (numbered && !SUB_ITEM.test(text)) {
      return {
        heading: cleanHeading(numbered[2], text),
        level,
        number: numbered[1],
      };
    }
    return { heading: text, level };
  }

  const article = ARTICLE_HEADING.exec(text);
  if (article) {
    return {
      heading: cleanHeading(article[2] ?? "", text),
      level: 1,
      number: article[1],
    };
  }

  const section = SECTION_HEADING.exec(text);
  if (section) {
    return {
      heading: cleanHeading(section[2], text),
      level: section[1].split(".").length,
      number: section[1],
    };
  }

  if (!SUB_ITEM.test(text)) {
    const numbered = NUMBERED_HEADING.exec(text);
    if (numbered) {
      return {
        heading: cleanHeading(numbered[2], text),
        level: numbered[1].split(".").length,
        number: numbered[1],
      };
    }
  }

  const words = text.trim().split(/\s+/u);
  const letters = text.match(/\p{L}/gu) ?? [];
  const allCaps =
    !SUB_ITEM.test(text) &&
    words.length <= 8 &&
    letters.length > 0 &&
    text === text.toLocaleUpperCase();
  return allCaps ? { heading: text.trim(), level: 1 } : undefined;
}

function numberingLabel(text: string): string | undefined {
  const subItem = /^\(([a-zivxlcdm]+|\d+)\)\s+/i.exec(text);
  if (subItem) return `(${subItem[1]})`;
  const article = ARTICLE_HEADING.exec(text);
  if (article) return article[1];
  const section = SECTION_HEADING.exec(text);
  if (section) return section[1];
  return NUMBERED_HEADING.exec(text)?.[1];
}

function sectionBaseId(number: string | undefined, paragraph: Paragraph): string {
  const raw = number ?? paragraph.id;
  const slug = raw
    .toLocaleLowerCase()
    .replace(/[^a-z0-9.]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `sec-${slug || paragraph.id}`;
}

function assignSections(paragraphs: Paragraph[]): Section[] {
  const sections: Section[] = [];
  const stack: Section[] = [];
  const usedIds = new Set<string>();
  let current: Section | undefined;

  const firstHeadingIndex = paragraphs.findIndex((paragraph) => paragraph.isHeading);
  const preambleParagraphs = paragraphs.slice(0, firstHeadingIndex < 0 ? paragraphs.length : firstHeadingIndex);
  if (preambleParagraphs.length > 0) {
    const preamble: Section = {
      id: "sec-preamble",
      heading: "Preamble",
      level: 0,
      paragraphIds: [],
      childIds: [],
    };
    sections.push(preamble);
    current = preamble;
  }

  for (const paragraph of paragraphs) {
    if (paragraph.isHeading && paragraph.level !== undefined) {
      while (stack.length > 0 && stack[stack.length - 1].level >= paragraph.level) stack.pop();
      const parent = stack.at(-1);
      const baseId = sectionBaseId(paragraph.numbering, paragraph);
      let id = baseId;
      let suffix = 2;
      while (usedIds.has(id) || id === "sec-preamble") {
        id = `${baseId}-${suffix}`;
        suffix += 1;
      }
      usedIds.add(id);
      const info = headingInfo(paragraph.text, paragraph.style);
      const section: Section = {
        id,
        ...(paragraph.numbering ? { number: paragraph.numbering } : {}),
        heading: info?.heading ?? paragraph.text,
        level: paragraph.level,
        paragraphIds: [],
        ...(parent ? { parentId: parent.id } : {}),
        childIds: [],
      };
      sections.push(section);
      parent?.childIds.push(id);
      stack.push(section);
      current = section;
    }

    if (current) {
      paragraph.sectionId = current.id;
      current.paragraphIds.push(paragraph.id);
    }
  }
  return sections;
}

function pushDefinition(
  definitions: Definition[],
  seen: Set<string>,
  term: string,
  paragraph: Paragraph,
): void {
  const cleaned = term.trim().replace(/[“”"]/g, "");
  if (cleaned.length === 0 || cleaned.length > 120 || seen.has(cleaned.toLocaleLowerCase())) return;
  seen.add(cleaned.toLocaleLowerCase());
  definitions.push({ term: cleaned, paragraphId: paragraph.id, text: paragraph.text });
}

function extractDefinitions(paragraphs: Paragraph[], sections: Section[]): Definition[] {
  const definitions: Definition[] = [];
  const seen = new Set<string>();
  const sectionById = new Map(sections.map((section) => [section.id, section]));
  const definitionsSections = new Set<string>();
  for (const section of sections) {
    let candidate: Section | undefined = section;
    while (candidate) {
      if (/\b(definitions?|defined terms?|interpretation)\b/i.test(candidate.heading)) {
        definitionsSections.add(section.id);
        break;
      }
      candidate = candidate.parentId ? sectionById.get(candidate.parentId) : undefined;
    }
  }

  for (const paragraph of paragraphs) {
    const text = paragraph.text;
    const direct = /^[“"]([^”"]{1,120})[”"]\s+(?:means|shall mean|has the meaning\b)/i.exec(text);
    if (direct) pushDefinition(definitions, seen, direct[1], paragraph);

    const aliases = text.matchAll(/\(\s*the\s+[“"]([^”"]{1,120})[”"]\s*\)/gi);
    for (const alias of aliases) pushDefinition(definitions, seen, alias[1], paragraph);

    if (paragraph.sectionId && definitionsSections.has(paragraph.sectionId)) {
      const colon = /^(?:[“"]([^”"]+)[”"]|([^:]{1,80}))\s*:\s*\S/u.exec(text);
      if (colon) pushDefinition(definitions, seen, colon[1] ?? colon[2], paragraph);
      const quoted = /^[“"]([^”"]{1,120})[”"](?:\s|$)/u.exec(text);
      if (quoted) pushDefinition(definitions, seen, quoted[1], paragraph);
    }
  }
  return definitions;
}

/** Hash the canonical visible paragraph text used to identify equivalent text and DOCX inputs. */
export function canonicalDocumentHash(paragraphs: Pick<Paragraph, "text">[]): string {
  return createHash("sha256")
    .update(paragraphs.map((paragraph) => paragraph.text).join("\n\n"), "utf8")
    .digest("hex");
}

/** Build a DocumentModel from visible paragraphs, applying shared heading, section, and definition rules. */
export function buildDocumentModel(inputs: ParagraphInput[], source: DocumentSource): DocumentModel {
  let originalIndex = 0;
  const paragraphs: Paragraph[] = inputs.map((input) => {
    const id = input.insertedId ?? paragraphId(originalIndex);
    const index = originalIndex;
    if (!input.insertedId) originalIndex += 1;
    const info = headingInfo(input.text, input.style);
    const numbering = info?.number ?? numberingLabel(input.text);
    return {
      id,
      index,
      text: input.text,
      ...(input.style ? { style: input.style } : {}),
      ...(numbering ? { numbering } : {}),
      ...(info ? { level: info.level } : {}),
      isHeading: Boolean(info),
      ...(input.runs && input.runs.length > 0 ? { runs: input.runs } : {}),
    };
  });
  const sections = assignSections(paragraphs);
  const definitions = extractDefinitions(paragraphs, sections);
  const firstHeading = paragraphs.find((paragraph) => paragraph.isHeading);
  const firstParagraph = paragraphs[0];
  const title = (firstHeading?.text ?? firstParagraph?.text ?? source.filename).slice(0, 120);
  const hash = canonicalDocumentHash(paragraphs);

  return {
    id: hash.slice(0, 12),
    title,
    source,
    paragraphs,
    sections,
    definitions,
    stats: {
      words: paragraphs.reduce((total, paragraph) => total + wordCount(paragraph.text), 0),
      paragraphs: paragraphs.length,
      sections: sections.length,
      definitions: definitions.length,
    },
  };
}
