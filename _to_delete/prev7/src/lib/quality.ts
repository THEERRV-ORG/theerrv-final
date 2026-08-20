/**
 * Device-aware quality ladder.
 *
 * Not "desktop vs mobile" — a tier the whole scene reads from, so instance
 * count, pixel ratio and shadow work all scale together off one decision.
 */

export type Tier = "high" | "medium" | "low" | "off";

export interface QualitySettings {
  tier: Tier;
  /** Number of lattice instances. */
  count: number;
  /** Upper bound on device pixel ratio. */
  dpr: [number, number];
  /** Whether the idle drift animation runs. */
  drift: boolean;
}

const SETTINGS: Record<Tier, QualitySettings> = {
  high: { tier: "high", count: 2600, dpr: [1, 1.75], drift: true },
  medium: { tier: "medium", count: 1500, dpr: [1, 1.5], drift: true },
  low: { tier: "low", count: 700, dpr: [1, 1], drift: false },
  off: { tier: "off", count: 0, dpr: [1, 1], drift: false },
};

export function detectWebGL(): boolean {
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

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function detectQuality(): QualitySettings {
  if (typeof window === "undefined") return SETTINGS.off;
  if (!detectWebGL()) return SETTINGS.off;

  const nav = navigator as Navigator & {
    deviceMemory?: number;
    hardwareConcurrency?: number;
  };

  const memory = nav.deviceMemory ?? 8;
  const cores = nav.hardwareConcurrency ?? 8;
  const narrow = window.matchMedia("(max-width: 768px)").matches;
  const coarse = window.matchMedia("(pointer: coarse)").matches;

  // Reduced motion keeps the scene, but static and cheap — the composition
  // survives, the movement does not.
  if (prefersReducedMotion()) return { ...SETTINGS.low, drift: false };

  if (narrow || coarse) {
    return memory <= 4 || cores <= 4 ? SETTINGS.low : SETTINGS.medium;
  }

  if (memory <= 4 || cores <= 4) return SETTINGS.low;
  if (memory <= 8 || cores <= 8) return SETTINGS.medium;
  return SETTINGS.high;
}
