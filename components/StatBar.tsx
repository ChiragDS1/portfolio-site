"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { stats, type Stat } from "@/data/resume";
import { reveal, revealStagger, scrollViewport } from "@/lib/motion";
import { CountUp } from "./CountUp";

/**
 * Reduced motion is handled with pure CSS (`motion-reduce:` variants) rather
 * than by branching on `useReducedMotion()` during render — that value differs
 * between the server and the first client paint, which produces a hydration
 * mismatch (same trap documented in PipelineFlow.tsx).
 */

/** Shared figure styling so both stat shapes sit on one baseline. */
const FIGURE = "font-display font-semibold text-accent-2";

export function StatBar() {
  return (
    <section id="stats" aria-label="Impact at a glance" className="border-y border-line bg-surface/40">
      <motion.ul
        variants={revealStagger}
        initial="hidden"
        whileInView="visible"
        viewport={scrollViewport}
        className="mx-auto grid max-w-content grid-cols-2 gap-x-2 gap-y-6 overflow-hidden px-5 py-6 sm:px-6 sm:py-8 md:grid-cols-4 md:gap-y-0"
      >
        {stats.map((stat) => (
          <motion.li
            key={stat.label}
            data-reveal
            variants={reveal}
            className="flex min-h-[5.5rem] flex-col px-2 sm:min-h-[6.25rem]"
          >
            {stat.kind === "count" ? <CountStat stat={stat} /> : <TransitionStat stat={stat} />}
            {/* `mt-auto` pins every label to the bottom of the cell, so a
                two-line figure can't knock its label out of line with the rest. */}
            <p className="mt-auto pt-1 text-xs leading-snug text-muted">{stat.label}</p>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}

function CountStat({ stat }: { stat: Extract<Stat, { kind: "count" }> }) {
  // `revealSuffix` holds the unit back until the number lands (5 … then "M+").
  // Under reduced motion CountUp fires `onDone` immediately, so this is instant.
  const [landed, setLanded] = useState(false);
  const showSuffix = !stat.revealSuffix || landed;
  const Arrow = stat.trend === "up" ? ArrowUpRight : ArrowDownRight;

  return (
    <p className={`flex items-baseline gap-1 text-[clamp(1.75rem,1.4rem+2vw,2.75rem)] ${FIGURE}`}>
      {stat.trend && (
        <Arrow
          className="h-5 w-5 shrink-0 self-center text-muted"
          aria-label={stat.trend === "up" ? "increase" : "reduction"}
        />
      )}
      <CountUp
        value={stat.value}
        minChars={String(stat.value).length}
        onDone={stat.revealSuffix ? () => setLanded(true) : undefined}
      />
      {/* The suffix keeps its box at all times (opacity, not display), so the
          reveal can never shift the row. */}
      <span
        className={`font-mono text-[0.55em] transition-opacity duration-300 motion-reduce:duration-0 motion-reduce:opacity-100 ${
          showSuffix ? "opacity-100" : "opacity-0"
        }`}
      >
        {stat.suffix}
      </span>
    </p>
  );
}

/**
 * A before/after figure: the old value strikes through, then the new one fades
 * in beside it. Both halves are always in the DOM at full size, so only opacity
 * and a scaled rule animate and the cell never reflows.
 */
function TransitionStat({ stat }: { stat: Extract<Stat, { kind: "transition" }> }) {
  const ref = useRef<HTMLDivElement>(null);
  const played = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });

  return (
    <div ref={ref}>
      <span className="sr-only">{`${stat.before} improved to ${stat.after}`}</span>

      {/* "before", struck through left-to-right once the stat scrolls in */}
      <span
        aria-hidden
        className="relative inline-block font-mono text-sm leading-none text-muted"
      >
        {stat.before}
        <span
          className={`absolute left-0 top-1/2 h-px w-full origin-left bg-muted transition-transform duration-500 motion-reduce:scale-x-100 motion-reduce:duration-0 ${
            played ? "scale-x-100" : "scale-x-0"
          }`}
        />
      </span>

      {/* "after", revealed once the strike has drawn */}
      <p
        aria-hidden
        className={`mt-1 flex items-baseline gap-1.5 text-[clamp(1.35rem,1.05rem+1.4vw,2rem)] leading-tight transition-opacity delay-500 duration-500 motion-reduce:opacity-100 motion-reduce:delay-0 motion-reduce:duration-0 ${FIGURE} ${
          played ? "opacity-100" : "opacity-0"
        }`}
      >
        <span aria-hidden className="text-base text-muted/70">
          →
        </span>
        <span className="whitespace-nowrap">{stat.after}</span>
      </p>
    </div>
  );
}
