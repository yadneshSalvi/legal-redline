/**
 * Thin client for the HTTP API in SCHEMA.md §6. Every call resolves to `null` rather than throwing
 * when the route is not there yet, so the UI can fall back to its fixtures while the backend lands.
 */
import type { ConfigId, Decision, Precedent, ReviewRun } from "@/src/agent/types";
import type { PlaybookSummary, SampleContract } from "../fixtures/samples";

async function getJson<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url, { headers: { accept: "application/json" } });
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export const getRun = (runId: string) => getJson<ReviewRun>(`/api/runs/${encodeURIComponent(runId)}`);
export const getRuns = () => getJson<ReviewRun[]>("/api/runs");
export const getSamples = () => getJson<SampleContract[]>("/api/samples");
export const getPlaybooks = () => getJson<PlaybookSummary[]>("/api/playbooks");
export const getPrecedents = () => getJson<Precedent[]>("/api/precedents");

export async function postDecisions(runId: string, decisions: Decision[]): Promise<boolean> {
  try {
    const response = await fetch(`/api/runs/${encodeURIComponent(runId)}/decisions`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ decisions }),
    });
    return response.ok;
  } catch {
    return false;
  }
}

export async function applyRun(runId: string): Promise<boolean> {
  try {
    const response = await fetch(`/api/runs/${encodeURIComponent(runId)}/apply`, { method: "POST" });
    return response.ok;
  } catch {
    return false;
  }
}

export interface StartRunInput {
  file?: File;
  sampleId?: string;
  playbookId: string;
  config: ConfigId;
}

export async function startRun(input: StartRunInput): Promise<string | null> {
  const body = new FormData();
  if (input.file) body.set("file", input.file);
  if (input.sampleId) body.set("sampleId", input.sampleId);
  body.set("playbookId", input.playbookId);
  body.set("config", input.config);
  try {
    const response = await fetch("/api/runs", { method: "POST", body });
    if (!response.ok) return null;
    const data = (await response.json()) as { runId?: string };
    return data.runId ?? null;
  } catch {
    return null;
  }
}

export const outputDocxUrl = (runId: string) => `/api/runs/${encodeURIComponent(runId)}/output.docx`;
export const memoUrl = (runId: string) => `/api/runs/${encodeURIComponent(runId)}/memo.md`;
export const trajectoryHref = (runId: string, findingId?: string) =>
  findingId
    ? `/trajectories/${encodeURIComponent(runId)}?finding=${encodeURIComponent(findingId)}`
    : `/trajectories/${encodeURIComponent(runId)}`;
