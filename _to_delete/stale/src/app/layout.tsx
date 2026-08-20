import type { Metadata } from "next";
// Self-hosted via npm — this environment cannot reach fonts.googleapis.com,
// and self-hosting is the right call for production anyway (no third-party
// request on first paint). Swap the family once the Theerrv DS names its typeface.
import "@fontsource-variable/inter";
import "./globals.css";

export const metadata: Metadata = {
  title: "Theerrv",
  description: "Theerrv",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
