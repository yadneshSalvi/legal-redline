import type { Severity } from "@/src/agent/types";

export interface SampleContract {
  id: string;
  title: string;
  words: number;
  kind: string;
  /** Not part of GET /api/samples; used only by the fixture cards. */
  note?: string;
}

/**
 * Fallback for `GET /api/samples` before the eval set is wired up. Titles and sources are the
 * CUAD contracts named in EVAL.md §1 (The Atticus Project, CC BY 4.0) plus one seeded synthetic.
 */
export const sampleContracts: SampleContract[] = [
  {
    id: "cuad-corio-hosting",
    title: "Corio — Licence and Hosting Agreement",
    words: 6412,
    kind: "cuad",
    note: "Real SEC-filed hosting paper: one-way cap, joint IP, vendor-side audit rights.",
  },
  {
    id: "cuad-bluefly-ebusiness-hosting",
    title: "Bluefly — e-business Hosting Agreement",
    words: 5180,
    kind: "cuad",
    note: "Three-year auto-renewal, no vendor indemnity, minimum commitment.",
  },
  {
    id: "synth-hardcase",
    title: "Vendor MSA — seeded hard case",
    words: 3940,
    kind: "synthetic",
    note: "Illusory cap hidden in a definition, two decoy clauses, split termination right.",
  },
];

export interface PlaybookSummary {
  id: string;
  name: string;
  version: string;
  rules: { id: string; title: string; severity: Severity; category: string }[];
}

/** Fallback for `GET /api/playbooks` — the default playbook shipped in data/playbooks. */
export const defaultPlaybook: PlaybookSummary = {
  id: "customer-vendor-services-v1",
  name: "Customer-side Vendor Services Playbook",
  version: "1.0",
  rules: [
    { id: "LOL-CAP", title: "Limitation of liability — cap, mutuality and carve-outs", severity: "critical", category: "liability" },
    { id: "INDEMN", title: "Indemnification by Vendor", severity: "critical", category: "indemnity" },
    { id: "NONCOMPETE", title: "Non-compete restrictions on Customer", severity: "high", category: "restrictive-covenants" },
    { id: "EXCLUSIVITY", title: "Exclusivity obligations binding Customer", severity: "high", category: "restrictive-covenants" },
    { id: "MFN", title: "Most-favoured-nation obligations burdening Customer", severity: "medium", category: "commercial" },
    { id: "NOSOLICIT", title: "Non-solicitation of employees binding Customer", severity: "medium", category: "restrictive-covenants" },
    { id: "T4C", title: "Termination for convenience", severity: "high", category: "term-termination" },
    { id: "RENEWAL", title: "Auto-renewal and non-renewal notice window", severity: "medium", category: "term-termination" },
    { id: "GOVLAW", title: "Governing law and venue", severity: "medium", category: "governing-law" },
    { id: "ASSIGN", title: "Assignment and change of control", severity: "high", category: "assignment" },
    { id: "IP", title: "Ownership of deliverables and Customer Data", severity: "critical", category: "ip-data" },
    { id: "LICENSE", title: "Licence grant scope", severity: "high", category: "licence" },
    { id: "AUDIT", title: "Audit rights against Customer", severity: "medium", category: "audit" },
    { id: "LD", title: "Liquidated damages and penalties payable by Customer", severity: "high", category: "commercial" },
    { id: "WARRANTY", title: "Performance warranty and duration", severity: "medium", category: "warranty" },
    { id: "INSURANCE", title: "Vendor insurance", severity: "low", category: "insurance" },
    { id: "MINCOMMIT", title: "Minimum purchase commitments and volume restrictions on Customer", severity: "medium", category: "commercial" },
    { id: "TRANSITION", title: "Post-termination transition assistance and data return", severity: "medium", category: "transition" },
  ],
};
