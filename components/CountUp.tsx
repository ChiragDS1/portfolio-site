"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

/**
 * Counts 0 → `value` once, when scrolled into view, finishing in `durationMs`.
 *
 * Correctness rules this component has to honour, because a stat that rests on
 * a half-finished number reads as a *wrong* number:
 *   - the displayed value is `value` before the animation starts (so SSR and
 *     any pre-scroll paint show the truth, never a misleading 0)
 *   - the final frame always writes exactly `value`, never a rounded
 *     intermediate
 *   - if the effect is torn down mid-flight (Strict Mode double-invoke, a
 *     dependency change, unmount-remount), the cleanup snaps to `value` instead
 *     of leaving the partial number on screen — this was the "11%" bug
 *   - `prefers-reduced-motion` skips the animation entirely
 *
 * Width is reserved by the caller via `minChars` + tabular figures so the
 * layout never shifts as digits change.
 */
export function CountUp({
  value,
  durationMs = 1200,
  minChars,
  onDone,
}: {
  value: number;
  durationMs?: number;
  /** Reserve space for this many digits so the row can't reflow mid-count. */
  minChars?: number;
  /** Fired once the count lands on its final value. */
  onDone?: () => void;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(value);
  // Once the count has completed, never run it again.
  const doneRef = useRef(false);
  // Keep the latest callback without making it an effect dependency.
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;

  useEffect(() => {
    if (reduced) {
      setDisplay(value);
      onDoneRef.current?.();
      return;
    }
    if (!inView || doneRef.current) return;

    let raf = 0;
    let settled = false;
    const start = performance.now();

    const finish = () => {
      settled = true;
      doneRef.current = true;
      setDisplay(value);
      onDoneRef.current?.();
    };

    setDisplay(0);
    const tick = (now: number) => {
      const t = Math.min((now - start) / durationMs, 1);
      if (t >= 1) {
        finish();
        return;
      }
      // easeOutCubic
      setDisplay(Math.round((1 - Math.pow(1 - t, 3)) * value));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      // Never leave a partial number on screen.
      if (!settled) finish();
    };
  }, [inView, reduced, value, durationMs]);

  return (
    <span
      ref={ref}
      className="inline-block text-right tabular-nums"
      style={minChars ? { minWidth: `${minChars}ch` } : undefined}
    >
      {display}
    </span>
  );
}
