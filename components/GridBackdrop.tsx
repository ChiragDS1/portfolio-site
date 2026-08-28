/**
 * Quiet structural motif: a faint hairline grid, like a data sheet.
 * Static, decorative, non-interactive.
 */
export function GridBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(ellipse_at_top,black,transparent_78%)]"
    >
      <svg className="h-full w-full" fill="none">
        <defs>
          <pattern id="ivory-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M40 0H0V40"
              stroke="rgb(var(--grid) / 0.07)"
              strokeWidth="1"
              fill="none"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ivory-grid)" />
      </svg>
    </div>
  );
}
