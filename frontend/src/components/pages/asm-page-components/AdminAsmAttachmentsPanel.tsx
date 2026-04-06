"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { ASMAttachment } from "@/redux/types/asm";
import { FileUploadField } from "@/components/common/FileUpplaodFiled";

interface Props {
    attachments: ASMAttachment[];
    onChange: (items: ASMAttachment[]) => void;
}

export function AdminAsmAttachmentsPanel({ attachments, onChange }: Props) {
    const handleAdd = () => {
        onChange([...attachments, { label: "", attachment_id: "" }]);
    };

    const handleUpdate = (index: number, field: keyof ASMAttachment, value: string) => {
        const newItems = [...attachments];
        newItems[index] = { ...newItems[index], [field]: value };
        onChange(newItems);
    };

    const handleRemove = (index: number) => {
        const newItems = [...attachments];
        newItems.splice(index, 1);
        onChange(newItems);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mt-4">
                <h3 className="text-xl font-bold text-[#073954]">Attachments / Documents</h3>
                <Button type="button" onClick={handleAdd} size="sm" className="bg-golden-dark hover:bg-golden-darkHover">
                    <Plus className="w-4 h-4 mr-2" /> Add Document
                </Button>
            </div>

            {attachments.length === 0 && (
                <p className="text-gray-500 italic">No attachments added yet.</p>
            )}

            <div className="space-y-4">
                {attachments.map((item, index) => (
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
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
                                <div className="space-y-2">
                                    <Label>Document Label</Label>
                                    <Input 
                                        value={item.label} 
                                        onChange={(e) => handleUpdate(index, "label", e.target.value)}
                                        placeholder="e.g. ASM Study Report"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <FileUploadField
                                        id={`asm-doc-${index}`}
                                        label="File Upload"
                                        value={item.attachment_id ? [item.attachment_id] : []}
                                        onChange={(ids) => handleUpdate(index, "attachment_id", ids[0] || "")}
                                        multiple={false}
                                        category="footer"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
