"use client";

import React, { useState, useEffect } from "react";
import { Quote } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import PageHeader from "@/components/pages/home-page-components/PageHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const tabs = [
    { key: "federal", label: "Federal Office", slug: "/contact" },
    { key: "regional", label: "Regional Offices", slug: "/contact/regional-offices" },
    { key: "tenders", label: "Tenders and Vacancies", slug: "/contact/tenders-and-vacancies" },
];


export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [open, setOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const normalizedPathname = pathname.replace(/^\/(en|am)/, "");

    // Determine active tab based on current route
    const activeTab = tabs.find(tab => tab.slug === normalizedPathname)?.key || "federal";
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




    // Find active item for title & breadcrumb
    const activeItem = tabs.find((item) => item.slug === normalizedPathname);
    const title = activeItem?.label ?? "Contact Us";

    return (
        <>
            {/* Hero / Page Header (shared across all administration pages) */}
            <PageHeader
                title={title}
                icon={<Quote />}
                description="Contact us for more information"
            />
            <div className="relative">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl z-[999] px-4 md:px-6">
                    <div className="py-5 w-full bg-white rounded-lg border border-gray-200 shadow-xl px-4 md:px-7">
                        <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto whitespace-nowrap hide-scrollbar">
                            {tabs.map((tab) => (
                                <Link key={tab.key} href={tab.slug} className="shrink-0">
                                    <Button
                                        className={`px-5 py-3 rounded-md text-sm font-medium bg-white transition
                    ${activeTab === tab.key
                                                ? "border bg-golden-dark text-white hover:bg-golden-dark border-golden-dark"
                                                : "text-gray-500 hover:text-golden-dark hover:bg-golden-dark20"
                                            }`}
                                    >
                                        {tab.label}
                                    </Button>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {children}

        </>
    );
}