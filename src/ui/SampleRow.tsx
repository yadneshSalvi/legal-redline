"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SampleCard } from "./SampleCard";
import { sampleContracts, type SampleContract } from "./fixtures/samples";
import { getSamples, startRun } from "./lib/api";
import { pickSamples } from "./lib/contractTitle";
import { useStartStore } from "./state/startStore";

export function SampleRow() {
  const router = useRouter();
  const { playbookId, config } = useStartStore();
  const [samples, setSamples] = useState<SampleContract[]>(sampleContracts);
  const [busy, setBusy] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const remote = await getSamples();
      if (cancelled || !remote || remote.length === 0) return;
      setSamples(remote);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const open = async (sample: SampleContract) => {
    setBusy(sample.id);
    setNotice(null);
    const runId = await startRun({ sampleId: sample.id, playbookId, config });
    setBusy(null);
    if (runId) {
      router.push(`/review/${runId}`);
      return;
    }
    setNotice("The review service is not running here — opening the prepared example instead.");
    router.push("/review/sample");
  };

  return (
    <div>
      <div className="mb-3.5 flex flex-wrap items-baseline justify-between gap-3">
        <h2 className="label-caps">Or try a sample from the evaluation set</h2>
        <p className="text-[12px] text-ink-muted">
          Eight real CUAD filings and four seeded synthetics ship with the repository.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        {pickSamples(samples).map((sample) => (
          <SampleCard
            key={sample.id}
            sample={sample}
            busy={busy === sample.id}
            disabled={busy !== null}
            onSelect={(chosen) => void open(chosen)}
          />
        ))}
      </div>
      {notice ? (
        <p role="status" className="mt-3 text-[12.5px] text-ink-muted">
          {notice}
        </p>
      ) : null}
    </div>
  );
}
