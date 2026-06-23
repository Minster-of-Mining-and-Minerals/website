"use client";

import React, { useState } from "react";
import { useGetPetroleumObjectivesQuery } from "@/redux/api/petroleumObjectiveApi";
import { getImageUrl } from "@/utils/fileUrl";
import { Loader2, ChevronLeft, ChevronRight } from "lucide-react";
import PublicEmptyState from "@/components/common/PublicEmptyState";
import { useTranslations } from "next-intl";

/** 
 * Improved Image Slider component with proper image display and thumbnail navigation
 */
const ImageSlider = ({ attachments, title }: { attachments: any[], title: string }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    if (!attachments || attachments.length === 0) return null;

    const currentFile = attachments[currentIndex]?.attachment;
    const imageUrl = currentFile?.file_path ? getImageUrl(currentFile, "large") : null;

    if (!imageUrl) return null;

    const next = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % attachments.length);
    };

    const prev = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + attachments.length) % attachments.length);
    };

    return (
        <div className="space-y-4">
            {/* Main Image Container */}
            <div className="relative w-full bg-gray-100 rounded-xl overflow-hidden group">
                <div className="relative w-full pt-[56.25%]">
                    <img
                        src={imageUrl}
                        alt={`${title} - view ${currentIndex + 1}`}
                        className="absolute top-0 left-0 w-full h-full object-contain mt-0"
                    />
                </div>

                {/* Navigation Arrows */}
                {attachments.length > 1 && (
                    <>
                        <button
                            onClick={prev}
                            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 backdrop-blur-sm p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity z-10"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button
                            onClick={next}
                            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 backdrop-blur-sm p-2 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity z-10"
                        >
                            <ChevronRight size={24} />
                        </button>

                        {/* Dots Indicator */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                            {attachments.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentIndex(i)}
                                    className={`transition-all ${i === currentIndex
                                        ? "w-6 h-2 bg-white"
                                        : "w-2 h-2 bg-white/60"
                                        } rounded-full`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>

            {/* Thumbnail Navigation */}
            {attachments.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-none justify-center flex-wrap">
                    {attachments.map((att, i) => {
                        const thumbUrl = att.attachment?.file_path ? getImageUrl(att.attachment, "thumb") : null;
                        if (!thumbUrl) return null;
                        return (
                            <button
                                key={i}
                                onClick={() => setCurrentIndex(i)}
                                className={`relative w-24 h-20 cursor-pointer rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${i === currentIndex
                                    ? "border-[#094C81] shadow-lg scale-105"
                                    : "border-gray-200 opacity-70 hover:opacity-100"
                                    }`}
                            >
                                <img
                                    src={thumbUrl}
                                    alt={`thumbnail ${i + 1}`}
                                    className="w-full h-full object-cover mt-0"
                                />
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

const PetroleumObjectivePage = () => {
    const { data: objectives = [], isLoading } = useGetPetroleumObjectivesQuery();
    const t = useTranslations("empty_state");

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-40 space-y-4">
                <Loader2 className="h-10 w-10 animate-spin text-[#094C81]" />
                <p className="text-gray-500 animate-pulse">Loading petroleum insights...</p>
            </div>
        );
    }

    // Split data into headline and others
    const headline = objectives.find(obj => obj.type === "headline");
    const others = objectives.filter(obj => obj.type === "others");

    // If no dynamic data exists, we could show a placeholder or empty state
    if (objectives.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-6 py-20">
                <PublicEmptyState title={t("petroleum_objectives_title")} />
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-12 space-y-20">
            {/* HERO SECTION (HEADLINE) - Centered image with thumbnail navigation */}
            {headline && (
                <section className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    {/* Title */}
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-[#073954] mb-4">
                            {headline.title}
                        </h1>
                        {headline.description && headline.description !== headline.title && (
                            <p className="text-lg text-gray-600">{headline.description}</p>
                        )}
                    </div>

                    {/* Centered Image Slider with Thumbnails */}
                    <div className="w-full max-w-5xl mx-auto">
                        <ImageSlider
                            attachments={headline.attachments || []}
                            title={headline.title}
                        />
                    </div>

                    {/* Text content below image */}
                    <div className="w-full max-w-4xl mx-auto">
                        <div className="space-y-6">
                            {headline.content && (
                                <div
                                    className="prose prose-lg max-w-none text-gray-700 leading-relaxed rich-text-content break-words"
                                    dangerouslySetInnerHTML={{ __html: headline.content }}
                                />
                            )}

                            {headline.objectives && headline.objectives.length > 0 && (
                                <ul className="grid md:grid-cols-2 gap-4 pt-4">
                                    {headline.objectives.map((obj, i) => (
                                        <li key={i} className="flex gap-3 bg-gray-50 p-4 rounded-lg border border-gray-100">
                                            <div className="h-2 w-2 rounded-full bg-[#094C81] mt-2 shrink-0" />
                                            <span className="text-gray-700 break-words">{obj}</span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* OTHER SECTIONS - alternating layout with proper image display */}
            {others.map((section, index) => (
                <section
                    key={section.petroleum_objective_id}
                    className="grid md:grid-cols-2 gap-12 items-start border-t border-gray-100 pt-16 animate-in fade-in duration-500 delay-100"
                >
                    {/* IMAGE SIDE - Even indexes show images on left, odds on right */}
                    <div className={`space-y-6 ${index % 2 !== 0 ? "md:order-last" : ""}`}>
                        <ImageSlider
                            attachments={section.attachments || []}
                            title={section.title}
                        />
                    </div>

                    {/* CONTENT SIDE */}
                    <div className="space-y-6">
                        <h2 className="text-2xl font-semibold text-gray-800">
                            {section.title}
                        </h2>

                        {section.content && (
                            <div
                                className="prose prose-blue max-w-none text-gray-700 leading-relaxed rich-text-content break-words"
                                dangerouslySetInnerHTML={{ __html: section.content }}
                            />
                        )}

                        {section.objectives && section.objectives.length > 0 && (
                            <ul className="list-disc pl-6 space-y-2">
                                {section.objectives.map((fact, i) => (
                                    <li key={i} className="text-gray-700 break-words">
                                        {fact}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </section>
            ))}
        </div>
    );
};

export default PetroleumObjectivePage;