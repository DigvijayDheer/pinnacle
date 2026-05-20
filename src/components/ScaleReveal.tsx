"use client";

import { useEffect, useRef, useState, memo } from "react";
import { motion, useInView } from "motion/react";

function useCountUp(target: number, duration: number, active: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let startTime: number | null = null;
    const tick = (ts: number) => {
      if (!startTime) startTime = ts;
      const elapsed = (ts - startTime) / 1000;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [active, target, duration]);
  return count;
}

const STATS = [
  {
    value: 120,
    prefix: "",
    suffix: "M+",
    label: "Annual Visitors",
    desc: "From 86 countries across every continent",
    detail: "Projected 180M by 2030",
  },
  {
    value: 67,
    prefix: "",
    suffix: "M sqft",
    label: "Total Destination",
    desc: "Retail, dining, entertainment & hospitality",
    detail: "Largest in the hemisphere",
  },
  {
    value: 1200,
    prefix: "",
    suffix: "+",
    label: "Global Brands",
    desc: "The world's most coveted names under one roof",
    detail: "400 exclusive first-market launches",
  },
  {
    value: 150,
    prefix: "",
    suffix: "+",
    label: "Annual Events",
    desc: "World premieres, concerts & cultural showcases",
    detail: "18 Michelin-starred venues",
  },
];

const StatCard = memo(function StatCard({
  stat,
  index,
  isInView,
}: {
  stat: (typeof STATS)[0];
  index: number;
  isInView: boolean;
}) {
  const count = useCountUp(stat.value, 2.2, isInView);

  const suffixMatch = stat.suffix.match(/^([A-Z+]+)(?:\s+(.+))?$/i) || [];
  const bigPart = suffixMatch[1] ?? stat.suffix;
  const unitPart = suffixMatch[2] ?? "";

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.9,
        delay: 0.15 + index * 0.18,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{
        padding: "clamp(24px, 3.5vw, 52px) clamp(20px, 2.5vw, 44px)",
        position: "relative",
        borderLeft: "1px solid rgba(201,160,85,0.15)",
        cursor: "default",
        willChange: "transform, opacity",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: -1,
          width: 2,
          height: isInView ? "100%" : "0%",
          background:
            "linear-gradient(to bottom, #C9A055, rgba(201,160,85,0.3))",
          transition: `height 1.2s ease ${0.3 + index * 0.18}s`,
        }}
      />

      <div
        style={{
          fontFamily: "'Cormorant Garant', serif",
          color: "rgba(201,160,85,0.2)",
          fontSize: "clamp(0.55rem, 0.8vw, 0.8rem)",
          letterSpacing: "0.3em",
          marginBottom: "clamp(10px, 1.5vh, 20px)",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      <div
        style={{
          fontFamily: "'Cormorant Garant', serif",
          fontWeight: 300,
          lineHeight: 1,
          marginBottom: "clamp(10px, 1.5vh, 16px)",
          display: "flex",
          alignItems: "baseline",
          flexWrap: "nowrap",
          gap: "0.03em",
          minWidth: 0,
          overflow: "hidden",
        }}
      >
        <span
          style={{
            fontSize: "clamp(2.2rem, 3.6vw, 5.2rem)",
            color: "white",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          {isInView ? count.toLocaleString() : "0"}
        </span>
        <span
          style={{
            fontSize: "clamp(2.2rem, 3.6vw, 5.2rem)",
            color: "#C9A055",
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          {bigPart}
        </span>
        {unitPart && (
          <span
            style={{
              fontSize: "clamp(1rem, 1.8vw, 2.6rem)",
              color: "#C9A055",
              whiteSpace: "nowrap",
              flexShrink: 0,
              fontStyle: "italic",
              letterSpacing: "0.03em",
            }}
          >
            {unitPart}
          </span>
        )}
      </div>

      <div
        style={{
          fontFamily: "'Inter', sans-serif",
          color: "rgba(255,255,255,0.85)",
          fontSize: "clamp(0.58rem, 0.85vw, 0.75rem)",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          marginBottom: "clamp(6px, 1vh, 10px)",
          fontWeight: 500,
        }}
      >
        {stat.label}
      </div>

      <div
        style={{
          fontFamily: "'Inter', sans-serif",
          color: "rgba(255,255,255,0.38)",
          fontSize: "clamp(0.65rem, 0.9vw, 0.78rem)",
          lineHeight: 1.7,
          marginBottom: "clamp(10px, 1.5vh, 16px)",
          flexGrow: 1,
        }}
      >
        {stat.desc}
      </div>

      <div style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
        <div
          style={{ width: 16, height: 1, background: "#C9A055", flexShrink: 0 }}
        />
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            color: "#C9A055",
            fontSize: "clamp(0.5rem, 0.7vw, 0.6rem)",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          {stat.detail}
        </span>
      </div>
    </motion.div>
  );
});

export function ScaleReveal() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="experience"
      ref={sectionRef}
      style={{
        background: "#050505",
        padding: "clamp(56px, 9vw, 130px) 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "70%",
          height: "70%",
          background:
            "radial-gradient(ellipse, rgba(201,160,85,0.04) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(rgba(201,160,85,0.04) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "min(1440px, 100%)",
          margin: "0 auto",
          padding: "0 clamp(16px, 4vw, 80px)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            textAlign: "center",
            marginBottom: "clamp(40px, 7vh, 100px)",
            willChange: "transform, opacity",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "clamp(10px, 2vw, 18px)",
              marginBottom: "clamp(14px, 2.5vh, 24px)",
            }}
          >
            <div
              style={{
                width: "clamp(32px, 5vw, 64px)",
                height: 1,
                background:
                  "linear-gradient(to right, transparent, rgba(201,160,85,0.5))",
              }}
            />
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                color: "#C9A055",
                fontSize: "clamp(0.52rem, 0.9vw, 0.62rem)",
                letterSpacing: "clamp(0.2em, 0.35vw, 0.42em)",
                textTransform: "uppercase",
                fontWeight: 500,
                paddingRight: "0.5em",
              }}
            >
              The Scale
            </span>
            <div
              style={{
                width: "clamp(32px, 5vw, 64px)",
                height: 1,
                background:
                  "linear-gradient(to left, transparent, rgba(201,160,85,0.5))",
              }}
            />
          </div>
          <h2
            style={{
              fontFamily: "'Cormorant Garant', serif",
              color: "white",
              fontSize: "clamp(1.8rem, 5vw, 5.5rem)",
              fontWeight: 300,
              lineHeight: 1.05,
              margin: 0,
            }}
          >
            A Destination of{" "}
            <span style={{ color: "#C9A055", fontStyle: "italic" }}>
              Unprecedented
            </span>
            <br />
            Global Magnitude
          </h2>
        </motion.div>

        <style>{`
          .scale-stats-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            border-top: 1px solid rgba(201,160,85,0.12);
            border-right: 1px solid rgba(201,160,85,0.12);
          }
          .scale-stats-grid > * {
            border-bottom: 1px solid rgba(201,160,85,0.12);
          }
          @media (max-width: 900px) {
            .scale-stats-grid {
              grid-template-columns: repeat(2, 1fr);
            }
          }
          @media (max-width: 520px) {
            .scale-stats-grid {
              grid-template-columns: 1fr;
            }
          }
        `}</style>

        <div className="scale-stats-grid">
          {STATS.map((stat, i) => (
            <StatCard key={i} stat={stat} index={i} isInView={isInView} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1.2 }}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "clamp(12px, 2vw, 20px)",
            marginTop: "clamp(40px, 7vh, 80px)",
          }}
        >
          <div
            style={{
              width: "clamp(24px, 4vw, 48px)",
              height: 1,
              background: "rgba(201,160,85,0.3)",
              flexShrink: 0,
            }}
          />
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              color: "rgba(255,255,255,0.28)",
              fontSize: "clamp(0.6rem, 0.9vw, 0.7rem)",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              textAlign: "center",
              margin: 0,
            }}
          >
            Numbers that redefine what&apos;s possible in destination commerce
          </p>
          <div
            style={{
              width: "clamp(24px, 4vw, 48px)",
              height: 1,
              background: "rgba(201,160,85,0.3)",
              flexShrink: 0,
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
