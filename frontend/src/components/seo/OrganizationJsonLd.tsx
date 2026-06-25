import { getSiteUrl, SITE_NAME } from "@/lib/seo";

export function OrganizationJsonLd() {
  const siteUrl = getSiteUrl();

  const schema = {
    "@context": "https://schema.org",
    "@type": "GovernmentOrganization",
    name: SITE_NAME,
    url: siteUrl,
    logo: `${siteUrl}/logo-only.png`,
    description:
      "The Ministry of Mines regulates and develops Ethiopia's mineral, petroleum, and geothermal resources.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "ET",
      addressLocality: "Addis Ababa",
    },
    sameAs: [siteUrl],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
