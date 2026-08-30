/**
 * Playbook contract — zod schema for `data/playbooks/*.yaml`. A playbook is the company's negotiating
 * position: for each rule, what we prefer, what we accept as a fallback, and what we walk away from,
 * plus detection/redline guidance for the agent and optional deterministic checks used by the
 * verifier and the evaluator.
 */
import { z } from "zod";

export const SeveritySchema = z.enum(["critical", "high", "medium", "low"]);

/**
 * presence   – the mere presence of a clause binding us is a deviation (e.g. non-compete on Customer)
 * parametric – the clause is expected; its parameters must fall within the position (e.g. cap ≥ 12 months' fees)
 * missing    – the clause must exist; absence is a deviation and the redline is an insertion (e.g. transition assistance)
 * direction  – flag only when the obligation runs against our party (e.g. MFN that burdens Customer)
 */
export const RuleKindSchema = z.enum(["presence", "parametric", "missing", "direction"]);

export const CheckSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("regex_present"),
    /** Applied to the redlined clause text (after ops). */
    pattern: z.string(),
    flags: z.string().optional(),
    label: z.string(),
  }),
  z.object({
    type: z.literal("regex_absent"),
    pattern: z.string(),
    flags: z.string().optional(),
    label: z.string(),
  }),
  z.object({
    type: z.literal("number_min"),
    /** Regex with one capture group extracting the number (e.g. months). */
    pattern: z.string(),
    min: z.number(),
    label: z.string(),
  }),
  z.object({
    type: z.literal("number_max"),
    pattern: z.string(),
    max: z.number(),
    label: z.string(),
  }),
  z.object({
    type: z.literal("one_of"),
    /** Case-insensitive; passes if any phrase is present. */
    phrases: z.array(z.string()).min(1),
    label: z.string(),
  }),
]);

export const RuleSchema = z.object({
  id: z.string().regex(/^[A-Z0-9-]{2,16}$/),
  title: z.string(),
  category: z.enum([
    "liability",
    "indemnity",
    "restrictive-covenants",
    "term-termination",
    "commercial",
    "governing-law",
    "assignment",
    "ip-data",
    "licence",
    "audit",
    "warranty",
    "insurance",
    "transition",
  ]),
  severity: SeveritySchema,
  kind: RuleKindSchema,
  /** CUAD category names this rule maps to (exact strings from CUAD_v1); empty when none. */
  cuad: z.array(z.string()),
  summary: z.string(),
  position: z.object({
    preferred: z.string(),
    fallback: z.string(),
    walkaway: z.string(),
    elements: z.object({
      preferred: z.array(z.string().trim().min(1)).min(1),
      fallback: z.array(z.string().trim().min(1)).min(1),
    }).optional(),
  }),
  /** Guidance for locating and judging the clause (definitions to resolve, traps, direction). */
  detect: z.string(),
  /** Guidance for drafting the redline (minimal edits, standard language, what to say in the comment). */
  redline: z.string(),
  /** Model language the drafter may adapt (never pasted blindly). */
  modelLanguage: z.string().optional(),
  checks: z.array(CheckSchema).default([]),
  examples: z
    .object({
      compliant: z.array(z.string()).default([]),
      deviation: z.array(z.string()).default([]),
    })
    .optional(),
});

export const PlaybookSchema = z.object({
  id: z.string(),
  name: z.string(),
  version: z.string(),
  /** The party we represent. Drafters reason about direction relative to this party. */
  party: z.enum(["customer", "vendor"]),
  partyAliases: z.array(z.string()),
  counterpartyAliases: z.array(z.string()),
  description: z.string(),
  style: z.object({
    author: z.string(),
    commentPrefix: z.string(),
    tone: z.string(),
  }),
  rules: z.array(RuleSchema).min(1),
});

export type Severity = z.infer<typeof SeveritySchema>;
export type RuleKind = z.infer<typeof RuleKindSchema>;
export type Check = z.infer<typeof CheckSchema>;
export type Rule = z.infer<typeof RuleSchema>;
export type Playbook = z.infer<typeof PlaybookSchema>;
