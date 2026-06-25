"use client";

import { useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MessageSquare } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useGetNewsQuery, useGetAllNewsFeedbacksQuery } from "@/redux/api/newsApi";
import { News } from "@/redux/types/news";
import { DataTable } from "@/features/template/component/DataTable";
import { TableLayout } from "@/features/template/component/TableLayout";
import type { FilterField } from "@/types/tableLayout";
import { formatDate } from "@/utils/datetime";
import PublicEmptyState from "@/components/common/PublicEmptyState";

type NewsWithFeedbackStats = News & {
    totalFeedbacks: number;
    publishedFeedbacks: number;
    pendingFeedbacks: number;
};

export default function AdminFeedbackNewsList() {
    const router = useRouter();
    const { data: newsList = [], isLoading: isNewsLoading } = useGetNewsQuery({ isAdmin: true });
    const { data: allFeedbacks = [], isLoading: isFeedbacksLoading } = useGetAllNewsFeedbacksQuery();

    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [search, setSearch] = useState("");

    const handlePagination = (index: number, size: number) => {
        setPageIndex(index);
        setPageSize(size);
    };

    const feedbackStatsByNewsId = useMemo(() => {
        const stats = new Map<string, { total: number; published: number; pending: number }>();

        for (const feedback of allFeedbacks) {
            const current = stats.get(feedback.news_id) ?? { total: 0, published: 0, pending: 0 };
            current.total += 1;
            if (feedback.is_published) {
                current.published += 1;
            } else {
                current.pending += 1;
            }
            stats.set(feedback.news_id, current);
        }

        return stats;
    }, [allFeedbacks]);

    const newsWithStats = useMemo<NewsWithFeedbackStats[]>(() => {
        return newsList.map((item) => {
            const stats = feedbackStatsByNewsId.get(item.news_id) ?? {
                total: 0,
                published: 0,
                pending: 0,
            };

            return {
                ...item,
                totalFeedbacks: stats.total,
                publishedFeedbacks: stats.published,
                pendingFeedbacks: stats.pending,
            };
        });
    }, [newsList, feedbackStatsByNewsId]);

    const filteredData = useMemo(() => {
        return newsWithStats.filter((item) => {
            if (!search) return true;
            return item.title?.toLowerCase().includes(search.toLowerCase());
        });
    }, [newsWithStats, search]);

    const paginatedData = filteredData.slice(
        pageIndex * pageSize,
        pageIndex * pageSize + pageSize
    );

    const filters: FilterField[] = [
        {
            key: "search",
            label: "Search",
            type: "text",
            placeholder: "Search by news title...",
            value: search,
            onChange: (value) => {
                setSearch(value);
                setPageIndex(0);
            },
        },
    ];

    const columns: ColumnDef<NewsWithFeedbackStats>[] = [
        {
            accessorKey: "title",
            header: "News Article",
            cell: ({ row }) => (
                <button
                    type="button"
                    onClick={() => router.push(`/admin/news/feedbacks/${row.original.news_id}`)}
                    className="text-left font-semibold text-[#094C81] hover:underline"
                >
                    {row.getValue("title")}
                </button>
            ),
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = row.getValue("status") as string;
                let variant: "default" | "destructive" | "secondary" = "secondary";
                if (status === "published") variant = "default";
                if (status === "draft") variant = "destructive";

                return (
                    <Badge variant={variant}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Badge>
                );
            },
        },
        {
            accessorKey: "created_at",
            header: "Created",
            cell: ({ row }) => formatDate(row.getValue("created_at")),
        },
        {
            accessorKey: "totalFeedbacks",
            header: "Total Feedback",
            cell: ({ row }) => <span className="font-medium">{row.getValue("totalFeedbacks")}</span>,
        },
        {
            accessorKey: "publishedFeedbacks",
            header: "Published",
            cell: ({ row }) => (
                <span className="text-green-700 font-medium">{row.getValue("publishedFeedbacks")}</span>
            ),
        },
        {
            accessorKey: "pendingFeedbacks",
            header: "Pending",
            cell: ({ row }) => {
                const pending = row.getValue("pendingFeedbacks") as number;
                return (
                    <span className={pending > 0 ? "text-amber-600 font-semibold" : "text-gray-500"}>
                        {pending}
                    </span>
                );
            },
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`/admin/news/feedbacks/${row.original.news_id}`)}
                >
                    <MessageSquare className="h-4 w-4 mr-1.5" />
                    View Feedback
                </Button>
            ),
        },
    ];

    const isLoading = isNewsLoading || isFeedbacksLoading;

    return (
        <TableLayout
            title="News Feedback Management"
            description="Select a news article to review and publish its user comments."
            actions={[]}
            filters={filters}
            filterColumnsPerRow={1}
        >
            {filteredData.length === 0 && !isLoading ? (
                <PublicEmptyState
                    variant="inline"
                    title="No news articles found"
                    description={
                        search
                            ? "No articles match your search. Try a different title."
                            : "Create a news article first to start collecting feedback."
                    }
                />
            ) : (
                <DataTable
                    columns={columns}
                    data={paginatedData}
                    totalPageCount={Math.ceil(filteredData.length / pageSize)}
                    handlePagination={handlePagination}
                    tablePageSize={pageSize}
                    currentIndex={pageIndex}
                />
            )}
        </TableLayout>
    );
}
