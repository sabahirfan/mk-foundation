import type { MetadataRoute } from "next";
import { causes } from "@/content/causes";
import { site } from "@/content/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/about/",
    "/causes/",
    ...causes.map((cause) => `/causes/${cause.slug}/`),
    "/donate/",
    "/transparency/",
    "/contact/",
    "/privacy/",
    "/donation-policy/",
  ];
  return paths.map((path) => ({ url: new URL(path, site.url).toString() }));
}
