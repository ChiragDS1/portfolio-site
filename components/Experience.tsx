"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { experience, type ExperienceItem } from "@/data/resume";
import { reveal, revealStagger, scrollViewport } from "@/lib/motion";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

/** Bullets shown before the reader opts into the rest. */
const COLLAPSED_COUNT = 4;

export function Experience() {
  const trackRef = useRef<HTMLOListElement>(null);
  // Tied to scroll position, not a one-shot animation: the fill tracks the
  // reader's progress through the list and runs backwards when they scroll up.
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 80%", "end 60%"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  return (
    <section id="experience" aria-label="Experience" className="section-wrap py-16">
      <Reveal>
        <SectionHeading index="02">Experience</SectionHeading>
      </Reveal>

      <ol ref={trackRef} className="relative space-y-12 pl-7">
        {/* Timeline track + scroll-drawn fill. Decorative: the roles below are
            already a semantic ordered list. */}
        <span
          aria-hidden
          className="absolute left-[3px] top-1.5 h-[calc(100%-0.375rem)] w-px bg-line"
        />
        <motion.span
          aria-hidden
          data-timeline-fill
          style={{ scaleY: fill }}
          className="absolute left-[3px] top-1.5 h-[calc(100%-0.375rem)] w-px origin-top bg-accent/60"
        />

        {experience.map((job) => (
          <li key={`${job.company}-${job.period}`} className="relative">
            {/* Node dot for this role, centred on the track. */}
            <span
              aria-hidden
              className="absolute -left-7 top-1.5 h-[7px] w-[7px] rounded-full bg-accent ring-4 ring-bg"
            />
            <Role job={job} />
          </li>
        ))}
      </ol>
    </section>
  );
}

function Role({ job }: { job: ExperienceItem }) {
  const [expanded, setExpanded] = useState(false);
  // Safe to branch on here: the panel only ever exists after a click, so this
  // never affects the server-rendered or first-paint markup.
  const reduced = useReducedMotion();
  const panelId = `bullets-${job.company.replace(/\s+/g, "-").toLowerCase()}`;
  const visible = job.bullets.slice(0, COLLAPSED_COUNT);
  const hidden = job.bullets.slice(COLLAPSED_COUNT);

  return (
    <>
      <Reveal>
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <p className="mono-label">{job.period}</p>
          {job.current && (
            <span className="rounded-full border border-accent/40 bg-accent/10 px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-wide text-accent">
              Current
            </span>
          )}
        </div>
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
        {visible.map((bullet) => (
          <motion.li key={bullet} data-reveal variants={reveal}>
            <Bullet>{bullet}</Bullet>
          </motion.li>
        ))}
      </motion.ul>

      {hidden.length > 0 && (
        <>
          {/*
            Height animates 0 → auto on expand. `MotionConfig
            reducedMotion="user"` only drops transform/layout animations —
            height is an ordinary value and would still animate — so the
            duration is explicitly zeroed for reduced motion. The panel sits in
            DOM order right after the visible bullets, so focus order is correct.
          */}
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                id={panelId}
                key="more"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={reduced ? { duration: 0 } : { duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden motion-reduce:transition-none"
              >
                <ul className="mt-3 space-y-3">
                  {hidden.map((bullet) => (
                    <li key={bullet}>
                      <Bullet>{bullet}</Bullet>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            aria-controls={panelId}
            className="mt-4 inline-flex min-h-11 items-center gap-1.5 rounded-md text-sm text-muted transition-colors hover:text-accent"
            style={{ touchAction: "manipulation" }}
          >
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 motion-reduce:transition-none ${
                expanded ? "rotate-180" : ""
              }`}
              aria-hidden
            />
            {expanded ? "Show less" : `Show ${hidden.length} more`}
            <span className="sr-only"> for {job.title} at {job.company}</span>
          </button>
        </>
      )}
    </>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 text-[0.95rem] leading-relaxed text-text/90">
      <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70" />
      <span>{children}</span>
    </div>
  );
}
