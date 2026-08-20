import * as THREE from "three";

/**
 * The ribbon path.
 *
 * The design system describes the mark as "one continuous stroke — a loop that
 * returns to itself", and reads ownership into that: we take the vision end to
 * end. The scene expresses the same idea as a form in space.
 *
 * IMPORTANT: this is an abstract lemniscate, deliberately NOT a reproduction of
 * the logo. The design system is explicit that the mark is never redrawn and
 * never recoloured — the real SVG is used at full strength in the nav and as
 * the low-opacity watermark, and nowhere else. What is shared here is the idea
 * of a single unbroken loop, not the artwork.
 */

const TAU = Math.PI * 2;

export const RIBBON_SEGMENTS = 720;

/** Lemniscate of Bernoulli, lifted into z so the loop reads in three dimensions. */
export function buildRibbonCurve(): THREE.CatmullRomCurve3 {
  const points: THREE.Vector3[] = [];
  const N = 240;

  for (let i = 0; i < N; i++) {
    const t = (i / N) * TAU;
    const denom = 1 + Math.sin(t) * Math.sin(t);
    // Scale is deliberately modest. The loop is a subject in the frame with
    // room around it, not a backdrop that fills the viewport — at larger sizes
    // it stops reading as a form and becomes abstract sheets of colour.
    points.push(
      new THREE.Vector3(
        (9.5 * Math.cos(t)) / denom,
        (6.2 * Math.sin(t) * Math.cos(t)) / denom,
        3.0 * Math.sin(2 * t),
      ),
    );
  }

  const curve = new THREE.CatmullRomCurve3(points, true, "centripetal", 0.5);
  return curve;
}

export interface RibbonGeometryOptions {
  /** Half-width of the band. */
  width?: number;
  /** Number of full twists distributed along the loop. */
  twists?: number;
  /** Lengthwise resolution. Scaled down on weaker devices. */
  segments?: number;
}

/**
 * A flat band swept along the curve, twisting as it goes.
 *
 * A tube would read as a wire; a band has two distinguishable faces, which is
 * what lets the material show indigo on one side and coral on the reverse —
 * the same construction as the mark itself.
 */
export function buildRibbonGeometry(
  curve: THREE.CatmullRomCurve3,
  { width = 0.68, twists = 2, segments = RIBBON_SEGMENTS }: RibbonGeometryOptions = {},
): THREE.BufferGeometry {
  const frames = curve.computeFrenetFrames(segments, true);
  const positions = new Float32Array((segments + 1) * 2 * 3);
  const normals = new Float32Array((segments + 1) * 2 * 3);
  const us = new Float32Array((segments + 1) * 2);
  const sides = new Float32Array((segments + 1) * 2);

  const point = new THREE.Vector3();
  const dir = new THREE.Vector3();
  const scratch = new THREE.Vector3();
  const faceNormal = new THREE.Vector3();

  for (let i = 0; i <= segments; i++) {
    const u = i / segments;
    curve.getPointAt(u % 1, point);

    const frameIndex = Math.min(i, segments - 1);
    const normal = frames.normals[frameIndex];
    const binormal = frames.binormals[frameIndex];
    const tangent = frames.tangents[frameIndex];

    // Twist the band around its own path. Closed loop, so the twist count must
    // be a whole number or the two ends will not meet.
    const angle = u * twists * TAU;
    dir
      .copy(normal)
      .multiplyScalar(Math.cos(angle))
      .add(scratch.copy(binormal).multiplyScalar(Math.sin(angle)))
      .normalize();

    faceNormal.crossVectors(tangent, dir).normalize();

    for (let s = 0; s < 2; s++) {
      const sign = s === 0 ? 1 : -1;
      const idx = (i * 2 + s) * 3;
      positions[idx] = point.x + dir.x * width * sign;
      positions[idx + 1] = point.y + dir.y * width * sign;
      positions[idx + 2] = point.z + dir.z * width * sign;

      normals[idx] = faceNormal.x;
      normals[idx + 1] = faceNormal.y;
      normals[idx + 2] = faceNormal.z;

      us[i * 2 + s] = u;
      sides[i * 2 + s] = sign;
    }
  }

  const indices: number[] = [];
  for (let i = 0; i < segments; i++) {
    const a = i * 2;
    const b = i * 2 + 1;
    const c = (i + 1) * 2;
    const d = (i + 1) * 2 + 1;
    indices.push(a, b, c);
    indices.push(b, d, c);
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.setAttribute("normal", new THREE.BufferAttribute(normals, 3));
  geo.setAttribute("aU", new THREE.BufferAttribute(us, 1));
  geo.setAttribute("aSide", new THREE.BufferAttribute(sides, 1));
  geo.setIndex(indices);
  geo.computeBoundingSphere();

  return geo;
}
