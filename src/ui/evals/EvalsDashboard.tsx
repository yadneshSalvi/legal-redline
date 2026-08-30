"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Tag } from "../Chip";
import { Skeleton } from "../Skeleton";
import { fixtureEvals, fixtureWords } from "../fixtures/evals";
import { getEvals, getSamples } from "../lib/api";
import {
  compact,
  money,
  normalizeEvals,
  percent,
  seconds,
  type EvalsData,
  type LadderRow,
} from "../lib/evals";
import { legacyHeadlines, tierHeadlines } from "../lib/evals-headlines";
import {
  contractGroups,
  contractIdsInView,
  elementMissRows,
  shippedConfig,
  tierLabels,
  tierLadderRows,
  tierViews,
  type TierView,
} from "../lib/evals-round2";
import { useTierView } from "../lib/useTierView";
import { BarChart, type Bar } from "./BarChart";
import { ConfigLadder } from "./ConfigLadder";
import { ContractMatrix } from "./ContractMatrix";
import { ElementMissPanel } from "./ElementMissPanel";
import { HeadlineStrip } from "./HeadlineStrip";
import { LadderNotes } from "./LadderNotes";
import { ReproduceBlock } from "./ReproduceBlock";
import { TierSwitch } from "./TierSwitch";
import { WhyRoundTwo } from "./WhyRoundTwo";

function Section({
  title,
  caption,
  aside,
  children,
}: {
  title: string;
  caption: string;
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="mt-8">
      <div className="mb-3 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
        <div>
          <h2 className="font-serif text-[16px] leading-tight font-semibold text-ink">{title}</h2>
          <p className="mt-1 max-w-[92ch] text-[12.5px] leading-[1.6] text-ink-muted">{caption}</p>
        </div>
        {aside}
      </div>
      {children}
    </section>
  );
}

function tone(row: LadderRow): Bar["tone"] {
  if (row.role === "final") return "final";
  if (row.role === "removed") return "removed";
  return "quiet";
}

function Panel({ title, hint, children }: { title: string; hint: string; children: ReactNode }) {
  return (
    <div className="min-w-0 rounded-card border border-hairline bg-sheet px-4 pt-3.5 pb-3">
      <h3 className="label-caps">{title}</h3>
      <p className="mt-1 mb-3 text-[11.5px] leading-[1.5] text-ink-faint">{hint}</p>
      {children}
    </div>
  );
}

const emptyCounts: Record<TierView, number> = { short: 0, long: 0, all: 0 };

/**
 * `/evals` — the Measured Improvement evidence. Reads `GET /api/evals`
 * (`evals/results/changelog-data.json`, written by `pnpm report`) and falls back to a committed
 * fixture of the same shape, labelled as such, so the page is never blank. Word counts come from
 * `GET /api/samples`, the only thing on this page the report does not carry.
 */
export function EvalsDashboard() {
  const [state, setState] = useState<{ data: EvalsData; fixture: boolean } | null>(null);
  const [words, setWords] = useState<Record<string, number>>({});

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const [payload, samples] = await Promise.all([getEvals(), getSamples()]);
      if (cancelled) return;
      const data = normalizeEvals(payload);
      setState(data ? { data, fixture: false } : { data: fixtureEvals, fixture: true });
      setWords(
        data && samples
          ? Object.fromEntries(samples.map((sample) => [sample.id, sample.words]))
          : fixtureWords,
      );
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const data = state?.data ?? null;
  const counts = useMemo(() => {
    if (!data) return emptyCounts;
    const entries = tierViews.map((view) => [view, contractIdsInView(data, view).length] as const);
    return Object.fromEntries(entries) as Record<TierView, number>;
  }, [data]);
  const [view, setView] = useTierView();

  if (state === null || data === null) {
    return (
      <div className="space-y-3">
        <div className="grid gap-3 lg:grid-cols-4">
          {[0, 1, 2, 3].map((index) => (
            <Skeleton key={index} className="h-[92px] w-full" />
          ))}
        </div>
        <Skeleton className="h-[320px] w-full" />
      </div>
    );
  }

  const active: TierView = counts[view] > 0 ? view : "short";
  const rows = tierLadderRows(data, active);
  const present = rows.filter((row) => row.present);
  const contractCount = counts[active];
  const shipped = shippedConfig(data);
  const finalRow = present.find((row) => row.id === shipped);
  const maxCost = Math.max(...present.map((row) => row.cost), 0.01);
  const groups = contractGroups(data, active, words);
  const misses = elementMissRows(data, active);
  const strip = tierHeadlines(data);
  const headlines = strip.length > 0 ? strip : legacyHeadlines(rows, `short · ${contractCount} contracts`);

  const f1Bars: Bar[] = present.map((row) => ({
    id: row.id,
    label: row.id,
    value: row.f1,
    display: percent(row.f1, 1),
    tone: tone(row),
  }));
  const costBars: Bar[] = present.map((row) => ({
    id: row.id,
    label: row.id,
    sub: `${compact(row.tokens)} tokens`,
    value: row.cost,
    display: money(row.cost),
    tone: tone(row),
  }));

  return (
    <>
      {state.fixture ? (
        <div className="mb-6 flex flex-wrap items-baseline gap-x-3 gap-y-1.5 rounded-card border border-comment/45 bg-sheet px-4 py-3">
          <Tag tone="comment">fixture</Tag>
          <p className="max-w-[92ch] text-[12.5px] leading-[1.6] text-ink">
            No <code className="mono text-[11.5px]">evals/results/changelog-data.json</code> in this environment, so the
            page is rendering illustrative numbers of exactly the shape{" "}
            <code className="mono text-[11.5px]">pnpm report</code> writes. Run{" "}
            <code className="mono rounded-[4px] border border-hairline bg-sheet px-1 py-[1px] text-[11.5px]">
              pnpm eval --tier all &amp;&amp; pnpm report
            </code>{" "}
            and reload to replace every figure below with the measured ones.
          </p>
        </div>
      ) : null}

      <HeadlineStrip headlines={headlines} />

      <Section
        title="The config ladder"
        caption={`Each row is a real run of one named configuration from src/agent/configs.ts over the same ${contractCount} contracts with the same playbook, scored against the same gold. Complete redline rate is round 2's primary metric; issue-detection F1 stays in view beside it.`}
        aside={
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <p className="mono text-[11px] text-ink-faint">
              {present.length} of {rows.length} configs on this tier
            </p>
            <TierSwitch value={active} counts={counts} onChange={setView} />
          </div>
        }
      >
        <ConfigLadder
          rows={rows}
          caption={`Every pipeline configuration measured on the ${tierLabels[active].toLowerCase()} tier (${contractCount} contracts), primary metric first.`}
        />
        <LadderNotes view={active} judgeV2={present.some((row) => row.judge === "v2")} />
        <div className="mt-4">
          <WhyRoundTwo />
        </div>
      </Section>

      {misses.length > 0 ? (
        <Section
          title="Where the redline still falls short"
          caption={`The playbook position elements judge v2 marked unmet most often for ${shipped}. Each one is a specific sentence the drafter has to put in the contract, not a score.`}
        >
          <ElementMissPanel rows={misses} configId={shipped} />
        </Section>
      ) : null}

      <Section
        title="What each step bought"
        caption="Issue-detection F1 per configuration, and what it cost to get there. Navy is the shipped pipeline; the red bar is the experiment we removed."
      >
        <div className="grid gap-3 lg:grid-cols-[7fr_5fr]">
          <Panel
            title="Issue-detection F1 (macro)"
            hint={`Macro-averaged over ${contractCount} contracts. The dashed line is the official baseline.`}
          >
            <BarChart
              bars={f1Bars}
              max={1}
              ticks={[
                { value: 0, label: "0" },
                { value: 0.25, label: "25%" },
                { value: 0.5, label: "50%" },
                { value: 0.75, label: "75%" },
                { value: 1, label: "100%" },
              ]}
              reference={(() => {
                const baseline = present.find((row) => row.role === "baseline");
                return baseline ? { value: baseline.f1, label: "baseline" } : undefined;
              })()}
              ariaLabel="Issue-detection F1 by configuration. The same values are in the config ladder table above."
            />
          </Panel>
          <Panel
            title="Cost and tokens per contract"
            hint="Recorded from the live run; replaying the cache costs nothing. Tokens exclude cache reads."
          >
            <BarChart
              bars={costBars}
              max={maxCost}
              ticks={[
                { value: 0, label: "$0" },
                { value: maxCost / 2, label: money(maxCost / 2) },
                { value: maxCost, label: money(maxCost) },
              ]}
              ariaLabel="Cost per contract by configuration. The same values are in the config ladder table above."
            />
          </Panel>
        </div>
      </Section>

      <Section
        title="Per contract"
        caption="Issue-detection F1 for every contract in the evaluation set, grouped by tier. The short tier is eight real SEC-filed agreements from CUAD and four seeded synthetics; the long tier is six CUAD contracts picked by the pre-registered rule."
        aside={
          <p className="mono text-[11px] text-ink-faint">
            {`${contractCount} contracts · ${present.length} configs${
              finalRow ? ` · ${shipped} ${seconds(finalRow.latency)} per contract` : ""
            }`}
          </p>
        }
      >
        <ContractMatrix groups={groups} configs={rows} />
      </Section>

      <Section
        title="How to reproduce"
        caption="From a clean clone, with no API keys and at no cost. The summary this page reads is regenerated by the same two commands."
      >
        <ReproduceBlock />
      </Section>
    </>
  );
}
