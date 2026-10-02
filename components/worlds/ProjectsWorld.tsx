"use client";

import { motion } from "framer-motion";
import { projects, type ProjectItem } from "@/data/resume";
import { reveal, revealStagger, scrollViewport } from "@/lib/motion";
import { useSceneActive } from "@/lib/useSceneActive";
import { ContactRow } from "../ContactRow";

export function ProjectsWorld({ headingId }: { headingId: string }) {
  return (
    <div>
      <motion.h2
        id={headingId}
        initial="hidden"
        whileInView="visible"
        viewport={scrollViewport}
        variants={reveal}
        className="font-display font-semibold tracking-[-0.03em]"
        style={{ fontSize: "clamp(1.9rem, 4vw, 2.75rem)" }}
      >
        Projects
      </motion.h2>

      <motion.ul
        variants={revealStagger}
        initial="hidden"
        whileInView="visible"
        viewport={scrollViewport}
        className="mt-6 grid gap-4 lg:grid-cols-2"
      >
        {projects.map((project) => (
          // Informational cards: no link wrapper, no hover lift, no pointer
          // cursor. The vignettes beside them are decoration, nothing more.
          <motion.li key={project.name} variants={reveal} className="glass rounded-2xl p-5 sm:p-6">
            <Vignette kind={project.vignette} />

            <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
              <h3 className="font-display text-lg font-semibold tracking-[-0.02em]">
                {project.name}
              </h3>
              <p className="mono-label whitespace-nowrap">{project.period}</p>
            </div>

            <ul className="mt-3 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-md px-2 py-0.5 font-mono text-xs"
                  style={{
                    border: "1px solid rgb(var(--text) / 0.16)",
                    color: "rgb(var(--muted))",
                  }}
                >
                  {tag}
                </li>
              ))}
            </ul>

            <ul className="mt-4 space-y-2">
              {project.summary.map((line) => (
                <li key={line} className="flex gap-2.5 text-[0.9rem] leading-[1.6]">
                  <span
                    aria-hidden
                    className="mt-[0.5em] h-1.5 w-1.5 shrink-0 rounded-full"
                    style={{ backgroundColor: "rgb(var(--w-accent) / 0.8)" }}
                  />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </motion.li>
        ))}
      </motion.ul>

      {/* Closing contact, so nobody has to scroll back to Home. */}
      <div className="glass mt-8 rounded-2xl p-5 sm:p-6">
        <h3 className="font-display text-lg font-semibold tracking-[-0.02em]">Get in touch</h3>
        <p className="mt-1 text-sm" style={{ color: "rgb(var(--muted))" }}>
          Email is the quickest way to reach me.
        </p>
        <ContactRow className="mt-4" />
      </div>
    </div>
  );
}

function Vignette({ kind }: { kind: ProjectItem["vignette"] }) {
  return kind === "rag" ? <RagVignette /> : <YouTubeVignette />;
}

/**
 * RAG: PDF pages break into chunks that drift into a vector cluster, and a
 * query line pulls the three nearest points out.
 */
function RagVignette() {
  const { ref, active } = useSceneActive<HTMLDivElement>();
  const a = "rgb(var(--w-accent))";

  return (
    <div ref={ref} aria-hidden className="overflow-hidden rounded-xl" style={{ backgroundColor: "rgb(var(--w-accent) / 0.07)" }}>
      <svg viewBox="0 0 320 110" className="h-auto w-full" fill="none">
        {/* source pages */}
        {[0, 1, 2].map((i) => (
          <rect
            key={i}
            x={14 + i * 7}
            y={26 + i * 7}
            width="38"
            height="50"
            rx="4"
            fill="rgb(var(--w-bg))"
            stroke={a}
            strokeOpacity="0.5"
          />
        ))}
        {[0, 1, 2, 3].map((i) => (
          <line
            key={i}
            x1="36"
            y1={48 + i * 8}
            x2="60"
            y2={48 + i * 8}
            stroke={a}
            strokeOpacity="0.35"
            strokeWidth="2"
            strokeLinecap="round"
          />
        ))}

        {/* chunks drifting into the cluster */}
        {CHUNKS.map((c, i) => (
          <circle
            key={i}
            cx={c.x}
            cy={c.y}
            r={c.near ? 3.4 : 2.3}
            fill={a}
            fillOpacity={c.near ? 0.95 : 0.4}
            className={active ? "motion-safe:animate-drift-in" : ""}
            style={
              {
                "--dx": `${c.dx}px`,
                "--dy": `${c.dy}px`,
                animationDelay: `${i * 0.18}s`,
              } as React.CSSProperties
            }
          />
        ))}

        {/* the query, reaching the three nearest points */}
        <circle cx="196" cy="88" r="4" fill={a} />
        {CHUNKS.filter((c) => c.near).map((c, i) => (
          <line
            key={i}
            x1="196"
            y1="88"
            x2={c.x}
            y2={c.y}
            stroke={a}
            strokeOpacity="0.6"
            strokeWidth="1.2"
            strokeDasharray="3 3"
          />
        ))}
      </svg>
    </div>
  );
}

/** Fixed layout so the server and client render identically. */
const CHUNKS = [
  { x: 180, y: 34, dx: -90, dy: 10, near: false },
  { x: 206, y: 26, dx: -110, dy: 20, near: true },
  { x: 232, y: 40, dx: -130, dy: 8, near: false },
  { x: 198, y: 52, dx: -100, dy: -4, near: true },
  { x: 228, y: 62, dx: -120, dy: -12, near: true },
  { x: 254, y: 30, dx: -140, dy: 16, near: false },
  { x: 258, y: 56, dx: -150, dy: -6, near: false },
  { x: 174, y: 60, dx: -80, dy: -14, near: false },
];

/**
 * YouTube analysis: video frames resolving into a scatter plot with a
 * regression line through it.
 */
function YouTubeVignette() {
  const { ref, active } = useSceneActive<HTMLDivElement>();
  const a = "rgb(var(--w-accent))";

  return (
    <div ref={ref} aria-hidden className="overflow-hidden rounded-xl" style={{ backgroundColor: "rgb(var(--w-accent) / 0.07)" }}>
      <svg viewBox="0 0 320 110" className="h-auto w-full" fill="none">
        {/* frame thumbnails */}
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect
              x={16}
              y={18 + i * 28}
              width="42"
              height="24"
              rx="3"
              fill="rgb(var(--w-bg))"
              stroke={a}
              strokeOpacity="0.5"
            />
            <path d={`M ${32} ${26 + i * 28} l 9 4 l -9 4 z`} fill={a} fillOpacity="0.7" />
          </g>
        ))}

        {/* axes */}
        <line x1="100" y1="92" x2="302" y2="92" stroke={a} strokeOpacity="0.35" strokeWidth="1.5" />
        <line x1="100" y1="92" x2="100" y2="14" stroke={a} strokeOpacity="0.35" strokeWidth="1.5" />

        {/* points */}
        {POINTS.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="3"
            fill={a}
            fillOpacity="0.65"
            className={active ? "motion-safe:animate-drift-in" : ""}
            style={
              {
                "--dx": `${p.dx}px`,
                "--dy": `${p.dy}px`,
                animationDelay: `${i * 0.14}s`,
              } as React.CSSProperties
            }
          />
        ))}

        {/* regression line */}
        <line
          x1="110"
          y1="80"
          x2="294"
          y2="30"
          stroke={a}
          strokeWidth="2"
          strokeLinecap="round"
          strokeOpacity="0.85"
        />
      </svg>
    </div>
  );
}

const POINTS = [
  { x: 122, y: 76, dx: -34, dy: 6 },
  { x: 142, y: 70, dx: -40, dy: 10 },
  { x: 160, y: 66, dx: -46, dy: -8 },
  { x: 182, y: 58, dx: -52, dy: 12 },
  { x: 200, y: 56, dx: -58, dy: -10 },
  { x: 222, y: 46, dx: -64, dy: 8 },
  { x: 244, y: 44, dx: -70, dy: -6 },
  { x: 262, y: 36, dx: -76, dy: 10 },
  { x: 282, y: 32, dx: -82, dy: -8 },
];
