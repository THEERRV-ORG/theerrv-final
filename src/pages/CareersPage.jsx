import PageHero from "../components/page/PageHero";
import CTABand from "../components/page/CTABand";
import Reveal from "../components/shared/Reveal";
import usePageTitle from "../hooks/usePageTitle";
import { careersPage } from "../data/content";
import styles from "./CareersPage.module.css";

export default function CareersPage() {
  usePageTitle(careersPage.seoTitle, careersPage.seoDescription);
  const { hero, why, openRoles, cta } = careersPage;

  return (
    <>
      <PageHero eyebrow={hero.eyebrow} headline={hero.headline} lead={hero.lead} />

      <section className={styles.why}>
        <div className={`${styles.whyInner} container`}>
          <div className={styles.whyText}>
            <Reveal as="p" className={`eyebrow ${styles.eyebrow}`}>
              {why.eyebrow}
            </Reveal>
            <Reveal as="h2" delay={80} className={styles.heading}>
              {why.heading}
            </Reveal>
            <Reveal as="p" delay={160} className={styles.body}>
              {why.body}
            </Reveal>
          </div>

          <Reveal as="ul" delay={120} className={styles.expect}>
            {why.expect.map((item) => (
              <li key={item} className={styles.expectItem}>
                <span className={styles.mark} aria-hidden="true" />
                {item}
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      <section className={styles.roles}>
        <div className="container">
          <Reveal as="p" className={`eyebrow ${styles.eyebrow}`}>
            {openRoles.eyebrow}
          </Reveal>
          <Reveal as="h2" delay={80} className={styles.heading}>
            {openRoles.heading}
          </Reveal>
          <ul className={styles.roleGrid}>
            {openRoles.roles.map((role, i) => (
              <Reveal as="li" key={role} delay={i * 50} className={styles.roleCard}>
                {role}
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <CTABand heading={cta.heading} body={cta.body} label={cta.label} to={cta.to} />
    </>
  );
}
