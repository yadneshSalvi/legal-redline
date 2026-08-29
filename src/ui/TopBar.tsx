"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { DropdownMenu } from "radix-ui";
import { ChevronDown } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { cn } from "./cn";
import { Monogram } from "./Monogram";
import { ShortcutsDialog } from "./ShortcutsDialog";
import { Tooltip } from "./Tooltip";
import { sampleContracts, defaultPlaybook } from "./fixtures/samples";
import { startRun } from "./lib/api";
import { defaultConfigId } from "./lib/configs";

const nav = [
  { href: "/", label: "Review" },
  { href: "/runs", label: "Runs" },
  { href: "/evals", label: "Evals" },
  { href: "/precedents", label: "Precedents" },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/" || pathname.startsWith("/review");
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function TopBar() {
  const pathname = usePathname();
  const router = useRouter();
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [starting, setStarting] = useState<string | null>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const typing =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.tagName === "SELECT" ||
        target?.isContentEditable === true;
      if (typing || event.metaKey || event.ctrlKey || event.altKey) return;
      if (event.key === "?") {
        event.preventDefault();
        setShortcutsOpen(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const openSample = useCallback(
    async (sampleId: string) => {
      setStarting(sampleId);
      const runId = await startRun({ sampleId, playbookId: defaultPlaybook.id, config: defaultConfigId });
      setStarting(null);
      router.push(runId ? `/review/${runId}` : "/review/sample");
    },
    [router],
  );

  return (
    <>
      <header className="sticky top-0 z-30 h-14 shrink-0 border-b border-hairline bg-sheet">
        <div className="flex h-full items-stretch gap-1 pr-4 pl-4">
          <Link
            href="/"
            className="flex items-center gap-2.5 rounded-field pr-3 focus-visible:outline-offset-0"
            aria-label="Playbook Redliner — home"
          >
            <Monogram />
            <span className="font-serif text-[15px] leading-none font-semibold tracking-[-0.01em] text-ink">
              Playbook Redliner
            </span>
          </Link>

          <div className="my-3.5 w-px bg-hairline" aria-hidden />

          <nav aria-label="Main" className="flex items-stretch">
            {nav.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "relative flex items-center px-3 text-[13px] transition-colors duration-150",
                    active ? "text-ink" : "text-ink-muted hover:text-ink",
                  )}
                >
                  {item.label}
                  {active ? (
                    <span aria-hidden className="absolute inset-x-2 -bottom-px h-[2px] rounded-full bg-navy" />
                  ) : null}
                </Link>
              );
            })}
          </nav>

          <div className="flex flex-1 items-center justify-end gap-1.5">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger className="inline-flex h-8 items-center gap-1.5 rounded-field border border-hairline-strong bg-sheet px-2.5 text-[13px] text-ink transition-colors duration-150 hover:border-navy hover:bg-navy-soft data-[state=open]:border-navy data-[state=open]:bg-navy-soft">
                Sample contracts
                <ChevronDown size={13} strokeWidth={1.75} aria-hidden />
              </DropdownMenu.Trigger>
              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  align="end"
                  sideOffset={6}
                  className="rl-rise z-50 w-[330px] rounded-card border border-hairline-strong bg-sheet p-1.5 shadow-overlay"
                >
                  <DropdownMenu.Label className="label-caps px-2 py-1.5">Eval-set contracts</DropdownMenu.Label>
                  {sampleContracts.map((sample) => (
                    <DropdownMenu.Item
                      key={sample.id}
                      onSelect={() => void openSample(sample.id)}
                      className="cursor-default rounded-field px-2 py-1.5 text-[13px] text-ink outline-none data-[highlighted]:bg-navy-soft"
                    >
                      <span className="block truncate">{sample.title}</span>
                      <span className="mono mt-0.5 block text-[11px] text-ink-muted">
                        {sample.kind} · {sample.words.toLocaleString("en-US")} words
                        {starting === sample.id ? " · starting…" : ""}
                      </span>
                    </DropdownMenu.Item>
                  ))}
                  <DropdownMenu.Separator className="my-1.5 h-px bg-hairline" />
                  <DropdownMenu.Label className="label-caps px-2 py-1.5">Prepared examples</DropdownMenu.Label>
                  <DropdownMenu.Item
                    onSelect={() => router.push("/review/sample")}
                    className="cursor-default rounded-field px-2 py-1.5 text-[13px] text-ink outline-none data-[highlighted]:bg-navy-soft"
                  >
                    Reviewed example — Brightline hosting
                    <span className="mono mt-0.5 block text-[11px] text-ink-muted">9 findings awaiting review</span>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item
                    onSelect={() => router.push("/review/sample-running")}
                    className="cursor-default rounded-field px-2 py-1.5 text-[13px] text-ink outline-none data-[highlighted]:bg-navy-soft"
                  >
                    Live run — watch the agents work
                    <span className="mono mt-0.5 block text-[11px] text-ink-muted">planner → 18 drafters → verifier</span>
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>

            <Tooltip label="Keyboard shortcuts">
              <button
                type="button"
                aria-label="Keyboard shortcuts"
                onClick={() => setShortcutsOpen(true)}
                className="mono grid size-8 place-items-center rounded-field border border-hairline-strong bg-sheet text-[13px] text-ink-muted transition-colors duration-150 hover:border-navy hover:bg-navy-soft hover:text-ink"
              >
                ?
              </button>
            </Tooltip>
          </div>
        </div>
      </header>
      <ShortcutsDialog open={shortcutsOpen} onOpenChange={setShortcutsOpen} />
    </>
  );
}
