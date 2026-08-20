import { useId } from "react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { LOGO_TRACE_PATH, LOGO_TRACE_VIEWBOX } from "../../data/logoTracePath";
import styles from "./LogoGlossOutline.module.css";

const [, , VB_W, VB_H] = LOGO_TRACE_VIEWBOX.split(" ").map(Number);
const CX = VB_W / 2;
const CY = VB_H / 2;

/**
 * The rotating-gradient-ring technique from the reference button, adapted:
 * instead of a rounded rect, the gradient sweeps around the logo's own
 * traced outline — a glossy light rotating around the mark's real edge.
 */
export default function LogoGlossOutline({ className = "" }) {
  const uid = useId().replace(/:/g, "");
  const gradientId = `${uid}-gloss-rotate`;
  const prefersReduced = usePrefersReducedMotion();

  return (
    <svg
      className={`${styles.outline} ${className}`.trim()}
      viewBox={LOGO_TRACE_VIEWBOX}
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradientId} gradientUnits="userSpaceOnUse" x1={0} y1={CY} x2={VB_W} y2={CY}>
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="42%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="50%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="58%" stopColor="#ffffff" stopOpacity="0" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          {!prefersReduced && (
            <animateTransform
              attributeName="gradientTransform"
              type="rotate"
              from={`0 ${CX} ${CY}`}
              to={`360 ${CX} ${CY}`}
              dur="5.5s"
              repeatCount="indefinite"
            />
          )}
        </linearGradient>
      </defs>
      <path className={styles.path} d={LOGO_TRACE_PATH} stroke={`url(#${gradientId})`} />
    </svg>
  );
}
