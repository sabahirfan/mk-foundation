import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ActionLink } from "@/components/site/action-link";
import { CopyButton } from "@/components/site/copy-button";
import { BreadcrumbJsonLd } from "@/components/site/json-ld";
import { NotebookSection, PageHeader } from "@/components/site/page-header";
import { causes, getCause } from "@/content/causes";
import { pageMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return causes.map((cause) => ({ slug: cause.slug }));
}

export async function generateMetadata({ params }: PageProps<"/causes/[slug]">): Promise<Metadata> {
  const cause = getCause((await params).slug);
  if (!cause) return {};
  return pageMetadata({ ...cause.seo, path: `/causes/${cause.slug}/` });
}

export default async function CausePage({ params }: PageProps<"/causes/[slug]">) {
  const cause = getCause((await params).slug);
  if (!cause) notFound();

  const others = causes.filter((other) => other.slug !== cause.slug);

  return (
    <>
      <BreadcrumbJsonLd
        trail={[
          { name: "Our work", path: "/causes/" },
          { name: cause.title, path: `/causes/${cause.slug}/` },
        ]}
      />
      <PageHeader note={cause.marginNote} title={cause.title}>
        <p>{cause.summary}</p>
      </PageHeader>

      <NotebookSection note="the need" labelledBy="need-title">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,38rem)_minmax(0,1fr)]">
          <div className="prose-book">
            <h2 id="need-title" className="!mt-0">
              Why it matters
            </h2>
            {cause.need.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <h2>How we help</h2>
            <ul>
              {cause.whatWeDo.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <aside aria-labelledby="give-title" className="self-start border-2 border-ink bg-white p-6 md:p-8">
            <h2 id="give-title" className="text-2xl font-semibold">
              What your gift does
            </h2>
            <dl className="mt-5 border-b border-rule">
              {cause.giving.map((level) => (
                <div key={level.amount} className="border-t border-rule py-4">
                  <dt className="text-xl font-semibold">{level.amount}</dt>
                  <dd className="text-ink-soft">{level.buys}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 text-sm text-ink-soft">For a bank transfer, use this payment reference:</p>
            <p className="mt-1 flex flex-wrap items-center justify-between gap-2 rounded-md bg-rule-tint py-1 pl-4">
              <span translate="no" className="text-lg font-semibold tracking-wide">
                {cause.reference}
              </span>
              <CopyButton value={cause.reference} label="payment reference" />
            </p>
            <ActionLink href="/donate/" className="mt-6 w-full text-lg">
              Donate
            </ActionLink>
          </aside>
        </div>
      </NotebookSection>

      <NotebookSection note="also" labelledBy="other-title" className="!pt-0">
        <h2 id="other-title" className="text-xl font-semibold">
          Our other work
        </h2>
        <ul className="mt-3 flex flex-col gap-x-8 sm:flex-row sm:flex-wrap">
          {others.map((other) => (
            <li key={other.slug}>
              <Link href={`/causes/${other.slug}/`} className="link-ink inline-flex min-h-11 items-center text-lg">
                {other.title}
              </Link>
            </li>
          ))}
        </ul>
      </NotebookSection>
    </>
  );
}
