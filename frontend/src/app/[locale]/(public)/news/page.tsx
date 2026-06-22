"use client";

import PageHeader from "@/components/pages/home-page-components/PageHeader";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useGetNewsQuery } from "@/redux/api/newsApi";
import { useGetTagsQuery } from "@/redux/api/tagApi";
import NewsCard from "@/components/pages/news-page-components/NewsCard";
import { calculateReadingTime, extractExcerpt, extractHeadlineImage, extractTags } from "@/utils/newsMapper";
import PublicEmptyState from "@/components/common/PublicEmptyState";
import { useTranslations } from "next-intl";

const NewsPage = () => {
    const { data: newsData = [], isLoading, isError } = useGetNewsQuery();
    const { data: tagsData = [] } = useGetTagsQuery();
    const t = useTranslations("empty_state");

    const [activeTag, setActiveTag] = useState<string>("All News");

    // Build a flat list of tag names including "All News"
    const tagNames = ["All News", ...tagsData.map((t) => t.name)];

    // Filter news based on selected tag
    const filteredNews = activeTag === "All News"
        ? newsData
        : newsData.filter((item) => {
            const itemTags = extractTags(item.tag_links);
            return itemTags.includes(activeTag);
        });

    return (
        <>
            <PageHeader
                title="News"
                icon={<MessageCircle />}
                description="News and updates from the Ministry of Mines"
            />

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Page header */}
                <div className="mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-golden-dark">News</h1>
                    <div className="mt-2 h-1 w-12 bg-golden-dark rounded-full" />
                    <p className="text-gray-600 mt-4 max-w-2xl">
                        Stay updated with the latest news and announcements from the Ministry of Mines.
                        Here you can find information about our activities, projects, and initiatives.
                    </p>
                </div>

                {/* Tag filter tabs */}
                <div className="relative flex gap-4 mb-8 flex-wrap">
                    {tagNames.map((tag) => {
                        const isActive = activeTag === tag;
                        return (
                            <div key={tag} className="relative z-10">
                                <button
                                    onClick={() => setActiveTag(tag)}
                                    className={`relative z-10 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isActive ? "text-white" : "text-gray-700 hover:bg-golden-dark20"}`}
                                >
                                    {tag}
                                </button>
                                {isActive && (
                                    <motion.div
                                        layoutId="active-category"
                                        className="absolute inset-0 bg-golden-dark rounded-lg z-0"
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* News grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredNews.length === 0 ? (
                        <div className="col-span-full">
                            <PublicEmptyState
                                title={
                                    newsData.length === 0
                                        ? t("news_title")
                                        : t("news_filter_title")
                                }
                                description={
                                    newsData.length > 0
                                        ? t("filter_description")
                                        : undefined
                                }
                            />
                        </div>
                    ) : (
                        filteredNews.map((item) => {
                        const excerpt = extractExcerpt(item.content);
                        const tags = extractTags(item.tag_links);
                        return (
                            <NewsCard
                                key={item.news_id}
                                id={item.news_id}
                                title={item.title}
                                excerpt={excerpt}
                                media={extractHeadlineImage(item.attachments)}
                                date={new Date(item.created_at).toLocaleDateString()}
                                category={tags[0] || "General"}
                                tags={tags}
                                readingTime={() => calculateReadingTime(excerpt)}
                            />
                        );
                    })
                    )}
                </div>
            </section>
        </>
    );
};

export default NewsPage;