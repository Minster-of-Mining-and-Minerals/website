import type { Metadata } from "next";
import GeothermalLayoutClient from "./GeothermalLayoutClient";
import { buildPageMetadata } from "@/lib/seo";
import { PAGE_SEO } from "@/lib/seo-content";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const seo = PAGE_SEO["/geothermal"];

  return buildPageMetadata({
    title: seo.title,
    description: seo.description,
    path: "/geothermal",
    locale,
  });
}

export default function GeothermalLayout({ children }: Props) {
  return <GeothermalLayoutClient>{children}</GeothermalLayoutClient>;
}
