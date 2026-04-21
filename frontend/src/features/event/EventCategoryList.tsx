"use client";

import { useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Trash, Tag, Plus, Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import { DataTable } from "@/features/template/component/DataTable";
import { TableLayout } from "@/features/template/component/TableLayout";
import type { ActionButton } from "@/types/tableLayout";
import {
    useGetEventCategoriesQuery,
    useDeleteEventCategoryMutation,
} from "@/redux/api/eventCategoryApi";
import { EventCategory } from "@/redux/types/eventCategory";
import { EventCategoryFormModal } from "./EventCategoryFormModal";

export default function EventCategoryList() {
    const { data = [], isLoading } = useGetEventCategoriesQuery();
    const [deleteCategory, { isLoading: isDeleting }] = useDeleteEventCategoryMutation();

    /* Modal state */
    const [modalOpen, setModalOpen] = useState(false);
    const [editTarget, setEditTarget] = useState<EventCategory | undefined>(undefined);

    /* Pagination */
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const handlePagination = (index: number, size: number) => {
        setPageIndex(index);
        setPageSize(size);
    };

    const openCreate = () => {
        setEditTarget(undefined);
        setModalOpen(true);
    };

    const openEdit = (cat: EventCategory) => {
        setEditTarget(cat);
        setModalOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this category? It will be removed from all events.")) return;
        try {
            await deleteCategory(id).unwrap();
            toast.success("Category deleted");
        } catch {
            toast.error("Failed to delete category");
        }
    };

    /* Columns */
    const columns: ColumnDef<EventCategory>[] = [
        {
            accessorKey: "name",
            header: "Category Name",
            cell: ({ row }) => (
                <div className="flex items-center gap-2 font-medium">
                    <Tag className="h-4 w-4 text-golden-dark" />
                    {row.original.name}
                </div>
            ),
        },
        {
            accessorKey: "created_at",
            header: "Created At",
            cell: ({ row }) =>
                row.original.created_at
                    ? new Date(row.original.created_at).toLocaleDateString()
                    : "—",
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <div className="flex items-center gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEdit(row.original)}
                    >
                        <Pencil className="h-4 w-4 text-muted-foreground" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        disabled={isDeleting}
                        onClick={() => handleDelete(row.original.event_category_id)}
                    >
                        <Trash className="h-4 w-4 text-destructive" />
                    </Button>
                </div>
            ),
        },
    ];

    const paginatedData = useMemo(
        () => data.slice(pageIndex * pageSize, pageIndex * pageSize + pageSize),
        [data, pageIndex, pageSize]
    );

    const actions: ActionButton[] = [
        {
            label: "Add Category",
            icon: <Plus className="h-4 w-4" />,
            variant: "default",
            onClick: openCreate,
            permissions: ["EVENTS:CREATE"],
        },
    ];

    if (isLoading) {
        return (
            <TableLayout
                title="Event Categories"
                description="Manage standalone event category tags"
                actions={actions}
            >
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-golden-dark" />
                </div>
            </TableLayout>
        );
    }

    return (
        <>
            <TableLayout
                title="Event Categories"
                description="Manage standalone event category tags"
                actions={actions}
            >
                <DataTable
                    columns={columns}
                    data={paginatedData}
                    totalPageCount={Math.ceil(data.length / pageSize)}
                    handlePagination={handlePagination}
                    tablePageSize={pageSize}
                    currentIndex={pageIndex}
                />
            </TableLayout>

            <EventCategoryFormModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                editCategory={editTarget}
            />
        </>
    );
}
