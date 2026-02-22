import type { Metadata } from "next";
import "@app/(site)/globals.css";

import { DM_Sans, Inter, Poppins } from "next/font/google";
import AxeDevClient from "@/shared/dev/AxeDev.client";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

const dm_sans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-dm_sans",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

function env(name: "NEXT_PUBLIC_SITE_URL"): string | undefined {
  return process.env[name];
}

const siteUrl = env("NEXT_PUBLIC_SITE_URL") ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl), // <- ustaw jak masz domenę
  title: {
    default: "Global Citizenship Foundation",
    template: "%s | Global Citizenship Foundation",
  },
  description:
    "The Global Citizenship Foundation is a registered not-for-profit specialist organization that fosters active global citizenship and global citizenship education (GCED). The seat of the Global Citizenship Foundation is the National Capital Territory of Delhi, India.",
  openGraph: {
    title: "Global Citizenship Foundation",
    description:
      "The Global Citizenship Foundation fosters active global citizenship and global citizenship education (GCED).",
    type: "website",
    // url: '/', // opcjonalnie
    // images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Global Citizenship Foundation' }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Global Citizenship Foundation",
    description:
      "The Global Citizenship Foundation fosters active global citizenship and global citizenship education (GCED).",
    // images: ['/og.jpg'],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} ${dm_sans.variable}`}>
      <body className="font-inter flex min-h-screen flex-col">
        <AxeDevClient />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-white focus:px-4 focus:py-2 focus:text-black"
        >
          Skip to content
        </a>

        {children}
      </body>
    </html>
  );
}
