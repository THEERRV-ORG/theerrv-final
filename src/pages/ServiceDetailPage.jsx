import { useEffect, useRef, useState } from "react";
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

  // The side rail belongs to the reading part of the page. Once the closing CTA
  // (and the footer behind it) come up, it has nothing to sit beside, so it
  // fades out and stops taking clicks until you scroll back up.
  const bodyRef = useRef(null);
  const [railOn, setRailOn] = useState(true);

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      // Hidden as soon as the reading section's end passes the lower third of
      // the viewport — i.e. the CTA is arriving.
      const bottom = el.getBoundingClientRect().bottom;
      setRailOn(bottom > window.innerHeight * 0.66);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    // The mount-time measurement can be taken before fonts and images settle,
    // which matters when the page opens already scrolled (a restored position
    // or a deep link) and no scroll event is coming to correct it.
    const ro = new ResizeObserver(onScroll);
    ro.observe(el);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [slug]);

  // Called before the early return below: hooks must run in the same order on
  // every render, and an unknown slug would otherwise skip this one.
  usePageTitle(
    service ? `${service.title} | Theerrv Technologies` : "Theerrv Technologies",
    service?.description,
  );

  if (!service) return <Navigate to="/services" replace />;

  const { index, category, title, detail } = service;

  // Prev/next for continuing through the services.
  const i = items.indexOf(service);
  const prev = items[(i - 1 + items.length) % items.length];
  const next = items[(i + 1) % items.length];

  return (
    <>
      <section className={styles.hero} data-nav-hero>
        <div className={`${styles.orb} ${styles.orbGold}`} aria-hidden="true" />
        <div className={`${styles.orb} ${styles.orbCoral}`} aria-hidden="true" />
        <span className={styles.ghostNum} aria-hidden="true">{index}</span>

        <div className={`${styles.heroInner} container`}>
          {/* Cinematic side rail. On desktop this is lifted out of the flow and
              pinned to the left edge; on a phone there is no margin to pin it
              into, so it stays here in the flow above the title where it
              cannot cover the copy. */}
          <Link
            to="/services"
            className={`${styles.backSide} ${railOn ? "" : styles.backSideOut}`}
            aria-hidden={railOn ? undefined : "true"}
            tabIndex={railOn ? undefined : -1}
          >
            <span className={styles.backArrow} aria-hidden="true">←</span>
            <span className={styles.backText}>All services</span>
          </Link>

          <Reveal as="p" className={styles.category}>{category}</Reveal>
          <Reveal as="h1" delay={60} className={styles.title}>{title}</Reveal>
          <Reveal as="p" delay={140} className={styles.subtitle}>{detail.subtitle}</Reveal>
        </div>
      </section>

      <section className={styles.body} ref={bodyRef}>
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
