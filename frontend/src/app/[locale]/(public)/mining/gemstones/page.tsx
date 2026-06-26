"use client";
import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Sparkles, Gem, MapPin, Filter, ChevronDown, Calendar } from "lucide-react";
import { GemstonesListSkeleton } from "@/components/skeletons";
import { useGetGamestonesQuery } from "@/redux/api/gamestoneApi";
import { Gamestone } from "@/redux/types/gamestone";
import { getFileUrl, getImageUrl } from "@/utils/fileUrl";
import PublicEmptyState from "@/components/common/PublicEmptyState";
import { useTranslations } from "next-intl";

const GemstonesPage = () => {
    const { data: gemstones = [], isLoading, isError } = useGetGamestonesQuery();
    const t = useTranslations("empty_state");

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedLocation, setSelectedLocation] = useState("All");

    /* Derive unique locations for filter */
    const locations = useMemo(() => {
        const locs = gemstones
            .map((g: Gamestone) => g.location)
            .filter(Boolean) as string[];
        return ["All", ...Array.from(new Set(locs))];
    }, [gemstones]);

    /* Only show root-level gamestones in the list */
    const rootGemstones = useMemo(
        () => gemstones.filter((g: Gamestone) => !g.parent_id),
        [gemstones]
    );

    const filtered = useMemo(() => {
        return rootGemstones.filter((gem: Gamestone) => {
            const matchesSearch =
                !searchTerm ||
                gem.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                gem.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                gem.description?.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesLocation =
                selectedLocation === "All" || gem.location === selectedLocation;
            return matchesSearch && matchesLocation;
        });
    }, [rootGemstones, searchTerm, selectedLocation]);

    const stats = {
        total: rootGemstones.length,
        locations: new Set(rootGemstones.map((g: Gamestone) => g.location).filter(Boolean)).size,
    };

    return (
        <div className="w-full mx-auto">
            {/* Search and Filter */}
            <div className="mb-10">
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-lg">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                        {/* Search */}
                        <div className="lg:col-span-6">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search by name, location, or description..."
                                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-golden-dark focus:border-transparent"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                        {/* Location filter */}
                        <div className="lg:col-span-4">
                            <div className="relative">
                                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <select
                                    className="w-full pl-12 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-golden-dark appearance-none"
                                    value={selectedLocation}
                                    onChange={(e) => setSelectedLocation(e.target.value)}
                                >
                                    {locations.map((l) => (
                                        <option key={l} value={l}>
                                            Location: {l}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                        {/* Reset */}
                        <div className="lg:col-span-2">
                            <button
                                onClick={() => {
                                    setSearchTerm("");
                                    setSelectedLocation("All");
                                }}
                                className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            {isLoading && <GemstonesListSkeleton />}

            {isError && (
                <div className="text-center py-20 bg-white rounded-xl border border-red-100">
                    <Gem className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-red-500 font-medium">Failed to load gemstones.</p>
                    <p className="text-sm text-gray-400 mt-1">Please try refreshing the page.</p>
                </div>
            )}

            {!isLoading && !isError && (
                <div className="space-y-6">
                    {filtered.map((gem: Gamestone) => {
                        const imageUrl = gem.attachment?.file_path
                            ? getImageUrl(gem.attachment, "large")
                            : null;
                        const subCount = gem.sub_items?.length ?? 0;

                        return (
                            <div
                                key={gem.gamestone_id}
                                className="bg-white rounded-xl grid grid-cols-1 lg:grid-cols-3 border border-gray-200 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 group"
                            >
                                {/* Image */}
                                <div className="relative h-56 lg:h-auto bg-gradient-to-br from-amber-50 to-yellow-100 overflow-hidden">
                                    {imageUrl ? (
                                        // eslint-disable-next-line @next/next/no-img-element
                                        <img
                                            src={imageUrl}
                                            alt={gem.title}
                                            className="mt-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex flex-col items-center justify-center p-4 text-center">
                                            <Gem className="w-16 h-16 text-amber-300 mb-3" />
                                            <p className="text-amber-600 font-medium">{gem.title}</p>
                                        </div>
                                    )}
                                    {subCount > 0 && (
                                        <div className="absolute top-3 right-3 bg-golden-dark text-white text-xs font-semibold px-2 py-0.5 rounded-full">
                                            {subCount} sub-class{subCount !== 1 ? "es" : ""}
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-6 col-span-2 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-xl font-bold text-gray-900">{gem.title}</h3>
                                        </div>

                                        {gem.location && (
                                            <div className="flex items-center gap-1.5 text-gray-500 mb-3">
                                                <MapPin className="w-4 h-4 text-golden-dark" />
                                                <span className="text-sm">{gem.location}</span>
                                            </div>
                                        )}

                                        {gem.description && (
                                            <div
                                                className="text-gray-600 text-sm mb-4 line-clamp-2 prose prose-sm max-w-none"
                                                dangerouslySetInnerHTML={{ __html: gem.description }}
                                            />
                                        )}

                                        {/* Sub-classes preview */}
                                        {subCount > 0 && (
                                            <div className="flex flex-wrap gap-1.5 mb-4">
                                                {gem.sub_items!.slice(0, 4).map((sub) => (
                                                    <span
                                                        key={sub.gamestone_id}
                                                        className="px-2 py-0.5 bg-amber-50 text-golden-dark text-xs rounded-full border border-amber-100"
                                                    >
                                                        {sub.title}
                                                    </span>
                                                ))}
                                                {subCount > 4 && (
                                                    <span className="px-2 py-0.5 bg-gray-100 text-gray-500 text-xs rounded-full">
                                                        +{subCount - 4} more
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                                        {gem.discovered_date ? (
                                            <div className="flex items-center gap-1.5 text-sm text-gray-400">
                                                <Calendar className="w-3.5 h-3.5" />
                                                Discovered: {new Date(gem.discovered_date).toLocaleDateString()}
                                            </div>
                                        ) : (
                                            <span />
                                        )}
                                        <Link
                                            href={`/mining/gemstones/${gem.gamestone_id}`}
                                            className="text-sm font-semibold text-golden-dark hover:text-golden-light transition-colors"
                                        >
                                            View Details →
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {filtered.length === 0 && (
                        <PublicEmptyState
                            title={
                                rootGemstones.length === 0
                                    ? t("gemstones_title")
                                    : t("gemstones_filter_title")
                            }
                            description={
                                rootGemstones.length > 0
                                    ? t("filter_description")
                                    : undefined
                            }
                        />
                    )}
                </div>
            )}

            {/* Footer note */}
            <div className="mt-14 pt-8 border-t border-gray-200 text-center">
                <p className="text-gray-500 text-sm">
                    Data Source: Ministry of Mines – Geological Survey & Ethiopian Gemological Institute
                </p>
            </div>
        </div>
    );
};

export default GemstonesPage;