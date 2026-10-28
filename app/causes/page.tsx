import type { Metadata } from "next";
import { CauseList } from "@/components/site/cause-list";
import { BreadcrumbJsonLd } from "@/components/site/json-ld";
import { NotebookSection, PageHeader } from "@/components/site/page-header";
import { causes } from "@/content/causes";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Our work for children in Pakistan",
  description:
    "Caring for orphans, feeding hungry families, keeping children in school and paying for basic medical care in Pakistan. Choose a cause to support.",
  path: "/causes/",
});

export default function CausesPage() {
  return (
    <>
      <BreadcrumbJsonLd trail={[{ name: "Our work", path: "/causes/" }]} />
      <PageHeader note="what we do" title="Our work in Pakistan">
        <p>
          Four kinds of help, all for children and the families around them. Choose the one closest to your heart, or
          give where the need is greatest.
        </p>
      </PageHeader>
      <NotebookSection>
        <CauseList causes={causes} headingLevel="h2" />
      </NotebookSection>
    </>
  );
}
