import type {
  ElementCoverage,
  Finding,
  FindingStatus,
  PositionLevel,
  VerificationCheck,
} from "@/src/agent/types";
import { renderParagraph, validateOp } from "@/src/engine";
import type { DocumentModel, RedlineOp } from "@/src/engine/types";
import type { Check, Rule } from "@/src/playbook/schema";

export interface ElementGateResult {
  ok: boolean;
  errors: string[];
}

function wordCount(text: string): number {
  return text.trim().split(/\s+/u).filter(Boolean).length;
}

/** New-to-old word count ratio used by the element configs' deterministic expansion gate. */
export function replacementExpansionRatio(op: Extract<RedlineOp, { kind: "replace" }>): number {
  return wordCount(op.newText) / Math.max(wordCount(op.oldText), 1);
}

/**
 * Element configs permit surgical replacements and additive paragraphs. Missing clauses are insertion-only;
 * deleting an entire paragraph must instead be expressed as a precise replacement of the offending words.
 */
export function minimalityGate(status: FindingStatus, ops: readonly RedlineOp[]): ElementGateResult {
  const errors: string[] = [];
  if (ops.length === 0 && (status === "deviation" || status === "missing")) {
    errors.push("An actionable finding must contain at least one operation");
  }
  if (status === "missing" && ops.some((op) => op.kind !== "insert_after")) {
    errors.push("A missing clause must use insert_after operations only");
  }
  for (const [index, op] of ops.entries()) {
    if (op.kind === "delete_paragraph") {
      errors.push(`Operation ${index + 1} deletes a whole paragraph; replace only the offending words or sentence`);
      continue;
    }
    if (op.kind !== "replace") continue;
    const ratio = replacementExpansionRatio(op);
    if (ratio > 1.5) {
      errors.push(
        `Operation ${index + 1} expands ${wordCount(op.oldText)} words to ${wordCount(op.newText)} words ` +
          `(ratio ${ratio.toFixed(2)} > 1.50); use a tighter edit or a separate insertion`,
      );
    }
  }
  return { ok: errors.length === 0, errors };
}

export function elementsFor(rule: Rule, level: PositionLevel): readonly string[] {
  return rule.position.elements[level];
}

function quoteExists(document: DocumentModel, quote: string): boolean {
  return document.paragraphs.some((paragraph) => paragraph.text.includes(quote));
}

/** Validate exact, one-to-one accounting of the selected preferred or fallback checklist. */
export function elementCoverageGate(input: {
  document: DocumentModel;
  rule: Rule;
  status: FindingStatus;
  paragraphIds?: readonly string[];
  proposalLevel?: PositionLevel;
  operationCount: number;
  coverage?: ElementCoverage;
  /** Checklist to account against (defaults to `position.elements`; precise configs pass `elementsPrecise`). */
  elements?: Rule["position"]["elements"];
}): ElementGateResult {
  const errors: string[] = [];
  const actionable = input.status === "deviation" || input.status === "missing";
  if (input.coverage === undefined) {
    if (actionable || input.status === "needs_review") errors.push("Element coverage is required for an actionable or needs-review finding");
    return { ok: errors.length === 0, errors };
  }
  if (input.proposalLevel !== undefined && input.coverage.level !== input.proposalLevel) {
    errors.push(`Coverage level ${input.coverage.level} does not match proposal level ${input.proposalLevel}`);
  }
  const expected = (input.elements ?? input.rule.position.elements)[input.coverage.level];
  const counts = new Map<string, number>();
  for (const mapping of input.coverage.mappings) counts.set(mapping.element, (counts.get(mapping.element) ?? 0) + 1);
  for (const element of expected) {
    const count = counts.get(element) ?? 0;
    if (count === 0) errors.push(`Missing element mapping: ${element}`);
    if (count > 1) errors.push(`Duplicate element mapping: ${element}`);
  }
  for (const mapping of input.coverage.mappings) {
    if (!expected.includes(mapping.element)) {
      errors.push(`Unexpected ${input.coverage.level} element: ${mapping.element}`);
      continue;
    }
    if (mapping.status === "already_met") {
      if (!mapping.quote.trim()) errors.push(`Already-met element needs a verbatim quote: ${mapping.element}`);
      else if (!quoteExists(input.document, mapping.quote)) errors.push(`Evidence quote is not verbatim in the document: ${mapping.element}`);
      else if (input.paragraphIds !== undefined && !input.document.paragraphs.some(
        (paragraph) => input.paragraphIds?.includes(paragraph.id) && paragraph.text.includes(mapping.quote),
      )) errors.push(`Evidence quote paragraph must be cited in paragraphIds: ${mapping.element}`);
    } else if (mapping.status === "addressed_by_operation") {
      const indexes = [...new Set(mapping.operationIndexes)];
      if (indexes.length === 0) errors.push(`Addressed element needs an operation index: ${mapping.element}`);
      for (const index of indexes) {
        if (!Number.isInteger(index) || index < 1 || index > input.operationCount) {
          errors.push(`Element references invalid operation ${index}: ${mapping.element}`);
        }
      }
    } else if (input.status !== "needs_review") {
      errors.push(`Unaddressed element requires status needs_review: ${mapping.element}`);
    } else if (!mapping.explanation.trim()) {
      errors.push(`Unaddressed element needs an explanation: ${mapping.element}`);
    }
  }
  if (actionable && input.coverage.mappings.some((mapping) => mapping.status === "unaddressed")) {
    errors.push("Deviation and missing findings may not contain unaddressed elements");
  }
  return { ok: errors.length === 0, errors };
}

const CUSTOMER_ALIASES = /\b(?:client|licensee|company|buyer|purchaser|subscriber|user)\b/giu;
const VENDOR_ALIASES = /\b(?:supplier|provider|service provider|licensor|contractor|consultant|seller|host)\b/giu;

/** Apply the same customer/vendor alias contract used by the element prompts before regex evidence is assessed. */
export function canonicalizePartyAliases(text: string): string {
  return text
    .replace(VENDOR_ALIASES, "Vendor")
    .replace(CUSTOMER_ALIASES, "Customer")
    // Defined-party introductions commonly read `Acme (the "Customer") may ...`; let the byte-stable
    // round-1 regexes see the operative `Customer may` phrase without changing those legacy checks.
    .replace(/\b(Customer|Vendor)\b["'”’)]*(?=\s+(?:may|must|shall|will|is|has|does)\b)/gu, "$1");
}

/** Let legacy numeric checks read ordinary legal drafting such as "sixty (60) days". */
export function canonicalizeLegalNumerals(text: string): string {
  return text.replace(/\b[A-Za-z-]+\s*\(\s*(\d{1,4})\s*\)\s*(days?|months?|years?)\b/gu, "$1 $2");
}

function checkRuleOnce(check: Check, text: string): { ok: boolean; detail?: string } {
  try {
    if (check.type === "regex_present") return { ok: new RegExp(check.pattern, check.flags).test(text) };
    if (check.type === "regex_absent") return { ok: !new RegExp(check.pattern, check.flags).test(text) };
    if (check.type === "one_of") {
      const normalized = text.toLocaleLowerCase("en-US");
      return { ok: check.phrases.some((phrase) => normalized.includes(phrase.toLocaleLowerCase("en-US"))) };
    }
    const match = new RegExp(check.pattern, "i").exec(text);
    const value = Number(match?.[1]);
    if (!Number.isFinite(value)) return { ok: false, detail: "number not found" };
    return {
      ok: check.type === "number_min" ? value >= check.min : value <= check.max,
      detail: `value=${value}`,
    };
  } catch (error) {
    return { ok: false, detail: error instanceof Error ? error.message : String(error) };
  }
}

function checkRule(check: Check, text: string): { ok: boolean; detail?: string } {
  const direct = checkRuleOnce(check, text);
  if (direct.ok) return direct;
  const canonical = canonicalizeLegalNumerals(canonicalizePartyAliases(text));
  if (canonical === text) return direct;
  const aliased = checkRuleOnce(check, canonical);
  return aliased.ok ? { ...aliased, detail: "matched after customer/vendor alias normalization" } : direct;
}

function positionSpecificChecks(rule: Rule, level: PositionLevel | undefined, text: string): VerificationCheck[] {
  if (rule.id !== "LOL-CAP" || level !== "preferred") return [];
  const normalized = canonicalizePartyAliases(text);
  return [
    {
      name: "preferred cap uses fees paid or payable (not broader all amounts)",
      ok: /(?:fees?\s+paid\s+or\s+payable|paid\s+or\s+payable\s+fees?)/iu.test(normalized),
    },
    {
      name: "preferred cap lookback precedes the claim",
      ok: /(?:twelve|12)(?:\s*\(12\))?\s+months?[\s\S]{0,100}preceding\s+the\s+claim\b/iu.test(normalized),
    },
    {
      name: "preferred cap includes USD 1,000,000",
      ok: /(?:USD\s*|\$\s*)?(?:1,?000,?000|one\s+million)/iu.test(normalized),
    },
    {
      name: "preferred payment carve-out covers Customer payment obligations",
      ok: /Customer(?:'s)?\s+(?:payment obligations|obligation to pay (?:all\s+)?(?:amounts|charges))/u.test(normalized),
    },
  ];
}

function applicablePlaybookChecks(rule: Rule, level: PositionLevel | undefined): readonly Check[] {
  // These legacy checks validate the retained-covenant branch. Preferred removes the covenant (NOSOLICIT)
  // or can require mutual written renewal instead of an opt-out window (RENEWAL), so the atomic verifier is
  // the applicable evidence on that branch.
  if (level === "preferred" && (rule.id === "NOSOLICIT" || rule.id === "RENEWAL")) return [];
  return rule.checks;
}

/** Render cited and edited paragraphs in document order, including inserted paragraphs after their anchors. */
export function renderElementProposal(
  document: DocumentModel,
  paragraphIds: readonly string[],
  ops: readonly RedlineOp[],
): string {
  const targets = new Set([...paragraphIds, ...ops.map((op) => op.paragraphId)]);
  return document.paragraphs.flatMap((paragraph) => {
    if (!targets.has(paragraph.id)) return [];
    const visible = renderParagraph(document, paragraph.id, [...ops])
      .filter((segment) => segment.type !== "delete")
      .map((segment) => segment.text)
      .join("");
    const inserted = ops.flatMap((op) => op.kind === "insert_after" && op.paragraphId === paragraph.id ? [op.text] : []);
    return [visible, ...inserted].filter(Boolean);
  }).join("\n");
}

export function deterministicElementChecks(input: {
  document: DocumentModel;
  rule: Rule;
  status: FindingStatus;
  proposalLevel?: PositionLevel;
  paragraphIds: readonly string[];
  ops: readonly RedlineOp[];
}): { checks: VerificationCheck[]; rendered: string } {
  const checks: VerificationCheck[] = input.ops.map((op, index) => {
    const validation = validateOp(input.document, op);
    return { name: `operation ${index + 1} applies`, ok: validation.ok, detail: validation.error };
  });
  let rendered = "";
  try {
    rendered = renderElementProposal(input.document, input.paragraphIds, input.ops);
  } catch (error) {
    checks.push({ name: "redline renders", ok: false, detail: error instanceof Error ? error.message : String(error) });
  }
  for (const check of applicablePlaybookChecks(input.rule, input.proposalLevel)) {
    const result = checkRule(check, rendered);
    checks.push({ name: check.label, ...result });
  }
  checks.push(...positionSpecificChecks(input.rule, input.proposalLevel, rendered));
  const minimality = minimalityGate(input.status, input.ops);
  checks.push(...minimality.errors.map((detail) => ({ name: "minimality gate", ok: false, detail })));
  if (minimality.ok) checks.push({ name: "minimality gate", ok: true });
  if ((input.status === "deviation" || input.status === "missing") && input.ops.length === 0) {
    checks.push({ name: "proposal present", ok: false, detail: "Actionable finding has no operations" });
  }
  return { checks, rendered };
}

/** Element-config metric counterpart to round-1's literal-party-name check evaluator. */
export function proposalPassesElementChecks(document: DocumentModel, finding: Finding, rule: Rule): boolean {
  if (!finding.proposal) return false;
  try {
    const rendered = renderElementProposal(document, finding.paragraphIds, finding.proposal.ops);
    return applicablePlaybookChecks(rule, finding.proposal.level).every((check) => checkRule(check, rendered).ok) &&
      positionSpecificChecks(rule, finding.proposal.level, rendered).every((check) => check.ok);
  } catch {
    return false;
  }
}
