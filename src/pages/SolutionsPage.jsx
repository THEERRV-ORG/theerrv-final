import { useEffect, useRef, useState } from "react";
import Reveal from "../components/shared/Reveal";
import FAQ from "../components/page/FAQ";
import CTABand from "../components/page/CTABand";
import usePageTitle from "../hooks/usePageTitle";
import { solutionsPage } from "../data/content";
import styles from "./SolutionsPage.module.css";

/**
 * Solutions — a cinematic scroll. The hero and the four solution stages each
 * hold a full viewport, lit by drifting colour pools over a fixed dark ground,
 * with a giant ghost numeral behind every stage and a fixed rail on the left
 * edge tracking which solution the reader is inside. Type scale, weights and
 * palette are the same system used by the home, about and services pages.
 */
export default function SolutionsPage() {
  usePageTitle(solutionsPage.seoTitle);
  const { hero, items, closing, cta, faqs } = solutionsPage;

  const [active, setActive] = useState(-1);
  const stageRefs = useRef([]);
  const heroPinRef = useRef(null);

  // The pinned hero has to be gone by the time the first stage slides over it —
  // the stages are only scrimmed, not opaque, so anything still lit underneath
  // would read through them. `--p` runs 0 → 1 across the hold and drives the
  // fade in CSS, which keeps the work off the main thread.
  useEffect(() => {
    const el = heroPinRef.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight || 1;
      const scrolled = Math.max(0, -el.getBoundingClientRect().top);
      // Fully faded by 70% of a viewport, well before the hold releases.
      el.style.setProperty("--p", Math.min(1, scrolled / (vh * 0.7)).toFixed(3));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Track which stage owns the middle band of the viewport. When none does —
  // the hero above, the FAQ/CTA below — active goes to -1 and the rail retires.
  useEffect(() => {
    const stages = stageRefs.current.filter(Boolean);
    if (!stages.length) return;

    const inView = new Set();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const i = Number(entry.target.dataset.stage);
          if (entry.isIntersecting) inView.add(i);
          else inView.delete(i);
        });
        setActive(inView.size ? Math.min(...inView) : -1);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    stages.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className={styles.page}>
      {/* Fixed atmosphere: ground, drifting key/fill light, filmic vignette. */}
      <div className={styles.backdrop} aria-hidden="true" />
      <div className={styles.lights} aria-hidden="true" />
      <div className={styles.vignette} aria-hidden="true" />

      {/* Left-edge rail — the reader's position through the four solutions. */}
      <nav
        className={`${styles.rail} ${active >= 0 ? styles.railOn : ""}`}
        aria-label="Solutions progress"
      >
        <span className={styles.railLine} aria-hidden="true" />
        {items.map((item, i) => (
          <a
            key={item.index}
            href={`#solution-${item.index}`}
            className={`${styles.railDot} ${active === i ? styles.railDotOn : ""}`}
            aria-current={active === i ? "true" : undefined}
          >
            <span className={styles.railNum}>{item.index}</span>
            <span className={styles.railName}>{item.title}</span>
          </a>
        ))}
      </nav>

      <div className={styles.content}>
        {/* Hero — pinned for an extra beat, then handed over to the stages. */}
        <div className={styles.heroPin} ref={heroPinRef}>
          <section className={styles.hero} data-nav-hero>
            <div className="container">
              <div className={styles.heroInner}>
                <div className={styles.heroHeadCol}>
                  <Reveal as="p" className={`eyebrow ${styles.eyebrow}`}>{hero.eyebrow}</Reveal>
                  <Reveal as="h1" delay={60} className={styles.heroHead}>
                    <span className={styles.headLine1}>{hero.headline[0]}</span>
                    <span className={styles.headLine2}>{hero.headline[1]}</span>
                  </Reveal>
                </div>

                <div className={styles.heroTextCol}>
                  <Reveal as="p" delay={140} className={styles.lead}>{hero.lead}</Reveal>
                  {hero.support && (
                    <Reveal as="p" delay={200} className={styles.heroSupport}>{hero.support}</Reveal>
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Four solution stages */}
        {items.map((item, i) => (
          <section
            key={item.index}
            id={`solution-${item.index}`}
            data-stage={i}
            ref={(el) => (stageRefs.current[i] = el)}
            className={styles.stage}
          >
            {/* Ghost numeral — the stage's background element. */}
            <span className={styles.ghostNum} aria-hidden="true">{item.index}</span>

            <div className="container">
              <div className={styles.stageInner}>
                <div className={styles.prose}>
                  <Reveal as="h2" className={styles.title}>{item.title}</Reveal>
                  <Reveal as="p" delay={60} className={styles.subtitle}>{item.subtitle}</Reveal>
                  {item.paragraphs.map((p, pi) => (
                    <Reveal as="p" key={pi} delay={110 + pi * 50} className={styles.description}>{p}</Reveal>
                  ))}
                </div>

                <Reveal className={styles.includesCard} delay={140}>
                  <span className={styles.includesLabel}>{item.includesLabel}</span>
                  <ul className={styles.includes}>
                    {item.includes.map((inc) => (
                      <li key={inc} className={styles.include}>{inc}</li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </div>
          </section>
        ))}

        {/* Closing statement — the page's last word before the questions. */}
        {closing && (
          <section className={styles.closingSection}>
            <div className="container">
              <Reveal as="p" className={styles.closingStatement}>{closing.statement}</Reveal>
            </div>
          </section>
        )}

        {/* Kept inside .content so they stack above the fixed atmosphere. */}
        <FAQ eyebrow={faqs.eyebrow} heading={faqs.heading} items={faqs.items} />
        <CTABand heading={cta.heading} body={cta.body} label={cta.label} to={cta.to} />
      </div>
    </div>
  );
}
