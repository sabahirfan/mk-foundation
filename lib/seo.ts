import type { Metadata } from "next";
import { site } from "@/content/site";

const shareImage = { url: "/og-image.png", width: 1200, height: 630, alt: site.name };

/** Social card defaults for routes without their own metadata, such as the 404 page. */
export const shareDefaults = {
  openGraph: { type: "website", siteName: site.name, locale: "en_GB", images: [shareImage] },
  twitter: { card: "summary_large_image", images: [shareImage] },
} satisfies Metadata;

/**
 * Metadata for one page: title, description, canonical URL and social cards.
 * Next.js merges metadata shallowly, so each page gets the full Open Graph set
 * here rather than relying on the root layout's.
 */
export function pageMetadata({
  title,
  description,
  path,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  /** Route path with trailing slash, e.g. "/donate/". */
  path: string;
  /** Use the title as-is, without the " | MK Foundation" suffix. */
  absoluteTitle?: boolean;
}): Metadata {
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_GB",
      url: path,
      title,
      description,
      images: [shareImage],
    },
    twitter: { card: "summary_large_image", title, description, images: [shareImage] },
  };
}

/** An absolute URL on this site, for structured data. */
export function absoluteUrl(path: string) {
  return new URL(path, site.url).toString();
}
