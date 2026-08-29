/**
 * Fixture document: a realistic customer-side hosting agreement used by `/review/sample` until the
 * ingest pipeline is wired to the UI. Prose is original (no lorem, no third-party text) and is shaped
 * like the CUAD hosting agreements in the eval set: numbered sections, a definitions article, and the
 * deviations a customer-side playbook is meant to catch.
 */
import type { DocumentModel, Paragraph, Section } from "@/src/engine/types";

interface Draft {
  text: string;
  heading?: boolean;
  /** Outline label for headings (the heading text is ALL CAPS in the document itself). */
  label?: string;
  style?: string;
}

const drafts: Draft[] = [
  { text: "WEB SITE HOSTING AND MANAGED SERVICES AGREEMENT", style: "Title" },
  {
    text:
      "This Web Site Hosting and Managed Services Agreement (this “Agreement”) is entered into as of 14 March 2026 (the “Effective Date”) by and between Brightline Cloud Services Ltd., a company incorporated in England and Wales with its registered office at 40 Finsbury Square, London EC2A 1PX (“Vendor”), and Northwind Analytics, Inc., a Delaware corporation with offices at 1201 Marquette Avenue, Minneapolis, Minnesota 55403 (“Customer”).",
  },
  {
    text:
      "Vendor operates a managed hosting platform. Customer wishes to have its public web properties hosted and operated by Vendor. In consideration of the mutual covenants below, the parties agree as follows.",
  },

  { text: "1. DEFINITIONS", heading: true, label: "Definitions" },
  {
    text:
      "1.1 “Affiliate” means any entity that controls, is controlled by, or is under common control with a party, where “control” means the ownership of more than fifty percent (50%) of the voting securities of that entity.",
  },
  {
    text:
      "1.2 “Customer Data” means all data, content and materials submitted to, stored in, transmitted through or processed by the Hosted Environment by or on behalf of Customer, including personal data relating to Customer’s employees, customers and end users.",
  },
  {
    text:
      "1.3 “Deliverables” means the configurations, scripts, runbooks, architecture diagrams, reports and other materials prepared by Vendor for Customer under a Statement of Work.",
  },
  {
    text:
      "1.4 “Fees” means the recurring hosting fees set out in Schedule A, excluding professional services fees, overage charges, taxes and pass-through costs.",
  },
  {
    text:
      "1.5 “Hosted Environment” means the servers, storage, network equipment and platform software operated or procured by Vendor to host the Customer Site.",
  },
  {
    text:
      "1.6 “Service Levels” means the availability, incident response and restoration commitments set out in Schedule B.",
  },

  { text: "2. SERVICES AND SERVICE LEVELS", heading: true, label: "Services and Service Levels" },
  {
    text:
      "2.1 Hosting Services. Vendor shall host, operate, monitor, patch and maintain the Customer Site in the Hosted Environment in accordance with the Service Levels, and shall provide the support described in Schedule B during the Term.",
  },
  {
    text:
      "2.2 Changes to the Hosted Environment. Vendor may modify the Hosted Environment from time to time, provided that no modification materially degrades the functionality, performance or security of the Hosting Services.",
  },
  {
    text:
      "2.3 Customer Responsibilities. Customer shall supply the content of the Customer Site, keep its registration and contact information accurate, and use commercially reasonable efforts to keep its access credentials confidential.",
  },

  { text: "3. FEES AND PAYMENT", heading: true, label: "Fees and Payment" },
  {
    text:
      "3.1 Fees. Customer shall pay the Fees set out in Schedule A within thirty (30) days of the date of each valid invoice, in United States dollars, without set-off or deduction.",
  },
  {
    text:
      "3.2 Invoicing. Vendor shall invoice the Fees monthly in arrears, and each invoice shall itemise the Hosting Services ordered by Customer together with the usage detail required by Schedule A.",
  },
  {
    text:
      "3.3 Price Adjustments. Vendor may increase the Fees on thirty (30) days’ written notice at any time after the first anniversary of the Effective Date.",
  },
  {
    text:
      "3.4 Taxes. The Fees are exclusive of value added, sales and use taxes, which Customer shall pay except to the extent Customer provides a valid exemption certificate.",
  },

  { text: "4. TERM AND TERMINATION", heading: true, label: "Term and Termination" },
  {
    text:
      "4.1 Term. This Agreement commences on the Effective Date and continues for an initial term of three (3) years (the “Initial Term”), and shall automatically renew for successive renewal terms of three (3) years each unless either party gives written notice of non-renewal at least one hundred eighty (180) days before the end of the then-current term.",
  },
  {
    text:
      "4.2 Termination for Cause. Either party may terminate this Agreement on thirty (30) days’ written notice if the other party materially breaches this Agreement and fails to cure the breach within that notice period.",
  },
  {
    text:
      "4.3 Termination for Convenience. Vendor may terminate this Agreement for convenience at any time on sixty (60) days’ written notice to Customer.",
  },
  {
    text:
      "4.4 Effect of Termination. On expiry or termination of this Agreement, Customer’s right to access and use the Hosting Services ceases. Vendor shall, at Customer’s request, provide transition assistance for up to six (6) months at the rates set out in Schedule A, shall return Customer Data in a standard machine-readable format within thirty (30) days of the effective date of termination, and shall certify deletion of Customer Data thereafter.",
  },

  { text: "5. INTELLECTUAL PROPERTY", heading: true, label: "Intellectual Property" },
  {
    text:
      "5.1 Vendor Materials. Vendor retains all right, title and interest in and to the Hosted Environment, the platform software, and all tools, methodologies, templates and know-how used to provide the Hosting Services.",
  },
  {
    text:
      "5.2 Deliverables. All Deliverables created by Vendor under a Statement of Work shall be jointly owned by the parties, and each party may use, reproduce, modify and sublicense the Deliverables without any obligation to account to the other.",
  },
  {
    text:
      "5.3 Customer Data. Customer grants Vendor a worldwide, perpetual, irrevocable, royalty-free licence to use, reproduce, modify and create derivative works of Customer Data in order to operate, support and improve Vendor’s products and services.",
  },
  {
    text:
      "5.4 Feedback. Customer assigns to Vendor all suggestions, enhancement requests and other feedback that Customer provides regarding the Hosting Services.",
  },

  { text: "6. CONFIDENTIALITY", heading: true, label: "Confidentiality" },
  {
    text:
      "6.1 Obligations. Each party shall hold the Confidential Information of the other party in confidence, shall not disclose it to any third party other than to its personnel and advisers who need to know it, and shall use it only as necessary to perform this Agreement, in each case for a period of three (3) years from the date of disclosure.",
  },
  {
    text:
      "6.2 Compelled Disclosure. The receiving party may disclose Confidential Information to the extent required by law or by a governmental or regulatory authority, provided that it gives the disclosing party prompt written notice where legally permitted and reasonable assistance in seeking protective treatment.",
  },

  { text: "7. WARRANTIES AND DISCLAIMER", heading: true, label: "Warranties and Disclaimer" },
  {
    text:
      "7.1 Performance Warranty. Vendor warrants that (a) the Hosting Services will be performed in a professional and workmanlike manner by suitably qualified personnel consistent with industry standards, and (b) for a period of ninety (90) days following delivery, each Deliverable will conform in all material respects to its documentation. Customer’s remedy for breach of this warranty is, at Vendor’s option, re-performance, repair or replacement, or a refund of the Fees paid for the non-conforming Hosting Services or Deliverable.",
  },
  {
    text:
      "7.2 Disclaimer. EXCEPT AS EXPRESSLY SET OUT IN SECTION 7.1, THE HOSTING SERVICES AND THE HOSTED ENVIRONMENT ARE PROVIDED “AS IS”, AND VENDOR DISCLAIMS ALL OTHER WARRANTIES, WHETHER EXPRESS, IMPLIED OR STATUTORY, INCLUDING THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NON-INFRINGEMENT.",
  },

  { text: "8. INDEMNIFICATION", heading: true, label: "Indemnification" },
  {
    text:
      "8.1 Indemnity by Customer. Customer shall defend, indemnify and hold harmless Vendor and its Affiliates from and against any claim, loss, damage, liability, cost and expense (including reasonable legal fees) arising out of or relating to the content of the Customer Site, Customer Data, or Customer’s use of the Hosting Services in breach of this Agreement.",
  },
  {
    text:
      "8.2 Procedure. The indemnified party shall give prompt notice of any claim, shall permit the indemnifying party to control the defence and settlement of the claim, and shall provide reasonable cooperation at the indemnifying party’s expense.",
  },

  { text: "9. LIMITATION OF LIABILITY", heading: true, label: "Limitation of Liability" },
  {
    text:
      "9.1 Exclusion of Damages. Neither party shall be liable for any indirect, incidental, special, consequential or punitive damages, or for any loss of profit, revenue, goodwill or anticipated savings, arising out of or relating to this Agreement.",
  },
  {
    text:
      "9.2 Cap. Vendor’s total aggregate liability arising out of or relating to this Agreement shall not exceed the Fees paid by Customer in the three (3) months preceding the event giving rise to the claim. Customer’s liability under this Agreement shall not be limited.",
  },
  {
    text:
      "9.3 Exceptions. Nothing in this Section 9 limits or excludes either party’s liability for death or personal injury caused by its negligence, or for fraud or fraudulent misrepresentation.",
  },

  { text: "10. GENERAL PROVISIONS", heading: true, label: "General Provisions" },
  {
    text:
      "10.1 Assignment. Neither party may assign or transfer this Agreement without the prior written consent of the other party, provided that Vendor may assign this Agreement to an Affiliate or in connection with a merger, acquisition, reorganisation or sale of all or substantially all of its assets.",
  },
  {
    text:
      "10.2 Governing Law. This Agreement and any dispute arising out of it are governed by the laws of England and Wales, and each party submits to the exclusive jurisdiction of the courts of England and Wales.",
  },
  {
    text:
      "10.3 Audit. Vendor may, on five (5) business days’ notice, audit Customer’s records, systems and premises to verify Customer’s compliance with this Agreement, and Customer shall reimburse Vendor’s reasonable costs of any audit that reveals a material breach.",
  },
  {
    text:
      "10.4 Non-Solicitation. During the Term and for twelve (12) months after the end of an individual’s involvement in the Hosting Services, neither party shall solicit for employment any employee of the other party who was directly involved in the provision or receipt of the Hosting Services, provided that general advertisements and general solicitations not targeted at the other party’s personnel, and unsolicited approaches by an individual, are not restricted.",
  },
  {
    text:
      "10.5 Notices. Notices under this Agreement shall be in writing and delivered by hand, by courier or by email to the addresses set out above, and shall be deemed given on receipt or, in the case of email, on the sender’s receipt of confirmation of delivery.",
  },
  {
    text:
      "10.6 Entire Agreement. This Agreement, together with its Schedules and any Statement of Work, constitutes the entire agreement of the parties in relation to its subject matter and supersedes all prior proposals, discussions and agreements.",
  },
  {
    text:
      "IN WITNESS WHEREOF, the parties have executed this Agreement by their duly authorised representatives as of the Effective Date.",
  },
];

const definitionTerms: { term: string; paragraphIndex: number }[] = [
  { term: "Affiliate", paragraphIndex: 4 },
  { term: "Customer Data", paragraphIndex: 5 },
  { term: "Deliverables", paragraphIndex: 6 },
  { term: "Fees", paragraphIndex: 7 },
  { term: "Hosted Environment", paragraphIndex: 8 },
  { term: "Service Levels", paragraphIndex: 9 },
];

export const paragraphId = (index: number): string => `p${String(index).padStart(4, "0")}`;

function buildDocument(): DocumentModel {
  const paragraphs: Paragraph[] = [];
  const sections: Section[] = [
    { id: "sec-preamble", heading: "Preamble", level: 1, paragraphIds: [], childIds: [] },
  ];
  let current = sections[0];

  drafts.forEach((draft, index) => {
    const id = paragraphId(index);
    const numberMatch = /^(\d+(?:\.\d+)*)[.\s]/.exec(draft.text);
    const numbering = numberMatch ? numberMatch[1] : undefined;

    if (draft.heading) {
      current = {
        id: `sec-${numbering ?? String(sections.length)}`,
        number: numbering,
        heading: draft.label ?? draft.text,
        level: 1,
        paragraphIds: [],
        childIds: [],
      };
      sections.push(current);
    }

    paragraphs.push({
      id,
      index,
      text: draft.text,
      style: draft.style ?? (draft.heading ? "Heading 1" : "Normal"),
      numbering,
      level: draft.heading ? 1 : undefined,
      isHeading: Boolean(draft.heading),
      sectionId: current.id,
    });
    current.paragraphIds.push(id);
  });

  const words = paragraphs.reduce((total, p) => total + p.text.split(/\s+/).length, 0);

  return {
    id: "9f41c7a0be12",
    title: "Web Site Hosting and Managed Services Agreement",
    source: {
      kind: "docx",
      filename: "Brightline-Hosting-Agreement-v3.docx",
      sha256: "9f41c7a0be1264d1c0f6a3f9e07b5a8c31d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8",
      bytes: 48211,
    },
    paragraphs,
    sections,
    definitions: definitionTerms.map(({ term, paragraphIndex }) => ({
      term,
      paragraphId: paragraphId(paragraphIndex),
      text: drafts[paragraphIndex].text,
    })),
    stats: {
      words,
      paragraphs: paragraphs.length,
      sections: sections.length,
      definitions: definitionTerms.length,
    },
  };
}

export const sampleDocument: DocumentModel = buildDocument();
