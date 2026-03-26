"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Activity, ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "../../ui/button";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";

// Define a type for multi-language text
type LocalizedText = {
    en: string;
    am: string;
};

// Define a type for each slide
export type Slide = {
    id: number;
    title: LocalizedText;
    description: LocalizedText;
    image: string;
    bg: string;
};

import { useGetSlidersQuery } from "@/redux/api/sliderApi";
import { getFileUrl } from "@/utils/fileUrl";

export default function HeroSection() {
    const { data: apiSliders, isLoading } = useGetSlidersQuery();
    const [slides, setSlides] = useState<Slide[]>([]);
    const [current, setCurrent] = useState(0);
    const [locale, setLocale] = useState<keyof LocalizedText>("en"); // default language
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const t = useTranslations();
    const pathname = usePathname();

    // Load locale from pathname
    useEffect(() => {
        if (pathname.startsWith("/am")) {
            setLocale("am");
        } else {
            setLocale("en");
        }
    }, [pathname]);

    // Update slides when API data arrives
    useEffect(() => {
        if (apiSliders && apiSliders.length > 0) {
            const mappedSlides: Slide[] = apiSliders.map((s, index) => ({
                id: index + 1,
                title: {
                    en: s.title,
                    am: s.title, // Fallback to same title if no localization
                },
                description: {
                    en: s.description || "",
                    am: s.description || "",
                },
                image: s.attachment?.file_path ? getFileUrl(s.attachment.file_path) : "",
                bg: "bg-base-200/60", // Default bg style
            }));
            setSlides(mappedSlides);
            setCurrent(0); // Reset to first slide when new data arrives
        }
    }, [apiSliders]);

    // Go to next slide
    const next = () => setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    const prev = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

    // Start automatic slide
    const startAutoSlide = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => next(), 10000);
    };

    useEffect(() => {
        if (slides.length > 0) {
            startAutoSlide();
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [current, slides]);

    // Show loading state while fetching data
    if (isLoading) {
        return (
            <div className="relative w-full h-[80vh] overflow-hidden bg-black flex items-center justify-center">
                <div className="text-white">Loading...</div>
            </div>
        );
    }

    if (slides.length === 0) return null;

    return (
        <div className="relative w-full h-[80vh] overflow-hidden bg-black">

            {slides.map((slide, index) => {
                const isActive = index === current;
                const hasMultipleSlides = slides.length > 1;

                // Determine the classes based on slide count
                let transitionClasses = "";

                if (hasMultipleSlides) {
                    const isPrev = index === (current - 1 + slides.length) % slides.length;
                    transitionClasses = clsx(
                        "absolute inset-0 will-change-[transform,opacity,filter]",
                        "transition-[transform,opacity,filter] duration-[6000ms]",
                        "ease-[cubic-bezier(0.25,0.1,0.25,1)]",
                        isActive && "translate-x-0 opacity-100 blur-0 z-20",
                        isPrev && "-translate-x-full opacity-0 blur-xl z-10",
                        !isActive && !isPrev && "translate-x-full opacity-0 blur-xl z-0 pointer-events-none"
                    );
                } else {
                    // Single slide - no transitions
                    transitionClasses = clsx(
                        "absolute inset-0",
                        isActive && "z-20",
                        !isActive && "hidden"
                    );
                }

                return (
                    <div
                        key={slide.id}
                        className={transitionClasses}
                    >
                        <div className={clsx("relative flex items-center justify-start w-full h-full overflow-hidden", slide.bg)}>
                            {/* Optimize image rendering */}
                            <img
                                src={slide.image}
                                alt={slide.title[locale] || slide.title['en']}
                                className="absolute inset-0 w-full h-full object-cover"
                                style={{
                                    imageRendering: 'auto',
                                    filter: 'none' // Ensure no filters are applied
                                }}
                                loading="eager"
                            />
                            {/* Dark overlay with proper opacity */}
                            <div className="absolute inset-0 bg-black/50 z-10" />

                            <div className="relative z-20 w-full h-full flex items-center justify-center mb-20">
                                <div className="max-w-7xl w-full px-6">
                                    <div className="inline-flex items-center gap-2 rounded-full bg-golden-dark10 text-golden-dark text-sm font-semibold mb-10">
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-golden-dark opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-golden-dark"></span>
                                        </span>
                                        {t("hero.badge")}
                                    </div>

                                    <h2 className="text-2xl sm:text-5xl font-bold mb-4 text-white">
                                        {slide.title[locale] || slide.title['en']}
                                    </h2>
                                    <p className="text-white opacity-90 text-base sm:text-lg mb-10 md:max-w-[70%]">
                                        {slide.description[locale] || slide.description['en']}
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4 mt-4 w-fit">
                                        <Button className="bg-golden-dark z-30 w-full sm:w-fit hover:bg-golden-darkHover h-12 text-base flex items-center justify-center">
                                            {t("hero.button")} <ArrowRight className="w-4 h-4" />
                                        </Button>
                                        <Button className="bg-white z-30 text-primary w-full sm:w-fit h-12 text-base hover:bg-white/80">
                                            <Activity className="w-4 h-4" /> {t("hero.button2")}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}

            {/* Only show controls if there are multiple slides */}
            {slides.length > 1 && (
                <>
                    <button
                        onClick={prev}
                        className="absolute start-5 top-1/2 -translate-y-1/2 z-30 size-10 rounded-full bg-base-100 shadow-sm flex items-center justify-center hover:bg-base-200 transition"
                    >
                        <span className="icon-[tabler--chevron-left] size-5" />
                    </button>
                    <button
                        onClick={next}
                        className="absolute end-5 top-1/2 -translate-y-1/2 z-30 size-10 rounded-full bg-base-100 shadow-sm flex items-center justify-center hover:bg-base-200 transition"
                    >
                        <span className="icon-[tabler--chevron-right] size-5" />
                    </button>
                </>
            )}

            {/* Pagination - only show for multiple slides */}
            {slides.length > 1 && (
                <div className="absolute px-4 max-w-7xl mx-auto w-full bottom-4 inset-x-0 flex justify-between items-center gap-3 z-30">
                    <div className="flex gap-1">
                        {slides.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrent(idx)}
                                className={clsx(
                                    "h-2.5 w-2.5 rounded-full transition",
                                    current === idx ? "bg-golden-classic" : "bg-white/60 hover:bg-white"
                                )}
                            />
                        ))}
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={prev}
                            className="rounded-md p-1 md:p-3 hover:bg-white/80 bg-white shadow-sm flex items-center justify-center transition"
                        >
                            <ChevronDown className="rotate-90 size-7" />
                        </button>
                        <button
                            onClick={next}
                            className="p-1 md:p-3 rounded-md hover:bg-white/80 bg-white shadow-sm flex items-center justify-center transition"
                        >
                            <ChevronDown className="-rotate-90 h-6" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}