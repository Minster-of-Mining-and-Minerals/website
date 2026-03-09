"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Save, Image as ImageIcon } from "lucide-react";

interface CardData {
    title: string;
    description: string;
    image: string;
    buttonText: string;
}

const DEFAULT_CARD_DATA: CardData = {
    title: "One of the Best Performing Economies in Ethiopia",
    description: "Ethiopia has seen astonishing growth in the last ten years. Growing at an average rate of 9.7% between 2009 and 2019, Ethiopia has consistently been one of Africa’s top performing economies.",
    image: "/home-5.jpg",
    buttonText: "Learn More",
};

export default function AdminCardManager() {
    const [cardData, setCardData] = useState<CardData>(DEFAULT_CARD_DATA);

    useEffect(() => {
        const savedData = localStorage.getItem("home_card_data");
        if (savedData) {
            try {
                setCardData(JSON.parse(savedData));
            } catch (e) {
                console.error("Failed to parse card data", e);
            }
        }
    }, []);

    const handleSave = () => {
        localStorage.setItem("home_card_data", JSON.stringify(cardData));
        alert("Card data saved locally!");
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-4 rounded-lg border shadow-sm">
                <div>
                    <h2 className="text-lg font-bold text-[#073954]">Card Section Management</h2>
                    <p className="text-sm text-gray-500">Edit the featured performance card content.</p>
                </div>
                <Button onClick={handleSave} className="bg-golden-dark hover:bg-golden-darkHover">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                </Button>
            </div>

            <Card className="border-gray-200">
                <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Content Fields */}
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>Card Title</Label>
                                <Input
                                    value={cardData.title}
                                    onChange={(e) => setCardData({ ...cardData, title: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Description</Label>
                                <Textarea
                                    rows={5}
                                    value={cardData.description}
                                    onChange={(e) => setCardData({ ...cardData, description: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Button Text</Label>
                                <Input
                                    value={cardData.buttonText}
                                    onChange={(e) => setCardData({ ...cardData, buttonText: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Image Fields */}
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label className="flex items-center gap-2">
                                    <ImageIcon className="w-4 h-4 text-gray-400" /> Background Image URL
                                </Label>
                                <Input
                                    value={cardData.image}
                                    onChange={(e) => setCardData({ ...cardData, image: e.target.value })}
                                />
                            </div>
                            {cardData.image && (
                                <div className="relative aspect-video rounded-lg overflow-hidden border">
                                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent z-10 p-6 flex flex-col justify-end">
                                        <p className="text-golden-classic font-bold text-xs truncate">{cardData.title}</p>
                                    </div>
                                    <img src={cardData.image} alt="Preview" className="object-cover w-full h-full" />
                                </div>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
