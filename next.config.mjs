/**
 * Static export for GitHub Pages.
 *
 * ── The site currently lives at a SUBPATH ────────────────────────────────
 *   https://ChiragDS1.github.io/portfolio-site/
 * so every asset, script, stylesheet and link is prefixed with `basePath`.
 *
 * ── Moving to a custom domain later ─────────────────────────────────────
 * When you point a custom domain at the repo the site is served from the
 * domain ROOT, so the subpath must go away. That is a ONE-LINE change:
 *   set  REPO_SUBPATH = ""   below.
 * Nothing else in the codebase hardcodes the subpath — app code reads it via
 * process.env.NEXT_PUBLIC_BASE_PATH (see lib/site.ts).
 * Full steps: README → "Switching to a custom domain later".
 */

// The ONLY place the GitHub Pages subpath is configured. Set to "" for a custom domain.
const REPO_SUBPATH = "/portfolio-site";

// basePath is only applied to production builds, so `npm run dev` stays at "/".
const basePath = process.env.NODE_ENV === "production" ? REPO_SUBPATH : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // GitHub Pages only serves static files — emit plain HTML/CSS/JS to ./out
  output: "export",

  // GitHub Pages can't run Next's image optimizer.
  images: { unoptimized: true },

  // Prefixes _next assets, fonts, and Next-managed links with the subpath.
  basePath,

  // Exposed to both server and client bundles so app code (lib/site.ts) can
  // build correct URLs for things Next does NOT auto-prefix — e.g. <a href>
  // to files in /public such as the résumé PDFs.
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },

  reactStrictMode: true,

  // Directory-style URLs (foo/index.html) — avoids redirect quirks on GitHub Pages.
  trailingSlash: true,
};

export default nextConfig;
