"use client";

import { forwardRef, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { identity, navSections } from "@/data/resume";
import { usePressed } from "@/lib/usePressed";
import { ThemeToggle } from "./ThemeToggle";

/**
 * Responsive nav. ≥1024px (`lg`): the inline row. Below that: a hamburger that
 * opens a translucent slide-in panel (Apple HIG "Materials" §12 — backdrop-blur
 * over a dimmed, blurred backdrop). Escape / outside-tap / a link tap all close
 * it; focus returns to the trigger button ("Spatial consistency" §7: the panel
 * enters from the right and exits back the same way — never a fade mismatch).
 *
 * `open` starts `false` on both server and client and the panel is only ever
 * mounted while `open`, so none of this — including `useReducedMotion()` below
 * — can produce a hydration mismatch (see PipelineFlow.tsx for the pattern to
 * avoid: branching *always-rendered* output on a value that differs server vs
 * client).
 */
export function Nav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("home");
  const [mounted, setMounted] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const reduced = useReducedMotion();

  // `document.body` (the portal target below) doesn't exist during SSR, and
  // `open` is always false there anyway — this just avoids touching `document`
  // before the client has mounted.
  useEffect(() => setMounted(true), []);

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

  // While the panel is open: Escape closes it, and the page behind can't scroll.
  useEffect(() => {
    if (!open) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.documentElement.style.overflow = prevOverflow;
    };
  }, [open]);

  function close() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  // Same path in both directions — slides in from the right, slides back out to
  // the right. Reduced motion drops the slide for a simple cross-fade.
  const panelVariants = reduced
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : { hidden: { x: "100%" }, visible: { x: 0 } };
  const panelTransition = reduced
    ? { duration: 0.15 }
    : { type: "spring" as const, stiffness: 380, damping: 34 };

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/70 backdrop-blur-md">
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

        {/* Desktop links — 1024px and up. Below that the row has no room to
            breathe (6 items + index numbers + theme toggle overflow their box
            around 768–900px), so it collapses to the hamburger instead. */}
        <div className="hidden items-center gap-1 lg:flex">
          <ul className="flex items-center gap-1">
            {navSections.map(({ id, label }, i) => (
              <li key={id}>
                <NavLink
                  href={`#${id}`}
                  active={active === id}
                  index={i}
                  label={label}
                  className="min-h-11 rounded-md px-3 text-sm"
                />
              </li>
            ))}
          </ul>
          <div className="ml-2">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile / tablet controls — below 1024px */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <IconButton
            ref={triggerRef}
            label={open ? "Close menu" : "Open menu"}
            expanded={open}
            controls={panelId}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
          </IconButton>
        </div>
      </nav>

      {/*
        Portaled to <body>: `<header>` has `backdrop-blur-md` (a `backdrop-filter`),
        which — like `filter`/`transform` — makes it a *containing block* for its
        own `position: fixed` descendants. Left inside `<header>`, `inset-0` would
        resolve against the header's own 64px box, not the viewport, collapsing
        the backdrop/panel to a 64px sliver (confirmed: their content still
        rendered, unclipped, over the page — just not where a tap could reach the
        real backdrop). Portaling sidesteps that entirely.
      */}
      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <>
                {/* Backdrop — dims and blurs the page behind the panel; tapping it closes. */}
                <motion.div
                  className="fixed inset-0 z-40 bg-bg/60 backdrop-blur-sm lg:hidden"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduced ? 0.15 : 0.2 }}
                  onClick={close}
                  aria-hidden
                />

                {/* Slide-in panel */}
                <motion.div
                  id={panelId}
                  role="dialog"
                  aria-modal="true"
                  aria-label="Site navigation"
                  className="fixed inset-y-0 right-0 z-50 flex w-[min(20rem,85vw)] flex-col border-l border-line bg-surface/85 shadow-2xl shadow-black/40 backdrop-blur-xl lg:hidden"
                  variants={panelVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  transition={panelTransition}
                >
                  <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-5">
                    <span className="mono-label">Menu</span>
                    <IconButton label="Close menu" onClick={close}>
                      <X className="h-5 w-5" aria-hidden />
                    </IconButton>
                  </div>
                  <ul className="flex flex-col gap-1 p-3">
                    {navSections.map(({ id, label }, i) => (
                      <li key={id}>
                        <NavLink
                          href={`#${id}`}
                          active={active === id}
                          index={i}
                          label={label}
                          large
                          onClick={close}
                          className="min-h-12 rounded-md px-3 text-base"
                        />
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </>
            )}
          </AnimatePresence>,
          document.body,
        )}
    </header>
  );
}

/** A nav link with instant, touch-down press feedback (Apple HIG "Response" §1). */
function NavLink({
  href,
  active,
  index,
  label,
  className,
  large,
  onClick,
}: {
  href: string;
  active: boolean;
  index: number;
  label: string;
  className: string;
  large?: boolean;
  onClick?: () => void;
}) {
  const { pressed, handlers } = usePressed();
  return (
    <a
      href={href}
      onClick={onClick}
      aria-current={active ? "true" : undefined}
      className={`flex items-center ${className} ${
        pressed
          ? "scale-[0.97] bg-accent/10 transition-none"
          : `transition-[background-color,color,transform] duration-150 ${active ? "text-accent" : large ? "text-text" : "text-muted hover:text-text"}`
      }`}
      style={{ touchAction: "manipulation" }}
      {...handlers}
    >
      <span className={`font-mono ${large ? "text-xs" : "text-[0.7rem]"} text-muted`} aria-hidden>
        {String(index + 1).padStart(2, "0")}.
      </span>
      <span className={large ? "ml-2" : "ml-1.5"}>{label}</span>
    </a>
  );
}

/** An icon button with instant press feedback, shared by the hamburger and the panel's close button. */
const IconButton = forwardRef<
  HTMLButtonElement,
  {
    label: string;
    expanded?: boolean;
    controls?: string;
    onClick: () => void;
    children: React.ReactNode;
  }
>(function IconButton({ label, expanded, controls, onClick, children }, ref) {
  const { pressed, handlers } = usePressed();
  return (
    <button
      ref={ref}
      type="button"
      aria-label={label}
      aria-expanded={expanded}
      aria-controls={controls}
      onClick={onClick}
      className={`grid h-11 w-11 place-items-center rounded-md border border-line text-muted ${
        pressed
          ? "scale-90 bg-accent/15 text-accent transition-none"
          : "bg-surface transition-[background-color,transform] duration-150"
      }`}
      style={{ touchAction: "manipulation" }}
      {...handlers}
    >
      {children}
    </button>
  );
});
