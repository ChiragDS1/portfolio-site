"use client";

import { useEffect, useRef, useState } from "react";

/**
 * True only while the element is on screen *and* the tab is visible.
 *
 * Scene animations are decorative and run forever, so pausing them when nobody
 * is looking keeps them off the main thread and off the battery. Callers gate
 * their CSS animation classes on this.
 */
export function useSceneActive<T extends Element>() {
  const ref = useRef<T>(null);
  const [onScreen, setOnScreen] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setOnScreen(entry.isIntersecting),
      { rootMargin: "10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onVis = () => setTabVisible(!document.hidden);
    onVis();
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  return { ref, active: onScreen && tabVisible };
}

/**
 * Coarse-pointer / small-screen check used to thin out particle counts.
 * Returns false on the server and on the first client paint, so it can never
 * cause a hydration mismatch — the extra particles simply appear a frame later.
 */
export function useIsCompact() {
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const sync = () => setCompact(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return compact;
}
