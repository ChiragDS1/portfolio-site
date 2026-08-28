"use client";

import { motion, useReducedMotion } from "framer-motion";
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
 * On load: nodes stagger in, then the connectors draw. When motion is allowed,
 * an iris pulse flows along each connector on a slow ambient loop. Everything
 * collapses to a static final state under `prefers-reduced-motion`.
 */
export function PipelineFlow() {
  const reduced = useReducedMotion();

  return (
    <motion.ol
      variants={reduced ? undefined : flowStagger}
      initial={reduced ? false : "hidden"}
      animate={reduced ? false : "show"}
      className="flex flex-col gap-1 sm:flex-row sm:items-stretch"
      aria-label="How I work, from pipeline to insight"
    >
      {pipelineStages.map((stage, i) => {
        const Icon = ICONS[stage.icon];
        const isLast = i === pipelineStages.length - 1;
        return (
          <motion.li
            key={stage.key}
            variants={reduced ? undefined : flowNode}
            className="flex flex-1 flex-col sm:flex-row sm:items-stretch"
          >
            <div className="flex flex-1 flex-col rounded-xl border border-line bg-surface/60 p-4">
              <div className="flex items-center justify-between">
                <span
                  className={`grid h-8 w-8 place-items-center rounded-md border border-line ${
                    isLast ? "text-accent-2" : "text-accent"
                  }`}
                >
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                <span className="font-mono text-xs text-muted">0{i + 1}</span>
              </div>
              <h3 className="mt-3 font-display text-base font-semibold text-text">
                {stage.label}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-muted">{stage.blurb}</p>
            </div>

            {!isLast && <Connector index={i} reduced={Boolean(reduced)} />}
          </motion.li>
        );
      })}
    </motion.ol>
  );
}

function Connector({ index, reduced }: { index: number; reduced: boolean }) {
  return (
    <div className="flex shrink-0 items-center justify-center py-0.5 sm:py-0" aria-hidden>
      <svg
        viewBox="0 0 44 24"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        className="h-8 w-6 rotate-90 sm:h-6 sm:w-11 sm:rotate-0"
      >
        <motion.line
          x1="3"
          y1="12"
          x2="33"
          y2="12"
          stroke="rgb(var(--line))"
          strokeWidth="2"
          strokeLinecap="round"
          initial={reduced ? false : { pathLength: 0, opacity: 0 }}
          animate={reduced ? false : { pathLength: 1, opacity: 1 }}
          transition={{ delay: 0.5 + index * 0.16, duration: 0.5, ease: "easeInOut" }}
        />
        <path
          d="M31 6l7 6-7 6"
          stroke="rgb(var(--accent) / 0.75)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {!reduced && (
          <line
            x1="3"
            y1="12"
            x2="33"
            y2="12"
            stroke="rgb(var(--accent))"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray="1.5 14"
            className="motion-safe:animate-flow-dash"
          />
        )}
      </svg>
    </div>
  );
}
