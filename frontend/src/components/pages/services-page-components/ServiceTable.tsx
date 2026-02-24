"use client";

import React from "react";
import { DataTable } from "@/features/template/component/DataTable";
import { TableLayout } from "@/features/template/component/TableLayout";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Edit2, Trash2, Plus, FileCheck, Map, FlaskConical, Droplets, TrendingUp, ShieldCheck } from "lucide-react";
import { Service } from "./AdminServicesList";

const iconMap: Record<string, any> = {
    licensing: FileCheck,
    geology: Map,
    laboratory: FlaskConical,
    petroleum: Droplets,
    investment: TrendingUp,
    regulation: ShieldCheck,
};

interface ServiceTableProps {
    services: Service[];
    pageIndex: number;
    pageSize: number;
    onPagination: (index: number, size: number) => void;
    onAdd: () => void;
    onEdit: (service: Service) => void;
    onDelete: (id: string) => void;
}

export default function ServiceTable({
    services,
    pageIndex,
    pageSize,
    onPagination,
    onAdd,
    onEdit,
    onDelete
}: ServiceTableProps) {
    const columns: ColumnDef<Service>[] = [
        { accessorKey: "title", header: "Title" },
        {
            accessorKey: "description",
            header: "Description",
            cell: ({ row }) => (
                <div className="max-w-[300px] truncate" title={row.original.description}>
                    {row.original.description}
                </div>
            )
        },
        {
            accessorKey: "iconName",
            header: "Icon",
            cell: ({ row }) => {
                const Icon = iconMap[row.original.iconName] || FileCheck;
                return (
                    <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-golden-dark" />
                        <span className="capitalize">{row.original.iconName}</span>
                    </div>
                );
            }
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" onClick={() => onEdit(row.original)} title="Edit">
                        <Edit2 className="w-4 h-4 text-blue-600" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => onDelete(row.original.id)} title="Delete" className="text-destructive">
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>
            ),
        },
    ];

    return (
        <TableLayout
            title="Services Management"
            description="Manage the list of services offered by the Ministry"
            actions={[
                {
                    label: "Add Service",
                    icon: <Plus className="w-4 h-4" />,
                    onClick: onAdd,
                }
            ]}
        >
            <DataTable
                columns={columns}
                data={services}
                totalPageCount={Math.ceil(services.length / pageSize)}
                handlePagination={onPagination}
                tablePageSize={pageSize}
                currentIndex={pageIndex}
            />
        </TableLayout>
    );
}
