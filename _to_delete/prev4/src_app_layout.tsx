import type { Metadata } from "next";

// Self-hosted from npm rather than the Google Fonts CDN: one less third-party
// request before first paint, and no external dependency at build time.
// Outfit is the single Theerrv brand typeface; JetBrains Mono is reserved for
// technical and mono use.
import "@fontsource-variable/outfit";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "Theerrv Technologies — Building digital solutions for a smarter tomorrow",
  description:
    "We design, build, modernize and scale business software — from product engineering and cloud platforms to data, automation and AI.",
  openGraph: {
    title: "Theerrv Technologies",
    description:
      "We design, build, modernize and scale business software — from product engineering and cloud platforms to data, automation and AI.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
