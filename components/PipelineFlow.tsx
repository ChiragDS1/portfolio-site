"use client";

import { motion } from "framer-motion";
import { Radio, ShieldCheck, Siren, Waves, type LucideIcon } from "lucide-react";
import { pipelineStages, type PipelineStage } from "@/data/resume";
import { flowNode, flowStagger } from "@/lib/motion";

const ICONS: Record<PipelineStage["icon"], LucideIcon> = {
  ingest: Radio,
  stream: Waves,
  govern: ShieldCheck,
  serve: Siren,
};

/**
 * THE signature element. Ingest → Stream → Govern → Serve.
 * On load the nodes stagger in; afterwards a single "data packet" dot travels
 * one connector at a time, in order, looping slowly to suggest a live stream.
 *
 * Layout: a single column below `lg` (1024px) — this is the deliberate fix for
 * cards squeezing into an unreadable 4-up row on phones *and* tablets; a single
 * full-width card at any width down to ~360px stays comfortably readable. At
 * `lg` and up it becomes the one-row diagram; the parent (Hero.tsx) breaks its
 * wrapper out past the ~46rem reading column at that point so the 4 cards get
 * real room instead of being squeezed into the text column's width.
 *
 * Reduced motion is handled two ways, neither of which branches on
 * `useReducedMotion()` at render time (that caused an SSR/client hydration
 * mismatch):
 *   - node entrance → `<MotionConfig reducedMotion="user">` (in Portfolio.tsx)
 *     drops the transform, leaving only a short opacity fade
 *   - travelling packet → pure CSS: `motion-safe:` enables it, `motion-reduce:`
 *     hides the dot entirely, leaving the static rail + arrowhead. The
 *     connectors are plain, deterministic SVG — no Framer, no JS timers.
 *
 * The entrance stagger is driven by `animate="show"` on mount, not by measuring
 * layout, so it fires identically regardless of which shape (stacked or row)
 * CSS has resolved to at the current viewport.
 */
export function PipelineFlow() {
  return (
    <motion.ol
      variants={flowStagger}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-1 lg:flex-row lg:items-stretch"
      aria-label="How I work, from ingest to serve"
    >
      {pipelineStages.map((stage, i) => {
        const Icon = ICONS[stage.icon];
        const isLast = i === pipelineStages.length - 1;
        return (
          <motion.li
            key={stage.key}
            variants={flowNode}
            className="flex flex-1 flex-col lg:flex-row lg:items-stretch"
          >
            <div className="flex flex-1 flex-col rounded-xl border border-line bg-surface/60 p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <span
                  className={`grid h-9 w-9 place-items-center rounded-md border border-line ${
                    isLast ? "text-accent-2" : "text-accent"
                  }`}
                >
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                <span className="font-mono text-xs text-muted">0{i + 1}</span>
              </div>
              <h3 className="mt-3 font-display text-base font-semibold text-text sm:text-lg">
                {stage.label}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted lg:text-xs">{stage.blurb}</p>
            </div>

            {!isLast && <Connector index={i} />}
          </motion.li>
        );
      })}
    </motion.ol>
  );
}

function Connector({ index }: { index: number }) {
  return (
    <div className="flex shrink-0 items-center justify-center py-0.5 lg:py-0" aria-hidden>
      {/*
        The whole SVG is rotated 90° below `lg`, so the packet's left-to-right
        travel in SVG coordinates becomes top-to-bottom once the row stacks
        vertically on mobile — no separate mobile animation needed.
      */}
      <svg
        viewBox="0 0 44 24"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        className="h-8 w-6 rotate-90 lg:h-6 lg:w-11 lg:rotate-0"
      >
        {/* static rail */}
        <line
          x1="3"
          y1="12"
          x2="33"
          y2="12"
          stroke="rgb(var(--line))"
          strokeWidth="2"
          strokeLinecap="round"
        />
        {/* arrowhead */}
        <path
          d="M31 6l7 6-7 6"
          stroke="rgb(var(--accent) / 0.75)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/*
          The data packet. Each connector runs the same 3.6s loop offset by
          1.2s, so exactly one dot is visible at a time and the sequence reads
          Ingest → Stream → Govern → Serve. Low contrast, no glow.
          Hidden outright under prefers-reduced-motion.
        */}
        <circle
          cx="3"
          cy="12"
          r="2.25"
          fill="rgb(var(--accent) / 0.8)"
          className="motion-safe:animate-flow-packet motion-reduce:hidden"
          style={{ animationDelay: `${index * 1.2}s`, transformBox: "view-box" }}
        />
      </svg>
    </div>
  );
}
