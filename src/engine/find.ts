import { normalizeForMatch } from "./text";
import type { DocumentModel, ParagraphId } from "./types";

export interface TextMatch {
  paragraphId: ParagraphId;
  snippet: string;
  start: number;
}

function normalizedWithMap(text: string): { text: string; map: number[] } {
  let normalized = "";
  const map: number[] = [];
  let inWhitespace = true;
  for (let index = 0; index < text.length; index += 1) {
    const source = text[index];
    let value = source
      .replace(/[‘’‚‛]/g, "'")
      .replace(/[“”„‟]/g, '"')
      .replace(/[–—]/g, "-")
      .replace(/ /g, " ")
      .toLocaleLowerCase();
    if (/\s/u.test(value)) {
      if (inWhitespace) continue;
      value = " ";
      inWhitespace = true;
    } else {
      inWhitespace = false;
    }
    normalized += value;
    for (let offset = 0; offset < value.length; offset += 1) map.push(index);
  }
  if (normalized.endsWith(" ")) {
    normalized = normalized.slice(0, -1);
    map.pop();
  }
  return { text: normalized, map };
}

function snippet(text: string, start: number, length: number): string {
  const from = Math.max(0, start - 80);
  const to = Math.min(text.length, start + Math.max(length, 1) + 80);
  return `${from > 0 ? "…" : ""}${text.slice(from, to)}${to < text.length ? "…" : ""}`;
}

/** Search visible paragraph text with regex or quote/dash/whitespace-tolerant string matching. */
export function findText(
  doc: DocumentModel,
  query: string | RegExp,
  opts: { limit?: number } = {},
): TextMatch[] {
  const limit = Math.max(0, opts.limit ?? 20);
  const matches: TextMatch[] = [];
  if (limit === 0) return matches;

  for (const paragraph of doc.paragraphs) {
    if (query instanceof RegExp) {
      const flags = query.flags.includes("g") ? query.flags : `${query.flags}g`;
      const expression = new RegExp(query.source, flags);
      for (const match of paragraph.text.matchAll(expression)) {
        const start = match.index ?? 0;
        matches.push({
          paragraphId: paragraph.id,
          snippet: snippet(paragraph.text, start, match[0].length),
          start,
        });
        if (matches.length >= limit) return matches;
        if (match[0].length === 0) expression.lastIndex += 1;
      }
      continue;
    }

    const needle = normalizeForMatch(query);
    if (needle.length === 0) return [];
    const normalized = normalizedWithMap(paragraph.text);
    let from = 0;
    while (from <= normalized.text.length - needle.length) {
      const found = normalized.text.indexOf(needle, from);
      if (found < 0) break;
      const start = normalized.map[found] ?? 0;
      const last = normalized.map[found + needle.length - 1] ?? start;
      matches.push({
        paragraphId: paragraph.id,
        snippet: snippet(paragraph.text, start, last - start + 1),
        start,
      });
      if (matches.length >= limit) return matches;
      from = found + Math.max(needle.length, 1);
    }
  }
  return matches;
}

