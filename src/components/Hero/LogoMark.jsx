import { animate, m, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useId, useRef } from "react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

/* ===========================================================================
 * The brand mark as a physical object.
 *
 * Everything pointer-driven runs on MotionValues, never React state — the
 * component renders once and then only the compositor works. That is what
 * holds 60fps while five layers, a tilt and a travelling highlight are all
 * responding at the same time.
 *
 * Ported from the production component: the vector navy/coral paths aren't
 * available here, so the same layering is built from the two colour-split
 * PNGs (logo-navy.png / logo-coral.png, cropped from the real mark) used as
 * SVG masks — every gradient/highlight stays confined to the real silhouette
 * exactly as clipPath + fill="url(#path)" did in the original.
 *
 * Design rules this implements, in order of importance:
 *   • It never rotates continuously. Orientation only ever responds to where
 *     the pointer is; leave the section and it returns to rest.
 *   • Layer parallax is deliberately tiny. Enough to read as depth, far too
 *     little to distort the mark.
 *   • The breath is 1% over 3s, on a randomised 8–12s cycle, so it is felt
 *     rather than seen.
 * =========================================================================== */

const CORAL_BRIGHT = "#ff644e";

const MARK_VIEWBOX = "0 0 933 583";
const [VB_X, VB_Y, VB_W, VB_H] = MARK_VIEWBOX.split(" ").map(Number);

/** Maximum tilt in degrees, per axis. */
const TILT = 4;

/** Parallax travel in viewBox units for the front layer; the others scale off it. */
const PARALLAX = 14;

export function LogoMark({ trackRef, className }) {
  const uid = useId().replace(/:/g, "");
  const hostRef = useRef(null);
  const prefersReduced = usePrefersReducedMotion();

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const near = useMotionValue(0);

  const soft = { stiffness: 90, damping: 22, mass: 1.1 };
  const sx = useSpring(px, soft);
  const sy = useSpring(py, soft);
  const sNear = useSpring(near, { stiffness: 120, damping: 26, mass: 0.8 });

  const rotateY = useTransform(sx, [-1, 1], [-TILT, TILT]);
  const rotateX = useTransform(sy, [-1, 1], [TILT, -TILT]);

  const frontX = useTransform(sx, [-1, 1], [-PARALLAX, PARALLAX]);
  const frontY = useTransform(sy, [-1, 1], [-PARALLAX * 0.6, PARALLAX * 0.6]);
  const coralX = useTransform(frontX, (v) => v * 0.6);
  const coralY = useTransform(frontY, (v) => v * 0.6);
  const shadowX = useTransform(frontX, (v) => v * 0.3);
  const shadowY = useTransform(frontY, (v) => v * 0.3);

  const specX = useTransform(sx, [-1, 1], [VB_X - VB_W * 0.15, VB_X + VB_W * 1.15]);
  const specY = useTransform(sy, [-1, 1], [VB_Y - VB_H * 0.1, VB_Y + VB_H * 1.1]);

  const shadowOpacity = useTransform(sNear, [0, 1], [0.42, 0.3]);
  const shadowScale = useTransform(sNear, [0, 1], [1, 1.05]);
  const shadowLift = useTransform(sNear, [0, 1], [18, 30]);
  const coralBrightOpacity = sNear;
  const glossOpacity = useTransform(sNear, [0, 1], [0.7, 1]);

  const breath = useMotionValue(1);

  useEffect(() => {
    if (prefersReduced) return;

    const area = trackRef?.current ?? hostRef.current;
    if (!area) return;

    let frame = 0;
    let latest = null;

    const apply = () => {
      frame = 0;
      if (!latest) return;
      const rect = area.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const nx = ((latest.x - rect.left) / rect.width) * 2 - 1;
      const ny = ((latest.y - rect.top) / rect.height) * 2 - 1;
      px.set(Math.max(-1, Math.min(1, nx)));
      py.set(Math.max(-1, Math.min(1, ny)));

      const host = hostRef.current?.getBoundingClientRect();
      if (host) {
        const cx = host.left + host.width / 2;
        const cy = host.top + host.height / 2;
        const dist = Math.hypot(latest.x - cx, latest.y - cy);
        const reach = Math.max(host.width, host.height) * 0.75;
        near.set(Math.max(0, Math.min(1, 1 - dist / reach)));
      }
    };

    const onMove = (event) => {
      latest = { x: event.clientX, y: event.clientY };
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const onLeave = () => {
      latest = null;
      px.set(0);
      py.set(0);
      near.set(0);
    };

    area.addEventListener("pointermove", onMove, { passive: true });
    area.addEventListener("pointerleave", onLeave);
    return () => {
      area.removeEventListener("pointermove", onMove);
      area.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [prefersReduced, trackRef, px, py, near]);

  useEffect(() => {
    if (prefersReduced) return;

    let cancelled = false;
    let timer;

    const cycle = () => {
      timer = setTimeout(
        async () => {
          if (cancelled) return;
          await animate(breath, 1.01, { duration: 1.5, ease: [0.37, 0, 0.63, 1] });
          if (cancelled) return;
          await animate(breath, 1, { duration: 1.5, ease: [0.37, 0, 0.63, 1] });
          if (!cancelled) cycle();
        },
        8000 + Math.random() * 4000
      );
    };

    cycle();
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [prefersReduced, breath]);

  const ids = {
    navyMask: `${uid}-navy-mask`,
    coralMask: `${uid}-coral-mask`,
    fullMask: `${uid}-full-mask`,
    gloss: `${uid}-gloss`,
    spec: `${uid}-spec`,
    blur: `${uid}-blur`,
    edge: `${uid}-edge`,
  };

  return (
    <div ref={hostRef} className={className} style={{ perspective: 1400 }}>
      <m.div
        style={
          prefersReduced
            ? undefined
            : {
                rotateX,
                rotateY,
                scale: breath,
                transformStyle: "preserve-3d",
                willChange: "transform",
              }
        }
      >
        <svg viewBox={MARK_VIEWBOX} role="img" aria-label="Theerrv" style={{ width: "100%", overflow: "visible" }}>
          <defs>
            <mask id={ids.navyMask} style={{ maskType: "alpha" }}>
              <image href="/logo-navy.png" x={VB_X} y={VB_Y} width={VB_W} height={VB_H} />
            </mask>
            <mask id={ids.coralMask} style={{ maskType: "alpha" }}>
              <image href="/logo-coral.png" x={VB_X} y={VB_Y} width={VB_W} height={VB_H} />
            </mask>
            <mask id={ids.fullMask} style={{ maskType: "alpha" }}>
              <image href="/logo-mark.png" x={VB_X} y={VB_Y} width={VB_W} height={VB_H} />
            </mask>

            <linearGradient id={ids.gloss} x1="0" y1="0" x2="0.25" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.38" />
              <stop offset="26%" stopColor="#cfe0ff" stopOpacity="0.16" />
              <stop offset="52%" stopColor="#ffffff" stopOpacity="0.04" />
              <stop offset="74%" stopColor="#000018" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#000018" stopOpacity="0.26" />
            </linearGradient>

            <linearGradient id={ids.edge} x1="0.15" y1="0" x2="0.6" y2="1">
              <stop offset="0%" stopColor="#7ea0e8" stopOpacity="0.30" />
              <stop offset="55%" stopColor="#7ea0e8" stopOpacity="0.05" />
              <stop offset="100%" stopColor="#7ea0e8" stopOpacity="0" />
            </linearGradient>

            <radialGradient id={ids.spec}>
              <stop offset="0%" stopColor="#dce7ff" stopOpacity="0.5" />
              <stop offset="45%" stopColor="#bcd0ff" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#bcd0ff" stopOpacity="0" />
            </radialGradient>

            <filter id={ids.blur} x="-30%" y="-30%" width="160%" height="160%" colorInterpolationFilters="sRGB">
              <feGaussianBlur stdDeviation="16" />
            </filter>
          </defs>

          {/* --- Back: the cast shadow. Moves least. -------------------------- */}
          <m.g
            style={prefersReduced ? undefined : { x: shadowX, y: shadowY, opacity: shadowOpacity }}
            opacity={prefersReduced ? 0.42 : undefined}
          >
            <m.g
              style={
                prefersReduced ? { transform: "translateY(18px)" } : { y: shadowLift, scale: shadowScale }
              }
            >
              <rect
                x={VB_X}
                y={VB_Y}
                width={VB_W}
                height={VB_H}
                fill="#02091c"
                mask={`url(#${ids.fullMask})`}
                filter={`url(#${ids.blur})`}
              />
            </m.g>
          </m.g>

          {/* --- Middle: the coral crescents. 60% parallax. ------------------- */}
          <m.g style={prefersReduced ? undefined : { x: coralX, y: coralY }}>
            <image href="/logo-coral.png" x={VB_X} y={VB_Y} width={VB_W} height={VB_H} />
            <m.rect
              x={VB_X}
              y={VB_Y}
              width={VB_W}
              height={VB_H}
              fill={CORAL_BRIGHT}
              mask={`url(#${ids.coralMask})`}
              style={prefersReduced ? { opacity: 0 } : { opacity: coralBrightOpacity }}
            />
          </m.g>

          {/* --- Front: the navy ribbon. Full parallax. ----------------------- */}
          <m.g style={prefersReduced ? undefined : { x: frontX, y: frontY }}>
            <image href="/logo-navy.png" x={VB_X} y={VB_Y} width={VB_W} height={VB_H} />

            <rect
              x={VB_X}
              y={VB_Y}
              width={VB_W}
              height={VB_H}
              fill={`url(#${ids.edge})`}
              mask={`url(#${ids.navyMask})`}
            />
            <m.rect
              x={VB_X}
              y={VB_Y}
              width={VB_W}
              height={VB_H}
              fill={`url(#${ids.gloss})`}
              mask={`url(#${ids.navyMask})`}
              style={prefersReduced ? { opacity: 0.7 } : { opacity: glossOpacity }}
            />

            {!prefersReduced && (
              <g mask={`url(#${ids.navyMask})`}>
                <m.ellipse
                  cx={0}
                  cy={0}
                  rx={VB_W * 0.42}
                  ry={VB_H * 0.5}
                  fill={`url(#${ids.spec})`}
                  style={{ x: specX, y: specY }}
                />
              </g>
            )}
          </m.g>
        </svg>
      </m.div>
    </div>
  );
}

export default LogoMark;
