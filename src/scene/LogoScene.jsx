import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";
import * as THREE from "three";

import { detectQuality } from "./quality";
import { frameState } from "./scrollState";
import LogoMark3D from "./LogoMark3D";
import LogoRig, { STATION_COUNT } from "./LogoRig";
import StudioLighting from "./StudioLighting";

/**
 * The 3D logo scene — one Canvas fixed behind the About content, with the
 * extruded brand mark travelling through a series of camera stations as you
 * scroll the page. Content sits above it (z-index); the canvas never takes
 * pointer events. With WebGL unavailable it renders nothing and the page keeps
 * its dark ground and typography.
 *
 * `driveSelector` names the element whose scroll range maps to the camera
 * stations (0 → STATION_COUNT-1), so the mark is choreographed to the sections.
 */
export default function LogoScene({ driveSelector = "#about-scroll" }) {
  const [quality, setQuality] = useState(null);

  useEffect(() => {
    setQuality(detectQuality());
  }, []);

  // Pointer parallax (fine pointers only — a touch drag should scroll).
  useEffect(() => {
    const onMove = (e) => {
      frameState.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      frameState.pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    if (window.matchMedia("(pointer: fine)").matches) {
      window.addEventListener("pointermove", onMove, { passive: true });
      return () => window.removeEventListener("pointermove", onMove);
    }
  }, []);

  // Reveal on mount (no preloader here), and drive the camera station from how
  // far the target element has been scrolled through.
  useEffect(() => {
    frameState.revealed = true;
    frameState.progress = 0;

    const el = document.querySelector(driveSelector);
    if (!el) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      const p = total > 0 ? scrolled / total : 0;
      frameState.progress = p * (STATION_COUNT - 1);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      frameState.revealed = false;
    };
  }, [driveSelector]);

  if (!quality || quality.tier === "off") return null;

  return (
    <div aria-hidden="true" style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}>
      <Canvas
        dpr={quality.dpr}
        gl={{
          antialias: quality.tier !== "low",
          alpha: true,
          powerPreference: "high-performance",
          // Filmic response: rolls the studio highlights off instead of
          // clipping them, which is most of what separates a rendered object
          // from a flat-shaded one.
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 0.95,
        }}
        camera={{ fov: 38, near: 0.1, far: 200, position: [2, 1.5, 40] }}
        frameloop="demand"
        style={{ position: "absolute", inset: 0 }}
      >
        <StudioLighting envIntensity={quality.tier === "low" ? 0.85 : 1.05} />
        <LogoMark3D quality={quality} />
        <LogoRig />
      </Canvas>
    </div>
  );
}
