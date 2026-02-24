"use client";
import React, { useState, useEffect } from "react";
import { Trash2, Upload, Loader2, Eye, X, ImageIcon } from "lucide-react";
import { toast } from "sonner";
import {
    useUploadAttachmentsMutation,
    useDeleteAttachmentMutation,
    useGetAttachmentsQuery,
} from "@/redux/api/attachementApi";
import { getFileUrl, getFileType } from "@/utils/fileUrl";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

export type UploadedFileInfo = {
    attachment_id: string;
    file_name: string;
    file_path?: string;
    previewUrl?: string | null;
    category?: "headline" | "footer" | "profile";
};

interface ImageUploadFieldProps {
    id: string;
    label: string;
    value: string[]; // Array with single attachment ID
    onChange: (value: string[], files?: UploadedFileInfo[]) => void;
    required?: boolean;
    error?: string;
    className?: string;
    labelClass?: string;
    fieldClass?: string;
    category?: "headline" | "footer" | "profile";
}

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
    id,
    label,
    value = [],
    onChange,
    required = false,
    error,
    className = "",
    labelClass = "",
    fieldClass = "",
    category = "profile",
}) => {
    const [uploadAttachments, { isLoading: isUploading }] =
        useUploadAttachmentsMutation();
    const [deleteAttachment] = useDeleteAttachmentMutation();
    const { data: attachmentsResponse } = useGetAttachmentsQuery();

    const [currentImage, setCurrentImage] = useState<UploadedFileInfo | null>(null);
    const [previewFile, setPreviewFile] = useState<UploadedFileInfo | null>(null);

    // Initialize with existing attachment ID from backend
    useEffect(() => {
        if (!attachmentsResponse || value.length === 0) {
            setCurrentImage(null);
            return;
        }

        const all = attachmentsResponse.attachments || [];
        const attachmentId = value[0]; // Take first ID only

        const found = all.find((a) => a.attachment_id === attachmentId);
        if (found) {
            const imageInfo = {
                attachment_id: found.attachment_id,
                file_name: found.file_name,
                file_path: found.file_path,
                previewUrl: getFileUrl(found.file_path),
                category,
            };
            setCurrentImage(imageInfo);
        } else {
            setCurrentImage(null);
        }
    }, [attachmentsResponse, value, category]);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (!selectedFile) return;

        // Check if it's an image
        if (!selectedFile.type.startsWith('image/')) {
            toast.error("Please select an image file");
            return;
        }

        try {
            const result = await uploadAttachments({ files: [selectedFile] }).unwrap();
            if (result.attachments.length > 0) {
                const uploaded = result.attachments[0];

                // Create preview URL
                let previewUrl: string | null = null;
                if (/\.(png|jpe?g|gif|svg|webp)$/i.test(uploaded.file_name)) {
                    previewUrl = URL.createObjectURL(selectedFile);
                }

                const newImage = {
                    ...uploaded,
                    previewUrl,
                    category
                };

                // If there's an existing image, delete it first
                if (currentImage) {
                    try {
                        await deleteAttachment(currentImage.attachment_id).unwrap();
                    } catch (error) {
                        console.error("Failed to delete old image:", error);
                    }
                }

                setCurrentImage(newImage);
                // Pass both ID and full file info to parent
                onChange([newImage.attachment_id], [newImage]);
                toast.success(`${uploaded.file_name} uploaded successfully`);
            }
        } catch {
            toast.error(`Failed to upload ${selectedFile.name}`);
        }

        // Clear the input
        e.target.value = '';
    };

    const handleDelete = async () => {
        if (!currentImage) return;

        try {
            await deleteAttachment(currentImage.attachment_id).unwrap();

            // Cleanup preview URL
            if (currentImage.previewUrl) {
                URL.revokeObjectURL(currentImage.previewUrl);
            }

            setCurrentImage(null);
            // Pass empty arrays to parent
            onChange([], []);
            toast.success("Image removed successfully");
        } catch {
            toast.error("Failed to delete image");
        }
    };

    // Cleanup preview on unmount
    useEffect(() => {
        return () => {
            if (currentImage?.previewUrl) {
                URL.revokeObjectURL(currentImage.previewUrl);
            }
        };
    }, [currentImage]);

    return (
        <div className={`md:col-span-1 space-y-2 ${className}`}>
            <Label
                htmlFor={id}
                className={`${labelClass ?? "text-sm font-medium"}`}
            >
                {label} {required && <span className="text-red-500">*</span>}
            </Label>

            <div
                className={`${fieldClass} flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-lg p-4 bg-gray-50 group hover:border-gray-300 transition-colors ${error ? "border-red-500" : ""
                    }`}
            >
                {/* Hidden File Input */}
                <input
                    id={id}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileChange}
                    disabled={isUploading}
                />

                {/* IMAGE PREVIEW */}
                {currentImage ? (
                    <div className="relative w-full aspect-square max-w-[150px] overflow-hidden rounded-md border shadow-sm">
                        <img
                            src={currentImage.previewUrl || ''}
                            alt={currentImage.file_name}
                            className="w-full h-full object-cover"
                        />

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity gap-1">
                            <Button
                                type="button"
                                variant="secondary"
                                size="sm"
                                className="h-8 text-xs"
                                onClick={() => setPreviewFile(currentImage)}
                            >
                                <Eye className="h-3.5 w-3.5 mr-1" />
                                View
                            </Button>
                            <Button
                                type="button"
                                variant="secondary"
                                size="sm"
                                className="h-8 text-xs"
                                onClick={() => document.getElementById(id)?.click()}
                                disabled={isUploading}
                            >
                                <Upload className="h-3.5 w-3.5 mr-1" />
                                Change
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center gap-2 py-4">
                        {isUploading ? (
                            <Loader2 className="h-10 w-10 text-gray-400 animate-spin" />
                        ) : (
                            <>
                                <ImageIcon className="h-10 w-10 text-gray-400" />
                                <p className="text-xs text-gray-500">
                                    No image uploaded
                                </p>
                            </>
                        )}
                    </div>
                )}

                {/* Upload Button (shown only when no image) */}
                {!currentImage && !isUploading && (
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="mt-2 h-8 text-xs gap-1"
                        onClick={() => document.getElementById(id)?.click()}
                    >
                        <Upload className="h-3.5 w-3.5" />
                        Upload Image
                    </Button>
                )}

                {/* Delete Button (shown only when image exists) */}
                {currentImage && !isUploading && (
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="mt-2 h-8 text-xs gap-1 text-red-600 hover:bg-red-50"
                        onClick={handleDelete}
                    >
                        <Trash2 className="h-3.5 w-3.5" />
                        Remove Image
                    </Button>
                )}
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

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

                        {previewFile.previewUrl && (
                            <img
                                src={previewFile.previewUrl}
                                alt={previewFile.file_name}
                                className="w-full h-auto max-h-[70vh] object-contain"
                            />
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};