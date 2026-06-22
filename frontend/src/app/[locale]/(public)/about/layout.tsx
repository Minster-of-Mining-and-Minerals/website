"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown, Quote } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import PageHeader from "@/components/pages/home-page-components/PageHeader";
import { AnimatePresence, motion } from "framer-motion";

const items = [
    { label: "MoM Background", slug: "/about" },
    { label: "Ministry of Mines", slug: "/about/minister" },
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

            <section className="mx-auto">
                {/* RIGHT MAIN CONTENT (route content) */}
                <div className="w-full">
                    {/* Route-specific content renders here */}
                    <div className="prose max-w-none">{children}</div>
                </div>
            </section>
        </>
    );
}