import { appendFile, mkdir, readFile, readdir, rename, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { randomUUID } from "node:crypto";

import type { Store } from "@/src/store";

function safeKey(key: string): string {
  const normalized = key.replaceAll("\\", "/").replace(/^\/+/, "");
  if (!normalized || normalized.split("/").some((part) => part === ".." || part === "")) {
    throw new Error(`Invalid store key: ${key}`);
  }
  return normalized;
}

export class FsStore implements Store {
  private readonly appendQueues = new Map<string, Promise<void>>();

  constructor(private readonly root: string) {}

  private resolve(key: string): string {
    const target = path.resolve(this.root, safeKey(key));
    const prefix = `${path.resolve(this.root)}${path.sep}`;
    if (!target.startsWith(prefix)) throw new Error(`Store key escapes root: ${key}`);
    return target;
  }

  async putBytes(key: string, bytes: Uint8Array): Promise<void> {
    const target = this.resolve(key);
    await mkdir(path.dirname(target), { recursive: true });
    const temp = `${target}.${randomUUID()}.tmp`;
    await writeFile(temp, bytes);
    await rename(temp, target);
  }

  async getBytes(key: string): Promise<Uint8Array | null> {
    try {
      return new Uint8Array(await readFile(this.resolve(key)));
    } catch (error) {
      if (error instanceof Error && "code" in error && error.code === "ENOENT") return null;
      throw error;
    }
  }

  async putJson(key: string, value: unknown): Promise<void> {
    await this.putBytes(key, new TextEncoder().encode(`${JSON.stringify(value, null, 2)}\n`));
  }

  async getJson<T>(key: string): Promise<T | null> {
    const bytes = await this.getBytes(key);
    if (!bytes) return null;
    return JSON.parse(new TextDecoder().decode(bytes)) as T;
  }

  async appendLine(key: string, line: string): Promise<void> {
    const previous = this.appendQueues.get(key) ?? Promise.resolve();
    const next = previous.catch(() => undefined).then(async () => {
      const target = this.resolve(key);
      await mkdir(path.dirname(target), { recursive: true });
      await appendFile(target, `${line.replace(/[\r\n]+$/g, "")}\n`, { encoding: "utf8", flag: "a" });
    });
    this.appendQueues.set(key, next);
    try {
      await next;
    } finally {
      if (this.appendQueues.get(key) === next) this.appendQueues.delete(key);
    }
  }

  async list(prefix: string): Promise<string[]> {
    const cleanPrefix = prefix ? safeKey(prefix) : "";
    const start = cleanPrefix ? this.resolve(cleanPrefix) : path.resolve(this.root);
    const found: string[] = [];
    const walk = async (dir: string): Promise<void> => {
      let entries;
      try {
        entries = await readdir(dir, { withFileTypes: true });
      } catch (error) {
        if (error instanceof Error && "code" in error && error.code === "ENOENT") return;
        throw error;
      }
      await Promise.all(
        entries.map(async (entry) => {
          const absolute = path.join(dir, entry.name);
          if (entry.isDirectory()) await walk(absolute);
          else found.push(path.relative(this.root, absolute).split(path.sep).join("/"));
        }),
      );
    };
    await walk(start);
    return found.sort();
  }

  async delete(key: string): Promise<void> {
    await rm(this.resolve(key), { force: true, recursive: true });
  }
}
