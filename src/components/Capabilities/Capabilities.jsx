import { capabilities } from "../../data/content";
import Reveal from "../shared/Reveal";
import styles from "./Capabilities.module.css";

export default function Capabilities() {
  return (
    <section id="capabilities" className={styles.capabilities} data-bg="#f3f0e8">
      <div className={styles.glow} aria-hidden="true" />
      <div className="container">
        <div className={styles.header}>
          <Reveal as="p" className={`eyebrow ${styles.eyebrow}`}>
            {capabilities.eyebrow}
          </Reveal>
          <Reveal as="h2" delay={80} className={styles.heading}>
            {capabilities.heading}
          </Reveal>
        </div>

        <ul className={styles.grid}>
          {capabilities.items.map((item, i) => (
            <Reveal as="li" key={item.index} delay={i * 60} className={styles.card}>
              <span className={styles.index}>{item.index}</span>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.description}>{item.description}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
