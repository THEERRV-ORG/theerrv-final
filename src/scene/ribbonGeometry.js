import * as THREE from "three";

/**
 * Build a twisted ribbon: a rounded-rectangle cross-section (wide, thin, with
 * rounded edges — a physical strip, not a tube) swept along a 3D curve.
 *
 * Orientation uses a rotation-minimising (parallel-transport) frame so the
 * strip never flips, then adds a twist that grows along the length so the
 * ribbon turns about its own axis as it travels. Geometry is built once and
 * reused — nothing here runs per frame.
 */

/** Points of a rounded rectangle centred on the origin, in the (x, y) plane. */
function roundedRectProfile(width, thickness, radius, cornerSteps) {
  const hw = width / 2;
  const ht = thickness / 2;
  const r = Math.min(radius, ht, hw);
  const pts = [];
  // Four corners, each an arc; centres of the corner circles.
  const corners = [
    { cx: hw - r, cy: ht - r, a0: 0 }, // top-right
    { cx: -(hw - r), cy: ht - r, a0: Math.PI / 2 }, // top-left
    { cx: -(hw - r), cy: -(ht - r), a0: Math.PI }, // bottom-left
    { cx: hw - r, cy: -(ht - r), a0: (3 * Math.PI) / 2 }, // bottom-right
  ];
  for (const c of corners) {
    for (let s = 0; s <= cornerSteps; s++) {
      const a = c.a0 + (s / cornerSteps) * (Math.PI / 2);
      pts.push([c.cx + Math.cos(a) * r, c.cy + Math.sin(a) * r]);
    }
  }
  return pts;
}

export function makeRibbonGeometry(curve, opts = {}) {
  const {
    segments = 320,
    width = 3.2,
    thickness = 0.34,
    radius = 0.16,
    cornerSteps = 3,
    twists = 3,
    twistPhase = 0,
  } = opts;

  const profile = roundedRectProfile(width, thickness, radius, cornerSteps);
  const M = profile.length;

  const points = curve.getSpacedPoints(segments);
  const tangents = [];
  for (let i = 0; i <= segments; i++) {
    tangents.push(curve.getTangentAt(i / segments).normalize());
  }

  // Parallel-transport frame: seed a normal perpendicular to the first tangent,
  // then rotate it by the minimal rotation between successive tangents.
  const up = new THREE.Vector3(0, 0, 1);
  let normal = new THREE.Vector3().crossVectors(tangents[0], up);
  if (normal.lengthSq() < 1e-4) normal = new THREE.Vector3(1, 0, 0);
  normal.normalize();

  const positions = new Float32Array((segments + 1) * M * 3);
  const q = new THREE.Quaternion();
  const binormal = new THREE.Vector3();
  const nRot = new THREE.Vector3();
  const bRot = new THREE.Vector3();
  const vtx = new THREE.Vector3();

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const T = tangents[i];
    if (i > 0) {
      q.setFromUnitVectors(tangents[i - 1], T);
      normal.applyQuaternion(q).normalize();
    }
    // Re-orthogonalise against drift.
    normal.addScaledVector(T, -normal.dot(T)).normalize();
    binormal.crossVectors(T, normal).normalize();

    const twist = twistPhase + t * twists * Math.PI * 2;
    const cs = Math.cos(twist);
    const sn = Math.sin(twist);

    const C = points[i];
    for (let j = 0; j < M; j++) {
      const px = profile[j][0];
      const py = profile[j][1];
      // Rotate the profile within the (normal, binormal) plane by the twist.
      nRot.copy(normal).multiplyScalar(px * cs - py * sn);
      bRot.copy(binormal).multiplyScalar(px * sn + py * cs);
      vtx.copy(C).add(nRot).add(bRot);
      const o = (i * M + j) * 3;
      positions[o] = vtx.x;
      positions[o + 1] = vtx.y;
      positions[o + 2] = vtx.z;
    }
  }

  const indices = [];
  for (let i = 0; i < segments; i++) {
    for (let j = 0; j < M; j++) {
      const jn = (j + 1) % M;
      const a = i * M + j;
      const b = i * M + jn;
      const c = (i + 1) * M + j;
      const d = (i + 1) * M + jn;
      indices.push(a, c, b, b, c, d);
    }
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}
