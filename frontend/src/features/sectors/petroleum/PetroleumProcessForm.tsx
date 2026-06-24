"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye, FileIcon, Loader2, Save, Trash2, Upload, X, Plus } from "lucide-react";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import {
    useGetPetroleumProcessByIdQuery,
    useCreatePetroleumProcessMutation,
    useUpdatePetroleumProcessMutation,
} from "@/redux/api/petroleumProcessApi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    useUploadAttachmentsMutation,
    useDeleteAttachmentMutation,
    useGetAttachmentsQuery,
} from "@/redux/api/attachementApi";
import { getFileUrl, getImageUrl } from "@/utils/fileUrl";
import "quill/dist/quill.snow.css";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

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

const getFileType = (fileName: string): 'image' | 'video' | 'pdf' | 'document' => {
    const extension = fileName.split('.').pop()?.toLowerCase() || '';
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp'].includes(extension)) return 'image';
    if (['mp4', 'mov', 'avi', 'mkv', 'webm', 'flv', 'wmv', 'm4v', '3gp'].includes(extension)) return 'video';
    if (extension === 'pdf') return 'pdf';
    return 'document';
};

const FileUploadField: React.FC<FileUploadFieldProps> = ({
    id, label, value = [], onChange, required = false, accept = "*/*", multiple = true, showPreview = true,
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
                        previewUrl: getImageUrl(found, "large"),
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
            let updatedFiles: UploadedFileInfo[];
            if (multiple) {
                updatedFiles = [...files, ...uploadedFiles];
            } else {
                updatedFiles = [...uploadedFiles];
            }
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
                    <p className="text-sm text-gray-600">Click or drag to upload {multiple ? "(Multiple allowed)" : "(Single file)"}</p>
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

export default function PetroleumProcessForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const editId = searchParams.get("id") || undefined;
    const isEditing = Boolean(editId);

    /* API hooks */
    const { data: existing, isLoading: isLoadingExisting } = useGetPetroleumProcessByIdQuery(editId!, {
        skip: !editId,
    });
    const [createProcess, { isLoading: isCreating }] = useCreatePetroleumProcessMutation();
    const [updateProcess, { isLoading: isUpdating }] = useUpdatePetroleumProcessMutation();

    /* Form state */
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    // Block state (We enforce 1 block per process as requested)
    const [blockTitle, setBlockTitle] = useState("");
    const [blockDesc, setBlockDesc] = useState("");
    const [blockContent, setBlockContent] = useState("");
    const [blockAttachmentIds, setBlockAttachmentIds] = useState<string[]>([]);
    const [blockAttachmentFiles, setBlockAttachmentFiles] = useState<UploadedFileInfo[]>([]);

    // Process Steps state
    type SubStepState = {
        id: string; // local id
        description: string;
        attachment_id?: string;
        attachment_file?: UploadedFileInfo;
    };
    type ProcessStepState = {
        id: string; // local id
        title: string;
        description: string;
        content: string;
        steps: SubStepState[];
    };
    const [processSteps, setProcessSteps] = useState<ProcessStepState[]>([]);

    useEffect(() => {
        if (existing && isEditing) {
            setTitle(existing.title ?? "");
            setDescription(existing.description ?? "");

            if (existing.process_blocks && existing.process_blocks.length > 0) {
                const block = existing.process_blocks[0];
                setBlockTitle(block.title ?? "");
                setBlockDesc(block.description ?? "");
                setBlockContent(block.content ?? "");
                const mappedIds = block.attachments?.map((a: any) => a.attachment_id) || [];
                setBlockAttachmentIds(mappedIds);
            }

            if (existing.process_steps) {
                const stepsParsed = existing.process_steps.map((ps: any) => ({
                    id: Math.random().toString(36).substr(2, 9),
                    title: ps.title ?? "",
                    description: ps.description ?? "",
                    content: ps.content ?? "",
                    steps: (ps.steps || []).map((ss: any) => ({
                        id: Math.random().toString(36).substr(2, 9),
                        description: ss.description ?? "",
                        attachment_id: ss.attachment_id,
                    }))
                }));
                setProcessSteps(stepsParsed);
            }
        }
    }, [existing, isEditing]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) {
            toast.error("Process Title is required");
            return;
        }

        // Validate steps
        for (let i = 0; i < processSteps.length; i++) {
            if (!processSteps[i].title.trim()) {
                toast.error(`Title is required for Process Step ${i + 1}`);
                return;
            }
            const ss = processSteps[i].steps;
            for (let j = 0; j < ss.length; j++) {
                if (!ss[j].description.trim()) {
                    toast.error(`Description is required for Sub-step ${j + 1} in Step ${i + 1}`);
                    return;
                }
            }
        }

        const buildBlockAttachments = () => {
            return blockAttachmentFiles.map((f) => ({
                attachment_id: f.attachment_id,
                label: f.file_name,
            }));
        };

        const buildProcessSteps = () => {
            return processSteps.map((ps) => ({
                title: ps.title,
                description: ps.description,
                content: ps.content,
                steps: ps.steps.map((ss, idx) => ({
                    description: ss.description,
                    attachment_id: ss.attachment_id || "", 
                    order: idx + 1
                }))
            }));
        };

        const payload = {
            title: title.trim(),
            description: description.trim() || null,
            process_blocks: blockTitle.trim() ? [
                {
                    title: blockTitle.trim(),
                    description: blockDesc.trim() || null,
                    content: blockContent || null,
                    attachments: buildBlockAttachments()
                }
            ] : [],
            process_steps: buildProcessSteps()
        };

        try {
            if (isEditing && editId) {
                await updateProcess({ id: editId, data: payload }).unwrap();
                toast.success("Petroleum Process updated successfully!");
            } else {
                await createProcess(payload).unwrap();
                toast.success("Petroleum Process created successfully!");
            }
            router.push("/admin/sectors/petroleum/processes");
        } catch {
            toast.error(isEditing ? "Failed to update process" : "Failed to create process");
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

    const handleAddProcessStep = () => {
        setProcessSteps([...processSteps, {
            id: Math.random().toString(36).substr(2, 9),
            title: "",
            description: "",
            content: "",
            steps: []
        }]);
    };

    const handleRemoveProcessStep = (stepId: string) => {
        setProcessSteps(processSteps.filter(s => s.id !== stepId));
    };

    const updateProcessStep = (stepId: string, field: keyof ProcessStepState, value: any) => {
        setProcessSteps(processSteps.map(s => s.id === stepId ? { ...s, [field]: value } : s));
    };

    const handleAddSubStep = (stepId: string) => {
        setProcessSteps(processSteps.map(s => {
            if (s.id === stepId) {
                return {
                    ...s,
                    steps: [...s.steps, {
                        id: Math.random().toString(36).substr(2, 9),
                        description: "",
                    }]
                };
            }
            return s;
        }));
    };

    const handleRemoveSubStep = (stepId: string, subStepId: string) => {
        setProcessSteps(processSteps.map(s => {
            if (s.id === stepId) {
                return {
                    ...s,
                    steps: s.steps.filter(ss => ss.id !== subStepId)
                };
            }
            return s;
        }));
    };

    const updateSubStep = (stepId: string, subStepId: string, field: keyof SubStepState, value: any) => {
        setProcessSteps(processSteps.map(s => {
            if (s.id === stepId) {
                return {
                    ...s,
                    steps: s.steps.map(ss => ss.id === subStepId ? { ...ss, [field]: value } : ss)
                };
            }
            return s;
        }));
    };

    if (isEditing && isLoadingExisting) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="h-6 w-6 animate-spin text-[#094C81]" />
                <span className="ml-3 text-gray-500">Loading process data...</span>
            </div>
        );
    }

    return (
        <div className="max-w-[1200px] mx-auto py-6 px-4">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon" onClick={() => router.push("/admin/sectors/petroleum/processes")} className="text-gray-400 hover:text-[#094C81]">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold text-[#073954]">
                            {isEditing ? "Edit Petroleum Process" : "Create Petroleum Process"}
                        </h1>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <Button onClick={handleSubmit} disabled={isCreating || isUpdating} className="bg-[#094C81] hover:bg-[#094C81]/90 text-white min-w-[140px]">
                        {(isCreating || isUpdating) ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                        {isEditing ? "Save Changes" : "Create Process"}
                    </Button>
                </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <Tabs defaultValue="general">
                    <TabsList className="mb-6 grid w-full grid-cols-2 lg:w-[400px]">
                        <TabsTrigger value="general">1. General & Block</TabsTrigger>
                        <TabsTrigger value="steps">2. Process Steps</TabsTrigger>
                    </TabsList>

                    <TabsContent value="general" className="space-y-6">
                        <div className="grid gap-6 border border-gray-200 p-6 rounded-lg bg-gray-50">
                            <h2 className="text-lg font-semibold text-[#073954]">Main Process Info</h2>
                            <div className="space-y-2">
                                <Label htmlFor="title">Process Title *</Label>
                                <Input
                                    id="title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="e.g. Licensing Process"
                                    required
                                    className="bg-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="description">Process Description</Label>
                                <Textarea
                                    id="description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Brief overview of this process..."
                                    className="bg-white min-h-[100px]"
                                />
                            </div>
                        </div>

                        <div className="grid gap-6 border border-gray-200 p-6 rounded-lg">
                            <h2 className="text-lg font-semibold text-[#073954]">Content Block (Optional)</h2>
                            <p className="text-sm text-gray-500">Add an informational section to accompany the process.</p>

                            <div className="space-y-2">
                                <Label>Block Title</Label>
                                <Input
                                    value={blockTitle}
                                    onChange={(e) => setBlockTitle(e.target.value)}
                                    placeholder="e.g. Requirements Overview"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Block Description (Short summary)</Label>
                                <Textarea
                                    value={blockDesc}
                                    onChange={(e) => setBlockDesc(e.target.value)}
                                    placeholder="Summary of requirements..."
                                    className="min-h-[80px]"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Rich Content</Label>
                                <ReactQuill theme="snow" value={blockContent} modules={modules} onChange={setBlockContent} className="h-[250px] mb-12" />
                            </div>
                            <div className="pt-4">
                                <FileUploadField
                                    id="block-attachments"
                                    label="Block Attachments (Forms, Docs)"
                                    value={blockAttachmentIds}
                                    onChange={(ids, files) => {
                                        setBlockAttachmentIds(ids);
                                        if (files) setBlockAttachmentFiles(files);
                                    }}
                                    multiple
                                    showPreview
                                />
                            </div>
                        </div>
                    </TabsContent>

                    <TabsContent value="steps" className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-lg font-semibold text-[#073954]">Process Steps</h2>
                                <p className="text-sm text-gray-500">Define the sequential stages of this process.</p>
                            </div>
                            <Button type="button" onClick={handleAddProcessStep} variant="outline" className="text-[#094C81] border-[#094C81]">
                                <Plus className="h-4 w-4 mr-2" />
                                Add Process Step
                            </Button>
                        </div>

                        {processSteps.length === 0 ? (
                            <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
                                <p className="text-gray-500 mb-4">No steps added yet.</p>
                                <Button type="button" onClick={handleAddProcessStep} className="bg-[#094C81] text-white">
                                    Create First Step
                                </Button>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {processSteps.map((step, index) => (
                                    <div key={step.id} className="border border-blue-100 bg-blue-50/30 rounded-xl p-6 relative">
                                        <button
                                            type="button"
                                            onClick={() => handleRemoveProcessStep(step.id)}
                                            className="absolute top-4 right-4 text-red-500 hover:bg-red-50 p-2 rounded-full"
                                            title="Remove Step"
                                        >
                                            <Trash2 className="h-5 w-5" />
                                        </button>
                                        
                                        <h3 className="text-lg font-medium text-blue-900 mb-4">Step {index + 1}</h3>
                                        
                                        <div className="grid gap-4 mb-6">
                                            <div className="space-y-2">
                                                <Label>Step Title *</Label>
                                                <Input
                                                    value={step.title}
                                                    onChange={(e) => updateProcessStep(step.id, "title", e.target.value)}
                                                    placeholder="e.g. Initial Submission"
                                                    className="bg-white"
                                                    required
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Step Description</Label>
                                                <Textarea
                                                    value={step.description}
                                                    onChange={(e) => updateProcessStep(step.id, "description", e.target.value)}
                                                    placeholder="Brief text about this step..."
                                                    className="bg-white min-h-[60px]"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label>Expanded Content (Optional)</Label>
                                                <ReactQuill 
                                                    theme="snow" 
                                                    value={step.content} 
                                                    modules={{ toolbar: [ ['bold', 'italic', 'underline'], [{'list': 'ordered'}, {'list': 'bullet'}], ['link'] ] }} 
                                                    onChange={(val) => updateProcessStep(step.id, "content", val)} 
                                                    className="bg-white min-h-[150px] mb-2" 
                                                />
                                            </div>
                                        </div>

                                        {/* Sub-steps */}
                                        <div className="pt-4 border-t border-blue-100">
                                            <div className="flex items-center justify-between mb-4">
                                                <Label className="text-blue-900 font-semibold cursor-pointer">Detailed Sub-Actions (Requirements/Documents)</Label>
                                                <Button type="button" size="sm" onClick={() => handleAddSubStep(step.id)} variant="ghost" className="text-[#094C81] bg-white hover:bg-blue-100 font-medium">
                                                    <Plus className="h-4 w-4 mr-1" /> Add Action
                                                </Button>
                                            </div>

                                            <div className="space-y-3">
                                                {step.steps.map((subStep, subIndex) => (
                                                    <div key={subStep.id} className="flex gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                                                        <div className="text-gray-400 font-medium pt-2">{subIndex + 1}.</div>
                                                        <div className="flex-1 space-y-4">
                                                            <div className="space-y-2">
                                                                <Label>Action Description *</Label>
                                                                <Input 
                                                                    value={subStep.description}
                                                                    onChange={(e) => updateSubStep(step.id, subStep.id, "description", e.target.value)}
                                                                    placeholder="e.g. Provide a copy of business license"
                                                                    required
                                                                />
                                                            </div>
                                                            <div className="pt-2">
                                                                <FileUploadField
                                                                    id={`substep-att-${subStep.id}`}
                                                                    label="Attach specific document (Optional)"
                                                                    value={subStep.attachment_id ? [subStep.attachment_id] : []}
                                                                    multiple={false}
                                                                    showPreview={true}
                                                                    onChange={(ids, files) => {
                                                                        const attId = ids.length > 0 ? ids[0] : "";
                                                                        const attFile = files && files.length > 0 ? files[0] : undefined;
                                                                        // Update state with ID
                                                                        setProcessSteps(processSteps.map(s => {
                                                                            if (s.id === step.id) {
                                                                                return {
                                                                                    ...s,
                                                                                    steps: s.steps.map(ss => ss.id === subStep.id ? { ...ss, attachment_id: attId, attachment_file: attFile } : ss)
                                                                                };
                                                                            }
                                                                            return s;
                                                                        }));
                                                                    }}
                                                                />
                                                            </div>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveSubStep(step.id, subStep.id)}
                                                            className="text-red-400 hover:text-red-600 p-2"
                                                        >
                                                            <X className="h-5 w-5" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
