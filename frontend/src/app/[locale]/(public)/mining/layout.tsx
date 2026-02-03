"use client";

import React, { useState } from "react";
import { ChevronDown, Quote } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import PageHeader from "@/components/common/PageHeader";

const items = [
    { label: "A snapshot of Ethiopia's mining sector", slug: "/mining" },
    { label: "Mining Licensing and Legislations", slug: "/mining/licensing-and-legislation" },
    { label: "Region-Specific Legislation & Regulations", slug: "/mining/regional-legislation" },
    { label: "Application Portal", slug: "/mining/application-portal" },
    { label: "Mining Data", slug: "/mining/data" },
    { label: "Gemstones", slug: "/mining/gemstones" },
];


/**
 * Next.js App Router layout
 * File name: app/administration/layout.tsx
 *
 * - PageHeader is kept
 * - Sidebar stays on the LEFT
 * - Right side updates automatically per route
 */
export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    // remove locale prefix: /en/about -> /about
    const normalizedPathname = pathname.replace(/^\/(en|am)/, "");

    // Find active item for title & breadcrumb
    const activeItem = items.find((item) => item.slug === normalizedPathname);
    const title = activeItem?.label ?? "Background of MoM";

    return (
        <>
            {/* Hero / Page Header (shared across all administration pages) */}
            <PageHeader
                title="Overview of Ethiopia’s mining sector"
                icon={<Quote />}
                description="Overview of Ethiopia’s mining sector"
            />

            <section className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* LEFT SIDEBAR */}
                <aside className="bg-white rounded-xl shadow-sm border overflow-hidden h-fit md:col-span-1">
                    <button
                        onClick={() => setOpen((v) => !v)}
                        className="w-full bg-golden-dark text-white px-5 py-3 font-medium flex items-center justify-between md:cursor-default"
                    >
                        <span className="flex items-center gap-2">
                            <span className="text-lg">☰</span>
                            more on about MoM
                        </span>
                        <ChevronDown
                            className={`h-5 w-5 transition-transform md:hidden ${open ? "rotate-180" : "rotate-0"}`}
                        />
                    </button>

                    <ul className={`divide-y text-sm md:block ${open ? "block" : "hidden"}`}>
                        {items.map((item) => {
                            const active = normalizedPathname === item.slug;
                            return (
                                <li
                                    key={item.slug}
                                    onClick={() => router.push(item.slug)}
                                    className={`px-5 py-3 cursor-pointer hover:bg-gray-50 ${active ? "text-golden-dark font-medium" : "text-gray-700"
                                        }`}
                                >
                                    » {item.label}
                                </li>
                            );
                        })}
                    </ul>
                </aside>

                {/* RIGHT MAIN CONTENT (route content) */}
                <div className="md:col-span-3 md:pl-6">
                    <div className="flex items-start gap-6 mb-8">
                        <div>
                            <h1 className="text-2xl flex gap-2 flex-col font-serif text-teal-800 leading-tight">
                                {title}
                                <span className="text-golden-dark h-1 w-1/2 bg-teal-800"></span>
                            </h1>

                        </div>
                    </div>

                    {/* Route-specific content renders here */}
                    <div className="prose max-w-none ">{children}</div>
                </div>
            </section>
        </>
    );
}
