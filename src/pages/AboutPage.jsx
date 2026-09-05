import { lazy, Suspense } from "react";
import Reveal from "../components/shared/Reveal";
import usePageTitle from "../hooks/usePageTitle";
import { aboutPage } from "../data/content";
import { Link } from "react-router-dom";
import styles from "./AboutPage.module.css";

// The 3D logo scene pulls in Three.js — loaded as its own chunk, off the About
// page's critical path. Its Suspense boundary (null fallback) means the page's
// text renders immediately over the dark ground while the scene arrives.
const LogoScene = lazy(() => import("../scene/LogoScene"));

/**
 * About page. Six full-height sections scroll over a single fixed 3D logo scene
 * — the extruded brand mark travels through six camera stations, one per
 * section, so the logo "guides" the reader down the page. Copy lives in the DOM
 * on the left; a scrim keeps it legible over the mark. With WebGL off, the
 * scene renders nothing and the sections remain a clean dark editorial page.
 */
export default function AboutPage() {
  usePageTitle(aboutPage.seoTitle, aboutPage.seoDescription);
  const { hero, about, missionVision, why, story, closing } = aboutPage;

  return (
    <div className={styles.page}>
      <div className={styles.backdrop} aria-hidden="true" />
      <div className={styles.lights} aria-hidden="true" />
      <Suspense fallback={null}>
        <LogoScene driveSelector="#about-scroll" />
      </Suspense>
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
              <Reveal as="h2" className={styles.heading}>
                <span className={styles.headLine1}>Vision,</span>
                <span className={styles.headLine2}>brought to life.</span>
              </Reveal>
              <div className={styles.headRule} aria-hidden="true" />
              {about.paragraphs.map((p, i) => (
                <Reveal
                  as="p"
                  key={i}
                  delay={120 + i * 60}
                  className={i === 0 ? styles.lede : styles.para}
                >{p}</Reveal>
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
                    <div className={styles.paneHead}>
                      <h3 className={styles.mvLabel}>{item.label}</h3>
                    </div>
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
            <div className={`${styles.inner} ${styles.innerWide}`}>
              <Reveal as="p" className={`eyebrow ${styles.eyebrow}`}>{why.eyebrow}</Reveal>
              <Reveal as="h2" delay={60} className={styles.heading}>{why.heading}</Reveal>
              <ol className={styles.points}>
                {why.points.map((pt, i) => (
                  <Reveal as="li" key={pt.index} delay={100 + i * 50} className={styles.point}>
                    <div className={styles.paneHead}>
                      <span className={styles.pointTitle}>{pt.title}</span>
                    </div>
                    <span className={styles.pointText}>{pt.body}</span>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* 4 — Our Story */}
        <section className={styles.section}>
          {/* Constellation: full-section cinematic background, five friends as nodes */}
          <svg className={styles.constellationBg} viewBox="0 0 1200 700" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            {/* Connection lines — hair-thin, very low opacity */}
            <line x1="120" y1="520" x2="340" y2="180" stroke="rgba(255,90,79,0.12)" strokeWidth="1"/>
            <line x1="340" y1="180" x2="620" y2="560" stroke="rgba(255,90,79,0.08)" strokeWidth="1"/>
            <line x1="620" y1="560" x2="870" y2="140" stroke="rgba(217,189,133,0.1)" strokeWidth="1"/>
            <line x1="870" y1="140" x2="1080" y2="480" stroke="rgba(217,189,133,0.12)" strokeWidth="1"/>
            <line x1="120" y1="520" x2="620" y2="560" stroke="rgba(255,90,79,0.05)" strokeWidth="0.6"/>
            <line x1="340" y1="180" x2="870" y2="140" stroke="rgba(217,189,133,0.05)" strokeWidth="0.6"/>
            <line x1="120" y1="520" x2="1080" y2="480" stroke="rgba(255,90,79,0.03)" strokeWidth="0.5"/>
            {/* Node 1 */}
            <circle cx="120" cy="520" r="3" fill="rgba(255,90,79,0.5)" className={styles.node}/>
            <circle cx="120" cy="520" r="14" fill="rgba(255,90,79,0.04)" className={styles.nodeRing}/>
            {/* Node 2 */}
            <circle cx="340" cy="180" r="2.5" fill="rgba(255,90,79,0.45)" className={styles.node} style={{animationDelay:"0.7s"}}/>
            <circle cx="340" cy="180" r="11" fill="rgba(255,90,79,0.03)" className={styles.nodeRing} style={{animationDelay:"0.7s"}}/>
            {/* Node 3 — centre, slightly larger */}
            <circle cx="620" cy="560" r="4" fill="rgba(217,189,133,0.5)" className={styles.node} style={{animationDelay:"1.2s"}}/>
            <circle cx="620" cy="560" r="18" fill="rgba(217,189,133,0.035)" className={styles.nodeRing} style={{animationDelay:"1.2s"}}/>
            {/* Node 4 */}
            <circle cx="870" cy="140" r="2.5" fill="rgba(255,90,79,0.4)" className={styles.node} style={{animationDelay:"1.8s"}}/>
            <circle cx="870" cy="140" r="11" fill="rgba(255,90,79,0.03)" className={styles.nodeRing} style={{animationDelay:"1.8s"}}/>
            {/* Node 5 */}
            <circle cx="1080" cy="480" r="3" fill="rgba(217,189,133,0.5)" className={styles.node} style={{animationDelay:"1s"}}/>
            <circle cx="1080" cy="480" r="14" fill="rgba(217,189,133,0.03)" className={styles.nodeRing} style={{animationDelay:"1s"}}/>
          </svg>

          <div className="container">
            <div className={styles.inner}>
              <Reveal as="p" className={`eyebrow ${styles.eyebrow}`}>{story.eyebrow}</Reveal>

              <Reveal as="h2" delay={60} className={styles.heading}>
                <span className={styles.headLine1}>Five friends,</span>
                <span className={styles.headLine2}>one vision.</span>
              </Reveal>

              {story.paragraphs.map((p, i) => (
                <Reveal as="p" key={i} delay={120 + i * 60} className={i === 0 ? styles.lede : styles.para}>{p}</Reveal>
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
