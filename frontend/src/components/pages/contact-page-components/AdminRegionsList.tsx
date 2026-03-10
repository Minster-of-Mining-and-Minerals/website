"use client";

import { useState } from "react";
import { DataTable } from "@/features/template/component/DataTable";
import { TableLayout } from "@/features/template/component/TableLayout";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2, Plus, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    useGetRegionsQuery,
    useCreateRegionMutation,
    useUpdateRegionMutation,
    useDeleteRegionMutation,
} from "@/redux/api/regionApi";
import { Region } from "@/redux/types/region";
import { toast } from "sonner";

export default function AdminRegionList() {
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [isEditing, setIsEditing] = useState(false);
    const [currentRegion, setCurrentRegion] = useState<Partial<Region> | null>(null);

    // RTK Query hooks
    const { data: regions = [], isLoading, isError, error, refetch } = useGetRegionsQuery();
    const [createRegion, { isLoading: isCreating }] = useCreateRegionMutation();
    const [updateRegion, { isLoading: isUpdating }] = useUpdateRegionMutation();
    const [deleteRegion, { isLoading: isDeleting }] = useDeleteRegionMutation();

    const columns: ColumnDef<Region>[] = [
        {
            accessorKey: "code",
            header: "Code",
            cell: ({ row }) => <span className="font-medium">{row.original.code}</span>
        },
        {
            accessorKey: "name",
            header: "Region Name",
            cell: ({ row }) => row.original.name
        },
        {
            id: "created_at",
            header: "Created",
            cell: ({ row }) => new Date(row.original.created_at).toLocaleDateString()
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <div className="flex items-center gap-1">
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(row.original)}
                        title="Edit"
                        disabled={isDeleting}
                    >
                        <Edit2 className="w-4 h-4 text-blue-600" />
                    </Button>
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(row.original.region_id)}
                        title="Delete"
                        className="text-destructive"
                        disabled={isDeleting}
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>
            ),
        },
    ];

    const handlePagination = (index: number, size: number) => {
        setPageIndex(index);
        setPageSize(size);
    };

    const handleAdd = () => {
        setCurrentRegion({
            region_id: "",
            code: "",
            name: "",
        });
        setIsEditing(true);
    };

    const handleEdit = (region: Region) => {
        setCurrentRegion(region);
        setIsEditing(true);
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this region?")) return;

        try {
            await deleteRegion(id).unwrap();
            toast.success("Region deleted successfully");
            refetch(); // Refresh the list
        } catch (error) {
            console.error("Failed to delete region:", error);
            toast.error("Failed to delete region");
        }
    };

    const handleSave = async () => {
        if (!currentRegion?.code || !currentRegion?.name) {
            toast.error("Please fill in all required fields");
            return;
        }

        try {
            if (currentRegion.region_id) {
                // UPDATE existing region
                await updateRegion({
                    id: currentRegion.region_id,
                    data: {
                        code: currentRegion.code,
                        name: currentRegion.name,
                    },
                }).unwrap();
                toast.success("Region updated successfully");
            } else {
                // CREATE new region
                await createRegion({
                    code: currentRegion.code,
                    name: currentRegion.name,
                }).unwrap();
                toast.success("Region created successfully");
            }

            setIsEditing(false);
            setCurrentRegion(null);
            refetch(); // Refresh the list
        } catch (error) {
            console.error("Failed to save region:", error);
            toast.error("Failed to save region");
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setCurrentRegion(null);
    };

    // Loading state
    if (isLoading) {
        return (
            <Card className="shadow-sm border-gray-200">
                <CardContent className="p-6 flex justify-center items-center min-h-[400px]">
                    <Loader2 className="w-8 h-8 animate-spin text-golden-dark" />
                </CardContent>
            </Card>
        );
    }

    // Error state
    if (isError) {
        return (
            <Card className="shadow-sm border-gray-200">
                <CardContent className="p-6 flex flex-col justify-center items-center min-h-[400px]">
                    <p className="text-red-500 mb-4">Failed to load regions</p>
                    <Button onClick={() => refetch()} variant="outline">
                        Try Again
                    </Button>
                </CardContent>
            </Card>
        );
    }

    if (isEditing) {
        const isSaving = isCreating || isUpdating;

        return (
            <Card className="shadow-sm border-gray-200">
                <CardHeader className="bg-gray-50/50 border-b">
                    <CardTitle className="text-xl font-bold text-[#073954]">
                        {currentRegion?.region_id ? "Edit Region" : "Add New Region"}
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="code">
                                Region Code <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="code"
                                value={currentRegion?.code || ""}
                                onChange={(e) => setCurrentRegion({ ...currentRegion!, code: e.target.value })}
                                placeholder="e.g. AM"
                                disabled={isSaving}
                                maxLength={10}
                            />
                            <p className="text-xs text-gray-500">Short code for the region (e.g., AM, OR, SN)</p>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="name">
                                Region Name <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="name"
                                value={currentRegion?.name || ""}
                                onChange={(e) => setCurrentRegion({ ...currentRegion!, name: e.target.value })}
                                placeholder="e.g. Amhara"
                                disabled={isSaving}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        <Button
                            variant="outline"
                            onClick={handleCancel}
                            disabled={isSaving}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSave}
                            className="bg-golden-dark hover:bg-golden-darkHover"
                            disabled={isSaving || !currentRegion?.code || !currentRegion?.name}
                        >
                            {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                            {currentRegion?.region_id ? "Update" : "Create"} Region
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <TableLayout
            title="Regions"
            description="Manage regions for regional mining bureaus"
            actions={[
                {
                    label: "Add Region",
                    icon: <Plus className="w-4 h-4" />,
                    onClick: handleAdd,
                }
            ]}
        >
            <DataTable
                columns={columns}
                data={regions}
                totalPageCount={Math.ceil(regions.length / pageSize)}
                handlePagination={handlePagination}
                tablePageSize={pageSize}
                currentIndex={pageIndex}
            />

            {regions.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    No regions found. Click "Add Region" to create one.
                </div>
            )}
        </TableLayout>
    );
}