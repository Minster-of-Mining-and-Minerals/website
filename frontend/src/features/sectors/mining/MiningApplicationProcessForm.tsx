"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, Save, Trash2, Plus, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import {
    useGetMiningApplicationProcessByIdQuery,
    useCreateMiningApplicationProcessMutation,
    useUpdateMiningApplicationProcessMutation,
} from "@/redux/api/miningApplicationProcessApi";
import { useUploadAttachmentsMutation } from "@/redux/api/attachementApi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LucideIconPicker } from "@/components/common/LucideIconPicker";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function MiningApplicationProcessForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const editId = searchParams.get("id") || undefined;
    const isEditing = Boolean(editId);

    const { data: existing, isLoading: isLoadingExisting } = useGetMiningApplicationProcessByIdQuery(editId!, {
        skip: !editId,
    });
    const [createProcess, { isLoading: isCreating }] = useCreateMiningApplicationProcessMutation();
    const [updateProcess, { isLoading: isUpdating }] = useUpdateMiningApplicationProcessMutation();
    const [uploadAttachments, { isLoading: isUploading }] = useUploadAttachmentsMutation();

    type ApplicationTypeState = {
        id: string;
        title: string;
        icon: string;
        action_label: string;
        action_url: string;
        color: string;
        requirements: { id: string; text: string }[];
        steps: { id: string; text: string }[];
    };

    type AttachmentState = {
        id: string;
        attachment_id: string;
        overlay_text: string;
        overlay_icon: string;
        file_name: string;
    };

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [objectives, setObjectives] = useState<{ id: string; text: string }[]>([]);
    const [applicationTypes, setApplicationTypes] = useState<ApplicationTypeState[]>([]);
    const [attachments, setAttachments] = useState<AttachmentState[]>([]);
    const [publish, setPublish] = useState(false);

    useEffect(() => {
        if (existing && isEditing) {
            setTitle(existing.title || "");
            setDescription(existing.description || "");
            setPublish(existing.publish || false);

            if (existing.objectives) {
                setObjectives(existing.objectives.map((o: string) => ({
                    id: Math.random().toString(36).substr(2, 9),
                    text: o
                })));
            }

            if (existing.application_types) {
                const types = existing.application_types.map((t: any) => ({
                    id: Math.random().toString(36).substr(2, 9),
                    title: t.title || "",
                    icon: t.icon || "",
                    action_label: t.action_label || "",
                    action_url: t.action_url || "",
                    color: t.color || "",
                    requirements: (t.requirements || []).map((r: string) => ({ id: Math.random().toString(36).substr(2, 9), text: r })),
                    steps: (t.steps || []).map((s: string) => ({ id: Math.random().toString(36).substr(2, 9), text: s })),
                }));
                setApplicationTypes(types);
            }

            if (existing.attachments) {
                const atts = existing.attachments.map((a: any) => ({
                    id: Math.random().toString(36).substr(2, 9),
                    attachment_id: a.attachment_id,
                    overlay_text: a.overlay_text || "",
                    overlay_icon: a.overlay_icon || "",
                    file_name: a.attachment?.file_name || "Attached File",
                }));
                setAttachments(atts);
            }
        }
    }, [existing, isEditing]);

    const addObjective = () => {
        setObjectives([...objectives, { id: Math.random().toString(36).substr(2, 9), text: "" }]);
    };

    const updateObjective = (id: string, text: string) => {
        setObjectives(objectives.map(o => o.id === id ? { ...o, text } : o));
    };

    const removeObjective = (id: string) => {
        setObjectives(objectives.filter(o => o.id !== id));
    };

    const handleAddType = () => {
        setApplicationTypes([...applicationTypes, {
            id: Math.random().toString(36).substr(2, 9),
            title: "",
            icon: "file-text", // Default value
            action_label: "",
            action_url: "",
            color: "",
            requirements: [],
            steps: [],
        }]);
    };

    const updateType = (id: string, field: keyof ApplicationTypeState, value: any) => {
        setApplicationTypes(applicationTypes.map(t => t.id === id ? { ...t, [field]: value } : t));
    };

    const removeType = (id: string) => {
        setApplicationTypes(applicationTypes.filter(t => t.id !== id));
    };

    const addTypeRequirement = (typeId: string) => {
        setApplicationTypes(applicationTypes.map(t => {
            if (t.id === typeId) {
                return { ...t, requirements: [...t.requirements, { id: Math.random().toString(36).substr(2, 9), text: "" }] };
            }
            return t;
        }));
    };

    const updateTypeRequirement = (typeId: string, reqId: string, text: string) => {
        setApplicationTypes(applicationTypes.map(t => {
            if (t.id === typeId) {
                return { ...t, requirements: t.requirements.map(r => r.id === reqId ? { ...r, text } : r) };
            }
            return t;
        }));
    };

    const removeTypeRequirement = (typeId: string, reqId: string) => {
        setApplicationTypes(applicationTypes.map(t => {
            if (t.id === typeId) {
                return { ...t, requirements: t.requirements.filter(r => r.id !== reqId) };
            }
            return t;
        }));
    };

    const addTypeStep = (typeId: string) => {
        setApplicationTypes(applicationTypes.map(t => {
            if (t.id === typeId) {
                return { ...t, steps: [...t.steps, { id: Math.random().toString(36).substr(2, 9), text: "" }] };
            }
            return t;
        }));
    };

    const updateTypeStep = (typeId: string, stepId: string, text: string) => {
        setApplicationTypes(applicationTypes.map(t => {
            if (t.id === typeId) {
                return { ...t, steps: t.steps.map(s => s.id === stepId ? { ...s, text } : s) };
            }
            return t;
        }));
    };

    const removeTypeStep = (typeId: string, stepId: string) => {
        setApplicationTypes(applicationTypes.map(t => {
            if (t.id === typeId) {
                return { ...t, steps: t.steps.filter(s => s.id !== stepId) };
            }
            return t;
        }));
    };


    /* Attachment Helpers */
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        try {
            const result = await uploadAttachments({ files: Array.from(files) }).unwrap();
            if (result.attachments && result.attachments.length > 0) {
                const newAtts = result.attachments.map(att => ({
                    id: Math.random().toString(36).substr(2, 9),
                    attachment_id: att.attachment_id,
                    overlay_text: "",
                    overlay_icon: "image",
                    file_name: att.file_name,
                }));
                setAttachments([...attachments, ...newAtts]);
                toast.success(`Uploaded ${newAtts.length} file(s)`);
            }
        } catch (error) {
            toast.error("Failed to upload files");
        }
        e.target.value = '';
    };

    const updateAttachmentField = (id: string, field: "overlay_text" | "overlay_icon", value: string) => {
        setAttachments(attachments.map(a => a.id === id ? { ...a, [field]: value } : a));
    };

    const removeAttachment = (id: string) => {
        setAttachments(attachments.filter(a => a.id !== id));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!title.trim()) {
            toast.error("Process title is required");
            return;
        }

        const payload = {
            title: title.trim(),
            description: description.trim(),
            publish,
            objectives: objectives.map(o => o.text).filter(t => t.trim() !== ""),
            application_types: applicationTypes.map(t => ({
                title: t.title.trim(),
                icon: t.icon.trim() || undefined,
                action_label: t.action_label.trim(),
                action_url: t.action_url.trim(),
                color: t.color.trim() || undefined,
                requirements: t.requirements.map(r => r.text).filter(tx => tx.trim() !== ""),
                steps: t.steps.map(s => s.text).filter(tx => tx.trim() !== ""),
            })),
            attachments: attachments.map(a => ({
                attachment_id: a.attachment_id,
                overlay_text: a.overlay_text.trim(),
                overlay_icon: a.overlay_icon.trim(),
            }))
        };

        try {
            if (isEditing && editId) {
                await updateProcess({ id: editId, data: payload }).unwrap();
                toast.success("Mining Application Process updated successfully!");
            } else {
                await createProcess(payload).unwrap();
                toast.success("Mining Application Process created successfully!");
            }
            router.push("/admin/sectors/mining/application-processes");
        } catch (err: any) {
            toast.error(err?.data?.message || (isEditing ? "Failed to update process" : "Failed to create process"));
        }
    };

    if (isEditing && isLoadingExisting) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="h-6 w-6 animate-spin text-[#094C81]" />
            </div>
        );
    }

    return (
        <div className="max-w-[1200px] mx-auto py-6 px-4">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                    <Button variant="ghost" size="icon" onClick={() => router.push("/admin/sectors/mining/application-processes")} className="text-gray-400 hover:text-[#094C81]">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold text-[#073954]">
                            {isEditing ? "Edit Application Process" : "Create Application Process"}
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
                <Tabs defaultValue="basic">
                    <TabsList className="mb-6 grid w-full grid-cols-3 lg:w-[600px]">
                        <TabsTrigger value="basic">1. Basic Info</TabsTrigger>
                        <TabsTrigger value="types">2. Application Types</TabsTrigger>
                        <TabsTrigger value="attachments">3. Attachments</TabsTrigger>
                    </TabsList>

                    <TabsContent value="basic" className="space-y-6">
                        <div className="grid gap-6 mb-8 max-w-3xl">
                            <div className="space-y-2">
                                <Label>Title *</Label>
                                <Input
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Process Group Title"
                                    className="bg-white"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Description</Label>
                                <Textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Overview..."
                                    className="bg-white min-h-[100px]"
                                />
                            </div>
                        </div>

                        {/* Objectives List */}
                        <div className="border border-gray-200 rounded-lg p-5 bg-white max-w-3xl">
                            <div className="flex justify-between items-center mb-4">
                                <h4 className="font-medium text-gray-800">Objectives (Bullet Points)</h4>
                                <Button type="button" size="sm" onClick={addObjective} variant="ghost" className="text-blue-600 hover:bg-blue-50">
                                    <Plus className="h-4 w-4 mr-1" /> Add Objective
                                </Button>
                            </div>
                            <ul className="space-y-3">
                                {objectives.map((obj) => (
                                    <li key={obj.id} className="flex items-start gap-3">
                                        <CheckCircle2 className="h-5 w-5 text-blue-500 shrink-0 mt-2" />
                                        <div className="flex-1 flex gap-2">
                                            <Input 
                                                value={obj.text} 
                                                onChange={e => updateObjective(obj.id, e.target.value)} 
                                                placeholder="Enter objective..." 
                                                className="bg-gray-50 border-gray-200" 
                                            />
                                            <Button type="button" size="icon" variant="ghost" onClick={() => removeObjective(obj.id)} className="text-gray-400 hover:text-red-500 shrink-0">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </li>
                                ))}
                                {objectives.length === 0 && <li className="text-center text-gray-400 py-2 text-sm">No objectives added.</li>}
                            </ul>
                        </div>
                    </TabsContent>

                    <TabsContent value="types" className="space-y-6">
                        <div className="flex justify-between items-center bg-gray-50 p-4 border border-gray-200 rounded-lg">
                            <h2 className="text-lg font-semibold text-[#073954]">Application Types</h2>
                            <Button type="button" onClick={handleAddType} variant="outline" className="text-[#094C81] border-[#094C81]">
                                <Plus className="h-4 w-4 mr-2" /> Add Application Type
                            </Button>
                        </div>

                        {applicationTypes.map((appType, index) => (
                            <div key={appType.id} className="border border-[#B1C9E3] bg-blue-50/5 rounded-xl p-6 relative shadow-sm">
                                <button type="button" onClick={() => removeType(appType.id)} className="absolute top-4 right-4 text-red-500 hover:bg-red-50 p-2 rounded-full" title="Remove Application Type">
                                    <Trash2 className="h-5 w-5" />
                                </button>
                                <h3 className="text-lg font-medium text-[#094C81] mb-6 border-b border-blue-100 pb-2">Application Type {index + 1}</h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    <div className="space-y-2">
                                        <Label>Title *</Label>
                                        <Input
                                            value={appType.title}
                                            onChange={(e) => updateType(appType.id, "title", e.target.value)}
                                            placeholder="e.g. Large Scale Mining"
                                            className="bg-white"
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Icon ID (Lucide)</Label>
                                            <LucideIconPicker
                                                value={appType.icon}
                                                onChange={(icon) => updateType(appType.id, "icon", icon)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Color Code</Label>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="color"
                                                    value={appType.color || "#094C81"}
                                                    onChange={(e) => updateType(appType.id, "color", e.target.value)}
                                                    className="h-10 w-12 cursor-pointer rounded-md border p-1 bg-white"
                                                />
                                                <Input
                                                    value={appType.color}
                                                    onChange={(e) => updateType(appType.id, "color", e.target.value)}
                                                    placeholder="e.g. #094C81"
                                                    className="bg-white flex-1"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Action Box Label</Label>
                                        <Input
                                            value={appType.action_label}
                                            onChange={(e) => updateType(appType.id, "action_label", e.target.value)}
                                            placeholder="e.g. Apply Now"
                                            className="bg-white"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Action URL</Label>
                                        <Input
                                            value={appType.action_url}
                                            onChange={(e) => updateType(appType.id, "action_url", e.target.value)}
                                            placeholder="URL for the action"
                                            className="bg-white"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {/* Requirements */}
                                    <div className="border border-gray-200 rounded-lg p-5 bg-white">
                                        <div className="flex justify-between items-center mb-4">
                                            <h4 className="font-medium text-sm text-gray-800">Requirements</h4>
                                            <Button type="button" size="sm" onClick={() => addTypeRequirement(appType.id)} variant="ghost" className="text-green-600 hover:bg-green-50 h-8 text-xs">
                                                <Plus className="h-3 w-3 mr-1" /> Add requirement
                                            </Button>
                                        </div>
                                        <ul className="space-y-3">
                                            {appType.requirements.map((req) => (
                                                <li key={req.id} className="flex items-center gap-2">
                                                    <div className="h-1.5 w-1.5 rounded-full bg-green-500 shrink-0"></div>
                                                    <Input 
                                                        value={req.text} 
                                                        onChange={e => updateTypeRequirement(appType.id, req.id, e.target.value)} 
                                                        placeholder="Add requirement..." 
                                                        className="h-8 text-sm" 
                                                    />
                                                    <Button type="button" size="icon" variant="ghost" onClick={() => removeTypeRequirement(appType.id, req.id)} className="h-8 w-8 text-gray-400 hover:text-red-500 shrink-0">
                                                        <Trash2 className="h-3 w-3" />
                                                    </Button>
                                                </li>
                                            ))}
                                            {appType.requirements.length === 0 && <li className="text-center text-gray-400 py-2 text-xs">No requirements mapped.</li>}
                                        </ul>
                                    </div>

                                    {/* Steps */}
                                    <div className="border border-gray-200 rounded-lg p-5 bg-white">
                                        <div className="flex justify-between items-center mb-4">
                                            <h4 className="font-medium text-sm text-gray-800">Process Steps</h4>
                                            <Button type="button" size="sm" onClick={() => addTypeStep(appType.id)} variant="ghost" className="text-purple-600 hover:bg-purple-50 h-8 text-xs">
                                                <Plus className="h-3 w-3 mr-1" /> Add step
                                            </Button>
                                        </div>
                                        <ul className="space-y-3">
                                            {appType.steps.map((step, sIdx) => (
                                                <li key={step.id} className="flex items-center gap-2">
                                                    <div className="text-xs font-bold text-gray-500 w-5">{sIdx + 1}.</div>
                                                    <Input 
                                                        value={step.text} 
                                                        onChange={e => updateTypeStep(appType.id, step.id, e.target.value)} 
                                                        placeholder="Step description..." 
                                                        className="h-8 text-sm" 
                                                    />
                                                    <Button type="button" size="icon" variant="ghost" onClick={() => removeTypeStep(appType.id, step.id)} className="h-8 w-8 text-gray-400 hover:text-red-500 shrink-0">
                                                        <Trash2 className="h-3 w-3" />
                                                    </Button>
                                                </li>
                                            ))}
                                            {appType.steps.length === 0 && <li className="text-center text-gray-400 py-2 text-xs">No steps mapped.</li>}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {applicationTypes.length === 0 && (
                            <div className="text-center text-gray-400 py-8 text-sm">No Application Types added.</div>
                        )}
                    </TabsContent>

                    <TabsContent value="attachments" className="space-y-6">
                        <div className="flex justify-between items-center bg-gray-50 p-4 border border-gray-200 rounded-lg">
                            <div>
                                <h2 className="text-lg font-semibold text-[#073954]">Reference Documents & Cover Images</h2>
                                <p className="text-sm text-gray-500">Upload background images for blocks or general documents.</p>
                            </div>
                            <div className="relative">
                                <Button type="button" disabled={isUploading} variant="outline" className="text-[#094C81] border-[#094C81] cursor-pointer">
                                    {isUploading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Plus className="h-4 w-4 mr-2" />} 
                                    Upload File(s)
                                </Button>
                                <input 
                                    type="file" 
                                    multiple 
                                    onChange={handleFileChange} 
                                    disabled={isUploading}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {attachments.map((att) => (
                                <div key={att.id} className="border border-gray-200 bg-white rounded-xl p-4 shadow-sm relative group overflow-hidden">
                                     <button 
                                        type="button" 
                                        onClick={() => removeAttachment(att.id)} 
                                        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 bg-white shadow-sm p-1.5 rounded-full z-10"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                    
                                    <div className="mb-4">
                                        <div className="text-xs text-gray-400 truncate mb-2">Original: {att.file_name}</div>
                                    </div>
                                    
                                    <div className="space-y-3">
                                        <div className="space-y-1">
                                            <Label className="text-xs">Overlay Title text</Label>
                                            <Input 
                                                value={att.overlay_text}
                                                onChange={(e) => updateAttachmentField(att.id, "overlay_text", e.target.value)}
                                                className="h-8 text-sm"
                                                placeholder="e.g. Licensing Document"
                                            />
                                        </div>
                                        <div className="space-y-1">
                                            <Label className="text-xs">Overlay Icon (Lucide id)</Label>
                                            <LucideIconPicker
                                                value={att.overlay_icon}
                                                onChange={(icon) => updateAttachmentField(att.id, "overlay_icon", icon)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {attachments.length === 0 && (
                                <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-12 border-2 border-dashed border-gray-200 rounded-lg text-gray-500">
                                    No attachments added yet.
                                </div>
                            )}
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
