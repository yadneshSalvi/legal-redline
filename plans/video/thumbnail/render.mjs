import { execFileSync } from "node:child_process";
import { renameSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
const DIR = dirname(fileURLToPath(import.meta.url));
const SESSION = "playbook-redliner-thumbnail";
const shell = (name, ...args) => execFileSync("agent-browser", ["--session", SESSION, name, ...args], { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
try {
  shell("open", pathToFileURL(resolve(DIR, "thumbnail.html")).href);
  shell("set", "viewport", "1280", "720");
  try { shell("wait", "--fn", "document.fonts.status === 'loaded'"); } catch { shell("wait", "1200"); }
  const tmp = resolve(DIR, "thumbnail.png.tmp.png");
  shell("screenshot", tmp);
  renameSync(tmp, resolve(DIR, "thumbnail.png"));
  process.stdout.write("rendered thumbnail.png\n");
} finally { try { shell("close"); } catch {} }
