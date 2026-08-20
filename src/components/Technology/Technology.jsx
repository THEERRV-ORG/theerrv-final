import { technology } from "../../data/content";
import Reveal from "../shared/Reveal";
import styles from "./Technology.module.css";

export default function Technology() {
  return (
    <section className={styles.technology} data-bg="#04070f">
      <div className="container">
        <Reveal as="div" className={styles.panel}>
          <div className={styles.top}>
            <p className={`eyebrow ${styles.eyebrow}`}>{technology.eyebrow}</p>
            <h2 className={styles.heading}>{technology.heading}</h2>
          </div>

          <div className={styles.stack}>
            {technology.stack.map((row) => (
              <div key={row.label} className={styles.row}>
                <span className={styles.label}>{row.label}</span>
                <div className={styles.pills}>
                  {row.value.split(" / ").map((tech) => (
                    <span key={tech} className={styles.pill}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
