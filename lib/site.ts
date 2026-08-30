/**
 * Central place for "where is this site served from" logic.
 *
 * `BASE_PATH` comes from next.config.mjs (the single source of truth). When you
 * move to a custom domain, set REPO_SUBPATH = "" there and everything here
 * collapses to root-relative URLs automatically.
 */

/** "" in dev and on a custom domain; "/portfolio-site" for the GitHub Pages subpath build. */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * Origin the site is served from. Change this to your custom domain when you
 * switch (e.g. "https://chiragshinde.dev"). Used only for absolute URLs in
 * metadata (canonical, Open Graph, sitemap, robots).
 *
 * Note: GitHub Pages serves from the lower-cased username, so this is
 * chiragds1.github.io (not ChiragDS1) — GitHub redirects the mixed-case form here.
 */
export const SITE_ORIGIN = "https://chiragds1.github.io";

/** Full public URL of the site root, including any GitHub Pages subpath. */
export const SITE_URL = `${SITE_ORIGIN}${BASE_PATH}`;

/**
 * Prefix a root-relative path to a file in /public (e.g. "/resume/x.pdf") with
 * the base path. Next.js does NOT do this automatically for plain <a href> /
 * <img src>, only for <Link>, next/image, next/font and _next assets.
 */
export function withBasePath(path: string): string {
  if (!path.startsWith("/")) return path; // leave external / relative URLs alone
  return `${BASE_PATH}${path}`;
}
