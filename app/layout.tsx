import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { identity } from "@/data/resume";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-plex-sans",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-plex-mono",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-bricolage",
});

// TODO: set this to your real domain before deploying.
const SITE_URL = "https://chiragshinde.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${identity.name} — ${identity.role}`,
    template: `%s — ${identity.name}`,
  },
  description:
    "Portfolio of Chirag Deepak Shinde, Data Engineer & Data Scientist. I build the pipelines that make machine learning possible — from ingestion and medallion architecture to forecasting and NLP models.",
  keywords: [
    "Data Engineer",
    "Data Scientist",
    "ETL",
    "Azure Data Factory",
    "Databricks",
    "PySpark",
    "Snowflake",
    "Machine Learning",
    "MLOps",
    "Chicago",
  ],
  authors: [{ name: identity.name }],
  creator: identity.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: `${identity.name} — ${identity.role}`,
    description:
      "I build the pipelines that make machine learning possible. Data engineering as the foundation, data science as the specialization.",
    siteName: `${identity.name} — Portfolio`,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: `${identity.name} portfolio` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${identity.name} — ${identity.role}`,
    description:
      "I build the pipelines that make machine learning possible. Data engineering as the foundation, data science as the specialization.",
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0B0D17" },
    { media: "(prefers-color-scheme: light)", color: "#F4F4F9" },
  ],
  width: "device-width",
  initialScale: 1,
};

const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;
    var theme = stored || (prefersLight ? 'light' : 'dark');
    if (theme === 'dark') document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  } catch (e) {
    document.documentElement.classList.add('dark');
  }
})();
`;

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: identity.name,
  jobTitle: identity.role,
  email: `mailto:${identity.email}`,
  url: SITE_URL,
  address: { "@type": "PostalAddress", addressLocality: "Chicago", addressRegion: "IL" },
  sameAs: [identity.linkedinUrl],
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "University of Illinois at Chicago" },
    { "@type": "CollegeOrUniversity", name: "Savitribai Phule Pune University" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${plexSans.variable} ${plexMono.variable} ${bricolage.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        {/* If JS is disabled, don't leave scroll-reveal content stuck invisible. */}
        <noscript>
          <style>{`[data-reveal],[data-reveal] *{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-surface focus:px-4 focus:py-2 focus:text-sm focus:ring-2 focus:ring-accent"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
