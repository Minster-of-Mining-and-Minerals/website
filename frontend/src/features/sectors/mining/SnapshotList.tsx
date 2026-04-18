"use client";

import { useState, useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Eye, Plus, Trash, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useGetSnapshotsQuery, useDeleteSnapshotMutation, usePublishSnapshotMutation } from "@/redux/api/snapshotApi";
import { Snapshot } from "@/redux/types/snapshot";
import { DataTable } from "@/features/template/component/DataTable";
import { TableLayout } from "@/features/template/component/TableLayout";
import { toast } from "sonner";
import type { FilterField, ActionButton } from "@/types/tableLayout";
import { ComponentGuard } from "@/components/auth/ComponentGuard";

/* ----------------------------------
   COMPONENT
----------------------------------- */
interface SnapshotListProps {
    sector: string;
}
export default function SnapshotList({ sector }: SnapshotListProps) {
    const router = useRouter();

    /* API */
    const { data = [], isLoading } = useGetSnapshotsQuery({ sector: sector || "mining" });
    const [deleteSnapshot] = useDeleteSnapshotMutation();
    const [publishSnapshot] = usePublishSnapshotMutation();

    const permPrefix = sector ? sector.toUpperCase() : "MINING";

    let sectorRoute = sector;
    if (sector === "geothermal") {
        sectorRoute = "geology";
    }
    const handleTogglePublish = async (id: string, currentStatus: boolean) => {
        try {
            await publishSnapshot(id).unwrap();
            toast.success(currentStatus ? "Snapshot unpublished" : "Snapshot published");
        } catch {
            toast.error("Failed to update status");
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
            placeholder: "Search by title...",
            value: search,
            onChange: setSearch,
        },
    ];

    /* ----------------------------------
       DATA FILTERING
    ----------------------------------- */
    const filteredData = useMemo(() => {
        return data.filter((item: Snapshot) => {
            const matchesSearch =
                !search ||
                item.title?.toLowerCase().includes(search.toLowerCase());
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
    const columns: ColumnDef<Snapshot>[] = [
        {
            accessorKey: "title",
            header: "Title",
            cell: ({ row }) => (
                <span className="font-medium text-[#094C81]">{row.getValue("title")}</span>
            ),
        },
        {
            accessorKey: "sector",
            header: "Sector",
            cell: ({ row }) => (
                <span className="capitalize text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
                    {row.getValue("sector")}
                </span>
            ),
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
            accessorKey: "is_published",
            header: "Status",
            cell: ({ row }) => {
                const isPublished = row.getValue("is_published") as boolean;
                const id = row.original.snapshot_id;
                return (
                    <ComponentGuard anyPermissions={[`${permPrefix}_SNAPSHOTS:UPDATE` as any]}>
                        <Button
                            variant="ghost"
                            size="sm"
                            className={`flex items-center gap-1.5 h-8 px-2 rounded-full ${isPublished
                                ? "bg-green-50 text-green-700 hover:bg-green-100 border border-green-200"
                                : "bg-gray-50 text-gray-500 hover:bg-gray-100 border border-gray-200"
                                }`}
                            onClick={() => handleTogglePublish(id, isPublished)}
                        >
                            {isPublished ? (
                                <>
                                    <CheckCircle2 className="h-3.5 w-3.5" />
                                    <span className="text-xs font-semibold">Published</span>
                                </>
                            ) : (
                                <>
                                    <XCircle className="h-3.5 w-3.5" />
                                    <span className="text-xs font-semibold">Offline</span>
                                </>
                            )}
                        </Button>
                    </ComponentGuard>
                );
            },
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const id = row.original.snapshot_id;
                return (
                    <div className="flex items-center gap-1">
                        <ComponentGuard anyPermissions={[`${permPrefix}_SNAPSHOTS:UPDATE` as any]}>
                            <Button
                                variant="ghost"
                                size="icon"
                                title="Edit"
                                onClick={() => router.push(`/admin/sectors/${sectorRoute}/snapshots/create?id=${id}`)}
                            >
                                <Edit className="h-4 w-4 text-[#094C81]" />
                            </Button>
                        </ComponentGuard>
                        <ComponentGuard anyPermissions={[`${permPrefix}_SNAPSHOTS:DELETE` as any]}>
                            <Button
                                variant="ghost"
                                size="icon"
                                title="Delete"
                                onClick={async () => {
                                    if (confirm("Delete this snapshot?")) {
                                        await deleteSnapshot(id);
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
            label: "Add Snapshot",
            icon: <Plus className="h-4 w-4" />,
            variant: "default",
            onClick: () => router.push(`/admin/sectors/${sectorRoute}/snapshots/create`),
            permissions: [`${permPrefix}_SNAPSHOTS:CREATE` as any],
        },
    ];

    /* ----------------------------------
       RENDER
    ----------------------------------- */
    return (
        <TableLayout
            title="Manage Mining Snapshots"
            description="View and manage content for the public Mining page"
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
