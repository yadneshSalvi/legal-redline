import { nanoid } from "nanoid";
import { z } from "zod";

import { createPrecedentMemory } from "@/src/agent/memory";
import type { Precedent } from "@/src/agent/types";
import { jsonError, store } from "@/app/api/_shared";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const PrecedentSchema = z.object({
  id: z.string().optional(),
  ruleId: z.string(),
  title: z.string(),
  source: z.string(),
  clauseBefore: z.string(),
  clauseAfter: z.string(),
  comment: z.string(),
  level: z.enum(["preferred", "fallback"]),
  approvedAt: z.string().optional(),
  approvedBy: z.string(),
  tags: z.array(z.string()).optional(),
  runId: z.string().optional(),
  findingId: z.string().optional(),
});

export async function GET(): Promise<Response> {
  return Response.json(await createPrecedentMemory(store()).all());
}

export async function POST(request: Request): Promise<Response> {
  try {
    const input = PrecedentSchema.parse(await request.json());
    const precedent: Precedent = {
      ...input,
      id: input.id ?? `pr-${nanoid(10)}`,
      approvedAt: input.approvedAt ?? new Date().toISOString(),
      tags: input.tags ?? [],
    };
    await createPrecedentMemory(store()).put(precedent);
    return Response.json(precedent, { status: 201 });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : String(error));
  }
}

export async function DELETE(request: Request): Promise<Response> {
  try {
    const urlId = new URL(request.url).searchParams.get("id");
    const body = urlId ? null : z.object({ id: z.string() }).parse(await request.json());
    const id = urlId ?? body?.id;
    if (!id) return jsonError("Precedent id is required");
    const deleted = await createPrecedentMemory(store()).delete(id);
    return deleted ? Response.json({ deleted: true }) : jsonError("Precedent not found", 404);
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : String(error));
  }
}
