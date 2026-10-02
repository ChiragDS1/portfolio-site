import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { identity, profile } from "@/data/resume";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "optional",
  variable: "--font-plex-sans",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "optional",
  variable: "--font-plex-mono",
});

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  display: "optional",
  variable: "--font-bricolage",
});

// The absolute URL to the OG image. Must include the base path (GitHub Pages
// subpath) because `<meta og:image>` needs a fully-qualified URL.
const OG_IMAGE = `${SITE_URL}/og.png`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${identity.name} — ${identity.role}`,
    template: `%s — ${identity.name}`,
  },
  description: `Portfolio of ${identity.name}. ${profile}`,
  keywords: [
    "Data Engineer",
    "Streaming data",
    "Apache Kafka",
    "Spark Structured Streaming",
    "Apache Airflow",
    "ETL",
    "AWS",
    "Azure",
    "Databricks",
    "Snowflake",
    "Fraud detection",
    "AML",
    "HL7",
    "FHIR",
    "Chicago",
  ],
  authors: [{ name: identity.name }],
  creator: identity.name,
  alternates: { canonical: `${SITE_URL}/` },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: `${identity.name} — ${identity.role}`,
    description: identity.tagline,
    siteName: `${identity.name} — Portfolio`,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: `${identity.name} portfolio` }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${identity.name} — ${identity.role}`,
    description: identity.tagline,
    images: [OG_IMAGE],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  // Dark is the default theme, so it's the unconditioned value.
  themeColor: "#0E0D1F",
  width: "device-width",
  initialScale: 1,
};

/**
 * Runs before first paint so the theme never flashes.
 * Dark is the product default regardless of the OS setting — only an explicit
 * stored choice moves it to light.
 */
const themeInitScript = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    if (stored === 'light') document.documentElement.classList.remove('dark');
    else document.documentElement.classList.add('dark');
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
  description: profile,
  email: `mailto:${identity.email}`,
  url: SITE_URL,
  address: { "@type": "PostalAddress", addressLocality: "Chicago", addressRegion: "IL" },
  worksFor: { "@type": "Organization", name: "Bank of America" },
  knowsAbout: [
    "Data engineering",
    "Apache Kafka",
    "Apache Spark",
    "Apache Airflow",
    "ETL/ELT",
    "AWS",
    "Azure",
    "HL7 / FHIR interoperability",
    "Fraud and AML detection",
  ],
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
