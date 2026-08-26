import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import Reveal from "../shared/Reveal";
import OperatingSystem from "./os/OperatingSystem";
import { homeStory } from "../../data/content";
import styles from "./CoreServices.module.css";

/**
 * Core Services — the capability index as a live operating system. The numbered
 * service list on the left drives a morphing architecture blueprint on the
 * right. On a wide, fine-pointer screen the active row follows hover/focus; on
 * everything else it follows scroll via an IntersectionObserver, since the
 * sheet leads the list there rather than sitting beside it.
 */
export default function CoreServices() {
  const { services } = homeStory;
  const items = services.items;
  const [active, setActive] = useState(0);
  const [hoverDriven, setHoverDriven] = useState(true);
  const rowRefs = useRef([]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    const on = () => setHoverDriven(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  useEffect(() => {
    if (hoverDriven) return;
    const els = rowRefs.current.filter(Boolean);
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          const i = els.indexOf(e.target);
          if (i >= 0) setActive(i);
        }
      },
      { rootMargin: "-38% 0px -46% 0px", threshold: 0 },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [hoverDriven]);

  return (
    <section className={styles.section}>
      <div className={`${styles.grid} container`}>
        <div className={styles.intro}>
          <Reveal as="p" className={`eyebrow ${styles.eyebrow}`}>
            {services.eyebrow}
          </Reveal>
          <Reveal as="h2" delay={60} className={styles.heading}>
            {services.heading}
          </Reveal>
          <Reveal as="p" delay={120} className={styles.lead}>
            {services.lead}
          </Reveal>
        </div>

        <div className={styles.sheet}>
          <OperatingSystem service={items[active]} />
        </div>

        <ol className={styles.list}>
          {items.map((it, i) => (
            <li key={it.id}>
              <Link
                to="/services"
                ref={(el) => {
                  rowRefs.current[i] = el;
                }}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                data-active={i === active ? "" : undefined}
                className={styles.row}
              >
                <span className={styles.rowRule} aria-hidden="true" />
                <span className={styles.num}>{it.index}</span>
                <span className={styles.rowBody}>
                  <span className={styles.title}>{it.title}</span>
                  <span className={styles.outcome}>{it.outcome}</span>
                </span>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
