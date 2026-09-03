import { Canvas } from "@react-three/fiber";
import { useEffect, useState } from "react";

import { detectQuality, prefersReducedMotion } from "./quality";
import { frameState } from "./scrollState";
import Ribbons from "./Ribbons";

/**
 * Persistent ribbon scene — one Canvas fixed behind the homepage content, so
 * the two ribbons travel through the entire page as a single continuous object
 * rather than being rebuilt per section. Content sits above it (z-index); the
 * canvas never takes pointer events. With WebGL unavailable it renders nothing
 * and the page keeps its dark ground and typography.
 */
export default function RibbonScene() {
  const [quality, setQuality] = useState(null);
  // The ribbon re-renders on every scroll frame, which is the heaviest cost on
  // a phone GPU. Drop it on small screens — the homepage falls back to its dark
  // ground and scrolls smoothly. Desktop keeps the full 3D. Scoped to the
  // ribbon only; the About logo scene is a separate component.
  const [enabled, setEnabled] = useState(true);

  useEffect(() => {
    setQuality(detectQuality());
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)");
    const apply = () => setEnabled(!mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    const onPointerMove = (e) => {
      frameState.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      frameState.pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    if (window.matchMedia("(pointer: fine)").matches) {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      return () => window.removeEventListener("pointermove", onPointerMove);
    }
  }, []);

  if (!enabled || !quality || quality.tier === "off") return null;

  const reduced = prefersReducedMotion();

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <Canvas
        dpr={quality.dpr}
        gl={{ antialias: quality.tier !== "low", alpha: true, powerPreference: "high-performance" }}
        camera={{ fov: 40, near: 0.1, far: 200, position: [0, 0, 30] }}
        frameloop="demand"
        style={{ position: "absolute", inset: 0 }}
      >
        <Ribbons quality={quality} reduced={reduced} />
      </Canvas>
    </div>
  );
}
