/** Static SEO copy keyed by public path (without locale prefix). */
export const PAGE_SEO: Record<string, { title: string; description: string }> = {
  "/": {
    title: "Ministry of Mines – Ethiopia",
    description:
      "Promoting responsible mining and petroleum development in Ethiopia. Explore services, investment opportunities, news, and contact information.",
  },
  "/about": {
    title: "About the Ministry",
    description:
      "Learn about the Ministry of Mines, its leadership, mission, vision, and role in regulating Ethiopia's mineral and energy resources.",
  },
  "/services": {
    title: "Our Services",
    description:
      "Mineral licensing, geological information, laboratory services, petroleum support, and investment promotion from the Ministry of Mines.",
  },
  "/investigating-in-ethiopia": {
    title: "Investing in Ethiopia",
    description:
      "Discover investment opportunities in Ethiopia's mining, petroleum, and geothermal sectors with the Ministry of Mines.",
  },
  "/news": {
    title: "News & Updates",
    description:
      "Latest news, announcements, and updates from the Ministry of Mines, Ethiopia.",
  },
  "/events": {
    title: "Events",
    description:
      "Upcoming workshops, seminars, and events hosted by the Ministry of Mines, Ethiopia.",
  },
  "/contact": {
    title: "Contact Us",
    description:
      "Contact the Ministry of Mines Federal Office. Find address, email, phone, and inquiry options.",
  },
  "/contact/regional-offices": {
    title: "Regional Offices",
    description:
      "Find Ministry of Mines regional office locations and contact details across Ethiopia.",
  },
  "/contact/tenders-and-vacancies": {
    title: "Tenders and Vacancies",
    description:
      "Browse current tenders and job vacancies published by the Ministry of Mines, Ethiopia.",
  },
  "/mining": {
    title: "Mining Sector",
    description:
      "Overview of Ethiopia's mining sector, licensing, data, gemstones, and application processes.",
  },
  "/geothermal": {
    title: "Geothermal Sector",
    description:
      "Geothermal resources, research, laboratories, and training programs under the Ministry of Mines.",
  },
  "/petroleum": {
    title: "Petroleum Sector",
    description:
      "Petroleum legislation, resources, and application guidance from the Ministry of Mines, Ethiopia.",
  },
  "/asm": {
    title: "Artisanal & Small-Scale Mining",
    description:
      "Information on artisanal and small-scale mining (ASM) programs and support in Ethiopia.",
  },
};

export function getPageSeo(path: string) {
  return PAGE_SEO[path] ?? null;
}
