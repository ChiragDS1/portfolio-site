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
        bg: "rgb(var(--bg) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        text: "rgb(var(--text) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        "accent-2": "rgb(var(--accent-2) / <alpha-value>)",
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
        "flow-dash": { to: { strokeDashoffset: "-16" } },
        "flow-pulse": {
          "0%, 100%": { opacity: "0.25" },
          "50%": { opacity: "0.9" },
        },
      },
      animation: {
        "flow-dash": "flow-dash 1.1s linear infinite",
        "flow-pulse": "flow-pulse 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
