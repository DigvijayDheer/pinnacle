import type { Metadata, Viewport } from "next";
import "../styles/globals.css";
import { CinematicCursor } from "@/components/CinematicCursor";
import ViewportVars from "@/components/ViewportVars";

export const metadata: Metadata = {
  title: "Pinnacle Dubai",
  description:
    "Pinnacle Dubai — the world's most ambitious entertainment, retail and hospitality destination. 120M annual visitors across 86 countries.",
  openGraph: {
    title: "Pinnacle Dubai",
    description:
      "An unrivaled destination for partnership, entertainment, and legacy.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          as="image"
          href="https://images.unsplash.com/photo-1590743689886-d2686505a267?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1920"
          fetchPriority="high"
        />
      </head>
      <body>
        <ViewportVars />
        <CinematicCursor />
        {children}
      </body>
    </html>
  );
}
