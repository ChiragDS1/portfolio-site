"use client";

import { useEffect, useRef } from "react";
import type { World } from "@/data/resume";
import { useWorld } from "./WorldContext";

/**
 * One world: a `<section>` carrying its own palette tokens via `data-world`,
 * plus the giant ghosted word that names it.
 *
 * Height is content-driven below `lg`. Forcing `min-height: 100svh` on phones
 * is what produced the dead-space gaps in the previous design — the content is
 * simply shorter than the viewport there.
 */
export function WorldSection({
  world,
  headingId,
  children,
}: {
  world: World;
  headingId: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const { register } = useWorld();

  useEffect(() => {
    register(world.id, ref.current);
    return () => register(world.id, null);
  }, [register, world.id]);

  return (
    <section
      ref={ref}
      id={world.id}
      data-world={world.id}
      aria-labelledby={headingId}
      className="relative isolate flex flex-col justify-center overflow-hidden pb-28 pt-20 sm:pb-24 sm:pt-24 lg:min-h-screen lg:py-28"
      style={{ color: "rgb(var(--text))" }}
    >
      <GhostWord>{world.ghost}</GhostWord>
      <div className="world-wrap relative z-10">{children}</div>
    </section>
  );
}

/**
 * The world's name, set huge and barely-there behind the content. Sits in the
 * display face with hard negative tracking — at this size letters drift apart
 * optically, so they need pulling back together.
 */
function GhostWord({ children }: { children: React.ReactNode }) {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-20 select-none text-center font-display font-bold leading-[0.82] tracking-[-0.045em] lg:top-24"
      style={{
        color: "rgb(var(--ghost) / var(--ghost-a))",
        fontSize: "clamp(3.5rem, 17vw, 14rem)",
      }}
    >
      {children}
    </span>
  );
}
