import { cn } from "@/lib/utils";

/**
 * A note in the teacher’s red pen. On wide screens it sits in the page margin,
 * to the left of the red line; on small screens it sits above the content.
 */
export function MarginNote({
  children,
  className,
  tone = "pen",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "pen" | "chalk";
}) {
  return (
    <div className={cn("margin-note-slot lg:pt-1.5 lg:text-right", className)}>
      <p
        className={cn(
          "hand mb-3 -rotate-2 text-lg leading-snug lg:mb-0",
          tone === "pen" ? "text-redpen" : "text-chalk-red",
        )}
      >
        {children}
      </p>
    </div>
  );
}
