import type { Metadata } from "next";
import { CopyButton } from "@/components/site/copy-button";
import { BreadcrumbJsonLd } from "@/components/site/json-ld";
import { NotebookSection, PageHeader } from "@/components/site/page-header";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { causes, generalFund } from "@/content/causes";
import { registrationLine, site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Donate to help children in Pakistan",
  description:
    "Give by bank transfer or PayPal to feed families, support orphans and keep children in school in Pakistan. Choose your cause, one-off or monthly.",
  path: "/donate/",
});

const funds = [generalFund, ...causes.map(({ title, reference }) => ({ title, reference }))];

const faqs = [
  {
    q: "Can I choose where my money goes?",
    a: "Yes. Add the payment reference for a cause to your bank transfer, or mention it in the PayPal note. Gifts without a reference go where the need is greatest.",
  },
  {
    q: "Can I give monthly?",
    a: "Yes. Set up a standing order from your bank using our account details and a payment reference, or choose the monthly option on PayPal.",
  },
  {
    q: "Do you claim Gift Aid?",
    a: "Not yet. We can only claim Gift Aid once we are registered as a charity and recognised by HMRC. We will tell donors when that changes.",
  },
  {
    q: "What if I make a mistake?",
    a: "Contact us within 30 days and we will refund a gift made in error. Our donation policy explains how.",
  },
  {
    q: "How will I know my gift was used?",
    a: "We publish what we spend, on what and where, on our page about where the money goes.",
  },
];

export default function DonatePage() {
  const { bank, paypalUrl, acceptsZakat } = site.donate;
  const hasPaymentMethod = Boolean(bank || paypalUrl);

  return (
    <>
      <BreadcrumbJsonLd trail={[{ name: "Donate", path: "/donate/" }]} />
      <PageHeader note="thank you" title="Give in his name">
        <p>
          Your gift feeds families, supports orphans, and keeps children in school and in good health in Pakistan.
        </p>
      </PageHeader>

      <NotebookSection note="step one" labelledBy="choose-title">
        <h2 id="choose-title" className="text-3xl leading-tight font-semibold">
          Choose where your gift goes
        </h2>
        <p className="mt-3 max-w-[38rem] text-ink-soft">
          Each cause has a payment reference. Add it to your bank transfer, or to the note with your PayPal gift.
        </p>
        <ul className="mt-8 max-w-[40rem] border-b border-rule">
          {funds.map((fund) => (
            <li
              key={fund.reference}
              className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1 border-t border-rule py-3"
            >
              <span className="text-lg">{fund.title}</span>
              <span className="flex items-center gap-2">
                <span translate="no" className="font-semibold tracking-wide tabular-nums">{fund.reference}</span>
                <CopyButton value={fund.reference} label={`reference for ${fund.title}`} />
              </span>
            </li>
          ))}
        </ul>
      </NotebookSection>

      <NotebookSection note="step two" labelledBy="pay-title" className="!pt-0">
        <h2 id="pay-title" className="text-3xl leading-tight font-semibold">
          Send your gift
        </h2>

        {hasPaymentMethod ? (
          <div className="mt-8 grid max-w-[60rem] items-start gap-8 md:grid-cols-2">
            {bank && (
              <section aria-labelledby="bank-title" className="border-2 border-ink bg-white p-5 md:p-8">
                <h3 id="bank-title" className="text-2xl font-semibold">
                  Bank transfer
                </h3>
                <p className="mt-2 text-ink-soft">No fees, so all of your gift reaches us. Best for monthly giving.</p>
                <dl className="mt-5 border-b border-rule">
                  {[
                    ["Account name", bank.accountName],
                    ["Bank", bank.bankName],
                    ["Sort code", bank.sortCode],
                    ["Account number", bank.accountNumber],
                    ...(bank.iban ? [["IBAN", bank.iban]] : []),
                    ...(bank.bic ? [["BIC / SWIFT", bank.bic]] : []),
                  ].map(([label, value]) => (
                    <div key={label} className="grid grid-cols-[minmax(0,1fr)_auto] items-center border-t border-rule py-2">
                      <dt className="col-span-2 text-sm text-ink-soft">{label}</dt>
                      <dd translate="no" className="text-lg font-semibold tabular-nums break-all">
                        {value}
                      </dd>
                      {label !== "Bank" && (
                        <dd>
                          <CopyButton value={value} label={label.toLowerCase()} />
                        </dd>
                      )}
                    </div>
                  ))}
                </dl>
              </section>
            )}

            {paypalUrl && (
              <section aria-labelledby="paypal-title" className="border-2 border-ink bg-white p-5 md:p-8">
                <h3 id="paypal-title" className="text-2xl font-semibold">
                  PayPal or card
                </h3>
                <p className="mt-2 text-ink-soft">
                  Pay with your PayPal account or a debit or credit card. You can choose a one-off or monthly gift.
                  PayPal takes a small fee.
                </p>
                <a
                  href={paypalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-md bg-redpen px-5 text-lg font-semibold text-white transition-colors hover:bg-redpen-dark"
                >
                  Give with PayPal
                  <span className="sr-only"> (opens PayPal in a new tab)</span>
                </a>
              </section>
            )}
          </div>
        ) : (
          <div className="mt-6 max-w-[38rem] border border-rule bg-white p-6">
            <p className="text-lg font-semibold">Our donation account is being set up.</p>
            <p className="mt-2 text-ink-soft">
              Bank and PayPal details will appear here as soon as the foundation’s account is open.
              {site.contact.email ? (
                <>
                  {" "}
                  To give before then, email{" "}
                  <a href={`mailto:${site.contact.email}`} className="link-ink text-ink">
                    {site.contact.email}
                  </a>
                  .
                </>
              ) : (
                " Please check back soon."
              )}
            </p>
          </div>
        )}

        <p className="mt-8 max-w-[38rem] text-sm text-ink-soft">{registrationLine}</p>
      </NotebookSection>

      {acceptsZakat && (
        <NotebookSection note="zakat" labelledBy="zakat-title" className="!pt-0">
          <h2 id="zakat-title" className="text-2xl font-semibold">
            Giving Zakat or Sadaqah
          </h2>
          <p className="mt-3 max-w-[38rem] text-ink-soft">
            Add <strong className="text-ink">ZAKAT</strong> to your payment reference, for example{" "}
            <strong translate="no" className="text-ink">MKF-FOOD-ZAKAT</strong>. We keep Zakat in a separate fund and give it only to
            people who are eligible to receive it.
          </p>
        </NotebookSection>
      )}

      <NotebookSection note="questions" labelledBy="faq-title" className="!pt-0">
        <h2 id="faq-title" className="text-2xl font-semibold">
          Common questions
        </h2>
        <Accordion type="single" collapsible className="mt-4 max-w-[40rem] border-b border-rule">
          {faqs.map((faq) => (
            <AccordionItem key={faq.q} value={faq.q} className="border-rule">
              <AccordionTrigger className="min-h-11 items-center gap-4 py-4 text-left text-lg font-semibold hover:no-underline **:data-[slot=accordion-trigger-icon]:size-5 **:data-[slot=accordion-trigger-icon]:text-ink">
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-base text-ink-soft">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </NotebookSection>
    </>
  );
}
