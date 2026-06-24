"use client";
import React, { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
    ArrowLeft,
    MapPin,
    Calendar,
    Gem,
    Download,
    FileIcon,
    Loader2,
    ChevronRight,
    ChevronDown,
    Eye,
    Clock,
    Award,
    Sparkles,
    Layers,
} from "lucide-react";
import { useGetGamestoneByIdQuery } from "@/redux/api/gamestoneApi";
import { Gamestone } from "@/redux/types/gamestone";
import { getFileUrl, getImageUrl } from "@/utils/fileUrl";

/* ================================================
   SUB-CLASS CARD - Enhanced Design
================================================ */
const SUBCLASS_DESCRIPTION_COLLAPSED_HEIGHT = 72; // matches max-h-[4.5rem]

function SubClassCard({ item }: { item: Gamestone }) {
    const [expanded, setExpanded] = useState(false);
    const [canExpand, setCanExpand] = useState(false);
    const descriptionRef = useRef<HTMLDivElement>(null);

    const imageUrl = item.attachment?.file_path
        ? getImageUrl(item.attachment, "large")
        : null;

    const hasDescription = Boolean(item.description?.trim());

    useEffect(() => {
        const el = descriptionRef.current;
        if (!el || !hasDescription) {
            setCanExpand(false);
            return;
        }

        const checkOverflow = () => {
            // scrollHeight is the full content height regardless of max-height,
            // so this stays accurate after expand/collapse toggles.
            setCanExpand(el.scrollHeight > SUBCLASS_DESCRIPTION_COLLAPSED_HEIGHT + 1);
        };

        checkOverflow();

        const observer = new ResizeObserver(checkOverflow);
        observer.observe(el);
        window.addEventListener("resize", checkOverflow);

        return () => {
            observer.disconnect();
            window.removeEventListener("resize", checkOverflow);
        };
    }, [item.description, hasDescription]);

    return (
        <div className="group relative bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full">
            {/* Image Container */}
            <div className="relative h-52 bg-gradient-to-br from-amber-50 to-yellow-100 overflow-hidden">
                {imageUrl ? (
                    <>
                        <img
                            src={imageUrl}
                            alt={item.title}
                            className="mt-0 absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <Gem className="w-12 h-12 text-amber-300" />
                    </div>
                )}

                {/* Decorative Badge */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium text-amber-700 shadow-sm">
                    Variety
                </div>
            </div>

            {/* Content */}
            <div className="p-5 flex-grow">
                <h4 className="font-bold text-gray-900 text-lg mb-2 line-clamp-1 group-hover:text-amber-700 transition-colors">
                    {item.title}
                </h4>

                {item.location && (
                    <div className="flex items-center gap-1.5 text-gray-500 text-xs mb-2">
                        <MapPin className="w-3.5 h-3.5 text-amber-600" />
                        <span className="truncate">{item.location}</span>
                    </div>
                )}

                {item.discovered_date && (
                    <div className="flex items-center gap-1.5 text-gray-500 text-xs mb-3">
                        <Calendar className="w-3.5 h-3.5 text-amber-600" />
                        {new Date(item.discovered_date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                        })}
                    </div>
                )}

                {hasDescription && (
                    <div className="mt-1">
                        <div
                            ref={descriptionRef}
                            className={`rich-text-content text-gray-600 text-sm leading-relaxed break-normal overflow-hidden transition-[max-height] duration-300 ease-in-out ${
                                expanded ? "max-h-[2000px]" : "max-h-[4.5rem]"
                            }`}
                            dangerouslySetInnerHTML={{ __html: item.description! }}
                        />

                        {canExpand && (
                            <button
                                type="button"
                                onClick={() => setExpanded((prev) => !prev)}
                                className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-amber-700 hover:text-amber-800 transition-colors"
                                aria-expanded={expanded}
                            >
                                {expanded ? "View less" : "View more"}
                                <ChevronDown
                                    className={`w-4 h-4 transition-transform duration-300 ${
                                        expanded ? "rotate-180" : ""
                                    }`}
                                />
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Hover Border Effect */}
            <div className="absolute inset-0 border-2 border-amber-400/0 rounded-2xl group-hover:border-amber-400/30 transition-all duration-300 pointer-events-none" />
        </div>
    );
}

/* ================================================
   DOWNLOADABLE DOCUMENTS - Enhanced Design
================================================ */
function DocumentsSection({ attachments }: { attachments: { attachment: any }[] }) {
    if (!attachments || attachments.length === 0) return null;

    return (
        <div className="bg-gradient-to-br from-white to-amber-50/30 rounded-2xl border border-amber-200/50 shadow-lg p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-amber-100 rounded-xl">
                    <Download className="w-6 h-6 text-amber-700" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                        Downloadable Documents
                    </h2>
                    <p className="text-gray-500 text-sm mt-1">
                        Access detailed reports, certificates, and documentation
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {attachments.map((a, i) => {
                    const att = a.attachment;
                    if (!att) return null;
                    const url = getFileUrl(att.file_path);
                    const isPdf = att.file_name?.toLowerCase().endsWith(".pdf");
                    const fileSize = att.file_size ? `${(att.file_size / 1024).toFixed(1)} KB` : '';

                    return (
                        <a
                            key={att.attachment_id ?? i}
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            download={!isPdf}
                            className="group relative flex items-center justify-between bg-white border border-gray-200 rounded-xl px-5 py-4 hover:shadow-md hover:border-amber-300 transition-all duration-300 overflow-hidden"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                                    <FileIcon className="w-5 h-5 text-amber-700" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-gray-800 group-hover:text-amber-700 transition-colors">
                                        {att.file_name}
                                    </p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-xs text-gray-400 uppercase">
                                            {isPdf ? "PDF Document" : "Document"}
                                        </span>
                                        {fileSize && (
                                            <>
                                                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                                                <span className="text-xs text-gray-400">{fileSize}</span>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-amber-600 opacity-0 group-hover:opacity-100 transition-opacity">
                                    Download
                                </span>
                                <Download className="w-4 h-4 text-gray-400 group-hover:text-amber-600 transition-colors" />
                            </div>

                            {/* Decorative Line */}
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                        </a>
                    );
                })}
            </div>
        </div>
    );
}

/* ================================================
   STATS CARD - Additional Component
================================================ */
function StatsCard({ gemstone }: { gemstone: Gamestone }) {
    const stats = [
        {
            icon: Calendar,
            label: "Discovery Date",
            value: gemstone.discovered_date ? new Date(gemstone.discovered_date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }) : "Not specified",
            color: "text-blue-600",
            bgColor: "bg-blue-50"
        },
        {
            icon: MapPin,
            label: "Location",
            value: gemstone.location || "Location unknown",
            color: "text-green-600",
            bgColor: "bg-green-50"
        },
        {
            icon: Layers,
            label: "Sub-classes",
            value: gemstone.sub_items?.length || 0,
            suffix: gemstone.sub_items?.length === 1 ? " Variety" : " Varieties",
            color: "text-purple-600",
            bgColor: "bg-purple-50"
        },
        {
            icon: Award,
            label: "Status",
            value: "Verified",
            color: "text-amber-600",
            bgColor: "bg-amber-50"
        }
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, idx) => (
                <div key={idx} className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                            <stat.icon className={`w-5 h-5 ${stat.color}`} />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">{stat.label}</p>
                            <p className="text-lg font-bold text-gray-900 mt-1">
                                {stat.value}
                                {stat.suffix && <span className="text-sm font-normal text-gray-500 ml-1">{stat.suffix}</span>}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

/* ================================================
   MAIN DETAIL PAGE - Maximized UI
================================================ */
export default function GemstoneDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = params?.id as string;

    const { data: gemstone, isLoading, isError } = useGetGamestoneByIdQuery(id, {
        skip: !id,
    });

    /* Loading State */
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="text-center">
                        <Loader2 className="w-12 h-12 animate-spin text-amber-600 mx-auto mb-4" />
                        <p className="text-gray-600 font-medium">Loading gemstone details...</p>
                        <p className="text-sm text-gray-400 mt-1">Please wait while we fetch the information</p>
                    </div>
                </div>
            </div>
        );
    }

    /* Error State */
    if (isError || !gemstone) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
                <div className="text-center py-32">
                    <div className="inline-flex p-4 bg-gray-100 rounded-full mb-6">
                        <Gem className="w-12 h-12 text-gray-400" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-3">Gemstone Not Found</h2>
                    <p className="text-gray-500 mb-8 max-w-md mx-auto">
                        The gemstone entry you're looking for could not be found or may have been removed.
                    </p>
                    <Link
                        href="/mining/gemstones"
                        className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
                    >
                        <ArrowLeft className="w-4 h-4" /> Browse All Gemstones
                    </Link>
                </div>
            </div>
        );
    }

    const imageUrl = gemstone.attachment?.file_path
        ? getImageUrl(gemstone.attachment, "large")
        : null;
    const subItems: Gamestone[] = gemstone.sub_items ?? [];
    const docs: { attachment: any }[] = gemstone.attachments ?? [];

    return (
        <div className="not-prose min-h-screen bg-gradient-to-br from-gray-50 via-white to-amber-50/20">
            {/* Decorative Background Elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-amber-100 rounded-full blur-3xl opacity-20" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-100 rounded-full blur-3xl opacity-20" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm mb-8">
                    <Link href="/mining" className="text-gray-500 hover:text-amber-600 transition-colors">
                        Mining
                    </Link>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                    <Link href="/mining/gemstones" className="text-gray-500 hover:text-amber-600 transition-colors">
                        Gemstones
                    </Link>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-900 font-semibold truncate max-w-[200px]">
                        {gemstone.title}
                    </span>
                </nav>

                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    className="group flex items-center gap-2 text-gray-600 hover:text-amber-700 font-medium mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to previous page
                </button>

                {/* Hero Section - Maximized */}
                <div className="bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden mb-10">
                    {/* Full-Width Hero Image */}
                    {imageUrl ? (
                        <div className="relative w-full h-[50vh] min-h-[400px] max-h-[600px]">
                            <img
                                src={imageUrl}
                                alt={gemstone.title}
                                className="mt-0 absolute inset-0 w-full h-full object-cover"
                            />
                            {/* Gradient Overlay for Text Readability */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                            {/* Title Overlay for Large Images */}
                            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                                <div className="max-w-4xl">
                                    <div className="flex items-center gap-2 mb-3">
                                        <Sparkles className="w-5 h-5 text-amber-300" />
                                        <span className="text-sm font-medium text-amber-200">Ethiopian Gemstone</span>
                                    </div>
                                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                                        {gemstone.title}
                                    </h1>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="relative w-full h-[40vh] min-h-[300px] bg-gradient-to-br from-amber-200 via-amber-100 to-yellow-100 flex items-center justify-center">
                            <Gem className="w-24 h-24 text-amber-400/50" />
                            <div className="absolute bottom-0 left-0 right-0 p-8">
                                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center">
                                    {gemstone.title}
                                </h1>
                            </div>
                        </div>
                    )}

                    {/* Content Section */}
                    <div className="p-6 md:p-8 lg:p-10 min-w-0">
                        {/* Stats Cards */}
                        <StatsCard gemstone={gemstone} />

                        {/* Description */}
                        {gemstone.description && (
                            <div className="mb-10 min-w-0">
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Eye className="w-6 h-6 text-amber-600" />
                                    About this Gemstone
                                </h2>
                                <div
                                    className="rich-text-content prose prose-lg max-w-full min-w-0 w-full text-gray-700 leading-relaxed break-normal"
                                    dangerouslySetInnerHTML={{ __html: gemstone.description }}
                                />
                            </div>
                        )}
                    </div>
                </div>

                {/* Sub-classes Section - Maximized */}
                {subItems.length > 0 && (
                    <div className="mb-10">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                                    Sub-classes & Varieties
                                </h2>
                                <p className="text-gray-600">
                                    Explore the diverse varieties and sub-categories of {gemstone.title}
                                </p>
                            </div>
                            <div className="hidden sm:flex items-center gap-2 text-sm text-amber-600">
                                <Layers className="w-4 h-4" />
                                <span>{subItems.length} varieties available</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {subItems.map((sub) => (
                                <SubClassCard key={sub.gamestone_id} item={sub} />
                            ))}
                        </div>
                    </div>
                )}

                {/* Documents Section */}
                <DocumentsSection attachments={docs} />

                {/* Footer Navigation */}
                <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <Link
                        href="/mining/gemstones"
                        className="inline-flex items-center gap-2 text-amber-700 hover:text-amber-800 font-semibold transition-colors group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Browse All Gemstones
                    </Link>

                    <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span>Last updated: {new Date().toLocaleDateString()}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}