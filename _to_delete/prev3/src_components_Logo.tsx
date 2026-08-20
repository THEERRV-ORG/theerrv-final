/**
 * Wordmark.
 *
 * The design system is explicit that the ribbon mark is never redrawn and never
 * recoloured, so nothing here attempts to reproduce it. This renders the
 * wordmark only, in the brand typeface, with the terminal "v" in coral exactly
 * as the supplied logo lockup sets it.
 *
 * When assets/logo-theerrv.svg is dropped into /public, `mark` renders it
 * alongside — the real artwork, unmodified, which is the only correct way to
 * show the mark.
 */

const MARK_SRC = "/logo-theerrv.svg";

interface LogoProps {
  /** Render the ribbon mark next to the wordmark, if the asset is present. */
  mark?: boolean;
  /** Invert for use on ink surfaces. */
  onInk?: boolean;
  className?: string;
}

export function Logo({ mark = false, onInk = false, className }: LogoProps) {
  return (
    <span className={`logo ${onInk ? "logo-on-ink" : ""} ${className ?? ""}`}>
      {mark ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={MARK_SRC} alt="" aria-hidden="true" className="logo-mark" />
      ) : null}
      <span className="logo-word">
        Theerr<span className="logo-v">v</span>
      </span>
    </span>
  );
}
