"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { ASMObjective } from "@/redux/types/asm";
import { LucideIconPicker } from "@/components/common/LucideIconPicker";

interface Props {
    objectives: ASMObjective[];
    onChange: (items: ASMObjective[]) => void;
    title: string;
    maxItems?: number;
    hideIcon?: boolean;
    hideDescription?: boolean;
    hideContent?: boolean;
    hideFootnote?: boolean;
}

export function AdminAsmObjectivesPanel({ 
    objectives, 
    onChange, 
    title,
    maxItems,
    hideIcon,
    hideDescription,
    hideContent,
    hideFootnote
}: Props) {
    const handleAdd = () => {
        onChange([...objectives, { title: "" }]);
    };

    const handleUpdate = (index: number, field: keyof ASMObjective, value: string) => {
        const newItems = [...objectives];
        newItems[index] = { ...newItems[index], [field]: value };
        onChange(newItems);
    };

    const handleRemove = (index: number) => {
        const newItems = [...objectives];
        newItems.splice(index, 1);
        onChange(newItems);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mt-4">
                <h3 className="text-xl font-bold text-[#073954]">{title}</h3>
                {(!maxItems || objectives.length < maxItems) && (
                    <Button type="button" onClick={handleAdd} size="sm" className="bg-golden-dark hover:bg-golden-darkHover">
                        <Plus className="w-4 h-4 mr-2" /> Add Item
                    </Button>
                )}
            </div>

            {objectives.length === 0 && (
                <p className="text-gray-500 italic">No items added yet.</p>
            )}

            <div className="space-y-4">
                {objectives.map((item, index) => (
                    <Card key={index} className="relative group border-gray-200">
                        <Button 
                            type="button"
                            variant="destructive" 
                            size="icon" 
                            className="absolute top-4 right-4 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity z-10"
                            onClick={() => handleRemove(index)}
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                        <CardContent className="pt-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Title</Label>
                                    <Input 
                                        value={item.title} 
                                        onChange={(e) => handleUpdate(index, "title", e.target.value)}
                                        placeholder="Headline or Objective Title"
                                    />
                                </div>
                                {!hideIcon && (
                                    <div className="space-y-2">
                                        <Label>Icon</Label>
                                        <LucideIconPicker 
                                            value={item.icon || ""} 
                                            onChange={(val) => handleUpdate(index, "icon", val)} 
                                        />
                                    </div>
                                )}
                                {!hideDescription && (
                                    <div className="space-y-2 md:col-span-2">
                                        <Label>Description</Label>
                                        <Textarea 
                                            value={item.description || ""} 
                                            onChange={(e) => handleUpdate(index, "description", e.target.value)}
                                            placeholder="Short description"
                                            rows={2}
                                        />
                                    </div>
                                )}
                                {!hideContent && (
                                    <div className="space-y-2 md:col-span-2">
                                        <Label>Content (Optional)</Label>
                                        <Textarea 
                                            value={item.content || ""} 
                                            onChange={(e) => handleUpdate(index, "content", e.target.value)}
                                            placeholder="Detailed content"
                                            rows={4}
                                        />
                                    </div>
                                )}
                                {!hideFootnote && (
                                    <div className="space-y-2 md:col-span-2">
                                        <Label>Footnote (Optional)</Label>
                                        <Input 
                                            value={item.foot_note || ""} 
                                            onChange={(e) => handleUpdate(index, "foot_note", e.target.value)}
                                            placeholder="Any footer note"
                                        />
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
