"use client";

import { useEffect, useState } from "react";

import { nav } from "@/lib/content";
import { Logo } from "./Logo";

/**
 * Sticky navigation.
 *
 * Two states. Over the ink cinematic block it is transparent with white type so
 * nothing interrupts the opening shot; once past it the blurred white bar takes
 * over. That blur is the one place the design system permits it.
 */
export function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const cinema = document.querySelector("#cinema");
    if (!cinema) {
      setSolid(true);
      return;
    }

    // Flip when the bottom of the cinematic block passes under the nav.
    const observer = new IntersectionObserver(
      ([entry]) => setSolid(!entry.isIntersecting),
      { rootMargin: "-72px 0px 0px 0px", threshold: 0 },
    );
    observer.observe(cinema);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="nav" data-solid={solid ? "true" : "false"}>
      <div className="nav-inner container">
        <a href="#top" className="nav-logo" aria-label="Theerrv Technologies, home">
          <Logo mark onInk={!solid} />
        </a>

        <nav className="nav-links" aria-label="Primary">
          {nav.map((item) => (
            <a key={item.href} href={item.href} className="link-nav">
              {item.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <a href="#contact" className="btn btn-accent nav-cta">
            Start a project
          </a>
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={open}
            aria-controls="nav-drawer"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span className="nav-toggle-bar" data-open={open} />
            <span className="nav-toggle-bar" data-open={open} />
          </button>
        </div>
      </div>

      <div id="nav-drawer" className="nav-drawer" data-open={open}>
        <nav aria-label="Mobile">
          {nav.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
          <a
            href="#contact"
            className="btn btn-accent"
            onClick={() => setOpen(false)}
          >
            Start a project
          </a>
        </nav>
      </div>
    </header>
  );
}
