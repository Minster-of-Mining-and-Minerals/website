"use client";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import {
    useCreateServiceMutation,
    useUpdateServiceMutation,
} from "@/redux/api/serviceApi";
import { Service } from "@/redux/types/service";
import { LucideIconPicker } from "@/components/common/LucideIconPicker";


interface ServiceModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    currentService: Service | null;
    setCurrentService: (service: Service | null) => void;
}

export default function ServiceModal({
    open,
    onOpenChange,
    currentService,
    setCurrentService,
}: ServiceModalProps) {
    const isEditing = Boolean(currentService?.service_id);

    const [createService, { isLoading: creating }] =
        useCreateServiceMutation();
    const [updateService, { isLoading: updating }] =
        useUpdateServiceMutation();

    const handleSave = async () => {
        if (!currentService) return;

        const payload = {
            icon: currentService.icon,
            title: currentService.title,
            content: currentService.content,
        };

        try {
            if (isEditing) {
                await updateService({
                    id: currentService.service_id,
                    data: payload,
                }).unwrap();
            } else {
                await createService(payload).unwrap();
            }

            onOpenChange(false);
            setCurrentService(null);
        } catch (error) {
            console.error("Failed to save service:", error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold text-[#073954]">
                        {isEditing ? "Edit Service" : "Add Service"}
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    {/* TITLE */}
                    <div className="space-y-2">
                        <Label>Title</Label>
                        <Input
                            value={currentService?.title ?? ""}
                            onChange={(e) =>
                                setCurrentService({
                                    ...(currentService as Service),
                                    title: e.target.value,
                                })
                            }
                            placeholder="Service title"
                        />
                    </div>

                    {/* CONTENT */}
                    <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                            value={currentService?.content ?? ""}
                            onChange={(e) =>
                                setCurrentService({
                                    ...(currentService as Service),
                                    content: e.target.value,
                                })
                            }
                            rows={4}
                            placeholder="Service description"
                        />
                    </div>

                    {/* ICON */}
                    <div className="space-y-2">
                        <Label>Icon</Label>
                        <LucideIconPicker
                            value={currentService?.icon}
                            onChange={(iconName) =>
                                setCurrentService({
                                    ...(currentService as Service),
                                    icon: iconName,
                                })
                            }
                        />
                    </div>

                </div>

                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        disabled={creating || updating}
                        className="bg-golden-dark hover:bg-golden-darkHover text-white"
                    >
                        {isEditing ? "Update Service" : "Save Service"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}