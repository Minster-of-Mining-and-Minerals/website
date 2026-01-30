"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import Image from "next/image";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "../ui/button";

const slides = [
    {
        id: 1,
        title: "Welcome to Our Platform",
        description: "Build modern, fast, and beautiful web experiences with ease.",
        image: "/home-1.jpg",
        bg: "bg-base-200/60",
    },
    {
        id: 2,
        title: "Powerful Components",
        description: "Reusable UI components built with Tailwind CSS.",
        image: "/home-2.jpg",
        bg: "bg-base-200/80",
    },
    {
        id: 3,
        title: "Fully Responsive",
        description: "Looks great on desktop, tablet, and mobile devices.",
        image: "/home-3.jpg",
        bg: "bg-base-200",
    },
    {
        id: 4,
        title: "Fully Responsive",
        description: "Looks great on desktop, tablet, and mobile devices.",
        image: "/home-4.jpg",
        bg: "bg-base-200",
    },
];

export default function HeroSection() {
    const [current, setCurrent] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    // Go to next slide
    const next = () => setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    const prev = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

    // Start automatic slide
    const startAutoSlide = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        intervalRef.current = setInterval(() => next(), 10000);
    };

    // Reset interval when current changes
    useEffect(() => {
        startAutoSlide();
        return () => intervalRef.current && clearInterval(intervalRef.current);
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
                            {/* Background Image */}
                            <Image
                                src={slide.image}
                                alt={slide.title}
                                fill
                                className="object-cover w-full"
                                priority={isActive}
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-black/40" />

                            {/* Content */}
                            <div className="relative z-10 w-full h-full flex items-center justify-center">
                                <div className="max-w-7xl w-full px-6">
                                    <h2 className="text-3xl sm:text-5xl font-bold mb-4 text-white">
                                        {slide.title}
                                    </h2>
                                    <p className="text-white opacity-90 text-base sm:text-lg">
                                        {slide.description}
                                    </p>
                                    <div className="flex gap-4 mt-4">
                                        <Button className="bg-golden-dark hover:bg-golden-darkHover h-12 w-48 text-xl flex items-center justify-center">
                                            Get Started <ArrowRight className="w-4 h-4 ml-2" />
                                        </Button>
                                        <Button className="bg-white text-primary h-12 w-48 text-xl bg-white hover:bg-white/80">Get Started</Button>
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
        </div>
    );
}
