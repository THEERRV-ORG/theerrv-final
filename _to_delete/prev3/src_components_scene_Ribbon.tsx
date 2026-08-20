"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

import { frameState } from "@/lib/scrollState";
import type { QualitySettings } from "@/lib/quality";
import { buildRibbonCurve, buildRibbonGeometry } from "./ribbonCurve";
import { readColorToken } from "./tokens";

/* -------------------------------------------------------------------------
   The band has two distinguishable faces, and the material treats them
   differently: indigo on the front, coral on the reverse. That is the mark's
   own construction — the accent is only visible where the ribbon turns —
   which keeps coral to the "one warm moment per view" the system asks for
   without any special-casing.
   ---------------------------------------------------------------------- */

const vertexShader = /* glsl */ `
  attribute float aU;
  attribute float aSide;

  varying float vU;
  varying float vSide;
  varying vec3 vNormalView;
  varying vec3 vViewDir;
  varying float vDepth;

  void main() {
    vU = aU;
    vSide = aSide;

    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vNormalView = normalize(normalMatrix * normal);
    vViewDir = normalize(-mv.xyz);
    vDepth = -mv.z;

    gl_Position = projectionMatrix * mv;
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform vec3 uFront;
  uniform vec3 uBack;
  uniform vec3 uAccent;
  uniform vec3 uInk;
  uniform float uProgress;
  uniform float uReveal;
  uniform float uFogNear;
  uniform float uFogFar;

  varying float vU;
  varying float vSide;
  varying vec3 vNormalView;
  varying vec3 vViewDir;
  varying float vDepth;

  void main() {
    // Draw-on. The stroke is laid down once, continuously, from one end to the
    // other — the loop assembling itself rather than fading in as a whole.
    float head = uProgress;
    if (vU > head) discard;

    vec3 n = normalize(vNormalView);
    if (!gl_FrontFacing) n = -n;

    // Key light high and slightly left; a soft fill opposite so the turns of
    // the band stay readable where the key falls away.
    //
    // Half-lambert on the key: a hard dot product drops the shadow side to
    // black, and against an ink background that reads as a hole in the form
    // rather than a shaded face. Wrapping the term keeps the whole loop
    // legible while preserving the direction of the light.
    vec3 keyDir = normalize(vec3(-0.35, 0.85, 0.55));
    vec3 fillDir = normalize(vec3(0.75, -0.15, 0.4));
    float key = pow(dot(n, keyDir) * 0.5 + 0.5, 1.7);
    float fill = max(dot(n, fillDir), 0.0) * 0.3;

    // Rim separates the ribbon from the ink behind it. Without this the form
    // dissolves into the background wherever it turns away from the key.
    float rim = pow(1.0 - max(dot(n, normalize(vViewDir)), 0.0), 2.2);

    // Both faces are indigo; coral is an EDGE, not a fill. In the mark the
    // accent is a thin crescent where the ribbon turns over, and large coral
    // fills are explicitly wrong — so the reverse face reads as deeper indigo
    // and the accent arrives as a bright rim exactly on those turns.
    vec3 base = gl_FrontFacing ? uFront : uBack;
    vec3 color = base * (0.22 + key * 0.9 + fill);
    color += uAccent * rim * (gl_FrontFacing ? 0.18 : 0.95);

    // A bright leading edge at the head of the stroke — the point of the pen.
    float lead = smoothstep(0.030, 0.0, head - vU);
    color = mix(color, uAccent, lead * 0.85);

    // The far side of the loop falls into the ink so the form reads as depth.
    float fog = smoothstep(uFogNear, uFogFar, vDepth);
    color = mix(color, uInk, fog);

    float alpha = (1.0 - fog * 0.9) * uReveal;
    if (alpha < 0.01) discard;

    gl_FragColor = vec4(color, alpha);
  }
`;

interface RibbonProps {
  quality: QualitySettings;
}

export function Ribbon({ quality }: RibbonProps) {
  const invalidate = useThree((s) => s.invalidate);
  const width = useThree((s) => s.size.width);
  const groupRef = useRef<THREE.Group>(null);

  // Responsive composition, not responsive scaling. The loop's long axis is
  // horizontal, which fights a portrait frame — shrinking it until it fits
  // would leave a thin sliver adrift in a tall empty field. Standing it upright
  // lets it use the axis the viewport actually has.
  const portrait = width < 900;
  const revealRef = useRef(0);
  const progressRef = useRef(0);

  const segments = quality.tier === "low" ? 260 : quality.tier === "medium" ? 460 : 720;

  const geometry = useMemo(() => {
    const curve = buildRibbonCurve();
    return buildRibbonGeometry(curve, { width: 0.68, twists: 2, segments });
  }, [segments]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        side: THREE.DoubleSide,
        transparent: true,
        uniforms: {
          uFront: { value: new THREE.Color("#cbc6e6") },
          uBack: { value: new THREE.Color("#3c2f80") },
          uAccent: { value: new THREE.Color("#f35d55") },
          uInk: { value: new THREE.Color("#140c39") },
          uProgress: { value: 0 },
          uReveal: { value: 0 },
          uFogNear: { value: 30 },
          uFogFar: { value: 72 },
        },
      }),
    [],
  );

  // Scene colour resolves from the same tokens the CSS uses, so the canvas can
  // never drift out of sync with the design system.
  useEffect(() => {
    const u = material.uniforms;
    u.uFront.value = readColorToken("--indigo-200", "#cbc6e6");
    u.uBack.value = readColorToken("--indigo-600", "#3c2f80");
    u.uAccent.value = readColorToken("--coral-500", "#f35d55");
    u.uInk.value = readColorToken("--bg-ink", "#140c39");
  }, [material]);

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.1);
    const u = material.uniforms;

    const revealTarget = frameState.revealed ? 1 : 0;
    revealRef.current += (revealTarget - revealRef.current) * Math.min(dt * 2.4, 1);
    u.uReveal.value = revealRef.current;

    // The stroke draws itself once, as part of the hand-off from the loader,
    // and is complete before the hero has finished settling. Tying it to scroll
    // was wrong: it left the most important frame of the site — the opening one
    // — with nothing in it. After this the form simply exists and the camera
    // does the work.
    if (frameState.revealed && progressRef.current < 1) {
      progressRef.current = Math.min(1, progressRef.current + dt * 0.85);
    }
    u.uProgress.value = progressRef.current;

    // A slight lean toward the pointer. Enough to feel responsive, small
    // enough that it never reads as parallax drift.
    if (groupRef.current) {
      const g = groupRef.current;
      g.rotation.y += (frameState.pointerDamped.x * 0.09 - g.rotation.y) * Math.min(dt * 2, 1);
      g.rotation.x += (-frameState.pointerDamped.y * 0.06 - g.rotation.x) * Math.min(dt * 2, 1);
    }

    invalidate();
  });

  return (
    <group ref={groupRef}>
      <group rotation={[0, 0, portrait ? Math.PI / 2 : 0]}>
        <mesh geometry={geometry} material={material} />
      </group>
    </group>
  );
}
