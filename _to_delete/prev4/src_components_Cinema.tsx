import { hero, stations } from "@/lib/content";
import { SceneRoot } from "./scene/SceneRoot";

/**
 * The cinematic block.
 *
 * One continuous ink section containing the hero and the five differentiators.
 * The canvas sticks to the viewport for the whole block while the panels scroll
 * over it, so the camera move is unbroken from the opening frame to the last
 * station — the same shape as the reference site's hero-plus-value-carousel,
 * driven by scroll instead of prev/next controls.
 *
 * Every word here lives in the DOM, not the canvas. With WebGL unavailable the
 * block is still an ink section with a full set of readable panels.
 */
export function Cinema() {
  return (
    <section id="cinema" className="cinema ink">
      <div className="cinema-canvas">
        <SceneRoot />
        {/*
          Contrast is not left to the camera. Two ink scrims sit between the
          scene and the type: one down the text column, one under the nav. The
          composition is built to keep the ribbon clear of both anyway — these
          guarantee the text wins if a camera move or a narrow viewport ever
          brings the two together.
        */}
        <div className="cinema-scrim" aria-hidden="true" />
        <div className="cinema-scrim-top" aria-hidden="true" />
      </div>

      <div className="cinema-panels">
        {/* Station 0 — the hero. */}
        <div className="cinema-panel" id="top">
          <div className="container cinema-hero">
            <p className="eyebrow" data-reveal>
              {hero.eyebrow}
            </p>
            <h1 className="t-display-2xl cinema-headline">
              {hero.headline.map((line, i) => (
                <span
                  key={line}
                  data-reveal
                  data-reveal-delay={80 + i * 90}
                  className="cinema-headline-line"
                >
                  {line}
                </span>
              ))}
            </h1>
            <p className="t-body-lg cinema-lede" data-reveal data-reveal-delay="380">
              {hero.body}
            </p>
            <div className="cinema-actions" data-reveal data-reveal-delay="460">
              <a href={hero.cta.href} className="btn btn-accent">
                {hero.cta.label}
              </a>
              <a href={hero.secondary.href} className="btn btn-ghost">
                {hero.secondary.label}
              </a>
            </div>
          </div>

          <div className="cinema-cue t-mono" aria-hidden="true">
            <span>{hero.scrollCue}</span>
            <span className="cinema-cue-line" />
          </div>
        </div>

        {/* Stations 1–5 — the differentiators. */}
        {stations.map((station) => (
          <div className="cinema-panel" id={station.id} key={station.id}>
            <div className="container cinema-station">
              <p className="eyebrow">
                {station.key} — {station.marker} / 05
              </p>
              <h2 className="t-h1 cinema-station-title">{station.title}</h2>
              <p className="t-body-lg cinema-station-body">{station.body}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
