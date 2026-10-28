"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/content/site";
import { cn } from "@/lib/utils";

export function NavLinks({ className, onNavigate }: { className?: string; onNavigate?: () => void }) {
  const pathname = withSlash(usePathname());

  return (
    <ul className={cn("flex gap-6", className)}>
      {nav.map((item) => {
        const current = pathname.startsWith(item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              aria-current={current ? "page" : undefined}
              className={cn(
                "inline-flex min-h-11 items-center underline-offset-[6px] decoration-2 hover:underline hover:decoration-rule",
                current && "underline decoration-redpen hover:decoration-redpen",
              )}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

function withSlash(path: string) {
  return path.endsWith("/") ? path : `${path}/`;
}
