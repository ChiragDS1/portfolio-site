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
- Ships as a **fully static export** (`output: "export"` → `out/`)

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
- `SITE_URL` in **`app/layout.tsx`**, **`app/robots.ts`**, **`app/sitemap.ts`** → your domain
- `public/og.png` → generate from `public/og.svg` (see below)

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

## Deploy to Vercel + custom domain

### 1. Push to GitHub

```bash
git init && git add -A && git commit -m "Initial portfolio"
git branch -M main
git remote add origin git@github.com:<you>/chirag-portfolio.git
git push -u origin main
```

### 2. Import on Vercel

1. <https://vercel.com/new> → import the repo.
2. Framework preset **Next.js** (auto-detected). Leave build/output settings default.
3. Deploy → `https://<project>.vercel.app`.

### 3. Connect your domain

1. Vercel project → **Settings → Domains** → add `yourdomain.com` and `www`.
2. Set the DNS records Vercel shows at your registrar:
   - **Apex** `yourdomain.com` → `A` → `76.76.21.21`
     *(or `ALIAS`/`ANAME` → `cname.vercel-dns.com` if supported)*
   - **`www`** → `CNAME` → `cname.vercel-dns.com`
3. Wait for propagation; Vercel auto-provisions HTTPS.
4. Pick the primary domain (redirect `www` ↔ apex) in the same panel.

### 4. After the domain is live

Update `SITE_URL` in `app/layout.tsx`, `app/robots.ts`, `app/sitemap.ts` and redeploy.

> `next.config.mjs` sets `output: "export"` for a zero-runtime static site. Delete
> that line if you later want server features (ISR, server actions, dynamic OG).

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
app/
  layout.tsx        metadata, fonts, theme-init script, JSON-LD, no-JS reveal net
  page.tsx          renders <Portfolio/>
  globals.css       "Iris" tokens + base styles
  icon.svg          favicon
  robots.ts  sitemap.ts
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
public/
  resume/*.pdf      résumé variants
  og.svg            OG image template
scripts/
  make-placeholder-pdfs.mjs   (postinstall)
  gen-tech-icons.mjs          (npm run gen:icons)
```
