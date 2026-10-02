"use client";

import { techIcons } from "@/data/techIcons";
import { useIsCompact, useSceneActive } from "@/lib/useSceneActive";

/**
 * The isometric data hub: stacked platforms with a glowing core, fed by four
 * curved streams. Two streams carry an official tool mark (AWS, Databricks)
 * and one carries an "Az" badge — the point being that all of it lands on one
 * platform.
 *
 * Entirely code-drawn SVG with a `viewBox`, so it scales to any width. Packets
 * are CSS-animated and pause when the scene is off-screen or the tab is hidden.
 */
export function HubScene() {
  const { ref, active } = useSceneActive<HTMLDivElement>();
  const compact = useIsCompact();
  // Fewer packets on phones — same read, less work per frame.
  const packetsPerStream = compact ? 1 : 2;

  const streams = [
    { d: "M 20 44 C 86 44 104 104 160 112", badge: "AWS" as const },
    { d: "M 300 36 C 232 36 212 100 160 112", badge: "Databricks" as const },
    { d: "M 16 168 C 88 168 110 128 160 116", badge: "Azure" as const },
    { d: "M 304 176 C 230 176 206 130 160 116", badge: null },
  ];

  return (
    <div ref={ref} aria-hidden className="w-full">
      <svg viewBox="0 0 320 210" className="h-auto w-full" fill="none">
        <defs>
          <radialGradient id="hub-core" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgb(var(--w-accent))" stopOpacity="0.95" />
            <stop offset="100%" stopColor="rgb(var(--w-accent))" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* streams */}
        {streams.map((s, i) => (
          <g key={i}>
            <path
              d={s.d}
              stroke="rgb(var(--w-accent) / 0.35)"
              strokeWidth="1.25"
              strokeLinecap="round"
            />
            {Array.from({ length: packetsPerStream }).map((_, p) => (
              <circle key={p} r="2.2" fill="rgb(var(--w-accent))" opacity={active ? undefined : 0}>
                {active && (
                  <animateMotion
                    dur={`${3.6 + i * 0.45}s`}
                    begin={`${p * (1.8 + i * 0.2)}s`}
                    repeatCount="indefinite"
                    path={s.d}
                    keyPoints="0;1"
                    keyTimes="0;1"
                    calcMode="linear"
                  />
                )}
              </circle>
            ))}
          </g>
        ))}

        {/* stacked platforms, back to front */}
        <g>
          <Platform y={158} scale={1} opacity={0.3} />
          <Platform y={142} scale={0.86} opacity={0.45} />
          <Platform y={126} scale={0.72} opacity={0.6} />
        </g>

        {/* glowing core */}
        <circle cx="160" cy="112" r="26" fill="url(#hub-core)" className={active ? "motion-safe:animate-core-pulse" : ""} style={{ transformOrigin: "160px 112px" }} />
        <circle cx="160" cy="112" r="7" fill="rgb(var(--w-accent))" />
        <circle cx="160" cy="112" r="11.5" stroke="rgb(var(--w-accent) / 0.55)" strokeWidth="1" />

        {/* Badges ride mid-stream rather than at the entry points, which keeps
            them clear of the option bubbles layered over the scene. */}
        <ToolBadge x={105} y={88} name="AWS" />
        <ToolBadge x={215} y={82} name="Databricks" />
        <TextBadge x={100} y={143} label="Az" />
      </svg>
    </div>
  );
}

/** One isometric slab of the hub. */
function Platform({ y, scale, opacity }: { y: number; scale: number; opacity: number }) {
  const w = 86 * scale;
  const h = 26 * scale;
  return (
    <g opacity={opacity}>
      <path
        d={`M 160 ${y - h} L ${160 + w} ${y} L 160 ${y + h} L ${160 - w} ${y} Z`}
        fill="rgb(var(--w-accent) / 0.16)"
        stroke="rgb(var(--w-accent) / 0.5)"
        strokeWidth="1"
      />
    </g>
  );
}

/** A real tool mark, small, identifying a source feeding the hub. */
function ToolBadge({ x, y, name }: { x: number; y: number; name: string }) {
  const icon = techIcons[name];
  if (!icon) return null;
  return (
    <g transform={`translate(${x - 11} ${y - 11})`}>
      <rect
        width="22"
        height="22"
        rx="7"
        fill="rgb(var(--w-bg))"
        stroke="rgb(var(--w-accent) / 0.45)"
        strokeWidth="1"
      />
      <g transform="translate(4 4) scale(0.583)">
        <path d={icon.path} fill="rgb(var(--w-accent-text))" />
      </g>
    </g>
  );
}

/** Stand-in for a tool with no open-licensed mark. */
function TextBadge({ x, y, label }: { x: number; y: number; label: string }) {
  return (
    <g transform={`translate(${x - 11} ${y - 11})`}>
      <rect
        width="22"
        height="22"
        rx="7"
        fill="rgb(var(--w-bg))"
        stroke="rgb(var(--w-accent) / 0.45)"
        strokeWidth="1"
      />
      <text
        x="11"
        y="15"
        textAnchor="middle"
        className="font-mono"
        fontSize="9"
        fill="rgb(var(--w-accent-text))"
      >
        {label}
      </text>
    </g>
  );
}
