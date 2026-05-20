"use client";

import { useState, memo } from "react";
import { CinematicPreloader } from "./CinematicPreloader";
import { GrainOverlay } from "./GrainOverlay";
import { Navigation } from "./Navigation";
import { Hero } from "./Hero";
import { SceneTransition } from "./SceneTransition";
import { ScaleReveal } from "./ScaleReveal";
import { LuxuryExperience } from "./LuxuryExperience";
import { Entertainment } from "./Entertainment";
import { AudienceReach } from "./AudienceReach";
import { SponsorshipWorld } from "./SponsorshipWorld";
import { FutureVision } from "./FutureVision";
import { PartnershipCTA } from "./PartnershipCTA";
import { motion, AnimatePresence } from "motion/react";

const MainExperience = memo(function MainExperience() {
  return (
    <motion.div
      key="main"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
      style={{ background: "#020202", minHeight: "calc(var(--vh, 1vh) * 100)" }}
    >
      <Navigation />
      <main>
        <Hero />
        <SceneTransition phrase="Scale" type="sweep" />
        <ScaleReveal />
        <SceneTransition phrase="Unrivaled in every dimension" type="light" />
        <LuxuryExperience />
        <SceneTransition
          phrase="Entertainment · Culture · Commerce"
          type="architecture"
        />
        <Entertainment />
        <SceneTransition
          phrase="86 Countries · 6 Continents · 120M Visitors"
          type="blackout"
        />
        <AudienceReach />
        <SceneTransition phrase="Legacy" type="sweep" />
        <SponsorshipWorld />
        <SceneTransition phrase="The vision of a generation" type="light" />
        <FutureVision />
        <SceneTransition phrase="Begin Your Legacy" type="blackout" />
        <PartnershipCTA />
      </main>
    </motion.div>
  );
});

export function PinnacleApp() {
  const [preloadDone, setPreloadDone] = useState(false);

  return (
    <>
      <div
        data-scroll-lock={preloadDone ? undefined : "true"}
        style={{ display: "contents" }}
      />
      <style>{`[data-scroll-lock="true"] ~ * { overflow-y: hidden !important; } body { overflow-y: ${preloadDone ? "auto" : "hidden"}; }`}</style>

      <CinematicPreloader onComplete={() => setPreloadDone(true)} />

      <GrainOverlay />

      <AnimatePresence>{preloadDone && <MainExperience />}</AnimatePresence>
    </>
  );
}
