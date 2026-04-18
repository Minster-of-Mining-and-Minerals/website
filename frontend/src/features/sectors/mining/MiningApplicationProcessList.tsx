"use client";

import { useState, useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Plus, Trash, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
    useGetMiningApplicationProcessesQuery,
    useDeleteMiningApplicationProcessMutation,
    useTogglePublishStatusMutation
} from "@/redux/api/miningApplicationProcessApi";
import { MiningApplicationProcess } from "@/redux/types/miningApplicationProcess";
import { DataTable } from "@/features/template/component/DataTable";
import { TableLayout } from "@/features/template/component/TableLayout";
import { toast } from "sonner";
import type { FilterField, ActionButton } from "@/types/tableLayout";
import { ComponentGuard } from "@/components/auth/ComponentGuard";

export default function MiningApplicationProcessList() {
    const router = useRouter();

    /* API */
    const { data = [], isLoading } = useGetMiningApplicationProcessesQuery();
    const [deleteProcess] = useDeleteMiningApplicationProcessMutation();
    const [togglePublish] = useTogglePublishStatusMutation();

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
            return new Date(b.created_at || "").getTime() - new Date(a.created_at || "").getTime();
        });

        if (search) {
            result = result.filter((item) =>
                item.title?.toLowerCase().includes(search.toLowerCase())
            );
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
    const columns: ColumnDef<MiningApplicationProcess>[] = [
        {
            id: "title",
            header: "Title",
            cell: ({ row }) => (
                <div>
                    <div className="font-medium text-[#094C81]">{row.original.title}</div>
                    <div className="text-xs text-gray-500">
                        {row.original.created_at ? new Date(row.original.created_at).toLocaleDateString() : ""}
                    </div>
                </div>
            ),
        },
        {
            id: "application_types",
            header: "Application Types",
            cell: ({ row }) => {
                const count = row.original.application_types?.length || 0;
                return (
                    <span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-xs font-medium border border-blue-100">
                        {count} {count === 1 ? "Type" : "Types"}
                    </span>
                );
            },
        },
        {
            id: "objectives",
            header: "Objectives",
            cell: ({ row }) => {
                const count = row.original.objectives?.length || 0;
                return (
                    <span className="bg-purple-50 text-purple-600 px-2 py-0.5 rounded text-xs font-medium border border-purple-100">
                        {count} {count === 1 ? "Objective" : "Objectives"}
                    </span>
                );
            },
        },
        {
            accessorKey: "publish",
            header: "Status",
            cell: ({ row }) => {
                const isPublished = row.getValue("publish") as boolean;
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
                const id = row.original.mining_application_process_id;
                const isPublished = row.original.publish;
                return (
                    <div className="flex items-center gap-1">
                        <ComponentGuard anyPermissions={["MINING_APPLICATION_PROCESSES:UPDATE"]}>
                            <Button
                                variant="ghost"
                                size="icon"
                                title={isPublished ? "Unpublish" : "Publish"}
                                onClick={async () => {
                                    if (confirm(`Are you sure you want to ${isPublished ? "unpublish" : "publish"} this process?`)) {
                                        try {
                                            await togglePublish({ id, data: { publish: !isPublished } }).unwrap();
                                            toast.success(`Process ${isPublished ? "unpublished" : "published"} successfully`);
                                        } catch (err: any) {
                                            toast.error(err?.data?.message || `Failed to ${isPublished ? "unpublish" : "publish"} process`);
                                        }
                                    }
                                }}
                            >
                                <Globe className={`h-4 w-4 ${isPublished ? "text-green-600" : "text-gray-400"}`} />
                            </Button>
                        </ComponentGuard>
                        <ComponentGuard anyPermissions={["MINING_APPLICATION_PROCESSES:UPDATE"]}>
                            <Button
                                variant="ghost"
                                size="icon"
                                title="Edit"
                                onClick={() => router.push(`/admin/sectors/mining/application-processes/create?id=${id}`)}
                            >
                                <Edit className="h-4 w-4 text-[#094C81]" />
                            </Button>
                        </ComponentGuard>
                        <ComponentGuard anyPermissions={["MINING_APPLICATION_PROCESSES:DELETE"]}>
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
            label: "Create Process Profile",
            icon: <Plus className="h-4 w-4" />,
            variant: "default",
            onClick: () => router.push(`/admin/sectors/mining/application-processes/create`),
            permissions: ["MINING_APPLICATION_PROCESSES:CREATE"],
        },
    ];

    return (
        <TableLayout
            title="Mining Application Processes"
            description="Manage application processes, types, and required objectives."
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
