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
/**
 * The mark itself turns through a bounded arc as you scroll (owned by
 * LogoMark3D), so the rig deliberately does less than it would for a static
 * subject — it changes height, distance and roll to light the mark from
 * different angles, and lets the object's own rotation reveal its depth.
 * Both moving hard at once reads as churn.
 */
const KEYFRAMES: Keyframe[] = [
  // Distances are held far enough back that the mark never crops at the frame
  // edge as it turns — a logo clipped mid-rotation reads as a mistake in a way
  // an abstract form does not.
  // 0 — establishing. Mark right of frame, headline on the left.
  { pos: [2, 0.8, 25], look: [-5, -0.3, 0] },
  // 1 — stepped left and up; the extrusion's top edge catches the key.
  { pos: [-3.5, 3.2, 22], look: [-4.2, 0.4, 0], roll: -1.5 },
  // 2 — from above, raking across the bevel.
  { pos: [1.5, 8, 21], look: [-4, 0.6, 0] },
  // 3 — dropped low, closest pass. The side walls do the work here.
  { pos: [-4, -4.5, 21], look: [-3.8, 0.8, 0], roll: 2 },
  // 4 — swung right, near side-on, so the depth reads as depth.
  { pos: [8, -1, 22], look: [-3.2, 0.3, 0], roll: -1 },
  // 5 — wide and near square-on. The mark entire, resolved.
  { pos: [-1.5, 1.4, 24], look: [-5, 0, 0] },
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
      // Far enough back that the mark's full width clears a narrow frame.
      const pull = 1 + (1 - Math.min(size.width / 900, 1)) * 1.36;
      scratch.pos.multiplyScalar(pull);
      scratch.look.x *= 0.1;
      // Push the mark into the upper third. The copy occupies the lower half
      // on these widths, and a white mark sitting behind white type is the one
      // composition a scrim cannot rescue.
      scratch.look.y -= 8;
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
