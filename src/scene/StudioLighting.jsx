import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

import { readColorToken } from "./tokens";

/**
 * A small photographic studio for the brand mark.
 *
 * The realism here comes from image-based lighting, not from the lamps: a
 * procedural room is pre-filtered into an environment map, so every glossy
 * surface reflects a plausible set of softboxes and walls instead of a single
 * hand-written highlight. RoomEnvironment ships with three, so this costs no
 * downloaded HDR and no extra dependency.
 *
 * The three lights on top of that are shaping lights, in the usual key / fill /
 * rim arrangement, and the fog reproduces the depth falloff the old custom
 * shader faked — tinted to the page's own ink so the mark recedes into the
 * background rather than into grey.
 */
export default function StudioLighting({ envIntensity = 0.75 }) {
  const gl = useThree((s) => s.gl);
  const scene = useThree((s) => s.scene);
  const invalidate = useThree((s) => s.invalidate);

  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const room = new RoomEnvironment();
    // sigma 0 keeps the room's panels crisp in the reflection — any blur here
    // and the gloss reads as a soft sheen rather than a mirrored highlight.
    const target = pmrem.fromScene(room, 0);

    scene.environment = target.texture;
    scene.environmentIntensity = envIntensity;

    // Depth cue, in the page's ink so the far end of the mark dissolves into
    // the background colour the DOM is already painting.
    const ink = readColorToken("--navy-deep", "#070d1e");
    scene.fog = new THREE.Fog(ink, 30, 96);

    invalidate();

    return () => {
      scene.environment = null;
      scene.fog = null;
      target.dispose();
      pmrem.dispose();
      room.dispose?.();
    };
  }, [gl, scene, invalidate, envIntensity]);

  const coral = readColorToken("--brand-coral", "#f0553f");

  return (
    <>
      {/* Key — high and camera-left, the light that models the tubing. */}
      <directionalLight position={[-6, 9, 8]} intensity={2.9} color="#fff6ec" />
      {/* Fill — low and camera-right, cool, opens the shadow side. */}
      <directionalLight position={[9, -2, 5]} intensity={0.4} color="#9fb4ff" />
      {/* Rim — behind and above, in the brand coral, to separate the mark from
          the dark ground. Kept modest: at full strength it spills onto the
          crescents and desaturates them toward peach. */}
      <directionalLight position={[3, 5, -9]} intensity={0.9} color={coral} />
      <ambientLight intensity={0.1} color="#8ea0d8" />
    </>
  );
}
