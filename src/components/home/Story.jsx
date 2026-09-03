import { lazy, Suspense } from "react";
import { Link } from "react-router-dom";
import { homeStory, homeFaqs } from "../../data/content";
import Reveal from "../shared/Reveal";
import Hero from "../Hero/Hero";
import FAQ from "../page/FAQ";
import CoreServices from "./CoreServices";
import Transformation from "./Transformation";
import WhyTheerrv from "./WhyTheerrv";
import styles from "./Story.module.css";

// The WebGL ribbon and the GSAP/Lenis scroll rig pull in Three.js and GSAP —
// the heaviest dependencies on the site. Both are decorative and mount after
// the page is readable, so they load as their own chunk off the critical path.
// Their own Suspense boundaries (null fallback) keep the page from waiting on
// them; with the chunk not yet in, the page is a clean set of dark panels.
const RibbonScene = lazy(() => import("../../scene/RibbonScene"));
const StoryScroll = lazy(() => import("../../scene/StoryScroll"));

/**
 * The homepage as one continuous scroll story. A single persistent ribbon scene
 * (two twisted ribbons) is fixed behind the content and travels through the
 * whole page as you scroll; every section's copy lives in the DOM above it, so
 * with WebGL unavailable the page is still a fully readable set of ink panels.
 */

// Render a headline line, giving the trailing full stop the coral accent.
function AccentLine({ text }) {
  const dotted = /\.$/.test(text);
  return (
    <span className={styles.line}>
      {dotted ? text.replace(/\.$/, "") : text}
      {dotted ? <span className={styles.dot}>.</span> : null}
    </span>
  );
}

export default function Story() {
  const { intro, why, impact, cta } = homeStory;

  return (
    <>
      <Suspense fallback={null}>
        <StoryScroll />
      </Suspense>
      <div className={styles.backdrop} aria-hidden="true" />
      <Suspense fallback={null}>
        <RibbonScene />
      </Suspense>
      <div className={styles.bottomHaze} aria-hidden="true" />

      <div id="home" className={styles.content}>
        {/* 01 — HERO (existing, self-contained) */}
        <Hero />

        {/* 02 — INTRO (editorial manifesto) */}
        <section className={`${styles.panel} ${styles.introPanel}`}>
          <div className="container">
            <div className={styles.introTop}>
              <div className={styles.introLeft}>
                <Reveal as="p" className={`eyebrow ${styles.introEyebrow}`}>
                  {intro.eyebrow}
                  <span className={styles.introEyebrowLine} aria-hidden="true" />
                </Reveal>
                <Reveal as="h2" delay={80} className={styles.introLead}>
                  {intro.lead.map((line) => (
                    <AccentLine key={line} text={line} />
                  ))}
                </Reveal>
              </div>
              <div className={styles.introRight}>
                {intro.paragraphs.map((p, i) => (
                  <Reveal as="p" key={p} delay={160 + i * 90} className={styles.introPara}>
                    {p}
                  </Reveal>
                ))}
              </div>
            </div>

            <div className={styles.introRule} aria-hidden="true" />

            <ul className={styles.words}>
              {intro.words.map((w, i) => (
                <Reveal as="li" key={w.word} delay={i * 90} className={styles.word}>
                  <span className={`${styles.wordTitle} ${styles[`tone_${w.tone}`]}`}>
                    {w.word}
                    <span className={styles.wordDot}>.</span>
                  </span>
                  <span className={styles.wordNote}>{w.note}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* 03 — CORE SERVICES (the live operating system) */}
        <CoreServices />

        {/* 04 — BUSINESS TRANSFORMATION (the pinned timeline) */}
        <Transformation />

        {/* 05 — WHY THEERRV */}
        <WhyTheerrv />

        {/* 06 — IMPACT */}
        <section className={`${styles.panel} ${styles.impactPanel}`}>
          <div className="container">
            <Reveal as="p" className={`eyebrow ${styles.eyebrow}`} style={{ textAlign: "center" }}>
              {impact.eyebrow}
            </Reveal>
            <ul className={styles.impactWords}>
              {impact.words.map((item, i) => (
                <Reveal
                  as="li"
                  key={item.word}
                  delay={i * 70}
                  className={`${styles.impactItem} ${i === impact.words.length - 1 ? styles.impactGrow : ""}`}
                >
                  <span className={styles.impactWord}>{item.word}</span>
                  <span className={styles.impactNote}>{item.note}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* 07 — FAQ (temporarily hidden) */}
        {/* <FAQ transparent eyebrow="FAQ" heading="Questions, answered." items={homeFaqs.items} /> */}

        {/* 08 — FINAL CTA (ribbons converge again) */}
        <section id="contact" className={`${styles.panel} ${styles.ctaPanel}`}>
          <div className="container">
            {cta.statement && (
              <Reveal as="p" className={styles.ctaStatement}>
                {cta.statement}
              </Reveal>
            )}
            <Reveal as="h2" className={styles.ctaTitle}>
              {cta.title.map((line) => (
                <AccentLine key={line} text={line} />
              ))}
            </Reveal>
            <Reveal as="p" delay={120} className={styles.ctaBody}>
              {cta.body}
            </Reveal>
            <Reveal as="div" delay={200}>
              <Link to={cta.primary.to} className={styles.ctaBtn}>
                {cta.primary.label} <span aria-hidden="true">→</span>
              </Link>
            </Reveal>
          </div>
        </section>
      </div>
    </>
  );
}
