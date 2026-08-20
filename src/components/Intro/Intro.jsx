import { intro } from "../../data/content";
import Reveal from "../shared/Reveal";
import styles from "./Intro.module.css";

export default function Intro() {
  return (
    <section className={styles.intro} data-bg="#0a1630">
      <div className={`${styles.inner} container`}>
        <Reveal as="p" className={`eyebrow ${styles.eyebrow}`}>
          {intro.eyebrow}
        </Reveal>

        <Reveal as="div" delay={80} className={styles.lineRule} />

        <h2 className={styles.statement}>
          {intro.statement.map((line, i) => (
            <Reveal as="span" key={line} delay={120 + i * 110} className={styles.line}>
              {line}
            </Reveal>
          ))}
        </h2>

        <Reveal as="p" delay={420} className={styles.body}>
          {intro.body}
        </Reveal>
      </div>
    </section>
  );
}
