import { homeStory } from "../../data/content";
import Reveal from "../shared/Reveal";
import styles from "./WhyTheerrv.module.css";

export default function WhyTheerrv() {
  const { why } = homeStory;

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.grid}>

          {/* ---- Left: headline + intro ---- */}
          <div className={styles.left}>
            <Reveal as="p" className={`eyebrow ${styles.eyebrow}`}>
              {why.eyebrow}
            </Reveal>

            <Reveal as="h2" delay={60} className={styles.headline}>
              <span className={styles.headLine1}>{why.lead[0]}</span>
              <span className={styles.headLine2}>{why.lead[1]}</span>
            </Reveal>

            {why.intro && (
              <Reveal as="p" delay={140} className={styles.intro}>
                {why.intro}
              </Reveal>
            )}
          </div>

          {/* ---- Right: the five differentiators ---- */}
          <ol className={styles.rail} role="list">
            {why.points.map((p) => (
              <li key={p.index} className={styles.row}>
                <div className={styles.rowInner}>
                  <span className={styles.circle} aria-hidden="true">
                    <span className={styles.circleNum}>{p.index}</span>
                  </span>

                  <span className={styles.rowBody}>
                    <span className={styles.statement}>{p.statement}</span>
                    <span className={styles.detail}>{p.detail}</span>
                  </span>
                </div>
              </li>
            ))}
          </ol>

        </div>
      </div>
    </section>
  );
}
