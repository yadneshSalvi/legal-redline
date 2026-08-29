import type { EvalParagraph } from "./deviations";
import type { GoldStatus } from "./gold";

export interface HardCaseItem {
  ruleId: string;
  paragraphKeys: string[];
  status: GoldStatus;
  expectedFix?: string;
  note: string;
}

function find(paragraphs: readonly EvalParagraph[], prefix: string): number {
  const index = paragraphs.findIndex((paragraph) => paragraph.text.startsWith(prefix));
  if (index < 0) throw new Error(`Hard-case source paragraph not found: ${prefix}`);
  return index;
}

function addAfter(paragraphs: EvalParagraph[], prefix: string, key: string, text: string): void {
  paragraphs.splice(find(paragraphs, prefix) + 1, 0, { key, text });
}

export function buildHardCase(paragraphs: readonly EvalParagraph[]): {
  paragraphs: EvalParagraph[];
  items: HardCaseItem[];
} {
  const next = paragraphs.map((paragraph) => ({ ...paragraph }));
  const definitionKey = next[find(next, "1.5 ")].key;
  next[find(next, "1.8 ")].text = next[find(next, "1.8 ")].text.replace(/^1\.8/, "1.9");
  next[find(next, "1.7 ")].text = next[find(next, "1.7 ")].text.replace(/^1\.7/, "1.8");
  next[find(next, "1.6 ")].text = next[find(next, "1.6 ")].text.replace(/^1\.6/, "1.7");
  next[find(next, "1.5 ")].text = "1.5 “Fees” means the Implementation Fee.";
  addAfter(
    next,
    "1.5 ",
    "hard-implementation-fee-definition",
    "1.6 “Implementation Fee” means the one-time implementation charge of USD 12,000 stated in the first Order Form.",
  );
  const capIndex = find(next, "21.1 ");
  const capKey = next[capIndex].key;
  next[capIndex].text =
    "21.1 Except for Excluded Claims, each Party's total aggregate liability arising out of or relating to this Agreement shall not exceed the Fees paid or payable by Customer under the first Order Form during the twelve months preceding the event giving rise to the claim. The cap is mutual and applies regardless of the form of action or number of claims.";

  addAfter(
    next,
    "12.3 ",
    "hard-vendor-noncompete",
    "12.4 Vendor shall not develop or market a service that competes directly with Customer's proprietary analytics products during the term.",
  );
  addAfter(
    next,
    "7.5 ",
    "hard-customer-mfn",
    "7.6 Vendor warrants that Fees charged to Customer will be no less favourable than fees offered to any similarly situated customer for comparable volumes and terms.",
  );
  addAfter(
    next,
    "7.6 ",
    "hard-late-payment-ld",
    "7.7 If any invoice is not paid within ten days of its due date, Customer shall pay Vendor, as liquidated damages and not as a penalty, an amount equal to fifteen percent of the annual Fees for each week the invoice remains unpaid.",
  );
  const terminationKey = next[find(next, "9.4 ")].key;
  next[find(next, "9.4 ")].text =
    "9.4 Customer may terminate this Agreement or any Order Form without cause by delivering the written notice specified in Section 29.4. Customer owes only accrued Fees, and Vendor shall refund prepaid Fees for the period after termination.";
  addAfter(
    next,
    "29.3 ",
    "hard-cross-reference-notice",
    "29.4 The notice period referenced in Section 9.4 is thirty days before the effective termination date and may be given by the methods in Section 29.1.",
  );

  return {
    paragraphs: next,
    items: [
      {
        ruleId: "LOL-CAP",
        paragraphKeys: [definitionKey, "hard-implementation-fee-definition", capKey],
        status: "deviation",
        expectedFix:
          "Use a mutual cap on total fees paid or payable under the Agreement (all charges) in the preceding 12 months, with a USD 1,000,000 floor.",
        note: "Cap references 'Fees', defined as the USD 12,000 one-off Implementation Fee; the 12-month cap is illusory",
      },
      {
        ruleId: "NONCOMPETE",
        paragraphKeys: ["hard-vendor-noncompete"],
        status: "compliant",
        note: "The non-compete binds Vendor, not Customer.",
      },
      {
        ruleId: "MFN",
        paragraphKeys: ["hard-customer-mfn"],
        status: "compliant",
        note: "The MFN is in Customer's favour.",
      },
      {
        ruleId: "T4C",
        paragraphKeys: [terminationKey, "hard-cross-reference-notice"],
        status: "compliant",
        note: "Customer has a 30-day convenience right through an explicit cross-reference.",
      },
      {
        ruleId: "LD",
        paragraphKeys: ["hard-late-payment-ld"],
        status: "deviation",
        expectedFix: "Delete the weekly fifteen-percent liquidated-damages charge for overdue invoices.",
        note: "The fees section imposes punitive Customer-payable liquidated damages for late payment.",
      },
    ],
  };
}
