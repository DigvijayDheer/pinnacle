"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import BackgroundImage from "./ui/BackgroundImage";

const IMG_INTERIOR =
  "https://images.unsplash.com/photo-1614521084980-811d04f6c6cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1200";
const IMG_JEWELRY =
  "https://images.unsplash.com/photo-1774110073583-2475ab5ed8b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=800";
const IMG_FASHION =
  "https://images.unsplash.com/photo-1606132653399-36248f2e2a99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=800";

const ZONES = [
  {
    name: "Haute Couture District",
    desc: "200+ global luxury fashion houses, from Chanel to emerging designers",
  },
  {
    name: "Fine Dining Gallery",
    desc: "Michelin-starred culinary experiences curated from 5 continents",
  },
  {
    name: "The Private Members Club",
    desc: "Exclusive membership for ultra-high-net-worth individuals",
  },
  {
    name: "Art & Culture Pavilion",
    desc: "World-class rotating installations and live performances",
  },
  {
    name: "The Pinnacle Residences",
    desc: "Luxury branded hotel suites directly within the destination",
  },
];

export function LuxuryExperience() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#070707",
        padding: "clamp(56px, 9vw, 130px) 0",
        position: "relative",
        overflow: "hidden",
        contain: "layout",
      }}
    >
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          bottom: 0,
          width: 1,
          background:
            "linear-gradient(to bottom, transparent, rgba(201,160,85,0.1), transparent)",
        }}
      />

      <style>{`
        .luxury-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(40px, 6vw, 100px);
          align-items: start;
        }
        .luxury-left-col {
          /* Extra bottom padding so floating thumbnail doesn't overlap sibling */
          padding-bottom: clamp(60px, 8vw, 100px);
          position: relative;
        }
        @media (max-width: 860px) {
          .luxury-grid {
            grid-template-columns: 1fr;
            gap: clamp(48px, 8vw, 80px);
          }
          .luxury-left-col {
            /* On mobile the float is contained, less padding needed */
            padding-bottom: clamp(40px, 6vw, 64px);
          }
          .floating-img {
            /* Pull back to contained position on small screens */
            right: 0 !important;
            bottom: -32px !important;
            width: 52% !important;
          }
        }
        @media (max-width: 520px) {
          .floating-img {
            width: 58% !important;
            bottom: -24px !important;
          }
        }
      `}</style>

      <div
        style={{
          maxWidth: "min(1440px, 100%)",
          margin: "0 auto",
          padding: "0 clamp(16px, 4vw, 80px)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: "clamp(40px, 7vh, 80px)",
          }}
        >
          <div
            style={{
              width: 48,
              height: 1,
              background: "#C9A055",
              flexShrink: 0,
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
            Luxury Experience
          </span>
        </motion.div>

        <div className="luxury-grid">
          <motion.div
            className="luxury-left-col"
            initial={{ opacity: 0, x: -60 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ willChange: "transform, opacity" }}
          >
            <div
              style={{
                position: "relative",
                height: "clamp(280px, 45vw, 620px)",
                overflow: "hidden",
                contain: "paint",
              }}
            >
              <motion.div
                style={{
                  position: "absolute",
                  inset: "-12%",
                  y: imgY,
                  willChange: "transform",
                }}
              >
                <BackgroundImage
                  src={IMG_INTERIOR}
                  alt="interior"
                  placeholderColor="#070707"
                  objectPosition="center"
                />
              </motion.div>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(135deg, rgba(7,7,7,0.35), rgba(7,7,7,0.05) 50%, transparent)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 16,
                  left: 16,
                  width: "clamp(28px, 3.5vw, 50px)",
                  height: "clamp(28px, 3.5vw, 50px)",
                  borderTop: "1.5px solid #C9A055",
                  borderLeft: "1.5px solid #C9A055",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: 16,
                  right: 16,
                  width: "clamp(28px, 3.5vw, 50px)",
                  height: "clamp(28px, 3.5vw, 50px)",
                  borderBottom: "1.5px solid #C9A055",
                  borderRight: "1.5px solid #C9A055",
                }}
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
              className="floating-img"
              style={{
                position: "absolute",
                bottom: 0,
                right: "clamp(-8px, -1.5vw, -24px)",
                width: "42%",
                height: "clamp(110px, 16vw, 190px)",
                overflow: "hidden",
                border: "2px solid rgba(201,160,85,0.3)",
                contain: "paint",
              }}
            >
              <BackgroundImage
                src={IMG_JEWELRY}
                alt="jewelry"
                placeholderColor="#070707"
                objectPosition="center"
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top, rgba(7,7,7,0.7), transparent)",
                }}
              />
              <div style={{ position: "absolute", bottom: 10, left: 14 }}>
                <div
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    color: "rgba(255,255,255,0.5)",
                    fontSize: "clamp(0.4rem, 0.65vw, 0.5rem)",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                  }}
                >
                  Jewelry Gallery · Level 4
                </div>
              </div>
            </motion.div>
          </motion.div>

          <div style={{ paddingTop: "clamp(0px, 1vh, 8px)" }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.2 }}
              style={{ willChange: "transform, opacity" }}
            >
              <h2
                style={{
                  fontFamily: "'Cormorant Garant', serif",
                  fontSize: "clamp(2.2rem, 4.5vw, 4.8rem)",
                  fontWeight: 300,
                  color: "white",
                  lineHeight: 1.05,
                  margin: "0 0 clamp(16px, 3vh, 28px) 0",
                }}
              >
                Unrivaled{" "}
                <span style={{ color: "#C9A055", fontStyle: "italic" }}>
                  Luxury
                </span>
                <br />
                Beyond Compare
              </h2>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: "rgba(255,255,255,0.45)",
                  lineHeight: 1.9,
                  fontSize: "clamp(0.78rem, 1.1vw, 0.88rem)",
                  marginBottom: "clamp(28px, 5vh, 52px)",
                  maxWidth: 500,
                }}
              >
                Pinnacle Dubai is not a shopping destination — it is the
                world&apos;s most curated luxury ecosystem. Every brand, every
                space, every experience has been meticulously selected to serve
                the world&apos;s most discerning individuals at the highest
                possible level.
              </p>
            </motion.div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              {ZONES.map((zone, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 40 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.7,
                    delay: 0.4 + i * 0.1,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{
                    padding: "clamp(14px, 2.5vh, 22px) 0",
                    borderBottom: "1px solid rgba(255,255,255,0.07)",
                    display: "flex",
                    gap: "clamp(12px, 2vw, 18px)",
                    alignItems: "flex-start",
                    cursor: "default",
                    transition: "transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
                    willChange: "transform, opacity",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.transform =
                      "translateX(12px)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.transform =
                      "translateX(0)";
                  }}
                >
                  <div
                    style={{
                      width: 5,
                      height: 5,
                      background: "#C9A055",
                      borderRadius: "50%",
                      marginTop: 7,
                      flexShrink: 0,
                      boxShadow: "0 0 8px rgba(201,160,85,0.6)",
                    }}
                  />
                  <div>
                    <div
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        color: "rgba(255,255,255,0.85)",
                        fontSize: "clamp(0.65rem, 0.95vw, 0.78rem)",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        marginBottom: 4,
                        fontWeight: 500,
                      }}
                    >
                      {zone.name}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        color: "rgba(255,255,255,0.35)",
                        fontSize: "clamp(0.65rem, 0.95vw, 0.75rem)",
                        lineHeight: 1.6,
                      }}
                    >
                      {zone.desc}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1 }}
              style={{
                marginTop: "clamp(28px, 5vh, 48px)",
                height: "clamp(70px, 10vw, 100px)",
                overflow: "hidden",
                position: "relative",
                contain: "paint",
              }}
            >
              <div
                style={{ width: "100%", height: "140%", position: "relative" }}
              >
                <BackgroundImage
                  src={IMG_FASHION}
                  alt="fashion strip"
                  placeholderColor="#070707"
                  objectPosition="center 30%"
                />
              </div>
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to right, rgba(7,7,7,0.6), transparent 30%, transparent 70%, rgba(7,7,7,0.6))",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "'Cormorant Garant', serif",
                    color: "rgba(255,255,255,0.55)",
                    fontSize: "clamp(0.55rem, 1vw, 0.7rem)",
                    letterSpacing: "0.5em",
                    textTransform: "uppercase",
                    fontStyle: "italic",
                    paddingRight: "0.5em",
                    textAlign: "center",
                  }}
                >
                  Haute Couture · Level 2 &amp; 3
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
