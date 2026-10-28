import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/site/json-ld";
import { NotebookSection, PageHeader } from "@/components/site/page-header";
import { registrationLine, site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Donation policy",
  description:
    `How the ${site.name} handles donations: choosing a cause, gifts without a reference, refunds and fundraising standards.`,
  path: "/donation-policy/",
});

export default function DonationPolicyPage() {
  return (
    <>
      <BreadcrumbJsonLd trail={[{ name: "Donation policy", path: "/donation-policy/" }]} />
      <PageHeader note="the rules" title="Donation policy" />
      <NotebookSection>
        <div className="prose-book">
          <h2 className="!mt-0">Our status</h2>
          <p>{registrationLine}</p>
          <h2>Choosing a cause</h2>
          <p>
            When you give with a cause reference, we spend your gift on that cause only. If we ever raise more for a
            cause than it can use, we will say so on our website and use the surplus for our closest related work.
          </p>
          <h2>Gifts without a reference</h2>
          <p>These go to our general fund and are spent where the need is greatest.</p>
          <h2>Refunds</h2>
          <p>
            If you give by mistake, or give the wrong amount, contact us within 30 days and we will refund you. After
            30 days the money may already have been spent in Pakistan, but we will always try to help.
          </p>
          <h2>Fundraising standards</h2>
          <p>
            We aim to follow the Code of Fundraising Practice. We will never pressure anyone to give, and we never
            accept gifts we believe come from the proceeds of crime.
          </p>
        </div>
      </NotebookSection>
    </>
  );
}
