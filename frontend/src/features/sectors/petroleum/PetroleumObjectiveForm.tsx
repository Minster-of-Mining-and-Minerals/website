"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye, FileIcon, Loader2, Save, Trash2, Upload, X } from "lucide-react";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import {
    useGetPetroleumObjectivesQuery,
    useGetPetroleumObjectiveByIdQuery,
    useCreatePetroleumObjectiveMutation,
    useUpdatePetroleumObjectiveMutation,
} from "@/redux/api/petroleumObjectiveApi";
import { PetroleumObjective } from "@/redux/types/petroleumObjective";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    useUploadAttachmentsMutation,
    useDeleteAttachmentMutation,
    useGetAttachmentsQuery,
} from "@/redux/api/attachementApi";
import { getFileUrl, getImageUrl } from "@/utils/fileUrl";
import "quill/dist/quill.snow.css";
import { Label } from "@/components/ui/label";

// Dynamic import for Quill
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

/** Types */
export type UploadedFileInfo = {
    attachment_id: string;
    file_name: string;
    file_path?: string;
    previewUrl?: string | null;
    isBlob?: boolean;
    file_type?: 'image' | 'video' | 'pdf' | 'document';
};

interface FileUploadFieldProps {
    id: string;
    label: string;
    value: string[];
    onChange: (value: string[], files?: UploadedFileInfo[]) => void;
    required?: boolean;
    accept?: string;
    multiple?: boolean;
    showPreview?: boolean;
}

// Enhanced file type detection
const getFileType = (fileName: string): 'image' | 'video' | 'pdf' | 'document' => {
    const extension = fileName.split('.').pop()?.toLowerCase() || '';
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'].includes(extension)) return 'image';
    if (['mp4', 'mov', 'avi', 'mkv', 'webm', 'flv', 'wmv', 'm4v', '3gp'].includes(extension)) return 'video';
    if (extension === 'pdf') return 'pdf';
    return 'document';
};

/** File Upload Component */
const FileUploadField: React.FC<FileUploadFieldProps> = ({
    id,
    label,
    value = [],
    onChange,
    required = false,
    accept = "image/*,.pdf",
    multiple = true,
    showPreview = true,
}) => {
    const [uploadAttachments] = useUploadAttachmentsMutation();
    const [deleteAttachment] = useDeleteAttachmentMutation();
    const { data: attachmentsResponse } = useGetAttachmentsQuery();
    const [files, setFiles] = useState<UploadedFileInfo[]>([]);
    const [previewFile, setPreviewFile] = useState<UploadedFileInfo | null>(null);

    useEffect(() => {
        if (!attachmentsResponse || value.length === 0) return;
        const all = attachmentsResponse.attachments || [];
        const mapped = value
            .map((id) => {
                const found = all.find((a) => a.attachment_id === id);
                if (found) {
                    return {
                        attachment_id: found.attachment_id,
                        file_name: found.file_name,
                        file_path: found.file_path,
                        previewUrl: getImageUrl(found, "medium"),
                        isBlob: false,
                        file_type: getFileType(found.file_name),
                    };
                }
                return null;
            })
            .filter(Boolean) as UploadedFileInfo[];

        if (mapped.length) {
            setFiles(prev => {
                const existingIds = new Set(prev.map(f => f.attachment_id));
                const newFiles = mapped.filter(f => !existingIds.has(f.attachment_id));
                return [...prev, ...newFiles];
            });
        }
    }, [attachmentsResponse, value]);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files;
        if (!selectedFiles || selectedFiles.length === 0) return;

        const uploadPromises = Array.from(selectedFiles).map(async (file) => {
            try {
                const result = await uploadAttachments({ files: [file] }).unwrap();
                if (result.attachments.length > 0) {
                    const uploaded = result.attachments[0];
                    return {
                        attachment_id: uploaded.attachment_id,
                        file_name: uploaded.file_name,
                        file_path: uploaded.file_path,
                        previewUrl: URL.createObjectURL(file),
                        isBlob: true,
                        file_type: getFileType(uploaded.file_name),
                    };
                }
            } catch {
                toast.error(`Failed to upload ${file.name}`);
                return null;
            }
        });

        const uploadedFiles = (await Promise.all(uploadPromises)).filter(Boolean) as UploadedFileInfo[];

        if (uploadedFiles.length > 0) {
            const updatedFiles = [...files, ...uploadedFiles];
            setFiles(updatedFiles);
            onChange(updatedFiles.map((f) => f.attachment_id), updatedFiles);
            uploadedFiles.forEach((f) => toast.success(`${f.file_name} uploaded`));
        }
        e.target.value = '';
    };

    const handleDelete = async (attachment_id: string) => {
        try {
            const fileToDelete = files.find(f => f.attachment_id === attachment_id);
            if (!fileToDelete?.isBlob) {
                await deleteAttachment(attachment_id).unwrap();
            }
            if (fileToDelete?.previewUrl && fileToDelete.isBlob) {
                URL.revokeObjectURL(fileToDelete.previewUrl);
            }
            const updatedFiles = files.filter((f) => f.attachment_id !== attachment_id);
            setFiles(updatedFiles);
            onChange(updatedFiles.map((f) => f.attachment_id), updatedFiles);
            toast.success("File removed successfully");
        } catch {
            toast.error("Failed to delete file");
        }
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium cursor-pointer">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative flex flex-col items-center justify-center border border-[#B1C9E3] rounded-md border-dashed p-3 hover:bg-gray-50 cursor-pointer">
                <input id={id} type="file" accept={accept} multiple={multiple} onChange={handleFileChange} className="absolute inset-0 opacity-0 cursor-pointer" />
                <div className="flex flex-col items-center justify-center space-y-2">
                    <Upload className="w-6 h-6 text-gray-500" />
                    <p className="text-sm text-gray-600">Click or drag to upload</p>
                </div>
            </div>
            {showPreview && files.length > 0 && (
                <div className="grid grid-cols-1 gap-2 mt-2">
                    {files.map((file) => (
                        <div key={file.attachment_id} className="flex items-center justify-between border border-gray-200 rounded-md p-2 bg-gray-50">
                            <div className="flex items-center gap-2">
                                {file.previewUrl && file.file_type === "image" && (
                                    <img src={file.previewUrl || ""} alt={file.file_name} className="w-10 h-10 object-cover rounded" />
                                )}
                                <span className="text-sm text-gray-700 truncate max-w-[150px]">{file.file_name}</span>
                            </div>
                            <div className="flex gap-1">
                                <Button type="button" variant="ghost" size="icon" onClick={() => setPreviewFile(file)}>
                                    <Eye className="w-5 h-5 text-[#094C81]" />
                                </Button>
                                <Button type="button" variant="ghost" size="icon" onClick={() => handleDelete(file.attachment_id)}>
                                    <Trash2 className="w-5 h-5 text-red-600" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {previewFile && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] p-4 relative overflow-auto">
                        <button className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200" onClick={() => setPreviewFile(null)}>
                            <X className="w-5 h-5" />
                        </button>
                        <h3 className="text-lg font-semibold mb-4">{previewFile.file_name}</h3>
                        {previewFile.file_type === "image" && previewFile.previewUrl && (
                            <img src={previewFile.previewUrl} alt={previewFile.file_name} className="w-full h-auto max-h-[70vh] object-contain" />
                        )}
                        {previewFile.file_type === "pdf" && previewFile.previewUrl && (
                            <iframe src={previewFile.previewUrl} className="w-full h-[70vh]" title={previewFile.file_name} />
                        )}
                        {!previewFile.previewUrl && <p className="text-gray-600">Cannot preview this file type.</p>}
                    </div>
                </div>
            )}
        </div>
    );
};

export default function PetroleumObjectiveForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const editId = searchParams.get("id") || undefined;
    const isEditing = Boolean(editId);

    /* API hooks */
    const { data: existing, isLoading: isLoadingExisting } = useGetPetroleumObjectiveByIdQuery(editId!, {
        skip: !editId,
    });
    const [createObjective, { isLoading: isCreating }] = useCreatePetroleumObjectiveMutation();
    const [updateObjective, { isLoading: isUpdating }] = useUpdatePetroleumObjectiveMutation();

    /* Form state */
    const [title, setTitle] = useState("");
    const [type, setType] = useState<"headline" | "others">("others");
    const [contentHtml, setContentHtml] = useState("");
    const [attachmentIds, setAttachmentIds] = useState<string[]>([]);
    const [attachmentFiles, setAttachmentFiles] = useState<UploadedFileInfo[]>([]);

    /* Check for existing headline */
    const { data: allObjectives } = useGetPetroleumObjectivesQuery();
    const hasExistingHeadline = allObjectives?.some((obj: PetroleumObjective) => obj.type === "headline" && obj.petroleum_objective_id !== editId);

    useEffect(() => {
        if (existing && isEditing) {
            setTitle(existing.title ?? "");
            setType(existing.type ?? "others");
            setContentHtml(existing.content ?? "");
            const ids = existing.attachments?.map((a: any) => a.attachment_id) || [];
            setAttachmentIds(ids);
        }
    }, [existing, isEditing]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) {
            toast.error("Title is required");
            return;
        }

        // We map attachments to the required format (attachment_id and label)
        // Since the UI now uses simplified attachments, we use file name as label
        const attachments = attachmentFiles.map(f => ({
            attachment_id: f.attachment_id,
            label: f.file_name,
        }));

        const payload = {
            title: title.trim(),
            type,
            description: title.trim(), // mapping title to description as well for list view
            content: contentHtml,
            objectives: [], // simplified: no bullets for now as per "only one content" request
            attachments: attachments.length ? attachments : undefined,
        };

        try {
            if (isEditing && editId) {
                await updateObjective({ id: editId, data: payload }).unwrap();
                toast.success("Petroleum Objective updated successfully!");
            } else {
                await createObjective(payload).unwrap();
                toast.success("Petroleum Objective created successfully!");
            }
            router.push("/admin/sectors/petroleum/objectives");
        } catch {
            toast.error(isEditing ? "Failed to update objective" : "Failed to create objective");
        }
    };

    const modules = {
        toolbar: [
            [{ font: [] }],
            [{ size: ["small", false, "large", "huge"] }],
            [{ header: [1, 2, 3, 4, 5, 6, false] }],
            ["bold", "italic", "underline", "strike"],
            [{ color: [] }, { background: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            [{ align: [] }],
            ["blockquote", "code-block"],
            ["link", "image", "video"],
            ["clean"],
        ],
    };

    if (isEditing && isLoadingExisting) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="h-6 w-6 animate-spin text-[#094C81]" />
                <span className="ml-3 text-gray-500">Loading objective data...</span>
            </div>
        );
    }

    return (
        <div className="max-w-[1600px] mx-auto py-6 px-4">
            <div className="flex items-center gap-3 mb-6">
                <Button variant="ghost" size="icon" onClick={() => router.push("/admin/sectors/petroleum/objectives")} className="text-gray-400 hover:text-[#094C81]">
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <div>
                    <h1 className="text-2xl font-bold text-[#073954]">
                        {isEditing ? "Edit Petroleum Objective" : "Create Petroleum Objective"}
                    </h1>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Form Section */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title *</Label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Objective Title"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="type">Type *</Label>
                            <Select 
                                value={type} 
                                onValueChange={(val: any) => setType(val)}
                            >
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="others">Other Objective</SelectItem>
                                    <SelectItem 
                                        value="headline" 
                                        disabled={hasExistingHeadline}
                                    >
                                        Headline {hasExistingHeadline && "(Already exists)"}
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                            {hasExistingHeadline && type === "headline" && (
                                <p className="text-sm text-red-500 font-medium mt-1">
                                    Warning: A headline already exists. You cannot save another.
                                </p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label>Content (Rich Text) *</Label>
                            <ReactQuill theme="snow" value={contentHtml} modules={modules} onChange={setContentHtml} className="h-[400px] mb-12" />
                        </div>

                        <FileUploadField
                            id="attachments"
                            label="Attachments (PDF, Images)"
                            value={attachmentIds}
                            onChange={(ids, files) => {
                                setAttachmentIds(ids);
                                if (files) setAttachmentFiles(files);
                            }}
                            multiple
                            showPreview
                        />

                        <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
                            <Button type="submit" disabled={isCreating || isUpdating} className="bg-[#094C81] hover:bg-[#094C81]/90 text-white min-w-[140px]">
                                {(isCreating || isUpdating) ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                                {isEditing ? "Save Changes" : "Create Objective"}
                            </Button>
                        </div>
                    </form>
                </div>

                {/* Preview Section */}
                <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100 overflow-y-auto max-h-[calc(100vh-200px)] sticky top-6">
                    <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6 border-b pb-2">Live Preview</h2>
                    <article className="prose prose-blue max-w-none">
                        <h1 className="text-3xl font-bold text-[#073954] mb-4">{title || "Objective Title Preview"}</h1>
                        <div className="min-h-[100px] text-gray-700" dangerouslySetInnerHTML={{ __html: contentHtml || "<p className='text-gray-400 italic'>Content preview will appear here...</p>" }} />

                        {attachmentFiles.length > 0 && (
                            <div className="mt-8 pt-6 border-t border-gray-100">
                                <h3 className="text-lg font-semibold text-[#073954] mb-3 flex items-center gap-2">
                                    <FileIcon className="h-5 w-5" /> Resources & Attachments
                                </h3>
                                <ul className="space-y-2 not-prose">
                                    {attachmentFiles.map(file => (
                                        <li key={file.attachment_id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md border border-gray-200">
                                            <div className="flex items-center gap-2">
                                                <FileIcon className="h-4 w-4 text-gray-400" />
                                                <span className="text-sm font-medium text-gray-600">{file.file_name}</span>
                                            </div>
                                            <a href={file.previewUrl || ""} target="_blank" rel="noopener noreferrer" className="text-xs text-[#094C81] hover:underline font-semibold">View File</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </article>
                </div>
            </div>
        </div>
    );
}
