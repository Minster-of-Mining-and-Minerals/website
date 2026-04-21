"use client";

import { useState, useEffect } from "react";
import { Tag } from "lucide-react";
import { toast } from "sonner";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
    useCreateEventCategoryMutation,
    useUpdateEventCategoryMutation,
} from "@/redux/api/eventCategoryApi";
import { EventCategory } from "@/redux/types/eventCategory";

interface EventCategoryFormModalProps {
    open: boolean;
    onClose: () => void;
    /** If provided, the modal opens in edit mode */
    editCategory?: EventCategory;
}

export function EventCategoryFormModal({
    open,
    onClose,
    editCategory,
}: EventCategoryFormModalProps) {
    const isEdit = Boolean(editCategory);

    const [createCategory, { isLoading: isCreating }] = useCreateEventCategoryMutation();
    const [updateCategory, { isLoading: isUpdating }] = useUpdateEventCategoryMutation();

    const [name, setName] = useState("");

    /* Sync name when switching between create/edit */
    useEffect(() => {
        if (open) {
            setName(editCategory?.name ?? "");
        } else {
            setName("");
        }
    }, [open, editCategory]);

    const isBusy = isCreating || isUpdating;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const trimmed = name.trim();
        if (!trimmed) {
            toast.error("Category name cannot be empty");
            return;
        }

        try {
            if (isEdit && editCategory) {
                await updateCategory({
                    id: editCategory.event_category_id,
                    data: { name: trimmed },
                }).unwrap();
                toast.success(`Category updated to "${trimmed}"`);
            } else {
                await createCategory({ name: trimmed }).unwrap();
                toast.success(`Category "${trimmed}" created`);
            }
            onClose();
        } catch (err: any) {
            const message =
                err?.data?.message ?? (isEdit ? "Failed to update" : "Failed to create");
            toast.error(message);
        }
    };

    return (
        <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
            <DialogContent className="sm:max-w-[400px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-[#073954]">
                        <Tag className="h-5 w-5 text-golden-dark" />
                        {isEdit ? "Edit Category" : "New Event Category"}
                    </DialogTitle>
                    <DialogDescription>
                        {isEdit
                            ? "Update the name of this category tag."
                            : "Create a new standalone category tag. You can assign it to events when creating or editing them."}
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 pt-2">
                    <div className="space-y-2">
                        <Label htmlFor="cat-name">
                            Category Name <span className="text-destructive">*</span>
                        </Label>
                        <div className="relative">
                            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
                            <Input
                                id="cat-name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="e.g. Webinar, Workshop, Conference…"
                                className="pl-9"
                                autoFocus
                                disabled={isBusy}
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            disabled={isBusy}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={isBusy || !name.trim()}
                            className="bg-[#073954] hover:bg-[#094C81]"
                        >
                            {isBusy ? (
                                <span className="flex items-center gap-2">
                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                                    {isEdit ? "Updating…" : "Creating…"}
                                </span>
                            ) : isEdit ? (
                                "Save Changes"
                            ) : (
                                "Create Category"
                            )}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
}
