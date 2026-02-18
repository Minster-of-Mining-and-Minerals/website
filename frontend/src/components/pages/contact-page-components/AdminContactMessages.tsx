"use client";

import { useState } from "react";
import { DataTable } from "@/features/template/component/DataTable";
import { TableLayout } from "@/features/template/component/TableLayout";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Eye, Trash2, MailOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";

type ContactMessage = {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    date: string;
    status: "new" | "read";
};

const mockMessages: ContactMessage[] = [
    {
        id: "MSG001",
        name: "Abebe Bikila",
        email: "abebe@example.com",
        subject: "Investment Inquiry",
        message: "I am interested in gold mining permits in the southern region...",
        date: "2026-02-15",
        status: "new",
    },
    {
        id: "MSG002",
        name: "Samuel L. Jackson",
        email: "samuel@hollywood.com",
        subject: "Policy Question",
        message: "What are the latest regulations regarding lithium extraction?",
        date: "2026-02-14",
        status: "read",
    },
    {
        id: "MSG003",
        name: "Tirunesh Dibaba",
        email: "tirunesh@olympics.com",
        subject: "Community Support",
        message: "How can we partner for local mining community development?",
        date: "2026-02-10",
        status: "new",
    },
];

export default function AdminContactMessages() {
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const columns: ColumnDef<ContactMessage>[] = [
        { accessorKey: "name", header: "Name" },
        { accessorKey: "email", header: "Email" },
        { accessorKey: "subject", header: "Subject" },
        { accessorKey: "date", header: "Date" },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = row.getValue("status") as string;
                return (
                    <Badge variant={status === "new" ? "default" : "secondary"}>
                        {status.toUpperCase()}
                    </Badge>
                );
            },
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                return (
                    <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" title="View details">
                            <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" title="Mark as read">
                            <MailOpen className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive" title="Delete">
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                );
            },
        },
    ];

    const handlePagination = (index: number, size: number) => {
        setPageIndex(index);
        setPageSize(size);
    };

    return (
        <TableLayout
            title="Contact Messages"
            description="View and manage messages sent through the public contact form"
        >
            <DataTable
                columns={columns}
                data={mockMessages}
                totalPageCount={Math.ceil(mockMessages.length / pageSize)}
                handlePagination={handlePagination}
                tablePageSize={pageSize}
                currentIndex={pageIndex}
            />
        </TableLayout>
    );
}
