import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { PAGE_SEO } from "@/lib/seo-content";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const seo = PAGE_SEO["/contact/regional-offices"];

  return buildPageMetadata({
    title: seo.title,
    description: seo.description,
    path: "/contact/regional-offices",
    locale,
  });
}

export default function RegionalOfficesLayout({ children }: Props) {
  return children;
}
