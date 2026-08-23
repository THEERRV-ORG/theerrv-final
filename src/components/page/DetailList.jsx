import Reveal from "../shared/Reveal";
import styles from "./DetailList.module.css";

/**
 * Numbered detail rows used for the Services and Solutions pages. Each entry
 * shows a large index, a title, a subtitle, and a description in a two-column
 * layout that collapses to a stack on narrow viewports.
 */
export default function DetailList({ items }) {
  return (
    <section className={styles.section}>
      <div className="container">
        <ul className={styles.list}>
          {items.map((item, i) => (
            <Reveal as="li" key={item.index} delay={(i % 3) * 60} className={styles.row}>
              <div className={styles.aside}>
                <span className={styles.index}>{item.index}</span>
              </div>
              <div className={styles.body}>
                <h2 className={styles.title}>{item.title}</h2>
                <p className={styles.subtitle}>{item.subtitle}</p>
                <p className={styles.description}>{item.description}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
