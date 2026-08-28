import { identity } from "@/data/resume";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="section-wrap flex flex-col items-start justify-between gap-2 py-8 sm:flex-row sm:items-center">
        <p className="font-mono text-xs text-muted">
          © {new Date().getFullYear()} {identity.name}
        </p>
        <p className="font-mono text-xs text-muted">
          Built with Next.js, Tailwind &amp; Framer Motion
        </p>
      </div>
    </footer>
  );
}
