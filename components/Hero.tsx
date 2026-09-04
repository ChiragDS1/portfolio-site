"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { identity } from "@/data/resume";
import { heroItem, heroStagger } from "@/lib/motion";
import { GridBackdrop } from "./GridBackdrop";
import { PipelineFlow } from "./PipelineFlow";
import { ResumeButton } from "./ResumeButton";

export function Hero() {
  return (
    <section id="home" aria-label="Introduction" className="relative overflow-hidden">
      <GridBackdrop />
      {/*
        Below `lg`, height is whatever the (now-stacked) content needs — no
        forced viewport-height + centering. That combination used to leave a
        large empty gap below the CTA row before the stats bar on phones,
        because the hero's *content* was shorter than `100svh`, so the extra
        space split above/below it. Full-viewport centering is a nice effect
        with room to spare on desktop, so it's kept there (`lg:`), just with a
        spacing scale (`py-14 → lg:py-20`) instead of one fixed desktop value.
      */}
      <div className="section-wrap flex flex-col justify-start py-14 lg:min-h-[calc(100svh-4rem)] lg:justify-center lg:py-20">
        <motion.div data-reveal variants={heroStagger} initial="hidden" animate="show">
          <motion.p variants={heroItem} className="mono-label mb-4">
            {identity.location}
          </motion.p>

          <motion.h1
            variants={heroItem}
            className="font-display text-4xl font-semibold tracking-tight text-text sm:text-6xl"
          >
            {identity.name}
          </motion.h1>

          <motion.p
            variants={heroItem}
            className="mt-3 font-display text-xl font-medium text-accent sm:text-2xl"
          >
            {identity.role}
          </motion.p>

          <motion.p
            variants={heroItem}
            className="mt-4 max-w-xl text-[clamp(1rem,0.85rem+0.6vw,1.25rem)] leading-relaxed text-muted"
          >
            {identity.tagline}
          </motion.p>

          <motion.div variants={heroItem} className="mt-10">
            {/*
              At `lg` and up, break the diagram out of the ~46rem reading
              column: escape to full viewport width (the classic
              left:50%/-50vw full-bleed trick — safe here because the section
              has `overflow-hidden`), then re-center a wider, capped container
              so the 4 cards get real room instead of the 736px column's share.
            */}
            <div className="lg:relative lg:left-1/2 lg:w-screen lg:-translate-x-1/2">
              <div className="lg:mx-auto lg:max-w-5xl lg:px-6">
                <PipelineFlow />
              </div>
            </div>
          </motion.div>

          <motion.div
            variants={heroItem}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <ResumeButton />
            <div className="flex items-center gap-1">
              <IconLink href={`mailto:${identity.email}`} label="Email Chirag">
                <Mail className="h-4 w-4" aria-hidden />
              </IconLink>
              <IconLink href={identity.linkedinUrl} label="LinkedIn profile" external>
                <Linkedin className="h-4 w-4" aria-hidden />
              </IconLink>
              <IconLink href={identity.githubUrl} label="GitHub profile" external>
                <Github className="h-4 w-4" aria-hidden />
              </IconLink>
            </div>
          </motion.div>
        </motion.div>

        <a
          href="#stats"
          className="mono-label mt-8 inline-flex items-center gap-2 text-muted transition-colors hover:text-text lg:mt-16"
        >
          <ArrowDown className="h-3.5 w-3.5 motion-safe:animate-bounce" aria-hidden />
          Impact at a glance
        </a>
      </div>
    </section>
  );
}

function IconLink({
  href,
  label,
  external,
  children,
}: {
  href: string;
  label: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="grid h-11 w-11 place-items-center rounded-md text-muted transition-colors hover:text-accent"
    >
      {children}
    </a>
  );
}
