"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Save,
    Plus,
    Trash2,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface FooterLink {
    id: string;
    label: string;
    href: string;
}

interface FooterSection {
    id: string;
    title: string;
    links: FooterLink[];
}

export default function AdminFooterManager() {
    const [footerData, setFooterData] = useState({
        about: {
            logo: "/logo-only.png",
            title: "Ministry of Mines",
        },
        sections: [
            {
                id: "quick-links",
                title: "Quick Links",
                links: [
                    { id: "1-1", label: "Mining Sector", href: "/mining" },
                    { id: "1-2", label: "Services", href: "/services" },
                    { id: "1-3", label: "News & Updates", href: "/news" },
                ],
            },
            {
                id: "resources",
                title: "Resources",
                links: [
                    { id: "2-1", label: "Licensing & Legislation", href: "/mining/licensing-and-legislation" },
                    { id: "2-2", label: "Mining Data", href: "/mining/data" },
                    { id: "2-3", label: "Gemstones", href: "/mining/gemstones" },
                ],
            },
            {
                id: "contact",
                title: "Contact",
                links: [
                    { id: "3-1", label: "Federal Office", href: "/offices/federal" },
                    { id: "3-2", label: "Regional Offices", href: "/offices/regional" },
                    { id: "3-3", label: "FAQ", href: "/faq" },
                ],
            },
        ],
        copyright: `© ${new Date().getFullYear()} Ministry of Mines – Ethiopia. All rights reserved.`,
    });

    useEffect(() => {
        const savedData = localStorage.getItem("dynamic_footer_data");
        if (savedData) {
            try {
                const parsed = JSON.parse(savedData);
                // Ensure Resources section exists in loaded data if it was missing
                if (!parsed.sections.find((s: any) => s.id === "resources")) {
                    parsed.sections.splice(1, 0, {
                        id: "resources",
                        title: "Resources",
                        links: [],
                    });
                }
                // Filter out social links if they were previously in sections (though they were in a separate object)
                setFooterData(parsed);
            } catch (e) {
                console.error("Failed to parse footer data", e);
            }
        }
    }, []);

    const handleSave = () => {
        localStorage.setItem("dynamic_footer_data", JSON.stringify(footerData));
        alert("Footer data saved locally!");
    };

    const updateAbout = (field: string, value: string) => {
        setFooterData({
            ...footerData,
            about: { ...footerData.about, [field]: value },
        });
    };

    const updateSectionTitle = (id: string, title: string) => {
        setFooterData({
            ...footerData,
            sections: footerData.sections.map((s) =>
                s.id === id ? { ...s, title } : s
            ),
        });
    };

    const addLink = (sectionId: string) => {
        setFooterData({
            ...footerData,
            sections: footerData.sections.map((s) => {
                if (s.id === sectionId) {
                    return {
                        ...s,
                        links: [...s.links, { id: Date.now().toString(), label: "New Link", href: "#" }],
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

    const updateLink = (sectionId: string, linkId: string, field: string, value: string) => {
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

    return (
        <div className="space-y-6">
            <Card className="shadow-sm border-gray-200">
                <CardHeader className="bg-gray-50/50 border-b">
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-xl font-bold text-[#073954]">
                            Footer Information
                        </CardTitle>
                        <Button onClick={handleSave} className="bg-golden-dark hover:bg-golden-darkHover">
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-b pb-6">
                        <div className="space-y-2">
                            <Label>Ministry Title</Label>
                            <Input
                                value={footerData.about.title}
                                onChange={(e) => updateAbout("title", e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Logo URL</Label>
                            <Input
                                value={footerData.about.logo}
                                onChange={(e) => updateAbout("logo", e.target.value)}
                            />
                        </div>
                    </div>

                    <Tabs defaultValue="quick-links" className="w-full">
                        <TabsList className="grid w-full grid-cols-3 mb-6 bg-gray-100/50 p-1">
                            <TabsTrigger value="quick-links">Quick Links</TabsTrigger>
                            <TabsTrigger value="resources">Resources</TabsTrigger>
                            <TabsTrigger value="contact">Contact</TabsTrigger>
                        </TabsList>

                        {/* Quick Links Tab */}
                        <TabsContent value="quick-links" className="space-y-4">
                            <SectionEditor
                                section={footerData.sections.find(s => s.id === "quick-links")!}
                                updateTitle={(title) => updateSectionTitle("quick-links", title)}
                                addLink={() => addLink("quick-links")}
                                updateLink={(linkId, field, value) => updateLink("quick-links", linkId, field, value)}
                                removeLink={(linkId) => removeLink("quick-links", linkId)}
                            />
                        </TabsContent>

                        {/* Resources Tab */}
                        <TabsContent value="resources" className="space-y-4">
                            <SectionEditor
                                section={footerData.sections.find(s => s.id === "resources")!}
                                updateTitle={(title) => updateSectionTitle("resources", title)}
                                addLink={() => addLink("resources")}
                                updateLink={(linkId, field, value) => updateLink("resources", linkId, field, value)}
                                removeLink={(linkId) => removeLink("resources", linkId)}
                            />
                        </TabsContent>

                        {/* Contact Tab */}
                        <TabsContent value="contact" className="space-y-4">
                            <SectionEditor
                                section={footerData.sections.find(s => s.id === "contact")!}
                                updateTitle={(title) => updateSectionTitle("contact", title)}
                                addLink={() => addLink("contact")}
                                updateLink={(linkId, field, value) => updateLink("contact", linkId, field, value)}
                                removeLink={(linkId) => removeLink("contact", linkId)}
                            />
                        </TabsContent>
                    </Tabs>

                    <div className="space-y-2 pt-4 border-t">
                        <Label>Copyright Text</Label>
                        <Input
                            value={footerData.copyright}
                            onChange={(e) => setFooterData({ ...footerData, copyright: e.target.value })}
                        />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

function SectionEditor({ section, updateTitle, addLink, updateLink, removeLink }: {
    section: any;
    updateTitle: (title: string) => void;
    addLink: () => void;
    updateLink: (linkId: string, field: string, value: string) => void;
    removeLink: (linkId: string) => void;
}) {
    if (!section) return null;

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center px-1">
                <div className="flex items-center gap-2 flex-1">
                    <Label className="text-xs text-gray-500 uppercase font-bold">Section Name:</Label>
                    <Input
                        className="max-w-[200px] h-8 font-semibold text-[#073954]"
                        value={section.title}
                        onChange={(e) => updateTitle(e.target.value)}
                    />
                </div>
                <Button variant="outline" size="sm" onClick={addLink} className="border-golden-dark text-golden-dark h-8">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Link
                </Button>
            </div>

            <Card className="border-gray-100 shadow-none bg-gray-50/20">
                <CardContent className="p-4 space-y-3">
                    {section.links.map((link: any) => (
                        <div key={link.id} className="flex gap-4 items-center">
                            <div className="flex-1 space-y-1">
                                <Label className="text-xs">Label</Label>
                                <Input
                                    placeholder="Label"
                                    className="h-8"
                                    value={link.label}
                                    onChange={(e) => updateLink(link.id, "label", e.target.value)}
                                />
                            </div>
                            <div className="flex-1 space-y-1">
                                <Label className="text-xs">URL</Label>
                                <Input
                                    placeholder="URL"
                                    className="h-8"
                                    value={link.href}
                                    onChange={(e) => updateLink(link.id, "href", e.target.value)}
                                />
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => removeLink(link.id)} className="h-8 w-8 text-destructive shrink-0 mt-5">
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}
                    {section.links.length === 0 && (
                        <p className="text-center text-gray-500 py-4 text-sm">No links in this section.</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
