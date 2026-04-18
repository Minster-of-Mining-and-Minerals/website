"use client";

import { useState, useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Edit, Eye, Plus, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useGetGamestonesQuery, useDeleteGamestoneMutation } from "@/redux/api/gamestoneApi";
import { Gamestone } from "@/redux/types/gamestone";
import { DataTable } from "@/features/template/component/DataTable";
import { TableLayout } from "@/features/template/component/TableLayout";
import type { FilterField, ActionButton } from "@/types/tableLayout";
import { getFileUrl } from "@/utils/fileUrl";
import { ComponentGuard } from "@/components/auth/ComponentGuard";

/* ----------------------------------
   COMPONENT
----------------------------------- */
export default function GemstonesList() {
    const router = useRouter();

    /* API */
    const { data = [], isLoading } = useGetGamestonesQuery();
    const [deleteGamestone] = useDeleteGamestoneMutation();

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
        // Only show root-level gamestones (no parent) in the list for clean hierarchy
        return data.filter((item: Gamestone) => {
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
    const columns: ColumnDef<Gamestone>[] = [
        {
            accessorKey: "title",
            header: "Title",
            cell: ({ row }) => (
                <span className="font-medium text-[#094C81]">{row.getValue("title")}</span>
            ),
        },
        {
            accessorKey: "discovered_date",
            header: "Discovered Date",
            cell: ({ row }) => {
                const date = row.getValue("discovered_date") as string | null;
                return date ? new Date(date).toLocaleDateString() : <span className="text-gray-400">—</span>;
            },
        },
        {
            accessorKey: "parent_id",
            header: "Type",
            cell: ({ row }) => {
                const parentId = row.getValue("parent_id");
                return parentId ? (
                    <span className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full">Sub-item</span>
                ) : (
                    <span className="text-xs bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full">Root</span>
                );
            },
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const id = row.original.gamestone_id;
                return (
                    <div className="flex items-center gap-1">
                        <ComponentGuard anyPermissions={["MINING_GAMESTONES:UPDATE"]}>
                            <Button
                                variant="ghost"
                                size="icon"
                                title="Edit"
                                onClick={() => router.push(`/admin/sectors/mining/gamestones/create?id=${id}`)}
                            >
                                <Eye className="h-4 w-4 text-[#094C81]" />
                            </Button>
                        </ComponentGuard>
                        <ComponentGuard anyPermissions={["MINING_GAMESTONES:DELETE"]}>
                            <Button
                                variant="ghost"
                                size="icon"
                                title="Delete"
                                onClick={async () => {
                                    if (confirm("Delete this gamestone?")) {
                                        await deleteGamestone(id);
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
            label: "Add Gemstone",
            icon: <Plus className="h-4 w-4" />,
            variant: "default",
            onClick: () => router.push("/admin/sectors/mining/gamestones/create"),
            permissions: ["MINING_GAMESTONES:CREATE"],
        },
    ];

    /* ----------------------------------
       CARD VIEW
    ----------------------------------- */
    const GamestoneCard = ({ item }: { item: Gamestone }) => {
        const imageUrl = item.attachment?.file_path ? getFileUrl(item.attachment.file_path) : null;
        return (
            <div className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                <div className="h-40 bg-gradient-to-br from-[#094C81]/10 to-[#094C81]/5 relative overflow-hidden">
                    {imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={imageUrl} alt={item.title} className="w-full h-full object-cover" />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-4xl opacity-20">💎</span>
                        </div>
                    )}
                </div>
                <div className="p-4">
                    <h3 className="font-semibold text-[#094C81] truncate">{item.title}</h3>
                    {item.discovered_date && (
                        <p className="text-xs text-gray-500 mt-1">
                            Discovered: {new Date(item.discovered_date).toLocaleDateString()}
                        </p>
                    )}
                    <div className="flex gap-2 mt-3">
                        <ComponentGuard anyPermissions={["MINING_GAMESTONES:UPDATE"]}>
                            <Button
                                variant="outline"
                                size="sm"
                                className="flex-1 border-[#094C81] text-[#094C81] hover:bg-[#094C81] hover:text-white text-xs"
                                onClick={() => router.push(`/admin/sectors/mining/gamestones/create?id=${item.gamestone_id}`)}
                            >
                                <Edit className="h-3 w-3 mr-1" /> Edit
                            </Button>
                        </ComponentGuard>
                        <ComponentGuard anyPermissions={["MINING_GAMESTONES:DELETE"]}>
                            <Button
                                variant="outline"
                                size="sm"
                                className="border-red-200 text-red-600 hover:bg-red-50 text-xs"
                                onClick={async () => {
                                    if (confirm("Delete this gamestone?")) {
                                        await deleteGamestone(item.gamestone_id);
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
            title="Manage Gemstones"
            description="View and manage all gemstones and sub-items"
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
                        <GamestoneCard key={item.gamestone_id} item={item} />
                    ))}
                </div>
            )}
        </TableLayout>
    );
}