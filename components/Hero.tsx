"use client";

import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { identity } from "@/data/resume";
import { heroItem, heroStagger } from "@/lib/motion";
import { GridBackdrop } from "./GridBackdrop";
import { PipelineFlow } from "./PipelineFlow";
import { ResumeMenu } from "./ResumeMenu";

export function Hero() {
  return (
    <section id="home" aria-label="Introduction" className="relative overflow-hidden">
      <GridBackdrop />
      <div className="section-wrap flex min-h-[calc(100svh-4rem)] flex-col justify-center py-20">
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
            className="mt-4 max-w-xl text-lg leading-relaxed text-muted"
          >
            {identity.tagline}
          </motion.p>

          <motion.div variants={heroItem} className="mt-10">
            <PipelineFlow />
          </motion.div>

          <motion.div
            variants={heroItem}
            className="mt-10 flex flex-wrap items-center gap-3"
          >
            <ResumeMenu />
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
          className="mono-label mt-16 inline-flex items-center gap-2 text-muted transition-colors hover:text-text"
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
