"use client";

import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { stats } from "@/data/resume";
import { reveal, revealStagger, scrollViewport } from "@/lib/motion";
import { CountUp } from "./CountUp";

export function StatBar() {
  return (
    <section id="stats" aria-label="Impact at a glance" className="border-y border-line bg-surface/40">
      <motion.ul
        variants={revealStagger}
        initial="hidden"
        whileInView="visible"
        viewport={scrollViewport}
        className="mx-auto grid max-w-content grid-cols-2 gap-px overflow-hidden px-5 py-6 sm:px-6 sm:py-8 md:grid-cols-4"
      >
        {stats.map((stat) => {
          const Arrow = stat.trend === "up" ? ArrowUpRight : ArrowDownRight;
          return (
            <motion.li key={stat.label} data-reveal variants={reveal} className="px-2">
              <p className="flex items-baseline gap-1 font-display text-[clamp(1.75rem,1.4rem+2vw,2.75rem)] font-semibold text-accent-2">
                <Arrow
                  className="h-5 w-5 shrink-0 self-center text-muted"
                  aria-label={stat.trend === "up" ? "increase" : "reduction"}
                />
                <CountUp value={stat.value} />
                <span className="font-mono text-[0.55em]">{stat.suffix}</span>
              </p>
              <p className="mt-1 text-xs leading-snug text-muted">{stat.label}</p>
            </motion.li>
          );
        })}
      </motion.ul>
    </section>
  );
}
