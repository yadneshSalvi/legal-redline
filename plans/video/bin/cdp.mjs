/**
 * Minimal CDP driver for Playbook Redliner B-roll: one WebSocket per run drives the
 * page (tool calls, taps, pointer drags, screenshots) and records the screencast,
 * which is far more reliable than one agent-browser CLI process per action.
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync, renameSync } from "node:fs";
import { dirname, resolve } from "node:path";

const FFMPEG = "/opt/homebrew/bin/ffmpeg";
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export async function connect(session = "playbook-redliner-video") {
  const cdpUrl = execFileSync("agent-browser", ["--session", session, "get", "cdp-url"], { encoding: "utf8" })
    .trim().split("\n").map((l) => l.trim()).find((l) => l.startsWith("ws://"));
  if (!cdpUrl) throw new Error("no cdp url");
  const ws = new WebSocket(cdpUrl);
  let id = 0;
  const pending = new Map();
  const listeners = [];
  await new Promise((res, rej) => { ws.addEventListener("open", res, { once: true }); ws.addEventListener("error", rej, { once: true }); });
  ws.addEventListener("message", (event) => {
    const msg = JSON.parse(event.data);
    if (msg.id && pending.has(msg.id)) {
      const { res, rej } = pending.get(msg.id);
      pending.delete(msg.id);
      msg.error ? rej(new Error(`${msg.error.message}`)) : res(msg.result);
      return;
    }
    for (const fn of listeners) fn(msg);
  });
  const raw = (method, params = {}, sessionId) => new Promise((res, rej) => {
    const msgId = ++id;
    pending.set(msgId, { res, rej });
    ws.send(JSON.stringify({ id: msgId, method, params, ...(sessionId ? { sessionId } : {}) }));
    setTimeout(() => { if (pending.delete(msgId)) rej(new Error(`timeout ${method}`)); }, 45_000);
  });

  const { targetInfos } = await raw("Target.getTargets");
  const page = targetInfos.find((t) => t.type === "page" && t.url.includes("playbook-redliner"))
    ?? targetInfos.find((t) => t.type === "page");
  // Stray checkout windows from an earlier take would otherwise shadow the app.
  for (const t of targetInfos) {
    if (t.type === "page" && t.targetId !== page.targetId) await raw("Target.closeTarget", { targetId: t.targetId }).catch(() => {});
  }
  const { sessionId } = await raw("Target.attachToTarget", { targetId: page.targetId, flatten: true });
  const send = (method, params) => raw(method, params, sessionId);
  await send("Page.enable");
  await send("Runtime.enable");
  await send("Emulation.setDeviceMetricsOverride", { width: 1920, height: 1080, deviceScaleFactor: 1, mobile: false });

  const d = {
    ws, sessionId, listeners, send,
    async evalJs(expression) {
      const r = await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
      if (r.exceptionDetails) throw new Error(r.exceptionDetails.text ?? "eval failed");
      return r.result.value;
    },
    async tool(name, args = {}) {
      const js = `(async () => { const ts = await document.modelContext.getTools();
        const t = ts.find(x => x.name === ${JSON.stringify(name)});
        if (!t) return "TOOL_NOT_FOUND:" + ts.length;
        return await document.modelContext.executeTool(t, ${JSON.stringify(JSON.stringify(args))}); })()`;
      const out = await d.evalJs(js);
      console.log(`  · ${name} → ${String(out).slice(0, 200)}`);
      return out;
    },
    /** Clicks the first control whose accessible text contains `text`. */
    async tap(text) {
      const js = `(() => { const q = ${JSON.stringify(text)};
        const els = [...document.querySelectorAll('button,summary,[role=button],a,[role=option],[role=menuitem]')];
        const hit = els.find(e => (((e.getAttribute('aria-label') || '') + ' ' + (e.textContent || '')).replace(/\\s+/g, ' ')).includes(q));
        if (!hit) return 'MISS'; hit.scrollIntoView({block:'nearest'}); hit.click(); return 'TAP'; })()`;
      const out = await d.evalJs(js);
      console.log(`  · tap ${JSON.stringify(text)} → ${out}`);
      if (out === "MISS") throw new Error(`tap miss: ${text}`);
      return out;
    },
    async key(key, code = key) {
      const common = { key, code, windowsVirtualKeyCode: key === "Escape" ? 27 : 0 };
      await send("Input.dispatchKeyEvent", { type: "keyDown", ...common });
      await send("Input.dispatchKeyEvent", { type: "keyUp", ...common });
    },
    async type(text) {
      for (const ch of text) {
        await send("Input.dispatchKeyEvent", { type: "keyDown", text: ch, key: ch });
        await send("Input.dispatchKeyEvent", { type: "keyUp", key: ch });
        await sleep(28);
      }
    },
    async mouse(type, x, y, extra = {}) {
      await send("Input.dispatchMouseEvent", { type, x, y, button: "left", clickCount: type === "mousePressed" ? 1 : 0, buttons: type === "mouseReleased" ? 0 : 1, ...extra });
    },
    /** Slow pointer drag with eased intermediate moves. */
    async drag(x1, y1, x2, y2, steps = 34, holdMs = 520) {
      await d.mouse("mouseMoved", x1, y1, { buttons: 0 });
      await sleep(holdMs);
      await d.mouse("mousePressed", x1, y1);
      await sleep(340);
      const ease = (t) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);
      for (let i = 1; i <= steps; i += 1) {
        const p = ease(i / steps);
        await d.mouse("mouseMoved", Math.round(x1 + (x2 - x1) * p), Math.round(y1 + (y2 - y1) * p));
        await sleep(60);
      }
      await sleep(420);
      await d.mouse("mouseReleased", x2, y2);
    },
    async nav(url) {
      await send("Page.navigate", { url });
    },
    async reload() {
      await send("Page.reload", { ignoreCache: false });
    },
    async shot(path) {
      const r = await send("Page.captureScreenshot", { format: "png" });
      mkdirSync(dirname(resolve(path)), { recursive: true });
      const output = resolve(path);
      const tmp = `${output}.tmp-${process.pid}`;
      writeFileSync(tmp, Buffer.from(r.data, "base64"));
      renameSync(tmp, output);
    },
    /** Screenshots another page target (e.g. the checkout window Hearth opens). */
    async shotTarget(match, path) {
      const { targetInfos } = await raw("Target.getTargets");
      const other = targetInfos.filter((t) => t.type === "page" && t.url.includes(match));
      if (other.length === 0) return false;
      const t = other.at(-1);
      const { sessionId: sid } = await raw("Target.attachToTarget", { targetId: t.targetId, flatten: true });
      await raw("Emulation.setDeviceMetricsOverride", { width: 1920, height: 1080, deviceScaleFactor: 1, mobile: false }, sid);
      await sleep(700);
      const r = await raw("Page.captureScreenshot", { format: "png" }, sid);
      mkdirSync(dirname(resolve(path)), { recursive: true });
      const output = resolve(path);
      const tmp = `${output}.tmp-${process.pid}`;
      writeFileSync(tmp, Buffer.from(r.data, "base64"));
      renameSync(tmp, output);
      return true;
    },
    close() { ws.close(); },
  };
  return d;
}

/** Screencast recorder bound to an existing driver. */
export function recorder(d, outPath, fps = 60) {
  const out = resolve(outPath);
  const workDir = `${out}.frames`;
  const frames = [];
  let startT = 0;
  let stopT = 0;
  let stopped = true;
  d.listeners.push((msg) => {
    if (msg.method !== "Page.screencastFrame" || msg.sessionId !== d.sessionId) return;
    const { data, sessionId: frameId, metadata } = msg.params;
    if (!stopped) {
      const file = `${workDir}/f${String(frames.length).padStart(6, "0")}.jpg`;
      writeFileSync(file, Buffer.from(data, "base64"));
      frames.push({ file, t: metadata.timestamp });
    }
    d.send("Page.screencastFrameAck", { sessionId: frameId }).catch(() => {});
  });
  return {
    async start() {
      rmSync(workDir, { recursive: true, force: true });
      mkdirSync(workDir, { recursive: true });
      mkdirSync(dirname(out), { recursive: true });
      frames.length = 0;
      stopped = false;
      startT = Date.now() / 1000;
      await d.send("Page.startScreencast", { format: "jpeg", quality: 90, everyNthFrame: 1 });
    },
    async stop() {
      stopped = true;
      stopT = Date.now() / 1000;
      await d.send("Page.stopScreencast").catch(() => {});
      await sleep(300);
      if (frames.length < 1) throw new Error("no frames captured");
      const lines = [];
      const head = Math.max(0, frames[0].t - startT);
      if (head > 1 / fps) lines.push(`file '${frames[0].file}'`, `duration ${head.toFixed(6)}`);
      for (let i = 0; i < frames.length; i += 1) {
        const next = frames[i + 1];
        const dur = next ? Math.max(1 / 240, next.t - frames[i].t) : Math.max(1 / fps, stopT - frames[i].t);
        lines.push(`file '${frames[i].file}'`, `duration ${dur.toFixed(6)}`);
      }
      lines.push(`file '${frames[frames.length - 1].file}'`);
      const listFile = `${workDir}/list.txt`;
      writeFileSync(listFile, `${lines.join("\n")}\n`);
      execFileSync(FFMPEG, ["-y", "-f", "concat", "-safe", "0", "-i", listFile, "-vsync", "cfr", "-r", String(fps),
        "-c:v", "libx264", "-preset", "medium", "-crf", "17", "-pix_fmt", "yuv420p", "-movflags", "+faststart", out],
        { stdio: ["ignore", "ignore", "pipe"] });
      const span = Math.max(stopT, frames.at(-1).t) - Math.min(startT, frames[0].t);
      console.log(`  ✓ ${out} · ${frames.length} frames · ${span.toFixed(2)}s · ${(frames.length / span).toFixed(1)} native fps`);
      rmSync(workDir, { recursive: true, force: true });
    },
  };
}
