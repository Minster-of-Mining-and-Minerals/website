"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, Plus, Trash2, Loader2 } from "lucide-react";
import {
    useGetPartnersQuery,
    useCreatePartnerMutation,
    useUpdatePartnerMutation,
} from "@/redux/api/partnerApi";
import { ImageUploadField } from "@/components/common/ImageUploadField";
import { toast } from "sonner";
import { Partner } from "@/redux/types/partner";

export default function AdminPartnerManager() {
    const { data: partners, isLoading: isFetching } = useGetPartnersQuery();
    const [createPartner, { isLoading: isCreating }] = useCreatePartnerMutation();
    const [updatePartner, { isLoading: isUpdating }] = useUpdatePartnerMutation();

    const [partnerData, setPartnerData] = useState({
        title: "Our Partners",
        description: "",
        attachments: [] as { attachment_id: string; category: string }[]
    });

    const existingPartner = partners && partners.length > 0 ? partners[0] : null;

    useEffect(() => {
        if (existingPartner) {
            setPartnerData({
                title: existingPartner.title || "Our Partners",
                description: existingPartner.description || "",
                attachments: existingPartner.attachments?.map((a: any) => ({
                    attachment_id: a.attachment_id || a.attachment?.attachment_id,
                    category: a.category || "logo"
                })) || []
            });
        }
    }, [existingPartner]);

    const handleSave = async () => {
        try {
            if (existingPartner) {
                await updatePartner({
                    id: existingPartner.partner_id,
                    data: partnerData
                }).unwrap();
                toast.success("Partners section updated!");
            } else {
                await createPartner(partnerData).unwrap();
                toast.success("Partners section created!");
            }
        } catch (error) {
            console.error("Failed to save partners data", error);
            toast.error("Failed to save changes.");
        }
    };

    const addLogo = () => {
        setPartnerData({
            ...partnerData,
            attachments: [...partnerData.attachments, { attachment_id: "", category: "logo" }]
        });
    };

    const updateLogo = (index: number, attachmentId: string) => {
        const newAttachments = [...partnerData.attachments];
        newAttachments[index] = { ...newAttachments[index], attachment_id: attachmentId };
        setPartnerData({ ...partnerData, attachments: newAttachments });
    };

    const removeLogo = (index: number) => {
        setPartnerData({
            ...partnerData,
            attachments: partnerData.attachments.filter((_, i) => i !== index)
        });
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
                    <h2 className="text-lg font-bold text-[#073954]">Partners Management</h2>
                    <p className="text-sm text-gray-500">Manage partner logos and the section header.</p>
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
                <CardHeader className="bg-gray-50/30 border-b">
                    <CardTitle className="text-base font-semibold text-[#073954]">Section Header</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                    <div className="space-y-2">
                        <Label>Section Title</Label>
                        <Input
                            value={partnerData.title}
                            onChange={(e) => setPartnerData({ ...partnerData, title: e.target.value })}
                            placeholder="Our Partners"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Section Description</Label>
                        <Input
                            value={partnerData.description}
                            onChange={(e) => setPartnerData({ ...partnerData, description: e.target.value })}
                            placeholder="Enter section description"
                        />
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <h3 className="text-base font-bold text-[#073954]">Partner Logos</h3>
                    <Button variant="outline" size="sm" onClick={addLogo} className="border-golden-dark text-golden-dark h-8">
                        <Plus className="w-4 h-4 mr-2" />
                        Add Logo
                    </Button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {partnerData.attachments.map((logo, index) => (
                        <Card key={index} className="border-gray-100 shadow-none bg-gray-50/20">
                            <CardContent className="p-4 space-y-4">
                                <div className="flex flex-col items-center">
                                    <div className="w-full relative">
                                        <ImageUploadField
                                            id={`partner-logo-${index}`}
                                            label={`Partner Logo ${index + 1}`}
                                            value={logo.attachment_id ? [logo.attachment_id] : []}
                                            onChange={(ids) => updateLogo(index, ids[0] || "")}
                                            category="profile"
                                            className="w-full"
                                        />
                                        <Button 
                                            variant="ghost" 
                                            size="icon" 
                                            onClick={() => removeLogo(index)} 
                                            className="text-destructive h-8 w-8 absolute top-0 right-0"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                    {partnerData.attachments.length === 0 && (
                        <p className="col-span-full text-center text-gray-500 py-10 border-2 border-dashed rounded-xl">No partner logos added yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

