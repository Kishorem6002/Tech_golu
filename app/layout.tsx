import type { Metadata, Viewport } from "next";
import "./globals.css";
import { BgmProvider } from "@/components/BgmContext";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#0A0D0B",
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: "Navarathri Tales — Ashta Lakshmi",
  description:
    "Devotional Ashta Lakshmi Golu story exhibition with audio and bilingual narrations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&family=Outfit:wght@400;500;600&display=swap"
          rel="stylesheet"
        />

        {/* Preload all 8 deity images for zero latency switching */}
        <link rel="preload" as="image" href="/images/god 1.jpeg" />
        <link rel="preload" as="image" href="/images/god 2.jpeg" />
        <link rel="preload" as="image" href="/images/god 3.jpeg" />
        <link rel="preload" as="image" href="/images/god 4.jpeg" />
        <link rel="preload" as="image" href="/images/god 5.jpeg" />
        <link rel="preload" as="image" href="/images/god 6.jpeg" />
        <link rel="preload" as="image" href="/images/god 7.jpeg" />
        <link rel="preload" as="image" href="/images/god 8.jpeg" />
      </head>
      <body className="bg-[#070A08] text-[#E8E2D5] antialiased selection:bg-[#D4AF37]/30 selection:text-[#FFEAA7]">
        <BgmProvider>{children}</BgmProvider>
      </body>
    </html>
  );
}
