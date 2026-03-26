"use client";

import { useState, useEffect } from "react";
import { DataTable } from "@/features/template/component/DataTable";
import { TableLayout } from "@/features/template/component/TableLayout";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2, Plus, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    useGetRegionalOfficesQuery,
    useCreateRegionalOfficeMutation,
    useUpdateRegionalOfficeMutation,
    useDeleteRegionalOfficeMutation,
} from "@/redux/api/regionalOfficeApi";
import { useGetRegionsQuery } from "@/redux/api/regionApi";
import { RegionalOfficeContactCenter, LicensingContact } from "@/redux/types/regionalOffice";
import { toast } from "sonner";

type RegionalOffice = {
    id: string;
    region: string;
    region_id?: string;
    bureau: string;
    address: string;
    director?: string;
    email?: string;
    phone: string;
    extraContact?: {
        name: string;
        email: string;
        phone: string;
    };
};

export default function AdminContactRegionalOffices() {
    const [offices, setOffices] = useState<RegionalOffice[]>([]);
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [isEditing, setIsEditing] = useState(false);
    const [currentOffice, setCurrentOffice] = useState<Partial<RegionalOffice> | null>(null);

    // RTK Query hooks
    const { data: apiOffices = [], isLoading, isError, error, refetch } = useGetRegionalOfficesQuery();
    const { data: regions = [], isLoading: regionsLoading } = useGetRegionsQuery();
    const [createOffice, { isLoading: isCreating }] = useCreateRegionalOfficeMutation();
    const [updateOffice, { isLoading: isUpdating }] = useUpdateRegionalOfficeMutation();
    const [deleteOffice, { isLoading: isDeleting }] = useDeleteRegionalOfficeMutation();

    // Map API data to UI format
    useEffect(() => {
        if (apiOffices.length > 0) {
            const mappedOffices: RegionalOffice[] = apiOffices.map((office: RegionalOfficeContactCenter) => {
                const region = regions.find(r => r.region_id === office.region_id);
                const licensingContact = office.licensing_contacts && office.licensing_contacts.length > 0
                    ? office.licensing_contacts[0]
                    : undefined;

                return {
                    id: office.regional_office_id,
                    region: region?.name || office.region_id,
                    region_id: office.region_id,
                    bureau: office.bureau_name,
                    address: office.address || "",
                    director: office.director || "",
                    email: office.email || "",
                    phone: office.phone || "",
                    extraContact: licensingContact ? {
                        name: licensingContact.name,
                        email: licensingContact.email || "",
                        phone: licensingContact.phone || "",
                    } : undefined,
                };
            });
            setOffices(mappedOffices);
        } else {
            setOffices([]);
        }
    }, [apiOffices, regions]);

    const columns: ColumnDef<RegionalOffice>[] = [
        { accessorKey: "region", header: "Region" },
        { accessorKey: "director", header: "Director" },
        { accessorKey: "phone", header: "Phone" },
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
                        onClick={() => handleDelete(row.original.id)}
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
        setCurrentOffice({
            id: Date.now().toString(),
            region: "",
            region_id: "",
            bureau: "",
            address: "",
            phone: "",
        });
        setIsEditing(true);
    };

    const handleEdit = (office: RegionalOffice) => {
        setCurrentOffice(office);
        setIsEditing(true);
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm("Are you sure you want to delete this office?")) return;

        try {
            await deleteOffice(id).unwrap();
            toast.success("Regional office deleted successfully");
            refetch();
        } catch (error) {
            console.error("Failed to delete regional office:", error);
            toast.error("Failed to delete regional office");
        }
    };

    const handleSave = async () => {
        if (!currentOffice?.region_id || !currentOffice?.bureau) {
            toast.error("Please fill in all required fields");
            return;
        }

        try {
            const licensingContacts = currentOffice.extraContact?.name ? [{
                name: currentOffice.extraContact.name,
                email: currentOffice.extraContact.email || undefined,
                phone: currentOffice.extraContact.phone || undefined,
            }] : undefined;

            if (currentOffice.id && offices.find(o => o.id === currentOffice.id)) {
                // UPDATE
                await updateOffice({
                    id: currentOffice.id,
                    data: {
                        region_id: currentOffice.region_id,
                        bureau_name: currentOffice.bureau,
                        address: currentOffice.address || undefined,
                        director: currentOffice.director || undefined,
                        email: currentOffice.email || undefined,
                        phone: currentOffice.phone || undefined,
                        licensing_contacts: licensingContacts,
                    },
                }).unwrap();
                toast.success("Regional office updated successfully");
            } else {
                // CREATE
                await createOffice({
                    region_id: currentOffice.region_id,
                    bureau_name: currentOffice.bureau,
                    address: currentOffice.address || undefined,
                    director: currentOffice.director || undefined,
                    email: currentOffice.email || undefined,
                    phone: currentOffice.phone || undefined,
                    licensing_contacts: licensingContacts,
                }).unwrap();
                toast.success("Regional office created successfully");
            }

            setIsEditing(false);
            setCurrentOffice(null);
            refetch();
        } catch (error) {
            console.error("Failed to save regional office:", error);
            toast.error("Failed to save regional office");
        }
    };

    const handleCancel = () => {
        setIsEditing(false);
        setCurrentOffice(null);
    };

    // Loading state
    if (isLoading || regionsLoading) {
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
                    <p className="text-red-500 mb-4">Failed to load regional offices</p>
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
                        {currentOffice?.id && offices.find(o => o.id === currentOffice.id) ? "Edit Regional Office" : "Add Regional Office"}
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="region">
                                Region <span className="text-red-500">*</span>
                            </Label>
                            <Select
                                value={currentOffice?.region_id}
                                onValueChange={(value) => {
                                    const selectedRegion = regions.find(r => r.region_id === value);
                                    setCurrentOffice({
                                        ...currentOffice!,
                                        region_id: value,
                                        region: selectedRegion?.name || value
                                    });
                                }}
                                disabled={isSaving}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a region" />
                                </SelectTrigger>
                                <SelectContent>
                                    {regions.map((region) => (
                                        <SelectItem key={region.region_id} value={region.region_id}>
                                            {region.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="bureau">
                                Bureau Name <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="bureau"
                                value={currentOffice?.bureau || ""}
                                onChange={(e) => setCurrentOffice({ ...currentOffice!, bureau: e.target.value })}
                                placeholder="Full name of the bureau"
                                disabled={isSaving}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="address">Address</Label>
                            <Input
                                id="address"
                                value={currentOffice?.address || ""}
                                onChange={(e) => setCurrentOffice({ ...currentOffice!, address: e.target.value })}
                                placeholder="Office physical address"
                                disabled={isSaving}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="director">Director</Label>
                            <Input
                                id="director"
                                value={currentOffice?.director || ""}
                                onChange={(e) => setCurrentOffice({ ...currentOffice!, director: e.target.value })}
                                placeholder="Name of the director"
                                disabled={isSaving}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={currentOffice?.email || ""}
                                onChange={(e) => setCurrentOffice({ ...currentOffice!, email: e.target.value })}
                                placeholder="office@example.com"
                                disabled={isSaving}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                                id="phone"
                                value={currentOffice?.phone || ""}
                                onChange={(e) => setCurrentOffice({ ...currentOffice!, phone: e.target.value })}
                                placeholder="Phone number(s)"
                                disabled={isSaving}
                            />
                        </div>
                    </div>

                    <div className="space-y-4 pt-4 border-t">
                        <h4 className="font-semibold text-[#073954]">Licensing Contact (Optional)</h4>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                                <Label>Contact Name</Label>
                                <Input
                                    value={currentOffice?.extraContact?.name || ""}
                                    onChange={(e) => setCurrentOffice({
                                        ...currentOffice!,
                                        extraContact: {
                                            name: e.target.value,
                                            email: currentOffice?.extraContact?.email || "",
                                            phone: currentOffice?.extraContact?.phone || "",
                                        }
                                    })}
                                    disabled={isSaving}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Contact Email</Label>
                                <Input
                                    value={currentOffice?.extraContact?.email || ""}
                                    onChange={(e) => setCurrentOffice({
                                        ...currentOffice!,
                                        extraContact: {
                                            name: currentOffice?.extraContact?.name || "",
                                            email: e.target.value,
                                            phone: currentOffice?.extraContact?.phone || "",
                                        }
                                    })}
                                    disabled={isSaving}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Contact Phone</Label>
                                <Input
                                    value={currentOffice?.extraContact?.phone || ""}
                                    onChange={(e) => setCurrentOffice({
                                        ...currentOffice!,
                                        extraContact: {
                                            name: currentOffice?.extraContact?.name || "",
                                            email: currentOffice?.extraContact?.email || "",
                                            phone: e.target.value,
                                        }
                                    })}
                                    disabled={isSaving}
                                />
                            </div>
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
                            disabled={isSaving || !currentOffice?.region_id || !currentOffice?.bureau}
                        >
                            {isSaving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                            Save Office
                        </Button>
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <TableLayout
            title="Regional Offices"
            description="Manage contact information for regional mining bureaus"
            actions={[
                {
                    label: "Add Office",
                    icon: <Plus className="w-4 h-4" />,
                    onClick: handleAdd,
                }
            ]}
        >
            <DataTable
                columns={columns}
                data={offices}
                totalPageCount={Math.ceil(offices.length / pageSize)}
                handlePagination={handlePagination}
                tablePageSize={pageSize}
                currentIndex={pageIndex}
            />

            {offices.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                    No regional offices found. Click "Add Office" to create one.
                </div>
            )}
        </TableLayout>
    );
}