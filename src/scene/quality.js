/**
 * Device-aware quality ladder. One tier the whole scene reads from, so pixel
 * ratio and geometry detail scale together off a single decision.
 */

const SETTINGS = {
  high: { tier: "high", dpr: [1, 1.75] },
  medium: { tier: "medium", dpr: [1, 1.5] },
  low: { tier: "low", dpr: [1, 1] },
  off: { tier: "off", dpr: [1, 1] },
};

export function detectWebGL() {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl2") ??
        canvas.getContext("webgl") ??
        canvas.getContext("experimental-webgl"),
    );
  } catch {
    return false;
  }
}

export function prefersReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function detectQuality() {
  if (typeof window === "undefined") return SETTINGS.off;
  if (!detectWebGL()) return SETTINGS.off;

  const nav = navigator;
  const memory = nav.deviceMemory ?? 8;
  const cores = nav.hardwareConcurrency ?? 8;
  const narrow = window.matchMedia("(max-width: 768px)").matches;
  const coarse = window.matchMedia("(pointer: coarse)").matches;

  // Reduced motion keeps the scene, but static and cheap.
  if (prefersReducedMotion()) return SETTINGS.low;

  if (narrow || coarse) {
    return memory <= 4 || cores <= 4 ? SETTINGS.low : SETTINGS.medium;
  }
  if (memory <= 4 || cores <= 4) return SETTINGS.low;
  if (memory <= 8 || cores <= 8) return SETTINGS.medium;
  return SETTINGS.high;
}
