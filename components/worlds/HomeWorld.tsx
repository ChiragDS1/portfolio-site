"use client";

import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { identity, worlds, type WorldId } from "@/data/resume";
import { springBubble } from "@/lib/motion";
import { usePressed } from "@/lib/usePressed";
import { useWorld } from "./WorldContext";
import { HubScene } from "./HubScene";
import { ContactRow } from "../ContactRow";

/** The three destinations floating over the hub, each in its world's colour. */
const BUBBLES: { id: WorldId; label: string }[] = [
  { id: "about", label: "About me" },
  { id: "experience-bank-of-america", label: "Experience" },
  { id: "projects", label: "Projects" },
];

/** Where each bubble sits over the scene, in percentages of the scene box. */
const BUBBLE_POS: Record<string, { x: string; y: string }> = {
  about: { x: "14%", y: "22%" },
  "experience-bank-of-america": { x: "72%", y: "13%" },
  projects: { x: "80%", y: "66%" },
};

export function HomeWorld({ headingId }: { headingId: string }) {
  const { goTo } = useWorld();
  const reduced = useReducedMotion();
  const sceneRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState<{ x: string; y: string } | null>(null);

  /**
   * Zoom toward the bubble, then travel. The scene scales *from the bubble's
   * position* so the motion points where you're going, rather than a generic
   * centre-out push. This is the one place bounce is allowed — it's the only
   * gesture on the site that carries momentum.
   */
  function enter(id: WorldId) {
    if (reduced) {
      goTo(id);
      return;
    }
    setZoom(BUBBLE_POS[id] ?? { x: "50%", y: "50%" });
    window.setTimeout(() => {
      goTo(id);
      setZoom(null);
    }, 260);
  }

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
      {/* ---- text column ---- */}
      <div className="order-2 lg:order-1">
        <p className="mono-label">
          {identity.role} · Banking &amp; Healthcare
        </p>

        <h1
          id={headingId}
          className="mt-3 font-display font-semibold leading-[0.95] tracking-[-0.04em]"
          style={{ fontSize: "clamp(2.5rem, 7vw, 4.5rem)" }}
        >
          {identity.name}
        </h1>

        <p
          className="mt-5 max-w-xl leading-relaxed"
          style={{ color: "rgb(var(--muted))", fontSize: "clamp(1rem, 0.9rem + 0.4vw, 1.2rem)" }}
        >
          {identity.tagline}
        </p>

        {/* On phones the bubbles stop being spatial and become plain buttons. */}
        <ul className="mt-7 grid gap-2 sm:max-w-sm lg:hidden">
          {BUBBLES.map((b) => (
            <li key={b.id}>
              <BubbleButton world={b.id} label={b.label} onSelect={() => enter(b.id)} stacked />
            </li>
          ))}
        </ul>

        <div className="mt-8">
          <ContactRow />
        </div>
      </div>

      {/* ---- scene column ---- */}
      <div className="relative order-1 lg:order-2">
        <motion.div
          ref={sceneRef}
          animate={zoom ? { scale: 1.35, opacity: 0.35 } : { scale: 1, opacity: 1 }}
          transition={springBubble}
          style={{ transformOrigin: zoom ? `${zoom.x} ${zoom.y}` : "50% 50%" }}
        >
          <HubScene />
        </motion.div>

        {/* Bubbles are anchored to the hub with a hairline, so they read as
            attached to it rather than floating free. */}
        <div className="pointer-events-none absolute inset-0 hidden lg:block">
          {BUBBLES.map((b) => {
            const pos = BUBBLE_POS[b.id];
            return (
              <div
                key={b.id}
                className="pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: pos.x, top: pos.y }}
              >
                <BubbleButton world={b.id} label={b.label} onSelect={() => enter(b.id)} />
              </div>
            );
          })}
          <svg aria-hidden className="absolute inset-0 h-full w-full" fill="none">
            {BUBBLES.map((b) => {
              const pos = BUBBLE_POS[b.id];
              return (
                <line
                  key={b.id}
                  x1={pos.x}
                  y1={pos.y}
                  x2="50%"
                  y2="53%"
                  stroke="rgb(var(--w-accent) / 0.3)"
                  strokeWidth="1"
                  strokeDasharray="3 4"
                />
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}

function BubbleButton({
  world,
  label,
  onSelect,
  stacked = false,
}: {
  world: WorldId;
  label: string;
  onSelect: () => void;
  stacked?: boolean;
}) {
  const { pressed, handlers } = usePressed();
  const target = worlds.find((w) => w.id === world);
  return (
    <button
      type="button"
      onClick={onSelect}
      data-world={world}
      className={`glass flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-medium shadow-lg shadow-black/10 ${
        stacked ? "w-full justify-between" : ""
      } ${pressed ? "scale-[0.97] transition-none" : "transition-transform duration-150"}`}
      style={{ touchAction: "manipulation", color: "rgb(var(--w-accent-text))" }}
      {...handlers}
    >
      <span className="flex items-center gap-2">
        <span
          aria-hidden
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: "rgb(var(--w-accent))" }}
        />
        {label}
      </span>
      <span className="sr-only">
        — go to {target?.label}
        {target?.sub ? `, ${target.sub}` : ""}
      </span>
      <span aria-hidden className="text-xs opacity-70">
        →
      </span>
    </button>
  );
}
