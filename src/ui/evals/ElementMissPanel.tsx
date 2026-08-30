import { Tag } from "../Chip";
import { cn } from "../cn";
import { percent, type ElementMiss } from "../lib/evals";

function rate(miss: ElementMiss): string {
  return miss.eligible === undefined || miss.eligible === 0 ? "—" : percent(miss.unmet / miss.eligible, 0);
}

/**
 * Where the shipped pipeline still falls short of a complete redline: the playbook position elements
 * judge v2 marked unmet most often. Rendered only when the report supplies `tiers[].elementMisses`;
 * there is no fallback, because a guess here would read as data.
 */
export function ElementMissPanel({ rows, configId }: { rows: ElementMiss[]; configId: string }) {
  return (
    <div className="overflow-hidden rounded-card border border-hairline bg-sheet">
      <table className="w-full border-collapse text-left">
        <caption className="sr-only">
          {`Playbook position elements most often unmet by ${configId}, judged per element by judge v2.`}
        </caption>
        <thead>
          <tr className="border-b border-hairline bg-paper">
            <th className="label-caps px-3 py-2" scope="col">
              Element of the playbook position
            </th>
            <th className="label-caps px-2 py-2 whitespace-nowrap" scope="col">
              Rule
            </th>
            <th className="label-caps px-2 py-2 text-right whitespace-nowrap" scope="col">
              Unmet
            </th>
            <th className="label-caps px-2 py-2 text-right whitespace-nowrap" scope="col">
              Of judged
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((miss) => (
            <tr key={`${miss.ruleId}-${miss.level ?? "-"}-${miss.element}`} className="border-b border-hairline last:border-b-0">
              <th scope="row" className="max-w-[60ch] px-3 py-2 text-left font-normal">
                <span className="flex flex-wrap items-baseline gap-2">
                  <span className="text-[12.5px] leading-[1.5] text-ink">{miss.element}</span>
                  {miss.level ? <Tag tone={miss.level === "preferred" ? "navy" : "neutral"}>{miss.level}</Tag> : null}
                </span>
              </th>
              <td className="px-2 py-2 align-middle">
                <span className="mono block text-[11.5px] text-ink">{miss.ruleId}</span>
                {miss.ruleTitle ? (
                  <span className="mt-0.5 block max-w-[26ch] truncate text-[11.5px] text-ink-muted" title={miss.ruleTitle}>
                    {miss.ruleTitle}
                  </span>
                ) : null}
              </td>
              <td className={cn("mono px-2 py-2 text-right text-[12.5px] text-ink")}>{miss.unmet}</td>
              <td className="mono px-2 py-2 text-right text-[11.5px] text-ink-faint">
                {miss.eligible === undefined ? "—" : `${miss.eligible} · ${rate(miss)}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
