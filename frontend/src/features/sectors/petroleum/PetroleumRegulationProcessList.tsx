"use client";

import { useState, useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Plus, Trash, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
    useGetPetroleumRegulationProcessesQuery,
    useDeletePetroleumRegulationProcessMutation,
    useTogglePublishPetroleumRegulationProcessMutation
} from "@/redux/api/petroleumRegulationProcessApi";
import { PetroleumRegulationProcess } from "@/redux/types/petroleumRegulationProcess";
import { DataTable } from "@/features/template/component/DataTable";
import { TableLayout } from "@/features/template/component/TableLayout";
import { toast } from "sonner";
import type { FilterField, ActionButton } from "@/types/tableLayout";

export default function PetroleumRegulationProcessList() {
    const router = useRouter();

    /* API */
    const { data = [], isLoading } = useGetPetroleumRegulationProcessesQuery();
    const [deleteProcess] = useDeletePetroleumRegulationProcessMutation();
    const [togglePublish] = useTogglePublishPetroleumRegulationProcessMutation();

    /* View mode */
    const [viewMode, setViewMode] = useState<"table" | "card">("table");

    /* Pagination */
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const handlePagination = (index: number, size: number) => {
        setPageIndex(index);
        setPageSize(size);
    };

    /* Filters (No search key right now for this model, but keep placeholder) */
    const [search, setSearch] = useState("");

    const filters: FilterField[] = [
        {
            key: "search",
            label: "Search",
            type: "text",
            placeholder: "Search list...",
            value: search,
            onChange: setSearch,
        },
    ];

    /* ----------------------------------
       DATA FILTERING & SORTING
    ----------------------------------- */
    const filteredData = useMemo(() => {
        let result = [...data].sort((a, b) => {
            return new Date((b as any).created_at || "").getTime() - new Date((a as any).created_at || "").getTime();
        });

        if (search) {
            result = result.filter(() => true); // No explicit title to search right now in process, but this keeps the filter pattern.
        }

        return result;
    }, [data, search]);

    /* Pagination slice */
    const paginatedData = filteredData.slice(
        pageIndex * pageSize,
        pageIndex * pageSize + pageSize
    );

    /* ----------------------------------
       TABLE COLUMNS
    ----------------------------------- */
    const columns: ColumnDef<PetroleumRegulationProcess>[] = [
        {
            id: "id",
            header: "Process Group",
            cell: ({ row }) => {
                const index = data.findIndex(p => p.petroleum_regulation_process_id === row.original.petroleum_regulation_process_id);
                return (
                    <div>
                        <div className="font-medium text-[#094C81]">Process Group {index + 1}</div>
                        <div className="text-xs text-gray-500">
                            {(row.original as any).created_at ? new Date((row.original as any).created_at).toLocaleDateString() : ""}
                        </div>
                    </div>
                );
            },
        },
        {
            id: "regulations_count",
            header: "Regulations",
            cell: ({ row }) => {
                const count = row.original.regulations?.length || 0;
                return (
                    <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-xs font-medium border border-blue-100">
                        {count} {count === 1 ? "Regulation" : "Regulations"}
                    </span>
                );
            },
        },
        {
            id: "directives_count",
            header: "Directives",
            cell: ({ row }) => {
                const count = row.original.directives?.length || 0;
                return (
                    <span className="bg-purple-50 text-purple-600 px-2 py-0.5 rounded text-xs font-medium border border-purple-100">
                        {count} {count === 1 ? "Directive" : "Directives"}
                    </span>
                );
            },
        },
        {
            accessorKey: "published",
            header: "Status",
            cell: ({ row }) => {
                const isPublished = row.getValue("published") as boolean;
                return (
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${
                        isPublished ? "bg-green-100 text-green-700 border border-green-200" : "bg-gray-100 text-gray-700 border border-gray-200"
                    }`}>
                        {isPublished ? "Published" : "Draft"}
                    </span>
                );
            },
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const id = row.original.petroleum_regulation_process_id;
                return (
                    <div className="flex items-center gap-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            title={row.original.published ? "Unpublish" : "Publish"}
                            onClick={async () => {
                                if (confirm(`Are you sure you want to ${row.original.published ? "unpublish" : "publish"} this process?`)) {
                                    try {
                                        await togglePublish(id).unwrap();
                                        toast.success(`Process ${row.original.published ? "unpublished" : "published"} successfully`);
                                    } catch (err: any) {
                                        toast.error(err?.data?.message || `Failed to ${row.original.published ? "unpublish" : "publish"} process`);
                                    }
                                }
                            }}
                        >
                            <Globe className={`h-4 w-4 ${row.original.published ? "text-green-600" : "text-gray-400"}`} />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            title="Edit"
                            onClick={() => router.push(`/admin/sectors/petroleum/regulation-processes/create?id=${id}`)}
                        >
                            <Edit className="h-4 w-4 text-[#094C81]" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon"
                            title="Delete"
                            onClick={async () => {
                                if (confirm("Are you sure you want to delete this process?")) {
                                    try {
                                        await deleteProcess(id).unwrap();
                                        toast.success("Process deleted successfully");
                                    } catch (err: any) {
                                        toast.error(err?.data?.message || "Failed to delete process");
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
            label: "Create Process Profile",
            icon: <Plus className="h-4 w-4" />,
            variant: "default",
            onClick: () => router.push(`/admin/sectors/petroleum/regulation-processes/create`),
        },
    ];

    return (
        <TableLayout
            title="Petroleum Regulation Processes"
            description="Manage regulation processes, related regulations, and directives."
            actions={actions}
            filters={filters}
            filterColumnsPerRow={1}
            viewMode={viewMode}
            onViewModeChange={setViewMode}
            isLoading={isLoading}
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
