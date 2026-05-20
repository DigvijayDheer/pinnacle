"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import BackgroundImage from "./ui/BackgroundImage";

const IMG_CITY =
  "https://images.unsplash.com/photo-1650728768250-29d1061bf84b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1920";

const MILESTONES = [
  {
    year: "2024",
    title: "The Foundation",
    desc: "Grand opening of Phase 1 — 45M sqft of retail, dining, and entertainment. The world takes notice.",
    status: "complete",
  },
  {
    year: "2026",
    title: "The Expansion",
    desc: "Phase 2 launches — a 12M sqft cultural and arts district, plus 3 branded residential towers.",
    status: "active",
  },
  {
    year: "2027",
    title: "The Arena",
    desc: "A 60,000-seat multi-use arena and adjacent entertainment complex open to international acclaim.",
    status: "upcoming",
  },
  {
    year: "2028",
    title: "Global Hub",
    desc: "Pinnacle International Terminal opens — dedicated arrival experience for ultra-high-net-worth guests.",
    status: "upcoming",
  },
  {
    year: "2030",
    title: "The Vision Realized",
    desc: "Full build-out complete. 180M annual visitors. The undisputed #1 destination on Earth.",
    status: "upcoming",
  },
];

const FUTURE_STATS = [
  { label: "Projected Visitors by 2030", value: "180M+" },
  { label: "Total Investment Value", value: "$38B" },
  { label: "Jobs Created", value: "420,000+" },
  { label: "GDP Contribution", value: "$120B+" },
];

export function FutureVision() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      id="vision"
      ref={sectionRef}
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#030303",
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          inset: "-15%",
          opacity: 0.18,
          y: bgY,
          willChange: "transform",
        }}
      >
        <BackgroundImage
          src={IMG_CITY}
          alt="city background"
          placeholderColor="#030303"
          objectPosition="center"
        />
      </motion.div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, #030303 0%, transparent 20%, transparent 80%, #030303 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(201,160,85,0.06) 0%, transparent 60%)",
        }}
      />

      <div
        style={{
          maxWidth: "min(1440px, 100%)",
          margin: "0 auto",
          padding: "clamp(56px, 9vw, 130px) clamp(16px, 4vw, 80px)",
          position: "relative",
          zIndex: 2,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          style={{
            textAlign: "center",
            marginBottom: "clamp(48px, 8vh, 100px)",
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
              The Future Vision
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
              fontSize: "clamp(2rem, 5.5vw, 5.5rem)",
              fontWeight: 300,
              lineHeight: 1.05,
            }}
          >
            Building the World&apos;s Most{" "}
            <span style={{ color: "#C9A055", fontStyle: "italic" }}>
              Important
            </span>
            <br />
            Destination by 2030
          </h2>
        </motion.div>

        <div
          style={{
            position: "relative",
            maxWidth: 960,
            margin: "0 auto clamp(48px, 8vh, 100px)",
          }}
        >
          <motion.div
            initial={{ scaleY: 0 }}
            animate={isInView ? { scaleY: 1 } : {}}
            transition={{ duration: 2, ease: "easeOut" }}
            style={{
              position: "absolute",
              left: "50%",
              top: 0,
              bottom: 0,
              width: 1,
              background:
                "linear-gradient(to bottom, transparent, rgba(201,160,85,0.3), rgba(201,160,85,0.3), transparent)",
              transformOrigin: "top",
            }}
            className="timeline-line"
          />

          {MILESTONES.map((m, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{
                  duration: 0.9,
                  delay: 0.2 + i * 0.18,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="milestone-item"
                style={{
                  display: "flex",
                  justifyContent: isLeft ? "flex-end" : "flex-start",
                  paddingLeft: isLeft ? "0" : "calc(50% + 40px)",
                  paddingRight: isLeft ? "calc(50% + 40px)" : "0",
                  marginBottom: "clamp(28px, 5vh, 56px)",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: 18,
                    transform: "translateX(-50%)",
                    zIndex: 3,
                  }}
                >
                  <div
                    style={{
                      width: m.status === "active" ? 14 : 10,
                      height: m.status === "active" ? 14 : 10,
                      borderRadius: "50%",
                      background:
                        m.status === "complete"
                          ? "#C9A055"
                          : m.status === "active"
                            ? "#E8C878"
                            : "rgba(201,160,85,0.25)",
                      border:
                        m.status === "active"
                          ? "2px solid #C9A055"
                          : m.status === "complete"
                            ? "none"
                            : "1px solid rgba(201,160,85,0.3)",
                      boxShadow:
                        m.status === "active"
                          ? "0 0 20px rgba(201,160,85,0.5)"
                          : "none",
                    }}
                  />
                </div>

                <div
                  style={{
                    maxWidth: "clamp(220px, 35vw, 380px)",
                    width: "100%",
                    padding: "clamp(18px, 3vh, 28px) clamp(16px, 2.5vw, 32px)",
                    border: `1px solid ${m.status === "active" ? "rgba(201,160,85,0.4)" : m.status === "complete" ? "rgba(201,160,85,0.2)" : "rgba(255,255,255,0.06)"}`,
                    background:
                      m.status === "active"
                        ? "rgba(201,160,85,0.05)"
                        : "rgba(255,255,255,0.02)",
                    position: "relative",
                  }}
                >
                  {m.status === "active" && (
                    <div
                      style={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        fontFamily: "'Inter', sans-serif",
                        color: "#C9A055",
                        fontSize: "clamp(0.42rem, 0.7vw, 0.5rem)",
                        letterSpacing: "0.25em",
                        background: "rgba(201,160,85,0.1)",
                        padding: "3px 7px",
                      }}
                    >
                      IN PROGRESS
                    </div>
                  )}
                  <div
                    style={{
                      fontFamily: "'Cormorant Garant', serif",
                      color:
                        m.status === "upcoming"
                          ? "rgba(201,160,85,0.4)"
                          : "#C9A055",
                      fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                      fontWeight: 300,
                      lineHeight: 1,
                      marginBottom: 6,
                    }}
                  >
                    {m.year}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Cormorant Garant', serif",
                      color: "white",
                      fontSize: "clamp(0.9rem, 1.5vw, 1.2rem)",
                      fontWeight: 400,
                      marginBottom: 8,
                    }}
                  >
                    {m.title}
                  </div>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      color: "rgba(255,255,255,0.38)",
                      fontSize: "clamp(0.68rem, 1vw, 0.76rem)",
                      lineHeight: 1.75,
                    }}
                  >
                    {m.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 1.2 }}
        >
          <div
            style={{
              border: "1px solid rgba(201,160,85,0.2)",
              padding: "clamp(28px, 5vh, 56px) clamp(16px, 4vw, 48px)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 60,
                height: 60,
                borderTop: "1.5px solid #C9A055",
                borderLeft: "1.5px solid #C9A055",
              }}
            />
            <div
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: 60,
                height: 60,
                borderBottom: "1.5px solid #C9A055",
                borderRight: "1.5px solid #C9A055",
              }}
            />

            <div
              style={{
                textAlign: "center",
                marginBottom: "clamp(24px, 4vh, 48px)",
              }}
            >
              <h3
                style={{
                  fontFamily: "'Cormorant Garant', serif",
                  color: "white",
                  fontSize: "clamp(1.2rem, 2.5vw, 2.5rem)",
                  fontWeight: 300,
                  marginBottom: 8,
                }}
              >
                The 2030{" "}
                <span style={{ color: "#C9A055", fontStyle: "italic" }}>
                  Horizon
                </span>
              </h3>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: "rgba(255,255,255,0.3)",
                  fontSize: "clamp(0.65rem, 1vw, 0.75rem)",
                  letterSpacing: "0.15em",
                }}
              >
                Projections based on confirmed development phases and market
                analysis
              </p>
            </div>

            <div className="future-stats-grid">
              {FUTURE_STATS.map((s, i) => (
                <div
                  key={i}
                  style={{
                    textAlign: "center",
                    padding: "clamp(16px, 3vh, 24px) clamp(8px, 2vw, 16px)",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Cormorant Garant', serif",
                      color: "#C9A055",
                      fontSize: "clamp(1.6rem, 3.5vw, 3.5rem)",
                      fontWeight: 300,
                      lineHeight: 1,
                      marginBottom: "clamp(6px, 1.5vh, 12px)",
                    }}
                  >
                    {s.value}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      color: "rgba(255,255,255,0.38)",
                      fontSize: "clamp(0.55rem, 0.85vw, 0.68rem)",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                    }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
