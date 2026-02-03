"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowRight, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { Button } from "../ui/button";

type NewsItem = {
    id: number;
    title: string;
    description: string;
    image: string;
    date: string;
};
const news: NewsItem[] = [
    {
        id: 1,
        title: "The Ministry of Mines held a consultation forum with stakeholders",
        description:
            "The Ministry of Mines conducted a high-level consultation forum with regional and federal stakeholders to strengthen coordination, address sector challenges, and improve overall performance and policy alignment within the mining industry.",
        image: "/home-1.jpg",
        date: "2026-01-26",
    },
    {
        id: 2,
        title: "Mining sector reform progress review",
        description:
            "A comprehensive review meeting was held to assess progress, identify gaps, and discuss key challenges related to ongoing mining sector reforms aimed at improving efficiency, transparency, and investment attractiveness.",
        image: "/home-2.jpg",
        date: "2026-01-18",
    },
    {
        id: 3,
        title: "Capacity building workshop conducted",
        description:
            "A capacity building workshop was successfully conducted for mining sector professionals, focusing on technical skills, regulatory updates, and best practices to enhance institutional and operational effectiveness.",
        image: "/home-3.jpg",
        date: "2026-01-10",
    },
    {
        id: 4,
        title: "Regional mining coordination meeting",
        description:
            "Regional mining bureaus convened for a coordination meeting to align development strategies, share experiences, and strengthen collaboration for sustainable and well-regulated mineral resource development.",
        image: "/home-4.jpg",
        date: "2026-01-05",
    }
];


export default function LatestNewsSection() {
    const [active, setActive] = useState(0);

    // 🔁 Auto slide every 10s
    useEffect(() => {
        const interval = setInterval(() => {
            setActive((prev) => (prev === news.length - 1 ? 0 : prev + 1));
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    const next = () =>
        setActive((prev) => (prev === news.length - 1 ? 0 : prev + 1));

    const prev = () =>
        setActive((prev) => (prev === 0 ? news.length - 1 : prev - 1));

    const item = news[active];

    return (
        <section className="w-full py-20 bg-[#f7f9fc]">
            <div className="max-w-7xl mx-auto px-6 ">

                {/* Section Header */}
                <div className="mb-10 flex justify-between items-center">
                    <div className="flex  flex-col ">
                        <p className=" text-sm font-medium text-gray-500">News & Updates</p>
                        <h2 className="text-2xl sm:text-3xl font-bold text-golden-dark">
                            Latest News
                        </h2>
                        <div className="mt-3 h-1 w-20 bg-golden-dark rounded-full"></div>
                    </div>
                    {/* Creative "Find All News" Card */}
                    <div className="flex items-center">
                        <a
                            href="/news"
                            className="flex items-center gap-2 bg-golden-dark hover:bg-golden-darkHover text-white px-2 md:px-5 py-2 md:py-3 rounded-md md:rounded-2xl  shadow-md transition-all transform "
                        >
                            <span className="font-medium text-xs md:text-base">Find All News</span>
                            <ArrowRight size={18} />
                        </a>
                    </div>
                </div>

                {/* Main Card */}
                <div className="relative bg-white rounded-3xl shadow-sm overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2">

                        {/* Image */}
                        <div className="relative h-[250px] md:h-[370px]">
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-cover"
                                priority
                            />

                            {/* Date */}
                            <span className="absolute top-4 left-4 bg-white text-primary text-xs md:text-sm font-medium px-4 py-1 rounded-full shadow">
                                {item.date}
                            </span>


                        </div>

                        {/* Content */}
                        <div className="p-4 md:p-8 flex flex-col justify-center gap-4">
                            <h3 className="text-lg md:text-xl font-semibold text-gray-900">
                                {item.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                                {item.description}
                            </p>

                            <Button className="mt-4 bg-golden-dark hover:bg-golden-darkHover inline-flex items-center gap-2 w-fit px-6 py-3 rounded-md   text-white text-sm font-medium  transition">
                                Read More <ArrowRight size={16} />
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Thumbnails (6 images) */}
                <div className="mt-6 flex w-full md:justify-center md:items-center gap-4 overflow-x-auto py-2 px-4 md:px-0 scroll-smooth snap-x snap-mandatory">

                    {news.map((n, i) => (
                        <button
                            key={n.id}
                            onClick={() => setActive(i)}
                            className={clsx(
                                "relative flex-shrink-0 w-28 h-20 rounded-xl overflow-hidden border transition",
                                active === i
                                    ? "border-golden-dark ring-2 ring-primary/30"
                                    : "border-transparent opacity-70 hover:opacity-100"
                            )}
                        >
                            <Image
                                src={n.image}
                                alt={n.title}
                                fill
                                className="object-cover"
                            />
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}
