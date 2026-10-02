"use client";

import { resume } from "@/data/resume";
import { withBasePath } from "@/lib/site";
import { usePressed } from "@/lib/usePressed";

/**
 * Résumé download. `download` rather than a new tab: the browser saves the
 * file straight away, under a clean filename.
 */
export function ResumeButton({
  className = "",
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const { pressed, handlers } = usePressed();
  return (
    <a
      href={withBasePath(resume.href)}
      download={resume.filename}
      className={`inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-sm font-medium ${
        pressed ? "scale-[0.97] transition-none" : "transition-transform duration-150"
      } ${className}`}
      style={{ touchAction: "manipulation" }}
      {...handlers}
    >
      {children ?? resume.label}
    </a>
  );
}
