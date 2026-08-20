"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";

import { frameState } from "@/lib/scrollState";
import type { QualitySettings } from "@/lib/quality";
import { MARK_CORAL_PATH, MARK_NAVY_PATH, MARK_VIEWBOX } from "./markPaths";
import { readColorToken } from "./tokens";
import { STATION_COUNT } from "./Rig";

/* ===========================================================================
   The brand mark as a solid object.

   These are the real traced vector paths, extruded — the artwork is not
   redrawn, approximated, or rebuilt as a lookalike. The two colour layers are
   preserved exactly as the lockup sets them: coral crescents behind, navy
   ribbon in front, so the accent appears only where it already appears.

   Depth and a small bevel do most of the work. A flat extrusion reads as a
   sticker; a bevelled edge catches the key light along every contour and is
   the single biggest difference between "logo on a card" and "logo as an
   object in a room".
   ======================================================================== */

/** Target width of the mark in world units. Everything else scales off this. */
const TARGET_WIDTH = 12;

/** Extrusion depth as a fraction of the mark's width. */
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
    // No gl_FrontFacing correction here, deliberately. The geometry is
    // mirrored on Y to convert SVG's y-down space, which reverses triangle
    // winding — so gl_FrontFacing reports the opposite of the stored normals.
    // Those normals are already transformed correctly by the normal matrix,
    // and the mark is a closed solid, so the outward normal is always the one
    // facing us. Flipping on gl_FrontFacing inverted every normal, which drove
    // the rim term to 1.0 everywhere and washed the whole mark in coral.
    vec3 n = normalize(vNormalView);
    vec3 v = normalize(vViewDir);

    // Key high and slightly left, fill low and opposite. Half-lambert on the
    // key so the faces turned away from it stay legible against the ink
    // instead of dropping to a silhouette.
    vec3 keyDir = normalize(vec3(-0.42, 0.78, 0.62));
    vec3 fillDir = normalize(vec3(0.72, -0.22, 0.35));
    float key = pow(dot(n, keyDir) * 0.5 + 0.5, 1.8);
    float fill = max(dot(n, fillDir), 0.0) * 0.26;

    // Specular. This is what makes the bevel read as a hard edge on a solid
    // object rather than a soft gradient.
    vec3 h = normalize(keyDir + v);
    float spec = pow(max(dot(n, h), 0.0), 46.0) * uSpecular;

    // Rim separates the silhouette from the background. Kept tight — an
    // extruded solid presents a lot of near-grazing side wall, and a loose rim
    // term would tint all of it.
    float rim = pow(1.0 - max(dot(n, v), 0.0), 3.4);

    vec3 color = uColor * (0.26 + key * 0.86 + fill);
    color += vec3(1.0) * spec;
    color += uAccent * rim * uRimAccent;

    float fog = smoothstep(uFogNear, uFogFar, vDepth);
    color = mix(color, uInk, fog);

    gl_FragColor = vec4(color, uReveal);
  }
`;

function makeMaterial(color: string, specular: number, rimAccent: number) {
  return new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    // The Y-flip below mirrors the geometry, which reverses triangle winding.
    // DoubleSide plus the gl_FrontFacing correction above keeps lighting right
    // without having to rebuild every shape wound the other way.
    side: THREE.DoubleSide,
    transparent: true,
    uniforms: {
      uColor: { value: new THREE.Color(color) },
      uAccent: { value: new THREE.Color("#f35d55") },
      uInk: { value: new THREE.Color("#140c39") },
      uReveal: { value: 0 },
      uFogNear: { value: 26 },
      uFogFar: { value: 72 },
      uSpecular: { value: specular },
      uRimAccent: { value: rimAccent },
    },
  });
}

interface LogoMark3DProps {
  quality: QualitySettings;
}

export function LogoMark3D({ quality }: LogoMark3DProps) {
  const invalidate = useThree((s) => s.invalidate);
  const width = useThree((s) => s.size.width);
  const groupRef = useRef<THREE.Group>(null);
  const revealRef = useRef(0);

  // Intentionally unused for orientation: standing the mark upright on narrow
  // viewports makes it tall, which is the one thing that competes with stacked
  // type. It stays horizontal and moves into the upper third instead — the rig
  // handles that. Kept as a hook for any width-dependent tuning.
  void width;

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

    const extrude = (shapePath: (typeof parsed.paths)[number]) => {
      // r185 removed toShapes()'s isCCW argument — hole detection is derived
      // from the path's own fill rule now.
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
      // SVG's y axis points down; the scene's points up.
      geo.scale(1, -1, 1);
      return geo;
    };

    const coral = extrude(parsed.paths[0]);
    const navy = extrude(parsed.paths[1]);

    // Fit and centre off the combined bounds so the two layers stay registered
    // to each other exactly as they are in the artwork.
    const box = new THREE.Box3()
      .setFromBufferAttribute(coral.getAttribute("position") as THREE.BufferAttribute)
      .union(
        new THREE.Box3().setFromBufferAttribute(
          navy.getAttribute("position") as THREE.BufferAttribute,
        ),
      );
    const size = box.getSize(new THREE.Vector3());
    const mid = box.getCenter(new THREE.Vector3());

    return {
      coralGeo: coral,
      navyGeo: navy,
      fitScale: TARGET_WIDTH / size.x,
      center: mid,
    };
  }, [detail.bevelSegments, detail.curveSegments]);

  const coralMat = useMemo(() => makeMaterial("#f35d55", 0.35, 0.22), []);
  const bodyMat = useMemo(() => makeMaterial("#f7f7fb", 0.6, 0.09), []);

  // Colour comes from the token layer, so the mark in the scene and the mark
  // in the DOM can never drift apart.
  //
  // The body is the light neutral, not indigo — this is the reversed lockup,
  // the same treatment the brand already uses for the mark on dark grounds.
  // Indigo-on-ink is only a few steps apart in value and reads as a silhouette
  // rather than an object; the reversed version is both correct and legible.
  useEffect(() => {
    const ink = readColorToken("--bg-ink", "#140c39");
    const accent = readColorToken("--coral-500", "#f35d55");
    coralMat.uniforms.uColor.value = accent;
    bodyMat.uniforms.uColor.value = readColorToken("--neutral-50", "#f7f7fb");
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
    // The reveal gets a looser clamp than motion does. Tight clamping is right
    // for movement — it stops a dropped frame flinging the camera — but applied
    // to a fade it means a slow device advances the ramp far less than one
    // second per second, and the mark sits half-transparent for ages.
    const fadeDt = Math.min(delta, 0.5);

    const target = frameState.revealed ? 1 : 0;
    revealRef.current += (target - revealRef.current) * Math.min(fadeDt * 2.2, 1);
    coralMat.uniforms.uReveal.value = revealRef.current;
    bodyMat.uniforms.uReveal.value = revealRef.current;

    const g = groupRef.current;
    if (!g) return;

    const p = THREE.MathUtils.clamp(frameState.progress, 0, STATION_COUNT - 1);
    const t = p / (STATION_COUNT - 1);

    // Rotation is owned here and composed from three sources, in order:
    // an entrance that resolves once, a bounded arc driven by scroll, and a
    // small additive pointer tilt. Nothing spins on a timer.
    const entrance = 1 - revealRef.current;
    const baseY = THREE.MathUtils.lerp(-0.42, 0.5, t) - entrance * 1.05;
    const baseX = THREE.MathUtils.lerp(0.06, -0.16, t);

    const damping = Math.min(dt * 2.6, 1);
    g.rotation.y += (baseY + frameState.pointerDamped.x * 0.1 - g.rotation.y) * damping;
    g.rotation.x += (baseX - frameState.pointerDamped.y * 0.07 - g.rotation.x) * damping;

    invalidate();
  });

  return (
    <group ref={groupRef}>
      <group scale={fitScale} position={[-center.x * fitScale, -center.y * fitScale, 0]}>
        {/* Coral sits behind the ribbon, exactly as in the artwork. */}
        <mesh geometry={coralGeo} material={coralMat} position={[0, 0, -10]} />
        <mesh geometry={navyGeo} material={bodyMat} />
      </group>
    </group>
  );
}
