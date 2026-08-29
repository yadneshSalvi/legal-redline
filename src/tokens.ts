/**
 * Design tokens — the only source of colour, type, radius, shadow and layout metrics in the product.
 * These values are mirrored into CSS custom properties by the `@theme` block in `app/globals.css`;
 * change both together. Anything not listed here does not exist (STYLE.md §1, §6).
 */
import type { Severity } from "@/src/agent/types";

export const colors = {
  paper: "#FBFAF7",
  sheet: "#FFFFFF",
  ink: "#1B1B1F",
  inkMuted: "#5C5B66",
  inkFaint: "#8A8994",
  hairline: "#E6E3DC",
  hairlineStrong: "#D5D1C7",
  navy: "#1E2A47",
  navySoft: "#E9EDF6",
  deletion: "#B3261E",
  deletionSoft: "#FBE9E7",
  insertion: "#1E5AA8",
  insertionSoft: "#E7F0FB",
  comment: "#B98A1F",
  commentSoft: "#FFF4D6",
  verified: "#2A7F6F",
  verifiedSoft: "#E4F3EF",
  medium: "#4A5B8C",
  low: "#6B6B75",
} as const;

export type ColorToken = keyof typeof colors;

/** Severity → the single saturated colour that represents it everywhere (STYLE.md §1). */
export const severityColor: Record<Severity, ColorToken> = {
  critical: "deletion",
  high: "comment",
  medium: "medium",
  low: "low",
};

export const fonts = {
  /** UI. */
  sans: "var(--font-inter)",
  /** The paper, headlines. */
  serif: "var(--font-source-serif)",
  /** Ids, money, tokens, JSON. */
  mono: "var(--font-geist-mono)",
} as const;

export const radius = { field: 6, card: 10, pill: 999 } as const;

export const shadow = {
  sheet: "0 1px 2px rgba(27,27,31,.06), 0 8px 24px -12px rgba(27,27,31,.18)",
} as const;

/** 4 px base scale (STYLE.md §1). */
export const space = {
  panel: 16,
  panelWide: 20,
  cardGap: 12,
  sectionGap: 24,
  pageGutter: 32,
} as const;

/** "The paper" metrics — the rendered document column. */
export const paper = {
  columnWidth: 760,
  gutter: 64,
  fontSize: 15.5,
  lineHeight: 1.65,
} as const;

/** Fixed chrome and pane widths for the review workspace (STYLE.md §3). */
export const layout = {
  topBar: 56,
  docBar: 48,
  outlineWidth: 240,
  findingsWidth: 420,
} as const;

/** Motion durations in ms (STYLE.md §5). */
export const motionMs = {
  chrome: 200,
  highlight: 160,
  enter: 200,
} as const;
