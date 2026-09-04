"use client";

import { motion } from "framer-motion";
import { Brain, Columns3, LineChart, Workflow, type LucideIcon } from "lucide-react";
import { pipelineStages, type PipelineStage } from "@/data/resume";
import { flowNode, flowStagger } from "@/lib/motion";

const ICONS: Record<PipelineStage["icon"], LucideIcon> = {
  pipeline: Workflow,
  feature: Columns3,
  model: Brain,
  insight: LineChart,
};

/**
 * THE signature element. Pipeline → Feature → Model → Insight.
 * On load the nodes stagger in; an iris pulse then flows along each connector on
 * a slow ambient loop.
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
 *   - connector pulse → pure CSS: `motion-safe:` enables it, `motion-reduce:`
 *     hides it. The connectors are plain, deterministic SVG — no Framer.
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
      aria-label="How I work, from pipeline to insight"
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

            {!isLast && <Connector />}
          </motion.li>
        );
      })}
    </motion.ol>
  );
}

function Connector() {
  return (
    <div className="flex shrink-0 items-center justify-center py-0.5 lg:py-0" aria-hidden>
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
        {/* ambient iris pulse — CSS only; hidden under prefers-reduced-motion */}
        <line
          x1="3"
          y1="12"
          x2="33"
          y2="12"
          stroke="rgb(var(--accent))"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="1.5 14"
          className="motion-safe:animate-flow-dash motion-reduce:hidden"
        />
      </svg>
    </div>
  );
}
