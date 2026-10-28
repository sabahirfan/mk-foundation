import type { Metadata } from "next";
import Image from "next/image";
import { ActionLink } from "@/components/site/action-link";
import { BreadcrumbJsonLd } from "@/components/site/json-ld";
import { NotebookSection, PageHeader } from "@/components/site/page-header";
import { RedTick } from "@/components/site/red-tick";
import { site } from "@/content/site";
import { story } from "@/content/story";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: `His story: ${site.memorialOf}`,
  description:
    `${site.memorialOf} was a school teacher in Pakistan. He died in 2022, and his family founded the ${site.name} to carry on his work.`,
  path: "/about/",
});

export default function AboutPage() {
  return (
    <>
      <BreadcrumbJsonLd trail={[{ name: "His story", path: "/about/" }]} />
      <PageHeader note="his story" title={site.memorialOf}>
        <p>School teacher. Died 2022, buried in London.</p>
      </PageHeader>

      <NotebookSection note="his life" labelledBy="life-title">
        <div className="grid items-start gap-12 md:grid-cols-[minmax(0,38rem)_auto]">
          <div className="prose-book">
            <h2 id="life-title" className="!mt-0">
              A life in the classroom
            </h2>
            {story.life.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          {story.portrait && (
            <Image
              src={story.portrait.src}
              alt={story.portrait.alt}
              width={story.portrait.width}
              height={story.portrait.height}
              className="w-60 rotate-1 border-8 border-white shadow-md"
            />
          )}
        </div>
      </NotebookSection>

      <section aria-labelledby="why-title" className="on-board bg-board text-chalk">
        <div className="page page-grid py-14 lg:py-20">
          <div className="margin-note-slot lg:pt-1.5 lg:text-right">
            <p className="hand mb-3 -rotate-2 text-lg leading-snug text-chalk-red lg:mb-0">why we started</p>
          </div>
          <div className="max-w-[38rem] space-y-5 text-lg">
            <h2 id="why-title" className="text-3xl leading-tight font-semibold md:text-4xl">
              Why we started this foundation
            </h2>
            {story.why.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      <NotebookSection note="our promise" labelledBy="promise-title">
        <h2 id="promise-title" className="text-3xl leading-tight font-semibold md:text-4xl">
          What we promise every donor
        </h2>
        <ul className="mt-8 max-w-[38rem] border-b border-rule">
          {story.promises.map((promise) => (
            <li key={promise} className="flex gap-4 border-t border-rule py-4 text-lg">
              <RedTick drawn={false} weight={8} className="mt-1.5 w-6 shrink-0 self-start" />
              {promise}
            </li>
          ))}
        </ul>
      </NotebookSection>

      {story.team.length > 0 && (
        <NotebookSection note="who we are" labelledBy="team-title">
          <h2 id="team-title" className="text-3xl leading-tight font-semibold md:text-4xl">
            The people behind the foundation
          </h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {story.team.map((person) => (
              <li key={person.name} className="border-t-2 border-ink pt-4">
                <p className="text-lg font-semibold">{person.name}</p>
                <p className="text-ink-soft">{person.role}</p>
              </li>
            ))}
          </ul>
        </NotebookSection>
      )}

      <NotebookSection labelledBy="about-give-title" className="!pt-0">
        <h2 id="about-give-title" className="text-2xl font-semibold">
          Carry on his work
        </h2>
        <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3">
          <ActionLink href="/donate/" className="px-7 text-lg">
            Donate
          </ActionLink>
          <ActionLink href="/causes/" variant="quiet" className="text-lg">
            See our work
          </ActionLink>
        </div>
      </NotebookSection>
    </>
  );
}
