"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import BackgroundImage from "./ui/BackgroundImage";

const HERO_BG =
  "https://images.unsplash.com/photo-1590743689886-d2886505a267?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1920";

const PHASE_TIMES = [0, 200, 500, 900, 1500, 2200];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacity: number;
  size: number;
  pulseOffset: number;
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const phaseRef = useRef(0);
  const [phase, setPhase] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const pointerCoarse =
    typeof window !== "undefined" &&
    window.matchMedia &&
    window.matchMedia("(pointer: coarse)").matches;
  const motionScale = prefersReduced || pointerCoarse ? 0.45 : 1;

  const bgTransform = useTransform(
    scrollYProgress,
    [0, 1],
    [
      "translateY(0%) scale(1)",
      `translateY(${30 * motionScale}%) scale(${1 + 0.08 * motionScale})`,
    ],
  );
  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `${18 * motionScale}%`],
  );
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    const timers = PHASE_TIMES.slice(1).map((time, i) =>
      setTimeout(() => {
        phaseRef.current = i + 1;
        setPhase(i + 1);
      }, time),
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", {
      alpha: true,
      willReadFrequently: false,
    });
    if (!ctx) return;
    const dprFromCss = parseFloat(
      getComputedStyle(document.documentElement).getPropertyValue("--dpr") ||
        "",
    );
    const dpr = Math.min(dprFromCss || window.devicePixelRatio || 1, 2);
    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      if (typeof ctx.setTransform === "function")
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const count = window.innerWidth < 768 ? 25 : 50;
    const particles: Particle[] = Array.from({ length: count }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.2,
      vy: -(Math.random() * 0.4 + 0.05),
      opacity: Math.random() * 0.6 + 0.05,
      size: Math.random() * 1.6 + 0.3,
      pulseOffset: Math.random() * Math.PI * 2,
    }));

    let frame = 0;
    let animId: number;
    const draw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      frame++;
      const currentPhase = phaseRef.current;
      const globalOpacity =
        currentPhase < 1 ? 0.15 : currentPhase < 2 ? 0.4 : 1;
      for (let j = 0; j < particles.length; j++) {
        const p = particles[j];
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -5) {
          p.y = window.innerHeight + 5;
          p.x = Math.random() * window.innerWidth;
        }
        if (p.x < -5) p.x = window.innerWidth + 5;
        if (p.x > window.innerWidth + 5) p.x = -5;
        const pulse = 0.7 + 0.3 * Math.sin(frame * 0.018 + p.pulseOffset);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,160,85,${p.opacity * pulse * globalOpacity})`;
        ctx.fill();
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const scrollToNext = useCallback(() => {
    document
      .getElementById("experience")
      ?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const bgOpacity =
    phase === 0
      ? 0
      : phase === 1
        ? 0.05
        : phase === 2
          ? 0.12
          : phase === 3
            ? 0.22
            : 0.32;

  return (
    <section
      ref={sectionRef}
      className="hero-section"
      style={{
        position: "relative",
        width: "100%",
        height: "calc(var(--vh, 1vh) * 100)",
        minHeight: "clamp(420px, calc(var(--vh, 1vh) * 60), 1200px)",
        overflow: "hidden",
        background: "#020202",
        contain: "layout",
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          inset: "-12%",
          transform: bgTransform,
          willChange: "transform",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: imgLoaded ? bgOpacity : 0,
            transition: "opacity 2.5s ease",
          }}
        >
          <BackgroundImage
            src={HERO_BG}
            alt="Hero background"
            priority
            placeholderColor="#020202"
            objectPosition="center 45%"
            onLoad={() => setImgLoaded(true)}
          />
        </div>
      </motion.div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(2,2,2,0.75) 0%, rgba(2,2,2,0.1) 30%, rgba(2,2,2,0.3) 65%, rgba(2,2,2,1) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(2,2,2,0.7) 0%, transparent 25%, transparent 75%, rgba(2,2,2,0.7) 100%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 60% 40%, rgba(201,160,85,0.07) 0%, transparent 55%)",
          animation: phase >= 4 ? "glow-pulse 5s ease-in-out infinite" : "none",
          opacity: phase >= 2 ? 1 : 0,
          transition: "opacity 2s ease",
        }}
      />

      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      <motion.div
        initial={{ scaleY: 1 }}
        animate={phase >= 2 ? { scaleY: 0 } : { scaleY: 1 }}
        transition={{ duration: 1.2, ease: [0.7, 0, 0.3, 1] }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "clamp(32px, calc(var(--vh, 1vh) * 7), 72px)",
          background: "#010101",
          zIndex: 10,
          transformOrigin: "top",
          willChange: "transform",
        }}
      />
      <motion.div
        initial={{ scaleY: 1 }}
        animate={phase >= 2 ? { scaleY: 0 } : { scaleY: 1 }}
        transition={{ duration: 1.2, ease: [0.7, 0, 0.3, 1] }}
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "clamp(32px, calc(var(--vh, 1vh) * 7), 72px)",
          background: "#010101",
          zIndex: 10,
          transformOrigin: "bottom",
          willChange: "transform",
        }}
      />

      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={phase >= 3 ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 2.5, ease: "easeOut" }}
        style={{
          position: "absolute",
          top: "12%",
          left: 0,
          right: 0,
          height: 1,
          background:
            "linear-gradient(to right, transparent 5%, rgba(201,160,85,0.14) 30%, rgba(201,160,85,0.14) 70%, transparent 95%)",
          transformOrigin: "center",
          zIndex: 2,
          willChange: "transform, opacity",
        }}
      />
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={phase >= 3 ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 2.5, ease: "easeOut", delay: 0.3 }}
        style={{
          position: "absolute",
          bottom: "18%",
          left: 0,
          right: 0,
          height: 1,
          background:
            "linear-gradient(to right, transparent 5%, rgba(201,160,85,0.09) 30%, rgba(201,160,85,0.09) 70%, transparent 95%)",
          transformOrigin: "center",
          zIndex: 2,
          willChange: "transform, opacity",
        }}
      />

      <motion.div
        initial={{ opacity: 1 }}
        animate={phase >= 2 ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 1.5 }}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 3,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          willChange: "opacity",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={phase >= 1 ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 2, ease: "easeOut" }}
          style={{
            width: "clamp(160px, 30vw, 400px)",
            height: "clamp(160px, 30vw, 400px)",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(201,160,85,0.12) 0%, transparent 70%)",
            willChange: "transform, opacity",
          }}
        />
      </motion.div>

      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 clamp(16px, 5vw, 80px)",
          y: contentY,
          opacity: contentOpacity,
          willChange: "transform, opacity",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={phase >= 2 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "clamp(8px, 2vw, 16px)",
            marginBottom: "clamp(24px, calc(var(--vh, 1vh) * 4), 44px)",
          }}
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={phase >= 2 ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            style={{
              width: "clamp(24px, 4vw, 48px)",
              height: 1,
              background: "linear-gradient(to right, transparent, #C9A055)",
              transformOrigin: "right",
              willChange: "transform",
            }}
          />
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              color: "#C9A055",
              fontSize: "clamp(0.5rem, 1.2vw, 0.62rem)",
              letterSpacing: "clamp(0.2em, 0.4vw, 0.48em)",
              textTransform: "uppercase",
              fontWeight: 500,
              animation:
                phase >= 4 ? "text-breathe 5s ease-in-out infinite" : "none",
              paddingRight: "0.5em",
            }}
          >
            Dubai · UAE · Global Icon
          </span>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={phase >= 2 ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            style={{
              width: "clamp(24px, 4vw, 48px)",
              height: 1,
              background: "linear-gradient(to left, transparent, #C9A055)",
              transformOrigin: "left",
              willChange: "transform",
            }}
          />
        </motion.div>

        <div
          style={{ overflow: "hidden", marginBottom: "clamp(2px, 0.5vh, 8px)" }}
        >
          <motion.h1
            initial={{ y: "110%" }}
            animate={phase >= 2 ? { y: "0%" } : {}}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="crisp-text"
            style={{
              fontFamily: "'Cormorant Garant', serif",
              fontSize: "clamp(2.8rem, 10vw, 11rem)",
              fontWeight: 300,
              color: "white",
              lineHeight: 0.92,
              letterSpacing: "-0.015em",
              margin: 0,
              willChange: "transform",
            }}
          >
            Where the
          </motion.h1>
        </div>

        <div style={{ position: "relative", display: "inline-block" }}>
          <div
            style={{
              position: "absolute",
              inset: "-40% -30%",
              background:
                "radial-gradient(ellipse at center, rgba(201,160,85,0.08) 0%, rgba(201,160,85,0.03) 40%, transparent 70%)",
              pointerEvents: "none",
              zIndex: 0,
              opacity: phase >= 4 ? 1 : 0,
              transition: "opacity 2s ease",
            }}
          />
          <div
            style={{
              overflow: "hidden",
              marginBottom: "clamp(20px, 4vh, 40px)",
              position: "relative",
              zIndex: 1,
            }}
          >
            <motion.h1
              initial={{ y: "110%" }}
              animate={phase >= 3 ? { y: "0%" } : {}}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="crisp-text"
              style={{
                fontFamily: "'Cormorant Garant', serif",
                fontSize: "clamp(2.8rem, 10vw, 11rem)",
                fontWeight: 300,
                color: "#C9A055",
                lineHeight: 0.92,
                letterSpacing: "-0.015em",
                fontStyle: "italic",
                margin: 0,
                willChange: "transform",
              }}
            >
              World Convenes
            </motion.h1>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={phase >= 4 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Inter', sans-serif",
            color: "rgba(255,255,255,0.42)",
            fontSize: "clamp(0.62rem, 1.2vw, 0.85rem)",
            letterSpacing: "clamp(0.12em, 0.2vw, 0.24em)",
            textTransform: "uppercase",
            maxWidth: "clamp(280px, 50vw, 520px)",
            lineHeight: 2.0,
            margin: "0 0 clamp(28px, 5vh, 52px) 0",
            willChange: "transform, opacity",
          }}
        >
          The Pinnacle Dubai — redefining global commerce,
          <br className="desktop-break" /> culture, and entertainment at
          unprecedented scale
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={phase >= 5 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "flex",
            gap: "clamp(8px, 2vw, 16px)",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <button
            onClick={scrollToNext}
            style={{
              background: "#C9A055",
              color: "#050505",
              border: "none",
              padding: "clamp(12px, 2vh, 18px) clamp(24px, 4vw, 48px)",
              fontSize: "clamp(0.52rem, 0.9vw, 0.62rem)",
              letterSpacing: "clamp(0.18em, 0.28vw, 0.32em)",
              textTransform: "uppercase",
              cursor: "pointer",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 700,
              transition: "background 0.4s",
              minHeight: "44px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#E8C878";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#C9A055";
            }}
          >
            Explore Pinnacle
          </button>
          <button
            onClick={() =>
              document
                .getElementById("cta")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            style={{
              background: "transparent",
              color: "rgba(255,255,255,0.7)",
              border: "1px solid rgba(255,255,255,0.22)",
              padding: "clamp(12px, 2vh, 18px) clamp(24px, 4vw, 48px)",
              fontSize: "clamp(0.52rem, 0.9vw, 0.62rem)",
              letterSpacing: "clamp(0.18em, 0.28vw, 0.32em)",
              textTransform: "uppercase",
              cursor: "pointer",
              fontFamily: "'Inter', sans-serif",
              transition: "border-color 0.4s, color 0.4s",
              minHeight: "44px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(201,160,85,0.6)";
              e.currentTarget.style.color = "#C9A055";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.22)";
              e.currentTarget.style.color = "rgba(255,255,255,0.7)";
            }}
          >
            Partner With Us
          </button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={phase >= 5 ? { opacity: 1 } : {}}
        transition={{ duration: 1.5 }}
        className="hero-corner-data"
        style={{
          position: "absolute",
          bottom:
            "max(clamp(20px, 4vh, 36px), env(safe-area-inset-bottom, 20px))",
          right: "clamp(24px, 4vw, 48px)",
          zIndex: 6,
          textAlign: "right",
        }}
      >
        <div
          style={{
            fontFamily: "'Cormorant Garant', serif",
            color: "#C9A055",
            fontSize: "clamp(1rem, 2vw, 1.5rem)",
            fontWeight: 300,
            lineHeight: 1,
          }}
        >
          120M+
        </div>
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            color: "rgba(255,255,255,0.22)",
            fontSize: "clamp(0.42rem, 0.7vw, 0.5rem)",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            marginTop: 4,
          }}
        >
          Annual Visitors
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={phase >= 5 ? { opacity: 1 } : {}}
        transition={{ duration: 1.5 }}
        className="hero-corner-data"
        style={{
          position: "absolute",
          bottom:
            "max(clamp(20px, 4vh, 36px), env(safe-area-inset-bottom, 20px))",
          left: "clamp(24px, 4vw, 48px)",
          zIndex: 6,
        }}
      >
        <div
          style={{
            fontFamily: "'Cormorant Garant', serif",
            color: "#C9A055",
            fontSize: "clamp(1rem, 2vw, 1.5rem)",
            fontWeight: 300,
            lineHeight: 1,
          }}
        >
          67M sqft
        </div>
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            color: "rgba(255,255,255,0.22)",
            fontSize: "clamp(0.42rem, 0.7vw, 0.5rem)",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            marginTop: 4,
          }}
        >
          Destination Scale
        </div>
      </motion.div>
    </section>
  );
}
