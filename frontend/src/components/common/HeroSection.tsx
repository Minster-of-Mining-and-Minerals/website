"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import { Activity, ArrowRight, ChevronDown, InfoIcon, ThermometerSun, WavesArrowDown, WavesIcon } from "lucide-react";
import { Button } from "../ui/button";
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

const slides: Slide[] = [
    {
        id: 1,
        title: {
            en: "A New Horizon of Opportunity",
            am: "ኢትዮጵያ፡ የአዲስ ዕድል ገፅታ",
        },
        description: {
            en: "Welcome to the Ministry of Mines, your gateway to Ethiopia’s abundant natural resources and investment opportunities.",
            am: "ወደ የማዕድን ሚኒስቴር እንኳን ደህና መጡ፤ እዚህ በኢትዮጵያ ያሉ በጣም ባለሃብቶች ሀብቶችን ለማግኘት ዕድሎች ይገኛሉ።",
        },
        image: "/home-1.jpg",
        bg: "bg-base-200/60",
    },
    {
        id: 2,
        title: {
            en: "Invest with Confidence",
            am: "በእምነት ያስገቡ",
        },
        description: {
            en: "The MoM guides investors through licenses, legislation, and geodata to make your investment journey seamless.",
            am: "ሚኒስቴሩ በፈቃድ፣ ሕግና ጂዮ-ዳታ አገልግሎት በመስጠት የተጠቃሚ የሆነ የስራ ሂደት ይሰጣል።",
        },
        image: "/home-2.jpg",
        bg: "bg-base-200/80",
    },
    {
        id: 3,
        title: {
            en: "Unlock Natural Wealth",
            am: "የኢትዮጵያ ተፈጥሮ ሀብትን ይክፈቱ",
        },
        description: {
            en: "From mining to geothermal energy and petroleum, Ethiopia offers a wide range of opportunities for visionary investors.",
            am: "ከማዕድን እስከ ጂዮ-ርማል ኃይል እና ነዳጅ ሀብቶች ድረስ፣ ኢትዮጵያ ለራዕይ ያላቸው ተቀባዮች ብዙ ዕድሎች ትሰጣለች።",
        },
        image: "/home-3.jpg",
        bg: "bg-base-200",
    },
    {
        id: 4,
        title: {
            en: "Rapid Growth Awaits You",
            am: "የኢትዮጵያ ፈጣን እድገት ይጠብቃል",
        },
        description: {
            en: "Join one of Africa’s fastest-growing economies and explore the Ministry of Mines’ resources to maximize your impact.",
            am: "በአፍሪካ ውስጥ ከፍ የሚደርስ ኢኮኖሚ ውስጥ ተሳትፎ አድርጉ እና ሚኒስቴሩ ያቀረበውን ሀብት እየተጠቀሙ ተፅዕኖ ከፍ ያድርጉ።",
        },
        image: "/home-4.jpg",
        bg: "bg-base-200",
    },
];


export default function HeroSection() {
    const [current, setCurrent] = useState(0);
    const [locale, setLocale] = useState<keyof LocalizedText>("en"); // default language
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const t = useTranslations();
    const pathname = usePathname();
    // Load locale from localStorage
    useEffect(() => {
        if (pathname.startsWith("/am")) {
            setLocale("am");
        } else {
            setLocale("en");
        }
    }, [pathname]);

    // Go to next slide
    const next = () => setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    const prev = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

    // Start automatic slide
    const startAutoSlide = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => next(), 10000);
    };

    useEffect(() => {
        startAutoSlide();
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [current]);

    return (
        <div className="relative w-full h-[80vh] overflow-hidden">
            {slides.map((slide, index) => {
                const isActive = index === current;
                return (
                    <div
                        key={slide.id}
                        className={clsx(
                            "absolute inset-0 transition-all duration-700 ease-in-out",
                            isActive ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12 pointer-events-none"
                        )}
                    >
                        <div className={clsx("relative flex items-center justify-start w-full h-full overflow-hidden", slide.bg)}>
                            <Image
                                src={slide.image}
                                alt={slide.title[locale]}
                                fill
                                className="object-cover w-full"
                                priority={isActive}
                            />
                            <div className="absolute inset-0 bg-black/40" />

                            <div className="relative z-10 w-full h-full flex items-center justify-center mb-20">
                                <div className="max-w-7xl w-full px-6">
                                    <div className="inline-flex items-center gap-2   rounded-full bg-golden-dark10 text-golden-dark text-sm font-semibold mb-10">
                                        {/* Animated ping dot */}
                                        <span className="relative flex h-2 w-2">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-golden-dark opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-golden-dark"></span>
                                        </span>

                                        {t("hero.badge")}
                                    </div>

                                    <h2 className="text-2xl sm:text-5xl font-bold mb-4 text-white">
                                        {slide.title[locale]}
                                    </h2>
                                    <p className="text-white opacity-90 text-base sm:text-lg mb-10 md:max-w-[70%]">
                                        {slide.description[locale]}
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-4 mt-4 w-fit">
                                        <Button className="bg-golden-dark w-full sm:w-fit hover:bg-golden-darkHover h-12  text-base flex items-center justify-center">
                                            {t("hero.button")} <ArrowRight className="w-4 h-4 " />
                                        </  Button>
                                        <Button className="bg-white text-primary w-full sm:w-fit h-12  text-base hover:bg-white/80">
                                            <Activity className="w-4 h-4 " />  {t("hero.button2")}
                                        </Button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}

            {/* Controls */}
            <button
                onClick={prev}
                className="absolute start-5 top-1/2 -translate-y-1/2 z-10 size-10 rounded-full bg-base-100 shadow-sm flex items-center justify-center hover:bg-base-200 transition"
            >
                <span className="icon-[tabler--chevron-left] size-5" />
            </button>
            <button
                onClick={next}
                className="absolute end-5 top-1/2 -translate-y-1/2 z-10 size-10 rounded-full bg-base-100 shadow-sm flex items-center justify-center hover:bg-base-200 transition"
            >
                <span className="icon-[tabler--chevron-right] size-5" />
            </button>

            {/* Pagination */}
            <div className="absolute px-4 max-w-7xl mx-auto w-full bottom-4 inset-x-0 flex justify-between items-center gap-3 z-10">
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
                        className="size-10 rounded-md hover:bg-white/80 bg-white shadow-sm flex items-center justify-center transition"
                    >
                        <ChevronDown className="rotate-90" />
                    </button>
                    <button
                        onClick={next}
                        className="size-10 rounded-md hover:bg-white/80 bg-white shadow-sm flex items-center justify-center transition"
                    >
                        <ChevronDown className="-rotate-90" />
                    </button>
                </div>
            </div>
        </div >
    );
}
