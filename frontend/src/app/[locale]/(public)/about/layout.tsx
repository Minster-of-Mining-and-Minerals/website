"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown, Quote } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import PageHeader from "@/components/pages/home-page-components/PageHeader";
import { AnimatePresence, motion } from "framer-motion";

const items = [
    { label: "MoM Background", slug: "/about" },
    { label: "Minister of Mines", slug: "/about/minister" },
    { label: "Mission, Vision and Values", slug: "/about/mission-vision-and-values" },
    { label: "Organizational Structure", slug: "/about/organizational-structure" },
];
const sidebarVariants = {
    closed: {
        height: 0,
        opacity: 0,
    },
    open: {
        height: "auto",
        opacity: 1,
    },
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [open, setOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    // Check if we're on mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);

        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Auto-close sidebar on mobile when route changes
    useEffect(() => {
        if (isMobile) {
            setOpen(false);
        }
    }, [pathname, isMobile]);

    // Auto-open sidebar on desktop
    useEffect(() => {
        if (!isMobile) {
            setOpen(true);
        }
    }, [isMobile]);

    // remove locale prefix: /en/about -> /about
    const normalizedPathname = pathname.replace(/^\/(en|am)/, "");

    // Find active item for title & breadcrumb
    const activeItem = items.find((item) => item.slug === normalizedPathname);
    const title = activeItem?.label ?? "Background of MoM";

    return (
        <>
            {/* Hero / Page Header (shared across all administration pages) */}
            <PageHeader
                title="About MoM"
                icon={<Quote />}
                description="About the Ministry of Mines"
            />

            <section className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
                {/* LEFT SIDEBAR */}
                <aside className="bg-white rounded-xl shadow-sm border overflow-hidden h-fit md:col-span-1">
                    <button
                        onClick={() => setOpen((v) => !v)}
                        className="w-full bg-golden-dark text-white px-5 py-3 font-medium flex items-center justify-between"
                    >
                        <span className="flex items-center gap-2">
                            <span className="text-lg">☰</span>
                            more on about MoM
                        </span>
                        <ChevronDown
                            className={`h-5 w-5 transition-transform md:hidden ${open ? "rotate-180" : "rotate-0"
                                }`}
                        />
                    </button>

                    <AnimatePresence>
                        {(open || !isMobile) && (
                            <motion.ul
                                variants={sidebarVariants}
                                initial={isMobile ? "closed" : "open"}
                                animate="open"
                                exit={isMobile ? "closed" : undefined}
                                transition={{ duration: 0.35, ease: "easeInOut" }}
                                className="divide-y text-sm overflow-hidden"
                            >
                                {items.map((item) => {
                                    const active = normalizedPathname === item.slug;

                                    return (
                                        <motion.li
                                            key={item.slug}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -10 }}
                                            transition={{ duration: 0.2 }}
                                            onClick={() => {
                                                router.push(item.slug);
                                                if (isMobile) setOpen(false);
                                            }}
                                            className={`px-5 py-3 cursor-pointer hover:bg-gray-50 transition-colors
                            ${active ? "text-golden-dark font-medium" : "text-gray-700"}
                        `}
                                        >
                                            » {item.label}
                                        </motion.li>
                                    );
                                })}
                            </motion.ul>
                        )}
                    </AnimatePresence>

                </aside>

                {/* RIGHT MAIN CONTENT (route content) */}
                <div className="md:col-span-3">
                    <div className="flex items-start gap-6 mb-8">
                        <div>
                            <h1 className="text-2xl flex gap-1 flex-col font-serif text-teal-800 leading-tight">
                                {title}
                                <span className="text-golden-dark h-1 w-1/2 bg-teal-800"></span>
                            </h1>
                        </div>
                    </div>

                    {/* Route-specific content renders here */}
                    <div className="prose max-w-none">{children}</div>
                </div>
            </section>
        </>
    );
}