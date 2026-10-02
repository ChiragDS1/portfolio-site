"use client";

import { motion } from "framer-motion";
import { about, certifications, education } from "@/data/resume";
import { reveal, revealStagger, scrollViewport } from "@/lib/motion";
import { ToolkitGrid } from "./ToolkitGrid";

export function AboutWorld({ headingId }: { headingId: string }) {
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-12">
      <motion.div
        variants={revealStagger}
        initial="hidden"
        whileInView="visible"
        viewport={scrollViewport}
      >
        <motion.h2
          id={headingId}
          variants={reveal}
          className="font-display font-semibold tracking-[-0.03em]"
          style={{ fontSize: "clamp(1.9rem, 4vw, 2.75rem)" }}
        >
          About
        </motion.h2>

        <motion.div variants={reveal} className="glass mt-5 rounded-2xl p-5 sm:p-6">
          <div className="space-y-3.5">
            {about.map((para) => (
              <p key={para} className="text-[0.95rem] leading-[1.6]">
                {para}
              </p>
            ))}
          </div>

          <div className="mt-6 border-t pt-5" style={{ borderColor: "rgb(var(--text) / 0.12)" }}>
            <h3 className="mono-label">Education</h3>
            <ul className="mt-2.5 space-y-2.5">
              {education.map((item) => (
                <li key={item.school}>
                  <p className="text-sm font-medium">{item.school}</p>
                  <p className="text-sm" style={{ color: "rgb(var(--muted))" }}>
                    {item.degree} · {item.location} · {item.period}
                    {item.status ? ` · ${item.status}` : ""}
                  </p>
                </li>
              ))}
            </ul>

            <h3 className="mono-label mt-5">Certification</h3>
            <ul className="mt-2.5 space-y-1">
              {certifications.map((cert) => (
                <li key={cert.name}>
                  <p className="text-sm font-medium">{cert.name}</p>
                  <p className="text-sm" style={{ color: "rgb(var(--muted))" }}>
                    {cert.issuer} · {cert.date}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </motion.div>

      <div>
        <ToolkitGrid />
      </div>
    </div>
  );
}
