import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";

import { frameState } from "./scrollState";
import { readColorToken } from "./tokens";
import { MARK_CORAL_PATH, MARK_NAVY_PATH, MARK_VIEWBOX } from "./markPaths";
import { STATION_COUNT } from "./LogoRig";

/* ===========================================================================
   The brand mark as a solid object — the real traced vector paths, extruded.
   Coral crescents behind, ivory ribbon in front, exactly as the lockup sets
   them. Depth + a small bevel turn "logo on a card" into "logo as an object in
   a room". Ported from theerrv-site and re-skinned onto our dark theme.
   ======================================================================== */

const TARGET_WIDTH = 10;
const DEPTH_RATIO = 0.062;

const vertexShader = /* glsl */ `
  varying vec3 vNormalView;
  varying vec3 vViewDir;
  varying float vDepth;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vNormalView = normalize(normalMatrix * normal);
    vViewDir = normalize(-mv.xyz);
    vDepth = -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;
  uniform vec3 uColor;
  uniform vec3 uAccent;
  uniform vec3 uInk;
  uniform float uReveal;
  uniform float uFogNear;
  uniform float uFogFar;
  uniform float uSpecular;
  uniform float uRimAccent;
  varying vec3 vNormalView;
  varying vec3 vViewDir;
  varying float vDepth;
  void main() {
    vec3 n = normalize(vNormalView);
    vec3 v = normalize(vViewDir);
    vec3 keyDir = normalize(vec3(-0.42, 0.78, 0.62));
    vec3 fillDir = normalize(vec3(0.72, -0.22, 0.35));
    float key = pow(dot(n, keyDir) * 0.5 + 0.5, 1.8);
    float fill = max(dot(n, fillDir), 0.0) * 0.26;
    vec3 h = normalize(keyDir + v);
    float spec = pow(max(dot(n, h), 0.0), 46.0) * uSpecular;
    float rim = pow(1.0 - max(dot(n, v), 0.0), 3.4);
    vec3 color = uColor * (0.26 + key * 0.86 + fill);
    color += vec3(1.0) * spec;
    color += uAccent * rim * uRimAccent;
    float fog = smoothstep(uFogNear, uFogFar, vDepth);
    color = mix(color, uInk, fog);
    gl_FragColor = vec4(color, uReveal);
  }
`;

function makeMaterial(color, specular, rimAccent) {
  return new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    side: THREE.DoubleSide,
    transparent: true,
    uniforms: {
      uColor: { value: new THREE.Color(color) },
      uAccent: { value: new THREE.Color("#ff5a4f") },
      uInk: { value: new THREE.Color("#070d1e") },
      uReveal: { value: 0 },
      uFogNear: { value: 26 },
      uFogFar: { value: 72 },
      uSpecular: { value: specular },
      uRimAccent: { value: rimAccent },
    },
  });
}

export default function LogoMark3D({ quality }) {
  const invalidate = useThree((s) => s.invalidate);
  const groupRef = useRef(null);
  const revealRef = useRef(0);

  const detail =
    quality.tier === "low"
      ? { curveSegments: 6, bevelSegments: 1 }
      : quality.tier === "medium"
        ? { curveSegments: 10, bevelSegments: 2 }
        : { curveSegments: 16, bevelSegments: 3 };

  const { coralGeo, navyGeo, fitScale, center } = useMemo(() => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${MARK_VIEWBOX}">
      <path d="${MARK_CORAL_PATH}"/>
      <path d="${MARK_NAVY_PATH}"/>
    </svg>`;

    const parsed = new SVGLoader().parse(svg);
    const [vbW] = MARK_VIEWBOX.split(" ").map(Number).slice(2);
    const depth = vbW * DEPTH_RATIO;

    const extrude = (shapePath) => {
      const shapes = shapePath.toShapes();
      const geo = new THREE.ExtrudeGeometry(shapes, {
        depth,
        bevelEnabled: true,
        bevelThickness: depth * 0.14,
        bevelSize: depth * 0.1,
        bevelOffset: 0,
        bevelSegments: detail.bevelSegments,
        curveSegments: detail.curveSegments,
      });
      geo.scale(1, -1, 1); // SVG y-down → scene y-up
      return geo;
    };

    const coral = extrude(parsed.paths[0]);
    const navy = extrude(parsed.paths[1]);

    const box = new THREE.Box3()
      .setFromBufferAttribute(coral.getAttribute("position"))
      .union(new THREE.Box3().setFromBufferAttribute(navy.getAttribute("position")));
    const size = box.getSize(new THREE.Vector3());
    const mid = box.getCenter(new THREE.Vector3());

    return { coralGeo: coral, navyGeo: navy, fitScale: TARGET_WIDTH / size.x, center: mid };
  }, [detail.bevelSegments, detail.curveSegments]);

  // Slightly stronger specular + rim than the reference for a more premium,
  // cinematic glint as the mark turns under the (DOM) key lighting.
  const coralMat = useMemo(() => makeMaterial("#ff5a4f", 0.45, 0.28), []);
  const bodyMat = useMemo(() => makeMaterial("#f3f0e8", 0.78, 0.13), []);

  // Colour from the CSS token layer, so scene and DOM never drift apart. The
  // ribbon is the light ivory (reversed lockup on the dark ground).
  useEffect(() => {
    const ink = readColorToken("--navy-deep", "#070d1e");
    const accent = readColorToken("--coral", "#ff5a4f");
    coralMat.uniforms.uColor.value = accent;
    bodyMat.uniforms.uColor.value = readColorToken("--ivory", "#f3f0e8");
    for (const m of [coralMat, bodyMat]) {
      m.uniforms.uAccent.value = accent;
      m.uniforms.uInk.value = ink;
    }
  }, [coralMat, bodyMat]);

  useEffect(() => {
    return () => {
      coralGeo.dispose();
      navyGeo.dispose();
      coralMat.dispose();
      bodyMat.dispose();
    };
  }, [coralGeo, navyGeo, coralMat, bodyMat]);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.1);
    const fadeDt = Math.min(delta, 0.5);

    const target = frameState.revealed ? 1 : 0;
    revealRef.current += (target - revealRef.current) * Math.min(fadeDt * 2.2, 1);
    coralMat.uniforms.uReveal.value = revealRef.current;
    bodyMat.uniforms.uReveal.value = revealRef.current;

    const g = groupRef.current;
    if (!g) return;

    const p = THREE.MathUtils.clamp(frameState.progress, 0, STATION_COUNT - 1);
    const t = p / (STATION_COUNT - 1);

    // Rotation: an entrance that resolves once, a bounded arc driven by scroll,
    // and a small additive pointer tilt. Nothing spins on a timer.
    const entrance = 1 - revealRef.current;
    const baseY = THREE.MathUtils.lerp(-0.42, 0.5, t) - entrance * 1.05;
    const baseX = THREE.MathUtils.lerp(0.06, -0.16, t);

    // The mark also tilts toward the pointer — a subtle additive lean on top of
    // the scroll-driven arc, so it feels alive under the mouse without spinning.
    const damping = Math.min(dt * 2.6, 1);
    g.rotation.y += (baseY + frameState.pointerDamped.x * 0.18 - g.rotation.y) * damping;
    g.rotation.x += (baseX - frameState.pointerDamped.y * 0.12 - g.rotation.x) * damping;

    invalidate();
  });

  return (
    <group ref={groupRef}>
      <group scale={fitScale} position={[-center.x * fitScale, -center.y * fitScale, 0]}>
        <mesh geometry={coralGeo} material={coralMat} position={[0, 0, -10]} />
        <mesh geometry={navyGeo} material={bodyMat} />
      </group>
    </group>
  );
}
