"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/**
 * Counts from 0 to `value` once, when scrolled into view. Under
 * `prefers-reduced-motion` it renders the final value immediately.
 * The parent reserves width (tabular-nums, fixed digit count) so there is
 * no layout shift when the number changes.
 */
export function CountUp({ value, durationMs = 1100 }: { value: number; durationMs?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -20% 0px" });
  const reduced = useReducedMotion();
  // SSR / pre-scroll renders the real number (no misleading "0", no layout shift).
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView || reduced) return;
    setDisplay(0);
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / durationMs, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, value, durationMs]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
    </span>
  );
}
