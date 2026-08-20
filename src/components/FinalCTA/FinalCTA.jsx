import { finalCta } from "../../data/content";
import Reveal from "../shared/Reveal";
import styles from "./FinalCTA.module.css";

export default function FinalCTA() {
  return (
    <section id="contact" className={styles.cta} data-bg="#0a1630">
      <div className={`${styles.orb} ${styles.orbGold}`} aria-hidden="true" />
      <div className={`${styles.orb} ${styles.orbCoral}`} aria-hidden="true" />

      <div className={`${styles.inner} container`}>
        <Reveal as="div" className={styles.panel}>
          <h2 className={styles.statement}>
            {finalCta.statement.map((line) => (
              <span key={line} className={styles.line}>
                {line}
              </span>
            ))}
          </h2>

          <p className={styles.body}>{finalCta.body}</p>

          <a href={finalCta.cta.href} className={styles.link}>
            {finalCta.cta.label} <span aria-hidden="true">→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
