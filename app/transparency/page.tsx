import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/site/json-ld";
import { NotebookSection, PageHeader } from "@/components/site/page-header";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Where your money goes",
  description:
    `How the ${site.name} spends donations in Pakistan: the rules we follow, the areas we work in, and our yearly reports.`,
  path: "/transparency/",
});

/** TODO: add districts and towns once the first projects are confirmed, e.g. { place: "Sialkot", work: "Food packs, school costs" }. */
const areas: { place: string; work: string }[] = [];

/** TODO: add a report each year, e.g. { year: "2026", href: "/reports/2026.pdf" }. */
const reports: { year: string; href: string }[] = [];

const rules = [
  {
    title: "Your choice is respected",
    body: "A gift with a cause reference is spent only on that cause. Gifts without a reference go where the need is greatest.",
  },
  {
    title: "Families are verified",
    body: "We visit every family before we support them, and keep a record of what each one receives.",
  },
  {
    title: "We pay for things, not people’s promises",
    body: "Where we can, we pay schools, shops and doctors directly rather than handing over cash.",
  },
  {
    title: "Running costs are published",
    body: "Any costs of running the foundation, such as bank and payment fees, are published alongside what we spend on our work.",
  },
];

export default function TransparencyPage() {
  return (
    <>
      <BreadcrumbJsonLd trail={[{ name: "Where money goes", path: "/transparency/" }]} />
      <PageHeader note="open books" title="Where your money goes">
        <p>
          You should be able to see what your gift did. This page sets out how we spend donations and, as our work
          grows, will show exactly what we spent and where.
        </p>
      </PageHeader>

      <NotebookSection note="our rules" labelledBy="rules-title">
        <h2 id="rules-title" className="text-3xl leading-tight font-semibold">
          How we spend donations
        </h2>
        <ul className="mt-8 grid max-w-[60rem] gap-x-10 gap-y-8 md:grid-cols-2">
          {rules.map((rule) => (
            <li key={rule.title} className="border-t-2 border-ink pt-4">
              <h3 className="text-xl font-semibold">{rule.title}</h3>
              <p className="mt-2 text-ink-soft">{rule.body}</p>
            </li>
          ))}
        </ul>
      </NotebookSection>

      <NotebookSection note="where" labelledBy="areas-title" className="!pt-0">
        <h2 id="areas-title" className="text-3xl leading-tight font-semibold">
          Where we work
        </h2>
        {areas.length > 0 ? (
          <table className="mt-6 w-full max-w-[40rem] text-left">
            <thead>
              <tr className="border-b-2 border-ink">
                <th scope="col" className="py-2 pr-4 font-semibold">
                  Area
                </th>
                <th scope="col" className="py-2 font-semibold">
                  Our work there
                </th>
              </tr>
            </thead>
            <tbody>
              {areas.map((area) => (
                <tr key={area.place} className="border-b border-rule">
                  <td className="py-3 pr-4">{area.place}</td>
                  <td className="py-3 text-ink-soft">{area.work}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="mt-4 max-w-[38rem] text-ink-soft">
            We will list each district and town here as our first projects begin.
          </p>
        )}
      </NotebookSection>

      <NotebookSection note="reports" labelledBy="reports-title" className="!pt-0">
        <h2 id="reports-title" className="text-3xl leading-tight font-semibold">
          Reports
        </h2>
        {reports.length > 0 ? (
          <ul className="mt-4">
            {reports.map((report) => (
              <li key={report.year}>
                <a href={report.href} className="link-ink inline-flex min-h-11 items-center text-lg">
                  {report.year} report (PDF)
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-4 max-w-[38rem] text-ink-soft">
            Our first report will be published at the end of our first year of giving, with every pound received and
            spent.
          </p>
        )}
      </NotebookSection>
    </>
  );
}
