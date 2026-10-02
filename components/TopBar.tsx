"use client";

import { Menu } from "lucide-react";
import { identity } from "@/data/resume";
import { usePressed } from "@/lib/usePressed";
import { useWorld } from "./worlds/WorldContext";
import { ThemeToggle } from "./ThemeToggle";
import { ResumeButton } from "./ResumeButton";

/**
 * Translucent chrome floating over the worlds — content scrolls underneath
 * rather than being pushed down by an opaque strip.
 */
export function TopBar({ onOpenMenu }: { onOpenMenu: () => void }) {
  const { pressed, handlers } = usePressed();
  const { active } = useWorld();

  // The chrome lives outside every <section>, so it carries the active world's
  // id itself — otherwise --w-accent-text resolves to nothing out here.
  return (
    <header data-world={active} className="fixed inset-x-0 top-0 z-40">
      <div className="glass mx-auto flex h-16 max-w-[80rem] items-center justify-between gap-3 border-x-0 border-t-0 px-4 sm:px-6">
        <a
          href="#home"
          className="font-display text-lg font-semibold tracking-[-0.02em]"
          style={{ color: "rgb(var(--text))" }}
        >
          {identity.name.split(" ")[0].toLowerCase()}
          <span style={{ color: "rgb(var(--w-accent-text))" }}>.</span>
        </a>

        <div className="flex items-center gap-1 sm:gap-2">
          {/* Border and label follow the active world, so the chrome belongs
              to whichever scene you're standing in. */}
          <ResumeButton className="border border-w-accent-text/40 px-3 font-mono text-xs uppercase tracking-[0.14em] text-w-accent-text sm:px-4">
            Résumé
          </ResumeButton>
          <ThemeToggle />
          <button
            type="button"
            onClick={onOpenMenu}
            aria-label="Open menu"
            className={`grid h-11 w-11 place-items-center rounded-full ${
              pressed ? "scale-95 transition-none" : "transition-transform duration-150"
            }`}
            style={{ touchAction: "manipulation", color: "rgb(var(--text))" }}
            {...handlers}
          >
            <Menu className="h-[18px] w-[18px]" aria-hidden />
          </button>
        </div>
      </div>
    </header>
  );
}
