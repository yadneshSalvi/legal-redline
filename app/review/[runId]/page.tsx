import type { Metadata } from "next";
import { Workspace } from "@/src/ui/workspace/Workspace";

export const metadata: Metadata = { title: "Review" };

export default async function ReviewPage({ params }: PageProps<"/review/[runId]">) {
  const { runId } = await params;
  return <Workspace runId={runId} />;
}
