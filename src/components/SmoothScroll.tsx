"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { frameState } from "@/lib/scrollState";
import { prefersReducedMotion } from "@/lib/quality";
import { STATION_COUNT } from "./scene/Rig";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll system.
 *
 * Lenis owns the scroll position, ScrollTrigger owns progress, and the render
 * loop owns every transform derived from it. Keeping those three separate is
 * what stops the camera stuttering — two systems writing the same property is
 * the usual cause, and here nothing shares a writer.
 *
 * Smoothing is kept light. The design system rules out parallax and springy
 * motion, so this is a small amount of inertia, not scroll-jacking.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduced = prefersReducedMotion();

    let lenis: Lenis | null = null;

    if (!reduced) {
      lenis = new Lenis({
        duration: 0.9,
        easing: (t) => 1 - Math.pow(1 - t, 3),
        smoothWheel: true,
        touchMultiplier: 1.6,
      });

      lenis.on("scroll", ScrollTrigger.update);

      const raf = (time: number) => {
        lenis?.raf(time * 1000);
      };
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);

      // Anchor links must still work with Lenis in charge of scrolling.
      const onClick = (e: MouseEvent) => {
        const anchor = (e.target as HTMLElement)?.closest?.(
          'a[href^="#"]',
        ) as HTMLAnchorElement | null;
        if (!anchor) return;
        const id = anchor.getAttribute("href");
        if (!id || id === "#") return;
        const el = document.querySelector(id);
        if (!el) return;
        e.preventDefault();
        lenis?.scrollTo(el as HTMLElement, { offset: -72 });
      };
      document.addEventListener("click", onClick);

      return () => {
        document.removeEventListener("click", onClick);
        gsap.ticker.remove(raf);
        lenis?.destroy();
      };
    }
  }, []);

  // Drive the camera from the cinematic block's own scroll range.
  useEffect(() => {
    const el = document.querySelector("#cinema");
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: el as HTMLElement,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        frameState.progress = self.progress * (STATION_COUNT - 1);
      },
    });

    return () => trigger.kill();
  }, []);

  // Drive the CTA card's light resolve. ScrollTrigger writes a single custom
  // property and every layer in the card reads from it — no per-frame React,
  // and one owner for the value. The range is chosen so the resolve happens
  // while the card is actually on screen rather than finishing below the fold.
  useEffect(() => {
    const card = document.querySelector<HTMLElement>(".cta-card");
    if (!card) return;

    const trigger = ScrollTrigger.create({
      trigger: card,
      start: "top 88%",
      end: "bottom 55%",
      onUpdate: (self) => {
        card.style.setProperty("--p", self.progress.toFixed(4));
      },
    });

    return () => trigger.kill();
  }, []);

  // Section reveals: a fade and a short translation, nothing more.
  useEffect(() => {
    const items = gsap.utils.toArray<HTMLElement>("[data-reveal]");
    const triggers = items.map((el, i) =>
      ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        once: true,
        onEnter: () => {
          const delay = el.dataset.revealDelay ?? String((i % 4) * 60);
          el.style.setProperty("--reveal-delay", `${delay}ms`);
          el.dataset.revealed = "true";
        },
      }),
    );

    return () => triggers.forEach((t) => t.kill());
  }, []);

  return null;
}
