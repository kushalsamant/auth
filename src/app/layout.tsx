import type { Metadata } from "next";
import { KVSHVL_FAVICON_URL } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "KVSHVL",
    template: "%s · KVSHVL",
  },
  description: "One Google sign-in for all KVSHVL apps.",
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
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
