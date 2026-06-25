import type { Metadata } from "next";
import ContactLayoutClient from "./ContactLayoutClient";
import { buildPageMetadata } from "@/lib/seo";
import { PAGE_SEO } from "@/lib/seo-content";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const seo = PAGE_SEO["/contact"];

  return buildPageMetadata({
    title: seo.title,
    description: seo.description,
    path: "/contact",
    locale,
  });
}

export default function ContactLayout({ children }: Props) {
  return <ContactLayoutClient>{children}</ContactLayoutClient>;
}
