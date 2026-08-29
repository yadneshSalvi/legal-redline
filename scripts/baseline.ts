import "dotenv/config";
import { spawn } from "node:child_process";

const args = process.argv.slice(2);
const forwarded = args.includes("--config") ? args : [...args, "--config", "b1-prompt"];
const child = spawn(process.execPath, ["--import", "tsx", "scripts/review.ts", ...forwarded], { stdio: "inherit", env: process.env });
child.on("exit", (code) => { process.exitCode = code ?? 1; });
child.on("error", (error) => { console.error(error.message); process.exitCode = 1; });
