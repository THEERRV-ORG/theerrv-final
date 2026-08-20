import { getLogoTraceSegments, LOGO_TRACE_VIEWBOX } from "../../data/logoTracePath";
import styles from "./LogoAssemble.module.css";

const PIECE_COUNT = 7;
const segments = getLogoTraceSegments(PIECE_COUNT);

const pieces = segments.map((d, i) => {
  const angle = (i / segments.length) * Math.PI * 2;
  const radius = 900;
  return {
    d,
    dx: Math.round(Math.cos(angle) * radius),
    dy: Math.round(Math.sin(angle) * radius),
    rot: (i % 2 === 0 ? 1 : -1) * (35 + i * 6),
    delay: i * 0.12,
  };
});

/**
 * One-time cinematic intro: fragments of the traced logo outline fly in
 * from every direction and converge into the assembled mark.
 */
export default function LogoAssemble({ className = "" }) {
  return (
    <svg
      className={`${styles.stage} ${className}`.trim()}
      viewBox={LOGO_TRACE_VIEWBOX}
      fill="none"
      aria-hidden="true"
    >
      {pieces.map((p, i) => (
        <path
          key={i}
          className={styles.piece}
          d={p.d}
          style={{
            "--dx": `${p.dx}px`,
            "--dy": `${p.dy}px`,
            "--rot": `${p.rot}deg`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </svg>
  );
}
