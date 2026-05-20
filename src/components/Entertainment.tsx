"use client";

import { useRef, useState, useCallback, memo } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import BackgroundImage from "./ui/BackgroundImage";

const IMG_CONCERT =
  "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1920";
const IMG_CONCERT2 =
  "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1920";
const IMG_CROWD =
  "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1920";
const IMG_FASHION =
  "https://images.unsplash.com/photo-1606132653399-36248f2e2a99?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1200";
const IMG_MALL =
  "https://images.unsplash.com/photo-1533481405265-e9ce0c044abb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1200";
const IMG_STAGE =
  "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1200";

const TILES = [
  {
    id: 1,
    category: "Live Events",
    title: "World-Class Performances",
    desc: "A-list global artists, sold-out premieres, and exclusive concerts in state-of-the-art venues",
    img: IMG_CONCERT,
    stat: "150+ Events / Year",
  },
  {
    id: 2,
    category: "Fine Dining",
    title: "Culinary Excellence",
    desc: "18 Michelin-starred restaurants spanning every continent's finest cuisine",
    img: IMG_MALL,
    stat: "18 Michelin Stars",
  },
  {
    id: 3,
    category: "Immersive Tech",
    title: "Beyond Reality",
    desc: "VR, AR, and spatial computing at unprecedented scale",
    img: IMG_CROWD,
    stat: "8 Immersive Zones",
  },
  {
    id: 4,
    category: "High Fashion",
    title: "Haute Couture",
    desc: "Exclusive brand activations, runway events, and VIP private shopping",
    img: IMG_FASHION,
    stat: "200+ Luxury Brands",
  },
  {
    id: 5,
    category: "Entertainment",
    title: "Spectacular Shows",
    desc: "Broadway-caliber productions and globally acclaimed residency performances",
    img: IMG_STAGE,
    stat: "12 Resident Shows",
  },
  {
    id: 6,
    category: "Cultural Arts",
    title: "Global Artistry",
    desc: "Permanent and rotating exhibitions from the world's most celebrated artists",
    img: IMG_CONCERT2,
    stat: "40+ Installations",
  },
];

const MediaTile = memo(function MediaTile({
  tile,
  index,
  isInView,
  isHovered,
  isAnyHovered,
  onMouseEnter,
  onMouseLeave,
}: {
  tile: (typeof TILES)[0];
  index: number;
  isInView: boolean;
  isHovered: boolean;
  isAnyHovered: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.97 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 1,
        delay: 0.06 + index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="media-tile"
      style={{
        position: "relative",
        overflow: "hidden",
        cursor: "pointer",
        flexGrow: isHovered ? 2 : isAnyHovered ? 0.6 : 1,
        flexShrink: 1,
        flexBasis: 0,
        transition: "flex-grow 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        minWidth: 0,
        willChange: "transform, opacity",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          transform: isHovered ? "scale(1.06)" : "scale(1)",
          transition: "transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
          willChange: "transform",
        }}
      >
        <BackgroundImage
          src={tile.img}
          alt={tile.title}
          placeholderColor="#050505"
        />
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background: isHovered
            ? "linear-gradient(to top, rgba(3,3,3,0.97) 0%, rgba(3,3,3,0.45) 55%, rgba(3,3,3,0.08) 100%)"
            : "linear-gradient(to top, rgba(3,3,3,0.85) 0%, rgba(3,3,3,0.2) 55%, rgba(3,3,3,0.06) 100%)",
          transition: "background 0.6s ease",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 80%, rgba(201,160,85,0.08) 0%, transparent 60%)",
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          border: isHovered
            ? "1px solid rgba(201,160,85,0.45)"
            : "1px solid transparent",
          transition: "border-color 0.5s ease",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      <div style={{ position: "absolute", top: 24, left: 24, zIndex: 3 }}>
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            color: "#C9A055",
            fontSize: "0.54rem",
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            fontWeight: 500,
            background: "rgba(3,3,3,0.5)",
            padding: "5px 10px",
            backdropFilter: "blur(8px)",
          }}
        >
          {tile.category}
        </span>
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "0 28px 28px",
          zIndex: 3,
        }}
      >
        <h3
          style={{
            fontFamily: "'Cormorant Garant', serif",
            color: "white",
            fontSize: "clamp(1.2rem, 2.5vw, 1.75rem)",
            fontWeight: 400,
            lineHeight: 1.15,
            marginBottom: 10,
            transform: isHovered ? "translateY(-4px)" : "translateY(0)",
            transition: "transform 0.4s ease",
            willChange: "transform",
          }}
        >
          {tile.title}
        </h3>

        <div
          style={{
            maxHeight: isHovered ? 100 : 0,
            overflow: "hidden",
            opacity: isHovered ? 1 : 0,
            transition: "max-height 0.5s ease, opacity 0.4s ease",
          }}
        >
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              color: "rgba(255,255,255,0.58)",
              fontSize: "0.76rem",
              lineHeight: 1.75,
              marginBottom: 12,
            }}
          >
            {tile.desc}
          </p>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              border: "1px solid rgba(201,160,85,0.4)",
              padding: "6px 14px",
            }}
          >
            <div
              style={{
                width: 4,
                height: 4,
                background: "#C9A055",
                borderRadius: "50%",
                animation: "glow-pulse 2s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                color: "#C9A055",
                fontSize: "0.56rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}
            >
              {tile.stat}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

function TileRow({
  tiles,
  startIndex,
  isInView,
  hoveredId,
  onHover,
}: {
  tiles: typeof TILES;
  startIndex: number;
  isInView: boolean;
  hoveredId: number | null;
  onHover: (id: number | null) => void;
}) {
  const isAnyHovered =
    hoveredId !== null && tiles.some((t) => t.id === hoveredId);
  return (
    <div style={{ display: "flex", gap: 4, height: 420 }}>
      {tiles.map((tile, i) => (
        <MediaTile
          key={tile.id}
          tile={tile}
          index={startIndex + i}
          isInView={isInView}
          isHovered={hoveredId === tile.id}
          isAnyHovered={isAnyHovered}
          onMouseEnter={() => onHover(tile.id)}
          onMouseLeave={() => onHover(null)}
        />
      ))}
    </div>
  );
}

export function Entertainment() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const handleHover = useCallback((id: number | null) => setHoveredId(id), []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const headerY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  return (
    <section
      id="entertainment"
      ref={sectionRef}
      style={{
        background: "#050505",
        padding: "140px 0 120px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(rgba(201,160,85,0.025) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          pointerEvents: "none",
          animation: "haze-drift 12s ease-in-out infinite",
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "30%",
          background: "linear-gradient(to top, rgba(5,5,5,0.8), transparent)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      <div
        style={{
          maxWidth: 1440,
          margin: "0 auto",
          padding: "0 24px",
          position: "relative",
          zIndex: 3,
        }}
      >
        <motion.div style={{ y: headerY, willChange: "transform" }}>
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9 }}
            style={{ marginBottom: 80, willChange: "transform, opacity" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                marginBottom: 24,
              }}
            >
              <div style={{ width: 48, height: 1, background: "#C9A055" }} />
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
                Entertainment Ecosystem
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                gap: 40,
                flexWrap: "wrap",
              }}
            >
              <div style={{ overflow: "hidden" }}>
                <motion.h2
                  initial={{ y: "100%" }}
                  animate={isInView ? { y: "0%" } : {}}
                  transition={{
                    duration: 1.2,
                    ease: [0.16, 1, 0.3, 1],
                    delay: 0.1,
                  }}
                  style={{
                    fontFamily: "'Cormorant Garant', serif",
                    fontSize: "clamp(2.8rem, 7vw, 6rem)",
                    fontWeight: 300,
                    color: "white",
                    lineHeight: 1.0,
                    maxWidth: 700,
                    willChange: "transform",
                  }}
                >
                  Six Worlds of{" "}
                  <em style={{ color: "#C9A055" }}>Extraordinary</em>
                  <br />
                  Experience
                </motion.h2>
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ duration: 1, delay: 0.6 }}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: "rgba(255,255,255,0.35)",
                  fontSize: "0.82rem",
                  lineHeight: 1.9,
                  maxWidth: 340,
                  flexShrink: 0,
                }}
                className="ent-subtitle"
              >
                Every imaginable category of entertainment and lifestyle —
                curated at a scale the world has never witnessed before.
              </motion.p>
            </div>
          </motion.div>
        </motion.div>

        <div
          style={{ display: "flex", flexDirection: "column", gap: 4 }}
          className="entertainment-grid"
        >
          <TileRow
            tiles={TILES.slice(0, 3)}
            startIndex={0}
            isInView={isInView}
            hoveredId={hoveredId}
            onHover={handleHover}
          />
          <TileRow
            tiles={TILES.slice(3, 6)}
            startIndex={3}
            isInView={isInView}
            hoveredId={hoveredId}
            onHover={handleHover}
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 48,
            padding: "28px 0",
            borderTop: "1px solid rgba(201,160,85,0.1)",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          {[
            "150+ Annual Events",
            "18 Michelin Stars",
            "8 Immersive Zones",
            "200+ Global Brands",
          ].map((stat, i) => (
            <div
              key={i}
              style={{ display: "flex", alignItems: "center", gap: 10 }}
            >
              <div
                style={{
                  width: 4,
                  height: 4,
                  background: "#C9A055",
                  borderRadius: "50%",
                  animation: "glow-pulse 3s ease-in-out infinite",
                  animationDelay: `${i * 0.5}s`,
                }}
              />
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: "rgba(255,255,255,0.35)",
                  fontSize: "0.68rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                }}
              >
                {stat}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          .entertainment-grid > div { flex-wrap: wrap; height: auto !important; }
          .entertainment-grid .media-tile { flex: 1 1 calc(50% - 2px) !important; min-height: 280px; }
        }
        @media (max-width: 640px) {
          .entertainment-grid .media-tile { flex: 1 1 100% !important; min-height: 250px; }
          .ent-subtitle { display: none !important; }
        }
      `}</style>
    </section>
  );
}
