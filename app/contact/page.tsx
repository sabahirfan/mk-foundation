import type { Metadata } from "next";
import { ContactForm } from "@/components/site/contact-form";
import { BreadcrumbJsonLd } from "@/components/site/json-ld";
import { NotebookSection, PageHeader } from "@/components/site/page-header";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact us",
  description:
    `Contact the ${site.name} about donating, volunteering, or a family or school in Pakistan that needs help.`,
  path: "/contact/",
});

export default function ContactPage() {
  const { email, whatsapp, baseLocation } = site.contact;
  const formKey = site.forms.web3formsKey;

  return (
    <>
      <BreadcrumbJsonLd trail={[{ name: "Contact", path: "/contact/" }]} />
      <PageHeader note="say salaam" title="Get in touch">
        <p>
          Ask about donating, offer to volunteer, or tell us about a family or school in Pakistan that needs help.
        </p>
      </PageHeader>

      <NotebookSection labelledBy="contact-title">
        <h2 id="contact-title" className="sr-only">
          Contact details
        </h2>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_18rem]">
          {formKey ? (
            <ContactForm accessKey={formKey} />
          ) : (
            <p className="max-w-[34rem] text-lg text-ink-soft">
              {email || whatsapp
                ? "The quickest way to reach us is by email or WhatsApp."
                : "Our contact details are being set up and will appear here soon."}
            </p>
          )}

          <dl className="space-y-6 self-start">
            {email && (
              <div>
                <dt className="text-sm text-ink-soft">Email</dt>
                <dd>
                  <a href={`mailto:${email}`} className="link-ink inline-flex min-h-11 items-center text-lg font-semibold">
                    {email}
                  </a>
                </dd>
              </div>
            )}
            {whatsapp && (
              <div>
                <dt className="text-sm text-ink-soft">WhatsApp</dt>
                <dd>
                  <a
                    href={`https://wa.me/${whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-ink inline-flex min-h-11 items-center text-lg font-semibold"
                  >
                    Message us on WhatsApp
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </dd>
              </div>
            )}
            <div>
              <dt className="text-sm text-ink-soft">Based in</dt>
              <dd className="text-lg">{baseLocation}</dd>
            </div>
          </dl>
        </div>
      </NotebookSection>
    </>
  );
}
