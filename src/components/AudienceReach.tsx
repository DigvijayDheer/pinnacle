"use client";

import { useRef, useEffect, useState, memo } from "react";
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

const REGIONS = [
  { label: "Asia Pacific", percent: 34, visitors: "40.8M", color: "#C9A055" },
  {
    label: "Middle East & Africa",
    percent: 28,
    visitors: "33.6M",
    color: "#E8C878",
  },
  {
    label: "Europe",
    percent: 20,
    visitors: "24M",
    color: "rgba(201,160,85,0.7)",
  },
  {
    label: "Americas",
    percent: 12,
    visitors: "14.4M",
    color: "rgba(201,160,85,0.5)",
  },
  {
    label: "Other Regions",
    percent: 6,
    visitors: "7.2M",
    color: "rgba(201,160,85,0.3)",
  },
];

const CITY_DOTS = [
  { label: "Dubai", cx: 56.5, cy: 47.5, primary: true },
  { label: "London", cx: 48.5, cy: 31, primary: false },
  { label: "New York", cx: 22, cy: 36, primary: false },
  { label: "Tokyo", cx: 79, cy: 38, primary: false },
  { label: "Singapore", cx: 74, cy: 55, primary: false },
  { label: "Sydney", cx: 80, cy: 68, primary: false },
  { label: "Paris", cx: 49, cy: 33, primary: false },
  { label: "Mumbai", cx: 65, cy: 48, primary: false },
  { label: "Los Angeles", cx: 14, cy: 40, primary: false },
  { label: "São Paulo", cx: 30, cy: 64, primary: false },
  { label: "Moscow", cx: 55, cy: 28, primary: false },
  { label: "Riyadh", cx: 58, cy: 46, primary: false },
  { label: "Beijing", cx: 75, cy: 34, primary: false },
  { label: "Lagos", cx: 48, cy: 54, primary: false },
  { label: "Toronto", cx: 20, cy: 33, primary: false },
];

const GlobeVisualization = memo(function GlobeVisualization({
  active,
}: {
  active: boolean;
}) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "clamp(280px, 50vw, 560px)",
        aspectRatio: "1.6 / 1",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "80%",
          height: "80%",
          background:
            "radial-gradient(ellipse, rgba(201,160,85,0.08) 0%, transparent 70%)",
          borderRadius: "50%",
        }}
      />

      <svg
        viewBox="0 0 100 62.5"
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          zIndex: 2,
        }}
      >
        {[20, 35, 50, 65].map((y) => (
          <line
            key={y}
            x1="0"
            y1={y}
            x2="100"
            y2={y}
            stroke="rgba(201,160,85,0.08)"
            strokeWidth="0.3"
          />
        ))}
        {[20, 35, 50, 65, 80].map((x) => (
          <line
            key={x}
            x1={x}
            y1="0"
            x2={x}
            y2="62.5"
            stroke="rgba(201,160,85,0.08)"
            strokeWidth="0.3"
          />
        ))}

        {active &&
          CITY_DOTS.filter((d) => !d.primary).map((city, i) => {
            const dubai = CITY_DOTS[0];
            return (
              <motion.line
                key={city.label}
                x1={dubai.cx}
                y1={dubai.cy}
                x2={city.cx}
                y2={city.cy}
                stroke="rgba(201,160,85,0.2)"
                strokeWidth="0.3"
                strokeDasharray="0.8 1.5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.5 + i * 0.07 }}
              />
            );
          })}

        {CITY_DOTS.map((city, i) => (
          <g
            key={city.label}
            style={{
              opacity: active ? 1 : 0,
              transform: active ? "scale(1)" : "scale(0)",
              transformOrigin: `${city.cx}px ${city.cy}px`,
              transition: `opacity 0.5s ease ${0.3 + i * 0.05}s, transform 0.5s ease ${0.3 + i * 0.05}s`,
            }}
          >
            {city.primary ? (
              <>
                <motion.circle
                  cx={city.cx}
                  cy={city.cy}
                  r={2}
                  fill="none"
                  stroke="#C9A055"
                  strokeWidth="0.4"
                  animate={{ r: [2, 5, 2], opacity: [0.8, 0, 0.8] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.circle
                  cx={city.cx}
                  cy={city.cy}
                  r={3.5}
                  fill="none"
                  stroke="#C9A055"
                  strokeWidth="0.25"
                  animate={{ r: [3.5, 7, 3.5], opacity: [0.4, 0, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                />
                <circle cx={city.cx} cy={city.cy} r={1.2} fill="#C9A055" />
                <circle cx={city.cx} cy={city.cy} r={0.6} fill="#E8C878" />
              </>
            ) : (
              <>
                <circle
                  cx={city.cx}
                  cy={city.cy}
                  r={0.8}
                  fill="rgba(201,160,85,0.55)"
                />
                <circle cx={city.cx} cy={city.cy} r={0.4} fill="#C9A055" />
              </>
            )}
          </g>
        ))}

        {active && (
          <motion.text
            x={CITY_DOTS[0].cx + 2}
            y={CITY_DOTS[0].cy - 1.5}
            fill="#C9A055"
            fontSize="1.8"
            fontFamily="Inter, sans-serif"
            letterSpacing="0.3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            DUBAI
          </motion.text>
        )}
      </svg>

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 60%, rgba(5,5,5,0.8) 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
});

const RegionBar = memo(function RegionBar({
  region,
  index,
  active,
}: {
  region: (typeof REGIONS)[0];
  index: number;
  active: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={active ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.4 + index * 0.12 }}
      style={{
        marginBottom: "clamp(12px, 2.5vh, 20px)",
        willChange: "transform, opacity",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: "clamp(4px, 1vh, 8px)",
        }}
      >
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            color: "rgba(255,255,255,0.6)",
            fontSize: "clamp(0.62rem, 1vw, 0.72rem)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          {region.label}
        </span>
        <div
          style={{
            display: "flex",
            gap: "clamp(6px, 1.5vw, 12px)",
            alignItems: "baseline",
          }}
        >
          <span
            style={{
              fontFamily: "'Cormorant Garant', serif",
              color: "white",
              fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)",
              fontWeight: 400,
            }}
          >
            {region.visitors}
          </span>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              color: region.color,
              fontSize: "clamp(0.6rem, 0.95vw, 0.68rem)",
            }}
          >
            {region.percent}%
          </span>
        </div>
      </div>
      <div
        style={{
          height: 2,
          background: "rgba(255,255,255,0.07)",
          borderRadius: 1,
          overflow: "hidden",
        }}
      >
        <motion.div
          style={{
            height: "100%",
            background: `linear-gradient(to right, ${region.color}, transparent)`,
            borderRadius: 1,
            willChange: "width",
          }}
          initial={{ width: 0 }}
          animate={active ? { width: `${region.percent}%` } : { width: 0 }}
          transition={{
            duration: 1.2,
            delay: 0.6 + index * 0.12,
            ease: "easeOut",
          }}
        />
      </div>
    </motion.div>
  );
});

export function AudienceReach() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const totalVisitors = useCountUp(120, 2.5, isInView);
  const countries = useCountUp(86, 2, isInView);

  return (
    <section
      id="reach"
      ref={sectionRef}
      style={{
        background: "#070707",
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
          width: "90%",
          height: "80%",
          background:
            "radial-gradient(ellipse at 40% 50%, rgba(201,160,85,0.05) 0%, transparent 60%)",
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
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
          style={{
            textAlign: "center",
            marginBottom: "clamp(40px, calc(var(--vh, 1vh) * 7), 80px)",
            willChange: "transform, opacity",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "clamp(10px, 2vw, 18px)",
              marginBottom: "clamp(14px, calc(var(--vh, 1vh) * 2.5), 24px)",
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
              Global Reach
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
            <span style={{ color: "#C9A055" }}>
              {isInView ? totalVisitors : 0}M+
            </span>{" "}
            Visitors Annually
            <br />
            <span style={{ fontStyle: "italic" }}>
              From Every Corner of Earth
            </span>
          </h2>
        </motion.div>

        <div className="reach-grid">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3 }}
            style={{ willChange: "transform, opacity" }}
          >
            <GlobeVisualization active={isInView} />

            <div
              style={{
                display: "flex",
                gap: 4,
                marginTop: "clamp(14px, calc(var(--vh, 1vh) * 2.5), 24px)",
              }}
            >
              {[
                { val: isInView ? countries : 0, label: "Countries" },
                { val: 6, label: "Continents" },
                { val: "$4.8T", label: "Visitor Spending" },
              ].map(({ val, label }) => (
                <div
                  key={label}
                  style={{
                    flex: 1,
                    padding:
                      "clamp(14px, calc(var(--vh, 1vh) * 2.5), 24px) clamp(8px, 1.5vw, 16px)",
                    border: "1px solid rgba(201,160,85,0.2)",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Cormorant Garant', serif",
                      color: "#C9A055",
                      fontSize: "clamp(1.4rem, 3vw, 2.5rem)",
                      fontWeight: 300,
                      lineHeight: 1,
                    }}
                  >
                    {val}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      color: "rgba(255,255,255,0.4)",
                      fontSize: "clamp(0.48rem, 0.8vw, 0.6rem)",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      marginTop: "clamp(4px, calc(var(--vh, 1vh) * 1), 8px)",
                    }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{
                marginBottom: "clamp(24px, calc(var(--vh, 1vh) * 4), 40px)",
              }}
            >
              <h3
                style={{
                  fontFamily: "'Cormorant Garant', serif",
                  color: "white",
                  fontSize: "clamp(1.3rem, 2.5vw, 2.2rem)",
                  fontWeight: 300,
                  marginBottom: "clamp(8px, 1.5vh, 12px)",
                }}
              >
                Visitor Origins
              </h3>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: "rgba(255,255,255,0.38)",
                  fontSize: "clamp(0.72rem, 1.05vw, 0.8rem)",
                  lineHeight: 1.8,
                }}
              >
                Pinnacle Dubai draws a uniquely global audience — the ideal
                platform for brands seeking maximum international exposure.
              </p>
            </motion.div>

            {REGIONS.map((r, i) => (
              <RegionBar key={r.label} region={r} index={i} active={isInView} />
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 1.2 }}
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "clamp(6px, 1.2vw, 10px)",
                marginTop: "clamp(20px, calc(var(--vh, 1vh) * 4), 36px)",
              }}
            >
              {[
                "72% High Net Worth",
                "Avg. Age 32–45",
                "$1,850 Avg. Spend/Visit",
                "3.4 Day Avg. Stay",
              ].map((tag) => (
                <div
                  key={tag}
                  style={{
                    padding:
                      "clamp(6px, calc(var(--vh, 1vh) * 1.2), 8px) clamp(10px, 1.8vw, 16px)",
                    border: "1px solid rgba(201,160,85,0.2)",
                    fontFamily: "'Inter', sans-serif",
                    color: "rgba(255,255,255,0.5)",
                    fontSize: "clamp(0.55rem, 0.85vw, 0.65rem)",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                  }}
                >
                  {tag}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
