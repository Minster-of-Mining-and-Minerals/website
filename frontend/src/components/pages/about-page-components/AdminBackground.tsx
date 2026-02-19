"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";

export default function AdminBackground() {
    const [title, setTitle] = useState("Ministry Background");
    const [subtitle, setSubtitle] = useState("Established to regulate and develop Ethiopia's mineral and petroleum resources for sustainable economic growth and national development.");
    const [description, setDescription] = useState("The world is changing faster than ever before, business is no exception...");

    const handleSave = () => {
        // Placeholder for save logic
        console.log("Saving background:", { title, subtitle, description });
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle className="text-xl font-bold text-[#073954]">Edit Background Section</CardTitle>
                    <Button onClick={handleSave} className="bg-golden-dark hover:bg-golden-darkHover">
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                    </Button>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="title">Main Title</Label>
                    <Input
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="subtitle">Subtitle / Intro</Label>
                    <Textarea
                        id="subtitle"
                        value={subtitle}
                        onChange={(e) => setSubtitle(e.target.value)}
                        className="min-h-[80px]"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="description">Main Content</Label>
                    <Textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="min-h-[200px]"
                    />
                </div>
            </CardContent>
        </Card>
    );
}
