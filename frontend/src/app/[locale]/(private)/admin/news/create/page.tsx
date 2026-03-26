"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDown, Eye, FileIcon, Trash2, Upload, X, XIcon } from "lucide-react";
import { toast } from "sonner";
import { useCreateNewsMutation } from "@/redux/api/newsApi";
import {
    useUploadAttachmentsMutation,
    useDeleteAttachmentMutation,
    useGetAttachmentsQuery,
} from "@/redux/api/attachementApi";
import { getFileType as getFileTypeUtil, getFileUrl } from "@/utils/fileUrl";
import "quill/dist/quill.snow.css";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useGetTagsQuery } from "@/redux/api/tagApi";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
// Dynamic import for Quill
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

/** Types */
type NewsAttachmentInput = {
    attachment_id: string;
    category: "headline" | "footer";
};

export type UploadedFileInfo = {
    attachment_id: string;
    file_name: string;
    file_path?: string;
    previewUrl?: string | null;
    category?: "headline" | "footer";
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
    category?: "headline" | "footer";
}

// Enhanced file type detection
const getFileType = (fileName: string): 'image' | 'video' | 'pdf' | 'document' => {
    const extension = fileName.split('.').pop()?.toLowerCase() || '';

    // Image extensions
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'].includes(extension)) {
        return 'image';
    }
    // Video extensions
    if (['mp4', 'mov', 'avi', 'mkv', 'webm', 'flv', 'wmv', 'm4v', '3gp'].includes(extension)) {
        return 'video';
    }
    // PDF
    if (extension === 'pdf') {
        return 'pdf';
    }
    // Default to document
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
    category,
}) => {
    const [uploadAttachments] = useUploadAttachmentsMutation();
    const [deleteAttachment] = useDeleteAttachmentMutation();
    const { data: attachmentsResponse } = useGetAttachmentsQuery();
    const [files, setFiles] = useState<UploadedFileInfo[]>([]);
    const [previewFile, setPreviewFile] = useState<UploadedFileInfo | null>(null);

    // Initialize existing attachments
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
                        previewUrl: getFileUrl(found.file_path),
                        category,
                        isBlob: false,
                        file_type: getFileType(found.file_name),
                    };
                }
                return null;
            })
            .filter(Boolean) as UploadedFileInfo[];

        if (mapped.length) {
            // Merge with existing files, preserving blob URLs
            setFiles(prev => {
                const existingIds = new Set(prev.map(f => f.attachment_id));
                const newFiles = mapped.filter(f => !existingIds.has(f.attachment_id));
                return [...prev, ...newFiles];
            });
        }
    }, [attachmentsResponse, value, category]);

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
                        category,
                        isBlob: true,
                        file_type: getFileType(uploaded.file_name),
                    };
                }
            } catch {
                toast.error(`Failed to upload ${file.name}`);
                return null;
            }
        });

        const uploadedFiles = (await Promise.all(uploadPromises)).filter(
            Boolean
        ) as UploadedFileInfo[];

        if (uploadedFiles.length > 0) {
            const updatedFiles = [...files, ...uploadedFiles];
            setFiles(updatedFiles);
            onChange(updatedFiles.map((f) => f.attachment_id), updatedFiles);
            uploadedFiles.forEach((f) => toast.success(`${f.file_name} uploaded`));
        }

        // Clear the input
        e.target.value = '';
    };

    const handleDelete = async (attachment_id: string) => {
        try {
            const fileToDelete = files.find(f => f.attachment_id === attachment_id);

            // Only call API for non-blob files (already uploaded to server)
            if (!fileToDelete?.isBlob) {
                await deleteAttachment(attachment_id).unwrap();
            }

            // Clean up blob URL if it exists
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

    // Cleanup object URLs on unmount
    useEffect(() => {
        return () => {
            files.forEach((f) => {
                if (f.isBlob && f.previewUrl) {
                    URL.revokeObjectURL(f.previewUrl);
                }
            });
        };
    }, []);

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium cursor-pointer">
                {label} {required && <span className="text-red-500">*</span>}
            </label>

            <div className="relative flex flex-col items-center justify-center border border-[#B1C9E3] rounded-md border-dashed p-3 hover:bg-gray-50 cursor-pointer">
                <input
                    id={id}
                    type="file"
                    accept={accept}
                    multiple={multiple}
                    onChange={handleFileChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center justify-center space-y-2">
                    <Upload className="w-6 h-6 text-gray-500" />
                    <p className="text-sm text-gray-600">Click or drag to upload</p>
                </div>
            </div>

            {showPreview && files.length > 0 && (
                <div className="grid grid-cols-1 gap-2 mt-2">
                    {files.map((file) => (
                        <div
                            key={file.attachment_id}
                            className="flex items-center justify-between border border-gray-200 rounded-md p-2 bg-gray-50"
                        >
                            <div className="flex items-center gap-2">
                                {file.previewUrl && file.file_type === "image" && (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={file.previewUrl || ""}
                                        alt={file.file_name}
                                        className="w-10 h-10 object-cover rounded"
                                    />
                                )}
                                {file.file_type === "video" && (
                                    <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                                        <video className="w-8 h-8 object-cover" muted>
                                            <source src={file.previewUrl} type="video/mp4" />
                                        </video>
                                    </div>
                                )}
                                <span className="text-sm text-gray-700 truncate max-w-[100px]">{file.file_name}</span>
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

            {/* Preview Modal */}
            {previewFile && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] p-4 relative overflow-auto">
                        <button
                            className="absolute top-2 right-2 p-2 rounded-full hover:bg-gray-200"
                            onClick={() => setPreviewFile(null)}
                        >
                            <X className="w-5 h-5" />
                        </button>
                        <h3 className="text-lg font-semibold mb-4">{previewFile.file_name}</h3>

                        {previewFile.file_type === "image" && previewFile.previewUrl && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={previewFile.previewUrl} alt={previewFile.file_name} className="w-full h-auto max-h-[70vh] object-contain" />
                        )}
                        {previewFile.file_type === "video" && previewFile.previewUrl && (
                            <video controls className="w-full h-auto max-h-[70vh]">
                                <source src={previewFile.previewUrl || ""} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        )}
                        {previewFile.file_type === "pdf" && previewFile.previewUrl && (
                            <iframe
                                src={previewFile.previewUrl || ""}
                                className="w-full h-[70vh]"
                                title={previewFile.file_name}
                            />
                        )}
                        {!previewFile.previewUrl && <p className="text-gray-600">Cannot preview this file type.</p>}
                    </div>
                </div>
            )}
        </div>
    );
};

type QuillDelta = {
    ops: any[];
};

/** CreateNews Component */
const CreateNews = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [tags, setTags] = useState("");
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [content, setContent] = useState("");
    const [contentDelta, setContentDelta] = useState<QuillDelta | null>(null);
    const [contentHtml, setContentHtml] = useState("")

    const [newsAttachments, setNewsAttachments] = useState<NewsAttachmentInput[]>([]);
    const [headlineFiles, setHeadlineFiles] = useState<UploadedFileInfo[]>([]);
    const [footerFiles, setFooterFiles] = useState<UploadedFileInfo[]>([]);
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
    const [status, setStatus] = useState<"draft" | "published" | "archived">("draft");
    const [publishedAt, setPublishedAt] = useState(new Date().toISOString().slice(0, 16));

    const [createNews] = useCreateNewsMutation();
    const { data = [], isLoading, isError } = useGetTagsQuery()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !author || !contentHtml) {
            alert("Please fill required fields");
            return;
        }
        try {
            await createNews({
                title,
                author,
                tags: selectedTags,
                content: contentHtml,
                attachments: newsAttachments || [],
                status,
                published_at: status === "published" ? new Date(publishedAt).toISOString() : undefined,
            }).unwrap();

            alert("News Created Successfully!");
            // Reset form
            setTitle(""); setAuthor(""); setTags(""); setContent(""); setContentDelta(null);
            setContentHtml("");
            setNewsAttachments([]); setHeadlineFiles([]); setFooterFiles([]); setCurrentMediaIndex(0);
        } catch (error) {
            console.error(error);
            alert("Failed to create news");
        }
    };

    const modules = {
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

    const getCurrentMedia = () => (headlineFiles.length ? headlineFiles[currentMediaIndex] : null);
    const currentMedia = getCurrentMedia();

    // Helper to get the correct URL for preview
    const getMediaUrl = (file: UploadedFileInfo) => {
        if (file.isBlob) return file.previewUrl; // Blob URL for new uploads
        if (file.file_path) return getFileUrl(file.file_path); // Server URL for existing files
        return file.previewUrl;
    };

    return (
        <div className="min-h-screen w-full grid grid-cols-2 gap-10">
            {/* Form */}
            <div className="bg-white p-6 rounded-lg shadow overflow-y-auto space-y-6">
                <h1 className="text-2xl font-bold mb-6 text-[#073954]">Create News</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="status">Status</Label>
                            <select
                                id="status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value as any)}
                                className="w-full border border-gray-300 p-2 rounded-md bg-white text-sm"
                            >
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                                <option value="archived">Archived</option>
                            </select>
                        </div>
                        {status === "published" && (
                            <div className="space-y-2">
                                <Label htmlFor="published-at">Publish Date & Time</Label>
                                <Input
                                    id="published-at"
                                    type="datetime-local"
                                    value={publishedAt}
                                    onChange={(e) => setPublishedAt(e.target.value)}
                                />
                            </div>
                        )}
                    </div>

                    <Input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title *" />
                    <Input value={author} onChange={e => setAuthor(e.target.value)} placeholder="Author *" />
                    <div className="w-full space-y-2">
                        <Label className="text-sm font-medium text-[#094C81]">
                            Tags <span className="text-red-500">*</span>
                        </Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <button
                                    type="button"
                                    className="w-full max-h-28 min-h-12 h-fit border border-gray-300 p-2 rounded-md mt-1 text-[#094C81] bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#094C81] focus:ring-offset-2 transition-all duration-200"
                                >
                                    <div className="flex flex-wrap items-center gap-2 w-full">
                                        {selectedTags.length === 0 && (
                                            <span className="text-sm w-full justify-between text-gray-400 flex items-center gap-2">
                                                Select Tags
                                                <ChevronDown className="h-4 w-4 ml-auto" />
                                            </span>
                                        )}

                                        {selectedTags.map((tagId) => {
                                            const r = data.find(
                                                (rr: any) => rr.tag_id === tagId
                                            );
                                            if (!r) return null;

                                            return (
                                                <span
                                                    key={tagId}
                                                    className="inline-flex items-center gap-1 rounded-md justify-center bg-[#094C81]/10 text-[#094C81] px-2 py-1 text-xs"
                                                >
                                                    <span className="truncate max-w-[120px]">
                                                        {r.name}
                                                    </span>
                                                    <button
                                                        type="button"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            setSelectedTags((prev) =>
                                                                prev.filter((id) => id !== tagId)
                                                            );
                                                        }}
                                                        className="flex h-4 w-4 items-center justify-center rounded-full hover:bg-[#094C81]/20 transition-colors"
                                                        aria-label={`Remove ${r.name}`}
                                                    >
                                                        <XIcon className="h-3 w-3" />
                                                    </button>
                                                </span>
                                            );
                                        })}
                                        {selectedTags.length > 0 && (
                                            <ChevronDown className="h-4 w-4 ml-auto text-gray-400" />
                                        )}
                                    </div>
                                </button>
                            </PopoverTrigger>
                            <PopoverContent
                                className="w-[300px] p-2 bg-white"
                                align="start"
                            >
                                <div className="max-h-64 overflow-y-auto">
                                    {data
                                        .filter((r: any) => !selectedTags.includes(r.tag_id))
                                        .map((r: any) => (
                                            <button
                                                key={r.tag_id}
                                                type="button"
                                                onClick={() => {
                                                    setSelectedTags((prev) => [...prev, r.tag_id]);
                                                }}
                                                className="w-full text-left px-3 py-2 text-sm text-[#094C81] hover:bg-[#094C81]/10 rounded-md cursor-pointer transition-colors"
                                            >
                                                <span className="block truncate">{r.name}</span>
                                            </button>
                                        ))}
                                    {data.filter(
                                        (r: any) => !selectedTags.includes(r.role_id)
                                    ).length === 0 && (
                                            <div className="px-3 py-2 text-sm text-gray-400 text-center">
                                                All tags selected
                                            </div>
                                        )}
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>


                    {/* Headline Media */}
                    <FileUploadField
                        id="headline-media"
                        label="Media (Images & Videos)"
                        accept="image/*,video/*"
                        value={newsAttachments.filter(a => a.category === "headline").map(a => a.attachment_id)}
                        onChange={(ids, files) => {
                            setNewsAttachments(prev => [
                                ...prev.filter(a => a.category !== "headline"),
                                ...ids.map(id => ({ attachment_id: id, category: "headline" as const })),
                            ]);
                            if (files) setHeadlineFiles(files);
                            setCurrentMediaIndex(0);
                        }}
                        multiple
                        showPreview
                        category="headline"
                    />

                    {/* Footer Documents */}
                    <FileUploadField
                        id="footer-documents"
                        label="Documents (PDF, DOCX)"
                        accept=".pdf,.doc,.docx"
                        value={newsAttachments.filter(a => a.category === "footer").map(a => a.attachment_id)}
                        onChange={(ids, files) => {
                            setNewsAttachments(prev => [
                                ...prev.filter(a => a.category !== "footer"),
                                ...ids.map(id => ({ attachment_id: id, category: "footer" as const })),
                            ]);
                            if (files) setFooterFiles(files);
                        }}
                        multiple
                        showPreview
                        category="footer"
                    />

                    {/* <ReactQuill value={content} onChange={setContent} modules={modules} /> */}
                    <ReactQuill
                        theme="snow"
                        value={contentHtml}
                        modules={modules}
                        onChange={(html) => setContentHtml(html)}
                    />

                    <Button type="submit">Create News</Button>
                </form>
            </div >

            {/* Preview */}
            < div className="bg-white p-6 rounded-lg shadow overflow-y-auto" >
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">Live Preview</h2>
                <h1 className="text-3xl font-bold mb-3">{title || "News Title Preview"}</h1>
                <div className="text-sm text-gray-500 mb-4">{author ? `By ${author}` : "By Author"} • {new Date().toLocaleDateString()}</div>

                {/* Media Preview */}
                {
                    headlineFiles.length > 0 && currentMedia && (
                        <div className="relative w-full mb-4">
                            {currentMedia.file_type === "image" && (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={getMediaUrl(currentMedia)}
                                    alt={currentMedia.file_name}
                                    className="w-full h-72 object-cover rounded-lg"
                                    onError={(e) => {
                                        // Fallback for broken images
                                        e.currentTarget.src = '/placeholder-image.jpg';
                                    }}
                                />
                            )}
                            {currentMedia.file_type === "video" && (
                                <video
                                    controls
                                    className="w-full h-72 rounded-lg bg-black"
                                    key={currentMedia.attachment_id} // Force re-render when video changes
                                >
                                    <source src={getMediaUrl(currentMedia)} type="video/mp4" />
                                    <source src={getMediaUrl(currentMedia)} type="video/mov" />
                                    <source src={getMediaUrl(currentMedia)} type="video/avi" />
                                    Your browser does not support the video tag.
                                </video>
                            )}

                            {headlineFiles.length > 1 && (
                                <>
                                    <button
                                        type="button"
                                        onClick={() => setCurrentMediaIndex(prev => (prev === 0 ? headlineFiles.length - 1 : prev - 1))}
                                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white rounded-full p-2 hover:bg-gray-800"
                                    >
                                        &#8592;
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setCurrentMediaIndex(prev => (prev === headlineFiles.length - 1 ? 0 : prev + 1))}
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white rounded-full p-2 hover:bg-gray-800"
                                    >
                                        &#8594;
                                    </button>
                                    <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                                        {currentMediaIndex + 1} / {headlineFiles.length}
                                    </div>
                                </>
                            )}
                        </div>
                    )
                }

                {/* Tags Preview */}
                {
                    tags && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {tags.split(",").map(tag => tag.trim()).filter(Boolean).map((tag, i) => (
                                <span key={i} className="text-xs bg-gray-200 px-3 py-1 rounded-full">{tag}</span>
                            ))}
                        </div>
                    )
                }

                {/* Content Preview */}
                <div
                    className="prose prose-slate max-w-none break-words mb-4 dark:prose-invert"
                    dangerouslySetInnerHTML={{ __html: contentHtml || "<p>News content preview will appear here...</p>" }}
                />
                {/* Footer Files */}
                {
                    footerFiles.length > 0 && (
                        <div className="mt-4">
                            <h3 className="font-semibold mb-2">Attached Documents:</h3>
                            <ul className="space-y-2">
                                {footerFiles.map(doc => (
                                    <li key={doc.attachment_id} className="border w-fit py-2 px-3 rounded-lg flex items-center gap-2">
                                        <FileIcon className="w-4 h-4" />
                                        <a
                                            href={doc.isBlob ? doc.previewUrl! : getFileUrl(doc.file_path!)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="hover:text-blue-600 hover:underline"
                                        >
                                            {doc.file_name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )
                }
            </div >
        </div >
    );
};

export default CreateNews;