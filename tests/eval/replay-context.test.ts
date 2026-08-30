import path from "node:path";

import { describe, expect, it } from "vitest";

import { resolveEvalContext, withoutLocalPrecedents } from "../../src/eval/replay-context";
import { createStore } from "../../src/store";

describe("resolveEvalContext", () => {
  it("finds the committed cache and the evaluation's parties for an evaluation contract", async () => {
    const context = await resolveEvalContext({ contractDir: "data/contracts/synth-hardcase", configId: "final" });
    expect(context.contractId).toBe("synth-hardcase");
    expect(context.cacheDir).toBe(path.resolve("evals/cache/final/synth-hardcase"));
    expect(context.parties).toEqual({ ourParty: "Northwind Analytics, Inc.", counterparty: "Brightline Cloud Services Ltd." });
  });

  it("reports no cache for a config that was never recorded for the contract", async () => {
    const context = await resolveEvalContext({ contractDir: "data/contracts/synth-hardcase", configId: "no-such-config" });
    expect(context.contractId).toBe("synth-hardcase");
    expect(context.cacheDir).toBeNull();
    expect(context.parties).not.toBeNull();
  });

  it("returns nulls for a file outside the evaluation set", async () => {
    const context = await resolveEvalContext({ contractDir: "data/templates", configId: "final" });
    expect(context).toEqual({ contractId: null, cacheDir: null, parties: null });
  });
});

describe("withoutLocalPrecedents", () => {
  it("hides the persisted precedent index, shadows promotions, and passes every other key through", async () => {
    const base = createStore("memory");
    const indexKey = "precedents/index.json";
    const runKey = "runs/replay-context-test/run.json";
    await base.putJson(indexKey, { precedents: [{ id: "local" }] });
    await base.putJson(runKey, { id: "x" });

    const view = withoutLocalPrecedents(base);
    expect(await view.getJson(indexKey)).toBeNull();
    expect(await view.getJson(runKey)).toEqual({ id: "x" });

    await view.putJson(indexKey, { precedents: [{ id: "shadow" }] });
    expect(await view.getJson(indexKey)).toEqual({ precedents: [{ id: "shadow" }] });
    expect(await base.getJson(indexKey)).toEqual({ precedents: [{ id: "local" }] });

    await view.putJson("runs/replay-context-test/other.json", 1);
    expect(await base.getJson("runs/replay-context-test/other.json")).toBe(1);
  });
});
