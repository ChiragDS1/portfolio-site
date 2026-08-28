"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { projects } from "@/data/resume";
import { cardHover, reveal, revealStagger, scrollViewport } from "@/lib/motion";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function Projects() {
  return (
    <section id="projects" aria-label="Projects" className="section-wrap py-16">
      <Reveal>
        <SectionHeading index="03">Projects</SectionHeading>
      </Reveal>

      <motion.ul
        variants={revealStagger}
        initial="hidden"
        whileInView="visible"
        viewport={scrollViewport}
        className="grid gap-5"
      >
        {projects.map((project) => (
          <motion.li
            key={project.name}
            data-reveal
            variants={reveal}
            whileHover={{ y: -4 }}
            transition={cardHover}
            className="rounded-xl border border-line bg-surface/60 p-5 transition-colors hover:border-accent/50"
          >
            <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
              <h3 className="font-display text-lg font-semibold text-text">{project.name}</h3>
              <p className="mono-label whitespace-nowrap">{project.period}</p>
            </div>

            <ul className="mt-3 flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <li key={tag} className="pill">
                  {tag}
                </li>
              ))}
            </ul>

            <ul className="mt-4 space-y-2">
              {project.summary.map((line) => (
                <li key={line} className="flex gap-3 text-[0.95rem] leading-relaxed text-text/90">
                  <span
                    aria-hidden
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70"
                  />
                  <span>{line}</span>
                </li>
              ))}
            </ul>

            {project.links.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-3">
                {project.links.map((link) => (
                  <a
                    key={link.href + link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent"
                  >
                    {link.kind === "github" ? (
                      <Github className="h-4 w-4" aria-hidden />
                    ) : (
                      <ExternalLink className="h-4 w-4" aria-hidden />
                    )}
                    {link.label}
                  </a>
                ))}
              </div>
            )}
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
