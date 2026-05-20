"use client";

import { useRef, useState, useCallback } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import BackgroundImage from "./ui/BackgroundImage";
import { ArrowRight, Mail, Building2, Globe } from "lucide-react";

const IMG_BG =
  "https://images.unsplash.com/photo-1563841930606-67e2bce48b78?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=80&w=1920";

const INTEREST_TYPES = [
  "Retail Leasing",
  "Entertainment Sponsorship",
  "Naming Rights",
  "Global Media Partnership",
  "Food & Beverage",
  "Hospitality & Hotels",
  "Technology Partnership",
  "Cultural Collaboration",
  "Investment Partnership",
  "Other",
];

const INFO_ITEMS = [
  { icon: Globe, text: "Access to 120M+ annual visitors from 86 countries" },
  {
    icon: Building2,
    text: "Flagship retail space in the world's most prestigious destination",
  },
  {
    icon: Mail,
    text: "Direct line to the highest-value consumer demographic on Earth",
  },
];

const FOOTER_LINKS = [
  "Partnerships",
  "Media Enquiries",
  "Investor Relations",
  "Press Kit",
];

export function PartnershipCTA() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-60px" });
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    message: "",
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  const toggleInterest = useCallback((interest: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(interest) ? next.delete(interest) : next.add(interest);
      return next;
    });
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  }, []);

  const setField = useCallback((key: string, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
  }, []);

  return (
    <section
      id="cta"
      ref={sectionRef}
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#030303",
        contain: "layout",
      }}
    >
      <motion.div
        style={{
          position: "absolute",
          inset: "-15%",
          opacity: 0.12,
          y: bgY,
          willChange: "transform",
        }}
      >
        <BackgroundImage
          src={IMG_BG}
          alt="partners background"
          placeholderColor="#030303"
          objectPosition="center"
        />
      </motion.div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, #030303 0%, rgba(3,3,3,0.7) 20%, rgba(3,3,3,0.7) 80%, #030303 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 30%, rgba(201,160,85,0.06) 0%, transparent 55%)",
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
            marginBottom: "clamp(40px, 7vh, 80px)",
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
              Begin Your Partnership
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
              fontSize: "clamp(2.4rem, 7vw, 7rem)",
              fontWeight: 300,
              lineHeight: 0.95,
              marginBottom: "clamp(14px, 2.5vh, 24px)",
            }}
          >
            Begin Your
            <br />
            <span style={{ color: "#C9A055", fontStyle: "italic" }}>
              Legacy
            </span>
          </h2>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              color: "rgba(255,255,255,0.38)",
              fontSize: "clamp(0.75rem, 1.1vw, 0.85rem)",
              lineHeight: 1.9,
              maxWidth: "clamp(280px, 45vw, 480px)",
              margin: "0 auto",
            }}
          >
            Join the world&apos;s most visionary brands at the destination that
            defines global commerce, culture, and entertainment.
          </p>
        </motion.div>

        <div className="cta-main-grid">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            style={{ willChange: "transform, opacity" }}
          >
            <div style={{ marginBottom: "clamp(32px, 6vh, 56px)" }}>
              <h3
                style={{
                  fontFamily: "'Cormorant Garant', serif",
                  color: "white",
                  fontSize: "clamp(1.3rem, 2.2vw, 2rem)",
                  fontWeight: 300,
                  marginBottom: "clamp(14px, 2.5vh, 20px)",
                }}
              >
                Why Partner with Pinnacle?
              </h3>
              {INFO_ITEMS.map(({ icon: Icon, text }, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: "clamp(10px, 2vw, 16px)",
                    alignItems: "flex-start",
                    marginBottom: "clamp(12px, 2.5vh, 20px)",
                    padding: "clamp(10px, 2vh, 16px) 0",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div
                    style={{
                      width: "clamp(28px, 4vw, 36px)",
                      height: "clamp(28px, 4vw, 36px)",
                      border: "1px solid rgba(201,160,85,0.3)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={14} color="#C9A055" />
                  </div>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      color: "rgba(255,255,255,0.5)",
                      fontSize: "clamp(0.72rem, 1.05vw, 0.8rem)",
                      lineHeight: 1.7,
                      paddingTop: 6,
                    }}
                  >
                    {text}
                  </p>
                </div>
              ))}
            </div>

            <div
              style={{
                padding: "clamp(20px, 3.5vh, 32px)",
                border: "1px solid rgba(201,160,85,0.2)",
                background: "rgba(201,160,85,0.03)",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  top: 16,
                  left: 22,
                  fontFamily: "'Cormorant Garant', serif",
                  color: "rgba(201,160,85,0.3)",
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  lineHeight: 1,
                }}
              >
                &ldquo;
              </div>
              <p
                style={{
                  fontFamily: "'Cormorant Garant', serif",
                  color: "rgba(255,255,255,0.65)",
                  fontSize: "clamp(0.9rem, 1.4vw, 1.1rem)",
                  fontStyle: "italic",
                  lineHeight: 1.7,
                  marginTop: "clamp(16px, 3vh, 24px)",
                  marginBottom: "clamp(12px, 2vh, 20px)",
                }}
              >
                Pinnacle Dubai is not just a venue — it is the single most
                powerful brand platform in the world today.
              </p>
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: "#C9A055",
                  fontSize: "clamp(0.52rem, 0.85vw, 0.6rem)",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                }}
              >
                — Global Brand Strategy Report, 2024
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.3 }}
            style={{ willChange: "transform, opacity" }}
          >
            {!submitted ? (
              <form onSubmit={handleSubmit}>
                <div
                  style={{
                    padding: "clamp(24px, 4vh, 40px)",
                    border: "1px solid rgba(201,160,85,0.2)",
                    background: "rgba(8,8,8,0.95)",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "'Cormorant Garant', serif",
                      color: "white",
                      fontSize: "clamp(1.2rem, 2vw, 1.6rem)",
                      fontWeight: 300,
                      marginBottom: 8,
                    }}
                  >
                    Request Partnership Deck
                  </h3>
                  <p
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      color: "rgba(255,255,255,0.3)",
                      fontSize: "clamp(0.68rem, 1vw, 0.75rem)",
                      marginBottom: "clamp(20px, 3.5vh, 32px)",
                      lineHeight: 1.6,
                    }}
                  >
                    Our partnerships team will respond within 24 hours.
                  </p>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "clamp(10px, 2vh, 16px)",
                      marginBottom: "clamp(16px, 3vh, 24px)",
                    }}
                  >
                    {[
                      {
                        key: "name",
                        label: "Full Name",
                        placeholder: "Your full name",
                      },
                      {
                        key: "company",
                        label: "Company / Brand",
                        placeholder: "Your organization",
                      },
                      {
                        key: "email",
                        label: "Email Address",
                        placeholder: "your@email.com",
                      },
                    ].map((field) => (
                      <div key={field.key}>
                        <label
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            color: "rgba(255,255,255,0.35)",
                            fontSize: "clamp(0.52rem, 0.85vw, 0.6rem)",
                            letterSpacing: "0.25em",
                            textTransform: "uppercase",
                            display: "block",
                            marginBottom: 7,
                            fontWeight: 500,
                          }}
                        >
                          {field.label}
                        </label>
                        <input
                          type={field.key === "email" ? "email" : "text"}
                          placeholder={field.placeholder}
                          value={form[field.key as keyof typeof form]}
                          onChange={(e) => setField(field.key, e.target.value)}
                          required
                          style={{
                            width: "100%",
                            background: "rgba(255,255,255,0.04)",
                            border: "1px solid rgba(255,255,255,0.1)",
                            padding: "clamp(10px, 1.8vh, 14px) 16px",
                            color: "white",
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "max(16px, 0.82rem)",
                            outline: "none",
                            transition: "border-color 0.3s",
                            boxSizing: "border-box",
                          }}
                          onFocus={(e) => {
                            e.currentTarget.style.borderColor =
                              "rgba(201,160,85,0.5)";
                          }}
                          onBlur={(e) => {
                            e.currentTarget.style.borderColor =
                              "rgba(255,255,255,0.1)";
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  <div style={{ marginBottom: "clamp(16px, 3vh, 24px)" }}>
                    <label
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        color: "rgba(255,255,255,0.35)",
                        fontSize: "clamp(0.52rem, 0.85vw, 0.6rem)",
                        letterSpacing: "0.25em",
                        textTransform: "uppercase",
                        display: "block",
                        marginBottom: 10,
                        fontWeight: 500,
                      }}
                    >
                      Area of Interest
                    </label>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "clamp(6px, 1vw, 8px)",
                      }}
                    >
                      {INTEREST_TYPES.map((interest) => {
                        const isSelected = selected.has(interest);
                        return (
                          <button
                            key={interest}
                            type="button"
                            onClick={() => toggleInterest(interest)}
                            style={{
                              padding:
                                "clamp(6px, 1.2vh, 8px) clamp(10px, 1.5vw, 14px)",
                              border: isSelected
                                ? "1px solid #C9A055"
                                : "1px solid rgba(255,255,255,0.1)",
                              background: isSelected
                                ? "rgba(201,160,85,0.12)"
                                : "transparent",
                              color: isSelected
                                ? "#C9A055"
                                : "rgba(255,255,255,0.4)",
                              fontFamily: "'Inter', sans-serif",
                              fontSize: "clamp(0.55rem, 0.85vw, 0.6rem)",
                              letterSpacing: "0.1em",
                              cursor: "pointer",
                              transition:
                                "border-color 0.3s, background 0.3s, color 0.3s",
                              minHeight: "36px",
                            }}
                          >
                            {interest}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div style={{ marginBottom: "clamp(18px, 3.5vh, 28px)" }}>
                    <label
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        color: "rgba(255,255,255,0.35)",
                        fontSize: "clamp(0.52rem, 0.85vw, 0.6rem)",
                        letterSpacing: "0.25em",
                        textTransform: "uppercase",
                        display: "block",
                        marginBottom: 7,
                        fontWeight: 500,
                      }}
                    >
                      Message (Optional)
                    </label>
                    <textarea
                      placeholder="Tell us about your vision for a partnership..."
                      value={form.message}
                      onChange={(e) => setField("message", e.target.value)}
                      rows={3}
                      style={{
                        width: "100%",
                        background: "rgba(255,255,255,0.04)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        padding: "clamp(10px, 1.8vh, 14px) 16px",
                        color: "white",
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "max(16px, 0.82rem)",
                        outline: "none",
                        resize: "none",
                        transition: "border-color 0.3s",
                        boxSizing: "border-box",
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor =
                          "rgba(201,160,85,0.5)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor =
                          "rgba(255,255,255,0.1)";
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      width: "100%",
                      padding: "clamp(14px, 2.5vh, 18px)",
                      background: "#C9A055",
                      color: "#050505",
                      border: "none",
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "clamp(0.58rem, 0.9vw, 0.65rem)",
                      letterSpacing: "0.3em",
                      textTransform: "uppercase",
                      cursor: "pointer",
                      fontWeight: 700,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 12,
                      transition: "background 0.3s",
                      minHeight: "48px",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#E8C878";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#C9A055";
                    }}
                  >
                    Request Partnership Deck <ArrowRight size={14} />
                  </button>
                </div>
              </form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                style={{
                  padding: "clamp(40px, 8vh, 72px) clamp(24px, 5vw, 48px)",
                  border: "1px solid rgba(201,160,85,0.4)",
                  background: "rgba(201,160,85,0.04)",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: 60,
                    height: 60,
                    border: "1px solid #C9A055",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto clamp(16px, 3vh, 28px)",
                  }}
                >
                  <div
                    style={{
                      width: 10,
                      height: 10,
                      background: "#C9A055",
                      borderRadius: "50%",
                    }}
                  />
                </div>
                <h3
                  style={{
                    fontFamily: "'Cormorant Garant', serif",
                    color: "white",
                    fontSize: "clamp(1.4rem, 2.5vw, 2rem)",
                    fontWeight: 300,
                    marginBottom: 12,
                  }}
                >
                  Request Received
                </h3>
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    color: "rgba(255,255,255,0.4)",
                    fontSize: "clamp(0.72rem, 1.05vw, 0.8rem)",
                    lineHeight: 1.8,
                    maxWidth: 380,
                    margin: "0 auto",
                  }}
                >
                  Our partnerships team will contact you within 24 hours with a
                  tailored presentation deck and partnership proposal.
                </p>
                <div
                  style={{
                    marginTop: "clamp(20px, 3.5vh, 32px)",
                    fontFamily: "'Inter', sans-serif",
                    color: "#C9A055",
                    fontSize: "clamp(0.52rem, 0.85vw, 0.6rem)",
                    letterSpacing: "0.3em",
                  }}
                >
                  PINNACLE DUBAI PARTNERSHIPS
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.8 }}
        style={{
          borderTop: "1px solid rgba(201,160,85,0.1)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "relative",
          zIndex: 2,
          flexWrap: "wrap",
          gap: 16,
          paddingBottom:
            "max(clamp(20px, 3vh, 36px), env(safe-area-inset-bottom, 20px))",
        }}
        className="footer-inner"
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
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
              fontSize: "clamp(0.85rem, 1.3vw, 1rem)",
              letterSpacing: "0.35em",
              fontWeight: 400,
            }}
          >
            PINNACLE
          </span>
          <span
            style={{
              color: "rgba(255,255,255,0.2)",
              fontSize: "clamp(0.48rem, 0.75vw, 0.55rem)",
              letterSpacing: "0.2em",
            }}
          >
            DUBAI
          </span>
        </div>
        <div
          style={{ display: "flex", gap: "clamp(16px, 3vw, 32px)" }}
          className="footer-links"
        >
          {FOOTER_LINKS.map((link) => (
            <span
              key={link}
              style={{
                fontFamily: "'Inter', sans-serif",
                color: "rgba(255,255,255,0.25)",
                fontSize: "clamp(0.52rem, 0.85vw, 0.6rem)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                cursor: "pointer",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#C9A055";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "rgba(255,255,255,0.25)";
              }}
            >
              {link}
            </span>
          ))}
        </div>
        <div
          style={{
            fontFamily: "'Inter', sans-serif",
            color: "rgba(255,255,255,0.15)",
            fontSize: "clamp(0.5rem, 0.8vw, 0.6rem)",
            letterSpacing: "0.1em",
          }}
        >
          © 2024 Pinnacle Dubai. All rights reserved.
        </div>
      </motion.div>
    </section>
  );
}
