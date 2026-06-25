"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Loader2, Mail, Trash2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDeleteMessageMutation, useGetMessageByIdQuery } from "@/redux/api/messageApi";
import { TableLayout } from "@/features/template/component/TableLayout";
import { ComponentGuard } from "@/components/auth/ComponentGuard";
import { formatDate, formatDateTime } from "@/utils/datetime";
import { toast } from "sonner";
import PublicEmptyState from "@/components/common/PublicEmptyState";

export default function AdminContactMessageDetail() {
    const router = useRouter();
    const params = useParams();
    const messageId = params.messageId as string;

    const { data: message, isLoading, isError } = useGetMessageByIdQuery(messageId, {
        skip: !messageId,
    });
    const [deleteMessage, { isLoading: isDeleting }] = useDeleteMessageMutation();

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this message? This action cannot be undone.")) {
            return;
        }

        try {
            await deleteMessage(messageId).unwrap();
            toast.success("Message deleted successfully");
            router.push("/admin/contacts");
        } catch {
            toast.error("Failed to delete message");
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[300px]">
                <Loader2 className="animate-spin w-6 h-6 text-golden-dark" />
            </div>
        );
    }

    if (isError || !message) {
        return (
            <TableLayout
                title="Message Not Found"
                description="This contact message could not be found or may have been deleted."
                sideActions={[
                    {
                        label: "Back to Messages",
                        icon: <ArrowLeft className="h-4 w-4" />,
                        variant: "outline",
                        onClick: () => router.push("/admin/contacts"),
                    },
                ]}
            >
                <PublicEmptyState
                    variant="inline"
                    title="Message not found"
                    description="The message you are looking for does not exist or has been removed."
                />
            </TableLayout>
        );
    }

    return (
        <TableLayout
            title="Contact Message"
            description="View the full details of a message submitted through the public contact form."
            sideActions={[
                {
                    label: "Back to Messages",
                    icon: <ArrowLeft className="h-4 w-4" />,
                    variant: "outline",
                    onClick: () => router.push("/admin/contacts"),
                },
            ]}
        >
            <div className="space-y-6">
                <div className="rounded-lg border border-[#094C81]/15 bg-[#094C81]/5 p-6">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                        <div className="space-y-3 min-w-0">
                            <h3 className="text-xl font-bold text-[#094C81] break-words">
                                {message.subject}
                            </h3>
                            <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-600">
                                <span className="inline-flex items-center gap-1.5">
                                    <User className="h-4 w-4" />
                                    {message.full_name}
                                </span>
                                <span className="inline-flex items-center gap-1.5">
                                    <Mail className="h-4 w-4" />
                                    <a
                                        href={`mailto:${message.email_address}`}
                                        className="text-[#094C81] hover:underline break-all"
                                    >
                                        {message.email_address}
                                    </a>
                                </span>
                            </div>
                            <div className="text-sm text-gray-500">
                                <span>Received {formatDateTime(message.created_at)}</span>
                                {message.updated_at && message.updated_at !== message.created_at && (
                                    <span className="ml-4">Updated {formatDate(message.updated_at)}</span>
                                )}
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2 shrink-0">
                            <Button variant="outline" size="sm" asChild>
                                <a href={`mailto:${message.email_address}?subject=Re: ${encodeURIComponent(message.subject)}`}>
                                    <Mail className="h-4 w-4 mr-1.5" />
                                    Reply by Email
                                </a>
                            </Button>
                            <ComponentGuard anyPermissions={["CONTACT_MESSAGES:DELETE"]}>
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={handleDelete}
                                    disabled={isDeleting}
                                >
                                    <Trash2 className="h-4 w-4 mr-1.5" />
                                    {isDeleting ? "Deleting..." : "Delete"}
                                </Button>
                            </ComponentGuard>
                        </div>
                    </div>
                </div>

                <div className="rounded-lg border bg-white p-6 shadow-sm">
                    <h4 className="text-sm font-semibold uppercase tracking-wide text-gray-500 mb-4">
                        Message
                    </h4>
                    <p className="text-gray-800 whitespace-pre-wrap leading-relaxed break-words">
                        {message.message}
                    </p>
                </div>

                <div className="rounded-lg border bg-gray-50 p-4 text-xs text-gray-500">
                    Message ID: <span className="font-mono">{message.message_id}</span>
                </div>
            </div>
        </TableLayout>
    );
}
