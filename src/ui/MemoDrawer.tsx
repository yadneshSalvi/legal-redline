"use client";

import { FileDown } from "lucide-react";
import { Button } from "./Button";
import { Drawer } from "./Dialog";
import { EmptyState } from "./EmptyState";
import { Markdown } from "./Markdown";

export function MemoDrawer({
  open,
  onOpenChange,
  memo,
  filename,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  memo?: string;
  filename: string;
}) {
  const download = () => {
    if (!memo) return;
    const url = URL.createObjectURL(new Blob([memo], { type: "text/markdown;charset=utf-8" }));
    const link = window.document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Drawer
      open={open}
      onOpenChange={onOpenChange}
      title="Issues memo"
      description="Written by the assembler from the accepted findings. Ships alongside the redlined document."
      width={600}
      footer={
        <Button variant="secondary" size="md" onClick={download} disabled={!memo}>
          <FileDown size={13} strokeWidth={1.75} aria-hidden />
          Download memo (.md)
        </Button>
      }
    >
      {memo ? (
        <Markdown source={memo} />
      ) : (
        <EmptyState
          title="The memo is written last"
          body="Once the assembler has ordered the findings it drafts the memo in one call. It will appear here the moment the run finishes."
        />
      )}
    </Drawer>
  );
}
