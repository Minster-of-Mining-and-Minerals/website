"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Save, Plus, Trash2 } from "lucide-react";

import {
    useGetStrategiesQuery,
    useCreateStrategyMutation,
    useUpdateStrategyMutation
} from "@/redux/api/strategyApi";
import { CreateStrategyPayload } from "@/redux/types/strategy";
import { ImageUploadField } from "@/components/common/ImageUploadField";

// Default empty attachment arrays

export default function AdminMissionVision() {
    // State for title/description
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    // State for sections
    const [mission, setMission] = useState("");
    const [vision, setVision] = useState("");
    const [values, setValues] = useState<{ title: string; content?: string; attachment_id?: string }[]>([]);

    // Individual attachment states for mission, vision, and core values section icon
    const [missionAttachment, setMissionAttachment] = useState<string[]>([]);
    const [visionAttachment, setVisionAttachment] = useState<string[]>([]);
    const [coreValuesSectionAttachment, setCoreValuesSectionAttachment] = useState<string[]>([]);

    // Store the strategy ID
    const [strategyId, setStrategyId] = useState<string | null>(null);

    // RTK Query hooks
    const { data: strategiesData, isLoading } = useGetStrategiesQuery();
    const [createStrategy] = useCreateStrategyMutation();
    const [updateStrategy, { isLoading: isUpdating }] = useUpdateStrategyMutation();

    // Map fetched strategy to state or create if empty
    useEffect(() => {
        if (!strategiesData) return;

        if (strategiesData.length === 0) {
            // Reset to defaults when no strategy exists
            setStrategyId(null);
            setTitle("");
            setDescription("");
            setMission("");
            setVision("");
            setMissionAttachment([]);
            setVisionAttachment([]);
            setCoreValuesSectionAttachment([]);
            setValues([]);
            return;
        }

        const strategy = strategiesData[0];
        setStrategyId(strategy.strategy_id);

        setTitle(strategy.title || "");
        setDescription(strategy.description || "");

        strategy.sections?.forEach((sec) => {
            if (sec.type === "mission") {
                setMission(sec.content || "");
                // Set attachment if it exists
                if (sec.attachment_id) {
                    setMissionAttachment([sec.attachment_id]);
                }
            }
            else if (sec.type === "vision") {
                setVision(sec.content || "");
                // Set attachment if it exists
                if (sec.attachment_id) {
                    setVisionAttachment([sec.attachment_id]);
                }
            }
            else if (sec.type === "core_values") {
                // Set section attachment if it exists
                if (sec.attachment_id) {
                    setCoreValuesSectionAttachment([sec.attachment_id]);
                }

                // Map core values
                const coreVals = sec.core_values?.map((v) => ({
                    title: v.title || "",
                    content: v.content || v.title || "",
                    attachment_id: v.attachment_id, // Store the attachment_id for each core value
                })) || [];
                setValues(coreVals);
            }
        });
    }, [strategiesData]);

    // Core value handlers
    const addValue = () => setValues([...values, { title: "", content: "" }]);

    const removeValue = (index: number) => setValues(values.filter((_, i) => i !== index));

    const updateValue = (index: number, text: string) => {
        const newValues = [...values];
        newValues[index].title = text;
        newValues[index].content = text; // content should match title based on your payload example
        setValues(newValues);
    };



    // Save handler
    const handleSave = async () => {
        const sections = [
            {
                type: "mission" as const,
                title: "Our Mission",
                attachment_id: missionAttachment[0], // Use the first attachment ID
                content: mission,
            },
            {
                type: "vision" as const,
                title: "Our Vision",
                attachment_id: visionAttachment[0], // Use the first attachment ID
                content: vision,
            },
            {
                type: "core_values" as const,
                title: "Core Values",
                attachment_id: coreValuesSectionAttachment[0], // Use the first attachment ID for the section icon
                core_values: values.map((v) => ({
                    title: v.title,
                    content: v.content || v.title,
                })),
            },
        ];

        const payload: CreateStrategyPayload = {
            title: title || "Organizational Strategy",
            description: description || "Our long term direction",
            sections,
        };

        try {
            if (strategyId) {
                // Update existing strategy
                await updateStrategy({ id: strategyId, data: payload }).unwrap();
                alert("Strategy updated successfully");
            } else {
                // Create new strategy
                await createStrategy(payload).unwrap();
                alert("Strategy created successfully");
            }
        } catch (err: any) {
            console.error("Save failed:", err);
            alert("Failed to save strategy");
        }
    };

    if (isLoading) return <p>Loading strategy...</p>;

    return (
        <div className="space-y-6">
            <Card>
                <CardContent className="space-y-6">
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-xl font-bold text-[#073954]">Title & Description</CardTitle>
                        <Button
                            onClick={handleSave}
                            className="bg-golden-dark hover:bg-golden-darkHover"
                            disabled={isUpdating}
                        >
                            <Save className="w-4 h-4 mr-2" />
                            {isUpdating ? "Saving..." : "Save"}
                        </Button>
                    </div>

                    <div className="space-y-2">
                        <Label>Title</Label>
                        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-xl font-bold text-[#073954]">Mission & Vision</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="flex flex-col space-y-2 p-4">
                            <CardTitle className="text-xl font-bold text-[#073954]">Mission</CardTitle>
                            <div className="space-y-2">
                                <ImageUploadField
                                    id="mission-icon"
                                    label="Icon Image"
                                    value={missionAttachment}
                                    onChange={(ids) => setMissionAttachment(ids)}
                                    category="headline"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Content</Label>
                                <Textarea
                                    value={mission}
                                    onChange={(e) => setMission(e.target.value)}
                                    className="min-h-[120px]"
                                />
                            </div>
                        </Card>

                        <Card className="flex flex-col space-y-2 p-4">
                            <CardTitle className="text-xl font-bold text-[#073954]">Vision</CardTitle>
                            <div className="space-y-2">
                                <ImageUploadField
                                    id="vision-icon"
                                    label="Icon Image"
                                    value={visionAttachment}
                                    onChange={(ids) => setVisionAttachment(ids)}
                                    category="headline"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Content</Label>
                                <Textarea
                                    value={vision}
                                    onChange={(e) => setVision(e.target.value)}
                                    className="min-h-[120px]"
                                />
                            </div>
                        </Card>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-xl font-bold text-[#073954]">Core Values</CardTitle>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-6">
                        {/* Left side - Section Icon Image Upload */}
                        <div className="w-64 space-y-2">
                            <ImageUploadField
                                id="core-values-section-icon"
                                label="Section Icon Image"
                                value={coreValuesSectionAttachment}
                                onChange={(ids) => setCoreValuesSectionAttachment(ids)}
                                category="headline"
                            />
                        </div>

                        {/* Right side - Values List */}
                        <div className="flex-1 space-y-4">
                            {/* Add button at top right */}
                            <div className="flex justify-end">
                                <Button variant="outline" onClick={addValue} size="sm">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Add Value
                                </Button>
                            </div>

                            {/* Values list */}
                            <div className="space-y-4">
                                {values.map((value, index) => (
                                    <div key={index} className="flex gap-2 items-start">
                                        <div className="flex-1 space-y-2">
                                            <Textarea
                                                value={value.title}
                                                onChange={(e) => updateValue(index, e.target.value)}
                                                className="w-full"
                                                placeholder="Core value description"
                                            />
                                        </div>
                                        <Button
                                            variant="destructive"
                                            size="icon"
                                            onClick={() => removeValue(index)}
                                            className="shrink-0"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}