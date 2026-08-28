import Reveal from "../components/shared/Reveal";
import LogoScene from "../scene/LogoScene";
import usePageTitle from "../hooks/usePageTitle";
import { aboutPage } from "../data/content";
import { Link } from "react-router-dom";
import styles from "./AboutPage.module.css";

/**
 * About page. Six full-height sections scroll over a single fixed 3D logo scene
 * — the extruded brand mark travels through six camera stations, one per
 * section, so the logo "guides" the reader down the page. Copy lives in the DOM
 * on the left; a scrim keeps it legible over the mark. With WebGL off, the
 * scene renders nothing and the sections remain a clean dark editorial page.
 */
export default function AboutPage() {
  usePageTitle(aboutPage.seoTitle);
  const { hero, about, missionVision, why, story, closing } = aboutPage;

  return (
    <div className={styles.page}>
      <div className={styles.backdrop} aria-hidden="true" />
      <div className={styles.lights} aria-hidden="true" />
      <LogoScene driveSelector="#about-scroll" />
      <div className={styles.vignette} aria-hidden="true" />

      <div id="about-scroll" className={styles.content}>
        {/* 0 — Hero */}
        <section className={styles.section}>
          <div className="container">
            <div className={styles.inner}>
              <Reveal as="p" className={`eyebrow ${styles.eyebrow}`}>{hero.eyebrow}</Reveal>
              <Reveal as="h1" delay={60} className={styles.heroHead}>
                <span className={styles.line1}>{hero.headline[0]}</span>
                <span className={styles.line2}>
                  {hero.headline[1].replace(/\.$/, "")}
                  <span className={styles.dot}>.</span>
                </span>
              </Reveal>
              <Reveal as="p" delay={140} className={styles.lead}>{hero.lead}</Reveal>
            </div>
          </div>
        </section>

        {/* 1 — About Us */}
        <section className={styles.section}>
          <div className="container">
            <div className={styles.inner}>
              <Reveal as="p" className={`eyebrow ${styles.eyebrow}`}>{about.eyebrow}</Reveal>
              <Reveal as="h2" delay={60} className={styles.heading}>{about.heading}</Reveal>
              {about.paragraphs.map((p, i) => (
                <Reveal as="p" key={i} delay={120 + i * 60} className={styles.para}>{p}</Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 2 — Mission & Vision */}
        <section className={styles.section}>
          <div className="container">
            <div className={styles.inner}>
              <div className={styles.mvGrid}>
                {missionVision.items.map((item, i) => (
                  <Reveal as="article" key={item.label} delay={80 + i * 90} className={styles.mvCard}>
                    <h3 className={styles.mvLabel}>{item.label}</h3>
                    <p className={styles.mvBody}>{item.body}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 3 — Why Choose Us */}
        <section className={styles.section}>
          <div className="container">
            <div className={styles.inner}>
              <Reveal as="p" className={`eyebrow ${styles.eyebrow}`}>{why.eyebrow}</Reveal>
              <Reveal as="h2" delay={60} className={styles.heading}>{why.heading}</Reveal>
              <ol className={styles.points}>
                {why.points.map((pt, i) => (
                  <Reveal as="li" key={pt.index} delay={100 + i * 50} className={styles.point}>
                    <span className={styles.pointNum}>{pt.index}</span>
                    <span className={styles.pointBody}>
                      <span className={styles.pointTitle}>{pt.title}</span>
                      <span className={styles.pointText}>{pt.body}</span>
                    </span>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* 4 — Our Story */}
        <section className={styles.section}>
          <div className="container">
            <div className={styles.inner}>
              <Reveal as="p" className={`eyebrow ${styles.eyebrow}`}>{story.eyebrow}</Reveal>
              <Reveal as="h2" delay={60} className={styles.heading}>{story.heading}</Reveal>
              {story.paragraphs.map((p, i) => (
                <Reveal as="p" key={i} delay={120 + i * 60} className={styles.para}>{p}</Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* 5 — Closing */}
        <section className={styles.section}>
          <div className="container">
            <div className={styles.inner}>
              <Reveal as="p" className={styles.statement}>{closing.statement}</Reveal>
              <Reveal as="p" delay={100} className={styles.tagline}>
                {closing.tagline.map((line) => (
                  <span key={line} className={styles.tagLine}>{line}</span>
                ))}
              </Reveal>
              <Reveal as="div" delay={200}>
                <Link to={closing.cta.to} className={styles.ctaBtn}>
                  {closing.cta.label} <span aria-hidden="true">→</span>
                </Link>
              </Reveal>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
