"use client";

import { useRouter } from "next/navigation";
import { Collapsible } from "radix-ui";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import type { ConfigId } from "@/src/agent/types";
import { Button } from "./Button";
import { Dropzone } from "./Dropzone";
import { defaultPlaybook, type PlaybookSummary } from "./fixtures/samples";
import { getPlaybooks, startRun } from "./lib/api";
import { configCatalog } from "./lib/configs";
import { useStartStore } from "./state/startStore";

const selectClass =
  "h-10 w-full appearance-none rounded-field border border-hairline-strong bg-sheet pr-8 pl-2.5 text-[14px] text-ink transition-colors duration-150 hover:border-navy";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="label-caps mb-1.5 block">{label}</span>
      <span className="relative block">
        {children}
        <ChevronDown
          size={14}
          strokeWidth={1.75}
          aria-hidden
          className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2 text-ink-faint"
        />
      </span>
    </label>
  );
}

export function StartReview() {
  const router = useRouter();
  const { playbookId, config, setPlaybookId, setConfig } = useStartStore();
  const [playbooks, setPlaybooks] = useState<PlaybookSummary[]>([defaultPlaybook]);
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const remote = await getPlaybooks();
      if (cancelled || !remote || remote.length === 0) return;
      setPlaybooks(remote);
      setPlaybookId(remote[0].id);
    })();
    return () => {
      cancelled = true;
    };
  }, [setPlaybookId]);

  const start = async () => {
    if (!file) return;
    setBusy(true);
    setNotice(null);
    const runId = await startRun({ file, playbookId, config });
    setBusy(false);
    if (runId) {
      router.push(`/review/${runId}`);
      return;
    }
    setNotice("The review service is not running here — opening the prepared example instead.");
    router.push("/review/sample");
  };

  const activeConfig = configCatalog.find((c) => c.id === config);
  const activePlaybook = playbooks.find((p) => p.id === playbookId) ?? playbooks[0];

  return (
    <section
      aria-label="Start a review"
      className="rounded-card border border-hairline-strong bg-sheet p-5 shadow-sheet"
    >
      <Dropzone file={file} onFile={setFile} disabled={busy} />

      <div className="mt-4 grid grid-cols-[1fr_auto] items-end gap-3">
        <Field label="Playbook">
          <select
            value={playbookId}
            onChange={(event) => setPlaybookId(event.target.value)}
            className={selectClass}
          >
            {playbooks.map((playbook) => (
              <option key={playbook.id} value={playbook.id}>
                {playbook.name.replace("Customer-side ", "")} v{playbook.version}
              </option>
            ))}
          </select>
        </Field>
        <Button variant="primary" size="lg" disabled={!file || busy} onClick={() => void start()}>
          {busy ? "Starting review…" : "Start review"}
        </Button>
      </div>

      {activePlaybook ? (
        <p className="mt-1.5 text-[12px] text-ink-muted">
          {activePlaybook.rules.length} rules · preferred, fallback and walk-away positions
        </p>
      ) : null}

      <Collapsible.Root className="mt-4 border-t border-hairline pt-3">
        <Collapsible.Trigger className="group inline-flex items-center gap-1 rounded-field text-[12.5px] text-ink-muted transition-colors duration-150 hover:text-ink">
          <ChevronRight
            size={13}
            strokeWidth={1.75}
            aria-hidden
            className="transition-transform duration-150 group-data-[state=open]:rotate-90"
          />
          Advanced
        </Collapsible.Trigger>
        <Collapsible.Content className="rl-fade pt-3">
          <Field label="Pipeline configuration">
            <select
              value={config}
              onChange={(event) => setConfig(event.target.value as ConfigId)}
              className={selectClass}
            >
              {configCatalog.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </Field>
          {activeConfig ? (
            <p className="mt-2 text-[12.5px] leading-[1.55] text-ink-muted">{activeConfig.description}</p>
          ) : null}
        </Collapsible.Content>
      </Collapsible.Root>

      {notice ? (
        <p role="status" className="mt-4 rounded-field border border-hairline bg-paper px-3 py-2 text-[12.5px] text-ink-muted">
          {notice}
        </p>
      ) : null}
    </section>
  );
}
