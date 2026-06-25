import type { Metadata } from "next";
import AsmLayoutClient from "./AsmLayoutClient";
import { buildPageMetadata } from "@/lib/seo";
import { PAGE_SEO } from "@/lib/seo-content";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const seo = PAGE_SEO["/asm"];

  return buildPageMetadata({
    title: seo.title,
    description: seo.description,
    path: "/asm",
    locale,
  });
}

export default function AsmLayout({ children }: Props) {
  return <AsmLayoutClient>{children}</AsmLayoutClient>;
}
