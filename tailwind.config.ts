import type { Config } from "tailwindcss";

/**
 * "Iris" design tokens.
 * Colors are space-separated RGB channels on CSS custom properties
 * (see app/globals.css) so Tailwind's `<alpha-value>` modifiers work:
 *   bg-accent/15, text-muted/70, ring-accent/40, ...
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Shared, theme-level
        text: "rgb(var(--text) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        scrim: "rgb(var(--scrim) / <alpha-value>)",
        // Per-world — resolved from whichever [data-world] block is in scope
        "w-bg": "rgb(var(--w-bg) / <alpha-value>)",
        "w-accent": "rgb(var(--w-accent) / <alpha-value>)",
        "w-accent-text": "rgb(var(--w-accent-text) / <alpha-value>)",
        "w-alert": "rgb(var(--w-alert) / <alpha-value>)",
        "w-alert-text": "rgb(var(--w-alert-text) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-plex-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-bricolage)", "var(--font-plex-sans)", "sans-serif"],
        mono: ["var(--font-plex-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      maxWidth: {
        content: "46rem",
      },
      keyframes: {
        /* One data packet travelling a 30-unit connector rail. */
        "flow-packet": {
          "0%": { transform: "translateX(0)", opacity: "0" },
          "6%": { opacity: "0.9" },
          "44%": { opacity: "0.9" },
          "50%, 100%": { transform: "translateX(30px)", opacity: "0" },
        },
        /* Transaction ticker strip — one full width of travel. */
        ticker: { to: { transform: "translateX(-50%)" } },
        /* ECG trace sweeping across the healthcare scene. */
        "ecg-sweep": { to: { strokeDashoffset: "-1200" } },
        /* Slow ambient breathing for the hub core. */
        "core-pulse": {
          "0%, 100%": { opacity: "0.45", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.06)" },
        },
        /* Amber flagged-transaction alert blip. */
        "alert-blip": {
          "0%, 72%, 100%": { opacity: "0", transform: "scale(0.6)" },
          "78%": { opacity: "1", transform: "scale(1.15)" },
          "86%": { opacity: "0.65", transform: "scale(1)" },
        },
        "drift-in": {
          "0%": { opacity: "0", transform: "translate(var(--dx,0), var(--dy,0))" },
          "55%, 100%": { opacity: "1", transform: "translate(0,0)" },
        },
      },
      animation: {
        "flow-packet": "flow-packet 3.2s linear infinite",
        ticker: "ticker 40s linear infinite",
        "ecg-sweep": "ecg-sweep 4s linear infinite",
        "core-pulse": "core-pulse 5s ease-in-out infinite",
        "alert-blip": "alert-blip 7s ease-in-out infinite",
        "drift-in": "drift-in 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
