import type { Metadata } from "next";
import { Geist_Mono, Inter, Source_Serif_4 } from "next/font/google";
import { TopBar } from "@/src/ui/TopBar";
import { TooltipProvider } from "@/src/ui/Tooltip";
import "./globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const sourceSerif = Source_Serif_4({ variable: "--font-source-serif", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://playbook-redliner.yadneshsalvi.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Playbook Redliner — agentic first-pass contract review",
    template: "%s · Playbook Redliner",
  },
  description:
    "Reads a vendor contract against your playbook, drafts the redlines, verifies them, and writes real Word tracked changes and comments once you approve each one.",
  applicationName: "Playbook Redliner",
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }] },
  openGraph: {
    title: "Playbook Redliner",
    description:
      "Agentic first-pass contract review for in-house counsel: playbook-driven redlines, independently verified, delivered as Word tracked changes.",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Playbook Redliner" }],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${sourceSerif.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <TooltipProvider>
          <TopBar />
          <main className="flex min-h-0 flex-1 flex-col">{children}</main>
        </TooltipProvider>
      </body>
    </html>
  );
}
