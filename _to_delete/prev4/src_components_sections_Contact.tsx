import { closing } from "@/lib/content";

/**
 * Closing CTA band on ink, with the 22px engineered grid behind it.
 *
 * The ribbon watermark belongs here at ~6% opacity once the real SVG is in
 * /public — see the note in the stylesheet. Nothing is faked in its place.
 */
export function Contact() {
  return (
    <section className="section ink ink-grid contact" id="contact">
      <div className="container contact-inner">
        <p className="eyebrow" data-reveal>
          {closing.eyebrow}
        </p>

        <h2 className="t-display-xl contact-title">
          {closing.title.map((line, i) => (
            <span key={line} data-reveal data-reveal-delay={60 + i * 90}>
              {line}
            </span>
          ))}
        </h2>

        <p className="t-body-lg measure" data-reveal data-reveal-delay="240">
          {closing.body}
        </p>

        <div className="contact-actions" data-reveal data-reveal-delay="300">
          <a href={closing.cta.href} className="btn btn-accent">
            {closing.cta.label}
          </a>
          <a href={closing.secondary.href} className="link-accent contact-mail">
            {closing.secondary.label}
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
