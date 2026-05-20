"use client";

import { useState, useEffect, useCallback, memo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Menu } from "lucide-react";

const navLinks = [
  ["Experience", "experience"],
  ["Entertainment", "entertainment"],
  ["Global Reach", "reach"],
  ["Sponsorship", "sponsorship"],
  ["Vision", "vision"],
] as const;

const NavLink = memo(function NavLink({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "none",
        border: "none",
        color: "rgba(255,255,255,0.5)",
        fontSize: "0.62rem",
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        cursor: "pointer",
        transition: "color 0.3s",
        fontFamily: "'Inter', sans-serif",
        padding: "4px 0",
        position: "relative",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "#C9A055";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "rgba(255,255,255,0.5)";
      }}
    >
      {label}
    </button>
  );
});

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handle = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 60);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handle, { passive: true });
    return () => window.removeEventListener("scroll", handle);
  }, []);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, delay: 2.5, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "clamp(12px, 2vh, 22px) var(--gutter)",
          transition:
            "background 0.6s ease, backdrop-filter 0.6s ease, border-bottom 0.6s ease",
          background: scrolled ? "rgba(5,5,5,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          borderBottom: scrolled
            ? "1px solid rgba(201,160,85,0.15)"
            : "1px solid transparent",
          willChange: "transform, opacity",
        }}
        className="nav-container"
      >
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              <div style={{ width: 20, height: 1, background: "#C9A055" }} />
              <div
                style={{
                  width: 12,
                  height: 1,
                  background: "rgba(201,160,85,0.5)",
                }}
              />
            </div>
            <span
              style={{
                fontFamily: "'Cormorant Garant', serif",
                color: "#E8C878",
                fontSize: "1.1rem",
                letterSpacing: "0.35em",
                fontWeight: 400,
                textTransform: "uppercase",
              }}
            >
              Pinnacle
            </span>
          </div>
          <span
            style={{
              color: "rgba(255,255,255,0.25)",
              fontSize: "0.55rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              alignSelf: "flex-end",
              marginBottom: 1,
            }}
          >
            Dubai
          </span>
        </button>

        <div
          style={{ display: "flex", alignItems: "center", gap: 36 }}
          className="desktop-nav"
        >
          {navLinks.map(([label, id]) => (
            <NavLink key={id} label={label} onClick={() => scrollTo(id)} />
          ))}
        </div>

        <div
          style={{ display: "flex", alignItems: "center", gap: 20 }}
          className="desktop-nav"
        >
          <button
            onClick={() => scrollTo("cta")}
            style={{
              border: "1px solid rgba(201,160,85,0.7)",
              color: "#C9A055",
              background: "transparent",
              padding: "11px 28px",
              fontSize: "0.6rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              cursor: "pointer",
              transition: "background 0.4s ease, color 0.4s ease",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#C9A055";
              e.currentTarget.style.color = "#050505";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "#C9A055";
            }}
          >
            Partner With Us
          </button>
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="mobile-menu-btn"
          style={{
            background: "none",
            border: "none",
            color: "#C9A055",
            cursor: "pointer",
            padding: 4,
          }}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </motion.nav>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 89,
                background: "rgba(5,5,5,0.98)",
                backdropFilter: "blur(32px)",
                WebkitBackdropFilter: "blur(32px)",
              }}
            />
            <motion.div
              initial={{ opacity: 0, clipPath: "circle(0% at 95% 3%)" }}
              animate={{ opacity: 1, clipPath: "circle(160% at 95% 3%)" }}
              exit={{ opacity: 0, clipPath: "circle(0% at 95% 3%)" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 90,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                willChange: "clip-path, opacity",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 40,
                }}
              >
                {[...navLinks, ["Partner With Us", "cta"] as const].map(
                  ([label, id], i) => (
                    <motion.button
                      key={id}
                      onClick={() => scrollTo(id)}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.08 + i * 0.08,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      style={{
                        fontFamily: "'Cormorant Garant', serif",
                        color:
                          id === "cta" ? "#C9A055" : "rgba(255,255,255,0.85)",
                        fontSize: "clamp(1.8rem, 8vw, 3rem)",
                        letterSpacing: "0.12em",
                        fontWeight: 300,
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        textTransform: "uppercase",
                        transition: "color 0.3s",
                        willChange: "transform, opacity",
                      }}
                      onMouseEnter={(e) => {
                        if (id !== "cta")
                          e.currentTarget.style.color = "#C9A055";
                      }}
                      onMouseLeave={(e) => {
                        if (id !== "cta")
                          e.currentTarget.style.color =
                            "rgba(255,255,255,0.85)";
                      }}
                    >
                      {label}
                    </motion.button>
                  ),
                )}
              </div>
              <div
                style={{
                  position: "absolute",
                  bottom: 48,
                  color: "rgba(255,255,255,0.2)",
                  fontSize: "0.6rem",
                  letterSpacing: "0.3em",
                }}
              >
                PINNACLE DUBAI · EST. 2024
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .nav-container { padding: 18px 24px !important; }
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu-btn { display: none !important; }
        }
      `}</style>
    </>
  );
}
