"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Plus,
    Trash2,
    Save,
    Loader2
} from "lucide-react";
import { LucideIconPicker } from "@/components/common/LucideIconPicker";
import {
    useGetSocialMediasQuery,
    useCreateSocialMediaMutation,
    useUpdateSocialMediaMutation,
    useDeleteSocialMediaMutation,
} from "@/redux/api/socialMediaApi";
import { SocialMedia } from "@/redux/types/socialMedia";
import { toast } from "sonner";

export interface SocialLink {
    id: number; // temporary id for UI
    social_media_id?: string; // actual API id
    name: string;
    icon: string;
    url: string;
}

interface FooterSocialMediaProps {
    onSave?: (links: SocialLink[]) => void;
}

export default function FooterSocialMedia({
    onSave
}: FooterSocialMediaProps) {
    // RTK Query hooks
    const { data: apiLinks = [], isLoading, isError, refetch } = useGetSocialMediasQuery();
    const [createSocialMedia, { isLoading: isCreating }] = useCreateSocialMediaMutation();
    const [updateSocialMedia, { isLoading: isUpdating }] = useUpdateSocialMediaMutation();
    const [deleteSocialMedia, { isLoading: isDeleting }] = useDeleteSocialMediaMutation();

    // Local state for UI management
    const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
    const [isSaving, setIsSaving] = useState(false);
    const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());

    // Transform API data to local format when data is fetched
    useEffect(() => {
        if (apiLinks.length > 0) {
            const transformedLinks = apiLinks.map((link: SocialMedia, index: number) => ({
                id: index + 1, // temporary UI id
                social_media_id: link.social_media_id,
                name: link.platform_name,
                icon: link.icon,
                url: link.url,
            }));
            setSocialLinks(transformedLinks);
        } else {
            setSocialLinks([]);
        }
    }, [apiLinks]);

    const addSocialLink = () => {
        const newLink: SocialLink = {
            id: Date.now(), // temporary UI id
            name: "",
            icon: "Facebook", // default icon
            url: "",
        };
        setSocialLinks([...socialLinks, newLink]);
    };

    const removeSocialLink = async (link: SocialLink) => {
        // If it's an existing link from API, delete it from backend
        if (link.social_media_id) {
            try {
                setDeletingIds(prev => new Set(prev).add(link.social_media_id!));
                await deleteSocialMedia(link.social_media_id).unwrap();
                toast.success("Social link deleted successfully");
                setSocialLinks(socialLinks.filter((l) => l.id !== link.id));
            } catch (error) {
                console.error("Failed to delete social link:", error);
                toast.error("Failed to delete social link");
            } finally {
                setDeletingIds(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(link.social_media_id!);
                    return newSet;
                });
            }
        } else {
            // If it's a new unsaved link, just remove from UI
            setSocialLinks(socialLinks.filter((l) => l.id !== link.id));
        }
    };

    const updateSocialLink = (id: number, field: string, value: string) => {
        setSocialLinks(
            socialLinks.map((link) =>
                link.id === id ? { ...link, [field]: value } : link
            )
        );
    };

    const handleSave = async () => {
        setIsSaving(true);
        const newLinks: SocialLink[] = [];
        const updatedLinks: SocialLink[] = [];

        // Separate new links from existing ones
        socialLinks.forEach(link => {
            if (link.social_media_id) {
                updatedLinks.push(link);
            } else {
                newLinks.push(link);
            }
        });

        try {
            // Create new links
            for (const link of newLinks) {
                if (link.name && link.url) { // Only create if name and url are provided
                    try {
                        await createSocialMedia({
                            platform_name: link.name,
                            icon: link.icon || "Facebook",
                            url: link.url,
                        }).unwrap();
                    } catch (error) {
                        console.error("Failed to create social link:", error);
                        toast.error(`Failed to create ${link.name} link`);
                    }
                }
            }

            // Update existing links
            for (const link of updatedLinks) {
                if (link.social_media_id) {
                    // Check if any field changed (you might want to implement proper change tracking)
                    const originalLink = apiLinks.find(l => l.social_media_id === link.social_media_id);
                    if (originalLink && (
                        originalLink.platform_name !== link.name ||
                        originalLink.icon !== link.icon ||
                        originalLink.url !== link.url
                    )) {
                        try {
                            await updateSocialMedia({
                                id: link.social_media_id,
                                data: {
                                    platform_name: link.name,
                                    icon: link.icon,
                                    url: link.url,
                                }
                            }).unwrap();
                        } catch (error) {
                            console.error("Failed to update social link:", error);
                            toast.error(`Failed to update ${link.name} link`);
                        }
                    }
                }
            }

            // Refresh data from API
            await refetch();
            toast.success("Social links saved successfully");

            if (onSave) {
                onSave(socialLinks);
            }
        } catch (error) {
            console.error("Error saving social links:", error);
            toast.error("Failed to save social links");
        } finally {
            setIsSaving(false);
        }
    };

    const isLoading_ = isLoading || isCreating || isUpdating || isSaving;

    if (isError) {
        return (
            <Card className="shadow-sm border-gray-200">
                <CardContent className="p-6">
                    <div className="text-center text-red-500">
                        Error loading social media links. Please try again.
                    </div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="shadow-sm border-gray-200">
            <CardHeader className="bg-gray-50/50 border-b">
                <div className="flex justify-between items-center">
                    <CardTitle className="text-xl font-bold text-[#073954]">
                        Social Media Links
                    </CardTitle>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={addSocialLink}
                            className="border-golden-dark text-golden-dark hover:bg-golden-dark/10"
                            disabled={isLoading_}
                        >
                            <Plus className="w-4 h-4 mr-2" />
                            Add Social Link
                        </Button>
                        <Button
                            onClick={handleSave}
                            size="sm"
                            className="bg-golden-dark hover:bg-golden-darkHover"
                            disabled={isLoading_}
                        >
                            {isSaving ? (
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            ) : (
                                <Save className="w-4 h-4 mr-2" />
                            )}
                            Save
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
                {isLoading ? (
                    <div className="flex justify-center items-center py-8">
                        <Loader2 className="w-8 h-8 animate-spin text-golden-dark" />
                    </div>
                ) : socialLinks.length === 0 ? (
                    <p className="text-center text-gray-500 py-4">No social links added yet.</p>
                ) : (
                    socialLinks.map((link) => (
                        <div key={link.id} className="flex flex-col md:flex-row gap-4 items-start md:items-end border-b pb-4 last:border-0 last:pb-0">
                            <div className="w-full md:w-40 space-y-2">
                                <Label>Icon</Label>
                                <LucideIconPicker
                                    value={link.icon}
                                    onChange={(iconName) => updateSocialLink(link.id, "icon", iconName)}
                                />
                            </div>
                            <div className="flex-1 w-full space-y-2">
                                <Label>Platform Name</Label>
                                <Input
                                    value={link.name}
                                    onChange={(e) => updateSocialLink(link.id, "name", e.target.value)}
                                    placeholder="e.g. Facebook"
                                    disabled={isLoading_}
                                />
                            </div>
                            <div className="flex-[2] w-full space-y-2">
                                <Label>URL Link</Label>
                                <Input
                                    value={link.url}
                                    onChange={(e) => updateSocialLink(link.id, "url", e.target.value)}
                                    placeholder="https://..."
                                    disabled={isLoading_}
                                />
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeSocialLink(link)}
                                disabled={isLoading_ || (link.social_media_id ? deletingIds.has(link.social_media_id) : false)}
                                className="text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0"
                            >
                                {link.social_media_id && deletingIds.has(link.social_media_id) ? (
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                    <Trash2 className="w-4 h-4" />
                                )}
                            </Button>
                        </div>
                    ))
                )}
            </CardContent>
        </Card>
    );
}