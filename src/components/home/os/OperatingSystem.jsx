import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../../../hooks/usePrefersReducedMotion";
import { CAPABILITIES, GRID_H, GRID_W, STATES, linkPath } from "./osStates";
import styles from "./OperatingSystem.module.css";

/**
 * The Theerrv Operating System — one canvas, eight cells, eight states. The
 * cells never unmount: switching the active service rewrites their geometry and
 * words in place, and CSS interpolates from one arrangement to the next. Ported
 * from the reference project and restyled for the dark-glass theme.
 */
export default function OperatingSystem({ service }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const [isWide, setIsWide] = useState(true);
  const prefersReduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      rootMargin: "120px",
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const on = () => setIsWide(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  const state = STATES[service.id] ?? STATES["product-engineering"];
  const alive = inView && !prefersReduced;
  const links = isWide ? state.links : state.links.slice(0, state.coreLinks);

  return (
    <div className={styles.panel}>
      <div className={styles.chrome}>
        <p className={styles.chromeTitle}>Theerrv Operating System</p>
        <p className={styles.chromeIndex}>{service.index}</p>
      </div>

      <ul className={styles.caps}>
        {CAPABILITIES.map((cap, i) => {
          const on = i === state.capability;
          return (
            <li key={cap} className={`${styles.cap} ${on ? styles.capOn : ""}`}>
              {on ? <span aria-hidden="true" className={styles.capDot}>•</span> : null}
              {cap}
            </li>
          );
        })}
      </ul>

      <div
        ref={ref}
        className={styles.canvas}
        style={{ aspectRatio: `${GRID_W} / ${GRID_H}` }}
      >
        <svg viewBox={`0 0 ${GRID_W} ${GRID_H}`} className={styles.links} aria-hidden="true" focusable="false">
          {links.map(([a, b], i) => {
            const d = linkPath(state.cells[a], state.cells[b]);
            return (
              <g key={`${service.id}-${a}-${b}`}>
                <path className={styles.link} d={d} pathLength={100} fill="none" strokeWidth={0.5} style={{ "--i": i }} />
                {alive && (
                  <path className={styles.packet} d={d} pathLength={100} fill="none" strokeWidth={1.4} strokeLinecap="round" style={{ "--i": i }} />
                )}
              </g>
            );
          })}
        </svg>

        {state.cells.map((cell, i) => (
          <OsCell key={`os-cell-${i}`} cell={cell} alive={alive} />
        ))}
      </div>

      <p className={styles.srOnly} aria-live="polite">
        {`${service.title}: ${state.cells.map((c) => c.label).join(", ")}.`}
      </p>

      <p className={styles.outcome}>{service.outcome}</p>
    </div>
  );
}

function OsCell({ cell, alive }) {
  const pct = (v, total) => `${(v / total) * 100}%`;

  return (
    <div
      className={`${styles.cell} ${cell.flag === "alert" ? styles.cellAlert : ""}`}
      style={{
        left: pct(cell.x, GRID_W),
        top: pct(cell.y, GRID_H),
        width: pct(cell.w, GRID_W),
        height: pct(cell.h, GRID_H),
      }}
    >
      <span key={cell.label} className={`${styles.swap} ${styles.cellHead}`}>
        <span className={styles.cellLabel}>{cell.label}</span>
        {cell.flag === "mark" ? (
          <svg aria-hidden="true" viewBox="0 0 12 12" className={styles.mark} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M2 6.5 4.8 9 10 3.5" />
          </svg>
        ) : null}
      </span>

      {cell.value ? (
        <span key={`v-${cell.value}`} className={`${styles.swap} ${styles.cellValue}`}>
          {cell.value}
        </span>
      ) : null}

      {cell.meta ? (
        <span key={`m-${cell.meta}`} className={`${styles.swap} ${styles.cellMeta}`}>
          {cell.meta}
        </span>
      ) : null}

      {cell.flag === "alert" ? (
        <span className={styles.alert}>
          <span className={`${styles.alertA}`}>1 active</span>
          <span className={`${styles.alertB}`}>Resolved</span>
        </span>
      ) : null}

      {cell.bar !== undefined ? (
        <span aria-hidden="true" className={styles.barTrack}>
          <span className={styles.bar} style={{ width: `${Math.round(cell.bar * 100)}%` }} />
        </span>
      ) : null}

      {alive && cell.value ? <span aria-hidden="true" className={styles.pulse} /> : null}
    </div>
  );
}
