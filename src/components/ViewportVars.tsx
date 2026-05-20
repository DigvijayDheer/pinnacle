"use client";

import { useEffect } from "react";

export default function ViewportVars() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const setVars = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      document.documentElement.style.setProperty("--dpr", String(dpr));

      const pointerCoarse = window.matchMedia("(pointer: coarse)").matches;
      if (pointerCoarse)
        document.documentElement.setAttribute("data-pointer", "coarse");
      else document.documentElement.setAttribute("data-pointer", "fine");

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduced)
        document.documentElement.setAttribute("data-reduced-motion", "1");
      else document.documentElement.removeAttribute("data-reduced-motion");
    };

    setVars();
    let rafId: number | null = null;
    let timeout: number | null = null;

    const onResize = () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (timeout) window.clearTimeout(timeout);
      rafId = requestAnimationFrame(() => setVars());
      timeout = window.setTimeout(() => setVars(), 120);
    };

    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("orientationchange", onResize, { passive: true });

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (timeout) window.clearTimeout(timeout);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
    };
  }, []);

  return null;
}
