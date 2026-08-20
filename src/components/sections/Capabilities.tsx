import { capabilities } from "@/lib/content";

/**
 * Capabilities grid. White canvas after the ink block — the release of pressure
 * that makes the next ink moment land.
 *
 * Exactly one card carries the coral accent bar. That is the section's single
 * warm moment, and it is spent on the item worth flagging.
 */
export function Capabilities() {
  return (
    <section className="section" id="capabilities">
      <div className="container">
        <header className="section-head">
          <h2 className="t-display-lg section-title" data-reveal data-reveal-delay="60">
            {capabilities.title}
          </h2>
          <p className="t-body-lg measure" data-reveal data-reveal-delay="120">
            {capabilities.lede}
          </p>
        </header>

        <ul className="capability-grid">
          {capabilities.items.map((item, i) => (
            <li key={item.marker}>
              <article
                className={`card card-interactive ${
                  "accent" in item && item.accent ? "card-accent" : ""
                }`}
                data-reveal
                data-reveal-delay={(i % 3) * 70}
              >
                <span className="capability-marker t-mono">{item.marker}</span>
                <h3 className="t-h4">{item.title}</h3>
                <p className="t-body-sm">{item.body}</p>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
