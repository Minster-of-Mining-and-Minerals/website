"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save, Loader2, Plus, Trash2, Edit2, ChevronDown, ChevronUp, Upload, FileIcon, Eye, X } from "lucide-react";
import { toast } from "sonner";
import {
    useGetGamestonesQuery,
    useGetGamestoneByIdQuery,
    useCreateGamestoneMutation,
    useUpdateGamestoneMutation,
    useDeleteGamestoneMutation,
} from "@/redux/api/gamestoneApi";
import { Gamestone } from "@/redux/types/gamestone";
import { ImageUploadField, UploadedFileInfo } from "@/components/common/ImageUploadField";
import {
    useUploadAttachmentsMutation,
    useDeleteAttachmentMutation,
} from "@/redux/api/attachementApi";
import { getFileUrl } from "@/utils/fileUrl";
import "quill/dist/quill.snow.css";

/* =====================================================
   TYPES
===================================================== */
type DocFile = {
    attachment_id: string;
    file_name: string;
    file_path?: string;
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
            if (!doc.isBlob) {
                await deleteAttachment(doc.attachment_id).unwrap();
            } else if (doc.previewUrl) {
                URL.revokeObjectURL(doc.previewUrl);
            }
            onChange(value.filter((d) => d.attachment_id !== doc.attachment_id));
            toast.success("File removed");
        } catch {
            toast.error("Failed to remove file");
        }
    };

    return (
        <div className="space-y-3">
            <Label className="text-sm font-medium text-gray-700">
                Downloadable Documents
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
                                <span className="text-sm text-gray-700 truncate max-w-xs">{doc.file_name}</span>
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

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const quillModules = {
    toolbar: [
        [{ font: [] }],
        [{ size: ["small", false, "large", "huge"] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ script: "sub" }, { script: "super" }],
        [{ align: [] }],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ indent: "-1" }, { indent: "+1" }],
        ["blockquote", "code-block"],
        ["link", "image", "video"],
        ["clean"],
    ],
};

/* =====================================================
   INLINE CHILD FORM
===================================================== */
type ChildFormState = {
    title: string;
    description: string;
    location: string;
    discovered_date: string;
    attachment_id?: string;
};

const emptyChild = (): ChildFormState => ({
    title: "",
    description: "",
    location: "",
    discovered_date: "",
    attachment_id: undefined,
});

function ChildItemRow({
    child,
    onDelete,
    onEdit,
}: {
    child: Gamestone;
    onDelete: (id: string) => void;
    onEdit: (child: Gamestone) => void;
}) {
    return (
        <div className="flex items-center justify-between border border-gray-100 rounded-lg px-4 py-3 bg-gray-50 hover:bg-white transition-colors">
            <div>
                <p className="font-medium text-sm text-[#094C81]">{child.title}</p>
                {child.location && (
                    <p className="text-xs text-gray-500 mt-0.5">📍 {child.location}</p>
                )}
                {child.discovered_date && (
                    <p className="text-xs text-gray-400 mt-0.5">
                        Discovered: {new Date(child.discovered_date).toLocaleDateString()}
                    </p>
                )}
            </div>
            <div className="flex gap-1">
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(child)}
                    className="h-7 w-7 text-[#094C81] hover:bg-[#094C81]/10"
                >
                    <Edit2 className="h-3.5 w-3.5" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(child.gamestone_id)}
                    className="h-7 w-7 text-red-500 hover:bg-red-50"
                >
                    <Trash2 className="h-3.5 w-3.5" />
                </Button>
            </div>
        </div>
    );
}

/* =====================================================
   INLINE CHILD EDITOR (add / edit sub-item)
===================================================== */
function ChildEditor({
    parentId,
    editingChild,
    onSaved,
    onCancel,
}: {
    parentId: string;
    editingChild?: Gamestone | null;
    onSaved: () => void;
    onCancel: () => void;
}) {
    const [createGamestone, { isLoading: isCreating }] = useCreateGamestoneMutation();
    const [updateGamestone, { isLoading: isUpdating }] = useUpdateGamestoneMutation();

    const [form, setForm] = useState<ChildFormState>(
        editingChild
            ? {
                  title: editingChild.title,
                  description: editingChild.description ?? "",
                  location: editingChild.location ?? "",
                  discovered_date: editingChild.discovered_date
                      ? new Date(editingChild.discovered_date).toISOString().substring(0, 10)
                      : "",
                  attachment_id: editingChild.attachment_id ?? undefined,
              }
            : emptyChild()
    );

    const isSaving = isCreating || isUpdating;

    const handleSave = async () => {
        if (!form.title.trim()) {
            toast.error("Sub-item title is required");
            return;
        }
        const discoveredDateISO = form.discovered_date
            ? new Date(form.discovered_date).toISOString()
            : null;

        try {
            if (editingChild) {
                await updateGamestone({
                    id: editingChild.gamestone_id,
                    data: {
                        title: form.title.trim(),
                        description: form.description,
                        location: form.location || null,
                        discovered_date: discoveredDateISO,
                        attachment_id: form.attachment_id ?? null,
                    },
                }).unwrap();
                toast.success("Sub-item updated");
            } else {
                await createGamestone({
                    title: form.title.trim(),
                    description: form.description,
                    location: form.location || null,
                    discovered_date: discoveredDateISO,
                    parent_id: parentId,
                    attachment_id: form.attachment_id ?? null,
                }).unwrap();
                toast.success("Sub-item created");
            }
            onSaved();
        } catch {
            toast.error("Failed to save sub-item");
        }
    };

    return (
        <div className="border border-[#094C81]/20 rounded-xl p-4 bg-[#094C81]/[0.02] space-y-4">
            <p className="text-xs font-semibold text-[#094C81] uppercase tracking-wide">
                {editingChild ? "Edit Sub-item" : "Add Sub-item"}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="space-y-1">
                    <Label className="text-xs text-gray-600">Title *</Label>
                    <Input
                        value={form.title}
                        onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                        placeholder="Sub-item title"
                        className="h-9 text-sm focus-visible:ring-[#094C81]"
                    />
                </div>
                <div className="space-y-1">
                    <Label className="text-xs text-gray-600">Location</Label>
                    <Input
                        value={form.location}
                        onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
                        placeholder="E.g., Northern Region"
                        className="h-9 text-sm focus-visible:ring-[#094C81]"
                    />
                </div>
                <div className="space-y-1">
                    <Label className="text-xs text-gray-600">Discovered Date</Label>
                    <Input
                        type="date"
                        value={form.discovered_date}
                        onChange={(e) =>
                            setForm((f) => ({ ...f, discovered_date: e.target.value }))
                        }
                        className="h-9 text-sm focus-visible:ring-[#094C81]"
                    />
                </div>
                <div className="space-y-1">
                    <Label className="text-xs text-gray-600">Image</Label>
                    <ImageUploadField
                        id={`child-image-${editingChild?.gamestone_id ?? "new"}`}
                        label=""
                        value={form.attachment_id ? [form.attachment_id] : []}
                        onChange={(_ids, files) =>
                            setForm((f) => ({
                                ...f,
                                attachment_id: files?.[0]?.attachment_id ?? undefined,
                            }))
                        }
                        category="profile"
                    />
                </div>
            </div>

            {/* Description with Quill */}
            <div className="space-y-1">
                <Label className="text-xs text-gray-600">Description</Label>
                <div className="bg-white rounded border border-gray-200">
                    <ReactQuill
                        theme="snow"
                        value={form.description}
                        modules={quillModules}
                        onChange={(val) => setForm((f) => ({ ...f, description: val }))}
                        className="min-h-[120px]"
                    />
                </div>
            </div>

            <div className="flex gap-2 pt-1">
                <Button
                    type="button"
                    size="sm"
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-[#094C81] hover:bg-[#094C81]/90 text-white h-8"
                >
                    {isSaving && <Loader2 className="h-3.5 w-3.5 mr-1.5 animate-spin" />}
                    {editingChild ? "Update" : "Add"}
                </Button>
                <Button type="button" variant="ghost" size="sm" onClick={onCancel} className="h-8">
                    Cancel
                </Button>
            </div>
        </div>
    );
}

/* =====================================================
   CHILDREN SECTION
===================================================== */
function ChildrenSection({ parentId }: { parentId: string | undefined }) {
    const { data: allGamestones = [], refetch } = useGetGamestonesQuery();
    const [deleteGamestone] = useDeleteGamestoneMutation();

    const [showEditor, setShowEditor] = useState(false);
    const [editingChild, setEditingChild] = useState<Gamestone | null>(null);
    const [isExpanded, setIsExpanded] = useState(true);

    // Filter sub-items for the current parent
    const children = allGamestones.filter(
        (g) => g.parent_id === parentId
    );

    if (!parentId) return null;

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this sub-item?")) return;
        try {
            await deleteGamestone(id);
            toast.success("Sub-item deleted");
            refetch();
        } catch {
            toast.error("Failed to delete sub-item");
        }
    };

    const handleEdit = (child: Gamestone) => {
        setEditingChild(child);
        setShowEditor(true);
        setIsExpanded(true);
    };

    const handleSaved = () => {
        setShowEditor(false);
        setEditingChild(null);
        refetch();
    };

    return (
        <Card className="border border-gray-100 shadow-sm py-0">
            <CardHeader
                className="py-3 px-4 border-b border-gray-100 cursor-pointer flex flex-row items-center justify-between bg-gray-50/60 rounded-t-xl"
                onClick={() => setIsExpanded((v) => !v)}
            >
                <CardTitle className="text-sm font-semibold text-[#073954]">
                    Sub-Items ({children.length})
                </CardTitle>
                <div className="flex items-center gap-2">
                    <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        className="h-7 text-xs border-[#094C81] text-[#094C81] hover:bg-[#094C81] hover:text-white"
                        onClick={(e) => {
                            e.stopPropagation();
                            setEditingChild(null);
                            setShowEditor(true);
                            setIsExpanded(true);
                        }}
                    >
                        <Plus className="h-3 w-3 mr-1" /> Add Sub-item
                    </Button>
                    {isExpanded ? (
                        <ChevronUp className="h-4 w-4 text-gray-400" />
                    ) : (
                        <ChevronDown className="h-4 w-4 text-gray-400" />
                    )}
                </div>
            </CardHeader>

            {isExpanded && (
                <CardContent className="p-4 space-y-3">
                    {/* Children list */}
                    {children.length === 0 && !showEditor && (
                        <p className="text-sm text-gray-400 text-center py-4">
                            No sub-items yet. Click &quot;Add Sub-item&quot; to get started.
                        </p>
                    )}

                    {children.map((child) => (
                        <ChildItemRow
                            key={child.gamestone_id}
                            child={child}
                            onDelete={handleDelete}
                            onEdit={handleEdit}
                        />
                    ))}

                    {/* Inline editor */}
                    {showEditor && (
                        <ChildEditor
                            parentId={parentId}
                            editingChild={editingChild}
                            onSaved={handleSaved}
                            onCancel={() => {
                                setShowEditor(false);
                                setEditingChild(null);
                            }}
                        />
                    )}
                </CardContent>
            )}
        </Card>
    );
}

/* =====================================================
   MAIN FORM
===================================================== */
function GamestoneFormContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const editId = searchParams.get("id") || undefined;
    const isEditing = Boolean(editId);

    /* API hooks */
    const { data: existing, isLoading: isLoadingExisting } = useGetGamestoneByIdQuery(editId!, {
        skip: !editId,
    });
    const [createGamestone, { isLoading: isCreating }] = useCreateGamestoneMutation();
    const [updateGamestone, { isLoading: isUpdating }] = useUpdateGamestoneMutation();

    /* Form state */
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [discoveredDate, setDiscoveredDate] = useState("");
    const [attachmentId, setAttachmentId] = useState<string | undefined>(undefined);
    const [docFiles, setDocFiles] = useState<DocFile[]>([]);

    // After creation, store the newly created ID to enable sub-item section
    const [createdId, setCreatedId] = useState<string | undefined>(undefined);

    /* The parent ID for children section: use editId OR the just-created one */
    const parentForChildren = editId ?? createdId;

    /* Hydrate on edit */
    useEffect(() => {
        if (existing && isEditing) {
            setTitle(existing.title ?? "");
            setDescription(existing.description ?? "");
            setLocation(existing.location ?? "");
            setDiscoveredDate(
                existing.discovered_date
                    ? new Date(existing.discovered_date).toISOString().substring(0, 10)
                    : ""
            );
            setAttachmentId(existing.attachment_id ?? undefined);
            // Hydrate existing document attachments
            if (existing.attachments && existing.attachments.length > 0) {
                setDocFiles(
                    existing.attachments.map((a: any) => ({
                        attachment_id: a.attachment?.attachment_id ?? a.attachment_id,
                        file_name: a.attachment?.file_name ?? "Document",
                        file_path: a.attachment?.file_path,
                        isBlob: false,
                    }))
                );
            }
        }
    }, [existing, isEditing]);

    const handleImageChange = (_ids: string[], files?: UploadedFileInfo[]) => {
        setAttachmentId(files?.[0]?.attachment_id ?? undefined);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) {
            toast.error("Title is required");
            return;
        }

        const discoveredDateISO = discoveredDate ? new Date(discoveredDate).toISOString() : null;

        const attachmentsPayload = docFiles.map((d) => ({ attachment_id: d.attachment_id }));

        try {
            if (isEditing && editId) {
                await updateGamestone({
                    id: editId,
                    data: {
                        title: title.trim(),
                        description,
                        location: location || null,
                        discovered_date: discoveredDateISO,
                        attachment_id: attachmentId ?? null,
                        attachments: attachmentsPayload,
                    },
                }).unwrap();
                toast.success("Gamestone updated successfully!");
            } else {
                const created = await createGamestone({
                    title: title.trim(),
                    description,
                    location: location || null,
                    discovered_date: discoveredDateISO,
                    attachment_id: attachmentId ?? null,
                    parent_id: null,
                    attachments: attachmentsPayload,
                }).unwrap();
                toast.success("Gamestone created! You can now add sub-items below.");
                setCreatedId(created.gamestone_id);
            }
        } catch {
            toast.error(isEditing ? "Failed to update gamestone" : "Failed to create gamestone");
        }
    };

    const isSaving = isCreating || isUpdating;

    if (isEditing && isLoadingExisting) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="h-6 w-6 animate-spin text-[#094C81]" />
                <span className="ml-3 text-gray-500">Loading gamestone data...</span>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-6 w-full space-y-6">
            {/* Header */}
            <div className="flex items-center gap-3">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => router.push("/admin/sectors/mining/gamestones")}
                    className="text-gray-400 hover:text-[#094C81]"
                >
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <div>
                    <h1 className="text-2xl font-bold text-[#073954]">
                        {isEditing ? "Edit Gamestone" : "Create Gamestone"}
                    </h1>
                    <p className="text-sm text-gray-500 mt-0.5">
                        {isEditing
                            ? `Editing: ${existing?.title ?? "..."}`
                            : "Create a new gamestone entry, then add sub-items below"}
                    </p>
                </div>
            </div>

            {/* Main form card */}
            <Card className="border border-gray-100 shadow-sm py-0">
                <CardHeader className="px-6 pt-6 pb-4 border-b border-gray-50">
                    <CardTitle className="text-base text-[#073954]">Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Row 1: Title + Location */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                                    Title <span className="text-red-500">*</span>
                                </Label>
                                <Input
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="E.g., Opals"
                                    className="focus-visible:ring-[#094C81]"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="location" className="text-sm font-medium text-gray-700">
                                    Location
                                </Label>
                                <Input
                                    id="location"
                                    value={location}
                                    onChange={(e) => setLocation(e.target.value)}
                                    placeholder="E.g., Northern Region, Tigray"
                                    className="focus-visible:ring-[#094C81]"
                                />
                            </div>
                        </div>

                        {/* Row 2: Discovered Date */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="discovered-date" className="text-sm font-medium text-gray-700">
                                    Discovered Date
                                </Label>
                                <Input
                                    id="discovered-date"
                                    type="date"
                                    value={discoveredDate}
                                    onChange={(e) => setDiscoveredDate(e.target.value)}
                                    className="focus-visible:ring-[#094C81]"
                                />
                            </div>
                        </div>

                        {/* Cover Image */}
                        <ImageUploadField
                            id="gamestone-image"
                            label="Cover Image"
                            value={attachmentId ? [attachmentId] : []}
                            onChange={handleImageChange}
                            category="profile"
                        />

                        {/* Rich text description */}
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-gray-700">Description</Label>
                            <div className="bg-white rounded-md border border-gray-200">
                                <ReactQuill
                                    theme="snow"
                                    value={description}
                                    modules={quillModules}
                                    onChange={setDescription}
                                    className="min-h-[240px]"
                                />
                            </div>
                        </div>

                        {/* Downloadable Documents */}
                        <DocumentsUploadSection
                            value={docFiles}
                            onChange={setDocFiles}
                        />

                        {/* Actions */}
                        <div className="flex items-center gap-3 pt-2 border-t border-gray-50">
                            <Button
                                type="submit"
                                disabled={isSaving}
                                className="bg-[#094C81] hover:bg-[#094C81]/90 text-white"
                            >
                                {isSaving ? (
                                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                ) : (
                                    <Save className="h-4 w-4 mr-2" />
                                )}
                                {isEditing ? "Save Changes" : "Create Gamestone"}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.push("/admin/sectors/mining/gamestones")}
                            >
                                Back to List
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            {/* Children management — shown when editing OR after creation */}
            {parentForChildren && (
                <ChildrenSection parentId={parentForChildren} />
            )}
        </div>
    );
}

export default function GamestoneFormPage() {
    return <GamestoneFormContent />;
}
