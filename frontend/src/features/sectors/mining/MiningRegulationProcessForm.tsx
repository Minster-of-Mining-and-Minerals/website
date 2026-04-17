"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, Save, Trash2, Plus, GripVertical, CheckCircle2, FileText, Info } from "lucide-react";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import {
    useGetMiningRegulationProcessByIdQuery,
    useCreateMiningRegulationProcessMutation,
    useUpdateMiningRegulationProcessMutation,
} from "@/redux/api/miningRegulationProcessApi";
import { useUploadAttachmentsMutation } from "@/redux/api/attachementApi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileUploadField } from "@/components/common/FileUpplaodFiled";
import { LucideIconPicker } from "@/components/common/LucideIconPicker";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function MiningRegulationProcessForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const editId = searchParams.get("id") || undefined;
    const isEditing = Boolean(editId);

    const { data: existing, isLoading: isLoadingExisting } = useGetMiningRegulationProcessByIdQuery(editId!, {
        skip: !editId,
    });
    const [createProcess, { isLoading: isCreating }] = useCreateMiningRegulationProcessMutation();
    const [updateProcess, { isLoading: isUpdating }] = useUpdateMiningRegulationProcessMutation();
    const [uploadAttachments, { isLoading: isUploading }] = useUploadAttachmentsMutation();

    /* ===========================
       STATE DEFINITIONS
    =========================== */

    // Frameworks
    type FrameworkState = {
        id: string; // local id
        title: string;
        description: string;
        objectives: string[];
        attachment_id: string | null;
        attachment_overlay_text: string;
        attachment_overlay_color: string;
        file_name?: string;
    };

    // Guidelines
    type GuidelineContentState = {
        id: string; // local id
        type: "card" | "bullet" | "others";
        bg_color: string | null;
        icon: string | null;
        stamp: string | null;
        title: string;
        description: string | null;
    };

    type GuidelineAttachmentState = {
        id: string; // local id
        attachment_id: string;
        label: string;
        file_name?: string;
    };

    type GuidelineState = {
        id: string; // local id
        icon: string | null;
        title: string;
        description: string | null;
        contents: GuidelineContentState[];
        attachments: GuidelineAttachmentState[];
    };

    // Services
    type ServiceCardState = {
        id: string; // local id
        title: string;
        sub_title: string | null;
        sub_title_color: string;
        icon: string | null;
        description: string;
        requirements: string[];
    };

    type ServiceState = {
        id: string; // local id
        title: string;
        description: string | null;
        service_cards: ServiceCardState[];
    };

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [publish, setPublish] = useState(false);
    const [frameworks, setFrameworks] = useState<FrameworkState[]>([]);
    const [guidelines, setGuidelines] = useState<GuidelineState[]>([]);
    const [services, setServices] = useState<ServiceState[]>([]);

    /* ===========================
       EFFECTS
    =========================== */

    useEffect(() => {
        if (existing && isEditing) {
            setTitle(existing.title || "");
            setDescription(existing.description || "");
            setPublish(Boolean(existing.publish));

            if (existing.frameworks) {
                setFrameworks(existing.frameworks.map(fw => ({
                    id: Math.random().toString(36).substr(2, 9),
                    title: fw.title || "",
                    description: fw.description || "",
                    objectives: fw.objectives || [],
                    attachment_id: fw.attachment_id,
                    attachment_overlay_text: fw.attachment_overlay_text || "",
                    attachment_overlay_color: fw.attachment_overlay_color || "#ffffff",
                    file_name: fw.attachment?.file_name
                })));
            }

            if (existing.guidelines) {
                setGuidelines(existing.guidelines.map(g => ({
                    id: Math.random().toString(36).substr(2, 9),
                    icon: g.icon,
                    title: g.title || "",
                    description: g.description,
                    contents: (g.contents || []).map(c => ({
                        id: Math.random().toString(36).substr(2, 9),
                        type: c.type || "others",
                        bg_color: c.bg_color,
                        icon: c.icon,
                        stamp: c.stamp,
                        title: c.title || "",
                        description: c.description
                    })),
                    attachments: (g.attachments || []).map(a => ({
                        id: Math.random().toString(36).substr(2, 9),
                        attachment_id: a.attachment_id,
                        label: a.label || "",
                        file_name: a.attachment?.file_name
                    }))
                })));
            }

            if (existing.services) {
                setServices(existing.services.map(s => ({
                    id: Math.random().toString(36).substr(2, 9),
                    title: s.title || "",
                    description: s.description,
                    service_cards: (s.service_cards || []).map(c => ({
                        id: Math.random().toString(36).substr(2, 9),
                        title: c.title || "",
                        sub_title: c.sub_title,
                        sub_title_color: c.sub_title_color || "#f8f521ff",
                        icon: c.icon,
                        description: c.description || "",
                        requirements: c.requirements || []
                    }))
                })));
            }
        }
    }, [existing, isEditing]);

    /* ===========================
       FRAMEWORK HELPERS
    =========================== */
    const addFramework = () => {
        setFrameworks([...frameworks, {
            id: Math.random().toString(36).substr(2, 9),
            title: "",
            description: "",
            objectives: [],
            attachment_id: null,
            attachment_overlay_text: "Mining Framework",
            attachment_overlay_color: "#ffffff"
        }]);
    };

    const updateFramework = (id: string, field: keyof FrameworkState, value: any) => {
        setFrameworks(frameworks.map(fw => fw.id === id ? { ...fw, [field]: value } : fw));
    };

    const removeFramework = (id: string) => {
        setFrameworks(frameworks.filter(fw => fw.id !== id));
    };

    const handleFrameworkObjectiveChange = (fwId: string, index: number, value: string) => {
        setFrameworks(frameworks.map(fw => {
            if (fw.id === fwId) {
                const newObjectives = [...(fw.objectives || [])];
                newObjectives[index] = value;
                return { ...fw, objectives: newObjectives };
            }
            return fw;
        }));
    };

    const addFrameworkObjective = (fwId: string) => {
        setFrameworks(frameworks.map(fw => {
            if (fw.id === fwId) {
                return { ...fw, objectives: [...(fw.objectives || []), ""] };
            }
            return fw;
        }));
    };

    const removeFrameworkObjective = (fwId: string, index: number) => {
        setFrameworks(frameworks.map(fw => {
            if (fw.id === fwId) {
                const newObjectives = (fw.objectives || []).filter((_, i) => i !== index);
                return { ...fw, objectives: newObjectives };
            }
            return fw;
        }));
    };

    /* ===========================
       GUIDELINE HELPERS
    =========================== */
    const addGuideline = () => {
        setGuidelines([...guidelines, {
            id: Math.random().toString(36).substr(2, 9),
            icon: null,
            title: "",
            description: null,
            contents: [],
            attachments: []
        }]);
    };

    const updateGuideline = (id: string, field: keyof GuidelineState, value: any) => {
        setGuidelines(guidelines.map(g => g.id === id ? { ...g, [field]: value } : g));
    };

    const removeGuideline = (id: string) => {
        setGuidelines(guidelines.filter(g => g.id !== id));
    };

    const addGuidelineContent = (gId: string) => {
        setGuidelines(guidelines.map(g => g.id === gId ? {
            ...g,
            contents: [...g.contents, {
                id: Math.random().toString(36).substr(2, 9),
                title: "",
                description: null,
                type: "others",
                bg_color: null,
                icon: null,
                stamp: null
            }]
        } : g));
    };

    const updateGuidelineContent = (gId: string, cId: string, field: keyof GuidelineContentState, value: any) => {
        setGuidelines(guidelines.map(g => g.id === gId ? {
            ...g,
            contents: g.contents.map(c => c.id === cId ? { ...c, [field]: value } : c)
        } : g));
    };

    const removeGuidelineContent = (gId: string, cId: string) => {
        setGuidelines(guidelines.map(g => g.id === gId ? {
            ...g,
            contents: g.contents.filter(c => c.id !== cId)
        } : g));
    };

    const updateGuidelineAttachment = (gId: string, attIds: string[]) => {
        setGuidelines(guidelines.map(g => {
            if (g.id === gId) {
                // We need to keep track of existing attachments that are still in attIds
                const existing = g.attachments.filter(a => attIds.includes(a.attachment_id));
                // Add new ones
                const newIds = attIds.filter(id => !g.attachments.some(a => a.attachment_id === id));
                const newAtts = newIds.map(id => ({
                    id: Math.random().toString(36).substr(2, 9),
                    attachment_id: id,
                    label: "Document", // Default label
                }));
                return { ...g, attachments: [...existing, ...newAtts] };
            }
            return g;
        }));
    };

    const removeGuidelineAttachment = (gId: string, aId: string) => {
        setGuidelines(guidelines.map(g => g.id === gId ? {
            ...g,
            attachments: g.attachments.filter(a => a.id !== aId)
        } : g));
    };

    /* ===========================
       SERVICE HELPERS
    =========================== */
    const addService = () => {
        setServices([...services, {
            id: Math.random().toString(36).substr(2, 9),
            title: "",
            description: null,
            service_cards: []
        }]);
    };

    const updateService = (id: string, field: keyof ServiceState, value: any) => {
        setServices(services.map(s => s.id === id ? { ...s, [field]: value } : s));
    };

    const removeService = (id: string) => {
        setServices(services.filter(s => s.id !== id));
    };

    const addServiceCard = (sId: string) => {
        setServices(services.map(s => s.id === sId ? {
            ...s,
            service_cards: [...s.service_cards, {
                id: Math.random().toString(36).substr(2, 9),
                title: "",
                sub_title: null,
                sub_title_color: "#f8f521ff",
                icon: null,
                description: "",
                requirements: []
            }]
        } : s));
    };

    const updateServiceCard = (sId: string, cId: string, field: keyof ServiceCardState, value: any) => {
        setServices(services.map(s => s.id === sId ? {
            ...s,
            service_cards: s.service_cards.map(c => c.id === cId ? { ...c, [field]: value } : c)
        } : s));
    };

    const removeServiceCard = (sId: string, cId: string) => {
        setServices(services.map(s => s.id === sId ? {
            ...s,
            service_cards: s.service_cards.filter(c => c.id !== cId)
        } : s));
    };

    const handleServiceCardRequirementChange = (sId: string, cId: string, index: number, value: string) => {
        setServices(services.map(s => {
            if (s.id === sId) {
                return {
                    ...s,
                    service_cards: s.service_cards.map(c => {
                        if (c.id === cId) {
                            const newRequirements = [...(c.requirements || [])];
                            newRequirements[index] = value;
                            return { ...c, requirements: newRequirements };
                        }
                        return c;
                    })
                };
            }
            return s;
        }));
    };

    const addServiceCardRequirement = (sId: string, cId: string) => {
        setServices(services.map(s => {
            if (s.id === sId) {
                return {
                    ...s,
                    service_cards: s.service_cards.map(c => {
                        if (c.id === cId) {
                            return { ...c, requirements: [...(c.requirements || []), ""] };
                        }
                        return c;
                    })
                };
            }
            return s;
        }));
    };

    const removeServiceCardRequirement = (sId: string, cId: string, index: number) => {
        setServices(services.map(s => {
            if (s.id === sId) {
                return {
                    ...s,
                    service_cards: s.service_cards.map(c => {
                        if (c.id === cId) {
                            const newRequirements = (c.requirements || []).filter((_, i) => i !== index);
                            return { ...c, requirements: newRequirements };
                        }
                        return c;
                    })
                };
            }
            return s;
        }));
    };

    /* ===========================
       SUBMIT
    =========================== */
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim()) {
            toast.error("Title is required");
            return;
        }

        const payload = {
            title: title.trim(),
            description: description.trim(),
            publish,
            frameworks: frameworks.map(fw => ({
                title: fw.title.trim(),
                description: fw.description.trim(),
                objectives: fw.objectives,
                attachment_id: fw.attachment_id,
                attachment_overlay_text: fw.attachment_overlay_text,
                attachment_overlay_color: fw.attachment_overlay_color
            })),
            guidelines: guidelines.map(g => ({
                icon: g.icon,
                title: g.title.trim(),
                description: g.description,
                contents: g.contents.map(c => ({
                    type: c.type,
                    bg_color: c.bg_color,
                    icon: c.icon,
                    stamp: c.stamp,
                    title: c.title.trim(),
                    description: c.description
                })),
                attachments: g.attachments.map(a => ({
                    attachment_id: a.attachment_id,
                    label: a.label.trim() || a.file_name || ""
                }))
            })),
            services: services.map(s => ({
                title: s.title.trim(),
                description: s.description,
                service_cards: s.service_cards.map(sc => ({
                    title: sc.title.trim(),
                    sub_title: sc.sub_title,
                    sub_title_color: sc.sub_title_color,
                    icon: sc.icon,
                    description: sc.description,
                    requirements: sc.requirements
                }))
            }))
        };

        try {
            if (isEditing && editId) {
                await updateProcess({ id: editId, data: payload }).unwrap();
                toast.success("Regulation Process updated successfully!");
            } else {
                await createProcess(payload).unwrap();
                toast.success("Regulation Process created successfully!");
            }
            router.push("/admin/sectors/mining/regulation-processes");
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
                    <Button variant="ghost" size="icon" onClick={() => router.push("/admin/sectors/mining/regulation-processes")} className="text-gray-400 hover:text-[#094C81]">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold text-[#073954]">
                            {isEditing ? "Edit Mining Regulation Process" : "Create Mining Regulation Process"}
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

            <div className="space-y-6">
                {/* BASIC INFO */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 space-y-4">
                    <h2 className="text-lg font-semibold text-[#073954]">Basic Information</h2>
                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <Label>Title *</Label>
                            <Input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g. Mining Regulation Process 2024"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Description</Label>
                            <Textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Provide a general description..."
                                className="min-h-[100px]"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="publish"
                                checked={publish}
                                onChange={(e) => setPublish(e.target.checked)}
                                className="h-4 w-4 rounded border-gray-300 text-[#094C81] focus:ring-[#094C81]"
                            />
                            <Label htmlFor="publish" className="cursor-pointer">Publish this process (Note: only one process can be published at a time)</Label>
                        </div>
                    </div>
                </div>

                {/* TABS FOR SECTIONS */}
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <Tabs defaultValue="frameworks">
                        <TabsList className="mb-6 grid w-full grid-cols-3 lg:w-[600px]">
                            <TabsTrigger value="frameworks">Frameworks</TabsTrigger>
                            <TabsTrigger value="guidelines">Guidelines</TabsTrigger>
                            <TabsTrigger value="services">Services</TabsTrigger>
                        </TabsList>

                        {/* FRAMEWORKS TAB */}
                        <TabsContent value="frameworks" className="space-y-6">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-[#073954]">Mining Frameworks</h3>
                                <Button type="button" onClick={addFramework} variant="outline" className="text-[#094C81] border-[#094C81]">
                                    <Plus className="h-4 w-4 mr-2" /> Add Framework
                                </Button>
                            </div>
                            {frameworks.map((fw, index) => (
                                <div key={fw.id} className="border border-gray-200 rounded-lg p-6 relative bg-gray-50/30">
                                    <button type="button" onClick={() => removeFramework(fw.id)} className="absolute top-4 right-4 text-red-500 hover:bg-red-50 p-2 rounded-full">
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                    <h4 className="font-medium text-[#094C81] mb-4 text-base">Framework {index + 1}</h4>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label>Title *</Label>
                                            <Input value={fw.title} onChange={e => updateFramework(fw.id, "title", e.target.value)} placeholder="Framework Title" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Overlay Text</Label>
                                            <Input value={fw.attachment_overlay_text} onChange={e => updateFramework(fw.id, "attachment_overlay_text", e.target.value)} placeholder="e.g. View PDF" />
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <Label>Description</Label>
                                            <Textarea value={fw.description} onChange={e => updateFramework(fw.id, "description", e.target.value)} placeholder="Framework Description" />
                                        </div>
                                        <div className="space-y-3 md:col-span-2">
                                            <div className="flex items-center justify-between">
                                                <Label>Objectives</Label>
                                                <Button type="button" size="sm" onClick={() => addFrameworkObjective(fw.id)} variant="ghost" className="text-[#094C81] hover:bg-white border border-[#094C81]/20 h-7 text-xs">
                                                    <Plus className="h-3 w-3 mr-1" /> Add Objective
                                                </Button>
                                            </div>
                                            <div className="grid gap-2">
                                                {(fw.objectives || []).map((obj, objIdx) => (
                                                    <div key={objIdx} className="flex gap-2">
                                                        <Input 
                                                            value={obj} 
                                                            onChange={e => handleFrameworkObjectiveChange(fw.id, objIdx, e.target.value)} 
                                                            placeholder={`Objective ${objIdx + 1}`} 
                                                            className="flex-1"
                                                        />
                                                        <Button type="button" variant="ghost" size="icon" onClick={() => removeFrameworkObjective(fw.id, objIdx)} className="text-red-400 hover:text-red-500 hover:bg-red-50 h-10 w-10">
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                ))}
                                                {(fw.objectives || []).length === 0 && (
                                                    <p className="text-xs text-gray-400 italic">No objectives added yet.</p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Overlay Color</Label>
                                            <div className="flex gap-2 items-center bg-white p-2 rounded-md border border-input">
                                                <div 
                                                    className="w-8 h-8 rounded border border-gray-200 shrink-0" 
                                                    style={{ backgroundColor: fw.attachment_overlay_color || "#ffffff" }}
                                                />
                                                <Input 
                                                    type="color" 
                                                    value={fw.attachment_overlay_color || "#ffffff"} 
                                                    onChange={e => updateFramework(fw.id, "attachment_overlay_color", e.target.value)} 
                                                    className="w-10 h-8 p-0 border-none bg-transparent cursor-pointer" 
                                                />
                                                <Input 
                                                    value={fw.attachment_overlay_color || "#ffffff"} 
                                                    onChange={e => updateFramework(fw.id, "attachment_overlay_color", e.target.value)} 
                                                    placeholder="#ffffff" 
                                                    className="h-8 text-xs font-mono border-none focus-visible:ring-0"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <FileUploadField
                                                id={`fw-att-${fw.id}`}
                                                label="Framework Attachment (Image)"
                                                value={fw.attachment_id ? [fw.attachment_id] : []}
                                                onChange={(ids) => {
                                                    updateFramework(fw.id, "attachment_id", ids.length > 0 ? ids[0] : null);
                                                }}
                                                multiple={false}
                                                accept="image/*"
                                                showPreview={true}
                                                fieldClass="bg-white"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </TabsContent>

                        {/* GUIDELINES TAB */}
                        <TabsContent value="guidelines" className="space-y-8">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-[#073954]">Mining Guidelines</h3>
                                <Button type="button" onClick={addGuideline} variant="outline" className="text-[#094C81] border-[#094C81]">
                                    <Plus className="h-4 w-4 mr-2" /> Add Guideline
                                </Button>
                            </div>
                            {guidelines.map((g, index) => (
                                <div key={g.id} className="border border-blue-100 bg-blue-50/10 rounded-xl p-6 relative">
                                    <button type="button" onClick={() => removeGuideline(g.id)} className="absolute top-4 right-4 text-red-500 hover:bg-red-50 p-2 rounded-full">
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                    <div className="grid gap-4 mb-6 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label>Guideline Title *</Label>
                                            <Input value={g.title} onChange={e => updateGuideline(g.id, "title", e.target.value)} placeholder="e.g. Operational Guidelines" className="bg-white font-semibold" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Guideline Icon</Label>
                                            <LucideIconPicker value={g.icon || ""} onChange={icon => updateGuideline(g.id, "icon", icon)} />
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <Label>Description</Label>
                                            <Textarea value={g.description || ""} onChange={e => updateGuideline(g.id, "description", e.target.value)} placeholder="Brief description..." className="bg-white" />
                                        </div>
                                    </div>

                                    {/* Guideline Contents */}
                                    <div className="mb-6 space-y-4">
                                        <div className="flex justify-between items-center">
                                            <h5 className="text-sm font-semibold text-gray-700">Content Blocks</h5>
                                            <Button type="button" size="sm" onClick={() => addGuidelineContent(g.id)} variant="ghost" className="text-[#094C81] hover:bg-white border border-[#094C81]/20">
                                                <Plus className="h-3 w-3 mr-1" /> Add Content Block
                                            </Button>
                                        </div>
                                        <div className="grid gap-4 md:grid-cols-2">
                                            {g.contents.map((c) => (
                                                <div key={c.id} className="bg-white border border-gray-200 rounded-lg p-4 relative shadow-sm">
                                                    <button type="button" onClick={() => removeGuidelineContent(g.id, c.id)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500">
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                    <div className="space-y-3">
                                                        <div className="grid grid-cols-2 gap-2">
                                                            <div className="space-y-1">
                                                                <Label className="text-xs">Type</Label>
                                                                <select value={c.type} onChange={e => updateGuidelineContent(g.id, c.id, "type", e.target.value)} className="w-full text-xs h-8 rounded-md border border-input bg-background px-2">
                                                                    <option value="others">Default</option>
                                                                    <option value="card">Card Style</option>
                                                                    <option value="bullet">Bullet style</option>
                                                                </select>
                                                            </div>
                                                            <div className="space-y-1">
                                                                <Label className="text-xs">Icon</Label>
                                                                <LucideIconPicker value={c.icon || ""} onChange={icon => updateGuidelineContent(g.id, c.id, "icon", icon)} />
                                                            </div>
                                                        </div>
                                                        <div className="space-y-1">
                                                            <Label className="text-xs">Title *</Label>
                                                            <Input value={c.title} onChange={e => updateGuidelineContent(g.id, c.id, "title", e.target.value)} className="h-8 text-xs font-medium" />
                                                        </div>
                                                        <div className="space-y-1">
                                                            <Label className="text-xs">Description</Label>
                                                            <Textarea value={c.description || ""} onChange={e => updateGuidelineContent(g.id, c.id, "description", e.target.value)} className="min-h-[50px] text-xs" />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Guideline Attachments */}
                                    <div className="space-y-4">
                                        <div className="border-t border-blue-100 pt-4">
                                            <FileUploadField
                                                id={`g-att-${g.id}`}
                                                label="Reference Attachments"
                                                value={g.attachments.map(a => a.attachment_id)}
                                                onChange={(ids) => updateGuidelineAttachment(g.id, ids)}
                                                multiple={true}
                                                accept="*/*"
                                                showPreview={true}
                                                fieldClass="bg-white"
                                            />
                                        </div>
                                        {g.attachments.length > 0 && (
                                            <div className="grid gap-2 grid-cols-1 md:grid-cols-2">
                                                {g.attachments.map((a) => (
                                                    <div key={a.id} className="flex items-center gap-2 bg-white border border-gray-100 p-2 rounded-md shadow-sm">
                                                        <FileText className="h-4 w-4 text-blue-500 shrink-0" />
                                                        <Input 
                                                            value={a.label} 
                                                            onChange={e => {
                                                                setGuidelines(guidelines.map(gitem => gitem.id === g.id ? {
                                                                    ...gitem,
                                                                    attachments: gitem.attachments.map(aitem => aitem.id === a.id ? { ...aitem, label: e.target.value } : aitem)
                                                                } : gitem));
                                                            }} 
                                                            className="h-7 text-xs border-none focus-visible:ring-0 px-1 font-medium" 
                                                            placeholder="Label (e.g. Application Form)"
                                                        />
                                                        <button type="button" onClick={() => removeGuidelineAttachment(g.id, a.id)} className="text-gray-300 hover:text-red-500 shrink-0">
                                                            <Trash2 className="h-3 w-3" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </TabsContent>

                        {/* SERVICES TAB */}
                        <TabsContent value="services" className="space-y-8">
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-[#073954]">Mining Services</h3>
                                <Button type="button" onClick={addService} variant="outline" className="text-[#094C81] border-[#094C81]">
                                    <Plus className="h-4 w-4 mr-2" /> Add Service Area
                                </Button>
                            </div>
                            {services.map((s, index) => (
                                <div key={s.id} className="border border-green-100 bg-green-50/10 rounded-xl p-6 relative">
                                    <button type="button" onClick={() => removeService(s.id)} className="absolute top-4 right-4 text-red-500 hover:bg-red-50 p-2 rounded-full">
                                        <Trash2 className="h-5 w-5" />
                                    </button>
                                    <div className="grid gap-4 mb-6">
                                        <div className="space-y-2">
                                            <Label>Service Group Title *</Label>
                                            <Input value={s.title} onChange={e => updateService(s.id, "title", e.target.value)} placeholder="e.g. Licensing Services" className="bg-white font-semibold" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Description</Label>
                                            <Textarea value={s.description || ""} onChange={e => updateService(s.id, "description", e.target.value)} placeholder="Service area description..." className="bg-white h-20" />
                                        </div>
                                    </div>

                                    {/* Service Cards */}
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center border-b border-green-100 pb-2">
                                            <h5 className="text-sm font-semibold text-gray-700">Specific Service Cards</h5>
                                            <Button type="button" size="sm" onClick={() => addServiceCard(s.id)} variant="ghost" className="text-green-700 hover:bg-green-50">
                                                <Plus className="h-3 w-3 mr-1" /> Add Card
                                            </Button>
                                        </div>
                                        <div className="grid gap-4">
                                            {s.service_cards.map((c) => (
                                                <div key={c.id} className="bg-white border border-gray-200 rounded-lg p-5 relative shadow-sm">
                                                    <button type="button" onClick={() => removeServiceCard(s.id, c.id)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500">
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                    <div className="grid md:grid-cols-2 gap-4">
                                                        <div className="space-y-2">
                                                            <Label>Card Title *</Label>
                                                            <Input value={c.title} onChange={e => updateServiceCard(s.id, c.id, "title", e.target.value)} placeholder="e.g. Exploration License" />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label>Sub-title</Label>
                                                            <Input value={c.sub_title || ""} onChange={e => updateServiceCard(s.id, c.id, "sub_title", e.target.value)} placeholder="e.g. Duration: 3 Years" />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label>Sub-title Color</Label>
                                                            <div className="flex gap-2 items-center bg-white p-2 rounded-md border border-input">
                                                                <div 
                                                                    className="w-8 h-8 rounded border border-gray-200 shrink-0" 
                                                                    style={{ backgroundColor: c.sub_title_color || "#f8f521ff" }}
                                                                />
                                                                <Input 
                                                                    type="color" 
                                                                    value={c.sub_title_color || "#f8f521ff"} 
                                                                    onChange={e => updateServiceCard(s.id, c.id, "sub_title_color", e.target.value)} 
                                                                    className="w-10 h-8 p-0 border-none bg-transparent cursor-pointer" 
                                                                />
                                                                <Input 
                                                                    value={c.sub_title_color || "#f8f521ff"} 
                                                                    onChange={e => updateServiceCard(s.id, c.id, "sub_title_color", e.target.value)} 
                                                                    placeholder="#f8f521" 
                                                                    className="h-8 text-xs font-mono border-none focus-visible:ring-0"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <Label>Icon</Label>
                                                            <LucideIconPicker value={c.icon || ""} onChange={icon => updateServiceCard(s.id, c.id, "icon", icon)} />
                                                        </div>
                                                        <div className="space-y-2 md:col-span-2">
                                                            <Label>Card Description</Label>
                                                            <Textarea value={c.description} onChange={e => updateServiceCard(s.id, c.id, "description", e.target.value)} placeholder="Main text on the card..." className="h-20" />
                                                        </div>
                                                        <div className="space-y-2 md:col-span-2">
                                                            <div className="flex items-center justify-between">
                                                                <Label>Requirements</Label>
                                                                <Button type="button" size="sm" onClick={() => addServiceCardRequirement(s.id, c.id)} variant="ghost" className="text-green-700 hover:bg-green-50 h-7 text-xs border border-green-100">
                                                                    <Plus className="h-3 w-3 mr-1" /> Add Requirement
                                                                </Button>
                                                            </div>
                                                            <div className="grid gap-2">
                                                                {(c.requirements || []).map((req, reqIdx) => (
                                                                    <div key={reqIdx} className="flex gap-2">
                                                                        <Input 
                                                                            value={req} 
                                                                            onChange={e => handleServiceCardRequirementChange(s.id, c.id, reqIdx, e.target.value)} 
                                                                            placeholder={`Requirement ${reqIdx + 1}`} 
                                                                            className="flex-1"
                                                                        />
                                                                        <Button type="button" variant="ghost" size="icon" onClick={() => removeServiceCardRequirement(s.id, c.id, reqIdx)} className="text-red-400 hover:text-red-500 hover:bg-red-50 h-10 w-10">
                                                                            <Trash2 className="h-4 w-4" />
                                                                        </Button>
                                                                    </div>
                                                                ))}
                                                                {(c.requirements || []).length === 0 && (
                                                                    <p className="text-xs text-gray-400 italic">No requirements added yet.</p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            {s.service_cards.length === 0 && <div className="text-center py-6 text-gray-400 border border-dashed rounded-lg">No service cards added.</div>}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {services.length === 0 && <div className="text-center py-20 border-2 border-dashed rounded-xl text-gray-400">Add service areas to categorize services.</div>}
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}
