"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Check } from "lucide-react";

const TIERS = [
  {
    id: "premier",
    name: "Premier",
    tagline: "Foundation Partnership",
    description:
      "Strategic presence across the Pinnacle ecosystem with significant brand visibility and event access.",
    price: "From $2M",
    period: "per annum",
    color: "rgba(201,160,85,0.3)",
    featured: false,
    benefits: [
      "Premium retail space allocation",
      "Branded event sponsorship (4 events)",
      "Digital presence across all platforms",
      "VIP visitor experience program",
      "Annual partnership summit access",
      "Co-branded marketing campaigns",
    ],
  },
  {
    id: "prestige",
    name: "Prestige",
    tagline: "Elevated Partnership",
    description:
      "Immersive brand integration woven into the fabric of the Pinnacle experience at every touchpoint.",
    price: "From $8M",
    period: "per annum",
    color: "#C9A055",
    featured: true,
    benefits: [
      "Flagship dedicated brand pavilion",
      "Headlining event sponsorship (12 events)",
      "Dedicated brand content series",
      "Custom experiential activations",
      "Priority retail zone positioning",
      "Executive relationship management",
      "Exclusive member brand privileges",
      "Co-created destination campaigns",
    ],
  },
  {
    id: "pinnacle",
    name: "Pinnacle",
    tagline: "Legacy Partnership",
    description:
      "The highest tier of partnership — a permanent legacy integration that shapes the identity of the destination itself.",
    price: "From $25M",
    period: "per annum",
    color: "#E8C878",
    featured: false,
    benefits: [
      "Named destination asset (building / plaza)",
      "Unlimited flagship event hosting rights",
      "Dedicated permanent brand experience center",
      "Custom architectural integration",
      "Global campaign co-ownership",
      "Board-level destination advisory seat",
      "First-right-of-refusal on all new zones",
      "Exclusive global press & PR program",
      "NFT/digital twin brand ownership rights",
    ],
  },
];

function TierCard({
  tier,
  index,
  isInView,
}: {
  tier: (typeof TIERS)[0];
  index: number;
  isInView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.9,
        delay: 0.1 + index * 0.18,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        padding: "clamp(20px, 3vw, 48px)",
        border: tier.featured
          ? `1px solid ${tier.color}`
          : `1px solid rgba(255,255,255,${hovered ? "0.14" : "0.07"})`,
        background: tier.featured
          ? `linear-gradient(135deg, rgba(201,160,85,0.08) 0%, rgba(5,5,5,0.95) 100%)`
          : hovered
            ? "rgba(255,255,255,0.03)"
            : "rgba(5,5,5,0.5)",
        transition: "all 0.5s ease",
        backdropFilter: "blur(10px)",
        cursor: "default",
        transform:
          hovered && !tier.featured ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      {tier.featured && (
        <div
          style={{
            position: "absolute",
            top: -1,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#C9A055",
            color: "#050505",
            padding: "6px 20px",
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.55rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            fontWeight: 700,
            whiteSpace: "nowrap",
          }}
        >
          Most Popular
        </div>
      )}

      <div style={{ marginBottom: 32 }}>
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            color: tier.color,
            fontSize: "0.6rem",
            letterSpacing: "0.35em",
            textTransform: "uppercase",
            marginBottom: 10,
            fontWeight: 500,
          }}
        >
          {tier.tagline}
        </div>
        <h3
          style={{
            fontFamily: "'Cormorant Garant', serif",
            color: "white",
            fontSize: "clamp(2rem, 3.5vw, 2.8rem)",
            fontWeight: 300,
            lineHeight: 1,
            letterSpacing: "0.05em",
            marginBottom: 16,
          }}
        >
          {tier.name}
        </h3>
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            color: "rgba(255,255,255,0.4)",
            fontSize: "0.78rem",
            lineHeight: 1.75,
          }}
        >
          {tier.description}
        </p>
      </div>

      <div
        style={{
          borderTop: `1px solid rgba(255,255,255,0.08)`,
          borderBottom: `1px solid rgba(255,255,255,0.08)`,
          padding: "24px 0",
          marginBottom: 32,
        }}
      >
        <span
          style={{
            fontFamily: "'Cormorant Garant', serif",
            color: tier.featured ? tier.color : "white",
            fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
            fontWeight: 300,
            lineHeight: 1,
          }}
        >
          {tier.price}
        </span>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            color: "rgba(255,255,255,0.3)",
            fontSize: "0.7rem",
            letterSpacing: "0.1em",
            marginLeft: 8,
          }}
        >
          {tier.period}
        </span>
      </div>

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: "0 0 40px 0",
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        {tier.benefits.map((benefit) => (
          <li
            key={benefit}
            style={{ display: "flex", alignItems: "flex-start", gap: 12 }}
          >
            <div
              style={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                background: tier.featured
                  ? `rgba(201,160,85,0.15)`
                  : "rgba(255,255,255,0.06)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                marginTop: 1,
              }}
            >
              <Check
                size={10}
                color={tier.featured ? "#C9A055" : "rgba(255,255,255,0.4)"}
              />
            </div>
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                color: "rgba(255,255,255,0.55)",
                fontSize: "0.76rem",
                lineHeight: 1.6,
              }}
            >
              {benefit}
            </span>
          </li>
        ))}
      </ul>

      <button
        onClick={() =>
          document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" })
        }
        style={{
          width: "100%",
          padding: "16px",
          background: tier.featured ? "#C9A055" : "transparent",
          color: tier.featured ? "#050505" : tier.color,
          border: tier.featured ? "none" : `1px solid ${tier.color}`,
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.62rem",
          letterSpacing: "0.28em",
          textTransform: "uppercase",
          cursor: "pointer",
          fontWeight: tier.featured ? 700 : 500,
          transition: "all 0.4s",
        }}
        onMouseEnter={(e) => {
          if (!tier.featured) {
            e.currentTarget.style.background = tier.color;
            e.currentTarget.style.color = "#050505";
          } else {
            e.currentTarget.style.background = "#E8C878";
          }
        }}
        onMouseLeave={(e) => {
          if (!tier.featured) {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color = tier.color;
          } else {
            e.currentTarget.style.background = "#C9A055";
          }
        }}
      >
        Enquire About {tier.name}
      </button>
    </motion.div>
  );
}

export function Sponsorship() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="sponsorship"
      ref={sectionRef}
      style={{
        background: "#050505",
        padding: "var(--sp-section)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "80%",
          height: "60%",
          background:
            "radial-gradient(ellipse, rgba(201,160,85,0.04) 0%, transparent 65%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ maxWidth: 1440, margin: "0 auto", padding: "0 24px" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          style={{ textAlign: "center", marginBottom: 80 }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 18,
              marginBottom: 24,
            }}
          >
            <div
              style={{
                width: 64,
                height: 1,
                background:
                  "linear-gradient(to right, transparent, rgba(201,160,85,0.5))",
              }}
            />
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                color: "#C9A055",
                fontSize: "0.62rem",
                letterSpacing: "0.42em",
                textTransform: "uppercase",
                fontWeight: 500,
              }}
            >
              Sponsorship Opportunities
            </span>
            <div
              style={{
                width: 64,
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
              fontSize: "clamp(2.5rem, 6.5vw, 5.5rem)",
              fontWeight: 300,
              lineHeight: 1.05,
              marginBottom: 20,
            }}
          >
            Choose Your{" "}
            <span style={{ color: "#C9A055", fontStyle: "italic" }}>
              Legacy
            </span>
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              color: "rgba(255,255,255,0.38)",
              fontSize: "0.85rem",
              lineHeight: 1.9,
              maxWidth: 560,
              margin: "0 auto",
            }}
          >
            Three tiers of transformative partnership — each designed to create
            lasting brand equity at the world's most iconic destination.
          </p>
        </motion.div>

        <div className="sponsorship-grid">
          {TIERS.map((tier, i) => (
            <TierCard key={tier.id} tier={tier} index={i} isInView={isInView} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 1 }}
          style={{ textAlign: "center", marginTop: 60 }}
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              color: "rgba(255,255,255,0.22)",
              fontSize: "0.7rem",
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
                fontSize: "0.7rem",
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
        </motion.div>
      </div>

      <style>{`
        .sponsorship-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          align-items: start;
        }
        @media (max-width: 1024px) {
          .sponsorship-grid { grid-template-columns: 1fr !important; max-width: 560px; margin: 0 auto; }
        }
        @media (min-width: 641px) and (max-width: 1024px) {
          .sponsorship-grid { grid-template-columns: repeat(2, 1fr) !important; max-width: 100% !important; }
        }
      `}</style>
    </section>
  );
}
