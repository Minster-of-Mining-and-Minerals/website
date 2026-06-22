"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronDown, XIcon, FileIcon } from "lucide-react";
import { toast } from "sonner";
import { useUpdateNewsMutation, useGetNewsByIdQuery } from "@/redux/api/newsApi";
import {
    useDeleteAttachmentMutation,
} from "@/redux/api/attachementApi";
import { getFileUrl } from "@/utils/fileUrl";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import "quill/dist/quill.snow.css";
import { FileUploadField, UploadedFileInfo } from "@/components/common/FileUpplaodFiled";
import Quill from 'quill';
import { useGetTagsQuery } from "@/redux/api/tagApi";
import { EditFileUpload } from "@/components/common/EditFileUpload";
import {
    fromDatetimeLocalInput,
    toDatetimeLocalInput,
    TIMEZONE_LABEL,
} from "@/utils/datetime";

// Dynamic import for Quill
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

/** Types */
type NewsAttachmentInput = {
    attachment_id: string;
    category: "headline" | "footer";
};

// Helper function to get file type
const getFileType = (fileName: string): 'image' | 'video' | 'pdf' | 'document' => {
    const extension = fileName.split('.').pop()?.toLowerCase() || '';
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'].includes(extension)) return 'image';
    if (['mp4', 'mov', 'avi', 'mkv', 'webm', 'flv', 'wmv', 'm4v', '3gp'].includes(extension)) return 'video';
    if (extension === 'pdf') return 'pdf';
    return 'document';
};

const EditNews = () => {
    const params = useParams();
    const router = useRouter();
    const newsId = params.newsId as string;
    const { data: newsResponse, isLoading } = useGetNewsByIdQuery(newsId);
    const [updateNews] = useUpdateNewsMutation();
    const [deleteAttachment] = useDeleteAttachmentMutation();

    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [contentHtml, setContentHtml] = useState("");
    const [contentDelta, setContentDelta] = useState<any>(null);
    const [isContentLoaded, setIsContentLoaded] = useState(false);

    const [newsAttachments, setNewsAttachments] = useState<NewsAttachmentInput[]>([]);
    const [headlineFiles, setHeadlineFiles] = useState<UploadedFileInfo[]>([]);
    const [footerFiles, setFooterFiles] = useState<UploadedFileInfo[]>([]);
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
    const [status, setStatus] = useState<"draft" | "published" | "archived">("draft");
    const [publishedAt, setPublishedAt] = useState("");

    const { data: tagsData = [] } = useGetTagsQuery();

    /** Populate form with existing news */
    useEffect(() => {
        if (!newsResponse) return;
        const news = newsResponse;

        setTitle(news.title || "");
        setAuthor(news.author || "");

        // Set tags from tag_links
        if (news.tag_links && news.tag_links.length > 0) {
            const tagIds = news.tag_links.map((link: any) => link.tag.tag_id);
            setSelectedTags(tagIds);
        }

        setStatus(news.status || "draft");
        setPublishedAt(
            news.published_at
                ? toDatetimeLocalInput(news.published_at)
                : toDatetimeLocalInput(new Date().toISOString())
        );

        // Set content - handle both Delta and HTML
        if (news.content) {
            console.log("Setting content:", news.content);
            let htmlValue = "";

            // Check if content is a Quill Delta JSON string
            if (typeof news.content === "string") {
                if (news.content.trim().startsWith("{") && news.content.includes('"ops"')) {
                    try {
                        const delta = JSON.parse(news.content);
                        const tempCont = document.createElement('div');
                        const quill = new Quill(tempCont);
                        quill.setContents(delta);
                        htmlValue = tempCont.querySelector('.ql-editor')?.innerHTML || '';
                    } catch (error) {
                        console.error('Error parsing Delta JSON:', error);
                        htmlValue = news.content;
                    }
                } else {
                    // It's already HTML
                    htmlValue = news.content;
                }
            } else if (typeof news.content === "object" && news.content.ops) {
                // It's a Delta object
                try {
                    const tempCont = document.createElement('div');
                    const quill = new Quill(tempCont);
                    quill.setContents(news.content);
                    htmlValue = tempCont.querySelector('.ql-editor')?.innerHTML || '';
                } catch (error) {
                    console.error('Error converting Delta object:', error);
                    htmlValue = JSON.stringify(news.content);
                }
            } else {
                htmlValue = String(news.content);
            }

            setContentHtml(htmlValue);
            setIsContentLoaded(true);
        } else {
            setIsContentLoaded(true);
        }

        // Map attachments to files
        const headlineFilesMapped: UploadedFileInfo[] = [];
        const footerFilesMapped: UploadedFileInfo[] = [];

        (news.attachments || []).forEach((att: any) => {
            const attachmentInfo = att.attachment;
            if (!attachmentInfo) return;

            const mapped: UploadedFileInfo = {
                attachment_id: attachmentInfo.attachment_id,
                file_name: attachmentInfo.file_name,
                file_path: attachmentInfo.file_path,
                previewUrl: getFileUrl(attachmentInfo.file_path),
                category: att.category,
                isBlob: false,
                file_type: getFileType(attachmentInfo.file_name),
            };

            if (att.category === "headline") headlineFilesMapped.push(mapped);
            if (att.category === "footer") footerFilesMapped.push(mapped);
        });

        setHeadlineFiles(headlineFilesMapped);
        setFooterFiles(footerFilesMapped);

        setNewsAttachments(
            (news.attachments || []).map((att: any) => ({
                attachment_id: att.attachment_id,
                category: att.category,
            }))
        );
    }, [newsResponse]);

    // Reset currentMediaIndex when headlineFiles change
    useEffect(() => {
        setCurrentMediaIndex(0);
    }, [headlineFiles.length]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !author || !contentDelta) {
            toast.error("Please fill all required fields");
            return;
        }

        // Show loading toast
        const loadingToast = toast.loading("Updating news...");

        try {
            const payload = {
                title,
                author,
                content: contentHtml, // Send HTML instead of Delta
                attachment_ids: newsAttachments.map(att => ({
                    attachment_id: att.attachment_id,
                    category: att.category
                })),
                tag_ids: selectedTags,
                status,
                published_at: status === "published" ? fromDatetimeLocalInput(publishedAt) ?? undefined : undefined,
            };

            console.log("Submitting payload:", payload);

            await updateNews({
                id: newsId,
                data: payload
            }).unwrap();

            // Dismiss loading toast and show success
            toast.dismiss(loadingToast);
            toast.success("News Updated Successfully!");

            // Navigate to news list after a short delay
            setTimeout(() => {
                router.push('/admin/news');
            }, 1500);

        } catch (err: any) {
            // Dismiss loading toast and show error
            toast.dismiss(loadingToast);
            console.error(err);
            toast.error(err?.data?.message || "Failed to update news");
        }
    };

    const handleDeleteAttachment = async (attachmentId: string, category: 'headline' | 'footer') => {
        try {
            const fileToDelete = category === 'headline'
                ? headlineFiles.find(f => f.attachment_id === attachmentId)
                : footerFiles.find(f => f.attachment_id === attachmentId);

            // Only call API for non-blob files
            if (!fileToDelete?.isBlob) {
                await deleteAttachment(attachmentId).unwrap();
            }

            // Update state
            if (category === 'headline') {
                setHeadlineFiles(prev => prev.filter(f => f.attachment_id !== attachmentId));
            } else {
                setFooterFiles(prev => prev.filter(f => f.attachment_id !== attachmentId));
            }

            setNewsAttachments(prev => prev.filter(a => a.attachment_id !== attachmentId));

            toast.success("File removed successfully");
        } catch {
            toast.error("Failed to delete file");
        }
    };

    if (isLoading) return <div className="flex justify-center items-center h-64">Loading...</div>;

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
    const getMediaUrl = (file: UploadedFileInfo) => file.isBlob ? file.previewUrl : getFileUrl(file.file_path!);

    return (
        <div className="min-h-screen w-full grid grid-cols-2 gap-10">
            <div className="bg-white p-6 rounded-lg shadow overflow-y-auto space-y-6">
                <h1 className="text-2xl font-bold mb-6 text-[#073954]">Edit News</h1>
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
                                <p className="text-xs text-gray-500">{TIMEZONE_LABEL}</p>
                            </div>
                        )}
                    </div>
                    <Input
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="Title *"
                    />

                    <Input
                        value={author}
                        onChange={e => setAuthor(e.target.value)}
                        placeholder="Author *"
                    />

                    {/* Tags Popover */}
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
                                            const tag = tagsData.find(
                                                (t: any) => t.tag_id === tagId
                                            );
                                            if (!tag) return null;

                                            return (
                                                <span
                                                    key={tagId}
                                                    className="inline-flex items-center gap-1 rounded-md justify-center bg-[#094C81]/10 text-[#094C81] px-2 py-1 text-xs"
                                                >
                                                    <span className="truncate max-w-[120px]">
                                                        {tag.name}
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
                                                        aria-label={`Remove ${tag.name}`}
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
                                    {tagsData
                                        .filter((t: any) => !selectedTags.includes(t.tag_id))
                                        .map((t: any) => (
                                            <button
                                                key={t.tag_id}
                                                type="button"
                                                onClick={() => {
                                                    setSelectedTags((prev) => [...prev, t.tag_id]);
                                                }}
                                                className="w-full text-left px-3 py-2 text-sm text-[#094C81] hover:bg-[#094C81]/10 rounded-md cursor-pointer transition-colors"
                                            >
                                                <span className="block truncate">{t.name}</span>
                                            </button>
                                        ))}
                                    {tagsData.filter(
                                        (t: any) => !selectedTags.includes(t.tag_id)
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
                    <EditFileUpload
                        id="headline-media"
                        label="Media (Images & Videos)"
                        accept="image/*,video/*"
                        value={newsAttachments.filter(a => a.category === "headline").map(a => a.attachment_id)}
                        onChange={(ids, files) => {
                            setNewsAttachments(prev => [
                                ...prev.filter(a => a.category !== "headline"),
                                ...ids.map(id => ({ attachment_id: id, category: "headline" as const })),
                            ]);
                            if (files) {
                                setHeadlineFiles(files);
                            }
                            setCurrentMediaIndex(0);
                        }}
                        multiple
                        showPreview
                        category="headline"
                        onDelete={(attachmentId) => handleDeleteAttachment(attachmentId, 'headline')}
                    />

                    {/* Footer Documents */}
                    <EditFileUpload
                        id="footer-documents"
                        label="Documents (PDF, DOCX)"
                        accept=".pdf,.doc,.docx"
                        value={newsAttachments.filter(a => a.category === "footer").map(a => a.attachment_id)}
                        onChange={(ids, files) => {
                            setNewsAttachments(prev => [
                                ...prev.filter(a => a.category !== "footer"),
                                ...ids.map(id => ({ attachment_id: id, category: "footer" as const })),
                            ]);
                            if (files) {
                                setFooterFiles(files);
                            }
                        }}
                        multiple
                        showPreview
                        category="footer"
                        onDelete={(attachmentId) => handleDeleteAttachment(attachmentId, 'footer')}
                    />

                    {/* Quill Editor - Only render when content is loaded */}
                    {isContentLoaded && (
                        <div className="quill-editor">
                            <ReactQuill
                                value={contentHtml}
                                modules={modules}
                                onChange={(html, delta, source, editor) => {
                                    setContentHtml(html);
                                    setContentDelta(editor.getContents());
                                }}
                            />
                        </div>
                    )}

                    {/* Show loading state while content is being prepared */}
                    {!isContentLoaded && (
                        <div className="h-64 flex items-center justify-center border rounded-md">
                            <p className="text-gray-400">Loading content...</p>
                        </div>
                    )}

                    <Button type="submit" className="w-full bg-[#094C81] hover:bg-[#073954]">
                        Update News
                    </Button>
                </form>
            </div>

            {/* Preview Section */}
            <div className="bg-white p-6 rounded-lg shadow overflow-y-auto">
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">Live Preview</h2>
                <h1 className="text-3xl font-bold mb-3">{title || "News Title Preview"}</h1>
                <div className="text-sm text-gray-500 mb-4">
                    {author ? `By ${author}` : "By Author"} • {new Date().toLocaleDateString()}
                </div>

                {/* Media Preview */}
                {headlineFiles.length > 0 && currentMedia && (
                    <div className="relative w-full mb-4">
                        {currentMedia.file_type === "image" && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                                src={getMediaUrl(currentMedia) || ""}
                                alt={currentMedia.file_name}
                                className="w-full h-72 object-cover rounded-lg"
                                onError={(e) => {
                                    e.currentTarget.src = '/placeholder-image.jpg';
                                }}
                            />
                        )}
                        {currentMedia.file_type === "video" && (
                            <video
                                controls
                                className="w-full h-72 rounded-lg bg-black"
                                key={currentMedia.attachment_id}
                            >
                                <source src={getMediaUrl(currentMedia) || ""} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        )}

                        {/* Navigation Arrows */}
                        {headlineFiles.length > 1 && (
                            <>
                                <button
                                    type="button"
                                    onClick={() => setCurrentMediaIndex(prev =>
                                        prev === 0 ? (headlineFiles.length > 0 ? headlineFiles.length - 1 : 0) : prev - 1
                                    )}
                                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white rounded-full p-2 hover:bg-gray-800 z-10"
                                >
                                    ←
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setCurrentMediaIndex(prev =>
                                        prev === (headlineFiles.length > 0 ? headlineFiles.length - 1 : 0) ? 0 : prev + 1
                                    )}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white rounded-full p-2 hover:bg-gray-800 z-10"
                                >
                                    →
                                </button>
                                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm z-10">
                                    {currentMediaIndex + 1} / {headlineFiles.length}
                                </div>
                            </>
                        )}
                    </div>
                )}

                {/* Show placeholder when no media */}
                {headlineFiles.length === 0 && (
                    <div className="w-full h-72 bg-gray-100 rounded-lg mb-4 flex items-center justify-center text-gray-400">
                        No media uploaded
                    </div>
                )}

                {/* Tags Preview */}
                {selectedTags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {selectedTags.map((tagId) => {
                            const tag = tagsData.find((t: any) => t.tag_id === tagId);
                            return tag ? (
                                <span key={tagId} className="text-xs bg-gray-200 px-3 py-1 rounded-full">
                                    {tag.name}
                                </span>
                            ) : null;
                        })}
                    </div>
                )}

                {/* Content Preview */}
                <div
                    className="prose prose-slate max-w-none break-words mb-4 dark:prose-invert"
                    dangerouslySetInnerHTML={{
                        __html: contentHtml || "<p>News content preview will appear here...</p>"
                    }}
                />

                {/* Footer Files Preview */}
                {footerFiles.length > 0 && (
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
                )}
            </div>
        </div>
    );
};

export default EditNews;