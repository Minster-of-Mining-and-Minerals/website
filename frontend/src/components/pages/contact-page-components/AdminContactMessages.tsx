"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DataTable } from "@/features/template/component/DataTable";
import { TableLayout } from "@/features/template/component/TableLayout";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Eye, Loader2 } from "lucide-react";
import { useGetMessagesQuery } from "@/redux/api/messageApi";
import { Message } from "@/redux/types/message";
import { formatDate } from "@/utils/datetime";

export default function AdminContactMessages() {
    const router = useRouter();
    const [pageIndex, setPageIndex] = useState(0);
    const [pageSize, setPageSize] = useState(10);

    const { data: messages = [], isLoading } = useGetMessagesQuery();

    const columns: ColumnDef<Message>[] = [
        {
            accessorKey: "full_name",
            header: "Name",
        },
        {
            accessorKey: "email_address",
            header: "Email",
            cell: ({ row }) => (
                <span className="break-all">{row.getValue("email_address")}</span>
            ),
        },
        {
            accessorKey: "subject",
            header: "Subject",
            cell: ({ row }) => (
                <button
                    type="button"
                    onClick={() => router.push(`/admin/contacts/messages/${row.original.message_id}`)}
                    className="text-left font-medium text-[#094C81] hover:underline line-clamp-2"
                >
                    {row.getValue("subject")}
                </button>
            ),
        },
        {
            accessorKey: "created_at",
            header: "Date",
            cell: ({ row }) => formatDate(row.getValue("created_at")),
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => (
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => router.push(`/admin/contacts/messages/${row.original.message_id}`)}
                >
                    <Eye className="w-4 h-4 mr-1.5" />
                    View
                </Button>
            ),
        },
    ];

    const handlePagination = (index: number, size: number) => {
        setPageIndex(index);
        setPageSize(size);
    };

    const paginatedMessages = messages.slice(
        pageIndex * pageSize,
        pageIndex * pageSize + pageSize
    );

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
                data={paginatedMessages}
                totalPageCount={Math.ceil(messages.length / pageSize)}
                handlePagination={handlePagination}
                tablePageSize={pageSize}
                currentIndex={pageIndex}
            />
        </TableLayout>
    );
}