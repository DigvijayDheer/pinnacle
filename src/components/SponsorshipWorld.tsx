"use client";

import { useRef, useState, memo } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
  type MotionValue,
} from "motion/react";
import BackgroundImage from "./ui/BackgroundImage";
import { Check, ArrowRight } from "lucide-react";

const IMG_CONCERT =
  "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1920";
const IMG_MALL =
  "https://images.unsplash.com/photo-1614521084980-811d04f6c6cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1920";
const IMG_CITY =
  "https://images.unsplash.com/photo-1590743689886-d2886505a267?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1920";

const ENVIRONMENTS = [
  {
    id: "premier",
    tier: "Premier",
    tierNum: "01",
    tagline: "Your Brand. Anchored in Destination.",
    statement:
      "Strategic presence across every layer of the Pinnacle ecosystem.",
    price: "From $2M",
    color: "#C9A055",
    img: IMG_CONCERT,
    imgPos: "center 35%",
    tint: "rgba(20,12,0,0.72)",
    ambientColor: "rgba(201,160,85,0.06)",
    benefits: [
      "Premium retail zone allocation",
      "4 annual event co-sponsorships",
      "Destination-wide digital presence",
      "VIP visitor experience program",
      "Co-branded seasonal campaigns",
      "Dedicated account management",
    ],
  },
  {
    id: "prestige",
    tier: "Prestige",
    tierNum: "02",
    tagline: "Your Brand. Woven Into the Fabric.",
    statement:
      "Immersive integration at every touchpoint of the world's most visited destination.",
    price: "From $8M",
    color: "#E8C878",
    img: IMG_MALL,
    imgPos: "center 40%",
    tint: "rgba(8,6,0,0.68)",
    ambientColor: "rgba(232,200,120,0.07)",
    benefits: [
      "Flagship dedicated brand pavilion",
      "12 headlining event sponsorships",
      "Custom experiential activation zones",
      "Priority retail positioning rights",
      "Global co-created brand campaigns",
      "Executive partnership board access",
      "Exclusive member privileges",
      "Dedicated content series production",
    ],
  },
  {
    id: "pinnacle",
    tier: "Pinnacle",
    tierNum: "03",
    tagline: "Your Brand. Permanently Written Into History.",
    statement:
      "A legacy that outlasts campaigns — your name permanently part of the world's greatest destination.",
    price: "From $25M",
    color: "#F5E0A0",
    img: IMG_CITY,
    imgPos: "center 50%",
    tint: "rgba(5,3,0,0.65)",
    ambientColor: "rgba(245,224,160,0.07)",
    benefits: [
      "Named destination asset (building / plaza)",
      "Unlimited flagship event hosting rights",
      "Permanent brand experience center",
      "Custom architectural brand integration",
      "Global campaign co-ownership",
      "Board-level destination advisory seat",
      "First-refusal on all new destination zones",
      "International press & PR ownership",
      "Digital twin asset & NFT rights",
    ],
  },
];

const EnvironmentLayer = memo(function EnvironmentLayer({
  env,
  isActive,
}: {
  env: (typeof ENVIRONMENTS)[number];
  isActive: boolean;
}) {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          key={env.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            overflow: "hidden",
            willChange: "opacity",
          }}
        >
          <motion.div
            initial={{ scale: 1.04 }}
            animate={{ scale: 1 }}
            transition={{ duration: 8, ease: "easeOut" }}
            style={{ position: "absolute", inset: 0, willChange: "transform" }}
          >
            <BackgroundImage
              src={env.img}
              alt={`${env.tier} background`}
              placeholderColor="#030303"
              objectPosition={env.imgPos}
            />
          </motion.div>

          <div
            style={{ position: "absolute", inset: 0, background: env.tint }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to right, rgba(3,3,3,0.95) 0%, rgba(3,3,3,0.55) 50%, rgba(3,3,3,0.2) 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(3,3,3,0.4) 0%, transparent 30%, transparent 70%, rgba(3,3,3,0.8) 100%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(ellipse at 70% 50%, ${env.ambientColor} 0%, transparent 55%)`,
            }}
          />

          <motion.div
            initial={{ x: "-60%", opacity: 0, rotate: -8 }}
            animate={{ x: "160%", opacity: [0, 0.6, 0], rotate: -8 }}
            transition={{ duration: 4, ease: "easeInOut", delay: 0.5 }}
            style={{
              position: "absolute",
              inset: "-20%",
              width: "20%",
              background:
                "linear-gradient(to right, transparent, rgba(255,255,255,0.025), transparent)",
              pointerEvents: "none",
              willChange: "transform, opacity",
            }}
          />

          <div
            className="watermark-num"
            style={{
              position: "absolute",
              right: "8vw",
              top: "50%",
              transform: "translateY(-50%)",
              fontFamily: "'Cormorant Garant', serif",
              color: env.color,
              fontSize: "clamp(8rem, 20vw, 20rem)",
              fontWeight: 300,
              lineHeight: 1,
              opacity: 0.04,
              letterSpacing: "-0.04em",
              userSelect: "none",
              pointerEvents: "none",
              zIndex: 0,
            }}
          >
            {env.tierNum}
          </div>

          <div
            className="env-content"
            style={{
              position: "absolute",
              inset: 0,
              zIndex: 15,
              display: "flex",
              alignItems: "center",
              padding: "0 clamp(16px, 6vw, 120px) 0 clamp(16px, 14vw, 200px)",
            }}
          >
            <div
              style={{ maxWidth: "clamp(280px, 55vw, 620px)", width: "100%" }}
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  marginBottom: 12,
                  willChange: "transform, opacity",
                }}
              >
                <div
                  style={{
                    width: 32,
                    height: 1,
                    background: env.color,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    color: env.color,
                    fontSize: "clamp(0.5rem, 0.9vw, 0.58rem)",
                    letterSpacing: "0.4em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                    paddingRight: "0.5em",
                  }}
                >
                  {env.tier} Partnership
                </span>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                style={{ willChange: "transform, opacity" }}
              >
                <h2
                  style={{
                    fontFamily: "'Cormorant Garant', serif",
                    color: "white",
                    fontSize: "clamp(1.6rem, 4.5vw, 4.5rem)",
                    fontWeight: 300,
                    lineHeight: 1.05,
                    marginBottom: "clamp(10px, 2vh, 14px)",
                  }}
                >
                  {env.tagline}
                </h2>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    color: "rgba(255,255,255,0.45)",
                    fontSize: "clamp(0.72rem, 1.1vw, 0.82rem)",
                    lineHeight: 1.85,
                    marginBottom: "clamp(18px, 3.5vh, 32px)",
                    maxWidth: 480,
                  }}
                >
                  {env.statement}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.25 }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "clamp(6px, 1.5vh, 10px) clamp(16px, 3vw, 32px)",
                  marginBottom: "clamp(20px, 4vh, 36px)",
                }}
                className="benefits-grid"
              >
                {env.benefits.map((b, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.45, delay: 0.3 + i * 0.05 }}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 10,
                      willChange: "transform, opacity",
                    }}
                  >
                    <div
                      style={{
                        width: 14,
                        height: 14,
                        borderRadius: "50%",
                        background: "rgba(201,160,85,0.12)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        marginTop: 1,
                      }}
                    >
                      <Check size={8} color={env.color} />
                    </div>
                    <span
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        color: "rgba(255,255,255,0.5)",
                        fontSize: "clamp(0.62rem, 0.95vw, 0.72rem)",
                        lineHeight: 1.6,
                      }}
                    >
                      {b}
                    </span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "clamp(14px, 2.5vw, 24px)",
                  flexWrap: "wrap",
                  willChange: "transform, opacity",
                }}
              >
                <div>
                  <span
                    style={{
                      fontFamily: "'Cormorant Garant', serif",
                      color: env.color,
                      fontSize: "clamp(1.2rem, 2.8vw, 2.4rem)",
                      fontWeight: 300,
                      lineHeight: 1,
                    }}
                  >
                    {env.price}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      color: "rgba(255,255,255,0.28)",
                      fontSize: "clamp(0.6rem, 0.9vw, 0.68rem)",
                      letterSpacing: "0.1em",
                      marginLeft: 8,
                    }}
                  >
                    per annum
                  </span>
                </div>
                <button
                  onClick={() =>
                    document
                      .getElementById("cta")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    background: "transparent",
                    border: `1px solid ${env.color}`,
                    color: env.color,
                    padding:
                      "clamp(10px, 1.8vh, 14px) clamp(16px, 2.5vw, 28px)",
                    fontFamily: "'Inter', sans-serif",
                    fontSize: "clamp(0.52rem, 0.85vw, 0.6rem)",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    fontWeight: 500,
                    transition: "background 0.4s, color 0.4s",
                    minHeight: "44px",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = env.color;
                    e.currentTarget.style.color = "#050505";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                    e.currentTarget.style.color = env.color;
                  }}
                >
                  Enquire about {env.tier} <ArrowRight size={12} />
                </button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

function ScrollProgressBar({
  scrollYProgress,
}: {
  scrollYProgress: MotionValue<number>;
}) {
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 2,
        background: "rgba(255,255,255,0.04)",
        zIndex: 25,
      }}
    >
      <motion.div
        style={{
          height: "100%",
          background: "linear-gradient(to right, transparent, #C9A055)",
          scaleX,
          transformOrigin: "left",
          willChange: "transform",
        }}
      />
    </div>
  );
}

export function SponsorshipWorld() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollHeight = `calc(${ENVIRONMENTS.length} * 100 * var(--vh, 1vh))`;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const activeIndexRef = useRef(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = v < 0.36 ? 0 : v < 0.68 ? 1 : 2;
    if (next !== activeIndexRef.current) {
      activeIndexRef.current = next;
      setActiveIndex(next);
    }
  });

  return (
    <section
      id="sponsorship"
      style={{ position: "relative", background: "#030303" }}
    >
      <div
        ref={containerRef}
        style={{ height: scrollHeight, position: "relative" }}
        className="sponsorship-scroll-container"
      >
        <div
          style={{
            position: "sticky",
            top: 0,
            height: "calc(var(--vh, 1vh) * 100)",
            overflow: "hidden",
          }}
        >
          {ENVIRONMENTS.map((env, i) => (
            <EnvironmentLayer
              key={env.id}
              env={env}
              isActive={activeIndex === i}
            />
          ))}

          <div
            className="tier-hud"
            style={{
              position: "absolute",
              left: "clamp(24px, 4vw, 48px)",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 20,
              display: "flex",
              flexDirection: "column",
              gap: "clamp(16px, 3vh, 28px)",
            }}
          >
            {ENVIRONMENTS.map((env, i) => (
              <div
                key={i}
                style={{ display: "flex", alignItems: "center", gap: 12 }}
              >
                <div
                  style={{
                    width: 32,
                    height: 1,
                    background: env.color,
                    transformOrigin: "left",
                    transform: `scaleX(${activeIndex === i ? 1 : 0.5})`,
                    opacity: activeIndex === i ? 1 : 0.3,
                    transition: "transform 0.4s ease, opacity 0.4s ease",
                  }}
                />
                <span
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    color:
                      activeIndex === i ? env.color : "rgba(255,255,255,0.25)",
                    fontSize: "clamp(0.48rem, 0.8vw, 0.55rem)",
                    letterSpacing: "0.3em",
                    textTransform: "uppercase",
                    transition: "color 0.4s",
                    paddingRight: "0.5em",
                  }}
                >
                  {env.tier}
                </span>
              </div>
            ))}
          </div>

          <div
            style={{
              position: "absolute",
              top: "clamp(20px, 4vh, 48px)",
              left: "clamp(24px, 4vw, 48px)",
              zIndex: 20,
            }}
            className="section-label"
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 32, height: 1, background: "#C9A055" }} />
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: "#C9A055",
                  fontSize: "clamp(0.48rem, 0.85vw, 0.58rem)",
                  letterSpacing: "0.4em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  paddingRight: "0.5em",
                }}
              >
                Sponsorship Worlds
              </span>
            </div>
          </div>

          <ScrollProgressBar scrollYProgress={scrollYProgress} />

          <div
            className="mobile-tier-indicator"
            style={{
              position: "absolute",
              bottom:
                "max(clamp(20px, 4vh, 32px), env(safe-area-inset-bottom, 20px))",
              left: 0,
              right: 0,
              display: "none",
              justifyContent: "center",
              gap: 8,
              zIndex: 20,
            }}
          >
            {ENVIRONMENTS.map((_, i) => (
              <div
                key={i}
                style={{
                  width: 24,
                  height: 1,
                  background:
                    activeIndex === i ? "#C9A055" : "rgba(255,255,255,0.2)",
                  transformOrigin: "left",
                  transform: `scaleX(${activeIndex === i ? 1 : 0.25})`,
                  transition: "transform 0.4s ease, background 0.4s ease",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          background: "#030303",
          padding: "clamp(24px, 4vh, 48px) clamp(16px, 4vw, 48px)",
          textAlign: "center",
          borderTop: "1px solid rgba(201,160,85,0.1)",
        }}
      >
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            color: "rgba(255,255,255,0.2)",
            fontSize: "clamp(0.62rem, 1vw, 0.7rem)",
            letterSpacing: "0.12em",
          }}
        >
          Custom partnership structures available for unique categories and
          multi-year commitments.{" "}
          <button
            onClick={() =>
              document
                .getElementById("cta")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            style={{
              background: "none",
              border: "none",
              color: "#C9A055",
              fontSize: "clamp(0.62rem, 1vw, 0.7rem)",
              letterSpacing: "0.12em",
              cursor: "pointer",
              textDecoration: "underline",
              textUnderlineOffset: 3,
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Contact us to discuss.
          </button>
        </p>
      </div>
    </section>
  );
}
