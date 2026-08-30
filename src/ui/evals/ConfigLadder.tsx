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

const groupHeadings: { group: MetricColumn["group"]; label: string }[] = [
  { group: "quality", label: "Quality" },
  { group: "redline", label: "Round 2 · end-to-end redline" },
  { group: "resources", label: "Per contract" },
];

/** The first column of each group carries the vertical rule that separates the groups. */
const groupStarts = new Set(
  groupHeadings.map(({ group }) => metricColumns.find((column) => column.group === group)?.key),
);

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

function Cell({ row, column, best }: { row: LadderRow; column: MetricColumn; best: number | null }) {
  const value = row.present ? row[column.key] : null;
  const border = groupStarts.has(column.key) ? "border-l border-hairline" : "";
  if (value === null) {
    return (
      <td
        className={cn("mono px-1.5 py-2.5 text-right text-[11.5px] text-ink-faint", border)}
        title={row.present ? `${column.label} was not scored for ${row.id}` : `${row.id} was not run on this tier`}
      >
        —<span className="sr-only">{row.present ? " not scored" : " not run"}</span>
      </td>
    );
  }
  const isBest = best !== null && Math.abs(value - best) < 1e-9;
  const judgeV2 = column.judged === true && row.judge === "v2";
  return (
    <td
      className={cn(
        "mono px-1.5 py-2.5 text-right whitespace-nowrap",
        column.primary ? "text-[12.5px] text-ink" : "text-[11.5px] text-ink",
        border,
        isBest && "bg-verified-soft",
      )}
      title={isBest ? `Best ${column.label.toLowerCase()} of every config in this view` : undefined}
    >
      {column.format(value)}
      {judgeV2 ? (
        <sup className="ml-[1px] text-[9px] text-ink-faint" aria-hidden>
          2
        </sup>
      ) : null}
      {judgeV2 ? <span className="sr-only"> scored by judge v2</span> : null}
      {isBest ? <span className="sr-only"> — best</span> : null}
    </td>
  );
}

/**
 * The config ladder: one row per named configuration in `src/agent/configs.ts` order, primary metric
 * first, with the round-2 redline block in the middle. The best value in each column carries the
 * `verified.soft` wash; a metric a configuration was not scored for reads "—" rather than zero.
 */
export function ConfigLadder({ rows, caption }: { rows: LadderRow[]; caption: string }) {
  const best = bestByColumn(rows);
  const spans = groupHeadings.map((heading) => ({
    ...heading,
    span: metricColumns.filter((column) => column.group === heading.group).length,
  }));

  return (
    <div className="overflow-x-auto rounded-card border border-hairline bg-sheet">
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-hairline bg-paper">
            <th className="label-caps px-3 py-2 align-bottom" rowSpan={2} scope="col">
              Config
            </th>
            {spans.map((heading) => (
              <th
                key={heading.group}
                scope="colgroup"
                colSpan={heading.span}
                className={cn(
                  "label-caps border-l border-hairline px-1.5 py-2 text-center whitespace-nowrap",
                  heading.group === "redline" && "text-ink",
                )}
              >
                {heading.label}
              </th>
            ))}
          </tr>
          <tr className="border-b border-hairline bg-paper">
            {metricColumns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={cn(
                  "label-caps w-[68px] px-1.5 pb-2 align-bottom text-right leading-[1.25]",
                  groupStarts.has(column.key) && "border-l border-hairline",
                  column.primary && "text-ink",
                )}
              >
                <Tooltip label={column.hint} side="top">
                  <span
                    tabIndex={0}
                    className="cursor-help rounded-[3px] underline decoration-hairline-strong decoration-dotted underline-offset-[3px]"
                  >
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
                  <span className="mt-0.5 block max-w-[200px] truncate text-[12px] text-ink-muted" title={row.description}>
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
