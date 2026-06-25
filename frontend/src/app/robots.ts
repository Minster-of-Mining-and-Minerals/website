import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/seo";
import { routing } from "@/i18n/routing";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  const disallow = routing.locales.flatMap((locale) => [
    `/${locale}/admin/`,
    `/${locale}/access/`,
  ]);

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [...disallow, "/api/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
