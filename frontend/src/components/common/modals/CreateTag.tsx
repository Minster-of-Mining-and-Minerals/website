"use client";

import React, { useState } from "react";
import { XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useCreateTagMutation } from "@/redux/api/tagApi";

interface CreateTagModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const CreateTagModal = ({ isOpen, onClose }: CreateTagModalProps) => {
    const [name, setName] = useState("");

    const [createTag, { isLoading }] = useCreateTagMutation();

    const resetForm = () => {
        setName("");
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) handleClose();
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!name.trim()) {
            toast.error("Tag name is required");
            return;
        }

        try {
            await createTag({
                name: name.trim()
            }).unwrap();

            toast.success("Tag created successfully");
            resetForm();
            onClose();
        } catch (err: any) {
            toast.error(
                err?.data?.message || err?.message || "Failed to create tag"
            );
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            onClick={handleBackdropClick}
        >
            <div className="bg-white p-6 rounded-2xl w-full max-w-[500px] shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-[#094C81]">
                        Create Tag
                    </h2>
                    <button
                        onClick={handleClose}
                        className="text-[#094C81] hover:text-gray-600 transition"
                    >
                        <XIcon className="w-6 h-6 cursor-pointer" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-4">
                        {/* Tag Name */}
                        <div>
                            <label className="block text-sm text-golden-dark">
                                Tag Name
                                <span className="text-red-500"> *</span>
                            </label>
                            <Input
                                className="mt-1 h-11"
                                placeholder="Enter tag name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-4 mt-6">
                        <Button
                            type="button"
                            onClick={handleClose}
                            className="bg-golden-dark20 min-w-32 hover:bg-golden-dark30 h-11 text-gray-600"
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={isLoading || !name.trim()}
                            className="bg-golden-dark min-w-40 hover:bg-golden-darkHover h-11 text-white shadow-md"
                        >
                            {isLoading ? "Creating..." : "Create Tag"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateTagModal;
