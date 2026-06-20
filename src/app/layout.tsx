import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { KVSHVL_FAVICON_URL } from "@/lib/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Sign in · KVSHVL",
    template: "%s · KVSHVL",
  },
  description: "Sign in with Google to continue to your KVSHVL app.",
  icons: {
    icon: [{ url: KVSHVL_FAVICON_URL, type: "image/png" }],
    shortcut: KVSHVL_FAVICON_URL,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
