"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { XIcon, FileIcon, ChevronDown, Calendar as CalendarIcon, MapPin, Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { getFileUrl } from "@/utils/fileUrl";
import "quill/dist/quill.snow.css";
import { EditFileUpload } from "@/components/common/EditFileUpload";
import Quill from 'quill';
import { useGetEventCategoriesQuery } from "@/redux/api/eventCategoryApi";
import { CreateEventPayload, UpdateEventPayload, Event } from "@/redux/types/event";
import { UploadedFileInfo } from "@/components/common/FileUpplaodFiled";
import {
    fromDatetimeLocalInput,
    toDatetimeLocalInput,
    formatDate,
    TIMEZONE_LABEL,
} from "@/utils/datetime";

// Dynamic import for Quill
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

interface EventFormProps {
    initialData?: Event;
    onSubmit: (data: any) => Promise<void>;
    isLoading?: boolean;
    title: string;
}

const getFileType = (fileName: string): 'image' | 'video' | 'pdf' | 'document' => {
    const extension = fileName.split('.').pop()?.toLowerCase() || '';
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'].includes(extension)) return 'image';
    if (['mp4', 'mov', 'avi', 'mkv', 'webm', 'flv', 'wmv', 'm4v', '3gp'].includes(extension)) return 'video';
    if (extension === 'pdf') return 'pdf';
    return 'document';
};

export default function EventForm({ initialData, onSubmit, isLoading: isSubmitting, title: pageTitle }: EventFormProps) {
    const router = useRouter();

    // Form states
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [organizer, setOrganizer] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
    const [location, setLocation] = useState("");
    const [virtualLink, setVirtualLink] = useState("");
    const [status, setStatus] = useState<Event["status"]>("draft");
    const [publishStart, setPublishStart] = useState("");
    const [publishEnd, setPublishEnd] = useState("");
    const [contentHtml, setContentHtml] = useState("");
    const [isContentLoaded, setIsContentLoaded] = useState(false);

    // Media states
    const [attachments, setAttachments] = useState<{ attachment_id: string; category: string }[]>([]);
    const [headlineFiles, setHeadlineFiles] = useState<UploadedFileInfo[]>([]);
    const [footerFiles, setFooterFiles] = useState<UploadedFileInfo[]>([]);

    // Category state - single selection
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
    const { data: categoriesData = [] } = useGetEventCategoriesQuery();
    const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

    // Populate initial data
    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title || "");
            setDescription(initialData.description || "");
            setOrganizer(initialData.organizer || "");
            setStartTime(toDatetimeLocalInput(initialData.start_time));
            setEndTime(toDatetimeLocalInput(initialData.end_time));
            setLocation(initialData.location || "");
            setVirtualLink(initialData.virtual_link || "");
            setStatus(initialData.status || "draft");
            setPublishStart(toDatetimeLocalInput(initialData.publish_start));
            setPublishEnd(toDatetimeLocalInput(initialData.publish_end));

            // Handle content
            if (initialData.content) {
                let htmlValue = "";
                if (typeof initialData.content === "string") {
                    if (initialData.content.trim().startsWith("{") && initialData.content.includes('"ops"')) {
                        try {
                            const delta = JSON.parse(initialData.content);
                            const tempCont = document.createElement('div');
                            const quill = new Quill(tempCont);
                            quill.setContents(delta);
                            htmlValue = tempCont.querySelector('.ql-editor')?.innerHTML || '';
                        } catch {
                            htmlValue = initialData.content;
                        }
                    } else {
                        htmlValue = initialData.content;
                    }
                } else if (typeof initialData.content === "object" && initialData.content.ops) {
                    try {
                        const tempCont = document.createElement('div');
                        const quill = new Quill(tempCont);
                        quill.setContents(initialData.content);
                        htmlValue = tempCont.querySelector('.ql-editor')?.innerHTML || '';
                    } catch {
                        htmlValue = JSON.stringify(initialData.content);
                    }
                }
                setContentHtml(htmlValue);
            }
            setIsContentLoaded(true);

            // Category - handle both old link structure and new direct field
            if (initialData.event_category_id) {
                setSelectedCategoryId(initialData.event_category_id);
            } else if (initialData.category_links && initialData.category_links.length > 0) {
                setSelectedCategoryId(initialData.category_links[0].event_category_id);
            }

            // Attachments
            if (initialData.attachments) {
                const mappedHeadline: UploadedFileInfo[] = [];
                const mappedFooter: UploadedFileInfo[] = [];

                initialData.attachments.forEach(att => {
                    const info = att.attachment;
                    if (!info) return;

                    const file: UploadedFileInfo = {
                        attachment_id: info.attachment_id,
                        file_name: info.file_name,
                        file_path: info.file_path,
                        previewUrl: getFileUrl(info.file_path),
                        category: "headline",
                        isBlob: false,
                        file_type: getFileType(info.file_name)
                    };
                    mappedHeadline.push(file);
                });
                setHeadlineFiles(mappedHeadline);
                setAttachments(initialData.attachments.map(a => ({ attachment_id: a.attachment_id, category: "headline" })));
            }
        } else {
            setIsContentLoaded(true);
        }
    }, [initialData]);

    // Reset currentMediaIndex when headlineFiles change
    useEffect(() => {
        setCurrentMediaIndex(0);
    }, [headlineFiles.length]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!title || !organizer || !startTime || !endTime) {
            toast.error("Please fill all required fields (*)");
            return;
        }

        // Validate dates
        if (new Date(startTime) >= new Date(endTime)) {
            toast.error("End time must be after start time");
            return;
        }

        const payload = {
            title,
            description,
            organizer,
            start_time: fromDatetimeLocalInput(startTime)!,
            end_time: fromDatetimeLocalInput(endTime)!,
            location,
            virtual_link: virtualLink,
            status,
            publish_start: fromDatetimeLocalInput(publishStart),
            publish_end: fromDatetimeLocalInput(publishEnd),
            content: contentHtml,
            attachments: attachments.map(a => a.attachment_id),
            event_category_id: selectedCategoryId,
        };

        try {
            await onSubmit(payload);
        } catch (err) {
            console.error(err);
            toast.error("Failed to save event. Please try again.");
        }
    };

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ list: "ordered" }, { list: "bullet" }],
            ["link", "image"],
            ["clean"],
        ],
    };

    // Build display for selected category
    const selectedCategoryObject = categoriesData.find(
        (c) => c.event_category_id === selectedCategoryId
    );

    const currentMedia = headlineFiles.length > 0 ? headlineFiles[currentMediaIndex] : null;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border space-y-6 overflow-hidden">
                <h1 className="text-2xl font-bold text-[#073954]">{pageTitle}</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label>Title *</Label>
                        <Input
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            placeholder="Event Title"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Organizer *</Label>
                            <Input
                                value={organizer}
                                onChange={e => setOrganizer(e.target.value)}
                                placeholder="Organization name"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Status</Label>
                            <select
                                value={status}
                                onChange={e => setStatus(e.target.value as any)}
                                className="w-full border rounded-md h-10 px-3 text-sm focus:ring-2 focus:ring-golden-dark outline-none"
                            >
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                                <option value="scheduled">Scheduled</option>
                                <option value="ongoing">Ongoing</option>
                                <option value="completed">Completed</option>
                                <option value="cancelled">Cancelled</option>
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Start Time *</Label>
                            <Input
                                type="datetime-local"
                                value={startTime}
                                onChange={e => setStartTime(e.target.value)}
                                required
                            />
                            <p className="text-xs text-gray-500">{TIMEZONE_LABEL}</p>
                        </div>
                        <div className="space-y-2">
                            <Label>End Time *</Label>
                            <Input
                                type="datetime-local"
                                value={endTime}
                                onChange={e => setEndTime(e.target.value)}
                                required
                            />
                            <p className="text-xs text-gray-500">{TIMEZONE_LABEL}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Location</Label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    className="pl-10"
                                    value={location}
                                    onChange={e => setLocation(e.target.value)}
                                    placeholder="Physical location"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Virtual Link</Label>
                            <div className="relative">
                                <Globe className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    className="pl-10"
                                    value={virtualLink}
                                    onChange={e => setVirtualLink(e.target.value)}
                                    placeholder="Meeting link"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Publication Window — shown when Published or Scheduled */}
                    {(status === "published" || status === "scheduled") && (
                        <div className="space-y-3 rounded-lg border border-golden-dark/30 bg-amber-50/50 p-4">
                            <p className="text-xs font-semibold text-golden-dark uppercase tracking-wide flex items-center gap-1">
                                <CalendarIcon className="h-3.5 w-3.5" />
                                Publication Window
                            </p>
                            <p className="text-xs text-gray-500">
                                {status === "scheduled"
                                    ? "The event will automatically go live when Publish Start is reached."
                                    : "If left blank, the event is visible immediately with no expiry."}
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <Label className="text-xs">Publish Start</Label>
                                    <Input
                                        type="datetime-local"
                                        value={publishStart}
                                        onChange={e => setPublishStart(e.target.value)}
                                    />
                                    <p className="text-[10px] text-gray-400">Leave blank to publish immediately.</p>
                                    <p className="text-[10px] text-gray-400">{TIMEZONE_LABEL}</p>
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-xs">Publish End</Label>
                                    <Input
                                        type="datetime-local"
                                        value={publishEnd}
                                        onChange={e => setPublishEnd(e.target.value)}
                                    />
                                    <p className="text-[10px] text-gray-400">Leave blank for no expiry.</p>
                                    <p className="text-[10px] text-gray-400">{TIMEZONE_LABEL}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="space-y-2">
                        <Label>Short Description</Label>
                        <Textarea
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            placeholder="Brief overview..."
                            rows={2}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Categories</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className="w-full justify-between font-normal cursor-pointer"
                                    type="button"
                                >
                                    <div className="flex gap-1 flex-wrap">
                                        {selectedCategoryObject ? (
                                            <Badge variant="secondary" className="text-[10px] py-0">
                                                {selectedCategoryObject.name}
                                            </Badge>
                                        ) : (
                                            "Select a category"
                                        )}
                                    </div>
                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[300px] p-2" align="start">
                                <div className="space-y-1">
                                    {categoriesData.length === 0 ? (
                                        <p className="text-sm text-muted-foreground text-center py-4">
                                            No categories yet. Create them in the Event Categories page.
                                        </p>
                                    ) : (
                                        categoriesData.map((cat) => (
                                            <div
                                                key={cat.event_category_id}
                                                onClick={() => {
                                                    setSelectedCategoryId(prev => 
                                                        prev === cat.event_category_id ? null : cat.event_category_id
                                                    );
                                                }}
                                                className={`p-2 rounded-md cursor-pointer text-sm ${selectedCategoryId === cat.event_category_id
                                                        ? "bg-golden-dark/20 text-[#073954]"
                                                        : "hover:bg-gray-100"
                                                    }`}
                                            >
                                                {cat.name}
                                            </div>
                                        ))
                                    )}
                                </div>
                            </PopoverContent>
                        </Popover>
                    </div>

                    <div className="space-y-2">
                        <Label>Event Media</Label>
                        <EditFileUpload
                            id="event-media"
                            accept="image/*"
                            multiple
                            value={attachments.map(a => a.attachment_id)}
                            onChange={(ids, files) => {
                                setAttachments(ids.map(id => ({ attachment_id: id, category: "headline" })));
                                if (files) setHeadlineFiles(files);
                            }}
                            showPreview
                        />
                    </div>

                    {/* Fixed Quill Editor Container */}
                    <div className="space-y-2">
                        <Label>Detailed Content</Label>
                        <div className="quill-container" style={{ position: 'relative', overflow: 'hidden' }}>
                            {isContentLoaded ? (
                                <div style={{ minHeight: '300px' }}>
                                    <ReactQuill
                                        value={contentHtml}
                                        modules={modules}
                                        onChange={setContentHtml}
                                        theme="snow"
                                        style={{ height: '250px', marginBottom: '50px' }}
                                        className="custom-quill"
                                    />
                                </div>
                            ) : (
                                <div className="h-64 bg-gray-50 animate-pulse rounded-md" />
                            )}
                        </div>
                    </div>

                    <div className="pt-4 mt-5">
                        <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-[#094C81] hover:bg-[#073954] cursor-pointer"
                        >
                            {isSubmitting ? "Saving..." : "Save Event"}
                        </Button>
                    </div>
                </form>
            </div>

            {/* Preview */}
            <div className="hidden lg:block space-y-6">
                <div className="sticky top-6 bg-gray-50 border rounded-xl p-6 min-h-[600px]">
                    <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-6">Live Preview</h2>
                    <div className="bg-white rounded-xl shadow-md overflow-hidden border">
                        <div className="relative group">
                            {headlineFiles.length > 0 && currentMedia ? (
                                <>
                                    {currentMedia.file_type === 'video' ? (
                                        <video src={currentMedia.previewUrl} className="w-full h-48 object-cover rounded-md bg-black" controls />
                                    ) : (
                                        <img src={currentMedia.previewUrl} className="w-full h-48 object-cover rounded-md" alt="Preview" />
                                    )}
                                    
                                    {headlineFiles.length > 1 && (
                                        <>
                                            <button
                                                type="button"
                                                onClick={() => setCurrentMediaIndex(prev => prev === 0 ? headlineFiles.length - 1 : prev - 1)}
                                                className="absolute left-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/50 text-white hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <XIcon className="h-4 w-4 rotate-90" />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setCurrentMediaIndex(prev => prev === headlineFiles.length - 1 ? 0 : prev + 1)}
                                                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-full bg-black/50 text-white hover:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <XIcon className="h-4 w-4 -rotate-90" />
                                            </button>
                                            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-black/50 text-white text-[10px]">
                                                {currentMediaIndex + 1} / {headlineFiles.length}
                                            </div>
                                        </>
                                    )}
                                </>
                            ) : (
                                <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400 rounded-md">
                                    <ImageIcon size={48} />
                                </div>
                            )}
                        </div>
                        <div className="p-6 space-y-4">
                            <div className="flex gap-2 flex-wrap min-h-[24px]">
                                {selectedCategoryObject && (
                                    <Badge variant="outline" className="text-golden-dark border-golden-dark scale-90 origin-left">
                                        {selectedCategoryObject.name}
                                    </Badge>
                                )}
                            </div>
                            <h1 className="text-2xl font-bold text-[#073954]">{title || "Event Title"}</h1>
                            <p className="text-gray-600 text-sm line-clamp-3">{description || "Event description preview will appear here..."}</p>

                            <div className="grid grid-cols-2 gap-4 py-4 border-y text-sm">
                                <div className="flex items-center gap-2">
                                    <CalendarIcon className="h-4 w-4 text-golden-dark" />
                                    <span className="font-medium">{startTime ? formatDate(fromDatetimeLocalInput(startTime) ?? startTime) : "Date TBD"}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-golden-dark" />
                                    <span className="font-medium truncate">{location || "Location TBD"}</span>
                                </div>
                            </div>

                            <div className="prose prose-sm max-w-none line-clamp-6" dangerouslySetInnerHTML={{ __html: contentHtml }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ImageIcon({ size }: { size: number }) {
    return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-image"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></svg>;
}