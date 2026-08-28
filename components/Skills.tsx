"use client";

import { motion } from "framer-motion";
import { skillGroups } from "@/data/resume";
import { reveal, revealStagger, scrollViewport } from "@/lib/motion";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function Skills() {
  return (
    <section id="skills" aria-label="Skills" className="section-wrap py-16">
      <Reveal>
        <SectionHeading index="04">Skills</SectionHeading>
      </Reveal>

      <motion.div
        variants={revealStagger}
        initial="hidden"
        whileInView="visible"
        viewport={scrollViewport}
        className="grid gap-4"
      >
        {skillGroups.map((group) => (
          <motion.div key={group.id} data-reveal variants={reveal} className="panel p-5">
            <h3 className="mb-3 font-display text-base font-semibold text-text">
              {group.title}
            </h3>
            <ul className="flex flex-wrap gap-1.5">
              {group.items.map((item) => (
                <li key={item} className="pill">
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
