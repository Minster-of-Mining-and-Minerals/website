"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, Save, Trash2, Plus, GripVertical, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import {
    useGetPetroleumRegulationProcessByIdQuery,
    useCreatePetroleumRegulationProcessMutation,
    useUpdatePetroleumRegulationProcessMutation,
} from "@/redux/api/petroleumRegulationProcessApi";
import { useUploadAttachmentsMutation } from "@/redux/api/attachementApi";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function PetroleumRegulationProcessForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const editId = searchParams.get("id") || undefined;
    const isEditing = Boolean(editId);

    const { data: existing, isLoading: isLoadingExisting } = useGetPetroleumRegulationProcessByIdQuery(editId!, {
        skip: !editId,
    });
    const [createProcess, { isLoading: isCreating }] = useCreatePetroleumRegulationProcessMutation();
    const [updateProcess, { isLoading: isUpdating }] = useUpdatePetroleumRegulationProcessMutation();
    const [uploadAttachments, { isLoading: isUploading }] = useUploadAttachmentsMutation();

    type ObjectiveState = { id: string; title: string; description: string };
    type BulletPointState = { id: string; text: string };
    type StepState = { id: string; title: string; description: string };

    type RegulationState = {
        id: string;
        title: string;
        description: string;
        objectives: ObjectiveState[];
        bullet_points: BulletPointState[];
        steps: StepState[];
    };

    type DirectiveState = {
        id: string;
        title: string;
        description: string;
        type: "main" | "sub";
        action_label: string;
        action: string;
    };

    type AttachmentState = {
        id: string; // local id
        attachment_id: string;
        label: string;
        file_name: string;
    };

    const [regulations, setRegulations] = useState<RegulationState[]>([]);
    const [directives, setDirectives] = useState<DirectiveState[]>([]);
    const [attachments, setAttachments] = useState<AttachmentState[]>([]);

    useEffect(() => {
        if (existing && isEditing) {
            if (existing.regulations) {
                const regs = existing.regulations.map(r => ({
                    id: Math.random().toString(36).substr(2, 9),
                    title: r.title ?? "",
                    description: r.description ?? "",
                    objectives: (r.objectives || []).map((o: any) => ({
                        id: Math.random().toString(36).substr(2, 9),
                        title: o.title || "",
                        description: o.description || "",
                    })),
                    bullet_points: (r.bullet_points || []).map((b: any) => ({
                        id: Math.random().toString(36).substr(2, 9),
                        text: typeof b === "string" ? b : b.text || "",
                    })),
                    steps: (r.steps || []).map((s: any) => ({
                        id: Math.random().toString(36).substr(2, 9),
                        title: s.title || "",
                        description: s.description || "",
                    })),
                }));
                setRegulations(regs);
            }

            if (existing.directives) {
                const dirs = existing.directives.map(d => ({
                    id: Math.random().toString(36).substr(2, 9),
                    title: d.title ?? "",
                    description: d.description ?? "",
                    type: d.type ?? "sub",
                    action_label: d.action_label ?? "",
                    action: d.action ?? "",
                }));
                setDirectives(dirs);
            }

            if (existing.attachments) {
                const atts = existing.attachments.map((a: any) => ({
                    id: Math.random().toString(36).substr(2, 9),
                    attachment_id: a.attachment_id,
                    label: a.label ?? "",
                    file_name: a.attachment?.file_name ?? "Attached File",
                }));
                setAttachments(atts);
            }
        } else if (!isEditing && regulations.length === 0) {
            handleAddRegulation();
        }
    }, [existing, isEditing]);

    const handleAddRegulation = () => {
        setRegulations([...regulations, {
            id: Math.random().toString(36).substr(2, 9),
            title: "",
            description: "",
            objectives: [],
            bullet_points: [],
            steps: [],
        }]);
    };

    const updateRegulation = (id: string, field: keyof RegulationState, value: any) => {
        setRegulations(regulations.map(r => r.id === id ? { ...r, [field]: value } : r));
    };

    const removeRegulation = (id: string) => {
        setRegulations(regulations.filter(r => r.id !== id));
    };

    /* Objective Helpers */
    const addObjective = (regId: string) => {
        setRegulations(regulations.map(r => {
            if (r.id === regId) {
                return {
                    ...r,
                    objectives: [...r.objectives, { id: Math.random().toString(36).substr(2, 9), title: "", description: "" }]
                };
            }
            return r;
        }));
    };
    const updateObjective = (regId: string, objId: string, field: string, value: string) => {
        setRegulations(regulations.map(r => {
            if (r.id === regId) {
                return {
                    ...r,
                    objectives: r.objectives.map(o => o.id === objId ? { ...o, [field]: value } : o)
                };
            }
            return r;
        }));
    };
    const removeObjective = (regId: string, objId: string) => {
        setRegulations(regulations.map(r => {
            if (r.id === regId) {
                return { ...r, objectives: r.objectives.filter(o => o.id !== objId) };
            }
            return r;
        }));
    };

    /* Bullet Point Helpers */
    const addBulletPoint = (regId: string) => {
        setRegulations(regulations.map(r => {
            if (r.id === regId) {
                return {
                    ...r,
                    bullet_points: [...r.bullet_points, { id: Math.random().toString(36).substr(2, 9), text: "" }]
                };
            }
            return r;
        }));
    };
    const updateBulletPoint = (regId: string, bpId: string, text: string) => {
        setRegulations(regulations.map(r => {
            if (r.id === regId) {
                return {
                    ...r,
                    bullet_points: r.bullet_points.map(bp => bp.id === bpId ? { ...bp, text } : bp)
                };
            }
            return r;
        }));
    };
    const removeBulletPoint = (regId: string, bpId: string) => {
        setRegulations(regulations.map(r => {
            if (r.id === regId) {
                return { ...r, bullet_points: r.bullet_points.filter(bp => bp.id !== bpId) };
            }
            return r;
        }));
    };

    /* Step Helpers */
    const addStep = (regId: string) => {
        setRegulations(regulations.map(r => {
            if (r.id === regId) {
                return {
                    ...r,
                    steps: [...r.steps, { id: Math.random().toString(36).substr(2, 9), title: "", description: "" }]
                };
            }
            return r;
        }));
    };
    const updateStep = (regId: string, stepId: string, field: string, value: string) => {
        setRegulations(regulations.map(r => {
            if (r.id === regId) {
                return {
                    ...r,
                    steps: r.steps.map(s => s.id === stepId ? { ...s, [field]: value } : s)
                };
            }
            return r;
        }));
    };
    const removeStep = (regId: string, stepId: string) => {
        setRegulations(regulations.map(r => {
            if (r.id === regId) {
                return { ...r, steps: r.steps.filter(s => s.id !== stepId) };
            }
            return r;
        }));
    };

    /* Directive Helpers */
    const handleAddDirective = () => {
        setDirectives([...directives, {
            id: Math.random().toString(36).substr(2, 9),
            title: "",
            description: "",
            type: "sub",
            action_label: "",
            action: "",
        }]);
    };
    const updateDirective = (id: string, field: keyof DirectiveState, value: any) => {
        setDirectives(directives.map(d => d.id === id ? { ...d, [field]: value } : d));
    };
    const removeDirective = (id: string) => {
        setDirectives(directives.filter(d => d.id !== id));
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
                    label: att.file_name, // default label is file name
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

    const updateAttachmentLabel = (id: string, label: string) => {
        setAttachments(attachments.map(a => a.id === id ? { ...a, label } : a));
    };

    const removeAttachment = (id: string) => {
        setAttachments(attachments.filter(a => a.id !== id));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (regulations.length === 0 && directives.length === 0) {
            toast.error("Please add at least one regulation or directive.");
            return;
        }

        const payload = {
            regulations: regulations.map((r, i) => ({
                title: r.title.trim(),
                description: r.description.trim(),
                order: i + 1,
                objectives: r.objectives.map(o => ({ title: o.title, description: o.description })),
                bullet_points: r.bullet_points.map(bp => ({ text: bp.text })),
                steps: r.steps.map((s, idx) => ({ order: idx + 1, title: s.title, description: s.description })),
                content: [], // Using specific structures instead of raw content
            })),
            directives: directives.map((d, i) => ({
                title: d.title.trim(),
                description: d.description.trim(),
                order: i + 1,
                type: d.type,
                action_label: d.action_label,
                action: d.action,
            })),
            attachments: attachments.map(a => ({
                attachment_id: a.attachment_id,
                label: a.label.trim() || a.file_name,
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
            router.push("/admin/sectors/petroleum/regulation-processes");
        } catch {
            toast.error(isEditing ? "Failed to update process" : "Failed to create process");
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
                    <Button variant="ghost" size="icon" onClick={() => router.push("/admin/sectors/petroleum/regulation-processes")} className="text-gray-400 hover:text-[#094C81]">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold text-[#073954]">
                            {isEditing ? "Edit Regulation Process" : "Create Regulation Process"}
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
                <Tabs defaultValue="regulations">
                    <TabsList className="mb-6 grid w-full grid-cols-3 lg:w-[600px]">
                        <TabsTrigger value="regulations">1. Regulations</TabsTrigger>
                        <TabsTrigger value="directives">2. Directives</TabsTrigger>
                        <TabsTrigger value="attachments">3. Attachments</TabsTrigger>
                    </TabsList>

                    <TabsContent value="regulations" className="space-y-6">
                        <div className="flex justify-between items-center bg-gray-50 p-4 border border-gray-200 rounded-lg">
                            <h2 className="text-lg font-semibold text-[#073954]">Application & Regulatory Categories</h2>
                            <Button type="button" onClick={handleAddRegulation} variant="outline" className="text-[#094C81] border-[#094C81]">
                                <Plus className="h-4 w-4 mr-2" /> Add Regulation Category
                            </Button>
                        </div>

                        {regulations.map((reg, index) => (
                            <div key={reg.id} className="border border-[#B1C9E3] bg-blue-50/10 rounded-xl p-6 relative">
                                <button type="button" onClick={() => removeRegulation(reg.id)} className="absolute top-4 right-4 text-red-500 hover:bg-red-50 p-2 rounded-full" title="Remove Regulation">
                                    <Trash2 className="h-5 w-5" />
                                </button>
                                <h3 className="text-lg font-medium text-[#094C81] mb-6 border-b border-blue-100 pb-2">Regulation Area {index + 1}</h3>
                                
                                <div className="grid gap-6 mb-8">
                                    <div className="space-y-2">
                                        <Label>Title *</Label>
                                        <Input
                                            value={reg.title}
                                            onChange={(e) => updateRegulation(reg.id, "title", e.target.value)}
                                            placeholder="e.g. Overview of New Regulation"
                                            className="bg-white"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Description</Label>
                                        <Textarea
                                            value={reg.description}
                                            onChange={(e) => updateRegulation(reg.id, "description", e.target.value)}
                                            placeholder="Provide a general description..."
                                            className="bg-white min-h-[80px]"
                                        />
                                    </div>
                                </div>

                                {/* Objectives using Cards */}
                                <div className="mb-8 border border-gray-200 rounded-lg p-5 bg-white">
                                    <div className="flex justify-between items-center mb-4">
                                        <h4 className="font-medium text-gray-800">Objectives (Card Style)</h4>
                                        <Button type="button" size="sm" onClick={() => addObjective(reg.id)} variant="ghost" className="text-green-600 hover:bg-green-50">
                                            <Plus className="h-4 w-4 mr-1" /> Add Objective
                                        </Button>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {reg.objectives.map((obj, objIdx) => (
                                            <div key={obj.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4 shadow-sm relative">
                                                <button type="button" onClick={() => removeObjective(reg.id, obj.id)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500">
                                                    <Trash2 className="h-4 w-4" />
                                                </button>
                                                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 block">Objective {objIdx + 1}</span>
                                                <Input 
                                                    value={obj.title} 
                                                    onChange={e => updateObjective(reg.id, obj.id, "title", e.target.value)} 
                                                    placeholder="Objective Title" 
                                                    className="mb-2 bg-white" 
                                                />
                                                <Textarea 
                                                    value={obj.description} 
                                                    onChange={e => updateObjective(reg.id, obj.id, "description", e.target.value)} 
                                                    placeholder="Detailed description..." 
                                                    className="bg-white text-sm min-h-[60px]" 
                                                />
                                            </div>
                                        ))}
                                        {reg.objectives.length === 0 && <div className="col-span-2 text-center text-gray-400 py-4 text-sm">No objectives added.</div>}
                                    </div>
                                </div>

                                {/* Stepper UI for Steps */}
                                <div className="mb-8 border border-gray-200 rounded-lg p-5 bg-white">
                                    <div className="flex justify-between items-center mb-4">
                                        <h4 className="font-medium text-gray-800">Workflow Steps (Stepper UI)</h4>
                                        <Button type="button" size="sm" onClick={() => addStep(reg.id)} variant="ghost" className="text-blue-600 hover:bg-blue-50">
                                            <Plus className="h-4 w-4 mr-1" /> Add Step
                                        </Button>
                                    </div>
                                    <div className="space-y-4">
                                        {reg.steps.map((step, stepIdx) => (
                                            <div key={step.id} className="flex gap-4">
                                                <div className="flex flex-col items-center">
                                                    <div className="h-8 w-8 rounded-full bg-blue-100 text-[#094C81] flex items-center justify-center font-bold text-sm shrink-0">
                                                        {stepIdx + 1}
                                                    </div>
                                                    {stepIdx < reg.steps.length - 1 && <div className="w-0.5 h-full bg-blue-100 my-1"></div>}
                                                </div>
                                                <div className="flex-1 bg-gray-50 border border-gray-200 rounded-lg p-4 relative mb-2">
                                                    <button type="button" onClick={() => removeStep(reg.id, step.id)} className="absolute top-4 right-4 text-gray-400 hover:text-red-500">
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                    <div className="pr-8 space-y-3">
                                                        <Input 
                                                            value={step.title} 
                                                            onChange={e => updateStep(reg.id, step.id, "title", e.target.value)} 
                                                            placeholder="Step Title" 
                                                            className="bg-white font-medium" 
                                                        />
                                                        <Textarea 
                                                            value={step.description} 
                                                            onChange={e => updateStep(reg.id, step.id, "description", e.target.value)} 
                                                            placeholder="Describe what happens in this step..." 
                                                            className="bg-white text-sm min-h-[60px]" 
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        {reg.steps.length === 0 && <div className="text-center text-gray-400 py-4 text-sm">No workflow steps added.</div>}
                                    </div>
                                </div>

                                {/* Bullet Points UI */}
                                <div className="border border-gray-200 rounded-lg p-5 bg-white">
                                    <div className="flex justify-between items-center mb-4">
                                        <h4 className="font-medium text-gray-800">Key Points / Features (Bulleting UI)</h4>
                                        <Button type="button" size="sm" onClick={() => addBulletPoint(reg.id)} variant="ghost" className="text-purple-600 hover:bg-purple-50">
                                            <Plus className="h-4 w-4 mr-1" /> Add Point
                                        </Button>
                                    </div>
                                    <ul className="space-y-3">
                                        {reg.bullet_points.map((bp) => (
                                            <li key={bp.id} className="flex items-start gap-3">
                                                <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0 mt-2" />
                                                <div className="flex-1 flex gap-2">
                                                    <Input 
                                                        value={bp.text} 
                                                        onChange={e => updateBulletPoint(reg.id, bp.id, e.target.value)} 
                                                        placeholder="Enter key point..." 
                                                        className="bg-gray-50 border-gray-200" 
                                                    />
                                                    <Button type="button" size="icon" variant="ghost" onClick={() => removeBulletPoint(reg.id, bp.id)} className="text-gray-400 hover:text-red-500 shrink-0">
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </li>
                                        ))}
                                        {reg.bullet_points.length === 0 && <li className="text-center text-gray-400 py-2 text-sm">No bullet points added.</li>}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </TabsContent>

                    <TabsContent value="directives" className="space-y-6">
                        <div className="flex justify-between items-center bg-gray-50 p-4 border border-gray-200 rounded-lg">
                            <div>
                                <h2 className="text-lg font-semibold text-[#073954]">Directives & Action Links</h2>
                                <p className="text-sm text-gray-500">Add external directives, forms, or calls-to-action.</p>
                            </div>
                            <Button type="button" onClick={handleAddDirective} variant="outline" className="text-[#094C81] border-[#094C81]">
                                <Plus className="h-4 w-4 mr-2" /> Add Directive
                            </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {directives.map((dir, index) => (
                                <div key={dir.id} className="border border-gray-200 bg-white rounded-xl p-5 shadow-sm relative group">
                                    <button type="button" onClick={() => removeDirective(dir.id)} className="absolute top-2 right-2 text-gray-400 hover:text-red-500 p-2 rounded-full hidden group-hover:block transition-all bg-white border border-gray-100 shadow-sm" title="Remove Directive">
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                    <div className="flex items-center gap-2 mb-4">
                                        <GripVertical className="h-4 w-4 text-gray-300" />
                                        <span className="font-semibold text-gray-700">Directive {index + 1}</span>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="space-y-1">
                                            <Label className="text-xs">Title *</Label>
                                            <Input value={dir.title} onChange={e => updateDirective(dir.id, "title", e.target.value)} required placeholder="e.g. Fill out Application Form" />
                                        </div>
                                        <div className="space-y-1">
                                            <Label className="text-xs">Description</Label>
                                            <Textarea value={dir.description} onChange={e => updateDirective(dir.id, "description", e.target.value)} placeholder="Guidelines..." className="min-h-[60px]" />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <Label className="text-xs">Action Label</Label>
                                                <Input value={dir.action_label} onChange={e => updateDirective(dir.id, "action_label", e.target.value)} placeholder="e.g. Download PDF" />
                                            </div>
                                            <div className="space-y-1">
                                                <Label className="text-xs">Action Link / URL</Label>
                                                <Input value={dir.action} onChange={e => updateDirective(dir.id, "action", e.target.value)} placeholder="https://..." />
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <Label className="text-xs">Type</Label>
                                            <select 
                                                value={dir.type} 
                                                onChange={e => updateDirective(dir.id, "type", e.target.value)}
                                                className="w-full flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                            >
                                                <option value="main">Main Directive</option>
                                                <option value="sub">Sub Directive</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {directives.length === 0 && (
                                <div className="col-span-1 md:col-span-2 text-center py-12 border-2 border-dashed border-gray-200 rounded-lg text-gray-500">
                                    No directives associated with this process yet.
                                </div>
                            )}
                        </div>
                    </TabsContent>

                    <TabsContent value="attachments" className="space-y-6">
                        <div className="flex justify-between items-center bg-gray-50 p-4 border border-gray-200 rounded-lg">
                            <div>
                                <h2 className="text-lg font-semibold text-[#073954]">Reference Documents & Attachments</h2>
                                <p className="text-sm text-gray-500">Upload guidelines, manual PDFs or forms.</p>
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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {attachments.map((att, index) => (
                                <div key={att.id} className="border border-gray-200 bg-white rounded-xl p-4 shadow-sm flex items-start gap-4">
                                    <div className="h-10 w-10 bg-blue-50 text-[#094C81] rounded-lg shrink-0 flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-file-text"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <Label className="text-xs text-gray-500 mb-1 block">Display Label *</Label>
                                        <Input 
                                            value={att.label}
                                            onChange={(e) => updateAttachmentLabel(att.id, e.target.value)}
                                            className="h-8 text-sm mb-2 font-medium"
                                            placeholder="Label for this document"
                                            required
                                        />
                                        <p className="text-xs text-gray-400 truncate">File: {att.file_name}</p>
                                    </div>
                                    <button 
                                        type="button" 
                                        onClick={() => removeAttachment(att.id)} 
                                        className="text-gray-400 hover:text-red-500 shrink-0 p-1 mt-6"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}
                            {attachments.length === 0 && (
                                <div className="col-span-1 md:col-span-2 text-center py-12 border-2 border-dashed border-gray-200 rounded-lg text-gray-500">
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
