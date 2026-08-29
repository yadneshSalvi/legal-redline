import path from "node:path";

import { BlobStore, blobConfigured } from "@/src/store/blob";
import { FsStore } from "@/src/store/fs";
import { MemoryStore } from "@/src/store/memory";

let memoryStore: MemoryStore | undefined;

export interface Store {
  putBytes(key: string, bytes: Uint8Array, contentType?: string): Promise<void>;
  getBytes(key: string): Promise<Uint8Array | null>;
  putJson(key: string, value: unknown): Promise<void>;
  getJson<T>(key: string): Promise<T | null>;
  appendLine(key: string, line: string): Promise<void>;
  list(prefix: string): Promise<string[]>;
  delete(key: string): Promise<void>;
}

export function createStore(kind = process.env.REDLINER_STORE): Store {
  if (kind === "blob") return new BlobStore();
  if (kind === "memory") return (memoryStore ??= new MemoryStore());
  if (kind === "fs") return new FsStore(path.resolve(process.cwd(), "data"));
  if (kind) throw new Error(`Unknown REDLINER_STORE value: ${kind}`);
  if (process.env.VERCEL) return blobConfigured() ? new BlobStore() : (memoryStore ??= new MemoryStore());
  return new FsStore(path.resolve(process.cwd(), "data"));
}

export { BlobStore } from "@/src/store/blob";
export { FsStore } from "@/src/store/fs";
export { MemoryStore } from "@/src/store/memory";
