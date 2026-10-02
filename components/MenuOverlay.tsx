"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Linkedin, Mail, X } from "lucide-react";
import { identity, worlds, type World, type WorldId } from "@/data/resume";
import { springSoft } from "@/lib/motion";
import { usePressed } from "@/lib/usePressed";
import { ThemeToggle } from "./ThemeToggle";
import { ResumeButton } from "./ResumeButton";

/**
 * Full-screen menu. Portaled to <body>: the top bar is a `backdrop-filter`
 * surface, which makes it a containing block for its own fixed descendants —
 * an overlay left inside it would be trapped in the 64px bar.
 *
 * On a pointer device, hovering a world previews its palette. That affordance
 * doesn't exist on touch, so the list stands on its own there.
 */
export function MenuOverlay({
  open,
  onClose,
  onGo,
  world,
}: {
  open: boolean;
  onClose: () => void;
  onGo: (id: WorldId) => void;
  /** Active world, so the portaled overlay still resolves world tokens. */
  world: WorldId;
}) {
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState<WorldId | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    requestAnimationFrame(() => closeRef.current?.focus());
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Site menu"
          data-world={world}
          initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 1.02 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 1.02 }}
          transition={springSoft}
          className="fixed inset-0 z-50 overflow-y-auto"
          style={{
            backgroundColor: "rgb(var(--scrim) / 0.92)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
          }}
        >
          <div className="world-wrap flex min-h-full flex-col py-6">
            <div className="flex items-center justify-end gap-2">
              <ThemeToggle />
              <CloseButton ref={closeRef} onClick={onClose} />
            </div>

            <nav aria-label="Worlds" className="flex flex-1 flex-col justify-center py-8">
              <ul className="space-y-1">
                {worlds.map((world, i) => (
                  <li key={world.id}>
                    <MenuLink
                      index={i}
                      world={world}
                      onSelect={() => {
                        onClose();
                        onGo(world.id);
                      }}
                      onHover={setHovered}
                      isPreviewed={hovered === world.id}
                    />
                  </li>
                ))}
              </ul>
            </nav>

            <div
              className="flex flex-wrap items-center gap-2 border-t pt-6"
              style={{ borderColor: "rgb(var(--text) / 0.12)" }}
            >
              <a
                href={`mailto:${identity.email}`}
                className="inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm"
                style={{ borderColor: "rgb(var(--text) / 0.18)", color: "rgb(var(--text))" }}
              >
                <Mail className="h-4 w-4" aria-hidden />
                {identity.email}
              </a>
              <a
                href={identity.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-sm"
                style={{ borderColor: "rgb(var(--text) / 0.18)", color: "rgb(var(--text))" }}
              >
                <Linkedin className="h-4 w-4" aria-hidden />
                LinkedIn
              </a>
              <ResumeButton className="border border-w-accent-text/40 text-w-accent-text" />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

function MenuLink({
  index,
  world,
  onSelect,
  onHover,
  isPreviewed,
}: {
  index: number;
  world: World;
  onSelect: () => void;
  onHover: (id: WorldId | null) => void;
  isPreviewed: boolean;
}) {
  const { pressed, handlers } = usePressed();
  return (
    <button
      type="button"
      onClick={onSelect}
      onPointerEnter={() => onHover(world.id)}
      onFocus={() => onHover(world.id)}
      onBlur={() => onHover(null)}
      className={`flex w-full items-center gap-4 rounded-2xl px-2 py-2 text-left ${
        pressed ? "scale-[0.99] transition-none" : "transition-colors duration-150"
      }`}
      style={{ touchAction: "manipulation", color: "rgb(var(--text))" }}
      {...handlers}
      // usePressed also releases on pointer-leave; chain the hover reset onto it
      // rather than letting the spread silently drop one of them.
      onPointerLeave={(e) => {
        handlers.onPointerLeave();
        onHover(null);
        void e;
      }}
    >
      <span className="font-mono text-xs tabular-nums" style={{ color: "rgb(var(--muted))" }}>
        {String(index + 1).padStart(2, "0")}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-display text-3xl font-semibold tracking-[-0.03em] sm:text-5xl">
          {world.label}
        </span>
        {world.sub && (
          <span className="block text-sm sm:text-base" style={{ color: "rgb(var(--muted))" }}>
            {world.sub}
          </span>
        )}
      </span>
      {/* Palette preview — a pointer-only affordance, so it stays hidden on touch. */}
      <span
        aria-hidden
        data-world={world.id}
        className={`hidden h-12 w-20 shrink-0 overflow-hidden rounded-xl border transition-opacity duration-200 motion-reduce:transition-none lg:block ${
          isPreviewed ? "opacity-100" : "opacity-0"
        }`}
        style={{
          backgroundColor: "rgb(var(--w-bg))",
          borderColor: "rgb(var(--w-accent) / 0.5)",
        }}
      >
        <span
          className="block h-full w-full"
          style={{
            background: [
              "radial-gradient(70% 70% at 25% 25%, rgb(var(--w-glow-1)), transparent 70%)",
              "radial-gradient(70% 70% at 80% 70%, rgb(var(--w-glow-2)), transparent 70%)",
            ].join(","),
          }}
        />
      </span>
    </button>
  );
}

const CloseButton = forwardRef<HTMLButtonElement, { onClick: () => void }>(
  function CloseButton({ onClick }, ref) {
    const { pressed, handlers } = usePressed();
    return (
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        aria-label="Close menu"
        className={`grid h-11 w-11 place-items-center rounded-full ${
          pressed ? "scale-95 transition-none" : "transition-transform duration-150"
        }`}
        style={{ touchAction: "manipulation", color: "rgb(var(--text))" }}
        {...handlers}
      >
        <X className="h-5 w-5" aria-hidden />
      </button>
    );
  },
);
