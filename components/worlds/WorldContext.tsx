"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { worlds, type WorldId } from "@/data/resume";

interface WorldCtx {
  active: WorldId;
  /** Smooth-scroll to a world. Everything that navigates goes through this. */
  goTo: (id: WorldId) => void;
  register: (id: WorldId, el: HTMLElement | null) => void;
}

const Ctx = createContext<WorldCtx | null>(null);

export function useWorld() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useWorld must be used inside <WorldProvider>");
  return ctx;
}

/**
 * Tracks which world the reader is in and keeps the URL hash in step.
 *
 * Scrolling is the primary way through the site — the switcher, menu and
 * bubbles are shortcuts that scroll, never alternative routes. The hash is
 * written with `replaceState` so a scroll down the page doesn't bury the back
 * button under five history entries.
 */
export function WorldProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState<WorldId>(worlds[0].id);
  const nodes = useRef(new Map<WorldId, HTMLElement>());
  const activeRef = useRef<WorldId>(worlds[0].id);

  const register = useCallback((id: WorldId, el: HTMLElement | null) => {
    if (el) nodes.current.set(id, el);
    else nodes.current.delete(id);
  }, []);

  const goTo = useCallback((id: WorldId) => {
    nodes.current.get(id)?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "start",
    });
  }, []);

  // Deep link: /#experience-accenture opens straight on that world.
  useEffect(() => {
    const hash = window.location.hash.replace("#", "") as WorldId;
    if (!hash || !worlds.some((w) => w.id === hash)) return;
    // Wait a frame so the sections have registered and laid out.
    const raf = requestAnimationFrame(() => {
      nodes.current.get(hash)?.scrollIntoView({ behavior: "auto", block: "start" });
      setActive(hash);
      activeRef.current = hash;
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  // Whichever world covers the middle of the viewport is the active one.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = entry.target.getAttribute("data-world") as WorldId | null;
          if (!id || id === activeRef.current) continue;
          activeRef.current = id;
          setActive(id);
          if (window.location.hash !== `#${id}`) {
            window.history.replaceState(null, "", `#${id}`);
          }
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    nodes.current.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const value = useMemo(() => ({ active, goTo, register }), [active, goTo, register]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
