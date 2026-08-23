import Reveal from "../shared/Reveal";
import styles from "./CardGrid.module.css";

/**
 * Glass card grid for capability blocks (Case Studies, Locations). Each item
 * takes { index, title, description, tags? }. `columns` controls the desktop
 * track count; the grid collapses to one column on narrow viewports.
 */
export default function CardGrid({ items, note, columns = 2 }) {
  return (
    <section className={styles.section}>
      <div className="container">
        {note && (
          <Reveal as="p" className={styles.note}>
            {note}
          </Reveal>
        )}
        <ul className={styles.grid} data-columns={columns}>
          {items.map((item, i) => (
            <Reveal as="li" key={item.index ?? item.title} delay={(i % columns) * 70} className={styles.card}>
              {item.index && <span className={styles.index}>{item.index}</span>}
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.description}>{item.description}</p>
              {item.tags && (
                <ul className={styles.tags}>
                  {item.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
              )}
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
