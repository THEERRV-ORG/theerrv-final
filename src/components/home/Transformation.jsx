import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Reveal from "../shared/Reveal";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { homeStory } from "../../data/content";
import styles from "./Transformation.module.css";

/**
 * Business Transformation — the engagement arc as a pinned timeline, ported from
 * the reference "How we work" section and restyled dark. The pane sticks while
 * one viewport of scroll advances one phase: the rail fills, the active node
 * grows, and the docking panel slides under it. Below lg / reduced motion it
 * degrades to a plain stacked list with the same content.
 */
export default function Transformation() {
  const { transform } = homeStory;
  const phases = transform.phases;
  const reduced = usePrefersReducedMotion();
  const [tall, setTall] = useState(true);

  useEffect(() => {
    // The pin needs enough vertical room to be worth it; width no longer gates
    // it, so phones get the same scroll-driven timeline (the rail adapts below).
    const mq = window.matchMedia("(min-height: 600px)");
    const on = () => setTall(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  return tall && !reduced ? (
    <Timeline transform={transform} phases={phases} />
  ) : (
    <StackedList transform={transform} phases={phases} />
  );
}

/* --- Header, shared ------------------------------------------------------- */
function Header({ transform }) {
  return (
    <div className={styles.header}>
      <Reveal as="p" className={`eyebrow ${styles.eyebrow}`}>
        {transform.eyebrow}
      </Reveal>
      <div className={styles.headerGrid}>
        <Reveal as="h2" delay={60} className={styles.heading}>
          {transform.heading}
        </Reveal>
        <Reveal as="p" delay={120} className={styles.lead}>
          {transform.lead}
        </Reveal>
      </div>
    </div>
  );
}

/* --- The pinned timeline -------------------------------------------------- */
function Timeline({ transform, phases }) {
  const N = phases.length;
  const nodeLeft = (i) => ((i + 0.5) / N) * 100;

  const sectionRef = useRef(null);
  const railRef = useRef(null);
  const dockRef = useRef(null);
  const fillRef = useRef(null);
  const [active, setActive] = useState(0);
  const [dockX, setDockX] = useState(0);
  const [connX, setConnX] = useState(0);

  // Active phase from how far the section has been scrolled through.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const p = total > 0 ? scrolled / total : 0;
      // Smooth, continuous fill: track raw scroll progress every frame and drive
      // the rail fill directly (no React re-render, no per-step transition). The
      // end of the fill travels from the first node centre to the last as p:0→1.
      if (fillRef.current) {
        const frac = N > 1 ? (0.5 + p * (N - 1)) / N : 1;
        fillRef.current.style.transform = `scaleX(${frac})`;
      }
      const i = Math.min(N - 1, Math.max(0, Math.floor(p * N * 0.999)));
      setActive((prev) => (prev === i ? prev : i));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [N]);

  // Slide the dock under the active node (clamped to the rail).
  useLayoutEffect(() => {
    const rail = railRef.current;
    const dock = dockRef.current;
    if (!rail || !dock) return;
    const railW = rail.clientWidth;
    const dockW = dock.offsetWidth;
    const centre = (nodeLeft(active) / 100) * railW;
    setDockX(Math.max(0, Math.min(centre - dockW / 2, railW - dockW)));
    setConnX(centre);
  }, [active, N]);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      /* One pinned viewport plus ~40svh of scroll per phase, so a single scroll
         advances one phase instead of the old ~80svh (which read as 2+ scrolls). */
      style={{ height: `calc(100svh + ${N} * 40svh)` }}
    >
      <div className={styles.sticky}>
        <div className="container">
          <Header transform={transform} />

          {/* Rail */}
          <div ref={railRef} className={styles.rail} aria-hidden="true">
            <div className={styles.railLine}>
              <span className={styles.track} />
              <span ref={fillRef} className={styles.fill} />
              {phases.map((phase, i) => (
                <span key={phase.id} className={styles.nodeWrap} style={{ left: `${nodeLeft(i)}%` }}>
                  <span className={styles.node} data-active={i === active ? "" : undefined} />
                </span>
              ))}
            </div>

            <div className={styles.labels}>
              {phases.map((phase, i) => (
                <div
                  key={phase.id}
                  className={styles.label}
                  data-active={i === active ? "" : undefined}
                  style={{ left: `${nodeLeft(i)}%` }}
                >
                  <span className={styles.labelIndex}>{phase.index}</span>
                  <span className={styles.labelTitle}>{phase.title}</span>
                </div>
              ))}
            </div>

            <span className={styles.connector} style={{ transform: `translateX(${connX}px)` }} />
          </div>

          {/* Dock — all panels stacked in one cell, active shown */}
          <div ref={dockRef} className={styles.dock} style={{ transform: `translateX(${dockX}px)` }}>
            {phases.map((phase, i) => (
              <article
                key={phase.id}
                className={styles.panel}
                data-active={i === active ? "" : undefined}
                aria-hidden={i !== active}
              >
                <PanelBody phase={phase} />
              </article>
            ))}
          </div>
        </div>
      </div>

      <p className={styles.srOnly} aria-live="polite">
        {`Outcome ${phases[active].index} of ${N}: ${phases[active].title}. ${phases[active].summary}`}
      </p>
    </section>
  );
}

function PanelBody({ phase }) {
  return (
    <>
      <div className={styles.panelHead}>
        <h3 className={styles.panelTitle}>{phase.title}</h3>
      </div>
      <p className={styles.summary}>{phase.summary}</p>
      <p className={styles.detail}>{phase.detail}</p>
      <p className={styles.receive}>You receive</p>
      <ul className={styles.deliverables}>
        {phase.deliverables.map((d) => (
          <li key={d}>
            <span className={styles.dash} aria-hidden="true" />
            {d}
          </li>
        ))}
      </ul>
    </>
  );
}

/* --- Stacked fallback ----------------------------------------------------- */
function StackedList({ transform, phases }) {
  return (
    <section className={styles.stacked}>
      <div className="container">
        <Header transform={transform} />
        <ol className={styles.stackList}>
          {phases.map((phase, i) => (
            <Reveal as="li" key={phase.id} delay={i * 40} className={styles.stackItem}>
              <div className={styles.stackHead}>
                <span className={styles.labelIndex}>{phase.index}</span>
                <h3 className={styles.panelTitle}>{phase.title}</h3>
              </div>
              <p className={styles.summary}>{phase.summary}</p>
              <p className={styles.detail}>{phase.detail}</p>
              <p className={styles.receive}>You receive</p>
              <ul className={styles.deliverables}>
                {phase.deliverables.map((d) => (
                  <li key={d}>
                    <span className={styles.dash} aria-hidden="true" />
                    {d}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
