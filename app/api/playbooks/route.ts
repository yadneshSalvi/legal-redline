import { listPlaybooks } from "@/src/playbook/loader";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(): Promise<Response> {
  const playbooks = await listPlaybooks();
  return Response.json(playbooks.map(({ id, name, version, rules }) => ({
    id,
    name,
    version,
    rules: rules.map(({ id: ruleId, title, severity, category }) => ({ id: ruleId, title, severity, category })),
  })));
}
