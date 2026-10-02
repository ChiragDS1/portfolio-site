"use client";

import { techIcons } from "@/data/techIcons";
import { useSceneActive } from "@/lib/useSceneActive";

export interface PipelineStep {
  label: string;
  /** Name in `techIcons`; when absent the step renders a text badge. */
  icon?: string;
  /** Styles the step in the world's alert colour instead of its accent. */
  alert?: boolean;
}

/**
 * The stage row for an experience world: Kafka → S3 → Spark → Redis → Alerts,
 * or HL7 → Data Factory → Databricks → FHIR R4 → Synapse.
 *
 * Packets travel the connectors one at a time. On the finance row an amber
 * "flagged" packet occasionally leaves the line and pulses an alert marker —
 * the one moment of narrative in an otherwise quiet strip.
 */
export function PipelineRow({
  steps,
  flagged = false,
}: {
  steps: PipelineStep[];
  flagged?: boolean;
}) {
  const { ref, active } = useSceneActive<HTMLUListElement>();

  return (
    <ul
      ref={ref}
      aria-hidden
      className="flex flex-wrap items-stretch justify-center gap-y-2 sm:flex-nowrap"
    >
      {steps.map((step, i) => (
        <li key={step.label} className="flex min-w-0 flex-1 items-center">
          <div
            className="glass flex min-w-0 flex-1 flex-col items-center gap-1.5 rounded-xl px-2 py-2.5"
            style={{
              color: step.alert ? "rgb(var(--w-alert-text))" : "rgb(var(--text))",
              boxShadow: step.alert ? "inset 0 0 0 1px rgb(var(--w-alert) / 0.5)" : undefined,
            }}
          >
            <StepMark step={step} />
            <span className="w-full truncate text-center font-mono text-xs uppercase tracking-[0.08em]">
              {step.label}
            </span>
          </div>

          {i < steps.length - 1 && (
            <Connector index={i} active={active} flagged={flagged && i === steps.length - 2} />
          )}
        </li>
      ))}
    </ul>
  );
}

function StepMark({ step }: { step: PipelineStep }) {
  const icon = step.icon ? techIcons[step.icon] : undefined;

  if (icon) {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0" aria-hidden>
        <path
          d={icon.path}
          style={{ fill: icon.hex }}
          className={icon.lum < 0.12 ? "dark:![fill:currentColor]" : undefined}
        />
      </svg>
    );
  }

  return (
    <span
      aria-hidden
      className="grid h-4 w-4 shrink-0 place-items-center rounded-[3px] font-mono text-[0.6rem]"
      style={{
        border: `1px solid ${step.alert ? "rgb(var(--w-alert) / 0.6)" : "rgb(var(--w-accent) / 0.6)"}`,
      }}
    >
      {step.label.slice(0, 1)}
    </span>
  );
}

function Connector({
  index,
  active,
  flagged,
}: {
  index: number;
  active: boolean;
  flagged: boolean;
}) {
  return (
    <span className="flex w-5 shrink-0 items-center justify-center sm:w-7">
      <svg viewBox="0 0 44 24" className="h-4 w-full" fill="none" aria-hidden>
        <line
          x1="3"
          y1="12"
          x2="33"
          y2="12"
          stroke="rgb(var(--w-accent) / 0.3)"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M31 7l6 5-6 5"
          stroke="rgb(var(--w-accent) / 0.6)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {active && (
          <circle
            cx="3"
            cy="12"
            r="2.4"
            fill="rgb(var(--w-accent))"
            className="motion-safe:animate-flow-packet motion-reduce:hidden"
            style={{ animationDelay: `${index * 0.8}s`, transformBox: "view-box" }}
          />
        )}
        {/* The flagged transaction: an amber packet that leaves the line. */}
        {active && flagged && (
          <circle
            cx="33"
            cy="12"
            r="3"
            fill="rgb(var(--w-alert))"
            className="motion-safe:animate-alert-blip motion-reduce:hidden"
            style={{ transformBox: "view-box", transformOrigin: "33px 12px" }}
          />
        )}
      </svg>
    </span>
  );
}
