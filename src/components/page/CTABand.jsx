import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Reveal from "../shared/Reveal";
import styles from "./CTABand.module.css";

/**
 * Closing CTA — a light-bearing card, ported from theerrv-site's Contact
 * section. Two light states stacked in one card: at rest an abstract prism
 * sweep; as you scroll through the section the light resolves into the Theerrv
 * mark, sharpening and settling as it arrives. The transition is scroll-scrubbed
 * through a `--p` progress custom property (0 at rest → 1 resolved) set on the
 * card as it rises through the viewport.
 *
 * Accepts either a string `heading` (interior pages) or a `title` array of lines
 * (home), plus an optional secondary link and email line.
 */
export default function CTABand({
  heading,
  title,
  body,
  label,
  to = "/contact",
  primary,
  secondary,
  email,
}) {
  const lines = Array.isArray(title)
    ? title
    : Array.isArray(heading)
      ? heading
      : [heading ?? title];
  const primaryCta = primary ?? { label, to };
  const cardRef = useRef(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    // Honour reduced motion: hand over the resolved state and don't scrub.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.style.setProperty("--p", "1");
      return;
    }

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      const center = rect.top + rect.height / 2;
      // 0 when the card's centre is at the viewport bottom, 1 once it has risen
      // to 40% up — the light resolves as the section scrolls through.
      const p = Math.min(1, Math.max(0, (vh - center) / (0.6 * vh)));
      el.style.setProperty("--p", p.toFixed(3));
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

  return (
    <section className={styles.band} id="contact">
      <div className={styles.card} ref={cardRef}>
        <div className={`${styles.light} ${styles.prism}`} aria-hidden="true" />
        <div className={`${styles.light} ${styles.mark}`} aria-hidden="true" />
        <div className={styles.grain} aria-hidden="true" />
        <div className={styles.scrim} aria-hidden="true" />

        <div className={styles.inner}>
          <Reveal as="h2" className={styles.title}>
            {lines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </Reveal>

          {body && (
            <Reveal as="p" delay={120} className={styles.lede}>
              {body}
            </Reveal>
          )}

          <Reveal as="div" delay={200} className={styles.actions}>
            <Link to={primaryCta.to} className={`${styles.btn} ${styles.btnAccent}`}>
              {primaryCta.label} <span aria-hidden="true">→</span>
            </Link>
            {secondary && (
              <Link to={secondary.to} className={`${styles.btn} ${styles.btnGhost}`}>
                {secondary.label}
              </Link>
            )}
          </Reveal>

          {email && (
            <Reveal as="p" delay={260} className={styles.mail}>
              <a href={`mailto:${email}`}>{email}</a>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
