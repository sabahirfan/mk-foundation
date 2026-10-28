import Link from "next/link";
import { ActionLink } from "@/components/site/action-link";
import { LogoMark } from "@/components/site/logo-mark";
import { MobileNav } from "@/components/site/mobile-nav";
import { NavLinks } from "@/components/site/nav-links";
import { site } from "@/content/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-paper/95 backdrop-blur supports-backdrop-filter:bg-paper/85">
      <div className="page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex min-h-11 items-center gap-2.5 leading-tight">
          <LogoMark className="h-11" />
          <span className="text-lg font-semibold tracking-tight sm:hidden">{site.shortName}</span>
          <span className="hidden text-lg font-semibold tracking-tight sm:inline">{site.name}</span>
        </Link>
        <nav aria-label="Main" className="hidden items-center gap-6 lg:flex">
          <NavLinks />
          <ActionLink href="/donate/">Donate</ActionLink>
        </nav>
        <div className="flex items-center gap-2 lg:hidden">
          <ActionLink href="/donate/" className="px-4">
            Donate
          </ActionLink>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
