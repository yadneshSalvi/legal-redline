/**
 * Where this repository lives. `REPRODUCE.md` carries the same `https://github.com/yadneshSalvi/legal-redline` token and the lead
 * substitutes both at submission time; `NEXT_PUBLIC_REPO_URL` overrides it for a deployment. While
 * the placeholder is unresolved the UI shows the path as plain mono text instead of a dead link.
 */
const PLACEHOLDER = "https://github.com/yadneshSalvi/legal-redline";

export const REPO_URL: string = process.env.NEXT_PUBLIC_REPO_URL ?? PLACEHOLDER;

export const repoUrlResolved: boolean = !REPO_URL.includes("{{");

/** A `blob/main/...` URL for a committed file, or `null` while the placeholder is unresolved. */
export function repoFileUrl(path: string): string | null {
  if (!repoUrlResolved) return null;
  return `${REPO_URL.replace(/\/$/, "")}/blob/main/${path.replace(/^\//, "")}`;
}
