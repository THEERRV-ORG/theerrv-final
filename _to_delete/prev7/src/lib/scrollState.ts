/**
 * Shared, mutable frame state.
 *
 * Deliberately NOT React state. Scroll position and pointer position change
 * every frame; routing them through React would re-render the tree 60 times a
 * second and fight the render loop for ownership of the same transforms.
 *
 * Ownership contract:
 *   - ScrollTrigger writes `progress`.  Nothing else may write it.
 *   - The pointer listener writes `pointer`. Nothing else may write it.
 *   - useFrame reads both and owns every object transform derived from them.
 */
export const frameState = {
  /** Continuous station position, 0 .. (stationCount - 1). */
  progress: 0,
  /** Normalised pointer, -1 .. 1 on both axes. */
  pointer: { x: 0, y: 0 },
  /** Damped pointer, written by the rig each frame. */
  pointerDamped: { x: 0, y: 0 },
  /** True once the preloader has handed off. */
  revealed: false,
};

export function resetFrameState() {
  frameState.progress = 0;
  frameState.pointer.x = 0;
  frameState.pointer.y = 0;
  frameState.pointerDamped.x = 0;
  frameState.pointerDamped.y = 0;
  frameState.revealed = false;
}
