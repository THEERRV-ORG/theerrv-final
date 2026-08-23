import { useCallback, useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { nav } from "../../data/content";
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
  const [accordion, setAccordion] = useState(null);

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
     route change because each page mounts its own hero sentinel. */
  useEffect(() => {
    const hero = document.querySelector("[data-nav-hero]");
    if (!hero) {
      const frame = requestAnimationFrame(() => setSolid(true));
      return () => cancelAnimationFrame(frame);
    }
    setSolid(false);
    const observer = new IntersectionObserver(
      ([entry]) => setSolid(!entry.isIntersecting),
      { rootMargin: "-72px 0px 0px 0px", threshold: 0 },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, [pathname]);

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
            <Link to={nav.cta.to} className={`${styles.btn} ${styles.btnAccent} ${styles.navCta}`}>
              {nav.cta.label}
            </Link>
            <button
              type="button"
              className={styles.toggle}
              aria-expanded={drawer}
              aria-controls="nav-drawer"
              onClick={() => setDrawer((v) => !v)}
            >
              <span className={styles.srOnly}>{drawer ? "Close menu" : "Open menu"}</span>
              <span className={styles.toggleBar} data-open={drawer} />
              <span className={styles.toggleBar} data-open={drawer} />
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

      {/* Mobile drawer — mega items become accordions. */}
      <div id="nav-drawer" className={styles.drawer} data-open={drawer}>
        <nav aria-label="Mobile">
          {nav.links.map((item) =>
            item.mega ? (
              <div key={item.label} className={styles.drawerGroup}>
                <button
                  type="button"
                  className={styles.drawerSummary}
                  aria-expanded={accordion === item.label}
                  onClick={() =>
                    setAccordion((v) => (v === item.label ? null : item.label))
                  }
                >
                  {item.label}
                  <Chevron open={accordion === item.label} />
                </button>
                <div className={styles.drawerPanel} data-open={accordion === item.label}>
                  <div className={styles.drawerPanelInner}>
                    <Link to={item.to} onClick={closeAll} className={styles.drawerAll}>
                      All {item.label}
                    </Link>
                    {item.mega.items.map((child) => (
                      <Link key={child.label} to={child.to} onClick={closeAll}>
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link key={item.label} to={item.to} onClick={closeAll} className={styles.drawerLink}>
                {item.label}
              </Link>
            ),
          )}
          <Link to={nav.cta.to} className={`${styles.btn} ${styles.btnAccent}`} onClick={closeAll}>
            {nav.cta.label}
          </Link>
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
