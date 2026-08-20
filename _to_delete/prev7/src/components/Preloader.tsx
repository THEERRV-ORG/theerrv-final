"use client";

import { useEffect, useRef, useState } from "react";

import { frameState } from "@/lib/scrollState";
import { prefersReducedMotion } from "@/lib/quality";
import { Logo } from "./Logo";

/**
 * Loading choreography.
 *
 * Counter runs to 100, the panel lifts, and only then is the scene told it may
 * appear. Nothing is ever shown half-assembled, and the hand-off is a single
 * move rather than a fade into a fade.
 *
 * The count is honest about the two things actually being waited on — fonts and
 * first paint — and does not stall on a fixed timer once they are ready.
 */
export function Preloader() {
  const [value, setValue] = useState(0);
  const [done, setDone] = useState(false);
  const readyRef = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion()) {
      frameState.revealed = true;
      setDone(true);
      document.body.dataset.loaded = "true";
      return;
    }

    let cancelled = false;

    const markReady = () => {
      readyRef.current = true;
    };

    // Fonts are the real blocker for a type-led page: revealing before they
    // resolve means a visible reflow on the headline.
    if (document.fonts?.ready) {
      document.fonts.ready.then(markReady).catch(markReady);
    } else {
      markReady();
    }
    // Never wait longer than this, whatever the network is doing.
    const failsafe = window.setTimeout(markReady, 2200);

    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      if (cancelled) return;
      const elapsed = now - start;

      // Approach 90 on a curve while waiting, then complete once ready. The
      // number always moves, and never lies about being finished.
      const ceiling = readyRef.current ? 100 : 90;
      const eased = 100 * (1 - Math.exp(-elapsed / 620));
      const next = Math.min(ceiling, eased);

      setValue(next);

      if (next >= 99.5 && readyRef.current) {
        setValue(100);
        window.setTimeout(() => {
          if (cancelled) return;
          setDone(true);
          frameState.revealed = true;
          document.body.dataset.loaded = "true";
        }, 260);
        return;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.clearTimeout(failsafe);
    };
  }, []);

  return (
    <div
      className="preloader"
      data-done={done ? "true" : "false"}
      aria-hidden="true"
    >
      <div className="preloader-inner">
        <Logo className="preloader-logo" />
        <div className="preloader-rule">
          <span style={{ transform: `scaleX(${value / 100})` }} />
        </div>
        <div className="preloader-count t-mono">
          {String(Math.floor(value)).padStart(3, "0")}
        </div>
      </div>
    </div>
  );
}
