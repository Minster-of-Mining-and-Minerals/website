"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { ArrowRight, Briefcase, ChevronDown } from "lucide-react";
import { Button } from "../../ui/button";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useGetSlidersQuery } from "@/redux/api/sliderApi";
import { getImageUrl } from "@/utils/fileUrl";
import { HeroSectionSkeleton } from "@/components/skeletons";

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

type HeroButtonConfig = {
    label: string;
    href: string;
};

const DEFAULT_PRIMARY_HREF = "/investigating-in-ethiopia";
const DEFAULT_SECONDARY_HREF = "/services";

const slideVariants = {
    initial: (direction: number) => ({
        x: direction > 0 ? "100%" : "-100%",
        opacity: 0,
        scale: 1.1,
    }),
    animate: {
        x: 0,
        opacity: 1,
        scale: 1,
        transition: {
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.6 },
            scale: { duration: 8, ease: "linear" }, // Slow Ken Burns effect
        },
    },
    exit: (direction: number) => ({
        x: direction < 0 ? "100%" : "-100%",
        opacity: 0,
        scale: 1.1,
        transition: {
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.6 },
        },
    }),
};

const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (custom: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: 0.2 + custom * 0.15,
            duration: 0.8,
            ease: [0.21, 0.47, 0.32, 0.98],
        },
    }),
};

export default function HeroSection() {
    const { data: apiSliders, isLoading } = useGetSlidersQuery();
    const [slides, setSlides] = useState<Slide[]>([]);
    const [heroButtons, setHeroButtons] = useState<{
        primary: HeroButtonConfig;
        secondary: HeroButtonConfig;
    }>({
        primary: { label: "", href: DEFAULT_PRIMARY_HREF },
        secondary: { label: "", href: DEFAULT_SECONDARY_HREF },
    });
    const [current, setCurrent] = useState(0);
    const [direction, setDirection] = useState(0); // 1 for next, -1 for prev
    const [locale, setLocale] = useState<keyof LocalizedText>("en");
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const t = useTranslations();
    const pathname = usePathname();

    // Load locale from pathname
    useEffect(() => {
        setLocale(pathname.startsWith("/am") ? "am" : "en");
    }, [pathname]);

    // Update slides when API data arrives
    useEffect(() => {
        if (apiSliders && apiSliders.length > 0) {
            const firstSlide = apiSliders[0];

            setHeroButtons({
                primary: {
                    label: firstSlide.button_name?.trim() || "",
                    href: firstSlide.button_url?.trim() || DEFAULT_PRIMARY_HREF,
                },
                secondary: {
                    label: firstSlide.button2_name?.trim() || "",
                    href: firstSlide.button2_url?.trim() || DEFAULT_SECONDARY_HREF,
                },
            });

            const mappedSlides: Slide[] = apiSliders.map((s, index) => ({
                id: index + 1,
                title: { en: s.title, am: s.title },
                description: { en: s.description || "", am: s.description || "" },
                image: s.attachment?.file_path ? getImageUrl(s.attachment, "large") : "",
                bg: "bg-base-200/60",
            }));
            setSlides(mappedSlides);
            setCurrent(0);
        }
    }, [apiSliders]);

    // Navigation logic
    const paginate = (newDirection: number) => {
        setDirection(newDirection);
        setCurrent((prev) => (prev + newDirection + slides.length) % slides.length);
    };

    // Auto slide logic
    useEffect(() => {
        if (slides.length > 1) {
            intervalRef.current = setInterval(() => paginate(1), 10000);
            return () => {
                if (intervalRef.current) clearInterval(intervalRef.current);
            };
        }
    }, [current, slides.length]);

    if (isLoading) {
        return <HeroSectionSkeleton />;
    }

    if (slides.length === 0) return null;

    const primaryLabel = heroButtons.primary.label || t("hero.button");
    const primaryHref = heroButtons.primary.href || DEFAULT_PRIMARY_HREF;
    const secondaryLabel = heroButtons.secondary.label || t("hero.button2");
    const secondaryHref = heroButtons.secondary.href || DEFAULT_SECONDARY_HREF;
    const isExternalLink = (href: string) => href.startsWith("http://") || href.startsWith("https://");

    return (
        <section className="relative w-full h-[80vh] overflow-hidden bg-black">
            <AnimatePresence initial={false} custom={direction}>
                <motion.div
                    key={current}
                    custom={direction}
                    variants={slideVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className="absolute inset-0 z-10"
                >
                    <div className={clsx("relative flex items-center justify-start w-full h-full overflow-hidden", slides[current].bg)}>
                        {/* Background Image with Ken Burns effect via scale animation */}
                        <motion.img
                            src={slides[current].image}
                            alt={slides[current].title[locale] || slides[current].title['en']}
                            className="absolute inset-0 w-full h-full object-cover origin-center"
                            animate={{ scale: 1.15 }}
                            transition={{ duration: 15, ease: "linear" }}
                        />
                        
                        {/* Overlay Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />

                        {/* Content Overlay */}
                        <div className="relative z-20 w-full h-full flex items-center justify-center mb-10">
                            <div className="max-w-7xl w-full px-4 sm:px-6">
                                <motion.div
                                    variants={textVariants}
                                    initial="hidden"
                                    animate="visible"
                                    custom={0}
                                    className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 bg-golden-dark/20 text-golden-dark text-sm font-semibold mb-8 backdrop-blur-sm border border-golden-dark/30"
                                >
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-golden-dark opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-golden-dark"></span>
                                    </span>
                                    {t("hero.badge")}
                                </motion.div>

                                <motion.h2
                                    variants={textVariants}
                                    initial="hidden"
                                    animate="visible"
                                    custom={1}
                                    className="text-3xl sm:text-6xl font-bold mb-6 text-white leading-tight drop-shadow-lg"
                                >
                                    {slides[current].title[locale] || slides[current].title['en']}
                                </motion.h2>

                                <motion.p
                                    variants={textVariants}
                                    initial="hidden"
                                    animate="visible"
                                    custom={2}
                                    className="text-white/90 text-base sm:text-lg md:text-xl mb-8 sm:mb-12 md:max-w-[60%] leading-relaxed drop-shadow-sm"
                                >
                                    {slides[current].description[locale] || slides[current].description['en']}
                                </motion.p>

                                <motion.div
                                    variants={textVariants}
                                    initial="hidden"
                                    animate="visible"
                                    custom={3}
                                    className="flex w-full flex-col gap-3 sm:flex-row sm:gap-4 md:gap-5 mt-2 sm:mt-4"
                                >
                                    <Button
                                        asChild
                                        className="w-full sm:w-auto min-h-12 sm:min-h-14 h-auto py-3 sm:py-0 bg-golden-dark hover:bg-golden-dark/90 text-white px-5 sm:px-8 text-base sm:text-lg rounded-lg transition-all sm:hover:scale-105 active:scale-[0.98] shadow-xl shadow-golden-dark/20 border-none whitespace-normal sm:whitespace-nowrap"
                                    >
                                        <Link
                                            href={primaryHref}
                                            target={isExternalLink(primaryHref) ? "_blank" : undefined}
                                            rel={isExternalLink(primaryHref) ? "noopener noreferrer" : undefined}
                                        >
                                            <span className="text-center">{primaryLabel}</span>
                                            <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                                        </Link>
                                    </Button>
                                    <Button
                                        asChild
                                        variant="outline"
                                        className="w-full sm:w-auto min-h-12 sm:min-h-14 h-auto py-3 sm:py-0 bg-white/10 backdrop-blur-md text-white border-white/30 hover:bg-white/20 hover:text-white px-5 sm:px-8 text-base sm:text-lg rounded-lg transition-all sm:hover:scale-105 active:scale-[0.98] whitespace-normal sm:whitespace-nowrap"
                                    >
                                        <Link
                                            href={secondaryHref}
                                            target={isExternalLink(secondaryHref) ? "_blank" : undefined}
                                            rel={isExternalLink(secondaryHref) ? "noopener noreferrer" : undefined}
                                        >
                                            <Briefcase className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                                            <span className="text-center">{secondaryLabel}</span>
                                        </Link>
                                    </Button>
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            {slides.length > 1 && (
                <div className="absolute px-6 max-w-7xl mx-auto w-full bottom-10 inset-x-0 flex justify-between items-center z-30">
                    <div className="flex gap-2.5">
                        {slides.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => {
                                    setDirection(idx > current ? 1 : -1);
                                    setCurrent(idx);
                                }}
                                className={clsx(
                                    "h-1.5 rounded-full transition-all duration-500",
                                    current === idx ? "w-10 bg-golden-dark" : "w-3 bg-white/40 hover:bg-white/60"
                                )}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))}
                    </div>
                    
                    <div className="flex gap-4">
                        <button
                            onClick={() => paginate(-1)}
                            className="size-12 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 flex items-center justify-center hover:bg-golden-dark hover:border-golden-dark transition-all duration-300 group shadow-lg"
                        >
                            <ChevronDown className="rotate-90 size-6 group-hover:-translate-x-0.5 transition-transform" />
                        </button>
                        <button
                            onClick={() => paginate(1)}
                            className="size-12 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 flex items-center justify-center hover:bg-golden-dark hover:border-golden-dark transition-all duration-300 group shadow-lg"
                        >
                            <ChevronDown className="-rotate-90 h-6 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}
