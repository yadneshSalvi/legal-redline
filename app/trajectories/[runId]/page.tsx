import type { Metadata } from "next";
import { Suspense } from "react";
import { SkeletonLines } from "@/src/ui/Skeleton";
import { TrajectoryViewer } from "@/src/ui/trajectory/TrajectoryViewer";

export const metadata: Metadata = { title: "Trajectory" };

export default async function TrajectoryPage({ params }: PageProps<"/trajectories/[runId]">) {
  const { runId } = await params;
  return (
    <Suspense
      fallback={
        <div className="flex-1 p-8">
          <SkeletonLines lines={10} />
        </div>
      }
    >
      <TrajectoryViewer key={runId} runId={runId} />
    </Suspense>
  );
}
