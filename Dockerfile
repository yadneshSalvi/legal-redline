# Clean-environment reproduction image (see REPRODUCE.md).
# Build:  docker build -t playbook-redliner .
# Eval:   docker run --rm playbook-redliner pnpm eval --all && docker run --rm playbook-redliner pnpm report
# Tests:  docker run --rm playbook-redliner pnpm test
# UI:     docker run --rm -p 3000:3000 playbook-redliner pnpm start   (after `pnpm build` in the image)
FROM node:22-bookworm-slim

# LibreOffice (headless) for the document-integrity check; the eval degrades gracefully without it.
RUN apt-get update \
 && apt-get install -y --no-install-recommends libreoffice-writer fonts-dejavu ca-certificates \
 && rm -rf /var/lib/apt/lists/*

RUN corepack enable && corepack prepare pnpm@10.15.0 --activate

WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
ENV REDLINER_STORE=fs
ENV REDLINER_LLM_MODE=replay
RUN pnpm typecheck && pnpm build

CMD ["pnpm", "eval", "--all"]
