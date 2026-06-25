import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo";
import { PUBLIC_STATIC_PATHS } from "@/lib/seo-routes";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const path of PUBLIC_STATIC_PATHS) {
      const url =
        path === "/"
          ? `${siteUrl}/${locale}`
          : `${siteUrl}/${locale}${path}`;

      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: path === "/" ? "daily" : "weekly",
        priority: path === "/" ? 1 : path === "/news" || path === "/contact" ? 0.9 : 0.7,
      });
    }
  }

  return entries;
}
