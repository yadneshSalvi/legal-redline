"use client";

import { Tag } from "../Chip";
import { cn } from "../cn";
import { percent, type ContractRow, type LadderRow } from "../lib/evals";

/** A quiet `navy.soft` wash, strongest at F1 = 1, invisible below 0.3 — the table stays readable. */
function shade(value: number): number {
  return Math.min(1, Math.max(0, (value - 0.3) / 0.7));
}

/**
 * Contracts × configs, issue-detection F1 per cell. The hard case is pinned to the top because it
 * is the contract the pipeline was designed against (EVAL.md §1).
 */
export function ContractMatrix({ rows, configs }: { rows: ContractRow[]; configs: LadderRow[] }) {
  const present = configs.filter((config) => config.present);
  return (
    <div className="overflow-hidden rounded-card border border-hairline bg-sheet">
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">Issue-detection F1 per contract for every configuration.</caption>
        <thead>
          <tr className="border-b border-hairline bg-paper">
            <th className="label-caps px-3 py-2 align-bottom" scope="col">
              Contract
            </th>
            <th className="label-caps px-2 py-2 text-right align-bottom leading-[1.25]" scope="col">
              Gold
              <br />
              items
            </th>
            {present.map((config) => (
              <th
                key={config.id}
                scope="col"
                className={cn(
                  "label-caps px-2 py-2 text-right align-bottom whitespace-nowrap",
                  config.role === "final" && "border-l border-hairline text-ink",
                )}
              >
                <span className="mono text-[11px] tracking-normal normal-case">{config.id}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.id}
              className={cn("border-b border-hairline last:border-b-0", row.hard && "border-b-hairline-strong")}
            >
              <th scope="row" className="px-3 py-2 text-left align-middle font-normal">
                <span className="flex items-center gap-2">
                  <span className="mono text-[11.5px] text-ink">{row.id}</span>
                  {row.hard ? <Tag tone="comment">hard case</Tag> : null}
                </span>
                {row.hard ? (
                  <span className="mt-0.5 block max-w-[52ch] text-[11.5px] leading-[1.45] text-ink-muted">
                    Illusory cap hidden in a definition, a vendor-side non-compete and a customer-favouring MFN as
                    decoys, and a convenience right split across two sections.
                  </span>
                ) : null}
              </th>
              <td className="mono px-2 py-2 text-right text-[11px] text-ink-faint">{row.goldItems}</td>
              {present.map((config) => {
                const value = row.f1[config.id];
                return (
                  <td
                    key={config.id}
                    className={cn(
                      "relative px-2 py-2 text-right align-middle",
                      config.role === "final" && "border-l border-hairline",
                    )}
                  >
                    {value === null ? (
                      <span className="mono text-[11.5px] text-ink-faint">—</span>
                    ) : (
                      <>
                        <span
                          aria-hidden
                          className="absolute inset-y-[3px] inset-x-[3px] rounded-[3px] bg-navy-soft"
                          style={{ opacity: shade(value) }}
                        />
                        <span className="mono relative text-[11.5px] text-ink">{percent(value, 0)}</span>
                      </>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
