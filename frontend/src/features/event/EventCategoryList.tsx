"use client";

import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Trash, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { DataTable } from "@/features/template/component/DataTable";
import { TableLayout } from "@/features/template/component/TableLayout";
import {
    useGetEventCategoriesQuery,
    useDeleteEventCategoryMutation,
} from "@/redux/api/eventCategoryApi";
import { EventCategory } from "@/redux/types/eventCategory";

export default function EventCategoryList() {
    const { data = [], isLoading } = useGetEventCategoriesQuery();
    const [deleteCategory] = useDeleteEventCategoryMutation();

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: "category",
            header: "Category Name",
            cell: ({ row }) => (
                <div className="flex items-center gap-2 font-medium">
                    <Tag className="h-4 w-4 text-golden-dark" />
                    {row.original.category}
                </div>
            ),
        },
        {
            accessorKey: "event.title",
            header: "Linked Event",
            cell: ({ row }) => (
                <div className="text-muted-foreground truncate max-w-[300px]">
                    {(row.original as any).event?.title || "N/A"}
                </div>
            ),
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                        if (confirm("Remove this category assignment?")) {
                            deleteCategory(row.original.event_category_id);
                        }
                    }}
                >
                    <Trash className="h-4 w-4 text-destructive" />
                </Button>
            ),
        },
    ];

    return (
        <TableLayout
            title="Event Categories"
            description="Manage category assignments across all events"
        >
            <DataTable
                columns={columns}
                data={data}
                isLoading={isLoading}
            />
        </TableLayout>
    );
}
