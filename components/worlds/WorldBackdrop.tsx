"use client";

import { motion } from "framer-motion";
import { worlds } from "@/data/resume";
import { worldFade } from "@/lib/motion";
import { useWorld } from "./WorldContext";

/**
 * The shared backdrop: one fixed layer behind everything, holding every
 * world's background colour and glows at once. Only opacity changes as the
 * reader moves between worlds, so the palette cross-fade is a compositor-only
 * animation — and it's the moment that sells "you've entered a new place".
 *
 * Each layer carries its own `data-world`, so it picks up that world's tokens
 * from globals.css rather than hardcoding colours here.
 */
export function WorldBackdrop() {
  const { active } = useWorld();

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {worlds.map((world) => (
        <motion.div
          key={world.id}
          data-world={world.id}
          className="absolute inset-0"
          initial={false}
          animate={{ opacity: active === world.id ? 1 : 0 }}
          transition={worldFade}
          style={{ backgroundColor: "rgb(var(--w-bg))" }}
        >
          <div
            className="absolute inset-0"
            style={{
              background: [
                "radial-gradient(60% 50% at 12% 12%, rgb(var(--w-glow-1) / 0.95), transparent 70%)",
                "radial-gradient(55% 45% at 88% 20%, rgb(var(--w-glow-2) / 0.9), transparent 72%)",
                "radial-gradient(70% 55% at 50% 96%, rgb(var(--w-glow-3) / 0.85), transparent 75%)",
              ].join(","),
            }}
          />
        </motion.div>
      ))}
    </div>
  );
}
