import { Link } from "react-router-dom";
import CTABand from "../components/page/CTABand";
import Reveal from "../components/shared/Reveal";
import usePageTitle from "../hooks/usePageTitle";
import { insightsPage } from "../data/content";
import { articles } from "../data/insights";
import styles from "./InsightsPage.module.css";

/**
 * Insights — "Cover Cards" index (Direction 03). A gallery of cover tiles on the
 * fixed lit ground. Case studies live on their own page, so this shows only blog
 * posts (everything not tagged `category: Case Study`). A post's `cover` image is
 * used when present; otherwise the stylesheet paints a themed gradient cover, so
 * the grid reads as designed even before art is commissioned.
 */
export default function InsightsPage() {
  usePageTitle(insightsPage.seoTitle, insightsPage.seoDescription);
  const { hero, featuredIntro, cta } = insightsPage;

  const posts = articles.filter((a) => a.category !== "Case Study");

  return (
    <div className={styles.page}>
      <div className={styles.backdrop} aria-hidden="true" />
      <div className={styles.lights} aria-hidden="true" />
      <div className={styles.vignette} aria-hidden="true" />

      <div className={styles.content}>
        {/* Hero */}
        <section className={styles.hero} data-nav-hero>
          <div className="container">
            <div className={styles.heroInner}>
              <Reveal as="p" className={`eyebrow ${styles.eyebrow}`}>{hero.eyebrow}</Reveal>
              <Reveal as="h1" delay={60} className={styles.heroHead}>
                <span className={styles.headLine1}>{hero.headline[0]}</span>
                <span className={styles.headLine2}>{hero.headline[1]}</span>
              </Reveal>
              <Reveal as="p" delay={140} className={styles.lead}>{hero.lead}</Reveal>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className={styles.section}>
          <div className="container">
            {posts.length > 0 ? (
              <ul className={styles.grid}>
                {posts.map((a, i) => (
                  <Reveal as="li" key={a.slug} delay={(i % 3) * 70}>
                    <Link to={`/insights/${a.slug}`} className={styles.card}>
                      <span
                        className={styles.cover}
                        style={a.cover ? { backgroundImage: `url(${a.cover})` } : undefined}
                      >
                        <span className={styles.chip}>{a.category}</span>
                      </span>
                      <span className={styles.cardBody}>
                        <span className={styles.cardTitle}>{a.title}</span>
                        {a.excerpt && <span className={styles.cardExcerpt}>{a.excerpt}</span>}
                        <span className={styles.meta}>
                          {a.dateLabel && <span>{a.dateLabel}</span>}
                          {a.dateLabel && <span className={styles.dot} aria-hidden="true" />}
                          <span>{a.readTime}</span>
                        </span>
                      </span>
                    </Link>
                  </Reveal>
                ))}
              </ul>
            ) : (
              <Reveal as="div" className={styles.featured}>
                <p className={styles.featuredIntro}>{featuredIntro}</p>
                <p className={styles.soon}>
                  Articles are on the way — check back soon, or reach out with a
                  topic you'd like us to cover.
                </p>
              </Reveal>
            )}
          </div>
        </section>

        <CTABand heading={cta.heading} body={cta.body} label={cta.label} to={cta.to} />
      </div>
    </div>
  );
}
