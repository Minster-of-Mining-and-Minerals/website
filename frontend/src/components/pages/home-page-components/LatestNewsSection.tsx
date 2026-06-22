"use client";

import Image from "next/image";
import { ArrowRight, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { Button } from "../../ui/button";
import { useGetNewsQuery } from "@/redux/api/newsApi";
import { getFileUrl } from "@/utils/fileUrl";
import Link from "next/link";
import { formatDate } from "@/utils/datetime";

type NewsItem = {
    id: string;
    title: string;
    description: string;
    image: string;
    date: string;
};

// Helper to extract plain text from Quill Delta
const deltaToPlainText = (delta: any): string => {
    if (!delta || !Array.isArray(delta.ops)) return "";
    return delta.ops
        .filter((op: any) => typeof op.insert === "string")
        .map((op: any) => op.insert)
        .join("")
        .trim();
};

export default function LatestNewsSection() {
    const { data: apiNews, isLoading } = useGetNewsQuery({ status: "published" });
    const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
    const [active, setActive] = useState(0);

    useEffect(() => {
        if (apiNews && apiNews.length > 0) {
            const mapped: NewsItem[] = apiNews.slice(0, 6).map((n) => {
                const headlineAttachment = n.attachments?.find(a => a.category === 'headline')?.attachment
                    || n.attachments?.[0]?.attachment;

                return {
                    id: n.news_id,
                    title: n.title,
                    description: deltaToPlainText(n.content).substring(0, 200) + "...",
                    image: headlineAttachment?.file_path ? getFileUrl(headlineAttachment.file_path) : "/placeholder-news.jpg",
                    date: formatDate(n.created_at),
                };
            });
            setNewsItems(mapped);
        }
    }, [apiNews]);

    // 🔁 Auto slide every 10s
    useEffect(() => {
        if (newsItems.length > 0) {
            const interval = setInterval(() => {
                setActive((prev) => (prev === newsItems.length - 1 ? 0 : prev + 1));
            }, 10000);
            return () => clearInterval(interval);
        }
    }, [newsItems.length]);

    if (isLoading) {
        return (
            <div className="w-full py-20 flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-golden-dark" />
            </div>
        );
    }

    if (newsItems.length === 0) return null;

    const item = newsItems[active];

    return (
        <section className="w-full py-20">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <div className="mb-10 flex justify-between items-center">
                    <div className="flex flex-col">
                        <p className="text-sm font-medium text-gray-500">News & Updates</p>
                        <h2 className="text-2xl sm:text-3xl font-bold text-golden-dark">
                            Latest News
                        </h2>
                        <div className="mt-3 h-1 w-20 bg-golden-dark rounded-full"></div>
                    </div>
                    <div className="flex items-center">
                        <Link
                            href="/news"
                            className="flex items-center gap-2 bg-golden-dark hover:bg-golden-darkHover text-white px-4 md:px-5 py-2 md:py-3 rounded-md md:rounded-2xl shadow-md transition-all transform"
                        >
                            <span className="font-medium text-xs md:text-base">Find All News</span>
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>

                {/* Main Card */}
                <div className="relative bg-white rounded-3xl shadow-sm overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        {/* Image */}
                        <div className="relative h-[250px] md:h-[370px]">
                            <img
                                src={item.image}
                                alt={item.title}
                                className="object-cover h-full w-full"
                            />
                            {/* Date */}
                            <span className="absolute top-4 left-4 bg-white text-primary text-xs md:text-sm font-medium px-4 py-1 rounded-full shadow">
                                {item.date}
                            </span>
                        </div>

                        {/* Content */}
                        <div className="p-4 md:p-8 flex flex-col justify-center gap-4">
                            <h3 className="text-lg md:text-xl font-semibold text-gray-900 line-clamp-2">
                                {item.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed text-sm md:text-base line-clamp-3">
                                {item.description}
                            </p>

                            <Link href={`/news/${item.id}`}>
                                <Button className="mt-4 bg-golden-dark hover:bg-golden-darkHover inline-flex items-center gap-2 w-fit px-6 py-3 rounded-md text-white text-sm font-medium transition">
                                    Read More <ArrowRight size={16} />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Thumbnails */}
                <div className="mt-6 flex w-full md:justify-center md:items-center gap-4 overflow-x-auto py-2 px-4 md:px-0 scroll-smooth snap-x snap-mandatory">
                    {newsItems.map((n, i) => (
                        <button
                            key={n.id}
                            onClick={() => setActive(i)}
                            className={clsx(
                                "relative flex-shrink-0 w-28 h-auto rounded-xl overflow-hidden border transition",
                                active === i
                                    ? "border-golden-dark ring-2 ring-primary/30"
                                    : "border-transparent opacity-70 hover:opacity-100"
                            )}
                        >
                            <img
                                src={n.image}
                                alt={n.title}
                                className="object-cover"
                            />
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}

