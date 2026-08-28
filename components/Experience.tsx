"use client";

import { motion } from "framer-motion";
import { experience } from "@/data/resume";
import { reveal, revealStagger, scrollViewport } from "@/lib/motion";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function Experience() {
  return (
    <section id="experience" aria-label="Experience" className="section-wrap py-16">
      <Reveal>
        <SectionHeading index="02">Experience</SectionHeading>
      </Reveal>

      <ol className="space-y-12">
        {experience.map((job) => (
          <li key={job.company}>
            <Reveal>
              <p className="mono-label">{job.period}</p>
              <h3 className="mt-1.5 font-display text-lg font-semibold text-text">
                <span className="text-accent">{job.title}</span>
                <span className="text-muted"> · {job.company}</span>
              </h3>
              <p className="mt-1 text-sm text-muted">
                {job.location} — {job.project}
              </p>
            </Reveal>

            <motion.ul
              variants={revealStagger}
              initial="hidden"
              whileInView="visible"
              viewport={scrollViewport}
              className="mt-4 space-y-3"
            >
              {job.bullets.map((bullet) => (
                <motion.li
                  key={bullet}
                  data-reveal
                  variants={reveal}
                  className="flex gap-3 text-[0.95rem] leading-relaxed text-text/90"
                >
                  <span
                    aria-hidden
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70"
                  />
                  <span>{bullet}</span>
                </motion.li>
              ))}
            </motion.ul>
          </li>
        ))}
      </ol>
    </section>
  );
}
