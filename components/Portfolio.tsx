"use client";

import { useState } from "react";
import { MotionConfig } from "framer-motion";
import { experience, worlds } from "@/data/resume";
import { Loader } from "./Loader";
import { TopBar } from "./TopBar";
import { MenuOverlay } from "./MenuOverlay";
import { WorldSwitcher } from "./WorldSwitcher";
import { WorldProvider, useWorld } from "./worlds/WorldContext";
import { WorldBackdrop } from "./worlds/WorldBackdrop";
import { WorldSection } from "./worlds/WorldSection";
import { HomeWorld } from "./worlds/HomeWorld";
import { AboutWorld } from "./worlds/AboutWorld";
import { JobWorld } from "./worlds/JobWorld";
import { FinanceScene, HealthScene } from "./worlds/scenes";
import { ProjectsWorld } from "./worlds/ProjectsWorld";

/**
 * `reducedMotion="user"` makes every Framer animation here honour
 * `prefers-reduced-motion` without each component asking.
 */
export function Portfolio() {
  return (
    <MotionConfig reducedMotion="user">
      <WorldProvider>
        <Loader />
        <Shell />
      </WorldProvider>
    </MotionConfig>
  );
}

function Shell() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { active, goTo } = useWorld();

  const [home, about, boaWorld, accWorld, projectsWorld] = worlds;
  const boa = experience.find((e) => e.world === "experience-bank-of-america");
  const acc = experience.find((e) => e.world === "experience-accenture");

  return (
    <>
      <WorldBackdrop />
      <TopBar onOpenMenu={() => setMenuOpen(true)} />

      <main id="main">
        <WorldSection world={home} headingId="home-heading">
          <HomeWorld headingId="home-heading" />
        </WorldSection>

        <WorldSection world={about} headingId="about-heading">
          <AboutWorld headingId="about-heading" />
        </WorldSection>

        {boa && (
          <WorldSection world={boaWorld} headingId="boa-heading" scene={<FinanceScene />}>
            <JobWorld job={boa} headingId="boa-heading" />
          </WorldSection>
        )}

        {acc && (
          <WorldSection world={accWorld} headingId="acc-heading" scene={<HealthScene />}>
            <JobWorld job={acc} headingId="acc-heading" />
          </WorldSection>
        )}

        <WorldSection world={projectsWorld} headingId="projects-heading">
          <ProjectsWorld headingId="projects-heading" />
        </WorldSection>
      </main>

      <WorldSwitcher />
      <MenuOverlay
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        onGo={goTo}
        world={active}
      />
    </>
  );
}
