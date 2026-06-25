import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { PAGE_SEO } from "@/lib/seo-content";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const seo = PAGE_SEO["/services"];

  return buildPageMetadata({
    title: seo.title,
    description: seo.description,
    path: "/services",
    locale,
  });
}

export default function ServicesLayout({ children }: Props) {
  return children;
}
