"use client";

import { useState, useEffect } from "react";
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
    Loader2
} from "lucide-react";
import {
    useGetFederalOfficesQuery,
    useCreateFederalOfficeMutation,
    useUpdateFederalOfficeMutation,
} from "@/redux/api/federalOfficeApi";
import { toast } from "sonner"; // or your preferred toast library

interface ContactInfo {
    address: string;
    phone: string;
    email: string;
    location: string;
}

export default function AdminFederalContact() {
    // Fetch federal offices and get the first one (index 0)
    const { data: federalOffices, isLoading, isError, error } = useGetFederalOfficesQuery();
    const [createFederalOffice, { isLoading: isCreating }] = useCreateFederalOfficeMutation();
    const [updateFederalOffice, { isLoading: isUpdating }] = useUpdateFederalOfficeMutation();

    const existingOffice = federalOffices?.[0]; // Get the first office from index 0

    const [contactInfo, setContactInfo] = useState<ContactInfo>({
        address: "",
        phone: "",
        email: "",
        location: "",
    });

    const [isSaving, setIsSaving] = useState(false);

    // Map API data to form when data is available
    useEffect(() => {
        if (existingOffice) {
            setContactInfo({
                address: existingOffice.office_address || "",
                phone: existingOffice.phone || "",
                email: existingOffice.email || "",
                location: existingOffice.map_location || "",
            });
        }
    }, [existingOffice]);

    const handleSave = async () => {
        setIsSaving(true);
        try {
            if (existingOffice) {
                // UPDATE existing office
                await updateFederalOffice({
                    id: existingOffice.federal_office_id,
                    data: {
                        office_address: contactInfo.address,
                        phone: contactInfo.phone || undefined,
                        email: contactInfo.email || undefined,
                        map_location: contactInfo.location || undefined,
                    },
                }).unwrap();
                toast.success("Federal office updated successfully");
            } else {
                // CREATE new office
                await createFederalOffice({
                    office_address: contactInfo.address,
                    phone: contactInfo.phone || undefined,
                    email: contactInfo.email || undefined,
                    map_location: contactInfo.location || undefined,
                }).unwrap();
                toast.success("Federal office created successfully");
            }
        } catch (error) {
            console.error("Failed to save federal office:", error);
            toast.error("Failed to save federal office");
        } finally {
            setIsSaving(false);
        }
    };

    // Loading state
    if (isLoading) {
        return (
            <Card className="shadow-sm border-gray-200">
                <CardContent className="p-6 flex justify-center items-center min-h-[300px]">
                    <Loader2 className="w-8 h-8 animate-spin text-golden-dark" />
                </CardContent>
            </Card>
        );
    }

    // Error state
    if (isError) {
        console.error("Failed to load federal office:", error);
        // Still show the form with empty fields
    }

    const isSavingDisabled = isSaving || isCreating || isUpdating;

    return (
        <Card className="shadow-sm border-gray-200">
            <CardHeader className="bg-gray-50/50 border-b">
                <div className="flex justify-between items-center">
                    <CardTitle className="text-xl font-bold text-[#073954]">
                        General Information
                    </CardTitle>
                    <Button
                        onClick={handleSave}
                        className="bg-golden-dark hover:bg-golden-darkHover"
                        disabled={isSavingDisabled}
                    >
                        {isSavingDisabled ? (
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        ) : (
                            <Save className="w-4 h-4 mr-2" />
                        )}
                        {existingOffice ? "Update" : "Create"}
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
                            disabled={isSavingDisabled}
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
                            disabled={isSavingDisabled}
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
                            disabled={isSavingDisabled}
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
                            disabled={isSavingDisabled}
                        />
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}