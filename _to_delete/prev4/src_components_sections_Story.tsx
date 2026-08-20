import { story } from "@/lib/content";

export function Story() {
  return (
    <section className="section" id="story">
      <div className="container editorial">
        <div className="editorial-aside">
          <p className="eyebrow" data-reveal>
            {story.eyebrow}
          </p>
          <h2 className="t-display-lg" data-reveal data-reveal-delay="60">
            {story.title}
          </h2>

          <ol className="timeline" data-reveal data-reveal-delay="140">
            {story.markers.map((m) => (
              <li key={m.year}>
                <span className="timeline-year t-mono">{m.year}</span>
                <span className="t-body-sm">{m.label}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="editorial-body measure">
          {story.paragraphs.map((p, i) => (
            <p key={i} className="t-body-lg" data-reveal data-reveal-delay={i * 70}>
              {p}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
