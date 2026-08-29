import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keeps the dev-only floating badge out of UI screenshots.
  devIndicators: false,
  outputFileTracingIncludes: {
    "/api/samples": ["./data/contracts/*/meta.json", "./data/contracts/*/contract.docx", "./data/contracts/*/contract.txt"],
    "/api/runs": ["./data/contracts/*/meta.json", "./data/contracts/*/contract.docx", "./data/contracts/*/contract.txt", "./data/playbooks/*.yaml"],
    "/api/runs/*": ["./data/playbooks/*.yaml", "./data/precedents/seed.json"],
    "/api/precedents": ["./data/precedents/seed.json"],
  },
};

export default nextConfig;
