import { describe, expect, it } from "vitest";

import {
  deterministicPreciseChecks,
  officialRuleCheckResults,
  preciseChangedCharacterRatio,
  preciseMinimalityGate,
  precisePositionCheckResults,
} from "@/src/agent/precise-element-gates";
import { preciseVerifierFeedback } from "@/src/agent/precise-element-verifier";
import { getConfig } from "@/src/agent/configs";
import { parseText } from "@/src/engine";
import type { Rule } from "@/src/playbook/schema";

const rule: Rule = {
  id: "RENEWAL",
  title: "Renewal",
  category: "term-termination",
  severity: "medium",
  kind: "parametric",
  cuad: [],
  summary: "Renewal window",
  position: {
    preferred: "Mutual written renewal.",
    fallback: "Automatic renewal on no more than 60 days' notice.",
    walkaway: "Long notice.",
    elements: { preferred: ["Mutual written renewal."], fallback: ["No more than 60 days' notice."] },
  },
  detect: "Find renewals.",
  redline: "Edit the notice.",
  checks: [{
    type: "number_max",
    label: "non-renewal notice window ≤ 60 days",
    pattern: "(\\d{1,3})\\s*(?:\\(\\d{1,3}\\)\\s*)?[- ]?days?['’]?[^.;]{0,40}?notice",
    max: 60,
  }],
};

describe("official precision gates", () => {
  it("enforces the official changed-character ratio before submission", () => {
    const document = parseText(
      "7.7 Customer shall pay Vendor liquidated damages. Fees otherwise remain due.",
      "contract.txt",
    );
    const surgical = {
      kind: "replace" as const,
      paragraphId: "p0000",
      oldText: "shall pay Vendor liquidated damages",
      newText: "shall not pay Vendor liquidated damages",
    };
    const rewrite = {
      ...surgical,
      oldText: "7.7 Customer shall pay Vendor liquidated damages.",
      newText: "7.7 No penalty is payable by Customer under any circumstances.",
    };
    expect(preciseChangedCharacterRatio(surgical)).toBeLessThanOrEqual(0.6);
    expect(preciseMinimalityGate(document, "deviation", [surgical]).ok).toBe(true);
    expect(preciseChangedCharacterRatio(rewrite)).toBeGreaterThan(0.6);
    expect(preciseMinimalityGate(document, "deviation", [rewrite]).ok).toBe(false);
  });

  it("rejects an edit that changes the boundary of an otherwise untouched sentence", () => {
    const document = parseText("Customer pays a penalty. Fees remain due.", "contract.txt");
    const result = preciseMinimalityGate(document, "deviation", [{
      kind: "replace",
      paragraphId: "p0000",
      oldText: "penalty.",
      newText: "penalty",
    }]);
    expect(result.errors).toContain("Operation 1 does not preserve every untouched sentence verbatim");
  });

  it("mirrors the official literal checks without alias or legal-number normalization", () => {
    expect(officialRuleCheckResults(rule, "automatic renewal on sixty (60) days written notice")[0]?.ok).toBe(false);
    expect(officialRuleCheckResults(rule, "automatic renewal on 60 days' notice")[0]?.ok).toBe(true);
    const document = parseText(
      "Renewal requires 90 days' notice. Each renewal price increase may not exceed 5%.",
      "contract.txt",
    );
    const checked = deterministicPreciseChecks({
      document,
      rule,
      status: "deviation",
      target: "fallback",
      paragraphIds: ["p0000"],
      ops: [{ kind: "replace", paragraphId: "p0000", oldText: "90 days", newText: "60 days" }],
    });
    expect(checked.checks.every((check) => check.ok)).toBe(true);
  });

  it("rejects an open-forum injunction carve-out and an automatic renewal without its price cap", () => {
    const governingLaw = { ...rule, id: "GOVLAW", checks: [] };
    const forum = [
      "This Agreement is governed by New York law.",
      "The state and federal courts in New York County have exclusive jurisdiction.",
      "Either Party may seek injunctive relief in any court of competent jurisdiction.",
    ].join(" ");
    expect(precisePositionCheckResults(governingLaw, "preferred", forum)[0]?.ok).toBe(false);

    const renewal = { ...rule, id: "RENEWAL", checks: [] };
    const automatic = "The Agreement automatically renews for 12 months on 30 days' notice with a 60-day reminder.";
    expect(precisePositionCheckResults(renewal, "preferred", automatic)[0]?.ok).toBe(false);
    expect(precisePositionCheckResults(
      renewal,
      "preferred",
      `${automatic} Each renewal price increase is capped at the lesser of CPI and 3%.`,
    )[0]?.ok).toBe(true);
  });

  it("accepts a transition return deadline before or after the return verb", () => {
    const transition = { ...rule, id: "TRANSITION", checks: [] };
    const fixed = [
      "Customer may request transition assistance for six months at then-current rates.",
      "Within thirty (30) days after termination, Vendor shall return all Customer Data in a standard machine-readable format.",
      "Thereafter Vendor shall delete all copies and certify deletion.",
    ].join(" ");
    expect(precisePositionCheckResults(transition, "preferred", fixed).every((check) => check.ok)).toBe(true);
    const verbFirst = fixed.replace(
      "Within thirty (30) days after termination, Vendor shall return all Customer Data",
      "Vendor shall return all Customer Data within 30 days following termination",
    );
    expect(precisePositionCheckResults(transition, "preferred", verbFirst).every((check) => check.ok)).toBe(true);
    const clientAlias = fixed.replace(
      "Within thirty (30) days after termination, Vendor shall return all Customer Data",
      "Within 30 days after such termination, Vendor shall return all Client Content and other Client data",
    );
    expect(precisePositionCheckResults(transition, "preferred", clientAlias).every((check) => check.ok)).toBe(true);
  });

  it("does not mistake a solicitation restriction plus hiring carve-out for a no-hire", () => {
    const noSolicit = { ...rule, id: "NOSOLICIT", checks: [] };
    const fallback = [
      "Neither Party shall solicit personnel of the other Party directly involved in the Services for 12 months from the end of their involvement.",
      "General advertisements and unsolicited approaches are excluded, and neither Party is restricted from hiring any person.",
    ].join(" ");
    expect(precisePositionCheckResults(noSolicit, "fallback", fallback).every((check) => check.ok)).toBe(true);
    expect(precisePositionCheckResults(
      noSolicit,
      "fallback",
      `${fallback} Customer shall not hire Vendor personnel.`,
    ).some((check) => !check.ok)).toBe(true);
    const termWide = [
      "Neither Party shall solicit personnel of the other Party directly involved in the Services during the term or for 12 months after their involvement ends.",
      "General advertisements and unsolicited approaches are excluded, and neither Party is restricted from hiring any person.",
    ].join(" ");
    expect(precisePositionCheckResults(noSolicit, "fallback", termWide)
      .some((check) => check.name.includes("full Agreement term") && !check.ok)).toBe(true);
  });

  it("rejects ambiguous IP references and overbroad Order Form transition triggers", () => {
    const document = parseText("14.2 Existing IP licence.", "contract.txt");
    const ip = deterministicPreciseChecks({
      document,
      rule: { ...rule, id: "IP", checks: [] },
      status: "deviation",
      target: "fallback",
      paragraphIds: ["p0000"],
      ops: [{
        kind: "insert_after",
        paragraphId: "p0000",
        text: "Vendor owns its generic tools and know-how. The limitations in the preceding sentence do not apply. Customer receives a perpetual, irrevocable, worldwide, royalty-free licence to use, modify, and sublicense the Deliverables for its business.",
      }],
    });
    expect(ip.checks.some((check) => check.name.includes("unambiguously") && !check.ok)).toBe(true);

    const transition = deterministicPreciseChecks({
      document,
      rule: { ...rule, id: "TRANSITION", checks: [] },
      status: "missing",
      target: "preferred",
      paragraphIds: ["p0000"],
      ops: [{
        kind: "insert_after",
        paragraphId: "p0000",
        text: "On expiry or termination of the Agreement or any Order Form, Vendor provides assistance at then-current rates, returns Customer Data in a standard machine-readable format within 30 days after termination, and thereafter deletes it and certifies deletion.",
      }],
    });
    expect(transition.checks.some((check) => check.name.includes("individual Order Form") && !check.ok)).toBe(true);
  });

  it("catches recurring assignment, T4C, warranty, transition, and minimum-commitment nuances", () => {
    const assignment = { ...rule, id: "ASSIGN", checks: [] };
    expect(precisePositionCheckResults(
      assignment,
      "preferred",
      "Customer may assign without consent to a financially responsible affiliate or an M&A successor.",
    )[0]?.ok).toBe(false);

    const termination = { ...rule, id: "T4C", checks: [] };
    const completeFallback = "Customer may terminate on 90 days' notice. Vendor may terminate for convenience only effective at the end of the then-current term on 90 days' notice. Any early-termination fee is capped at 3 months' fees.";
    expect(precisePositionCheckResults(termination, "fallback", completeFallback).every((check) => check.ok)).toBe(true);

    const warranty = { ...rule, id: "WARRANTY", checks: [] };
    const incompletePeriod = "For 90 days, Services are professional and workmanlike; software conforms to documentation for 12 months, with repair, replacement and refund.";
    expect(precisePositionCheckResults(warranty, "preferred", incompletePeriod).some((check) => !check.ok)).toBe(true);
    const narrowedServices = "For 90 days following performance, the Hosting Services and Support Services are professional and workmanlike; software conforms to documentation for 12 months, with repair, replacement and refund.";
    expect(precisePositionCheckResults(warranty, "preferred", narrowedServices)
      .some((check) => check.name.includes("generally") && !check.ok)).toBe(true);

    const transition = { ...rule, id: "TRANSITION", checks: [] };
    const requestClock = "On termination Vendor provides transition assistance for six months at then-current rates and, within 30 days of Customer's request, returns Customer Data in a standard machine-readable format, thereafter deletes it and certifies deletion.";
    expect(precisePositionCheckResults(transition, "preferred", requestClock)
      .some((check) => check.name.includes("not a later request") && !check.ok)).toBe(true);

    const minimum = { ...rule, id: "MINCOMMIT", checks: [] };
    expect(precisePositionCheckResults(
      minimum,
      "preferred",
      "Customer commits to no minimum and pays only for Services ordered or used, with reduction or termination rights.",
    )[0]?.ok).toBe(false);
  });

  it("rejects preferred-indemnity boilerplate outside the prose", () => {
    const document = parseText("9. Existing terms.", "contract.txt");
    const indemnity = { ...rule, id: "INDEMN", checks: [] };
    const checked = deterministicPreciseChecks({
      document,
      rule: indemnity,
      status: "missing",
      target: "preferred",
      paragraphIds: ["p0000"],
      ops: [{
        kind: "insert_after",
        paragraphId: "p0000",
        text: "Vendor shall defend, indemnify and hold harmless Customer, its affiliates, officers and directors.",
      }],
    });
    expect(checked.checks.filter((check) => !check.ok).map((check) => check.name)).toEqual(expect.arrayContaining([
      "precision position: preferred indemnity adds no hold-harmless language",
      "precision position: preferred indemnity adds no indemnitees beyond Customer and affiliates",
    ]));
  });
});

describe("judge-shaped repair feedback", () => {
  it("passes exact unmet elements and offending extra words back to the drafter", () => {
    const feedback = preciseVerifierFeedback({
      target: "fallback",
      elements: [{
        element: "Cap equal to 12 months' fees.",
        level: "fallback",
        status: "not_met",
        evidence: "The clause adds a USD floor.",
      }],
      checks: [{ name: "official minimality gate", ok: false, detail: "ratio 0.700" }],
      minimal: false,
      preservesIntent: true,
      offendingExtraWords: ["and USD 1,000,000"],
      reasons: ["The proposal mixes levels."],
    });
    expect(feedback).toContain("Cap equal to 12 months' fees.");
    expect(feedback).toContain("and USD 1,000,000");
    expect(feedback).toContain("ratio 0.700");
  });

  it("keeps i7 short-focused and carries i6 planning into final-v3", () => {
    expect(getConfig("i7-precise")).toMatchObject({
      preciseElementProtocol: true,
      verifierEffort: "medium",
      maxRepairRounds: 1,
      longDocumentPlanning: false,
    });
    expect(getConfig("final-v3")).toMatchObject({
      preciseElementProtocol: true,
      verifierEffort: "medium",
      maxRepairRounds: 1,
      longDocumentPlanning: true,
      longDocumentThresholdWords: 15_000,
      plannerMaxIterations: 28,
      workerMaxIterations: 24,
    });
    expect(getConfig("i5-elements").maxRepairRounds).toBe(3);
    expect(getConfig("i6-longdoc").maxRepairRounds).toBe(3);
    expect(getConfig("final-v2").maxRepairRounds).toBe(3);
  });
});
