"use client";

import { useState } from "react";
import { DataTable } from "@/features/template/component/DataTable";
import { TableLayout } from "@/features/template/component/TableLayout";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Eye, Trash2, MailOpen, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useGetMessagesQuery } from "@/redux/api/messageApi";
import { ComponentGuard } from "@/components/auth/ComponentGuard";

type ContactMessage = {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    date: string;
    status: "new" | "read";
};

export default function AdminContactMessages() {
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const { data: messages = [], isLoading } = useGetMessagesQuery();

    /** Map API data to UI structure */
    const mappedMessages: ContactMessage[] = messages.map((msg: any) => ({
        id: msg.message_id,
        name: msg.full_name,
        email: msg.email_address,
        subject: msg.subject,
        message: msg.message,
        date: msg.created_at?.split("T")[0],
        status: "new", // default since backend does not have status
    }));

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
                        <ComponentGuard anyPermissions={["CONTACT_MESSAGES:UPDATE"]}>
                            <Button variant="ghost" size="icon" title="Mark as read">
                                <MailOpen className="w-4 h-4" />
                            </Button>
                        </ComponentGuard>
                        <ComponentGuard anyPermissions={["CONTACT_MESSAGES:DELETE"]}>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-destructive"
                                title="Delete"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </ComponentGuard>
                    </div>
                );
            },
        },
    ];

    const handlePagination = (index: number, size: number) => {
        setPageIndex(index);
        setPageSize(size);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[300px]">
                <Loader2 className="animate-spin w-6 h-6" />
            </div>
        );
    }

    return (
        <TableLayout
            title="Contact Messages"
            description="View and manage messages sent through the public contact form"
        >
            <DataTable
                columns={columns}
                data={mappedMessages}
                totalPageCount={Math.ceil(mappedMessages.length / pageSize)}
                handlePagination={handlePagination}
                tablePageSize={pageSize}
                currentIndex={pageIndex}
            />
        </TableLayout>
    );
}