"use client";

import { MotionConfig } from "framer-motion";
import { Nav } from "./Nav";
import { Hero } from "./Hero";
import { StatBar } from "./StatBar";
import { CoreTech } from "./CoreTech";
import { About } from "./About";
import { Experience } from "./Experience";
import { Projects } from "./Projects";
import { Skills } from "./Skills";
import { Education } from "./Education";
import { Contact } from "./Contact";
import { Footer } from "./Footer";

/**
 * `<MotionConfig reducedMotion="user">` makes every Framer Motion animation below
 * honor `prefers-reduced-motion` automatically (transforms, opacity, layout).
 */
export function Portfolio() {
  return (
    <MotionConfig reducedMotion="user">
      <Nav />
      <main id="main">
        <Hero />
        <StatBar />
        <CoreTech />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </MotionConfig>
  );
}
