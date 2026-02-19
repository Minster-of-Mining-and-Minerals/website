"use client";

import { useState, useEffect } from "react";
import { DataTable } from "@/features/template/component/DataTable";
import { TableLayout } from "@/features/template/component/TableLayout";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2, Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type RegionalOffice = {
    id: string;
    region: string;
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

const initialOffices: RegionalOffice[] = [
    {
        id: "1",
        region: "Amhara",
        bureau: "The Amhara National Regional State Mines Resource Development Expansion Agency",
        address: "Bahir Dar City, in front of Wisdom Tower",
        director: "Haile Abebe",
        email: "haileabebe89@yahoo.com",
        phone: "0918 35 28 87 / 058-222-00-58",
    },
    {
        id: "2",
        region: "Dire Dawa",
        bureau: "Agriculture, Water, Mines and Energy Bureau",
        address: "P.O Box 18, Dire Dawa",
        director: "Ahmed Seid",
        email: "ahmedsaeed.184@gmail.com",
        phone: "0913 24 06 45 / 025 111 09 65",
    },
    {
        id: "3",
        region: "Oromia",
        bureau: "The Oromia Mines Resource Authority",
        address: "Addis Ababa",
        director: "Tesfaye Megersa",
        email: "tesfayemegersa211@gmail.com",
        phone: "0911 52 23 90 / 011 515 37 15",
    },
];

export default function AdminContactRegionalOffices() {
    const [offices, setOffices] = useState<RegionalOffice[]>([]);
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);
    const [isEditing, setIsEditing] = useState(false);
    const [currentOffice, setCurrentOffice] = useState<Partial<RegionalOffice> | null>(null);

    // Initial load from localStorage
    useEffect(() => {
        const saved = localStorage.getItem("regionalOffices");
        if (saved) {
            try {
                setOffices(JSON.parse(saved));
            } catch (e) {
                setOffices(initialOffices);
            }
        } else {
            setOffices(initialOffices);
        }
    }, []);

    const columns: ColumnDef<RegionalOffice>[] = [
        { accessorKey: "region", header: "Region" },
        { accessorKey: "director", header: "Director" },
        { accessorKey: "phone", header: "Phone" },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(row.original)} title="Edit">
                        <Edit2 className="w-4 h-4 text-blue-600" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(row.original.id)} title="Delete" className="text-destructive">
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

    const handleDelete = (id: string) => {
        if (window.confirm("Are you sure you want to delete this office?")) {
            const newOffices = offices.filter(o => o.id !== id);
            setOffices(newOffices);
            localStorage.setItem("regionalOffices", JSON.stringify(newOffices));
        }
    };

    const handleSave = () => {
        if (!currentOffice?.region || !currentOffice?.bureau) return;

        let newOffices;
        if (offices.find(o => o.id === currentOffice.id)) {
            newOffices = offices.map(o => o.id === currentOffice.id ? (currentOffice as RegionalOffice) : o);
        } else {
            newOffices = [...offices, currentOffice as RegionalOffice];
        }

        setOffices(newOffices);
        localStorage.setItem("regionalOffices", JSON.stringify(newOffices));
        setIsEditing(false);
        setCurrentOffice(null);
    };

    if (isEditing) {
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
                            <Label htmlFor="region">Region</Label>
                            <Input
                                id="region"
                                value={currentOffice?.region || ""}
                                onChange={(e) => setCurrentOffice({ ...currentOffice!, region: e.target.value })}
                                placeholder="e.g. Amhara"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="bureau">Bureau Name</Label>
                            <Input
                                id="bureau"
                                value={currentOffice?.bureau || ""}
                                onChange={(e) => setCurrentOffice({ ...currentOffice!, bureau: e.target.value })}
                                placeholder="Full name of the bureau"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="address">Address</Label>
                            <Input
                                id="address"
                                value={currentOffice?.address || ""}
                                onChange={(e) => setCurrentOffice({ ...currentOffice!, address: e.target.value })}
                                placeholder="Office physical address"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="director">Director</Label>
                            <Input
                                id="director"
                                value={currentOffice?.director || ""}
                                onChange={(e) => setCurrentOffice({ ...currentOffice!, director: e.target.value })}
                                placeholder="Name of the director"
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
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                                id="phone"
                                value={currentOffice?.phone || ""}
                                onChange={(e) => setCurrentOffice({ ...currentOffice!, phone: e.target.value })}
                                placeholder="Phone number(s)"
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
                                        extraContact: { ...currentOffice?.extraContact!, name: e.target.value }
                                    } as any)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Contact Email</Label>
                                <Input
                                    value={currentOffice?.extraContact?.email || ""}
                                    onChange={(e) => setCurrentOffice({
                                        ...currentOffice!,
                                        extraContact: { ...currentOffice?.extraContact!, email: e.target.value }
                                    } as any)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Contact Phone</Label>
                                <Input
                                    value={currentOffice?.extraContact?.phone || ""}
                                    onChange={(e) => setCurrentOffice({
                                        ...currentOffice!,
                                        extraContact: { ...currentOffice?.extraContact!, phone: e.target.value }
                                    } as any)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-4">
                        <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
                        <Button onClick={handleSave} className="bg-golden-dark hover:bg-golden-darkHover">Save Office</Button>
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
        </TableLayout>
    );
}
