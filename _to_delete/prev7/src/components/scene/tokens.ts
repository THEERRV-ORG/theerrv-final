import * as THREE from "three";

/**
 * Read a colour out of the CSS token layer.
 *
 * The 3D scene and the DOM share one design system. Lighting and material
 * colours resolve from the same custom properties the typography uses, so a
 * token swap re-skins both at once instead of leaving the canvas stranded on
 * hardcoded values.
 */
export function readColorToken(name: string, fallback: string): THREE.Color {
  if (typeof window === "undefined") return new THREE.Color(fallback);
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  if (!raw) return new THREE.Color(fallback);
  try {
    return new THREE.Color(raw);
  } catch {
    return new THREE.Color(fallback);
  }
}
