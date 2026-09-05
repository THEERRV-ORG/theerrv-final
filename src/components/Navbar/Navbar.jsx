import { useCallback, useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { nav, footer } from "../../data/content";
import styles from "./Navbar.module.css";

/**
 * Primary navigation, ported from theerrv-site and restyled for the dark-glass
 * theme. Three bar states: transparent over a dark hero, a floating glass card
 * once scrolled past it, and the mega panel (always the glass card treatment).
 * Two items open a mega dropdown on hover-intent / click; the rest are direct
 * router links. Below 1024px everything collapses into a slide-in drawer whose
 * mega items become accordions.
 */

const OPEN_DELAY = 90;
const CLOSE_DELAY = 180;

function slug(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

export default function Navbar() {
  const [solid, setSolid] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [openMega, setOpenMega] = useState(null);
  const [hidden, setHidden] = useState(false);

  const headerRef = useRef(null);
  const timer = useRef(null);
  const { pathname } = useLocation();

  const clearTimer = () => {
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
    }
  };

  const scheduleOpen = useCallback((label) => {
    clearTimer();
    timer.current = setTimeout(() => setOpenMega(label), OPEN_DELAY);
  }, []);

  const scheduleClose = useCallback(() => {
    clearTimer();
    timer.current = setTimeout(() => setOpenMega(null), CLOSE_DELAY);
  }, []);

  /* Bar state: transparent over the dark hero, floating card past it. Re-run on
     route change because each page mounts its own hero sentinel.

     The sentinel ([data-nav-hero]) lives inside the page component, which is a
     lazily-loaded chunk — so on a cold production load it is NOT in the DOM yet
     when this effect first runs (the navbar is eager, the page chunk arrives
     over the network a moment later). A one-shot querySelector would miss it and
     the bar would be stuck in the wrong state, blur and all. So: attach the
     IntersectionObserver if the hero is already here, otherwise watch for it to
     mount and attach then; if it never appears, treat the route as heroless. */
  useEffect(() => {
    let io; // watches the hero's visibility once found
    let mo; // waits for a lazily-mounted hero to appear
    let stopWatching; // stops the wait once any lazy chunk has surely mounted

    const attach = (hero) => {
      if (mo) mo.disconnect();
      clearTimeout(stopWatching);
      setSolid(false);
      io = new IntersectionObserver(
        ([entry]) => setSolid(!entry.isIntersecting),
        { rootMargin: "-72px 0px 0px 0px", threshold: 0 },
      );
      io.observe(hero);
    };

    const hero = document.querySelector("[data-nav-hero]");
    if (hero) {
      attach(hero);
    } else {
      // No sentinel yet. Default to the solid bar immediately (correct for
      // routes that have no hero, e.g. /services), but keep watching: on a cold
      // production load the page hero lives in a code-split chunk that mounts a
      // moment later, and when it does we switch to observing it. Stop watching
      // after a few seconds, by which point any chunk has arrived.
      setSolid(true);
      mo = new MutationObserver(() => {
        const late = document.querySelector("[data-nav-hero]");
        if (late) attach(late);
      });
      mo.observe(document.body, { childList: true, subtree: true });
      stopWatching = setTimeout(() => mo.disconnect(), 4000);
    }

    return () => {
      if (io) io.disconnect();
      if (mo) mo.disconnect();
      clearTimeout(stopWatching);
    };
  }, [pathname]);

  /* Hide the bar on scroll-down, reveal it on scroll-up or near the top. */
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y < 80) setHidden(false);
      else if (y > lastY + 5) setHidden(true);
      else if (y < lastY - 5) setHidden(false);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Moving the pointer up to the top edge brings the bar back. */
  useEffect(() => {
    const onMove = (e) => {
      if (e.clientY < 90) setHidden(false);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  /* Escape closes the innermost open layer first. */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      if (openMega) {
        setOpenMega(null);
        headerRef.current
          ?.querySelector(`[data-mega-trigger="${openMega}"]`)
          ?.focus();
      } else if (drawer) {
        setDrawer(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openMega, drawer]);

  /* A click outside the header dismisses the panel. */
  useEffect(() => {
    if (!openMega) return;
    const onDown = (e) => {
      if (!headerRef.current?.contains(e.target)) setOpenMega(null);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [openMega]);

  /* Lock the page while the mobile drawer owns the screen. */
  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawer]);

  /* Close everything on navigation. */
  useEffect(() => {
    setDrawer(false);
    setOpenMega(null);
  }, [pathname]);

  useEffect(() => clearTimer, []);

  const closeAll = () => {
    setDrawer(false);
    setOpenMega(null);
  };

  return (
    <header
      ref={headerRef}
      className={styles.nav}
      data-solid={solid ? "true" : "false"}
      data-mega={openMega ? "true" : "false"}
      data-hidden={hidden && !drawer && !openMega ? "true" : "false"}
      onMouseLeave={scheduleClose}
    >
      <div className={styles.shell}>
        <div className={styles.inner}>
          <Link to="/" className={styles.logo} aria-label="Theerrv Technologies, home" onClick={closeAll}>
            <img src="/logo-mark-ivory.png" alt="" aria-hidden="true" className={styles.logoMark} width="34" height="21" />
            <span className={styles.logoWord}>
              THEERR<span className={styles.logoV}>V</span>
            </span>
          </Link>

          <nav className={styles.links} aria-label="Primary">
            {nav.links.map((item) =>
              item.mega ? (
                <div
                  key={item.label}
                  className={styles.item}
                  onMouseEnter={() => scheduleOpen(item.label)}
                >
                  <button
                    type="button"
                    className={`${styles.linkNav} ${styles.trigger}`}
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
              ) : (
                <NavLink
                  key={item.label}
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    `${styles.linkNav} ${isActive ? styles.active : ""}`
                  }
                >
                  {item.label}
                </NavLink>
              ),
            )}
          </nav>

          <div className={styles.actions}>
            {/* Contact is a plain nav link now (see nav.links), so the bar has
                no accent button on desktop. */}
            <button
              type="button"
              className={styles.toggle}
              aria-expanded={drawer}
              aria-controls="nav-drawer"
              onClick={() => setDrawer((v) => !v)}
            >
              <span className={styles.srOnly}>{drawer ? "Close menu" : "Open menu"}</span>
              <span className={styles.toggleBar} data-open={drawer} data-bar="top" />
              <span className={styles.toggleBar} data-open={drawer} data-bar="bottom" />
            </button>
          </div>
        </div>

        {/* Mega panels — one per mega item so each keeps its own id. */}
        {nav.links.map((item) =>
          item.mega ? (
            <div
              key={item.label}
              id={`mega-${slug(item.label)}`}
              className={styles.mega}
              data-open={openMega === item.label}
              hidden={openMega !== item.label}
              onMouseEnter={clearTimer}
            >
              <div className={styles.megaInner}>
                <div className={styles.megaLead}>
                  <p className={styles.megaEyebrow}>
                    <span className={styles.megaRule} aria-hidden="true" />
                    {item.mega.eyebrow}
                  </p>
                  <p className={styles.megaTitle}>
                    {item.mega.title.map((line, i) => (
                      <span key={line} className={styles.megaTitleLine}>
                        {line}
                        {i === item.mega.title.length - 1 ? (
                          <span className={styles.megaDot}>.</span>
                        ) : null}
                      </span>
                    ))}
                  </p>
                  <p className={styles.megaBody}>{item.mega.body}</p>
                  <Link to={item.mega.cta.to} className={styles.megaCta} onClick={closeAll}>
                    {item.mega.cta.label}
                    <Arrow />
                  </Link>
                </div>

                <ul className={styles.megaGrid}>
                  {item.mega.items.map((child) => (
                    <li key={child.label}>
                      <Link to={child.to} className={styles.megaCard} onClick={closeAll}>
                        <span className={styles.megaCardTitle}>{child.label}</span>
                        <span className={styles.megaCardBody}>{child.body}</span>
                        <Arrow className={styles.megaCardArrow} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : null,
        )}
      </div>

      {/* Mobile drawer — full-screen cinematic overlay. */}
      <div id="nav-drawer" className={styles.drawer} data-open={drawer} aria-hidden={!drawer}>
        <div className={styles.drawerGlow} aria-hidden="true" />
        <nav className={styles.drawerNav} aria-label="Mobile">
          <ul className={styles.drawerList}>
            {nav.links.map((item, i) => (
              <li key={item.label} className={styles.drawerItem} style={{ "--i": i }}>
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  onClick={closeAll}
                  className={({ isActive }) =>
                    `${styles.drawerLink} ${isActive ? styles.drawerLinkActive : ""}`
                  }
                >
                  <span className={styles.drawerText}>{item.label}</span>
                  <span className={styles.drawerArrow} aria-hidden="true">→</span>
                </NavLink>
              </li>
            ))}
          </ul>

          <div className={styles.drawerFoot} style={{ "--i": nav.links.length }}>
            <Link to="/contact" className={styles.drawerCta} onClick={closeAll}>
              Start your project <span aria-hidden="true">→</span>
            </Link>
            <a href={`mailto:${footer.email}`} className={styles.drawerMail}>
              {footer.email}
            </a>
            <div className={styles.drawerSocial}>
              {footer.social.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer noopener">
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

function Chevron({ open }) {
  return (
    <svg className={styles.chevron} data-open={open} viewBox="0 0 10 6" aria-hidden="true" focusable="false">
      <path d="M1 1L5 5L9 1" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function Arrow({ className = "" }) {
  return (
    <svg className={`${styles.arrow} ${className}`.trim()} viewBox="0 0 16 10" aria-hidden="true" focusable="false">
      <path d="M0 5h14M10 1l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
