"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const KEY = "worlds-loader-seen";
const DURATION = 760; // counter runs this long; total incl. fade stays under 900ms

/**
 * First-visit-per-session counter. Deliberately short, and deliberately an
 * *overlay*: every word of the page is already in the static HTML underneath,
 * so crawlers and no-JS readers never wait on it.
 *
 * Skipped entirely under reduced motion, and skipped on every later navigation
 * in the same session.
 */
export function Loader() {
  // `false` on the server and on the first client paint, so hydration matches.
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
    } catch {
      /* storage blocked — treat as seen so we never trap the reader */
      seen = true;
    }
    if (seen) return;
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }

    setShow(true);
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min((now - start) / DURATION, 1);
      // easeOutCubic — fast at first, settling onto 100
      setCount(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setShow(false);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          aria-hidden
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.14, ease: "easeOut" }}
          className="pointer-events-none fixed inset-0 z-[60] flex items-end justify-end p-6 sm:p-10"
          style={{ backgroundColor: "rgb(var(--scrim))" }}
        >
          <div className="text-right">
            <p
              className="font-mono text-xs uppercase tracking-[0.18em]"
              style={{ color: "rgb(var(--muted))" }}
            >
              Ingesting events…
            </p>
            <p
              className="font-display font-semibold leading-none tracking-[-0.04em] tabular-nums"
              // Three digits' worth of space is reserved up front, so counting
              // 0 -> 100 can't resize the block and nudge the layout.
              style={{
                color: "rgb(var(--text))",
                fontSize: "clamp(4rem, 18vw, 11rem)",
                minWidth: "3ch",
                display: "inline-block",
              }}
            >
              {count}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
