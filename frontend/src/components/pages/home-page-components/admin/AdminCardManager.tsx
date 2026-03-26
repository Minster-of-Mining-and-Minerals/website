"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-4 rounded-lg border shadow-sm">
                <div>
                    <h2 className="text-lg font-bold text-[#073954]">Card Section Management</h2>
                    <p className="text-sm text-gray-500">Edit the featured performance card content.</p>
                </div>
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
                                    placeholder="Enter card title"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Description</Label>
                                <Textarea
                                    rows={5}
                                    value={cardData.description}
                                    onChange={(e) => setCardData({ ...cardData, description: e.target.value })}
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
                            </div>
                        </div>

                        {/* Image Fields */}
                        <div className="space-y-4">
                            <ImageUploadField
                                id="card-image"
                                label="Background Image"
                                value={cardData.attachment_id ? [cardData.attachment_id] : []}
                                onChange={(ids) => setCardData({ ...cardData, attachment_id: ids[0] || "" })}
                                category="profile" // Using profile as a generic category if specific one not available
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

