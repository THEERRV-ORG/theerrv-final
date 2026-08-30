import { Link } from "react-router-dom";
import CTABand from "../components/page/CTABand";
import Reveal from "../components/shared/Reveal";
import usePageTitle from "../hooks/usePageTitle";
import { insightsPage } from "../data/content";
import { articles } from "../data/insights";
import styles from "./InsightsPage.module.css";

/**
 * Insights — the writing index, on the same cinematic ground as the about and
 * solutions pages: a fixed lit backdrop with a full-height hero, then the lead
 * article as an editorial feature and the rest as an accent-spine grid.
 */
export default function InsightsPage() {
  usePageTitle(insightsPage.seoTitle);
  const { hero, featuredIntro, cta } = insightsPage;

  const [lead, ...rest] = articles;

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

        {/* Writing */}
        <section className={styles.section}>
          <div className="container">
            {lead ? (
              <>
                {/* Lead article — the editorial feature. */}
                <Reveal as="div">
                  <Link to={`/insights/${lead.slug}`} className={styles.feature}>
                    <span className={styles.featureTag}>Latest</span>
                    <div className={styles.featureBody}>
                      <span className={styles.cat}>{lead.category}</span>
                      <h2 className={styles.featureTitle}>{lead.title}</h2>
                      {lead.excerpt && <p className={styles.featureExcerpt}>{lead.excerpt}</p>}
                      <span className={styles.meta}>
                        {lead.dateLabel && <span>{lead.dateLabel}</span>}
                        {lead.dateLabel && <span className={styles.dot} aria-hidden="true" />}
                        <span>{lead.readTime}</span>
                      </span>
                      <span className={styles.readOn}>
                        Read the story <span aria-hidden="true">→</span>
                      </span>
                    </div>
                  </Link>
                </Reveal>

                {rest.length > 0 && (
                  <ul className={styles.grid}>
                    {rest.map((a, i) => (
                      <Reveal as="li" key={a.slug} delay={i * 60}>
                        <Link to={`/insights/${a.slug}`} className={styles.card}>
                          <span className={styles.cat}>{a.category}</span>
                          <span className={styles.cardTitle}>{a.title}</span>
                          {a.excerpt && <span className={styles.cardExcerpt}>{a.excerpt}</span>}
                          <span className={styles.meta}>
                            {a.dateLabel && <span>{a.dateLabel}</span>}
                            {a.dateLabel && <span className={styles.dot} aria-hidden="true" />}
                            <span>{a.readTime}</span>
                          </span>
                        </Link>
                      </Reveal>
                    ))}
                  </ul>
                )}
              </>
            ) : (
              <Reveal as="div" className={styles.featured}>
                <p className={styles.featuredIntro}>{featuredIntro}</p>
                <p className={styles.soon}>
                  Articles are on the way — check back soon, or reach out with a topic you'd like us to cover.
                </p>
              </Reveal>
            )}
          </div>
        </section>

        {/* Inside .content so it stacks above the fixed atmosphere. */}
        <CTABand heading={cta.heading} body={cta.body} label={cta.label} to={cta.to} />
      </div>
    </div>
  );
}
