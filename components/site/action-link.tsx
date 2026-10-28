import Link from "next/link";
import { cn } from "@/lib/utils";

const styles = {
  donate:
    "inline-flex min-h-11 items-center justify-center rounded-md bg-redpen px-5 font-semibold text-white transition-colors hover:bg-redpen-dark",
  outline:
    "inline-flex min-h-11 items-center justify-center rounded-md border-2 border-ink px-5 font-semibold text-ink transition-colors hover:bg-ink hover:text-paper",
  quiet: "link-ink inline-flex min-h-11 items-center font-semibold text-ink",
} as const;

type ActionLinkProps = React.ComponentProps<typeof Link> & {
  variant?: keyof typeof styles;
};

export function ActionLink({ variant = "donate", className, ...props }: ActionLinkProps) {
  return <Link className={cn(styles[variant], className)} {...props} />;
}

export const actionStyles = styles;
