import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { PAGE_SEO } from "@/lib/seo-content";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const seo = PAGE_SEO["/events"];

  return buildPageMetadata({
    title: seo.title,
    description: seo.description,
    path: "/events",
    locale,
  });
}

export default function EventsLayout({ children }: Props) {
  return children;
}
