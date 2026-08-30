import type { Variants } from "framer-motion";

/**
 * Shared motion vocabulary — one coherent choreography, not scattered effects.
 *
 * `<MotionConfig reducedMotion="user">` in components/Portfolio.tsx makes Framer
 * Motion drop transform / layout / opacity animation entirely when the visitor
 * has `prefers-reduced-motion: reduce`. Non-Framer motion (the CountUp counter,
 * the SVG flow loop) is gated separately with `useReducedMotion()`.
 */

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/* Hero load sequence — name → tagline → pipeline → résumé button */
export const heroStagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

export const heroItem: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
};

/* Pipeline diagram — nodes stagger, then connectors draw */
export const flowStagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.15 } },
};

export const flowNode: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: EASE_OUT } },
};

/* Scroll-in reveal for section content — once per item */
export const reveal: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
};

export const revealStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

export const scrollViewport = { once: true, margin: "0px 0px -12% 0px" } as const;
