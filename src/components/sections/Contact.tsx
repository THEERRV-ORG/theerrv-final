import { closing } from "@/lib/content";

/**
 * Closing CTA — a light-bearing card.
 *
 * Two light states stacked in the same card. At rest it is an abstract prism
 * sweep; as you scroll through the section the light resolves into the ribbon
 * mark, sharpening and settling as it arrives. Light finding its form, which
 * is the same thing the company says it does with a brief.
 *
 * Both states are layered gradients — no bitmap. That means they re-tint from
 * the token layer, stay sharp at any density, and cost nothing to download.
 * The scrim guarantees the copy wins regardless of where the light lands.
 */
export function Contact() {
  return (
    <section className="cta" id="contact">
      <div className="cta-card">
        <div className="cta-light cta-light--prism" aria-hidden="true" />
        <div className="cta-light cta-light--mark" aria-hidden="true" />
        <div className="cta-grain" aria-hidden="true" />
        <div className="cta-scrim" aria-hidden="true" />

        <div className="cta-inner">
          <h2 className="cta-title">
            {closing.title.map((line, i) => (
              <span key={line} data-reveal data-reveal-delay={60 + i * 90}>
                {line}
              </span>
            ))}
          </h2>

          <p className="cta-lede" data-reveal data-reveal-delay="240">
            {closing.body}
          </p>

          <div className="cta-actions" data-reveal data-reveal-delay="300">
            <a href={closing.cta.href} className="btn btn-accent">
              {closing.cta.label}
            </a>
            <a href={closing.secondary.href} className="btn btn-ghost">
              {closing.secondary.label}
            </a>
          </div>

          <p className="cta-mail t-mono" data-reveal data-reveal-delay="360">
            <a href={`mailto:${closing.email}`}>{closing.email}</a>
          </p>
        </div>
      </div>
    </section>
  );
}
