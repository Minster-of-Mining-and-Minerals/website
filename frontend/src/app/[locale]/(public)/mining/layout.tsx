import type { Metadata } from "next";
import MiningLayoutClient from "./MiningLayoutClient";
import { buildPageMetadata } from "@/lib/seo";
import { PAGE_SEO } from "@/lib/seo-content";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const seo = PAGE_SEO["/mining"];

  return buildPageMetadata({
    title: seo.title,
    description: seo.description,
    path: "/mining",
    locale,
  });
}

export default function MiningLayout({ children }: Props) {
  return <MiningLayoutClient>{children}</MiningLayoutClient>;
}
