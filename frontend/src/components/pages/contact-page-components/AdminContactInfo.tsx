"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Save,
    MapPin,
    Phone,
    Mail,
    Globe,
    Plus,
    Trash2,
    Facebook,
    Twitter,
    Linkedin,
    Instagram,
    Youtube,
    MessageSquare
} from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const ICON_OPTIONS = [
    { label: "Facebook", value: "facebook", Icon: Facebook },
    { label: "Twitter", value: "twitter", Icon: Twitter },
    { label: "LinkedIn", value: "linkedin", Icon: Linkedin },
    { label: "Instagram", value: "instagram", Icon: Instagram },
    { label: "YouTube", value: "youtube", Icon: Youtube },
    { label: "Telegram", value: "telegram", Icon: MessageSquare },
    { label: "Other", value: "other", Icon: Globe },
];

export default function AdminContactInfo() {
    const [contactInfo, setContactInfo] = useState({
        address: "4 Kilo, Addis Ababa, Ethiopia",
        phone: "+251 111 704 900",
        email: "info@midi.gov.et",
        location: "www.momp.gov.et",
    });

    const [socialLinks, setSocialLinks] = useState([
        { id: 1, name: "Facebook", icon: "facebook", url: "https://facebook.com/momp", customIcon: "" },
        { id: 2, name: "LinkedIn", icon: "linkedin", url: "https://linkedin.com/company/momp", customIcon: "" },
    ]);

    const handleSave = () => {
        console.log("Saving contact info:", { ...contactInfo, socialLinks });
    };

    const addSocialLink = () => {
        const newLink = {
            id: Date.now(),
            name: "",
            icon: "other",
            url: "",
            customIcon: "",
        };
        setSocialLinks([...socialLinks, newLink]);
    };

    const removeSocialLink = (id: number) => {
        setSocialLinks(socialLinks.filter((link) => link.id !== id));
    };

    const updateSocialLink = (id: number, field: string, value: string) => {
        setSocialLinks(
            socialLinks.map((link) =>
                link.id === id ? { ...link, [field]: value } : link
            )
        );
    };

    return (
        <div className="space-y-6">
            <Card className="shadow-sm border-gray-200">
                <CardHeader className="bg-gray-50/50 border-b">
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-xl font-bold text-[#073954]">
                            General Information
                        </CardTitle>
                        <Button onClick={handleSave} className="bg-golden-dark hover:bg-golden-darkHover">
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="address" className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-golden-dark" />
                                Office Address
                            </Label>
                            <Input
                                id="address"
                                value={contactInfo.address}
                                onChange={(e) =>
                                    setContactInfo({ ...contactInfo, address: e.target.value })
                                }
                                placeholder="Enter office address"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone" className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-golden-dark" />
                                Phone Number
                            </Label>
                            <Input
                                id="phone"
                                value={contactInfo.phone}
                                onChange={(e) =>
                                    setContactInfo({ ...contactInfo, phone: e.target.value })
                                }
                                placeholder="Enter phone number"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-golden-dark" />
                                Email Address
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                value={contactInfo.email}
                                onChange={(e) =>
                                    setContactInfo({ ...contactInfo, email: e.target.value })
                                }
                                placeholder="Enter email address"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="location" className="flex items-center gap-2">
                                <Globe className="w-4 h-4 text-golden-dark" />
                                Location URL
                            </Label>
                            <Input
                                id="location"
                                value={contactInfo.location}
                                onChange={(e) =>
                                    setContactInfo({ ...contactInfo, location: e.target.value })
                                }
                                placeholder="Enter location URL"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="shadow-sm border-gray-200">
                <CardHeader className="bg-gray-50/50 border-b">
                    <div className="flex justify-between items-center">
                        <CardTitle className="text-xl font-bold text-[#073954]">
                            Social Media Links
                        </CardTitle>
                        <Button variant="outline" size="sm" onClick={addSocialLink} className="border-golden-dark text-golden-dark hover:bg-golden-dark/10">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Social Link
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                    {socialLinks.length === 0 && (
                        <p className="text-center text-gray-500 py-4">No social links added yet.</p>
                    )}
                    {socialLinks.map((link) => (
                        <div key={link.id} className="flex flex-col md:flex-row gap-4 items-start md:items-end border-b pb-4 last:border-0 last:pb-0">
                            <div className="w-full md:w-40 space-y-2">
                                <Label>Icon</Label>
                                <Select
                                    value={link.icon}
                                    onValueChange={(val) => updateSocialLink(link.id, "icon", val)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select icon" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {ICON_OPTIONS.map((opt) => (
                                            <SelectItem key={opt.value} value={opt.value}>
                                                <div className="flex items-center gap-2">
                                                    <opt.Icon className="w-4 h-4" />
                                                    <span>{opt.label}</span>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            {link.icon === "other" && (
                                <div className="w-full md:w-40 space-y-2">
                                    <Label>Lucide Icon Name</Label>
                                    <Input
                                        value={link.customIcon || ""}
                                        onChange={(e) => updateSocialLink(link.id, "customIcon", e.target.value)}
                                        placeholder="e.g. Mail, Github"
                                    />
                                </div>
                            )}
                            <div className="flex-1 w-full space-y-2">
                                <Label>Platform Name</Label>
                                <Input
                                    value={link.name}
                                    onChange={(e) => updateSocialLink(link.id, "name", e.target.value)}
                                    placeholder="e.g. Facebook"
                                />
                            </div>
                            <div className="flex-[2] w-full space-y-2">
                                <Label>URL Link</Label>
                                <Input
                                    value={link.url}
                                    onChange={(e) => updateSocialLink(link.id, "url", e.target.value)}
                                    placeholder="https://..."
                                />
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeSocialLink(link.id)}
                                className="text-destructive hover:text-destructive hover:bg-destructive/10 shrink-0"
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
