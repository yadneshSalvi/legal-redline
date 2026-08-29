import type { SampleContract } from "../fixtures/samples";

const SMALL = new Set(["and", "or", "of", "the", "for", "to", "in", "a", "an", "with", "on", "by"]);

function titleCase(value: string): string {
  return value
    .toLowerCase()
    .split(/(\s+|-|\/)/)
    .map((token, index) => {
      if (/^\s+$/.test(token) || token === "-" || token === "/") return token;
      if (index > 0 && SMALL.has(token)) return token;
      return token.charAt(0).toUpperCase() + token.slice(1);
    })
    .join("");
}

function isShouty(value: string): boolean {
  const letters = value.replace(/[^A-Za-z]/g, "").length;
  if (letters === 0) return false;
  return value.replace(/[^A-Z]/g, "").length / letters > 0.7;
}

export interface PrettyTitle {
  title: string;
  filedYear?: string;
  part?: string;
  raw: string;
}

/**
 * CUAD filenames arrive as `COMPANY_MM_DD_YYYY-EX-10.2-ALL CAPS DOC TYPE`. Contracts are named by
 * what they are, so we show the document type in title case and keep the filing year as provenance.
 */
export function prettyContractTitle(raw: string): PrettyTitle {
  const match = /^(.+?)_(\d{2})_(\d{2})_(\d{4})-EX-[^-]+-(.+)$/.exec(raw);
  if (!match) return { title: isShouty(raw) ? titleCase(raw) : raw, raw };

  let docType = match[5];
  let part: string | undefined;
  const partMatch = /_Part(\d+)$/.exec(docType);
  if (partMatch) {
    part = `part ${partMatch[1]}`;
    docType = docType.slice(0, partMatch.index);
  }
  docType = docType.replace(/_/g, " ").trim();

  return { title: isShouty(docType) ? titleCase(docType) : docType, filedYear: match[4], part, raw };
}

/** Only the contracts that have something specific to say get a sentence (EVAL.md §1). */
export function sampleBlurb(sample: SampleContract): string | null {
  if (sample.note) return sample.note;
  if (sample.id.includes("hardcase")) {
    return "An illusory cap hidden in a definition, two decoy clauses, and a termination right split across two sections.";
  }
  if (sample.kind === "cuad") {
    return "A real SEC-filed agreement, converted to .docx by the dataset builder so paragraph ids stay stable.";
  }
  return "Generated from a playbook-compliant template with a fixed seed and known injected deviations.";
}

/** Where the gold labels for this contract come from. */
export function sampleGold(sample: SampleContract): string {
  return sample.kind === "cuad" ? "lawyer-annotated gold" : "exact injected gold";
}

/** Two real filings plus the hard case, so the row shows the range the eval set covers. */
export function pickSamples(samples: SampleContract[]): SampleContract[] {
  const cuad = samples.filter((s) => s.kind === "cuad");
  const hard = samples.find((s) => s.id.includes("hardcase"));
  const synthetic = hard ?? samples.find((s) => s.kind === "synthetic");
  const chosen = [...cuad.slice(0, synthetic ? 2 : 3), ...(synthetic ? [synthetic] : [])];
  return chosen.length > 0 ? chosen.slice(0, 3) : samples.slice(0, 3);
}
