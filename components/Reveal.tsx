"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { reveal } from "@/lib/motion";

/**
 * Subtle one-time fade-up as content scrolls into view.
 * Disabled automatically under `prefers-reduced-motion` via the parent
 * `<MotionConfig reducedMotion="user">`.
 */
export function Reveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      data-reveal
      className={className}
      variants={reveal}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
    >
      {children}
    </motion.div>
  );
}
