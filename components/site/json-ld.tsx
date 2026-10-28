import { site } from "@/content/site";
import { absoluteUrl } from "@/lib/seo";

const organizationId = absoluteUrl("/#organization");

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD must be emitted as raw JSON; the data here is static and trusted.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

/** Who we are, on every page: lets search engines build a knowledge panel for the foundation. */
export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "NGO",
        "@id": organizationId,
        name: site.name,
        alternateName: site.shortName,
        url: absoluteUrl("/"),
        logo: absoluteUrl("/brand/mk-logo-512.png"),
        image: absoluteUrl("/og-image.png"),
        description: site.description,
        slogan: site.tagline,
        areaServed: { "@type": "Country", name: "Pakistan" },
        address: { "@type": "PostalAddress", addressLocality: "London", addressCountry: "GB" },
        ...(site.contact.email && { email: site.contact.email }),
        ...(site.social.length > 0 && { sameAs: site.social }),
      }}
    />
  );
}

/** The site itself, on the home page only: tells Google which name to show for the site in results. */
export function WebSiteJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: site.name,
        alternateName: site.shortName,
        url: absoluteUrl("/"),
        inLanguage: "en-GB",
        publisher: { "@id": organizationId },
      }}
    />
  );
}

/** The page's place in the site, starting from the home page. */
export function BreadcrumbJsonLd({ trail }: { trail: { name: string; path: string }[] }) {
  const items = [{ name: "Home", path: "/" }, ...trail];
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: item.name,
          item: absoluteUrl(item.path),
        })),
      }}
    />
  );
}
