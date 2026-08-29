"use client";

import { Dialog } from "./Dialog";
import { Kbd } from "./Kbd";

const groups: { title: string; items: { keys: string[]; label: string }[] }[] = [
  {
    title: "Reviewing findings",
    items: [
      { keys: ["J"], label: "Next finding" },
      { keys: ["K"], label: "Previous finding" },
      { keys: ["A"], label: "Accept the selected finding" },
      { keys: ["R"], label: "Reject the selected finding" },
      { keys: ["E"], label: "Edit the redline before accepting" },
      { keys: ["Enter"], label: "Expand or collapse the selected card" },
      { keys: ["/"], label: "Focus the filter chips" },
    ],
  },
  {
    title: "Everywhere",
    items: [
      { keys: ["?"], label: "Open this list" },
      { keys: ["Esc"], label: "Close a dialog, drawer or menu" },
      { keys: ["Tab"], label: "Move focus — every control is reachable" },
    ],
  },
];

export function ShortcutsDialog({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
      title="Keyboard shortcuts"
      description="A full review can be done without the mouse."
      width={520}
    >
      <div className="space-y-5">
        {groups.map((group) => (
          <section key={group.title}>
            <h3 className="label-caps mb-2.5">{group.title}</h3>
            <dl className="divide-y divide-hairline">
              {group.items.map((item) => (
                <div key={item.label} className="flex items-center justify-between gap-6 py-1.5">
                  <dt className="text-[13px] text-ink">{item.label}</dt>
                  <dd className="flex shrink-0 gap-1">
                    {item.keys.map((key) => (
                      <Kbd key={key}>{key}</Kbd>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
    </Dialog>
  );
}
