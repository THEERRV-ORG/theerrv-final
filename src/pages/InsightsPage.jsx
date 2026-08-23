import PageHero from "../components/page/PageHero";
import CTABand from "../components/page/CTABand";
import Reveal from "../components/shared/Reveal";
import usePageTitle from "../hooks/usePageTitle";
import { insightsPage } from "../data/content";
import styles from "./InsightsPage.module.css";

export default function InsightsPage() {
  usePageTitle(insightsPage.seoTitle);
  const { hero, categories, featuredIntro, cta } = insightsPage;

  return (
    <>
      <PageHero eyebrow={hero.eyebrow} headline={hero.headline} lead={hero.lead} />

      <section className={styles.section}>
        <div className="container">
          <Reveal as="p" className={`eyebrow ${styles.eyebrow}`}>
            Topics
          </Reveal>
          <ul className={styles.chips}>
            {categories.map((cat, i) => (
              <Reveal as="li" key={cat} delay={i * 40} className={styles.chip}>
                {cat}
              </Reveal>
            ))}
          </ul>

          <Reveal as="div" delay={120} className={styles.featured}>
            <p className={styles.featuredIntro}>{featuredIntro}</p>
            <p className={styles.soon}>
              Articles are on the way — check back soon, or reach out with a topic you'd like us to cover.
            </p>
          </Reveal>
        </div>
      </section>

      <CTABand heading={cta.heading} body={cta.body} label={cta.label} to={cta.to} />
    </>
  );
}
