"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { ASMPreview } from "@/redux/types/asm";
import { FileUploadField } from "@/components/common/FileUpplaodFiled";
import { LucideIconPicker } from "@/components/common/LucideIconPicker";

interface Props {
    previews: ASMPreview[];
    onChange: (items: ASMPreview[]) => void;
}

export function AdminAsmPreviewsPanel({ previews, onChange }: Props) {
    const handleAdd = () => {
        onChange([...previews, { title: "", attachment_id: "" }]);
    };

    const handleUpdate = (index: number, field: keyof ASMPreview, value: any) => {
        const newItems = [...previews];
        newItems[index] = { ...newItems[index], [field]: value };
        onChange(newItems);
    };

    const handleRemove = (index: number) => {
        const newItems = [...previews];
        newItems.splice(index, 1);
        onChange(newItems);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mt-4">
                <h3 className="text-xl font-bold text-[#073954]">Previews Content</h3>
                <Button type="button" onClick={handleAdd} size="sm" className="bg-golden-dark hover:bg-golden-darkHover">
                    <Plus className="w-4 h-4 mr-2" /> Add Preview
                </Button>
            </div>

            {previews.length === 0 && (
                <p className="text-gray-500 italic">No previews added yet.</p>
            )}

            <div className="space-y-4">
                {previews.map((item, index) => (
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
                                <div className="space-y-2 col-span-1 border rounded-md p-4 bg-gray-50">
                                    <FileUploadField
                                        id={`asm-preview-${index}`}
                                        label="Preview Image"
                                        value={item.attachment_id ? [item.attachment_id] : []}
                                        onChange={(ids) => handleUpdate(index, "attachment_id", ids[0] || "")}
                                        multiple={false}
                                    />
                                </div>
                                <div className="space-y-4 col-span-1">
                                    <div className="space-y-2">
                                        <Label>Title</Label>
                                        <Input 
                                            value={item.title} 
                                            onChange={(e) => handleUpdate(index, "title", e.target.value)}
                                            placeholder="Preview Title"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Icon</Label>
                                        <LucideIconPicker 
                                            value={item.icon || ""} 
                                            onChange={(val) => handleUpdate(index, "icon", val)} 
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Description</Label>
                                        <Textarea 
                                            value={item.description || ""} 
                                            onChange={(e) => handleUpdate(index, "description", e.target.value)}
                                            placeholder="Short description"
                                            rows={3}
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
