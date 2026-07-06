"use client";

import PageHeader from "@/components/pages/home-page-components/PageHeader";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useCallback, useEffect, useMemo } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useGetPaginatedNewsQuery } from "@/redux/api/newsApi";
import { useGetTagsQuery } from "@/redux/api/tagApi";
import NewsCard from "@/components/pages/news-page-components/NewsCard";
import {
    calculateReadingTime,
    extractExcerpt,
    extractHeadlineImage,
    extractTags,
} from "@/utils/newsMapper";
import { formatDate } from "@/utils/datetime";
import PublicEmptyState from "@/components/common/PublicEmptyState";
import Pagination from "@/components/common/Pagination";
import { useTranslations } from "next-intl";
import { SkeletonMediaCard, TagFilterSkeleton } from "@/components/skeletons";
import { Skeleton } from "@/components/ui/skeleton";

const PAGE_SIZE = 9;
const ALL_NEWS = "All News";

export default function NewsPageClient() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const t = useTranslations("empty_state");

    const { data: tagsData = [] } = useGetTagsQuery();

    const activeTag = searchParams.get("tag") ?? ALL_NEWS;
    const pageParam = parseInt(searchParams.get("page") ?? "1", 10);
    const currentPage = Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;

    const queryArgs = useMemo(
        () => ({
            page: currentPage,
            limit: PAGE_SIZE,
            ...(activeTag !== ALL_NEWS ? { tag: activeTag } : {}),
        }),
        [currentPage, activeTag],
    );

    const { data, isLoading, isFetching, isError } =
        useGetPaginatedNewsQuery(queryArgs);

    const items = data?.items ?? [];
    const pagination = data?.pagination;
    const totalPages = pagination?.totalPages ?? 1;

    const updateSearchParams = useCallback(
        (next: { tag?: string; page?: number }) => {
            const params = new URLSearchParams(searchParams.toString());

            if (next.tag !== undefined) {
                if (next.tag === ALL_NEWS) params.delete("tag");
                else params.set("tag", next.tag);
            }

            if (next.page !== undefined) {
                if (next.page <= 1) params.delete("page");
                else params.set("page", String(next.page));
            }

            const query = params.toString();
            router.push(`${pathname}${query ? `?${query}` : ""}`, { scroll: false });
        },
        [router, pathname, searchParams],
    );

    // If the server reports fewer pages than the requested page (e.g. after
    // switching tags), snap back to page 1 without a manual reload.
    useEffect(() => {
        if (pagination && currentPage > pagination.totalPages) {
            updateSearchParams({ page: 1 });
        }
    }, [pagination, currentPage, updateSearchParams]);

    const handleTagChange = (tag: string) => {
        updateSearchParams({ tag, page: 1 });
    };

    const handlePageChange = (page: number) => {
        updateSearchParams({ page });
        if (typeof window !== "undefined") {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const tagNames = [ALL_NEWS, ...tagsData.map((tag) => tag.name)];

    if (isLoading) {
        return (
            <>
                <PageHeader
                    title="News"
                    icon={<MessageCircle />}
                    description="News and updates from the Ministry of Mines"
                />
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="mb-8 space-y-4">
                        <Skeleton className="h-9 w-32" />
                        <Skeleton className="h-1 w-12 rounded-full" />
                        <Skeleton className="h-4 w-full max-w-2xl" />
                    </div>
                    <TagFilterSkeleton />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {Array.from({ length: PAGE_SIZE }).map((_, index) => (
                            <SkeletonMediaCard key={index} />
                        ))}
                    </div>
                </section>
            </>
        );
    }

    if (isError) {
        return (
            <>
                <PageHeader
                    title="News"
                    icon={<MessageCircle />}
                    description="News and updates from the Ministry of Mines"
                />
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <PublicEmptyState
                        title={t("news_title")}
                        description={t("error_description")}
                    />
                </section>
            </>
        );
    }

    return (
        <>
            <PageHeader
                title="News"
                icon={<MessageCircle />}
                description="News and updates from the Ministry of Mines"
            />

            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-golden-dark">News</h1>
                    <div className="mt-2 h-1 w-12 bg-golden-dark rounded-full" />
                    <p className="text-gray-600 mt-4 max-w-2xl">
                        Stay updated with the latest news and announcements from the Ministry of Mines.
                        Here you can find information about our activities, projects, and initiatives.
                    </p>
                </div>

                <div className="relative flex gap-4 mb-8 flex-wrap">
                    {tagNames.map((tag) => {
                        const isActive = activeTag === tag;
                        return (
                            <div key={tag} className="relative z-10">
                                <button
                                    onClick={() => handleTagChange(tag)}
                                    className={`relative z-10 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                        isActive
                                            ? "text-white"
                                            : "text-gray-700 hover:bg-golden-dark20"
                                    }`}
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

                <div
                    className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 transition-opacity duration-200 ${
                        isFetching ? "opacity-60" : "opacity-100"
                    }`}
                    aria-busy={isFetching}
                >
                    {items.length === 0 ? (
                        <div className="col-span-full">
                            <PublicEmptyState
                                title={
                                    activeTag === ALL_NEWS
                                        ? t("news_title")
                                        : t("news_filter_title")
                                }
                                description={
                                    activeTag !== ALL_NEWS
                                        ? t("filter_description")
                                        : undefined
                                }
                            />
                        </div>
                    ) : (
                        items.map((item) => {
                            const excerpt = extractExcerpt(item.content);
                            const tags = extractTags(item.tag_links ?? []);
                            const media = extractHeadlineImage(item.attachments ?? []) as
                                | { url: string; type: "image" | "video" }
                                | null;
                            return (
                                <NewsCard
                                    key={item.news_id}
                                    id={item.news_id}
                                    title={item.title}
                                    excerpt={excerpt}
                                    media={media}
                                    date={formatDate(item.created_at)}
                                    category={tags[0] || "General"}
                                    tags={tags}
                                    readingTime={() => calculateReadingTime(excerpt)}
                                />
                            );
                        })
                    )}
                </div>

                {items.length > 0 && totalPages > 1 && (
                    <div className="mt-12 flex flex-col items-center gap-3">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                        {pagination && (
                            <p className="text-sm text-gray-500">
                                Showing page {pagination.page} of {pagination.totalPages}
                                {" · "}
                                {pagination.total} {pagination.total === 1 ? "article" : "articles"}
                            </p>
                        )}
                    </div>
                )}
            </section>
        </>
    );
}
