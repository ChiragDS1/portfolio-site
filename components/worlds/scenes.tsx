"use client";

import { useIsCompact, useSceneActive } from "@/lib/useSceneActive";

/* ==================================================================
   Decorative background scenes for the two experience worlds.
   Both are pure SVG with a viewBox, aria-hidden, and pause when the
   world is off-screen or the tab is hidden.
   ================================================================== */

/**
 * Bank of America: a transaction ticker over a faint candlestick chart.
 * Teal candles rise, amber ones fall — the same two colours the pipeline row
 * and the alert marker use, so the world reads as one place.
 */
export function FinanceScene() {
  const { ref, active } = useSceneActive<HTMLDivElement>();
  const compact = useIsCompact();

  const ticker = "AML ✓   TX/s 58.2K   FRAUD p=0.02   LATENCY 140ms   ";
  const candles = compact ? 18 : 34;

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* ticker strip */}
      {/* Pinned to the world's top edge. The content below is bounded by the
          section's top padding, so the two can never meet. */}
      <div className="absolute inset-x-0 top-0 overflow-hidden">
        <div
          className={`flex w-max whitespace-nowrap font-mono text-[0.75rem] tracking-[0.18em] ${
            active ? "motion-safe:animate-ticker" : ""
          }`}
          style={{ color: "rgb(var(--muted))" }}
        >
          {/* duplicated so the -50% translate loops seamlessly */}
          <span>{ticker.repeat(8)}</span>
          <span>{ticker.repeat(8)}</span>
        </div>
      </div>

      {/* candlesticks */}
      <svg
        viewBox="0 0 400 120"
        preserveAspectRatio="none"
        className="absolute inset-x-0 top-1/2 h-[34%] w-full -translate-y-1/2 opacity-[0.5]"
        fill="none"
      >
        {Array.from({ length: candles }).map((_, i) => {
          // Deterministic pseudo-random so server and client agree.
          const seed = (i * 9301 + 49297) % 233280;
          const r = seed / 233280;
          const r2 = ((i * 4621 + 1033) % 2311) / 2311;
          const up = r > 0.45;
          const x = (i + 0.5) * (400 / candles);
          const h = 14 + r2 * 44;
          const y = 60 - h / 2 + (r - 0.5) * 26;
          const stroke = up ? "rgb(var(--w-accent))" : "rgb(var(--w-alert))";
          return (
            <g key={i} stroke={stroke} strokeWidth="1.5" opacity="0.5">
              <line x1={x} y1={y - 7} x2={x} y2={y + h + 7} />
              <rect
                x={x - 2.6}
                y={y}
                width="5.2"
                height={h}
                fill={stroke}
                fillOpacity="0.28"
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/**
 * Accenture: an ECG trace sweeping across, faint medical crosses, and a DNA
 * helix outline. Mint throughout — the world's single accent.
 */
export function HealthScene() {
  const { ref, active } = useSceneActive<HTMLDivElement>();
  const compact = useIsCompact();
  const crosses = compact ? 4 : 9;

  // One repeating ECG period, tiled across the viewBox.
  const beat = "l 14 0 l 4 -16 l 5 30 l 5 -22 l 4 8 l 16 0";
  let ecg = "M 0 60";
  for (let i = 0; i < 9; i++) ecg += ` ${beat}`;

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <svg
        viewBox="0 0 440 120"
        preserveAspectRatio="none"
        className="absolute inset-x-0 top-1/2 h-[38%] w-full -translate-y-1/2"
        fill="none"
      >
        <path
          d={ecg}
          stroke="rgb(var(--w-accent) / 0.55)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray="1200"
          className={active ? "motion-safe:animate-ecg-sweep" : ""}
        />
      </svg>

      {/* medical crosses */}
      <svg viewBox="0 0 400 200" className="absolute inset-0 h-full w-full opacity-[0.35]" fill="none">
        {Array.from({ length: crosses }).map((_, i) => {
          const x = 26 + ((i * 97) % 350);
          const y = 22 + ((i * 61) % 160);
          const s = 5 + (i % 3) * 2;
          return (
            <g key={i} stroke="rgb(var(--w-accent) / 0.5)" strokeWidth="1.4" strokeLinecap="round">
              <line x1={x - s} y1={y} x2={x + s} y2={y} />
              <line x1={x} y1={y - s} x2={x} y2={y + s} />
            </g>
          );
        })}
      </svg>

      {/* DNA helix outline */}
      <svg
        viewBox="0 0 120 220"
        className="absolute right-[6%] top-1/2 h-[62%] w-auto -translate-y-1/2 opacity-[0.3]"
        fill="none"
      >
        <path
          d="M 30 0 C 90 36 90 74 30 110 C -30 146 -30 184 30 220"
          stroke="rgb(var(--w-accent) / 0.6)"
          strokeWidth="1.5"
        />
        <path
          d="M 90 0 C 30 36 30 74 90 110 C 150 146 150 184 90 220"
          stroke="rgb(var(--w-accent) / 0.6)"
          strokeWidth="1.5"
        />
        {Array.from({ length: 9 }).map((_, i) => {
          const y = 12 + i * 24;
          const t = Math.sin((i / 9) * Math.PI * 2);
          return (
            <line
              key={i}
              x1={60 - t * 26}
              y1={y}
              x2={60 + t * 26}
              y2={y}
              stroke="rgb(var(--w-accent) / 0.45)"
              strokeWidth="1.2"
            />
          );
        })}
      </svg>
    </div>
  );
}
