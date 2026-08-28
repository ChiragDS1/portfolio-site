import type { ReactNode } from "react";

/**
 * `index` is an optional monospace section number ("01"). The ▸ marker is always
 * shown so headings read like entries in a spec sheet.
 */
export function SectionHeading({
  index,
  children,
}: {
  index?: string;
  children: ReactNode;
}) {
  return (
    <div className="mb-8 flex items-center gap-4">
      <h2 className="font-display text-2xl font-semibold tracking-tight text-text sm:text-3xl">
        <span className="mr-3 font-mono text-base font-normal text-accent" aria-hidden>
          {index ? `${index} ▸` : "▸"}
        </span>
        {children}
      </h2>
      <span className="h-px flex-1 bg-line" aria-hidden />
    </div>
  );
}
