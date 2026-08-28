import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import { frameState } from "./scrollState";

/**
 * Camera rig — one keyframe per scroll station (one per About section). Between
 * stations the camera eases from one to the next, so every move has a
 * destination and the mark is always framed, never wandering. Pointer input
 * adds a small damped offset on top. Ported from theerrv-site.
 *
 * The mark alternates sides down the page: even stations frame it to the RIGHT
 * (look-at at negative x) with the copy on the left; odd stations are the mirror
 * image — mark to the LEFT (positive look-at x), copy on the right. The copy
 * column and its scrim flip to match in AboutPage.module.css.
 */

export const STATION_COUNT = 6;

// Larger |look.x| swings the mark harder to the frame edge, clear of the copy
// column. Kept inside the range where the mark still never crops as it turns.
const KEYFRAMES = [
  { pos: [2, 0.8, 25], look: [-7.4, -0.3, 0] },            // 0 — mark right, establishing
  { pos: [3.5, 3.2, 22], look: [6.6, 0.4, 0], roll: 1.5 }, // 1 — mark left, up
  { pos: [1.5, 8, 21], look: [-6.6, 0.6, 0] },             // 2 — mark right, from above
  { pos: [4, -4.5, 21], look: [6.2, 0.8, 0], roll: -2 },   // 3 — mark left, low close pass
  { pos: [8, -1, 22], look: [-5.8, 0.3, 0], roll: -1 },    // 4 — mark right, near side-on
  { pos: [1.5, 1.4, 24], look: [7.4, 0, 0] },              // 5 — mark left, wide resolved
];

const DEG = Math.PI / 180;
const smooth = (t) => t * t * (3 - 2 * t);

export default function LogoRig() {
  const camera = useThree((s) => s.camera);
  const size = useThree((s) => s.size);
  const invalidate = useThree((s) => s.invalidate);

  const scratch = useMemo(
    () => ({
      pos: new THREE.Vector3(),
      look: new THREE.Vector3(),
      tmp: new THREE.Vector3(),
      current: new THREE.Vector3(2, 1.5, 40),
      currentLook: new THREE.Vector3(-5.5, -0.5, 0),
    }),
    [],
  );

  const rollRef = useRef(0);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.1);
    const p = THREE.MathUtils.clamp(frameState.progress, 0, STATION_COUNT - 1);
    const i = Math.min(Math.floor(p), KEYFRAMES.length - 2);
    const t = smooth(p - i);

    const a = KEYFRAMES[i];
    const b = KEYFRAMES[i + 1];

    scratch.pos.set(...a.pos).lerp(scratch.tmp.set(...b.pos), t);
    scratch.look.set(...a.look).lerp(scratch.tmp.set(...b.look), t);

    // Narrow viewports: pull back so the loop never crops, collapse the
    // horizontal offset (type stacks below the mark), and lift the mark clear
    // of the copy as a fraction of frame height.
    const portrait = size.width < 900;
    if (portrait) {
      const pull = 1 + (1 - Math.min(size.width / 900, 1)) * 1.45;
      scratch.pos.multiplyScalar(pull);
      scratch.look.x *= 0.1;
      scratch.look.y -= scratch.pos.z * 0.11;
    }

    const damping = Math.min(dt * 3.2, 1);
    frameState.pointerDamped.x += (frameState.pointer.x - frameState.pointerDamped.x) * damping;
    frameState.pointerDamped.y += (frameState.pointer.y - frameState.pointerDamped.y) * damping;

    // Pointer parallax — a small damped camera offset so the mark subtly reacts
    // to the mouse. It influences the shot; it does not author it.
    scratch.pos.x += frameState.pointerDamped.x * 2.6;
    scratch.pos.y += frameState.pointerDamped.y * 1.9;

    const follow = Math.min(dt * 2.8, 1);
    scratch.current.lerp(scratch.pos, follow);
    scratch.currentLook.lerp(scratch.look, follow);

    camera.position.copy(scratch.current);
    camera.lookAt(scratch.currentLook);

    const targetRoll = ((a.roll ?? 0) + ((b.roll ?? 0) - (a.roll ?? 0)) * t) * DEG;
    rollRef.current += (targetRoll - rollRef.current) * follow;
    camera.rotateZ(rollRef.current);

    invalidate();
  });

  return null;
}
