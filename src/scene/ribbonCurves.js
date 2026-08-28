import * as THREE from "three";

/**
 * The two ribbon trajectories, built as an intertwined double helix: both orbit
 * a common vertical axis that gently bends left↔right and front↔back as it
 * descends, offset by half a turn so they wrap around each other — a single
 * continuous twisted pair, not two independent blades. Because they orbit, each
 * ribbon naturally passes in front of and behind the other on the way down.
 *
 * Intentionally NOT the brand mark — an independent visual path.
 */

export const SPAN = 34; // half-height of the ribbon field, in world units
// Extra length continuing below the main body so the ribbon flows off the
// bottom of the page behind the footer instead of ending in view.
export const BOTTOM_EXTRA = 24;

const AXIS_BEND_Z = 2.2;

function smoothstep(a, b, x) {
  const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

/**
 * The horizontal placement is BAKED INTO THE SHAPE, top → bottom: the centerline
 * flows right → left → right → left → strong-left → right → centre down its own
 * length, with deliberately uneven amplitudes. Because parameter t ≈ scroll
 * position, scrolling simply travels down this fixed asymmetric ribbon and
 * reveals each side in turn — the ribbon does not slide sideways as a whole.
 * `t` runs 0 (top / hero) → 1 (bottom / footer).
 */
const AXIS_X = [
  { t: 0.0, x: 4.2 },
  { t: 0.0625, x: 4.9 }, // hero — centre/right
  { t: 0.1875, x: -8.6 }, // purpose — left
  { t: 0.3125, x: 9.6 }, // services — right
  { t: 0.4375, x: -10.2 }, // transformation — left
  { t: 0.5625, x: 9.0 }, // why — right
  { t: 0.6875, x: -11.2 }, // impact — strong left, widest
  { t: 0.8125, x: 9.6 }, // faq — right
  { t: 0.9375, x: 3.4 }, // cta — converge centre/right
  { t: 1.0, x: 2.2 }, // footer
];

function axisX(t) {
  let i = 0;
  while (i < AXIS_X.length - 2 && t > AXIS_X[i + 1].t) i++;
  const a = AXIS_X[i];
  const b = AXIS_X[i + 1];
  return a.x + (b.x - a.x) * smoothstep(a.t, b.t, t);
}

function axisPoint(t) {
  return new THREE.Vector3(
    axisX(t),
    SPAN - t * SPAN * 2, // +SPAN (top) → -SPAN (bottom)
    Math.cos(t * Math.PI * 1.6) * AXIS_BEND_Z - 1.2,
  );
}

// Both ribbons wrap the SAME invisible axis, but with different radius and a
// different number of turns and phase — so they are related, not mirrored, and
// their crossings never land in the same place twice.
function helixCurve(phase, radius, turns, xOffset = 0) {
  const pts = [];
  const N = 64;
  for (let i = 0; i < N; i++) {
    const t = i / (N - 1);
    const theta = t * turns * Math.PI * 2 + phase;
    const a = axisPoint(t);
    pts.push(
      new THREE.Vector3(
        a.x + xOffset + Math.cos(theta) * radius,
        a.y,
        a.z + Math.sin(theta) * radius,
      ),
    );
  }
  // Continue the helix below the main body (same twist rate, axis easing toward
  // centre) so the strip keeps flowing off the bottom of the page rather than
  // terminating. This tail lives beyond the section-mapped region, so it does
  // not affect where the upper sections sit.
  const base = axisPoint(1);
  const ratio = BOTTOM_EXTRA / (SPAN * 2);
  const TAIL_STEPS = 12;
  for (let k = 1; k <= TAIL_STEPS; k++) {
    const tt = k / TAIL_STEPS;
    const theta = (1 + tt * ratio) * turns * Math.PI * 2 + phase;
    pts.push(
      new THREE.Vector3(
        base.x * (1 - tt * 0.5) + xOffset + Math.cos(theta) * radius,
        base.y - tt * BOTTOM_EXTRA,
        base.z + Math.sin(theta) * radius,
      ),
    );
  }
  return new THREE.CatmullRomCurve3(pts, false, "centripetal");
}

// Opposite offsets hold each strip in its own lane, so there is always a clear
// gap between the two the whole length. A small orbit radius and low turn count
// keep the twist a subtle weave rather than a coiled double helix. Different
// radii and phase keep them related, not a mirror image.
export function ribbonACurve() {
  return helixCurve(0, 1.4, 1.6, -3.6);
}

export function ribbonBCurve() {
  return helixCurve(Math.PI, 1.6, 1.6, 3.6);
}

/**
 * Materials read as thick translucent coloured glass — violet for A, warm
 * coral for B — shaped by transmission, attenuation, clearcoat reflections and a
 * soft sheen rather than flat emissive fills. `attenuation` tints the light that
 * passes through the volume (darker/softer in the centre, brighter at the thin
 * edges); `sheen` adds the soft lavender/warm rim glow.
 */
export const RIBBON_A = {
  color: "#241a5e", // deep indigo tint
  emissive: "#6a5cc8", // faint internal violet glow
  emissiveIntensity: 0.16,
  attenuation: "#4a37b0", // violet glass tint through the volume
  attenuationDistance: 3.6,
  sheen: "#c3b4ff", // lavender edge sheen
  transmission: 0.85,
  thickness: 3.2,
  roughness: 0.12,
  envMapIntensity: 1.9,
};

// The red pigment reads denser than the violet, so B is tuned to be MORE
// transmissive with a longer attenuation and a thinner volume — softer in the
// centre, brighter at the edges, more light travelling through it.
export const RIBBON_B = {
  color: "#471a12", // low-saturation base so transmission dominates
  emissive: "#ff7059",
  emissiveIntensity: 0.12,
  attenuation: "#d0503a", // warmer, lighter glass tint
  attenuationDistance: 5.2, // less absorption → softer, lighter centre
  sheen: "#ffd2b8",
  transmission: 0.93, // glassier than the violet to compensate for the hue
  thickness: 2.5, // thinner volume → less dense red fill
  roughness: 0.1,
  envMapIntensity: 2.2, // stronger edge reflections / specular streaks
};
