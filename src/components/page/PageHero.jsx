import Reveal from "../shared/Reveal";
import styles from "./PageHero.module.css";

/**
 * Interior-page hero: eyebrow, two-line headline (last line rendered in the
 * gold→coral accent gradient), and a lead paragraph. Dark glass canvas with
 * the same drifting orbs used on the home hero, kept lighter-weight.
 */
export default function PageHero({ eyebrow, headline, lead }) {
  return (
    <section className={styles.hero} data-nav-hero>
      <div className={`${styles.orb} ${styles.orbGold}`} aria-hidden="true" />
      <div className={`${styles.orb} ${styles.orbCoral}`} aria-hidden="true" />

      <div className={`${styles.inner} container`}>
        <Reveal as="p" className={`eyebrow ${styles.eyebrow}`}>
          {eyebrow}
        </Reveal>

        <h1 className={styles.headline}>
          {headline.map((line, i) => (
            <Reveal
              as="span"
              key={line}
              delay={80 + i * 90}
              className={`${styles.line} ${i === headline.length - 1 ? styles.accent : ""}`}
            >
              {line}
            </Reveal>
          ))}
        </h1>

        {lead && (
          <Reveal as="p" delay={260} className={styles.lead}>
            {lead}
          </Reveal>
        )}
      </div>
    </section>
  );
}
