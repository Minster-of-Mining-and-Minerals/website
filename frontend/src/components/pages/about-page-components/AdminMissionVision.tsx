"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Save, Plus, Trash2 } from "lucide-react";

export default function AdminMissionVision() {
    const [mission, setMission] = useState("To generate, manage, and deliver geosciences data for society and business...");
    const [vision, setVision] = useState("To foresee the well developed Mineral Resources Contribution...");
    const [values, setValues] = useState([
        "Teamwork is a fundamental principle...",
        "Innovation and creativity guide...",
        "Endurance reflects...",
        "Ethics underpin..."
    ]);

    const handleSave = () => {
        console.log("Saving mission/vision/values:", { mission, vision, values });
    };

    const addValue = () => setValues([...values, "New core value..."]);
    const removeValue = (index: number) => setValues(values.filter((_, i) => i !== index));
    const updateValue = (index: number, text: string) => {
        const newValues = [...values];
        newValues[index] = text;
        setValues(newValues);
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-xl font-bold text-[#073954]">Mission & Vision</CardTitle>
                        <Button onClick={handleSave} className="bg-golden-dark hover:bg-golden-darkHover">
                            <Save className="w-4 h-4 mr-2" />
                            Save
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label>Mission</Label>
                            <Textarea
                                value={mission}
                                onChange={(e) => setMission(e.target.value)}
                                className="min-h-[120px]"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Vision</Label>
                            <Textarea
                                value={vision}
                                onChange={(e) => setVision(e.target.value)}
                                className="min-h-[120px]"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-xl font-bold text-[#073954]">Core Values</CardTitle>
                        <Button variant="outline" onClick={addValue} size="sm">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Value
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    {values.map((value, index) => (
                        <div key={index} className="flex gap-2 items-start">
                            <Textarea
                                value={value}
                                onChange={(e) => updateValue(index, e.target.value)}
                                className="flex-1"
                            />
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
                </CardContent>
            </Card>
        </div>
    );
}
