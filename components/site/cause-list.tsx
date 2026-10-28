import Link from "next/link";
import type { Cause } from "@/content/causes";

/** The four causes as ruled rows, like entries on a page of a school copy. */
export function CauseList({ causes, headingLevel = "h3" }: { causes: Cause[]; headingLevel?: "h2" | "h3" }) {
  const Heading = headingLevel;

  return (
    <ul className="border-b border-rule">
      {causes.map((cause) => {
        const lead = cause.giving[0];
        return (
          <li
            key={cause.slug}
            className="group relative grid gap-x-10 gap-y-3 border-t border-rule py-7 transition-colors hover:bg-rule-tint/60 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)_11rem] md:py-9"
          >
            <Heading className="text-2xl leading-tight font-semibold md:text-[1.7rem]">
              <Link
                href={`/causes/${cause.slug}/`}
                className="decoration-redpen decoration-2 underline-offset-[6px] group-hover:underline after:absolute after:inset-0"
              >
                {cause.title}
              </Link>
            </Heading>
            <p className="text-ink-soft">{cause.summary}</p>
            <p className="text-sm leading-snug text-ink-soft">
              <span className="block text-xl font-semibold text-ink">{lead.amount}</span>
              {lead.buys}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
