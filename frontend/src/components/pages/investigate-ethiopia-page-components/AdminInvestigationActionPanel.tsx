"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { InvestigationAction } from "@/redux/types/investigateEthiopia";

interface Props {
    actions: InvestigationAction[];
    onChange: (items: InvestigationAction[]) => void;
    title?: string;
}

export function AdminInvestigationActionPanel({ 
    actions, 
    onChange, 
    title = "Investigation Actions"
}: Props) {
    const handleAdd = () => {
        onChange([...actions, { title: "", description: "", action: "", link: "" }]);
    };

    const handleUpdate = (index: number, field: keyof InvestigationAction, value: string) => {
        const newItems = [...actions];
        newItems[index] = { ...newItems[index], [field]: value };
        onChange(newItems);
    };

    const handleRemove = (index: number) => {
        const newItems = [...actions];
        newItems.splice(index, 1);
        onChange(newItems);
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mt-4">
                <h3 className="text-xl font-bold text-[#073954]">{title}</h3>
                <Button type="button" onClick={handleAdd} size="sm" className="bg-golden-dark hover:bg-golden-darkHover">
                    <Plus className="w-4 h-4 mr-2" /> Add Action
                </Button>
            </div>

            {actions.length === 0 && (
                <p className="text-gray-500 italic">No actions added yet.</p>
            )}

            <div className="space-y-4">
                {actions.map((item, index) => (
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
                                        placeholder="Action Title"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Action Label</Label>
                                    <Input 
                                        value={item.action} 
                                        onChange={(e) => handleUpdate(index, "action", e.target.value)}
                                        placeholder="e.g. Read More"
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <Label>Link</Label>
                                    <Input 
                                        value={item.link} 
                                        onChange={(e) => handleUpdate(index, "link", e.target.value)}
                                        placeholder="URL or Path"
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <Label>Description</Label>
                                    <Textarea 
                                        value={item.description} 
                                        onChange={(e) => handleUpdate(index, "description", e.target.value)}
                                        placeholder="Short description"
                                        rows={2}
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
