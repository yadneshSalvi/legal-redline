import { diffChars } from "diff";

import { minimalityGate, renderElementProposal } from "@/src/agent/element-gates";
import { preciseOperationCheckResults } from "@/src/agent/precise-element-operation-gates";
import type { FindingStatus, PositionLevel, VerificationCheck } from "@/src/agent/types";
import { validateOp } from "@/src/engine";
import type { DocumentModel, RedlineOp } from "@/src/engine/types";
import type { Check, Rule } from "@/src/playbook/schema";

export const OFFICIAL_REPLACEMENT_RATIO_LIMIT = 0.6;

export function preciseChangedCharacterRatio(op: Extract<RedlineOp, { kind: "replace" }>): number {
  const changed = diffChars(op.oldText, op.newText)
    .filter((part) => part.added === true || part.removed === true)
    .reduce((total, part) => total + part.value.length, 0);
  return changed / Math.max(op.oldText.length, op.newText.length, 1);
}

interface SentenceSpan {
  text: string;
  start: number;
  end: number;
}

function sentenceSpans(text: string): SentenceSpan[] {
  const pattern = /[^.!?]+(?:[.!?]+(?=\s|$)|$)/gu;
  return [...text.matchAll(pattern)].flatMap((match) => {
    const value = match[0].trim();
    const start = match.index;
    return value && start !== undefined ? [{ text: value, start, end: start + match[0].length }] : [];
  });
}

function untouchedSentencesPreserved(
  document: DocumentModel,
  op: Extract<RedlineOp, { kind: "replace" }>,
): boolean {
  const paragraph = document.paragraphs.find((candidate) => candidate.id === op.paragraphId)?.text;
  if (paragraph === undefined) return false;
  const start = paragraph.indexOf(op.oldText);
  if (start < 0 || paragraph.indexOf(op.oldText, start + op.oldText.length) >= 0) return false;
  const end = start + op.oldText.length;
  const rendered = `${paragraph.slice(0, start)}${op.newText}${paragraph.slice(end)}`;
  const untouched = sentenceSpans(paragraph)
    .filter((sentence) => sentence.end <= start || sentence.start >= end)
    .map((sentence) => sentence.text);
  const renderedSentences = new Set(sentenceSpans(rendered).map((sentence) => sentence.text));
  return untouched.every((sentence) => renderedSentences.has(sentence));
}

/** Pre-submit gates that exactly include the official CRR replacement threshold. */
export function preciseMinimalityGate(
  document: DocumentModel,
  status: FindingStatus,
  ops: readonly RedlineOp[],
): { ok: boolean; errors: string[] } {
  const base = minimalityGate(status, ops);
  const errors = [...base.errors];
  for (const [index, op] of ops.entries()) {
    if (op.kind !== "replace") continue;
    const ratio = preciseChangedCharacterRatio(op);
    if (ratio > OFFICIAL_REPLACEMENT_RATIO_LIMIT) {
      errors.push(
        `Operation ${index + 1} changed-character ratio ${ratio.toFixed(3)} exceeds the official 0.600 limit; ` +
        "anchor a larger unchanged surrounding span or change fewer operative characters",
      );
    }
    if (!untouchedSentencesPreserved(document, op)) {
      errors.push(`Operation ${index + 1} does not preserve every untouched sentence verbatim`);
    }
  }
  return { ok: errors.length === 0, errors };
}

function evaluateCheck(check: Check, text: string): { ok: boolean; detail?: string } {
  try {
    if (check.type === "regex_present") return { ok: new RegExp(check.pattern, check.flags).test(text) };
    if (check.type === "regex_absent") return { ok: !new RegExp(check.pattern, check.flags).test(text) };
    if (check.type === "one_of") {
      const normalized = text.toLocaleLowerCase("en-US");
      return { ok: check.phrases.some((phrase) => normalized.includes(phrase.toLocaleLowerCase("en-US"))) };
    }
    const match = new RegExp(check.pattern, "i").exec(text);
    const value = Number(match?.[1]);
    if (!Number.isFinite(value)) return { ok: false, detail: "number not found by the official literal pattern" };
    return {
      ok: check.type === "number_min" ? value >= check.min : value <= check.max,
      detail: `value=${value}`,
    };
  } catch (error) {
    return { ok: false, detail: error instanceof Error ? error.message : String(error) };
  }
}

/** Mirrors `src/eval/metrics.ts` without alias or written-number normalisation. */
export function officialRuleCheckResults(rule: Rule, rendered: string): VerificationCheck[] {
  return rule.checks.map((check) => ({ name: `official check: ${check.label}`, ...evaluateCheck(check, rendered) }));
}

function positionCheck(name: string, ok: boolean, detail: string): VerificationCheck {
  return { name: `precision position: ${name}`, ok, ...(ok ? {} : { detail }) };
}

/** High-confidence literal requirements repeatedly enforced by the prose-decomposing official judge. */
export function precisePositionCheckResults(
  rule: Rule,
  target: PositionLevel,
  rendered: string,
): VerificationCheck[] {
  if (rule.id === "LOL-CAP") {
    if (target === "fallback") {
      return [
        positionCheck(
          "fallback cap is equal to 12 months' fees without a preferred-only floor",
          /(?:12|twelve)(?:\s*\(12\))?\s+months?['’]?\s+(?:of\s+)?fees/iu.test(rendered) &&
            !/(?:greater\s+of|USD\s*1,?000,?000|\$\s*1,?000,?000|one\s+million)/iu.test(rendered),
          "Use a mutual cap equal to 12 months' fees; remove every greater-of or USD 1M floor from a fallback proposal.",
        ),
      ];
    }
    return [
      positionCheck(
        "preferred fee limb uses the exact lowercase fee basis and claim anchor",
        /fees\s+paid\s+or\s+payable[\s\S]{0,140}(?:12|twelve)(?:\s*\(12\))?\s+months?[\s\S]{0,80}preceding\s+the\s+claim\b/u.test(rendered),
        "Use the operative words 'fees paid or payable in the 12 months preceding the claim'; do not use defined capital-F Fees or an event anchor.",
      ),
      positionCheck(
        "preferred cap includes USD 1,000,000",
        /(?:USD\s*|\$\s*)?(?:1,?000,?000|one\s+million)/iu.test(rendered),
        "Include the USD 1,000,000 limb of the preferred greater-of cap.",
      ),
      positionCheck(
        "Customer payment obligations are not damages",
        /Customer(?:'s|’s)?\s+(?:payment\s+obligations|obligation\s+to\s+pay\s+(?:all\s+)?(?:amounts|fees)\s+due)[\s\S]{0,80}(?:not|aren't|are\s+not)\s+["“]?damages/iu.test(rendered),
        "State that Customer's payment obligations, or all amounts due, are not damages; undisputed Fees for conforming Services is too narrow.",
      ),
    ];
  }
  if (rule.id === "GOVLAW") {
    const openForumCarveout = /(?:injunctive|interim|equitable)[\s\S]{0,120}(?:any|another|other)\s+(?:court|forum|jurisdiction)/iu.test(rendered);
    const preferred = /New\s+York/iu.test(rendered) && /state\s+and\s+federal\s+courts?[\s\S]{0,80}New\s+York\s+County/iu.test(rendered) &&
      /exclusive\s+jurisdiction/iu.test(rendered) && !openForumCarveout;
    const fallback = /Delaware\s+law[\s\S]{0,160}(?:courts?\s+(?:of|in)\s+Delaware|Delaware\s+courts?)/iu.test(rendered) ||
      /California\s+law[\s\S]{0,160}(?:courts?\s+(?:of|in)\s+California|California\s+courts?)/iu.test(rendered) ||
      /laws?\s+of\s+England\s+and\s+Wales[\s\S]{0,160}(?:courts?\s+(?:of|in)\s+London|London\s+courts?)/iu.test(rendered);
    return [positionCheck(
      "governing law and forum are one permitted corresponding pair",
      target === "preferred" ? preferred : fallback && !openForumCarveout,
      target === "preferred"
        ? "Select New York law and exclusive state and federal courts in New York County; limit any injunction carve-out to those courts."
        : "Select Delaware law and Delaware courts, California law and California courts, or England and Wales law and London courts; permit no other forum carve-out.",
    )];
  }
  if (rule.id === "ASSIGN" && target === "preferred") {
    return [positionCheck(
      "preferred affiliate assignment is not limited by financial qualification",
      !/(?:financially\s+responsible|creditworthy|solvent|approved)\s+(?:Customer\s+)?affiliates?/iu.test(rendered),
      "Remove financial-responsibility, creditworthiness, solvency, or approval qualifications from Customer's consent-free affiliate assignment right.",
    )];
  }
  if (rule.id === "T4C" && target === "fallback") {
    const vendor = String.raw`(?:Vendor|Supplier|Provider|Licensor|Contractor|Consultant|Seller|Host|HDI|TrueLink)`;
    const endOfTerm = String.raw`(?:end|expiry|expiration)\s+of\s+(?:the\s+)?(?:then-current\s+)?term|(?:term|renewal)\s+(?:end|expiry|expiration)`;
    const vendorEndOnly = new RegExp(
      String.raw`(?:${vendor}[\s\S]{0,180}(?:only|effective)[\s\S]{0,100}(?:${endOfTerm})|(?:only|effective)[\s\S]{0,100}(?:${endOfTerm})[\s\S]{0,180}${vendor})`,
      "iu",
    );
    const vendorNinetyDays = new RegExp(
      String.raw`(?:${vendor}[\s\S]{0,180}(?:90|ninety)(?:\s*\(90\))?\s+days?|(?:90|ninety)(?:\s*\(90\))?\s+days?[\s\S]{0,180}${vendor})`,
      "iu",
    );
    return [
      positionCheck(
        "fallback Vendor convenience termination is effective only at the end of a term",
        vendorEndOnly.test(rendered),
        "State expressly that Vendor may terminate for convenience only effective at the end of the then-current term.",
      ),
      positionCheck(
        "fallback Vendor convenience termination requires 90 days' notice",
        vendorNinetyDays.test(rendered),
        "Require Vendor to give 90 days' notice for any permitted end-of-term convenience termination.",
      ),
    ];
  }
  if (rule.id === "RENEWAL") {
    if (target === "preferred") {
      const priceCap = /lesser\s+of[\s\S]{0,100}(?:CPI|consumer\s+price\s+index)[\s\S]{0,100}3\s*%|lesser\s+of[\s\S]{0,100}3\s*%[\s\S]{0,100}(?:CPI|consumer\s+price\s+index)/iu.test(rendered);
      return [positionCheck(
        "preferred automatic renewal includes the lesser-of-CPI-and-3% price cap",
        !/automatic(?:ally)?\s+renew/iu.test(rendered) || priceCap,
        "For automatic renewal, state that every renewal price increase is capped at the lesser of CPI and 3%, even if the original is silent.",
      )];
    }
    return [positionCheck(
      "fallback automatic renewal includes the 5% price cap",
      /(?:price|fee)[\s\S]{0,100}(?:increase|uplift)[\s\S]{0,80}(?:cap|exceed|more\s+than)[\s\S]{0,40}5\s*%/iu.test(rendered),
      "State that each renewal price increase may not exceed 5%.",
    )];
  }
  if (rule.id === "EXCLUSIVITY" && target === "fallback") {
    return [positionCheck(
      "fallback exclusivity uses a closed defined product category",
      !/(?:substantially\s+similar|companies\s+similar|including\s*,?\s+without\s+limitation)/iu.test(rendered),
      "Delete open-ended similar-product, similar-company, and including-without-limitation scope; name only the defined product category.",
    )];
  }
  if (rule.id === "LD" && target === "fallback") {
    const earlyTermination = /early\s+termination|terminat(?:e|ion)[\s\S]{0,80}(?:early|before\s+(?:the\s+)?(?:end|expiry))/iu.test(rendered);
    const threeMonths = /(?:3|three)(?:\s*\(3\))?\s+months?['’]?\s+(?:of\s+)?fees/iu.test(rendered);
    const sole = /sole\s+(?:liquidated\s+)?(?:amount|damages?|fee)/iu.test(rendered);
    return [positionCheck(
      "fallback liquidated amount is solely an early-termination fee capped at 3 months' fees",
      earlyTermination && threeMonths && sole,
      "Limit the only Customer-payable liquidated amount to an early-termination fee capped at 3 months' fees and call it the sole liquidated amount.",
    )];
  }
  if (rule.id === "LICENSE" && target === "fallback") {
    return [
      positionCheck(
        "fallback licence covers affiliates on written notice",
        /affiliates?[\s\S]{0,100}written\s+notice|written\s+notice[\s\S]{0,100}affiliates?/iu.test(rendered),
        "Extend the licence to Customer affiliates on written notice.",
      ),
      positionCheck(
        "fallback licence transfers to an M&A successor",
        /(?:Customer|Client|Company)[\s\S]{0,160}successor[\s\S]{0,120}(?:merger|acquisition|sale\s+of[\s\S]{0,40}assets)|successor[\s\S]{0,120}(?:merger|acquisition|sale\s+of[\s\S]{0,40}assets)[\s\S]{0,160}(?:Customer|Client|Company)/iu.test(rendered),
        "Permit Customer—not Vendor or either Party generally—to transfer the licence to its M&A successor.",
      ),
    ];
  }
  if (rule.id === "NOSOLICIT" && target === "fallback") {
    const checks: Array<[string, RegExp]> = [
      ["mutual restriction", /(?:each\s+Party|neither\s+Party|Parties\s+(?:shall|will)\s+not)[\s\S]{0,100}solicit|restriction\s+is\s+mutual|Customer\s+shall\s+not\s+solicit[\s\S]{0,300}Vendor\s+shall\s+not\s+solicit/iu],
      ["personnel directly involved in the Services", /(?:personnel|employees?)[\s\S]{0,80}directly\s+involved[\s\S]{0,80}Services/iu],
      ["12 months from the end of involvement", /12\s+months?[\s\S]{0,100}(?:end|ceas)[\s\S]{0,80}involvement/iu],
      ["general-advertisement carve-out", /general(?:ly)?[ -](?:advertis|solicitation)|job\s+(?:posting|board|advertisement)/iu],
      ["unsolicited-approach carve-out", /unsolicited\s+(?:approach|application)/iu],
    ];
    const result = checks.map(([name, pattern]) => positionCheck(
      `fallback non-solicit includes ${name}`,
      pattern.test(rendered),
      `State the ${name} expressly.`,
    ));
    result.push(positionCheck(
      "fallback non-solicit has no no-hire prohibition",
      !/(?:shall|will|may)\s+not\s+(?:directly\s+or\s+indirectly\s+)?(?:hire|employ)|prohibited\s+from\s+(?:hiring|employing)/iu.test(rendered),
      "Remove every prohibition on hiring or employing; fallback restricts solicitation only.",
    ));
    const independentTermPeriod = /during\s+the\s+term[\s\S]{0,100}(?:12|twelve)\s+months?[\s\S]{0,120}involvement/iu.test(rendered);
    const personSpecificLimit = /(?:restriction|sentence)[\s\S]{0,100}appl(?:y|ies)\s+only\s+during[\s\S]{0,80}involvement[\s\S]{0,100}(?:12|twelve)\s+months?[\s\S]{0,80}(?:after|thereafter)[\s\S]{0,80}(?:involvement\s+ends?|it\s+ends?)/iu.test(rendered);
    result.push(positionCheck(
      "fallback non-solicit period cannot run independently for the full Agreement term",
      !independentTermPeriod || personSpecificLimit,
      "For each covered person, apply the restriction only during that person's involvement in the Services and for 12 months after that involvement ends; do not add an independent Agreement-term restriction.",
    ));
    return result;
  }
  if (rule.id === "IP" && target === "fallback") {
    const required: Array<[string, RegExp]> = [
      ["generic tools", /generic\s+tools/iu], ["know-how", /know-how|knowhow/iu],
      ["perpetual", /perpetual/iu], ["irrevocable", /irrevocable/iu], ["worldwide", /worldwide/iu],
      ["royalty-free", /royalty[- ]free/iu], ["use", /\buse\b/iu], ["modify", /\bmodify\b/iu],
      ["sublicense", /\bsublicen[cs]e\b/iu], ["for its business", /for\s+(?:Customer's|its)\s+business/iu],
    ];
    return required.map(([name, pattern]) => positionCheck(
      `fallback IP includes ${name}`,
      pattern.test(rendered),
      `The fallback must state ${name} expressly in operative language.`,
    ));
  }
  if (rule.id === "IP" && target === "preferred") {
    return [positionCheck(
      "preferred embedded-IP licence covers any Vendor IP embedded in deliverables",
      /licen[cs]e[\s\S]{0,140}(?:any|all)[\s\S]{0,80}(?:Vendor|HDI|TrueLink)[\s\S]{0,80}(?:IP|intellectual\s+property|technology)[\s\S]{0,120}embedded|(?:any|all)[\s\S]{0,80}(?:Vendor|HDI|TrueLink)[\s\S]{0,80}(?:IP|intellectual\s+property|technology)[\s\S]{0,120}embedded[\s\S]{0,140}licen[cs]e/iu.test(rendered),
      "Grant Customer a perpetual, irrevocable, royalty-free licence to any Vendor IP embedded in the deliverables, not only named technology categories.",
    )];
  }
  if (rule.id === "WARRANTY") {
    const checks: Array<[string, RegExp]> = [
      ["professional Services", /Services[\s\S]{0,100}professional|professional[\s\S]{0,100}Services/iu],
      ["workmanlike Services", /Services[\s\S]{0,100}workmanlike|workmanlike[\s\S]{0,100}Services/iu],
      ["professional and workmanlike coverage of the Services generally", /\bthe\s+Services\b[\s\S]{0,120}professional[\s\S]{0,80}workmanlike|professional[\s\S]{0,80}workmanlike[\s\S]{0,120}\bthe\s+Services\b/iu],
      ["software conformance to documentation", /software[\s\S]{0,120}conform[\s\S]{0,80}documentation/iu],
      ["repair remedy", /\brepair\b/iu], ["replacement remedy", /\breplace(?:ment)?\b/iu], ["refund remedy", /\brefund\b/iu],
    ];
    checks.push(target === "preferred"
      ? ["12-month software period", /(?:12|twelve)(?:\s*\(12\))?\s+months?/iu]
      : ["90-day software period", /90\s+days?/u]);
    checks.push(target === "preferred"
      ? ["90-day Services period", /90\s+days?[\s\S]{0,160}Services|Services[\s\S]{0,160}90\s+days?/u]
      : ["30-day Services period", /30\s+days?[\s\S]{0,160}Services|Services[\s\S]{0,160}30\s+days?/u]);
    checks.push(target === "preferred"
      ? ["90-day Services period measured from performance or completion", /90\s+days?[\s\S]{0,60}(?:following|after|from)\s+(?:the\s+)?(?:performance|completion|delivery|acceptance)[\s\S]{0,100}Services|Services[\s\S]{0,120}90\s+days?[\s\S]{0,60}(?:following|after|from)\s+(?:the\s+)?(?:performance|completion|delivery|acceptance)/u]
      : ["30-day Services period measured from performance or completion", /30\s+days?[\s\S]{0,60}(?:following|after|from)\s+(?:the\s+)?(?:performance|completion|delivery|acceptance)[\s\S]{0,100}Services|Services[\s\S]{0,120}30\s+days?[\s\S]{0,60}(?:following|after|from)\s+(?:the\s+)?(?:performance|completion|delivery|acceptance)/u]);
    return checks.map(([name, pattern]) => positionCheck(
      `${target} warranty includes ${name}`,
      pattern.test(rendered),
      `State ${name} expressly and without replacing conformance with a materially-conforms qualification.`,
    ));
  }
  if (rule.id === "TRANSITION" && target === "preferred") {
    const thirtyDays = String.raw`(?:30|thirty\s*\(30\))\s+days?`;
    const endEvent = String.raw`(?:expiry|expiration|termination)`;
    const customerData = String.raw`(?:Customer\s+Data|Client\s+(?:Content|data)|Company(?:['’]s)?\s+(?:Content|data))`;
    const timelyReturn = new RegExp(
      String.raw`(?:return[\s\S]{0,120}${customerData}[\s\S]{0,120}${thirtyDays}[\s\S]{0,80}(?:after|following|of)\s+(?:(?:the|such)\s+)?${endEvent}|${thirtyDays}[\s\S]{0,80}(?:after|following|of)\s+(?:(?:the|such)\s+)?${endEvent}[\s\S]{0,160}return[\s\S]{0,120}${customerData})`,
      "iu",
    );
    const requestBasedDeadline = new RegExp(
      String.raw`${thirtyDays}[\s\S]{0,60}(?:after|following|of)\s+(?:the\s+)?(?:Customer|Client|Company)(?:['’]s)?\s+request`,
      "iu",
    );
    const checks: Array<[string, RegExp]> = [
      ["then-current rates", /then-current\s+rates/iu],
      ["standard machine-readable format", /standard\s+machine-readable\s+format/iu],
      ["30-day return after expiry or termination", timelyReturn],
      ["deletion after return", /after[\s\S]{0,50}return[\s\S]{0,100}delet|thereafter[\s\S]{0,100}delet/iu],
      ["certification of deletion", /certif[\s\S]{0,60}delet/iu],
    ];
    const results = checks.map(([name, pattern]) => positionCheck(
      `preferred transition includes ${name}`,
      pattern.test(rendered),
      `State ${name} expressly in the transition obligation.`,
    ));
    results.push(positionCheck(
      "preferred transition return deadline runs from expiry or termination, not a later request",
      !requestBasedDeadline.test(rendered),
      "Run the 30-day Customer Data return deadline from expiry or termination even when transition assistance itself is requested later.",
    ));
    return results;
  }
  if (rule.id === "MINCOMMIT" && target === "preferred") {
    return [positionCheck(
      "preferred no-minimum cure adds no free-standing reduction or termination rights",
      !/\bwith\s+(?:reduction|termination)\s+(?:or\s+(?:reduction|termination)\s+)?rights\b/iu.test(rendered),
      "Once the minimum is eliminated, delete the vestigial 'with reduction or termination rights' phrase instead of creating undefined new rights.",
    )];
  }
  return [];
}

export function deterministicPreciseChecks(input: {
  document: DocumentModel;
  rule: Rule;
  status: FindingStatus;
  target: PositionLevel;
  paragraphIds: readonly string[];
  ops: readonly RedlineOp[];
}): { checks: VerificationCheck[]; rendered: string } {
  const checks: VerificationCheck[] = input.ops.map((op, index) => {
    const result = validateOp(input.document, op);
    return { name: `operation ${index + 1} applies`, ok: result.ok, detail: result.error };
  });
  let rendered = "";
  try {
    rendered = renderElementProposal(input.document, input.paragraphIds, input.ops);
  } catch (error) {
    checks.push({ name: "redline renders", ok: false, detail: error instanceof Error ? error.message : String(error) });
  }
  checks.push(...officialRuleCheckResults(input.rule, rendered));
  checks.push(...precisePositionCheckResults(input.rule, input.target, rendered));
  checks.push(...preciseOperationCheckResults(input.document, input.rule, input.target, input.ops));
  const minimality = preciseMinimalityGate(input.document, input.status, input.ops);
  checks.push(...minimality.errors.map((detail) => ({ name: "official minimality gate", ok: false, detail })));
  if (minimality.ok) checks.push({ name: "official minimality gate", ok: true });
  if ((input.status === "deviation" || input.status === "missing") && input.ops.length === 0) {
    checks.push({ name: "proposal present", ok: false, detail: "Actionable finding has no operations" });
  }
  return { checks, rendered };
}
