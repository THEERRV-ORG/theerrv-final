"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

import { frameState } from "@/lib/scrollState";

/**
 * Camera rig.
 *
 * One keyframe per scroll station: a position, a look-at target, and an
 * optional roll. Between stations the camera eases from one to the next, so
 * every move has a destination — the camera is always framing something, never
 * wandering. Pointer input adds a small damped offset on top; it influences the
 * shot, it does not author it.
 *
 * The arc is deliberate: wide establishing shot, three closer readings of the
 * form, one intimate pass through the middle of the loop, then a wide
 * resolution. Same grammar as a title sequence.
 */

export const STATION_COUNT = 6;

interface Keyframe {
  pos: [number, number, number];
  look: [number, number, number];
  roll?: number;
}

/**
 * Every look-at target is pushed to negative x, which swings the subject into
 * the right of the frame and leaves the left column clear for typography. The
 * scrim guarantees contrast; this keeps the composition from needing it.
 */
const KEYFRAMES: Keyframe[] = [
  // 0 — establishing. The whole loop, right of frame, headline on the left.
  { pos: [2.5, 1.2, 34], look: [-6.5, -0.4, 0] },
  // Variation comes from angle, not distance. Pushing in close turns the band
  // into abstract sheets of colour that fill the frame and stop reading as a
  // form, so the rig holds a fairly consistent working distance throughout.
  // 1 — off-axis from the left, slightly above.
  { pos: [-6, 4, 27], look: [-6, 0.5, 0], roll: -1.5 },
  // 2 — from high above, where the stroke crosses itself.
  { pos: [1, 14, 24], look: [-5, 0, 0] },
  // 3 — dropped below the loop, looking up through the crossing.
  { pos: [-2, -6, 24], look: [-5, 1, 0], roll: 2 },
  // 4 — the right lobe, near side-on.
  { pos: [11, -2, 25], look: [-3, 0.4, 0], roll: -1 },
  // 5 — wide again, rotated. The form entire, resolved.
  { pos: [-3, 2.2, 31], look: [-5.5, 0, 0] },
];

const DEG = Math.PI / 180;

function smooth(t: number) {
  return t * t * (3 - 2 * t);
}

export function Rig() {
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

    // Narrow viewports need the camera further back or the loop crops badly,
    // and the hero's look-at offset has to collapse because the type stacks
    // above the form instead of sitting beside it.
    const portrait = size.width < 900;
    if (portrait) {
      // The form is stood upright at these widths (see Ribbon), so it needs
      // only a modest pull-back. The horizontal offset collapses because the
      // type stacks below the form rather than beside it, and the look-at drops
      // so the loop sits high in frame with the copy beneath it.
      const pull = 1 + (1 - Math.min(size.width / 900, 1)) * 0.3;
      scratch.pos.multiplyScalar(pull);
      scratch.look.x *= 0.12;
      scratch.look.y -= 2.6;
    }

    const damping = Math.min(dt * 3.2, 1);
    frameState.pointerDamped.x +=
      (frameState.pointer.x - frameState.pointerDamped.x) * damping;
    frameState.pointerDamped.y +=
      (frameState.pointer.y - frameState.pointerDamped.y) * damping;

    scratch.pos.x += frameState.pointerDamped.x * 1.8;
    scratch.pos.y += frameState.pointerDamped.y * 1.2;

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
