"use client";

import { useEffect, useRef } from "react";

const LERP_MAIN = 0.095;
const LERP_DOT = 0.22;
const LERP_VEL = 0.12;
const VEL_SCALE_MAX = 0.28;
const VEL_SCALE_SPEED = 18;

const HOVER_STATES: Record<
  string,
  { scale: number; opacity: number; glowScale: number }
> = {
  button: { scale: 1.55, opacity: 0.9, glowScale: 1.8 },
  link: { scale: 1.35, opacity: 0.85, glowScale: 1.5 },
  card: { scale: 1.7, opacity: 0.75, glowScale: 2.0 },
  drag: { scale: 2.0, opacity: 0.6, glowScale: 2.4 },
  default: { scale: 1.0, opacity: 0.82, glowScale: 1.0 },
};

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function getCursorType(el: Element | null): string {
  while (el && el !== document.body) {
    const tag = el.tagName.toLowerCase();
    const attr = el.getAttribute("data-cursor");
    if (attr && HOVER_STATES[attr]) return attr;
    if (tag === "button" || el.getAttribute("role") === "button")
      return "button";
    if (tag === "a") return "link";
    if (tag === "input" || tag === "textarea" || tag === "select")
      return "input";
    el = el.parentElement;
  }
  return "default";
}

export function CinematicCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const ring = ringRef.current!;
    const dot = dotRef.current!;
    const glow = glowRef.current!;

    const mouse = { x: -200, y: -200 };
    const pos = { x: -200, y: -200 };
    const dotPos = { x: -200, y: -200 };
    const vel = { x: 0, y: 0 };
    let velMag = 0;
    let rafId = 0;
    let hoverType = "default";
    let targetScale = 1;
    let currentScale = 1;
    let targetOpacity = HOVER_STATES.default.opacity;
    let currentOpacity = HOVER_STATES.default.opacity;
    let targetGlowScale = 1;
    let currentGlowScale = 1;
    let isVisible = false;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const lerpMain = reducedMotion ? 1 : LERP_MAIN;
    const lerpDot = reducedMotion ? 1 : LERP_DOT;
    const lerpVel = reducedMotion ? 1 : LERP_VEL;

    function tick() {
      rafId = requestAnimationFrame(tick);

      const dx = mouse.x - pos.x;
      const dy = mouse.y - pos.y;
      vel.x = lerp(vel.x, dx, lerpVel);
      vel.y = lerp(vel.y, dy, lerpVel);
      velMag = lerp(velMag, Math.sqrt(vel.x * vel.x + vel.y * vel.y), lerpVel);

      pos.x = lerp(pos.x, mouse.x, lerpMain);
      pos.y = lerp(pos.y, mouse.y, lerpMain);
      dotPos.x = lerp(dotPos.x, mouse.x, lerpDot);
      dotPos.y = lerp(dotPos.y, mouse.y, lerpDot);

      const velBoost = Math.min(velMag / VEL_SCALE_SPEED, 1) * VEL_SCALE_MAX;
      const { scale, opacity, glowScale } =
        HOVER_STATES[hoverType] ?? HOVER_STATES.default;
      targetScale = scale + velBoost;
      targetOpacity = opacity;
      targetGlowScale = glowScale;

      currentScale = lerp(currentScale, targetScale, 0.1);
      currentOpacity = lerp(currentOpacity, targetOpacity, 0.1);
      currentGlowScale = lerp(currentGlowScale, targetGlowScale, 0.08);

      ring.style.transform = `translate3d(${pos.x}px,${pos.y}px,0) translate(-50%,-50%) scale(${currentScale})`;
      ring.style.opacity = String(currentOpacity);
      dot.style.transform = `translate3d(${dotPos.x}px,${dotPos.y}px,0) translate(-50%,-50%)`;
      glow.style.transform = `translate3d(${pos.x}px,${pos.y}px,0) translate(-50%,-50%) scale(${currentGlowScale * currentScale})`;
      glow.style.opacity = String(currentOpacity * 0.35);
    }

    function onMove(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      if (!isVisible) {
        pos.x = dotPos.x = mouse.x;
        pos.y = dotPos.y = mouse.y;
        isVisible = true;
        ring.style.visibility = "visible";
        dot.style.visibility = "visible";
        glow.style.visibility = "visible";
      }

      const type = getCursorType(e.target as Element);
      if (type === "input") {
        ring.style.opacity = "0";
        dot.style.opacity = "0";
        glow.style.opacity = "0";
        hoverType = "default";
      } else {
        hoverType = type;
      }
    }

    function onLeave() {
      ring.style.opacity = "0";
      dot.style.opacity = "0";
      glow.style.opacity = "0";
    }

    function onEnter() {
      ring.style.opacity = String(currentOpacity);
      dot.style.opacity = "1";
    }

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave, { passive: true });
    document.addEventListener("mouseenter", onEnter, { passive: true });

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 28,
          height: 28,
          borderRadius: "50%",
          border: "1px solid rgba(201,160,85,0.75)",
          pointerEvents: "none",
          zIndex: 99999,
          visibility: "hidden",
          willChange: "transform, opacity",
          transform: "translate3d(-200px,-200px,0) translate(-50%,-50%)",
          backfaceVisibility: "hidden",
        }}
      />

      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 4,
          height: 4,
          borderRadius: "50%",
          background: "#C9A055",
          pointerEvents: "none",
          zIndex: 99999,
          visibility: "hidden",
          willChange: "transform",
          transform: "translate3d(-200px,-200px,0) translate(-50%,-50%)",
          backfaceVisibility: "hidden",
        }}
      />

      <div
        ref={glowRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 56,
          height: 56,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(201,160,85,0.18) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 99998,
          visibility: "hidden",
          willChange: "transform, opacity",
          transform: "translate3d(-200px,-200px,0) translate(-50%,-50%)",
          backfaceVisibility: "hidden",
        }}
      />
    </>
  );
}
