import { Link } from "react-router-dom";
import Reveal from "../shared/Reveal";
import styles from "./ServicesShowcase.module.css";

/**
 * Services showcase: a two-column editorial layout — a sticky intro on the left
 * (eyebrow, accented headline, lead) and a numbered service list on the right,
 * each row with an icon tile, category label, title, description, a trailing
 * arrow, and a connecting timeline rail down the numbers.
 */
export default function ServicesShowcase({ showcase }) {
  const { eyebrow, headline, accent, lead, items } = showcase;

  return (
    <section className={styles.section}>
      <div className={`${styles.grid} container`}>
        <aside className={styles.intro}>
          <p className={styles.eyebrow}>
            {eyebrow}
            <span className={styles.eyebrowLine} aria-hidden="true" />
          </p>
          <h1 className={styles.headline}>
            {headline.map((line) => (
              <span key={line} className={styles.line}>
                {line}
              </span>
            ))}{" "}
            <span className={styles.accent}>{accent}</span>
            <span className={styles.dot}>.</span>
          </h1>
          <p className={styles.lead}>{lead}</p>
        </aside>

        <ol className={styles.list}>
          {items.map((it, i) => (
            <Reveal as="li" key={it.index} delay={i * 40} className={styles.row}>
              <Link
                to={it.slug ? `/services/${it.slug}` : "/services"}
                className={styles.rowLink}
                aria-label={`${it.title} — learn more`}
              >
                <span className={styles.num}>{it.index}</span>
                <div className={styles.body}>
                  <p className={styles.category}>{it.category}</p>
                  <h3 className={styles.title}>{it.title}</h3>
                  <p className={styles.desc}>{it.description}</p>
                </div>
                <span className={styles.arrow} aria-hidden="true">
                  →
                </span>
              </Link>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
