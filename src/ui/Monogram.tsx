import { colors } from "@/src/tokens";

/**
 * The monogram: a page with a struck-through line and an inserted one — a redline, drawn small.
 * Deliberately geometric so it stays crisp at 20 px.
 */
export function Monogram({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" aria-hidden focusable="false">
      <rect
        x="3.75"
        y="2.25"
        width="14.5"
        height="17.5"
        rx="2.5"
        fill="none"
        stroke={colors.navy}
        strokeWidth="1.25"
      />
      <line x1="6.9" y1="7" x2="15.1" y2="7" stroke={colors.navy} strokeWidth="1.25" strokeLinecap="round" />
      <line x1="6.9" y1="11" x2="15.1" y2="11" stroke={colors.deletion} strokeWidth="1.25" strokeLinecap="round" />
      <line x1="6.9" y1="15" x2="12.4" y2="15" stroke={colors.insertion} strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}
