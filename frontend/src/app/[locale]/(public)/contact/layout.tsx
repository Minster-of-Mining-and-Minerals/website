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

    const [activeTab, setActiveTab] = React.useState("federal");

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



    // remove locale prefix: /en/about -> /about
    const normalizedPathname = pathname.replace(/^\/(en|am)/, "");

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
            <div className="relative ">
                {/* Overlay Search Bar - positioned to cover half of the PageHeader */}
                <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-7xl z-[999]">

                    <div className="py-5 flex justify-center items-center w-full    px-7">

                        <div className="container  mx-auto max-w-7xl  px-4 bg-white  py-2 rounded-lg  border border-gray-200   w-fit ">
                            <div className="flex flex-wrap gap-2 w-fit   ">
                                {tabs.map((tab) => (
                                    <Link href={tab.slug} >
                                        <Button
                                            key={tab.key}
                                            onClick={() => setActiveTab(tab.key)}
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
            </div>
            {children}

        </>
    );
}