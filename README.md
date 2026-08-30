# Chirag Shinde — Portfolio

A single-page portfolio built around one coherent identity: **Data Engineer &
Data Scientist** — data engineering as the foundation, data science / ML as the
specialization built on top. The hero's signature element is an animated
**Pipeline → Feature → Model → Insight** flow.

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** — "Iris" design tokens in `app/globals.css` / `tailwind.config.ts`
- **Framer Motion** — one orchestrated choreography (hero load → pipeline draw →
  stat count-ups → scroll reveals); fully respects `prefers-reduced-motion`
- All copy lives in **`data/resume.ts`** (typed) — edit text without touching components
- **Fully static export** (`output: "export"` → `out/`), auto-deployed to **GitHub
  Pages** on every push to `main` — see "Hosting on GitHub Pages" below

---

## Quick start

```bash
npm install       # also generates placeholder résumé PDFs if missing
npm run dev        # http://localhost:3000
npm run build      # static site -> ./out
npm run lint
```

Node 18.18+ (Node 20+ recommended).

---

## Design system — "Iris"

| Token | Dark | Light | Used for |
| --- | --- | --- | --- |
| `bg` | `#0B0D17` | `#F4F4F9` | deep indigo-ink / cool paper |
| `surface` | `#141826` | `#FFFFFF` | panels, cards |
| `line` | `#242A42` | `#E0E1EC` | hairline borders |
| `text` | `#EDEEF7` | `#14162A` | body |
| `muted` | `#9CA0BF` | `#585E7E` | metadata, mono labels |
| `accent` (iris) | `#8B7CF6` | `#5B45D9` | the pipeline flow, focus rings, primary CTA |
| `accent-2` (gold) | `#F5B049` | `#9A5F09` | the "Insight" stage + the stat numbers, nowhere else |

Type: **Bricolage Grotesque** (display) · **IBM Plex Sans** (body) · **IBM Plex
Mono** (section indices, tech chips, stat suffixes) — all self-hosted via `next/font`.

Discipline rule: `accent` and `accent-2` appear only where listed above. Everything
else is hairline borders, `surface` panels, and monospace labels.

---

## Editing content

Everything the site displays comes from **`data/resume.ts`**:

| Change… | Edit |
| --- | --- |
| Name / role / tagline / links | `identity` |
| Hero profile paragraph | `profile` (unused on page directly — see `about`) |
| About section paragraphs | `about` |
| The 4 pipeline stages | `pipelineStages` |
| Stat-bar numbers | `stats` (`value`, `suffix`, `trend`) |
| Core Technologies strip | `coreTech` |
| Skill groups & items | `skillGroups` (rendered in array order) |
| Jobs, titles, bullets | `experience` |
| Projects, tags, links | `projects` |
| Education / certifications | `education`, `certifications` |
| Résumé menu options | `resumeVariants` |
| Nav items | `navSections` |

### Core Technologies icons

Brand logos come from `simple-icons` (a **devDependency**). The ~15 paths we
actually use are baked into `data/techIcons.ts` so `simple-icons` never ships to
the browser. To change the set: edit `WANT` in `scripts/gen-tech-icons.mjs`, then
`npm run gen:icons`. Tools with no brand mark (Azure Data Factory, Delta Lake,
Power BI) fall back to a generic `lucide-react` icon — see `FALLBACK` in
`components/CoreTech.tsx`.

### Still using placeholders — replace before launch

- `identity.githubUrl` → your real GitHub profile URL
- `projects[].links` → real GitHub / live-demo URLs (delete entries you don't have)
- `public/og.png` → generate from `public/og.svg` (see below)

The public URL is configured in **one place**: `next.config.mjs` (`REPO_SUBPATH`)
and `lib/site.ts` (`SITE_ORIGIN`). See "Hosting on GitHub Pages" below.

The three résumé PDFs in `public/resume/` are your real files. Note they contain
your phone number — swap in phone-free variants (same filenames) if you'd rather
the hosted copies didn't.

---

## Résumé PDFs

Three files in **`public/resume/`**, named exactly:

```
Chirag_Shinde_DataEngineer.pdf
Chirag_Shinde_DataAnalyst.pdf
Chirag_Shinde_DataScientist.pdf
```

`npm install` runs `scripts/make-placeholder-pdfs.mjs`, which only creates a
placeholder for a **missing** name — it never overwrites an existing file. The
hero "Download résumé" button opens a keyboard-operable menu linking all three.

---

## Favicon & OG image

**Favicon** — `app/icon.svg` is included (a node-graph glyph in the iris accent);
Next.js serves it automatically. For the classic `favicon.ico` / Apple touch icon:

1. Export a 512×512 PNG from `app/icon.svg` or `public/og.svg`.
2. Run it through <https://realfavicongenerator.net>.
3. Put the generated `favicon.ico` and `apple-icon.png` in `app/` — Next picks
   them up by filename, no code change.

**OG / social image** — metadata points to `/og.png` (1200×630). Template at
**`public/og.svg`**. Generate the PNG once:

```bash
npx svgexport public/og.svg public/og.png 1200:630
#  – or – open public/og.svg in a browser / Figma, export at 1200×630
#  – or – https://cloudconvert.com/svg-to-png
```

Save as `public/og.png`. Until then the site works fine; only the link-preview
image is missing.

---

## Hosting on GitHub Pages

The site is a **static export** (`output: "export"` → `./out`) and auto-deploys to
GitHub Pages via GitHub Actions.

**Live URL:** `https://chiragds1.github.io/portfolio-site/`
*(GitHub redirects the mixed-case `ChiragDS1` form to lower-case.)*

### Nothing server-side had to be removed

This project never used server-only features, so making static export work was
purely config:

| Feature | Status |
| --- | --- |
| API routes (`app/api/**`) | none — nothing to convert |
| Server Actions / `use server` | none |
| Dynamic server components (`cookies()`, `headers()`, `fetch` with revalidate) | none — `layout.tsx` / `page.tsx` are fully static |
| `next/image` optimization | not used; `images.unoptimized: true` is set anyway (all imagery is inline SVG) |
| `app/robots.ts`, `app/sitemap.ts` | already `export const dynamic = "force-static"` — emitted as static `robots.txt` / `sitemap.xml` at build |
| `next/font` | fine — self-hosted at build, base-path aware |

The only code that changed for the **subpath** (`/portfolio-site`):

- **`next.config.mjs`** — added `basePath` + `env.NEXT_PUBLIC_BASE_PATH`, driven by
  the single constant `REPO_SUBPATH`.
- **`lib/site.ts`** (new) — `BASE_PATH`, `SITE_URL`, and `withBasePath()` helper.
- **`components/ResumeMenu.tsx`** — résumé PDF links now go through
  `withBasePath("/resume/…")` (plain `<a href>` to `/public` is *not*
  auto-prefixed by Next; `_next` assets, fonts and the favicon *are*).
- **`app/layout.tsx`, `app/robots.ts`, `app/sitemap.ts`** — canonical / Open Graph
  / sitemap URLs are built from `SITE_URL` (origin + base path) instead of a
  hardcoded domain.

### One-time repo setup

1. Create the repo and push:
   ```bash
   git init && git add -A && git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/ChiragDS1/portfolio-site.git
   git push -u origin main
   ```
2. On GitHub: **Settings → Pages → Build and deployment → Source → GitHub Actions**.
3. That's it. The workflow in `.github/workflows/deploy.yml` runs on the push and
   every push after: checkout → Node 20 → `npm ci` → `npm run build` →
   `touch out/.nojekyll` → upload artifact → deploy. Watch it under the **Actions** tab.

### Test the static export locally before pushing

```bash
npm run build      # NODE_ENV=production → basePath "/portfolio-site" is applied
```

`out/` now contains the site with every asset under `/portfolio-site/…`. To preview
it exactly as GitHub Pages will serve it (from a subpath), put `out/` inside a
folder named `portfolio-site` and serve the parent:

```bash
mkdir -p _preview/portfolio-site && cp -r out/. _preview/portfolio-site/
npx serve _preview        # then open http://localhost:3000/portfolio-site/
```

`npm run dev` stays at `http://localhost:3000/` with **no** base path (dev only).

### Switching to a custom domain later

Served from the domain root, so the subpath goes away. In order:

1. **Remove the base path** — in `next.config.mjs` set `REPO_SUBPATH = ""`.
2. **Point the metadata at the domain** — in `lib/site.ts` set
   `SITE_ORIGIN = "https://yourdomain.com"`.
3. **Add the `CNAME` file** — copy `public/CNAME.example` to `public/CNAME` and put
   your bare domain in it (one line, e.g. `chiragshinde.dev`). It gets copied into
   `out/` on every build.
4. **DNS at your registrar:**
   - Subdomain (e.g. `www.` or `portfolio.`): `CNAME` record →
     `chiragds1.github.io`
   - Apex/root (`yourdomain.com`): four `A` records → `185.199.108.153`,
     `185.199.109.153`, `185.199.110.153`, `185.199.111.153` (and optionally
     `AAAA` records for IPv6)
5. **GitHub:** **Settings → Pages → Custom domain** → enter the domain → save →
   tick **Enforce HTTPS** once the cert is issued.
6. `git push` — the Action redeploys with no base path and the `CNAME` in place.

---

## Motion & `prefers-reduced-motion`

One coherent choreography, not scattered hover effects:

1. **Hero load** — name → role → tagline → pipeline → CTA, staggered ~120 ms apart.
2. **Pipeline flow** (signature) — nodes stagger in, connectors draw, then an iris
   pulse loops along each connector.
3. **Stat bar** — count-ups fire on scroll-into-view (IntersectionObserver), once.
4. **Experience / Projects / Skills / About** — fade + slight rise, staggered, once.
5. **Project cards** — a restrained 4 px lift + border tint on hover.
6. **Nav** — smooth-scroll to anchors + active-section highlight.

When the visitor requests reduced motion, `<MotionConfig reducedMotion="user">`
disables transform/layout/stagger animation, the CSS media query neutralizes
`scroll-behavior` and all `@keyframes`, `CountUp` renders its final value
immediately, and the connector flow-pulse is not rendered at all. Verified: with
`prefers-reduced-motion: reduce` every section renders fully at its final state
with no animation.

---

## Performance & accessibility

Verified with `axe-core` (WCAG 2.0/2.1 A + AA): **0 violations**. Also handled:

- **No layout shift** — stat count-ups use `tabular-nums` with fixed digit counts;
  pipeline cards are equal-height via flexbox; revealed content occupies its space
  from first paint (opacity-only animation).
- **Keyboard** — résumé menu is a full ARIA menu (Enter/Space/↓ open, ↑/↓/Home/End
  move, Esc closes and restores focus, click-outside closes); nav and theme toggle
  are standard buttons/links; focus rings are never removed.
- **Landmarks** — `header` / `nav[aria-label]` / `main` / `footer`, every `section`
  labelled, skip link.
- **Contrast** — every text/background pair ≥ 4.5:1 in both themes (`accent-2` on
  light paper is only used at large bold sizes, where ≥ 3:1 applies and it clears
  4.5:1 anyway).
- **Fonts** — `next/font` self-hosts all three families, `display: swap`, no
  render-blocking request.
- **No raster images** ship — hero grid, favicon and tech logos are inline SVG.
- **Theme flash** — inline pre-paint script sets the theme class.
- **No-JS** — a `<noscript>` rule un-hides every `[data-reveal]` element so scroll
  content is never stuck invisible.
- **SEO** — per-page metadata, OpenGraph/Twitter, JSON-LD `Person`, `robots.txt`,
  `sitemap.xml`.

### Things that could move Lighthouse scores — watch for these

- **Missing `public/og.png`** → "best practices" flags an invalid OG image URL.
  Generate it (above). This is the one outstanding item.
- **`robots.txt` lives at the subpath** (`/portfolio-site/robots.txt`) — a GitHub
  Pages *project site* can't put files at the domain root, so crawlers checking
  `chiragds1.github.io/robots.txt` won't find it. The sitemap URL inside is
  absolute and correct, and moving to a custom domain (served from root) fixes
  this automatically. Not a Lighthouse issue, just an SEO note.
- **Framer Motion is ~40 kB gzipped** of the ~151 kB First Load JS — the single
  biggest JS cost and it drives Total Blocking Time. Acceptable for a portfolio;
  if you want a greener score, the scroll `Reveal` / count-ups could be rebuilt on
  a raw `IntersectionObserver` + CSS keyframes and Framer kept only for the hero
  and pipeline.
- **Hero entrance is JS-gated** — with JS, the hero fades in over ~0.7 s, so the
  LCP element (the `<h1>`) paints slightly later than a static page would. Still
  well within budget for SSG; if you want the fastest possible LCP, drop the hero
  stagger and keep only the pipeline animation.
- **Bricolage Grotesque** is a variable font (~40 kB woff2 subset). Fine, but it's
  the largest single font file — swap for a static weight if you want to trim.
- Adding analytics / a form backend later: load via `next/script`
  `strategy="afterInteractive"` to protect TBT.

---

## Project structure

```
.github/workflows/
  deploy.yml        build static export + deploy to GitHub Pages on push to main
app/
  layout.tsx        metadata (base-path aware), fonts, theme-init, JSON-LD, no-JS net
  page.tsx          renders <Portfolio/>
  globals.css       "Iris" tokens + base styles
  icon.svg          favicon
  robots.ts  sitemap.ts   static robots.txt / sitemap.xml, URLs from lib/site.ts
components/
  Portfolio.tsx     section order + <MotionConfig reducedMotion="user">
  Nav.tsx           sticky nav, scroll-spy, mobile menu
  Hero.tsx          staggered load: name / role / tagline / PipelineFlow / ResumeMenu
  PipelineFlow.tsx  ← signature element (Pipeline → Feature → Model → Insight)
  StatBar.tsx  CountUp.tsx     scroll-triggered count-ups
  CoreTech.tsx      brand-logo strip (DE / DS), monochrome
  ResumeMenu.tsx    accessible résumé-download menu
  About.tsx  Experience.tsx  Projects.tsx  Skills.tsx  Education.tsx  Contact.tsx
  ThemeToggle.tsx  Reveal.tsx  SectionHeading.tsx  GridBackdrop.tsx
data/
  resume.ts         ← all content lives here
  techIcons.ts      generated brand SVG paths (npm run gen:icons)
lib/
  motion.ts         shared motion vocabulary
  site.ts           BASE_PATH / SITE_URL / withBasePath()  ← subpath lives here
next.config.mjs     REPO_SUBPATH constant  ← the one place to blank for a custom domain
public/
  resume/*.pdf      résumé variants
  og.svg            OG image template
  CNAME.example     copy to public/CNAME when moving to a custom domain
  .nojekyll         stops GitHub Pages' Jekyll from hiding _next/
scripts/
  make-placeholder-pdfs.mjs   (postinstall)
  gen-tech-icons.mjs          (npm run gen:icons)
```
