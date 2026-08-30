"use client";

import { useCallback, useState } from "react";
import { tierViews, type TierView } from "./evals-round2";

const STORAGE_KEY = "playbook-redliner.evals.tier";
const PARAM = "tier";

function parse(value: string | null): TierView | null {
  return tierViews.find((view) => view === value) ?? null;
}

/**
 * The tier the page opens on: `?tier=long` first so a view is linkable, then the remembered choice.
 * Read once, during the first render — the dashboard is still showing its skeleton then, so there is
 * nothing to hydrate against and nothing to re-render. Whether the report actually has that tier is
 * the caller's business; this hook only carries the preference.
 */
function readPreference(): TierView {
  if (typeof window === "undefined") return "short";
  const fromUrl = parse(new URLSearchParams(window.location.search).get(PARAM));
  if (fromUrl) return fromUrl;
  try {
    return parse(window.localStorage.getItem(STORAGE_KEY)) ?? "short";
  } catch {
    return "short";
  }
}

export function useTierView(): [TierView, (next: TierView) => void] {
  const [view, setView] = useState<TierView>(readPreference);

  const select = useCallback((next: TierView) => {
    setView(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Private-mode storage failures must not break the switch.
    }
    const url = new URL(window.location.href);
    url.searchParams.set(PARAM, next);
    window.history.replaceState(window.history.state, "", url);
  }, []);

  return [view, select];
}
