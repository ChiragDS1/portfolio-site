"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-react";
import { experience, type ExperienceItem, type WorldId } from "@/data/resume";
import { spring } from "@/lib/motion";
import { usePressed } from "@/lib/usePressed";
import { StatChips } from "../StatChips";
import { PipelineRow, type PipelineStep } from "./PipelineRow";
import { FinanceScene, HealthScene } from "./scenes";
import { useWorld } from "./WorldContext";

/** Bullets shown before the reader opts into the rest. */
const COLLAPSED = 4;

const PIPELINES: Record<string, PipelineStep[]> = {
  "experience-bank-of-america": [
    { label: "Kafka", icon: "Kafka" },
    { label: "S3", icon: "AWS" },
    { label: "Spark", icon: "Spark" },
    { label: "Redis", icon: "Redis" },
    { label: "Alerts", alert: true },
  ],
  "experience-accenture": [
    { label: "HL7" },
    { label: "Data Factory" },
    { label: "Databricks", icon: "Databricks" },
    { label: "FHIR R4" },
    { label: "Synapse" },
  ],
};

/**
 * One experience world. Both roles share this shell — the scene, pipeline and
 * palette are what differ, so the structure stays recognisable as you move
 * between them.
 */
export function JobWorld({ job, headingId }: { job: ExperienceItem; headingId: string }) {
  const { goTo } = useWorld();
  const [expanded, setExpanded] = useState(false);
  const reduced = useReducedMotion();

  const index = experience.findIndex((e) => e.world === job.world);
  const prev = experience[index - 1];
  const next = experience[index + 1];
  const panelId = `bullets-${job.world}`;
  const visible = job.bullets.slice(0, COLLAPSED);
  const hidden = job.bullets.slice(COLLAPSED);

  return (
    <>
      {job.world === "experience-bank-of-america" ? <FinanceScene /> : <HealthScene />}

      <div className="relative">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="mono-label">
            Experience · {index + 1} / {experience.length}
          </p>
          <div className="flex items-center gap-1">
            {prev && (
              <StepButton onClick={() => goTo(prev.world)} label={`Previous role: ${prev.company}`}>
                <ArrowLeft className="h-4 w-4" aria-hidden />
              </StepButton>
            )}
            {next && (
              <StepButton onClick={() => goTo(next.world)} label={`Next role: ${next.company}`}>
                <ArrowRight className="h-4 w-4" aria-hidden />
              </StepButton>
            )}
          </div>
        </div>

        <div className="mt-5 grid gap-6 lg:grid-cols-[1.15fr_1fr] lg:gap-10">
          {/* ---- job card ---- */}
          <div className="glass rounded-2xl p-5 sm:p-6">
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
              <p className="mono-label">{job.period}</p>
              {job.current && (
                <span
                  className="rounded-full px-2 py-0.5 font-mono text-xs uppercase tracking-[0.1em]"
                  style={{
                    border: "1px solid rgb(var(--w-accent) / 0.45)",
                    backgroundColor: "rgb(var(--w-accent) / 0.12)",
                    color: "rgb(var(--w-accent-text))",
                  }}
                >
                  Current
                </span>
              )}
            </div>

            <h2
              id={headingId}
              className="mt-2 font-display font-semibold tracking-[-0.03em]"
              style={{ fontSize: "clamp(1.5rem, 3vw, 2.1rem)" }}
            >
              <span style={{ color: "rgb(var(--w-accent-text))" }}>{job.title}</span>
              <span style={{ color: "rgb(var(--muted))" }}> · {job.company}</span>
            </h2>

            <p className="mt-1 text-sm" style={{ color: "rgb(var(--muted))" }}>
              {job.location} — {job.project}
            </p>

            <ul className="mt-4 space-y-2.5">
              {visible.map((bullet) => (
                <Bullet key={bullet}>{bullet}</Bullet>
              ))}
            </ul>

            <AnimatePresence initial={false}>
              {expanded && (
                <motion.div
                  id={panelId}
                  key="more"
                  initial={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  animate={reduced ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                  exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
                  transition={reduced ? { duration: 0 } : spring}
                  className="overflow-hidden"
                >
                  <ul className="mt-2.5 space-y-2.5">
                    {hidden.map((bullet) => (
                      <Bullet key={bullet}>{bullet}</Bullet>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>

            {hidden.length > 0 && (
              <ShowMore
                expanded={expanded}
                count={hidden.length}
                panelId={panelId}
                job={job}
                onToggle={() => setExpanded((v) => !v)}
              />
            )}
          </div>

          {/* ---- pipeline + figures ---- */}
          <div className="space-y-5">
            <div>
              <p className="mono-label mb-2">Pipeline</p>
              <PipelineRow
                steps={PIPELINES[job.world]}
                flagged={job.world === "experience-bank-of-america"}
              />
            </div>
            <StatChips chips={job.chips} />
          </div>
        </div>
      </div>
    </>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2.5 text-[0.9rem] leading-[1.6]">
      <span
        aria-hidden
        className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full"
        style={{ backgroundColor: "rgb(var(--w-accent) / 0.8)" }}
      />
      <span>{children}</span>
    </li>
  );
}

function ShowMore({
  expanded,
  count,
  panelId,
  job,
  onToggle,
}: {
  expanded: boolean;
  count: number;
  panelId: string;
  job: ExperienceItem;
  onToggle: () => void;
}) {
  const { pressed, handlers } = usePressed();
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={expanded}
      aria-controls={panelId}
      className={`mt-3 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium ${
        pressed ? "scale-[0.98] transition-none" : "transition-transform duration-150"
      }`}
      style={{ color: "rgb(var(--w-accent-text))", touchAction: "manipulation" }}
      {...handlers}
    >
      <ChevronDown
        className={`h-4 w-4 transition-transform duration-200 motion-reduce:transition-none ${
          expanded ? "rotate-180" : ""
        }`}
        aria-hidden
      />
      {expanded ? "Show less" : `Show ${count} more`}
      <span className="sr-only">
        {" "}
        for {job.title} at {job.company}
      </span>
    </button>
  );
}

function StepButton({
  onClick,
  label,
  children,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  const { pressed, handlers } = usePressed();
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`glass grid h-11 w-11 place-items-center rounded-full ${
        pressed ? "scale-95 transition-none" : "transition-transform duration-150"
      }`}
      style={{ touchAction: "manipulation", color: "rgb(var(--text))" }}
      {...handlers}
    >
      {children}
    </button>
  );
}

export { PIPELINES };
