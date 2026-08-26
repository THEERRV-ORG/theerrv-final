import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

import { frameState } from "./scrollState";
import { makeRibbonGeometry } from "./ribbonGeometry";
import { ribbonACurve, ribbonBCurve, RIBBON_A, RIBBON_B, SPAN } from "./ribbonCurves";

function smoothstep(a, b, x) {
  const t = THREE.MathUtils.clamp((x - a) / (b - a), 0, 1);
  return t * t * (3 - 2 * t);
}

/** Ribbon prominence across scroll (0..1): full through the story, dimmed for
 *  the FAQ's rest beat, prominent again at the CTA, then carried at full
 *  strength into the footer (which is opaque and occludes it — so it reads as
 *  flowing behind the footer rather than fading out above it). */
function prominence(s) {
  const enter = smoothstep(0, 0.05, s);
  const faq = smoothstep(0.72, 0.77, s) - smoothstep(0.83, 0.88, s);
  const cta = smoothstep(0.87, 0.93, s);
  const dim = 0.55 * Math.max(0, faq) * (1 - cta);
  return enter * (1 - dim);
}

/** The Impact climax: ramps up through Performance → Automation → Better Data,
 *  peaks on Growth, then releases. Drives the ribbons to wrap tighter and glow
 *  brighter around the closing statement. */
function tighten(s) {
  return smoothstep(0.56, 0.66, s) - smoothstep(0.7, 0.79, s);
}

// Translucent coloured-glass material. On capable devices `transmission` gives
// real refraction (the dark ground and the other ribbon show through, tinted by
// `attenuation`); on low-end/mobile it falls back to a cheaper translucency via
// opacity so the look survives without the transmission render pass. Clearcoat +
// env map carry the Fresnel edge brightness and the specular streaks that travel
// along the curvature; sheen adds the soft lavender/warm rim.
function makeMaterial(cfg, glass) {
  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(cfg.color),
    emissive: new THREE.Color(cfg.emissive),
    emissiveIntensity: cfg.emissiveIntensity,
    metalness: 0,
    roughness: glass ? cfg.roughness ?? 0.12 : 0.24,
    transmission: glass ? cfg.transmission ?? 0.84 : 0,
    thickness: glass ? cfg.thickness ?? 3.2 : 0,
    ior: 1.42,
    attenuationColor: new THREE.Color(cfg.attenuation),
    attenuationDistance: cfg.attenuationDistance,
    clearcoat: 1,
    clearcoatRoughness: 0.11, // sharper coat → crisper travelling specular streak
    specularIntensity: 1,
    specularColor: new THREE.Color("#ffffff"), // neutral so highlights read as light
    sheen: 0.6,
    sheenColor: new THREE.Color(cfg.sheen),
    sheenRoughness: 0.4,
    iridescence: 0.14,
    iridescenceIOR: 1.3,
    envMapIntensity: cfg.envMapIntensity ?? 1.9,
    transparent: true,
    depthWrite: true, // resolve which ribbon is in front at each crossing
    side: THREE.DoubleSide,
  });
}

export default function Ribbons({ quality, reduced }) {
  const invalidate = useThree((s) => s.invalidate);
  const gl = useThree((s) => s.gl);
  const scene = useThree((s) => s.scene);
  const size = useThree((s) => s.size);
  const groupRef = useRef(null);
  const scrollRef = useRef(0);

  const segments = quality.tier === "low" ? 230 : quality.tier === "medium" ? 360 : 520;
  const width = quality.tier === "low" ? 2.1 : 2.4;

  const geoA = useMemo(
    () => makeRibbonGeometry(ribbonACurve(), { segments, width, thickness: 0.28, radius: 0.13, twists: 2.2, twistPhase: 0 }),
    [segments, width],
  );
  const geoB = useMemo(
    () => makeRibbonGeometry(ribbonBCurve(), { segments, width, thickness: 0.28, radius: 0.13, twists: 1.8, twistPhase: 1.1 }),
    [segments, width],
  );

  const glass = quality.tier !== "low";
  const baseOpacity = glass ? 1 : 0.88;
  const matA = useMemo(() => makeMaterial(RIBBON_A, glass), [glass]);
  const matB = useMemo(() => makeMaterial(RIBBON_B, glass), [glass]);
  const baseEmissiveA = RIBBON_A.emissiveIntensity;
  const baseEmissiveB = RIBBON_B.emissiveIntensity;

  // Image-based lighting: a generated room environment gives the clearcoat real
  // reflections and rolling highlights as the strips twist, without an HDR file.
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const room = new RoomEnvironment();
    const env = pmrem.fromScene(room, 0.04).texture;
    scene.environment = env;
    invalidate();
    return () => {
      scene.environment = null;
      env.dispose();
      pmrem.dispose();
    };
  }, [gl, scene, invalidate]);

  useEffect(() => {
    return () => {
      geoA.dispose();
      geoB.dispose();
      matA.dispose();
      matB.dispose();
    };
  }, [geoA, geoB, matA, matB]);

  // Kick a render frame whenever the page scrolls (frameloop is on demand).
  useEffect(() => {
    const onScroll = () => invalidate();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [invalidate]);

  useFrame((_, delta) => {
    const g = groupRef.current;
    if (!g) return;
    const dt = Math.min(delta, 0.1);

    const target = reduced ? 0.12 : frameState.scroll;
    scrollRef.current += (target - scrollRef.current) * Math.min(dt * 3, 1);
    const s = scrollRef.current;

    // Travel: the field slides up as the page scrolls down.
    g.position.y = THREE.MathUtils.lerp(-SPAN, SPAN, s);

    // Pointer parallax.
    frameState.pointerDamped.x += (frameState.pointer.x - frameState.pointerDamped.x) * Math.min(dt * 3, 1);
    frameState.pointerDamped.y += (frameState.pointer.y - frameState.pointerDamped.y) * Math.min(dt * 3, 1);

    // Responsive horizontal compression so the baked S stays in frame on narrow
    // viewports. The big left↔right placement lives in the geometry (axisX), not
    // in an animation — the ribbon does not slide across the page as you scroll.
    const ampScale = THREE.MathUtils.clamp(size.width / 1280, 0.5, 1);

    // Impact climax — wrap tighter and glow harder around "Growth".
    const tg = reduced ? 0 : tighten(s);
    const tw = 1 - 0.4 * tg;
    g.scale.set(ampScale * tw, 1, tw);

    // Scroll response is deliberately subtle: a gentle pointer parallax and the
    // small Impact pull only.
    g.position.x = frameState.pointerDamped.x * 0.7 - (reduced ? 0 : tg * 0.5);
    g.rotation.z = reduced ? 0 : Math.sin(s * Math.PI) * 0.03;
    g.rotation.y = (reduced ? 0 : tg * 0.7) + frameState.pointerDamped.x * 0.1;

    const op = prominence(reduced ? 0.4 : s) * baseOpacity;
    matA.opacity = op;
    matB.opacity = op;
    matA.emissiveIntensity = baseEmissiveA * (1 + 0.9 * tg);
    matB.emissiveIntensity = baseEmissiveB * (1 + 0.9 * tg);

    if (
      !reduced &&
      (Math.abs(target - s) > 0.0005 ||
        Math.abs(frameState.pointer.x - frameState.pointerDamped.x) > 0.001)
    ) {
      invalidate();
    }
  });

  return (
    <>
      {/* Cinematic rig: a soft lavender-white key from the upper right, a warm
          coral fill on the red ribbon's side and a cool violet fill on the
          purple side, a faint violet back-rim for edge separation, and a low
          ambient. The environment map carries the moving specular reflections. */}
      <ambientLight intensity={0.22} />
      <hemisphereLight args={["#2a2360", "#05060d", 0.35]} />
      <directionalLight position={[10, 14, 8]} intensity={1.5} color="#efeaff" />
      <pointLight color="#ff7a58" position={[9, -4, 9]} intensity={30} distance={80} />
      <pointLight color="#7a6cff" position={[-9, 7, 10]} intensity={30} distance={80} />
      <directionalLight position={[-6, -3, -8]} intensity={0.5} color="#8a7cff" />

      <group ref={groupRef}>
        <mesh geometry={geoA} material={matA} />
        <mesh geometry={geoB} material={matB} />
      </group>
    </>
  );
}
