"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
<<<<<<< HEAD
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Save, Loader2 } from "lucide-react";
import { 
    useGetCardsQuery, 
    useUpdateCardMutation, 
    useCreateCardMutation 
} from "@/redux/api/cardApi";
import { ImageUploadField } from "@/components/common/ImageUploadField";
import { toast } from "sonner";

export default function AdminCardManager() {
    const { data: cards, isLoading: isFetching } = useGetCardsQuery();
    const [updateCard, { isLoading: isUpdating }] = useUpdateCardMutation();
    const [createCard, { isLoading: isCreating }] = useCreateCardMutation();

    const [cardData, setCardData] = useState({
        title: "",
        description: "",
        button_name: "",
        button_url: "",
        attachment_id: ""
    });

    const existingCard = cards && cards.length > 0 ? cards[0] : null;

    useEffect(() => {
        if (existingCard) {
            setCardData({
                title: existingCard.title || "",
                description: existingCard.description || "",
                button_name: existingCard.button_name || "",
                button_url: existingCard.button_url || "",
                attachment_id: existingCard.attachment_id || ""
            });
        }
    }, [existingCard]);

    const handleSave = async () => {
        try {
            if (existingCard) {
                await updateCard({
                    id: existingCard.card_id,
                    data: cardData
                }).unwrap();
                toast.success("Card updated successfully!");
            } else {
                await createCard(cardData).unwrap();
                toast.success("Card created successfully!");
            }
        } catch (error) {
            console.error("Failed to save card data", error);
            toast.error("Failed to save card data. Please try again.");
        }
    };

    if (isFetching) {
        return (
            <div className="flex items-center justify-center p-12">
                <Loader2 className="w-8 h-8 animate-spin text-golden-dark" />
            </div>
        );
    }
=======
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
>>>>>>> c6b5a12ca2fb87bcbe1c0e8702430b6289687674

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-4 rounded-lg border shadow-sm">
                <div>
                    <h2 className="text-lg font-bold text-[#073954]">Card Section Management</h2>
                    <p className="text-sm text-gray-500">Edit the featured performance card content.</p>
                </div>
<<<<<<< HEAD
                <Button 
                    onClick={handleSave} 
                    disabled={isUpdating || isCreating}
                    className="bg-golden-dark hover:bg-golden-darkHover"
                >
                    {isUpdating || isCreating ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                        <Save className="w-4 h-4 mr-2" />
                    )}
=======
                <Button onClick={handleSave} className="bg-golden-dark hover:bg-golden-darkHover">
                    <Save className="w-4 h-4 mr-2" />
>>>>>>> c6b5a12ca2fb87bcbe1c0e8702430b6289687674
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
<<<<<<< HEAD
                                    placeholder="Enter card title"
=======
>>>>>>> c6b5a12ca2fb87bcbe1c0e8702430b6289687674
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Description</Label>
                                <Textarea
                                    rows={5}
                                    value={cardData.description}
                                    onChange={(e) => setCardData({ ...cardData, description: e.target.value })}
<<<<<<< HEAD
                                    placeholder="Enter description"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Button Text</Label>
                                    <Input
                                        value={cardData.button_name}
                                        onChange={(e) => setCardData({ ...cardData, button_name: e.target.value })}
                                        placeholder="Learn More"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Button URL</Label>
                                    <Input
                                        value={cardData.button_url}
                                        onChange={(e) => setCardData({ ...cardData, button_url: e.target.value })}
                                        placeholder="/about"
                                    />
                                </div>
=======
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Button Text</Label>
                                <Input
                                    value={cardData.buttonText}
                                    onChange={(e) => setCardData({ ...cardData, buttonText: e.target.value })}
                                />
>>>>>>> c6b5a12ca2fb87bcbe1c0e8702430b6289687674
                            </div>
                        </div>

                        {/* Image Fields */}
                        <div className="space-y-4">
<<<<<<< HEAD
                            <ImageUploadField
                                id="card-image"
                                label="Background Image"
                                value={cardData.attachment_id ? [cardData.attachment_id] : []}
                                onChange={(ids) => setCardData({ ...cardData, attachment_id: ids[0] || "" })}
                                category="profile" // Using profile as a generic category if specific one not available
                            />
=======
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
>>>>>>> c6b5a12ca2fb87bcbe1c0e8702430b6289687674
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
<<<<<<< HEAD

=======
>>>>>>> c6b5a12ca2fb87bcbe1c0e8702430b6289687674
