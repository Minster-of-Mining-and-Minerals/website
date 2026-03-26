"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Save, Plus, Trash2, Loader2 } from "lucide-react";
import {
    useGetSlidersQuery,
    useCreateSliderMutation,
    useUpdateSliderMutation,
    useDeleteSliderMutation
} from "@/redux/api/sliderApi";
import { ImageUploadField } from "@/components/common/ImageUploadField";
import { toast } from "sonner";
import { Slider } from "@/redux/types/slider";

export default function AdminHeroManager() {
    const { data: slidersData, isLoading: isFetching } = useGetSlidersQuery();
    const [createSlider, { isLoading: isCreating }] = useCreateSliderMutation();
    const [updateSlider, { isLoading: isUpdating }] = useUpdateSliderMutation();
    const [deleteSlider, { isLoading: isDeleting }] = useDeleteSliderMutation();

    const [slides, setSlides] = useState<Partial<Slider>[]>([]);

    useEffect(() => {
        if (slidersData) {
            setSlides(slidersData);
        }
    }, [slidersData]);

    const handleAddSlide = async () => {
        try {
            const nextOrder = slides.length;
            const newSlide = await createSlider({
                title: "New Slide Title",
                description: "New slide description goes here.",
                order: nextOrder,
            }).unwrap();
            toast.success("New slide added!");
        } catch (error) {
            console.error("Failed to add slide", error);
            toast.error("Failed to add slide.");
        }
    };

    const handleRemoveSlide = async (id: string) => {
        if (!confirm("Are you sure you want to delete this slide?")) return;
        try {
            await deleteSlider(id).unwrap();
            toast.success("Slide deleted successfully!");
        } catch (error) {
            console.error("Failed to delete slide", error);
            toast.error("Failed to delete slide.");
        }
    };

    const handleUpdateSlideField = (index: number, field: keyof Slider, value: any) => {
        const newSlides = [...slides];
        newSlides[index] = { ...newSlides[index], [field]: value };
        setSlides(newSlides);
    };

    const handleSaveSlide = async (index: number) => {
        const slide = slides[index];
        if (!slide.slider_id) return;

        try {
            await updateSlider({
                id: slide.slider_id,
                data: {
                    title: slide.title,
                    description: slide.description,
                    attachment_id: slide.attachment_id,
                    order: slide.order,
                }
            }).unwrap();
            toast.success(`Slide ${index + 1} updated!`);
        } catch (error) {
            console.error("Failed to update slide", error);
            toast.error(`Failed to update slide ${index + 1}.`);
        }
    };

    if (isFetching) {
        return (
            <div className="flex items-center justify-center p-12">
                <Loader2 className="w-8 h-8 animate-spin text-golden-dark" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-4 rounded-lg border shadow-sm">
                <div>
                    <h2 className="text-lg font-bold text-[#073954]">Hero Slider Management</h2>
                    <p className="text-sm text-gray-500">Manage the carousel slides on the home page.</p>
                </div>
                <div className="flex gap-2">
                    <Button 
                        variant="outline" 
                        onClick={handleAddSlide} 
                        disabled={isCreating}
                        className="border-golden-dark text-golden-dark hover:bg-golden-dark hover:text-white"
                    >
                        {isCreating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Plus className="w-4 h-4 mr-2" />}
                        Add Slide
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {slides.map((slide, index) => (
                    <Card key={slide.slider_id || index} className="border-gray-200 overflow-hidden">
                        <CardHeader className="bg-gray-50/50 border-b py-3 px-4 flex flex-row items-center justify-between space-y-0">
                            <div className="flex items-center gap-3">
                                <div className="bg-golden-dark text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                                    {index + 1}
                                </div>
                                <CardTitle className="text-base font-semibold text-[#073954]">
                                    Slide {index + 1}
                                </CardTitle>
                            </div>
                            <div className="flex items-center gap-2">
                                <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    onClick={() => handleSaveSlide(index)}
                                    disabled={isUpdating}
                                    className="text-golden-dark font-medium"
                                >
                                    <Save className="w-4 h-4 mr-1" />
                                    Save Slide
                                </Button>
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    onClick={() => slide.slider_id && handleRemoveSlide(slide.slider_id)} 
                                    disabled={isDeleting}
                                    className="text-destructive h-8 w-8"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Left Column: Content */}
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <Label>Title</Label>
                                        <Input
                                            value={slide.title || ""}
                                            onChange={(e) => handleUpdateSlideField(index, 'title', e.target.value)}
                                            placeholder="Enter slide title"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Description</Label>
                                        <Textarea
                                            rows={5}
                                            value={slide.description || ""}
                                            onChange={(e) => handleUpdateSlideField(index, 'description', e.target.value)}
                                            placeholder="Enter slide description"
                                        />
                                    </div>
                                </div>

                                {/* Right Column: Media */}
                                <div className="space-y-6">
                                    <ImageUploadField
                                        id={`slide-image-${index}`}
                                        label="Slide Image"
                                        value={slide.attachment_id ? [slide.attachment_id] : []}
                                        onChange={(ids) => handleUpdateSlideField(index, 'attachment_id', ids[0] || "")}
                                        category="profile"
                                    />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}

                {slides.length === 0 && (
                    <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                        <p className="text-gray-500">No slides found. Click "Add Slide" to create one.</p>
                    </div>
                )}
            </div>
        </div>
    );
}