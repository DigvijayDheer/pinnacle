"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";

interface Props {
  phrase: string;
  type?: "sweep" | "blackout" | "light" | "architecture";
}

export function SceneTransition({ phrase, type = "sweep" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-30%" });

  const { scrollYProgress } = useScroll({
    target: type === "sweep" ? ref : undefined,
    offset: ["start end", "end start"],
  });
  const bgOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0, 1, 1, 0],
  );
  const scaleVal = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 1.04]);

  if (type === "blackout") {
    return (
      <div
        ref={ref}
        style={{
          position: "relative",
          height: "calc(var(--vh, 1vh) * 50)",
          background: "#010101",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          contain: "layout",
        }}
      >
        <div
          style={{
            position: "absolute",
            width: "60%",
            height: "80%",
            background:
              "radial-gradient(ellipse, rgba(201,160,85,0.06) 0%, transparent 70%)",
            opacity: isInView ? 1 : 0,
            transition: "opacity 1s ease",
          }}
        />

        <style>{`
          .blackout-phrase {
            font-family: 'Cormorant Garant', serif;
            font-size: clamp(0.55rem, 2.2vw, 1rem);
            letter-spacing: 0.45em;
            text-transform: uppercase;
            color: rgba(201,160,85,0.5);
            font-weight: 300;
            display: block;
            white-space: nowrap;
            padding-right: 0.45em;
          }
          @media (max-width: 600px) {
            .blackout-phrase {
              white-space: normal;
              text-align: center;
              letter-spacing: 0.2em;
              font-size: clamp(0.6rem, 3.8vw, 0.85rem);
              line-height: 2;
              padding: 0 clamp(16px, 6vw, 32px);
            }
          }
        `}</style>

        <div
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            display: "flex",
            justifyContent: "center",
            overflow: "hidden",
            padding: "0 clamp(16px, 4vw, 48px)",
            boxSizing: "border-box",
          }}
        >
          <motion.div
            initial={{ x: "-100%" }}
            animate={isInView ? { x: "0%" } : {}}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            style={{ willChange: "transform" }}
          >
            <span className="blackout-phrase">{phrase}</span>
          </motion.div>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.8, ease: "easeInOut", delay: 0.1 }}
          style={{
            position: "absolute",
            top: "45%",
            left: "8%",
            right: "8%",
            height: 1,
            background:
              "linear-gradient(to right, transparent, rgba(201,160,85,0.15) 30%, rgba(201,160,85,0.15) 70%, transparent)",
            transformOrigin: "left",
            willChange: "transform",
          }}
        />
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.8, ease: "easeInOut", delay: 0.3 }}
          style={{
            position: "absolute",
            top: "55%",
            left: "8%",
            right: "8%",
            height: 1,
            background:
              "linear-gradient(to right, transparent, rgba(201,160,85,0.08) 30%, rgba(201,160,85,0.08) 70%, transparent)",
            transformOrigin: "right",
            willChange: "transform",
          }}
        />
      </div>
    );
  }

  if (type === "light") {
    return (
      <div
        ref={ref}
        style={{
          position: "relative",
          height: "calc(var(--vh, 1vh) * 40)",
          background: "linear-gradient(to bottom, #030303, #050505, #030303)",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          contain: "layout",
        }}
      >
        <motion.div
          initial={{ x: "-120%", rotate: -8 }}
          animate={isInView ? { x: "220%", rotate: -8 } : {}}
          transition={{ duration: 2.2, ease: [0.4, 0, 0.2, 1], delay: 0.2 }}
          style={{
            position: "absolute",
            inset: "-40%",
            width: "35%",
            background:
              "linear-gradient(to right, transparent, rgba(201,160,85,0.07) 40%, rgba(201,160,85,0.1) 50%, rgba(201,160,85,0.07) 60%, transparent)",
            pointerEvents: "none",
            willChange: "transform",
          }}
        />
        <motion.div
          initial={{ x: "180%", rotate: 8 }}
          animate={isInView ? { x: "-180%", rotate: 8 } : {}}
          transition={{ duration: 3, ease: "easeInOut", delay: 0.8 }}
          style={{
            position: "absolute",
            inset: "-40%",
            width: "20%",
            background:
              "linear-gradient(to right, transparent, rgba(255,255,255,0.025), transparent)",
            pointerEvents: "none",
            willChange: "transform",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.4 }}
            style={{
              width: 60,
              height: 1,
              background: "rgba(201,160,85,0.3)",
              transformOrigin: "right",
              willChange: "transform",
            }}
          />
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1, delay: 0.8 }}
            style={{
              fontFamily: "'Cormorant Garant', serif",
              fontSize: "clamp(0.65rem, 1.8vw, 0.88rem)",
              letterSpacing: "0.45em",
              color: "rgba(201,160,85,0.45)",
              textTransform: "uppercase",
              fontStyle: "italic",
            }}
          >
            {phrase}
          </motion.span>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.2, delay: 0.4 }}
            style={{
              width: 60,
              height: 1,
              background: "rgba(201,160,85,0.3)",
              transformOrigin: "left",
              willChange: "transform",
            }}
          />
        </div>
      </div>
    );
  }

  if (type === "architecture") {
    return (
      <div
        ref={ref}
        style={{
          position: "relative",
          height: "calc(var(--vh, 1vh) * 55)",
          background: "#030303",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          contain: "layout",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1,
            opacity: isInView ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
        >
          <svg
            viewBox="0 0 1440 300"
            style={{ width: "100%", height: "100%", opacity: 0.06 }}
            preserveAspectRatio="xMidYMax slice"
          >
            <path
              d="M0,300 L0,220 L80,220 L80,180 L100,180 L100,160 L120,160 L120,140 L140,140 L140,100 L145,80 L150,100 L150,140 L200,140 L200,180 L240,180 L240,220 L300,220 L300,190 L320,190 L320,170 L340,130 L360,170 L360,190 L400,190 L400,220 L450,220 L450,200 L470,200 L470,170 L490,130 L510,80 L530,130 L550,170 L550,200 L580,200 L580,220 L640,220 L640,180 L660,160 L680,100 L700,60 L720,40 L740,60 L760,100 L780,160 L800,180 L800,220 L860,220 L860,200 L880,200 L880,170 L900,120 L920,170 L920,200 L950,200 L950,220 L1000,220 L1000,190 L1020,140 L1040,190 L1040,220 L1100,220 L1100,180 L1120,150 L1140,130 L1160,150 L1160,180 L1200,180 L1200,220 L1260,220 L1260,200 L1280,180 L1300,160 L1320,180 L1320,200 L1360,200 L1360,220 L1440,220 L1440,300 Z"
              fill="rgba(201,160,85,0.8)"
              strokeDasharray="3400"
              strokeDashoffset={isInView ? "0" : "3400"}
              style={{
                transition: isInView
                  ? "stroke-dashoffset 2.5s ease 0.1s"
                  : "none",
              }}
            />
          </svg>
        </div>

        <motion.div
          initial={{ x: "-50%", opacity: 0 }}
          animate={isInView ? { x: "160%", opacity: [0, 1, 0] } : {}}
          transition={{ duration: 2.5, ease: "easeInOut", delay: 0.5 }}
          style={{
            position: "absolute",
            inset: 0,
            width: "25%",
            background:
              "linear-gradient(to right, transparent, rgba(201,160,85,0.06), transparent)",
            pointerEvents: "none",
            willChange: "transform, opacity",
          }}
        />

        <style>{`
          .arch-phrase-wrap {
            position: relative;
            z-index: 2;
            width: 100%;
            padding: 0 clamp(16px, 4vw, 48px);
            box-sizing: border-box;
            text-align: center;
          }
          .arch-phrase-text {
            font-family: 'Cormorant Garant', serif;
            font-weight: 300;
            color: rgba(255,255,255,0.08);
            letter-spacing: 0.06em;
            line-height: 1.1;
            white-space: nowrap;
            /* Fluid font that shrinks to keep text on one line */
            font-size: clamp(1.4rem, 4.5vw, 4.5rem);
            display: block;
          }
          @media (max-width: 640px) {
            .arch-phrase-wrap {
              text-align: center;
            }
            .arch-phrase-text {
              white-space: normal;
              text-align: center;
              font-size: clamp(1.6rem, 7vw, 2.8rem);
              line-height: 1.2;
            }
          }
        `}</style>

        <div className="arch-phrase-wrap">
          <div style={{ overflow: "hidden" }}>
            <motion.p
              className="arch-phrase-text"
              initial={{ y: "100%" }}
              animate={isInView ? { y: "0%" } : {}}
              transition={{
                duration: 1.2,
                ease: [0.16, 1, 0.3, 1],
                delay: 0.6,
              }}
              style={{ margin: 0, willChange: "transform" }}
            >
              {phrase}
            </motion.p>
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "40%",
            background: "linear-gradient(to bottom, transparent, #030303)",
            pointerEvents: "none",
          }}
        />
      </div>
    );
  }

  return (
    <div
      ref={ref}
      style={{
        position: "relative",
        height: "calc(var(--vh, 1vh) * 45)",
        background: "#030303",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        contain: "layout",
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          inset: 0,
          opacity: bgOpacity,
          scale: scaleVal,
          background:
            "radial-gradient(ellipse at center, rgba(201,160,85,0.04) 0%, transparent 70%)",
          pointerEvents: "none",
          willChange: "transform, opacity",
        }}
      />

      <motion.div
        initial={{ x: "-5%", opacity: 0 }}
        animate={isInView ? { x: "0%", opacity: 1 } : {}}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          overflow: "hidden",
          paddingBottom: "0.15em",
          paddingTop: "0.05em",
          willChange: "transform, opacity",
        }}
      >
        <span
          className="sweep-ghost-text crisp-text"
          style={{
            display: "block",
            fontFamily: "'Cormorant Garant', serif",
            fontSize: "clamp(4rem, 15vw, 18rem)",
            fontWeight: 300,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            whiteSpace: "nowrap",
            userSelect: "none",
            color: "transparent",
            WebkitTextStroke: "1px rgba(201,160,85,0.35)",
            backgroundImage:
              "linear-gradient(to right, rgba(201,160,85,0.7) 0%, rgba(201,160,85,0.7) 100%)",
            backgroundSize: "0% 100%",
            backgroundRepeat: "no-repeat",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            transition:
              "background-size 0.9s cubic-bezier(0.16, 1, 0.3, 1), -webkit-text-stroke-color 0.6s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundSize = "100% 100%";
            e.currentTarget.style.webkitTextStrokeColor = "rgba(201,160,85,0)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundSize = "0% 100%";
            e.currentTarget.style.webkitTextStrokeColor =
              "rgba(201,160,85,0.35)";
          }}
        >
          {phrase}
        </span>
      </motion.div>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.8, ease: "easeOut", delay: 0.4 }}
        style={{
          position: "absolute",
          left: "10%",
          right: "10%",
          top: "50%",
          height: 1,
          background:
            "linear-gradient(to right, transparent, rgba(201,160,85,0.18) 30%, rgba(201,160,85,0.18) 70%, transparent)",
          transformOrigin: "left",
          willChange: "transform",
        }}
      />
    </div>
  );
}
