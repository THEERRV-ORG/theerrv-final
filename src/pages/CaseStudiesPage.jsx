import { Link } from "react-router-dom";
import CTABand from "../components/page/CTABand";
import Reveal from "../components/shared/Reveal";
import usePageTitle from "../hooks/usePageTitle";
import { caseStudiesPage } from "../data/content";
import { articles } from "../data/insights";
// Carries the original editorial index design (its stylesheet is a snapshot of
// the pre-redesign Insights layout). Case studies and blog posts share the
// article engine; this page just shows the "Case Study" category.
import styles from "./CaseStudiesPage.module.css";

/**
 * Case Studies — the proof index. Same cinematic ground and editorial layout as
 * Insights, but scoped to real project write-ups (articles tagged
 * `category: Case Study`). Detail pages stay at /insights/:slug so their already
 * indexed URLs are preserved.
 */
export default function CaseStudiesPage() {
  usePageTitle(caseStudiesPage.seoTitle, caseStudiesPage.seoDescription);
  const { hero, cta } = caseStudiesPage;

  const studies = articles.filter((a) => a.category === "Case Study");
  const [lead, ...rest] = studies;

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

        {/* Studies */}
        <section className={styles.section}>
          <div className="container">
            {lead ? (
              <>
                {/* Lead study — the editorial feature. */}
                <Reveal as="div">
                  <Link to={`/insights/${lead.slug}`} className={styles.feature}>
                    <span className={styles.featureTag}>Latest</span>
                    <div className={styles.featureBody}>
                      {lead.caseStudy?.logo && (
                        <img src={lead.caseStudy.logo} alt="" className={styles.logo} />
                      )}
                      <span className={styles.cat}>{lead.client || lead.category}</span>
                      <h2 className={styles.featureTitle}>{lead.title}</h2>
                      {lead.excerpt && <p className={styles.featureExcerpt}>{lead.excerpt}</p>}
                      {lead.caseStudy?.results.length > 0 && (
                        <ul className={styles.results}>
                          {lead.caseStudy.results.slice(0, 3).map((r) => (
                            <li key={`${r.value}-${r.label}`}>
                              <span className={styles.resultValue}>{r.value}</span>
                              <span className={styles.resultLabel}>{r.label}</span>
                            </li>
                          ))}
                        </ul>
                      )}
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
                          <span className={styles.cat}>{a.client || a.category}</span>
                          <span className={styles.cardTitle}>{a.title}</span>
                          {a.excerpt && <span className={styles.cardExcerpt}>{a.excerpt}</span>}
                          {a.caseStudy?.results[0] && (
                            <span className={styles.cardResult}>
                              <span className={styles.resultValue}>{a.caseStudy.results[0].value}</span>
                              <span className={styles.resultLabel}>{a.caseStudy.results[0].label}</span>
                            </span>
                          )}
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
                <p className={styles.soon}>
                  Case studies are on the way — check back soon, or reach out to
                  talk through a project with similar goals.
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
