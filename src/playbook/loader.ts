import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { parse as parseYaml } from "yaml";

import { PlaybookSchema } from "@/src/playbook/schema";
import type { Playbook, Rule } from "@/src/playbook/schema";

const PLAYBOOK_DIR = path.resolve(process.cwd(), "data/playbooks");

function playbookPath(idOrPath: string): string {
  if (idOrPath.includes("/") || idOrPath.endsWith(".yaml") || idOrPath.endsWith(".yml")) {
    return path.resolve(idOrPath);
  }
  const filename = idOrPath === "customer-vendor-services-v1" ? "customer-vendor-services.yaml" : `${idOrPath}.yaml`;
  return path.join(PLAYBOOK_DIR, filename);
}

export async function loadPlaybook(idOrPath: string): Promise<Playbook> {
  const filename = playbookPath(idOrPath);
  const raw = await readFile(filename, "utf8");
  return PlaybookSchema.parse(parseYaml(raw));
}

export async function listPlaybooks(): Promise<Playbook[]> {
  const files = (await readdir(PLAYBOOK_DIR))
    .filter((file) => file.endsWith(".yaml") || file.endsWith(".yml"))
    .sort();
  return Promise.all(files.map((file) => loadPlaybook(path.join(PLAYBOOK_DIR, file))));
}

export function ruleById(playbook: Playbook, id: string): Rule {
  const rule = playbook.rules.find((candidate) => candidate.id === id);
  if (!rule) throw new Error(`Unknown playbook rule: ${id}`);
  return rule;
}

export function ruleSummary(rule: Rule): string {
  return [`ID: ${rule.id}`, `Title: ${rule.title}`, `Kind: ${rule.kind}`, `Summary: ${rule.summary}`].join("\n");
}

export function ruleFull(rule: Rule): string {
  const lines = [
    ruleSummary(rule),
    `Severity: ${rule.severity}`,
    `Category: ${rule.category}`,
    "Position — preferred:",
    rule.position.preferred,
    "Position — fallback:",
    rule.position.fallback,
    "Position — walk-away:",
    rule.position.walkaway,
    "Detection guidance:",
    rule.detect,
    "Redline guidance:",
    rule.redline,
  ];
  if (rule.modelLanguage) lines.push("Model language:", rule.modelLanguage);
  if (rule.examples?.compliant.length) lines.push("Compliant examples:", ...rule.examples.compliant.map((x) => `- ${x}`));
  if (rule.examples?.deviation.length) lines.push("Deviation examples:", ...rule.examples.deviation.map((x) => `- ${x}`));
  return lines.join("\n");
}
