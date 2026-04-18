"use client";

import { useState, useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Eye, Plus, Trash, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useGetResourcesQuery, useDeleteResourceMutation } from "@/redux/api/resourceApi";
import { Resource } from "@/redux/types/resource";
import { DataTable } from "@/features/template/component/DataTable";
import { TableLayout } from "@/features/template/component/TableLayout";
import type { FilterField, ActionButton } from "@/types/tableLayout";
import { ComponentGuard } from "@/components/auth/ComponentGuard";

/* ----------------------------------
   COMPONENT
----------------------------------- */
interface ResourceListProps {
    sector: string;
}
export default function ResourceList({ sector }: ResourceListProps) {
    const router = useRouter();
    const enumValue = sector == "geothermal" ? "geology" : sector;
    const routePath = `/admin/sectors/${sector}/resources/create`;
    const title = sector.charAt(0).toUpperCase() + sector.slice(1);
    const description = `Manage ${title} resources`;
    const permPrefix = sector ? sector.toUpperCase() : "MINING";

    /* API */
    const { data = [], isLoading } = useGetResourcesQuery({ sector: enumValue });
    const [deleteResource] = useDeleteResourceMutation();

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
        return data.filter((item: Resource) => {
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
    const columns: ColumnDef<Resource>[] = [
        {
            accessorKey: "title",
            header: "Title",
            cell: ({ row }) => (
                <span className="font-medium text-[#094C81]">{row.getValue("title")}</span>
            ),
        },
        {
            accessorKey: "created_at",
            header: "Created Date",
            cell: ({ row }) => {
                const date = row.getValue("created_at") as string | null;
                return date ? new Date(date).toLocaleDateString() : <span className="text-gray-400">—</span>;
            },
        },
        {
            id: "attachments_count",
            header: "Attachments",
            cell: ({ row }) => {
                const attachments = row.original.attachments || [];
                return (
                    <span className="text-xs bg-gray-100 text-gray-700 border border-gray-200 px-2 py-0.5 rounded-full">
                        {attachments.length} files
                    </span>
                );
            },
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const id = row.original.resource_id;
                return (
                    <div className="flex items-center gap-1">
                        <ComponentGuard anyPermissions={[`${permPrefix}_RESOURCES:UPDATE` as any]}>
                            <Button
                                variant="ghost"
                                size="icon"
                                title="Edit"
                                onClick={() => router.push(`/admin/sectors/mining/resources/create?id=${id}`)}
                            >
                                <Eye className="h-4 w-4 text-[#094C81]" />
                            </Button>
                        </ComponentGuard>
                        <ComponentGuard anyPermissions={[`${permPrefix}_RESOURCES:DELETE` as any]}>
                            <Button
                                variant="ghost"
                                size="icon"
                                title="Delete"
                                onClick={async () => {
                                    if (confirm("Delete this resource?")) {
                                        await deleteResource(id);
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
            label: "Add Resource",
            icon: <Plus className="h-4 w-4" />,
            variant: "default",
            onClick: () => router.push(routePath),
            permissions: [`${permPrefix}_RESOURCES:CREATE` as any],
        },
    ];

    /* ----------------------------------
       CARD VIEW
    ----------------------------------- */
    const ResourceCard = ({ item }: { item: Resource }) => {
        return (
            <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                <div className="h-40 bg-gradient-to-br from-[#094C81]/10 to-[#094C81]/5 relative overflow-hidden flex items-center justify-center">
                    <FileText className="h-16 w-16 text-[#094C81] opacity-20" />
                </div>
                <div className="p-4">
                    <h3 className="font-semibold text-[#094C81] truncate">{item.title}</h3>
                    <p className="text-xs text-gray-500 mt-1">
                        Created: {item.created_at ? new Date(item.created_at).toLocaleDateString() : "—"}
                    </p>
                    <div className="flex gap-2 mt-3">
                        <ComponentGuard anyPermissions={[`${permPrefix}_RESOURCES:UPDATE` as any]}>
                            <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 border-[#094C81] text-[#094C81] hover:bg-[#094C81] hover:text-white text-xs"
                                onClick={() => router.push(`/admin/sectors/mining/resources/create?id=${item.resource_id}`)}
                            >
                                <Edit className="h-3 w-3 mr-1" /> Edit
                            </Button>
                        </ComponentGuard>
                        <ComponentGuard anyPermissions={[`${permPrefix}_RESOURCES:DELETE` as any]}>
                            <Button
                                variant="outline"
                                size="sm"
                                className="border-red-200 text-red-600 hover:bg-red-50 text-xs"
                                onClick={async () => {
                                    if (confirm("Delete this resource?")) {
                                        await deleteResource(item.resource_id);
                                    }
                                }}
                            >
                                <Trash className="h-3 w-3" />
                            </Button>
                        </ComponentGuard>
                    </div>
                </div>
            </div>
        );
    };

    /* ----------------------------------
       RENDER
    ----------------------------------- */
    return (
        <TableLayout
            title={`Manage ${title} Resources`}
            description={`View and manage all documents, reports, and assets for ${title}`}
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
                    {paginatedData.map((item) => (
                        <ResourceCard key={item.resource_id} item={item} />
                    ))}
                </div>
            )}
        </TableLayout>
    );
}
