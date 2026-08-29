import type { Store } from "@/src/store";

export class MemoryStore implements Store {
  private readonly values = new Map<string, Uint8Array>();

  async putBytes(key: string, bytes: Uint8Array): Promise<void> {
    this.values.set(key, bytes.slice());
  }

  async getBytes(key: string): Promise<Uint8Array | null> {
    return this.values.get(key)?.slice() ?? null;
  }

  async putJson(key: string, value: unknown): Promise<void> {
    await this.putBytes(key, new TextEncoder().encode(JSON.stringify(value)));
  }

  async getJson<T>(key: string): Promise<T | null> {
    const bytes = await this.getBytes(key);
    return bytes ? (JSON.parse(new TextDecoder().decode(bytes)) as T) : null;
  }

  async appendLine(key: string, line: string): Promise<void> {
    const current = await this.getBytes(key);
    const prefix = current ? new TextDecoder().decode(current) : "";
    await this.putBytes(key, new TextEncoder().encode(`${prefix}${line.replace(/[\r\n]+$/g, "")}\n`));
  }

  async list(prefix: string): Promise<string[]> {
    return [...this.values.keys()].filter((key) => key.startsWith(prefix)).sort();
  }

  async delete(key: string): Promise<void> {
    for (const candidate of this.values.keys()) {
      if (candidate === key || candidate.startsWith(`${key}/`)) this.values.delete(candidate);
    }
  }
}
