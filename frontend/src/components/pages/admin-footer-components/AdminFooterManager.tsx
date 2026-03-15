"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, Plus, Trash2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import FooterSocialMedia from "../contact-page-components/FooterSocialMedia";

import {
    useGetFootersQuery,
    useCreateFooterMutation,
    useUpdateFooterMutation,
} from "@/redux/api/footerApi";
import { ImageUploadField } from "@/components/common/ImageUploadField";

interface FooterLink {
    id: string;
    label: string;
    href: string;
}

interface FooterSection {
    id: string;
    title: string;
    links: FooterLink[];
    footer_section_id?: string; // Add this to track the actual DB ID
}

export default function AdminFooterManager() {
    const { data: footers, isLoading } = useGetFootersQuery();
    const [createFooter] = useCreateFooterMutation();
    const [updateFooter] = useUpdateFooterMutation();
    const [deleteFooterSection] = useDeleteFooterSectionMutation(); // Add this
    const [attachmentId, setAttachmentId] = useState<string[]>([]);

    const [footerData, setFooterData] = useState({
        footer_id: "",
        title: "Ministry of Mines",
        text: `© ${new Date().getFullYear()} Ministry of Mines – Ethiopia. All rights reserved.`,
        content: "",
        attachment_id: "",
        sections: [] as FooterSection[],
    });

    const [activeTab, setActiveTab] = useState("");

    /* -------------------------
    LOAD DATA FROM API
    --------------------------*/

    useEffect(() => {
        if (footers && footers.length > 0 && !isLoading) {
            const f = footers[0];

            const mappedSections =
                f.sections?.map((s: any) => ({
                    id: crypto.randomUUID(), // Local UI ID
                    footer_section_id: s.footer_section_id, // Store the actual DB ID
                    title: s.section_name,
                    links:
                        s.links?.map((l: any) => ({
                            id: crypto.randomUUID(),
                            label: l.label,
                            href: l.url,
                        })) ?? [],
                })) ?? [];

            setFooterData({
                footer_id: f.footer_id,
                title: f.title || "Ministry of Mines",
                text: f.text || `© ${new Date().getFullYear()} Ministry of Mines – Ethiopia. All rights reserved.`,
                content: f.content || "",
                attachment_id: f.attachment_id || "",
                sections: mappedSections,
            });

            if (f.attachment_id) {
                setAttachmentId([f.attachment_id]);
            }

            if (mappedSections.length > 0) {
                setActiveTab(mappedSections[0].id);
            }
        }
    }, [footers, isLoading]);

    /* -------------------------
    SAVE
    --------------------------*/

    const handleSave = async () => {
        try {
            const payload: any = {
                title: footerData.title,
                text: footerData.text,
                sections: footerData.sections.map((s) => ({
                    // Include footer_section_id if it exists (for updating existing sections)
                    ...(s.footer_section_id && { footer_section_id: s.footer_section_id }),
                    section_name: s.title,
                    links: s.links.map((l) => ({
                        label: l.label,
                        url: l.href,
                    })),
                })),
            };

            if (footerData.content) {
                payload.content = footerData.content;
            }

            if (attachmentId.length > 0) {
                payload.attachment_id = attachmentId[0];
            }

            let result;
            if (footerData.footer_id) {
                result = await updateFooter({
                    id: footerData.footer_id,
                    data: payload,
                }).unwrap();
            } else {
                result = await createFooter(payload).unwrap();
            }

            if (result) {
                alert("Footer saved successfully");
            }
        } catch (error) {
            console.error("Error saving footer:", error);
            alert("Failed to save footer. Please try again.");
        }
    };

    /* -------------------------
    UPDATE TITLE
    --------------------------*/

    const updateTitle = (value: string) => {
        setFooterData({
            ...footerData,
            title: value,
        });
    };

    /* -------------------------
    SECTION MANAGEMENT
    --------------------------*/

    const addSection = () => {
        const newSection = {
            id: crypto.randomUUID(),
            title: "New Section",
            links: [],
            // No footer_section_id for new sections
        };

        setFooterData({
            ...footerData,
            sections: [...footerData.sections, newSection],
        });

        setActiveTab(newSection.id);
    };

    const removeSection = async (sectionId: string) => {
        const section = footerData.sections.find(s => s.id === sectionId);

        // If section has a footer_section_id, delete from backend
        if (section?.footer_section_id) {
            try {
                await deleteFooterSection(section.footer_section_id).unwrap();
            } catch (error) {
                console.error("Error deleting section:", error);
                alert("Failed to delete section from database");
                return; // Don't remove from UI if backend delete fails
            }
        }

        // Remove from local state
        setFooterData({
            ...footerData,
            sections: footerData.sections.filter((s) => s.id !== sectionId),
        });

        // Update active tab
        if (activeTab === sectionId) {
            const remainingSections = footerData.sections.filter(s => s.id !== sectionId);
            if (remainingSections.length > 0) {
                setActiveTab(remainingSections[0].id);
            } else {
                setActiveTab("social");
            }
        }
    };

    const updateSectionTitle = (id: string, title: string) => {
        setFooterData({
            ...footerData,
            sections: footerData.sections.map((s) =>
                s.id === id ? { ...s, title } : s
            ),
        });
    };

    /* -------------------------
    LINK MANAGEMENT
    --------------------------*/

    const addLink = (sectionId: string) => {
        setFooterData({
            ...footerData,
            sections: footerData.sections.map((s) => {
                if (s.id === sectionId) {
                    return {
                        ...s,
                        links: [
                            ...s.links,
                            {
                                id: crypto.randomUUID(),
                                label: "New Link",
                                href: "#",
                            },
                        ],
                    };
                }
                return s;
            }),
        });
    };

    const removeLink = (sectionId: string, linkId: string) => {
        setFooterData({
            ...footerData,
            sections: footerData.sections.map((s) => {
                if (s.id === sectionId) {
                    return {
                        ...s,
                        links: s.links.filter((l) => l.id !== linkId),
                    };
                }
                return s;
            }),
        });
    };

    const updateLink = (
        sectionId: string,
        linkId: string,
        field: keyof FooterLink,
        value: string
    ) => {
        setFooterData({
            ...footerData,
            sections: footerData.sections.map((s) => {
                if (s.id === sectionId) {
                    return {
                        ...s,
                        links: s.links.map((l) =>
                            l.id === linkId ? { ...l, [field]: value } : l
                        ),
                    };
                }
                return s;
            }),
        });
    };

    /* -------------------------
    UI
    --------------------------*/

    return (
        <div className="space-y-6">
            <Card className="shadow-sm border-gray-200">
                <CardHeader className="bg-gray-50/50 border-b">
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-xl font-bold text-[#073954]">
                            Footer Information
                        </CardTitle>

                        <div className="flex gap-3">
                            <Button
                                onClick={addSection}
                                variant="outline"
                                className="border-golden-dark text-golden-dark"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Add Section
                            </Button>

                            <Button
                                onClick={handleSave}
                                className="bg-golden-dark hover:bg-golden-darkHover"
                            >
                                <Save className="w-4 h-4 mr-2" />
                                Save Changes
                            </Button>
                        </div>
                    </div>
                </CardHeader>

                <CardContent className="p-6 space-y-6">
                    {/* MAIN INFO */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b pb-6">
                        <div className="space-y-2">
                            <Label>Ministry Title</Label>
                            <Input
                                value={footerData.title}
                                onChange={(e) => updateTitle(e.target.value)}
                                placeholder="Enter ministry title"
                            />
                        </div>

                        <div className="space-y-2">
                            <ImageUploadField
                                id="footer-logo"
                                label="Logo"
                                value={attachmentId}
                                onChange={(ids) => setAttachmentId(ids)}
                                category="footer"
                            />
                        </div>

                        <div className="space-y-2 md:col-span-2">
                            <Label>Additional Content (Optional)</Label>
                            <Input
                                value={footerData.content || ""}
                                onChange={(e) => setFooterData({
                                    ...footerData,
                                    content: e.target.value
                                })}
                                placeholder="Enter additional content"
                            />
                        </div>
                    </div>

                    {/* TABS */}
                    <Tabs value={activeTab || "social"} onValueChange={setActiveTab}>
                        <TabsList className="flex flex-wrap gap-2 mb-6 bg-gray-100/50 p-1">
                            {footerData.sections.map((section) => (
                                <TabsTrigger key={section.id} value={section.id}>
                                    {section.title} ({section.links.length})
                                </TabsTrigger>
                            ))}
                            <TabsTrigger value="social">Social Links</TabsTrigger>
                        </TabsList>

                        {footerData.sections.map((section) => (
                            <TabsContent key={section.id} value={section.id}>
                                <SectionEditor
                                    section={section}
                                    updateTitle={(title) => updateSectionTitle(section.id, title)}
                                    addLink={() => addLink(section.id)}
                                    updateLink={(linkId, field, value) =>
                                        updateLink(section.id, linkId, field, value)
                                    }
                                    removeLink={(linkId) => removeLink(section.id, linkId)}
                                    removeSection={() => removeSection(section.id)}
                                />
                            </TabsContent>
                        ))}

                        <TabsContent value="social">
                            <FooterSocialMedia />
                        </TabsContent>
                    </Tabs>

                    {footerData.sections.length === 0 && (
                        <div className="text-center py-8 border rounded-lg bg-gray-50">
                            <p className="text-gray-500 mb-4">No sections added yet</p>
                            <Button
                                onClick={addSection}
                                variant="outline"
                                className="border-golden-dark text-golden-dark"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Add Your First Section
                            </Button>
                        </div>
                    )}

                    {/* COPYRIGHT TEXT */}
                    <div className="space-y-2 pt-4 border-t">
                        <Label>Copyright Text</Label>
                        <Input
                            value={footerData.text}
                            onChange={(e) =>
                                setFooterData({
                                    ...footerData,
                                    text: e.target.value,
                                })
                            }
                            placeholder="Enter copyright text"
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

/* -------------------------
SECTION EDITOR COMPONENT
--------------------------*/

interface SectionEditorProps {
    section: FooterSection;
    updateTitle: (title: string) => void;
    addLink: () => void;
    updateLink: (linkId: string, field: keyof FooterLink, value: string) => void;
    removeLink: (linkId: string) => void;
    removeSection: () => void;
}

function SectionEditor({
    section,
    updateTitle,
    addLink,
    updateLink,
    removeLink,
    removeSection,
}: SectionEditorProps) {
    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center px-1">
                <div className="flex items-center gap-2 flex-1">
                    <Label className="text-xs text-gray-500 uppercase font-bold">
                        Section Name:
                    </Label>

                    <Input
                        className="max-w-[200px] h-8 font-semibold text-[#073954]"
                        value={section.title}
                        onChange={(e) => updateTitle(e.target.value)}
                        placeholder="Enter section name"
                    />
                </div>

                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={addLink}
                        className="border-golden-dark text-golden-dark h-8"
                    >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Link
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={removeSection}
                        className="text-destructive hover:text-destructive/90"
                    >
                        <Trash2 className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            <Card className="border-gray-100 shadow-none bg-gray-50/20">
                <CardContent className="p-4 space-y-3">
                    {section.links.map((link) => (
                        <div key={link.id} className="flex gap-4 items-start">
                            <div className="flex-1 space-y-1">
                                <Label className="text-xs">Label</Label>
                                <Input
                                    className="h-8"
                                    value={link.label}
                                    onChange={(e) =>
                                        updateLink(link.id, "label", e.target.value)
                                    }
                                    placeholder="Link label"
                                />
                            </div>

                            <div className="flex-1 space-y-1">
                                <Label className="text-xs">URL</Label>
                                <Input
                                    className="h-8"
                                    value={link.href}
                                    onChange={(e) =>
                                        updateLink(link.id, "href", e.target.value)
                                    }
                                    placeholder="/page-url or https://..."
                                />
                            </div>

                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeLink(link.id)}
                                className="h-8 w-8 text-destructive hover:text-destructive/90 mt-5"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}

                    {section.links.length === 0 && (
                        <div className="text-center py-6">
                            <p className="text-gray-500 text-sm mb-3">
                                No links in this section
                            </p>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={addLink}
                                className="border-golden-dark text-golden-dark"
                            >
                                <Plus className="w-4 h-4 mr-2" />
                                Add First Link
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}