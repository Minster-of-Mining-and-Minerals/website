"use client";

import { MapPin } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetFederalOfficesQuery } from "@/redux/api/federalOfficeApi";

const MapSection = () => {
    const { data: federalOffices, isLoading, isError } = useGetFederalOfficesQuery();
    const office = federalOffices?.[0]; // Get first office from index 0

    // Generate Google Maps embed URL from map_location or use default
    const getMapEmbedUrl = (location?: string) => {
        if (!location) {
            return "https://www.google.com/maps?q=4%20Kilo%20Addis%20Ababa%20Ethiopia&output=embed";
        }

        // If location is already a full URL, extract the query part or use as is
        if (location.includes('google.com/maps')) {
            // If it's already an embed URL, use it directly
            if (location.includes('output=embed')) {
                return location;
            }
            // If it's a regular maps URL, convert to embed
            const matches = location.match(/[?&]q=([^&]+)/);
            if (matches && matches[1]) {
                return `https://www.google.com/maps?q=${matches[1]}&output=embed`;
            }
        }

        // Assume it's a search query
        return `https://www.google.com/maps?q=${encodeURIComponent(location)}&output=embed`;
    };

    // Loading state
    if (isLoading) {
        return (
            <section className="container max-w-7xl mx-auto px-4 py-16">
                <Skeleton className="h-72 w-full rounded-2xl" />
            </section>
        );
    }

    const mapUrl = getMapEmbedUrl(office?.map_location);

    return (
        <section className="container max-w-7xl mx-auto px-4 py-16">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-golden-dark flex items-center gap-2">
                    <MapPin className="text-golden-dark" />
                    Office Location
                </h2>
                <p className="text-gray-600 mt-2 max-w-2xl">
                    Find the Ministry of Mines and Petroleum Federal Office on the map below.
                </p>
                {office?.office_address && (
                    <p className="text-sm text-gray-500 mt-1">
                        <span className="font-medium">Address:</span> {office.office_address}
                    </p>
                )}
            </div>

            <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
                <iframe
                    title="MoMP Location Map"
                    src={mapUrl}
                    className="w-full h-[350px] border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                />
            </div>

            {/* Error state message */}
            {isError && (
                <p className="text-red-500 text-sm mt-2">
                    Failed to load location data. Using default location.
                </p>
            )}
        </section>
    );
};

export default MapSection;