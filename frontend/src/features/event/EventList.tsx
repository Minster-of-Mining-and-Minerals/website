"use client";

import { useState, useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Eye, Plus, Download, Trash, Calendar as CalendarIcon, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

import { DataTable } from "@/features/template/component/DataTable";
import { TableLayout } from "@/features/template/component/TableLayout";
import type { FilterField, ActionButton } from "@/types/tableLayout";
import { ComponentGuard } from "@/components/auth/ComponentGuard";

import {
    useGetEventsQuery,
    useDeleteEventMutation,
} from "@/redux/api/eventApi";
import { Event } from "@/redux/types/event";
import { format } from "date-fns";

/* ----------------------------------
   COMPONENT
----------------------------------- */
export default function EventList() {
    const router = useRouter();

    /* API */
    const { data = [], isLoading, isError } = useGetEventsQuery({ isAdmin: true });
    const [deleteEvent] = useDeleteEventMutation();

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
    const [statusFilter, setStatusFilter] = useState("");
    const [search, setSearch] = useState("");

    const filters: FilterField[] = [
        {
            key: "status",
            label: "Status",
            type: "multiselect",
            placeholder: "Select status",
            value: statusFilter,
            onChange: setStatusFilter,
            options: [
                { label: "Draft", value: "draft" },
                { label: "Published", value: "published" },
                { label: "Scheduled", value: "scheduled" },
                { label: "Ongoing", value: "ongoing" },
                { label: "Completed", value: "completed" },
                { label: "Cancelled", value: "cancelled" },
            ],
        },
        {
            key: "search",
            label: "Search",
            type: "text",
            placeholder: "Search title",
            value: search,
            onChange: setSearch,
        },
    ];

    /* ----------------------------------
       DATA FILTERING
    ----------------------------------- */
    const filteredData = useMemo(() => {
        return data.filter((item: Event) => {
            const matchesStatus =
                !statusFilter || item.status === statusFilter;

            const matchesSearch =
                !search ||
                item.title?.toLowerCase().includes(search.toLowerCase());

            return matchesStatus && matchesSearch;
        });
    }, [data, statusFilter, search]);

    /* Pagination slice */
    const paginatedData = filteredData.slice(
        pageIndex * pageSize,
        pageIndex * pageSize + pageSize
    );

    /* ----------------------------------
       TABLE COLUMNS
    ----------------------------------- */
    const columns: ColumnDef<Event>[] = [
        {
            accessorKey: "title",
            header: "Title",
            cell: ({ row }) => (
                <div className="font-medium truncate max-w-[200px]">
                    {row.original.title}
                </div>
            ),
        },
        {
            accessorKey: "organizer",
            header: "Organizer",
        },
        {
            accessorKey: "start_time",
            header: "Date",
            cell: ({ row }) => {
                const date = row.original.start_time;
                return date ? format(new Date(date), "MMM d, yyyy") : "N/A";
            },
        },
        {
            accessorKey: "location",
            header: "Location",
            cell: ({ row }) => (
                <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span className="truncate max-w-[150px]">{row.original.location || "N/A"}</span>
                </div>
            ),
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = row.getValue("status") as string;
                let variant: "default" | "destructive" | "outline" | "secondary" = "outline";
                
                switch (status) {
                    case "published":
                    case "ongoing":
                        variant = "default";
                        break;
                    case "completed":
                    case "archived":
                        variant = "secondary";
                        break;
                    case "cancelled":
                    case "draft":
                        variant = "destructive";
                        break;
                    case "scheduled":
                        variant = "outline";
                        break;
                }

                return (
                    <Badge variant={variant}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </Badge>
                );
            },
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const eventId = row.original.event_id;

                return (
                    <div className="flex items-center gap-1">
                        <ComponentGuard anyPermissions={["EVENTS:UPDATE"]}>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => router.push(`/admin/events/${eventId}`)}
                            >
                                <Eye className="h-4 w-4" />
                            </Button>
                        </ComponentGuard>

                        <ComponentGuard anyPermissions={["EVENTS:DELETE"]}>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                    if (confirm("Are you sure you want to delete this event?")) {
                                        deleteEvent(eventId);
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
            label: "Export",
            icon: <Download className="h-4 w-4" />,
            variant: "outline",
            onClick: () => console.log("Export clicked"),
        },
        {
            label: "Add Event",
            icon: <Plus className="h-4 w-4" />,
            variant: "default",
            onClick: () => router.push("/admin/events/create"),
            permissions: ["EVENTS:CREATE"],
        },
    ];

    /* ----------------------------------
       RENDER
    ----------------------------------- */
    return (
        <TableLayout
            title="Manage Events"
            description="View and manage all upcoming and past events"
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
                        <div key={item.event_id} className="bg-white rounded-xl shadow-sm border p-5 hover:shadow-md transition-shadow relative overflow-hidden group">
                            <div className="flex justify-between items-start mb-4">
                                <Badge variant={item.status === 'published' ? 'default' : 'secondary'}>
                                    {item.status}
                                </Badge>
                                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => router.push(`/admin/events/${item.event_id}`)}>
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => deleteEvent(item.event_id)}>
                                        <Trash className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                            <h3 className="text-lg font-bold text-[#073954] mb-2 line-clamp-2">{item.title}</h3>
                            <div className="space-y-2 text-sm text-gray-600">
                                <div className="flex items-center gap-2">
                                    <CalendarIcon className="h-4 w-4 text-golden-dark" />
                                    <span>{item.start_time ? format(item.start_time, "PPP") : "No date"}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-golden-dark" />
                                    <span className="truncate">{item.location || "Online / TBD"}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </TableLayout>
    );
}
