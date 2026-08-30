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

/* The mark reads as bent tubing rather than a cut-out slab. ExtrudeGeometry
   gives us that if the bevel radius carries the whole thickness: a thin flat
   core with a full-radius round on each face makes the cross-section a
   stadium, i.e. a round pipe. PIPE_RADIUS is a fraction of the viewBox width;
   it doubles as the bevel's inset, so it has to stay well under half the
   thinnest stroke in the artwork or narrow spots pinch. */
const PIPE_RADIUS_RATIO = 0.015;
const PIPE_CORE_RATIO = 0.45; // flat core between the two rounded faces, in radii

/**
 * Real physically-based material rather than a hand-written highlight: the
 * mark is lacquered tubing, so it wants a coloured base under a clear coat,
 * picking up the studio environment set up by StudioLighting. `sheen` keeps
 * the dark navy from going flat where nothing is reflecting into it.
 */
function makeMaterial({ color, roughness, clearcoatRoughness, envMapIntensity, metalness, sheen, clearcoat = 1 }) {
  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(color),
    // A little metalness pushes the surface from "matte plastic" toward
    // polished automotive lacquer — it is what makes the environment actually
    // show up in the body colour rather than only in the coat.
    metalness,
    roughness,
    clearcoat,
    clearcoatRoughness,
    envMapIntensity,
    specularIntensity: 1,
    specularColor: new THREE.Color("#ffffff"),
    sheen,
    sheenColor: new THREE.Color("#8fa6ff"),
    sheenRoughness: 0.5,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0,
  });
}

export default function LogoMark3D({ quality }) {
  const invalidate = useThree((s) => s.invalidate);
  const groupRef = useRef(null);
  const revealRef = useRef(0);

  // bevelSegments is what makes the pipe round rather than chamfered, so it
  // carries far more weight here than it did for the old slab profile.
  const detail =
    quality.tier === "low"
      ? { curveSegments: 6, bevelSegments: 4 }
      : quality.tier === "medium"
        ? { curveSegments: 10, bevelSegments: 7 }
        : { curveSegments: 16, bevelSegments: 11 };

  const { coralGeo, navyGeo, fitScale, center } = useMemo(() => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${MARK_VIEWBOX}">
      <path d="${MARK_CORAL_PATH}"/>
      <path d="${MARK_NAVY_PATH}"/>
    </svg>`;

    const parsed = new SVGLoader().parse(svg);
    const [vbW] = MARK_VIEWBOX.split(" ").map(Number).slice(2);
    const radius = vbW * PIPE_RADIUS_RATIO;

    const extrude = (shapePath) => {
      const shapes = shapePath.toShapes();
      const geo = new THREE.ExtrudeGeometry(shapes, {
        // Bevel radius equal on both axes and carrying nearly all the depth is
        // what rounds the profile off into tubing.
        depth: radius * PIPE_CORE_RATIO,
        bevelEnabled: true,
        bevelThickness: radius,
        bevelSize: radius,
        bevelOffset: 0,
        bevelSegments: detail.bevelSegments,
        curveSegments: detail.curveSegments,
      });
      geo.scale(1, -1, 1); // SVG y-down → scene y-up
      geo.computeVertexNormals(); // smooth the many bevel rings into one round surface
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
  // cinematic glint as the mark turns under the (DOM) key lighting. The indigo
  // ribbon gets a higher ambient floor than the coral: it is a genuinely dark
  // colour, and without the lift the unlit side of the tubing goes to black
  // against an almost-black page.
  // The crescents are a bright colour and can take a tighter, glossier coat.
  // The ribbon is a dark navy, so it leans on a stronger environment response
  // and a little sheen to stay legible against an almost-black page.
  // Gloss lives in the clear coat, not in the environment response: a high
  // envMapIntensity plus metalness washes the base colour out (it turned the
  // coral to pale peach), so both stay low and the shine comes from the tight
  // coat instead. That keeps the rendered colour close to the flat artwork.
  // Base deliberately deeper than the target #ff644e: the crescents face the
  // key light almost head-on, so a lighter base lands well past it and reads
  // as peach. A partial coat keeps them saturated rather than white-veiled.
  const coralMat = useMemo(
    () => makeMaterial({ color: "#c23b28", roughness: 0.24, clearcoatRoughness: 0.06, envMapIntensity: 0.4, metalness: 0.02, sheen: 0, clearcoat: 0.45 }),
    []
  );
  const bodyMat = useMemo(
    () => makeMaterial({ color: "#1a0d62", roughness: 0.12, clearcoatRoughness: 0.025, envMapIntensity: 0.85, metalness: 0.06, sheen: 0.12 }),
    []
  );

  // Colour from the CSS token layer, so scene and DOM never drift apart. These
  // are the mark's own brand colours — indigo ribbon over coral crescents, as
  // drawn in logo-theerrv.svg — not the reversed white lockup.
  useEffect(() => {
    coralMat.color = readColorToken("--brand-coral-base", "#c23b28");
    // The true lockup ink, not the lifted variant: with real lights and an
    // environment behind it, the navy reads on its own.
    bodyMat.color = readColorToken("--brand-indigo", "#231860");
    coralMat.needsUpdate = true;
    bodyMat.needsUpdate = true;
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
    // Drop out of the transparent pass once opaque: a double-sided transparent
    // solid self-sorts badly, and the mark overlaps itself constantly.
    const opaque = revealRef.current > 0.995;
    for (const m of [coralMat, bodyMat]) {
      m.opacity = revealRef.current;
      if (m.transparent === opaque) {
        m.transparent = !opaque;
        m.needsUpdate = true;
      }
    }

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
