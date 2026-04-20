"use client";

import { useState, useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Plus, Download, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

import { DataTable } from "@/features/template/component/DataTable";
import { TableLayout } from "@/features/template/component/TableLayout";
import type { FilterField, ActionButton } from "@/types/tableLayout";

import AdminNewsCard from "@/components/pages/news-page-components/AdminNewsCard";

import {
    useGetNewsQuery,
    useDeleteNewsMutation,
} from "@/redux/api/newsApi";
import { News } from "@/redux/types/news";
import {
    extractExcerpt,
    extractHeadlineImage,
    extractTags,
    calculateReadingTime,
} from "@/utils/newsMapper";

/* ----------------------------------
   COMPONENT
----------------------------------- */
export default function NewsList() {
    const router = useRouter();

    /* API */
<<<<<<< HEAD
    const { data = [], isLoading, isError } = useGetNewsQuery({ isAdmin: true });
=======
    const { data = [], isLoading, isError } = useGetNewsQuery();
>>>>>>> c6b5a12ca2fb87bcbe1c0e8702430b6289687674
    const [deleteNews] = useDeleteNewsMutation();

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
    const [categoryFilter, setCategoryFilter] = useState("");
    const [search, setSearch] = useState("");

    const filters: FilterField[] = [
        {
            key: "category",
            label: "Category",
            type: "multiselect",
            placeholder: "Select category",
            value: categoryFilter,
            onChange: setCategoryFilter,
            options: [
                { label: "Projects", value: "Projects" },
                { label: "Training", value: "Training" },
                { label: "Policy", value: "Policy" },
            ],
        },
        {
            key: "search",
            label: "Search",
            type: "text",
            placeholder: "Search title",
            value: search,
            onChange: setSearch,
        },
    ];

    /* ----------------------------------
       DATA FILTERING
    ----------------------------------- */
    const filteredData = useMemo(() => {
        return data.filter((item: News) => {
<<<<<<< HEAD
            const tags = extractTags(item.tag_links || []);
            const itemCategory = tags[0] || "General";

            const matchesCategory =
                !categoryFilter || itemCategory === categoryFilter;
=======
            const matchesCategory =
                !categoryFilter || item.category === categoryFilter;
>>>>>>> c6b5a12ca2fb87bcbe1c0e8702430b6289687674

            const matchesSearch =
                !search ||
                item.title?.toLowerCase().includes(search.toLowerCase());

            return matchesCategory && matchesSearch;
        });
    }, [data, categoryFilter, search]);

    /* Pagination slice */
    const paginatedData = filteredData.slice(
        pageIndex * pageSize,
        pageIndex * pageSize + pageSize
    );

    /* ----------------------------------
       TABLE COLUMNS
    ----------------------------------- */
    const columns: ColumnDef<News>[] = [
        {
            accessorKey: "title",
            header: "Title",
        },
        {
            accessorKey: "category",
            header: "Category",
        },
        {
            accessorKey: "author",
            header: "Author",
        },
        {
            accessorKey: "views",
            header: "Views",
        },
        {
<<<<<<< HEAD
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = row.getValue("status") as string;
                let variant: "default" | "destructive" | "outline" | "secondary" = "outline";
                if (status === "published") variant = "default";
                if (status === "archived") variant = "secondary";
                if (status === "draft") variant = "destructive";

                return (
                    <Badge variant={variant}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Badge>
                );
            },
=======
            accessorKey: "published",
            header: "Status",
            cell: ({ row }) => (
                <Badge variant={row.getValue("published") ? "default" : "destructive"}>
                    {row.getValue("published") ? "Published" : "Draft"}
                </Badge>
            ),
>>>>>>> c6b5a12ca2fb87bcbe1c0e8702430b6289687674
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const newsId = row.original.news_id;

                return (
                    <div className="flex items-center gap-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => router.push(`/admin/news/${newsId}`)}
                        >
                            <Eye className="h-4 w-4" />
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteNews(newsId)}
                        >
                            <Trash className="h-4 w-4 text-destructive" />
                        </Button>
                    </div>
                );
            },
        },
    ];

    /* ----------------------------------
       TOP ACTIONS
    ----------------------------------- */
    const actions: ActionButton[] = [
        {
            label: "Export",
            icon: <Download className="h-4 w-4" />,
            variant: "outline",
            onClick: () => console.log("Export clicked"),
        },
        {
            label: "Add News",
            icon: <Plus className="h-4 w-4" />,
            variant: "default",
            onClick: () => router.push("/admin/news/create"),
        },
    ];

    /* ----------------------------------
       RENDER
    ----------------------------------- */
    return (
        <TableLayout
            title="Manage News"
            description="View and manage all news articles"
            actions={actions}
            filters={filters}
            filterColumnsPerRow={1}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
        >
            {viewMode === "table" ? (
                <DataTable
                    columns={columns}
                    data={paginatedData}
                    totalPageCount={Math.ceil(filteredData.length / pageSize)}
                    handlePagination={handlePagination}
                    tablePageSize={pageSize}
                    currentIndex={pageIndex}
                />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginatedData.map((item) => {
                        const excerpt = extractExcerpt(item.content);
<<<<<<< HEAD
                        const tags = extractTags(item.tag_links || []);
                        const headlineImage = extractHeadlineImage(item.attachments || []);
=======
                        const tags = extractTags(item.tag_links);
                        console.log("extracted images: ", extractHeadlineImage(item.attachments))
>>>>>>> c6b5a12ca2fb87bcbe1c0e8702430b6289687674

                        return (
                            <AdminNewsCard
                                key={item.news_id}
                                id={item.news_id}
                                title={item.title}
                                excerpt={excerpt}
<<<<<<< HEAD
                                media={headlineImage as any}
                                status={item.status}
                                publishedAt={item.published_at}
=======
                                media={extractHeadlineImage(item.attachments)}
                                date={new Date(item.created_at).toLocaleDateString()}
>>>>>>> c6b5a12ca2fb87bcbe1c0e8702430b6289687674
                                category={tags[0] || "General"}
                                tags={tags}
                                readingTime={() => calculateReadingTime(excerpt)}
                            />
                        );
                    })}
                </div>
            )}
        </TableLayout>
    );
}