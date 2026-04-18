"use client";

import { useState, useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Eye, Plus, Trash, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
    useGetPetroleumProcessesQuery,
    useDeletePetroleumProcessMutation,
    useTogglePublishPetroleumProcessMutation
} from "@/redux/api/petroleumProcessApi";
import { PetroleumProcess } from "@/redux/types/petroleumProcess";
import { DataTable } from "@/features/template/component/DataTable";
import { TableLayout } from "@/features/template/component/TableLayout";
import { toast } from "sonner";
import type { FilterField, ActionButton } from "@/types/tableLayout";
import { ComponentGuard } from "@/components/auth/ComponentGuard";

export default function PetroleumProcessList() {
    const router = useRouter();

    /* API */
    const { data = [], isLoading } = useGetPetroleumProcessesQuery();
    const [deleteProcess] = useDeletePetroleumProcessMutation();
    const [togglePublish] = useTogglePublishPetroleumProcessMutation();

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
        return data.filter((item: PetroleumProcess) => {
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
    const columns: ColumnDef<PetroleumProcess>[] = [
        {
            accessorKey: "title",
            header: "Title",
            cell: ({ row }) => (
                <span className="font-medium text-[#094C81]">{row.getValue("title")}</span>
            ),
        },
        {
            accessorKey: "description",
            header: "Description",
            cell: ({ row }) => {
                const desc = row.getValue("description") as string;
                return <span className="text-sm text-gray-500 line-clamp-1 max-w-[300px]">{desc || "No description"}</span>;
            },
        },
        {
            id: "steps_count",
            header: "Steps",
            cell: ({ row }) => {
                const stepsCount = row.original.process_steps?.length || 0;
                return (
                    <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-xs font-medium border border-blue-100">
                        {stepsCount} {stepsCount === 1 ? "Step" : "Steps"}
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
                const id = row.original.petroleum_process_id;
                return (
                    <div className="flex items-center gap-1">
                        <ComponentGuard anyPermissions={["PETROLEUM_PROCESSES:PUBLISH"]}>
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
                        </ComponentGuard>
                        <ComponentGuard anyPermissions={["PETROLEUM_PROCESSES:UPDATE"]}>
                            <Button
                                variant="ghost"
                                size="icon"
                                title="Edit"
                                onClick={() => router.push(`/admin/sectors/petroleum/processes/create?id=${id}`)}
                            >
                                <Edit className="h-4 w-4 text-[#094C81]" />
                            </Button>
                        </ComponentGuard>
                        <ComponentGuard anyPermissions={["PETROLEUM_PROCESSES:DELETE"]}>
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
                        </ComponentGuard>
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
            label: "Add Process",
            icon: <Plus className="h-4 w-4" />,
            variant: "default",
            onClick: () => router.push(`/admin/sectors/petroleum/processes/create`),
            permissions: ["PETROLEUM_PROCESSES:CREATE"],
        },
    ];

    return (
        <TableLayout
            title="Petroleum Processes"
            description="Manage the workflow steps and informational blocks for the Petroleum sector."
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
