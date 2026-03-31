"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save, Loader2, Plus, Trash2, Edit2, Upload, FileIcon, Eye, X } from "lucide-react";
import { toast } from "sonner";
import {
    useGetResourceByIdQuery,
    useCreateResourceMutation,
    useUpdateResourceMutation,
} from "@/redux/api/resourceApi";
import {
    useUploadAttachmentsMutation,
    useDeleteAttachmentMutation,
} from "@/redux/api/attachementApi";
import { getFileUrl } from "@/utils/fileUrl";

/* =====================================================
   TYPES
===================================================== */
type DocFile = {
    attachment_id: string;
    file_name: string;
    file_path?: string;
    label?: string;
    previewUrl?: string | null;
    isBlob?: boolean;
};

/* =====================================================
   DOCUMENT UPLOAD SECTION
===================================================== */
function DocumentsUploadSection({
    value,
    onChange,
}: {
    value: DocFile[];
    onChange: (files: DocFile[]) => void;
}) {
    const [uploadAttachments, { isLoading: isUploading }] = useUploadAttachmentsMutation();
    const [deleteAttachment] = useDeleteAttachmentMutation();
    const [previewFile, setPreviewFile] = useState<DocFile | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files;
        if (!selected || selected.length === 0) return;

        const uploads = await Promise.all(
            Array.from(selected).map(async (file) => {
                try {
                    const result = await uploadAttachments({ files: [file] }).unwrap();
                    const uploaded = result.attachments?.[0];
                    if (!uploaded) return null;
                    return {
                        attachment_id: uploaded.attachment_id,
                        file_name: uploaded.file_name,
                        file_path: uploaded.file_path,
                        label: "",
                        previewUrl: URL.createObjectURL(file),
                        isBlob: true,
                    } as DocFile;
                } catch {
                    toast.error(`Failed to upload ${file.name}`);
                    return null;
                }
            })
        );

        const uploaded = uploads.filter(Boolean) as DocFile[];
        if (uploaded.length > 0) {
            onChange([...value, ...uploaded]);
            toast.success(`${uploaded.length} file(s) uploaded`);
        }
        e.target.value = "";
    };

    const handleRemove = async (doc: DocFile) => {
        try {
            if (doc.isBlob && doc.previewUrl) {
                URL.revokeObjectURL(doc.previewUrl);
            }
            onChange(value.filter((d) => d.attachment_id !== doc.attachment_id));
            toast.success("File removed from list");
        } catch {
            toast.error("Failed to remove file");
        }
    };

    return (
        <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">
                Resource Documents
                <span className="ml-2 text-xs text-gray-400 font-normal">(PDF, DOCX, etc.)</span>
            </Label>

            {/* Upload zone */}
            <div
                className="relative border border-dashed border-[#B1C9E3] rounded-lg p-5 flex flex-col items-center justify-center gap-2 hover:bg-blue-50/30 transition-colors cursor-pointer"
                onClick={() => inputRef.current?.click()}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
                    multiple
                    onChange={handleFileChange}
                    className="hidden"
                />
                {isUploading ? (
                    <Loader2 className="h-5 w-5 animate-spin text-[#094C81]" />
                ) : (
                    <Upload className="h-5 w-5 text-gray-400" />
                )}
                <p className="text-sm text-gray-500">
                    {isUploading ? "Uploading..." : "Click or drag files here"}
                </p>
                <p className="text-xs text-gray-400">PDF, DOCX, XLSX, TXT supported</p>
            </div>

            {/* File list */}
            {value.length > 0 && (
                <div className="space-y-2">
                    {value.map((doc) => (
                        <div
                            key={doc.attachment_id}
                            className="flex items-center justify-between border border-gray-100 rounded-lg px-3 py-2.5 bg-gray-50"
                        >
                            <div className="flex items-center gap-2 min-w-0">
                                <FileIcon className="h-4 w-4 text-[#094C81] flex-shrink-0" />
                                <div className="flex flex-col min-w-0">
                                    <span className="text-sm text-gray-700 truncate max-w-xs font-medium">{doc.file_name}</span>
                                    <Input
                                        value={doc.label || ""}
                                        onChange={(e) => {
                                            const newVal = value.map(d => d.attachment_id === doc.attachment_id ? { ...d, label: e.target.value } : d);
                                            onChange(newVal);
                                        }}
                                        placeholder="File label (e.g., Annual Report) *"
                                        className="h-8 text-xs mt-1 border border-gray-200 bg-white px-2 focus-visible:ring-1 focus-visible:ring-[#094C81] text-gray-700"
                                    />
                                </div>
                            </div>
                            <div className="flex items-center gap-1 flex-shrink-0">
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7"
                                    onClick={() => setPreviewFile(doc)}
                                >
                                    <Eye className="h-3.5 w-3.5 text-[#094C81]" />
                                </Button>
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="h-7 w-7 text-red-500 hover:text-red-700"
                                    onClick={() => handleRemove(doc)}
                                >
                                    <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Preview modal */}
            {previewFile && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] p-5 relative overflow-auto shadow-2xl">
                        <button
                            type="button"
                            className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-gray-100"
                            onClick={() => setPreviewFile(null)}
                        >
                            <X className="h-4 w-4" />
                        </button>
                        <h3 className="text-base font-semibold mb-4 pr-8">{previewFile.file_name}</h3>
                        {previewFile.file_name.toLowerCase().endsWith(".pdf") ? (
                            <iframe
                                src={previewFile.isBlob ? previewFile.previewUrl ?? "" : getFileUrl(previewFile.file_path ?? "")}
                                className="w-full h-[70vh] rounded"
                                title={previewFile.file_name}
                            />
                        ) : (
                            <a
                                href={previewFile.isBlob ? previewFile.previewUrl ?? "" : getFileUrl(previewFile.file_path ?? "")}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-[#094C81] hover:underline"
                            >
                                <FileIcon className="h-4 w-4" />
                                Download {previewFile.file_name}
                            </a>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}

/* =====================================================
   MAIN FORM
===================================================== */
export default function ResourceFormPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const editId = searchParams.get("id") || undefined;
    const isEditing = Boolean(editId);

    /* API hooks */
    const { data: existing, isLoading: isLoadingExisting } = useGetResourceByIdQuery(editId!, {
        skip: !editId,
    });
    const [createResource, { isLoading: isCreating }] = useCreateResourceMutation();
    const [updateResource, { isLoading: isUpdating }] = useUpdateResourceMutation();

    /* Form state */
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [docFiles, setDocFiles] = useState<DocFile[]>([]);

    /* Hydrate on edit */
    useEffect(() => {
        if (existing && isEditing) {
            setTitle(existing.title ?? "");
            setDescription(existing.description ?? "");
            // Hydrate existing attachments
            if (existing.attachments && existing.attachments.length > 0) {
                setDocFiles(
                    existing.attachments.map((a: any) => ({
                        attachment_id: a.attachment?.attachment_id ?? a.attachment_id,
                        file_name: a.attachment?.file_name ?? "Document",
                        file_path: a.attachment?.file_path,
                        label: a.label ?? "",
                        isBlob: false,
                    }))
                );
            }
        }
    }, [existing, isEditing]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) {
            toast.error("Title is required");
            return;
        }

        for (const doc of docFiles) {
            if (!doc.label?.trim()) {
                toast.error(`Please provide a label for the file: ${doc.file_name}`);
                return;
            }
        }

        const attachmentsPayload = docFiles.map((d) => ({
            attachment_id: d.attachment_id,
            label: d.label!.trim()
        }));

        try {
            if (isEditing && editId) {
                await updateResource({
                    id: editId,
                    data: {
                        title: title.trim(),
                        description: description.trim(), // Send as plain text
                        sector: "geology",
                        attachments: attachmentsPayload,
                    },
                }).unwrap();
                toast.success("Resource updated successfully!");
                router.push("/admin/sectors/geology/resources");
            } else {
                await createResource({
                    title: title.trim(),
                    description: description.trim(), // Send as plain text
                    sector: "geology",
                    attachments: attachmentsPayload,
                }).unwrap();
                toast.success("Resource created successfully!");
                router.push("/admin/sectors/geology/resources");
            }
        } catch (error: any) {
            toast.error(error?.data?.message || (isEditing ? "Failed to update resource" : "Failed to create resource"));
        }
    };

    const isSaving = isCreating || isUpdating;

    if (isEditing && isLoadingExisting) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="h-6 w-6 animate-spin text-[#094C81]" />
                <span className="ml-3 text-gray-500">Loading resource data...</span>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-10 px-6 w-full space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => router.push("/admin/sectors/mining/resources")}
                    className="text-gray-400 hover:text-[#094C81]"
                >
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <div>
                    <h1 className="text-2xl font-bold text-[#073954]">
                        {isEditing ? "Edit Resource" : "Create Resource"}
                    </h1>
                    <p className="text-sm text-gray-500 mt-0.5">
                        {isEditing
                            ? `Editing: ${existing?.title ?? "..."}`
                            : "Add a new document or report to the geology sector"}
                    </p>
                </div>
            </div>

            {/* Main form card */}
            <Card className="border border-gray-100 shadow-sm py-0">
                <CardHeader className="px-6 pt-6 pb-4 border-b border-gray-50">
                    <CardTitle className="text-base text-[#073954]">Resource Details</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Title */}
                        <div className="space-y-2">
                            <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                                Title <span className="text-red-500">*</span>
                            </Label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="E.g., Geology Sector Annual Report 2024"
                                className="focus-visible:ring-[#094C81]"
                            />
                        </div>

                        {/* Description - Plain Textarea */}
                        <div className="space-y-2">
                            <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                                Description / Overview
                            </Label>
                            <Textarea
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Provide a brief description of this resource..."
                                rows={6}
                                className="focus-visible:ring-[#094C81] resize-y"
                            />
                        </div>

                        {/* Downloadable Documents */}
                        <DocumentsUploadSection
                            value={docFiles}
                            onChange={setDocFiles}
                        />

                        {/* Actions */}
                        <div className="flex items-center gap-3 pt-6 border-t border-gray-50">
                            <Button
                                type="submit"
                                disabled={isSaving}
                                className="bg-[#094C81] hover:bg-[#094C81]/90 text-white px-8"
                            >
                                {isSaving ? (
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                ) : (
                                    <Save className="h-4 w-4 mr-2" />
                                )}
                                {isEditing ? "Save Changes" : "Create Resource"}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.push("/admin/sectors/geology/resources")}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}