"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Download, FileText } from "lucide-react";
import { resumeVariants } from "@/data/resume";

/**
 * Secondary CTA. A button that opens a small menu of the three tailored résumé
 * PDFs. Full keyboard support: Enter/Space/↓ opens, ↑/↓/Home/End move, Esc
 * closes and restores focus, click-outside closes, Tab closes.
 */
export function ResumeMenu() {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const btnRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const reduced = useReducedMotion();

  function close(restoreFocus = true) {
    setOpen(false);
    if (restoreFocus) btnRef.current?.focus();
  }

  function openMenu(focusIndex: number) {
    setOpen(true);
    requestAnimationFrame(() => itemRefs.current[focusIndex]?.focus());
  }

  // Close on outside click.
  useEffect(() => {
    if (!open) return;
    function onDown(e: MouseEvent) {
      if (
        !btnRef.current?.contains(e.target as Node) &&
        !document.getElementById(menuId)?.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open, menuId]);

  function onButtonKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openMenu(0);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      openMenu(resumeVariants.length - 1);
    }
  }

  function onMenuKeyDown(e: React.KeyboardEvent, index: number) {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        itemRefs.current[(index + 1) % resumeVariants.length]?.focus();
        break;
      case "ArrowUp":
        e.preventDefault();
        itemRefs.current[(index - 1 + resumeVariants.length) % resumeVariants.length]?.focus();
        break;
      case "Home":
        e.preventDefault();
        itemRefs.current[0]?.focus();
        break;
      case "End":
        e.preventDefault();
        itemRefs.current[resumeVariants.length - 1]?.focus();
        break;
      case "Escape":
        e.preventDefault();
        close();
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  }

  return (
    <div className="relative inline-block">
      <button
        ref={btnRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        onClick={() => (open ? close(false) : openMenu(0))}
        onKeyDown={onButtonKeyDown}
        className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-line bg-surface px-4 py-2.5 text-sm font-medium text-text transition-colors hover:border-accent/60"
      >
        <Download className="h-4 w-4 text-accent" aria-hidden />
        Download résumé
        <ChevronDown
          className={`h-4 w-4 text-muted transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            id={menuId}
            role="menu"
            aria-label="Résumé versions"
            initial={reduced ? { opacity: 0 } : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: 0.16 }}
            className="absolute left-0 z-20 mt-2 w-60 overflow-hidden rounded-lg border border-line bg-surface p-1 shadow-xl shadow-black/20"
          >
            {resumeVariants.map((variant, i) => (
              <li key={variant.id} role="none">
                <a
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  role="menuitem"
                  href={variant.href}
                  download
                  tabIndex={-1}
                  onKeyDown={(e) => onMenuKeyDown(e, i)}
                  onClick={() => setOpen(false)}
                  className="flex min-h-11 items-center gap-2.5 rounded-md px-3 py-2 text-sm text-text hover:bg-accent/10 focus-visible:bg-accent/10"
                >
                  <FileText className="h-4 w-4 shrink-0 text-muted" aria-hidden />
                  <span>{variant.label}</span>
                  <span className="ml-auto font-mono text-[0.65rem] uppercase text-muted">
                    {variant.id}
                  </span>
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
