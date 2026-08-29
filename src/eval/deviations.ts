import type { GoldStatus } from "./gold";

export interface EvalParagraph {
  key: string;
  text: string;
}

export interface DeviationApplication {
  paragraphs: EvalParagraph[];
  paragraphKeys: string[];
  status: GoldStatus;
  expectedFix: string;
  note: string;
}

export interface DeviationVariant {
  ruleId: string;
  name: string;
  apply: (paragraphs: readonly EvalParagraph[]) => DeviationApplication;
}

function clone(paragraphs: readonly EvalParagraph[]): EvalParagraph[] {
  return paragraphs.map((paragraph) => ({ ...paragraph }));
}

function findIndex(paragraphs: readonly EvalParagraph[], prefix: string): number {
  const index = paragraphs.findIndex((paragraph) => paragraph.text.startsWith(prefix));
  if (index < 0) throw new Error(`Synthetic source paragraph not found: ${prefix}`);
  return index;
}

function replaceAt(
  paragraphs: readonly EvalParagraph[],
  prefix: string,
  replacement: string | ((current: string) => string),
  details: Omit<DeviationApplication, "paragraphs" | "paragraphKeys">,
): DeviationApplication {
  const next = clone(paragraphs);
  const index = findIndex(next, prefix);
  next[index].text = typeof replacement === "string" ? replacement : replacement(next[index].text);
  return { paragraphs: next, paragraphKeys: [next[index].key], ...details };
}

function insertAfter(
  paragraphs: readonly EvalParagraph[],
  prefix: string,
  key: string,
  text: string,
  details: Omit<DeviationApplication, "paragraphs" | "paragraphKeys">,
): DeviationApplication {
  const next = clone(paragraphs);
  const index = findIndex(next, prefix);
  next.splice(index + 1, 0, { key, text });
  return { paragraphs: next, paragraphKeys: [key], ...details };
}

function deleteSection(
  paragraphs: readonly EvalParagraph[],
  heading: string,
  nextHeading: string,
  details: Omit<DeviationApplication, "paragraphs" | "paragraphKeys">,
): DeviationApplication {
  const next = clone(paragraphs);
  const start = findIndex(next, heading);
  let end = next.findIndex((paragraph, index) => index > start && paragraph.text.startsWith(nextHeading));
  if (end < 0) {
    end = next.findIndex(
      (paragraph, index) => index > start && /^\d+\. [A-Z][A-Z\s&]+$/.test(paragraph.text),
    );
  }
  if (end < 0) end = next.length;
  next.splice(start, end - start);
  return { paragraphs: next, paragraphKeys: [], ...details };
}

const variants: DeviationVariant[] = [
  {
    ruleId: "LOL-CAP",
    name: "vendor-only-three-month-cap",
    apply: (paragraphs) =>
      replaceAt(paragraphs, "21.1 ", "21.1 Vendor's total aggregate liability shall not exceed the Fees paid by Customer during the three months preceding the claim. Customer's liability is unlimited.", {
        status: "deviation",
        expectedFix: "Make the cap mutual at 12 months' fees with standard carve-outs.",
        note: "Three-month cap protects only Vendor and expressly leaves Customer uncapped.",
      }),
  },
  {
    ruleId: "LOL-CAP",
    name: "fees-paid-one-month-no-carveouts",
    apply: (paragraphs) =>
      replaceAt(paragraphs, "21.1 ", "21.1 Each Party's aggregate liability shall not exceed Fees actually paid in the one month preceding the event, without exception.", {
        status: "deviation",
        expectedFix: "Raise the cap to at least 12 months' fees and restore the excluded-claim carve-outs.",
        note: "The cap is nominal and eliminates every standard carve-out.",
      }),
  },
  {
    ruleId: "INDEMN",
    name: "indemnity-section-removed",
    apply: (paragraphs) => deleteSection(paragraphs, "20. INDEMNIFICATION", "21. LIMITATION", {
      status: "missing",
      expectedFix: "Insert Vendor IP, law, data-breach, and misconduct indemnities.",
      note: "The Vendor indemnity section was removed in full.",
    }),
  },
  {
    ruleId: "INDEMN",
    name: "customer-only-indemnity",
    apply: (paragraphs) => {
      const removed = deleteSection(paragraphs, "20. INDEMNIFICATION", "21. LIMITATION", {
        status: "deviation",
        expectedFix: "Add a Vendor IP and misconduct indemnity and narrow Customer's obligation.",
        note: "Only Customer indemnifies; Vendor gives no IP infringement protection.",
      });
      return insertAfter(removed.paragraphs, "19.5 ", "INDEMN-customer-only", "20. INDEMNIFICATION\n20.1 Customer shall defend, indemnify, and hold harmless Vendor from every claim relating in any way to Customer's use of the Services.", {
        status: removed.status,
        expectedFix: removed.expectedFix,
        note: removed.note,
      });
    },
  },
  {
    ruleId: "NONCOMPETE",
    name: "customer-global-noncompete",
    apply: (paragraphs) => insertAfter(paragraphs, "12.3 ", "NONCOMPETE-global", "12.4 During the term and for twenty-four months thereafter, Customer shall not develop, market, sell, or acquire any product or service that competes with Vendor in any territory.", {
      status: "deviation",
      expectedFix: "Delete the restriction on Customer's business activities.",
      note: "Open-ended global post-term non-compete binds Customer.",
    }),
  },
  {
    ruleId: "NONCOMPETE",
    name: "customer-field-of-use-ban",
    apply: (paragraphs) => insertAfter(paragraphs, "12.3 ", "NONCOMPETE-field", "12.4 Customer agrees that it will not build or procure a competing analytics service for eighteen months after expiration.", {
      status: "deviation",
      expectedFix: "Remove the field-of-use ban, including the post-term tail.",
      note: "Customer cannot build or buy a competing service.",
    }),
  },
  {
    ruleId: "EXCLUSIVITY",
    name: "vendor-sole-provider",
    apply: (paragraphs) => insertAfter(paragraphs, "2.1 ", "EXCLUSIVITY-sole", "2.2 Vendor will be Customer's sole and exclusive provider of hosted analytics services throughout the term.", {
      status: "deviation",
      expectedFix: "Delete Customer's sole-source obligation.",
      note: "Customer must use Vendor as its exclusive provider.",
    }),
  },
  {
    ruleId: "EXCLUSIVITY",
    name: "all-requirements",
    apply: (paragraphs) => insertAfter(paragraphs, "2.1 ", "EXCLUSIVITY-requirements", "2.2 Customer shall purchase all of its requirements for services of this kind exclusively from Vendor.", {
      status: "deviation",
      expectedFix: "Remove the all-requirements purchase covenant.",
      note: "The clause imposes unrestricted exclusive dealing.",
    }),
  },
  {
    ruleId: "MFN",
    name: "customer-best-terms-to-vendor",
    apply: (paragraphs) => insertAfter(paragraphs, "7.1 ", "MFN-best-terms", "7.2 Customer shall offer Vendor terms no less favourable than the best terms Customer offers any other technology supplier.", {
      status: "deviation",
      expectedFix: "Delete the MFN obligation imposed on Customer.",
      note: "MFN runs in Vendor's favour and burdens Customer.",
    }),
  },
  {
    ruleId: "MFN",
    name: "customer-must-match-offers",
    apply: (paragraphs) => insertAfter(paragraphs, "7.1 ", "MFN-match", "7.2 Before engaging another provider, Customer must disclose and match for Vendor any more favourable commercial offer it receives.", {
      status: "deviation",
      expectedFix: "Remove Customer's disclosure and matching obligation.",
      note: "Customer must give Vendor the benefit of third-party offers.",
    }),
  },
  {
    ruleId: "NOSOLICIT",
    name: "two-year-no-hire",
    apply: (paragraphs) => insertAfter(paragraphs, "12.3 ", "NOSOLICIT-no-hire", "12.4 Customer shall not solicit, hire, or employ any Vendor employee during the term or for twenty-four months afterward, regardless of how the employee applies.", {
      status: "deviation",
      expectedFix: "Delete the no-hire or narrow it to involved personnel, 12 months, with general-advertising and unsolicited-approach carve-outs.",
      note: "Two-year no-hire covers every Vendor employee without carve-outs.",
    }),
  },
  {
    ruleId: "NOSOLICIT",
    name: "broad-eighteen-month-solicit",
    apply: (paragraphs) => insertAfter(paragraphs, "12.3 ", "NOSOLICIT-broad", "12.4 For eighteen months after termination Customer will not solicit or engage any person employed by Vendor at any time during the term.", {
      status: "deviation",
      expectedFix: "Limit scope and duration and add general-recruitment carve-outs.",
      note: "The restriction is overlong and covers personnel unrelated to the Services.",
    }),
  },
  {
    ruleId: "T4C",
    name: "customer-right-removed",
    apply: (paragraphs) => deleteSection(paragraphs, "9.4 ", "9.5 ", {
      status: "missing",
      expectedFix: "Insert Customer's 30-day convenience termination right with a prepaid-fee refund.",
      note: "Customer has no termination-for-convenience right in the three-year term.",
    }),
  },
  {
    ruleId: "T4C",
    name: "vendor-only-thirty-days",
    apply: (paragraphs) => replaceAt(paragraphs, "9.4 ", "9.4 Vendor may terminate this Agreement or any Order Form for convenience on thirty days' notice. Customer has no right to terminate without cause and shall pay all remaining committed Fees.", {
      status: "deviation",
      expectedFix: "Give Customer the 30-day right, remove Vendor's mid-term right, and delete the penalty.",
      note: "The convenience right runs only to Vendor on short notice.",
    }),
  },
  {
    ruleId: "RENEWAL",
    name: "three-year-renewal-120-day-window",
    apply: (paragraphs) => replaceAt(paragraphs, "8.2 ", "8.2 Each Order Form automatically renews for successive three-year periods unless Customer gives at least one hundred twenty days' prior notice of non-renewal.", {
      status: "deviation",
      expectedFix: "Use 12-month renewals and a notice window no longer than 60 days.",
      note: "Automatic three-year renewal has a 120-day lock-in window.",
    }),
  },
  {
    ruleId: "RENEWAL",
    name: "one-year-renewal-180-day-window",
    apply: (paragraphs) => replaceAt(paragraphs, "8.2 ", "8.2 Each Order Form renews for twelve months unless either Party gives one hundred eighty days' advance written notice.", {
      status: "deviation",
      expectedFix: "Shorten Customer's non-renewal window to 30 days, or 60 days at most.",
      note: "The 180-day notice deadline makes renewal difficult to avoid.",
    }),
  },
  {
    ruleId: "GOVLAW",
    name: "cayman-arbitration",
    apply: (paragraphs) => replaceAt(paragraphs, "28.1 ", "28.1 This Agreement is governed by the laws of the Cayman Islands, and every dispute shall be finally resolved by arbitration seated in George Town, Cayman Islands.", {
      status: "deviation",
      expectedFix: "Use New York law and courts in New York County.",
      note: "Mandatory foreign arbitration uses an unapproved governing law and venue.",
    }),
  },
  {
    ruleId: "GOVLAW",
    name: "singapore-exclusive-courts",
    apply: (paragraphs) => replaceAt(paragraphs, "28.1 ", "28.1 This Agreement is governed exclusively by Singapore law, and the courts of Singapore have exclusive jurisdiction.", {
      status: "deviation",
      expectedFix: "Replace the jurisdiction and forum with an accepted playbook venue.",
      note: "Singapore law and exclusive venue are outside the accepted list.",
    }),
  },
  {
    ruleId: "ASSIGN",
    name: "blanket-customer-consent",
    apply: (paragraphs) => replaceAt(paragraphs, "24.1 ", "24.1 Customer may not assign this Agreement, whether by merger, change of control, operation of law, or otherwise, without Vendor's prior written consent in its sole discretion.", {
      status: "deviation",
      expectedFix: "Add Customer affiliate and M&A successor carve-outs.",
      note: "Blanket restriction has no affiliate or transaction exception.",
    }),
  },
  {
    ruleId: "ASSIGN",
    name: "vendor-change-control-termination",
    apply: (paragraphs) => replaceAt(paragraphs, "24.4 ", "24.4 Any change of control of Customer entitles Vendor to terminate immediately or increase all Fees by twenty percent.", {
      status: "deviation",
      expectedFix: "Delete Vendor's termination and repricing rights on Customer's change of control.",
      note: "Customer's change of control triggers punitive Vendor remedies.",
    }),
  },
  {
    ruleId: "IP",
    name: "vendor-owns-deliverables",
    apply: (paragraphs) => replaceAt(paragraphs, "14.2 ", "14.2 Vendor exclusively owns every Deliverable created for Customer. Customer receives a revocable, non-transferable licence to use a Deliverable only during the applicable Order Form term.", {
      status: "deviation",
      expectedFix: "Assign paid-for Deliverables to Customer or grant a perpetual, irrevocable, transferable licence.",
      note: "Vendor owns bespoke work product and grants only a revocable term licence.",
    }),
  },
  {
    ruleId: "IP",
    name: "customer-assigns-data",
    apply: (paragraphs) => replaceAt(paragraphs, "14.1 ", "14.1 Customer hereby assigns all right, title, and interest in Customer Data, feedback, configurations, and related intellectual property to Vendor.", {
      status: "deviation",
      expectedFix: "Restore Customer ownership of Customer Data and pre-existing IP.",
      note: "Customer assigns its data and IP to Vendor.",
    }),
  },
  {
    ruleId: "LICENSE",
    name: "customer-only-revocable",
    apply: (paragraphs) => replaceAt(paragraphs, "13.1 ", "13.1 Vendor grants Customer alone a non-transferable licence, revocable at Vendor's sole discretion, to use the Services without Affiliates or contractors.", {
      status: "deviation",
      expectedFix: "Cover Affiliates and contractors, remove at-will revocation, and permit successor transfers.",
      note: "Licence is narrow and revocable in Vendor's sole discretion.",
    }),
  },
  {
    ruleId: "LICENSE",
    name: "no-affiliates-no-transfer",
    apply: (paragraphs) => replaceAt(paragraphs, "13.1 ", "13.1 Vendor grants Customer a personal, non-transferable, non-sublicensable right during the term to use the hosted Services solely through Customer employees.", {
      status: "deviation",
      expectedFix: "Extend use to Affiliates and contractors and allow transfer to successors.",
      note: "Affiliates, contractors, and successor transfers are excluded.",
    }),
  },
  {
    ruleId: "AUDIT",
    name: "unlimited-system-access",
    apply: (paragraphs) => replaceAt(paragraphs, "22.1 ", "22.1 Vendor may audit Customer at any time without notice and may remotely access Customer's systems and records for that purpose.", {
      status: "deviation",
      expectedFix: "Limit audits to once per 12 months on notice, off-site, and at Vendor's cost.",
      note: "Unlimited unannounced audits include direct system access.",
    }),
  },
  {
    ruleId: "AUDIT",
    name: "quarterly-customer-cost",
    apply: (paragraphs) => replaceAt(paragraphs, "22.1 ", "22.1 Vendor may conduct a usage audit every calendar quarter on five days' notice, and Customer shall pay all audit costs regardless of outcome.", {
      status: "deviation",
      expectedFix: "Reduce frequency to annual, increase notice, and shift ordinary costs to Vendor.",
      note: "Quarterly audits on short notice are always charged to Customer.",
    }),
  },
  {
    ruleId: "LD",
    name: "remaining-fees-liquidated-damages",
    apply: (paragraphs) => insertAfter(paragraphs, "7.5 ", "LD-remaining-fees", "7.6 If Customer terminates or reduces the Services, Customer shall pay all Fees for the remaining committed term as liquidated damages and not as a penalty.", {
      status: "deviation",
      expectedFix: "Delete the Customer-payable liquidated damages or cap an unavoidable fee at three months' fees.",
      note: "Customer owes the entire remaining contract value on termination.",
    }),
  },
  {
    ruleId: "LD",
    name: "daily-customer-penalty",
    apply: (paragraphs) => insertAfter(paragraphs, "7.5 ", "LD-daily-penalty", "7.6 Customer shall pay Vendor USD 25,000 per day as agreed liquidated damages for any delay in providing a dependency.", {
      status: "deviation",
      expectedFix: "Delete the one-sided Customer delay penalty.",
      note: "Disproportionate daily liquidated damages burden Customer.",
    }),
  },
  {
    ruleId: "WARRANTY",
    name: "fifteen-day-warranty",
    apply: (paragraphs) => replaceAt(paragraphs, "19.2 ", "19.2 For fifteen days after delivery, each Deliverable will materially conform to its documentation; after that date Vendor has no correction or refund obligation.", {
      status: "deviation",
      expectedFix: "Extend the performance warranty to at least 90 days and restore repair, replace, or refund remedies.",
      note: "Warranty lasts only 15 days and disclaims meaningful remedies afterward.",
    }),
  },
  {
    ruleId: "WARRANTY",
    name: "as-is-no-express-warranty",
    apply: (paragraphs) => deleteSection(paragraphs, "19. WARRANTIES", "20. INDEMNIFICATION", {
      status: "missing",
      expectedFix: "Insert professional-services and 90-day conformance warranties with remedies.",
      note: "The entire express warranty section is absent.",
    }),
  },
  {
    ruleId: "INSURANCE",
    name: "insurance-section-removed",
    apply: (paragraphs) => deleteSection(paragraphs, "18. INSURANCE", "19. WARRANTIES", {
      status: "missing",
      expectedFix: "Insert Vendor CGL, E&O, cyber, and workers' compensation coverage.",
      note: "Vendor has no contractual insurance obligation.",
    }),
  },
  {
    ruleId: "INSURANCE",
    name: "nominal-cgl-only",
    apply: (paragraphs) => replaceAt(paragraphs, "18.1 ", "18.1 Vendor shall maintain commercial general liability insurance of USD 100,000, but is not required to carry professional, cyber, privacy, or workers' compensation coverage.", {
      status: "deviation",
      expectedFix: "Require playbook-level CGL, E&O, cyber, and statutory workers' compensation insurance.",
      note: "Coverage is nominal and omits the risks material to hosted data services.",
    }),
  },
  {
    ruleId: "MINCOMMIT",
    name: "three-year-take-or-pay",
    apply: (paragraphs) => replaceAt(paragraphs, "2.1 ", "2.1 Customer commits to purchase at least USD 2,000,000 of Services in each of the next three years on a take-or-pay basis, without reduction or termination rights.", {
      status: "deviation",
      expectedFix: "Delete the multi-year take-or-pay commitment or add annual reduction and exit rights.",
      note: "Customer bears a fixed multi-year minimum without an exit.",
    }),
  },
  {
    ruleId: "MINCOMMIT",
    name: "annual-volume-shortfall",
    apply: (paragraphs) => replaceAt(paragraphs, "2.1 ", "2.1 Customer shall purchase at least 100,000 user-months each year and pay the full list price for every unit of shortfall.", {
      status: "deviation",
      expectedFix: "Remove the minimum volume and shortfall penalty or allow reductions on notice.",
      note: "Annual minimum volume is enforced by a punitive shortfall payment.",
    }),
  },
  {
    ruleId: "TRANSITION",
    name: "transition-section-removed",
    apply: (paragraphs) => deleteSection(paragraphs, "11. TRANSITION", "12. CUSTOMER", {
      status: "missing",
      expectedFix: "Insert transition assistance, data export within 30 days, and certified deletion.",
      note: "No transition or data-return obligation remains.",
    }),
  },
  {
    ruleId: "TRANSITION",
    name: "immediate-deletion-no-export",
    apply: (paragraphs) => replaceAt(paragraphs, "11.1 ", "11.1 Immediately on termination Vendor shall discontinue all assistance and permanently delete Customer Data without offering an export or migration support.", {
      status: "deviation",
      expectedFix: "Provide a 30-day data export and reasonable transition assistance before deletion.",
      note: "Immediate deletion creates lock-in and prevents an orderly transition.",
    }),
  },
];

export const DEVIATION_VARIANTS: readonly DeviationVariant[] = variants;

export function variantsForRule(ruleId: string): readonly DeviationVariant[] {
  return variants.filter((variant) => variant.ruleId === ruleId);
}

export { buildHardCase } from "./hardcase";
export type { HardCaseItem } from "./hardcase";
