import { Download } from "lucide-react";
import { resume } from "@/data/resume";
import { withBasePath } from "@/lib/site";

/**
 * Single, direct résumé download — the Data Engineer PDF.
 */
export function ResumeButton() {
  return (
    <a
      href={withBasePath(resume.href)}
      download
      className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-line bg-surface px-4 py-2.5 text-sm font-medium text-text transition-colors hover:border-accent/60"
    >
      <Download className="h-4 w-4 text-accent" aria-hidden />
      {resume.label}
    </a>
  );
}
