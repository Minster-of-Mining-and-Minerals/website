"use client";

import { useState, useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Eye, Plus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
    useGetPetroleumObjectivesQuery,
    useDeletePetroleumObjectiveMutation
} from "@/redux/api/petroleumObjectiveApi";
import { PetroleumObjective } from "@/redux/types/petroleumObjective";
import { DataTable } from "@/features/template/component/DataTable";
import { TableLayout } from "@/features/template/component/TableLayout";
import { toast } from "sonner";
import type { FilterField, ActionButton } from "@/types/tableLayout";

export default function PetroleumObjectiveList() {
    const router = useRouter();

    /* API */
    const { data = [], isLoading } = useGetPetroleumObjectivesQuery();
    const [deleteObjective] = useDeletePetroleumObjectiveMutation();

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
            placeholder: "Search by title...",
            value: search,
            onChange: setSearch,
        },
    ];

    /* ----------------------------------
       DATA FILTERING
    ----------------------------------- */
    const filteredData = useMemo(() => {
        return data.filter((item: PetroleumObjective) => {
            const matchesSearch =
                !search ||
                item.title?.toLowerCase().includes(search.toLowerCase()) ||
                item.description?.toLowerCase().includes(search.toLowerCase());
            return matchesSearch;
        });
    }, [data, search]);

    /* Pagination slice */
    const paginatedData = filteredData.slice(
        pageIndex * pageSize,
        pageIndex * pageSize + pageSize
    );

    /* ----------------------------------
       TABLE COLUMNS
    ----------------------------------- */
    const columns: ColumnDef<PetroleumObjective>[] = [
        {
            accessorKey: "title",
            header: "Title",
            cell: ({ row }) => (
                <span className="font-medium text-[#094C81]">{row.getValue("title")}</span>
            ),
        },
        {
            accessorKey: "type",
            header: "Type",
            cell: ({ row }) => {
                const type = row.getValue("type") as string;
                return (
                    <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        type === "headline" 
                            ? "bg-amber-100 text-amber-700 border border-amber-200" 
                            : "bg-blue-50 text-blue-600 border border-blue-100"
                    }`}>
                        {type === "headline" ? "Headline" : "Other"}
                    </span>
                );
            },
        },
        {
            accessorKey: "description",
            header: "Description",
            cell: ({ row }) => {
                const desc = row.getValue("description") as string;
                return <span className="text-sm text-gray-500 line-clamp-1 max-w-[300px]">{desc}</span>;
            },
        },
        {
            accessorKey: "updated_at",
            header: "Last Updated",
            cell: ({ row }) => {
                const date = row.getValue("updated_at") as string | null;
                return date ? new Date(date).toLocaleDateString() : <span className="text-gray-400">—</span>;
            },
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const id = row.original.petroleum_objective_id;
                return (
                    <div className="flex items-center gap-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            title="Edit"
                            onClick={() => router.push(`/admin/sectors/petroleum/objectives/create?id=${id}`)}
                        >
                            <Edit className="h-4 w-4 text-[#094C81]" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            title="Delete"
                            onClick={async () => {
                                if (confirm("Are you sure you want to delete this objective?")) {
                                    try {
                                        await deleteObjective(id).unwrap();
                                        toast.success("Objective deleted successfully");
                                    } catch {
                                        toast.error("Failed to delete objective");
                                    }
                                }
                            }}
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
            label: "Add Objective",
            icon: <Plus className="h-4 w-4" />,
            variant: "default",
            onClick: () => router.push(`/admin/sectors/petroleum/objectives/create`),
        },
    ];

    return (
        <TableLayout
            title="Petroleum Objectives"
            description="Manage the strategic objectives for the Petroleum sector."
            actions={actions}
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
            />
        </TableLayout>
    );
}
