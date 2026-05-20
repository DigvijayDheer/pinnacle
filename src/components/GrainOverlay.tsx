"use client";

import { useEffect, useRef } from "react";

export function GrainOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", {
      alpha: true,
      willReadFrequently: false,
    });
    if (!ctx) return;

    const SIZE = 128;
    canvas.width = SIZE;
    canvas.height = SIZE;

    const POOL = 6;
    const frames: ImageData[] = [];
    for (let f = 0; f < POOL; f++) {
      const img = ctx.createImageData(SIZE, SIZE);
      const d = img.data;
      for (let i = 0; i < d.length; i += 4) {
        const v = (Math.random() * 255) | 0;
        d[i] = v;
        d[i + 1] = v;
        d[i + 2] = v;
        d[i + 3] = (Math.random() * 18) | 0;
      }
      frames.push(img);
    }

    let frameIdx = 0;
    let tick = 0;
    let animId: number;

    const draw = () => {
      tick++;
      if (tick % 8 === 0) {
        frameIdx = (frameIdx + 1) % POOL;
        ctx.putImageData(frames[frameIdx], 0, 0);
      }
      animId = requestAnimationFrame(draw);
    };
    ctx.putImageData(frames[0], 0, 0);
    draw();

    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "calc(var(--vh, 1vh) * 100)",
          pointerEvents: "none",
          zIndex: 998,
          opacity: 0.035,
          mixBlendMode: "overlay",
          imageRendering: "pixelated",
          transform: "translateZ(0)",
          contain: "strict",
        }}
      />

      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 997,
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)",
          backgroundImage: [
            "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)",
            "linear-gradient(transparent 50%, rgba(0,0,0,0.007) 50%)",
          ].join(", "),
          backgroundSize: "100% 100%, 100% 4px",
          contain: "strict",
        }}
      />
    </>
  );
}
