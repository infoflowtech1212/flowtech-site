import type { Metadata } from "next";
import { Onest, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const onest = Onest({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-onest",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://flowtechapps.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
  title: {
    default: "FlowTech — Real Estate Strategy, Built & Implemented",
    template: "%s · FLOWTECH",
  },
  description:
    "Business strategy consulting for real estate investment and operations teams. Strategy first. Systems that follow.",
  openGraph: {
    type: "website",
    siteName: "FLOWTECH",
    url: siteUrl,
    title: "FlowTech — Real Estate Strategy, Built & Implemented",
    description:
      "Business strategy consulting for real estate investment and operations teams. Strategy first. Systems that follow.",
  },
  twitter: {
    card: "summary_large_image",
    title: "FlowTech — Real Estate Strategy, Built & Implemented",
    description:
      "Business strategy consulting for real estate investment and operations teams.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${onest.variable} ${plexMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
