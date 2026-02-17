"use client";

import { useState } from "react";
import { DataTable } from "@/features/template/component/DataTable";
import { TableLayout } from "@/features/template/component/TableLayout";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Plus, Download, Eye } from "lucide-react";
import type { FilterField, ActionButton } from "@/types/tableLayout";
import NewsCard from "@/components/pages/news-page-components/NewsCard";
import AdminNewsCard from "@/components/pages/news-page-components/AdminNewsCard";
import { useRouter } from "next/navigation";
type News = {
    id: string;
    title: string;
    category: string;
    author: string;
    createdAt: string;
    views: number;
    published: boolean;
    excerpt: string;
    image: string;
    tags: string[];
    readingTime: (text: string) => number;
};

const mockNews: News[] = [
    {
        id: "NEWS001",
        title: "Mining Sector Growth in 2026",
        category: "Projects",
        author: "Admin",
        createdAt: "2026-02-10",
        views: 120,
        published: true,
        excerpt: "An overview of the projected growth in mining sector activities and investments for 2026...",
        image: "/home-1.jpg",
        tags: ["Mining", "Economy"],
        readingTime: (text) => Math.ceil(text.split(" ").length / 200),
    },
    {
        id: "NEWS002",
        title: "New Training Program for Engineers",
        category: "Training",
        author: "Admin",
        createdAt: "2026-02-09",
        views: 50,
        published: false,
        excerpt: "Introducing a comprehensive training program to boost skills of engineers in modern projects...",
        image: "/home-1.jpg",
        tags: ["Engineering", "Skills"],
        readingTime: (text) => Math.ceil(text.split(" ").length / 200),
    },
    {
        id: "NEWS003",
        title: "Policy Update on Mineral Extraction",
        category: "Policy",
        author: "Admin",
        createdAt: "2026-02-08",
        views: 75,
        published: true,
        excerpt: "Government announces new regulations and policies regarding mineral extraction in the region...",
        image: "/home-1.jpg",
        tags: ["Policy", "Regulations"],
        readingTime: (text) => Math.ceil(text.split(" ").length / 200),
    },
    {
        id: "NEWS004",
        title: "Community Mining Awareness Campaign",
        category: "Projects",
        author: "Admin",
        createdAt: "2026-02-07",
        views: 33,
        published: false,
        excerpt: "A campaign to educate communities on safe mining practices and environmental sustainability...",
        image: "/home-1.jpg",
        tags: ["Community", "Awareness"],
        readingTime: (text) => Math.ceil(text.split(" ").length / 200),
    },
];

const columns: ColumnDef<News>[] = [
    { accessorKey: "title", header: "Title" },
    { accessorKey: "category", header: "Category" },
    { accessorKey: "author", header: "Author" },
    { accessorKey: "views", header: "Views" },
    {
        accessorKey: "published",
        header: "Status",
        cell: ({ row }) => {
            const published = row.getValue("published") as boolean;
            return (
                <Badge variant={published ? "default" : "destructive"}>
                    {published ? "Published" : "Draft"}
                </Badge>
            );
        },
    },
    {
        id: "actions",
        header: "Actions",
        cell: () => (
            <Button variant="ghost" size="icon">
                <Eye />
            </Button>
        ),
    },
];

const AdminNewsTable = () => {
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [categoryFilter, setCategoryFilter] = useState("");
    const [search, setSearch] = useState("");
    const [viewMode, setViewMode] = useState<"table" | "card">("table");
    const router = useRouter();
    const handlePagination = (index: number, size: number) => {
        setPageIndex(index);
        setPageSize(size);
    };

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
    ];

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

    const filteredNews = mockNews.filter((item) => {
        const matchesCategory = !categoryFilter || item.category === categoryFilter;
        const matchesSearch = !search || item.title.toLowerCase().includes(search.toLowerCase());
        return matchesCategory && matchesSearch;
    });

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
                    data={filteredNews}
                    totalPageCount={Math.ceil(filteredNews.length / pageSize)}
                    handlePagination={handlePagination}
                    tablePageSize={pageSize}
                    currentIndex={pageIndex}
                />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredNews.map((item) => (
                        <AdminNewsCard
                            key={item.id}
                            id={parseInt(item.id.replace(/\D/g, ""))} // convert NEWS001 -> 1
                            title={item.title}
                            excerpt={item.excerpt}
                            image={item.image}
                            date={item.createdAt}
                            category={item.category}
                            tags={item.tags}
                            readingTime={item.readingTime}
                        />
                    ))}
                </div>
            )}
        </TableLayout>
    );
};

export default AdminNewsTable;