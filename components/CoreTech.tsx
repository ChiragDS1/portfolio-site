"use client";

import { motion } from "framer-motion";
import { BarChart3, Boxes, Cloud, Layers, type LucideIcon } from "lucide-react";
import { coreTech } from "@/data/resume";
import { techIconPaths } from "@/data/techIcons";
import { reveal, revealStagger, scrollViewport } from "@/lib/motion";
import { SectionHeading } from "./SectionHeading";

// Tools without a brand mark in simple-icons fall back to a generic lucide icon.
const FALLBACK: Record<string, LucideIcon> = {
  "Azure Data Factory": Cloud,
  "Delta Lake": Layers,
  "Power BI": BarChart3,
};

function TechIcon({ name }: { name: string }) {
  const path = techIconPaths[name];
  if (path) {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" fill="currentColor" aria-hidden>
        <path d={path} />
      </svg>
    );
  }
  const Icon = FALLBACK[name] ?? Boxes;
  return <Icon className="h-4 w-4 shrink-0" aria-hidden />;
}

export function CoreTech() {
  return (
    <section id="core-tech" aria-label="Core technologies" className="section-wrap py-16">
      <SectionHeading>Core Technologies</SectionHeading>

      <motion.div
        variants={revealStagger}
        initial="hidden"
        whileInView="visible"
        viewport={scrollViewport}
        className="grid gap-6"
      >
        {coreTech.map((group) => (
          <motion.div key={group.group} data-reveal variants={reveal}>
            <p className="mono-label mb-3">{group.group}</p>
            <ul className="flex flex-wrap gap-2">
              {group.items.map((item) => (
                <li
                  key={item}
                  className="inline-flex items-center gap-2 rounded-lg border border-line bg-surface/60 px-3 py-2 text-sm text-muted transition-colors hover:border-accent/60 hover:text-text"
                >
                  <span className="text-muted">
                    <TechIcon name={item} />
                  </span>
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
