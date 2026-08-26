import { useState } from "react";
import Reveal from "../shared/Reveal";
import styles from "./FAQ.module.css";

/**
 * Accessible FAQ accordion, styled after the reference: a centred heading over a
 * full-width divider, then borderless rows separated by hairlines. One panel
 * open at a time; each row is a native <button> so keyboard and screen-reader
 * users get the expected semantics. A chevron marks state — down when closed,
 * flipped up when open.
 */
export default function FAQ({ eyebrow, heading, items, transparent = false }) {
  const [open, setOpen] = useState(null);

  return (
    <section className={`${styles.faq} ${transparent ? styles.bare : ""}`}>
      <div className="container">
        <div className={styles.header}>
          {eyebrow && <p className={`eyebrow ${styles.eyebrow}`}>{eyebrow}</p>}
          <Reveal as="h2" delay={60} className={styles.heading}>
            {heading}
          </Reveal>
        </div>

        <ul className={styles.list}>
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal as="li" key={item.q} delay={i * 50} className={styles.item}>
                <button
                  type="button"
                  className={styles.question}
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : i)}
                >
                  <span className={styles.qText}>{item.q}</span>
                  <svg
                    className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}
                    viewBox="0 0 16 16"
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3.5 6 8 10.5 12.5 6" />
                  </svg>
                </button>
                <div className={`${styles.answer} ${isOpen ? styles.answerOpen : ""}`}>
                  <p>{item.a}</p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
