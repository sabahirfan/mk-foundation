import type { Metadata } from "next";
import { BreadcrumbJsonLd } from "@/components/site/json-ld";
import { NotebookSection, PageHeader } from "@/components/site/page-header";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Privacy",
  description:
    `How the ${site.name} collects, uses and protects your personal information, and your rights under UK data protection law.`,
  path: "/privacy/",
});

export default function PrivacyPage() {
  const email = site.contact.email;

  return (
    <>
      <BreadcrumbJsonLd trail={[{ name: "Privacy", path: "/privacy/" }]} />
      <PageHeader note="your data" title="Privacy" />
      <NotebookSection>
        <div className="prose-book">
          <p>
            This page explains what personal information the {site.name} collects, why, and what we do with it. We
            follow UK data protection law (UK GDPR).
          </p>
          <h2>What we collect</h2>
          <ul>
            <li>
              <strong>When you donate:</strong> your bank or PayPal sends us your name, the amount and your payment
              reference. PayPal may also share your email address.
            </li>
            <li>
              <strong>When you contact us:</strong> your name, email address and message.
            </li>
          </ul>
          <h2>How we use it</h2>
          <p>
            Only to process and record your gift, to reply to you, and to keep the financial records the law requires.
            We never sell or share your details for marketing.
          </p>
          <h2>Cookies and tracking</h2>
          <p>
            This website does not use cookies or advertising trackers. If we measure visits, we use a privacy-friendly
            tool that does not identify you.
          </p>
          <h2>Services we use</h2>
          <ul>
            <li>GitHub Pages, which hosts this website.</li>
            <li>PayPal, if you choose to give through it. Its own privacy policy applies.</li>
            <li>Web3Forms, which delivers messages sent through our contact form.</li>
          </ul>
          <h2>How long we keep it</h2>
          <p>Donation records are kept for six years, as required for financial records. Messages are kept for up to two years.</p>
          <h2>Your rights</h2>
          <p>
            You can ask to see, correct or delete the information we hold about you
            {email ? (
              <>
                {" "}
                by emailing <a href={`mailto:${email}`}>{email}</a>
              </>
            ) : (
              " by contacting us"
            )}
            . You can also complain to the Information Commissioner’s Office at{" "}
            <a href="https://ico.org.uk" rel="noopener noreferrer">
              ico.org.uk
            </a>
            .
          </p>
        </div>
      </NotebookSection>
    </>
  );
}
