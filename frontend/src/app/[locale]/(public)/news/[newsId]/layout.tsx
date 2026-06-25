import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { fetchPublicNewsById, deltaToPlainText } from "@/lib/server-api";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string; newsId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, newsId } = await params;
  const news = await fetchPublicNewsById(newsId);

  if (!news) {
    return buildPageMetadata({
      title: "News Article",
      description: "News article from the Ministry of Mines, Ethiopia.",
      path: `/news/${newsId}`,
      locale,
    });
  }

  const excerpt = deltaToPlainText(news.content).slice(0, 160);

  return buildPageMetadata({
    title: news.title,
    description: excerpt || "News article from the Ministry of Mines, Ethiopia.",
    path: `/news/${newsId}`,
    locale,
  });
}

export default function NewsDetailLayout({ children }: Props) {
  return children;
}
