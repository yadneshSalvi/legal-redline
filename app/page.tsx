import { SampleRow } from "@/src/ui/SampleRow";
import { StartReview } from "@/src/ui/StartReview";

const steps = [
  { title: "Ingest", body: "The .docx becomes a clause-addressable model: paragraph ids, section tree, defined terms." },
  { title: "Planner", body: "One call maps every playbook rule onto the sections that could carry it." },
  { title: "Drafters", body: "One worker per rule reads only what it needs and proposes the smallest redline." },
  { title: "Verifier", body: "A separate agent judges each redline against the rule and sends failures back to be repaired." },
  { title: "You approve", body: "Accept, edit or reject every finding. Nothing reaches the document without you." },
  { title: "Tracked changes", body: "Real w:ins / w:del and margin comments written into a copy, plus an issues memo." },
];

const facts = [
  { term: "First pass", detail: "Minutes, not an afternoon" },
  { term: "Every change", detail: "Quoted, explained, verified" },
  { term: "Output", detail: "A .docx you can send back" },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <section className="hero-wash border-b border-hairline">
        <div className="mx-auto w-full max-w-[1240px] px-8 pt-14 pb-12">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,520px)] lg:gap-16">
            <div className="self-center">
              <p className="label-caps">For in-house counsel and contracts managers</p>
              <h1 className="mt-3 max-w-[24ch] font-serif text-[44px] leading-[1.06] font-semibold tracking-[-0.02em] text-ink">
                Your playbook, applied to their paper.
              </h1>
              <p className="mt-5 max-w-[58ch] text-[15px] leading-[1.65] text-ink-muted">
                Playbook Redliner reads the vendor’s Word document, checks every clause against your
                negotiating positions, and drafts the smallest redline that reaches the preferred position —
                then a second agent verifies it against the rule before you ever see it. You accept, edit or
                reject each finding, and it writes real tracked changes and margin comments into a copy of
                the document, with an issues memo, ready to send back.
              </p>
              <dl className="mt-8 flex max-w-[58ch] flex-wrap gap-x-10 gap-y-3 border-t border-hairline pt-5">
                {facts.map((item) => (
                  <div key={item.term}>
                    <dt className="label-caps">{item.term}</dt>
                    <dd className="mt-1 text-[13px] text-ink">{item.detail}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="self-center">
              <StartReview />
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Sample contracts" className="border-b border-hairline bg-paper">
        <div className="mx-auto w-full max-w-[1240px] px-8 py-8">
          <SampleRow />
        </div>
      </section>

      <section aria-label="How it works" className="border-b border-hairline bg-sheet">
        <div className="mx-auto w-full max-w-[1240px] px-8 py-9">
          <h2 className="label-caps">How it works</h2>
          <ol className="mt-4 grid gap-x-6 gap-y-6 sm:grid-cols-3 lg:grid-cols-6">
            {steps.map((step, index) => (
              <li key={step.title} className="border-t border-hairline pt-3">
                <p className="mono text-[11px] text-ink-faint">{String(index + 1).padStart(2, "0")}</p>
                <p className="mt-1 font-serif text-[14px] font-semibold text-ink">{step.title}</p>
                <p className="mt-1.5 text-[12.5px] leading-[1.55] text-ink-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <footer className="mt-auto bg-paper">
        <div className="mx-auto flex w-full max-w-[1240px] flex-wrap items-baseline justify-between gap-4 px-8 py-7">
          <p className="max-w-[70ch] text-[12px] leading-[1.6] text-ink-muted">
            Evaluation contracts from CUAD, The Atticus Project, CC BY 4.0. Synthetic agreements are generated
            from a template in this repository; no private documents are used.
          </p>
          <p className="mono text-[11px] text-ink-faint">Playbook Redliner · micro1 Agentic Workflows Hackathon</p>
        </div>
      </footer>
    </div>
  );
}
