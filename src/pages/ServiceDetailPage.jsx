import { Link, useParams, Navigate } from "react-router-dom";
import Reveal from "../components/shared/Reveal";
import CTABand from "../components/page/CTABand";
import usePageTitle from "../hooks/usePageTitle";
import { servicesPage } from "../data/content";
import styles from "./ServiceDetailPage.module.css";

/**
 * A single service, discussed in detail. Reads the :slug route param, looks the
 * service up in the shared services list, and renders its overview, what's
 * included, and the outcomes it drives. Unknown slugs fall back to /services.
 */
export default function ServiceDetailPage() {
  const { slug } = useParams();
  const items = servicesPage.showcase.items;
  const service = items.find((it) => it.slug === slug);

  if (!service) return <Navigate to="/services" replace />;

  const { index, category, title, detail } = service;
  usePageTitle(`${title} | Theerrv Technologies`);

  // Prev/next for continuing through the services.
  const i = items.indexOf(service);
  const prev = items[(i - 1 + items.length) % items.length];
  const next = items[(i + 1) % items.length];

  return (
    <>
      {/* Cinematic side rail — sits at the left-most middle of the page. */}
      <Link to="/services" className={styles.backSide}>
        <span className={styles.backArrow} aria-hidden="true">←</span>
        <span className={styles.backText}>All services</span>
      </Link>

      <section className={styles.hero} data-nav-hero>
        <div className={`${styles.orb} ${styles.orbGold}`} aria-hidden="true" />
        <div className={`${styles.orb} ${styles.orbCoral}`} aria-hidden="true" />
        <span className={styles.ghostNum} aria-hidden="true">{index}</span>

        <div className={`${styles.heroInner} container`}>
          <Reveal as="p" className={styles.category}>{category}</Reveal>
          <Reveal as="h1" delay={60} className={styles.title}>{title}</Reveal>
          <Reveal as="p" delay={140} className={styles.subtitle}>{detail.subtitle}</Reveal>
        </div>
      </section>

      <section className={styles.body}>
        <div className={`${styles.grid} container`}>
          <div className={styles.overview}>
            <h2 className={styles.sectionLabel}>Overview</h2>
            {detail.overview.map((p, k) => (
              <Reveal as="p" key={k} delay={k * 60} className={styles.para}>{p}</Reveal>
            ))}

            <h2 className={`${styles.sectionLabel} ${styles.spaced}`}>The outcome</h2>
            <ul className={styles.outcomes}>
              {detail.outcomes.map((o) => (
                <li key={o}>
                  <span className={styles.check} aria-hidden="true">
                    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 8.5 6.5 12 13 4" />
                    </svg>
                  </span>
                  {o}
                </li>
              ))}
            </ul>
          </div>

          <aside className={styles.included}>
            <h2 className={styles.sectionLabel}>What's included</h2>
            <ul className={styles.capabilities}>
              {detail.capabilities.map((c) => (
                <li key={c}>
                  <span className={styles.dash} aria-hidden="true" />
                  {c}
                </li>
              ))}
            </ul>
          </aside>
        </div>

        {/* Continue through the services */}
        <div className={`${styles.pager} container`}>
          <Link to={`/services/${prev.slug}`} className={styles.pagerLink}>
            <span className={styles.pagerDir}>← Previous</span>
            <span className={styles.pagerTitle}>{prev.title}</span>
          </Link>
          <Link to={`/services/${next.slug}`} className={`${styles.pagerLink} ${styles.pagerNext}`}>
            <span className={styles.pagerDir}>Next →</span>
            <span className={styles.pagerTitle}>{next.title}</span>
          </Link>
        </div>
      </section>

      <CTABand
        heading={`Ready to talk about ${title.toLowerCase()}?`}
        body="Tell us what you're trying to build or improve, and we'll map out a practical way forward."
        label="Start Your Project"
        to="/contact"
      />
    </>
  );
}
