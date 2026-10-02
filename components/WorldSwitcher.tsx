"use client";

import { forwardRef, useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { worlds, type WorldId } from "@/data/resume";
import { WORLD_ICONS } from "./worldIcons";
import { springSoft } from "@/lib/motion";
import { usePressed } from "@/lib/usePressed";
import { useWorld } from "./worlds/WorldContext";

/**
 * Where-am-I / where-can-I-go, parked in the corner.
 *
 * The list grows out of the pill and collapses back into it along the same
 * path — `transform-origin` is pinned to the pill's bottom edge, so the panel
 * is visibly *the pill, opened*, not a separate card that happened to appear.
 */
export function WorldSwitcher() {
  const { active, goTo } = useWorld();
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduced = useReducedMotion();
  const { pressed, handlers } = usePressed();

  const current = worlds.find((w) => w.id === active) ?? worlds[0];
  const CurrentIcon = WORLD_ICONS[current.icon];

  function close(restoreFocus = true) {
    setOpen(false);
    if (restoreFocus) triggerRef.current?.focus();
  }

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
      }
    }
    function onDown(e: MouseEvent) {
      const t = e.target as Node;
      if (!triggerRef.current?.contains(t) && !document.getElementById(panelId)?.contains(t)) {
        setOpen(false);
      }
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDown);
    };
  }, [open, panelId]);

  function openList() {
    setOpen(true);
    requestAnimationFrame(() => itemRefs.current[0]?.focus());
  }

  function onListKey(e: React.KeyboardEvent, i: number) {
    const last = worlds.length - 1;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      itemRefs.current[i === last ? 0 : i + 1]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      itemRefs.current[i === 0 ? last : i - 1]?.focus();
    } else if (e.key === "Home") {
      e.preventDefault();
      itemRefs.current[0]?.focus();
    } else if (e.key === "End") {
      e.preventDefault();
      itemRefs.current[last]?.focus();
    }
  }

  function pick(id: WorldId) {
    setOpen(false);
    goTo(id);
    triggerRef.current?.focus();
  }

  return (
    /* Carries the active world's id so the pill picks up its palette; the rows
       inside carry their own, previewing the world they point at. */
    <div
      data-world={active}
      className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-4 sm:inset-x-auto sm:right-6 sm:justify-end sm:px-0"
    >
      <div className="relative">
        <AnimatePresence>
          {open && (
            <motion.ul
              id={panelId}
              role="listbox"
              aria-label="Jump to a world"
              initial={reduced ? { opacity: 0 } : { opacity: 0, scaleY: 0.6, y: 8 }}
              animate={{ opacity: 1, scaleY: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, scaleY: 0.6, y: 8 }}
              transition={springSoft}
              style={{ transformOrigin: "bottom center" }}
              className="glass absolute bottom-full left-0 right-0 mb-2 origin-bottom overflow-hidden rounded-2xl p-1.5 shadow-2xl shadow-black/25 sm:left-auto sm:w-[17rem]"
            >
              {worlds.map((world, i) => {
                const Icon = WORLD_ICONS[world.icon];
                const isActive = world.id === active;
                return (
                  <li key={world.id}>
                    <SwitcherItem
                      ref={(el) => {
                        itemRefs.current[i] = el;
                      }}
                      onClick={() => pick(world.id)}
                      onKeyDown={(e) => onListKey(e, i)}
                      isActive={isActive}
                    >
                      <span
                        className="grid h-7 w-7 shrink-0 place-items-center rounded-full"
                        data-world={world.id}
                        style={{
                          backgroundColor: "rgb(var(--w-accent) / 0.18)",
                          color: "rgb(var(--w-accent-text))",
                        }}
                      >
                        <Icon className="h-3.5 w-3.5" aria-hidden />
                      </span>
                      <span className="min-w-0 flex-1 text-left">
                        <span className="block truncate text-sm font-medium">{world.label}</span>
                        {world.sub && (
                          <span className="block truncate text-xs" style={{ color: "rgb(var(--muted))" }}>
                            {world.sub}
                          </span>
                        )}
                      </span>
                    </SwitcherItem>
                  </li>
                );
              })}
            </motion.ul>
          )}
        </AnimatePresence>

        <button
          ref={triggerRef}
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => (open ? close(false) : openList())}
          className={`glass flex min-h-11 w-full items-center gap-2.5 rounded-full px-4 shadow-xl shadow-black/20 sm:w-auto ${
            pressed ? "scale-[0.97] transition-none" : "transition-transform duration-150"
          }`}
          style={{ touchAction: "manipulation", color: "rgb(var(--text))" }}
          {...handlers}
        >
          <CurrentIcon className="h-4 w-4 shrink-0" style={{ color: "rgb(var(--w-accent-text))" }} aria-hidden />
          <span className="truncate text-sm font-medium">
            {current.label}
            {current.sub && <span style={{ color: "rgb(var(--muted))" }}> · {current.sub}</span>}
          </span>
          <ChevronUp
            className={`h-4 w-4 shrink-0 transition-transform duration-200 motion-reduce:transition-none ${
              open ? "rotate-180" : ""
            }`}
            style={{ color: "rgb(var(--muted))" }}
            aria-hidden
          />
        </button>
      </div>
    </div>
  );
}

/** A row in the switcher list, with instant touch-down feedback. */
const SwitcherItem = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { isActive: boolean }
>(function SwitcherItem({ isActive, children, ...rest }, ref) {
  const { pressed, handlers } = usePressed();
  return (
    <button
      ref={ref}
      type="button"
      role="option"
      aria-selected={isActive}
      className={`flex min-h-11 w-full items-center gap-2.5 rounded-xl px-2 ${
        pressed ? "scale-[0.98] transition-none" : "transition-colors duration-150"
      }`}
      style={{
        touchAction: "manipulation",
        backgroundColor: isActive ? "rgb(var(--text) / 0.08)" : undefined,
        color: "rgb(var(--text))",
      }}
      {...handlers}
      {...rest}
    >
      {children}
    </button>
  );
});
