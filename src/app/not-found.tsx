import type { Metadata } from "next";
import Link from "next/link";

import { Logo } from "@/components/Logo";

export const metadata: Metadata = {
  title: "Page not found — Theerrv Technologies",
  robots: { index: false, follow: true },
};

/**
 * 404.
 *
 * Self-contained chrome rather than the site nav. The root layout renders only
 * `{children}`, and the primary nav is a set of on-page anchors — carrying it
 * onto a route with none of those sections would give every link a destination
 * that scrolls nowhere. A wordmark home and two real exits are more use.
 *
 * The numeral takes the wordmark's own rule: the terminal character carries the
 * coral, exactly as "Theerr-v" does. That is the one accent on the page.
 */
export default function NotFound() {
  return (
    <main className="ink notfound">
      <div className="notfound-grid" aria-hidden="true" />

      <header className="notfound-head container">
        <Link href="/" aria-label="Theerrv Technologies, home">
          <Logo mark onInk />
        </Link>
      </header>

      <div className="container notfound-body">
        <p className="t-mono notfound-status">Error — 404</p>

        <p className="notfound-figure">
          <span aria-hidden="true">40</span>
          <span aria-hidden="true" className="notfound-figure-accent">
            4
          </span>
          <span className="sr-only">404</span>
        </p>

        <h1 className="t-h1 notfound-title">This page doesn&rsquo;t exist.</h1>

        <p className="t-body-lg measure notfound-copy">
          The link may be broken, or the page may have moved. Everything else is
          still where you left it.
        </p>

        <div className="notfound-actions">
          <Link href="/" className="btn btn-accent">
            Back to home
          </Link>
          <Link href="/#contact" className="btn btn-ghost">
            Start a project
          </Link>
        </div>
      </div>

      <footer className="notfound-foot container">
        <span className="t-mono">Theerrv Technologies</span>
        <span className="t-mono">Dome for your vision</span>
      </footer>
    </main>
  );
}
