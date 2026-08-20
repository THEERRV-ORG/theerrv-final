import { useRef } from "react";
import { hero } from "../../data/content";
import DotFrame from "../shared/DotFrame";
import FlipText from "../shared/FlipText";
import LogoAssemble from "./LogoAssemble";
import LogoGlossOutline from "./LogoGlossOutline";
import LogoMark from "./LogoMark";
import styles from "./Hero.module.css";

export default function Hero() {
  const sectionRef = useRef(null);

  return (
    <section id="top" className={styles.hero} ref={sectionRef} data-bg="#060a16">
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
                  {line}
                </span>
              ))}
            </h1>
          </div>

          <div className={styles.right}>
            <DotFrame className={styles.squareCard}>
              <p className={styles.badgeText}>
                <FlipText text={hero.eyebrow} />
              </p>
            </DotFrame>
          </div>
        </div>
      </div>
    </section>
  );
}
