"use client";

import React from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {
    FileCheck,
    Map,
    FlaskConical,
    Droplets,
    TrendingUp,
    ShieldCheck
} from "lucide-react";
import { Service } from "./AdminServicesList";

const iconOptions = [
    { name: "licensing", icon: FileCheck },
    { name: "geology", icon: Map },
    { name: "laboratory", icon: FlaskConical },
    { name: "petroleum", icon: Droplets },
    { name: "investment", icon: TrendingUp },
    { name: "regulation", icon: ShieldCheck },
];

interface ServiceModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: () => void;
    currentService: Partial<Service> | null;
    setCurrentService: (service: Partial<Service> | null) => void;
    isEditing: boolean;
}

export default function ServiceModal({
    open,
    onOpenChange,
    onSave,
    currentService,
    setCurrentService,
    isEditing
}: ServiceModalProps) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-[#073954]">
                        {isEditing ? "Edit Service" : "Add Service"}
                    </DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            value={currentService?.title || ""}
                            onChange={(e) => setCurrentService({ ...currentService!, title: e.target.value })}
                            placeholder="Service title"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            value={currentService?.description || ""}
                            onChange={(e) => setCurrentService({ ...currentService!, description: e.target.value })}
                            placeholder="Service description"
                            rows={4}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="icon">Icon</Label>
                        <Select
                            value={currentService?.iconName}
                            onValueChange={(value) => setCurrentService({ ...currentService!, iconName: value })}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select icon" />
                            </SelectTrigger>
                            <SelectContent>
                                {iconOptions.map((opt) => (
                                    <SelectItem key={opt.name} value={opt.name}>
                                        <div className="flex items-center gap-2">
                                            <opt.icon className="w-4 h-4" />
                                            <span className="capitalize">{opt.name}</span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button onClick={onSave} className="bg-golden-dark hover:bg-golden-darkHover text-white">Save Service</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
