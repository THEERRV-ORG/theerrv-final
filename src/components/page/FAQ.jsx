import { useState } from "react";
import Reveal from "../shared/Reveal";
import styles from "./FAQ.module.css";

/**
 * Accessible FAQ accordion. One panel open at a time; each row is a native
 * <button> so keyboard and screen-reader users get the expected semantics.
 */
export default function FAQ({ eyebrow, heading, items }) {
  const [open, setOpen] = useState(null);

  return (
    <section className={styles.faq}>
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
                  <span>{item.q}</span>
                  <span className={`${styles.icon} ${isOpen ? styles.iconOpen : ""}`} aria-hidden="true">
                    +
                  </span>
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
