import { del, get, list, put } from "@vercel/blob";

import type { Store } from "@/src/store";

export class BlobStore implements Store {
  private token(): string {
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!token) throw new Error("BLOB_READ_WRITE_TOKEN is required for blob storage");
    return token;
  }

  async putBytes(key: string, bytes: Uint8Array, contentType = "application/octet-stream"): Promise<void> {
    await put(key, Buffer.from(bytes), {
      access: "private",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType,
      token: this.token(),
    });
  }

  async getBytes(key: string): Promise<Uint8Array | null> {
    const result = await get(key, { access: "private", token: this.token(), useCache: false });
    if (!result || result.statusCode !== 200) return null;
    return new Uint8Array(await new Response(result.stream).arrayBuffer());
  }

  async putJson(key: string, value: unknown): Promise<void> {
    await this.putBytes(key, new TextEncoder().encode(`${JSON.stringify(value, null, 2)}\n`), "application/json");
  }

  async getJson<T>(key: string): Promise<T | null> {
    const bytes = await this.getBytes(key);
    return bytes ? (JSON.parse(new TextDecoder().decode(bytes)) as T) : null;
  }

  async appendLine(key: string, line: string): Promise<void> {
    const current = await this.getBytes(key);
    const prefix = current ? new TextDecoder().decode(current) : "";
    await this.putBytes(key, new TextEncoder().encode(`${prefix}${line.replace(/[\r\n]+$/g, "")}\n`), "application/x-ndjson");
  }

  async list(prefix: string): Promise<string[]> {
    const keys: string[] = [];
    let cursor: string | undefined;
    do {
      const page = await list({ prefix, cursor, limit: 1000, token: this.token() });
      keys.push(...page.blobs.map((blob) => blob.pathname));
      cursor = page.hasMore ? page.cursor : undefined;
    } while (cursor);
    return keys.sort();
  }

  async delete(key: string): Promise<void> {
    const matches = (await this.list(key)).filter((candidate) => candidate === key || candidate.startsWith(`${key}/`));
    if (matches.length) await del(matches, { token: this.token() });
  }
}

export function blobConfigured(): boolean {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}
