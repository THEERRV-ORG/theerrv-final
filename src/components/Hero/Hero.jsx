import { useRef } from "react";
import { Link } from "react-router-dom";
import { hero } from "../../data/content";
import LogoAssemble from "./LogoAssemble";
import LogoGlossOutline from "./LogoGlossOutline";
import LogoMark from "./LogoMark";
import styles from "./Hero.module.css";

export default function Hero() {
  const sectionRef = useRef(null);

  return (
    <section id="top" className={styles.hero} ref={sectionRef} data-bg="#060a16" data-nav-hero>
      <div className={`${styles.orb} ${styles.orbGold}`} aria-hidden="true" />
      <div className={`${styles.orb} ${styles.orbCoral}`} aria-hidden="true" />

      <LogoAssemble />
      <div className={styles.glowFlash} aria-hidden="true" />
      <div className={styles.finalLogoWrap}>
        <LogoMark trackRef={sectionRef} className={styles.finalLogo} />
        <LogoGlossOutline className={styles.finalLogo} />
      </div>

      <div className={`${styles.content} container`}>
        <div className={styles.grid}>
          <div className={styles.left}>
            <h1 className={styles.headline}>
              {hero.headline.map((line) => (
                <span key={line} className={styles.line}>
                  <span>{line}</span>
                </span>
              ))}
            </h1>
            <p className={styles.subline}>{hero.subline}</p>
            <div className={styles.actions}>
              {hero.ctas.map((cta) => (
                <Link
                  key={cta.to}
                  to={cta.to}
                  className={`${styles.button} ${cta.primary ? styles.buttonPrimary : styles.buttonGhost}`}
                >
                  {cta.label}
                  {cta.primary && <span aria-hidden="true"> →</span>}
                </Link>
              ))}
            </div>
          </div>
          <div className={styles.right} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
