"use client";

import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";

import { detectQuality, type QualitySettings } from "@/lib/quality";
import { frameState } from "@/lib/scrollState";
import { LogoMark3D } from "./LogoMark3D";
import { Rig } from "./Rig";

/**
 * Canvas host.
 *
 * Mounts only on the client and only when WebGL is actually available. When it
 * is not — old hardware, a blocked context, a driver crash — the section keeps
 * its ink background and its typography, and simply has no ribbon in it. No
 * content lives inside the canvas, so nothing is lost.
 */
export function SceneRoot() {
  const [quality, setQuality] = useState<QualitySettings | null>(null);

  useEffect(() => {
    setQuality(detectQuality());
  }, []);

  useEffect(() => {
    const onPointerMove = (e: PointerEvent) => {
      frameState.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      frameState.pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    // Coarse pointers get no parallax — there is no hover state to respond to,
    // and a touch drag should scroll, not steer the camera.
    if (window.matchMedia("(pointer: fine)").matches) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      return () => window.removeEventListener("pointermove", onPointerMove);
    }
  }, []);

  if (!quality || quality.tier === "off") return null;

  return (
    <Canvas
      dpr={quality.dpr}
      gl={{
        antialias: quality.tier !== "low",
        alpha: true,
        powerPreference: "high-performance",
      }}
      camera={{ fov: 38, near: 0.1, far: 200, position: [2, 1.5, 40] }}
      // Render on demand. The loop invalidates every frame while anything is
      // moving and stops when nothing is — the scene does not burn battery
      // holding a still frame.
      frameloop="demand"
      style={{ position: "absolute", inset: 0 }}
    >
      <LogoMark3D quality={quality} />
      <Rig />
    </Canvas>
  );
}
