import * as THREE from "three";

/**
 * Read a colour out of the CSS token layer so the 3D scene and the DOM share
 * one design system — a token swap re-skins both at once.
 */
export function readColorToken(name, fallback) {
  if (typeof window === "undefined") return new THREE.Color(fallback);
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  if (!raw) return new THREE.Color(fallback);
  try {
    return new THREE.Color(raw);
  } catch {
    return new THREE.Color(fallback);
  }
}
