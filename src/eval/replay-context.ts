import { access } from "node:fs/promises";
import path from "node:path";

import { loadContractMeta } from "@/src/eval/gold";
import type { Store } from "@/src/store";

/** Key under which `PrecedentMemory` keeps the team's approved precedents. */
const PRECEDENT_INDEX_KEY = "precedents/index.json";

export interface EvalContext {
  /** The contract id when the file lives in the evaluation set (`data/contracts/<id>/`), else `null`. */
  contractId: string | null;
  /** `evals/cache/<config>/<id>` when that replay cache exists, else `null`. */
  cacheDir: string | null;
  /** The parties the evaluation passed to the pipeline (from `meta.json`), else `null`. */
  parties: { ourParty: string; counterparty: string } | null;
}

async function exists(target: string): Promise<boolean> {
  try {
    await access(target);
    return true;
  } catch {
    return false;
  }
}

/**
 * For a contract that lives in the evaluation set, the replay cache directory and the parties the evaluation
 * used — the two inputs a replay must reproduce exactly for request hashes to match the committed cache.
 */
export async function resolveEvalContext(input: {
  contractDir: string;
  configId: string;
  cacheRoot?: string;
}): Promise<EvalContext> {
  const metaPath = path.join(input.contractDir, "meta.json");
  if (!(await exists(metaPath))) return { contractId: null, cacheDir: null, parties: null };
  const contractId = path.basename(path.resolve(input.contractDir));
  const meta = await loadContractMeta(metaPath);
  const cacheDir = path.resolve(input.cacheRoot ?? "evals/cache", input.configId, contractId);
  return {
    contractId,
    cacheDir: (await exists(cacheDir)) ? cacheDir : null,
    parties:
      meta.ourParty === null || meta.counterparty === null
        ? null
        : { ourParty: meta.ourParty.name, counterparty: meta.counterparty.name },
  };
}

/**
 * A view of a store that behaves like the evaluation's fresh memory store as far as precedents are concerned:
 * the local precedent index is never read (so drafter prompts hash exactly as they were recorded) and never
 * written (so a replay leaves the team's real precedents untouched). Precedents promoted during the replay live
 * in a process-local shadow index, which keeps `PrecedentMemory`'s read-after-write check honest. Everything
 * else passes through.
 */
export function withoutLocalPrecedents(store: Store): Store {
  let shadowIndex: unknown = null;
  return {
    putBytes: (key, bytes, contentType) => store.putBytes(key, bytes, contentType),
    getBytes: (key) => store.getBytes(key),
    putJson: (key, value) => {
      if (key !== PRECEDENT_INDEX_KEY) return store.putJson(key, value);
      shadowIndex = value;
      return Promise.resolve();
    },
    getJson: <T>(key: string): Promise<T | null> =>
      key === PRECEDENT_INDEX_KEY ? Promise.resolve(shadowIndex as T | null) : store.getJson<T>(key),
    appendLine: (key, line) => store.appendLine(key, line),
    list: (prefix) => store.list(prefix),
    delete: (key) => store.delete(key),
  };
}
