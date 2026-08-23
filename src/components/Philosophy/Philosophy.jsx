import { philosophy } from "../../data/content";
import Reveal from "../shared/Reveal";
import PrincipleMark from "./PrincipleMark";
import styles from "./Philosophy.module.css";

export default function Philosophy() {
  return (
    <section id="approach" className={styles.philosophy} data-bg="#0d1a38">
      <div className={styles.glow} aria-hidden="true" />
      <div className="container">
        <div className={styles.header}>
          <Reveal as="p" className={`eyebrow ${styles.eyebrow}`}>
            {philosophy.eyebrow}
          </Reveal>
          <h2 className={styles.heading}>
            {philosophy.heading.map((line, i) => (
              <Reveal as="span" key={line} delay={80 + i * 100} className={styles.line}>
                {line}
              </Reveal>
            ))}
          </h2>
          {philosophy.lead && (
            <Reveal as="p" delay={280} className={styles.lead}>
              {philosophy.lead}
            </Reveal>
          )}
        </div>

        <ul className={styles.grid}>
          {philosophy.principles.map((p, i) => (
            <Reveal as="li" key={p.index} delay={i * 100} className={styles.card}>
              <PrincipleMark index={p.index} />
              <span className={styles.index}>{p.index}</span>
              <h3 className={styles.title}>{p.title}</h3>
              <p className={styles.description}>{p.description}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
