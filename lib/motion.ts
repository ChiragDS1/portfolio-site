import type { Transition, Variants } from "framer-motion";

/**
 * Motion vocabulary, following Apple's damping/response model.
 *
 * House default is critically damped (`bounce: 0`) — overshoot on something
 * that merely faded in reads as noise. Bounce is reserved for the one gesture
 * that carries momentum: the bubble zoom.
 */

/** Default UI spring: no overshoot, ~0.35s response. */
export const spring: Transition = { type: "spring", bounce: 0, duration: 0.35 };

/** Slightly slower sibling for larger surfaces (menu overlay, switcher list). */
export const springSoft: Transition = { type: "spring", bounce: 0, duration: 0.4 };

/** The single momentum-carrying motion on the site: zooming into a bubble. */
export const springBubble: Transition = { type: "spring", bounce: 0.18, duration: 0.4 };

/** Backdrop palette cross-fade — the "you've entered a new place" beat. */
export const worldFade: Transition = { duration: 0.6, ease: [0.22, 1, 0.36, 1] };

export const reveal: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
};

export const revealStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
};

export const scrollViewport = { once: true, margin: "0px 0px -12% 0px" } as const;
