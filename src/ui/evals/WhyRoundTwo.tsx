import { ExternalLink } from "lucide-react";
import { repoFileUrl } from "../lib/repo";

const PREREGISTRATION = "plans/campaign/preregistration.md";

const COPY = [
  "Round 1 measured issue detection on twelve 3–8k-word contracts, and a frontier model with the playbook in one prompt already found 91.5 % of the issues; the pipeline's +3.3 pp sits inside run-to-run variance.",
  "What the product is for — a redline a lawyer would sign, on the long documents in-house counsel actually receive — was not being measured.",
  "Round 2 pre-registered a complete-redline metric (every element of the playbook position met, applied to the document, minimal), a long-document tier chosen by a written rule with gold anchored on CUAD's expert spans, and a dev/holdout split, before the final configuration was run on them. The baseline stayed the same one prompt with the whole contract.",
];

/**
 * The honest framing under the ladder: why round 1 was not enough, and what was fixed before the
 * numbers were taken. Round 1 is never hidden — the short tier above still carries every round-1
 * figure, unchanged.
 */
export function WhyRoundTwo() {
  const url = repoFileUrl(PREREGISTRATION);
  return (
    <div className="overflow-hidden rounded-card border border-hairline bg-sheet">
      <div className="grid gap-x-8 gap-y-3 px-5 py-4 lg:grid-cols-[160px_minmax(0,1fr)]">
        <h3 className="label-caps pt-[3px]">Why round 2</h3>
        <div className="max-w-[92ch] space-y-2.5 font-serif text-[14.5px] leading-[1.7] text-ink">
          {COPY.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 border-t border-hairline bg-paper px-5 py-2.5">
        <span className="text-[12px] text-ink-muted">
          Round 1 is still on this page: the <span className="text-ink">Short</span> tier shows every round-1 figure,
          unchanged, and the three round-2 columns beside them.
        </span>
        {url ? (
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="mono inline-flex items-center gap-1 text-[11.5px] text-insertion underline decoration-hairline-strong underline-offset-[3px] hover:decoration-insertion"
          >
            {PREREGISTRATION}
            <ExternalLink size={11} strokeWidth={1.75} aria-hidden />
          </a>
        ) : (
          <span className="mono text-[11.5px] text-ink-muted">{PREREGISTRATION}</span>
        )}
      </div>
    </div>
  );
}
