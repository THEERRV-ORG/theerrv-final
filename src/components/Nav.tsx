"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { nav } from "@/lib/content";
import { Logo } from "./Logo";

/**
 * Primary navigation.
 *
 * Three states rather than two. Over the ink cinematic block the bar is
 * transparent with white type, so nothing interrupts the opening shot; once
 * past it the bar detaches into a floating white card inset from the viewport
 * edges. The third state is the mega panel, which is always a light card
 * regardless of what the bar itself is doing — a translucent panel over the 3D
 * scene is unreadable, and the panel is content rather than chrome.
 *
 * Pointer and keyboard are handled as separate concerns on purpose. Hover opens
 * the panel on fine pointers with a short intent delay so a cursor crossing the
 * bar diagonally does not flash three panels open on its way past. Keyboard and
 * touch both go through click, which toggles.
 */

/** Hover-intent delays. Short enough to feel immediate, long enough to ignore a
 *  cursor that is only passing through. */
const OPEN_DELAY = 90;
const CLOSE_DELAY = 180;

export function Nav() {
  const [solid, setSolid] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [openMega, setOpenMega] = useState<string | null>(null);
  const [accordion, setAccordion] = useState<string | null>(null);

  const headerRef = useRef<HTMLElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = () => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  };

  const scheduleOpen = useCallback((label: string) => {
    clearTimer();
    timer.current = setTimeout(() => setOpenMega(label), OPEN_DELAY);
  }, []);

  const scheduleClose = useCallback(() => {
    clearTimer();
    timer.current = setTimeout(() => setOpenMega(null), CLOSE_DELAY);
  }, []);

  /* --- Bar state: transparent over the cinematic block, floating past it. --- */
  useEffect(() => {
    const cinema = document.querySelector("#cinema");
    if (!cinema) {
      // No cinematic block on this route, so the bar starts detached. Deferred
      // to a frame rather than set inline: a synchronous setState in an effect
      // body forces a second render pass before paint.
      const frame = requestAnimationFrame(() => setSolid(true));
      return () => cancelAnimationFrame(frame);
    }
    const observer = new IntersectionObserver(
      ([entry]) => setSolid(!entry.isIntersecting),
      { rootMargin: "-72px 0px 0px 0px", threshold: 0 },
    );
    observer.observe(cinema);
    return () => observer.disconnect();
  }, []);

  /* --- Escape closes whichever layer is open, innermost first. -------------- */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (openMega) {
        setOpenMega(null);
        // Return focus to the trigger so the keyboard user is not dropped at
        // the top of the document.
        headerRef.current
          ?.querySelector<HTMLButtonElement>(`[data-mega-trigger="${openMega}"]`)
          ?.focus();
      } else if (drawer) {
        setDrawer(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openMega, drawer]);

  /* --- A click anywhere outside the header dismisses the panel. ------------- */
  useEffect(() => {
    if (!openMega) return;
    const onDown = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setOpenMega(null);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [openMega]);

  /* --- Lock the page while the mobile drawer owns the screen. --------------- */
  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawer]);

  useEffect(() => clearTimer, []);

  const closeAll = () => {
    setDrawer(false);
    setOpenMega(null);
  };

  return (
    <header
      ref={headerRef}
      className="nav"
      data-solid={solid ? "true" : "false"}
      data-mega={openMega ? "true" : "false"}
      onMouseLeave={scheduleClose}
    >
      <div className="nav-shell">
        <div className="nav-inner">
          <a href="#top" className="nav-logo" aria-label="Theerrv Technologies, home">
            <Logo mark onInk={!solid && !openMega} />
          </a>

          <nav className="nav-links" aria-label="Primary">
            {nav.map((item) =>
              item.mega ? (
                <div
                  key={item.label}
                  className="nav-item"
                  onMouseEnter={() => scheduleOpen(item.label)}
                >
                  <button
                    type="button"
                    className="link-nav nav-trigger"
                    data-mega-trigger={item.label}
                    aria-expanded={openMega === item.label}
                    aria-controls={`mega-${slug(item.label)}`}
                    onClick={() => {
                      clearTimer();
                      setOpenMega((v) => (v === item.label ? null : item.label));
                    }}
                  >
                    {item.label}
                    <Chevron open={openMega === item.label} />
                  </button>
                </div>
              ) : item.pending ? (
                <span key={item.label} className="link-nav is-pending" aria-disabled="true">
                  {item.label}
                </span>
              ) : (
                <a key={item.label} href={item.href} className="link-nav">
                  {item.label}
                </a>
              ),
            )}
          </nav>

          <div className="nav-actions">
            <a href="#contact" className="btn btn-accent nav-cta">
              Start a project
            </a>
            <button
              type="button"
              className="nav-toggle"
              aria-expanded={drawer}
              aria-controls="nav-drawer"
              onClick={() => setDrawer((v) => !v)}
            >
              <span className="sr-only">{drawer ? "Close menu" : "Open menu"}</span>
              <span className="nav-toggle-bar" data-open={drawer} />
              <span className="nav-toggle-bar" data-open={drawer} />
            </button>
          </div>
        </div>

        {/* --- Mega panels. Mounted per item so each keeps its own id. ------- */}
        {nav.map((item) =>
          item.mega ? (
            <div
              key={item.label}
              id={`mega-${slug(item.label)}`}
              className="mega"
              data-open={openMega === item.label}
              hidden={openMega !== item.label}
              onMouseEnter={clearTimer}
            >
              <div className="mega-inner">
                <div className="mega-lead">
                  <p className="mega-eyebrow">
                    <span className="mega-rule" aria-hidden="true" />
                    {item.mega.eyebrow}
                  </p>
                  <p className="mega-title">
                    {item.mega.title.map((line, i) => (
                      <span key={line} className="mega-title-line">
                        {line}
                        {i === item.mega!.title.length - 1 ? (
                          <span className="mega-dot">.</span>
                        ) : null}
                      </span>
                    ))}
                  </p>
                  <p className="mega-body">{item.mega.body}</p>
                  <a href={item.mega.cta.href} className="mega-cta" onClick={closeAll}>
                    {item.mega.cta.label}
                    <Arrow />
                  </a>
                </div>

                <ul className="mega-grid">
                  {item.mega.items.map((child) => (
                    <li key={child.label}>
                      <a href={child.href} className="mega-card" onClick={closeAll}>
                        <span className="mega-card-title">{child.label}</span>
                        <span className="mega-card-body">{child.body}</span>
                        <Arrow className="mega-card-arrow" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null,
        )}
      </div>

      {/* --- Mobile drawer. Mega items become accordions. -------------------- */}
      <div id="nav-drawer" className="nav-drawer" data-open={drawer}>
        <nav aria-label="Mobile">
          {nav.map((item) =>
            item.mega ? (
              <div key={item.label} className="drawer-group">
                <button
                  type="button"
                  className="drawer-summary"
                  aria-expanded={accordion === item.label}
                  onClick={() =>
                    setAccordion((v) => (v === item.label ? null : item.label))
                  }
                >
                  {item.label}
                  <Chevron open={accordion === item.label} />
                </button>
                {/* One child only — the collapse animates grid-template-rows
                    from 0fr to 1fr, which needs a single row to measure. */}
                <div className="drawer-panel" data-open={accordion === item.label}>
                  <div className="drawer-panel-inner">
                    {item.mega.items.map((child) => (
                      <a key={child.label} href={child.href} onClick={closeAll}>
                        {child.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ) : item.pending ? (
              <span key={item.label} className="is-pending" aria-disabled="true">
                {item.label}
              </span>
            ) : (
              <a key={item.label} href={item.href} onClick={closeAll}>
                {item.label}
              </a>
            ),
          )}
          <a href="#contact" className="btn btn-accent" onClick={closeAll}>
            Start a project
          </a>
        </nav>
      </div>
    </header>
  );
}

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className="nav-chevron"
      data-open={open}
      viewBox="0 0 10 6"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M1 1L5 5L9 1" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function Arrow({ className }: { className?: string }) {
  return (
    <svg
      className={`nav-arrow ${className ?? ""}`}
      viewBox="0 0 16 10"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M0 5h14M10 1l4 4-4 4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}
