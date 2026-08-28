import { useRef } from "react";
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

      <div className={`${styles.content} container`}>
        <div className={styles.grid}>
          <div className={styles.left}>
            {/* The logo "loads" here: on desktop this stage is absolutely
                positioned and floats over the right side (unchanged); on mobile
                it sits in flow, centred, between the kicker and the headline. */}
            <div className={styles.logoStage} aria-hidden="true">
              <LogoAssemble />
              <div className={styles.glowFlash} />
              <div className={styles.finalLogoWrap}>
                <LogoMark trackRef={sectionRef} className={styles.finalLogo} />
                <LogoGlossOutline className={styles.finalLogo} />
              </div>
            </div>

            <h1 className={styles.headline}>
              {hero.headline.map((line) => (
                <span key={line} className={styles.line}>
                  <span>{line}</span>
                </span>
              ))}
            </h1>
            <p className={styles.subline}>{hero.subline}</p>
          </div>
          <div className={styles.right}>
            {hero.body && <p className={styles.bodyText}>{hero.body}</p>}
          </div>
        </div>

      </div>
    </section>
  );
}
