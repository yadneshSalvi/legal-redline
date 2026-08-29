/**
 * Fixture findings for `/review/sample`: nine findings across every severity, every status, all three
 * redline op kinds and all four verifier verdicts, written in the playbook's own voice (PLAYBOOK.md).
 */
import type { Finding, Precedent } from "@/src/agent/types";

export const sampleFindings: Finding[] = [
  {
    id: "f-lol-cap",
    ruleId: "LOL-CAP",
    ruleTitle: "Limitation of liability — cap, mutuality and carve-outs",
    severity: "critical",
    status: "deviation",
    paragraphIds: ["p0040"],
    sectionId: "sec-9",
    sectionRef: "§ 9.2 Limitation of Liability",
    quote:
      "Vendor’s total aggregate liability arising out of or relating to this Agreement shall not exceed the Fees paid by Customer in the three (3) months preceding the event giving rise to the claim. Customer’s liability under this Agreement shall not be limited.",
    rationale:
      "The cap protects Vendor only, sits at three months’ Fees (and “Fees” is defined in Section 1.4 to exclude professional services and overages, so the real number is lower still), and states expressly that Customer’s liability is unlimited. That combination is a walk-away term under LOL-CAP.",
    proposal: {
      ops: [
        {
          kind: "replace",
          paragraphId: "p0040",
          oldText: "Vendor’s total aggregate liability",
          newText: "Except for Excluded Claims, each party’s total aggregate liability",
        },
        {
          kind: "replace",
          paragraphId: "p0040",
          oldText:
            "the Fees paid by Customer in the three (3) months preceding the event giving rise to the claim",
          newText:
            "the greater of (a) the fees paid or payable by Customer under this Agreement in the twelve (12) months immediately preceding the event giving rise to the claim and (b) USD 1,000,000",
        },
        {
          kind: "replace",
          paragraphId: "p0040",
          oldText: "Customer’s liability under this Agreement shall not be limited.",
          newText:
            "“Excluded Claims” means a party’s breach of its confidentiality, data protection or security obligations, its indemnification obligations, its gross negligence, wilful misconduct or fraud, and its infringement of the other party’s intellectual property rights.",
        },
      ],
      comment:
        "[Playbook] We cap liability mutually at the greater of twelve months’ fees or USD 1,000,000, and keep confidentiality, data protection, indemnities, gross negligence, wilful misconduct, fraud and IP infringement outside the cap. A one-way cap that leaves Customer unlimited is a walk-away position for us. Note that “Fees” as defined in Section 1.4 excludes professional services and overages — we have moved the cap onto fees paid or payable under the Agreement.",
      level: "preferred",
      summary: "Make the cap mutual at the greater of 12 months’ fees or USD 1m, with the standard carve-outs.",
      precedentId: "prec-acme-lolcap",
    },
    verification: {
      verdict: "pass",
      attempts: 1,
      notes:
        "All three anchors matched exactly once; the redrafted cap meets the preferred position and the edit stays inside Section 9.2.",
      checks: [
        { name: "ops_apply", ok: true, detail: "3 of 3 anchors matched exactly once" },
        { name: "cap references 12 months of fees or a fixed floor", ok: true },
        { name: "no unlimited Customer liability language remains", ok: true },
        { name: "minimality", ok: true, detail: "1 paragraph, 3 spans touched" },
      ],
    },
    confidence: 0.94,
    producedBy: "drafter",
  },
  {
    id: "f-indemn",
    ruleId: "INDEMN",
    ruleTitle: "Indemnification by Vendor",
    severity: "critical",
    status: "missing",
    paragraphIds: ["p0036"],
    sectionId: "sec-8",
    sectionRef: "§ 8 Indemnification",
    quote:
      "Customer shall defend, indemnify and hold harmless Vendor and its Affiliates from and against any claim, loss, damage, liability, cost and expense (including reasonable legal fees) arising out of or relating to the content of the Customer Site, Customer Data, or Customer’s use of the Hosting Services in breach of this Agreement.",
    rationale:
      "Section 8 contains a Customer indemnity and a procedure clause, but no Vendor indemnity anywhere in the document — searched for “indemnif”, “hold harmless” and “defend” across all 50 paragraphs. Absence of a Vendor IP indemnity is a deviation under INDEMN.",
    proposal: {
      ops: [
        {
          kind: "insert_after",
          paragraphId: "p0036",
          numbering: "8.2",
          text:
            "8.2 Indemnity by Vendor. Vendor shall defend, indemnify and hold harmless Customer and its Affiliates from and against any third-party claim, and all resulting damages, costs and expenses (including reasonable legal fees), to the extent arising out of (a) an allegation that the Hosting Services or Deliverables infringe or misappropriate any intellectual property right; (b) Vendor’s breach of applicable law; (c) any unauthorised access to or disclosure of Customer Data caused by Vendor; or (d) Vendor’s gross negligence or wilful misconduct.",
        },
      ],
      comment:
        "[Playbook] The agreement indemnifies Vendor but not Customer. We require a reciprocal Vendor indemnity covering IP infringement, breach of law, data breach and wilful misconduct, added here as new Section 8.2 — please renumber the following subsection. Fallback: an IP indemnity with the usual exclusions (Customer modifications, combinations, specifications) and remedies, subject to a super-cap of three times annual fees.",
      level: "preferred",
      summary: "Insert a Vendor indemnity for IP infringement, breach of law, data breach and wilful misconduct.",
    },
    verification: {
      verdict: "repaired",
      attempts: 2,
      notes:
        "First draft placed the indemnity in Section 9 and omitted the data-breach limb. Verifier rejected on both points; the repaired draft anchors inside Section 8 and covers all four limbs.",
      checks: [
        { name: "ops_apply", ok: true, detail: "anchor p0036 exists; renders as a tracked paragraph insertion" },
        { name: "vendor indemnity for IP infringement present", ok: true },
        { name: "placement", ok: true, detail: "inserted inside § 8 Indemnification" },
      ],
    },
    confidence: 0.88,
    producedBy: "drafter",
  },
  {
    id: "f-ip",
    ruleId: "IP",
    ruleTitle: "Ownership of deliverables and Customer Data",
    severity: "critical",
    status: "deviation",
    paragraphIds: ["p0026", "p0027"],
    sectionId: "sec-5",
    sectionRef: "§ 5.2–5.3 Intellectual Property",
    quote:
      "Customer grants Vendor a worldwide, perpetual, irrevocable, royalty-free licence to use, reproduce, modify and create derivative works of Customer Data in order to operate, support and improve Vendor’s products and services.",
    rationale:
      "Two deviations in one section: Deliverables are jointly owned with a free right to sublicense (Section 5.2), and Customer Data is licensed to Vendor perpetually and irrevocably to improve Vendor’s own products (Section 5.3). Under IP, Deliverables belong to Customer and any Customer Data licence is limited to providing the service.",
    proposal: {
      ops: [
        {
          kind: "replace",
          paragraphId: "p0026",
          oldText:
            "shall be jointly owned by the parties, and each party may use, reproduce, modify and sublicense the Deliverables without any obligation to account to the other",
          newText:
            "shall be the exclusive property of Customer, and Vendor hereby assigns to Customer all right, title and interest in and to the Deliverables, excluding Vendor’s pre-existing materials, in which Vendor grants Customer a perpetual, worldwide, royalty-free licence for Customer’s use of the Deliverables",
        },
        {
          kind: "replace",
          paragraphId: "p0027",
          oldText:
            "a worldwide, perpetual, irrevocable, royalty-free licence to use, reproduce, modify and create derivative works of Customer Data in order to operate, support and improve Vendor’s products and services",
          newText:
            "a non-exclusive, worldwide, royalty-free licence to host, use, reproduce and transmit Customer Data solely as necessary to provide the Hosting Services during the Term, and Customer retains all right, title and interest in and to Customer Data",
        },
      ],
      comment:
        "[Playbook] Deliverables and Customer Data sit with Customer. We have taken exclusive ownership of the Deliverables (Vendor keeps its pre-existing materials, licensed to us) and cut the Customer Data licence back to what Vendor needs to run the service. A perpetual, irrevocable licence to improve Vendor’s own products is a walk-away term for us.",
      level: "preferred",
      summary: "Assign Deliverables to Customer and narrow the Customer Data licence to service provision.",
    },
    verification: {
      verdict: "pass",
      attempts: 1,
      notes:
        "Both anchors matched once; the joint-ownership language is fully removed and the data licence is scoped to the Term and to providing the service.",
      checks: [
        { name: "ops_apply", ok: true, detail: "2 of 2 anchors matched exactly once" },
        { name: "no joint ownership language remains", ok: true },
        { name: "data licence limited to service provision", ok: true },
      ],
    },
    confidence: 0.91,
    producedBy: "drafter",
  },
  {
    id: "f-t4c",
    ruleId: "T4C",
    ruleTitle: "Termination for convenience",
    severity: "high",
    status: "deviation",
    paragraphIds: ["p0022"],
    sectionId: "sec-4",
    sectionRef: "§ 4.3 Term and Termination",
    quote:
      "Vendor may terminate this Agreement for convenience at any time on sixty (60) days’ written notice to Customer.",
    rationale:
      "Convenience termination runs one way: Vendor may exit on sixty days’ notice and Customer has no equivalent right, which leaves a three-year commitment that only the other side can end early. T4C requires a Customer right exercisable without penalty.",
    proposal: {
      ops: [
        {
          kind: "replace",
          paragraphId: "p0022",
          oldText:
            "Vendor may terminate this Agreement for convenience at any time on sixty (60) days’ written notice to Customer.",
          newText:
            "Customer may terminate this Agreement, or any Statement of Work, for convenience at any time on thirty (30) days’ written notice to Vendor, without penalty or early-termination charge and with a pro-rata refund of prepaid Fees, and Vendor may terminate this Agreement for convenience on not less than one hundred eighty (180) days’ written notice to Customer.",
        },
      ],
      comment:
        "[Playbook] Only Vendor may walk away today. Customer needs a thirty-day convenience right with no penalty and a pro-rata refund of prepaid fees; if Vendor keeps a convenience right it must be at least one hundred eighty days so we have time to migrate. Fallback: sixty days for Customer with the refund preserved.",
      level: "preferred",
      summary: "Give Customer a 30-day convenience right without penalty; stretch Vendor’s notice to 180 days.",
    },
    verification: {
      verdict: "pass",
      attempts: 1,
      notes: "Anchor matched once; both directions of the right are addressed in a single sentence edit.",
      checks: [
        { name: "ops_apply", ok: true, detail: "1 of 1 anchor matched exactly once" },
        { name: "customer convenience right present", ok: true },
        { name: "minimality", ok: true, detail: "1 sentence replaced" },
      ],
    },
    confidence: 0.9,
    producedBy: "drafter",
  },
  {
    id: "f-assign",
    ruleId: "ASSIGN",
    ruleTitle: "Assignment and change of control",
    severity: "high",
    status: "needs_review",
    paragraphIds: ["p0043"],
    sectionId: "sec-10",
    sectionRef: "§ 10.1 General Provisions",
    quote:
      "Neither party may assign or transfer this Agreement without the prior written consent of the other party, provided that Vendor may assign this Agreement to an Affiliate or in connection with a merger, acquisition, reorganisation or sale of all or substantially all of its assets.",
    rationale:
      "The consent requirement is mutual but the carve-out is not: Vendor may assign to an Affiliate or on a change of control, Customer may not. The drafted fix also adds a change-of-control exit, which the verifier considered out of place here — escalated rather than applied silently.",
    proposal: {
      ops: [
        {
          kind: "replace",
          paragraphId: "p0043",
          oldText:
            "provided that Vendor may assign this Agreement to an Affiliate or in connection with a merger, acquisition, reorganisation or sale of all or substantially all of its assets",
          newText:
            "provided that either party may assign this Agreement to an Affiliate or in connection with a merger, acquisition, reorganisation or sale of all or substantially all of its assets, and provided further that Customer may terminate this Agreement on thirty (30) days’ notice if Vendor is acquired by a competitor of Customer",
        },
      ],
      comment:
        "[Playbook] Assignment is one-sided: Vendor may assign freely, Customer may not. We have made the Affiliate and merger carve-out mutual and asked for a change-of-control exit where Vendor is acquired by a competitor. Flagged for you: the exit right may read better in Section 4, and “competitor” is undefined in this Agreement.",
      level: "fallback",
      summary: "Make the assignment carve-out mutual; change-of-control exit needs your call on placement.",
    },
    verification: {
      verdict: "fail",
      attempts: 3,
      notes:
        "Verifier held that the change-of-control termination right duplicates Section 4.3 as redrafted and that “competitor of Customer” is undefined, so the added sentence is unenforceable as drafted. Two repair rounds did not resolve it; escalated for a human decision.",
      checks: [
        { name: "ops_apply", ok: true, detail: "1 of 1 anchor matched exactly once" },
        { name: "defined terms resolved", ok: false, detail: "“competitor of Customer” is not defined in this Agreement" },
        { name: "minimality", ok: false, detail: "adds a termination right to an assignment clause" },
      ],
    },
    confidence: 0.52,
    producedBy: "drafter",
  },
  {
    id: "f-renewal",
    ruleId: "RENEWAL",
    ruleTitle: "Auto-renewal and non-renewal notice window",
    severity: "medium",
    status: "deviation",
    paragraphIds: ["p0020"],
    sectionId: "sec-4",
    sectionRef: "§ 4.1 Term and Termination",
    quote:
      "shall automatically renew for successive renewal terms of three (3) years each unless either party gives written notice of non-renewal at least one hundred eighty (180) days before the end of the then-current term",
    rationale:
      "Three-year evergreen renewals behind a one-hundred-eighty-day notice window mean a single missed diary date commits Customer for another three years. RENEWAL sets annual renewals with a thirty-day window.",
    proposal: {
      ops: [
        {
          kind: "replace",
          paragraphId: "p0020",
          oldText: "successive renewal terms of three (3) years each",
          newText: "successive renewal terms of one (1) year each",
        },
        {
          kind: "replace",
          paragraphId: "p0020",
          oldText: "at least one hundred eighty (180) days before the end of the then-current term",
          newText: "at least thirty (30) days before the end of the then-current term",
        },
      ],
      comment:
        "[Playbook] We renew annually with a thirty-day non-renewal window; three-year evergreen renewals behind a one-hundred-eighty-day window are a trap for the diary. Fallback: twelve-month renewals with sixty days’ notice.",
      level: "preferred",
      summary: "Cut renewal terms to one year and the non-renewal notice window to 30 days.",
    },
    verification: {
      verdict: "pass",
      attempts: 1,
      notes: "Two surgical spans; the Initial Term is deliberately left untouched.",
      checks: [
        { name: "ops_apply", ok: true, detail: "2 of 2 anchors matched exactly once" },
        { name: "renewal term ≤ 12 months", ok: true },
        { name: "notice window ≤ 60 days", ok: true },
      ],
    },
    confidence: 0.93,
    producedBy: "drafter",
  },
  {
    id: "f-audit",
    ruleId: "AUDIT",
    ruleTitle: "Audit rights against Customer",
    severity: "medium",
    status: "deviation",
    paragraphIds: ["p0045"],
    sectionId: "sec-10",
    sectionRef: "§ 10.3 General Provisions",
    quote:
      "Vendor may, on five (5) business days’ notice, audit Customer’s records, systems and premises to verify Customer’s compliance with this Agreement, and Customer shall reimburse Vendor’s reasonable costs of any audit that reveals a material breach.",
    rationale:
      "A hosting agreement has no licence metric to audit, yet Vendor may enter Customer premises and inspect Customer systems on five business days’ notice at Customer’s cost. AUDIT treats vendor audit rights over Customer systems as a deviation to be removed.",
    proposal: {
      ops: [{ kind: "delete_paragraph", paragraphId: "p0045" }],
      comment:
        "[Playbook] We do not grant vendors audit rights over our records, systems or premises, and there is no licence metric in a hosting agreement to audit, so Section 10.3 is deleted. Fallback if Vendor insists: once per year, thirty days’ notice, during business hours, at Vendor’s cost, limited to Vendor-supplied usage data.",
      level: "preferred",
      summary: "Delete Vendor’s audit right over Customer records, systems and premises.",
    },
    verification: {
      verdict: "pass",
      attempts: 1,
      notes: "Whole-paragraph deletion; no cross-reference to Section 10.3 exists elsewhere in the document.",
      checks: [
        { name: "ops_apply", ok: true, detail: "paragraph p0045 exists" },
        { name: "no vendor audit right remains", ok: true },
        { name: "no dangling cross-references", ok: true, detail: "searched “10.3” and “Audit”" },
      ],
    },
    confidence: 0.87,
    producedBy: "drafter",
  },
  {
    id: "f-mfn",
    ruleId: "MFN",
    ruleTitle: "Most-favoured-nation obligations burdening Customer",
    severity: "medium",
    status: "compliant",
    paragraphIds: ["p0017"],
    sectionId: "sec-3",
    sectionRef: "§ 3.3 Fees and Payment",
    quote:
      "Vendor may increase the Fees on thirty (30) days’ written notice at any time after the first anniversary of the Effective Date.",
    rationale:
      "No most-favoured-nation obligation binds Customer. Section 3.3 is a unilateral price-adjustment right rather than an MFN, and nothing requires Customer to offer Vendor its best terms — recorded as compliant so the pricing point is not double-counted.",
    verification: {
      verdict: "skipped",
      attempts: 0,
      notes: "Compliant findings carry no redline, so no verification round is run.",
      checks: [{ name: "no MFN language present", ok: true, detail: "searched “most favoured”, “most favored”, “best price”" }],
    },
    confidence: 0.82,
    producedBy: "drafter",
  },
  {
    id: "f-insurance",
    ruleId: "INSURANCE",
    ruleTitle: "Vendor insurance",
    severity: "low",
    status: "missing",
    paragraphIds: ["p0048"],
    sectionId: "sec-10",
    sectionRef: "§ 10 General Provisions",
    quote: "10. GENERAL PROVISIONS",
    rationale:
      "No insurance covenant anywhere in the document — searched “insurance”, “insurer”, “certificate of insurance” across all 50 paragraphs. For a vendor holding Customer Data in its own environment, INSURANCE expects general liability, professional indemnity and cyber cover with certificates on request.",
    proposal: {
      ops: [
        {
          kind: "insert_after",
          paragraphId: "p0048",
          numbering: "10.7",
          text:
            "10.7 Insurance. Vendor shall maintain, at its own expense, throughout the Term and for one (1) year thereafter, commercial general liability insurance of not less than USD 1,000,000 per occurrence and USD 2,000,000 in the aggregate, professional liability (errors and omissions) insurance of not less than USD 2,000,000, cyber liability insurance of not less than USD 5,000,000, and workers’ compensation insurance as required by law, and shall provide certificates of insurance on Customer’s reasonable request.",
        },
      ],
      comment:
        "[Playbook] There is no insurance covenant. We ask for the standard programme: USD 1m/2m general liability, USD 2m professional indemnity, USD 5m cyber (Vendor processes Customer Data), statutory workers’ compensation, and certificates on request. Low severity — a hygiene item rather than a blocker, added as a new subsection at the end of Section 10.",
      level: "preferred",
      summary: "Insert a Vendor insurance covenant (GL, professional indemnity, cyber, workers’ compensation).",
    },
    verification: {
      verdict: "pass",
      attempts: 1,
      notes: "Inserted as a new subsection after Section 10.6 so no existing numbering shifts; limits match the playbook.",
      checks: [
        { name: "ops_apply", ok: true, detail: "anchor p0048 exists" },
        { name: "cyber cover present", ok: true },
        { name: "certificates on request", ok: true },
      ],
    },
    confidence: 0.79,
    producedBy: "drafter",
  },
];

export const samplePrecedents: Precedent[] = [
  {
    id: "prec-acme-lolcap",
    ruleId: "LOL-CAP",
    title: "Mutual cap at 12 months’ fees with an Excluded Claims carve-out",
    source: "Acme Cloud MSA (Mar 2025)",
    clauseBefore:
      "Supplier’s aggregate liability shall not exceed the charges paid in the six (6) months preceding the claim.",
    clauseAfter:
      "Except for Excluded Claims, each party’s total aggregate liability arising out of or relating to this Agreement shall not exceed the greater of (a) the fees paid or payable by Customer in the twelve (12) months immediately preceding the event giving rise to the claim and (b) USD 1,000,000.",
    comment:
      "[Playbook] Mutual cap at the greater of twelve months’ fees or USD 1,000,000, with indemnities, confidentiality, data protection and wilful misconduct outside the cap.",
    level: "preferred",
    approvedAt: "2025-03-18T09:12:00.000Z",
    approvedBy: "R. Okafor",
    tags: ["hosting", "saas", "accepted-as-drafted"],
  },
];
