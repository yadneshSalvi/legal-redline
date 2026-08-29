"use client";

import { create } from "zustand";
import type { ConfigId } from "@/src/agent/types";
import { defaultPlaybook } from "../fixtures/samples";
import { defaultConfigId } from "../lib/configs";

/** Shared by the upload card and the sample row on the landing page. */
interface StartState {
  playbookId: string;
  config: ConfigId;
  setPlaybookId: (playbookId: string) => void;
  setConfig: (config: ConfigId) => void;
}

export const useStartStore = create<StartState>((set) => ({
  playbookId: defaultPlaybook.id,
  config: defaultConfigId,
  setPlaybookId: (playbookId) => set({ playbookId }),
  setConfig: (config) => set({ config }),
}));
