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
  numbering?: string;
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

function textAfterNumbering(text: string, numbering: string): string {
  const escaped = numbering.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return text.replace(new RegExp(`^(?:(?:Section|ARTICLE)\\s+)?${escaped}(?:[.)])?\\s*`, "i"), "").trim();
}

function headingInfo(text: string, style?: string, numbering?: string): HeadingInfo | undefined {
  const styleMatch = /^Heading\s*([1-6])$/i.exec(style ?? "");
  if (styleMatch) {
    const level = Number(styleMatch[1]);
    const label = numbering ?? numberingLabel(text);
    return {
      heading: label ? cleanHeading(textAfterNumbering(text, label), text) : text,
      level,
      ...(label ? { number: label } : {}),
    };
  }
  if (/^Title$/i.test(style ?? "")) {
    const label = numbering ?? numberingLabel(text);
    return {
      heading: label ? cleanHeading(textAfterNumbering(text, label), text) : text,
      level: 1,
      ...(label ? { number: label } : {}),
    };
  }

  const label = numbering ?? numberingLabel(text);
  if (label && !SUB_ITEM.test(text)) {
    const remaining = textAfterNumbering(text, label);
    const standaloneSection = remaining.length === 0 && /^Section\b/i.test(text);
    if (
      wordCount(remaining) <= 12 &&
      (remaining.length > 0 || standaloneSection) &&
      !/[.;]\s*$/u.test(remaining)
    ) {
      return {
        heading: cleanHeading(remaining, text),
        level: /^ARTICLE\b/i.test(text) ? 1 : Math.max(1, label.split(".").length),
        number: label,
      };
    }
  }

  const words = text.trim().split(/\s+/u);
  const letters = text.match(/\p{L}/gu) ?? [];
  const allCaps =
    !SUB_ITEM.test(text) &&
    words.length <= 12 &&
    letters.length > 0 &&
    text === text.toLocaleUpperCase();
  if (allCaps) {
    const article = ARTICLE_HEADING.exec(text);
    return {
      heading: article ? cleanHeading(article[2] ?? "", text) : text.trim(),
      level: 1,
      ...(label ? { number: label } : {}),
    };
  }
  return undefined;
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
      const info = headingInfo(paragraph.text, paragraph.style, paragraph.numbering);
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

function definitionText(text: string): string {
  return text
    .replace(/^\s*(?:Section\s+)?\d+(?:\.\d+)*(?:[.)])?\s+/i, "")
    .trim();
}

function shortAlias(term: string): boolean {
  return wordCount(term) <= 4;
}

function extractDefinitions(paragraphs: Paragraph[], sections: Section[]): Definition[] {
  const definitions: Definition[] = [];
  const seen = new Set<string>();
  const sectionById = new Map(sections.map((section) => [section.id, section]));
  const definitionsSections = new Set<string>();
  for (const section of sections) {
    let candidate: Section | undefined = section;
    while (candidate) {
      if (/\bdefinitions?\b/i.test(candidate.heading)) {
        definitionsSections.add(section.id);
        break;
      }
      candidate = candidate.parentId ? sectionById.get(candidate.parentId) : undefined;
    }
  }

  for (const paragraph of paragraphs) {
    const text = definitionText(paragraph.text);
    const direct =
      /^[“"]([^”"]{1,120})[”"]\s+(?:means\b|shall\s+mean\b|has\s+the\s+meaning\b)/i.exec(text);
    if (direct) pushDefinition(definitions, seen, direct[1], paragraph);

    const pointer =
      /^[“"]([^”"]{1,120})[”"]\s+\(\s*as\s+defined\s+in\s+[^)]+\)(?=\s*[,.;:]|\s*$)/i.exec(text);
    if (pointer) pushDefinition(definitions, seen, pointer[1], paragraph);

    const aliases = text.matchAll(
      /\(\s*(?:the\s+)?[“"]([^”"]{1,120})[”"]\s*\)(?=\s*[,.;:])/gi,
    );
    for (const alias of aliases) {
      if (shortAlias(alias[1])) pushDefinition(definitions, seen, alias[1], paragraph);
    }

    if (paragraph.sectionId && definitionsSections.has(paragraph.sectionId)) {
      const colon = /^(?:[“"]([^”"]+)[”"]|([^:]{1,80}))\s*:\s*\S/u.exec(text);
      const term = colon?.[1] ?? colon?.[2];
      if (term && !/\b(?:administrative\s+note|note|notice|example|comment)$/i.test(term.trim())) {
        pushDefinition(definitions, seen, term, paragraph);
      }
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
    const numbering = input.numbering ?? numberingLabel(input.text);
    const info = headingInfo(input.text, input.style, numbering);
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
