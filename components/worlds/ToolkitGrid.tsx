"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { toolBadges, toolkit, toolUsage, type WorldId } from "@/data/resume";
import { techIcons } from "@/data/techIcons";
import { spring } from "@/lib/motion";
import { usePressed } from "@/lib/usePressed";
import { useWorld } from "./WorldContext";

/**
 * A brand colour has to survive the tile it sits on. Below this luminance it
 * disappears against a dark tile (Kafka, AWS and LangChain are all near-black
 * marks), so those fall back to the text colour instead. The threshold is
 * checked against generated data rather than a hardcoded name list, so a new
 * icon is handled automatically.
 */
const DARK_TILE_MIN_LUM = 0.12;


export function ToolkitGrid() {
  const { goTo } = useWorld();
  const [selected, setSelected] = useState<string | null>(null);
  const reduced = useReducedMotion();
  const uses = selected ? toolUsage[selected] : undefined;

  return (
    <div>
      {/* Legend first — the dots mean nothing without it. */}
      <div className="mb-4 flex flex-wrap items-center gap-x-5 gap-y-2">
        <p className="mono-label">Toolkit</p>
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <li className="flex items-center gap-1.5 text-xs" style={{ color: "rgb(var(--muted))" }}>
            <Dot world="experience-bank-of-america" />
            Bank of America
          </li>
          <li className="flex items-center gap-1.5 text-xs" style={{ color: "rgb(var(--muted))" }}>
            <Dot world="experience-accenture" />
            Accenture
          </li>
        </ul>
      </div>

      <div className="space-y-5">
        {toolkit.map((group) => (
          <section key={group.group} aria-label={group.group}>
            <h3 className="mono-label mb-2">{group.group}</h3>
            <ul className="grid grid-cols-3 gap-2 sm:gap-2.5 lg:grid-cols-6">
              {group.items.map((item) => (
                <li key={item}>
                  <Tile
                    name={item}
                    selected={selected === item}
                    onSelect={() => setSelected((s) => (s === item ? null : item))}
                  />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      {/* Detail strip for the selected tool. Height animates so the grid above
          doesn't jump; instant under reduced motion. */}
      <AnimatePresence initial={false}>
        {selected && uses && (
          <motion.div
            key={selected}
            initial={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reduced ? { opacity: 1 } : { height: "auto", opacity: 1 }}
            exit={reduced ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={reduced ? { duration: 0 } : spring}
            className="overflow-hidden"
          >
            <div className="glass mt-4 rounded-2xl p-4">
              <p className="font-display text-base font-semibold">{selected}</p>
              <ul className="mt-2 space-y-2.5">
                {uses.map((use) => (
                  <li key={use.world}>
                    <p className="flex items-center gap-2 text-sm">
                      <Dot world={use.world} />
                      <span className="font-medium">{use.company}</span>
                    </p>
                    <p className="mt-0.5 text-sm" style={{ color: "rgb(var(--muted))" }}>
                      {use.detail}
                    </p>
                    <button
                      type="button"
                      onClick={() => goTo(use.world)}
                      className="mt-1.5 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium"
                      style={{ color: "rgb(var(--w-accent-text))", touchAction: "manipulation" }}
                    >
                      See experience
                      <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Dot({ world }: { world: WorldId }) {
  return (
    <span
      aria-hidden
      className="inline-block h-2 w-2 shrink-0 rounded-full"
      style={{
        backgroundColor:
          world === "experience-bank-of-america"
            ? "rgb(var(--dot-boa))"
            : "rgb(var(--dot-acc))",
      }}
    />
  );
}

function Tile({
  name,
  selected,
  onSelect,
}: {
  name: string;
  selected: boolean;
  onSelect: () => void;
}) {
  const { pressed, handlers } = usePressed();
  const uses = toolUsage[name];
  const interactive = Boolean(uses?.length);

  const body = (
    <>
      <Mark name={name} />
      <span className="mt-1.5 block truncate text-center text-xs leading-tight">
        {name}
      </span>
      {uses && (
        <span className="absolute right-1.5 top-1.5 flex gap-0.5">
          {uses.map((u) => (
            <Dot key={u.world} world={u.world} />
          ))}
        </span>
      )}
    </>
  );

  const shell =
    "glass relative flex h-full min-h-[5.25rem] w-full flex-col items-center justify-center rounded-xl px-1.5 py-2.5";

  // Tools with no recorded usage have nothing to open, so they stay inert —
  // no pointer cursor, no lift, nothing promising an interaction.
  if (!interactive) {
    return (
      <div className={shell} style={{ color: "rgb(var(--text))" }}>
        {body}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`${shell} ${pressed ? "scale-[0.96] transition-none" : "transition-transform duration-150"}`}
      style={{
        touchAction: "manipulation",
        color: "rgb(var(--text))",
        boxShadow: selected ? "inset 0 0 0 2px rgb(var(--w-accent))" : undefined,
      }}
      {...handlers}
    >
      {body}
    </button>
  );
}

/** Official mark where one exists, a clean text badge where it doesn't. */
function Mark({ name }: { name: string }) {
  const icon = techIcons[name];

  if (!icon) {
    const label = toolBadges[name] ?? name.slice(0, 2);
    return (
      <span
        aria-hidden
        className="grid h-6 w-6 place-items-center rounded-md font-mono text-[0.75rem] font-medium"
        style={{
          border: "1px solid rgb(var(--text) / 0.25)",
          color: "rgb(var(--text))",
        }}
      >
        {label}
      </span>
    );
  }

  // Brand colour normally; on a dark tile a near-black mark would vanish, so
  // those inherit the text colour instead (class beats the inline fill).
  const needsDarkFallback = icon.lum < DARK_TILE_MIN_LUM;

  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden>
      <path
        d={icon.path}
        style={{ fill: icon.hex }}
        className={needsDarkFallback ? "dark:![fill:currentColor]" : undefined}
      />
    </svg>
  );
}
