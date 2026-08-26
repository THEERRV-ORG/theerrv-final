import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { frameState } from "./scrollState";
import { prefersReducedMotion } from "./quality";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll system for the homepage. Lenis owns the scroll position, ScrollTrigger
 * owns progress (written to frameState.scroll), and the render loop owns every
 * ribbon transform derived from it — three separate writers, which is what
 * keeps the motion from stuttering. Smoothing is light: inertia, not
 * scroll-jacking. Renders nothing; mounts on the homepage only.
 */
export default function StoryScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 0.9,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      touchMultiplier: 1.6,
    });

    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    // Drive off the whole document (including the footer) so the ribbon keeps
    // travelling down and flows behind the footer rather than freezing at the CTA.
    const el = document.body;
    if (!el) return;

    frameState.scroll = 0;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        frameState.scroll = self.progress;
      },
    });

    const refresh = () => ScrollTrigger.refresh();
    const id = window.setTimeout(refresh, 300);
    window.addEventListener("load", refresh);

    return () => {
      window.clearTimeout(id);
      window.removeEventListener("load", refresh);
      trigger.kill();
    };
  }, []);

  return null;
}
