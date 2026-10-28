import Link from "next/link";
import { LogoMark } from "@/components/site/logo-mark";
import { causes } from "@/content/causes";
import { nav, registrationLine, site } from "@/content/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t-2 border-ink bg-paper">
      <div className="page grid gap-10 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-sm">
          <div className="flex items-center gap-3">
            <LogoMark className="h-14" />
            <p className="text-lg leading-tight font-semibold">{site.name}</p>
          </div>
          <p className="mt-2 text-ink-soft">
            In loving memory of {site.memorialOf}, school teacher.
          </p>
          <p className="mt-4 text-sm text-ink-soft">{registrationLine}</p>
        </div>

        <nav aria-label="Our work">
          <p className="font-semibold">Our work</p>
          <ul className="mt-2">
            {causes.map((cause) => (
              <li key={cause.slug}>
                <Link href={`/causes/${cause.slug}/`} className="link-ink inline-flex min-h-11 items-center">
                  {cause.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Foundation">
          <p className="font-semibold">Foundation</p>
          <ul className="mt-2">
            {[...nav, { href: "/donate/", label: "Donate" }].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-ink inline-flex min-h-11 items-center">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-rule">
        <div className="page flex flex-col gap-2 py-5 text-sm text-ink-soft sm:flex-row sm:justify-between">
          <p>
            © {year} {site.name}. Based in {site.contact.baseLocation}.
          </p>
          <p className="flex gap-5">
            <Link href="/privacy/" className="link-ink">
              Privacy
            </Link>
            <Link href="/donation-policy/" className="link-ink">
              Donation policy
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
