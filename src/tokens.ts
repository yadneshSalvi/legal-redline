/**
 * Design tokens. The `@theme` block in `app/globals.css` is canonical for every value the UI
 * consumes through a class (colour, font, radius, shadow) and for the paper/workspace metrics
 * (`.paper-sheet`, `.workspace`, `.findings-pane`). This file exists only for the handful of values
 * that have to be inlined into markup — currently the SVG monogram — so there is exactly one place
 * each number lives. See STYLE.md §1.
 */

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
