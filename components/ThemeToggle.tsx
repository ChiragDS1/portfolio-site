"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { usePressed } from "@/lib/usePressed";

type Theme = "dark" | "light";

/**
 * Dark is the default regardless of system preference; this only flips to
 * light and remembers the choice. The pre-paint script in app/layout.tsx
 * applies the stored value before first render, so there's no flash.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);
  const { pressed, handlers } = usePressed();

  useEffect(() => {
    setMounted(true);
    setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* private mode — the choice just won't persist */
    }
  }

  const isDark = mounted ? theme === "dark" : true;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${isDark ? "light" : "dark"} theme`}
      className={`grid h-11 w-11 place-items-center rounded-full ${
        pressed ? "scale-95 transition-none" : "transition-transform duration-150"
      } ${className}`}
      style={{ touchAction: "manipulation", color: "rgb(var(--text))" }}
      {...handlers}
    >
      {isDark ? <Sun className="h-[18px] w-[18px]" aria-hidden /> : <Moon className="h-[18px] w-[18px]" aria-hidden />}
    </button>
  );
}
