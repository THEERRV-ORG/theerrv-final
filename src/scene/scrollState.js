/**
 * Shared, mutable frame state — deliberately NOT React state.
 *
 * Scroll and pointer change every frame; routing them through React would
 * re-render the tree 60×/second and fight the render loop for the same
 * transforms. Ownership contract:
 *   - ScrollTrigger writes `progress`.  Nothing else may write it.
 *   - The pointer listener writes `pointer`. Nothing else may write it.
 *   - useFrame reads both and owns every object transform derived from them.
 */
export const frameState = {
  /** Whole-homepage scroll progress, 0 (top) .. 1 (bottom). ScrollTrigger owns it. */
  scroll: 0,
  /** Continuous camera-station position for the About logo scene, 0 .. (stations-1). */
  progress: 0,
  /** True once a scene may fade its subject in (no preloader here — set on mount). */
  revealed: false,
  /** Normalised pointer, -1 .. 1 on both axes. */
  pointer: { x: 0, y: 0 },
  /** Damped pointer, written by the scene each frame. */
  pointerDamped: { x: 0, y: 0 },
};
