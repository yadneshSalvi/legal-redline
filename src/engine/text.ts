/**
 * Canonical paragraph splitting shared by the engine (parseText / textToDocx / parseDocx id assignment)
 * and the eval dataset builder (gold paragraph ids). MUST stay deterministic and identical everywhere:
 *
 * - normalise CRLF/CR → LF, NBSP and tabs → space
 * - a paragraph is a block separated by one or more blank lines
 * - single line breaks inside a block are joined with a single space; runs of spaces collapse to one
 * - empty blocks are dropped
 *
 * `textToDocx` writes exactly one `w:p` per returned block, so `parseDocx` yields the same indexes.
 */
export function splitParagraphs(text: string): string[] {
  const norm = text.replace(/\r\n?/g, "\n").replace(/ /g, " ").replace(/\t/g, " ");
  return norm
    .split(/\n[ \t]*\n+/)
    .map((block) =>
      block
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line.length > 0)
        .join(" ")
        .replace(/ {2,}/g, " ")
        .trim(),
    )
    .filter((block) => block.length > 0);
}

/** Stable paragraph id for a 0-based document-order index: p0000, p0001, … */
export function paragraphId(index: number): string {
  return "p" + String(index).padStart(4, "0");
}

/** Normalise text for tolerant comparisons (whitespace, curly quotes, dashes). */
export function normalizeForMatch(s: string): string {
  return s
    .replace(/[‘’‚‛]/g, "'")
    .replace(/[“”„‟]/g, '"')
    .replace(/[–—]/g, "-")
    .replace(/ /g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}
