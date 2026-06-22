"use client";

import React from "react";
import {
    MapPin,
    User,
    Phone,
    Mail,
    Building2,
    Loader2
} from "lucide-react";
import { useGetRegionalOfficesQuery } from "@/redux/api/regionalOfficeApi";
import { useGetRegionsQuery } from "@/redux/api/regionApi";
import { RegionalOfficeContactCenter } from "@/redux/types/regionalOffice";
import { Region } from "@/redux/types/region";
import PublicEmptyState from "@/components/common/PublicEmptyState";
import { useTranslations } from "next-intl";

// Extended type to match the UI structure
interface RegionalOfficeDisplay {
    region: string;
    bureau: string;
    address: string;
    director?: string;
    email?: string;
    phone: string;
    extraContact?: {
        name: string;
        email: string;
        phone: string;
    };
}

const RegionalOfficesPage = () => {
    const t = useTranslations("empty_state");
    // Fetch regional offices and regions from API
    const {
        data: apiOffices = [],
        isLoading: officesLoading,
        isError: officesError,
        refetch
    } = useGetRegionalOfficesQuery();

    const {
        data: regions = [],
        isLoading: regionsLoading
    } = useGetRegionsQuery();

    // Map API data to display format
    const offices = React.useMemo(() => {
        if (!apiOffices.length || !regions.length) return [];

        // Create a map for quick region lookup
        const regionMap = new Map<string, string>();
        regions.forEach((region: Region) => {
            regionMap.set(region.region_id, region.name);
        });

        return apiOffices.map((office: RegionalOfficeContactCenter) => {
            const displayOffice: RegionalOfficeDisplay = {
                region: regionMap.get(office.region_id) || office.region_id,
                bureau: office.bureau_name,
                address: office.address || "",
                director: office.director || undefined,
                email: office.email || undefined,
                phone: office.phone || "",
            };

            // Add licensing contact if exists
            if (office.licensing_contacts && office.licensing_contacts.length > 0) {
                const contact = office.licensing_contacts[0];
                displayOffice.extraContact = {
                    name: contact.name,
                    email: contact.email || "",
                    phone: contact.phone || "",
                };
            }

            return displayOffice;
        });
    }, [apiOffices, regions]);

    // Loading state
    if (officesLoading || regionsLoading) {
        return (
            <section className="container max-w-7xl mx-auto px-4 py-12">
                <div className="flex justify-center items-center min-h-[400px]">
                    <div className="text-center">
                        <Loader2 className="w-12 h-12 animate-spin text-golden-dark mx-auto mb-4" />
                        <p className="text-gray-600">Loading regional offices...</p>
                    </div>
                </div>
            </section>
        );
    }

    // Error state
    if (officesError) {
        return (
            <section className="container max-w-7xl mx-auto px-4 py-12">
                <PublicEmptyState
                    title={t("regional_offices_title")}
                    description={t("error_description")}
                    action={
                        <button
                            onClick={() => refetch()}
                            className="px-4 py-2 bg-golden-dark text-white rounded-md hover:bg-golden-darkHover transition"
                        >
                            Try Again
                        </button>
                    }
                />
            </section>
        );
    }

    return (
        <section className="container max-w-7xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {offices.length > 0 ? (
                    offices.map((office, index) => (
                        <div
                            key={index}
                            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition"
                        >
                            <h3 className="text-lg font-semibold text-golden-dark mb-3">
                                {office.region}
                            </h3>

                            <p className="flex gap-2 text-sm text-gray-700 mb-2">
                                <Building2 size={16} />
                                {office.bureau}
                            </p>

                            <p className="flex gap-2 text-sm text-gray-600 mb-2">
                                <MapPin size={16} />
                                {office.address}
                            </p>

                            {office.director && (
                                <p className="flex gap-2 text-sm text-gray-600 mb-2">
                                    <User size={16} />
                                    {office.director}
                                </p>
                            )}

                            {office.email && (
                                <p className="flex gap-2 text-sm text-gray-600 mb-2">
                                    <Mail size={16} />
                                    {office.email}
                                </p>
                            )}

                            {office.phone && (
                                <p className="flex gap-2 text-sm text-gray-600">
                                    <Phone size={16} />
                                    {office.phone}
                                </p>
                            )}

                            {office.extraContact && (
                                <div className="mt-4 border-t pt-3 text-sm text-gray-600">
                                    <p className="font-medium">Licensing Contact</p>
                                    <p>{office.extraContact.name}</p>
                                    {office.extraContact.email && <p>{office.extraContact.email}</p>}
                                    {office.extraContact.phone && <p>{office.extraContact.phone}</p>}
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <PublicEmptyState title={t("regional_offices_title")} />
                )}
            </div>
        </section>
    );
};

export default RegionalOfficesPage;