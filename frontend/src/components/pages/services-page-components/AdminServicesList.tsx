"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Edit, Trash, Plus } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

import type { FilterField, ActionButton } from "@/types/tableLayout";
import {
    useGetServicesQuery,
    useDeleteServiceMutation,
} from "@/redux/api/serviceApi";
import { Service } from "@/redux/types/service";

import { TableLayout } from "@/features/template/component/TableLayout";
import { DataTable } from "@/features/template/component/DataTable";
import ServiceModal from "./ServiceModal";

/* ----------------------------------
   COMPONENT
----------------------------------- */
export default function AdminServicesList() {
    const router = useRouter();

    /* API */
    const { data = [], isLoading, isError } = useGetServicesQuery();
    const [deleteService] = useDeleteServiceMutation();

    /* Modal */
    const [isModalOpen, setModalOpen] = useState(false);
    const [currentService, setCurrentService] = useState<Service | null>(null);

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
            placeholder: "Search service title",
            value: search,
            onChange: setSearch,
        },
    ];

    /* ----------------------------------
       TABLE COLUMNS
    ----------------------------------- */
    const columns: ColumnDef<Service>[] = [
        {
            accessorKey: "title",
            header: "Title",
            cell: ({ row }) => (
                <span className="font-medium">
                    {row.getValue("title")}
                </span>
            ),
        },
        {
            accessorKey: "content",
            header: "Description",
            cell: ({ row }) => (
                <div
                    className="max-w-[300px] truncate"
                    title={row.getValue("content")}
                >
                    {row.getValue("content")}
                </div>
            ),
        },
        {
            accessorKey: "icon",
            header: "Icon",
            cell: ({ row }) => {
                const iconName = row.getValue("icon") as string;
                const IconComponent = (LucideIcons as any)[iconName] || LucideIcons.File; // fallback
                return (
                    <div className="flex items-center gap-2">
                        <IconComponent className="w-5 h-5 text-golden-dark" />
                        <span className="capitalize">{iconName}</span>
                    </div>
                );
            },
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const service = row.original;

                return (
                    <div className="flex items-center gap-1">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() =>
                                router.push(`/admin/services/${service.service_id}`)
                            }
                        >
                            <Eye className="h-4 w-4" />
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                                setCurrentService(service);
                                setModalOpen(true);
                            }}
                        >
                            <Edit className="h-4 w-4" />
                        </Button>

                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteService(service.service_id)}
                        >
                            <Trash className="h-4 w-4 text-destructive" />
                        </Button>
                    </div>
                );
            },
        },
    ];

    /* Top actions */
    const actions: ActionButton[] = [
        {
            label: "Add Service",
            icon: <Plus className="h-4 w-4" />,
            onClick: () => {
                setCurrentService(null);
                setModalOpen(true);
            },
        },
    ];

    /* Client-side filtering */
    const filteredData = data.filter((service) =>
        search
            ? service.title.toLowerCase().includes(search.toLowerCase())
            : true
    );

    /* Pagination slice */
    const paginatedData = filteredData.slice(
        pageIndex * pageSize,
        pageIndex * pageSize + pageSize
    );

    return (
        <>
            <TableLayout
                title="Services Management"
                description="Manage the list of services"
                actions={actions}
                filters={filters}
                filterColumnsPerRow={1}
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

            <ServiceModal
                open={isModalOpen}
                onOpenChange={setModalOpen}
                currentService={currentService}
                setCurrentService={setCurrentService}
            />
        </>
    );
}