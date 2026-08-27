import "allotment/dist/style.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { IBM_Plex_Mono, Inter } from "next/font/google";

import "./globals.css";
import Providers from "./providers";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Polaris — Build full-stack apps in your browser",
  description:
    "Polaris is an AI-native dev workspace. Describe any app and watch a real Node environment build it in your browser, then export it to GitHub.",
  icons: ["/logo.svg"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} ${plexMono.variable} antialiased`}>
        <Providers>
          {children}
          <Toaster />
          <Analytics/>
        </Providers>
      </body>
    </html>
  );
}
