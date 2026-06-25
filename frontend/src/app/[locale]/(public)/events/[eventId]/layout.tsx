import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { fetchPublicEventById, deltaToPlainText } from "@/lib/server-api";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string; eventId: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, eventId } = await params;
  const event = await fetchPublicEventById(eventId);

  if (!event) {
    return buildPageMetadata({
      title: "Event",
      description: "Event from the Ministry of Mines, Ethiopia.",
      path: `/events/${eventId}`,
      locale,
    });
  }

  const description =
    (event.description && typeof event.description === "string"
      ? event.description
      : event.content
        ? deltaToPlainText(event.content)
        : ""
    ).slice(0, 160) || "Event from the Ministry of Mines, Ethiopia.";

  return buildPageMetadata({
    title: event.title,
    description,
    path: `/events/${eventId}`,
    locale,
  });
}

export default function EventDetailLayout({ children }: Props) {
  return children;
}
