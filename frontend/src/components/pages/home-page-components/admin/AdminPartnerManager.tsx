"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Save, Plus, Trash2, Link as LinkIcon, Building2 } from "lucide-react";

const DEFAULT_LOGOS = [
    "https://nomadsinn.com/momp/wp-content/uploads/2019/10/CIRDI-FOOTER1.png",
    "https://nomadsinn.com/momp/wp-content/uploads/2019/10/momplogo.png",
    "https://nomadsinn.com/momp/wp-content/uploads/2019/10/gse.jpeg",

];

export default function AdminPartnerManager() {
    const [logos, setLogos] = useState<string[]>(DEFAULT_LOGOS);
    const [header, setHeader] = useState({
        title: "Our Partners",
        description: "We collaborate with trusted national and international partners to support sustainable industrial and economic development."
    });

    useEffect(() => {
        const savedLogos = localStorage.getItem("home_partner_logos");
        const savedHeader = localStorage.getItem("home_partner_header");
        if (savedLogos) setLogos(JSON.parse(savedLogos));
        if (savedHeader) setHeader(JSON.parse(savedHeader));
    }, []);

    const handleSave = () => {
        localStorage.setItem("home_partner_logos", JSON.stringify(logos));
        localStorage.setItem("home_partner_header", JSON.stringify(header));
        alert("Partners data saved locally!");
    };

    const addLogo = () => {
        setLogos([...logos, ""]);
    };

    const updateLogo = (index: number, value: string) => {
        const newLogos = [...logos];
        newLogos[index] = value;
        setLogos(newLogos);
    };

    const removeLogo = (index: number) => {
        setLogos(logos.filter((_, i) => i !== index));
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-4 rounded-lg border shadow-sm">
                <div>
                    <h2 className="text-lg font-bold text-[#073954]">Partners Management</h2>
                    <p className="text-sm text-gray-500">Manage partner logos and the section header.</p>
                </div>
                <Button onClick={handleSave} className="bg-golden-dark hover:bg-golden-darkHover">
                    <Save className="w-4 h-4 mr-2" />
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
                            value={header.title}
                            onChange={(e) => setHeader({ ...header, title: e.target.value })}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Section Description</Label>
                        <Input
                            value={header.description}
                            onChange={(e) => setHeader({ ...header, description: e.target.value })}
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
                    {logos.map((logo, index) => (
                        <Card key={index} className="border-gray-100 shadow-none bg-gray-50/20">
                            <CardContent className="p-4 space-y-4">
                                <div className="flex justify-between items-start">
                                    <div className="bg-white p-2 border rounded-md w-full aspect-video flex items-center justify-center overflow-hidden">
                                        {logo ? (
                                            <img src={logo} alt="Partner" className="h-full object-contain" />
                                        ) : (
                                            <div className="text-gray-300 flex flex-col items-center gap-1">
                                                <Building2 className="w-8 h-8" />
                                                <span className="text-[10px]">No Logo URL</span>
                                            </div>
                                        )}
                                    </div>
                                    <Button variant="ghost" size="icon" onClick={() => removeLogo(index)} className="text-destructive h-8 w-8 -mt-2 -mr-2">
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-[10px] uppercase font-bold text-gray-500">Logo Image URL</Label>
                                    <div className="flex gap-2">
                                        <div className="relative flex-1">
                                            <LinkIcon className="absolute left-2 top-2.5 w-3 h-3 text-gray-400" />
                                            <Input
                                                className="h-8 pl-7 text-xs"
                                                placeholder="https://..."
                                                value={logo}
                                                onChange={(e) => updateLogo(index, e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                    {logos.length === 0 && (
                        <p className="col-span-full text-center text-gray-500 py-10 border-2 border-dashed rounded-xl">No partner logos added yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
