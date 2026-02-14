"use client";

import React from "react";
import { Quote } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import PageHeader from "@/components/pages/home-page-components/PageHeader";
import { Button } from "@/components/ui/button";

const items = [
    { label: "Snapshot of mining sector", slug: "/mining", description: "Overview of Ethiopia's mining sector" },
    { label: "Licensing and Legislations", slug: "/mining/licensing-and-legislation", description: "Overview of Ethiopia's mining sector" },
    { label: "Legislation & Regulations", slug: "/mining/regional-legislation", description: "Overview of Ethiopia's mining sector" },
    { label: "Application Portal", slug: "/mining/application-portal", description: "Digital gateway for transparent and efficient mining license applications with the Ministry of Mines" },
    { label: "Mining Data", slug: "/mining/data", description: "Overview of Ethiopia's mining sector" },
    { label: "Gemstones", slug: "/mining/gemstones", description: "Overview of Ethiopia's mining sector" },
];

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();

    // remove locale prefix: /en/about -> /about
    const normalizedPathname = pathname.replace(/^\/(en|am)/, "");

    // Find active item for title & breadcrumb
    const activeItem = items.find((item) => item.slug === normalizedPathname);
    const title = activeItem?.label ?? "Background of MoM";
    const description = activeItem?.description ?? "Overview of Ethiopia's mining sector";

    return (
        <>
            {/* Hero / Page Header (shared across all administration pages) */}
            <PageHeader
                title="Overview of Ethiopia's mining sector"
                icon={<Quote />}
                description="Overview of Ethiopia's mining sector"
            />

            {/* Main container with relative positioning for overlay */}
            <div className="relative">
                {/* Overlay Search Bar - positioned to cover half of the PageHeader */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl z-[999]">
                    <div className="pt-5 pb-10 w-full bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden space-y-6 px-7">
                        <h1 className="text-2xl font-bold text-golden-dark text-center">More On Mining</h1>


                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl z-[999]">
                            <div className="pt-5 pb-10 w-full bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden space-y-6 px-7">
                                <h1 className="text-2xl font-bold text-golden-dark text-center">More On Mining</h1>


                                <div className="bg-white flex gap-4 overflow-x-auto whitespace-nowrap px-2 hide-scrollbar">
                                    {items.map((item) => {
                                        const active = normalizedPathname === item.slug;
                                        return (
                                            <Button
                                                key={item.slug}
                                                onClick={() => router.push(item.slug)}
                                                className={`p-6 cursor-pointer transition-colors bg-gray-100 border border-gray-200  ${active ? "bg-golden-dark text-white font-semibold border-l-4 border-golden-dark shadow-xl hover:bg-golden" : "text-gray-700 hover:bg-gray-50"
                                                    }`}
                                            >
                                                {item.label}
                                            </Button>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content section starts below the overlay */}
                <section className="pt-20 md:pt-28 max-w-7xl mx-auto px-6 py-12">
                    {/* CENTER MAIN CONTENT (route content) */}
                    <div className="w-full md:pl-8">
                        <div className="flex items-start gap-6 mb-8">
                            <div>
                                <h1 className="text-2xl flex gap-2 flex-col font-serif text-teal-800 leading-tight">
                                    {title}
                                    <span className="text-golden-dark h-1 w-1/2 bg-teal-800"></span>
                                    <p className="text-gray-600 text-lg text-teal-800">{description}</p>
                                </h1>
                            </div>
                        </div>

                        {/* Route-specific content renders here */}
                        <div className="prose max-w-none">{children}</div>
                    </div>
                </section>
            </div>
        </>
    );
}
