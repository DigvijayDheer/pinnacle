"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

const LETTERS = ["P", "I", "N", "N", "A", "C", "L", "E"];

interface Props {
  onComplete: () => void;
}

export function CinematicPreloader({ onComplete }: Props) {
  const [phase, setPhase] = useState(0);
  const [exiting, setExiting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const t0 = setTimeout(() => setPhase(1), 600);
    const t1 = setTimeout(() => setPhase(2), 1200);
    const t2 = setTimeout(() => setPhase(3), 2800);
    const t3 = setTimeout(() => setExiting(true), 4800);
    const t4 = setTimeout(onComplete, 5800);
    return () => [t0, t1, t2, t3, t4].forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dprFromCss = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--dpr") ||
        "",
    );
    const dpr = Math.min(dprFromCss || window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    if (typeof ctx.setTransform === "function")
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      size: number;
    }
    const pointerCoarse =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(pointer: coarse)").matches;
    const particleCount = pointerCoarse ? 20 : 35;
    const particles: Particle[] = [];
    const spawn = () => {
      const cx = canvas.width / 2,
        cy = canvas.height / 2;
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * 200 + 50;
      particles.push({
        x: cx + Math.cos(angle) * r,
        y: cy + Math.sin(angle) * r,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -(Math.random() * 0.5 + 0.1),
        life: 0,
        maxLife: Math.random() * 180 + 120,
        size: Math.random() * 1.5 + 0.3,
      });
    };
    for (let i = 0; i < particleCount; i++) spawn();

    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (Math.random() < 0.18) spawn();
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        if (p.life > p.maxLife) {
          particles.splice(i, 1);
          continue;
        }
        const t = p.life / p.maxLife;
        const opacity = t < 0.2 ? t / 0.2 : t > 0.8 ? (1 - t) / 0.2 : 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,160,85,${opacity * 0.5})`;
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <AnimatePresence>
      {!exiting ? (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.0, ease: "easeInOut" }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "#030303",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            overflow: "hidden",
            willChange: "opacity",
          }}
        >
          <canvas
            ref={canvasRef}
            style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={phase >= 1 ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 2.5, ease: "easeOut" }}
            style={{
              position: "absolute",
              width: "70vw",
              height: "calc(var(--vh, 1vh) * 50)",
              background:
                "radial-gradient(ellipse, rgba(201,160,85,0.07) 0%, transparent 70%)",
              pointerEvents: "none",
              willChange: "transform, opacity",
            }}
          />

          <div
            style={{
              position: "relative",
              zIndex: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", gap: "0.12em", overflow: "hidden" }}>
              {LETTERS.map((letter, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 60 }}
                  animate={phase >= 2 ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.9,
                    delay: i * 0.07,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{
                    fontFamily: "'Cormorant Garant', serif",
                    fontSize: "clamp(3rem, 12vw, 9rem)",
                    fontWeight: 300,
                    color: "white",
                    letterSpacing: "0.02em",
                    lineHeight: 1,
                    display: "inline-block",
                    willChange: "transform, opacity",
                    backfaceVisibility: "hidden",
                  }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={phase >= 3 ? { scaleX: 1 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{
                width: "100%",
                height: 1,
                background:
                  "linear-gradient(to right, transparent, #C9A055 30%, #C9A055 70%, transparent)",
                transformOrigin: "center",
                marginTop: 8,
                willChange: "transform",
              }}
            />

            <motion.div
              initial={{ opacity: 0, letterSpacing: "0.8em" }}
              animate={phase >= 3 ? { opacity: 1, letterSpacing: "0.5em" } : {}}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
              style={{
                fontFamily: "'Inter', sans-serif",
                color: "#C9A055",
                fontSize: "clamp(0.6rem, 2vw, 0.9rem)",
                textTransform: "uppercase",
                marginTop: 14,
                fontWeight: 300,
                willChange: "opacity",
              }}
            >
              Dubai
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={phase >= 3 ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
              style={{
                fontFamily: "'Cormorant Garant', serif",
                color: "rgba(255,255,255,0.2)",
                fontSize: "clamp(0.65rem, 1.5vw, 0.8rem)",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                fontStyle: "italic",
                marginTop: 28,
              }}
            >
              Where the World Convenes
            </motion.div>
          </div>

          <div
            style={{
              position: "absolute",
              bottom: "12%",
              left: "20%",
              right: "20%",
              height: 1,
              background: "rgba(255,255,255,0.05)",
              zIndex: 2,
            }}
          >
            <motion.div
              style={{
                height: "100%",
                background: "linear-gradient(to right, transparent, #C9A055)",
                transformOrigin: "left",
                willChange: "transform",
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 5.8, ease: "easeInOut" }}
            />
          </div>

          <motion.div
            animate={{
              y: ["calc(-100 * var(--vh, 1vh))", "calc(100 * var(--vh, 1vh))"],
            }}
            transition={{ duration: 3.5, ease: "easeInOut", delay: 1 }}
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              height: 2,
              background:
                "linear-gradient(to bottom, transparent, rgba(201,160,85,0.1), transparent)",
              pointerEvents: "none",
              willChange: "transform",
            }}
          />

          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "calc(var(--vh, 1vh) * 7)",
              background: "#030303",
              zIndex: 3,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "calc(var(--vh, 1vh) * 7)",
              background: "#030303",
              zIndex: 3,
            }}
          />
        </motion.div>
      ) : (
        <motion.div
          key="exit"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            pointerEvents: "none",
          }}
        >
          <motion.div
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            transition={{ duration: 0.85, ease: [0.7, 0, 0.3, 1] }}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "50%",
              background: "#030303",
              transformOrigin: "top",
              willChange: "transform",
            }}
          />
          <motion.div
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            transition={{ duration: 0.85, ease: [0.7, 0, 0.3, 1] }}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "50%",
              background: "#030303",
              transformOrigin: "bottom",
              willChange: "transform",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
