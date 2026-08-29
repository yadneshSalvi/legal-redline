import { readFile } from "node:fs/promises";

import { parse } from "yaml";

import { PlaybookSchema, type Playbook } from "@/src/playbook/schema";

export async function loadPlaybookFile(path: string): Promise<Playbook> {
  const contents = await readFile(path, "utf8");
  return PlaybookSchema.parse(parse(contents));
}
