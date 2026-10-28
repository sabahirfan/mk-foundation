import { cn } from "@/lib/utils";

/** The teacher’s tick in red pen. `drawn` animates the stroke on page load. */
export function RedTick({
  className,
  drawn = true,
  weight = 5,
}: {
  className?: string;
  drawn?: boolean;
  weight?: number;
}) {
  return (
    <svg
      viewBox="0 0 64 48"
      fill="none"
      aria-hidden
      className={cn("text-redpen", className)}
    >
      <path
        d="M6 26c5 3 10 8 15 15C29 26 42 12 59 4"
        stroke="currentColor"
        strokeWidth={weight}
        strokeLinecap="round"
        strokeLinejoin="round"
        pathLength={100}
        className={drawn ? "redpen-stroke" : undefined}
        style={drawn ? ({ "--len": 100 } as React.CSSProperties) : undefined}
      />
    </svg>
  );
}
