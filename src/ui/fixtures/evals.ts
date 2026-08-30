/**
 * Fallback for `GET /api/evals` — the shape `src/eval/report.ts` writes to
 * `evals/results/changelog-data.json`, with illustrative numbers so the dashboard can be designed
 * and reviewed before the eval has been run in an environment. The page labels this "fixture"
 * wherever it is used; real results always win and none of these figures may be quoted.
 *
 * The round-1 `configs[]` numbers are unchanged from the first fixture. `tiers[]` adds the round-2
 * shape — both tiers, the three end-to-end redline rates and the per-element misses — so the tier
 * switch and the element panel have something to render before a report exists.
 */
import type { ConfigId } from "@/src/agent/types";
import type { ElementMiss, EvalsData } from "../lib/evals";
import { configResult, type ContractSpec, type Profile } from "./evals-gen";

/** The 12 committed short-tier contracts (EVAL.md §1). */
const shortContracts: ContractSpec[] = [
  { id: "cuad-americas-shopping-mall-hosting", goldPositives: 8, words: 2880 },
  { id: "cuad-bluefly-hosting", goldPositives: 11, words: 5136 },
  { id: "cuad-bnc-mortgage-hosting", goldPositives: 10, words: 4738 },
  { id: "cuad-corio-hosting", goldPositives: 13, words: 8396 },
  { id: "cuad-kubient-msa-part1", goldPositives: 9, words: 4014 },
  { id: "cuad-merit-life-master-services", goldPositives: 8, words: 3292 },
  { id: "cuad-sfg-financial-license", goldPositives: 12, words: 7749 },
  { id: "cuad-sparkling-spring-license", goldPositives: 9, words: 3885 },
  { id: "synth-11", goldPositives: 7, words: 4758 },
  { id: "synth-12", goldPositives: 8, words: 4321 },
  { id: "synth-13", goldPositives: 6, words: 4444 },
  { id: "synth-hardcase", goldPositives: 5, words: 4876 },
];

/** The six long-tier contracts and their canonical word counts (pre-registration §Population). */
const longContracts: ContractSpec[] = [
  { id: "long-array-biopharma-inc", goldPositives: 8, words: 42_742 },
  { id: "long-harpoontherapeuticsinc", goldPositives: 8, words: 37_789 },
  { id: "long-manufacturersservicesltd", goldPositives: 8, words: 41_906 },
  { id: "long-phasebiopharmaceuticalsinc", goldPositives: 8, words: 45_074 },
  { id: "long-revolutionmedicinesinc", goldPositives: 8, words: 40_426 },
  { id: "long-verizonabsllc", goldPositives: 8, words: 44_507 },
];

/** Fixed per-contract offsets: real runs are uneven, and a flat table reads as invented. */
const shortJitter = [0.03, -0.04, 0.02, -0.06, 0.05, -0.02, -0.05, 0.04, 0.06, -0.03, 0.02, 0];
const longJitter = [0.04, -0.05, 0.02, -0.03, 0.05, -0.02];

const profiles: Profile[] = [
  { id: "b0-chat", recall: 0.34, precision: 0.29, statusAccuracy: 0.41, validity: 0.11, minimality: 0.18, hallucination: 0.19, hardPenalty: 0.22, callsPerContract: 1, toolCallsPerContract: 0, retriesPerContract: 0, inputPerKWord: 1500, outputPerKWord: 340, cachedShare: 0, costPerContract: 0.09, latencyMsPerContract: 41_000, escalationsPerContract: 0 },
  { id: "b1-prompt", recall: 0.54, precision: 0.51, statusAccuracy: 0.62, validity: 0.38, minimality: 0.44, hallucination: 0.11, hardPenalty: 0.2, callsPerContract: 1, toolCallsPerContract: 0, retriesPerContract: 0, inputPerKWord: 2600, outputPerKWord: 620, cachedShare: 0, costPerContract: 0.22, latencyMsPerContract: 63_000, escalationsPerContract: 0 },
  { id: "i1-docmodel", recall: 0.66, precision: 0.6, statusAccuracy: 0.71, validity: 0.54, minimality: 0.57, hallucination: 0.055, hardPenalty: 0.16, callsPerContract: 4, toolCallsPerContract: 9, retriesPerContract: 1, inputPerKWord: 3100, outputPerKWord: 700, cachedShare: 0.42, costPerContract: 0.39, latencyMsPerContract: 88_000, escalationsPerContract: 0 },
  { id: "i2-workers", recall: 0.74, precision: 0.69, statusAccuracy: 0.79, validity: 0.78, minimality: 0.72, hallucination: 0.018, hardPenalty: 0.12, callsPerContract: 24, toolCallsPerContract: 71, retriesPerContract: 2, inputPerKWord: 8200, outputPerKWord: 1400, cachedShare: 0.71, costPerContract: 0.95, latencyMsPerContract: 152_000, escalationsPerContract: 1 },
  { id: "i3-verifier", recall: 0.79, precision: 0.79, statusAccuracy: 0.85, validity: 0.91, minimality: 0.81, hallucination: 0.009, hardPenalty: 0.08, callsPerContract: 38, toolCallsPerContract: 96, retriesPerContract: 4, inputPerKWord: 11_800, outputPerKWord: 1900, cachedShare: 0.78, costPerContract: 1.43, latencyMsPerContract: 214_000, escalationsPerContract: 2 },
  { id: "i4-memory", recall: 0.83, precision: 0.83, statusAccuracy: 0.88, validity: 0.93, minimality: 0.86, hallucination: 0.007, hardPenalty: 0.06, callsPerContract: 40, toolCallsPerContract: 104, retriesPerContract: 3, inputPerKWord: 12_400, outputPerKWord: 1950, cachedShare: 0.8, costPerContract: 1.52, latencyMsPerContract: 226_000, escalationsPerContract: 2 },
  { id: "x-monolith", recall: 0.62, precision: 0.74, statusAccuracy: 0.8, validity: 0.83, minimality: 0.79, hallucination: 0.015, hardPenalty: 0.18, callsPerContract: 31, toolCallsPerContract: 128, retriesPerContract: 7, inputPerKWord: 17_600, outputPerKWord: 2300, cachedShare: 0.55, costPerContract: 1.94, latencyMsPerContract: 341_000, escalationsPerContract: 1 },
  { id: "final", recall: 0.86, precision: 0.85, statusAccuracy: 0.9, validity: 0.95, minimality: 0.88, hallucination: 0.004, hardPenalty: 0.04, callsPerContract: 41, toolCallsPerContract: 112, retriesPerContract: 3, inputPerKWord: 12_100, outputPerKWord: 1880, cachedShare: 0.82, costPerContract: 1.47, latencyMsPerContract: 219_000, escalationsPerContract: 1 },
];

/** Round-2 rates layered on the round-1 profiles; judge v2 is stricter, so validity drops. */
const roundTwoRates: Partial<Record<ConfigId, Pick<Profile, "crr" | "appliedYield" | "adherence" | "validity" | "minimality">>> = {
  "b1-prompt": { crr: 0.06, appliedYield: 0.61, adherence: 0.14, validity: 0.31, minimality: 0.19 },
  "i3-verifier": { crr: 0.23, appliedYield: 0.73, adherence: 0.33, validity: 0.74, minimality: 0.42 },
  final: { crr: 0.3, appliedYield: 0.78, adherence: 0.45, validity: 0.79, minimality: 0.48 },
  "final-v2": { crr: 0.64, appliedYield: 0.87, adherence: 0.63, validity: 0.92, minimality: 0.81 },
};

function profileOf(id: ConfigId): Profile {
  const found = profiles.find((profile) => profile.id === id);
  if (!found) throw new Error(`Unknown fixture profile: ${id}`);
  return found;
}

const finalV2: Profile = {
  ...profileOf("final"),
  id: "final-v2",
  recall: 0.89,
  precision: 0.87,
  statusAccuracy: 0.92,
  hardPenalty: 0.03,
  callsPerContract: 58,
  toolCallsPerContract: 164,
  inputPerKWord: 15_400,
  outputPerKWord: 2260,
  costPerContract: 2.08,
  latencyMsPerContract: 268_000,
};

function withRoundTwo(profile: Profile): Profile {
  return { ...profile, ...(roundTwoRates[profile.id] ?? {}) };
}

/** Long documents cost more and are found less often; the fixture says so plainly. */
function longVariant(profile: Profile): Profile {
  const drop = (value: number, by: number): number => Math.max(0, value - by);
  const scale = (value: number | undefined, by: number): number | undefined =>
    value === undefined ? undefined : value * by;
  return {
    ...profile,
    recall: drop(profile.recall, 0.19),
    precision: drop(profile.precision, 0.07),
    statusAccuracy: drop(profile.statusAccuracy, 0.09),
    validity: drop(profile.validity, 0.11),
    minimality: drop(profile.minimality, 0.07),
    hallucination: profile.hallucination * 1.7,
    crr: scale(profile.crr, 0.52),
    appliedYield: scale(profile.appliedYield, 0.7),
    adherence: scale(profile.adherence, 0.78),
    callsPerContract: Math.round(profile.callsPerContract * 2.4),
    toolCallsPerContract: Math.round(profile.toolCallsPerContract * 2.6),
    costPerContract: profile.costPerContract * 3.2,
    latencyMsPerContract: Math.round(profile.latencyMsPerContract * 2.7),
  };
}

const tieredProfiles: Profile[] = [
  withRoundTwo(profileOf("b1-prompt")),
  withRoundTwo(profileOf("i3-verifier")),
  withRoundTwo(profileOf("final")),
  withRoundTwo(finalV2),
];

/**
 * Illustrative element misses. `pnpm report` does not write `tiers[].elementMisses` yet, so this is
 * the only place the per-element panel has data; the elements themselves are the real checklists
 * from `data/playbooks/customer-vendor-services.yaml`.
 */
const fixtureElementMisses: ElementMiss[] = [
  { ruleId: "LOL-CAP", ruleTitle: "Limitation of liability", element: "Breach of data protection and security obligations is uncapped.", level: "preferred", eligible: 12, unmet: 7, configId: "final-v2" },
  { ruleId: "LOL-CAP", ruleTitle: "Limitation of liability", element: "Customer payment obligations are excluded from damages subject to the cap.", level: "preferred", eligible: 12, unmet: 6, configId: "final-v2" },
  { ruleId: "INDEMN", ruleTitle: "Indemnification by Vendor", element: "Vendor controls the defence but may not settle without Customer's consent.", level: "preferred", eligible: 11, unmet: 5, configId: "final-v2" },
  { ruleId: "TRANSITION", ruleTitle: "Transition assistance", element: "Transition assistance continues for at least 90 days after termination.", level: "preferred", eligible: 9, unmet: 4, configId: "final-v2" },
  { ruleId: "AUDIT", ruleTitle: "Audit rights against Customer", element: "Audits are limited to once in any 12-month period on 30 days' notice.", level: "fallback", eligible: 8, unmet: 3, configId: "final-v2" },
  { ruleId: "RENEWAL", ruleTitle: "Auto-renewal window", element: "The non-renewal notice window is no longer than 30 days.", level: "preferred", eligible: 10, unmet: 3, configId: "final-v2" },
];

/** Half the population, so pooling the two tiers in the "All" view stays arithmetically sane. */
const longElementMisses: ElementMiss[] = fixtureElementMisses.map((miss) => ({
  ...miss,
  eligible: miss.eligible === undefined ? undefined : Math.round(miss.eligible / 2),
  unmet: Math.max(1, Math.round(miss.unmet / 2)),
}));

export const fixtureEvals: EvalsData = {
  generatedFrom: "src/ui/fixtures/evals.ts",
  configs: profiles.map((profile) => configResult(profile, shortContracts, shortJitter)),
  tiers: [
    {
      id: "short",
      configs: tieredProfiles.map((profile) => configResult(profile, shortContracts, shortJitter)),
      elementMisses: fixtureElementMisses,
    },
    {
      id: "long",
      configs: tieredProfiles.map((profile) => configResult(longVariant(profile), longContracts, longJitter)),
      elementMisses: longElementMisses,
    },
  ],
};

/** Word counts for the fixture path, where `GET /api/samples` has nothing to say. */
export const fixtureWords: Record<string, number> = Object.fromEntries(
  [...shortContracts, ...longContracts].map((contract) => [contract.id, contract.words]),
);
