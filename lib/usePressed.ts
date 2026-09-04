"use client";

import { useCallback, useState } from "react";

/**
 * Apple HIG "Response" (§1): interactive elements should show feedback on
 * touch-DOWN, not touch-up/release. CSS `:active` is unreliable on iOS Safari
 * (it often needs a touch listener present to even activate, and still lags),
 * so the pressed state is tracked explicitly via Pointer Events, which fire
 * immediately — and identically — for touch, mouse and pen.
 */
export function usePressed() {
  const [pressed, setPressed] = useState(false);
  const onPointerDown = useCallback(() => setPressed(true), []);
  const release = useCallback(() => setPressed(false), []);

  return {
    pressed,
    handlers: {
      onPointerDown,
      onPointerUp: release,
      onPointerLeave: release,
      onPointerCancel: release,
    },
  };
}
