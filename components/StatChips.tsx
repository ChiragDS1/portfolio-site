"use client";

import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import type { StatChip } from "@/data/resume";
import { CountUp } from "./CountUp";

/**
 * Headline figures for a role.
 *
 * Reduced motion is handled with CSS (`motion-reduce:` variants) rather than by
 * branching on `useReducedMotion()` during render — that value differs between
 * the server and the first client paint, which is a hydration mismatch.
 */
export function StatChips({ chips }: { chips: StatChip[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {chips.map((chip) => (
        <li
          key={chip.label}
          className="glass flex min-w-[8.5rem] flex-1 flex-col rounded-xl px-3 py-2.5 sm:flex-none"
        >
          {chip.kind === "count" ? <CountFigure chip={chip} /> : <TransitionFigure chip={chip} />}
          <span className="mt-0.5 text-xs leading-snug" style={{ color: "rgb(var(--muted))" }}>
            {chip.label}
          </span>
        </li>
      ))}
    </ul>
  );
}

function CountFigure({ chip }: { chip: Extract<StatChip, { kind: "count" }> }) {
  // `revealSuffix` holds the unit back until the number lands (5 … then "M+").
  // Under reduced motion CountUp fires `onDone` immediately, so it's instant.
  const [landed, setLanded] = useState(false);
  const showSuffix = !chip.revealSuffix || landed;

  return (
    <span
      className="flex items-baseline gap-0.5 font-display font-semibold leading-none tracking-[-0.02em]"
      style={{ color: "rgb(var(--w-accent-text))", fontSize: "clamp(1.4rem,1.1rem+1vw,1.9rem)" }}
    >
      <CountUp
        value={chip.value}
        minChars={String(chip.value).length}
        onDone={chip.revealSuffix ? () => setLanded(true) : undefined}
      />
      <span
        className={`font-mono text-[0.6em] transition-opacity duration-300 motion-reduce:opacity-100 motion-reduce:duration-0 ${
          showSuffix ? "opacity-100" : "opacity-0"
        }`}
      >
        {chip.suffix}
      </span>
    </span>
  );
}

/** Before/after: the old value strikes through, then the new one is revealed. */
function TransitionFigure({ chip }: { chip: Extract<StatChip, { kind: "transition" }> }) {
  const ref = useRef<HTMLSpanElement>(null);
  const played = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });

  return (
    <span ref={ref} className="block">
      <span className="sr-only">{`${chip.before} improved to ${chip.after}`}</span>

      <span
        aria-hidden
        className="relative inline-block font-mono text-xs leading-none"
        style={{ color: "rgb(var(--muted))" }}
      >
        {chip.before}
        <span
          className={`absolute left-0 top-1/2 h-px w-full origin-left transition-transform duration-500 motion-reduce:scale-x-100 motion-reduce:duration-0 ${
            played ? "scale-x-100" : "scale-x-0"
          }`}
          style={{ backgroundColor: "rgb(var(--muted))" }}
        />
      </span>

      <span
        aria-hidden
        className={`mt-1 block font-display font-semibold leading-none tracking-[-0.02em] transition-opacity delay-500 duration-500 motion-reduce:opacity-100 motion-reduce:delay-0 motion-reduce:duration-0 ${
          played ? "opacity-100" : "opacity-0"
        }`}
        style={{ color: "rgb(var(--w-accent-text))", fontSize: "clamp(1.1rem,0.95rem+0.6vw,1.45rem)" }}
      >
        {chip.after}
      </span>
    </span>
  );
}
