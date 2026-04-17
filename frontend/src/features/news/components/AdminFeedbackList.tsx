"use client";

import { useState, useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Trash, CheckCircle2, XCircle, MessageSquare, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetAllNewsFeedbacksQuery, useToggleFeedbackStatusMutation, useDeleteFeedbackMutation } from "@/redux/api/newsApi";
import { NewsFeedback } from "@/redux/types/news";
import { DataTable } from "@/features/template/component/DataTable";
import { TableLayout } from "@/features/template/component/TableLayout";
import { toast } from "sonner";
import type { FilterField } from "@/types/tableLayout";

/* ----------------------------------
   COMPONENT
----------------------------------- */
export default function AdminFeedbackList() {
    /* API */
    const { data: feedbacks = [], isLoading } = useGetAllNewsFeedbacksQuery();
    const [toggleStatus] = useToggleFeedbackStatusMutation();
    const [deleteFeedback] = useDeleteFeedbackMutation();

    const handleTogglePublish = async (id: string, currentStatus: boolean) => {
        try {
            await toggleStatus(id).unwrap();
            toast.success(currentStatus ? "Feedback unpublished" : "Feedback published successfully");
        } catch {
            toast.error("Failed to update status");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this feedback? This action cannot be undone.")) return;
        try {
            await deleteFeedback(id).unwrap();
            toast.success("Feedback deleted successfully");
        } catch {
            toast.error("Failed to delete feedback");
        }
    };

    /* View mode */
    const [viewMode, setViewMode] = useState<"table" | "card">("table");

    /* Pagination */
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const handlePagination = (index: number, size: number) => {
        setPageIndex(index);
        setPageSize(size);
    };

    /* Filters */
    const [search, setSearch] = useState("");

    const filters: FilterField[] = [
        {
            key: "search",
            label: "Search",
            type: "text",
            placeholder: "Search by name or content...",
            value: search,
            onChange: setSearch,
        },
    ];

    /* ----------------------------------
       DATA FILTERING
    ----------------------------------- */
    const filteredData = useMemo(() => {
        return feedbacks.filter((item: NewsFeedback) => {
            const matchesSearch =
                !search ||
                item.fullname?.toLowerCase().includes(search.toLowerCase()) ||
                item.thought?.toLowerCase().includes(search.toLowerCase()) ||
                item.news?.title?.toLowerCase().includes(search.toLowerCase());
            return matchesSearch;
        });
    }, [feedbacks, search]);

    /* Pagination slice */
    const paginatedData = filteredData.slice(
        pageIndex * pageSize,
        pageIndex * pageSize + pageSize
    );

    /* ----------------------------------
       TABLE COLUMNS
    ----------------------------------- */
    const columns: ColumnDef<NewsFeedback>[] = [
        {
            accessorKey: "fullname",
            header: "User",
            cell: ({ row }) => (
                <div className="flex flex-col">
                    <span className="font-semibold text-[#094C81]">{row.getValue("fullname")}</span>
                    <span className="text-[10px] text-gray-400">{new Date(row.original.created_at).toLocaleDateString()}</span>
                </div>
            ),
        },
        {
            accessorKey: "news.title",
            header: "Article",
            cell: ({ row }) => (
                <div className="flex flex-col max-w-[200px]">
                    <span className="text-sm font-medium truncate italic text-gray-600">
                        {row.original.news?.title || "Unknown Article"}
                    </span>
                </div>
            ),
        },
        {
            accessorKey: "thought",
            header: "Thought",
            cell: ({ row }) => (
                <p className="text-sm text-gray-700 max-w-[300px] line-clamp-2" title={row.getValue("thought")}>
                    {row.getValue("thought")}
                </p>
            ),
        },
        {
            accessorKey: "is_published",
            header: "Status",
            cell: ({ row }) => {
                const isPublished = row.getValue("is_published") as boolean;
                return (
                    <Button
                        variant="ghost"
                        size="sm"
                        className={`flex items-center gap-1.5 h-8 px-2 rounded-full ${isPublished
                            ? "bg-green-50 text-green-700 hover:bg-green-100 border border-green-200"
                            : "bg-amber-50 text-amber-600 hover:bg-amber-100 border border-amber-200"
                            }`}
                        onClick={() => handleTogglePublish(row.original.news_feedback_id, isPublished)}
                    >
                        {isPublished ? (
                            <>
                                <CheckCircle2 className="h-3.5 w-3.5" />
                                <span className="text-xs font-semibold">Published</span>
                            </>
                        ) : (
                            <>
                                <XCircle className="h-3.5 w-3.5" />
                                <span className="text-xs font-semibold">Pending</span>
                            </>
                        )}
                    </Button>
                );
            },
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <div className="flex items-center gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        title="Delete Feedback"
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleDelete(row.original.news_feedback_id)}
                    >
                        <Trash className="h-4 w-4" />
                    </Button>
                </div>
            ),
        },
    ];

    /* ----------------------------------
       RENDER
    ----------------------------------- */
    return (
        <TableLayout
            title="News Feedback Management"
            description="Review and publish comments submitted by users on news articles."
            actions={[]}
            filters={filters}
            filterColumnsPerRow={1}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
        >
            <DataTable
                columns={columns}
                data={paginatedData}
                totalPageCount={Math.ceil(filteredData.length / pageSize)}
                handlePagination={handlePagination}
                tablePageSize={pageSize}
                currentIndex={pageIndex}
                isLoading={isLoading}
            />
        </TableLayout>
    );
}
