import type { PositionLevel, VerificationCheck } from "@/src/agent/types";
import type { DocumentModel, RedlineOp } from "@/src/engine/types";
import type { Rule } from "@/src/playbook/schema";

function positionCheck(name: string, ok: boolean, detail: string): VerificationCheck {
  return { name: `precision position: ${name}`, ok, ...(ok ? {} : { detail }) };
}

function operationText(op: RedlineOp): string {
  if (op.kind === "insert_after") return op.text;
  if (op.kind === "replace") return op.newText;
  return "";
}

function operationIntroduces(ops: readonly RedlineOp[], pattern: RegExp): boolean {
  return ops.some((op) => {
    const next = operationText(op);
    if (!pattern.test(next)) return false;
    return op.kind !== "replace" || !pattern.test(op.oldText);
  });
}

export function preciseOperationCheckResults(
  document: DocumentModel,
  rule: Rule,
  target: PositionLevel,
  ops: readonly RedlineOp[],
): VerificationCheck[] {
  const checks: VerificationCheck[] = [];
  if (rule.id === "INDEMN" && target === "preferred") {
    const forbidden: Array<[string, RegExp]> = [
      ["hold-harmless language", /hold\s+harmless/iu],
      ["indemnitees beyond Customer and affiliates", /\b(?:officers?|directors?|employees?|agents?)\b/iu],
      ["a Customer defence duty", /\b(?:Customer|Company|Client)\b[\s\S]{0,100}\b(?:shall\s+)?defend\b/iu],
      ["settlement mechanics beyond notice, control, and cooperation", /\bsettle(?:ment)?\b|\bseparate\s+counsel\b|\badmission\b/iu],
      ["fallback infringement remedies", /\bprocure\b|\bmodify\b|\breplace\b|\brefund\b/iu],
    ];
    checks.push(...forbidden.map(([name, pattern]) => positionCheck(
      `preferred indemnity adds no ${name}`,
      !operationIntroduces(ops, pattern),
      `Remove ${name}; it is outside the preferred prose and fails strict minimality.`,
    )));
  }
  if (rule.id === "INSURANCE") {
    const tail = /(?:after|following)\s+(?:the\s+)?(?:expiry|expiration|termination)|surviv(?:e|es|al)/iu;
    checks.push(positionCheck(
      "insurance adds no post-termination coverage tail",
      !operationIntroduces(ops, tail),
      "Remove post-termination or survival coverage; neither selected position requires it.",
    ));
  }
  if (rule.id === "WARRANTY") {
    checks.push(positionCheck(
      "warranty adds no re-performance remedy",
      !operationIntroduces(ops, /\bre[- ]?perform(?:ance)?\b/iu),
      "Remove re-performance; the complete remedy set is repair, replacement, and refund only.",
    ));
  }
  if (rule.id === "IP" && target === "preferred") {
    const preferredOnly = /\bworldwide\b|\bmodify\b|\bsublicen[cs]e\b/iu;
    checks.push(positionCheck(
      "preferred IP licence adds no fallback-only worldwide, modification, or sublicensing rights",
      !operationIntroduces(ops, preferredOnly),
      "Remove worldwide, modification, and sublicensing rights from a preferred proposal; they belong only to fallback.",
    ));
  }
  if (rule.id === "LICENSE" && target === "fallback") {
    const preferredOnly = /\bcontractors?\b|\bpaid[- ]up\b|\bperpetual\b|\birrevocable\b|\bsubscription\b/iu;
    checks.push(positionCheck(
      "fallback licence adds no preferred-only scope or duration",
      !operationIntroduces(ops, preferredOnly),
      "At fallback, remove contractors, paid-up/perpetual/irrevocable rights, and subscription protections.",
    ));
  }
  if (rule.id === "ASSIGN" && target === "preferred") {
    checks.push(positionCheck(
      "preferred assignment adds no change-of-control deemed-assignment rule",
      !operationIntroduces(ops, /change\s+of\s+control[^.;]{0,100}(?:shall|will|does)\s+not\s+constitute\s+(?:an?\s+)?assignment/iu),
      "Delete the new deemed-assignment rule. State only that Vendor has no termination right on Customer's change of control.",
    ));
  }
  if (rule.id === "IP" && target === "fallback") {
    checks.push(positionCheck(
      "fallback IP disapplication identifies the source limitation unambiguously",
      !operationIntroduces(ops, /\bpreceding\s+sentence\b/iu),
      "Do not say 'preceding sentence' inside an inserted multi-sentence clause. Identify the exact source section and its revocable, non-transferable, or term limitation so the new licence cannot point at the wrong sentence.",
    ));
  }
  if (rule.id === "TRANSITION") {
    checks.push(positionCheck(
      "transition duties do not newly trigger on termination of an individual Order Form",
      !operationIntroduces(ops, /(?:expiry|expiration|termination)[^.;]{0,100}\bOrder\s+Form\b|\bAgreement\s+or\s+(?:an|any|the)\s+Order\s+Form\b/iu),
      "Trigger the new data-return, deletion, and transition duties on expiry or termination of the Agreement only; an individual Order Form trigger could disrupt continuing Services.",
    ));
  }
  if (rule.id === "MINCOMMIT" && target === "preferred") {
    checks.push(positionCheck(
      "preferred no-minimum operation adds no reduction or termination right",
      !ops.some((op) => /\b(?:reduction|termination)\s+(?:rights?|restrictions?)\b/iu.test(operationText(op))),
      "Remove reduction and termination rights or restrictions from the changed text; once no minimum exists, those words create an unnecessary separate right.",
    ));
  }
  for (const [index, op] of ops.entries()) {
    if (op.kind !== "insert_after" || op.asHeading !== true) continue;
    const afterExistingHeading = document.sections.some((section) => section.paragraphIds[0] === op.paragraphId);
    checks.push(positionCheck(
      `new heading operation ${index + 1} is anchored before the next section heading`,
      !afterExistingHeading,
      "Anchor a new numbered heading after the preceding section's final body paragraph, not after an existing section heading.",
    ));
  }
  return checks;
}
