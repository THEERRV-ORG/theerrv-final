import { about, missionVision } from "@/lib/content";

/**
 * About, then mission and vision.
 *
 * A two-column editorial split: the heading holds the left column and stays put
 * while the reading measure runs down the right. Body copy never exceeds the
 * 680px measure the design system sets, regardless of viewport width.
 */
export function About() {
  return (
    <>
      <section className="section" id="about">
        <div className="container editorial">
          <div className="editorial-aside">
            <h2 className="t-display-lg" data-reveal data-reveal-delay="60">
              {about.title}
            </h2>
          </div>

          <div className="editorial-body measure">
            {about.paragraphs.map((p, i) => (
              <p key={i} className="t-body-lg" data-reveal data-reveal-delay={i * 70}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-subtle">
        <div className="container">
          <div className="mv-grid">
            {missionVision.items.map((item, i) => (
              <article
                key={item.marker}
                className="mv-item"
                data-reveal
                data-reveal-delay={i * 90}
              >
                <h3 className="t-mono mv-label">{item.marker}</h3>
                <p className="t-h3 mv-body">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
