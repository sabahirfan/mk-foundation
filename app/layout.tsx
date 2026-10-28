import type { Metadata, Viewport } from "next";
import { Kalam, Literata } from "next/font/google";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { OrganizationJsonLd } from "@/components/site/json-ld";
import { site } from "@/content/site";
import { shareDefaults } from "@/lib/seo";
import "./globals.css";

const literata = Literata({
  variable: "--font-literata",
  subsets: ["latin"],
  axes: ["opsz"],
});

const kalam = Kalam({
  variable: "--font-kalam",
  subsets: ["latin"],
  weight: "400",
  // Only used for small margin notes, so it shouldn't compete with the body font.
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.seo.title,
    template: `%s | ${site.shortName}`,
  },
  description: site.seo.description,
  applicationName: site.name,
  verification: {
    ...(site.verification.google && { google: site.verification.google }),
    ...(site.verification.bing && { other: { "msvalidate.01": site.verification.bing } }),
  },
  ...shareDefaults,
};

export const viewport: Viewport = {
  themeColor: "#fbfbf8",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-GB" className={`${literata.variable} ${kalam.variable} antialiased`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only z-50 bg-ink px-4 py-3 text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <OrganizationJsonLd />
      </body>
    </html>
  );
}
