"use client";

import { Tag } from "../Chip";
import { Tooltip } from "../Tooltip";
import { cn } from "../cn";
import { bestByColumn, metricColumns, type ConfigRole, type LadderRow, type MetricColumn } from "../lib/evals";

const roleTag: Record<ConfigRole, { label: string; tone: "neutral" | "navy" | "comment" | "verified" } | null> = {
  chat: { label: "naive", tone: "neutral" },
  baseline: { label: "official baseline", tone: "comment" },
  iteration: null,
  removed: { label: "removed", tone: "neutral" },
  final: { label: "shipped", tone: "navy" },
};

/** Only two rows are load-bearing in the changelog: the official baseline and the shipped pipeline. */
function rowClass(row: LadderRow): string {
  if (row.role === "final") return "bg-navy-soft/55";
  if (row.role === "baseline") return "bg-paper";
  return "";
}

function accentClass(row: LadderRow): string {
  if (row.role === "final") return "bg-navy";
  if (row.role === "baseline") return "bg-hairline-strong";
  if (row.role === "removed") return "bg-deletion/50";
  return "bg-transparent";
}

function Cell({
  row,
  column,
  best,
}: {
  row: LadderRow;
  column: MetricColumn;
  best: number | null;
}) {
  if (!row.present) {
    return (
      <td className="mono px-2 py-2.5 text-right text-[11.5px] text-ink-faint" aria-label="not run">
        —
      </td>
    );
  }
  const value = row[column.key];
  const isBest = best !== null && Math.abs(value - best) < 1e-9;
  return (
    <td
      className={cn(
        "mono px-2 py-2.5 text-right whitespace-nowrap",
        column.primary ? "border-l border-hairline text-[12.5px] text-ink" : "text-[11.5px] text-ink",
        isBest && "bg-verified-soft",
      )}
      title={isBest ? `Best ${column.label.toLowerCase()} of every config` : undefined}
    >
      {column.format(value)}
      {isBest ? <span className="sr-only"> — best</span> : null}
    </td>
  );
}

/**
 * The config ladder: one row per named configuration in `src/agent/configs.ts`, in the order
 * IMPROVEMENT_CHANGELOG.md tells the story, primary metric first. The best value in each column
 * carries the `verified.soft` wash.
 */
export function ConfigLadder({ rows }: { rows: LadderRow[] }) {
  const best = bestByColumn(rows);
  const quality = metricColumns.filter((column) => column.group === "quality");
  const resources = metricColumns.filter((column) => column.group === "resources");

  return (
    <div className="overflow-hidden rounded-card border border-hairline bg-sheet">
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">
          Every pipeline configuration measured on the same twelve contracts, primary metric first.
        </caption>
        <thead>
          <tr className="border-b border-hairline bg-paper">
            <th className="label-caps px-3 py-2 align-bottom" rowSpan={2} scope="col">
              Config
            </th>
            <th className="label-caps border-l border-hairline px-2 py-2 text-center" colSpan={quality.length} scope="colgroup">
              Quality
            </th>
            <th className="label-caps border-l border-hairline px-2 py-2 text-center" colSpan={resources.length} scope="colgroup">
              Per contract
            </th>
          </tr>
          <tr className="border-b border-hairline bg-paper">
            {metricColumns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={cn(
                  "label-caps w-[74px] px-2 pb-2 align-bottom text-right leading-[1.25]",
                  (column.primary || column.key === "calls") && "border-l border-hairline",
                  column.primary && "text-ink",
                )}
              >
                <Tooltip label={column.hint} side="top">
                  <span tabIndex={0} className="cursor-help rounded-[3px] underline decoration-hairline-strong decoration-dotted underline-offset-[3px]">
                    {column.label}
                  </span>
                </Tooltip>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const tag = roleTag[row.role];
            return (
              <tr key={row.id} className={cn("border-b border-hairline last:border-b-0", rowClass(row))}>
                <th scope="row" className="relative px-3 py-2.5 text-left font-normal">
                  <span aria-hidden className={cn("absolute inset-y-0 left-0 w-[2px]", accentClass(row))} />
                  <span className="flex items-center gap-2">
                    <span
                      className={cn(
                        "mono text-[12px]",
                        row.role === "final" ? "font-medium text-navy" : "text-ink",
                        row.role === "removed" && "text-ink-muted",
                      )}
                    >
                      {row.id}
                    </span>
                    {tag ? <Tag tone={tag.tone}>{tag.label}</Tag> : null}
                  </span>
                  <span className="mt-0.5 block max-w-[220px] truncate text-[12px] text-ink-muted" title={row.description}>
                    {row.label}
                  </span>
                </th>
                {metricColumns.map((column) => (
                  <Cell key={column.key} row={row} column={column} best={best[column.key]} />
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
