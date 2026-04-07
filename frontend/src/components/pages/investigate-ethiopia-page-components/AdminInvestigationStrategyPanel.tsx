"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Plus, Trash2, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { InvestigationStrategy } from "@/redux/types/investigateEthiopia";
import { LucideIconPicker } from "@/components/common/LucideIconPicker";
import { FileUploadField } from "@/components/common/FileUpplaodFiled";

interface Props {
    strategies: InvestigationStrategy[];
    onChange: (items: InvestigationStrategy[]) => void;
    title: string;
    maxItems?: number;
    hideIcon?: boolean;
    hideDescription?: boolean;
    hideContent?: boolean;
    hideColors?: boolean;
    showTags?: boolean;
    showAttachment?: boolean;
    showLink?: boolean;
}

export function AdminInvestigationStrategyPanel({ 
    strategies, 
    onChange, 
    title,
    maxItems,
    hideIcon,
    hideDescription,
    hideContent,
    hideColors,
    showTags,
    showAttachment,
    showLink
}: Props) {
    const handleAdd = () => {
        onChange([...strategies, { title: "" }]);
    };

    const handleUpdate = (index: number, field: keyof InvestigationStrategy, value: any) => {
        const newItems = [...strategies];
        newItems[index] = { ...newItems[index], [field]: value };
        onChange(newItems);
    };

    const handleRemove = (index: number) => {
        const newItems = [...strategies];
        newItems.splice(index, 1);
        onChange(newItems);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mt-4">
                <h3 className="text-xl font-bold text-[#073954]">{title}</h3>
                {(!maxItems || strategies.length < maxItems) && (
                    <Button type="button" onClick={handleAdd} size="sm" className="bg-golden-dark hover:bg-golden-darkHover">
                        <Plus className="w-4 h-4 mr-2" /> Add Item
                    </Button>
                )}
            </div>

            {strategies.length === 0 && (
                <p className="text-gray-500 italic">No items added yet.</p>
            )}

            <div className="space-y-4">
                {strategies.map((item, index) => (
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
                                        placeholder="Strategy Title"
                                    />
                                </div>
                                {!hideIcon && (
                                    <div className="space-y-2">
                                        <Label>Icon</Label>
                                        <LucideIconPicker 
                                            value={item.icon || ""} 
                                            onChange={(val) => handleUpdate(index, 'icon', val)} 
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
                                {showAttachment && (
                                    <div className="space-y-2 md:col-span-2">
                                        <FileUploadField
                                            id={`attachment-${index}`}
                                            label="Attachment (PDF/Image)"
                                            value={item.attachment_id ? [item.attachment_id] : []}
                                            onChange={(ids) => handleUpdate(index, "attachment_id", ids[0] || null)}
                                            multiple={false}
                                            accept=".pdf,image/*"
                                        />
                                    </div>
                                )}
                                {showLink && (
                                    <div className="space-y-2 md:col-span-2">
                                        <Label>Related URL</Label>
                                        <Input 
                                            type="url"
                                            value={item.link || ""} 
                                            onChange={(e) => handleUpdate(index, "link", e.target.value)}
                                            placeholder="https://example.com"
                                            className={item.link && !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/.test(item.link) ? "border-red-500 focus-visible:ring-red-500" : ""}
                                        />
                                        {item.link && !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/.test(item.link) && (
                                            <p className="text-xs text-red-500">Please enter a valid URL.</p>
                                        )}
                                    </div>
                                )}
                                {showTags && (
                                    <div className="space-y-2 md:col-span-2">
                                        <Label>List</Label>
                                        <div className="flex flex-col gap-2">
                                            <div className="flex flex-wrap gap-2">
                                                {(item.tags || []).map((tag, tagIndex) => (
                                                    <Badge key={tagIndex} variant="secondary" className="flex items-center gap-1">
                                                        {tag}
                                                        <X
                                                            className="w-3 h-3 cursor-pointer hover:text-red-500"
                                                            onClick={() => {
                                                                const newTags = [...(item.tags || [])];
                                                                newTags.splice(tagIndex, 1);
                                                                handleUpdate(index, "tags", newTags);
                                                            }}
                                                        />
                                                    </Badge>
                                                ))}
                                            </div>
                                            <div className="flex gap-2 w-full md:w-1/2">
                                                <Input 
                                                    placeholder="Add to list..."
                                                    onKeyDown={(e) => {
                                                        if (e.key === "Enter") {
                                                            e.preventDefault();
                                                            const val = e.currentTarget.value.trim();
                                                            if (val && !(item.tags || []).includes(val)) {
                                                                handleUpdate(index, "tags", [...(item.tags || []), val]);
                                                                e.currentTarget.value = "";
                                                            }
                                                        }
                                                    }}
                                                />
                                                <Button 
                                                    type="button" 
                                                    variant="outline"
                                                    onClick={(e) => {
                                                        const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                                                        const val = input.value.trim();
                                                        if (val && !(item.tags || []).includes(val)) {
                                                            handleUpdate(index, "tags", [...(item.tags || []), val]);
                                                            input.value = "";
                                                        }
                                                    }}
                                                >
                                                    Add
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {!hideColors && (
                                    <>
                                        <div className="space-y-2">
                                            <Label>Background Color (Optional)</Label>
                                            <Input 
                                                type="color"
                                                value={item.bg_color || "#0b102d"} 
                                                onChange={(e) => handleUpdate(index, "bg_color", e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Foreground Color (Optional)</Label>
                                            <Input 
                                                type="color"
                                                value={item.fg_color || "#ffffff"} 
                                                onChange={(e) => handleUpdate(index, "fg_color", e.target.value)}
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
