"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
    Save,
    Plus,
    Trash2,
    ChevronDown,
    ChevronUp,
    GripVertical,
    Image as ImageIcon
} from "lucide-react";

interface LocalizedText {
    en: string;
    am: string;
}

interface Slide {
    id: number;
    title: LocalizedText;
    description: LocalizedText;
    image: string;
    bg: string;
}

const DEFAULT_SLIDES: Slide[] = [
    {
        id: 1,
        title: {
            en: "A New Horizon of Opportunity",
            am: "ኢትዮጵያ፡ የአዲስ ዕድል ገፅታ",
        },
        description: {
            en: "Welcome to the Ministry of Mines, your gateway to Ethiopia’s abundant natural resources and investment opportunities.",
            am: "ወደ የማዕድን ሚኒስቴር እንኳን ደህና መጡ፤ እዚህ በኢትዮጵያ ያሉ በጣም ባለሃብቶች ሀብቶችን ለማግኘት ዕድሎች ይገኛሉ።",
        },
        image: "/home-1.jpg",
        bg: "bg-base-200/60",
    },
    {
        id: 2,
        title: {
            en: "Invest with Confidence",
            am: "በእምነት ያስገቡ",
        },
        description: {
            en: "The MoM guides investors through licenses, legislation, and geodata to make your investment journey seamless.",
            am: "ሚኒስቴሩ በፈቃድ፣ ሕግና ጂዮ-ዳታ አገልግሎት በመስጠት የተጠቃሚ የሆነ የስራ ሂደት ይሰጣል።",
        },
        image: "/home-2.jpg",
        bg: "bg-base-200/80",
    },
];

export default function AdminHeroManager() {
    const [slides, setSlides] = useState<Slide[]>(DEFAULT_SLIDES);

    useEffect(() => {
        const savedData = localStorage.getItem("home_hero_slides");
        if (savedData) {
            try {
                setSlides(JSON.parse(savedData));
            } catch (e) {
                console.error("Failed to parse hero slides", e);
            }
        }
    }, []);

    const handleSave = () => {
        localStorage.setItem("home_hero_slides", JSON.stringify(slides));
        alert("Hero slides saved locally!");
    };

    const addSlide = () => {
        const newSlide: Slide = {
            id: Date.now(),
            title: { en: "New Slide Title", am: "አዲስ ርዕስ" },
            description: { en: "New slide description goes here.", am: "አዲስ መግለጫ" },
            image: "/home-1.jpg",
            bg: "bg-base-200/60",
        };
        setSlides([...slides, newSlide]);
    };

    const removeSlide = (id: number) => {
        setSlides(slides.filter((s) => s.id !== id));
    };

    const updateSlide = (id: number, field: keyof Slide | 'title_en' | 'title_am' | 'desc_en' | 'desc_am', value: string) => {
        setSlides(slides.map((s) => {
            if (s.id === id) {
                if (field === 'title_en') return { ...s, title: { ...s.title, en: value } };
                if (field === 'title_am') return { ...s, title: { ...s.title, am: value } };
                if (field === 'desc_en') return { ...s, description: { ...s.description, en: value } };
                if (field === 'desc_am') return { ...s, description: { ...s.description, am: value } };
                return { ...s, [field]: value };
            }
            return s;
        }));
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-4 rounded-lg border shadow-sm">
                <div>
                    <h2 className="text-lg font-bold text-[#073954]">Hero Slider Management</h2>
                    <p className="text-sm text-gray-500">Manage the carousel slides on the home page.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" onClick={addSlide} className="border-golden-dark text-golden-dark">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Slide
                    </Button>
                    <Button onClick={handleSave} className="bg-golden-dark hover:bg-golden-darkHover">
                        <Save className="w-4 h-4 mr-2" />
                        Save Changes
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {slides.map((slide, index) => (
                    <Card key={slide.id} className="border-gray-200 overflow-hidden">
                        <CardHeader className="bg-gray-50/50 border-b py-3 px-4 flex flex-row items-center justify-between space-y-0">
                            <div className="flex items-center gap-3">
                                <div className="bg-golden-dark text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                                    {index + 1}
                                </div>
                                <CardTitle className="text-base font-semibold text-[#073954]">
                                    Slide {index + 1}
                                </CardTitle>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => removeSlide(slide.id)} className="text-destructive h-8 w-8">
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Left Column: Localized Content */}
                                <div className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="h-4 w-1 bg-golden-dark rounded-full"></div>
                                            <h3 className="text-sm font-bold uppercase text-gray-500">English Content</h3>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Title (EN)</Label>
                                            <Input
                                                value={slide.title.en}
                                                onChange={(e) => updateSlide(slide.id, 'title_en', e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Description (EN)</Label>
                                            <Textarea
                                                rows={3}
                                                value={slide.description.en}
                                                onChange={(e) => updateSlide(slide.id, 'desc_en', e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className="h-4 w-1 bg-golden-dark rounded-full"></div>
                                            <h3 className="text-sm font-bold uppercase text-gray-500">Amharic Content</h3>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Title (AM)</Label>
                                            <Input
                                                value={slide.title.am}
                                                onChange={(e) => updateSlide(slide.id, 'title_am', e.target.value)}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Description (AM)</Label>
                                            <Textarea
                                                rows={3}
                                                value={slide.description.am}
                                                onChange={(e) => updateSlide(slide.id, 'desc_am', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column: Media & Settings */}
                                <div className="space-y-6">
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="h-4 w-1 bg-golden-dark rounded-full"></div>
                                        <h3 className="text-sm font-bold uppercase text-gray-500">Media & Styling</h3>
                                    </div>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label className="flex items-center gap-2">
                                                <ImageIcon className="w-4 h-4 text-gray-400" /> Image URL
                                            </Label>
                                            <Input
                                                value={slide.image}
                                                onChange={(e) => updateSlide(slide.id, 'image', e.target.value)}
                                            />
                                        </div>
                                        {slide.image && (
                                            <div className="relative aspect-video rounded-lg overflow-hidden border">
                                                <img src={slide.image} alt="Preview" className="object-cover w-full h-full" />
                                            </div>
                                        )}
                                        <div className="space-y-2">
                                            <Label>Background Overlay Class</Label>
                                            <Input
                                                value={slide.bg}
                                                onChange={(e) => updateSlide(slide.id, 'bg', e.target.value)}
                                                placeholder="e.g. bg-base-200/60"
                                            />
                                        </div>
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
