import { directChild, elementsByLocalName, wordAttribute } from "./xml";

interface LevelDefinition {
  format: string;
  pattern: string;
  start: number;
}

type LevelMap = Map<number, LevelDefinition>;

function levelDefinitions(numbering: Document): Map<string, LevelMap> {
  const abstracts = new Map<string, LevelMap>();
  for (const abstract of elementsByLocalName(numbering, "abstractNum")) {
    const id = wordAttribute(abstract, "abstractNumId");
    if (!id) continue;
    const levels = new Map<number, LevelDefinition>();
    for (const level of elementsByLocalName(abstract, "lvl")) {
      const depth = Number(wordAttribute(level, "ilvl") ?? "0");
      const formatNode = directChild(level, "numFmt");
      const textNode = directChild(level, "lvlText");
      const startNode = directChild(level, "start");
      const format = formatNode ? wordAttribute(formatNode, "val") : undefined;
      const pattern = textNode ? wordAttribute(textNode, "val") : undefined;
      if (format && pattern) {
        levels.set(depth, {
          format,
          pattern,
          start: Number(startNode ? wordAttribute(startNode, "val") ?? "1" : "1"),
        });
      }
    }
    abstracts.set(id, levels);
  }

  const resolved = new Map<string, LevelMap>();
  for (const num of elementsByLocalName(numbering, "num")) {
    const numId = wordAttribute(num, "numId");
    const abstractNode = directChild(num, "abstractNumId");
    const abstractId = abstractNode ? wordAttribute(abstractNode, "val") : undefined;
    const levels = abstractId ? abstracts.get(abstractId) : undefined;
    if (numId && levels) resolved.set(numId, levels);
  }
  return resolved;
}

function numPr(paragraph: Element): { numId: string; level: number } | undefined {
  const pPr = directChild(paragraph, "pPr");
  const property = pPr ? directChild(pPr, "numPr") : undefined;
  const idNode = property ? directChild(property, "numId") : undefined;
  const levelNode = property ? directChild(property, "ilvl") : undefined;
  const numId = idNode ? wordAttribute(idNode, "val") : undefined;
  if (!numId || numId === "0") return undefined;
  return { numId, level: Number(levelNode ? wordAttribute(levelNode, "val") ?? "0" : "0") };
}

/** Resolve simple decimal list labels in document order; unsupported formats remain undefined. */
export function resolveNumberingLabels(
  paragraphs: Element[],
  numbering: Document | undefined,
): Array<string | undefined> {
  if (!numbering) return paragraphs.map(() => undefined);
  const definitions = levelDefinitions(numbering);
  const counters = new Map<string, number[]>();
  return paragraphs.map((paragraph) => {
    const property = numPr(paragraph);
    if (!property) return undefined;
    const levels = definitions.get(property.numId);
    const definition = levels?.get(property.level);
    if (!levels || !definition || definition.format !== "decimal") return undefined;
    const values = counters.get(property.numId) ?? [];
    for (let depth = 0; depth <= property.level; depth += 1) {
      const current = levels.get(depth);
      if (!current || current.format !== "decimal") return undefined;
      if (values[depth] === undefined) {
        values[depth] = depth === property.level ? current.start - 1 : current.start;
      }
    }
    values[property.level] += 1;
    values.length = property.level + 1;
    counters.set(property.numId, values);
    const rendered = definition.pattern.replace(/%(\d+)/g, (_, raw: string) => {
      const depth = Number(raw) - 1;
      const level = levels.get(depth);
      return String(values[depth] ?? level?.start ?? 1);
    });
    return rendered.replace(/[.)]+$/u, "").trim() || undefined;
  });
}
