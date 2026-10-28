import type { Metadata } from "next";
import Image from "next/image";
import { ActionLink } from "@/components/site/action-link";
import { CauseList } from "@/components/site/cause-list";
import { WebSiteJsonLd } from "@/components/site/json-ld";
import { MarginNote } from "@/components/site/margin-note";
import { RedTick } from "@/components/site/red-tick";
import { causes } from "@/content/causes";
import { site } from "@/content/site";
import { story } from "@/content/story";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: site.seo.title,
  description: site.seo.description,
  path: "/",
  absoluteTitle: true,
});

const steps = [
  {
    title: "You give in the UK",
    body: "By bank transfer or PayPal, in pounds. Add a reference to choose the cause your gift goes to.",
  },
  {
    title: "We send it to Pakistan",
    body: "Funds go to the families, schools and doctors we work with, through people we know and trust on the ground.",
  },
  {
    title: "We show you where it went",
    body: "We publish what we spent, on what, and where, so you can see your gift at work.",
  },
];

export default function HomePage() {
  return (
    <>
      <WebSiteJsonLd />
      <section className="notebook hero-ruled ruled border-b border-rule">
        <div className="page page-grid pt-14 pb-16 lg:pt-24 lg:pb-24">
          <div className="margin-note-slot flex h-[calc(var(--rule-gap)*2)] items-start gap-3 lg:h-auto lg:flex-col lg:items-end lg:pt-3">
            <RedTick className="w-12 shrink-0 lg:w-16" />
            <p
              className="hand redpen-fade -rotate-2 text-lg leading-snug text-redpen lg:text-right"
              style={{ "--delay": "900ms" } as React.CSSProperties}
            >
              in memory of{" "}Sir
              <br />
              Mubashir{" "}Kaleem
            </p>
          </div>
          <div className="max-w-[46rem]">
            <h1 className="hero-title font-semibold tracking-tight">{site.tagline}</h1>
            <p className="hero-lede mt-[var(--rule-gap)] max-w-[38rem] text-ink-soft">
              We feed hungry families, care for orphans, and help children stay in school and in good health,
              in memory of {site.memorialOf}, a school teacher from Pakistan.
            </p>
            <div className="mt-[var(--rule-gap)] flex flex-wrap items-center gap-x-6 gap-y-3">
              <ActionLink href="/donate/" className="px-7 text-lg">
                Donate
              </ActionLink>
              <ActionLink href="/about/" variant="quiet" className="text-lg">
                Read his story
              </ActionLink>
            </div>
          </div>
        </div>
      </section>

      <section id="our-work" aria-labelledby="our-work-title" className="notebook">
        <div className="page page-grid py-16 lg:py-24">
          <MarginNote>what we do</MarginNote>
          <div>
            <h2 id="our-work-title" className="max-w-2xl text-3xl leading-tight font-semibold md:text-4xl">
              Four ways your gift helps a child in Pakistan
            </h2>
            <p className="mt-4 max-w-2xl text-ink-soft">
              Choose one, or give where the need is greatest. Each cause has its own payment reference so your gift is
              spent the way you intended.
            </p>
            <div className="mt-10">
              <CauseList causes={causes} />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="memory-title" className="on-board bg-board text-chalk">
        <div className="page page-grid py-16 lg:py-24">
          <MarginNote tone="chalk">in loving memory</MarginNote>
          <div className="grid items-start gap-10 md:grid-cols-[minmax(0,1fr)_auto]">
            <div className="max-w-[38rem]">
              <h2 id="memory-title" className="text-3xl leading-tight font-semibold md:text-4xl">
                {site.memorialOf}
              </h2>
              <p className="mt-2 text-chalk-soft">School teacher. Died 2022, buried in London.</p>
              <div className="mt-8 space-y-5 text-lg">
                {story.short.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <ActionLink
                href="/about/"
                variant="quiet"
                className="mt-6 text-lg text-chalk decoration-chalk-soft hover:decoration-chalk-red"
              >
                Read his story
              </ActionLink>
            </div>
            {story.portrait && (
              <Image
                src={story.portrait.src}
                alt={story.portrait.alt}
                width={story.portrait.width}
                height={story.portrait.height}
                className="w-56 -rotate-2 border-8 border-chalk shadow-lg md:w-64"
              />
            )}
          </div>
        </div>
      </section>

      <section aria-labelledby="how-title" className="notebook">
        <div className="page page-grid py-16 lg:py-24">
          <MarginNote>how it works</MarginNote>
          <div>
            <h2 id="how-title" className="max-w-2xl text-3xl leading-tight font-semibold md:text-4xl">
              How your gift reaches Pakistan
            </h2>
            <ol className="mt-10 grid gap-10 md:grid-cols-3 md:gap-8">
              {steps.map((step, index) => (
                <li key={step.title} className="border-t-2 border-ink pt-5">
                  <p className="hand text-3xl leading-none text-redpen" aria-hidden>
                    {index + 1}.
                  </p>
                  <h3 className="mt-3 text-xl font-semibold">{step.title}</h3>
                  <p className="mt-2 text-ink-soft">{step.body}</p>
                </li>
              ))}
            </ol>
            <ActionLink href="/transparency/" variant="quiet" className="mt-8">
              See where the money goes
            </ActionLink>
          </div>
        </div>
      </section>

      <section aria-labelledby="give-title" className="notebook ruled border-t border-rule">
        <div className="page page-grid py-16 lg:py-24">
          <MarginNote>thank you</MarginNote>
          <div className="max-w-[40rem]">
            <h2 id="give-title" className="text-3xl leading-tight font-semibold md:text-4xl">
              Give in his name
            </h2>
            <p className="mt-4 text-lg text-ink-soft">
              One-off or monthly, by bank transfer or PayPal. Your gift goes to the cause you choose.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <ActionLink href="/donate/" className="px-7 text-lg">
                Donate
              </ActionLink>
              <ActionLink href="/causes/" variant="quiet" className="text-lg">
                Choose a cause
              </ActionLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
