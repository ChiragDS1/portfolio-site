"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { identity, navSections } from "@/data/resume";
import { ThemeToggle } from "./ThemeToggle";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("home");

  // Scroll-spy: highlight the section currently in view.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    navSections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/80 backdrop-blur-md">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-content items-center justify-between px-5 sm:px-6"
      >
        <a
          href="#home"
          className="font-mono text-sm font-medium tracking-tight text-text"
          onClick={() => setOpen(false)}
        >
          <span className="text-accent">~/</span>
          {identity.name.split(" ")[0].toLowerCase()}
          <span className="text-muted">.shinde</span>
        </a>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          <ul className="flex items-center gap-1">
            {navSections.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={active === id ? "true" : undefined}
                  className={`inline-flex min-h-11 items-center rounded-md px-3 text-sm transition-colors ${
                    active === id ? "text-accent" : "text-muted hover:text-text"
                  }`}
                >
                  <span className="font-mono text-[0.7rem] text-muted" aria-hidden>
                    {String(navSections.findIndex((s) => s.id === id) + 1).padStart(2, "0")}.
                  </span>
                  <span className="ml-1.5">{label}</span>
                </a>
              </li>
            ))}
          </ul>
          <div className="ml-2">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 place-items-center rounded-md border border-line bg-surface text-muted"
          >
            {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div id="mobile-menu" className="border-t border-line bg-bg md:hidden">
          <ul className="mx-auto flex max-w-content flex-col px-3 py-2">
            {navSections.map(({ id, label }) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === id ? "true" : undefined}
                  className={`flex min-h-12 items-center rounded-md px-3 text-base ${
                    active === id ? "text-accent" : "text-text"
                  }`}
                >
                  <span className="font-mono text-xs text-muted" aria-hidden>
                    {String(navSections.findIndex((s) => s.id === id) + 1).padStart(2, "0")}.
                  </span>
                  <span className="ml-2">{label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
