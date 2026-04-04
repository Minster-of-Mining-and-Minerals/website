"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Save, Loader2, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
    useGetSnapshotByIdQuery,
    useCreateSnapshotMutation,
    useUpdateSnapshotMutation,
} from "@/redux/api/snapshotApi";
import { SnapshotSection } from "@/redux/types/snapshot";
import { ImageUploadField, UploadedFileInfo } from "@/components/common/ImageUploadField";

export default function SnapshotForm({ sector }: { sector: string }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const editId = searchParams.get("id") || undefined;
    const isEditing = Boolean(editId);
    let sectorRoute = sector;

    if (sector === "geothermal") {
        sectorRoute = "geology";
    }

    /* API hooks */
    const { data: existing, isLoading: isLoadingExisting } = useGetSnapshotByIdQuery(editId!, {
        skip: !editId,
    });
    const [createSnapshot, { isLoading: isCreating }] = useCreateSnapshotMutation();
    const [updateSnapshot, { isLoading: isUpdating }] = useUpdateSnapshotMutation();

    /* Form state */
    const [title, setTitle] = useState("");
    const [descriptionOne, setDescriptionOne] = useState("");
    const [descriptionTwo, setDescriptionTwo] = useState("");
    const [attachmentId, setAttachmentId] = useState<string | undefined>(undefined);
    const [attachmentDescription, setAttachmentDescription] = useState("");
    const [sections, setSections] = useState<SnapshotSection[]>([]);

    /* Hydrate on edit */
    useEffect(() => {
        if (existing && isEditing) {
            setTitle(existing.title ?? "");
            setDescriptionOne(existing.description_one ?? "");
            setDescriptionTwo(existing.description_two ?? "");
            setAttachmentId(existing.attachment_id ?? undefined);
            setAttachmentDescription(existing.attachment_description ?? "");
            setSections(existing.sections ?? []);
        }
    }, [existing, isEditing]);

    const handleImageChange = (_ids: string[], files?: UploadedFileInfo[]) => {
        setAttachmentId(files?.[0]?.attachment_id ?? undefined);
    };

    const addSection = () => {
        setSections([...sections, { title: "", content: "" }]);
    };

    const updateSection = (index: number, field: keyof SnapshotSection, value: string) => {
        const newSections = [...sections];
        newSections[index] = { ...newSections[index], [field]: value };
        setSections(newSections);
    };

    const removeSection = (index: number) => {
        setSections(sections.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) {
            toast.error("Title is required");
            return;
        }

        if (!attachmentId) {
            toast.error("Cover image is required");
            return;
        }

        const payload = {
            title: title.trim(),
            sector: sector || "mining",
            description_one: descriptionOne,
            description_two: descriptionTwo,
            attachment_id: attachmentId,
            attachment_description: attachmentDescription,
            sections,
        };

        try {
            if (isEditing && editId) {
                await updateSnapshot({ id: editId, data: payload }).unwrap();
                toast.success("Snapshot updated successfully!");
            } else {
                await createSnapshot(payload).unwrap();
                toast.success("Snapshot created successfully!");
            }
            router.push(`/admin/sectors/${sectorRoute}/snapshots`);
        } catch {
            toast.error(isEditing ? "Failed to update snapshot" : "Failed to create snapshot");
        }
    };

    const isSaving = isCreating || isUpdating;

    if (isEditing && isLoadingExisting) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="h-6 w-6 animate-spin text-[#094C81]" />
                <span className="ml-3 text-gray-500">Loading snapshot data...</span>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-6 w-full space-y-6">
            <div className="flex items-center gap-3">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => router.push("/admin/sectors/mining/snapshots")}
                    className="text-gray-400 hover:text-[#094C81]"
                >
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <div>
                    <h1 className="text-2xl font-bold text-[#073954]">
                        {isEditing ? "Edit Mining Snapshot" : "Create Mining Snapshot"}
                    </h1>
                    <p className="text-sm text-gray-500 mt-0.5">
                        {isEditing
                            ? `Editing: ${existing?.title ?? "..."}`
                            : "Configure the main display content for the mining sector page"}
                    </p>
                </div>
            </div>

            <Card className="border border-gray-100 shadow-sm">
                <CardHeader>
                    <CardTitle className="text-base text-[#073954]">General Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-5">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="title">Snapshot Title *</Label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="E.g., Mining Sector Overview"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Cover Image *</Label>
                            <ImageUploadField
                                id="snapshot-image"
                                label=""
                                value={attachmentId ? [attachmentId] : []}
                                onChange={handleImageChange}
                                category="profile"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="attachment_description">Image Description / Caption</Label>
                            <Input
                                id="attachment_description"
                                value={attachmentDescription}
                                onChange={(e) => setAttachmentDescription(e.target.value)}
                                placeholder="E.g., Mining site in Northern Ethiopia"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description_one">Heading / Hero Description</Label>
                            <Input
                                id="description_one"
                                value={descriptionOne}
                                onChange={(e) => setDescriptionOne(e.target.value)}
                                placeholder="Short catchy heading"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description_two">Main Description Content</Label>
                            <Textarea
                                id="description_two"
                                value={descriptionTwo}
                                onChange={(e) => setDescriptionTwo(e.target.value)}
                                placeholder="Enter the main content here..."
                                className="min-h-[200px]"
                            />
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-sm font-semibold text-[#073954]">Additional Sections</h3>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={addSection}
                                    className="h-8 border-[#094C81] text-[#094C81] hover:bg-[#094C81] hover:text-white"
                                >
                                    <Plus className="h-3.5 w-3.5 mr-1" /> Add Section
                                </Button>
                            </div>

                            <div className="space-y-4">
                                {sections.map((section, index) => (
                                    <div key={index} className="p-4 bg-gray-50 rounded-lg border border-gray-100 relative">
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            className="absolute top-2 right-2 h-7 w-7 text-red-500"
                                            onClick={() => removeSection(index)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                        <div className="space-y-3">
                                            <div className="space-y-1">
                                                <Label className="text-xs">Section Title</Label>
                                                <Input
                                                    value={section.title}
                                                    onChange={(e) => updateSection(index, "title", e.target.value)}
                                                    placeholder="E.g., Mandate"
                                                    className="h-9 text-sm"
                                                />
                                            </div>
                                            <div className="space-y-1">
                                                <Label className="text-xs">Section Content</Label>
                                                <Textarea
                                                    value={section.content}
                                                    onChange={(e) => updateSection(index, "content", e.target.value)}
                                                    placeholder="Enter section content..."
                                                    className="min-h-[100px] text-sm"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                {sections.length === 0 && (
                                    <p className="text-xs text-gray-400 text-center py-4 italic">
                                        No additional sections added yet.
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center gap-3 pt-4 border-t border-gray-50">
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
                                {isEditing ? "Save Changes" : "Create Snapshot"}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.push(`/admin/sectors/${sectorRoute}/snapshots`)}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
