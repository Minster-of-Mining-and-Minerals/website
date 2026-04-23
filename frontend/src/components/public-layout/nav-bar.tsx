"use client";
import {
    Navbar,
    NavBody,
    NavItems,
    MobileNav,
    NavbarLogo,
    NavbarButton,
    MobileNavHeader,
    MobileNavToggle,
    MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { IconX } from "@tabler/icons-react";
import { usePathname } from "@/i18n/navigation";
import { useRouter } from "@/i18n/navigation"; // ✅ add this
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link"; // ✅ import Next.js Link

export default function PublicNavbar() {
    const t = useTranslations();
    const pathname = usePathname();
    const router = useRouter(); // ✅ add router
    const [openMobileIndex, setOpenMobileIndex] = useState<number | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { name: t("nav.home"), link: "/" },
        {
            name: t("nav.sector"),
            children: [
                { name: t("nav.mining"), link: "/mining" },
                { name: t("nav.geology"), link: "/geothermal" },
                { name: t("nav.petroleum"), link: "/petroleum" },
            ],
        },
        { name: t("nav.about"), link: "/about" },
        { name: t("nav.asm"), link: "/asm" },
        { name: t("nav.investigating-in-ethiopia"), link: "/investigating-in-ethiopia" },
        { name: t("nav.services"), link: "/services" },
        { name: t("nav.news"), link: "/news" },
        { name: t("nav.events"), link: "/events" },
        { name: t("nav.contact"), link: "/contact" },
    ];

    // ✅ Function to handle navigation
    const handleNavigation = (link: string) => {
        router.push(link);
        setIsMobileMenuOpen(false);
        setOpenMobileIndex(null);
    };

    return (
        <Navbar className="lg:py-3 z-[1000]">
            {/* Desktop Navigation */}
            <NavBody>
                <NavbarLogo />
                <NavItems items={navItems} />
            </NavBody>

            {/* Mobile Navigation */}
            <MobileNav>
                <MobileNavHeader>
                    <NavbarLogo />
                    <MobileNavToggle
                        isOpen={isMobileMenuOpen}
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    />
                </MobileNavHeader>

                <MobileNavMenu
                    isOpen={isMobileMenuOpen}
                    onClose={() => setIsMobileMenuOpen(false)}
                >
                    <div className="flex items-center justify-between mb-6">
                        <NavbarLogo />
                        <button onClick={() => setIsMobileMenuOpen(false)}>
                            <IconX className="w-6 h-6 text-black dark:text-white" />
                        </button>
                    </div>

                    {navItems.map((item, idx) => {
                        const isOpen = openMobileIndex === idx;

                        const isActive =
                            item.link === "/"
                                ? pathname === "/"
                                : item.link
                                    ? pathname.startsWith(item.link)
                                    : false;

                        return (
                            <div key={`mobile-item-${idx}`} className="flex flex-col">
                                {/* Top-level item */}
                                {item.children ? (
                                    <button
                                        onClick={() => {
                                            setOpenMobileIndex(isOpen ? null : idx);
                                        }}
                                        className={`flex w-full items-center justify-between text-lg font-medium px-3 py-2 rounded-lg transition-colors
                                            ${isActive
                                                ? "text-golden-dark dark:text-white font-semibold border border-golden-dark30 bg-golden-dark20"
                                                : "text-gray-600 dark:text-neutral-200 hover:text-golden-dark hover:bg-golden-dark10"
                                            }`}
                                    >
                                        <span>{item.name}</span>
                                        <span
                                            className={`transition-transform ${isOpen ? "rotate-180" : ""
                                                }`}
                                        >
                                            <ChevronDown />
                                        </span>
                                    </button>
                                ) : (
                                    <Link
                                        href={item.link}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`flex w-full items-center justify-between text-lg font-medium px-3 py-2 rounded-lg transition-colors
                                            ${isActive
                                                ? "text-golden-dark dark:text-white font-semibold border border-golden-dark30 bg-golden-dark20"
                                                : "text-gray-600 dark:text-neutral-200 hover:text-golden-dark hover:bg-golden-dark10"
                                            }`}
                                    >
                                        <span>{item.name}</span>
                                    </Link>
                                )}

                                <AnimatePresence initial={false}>
                                    {item.children && isOpen && (
                                        <motion.div
                                            key="content"
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{
                                                duration: 0.25,
                                                ease: "easeInOut",
                                            }}
                                            className="ml-6 mt-1 overflow-hidden flex flex-col gap-1"
                                        >
                                            {item.children.map((child, cIdx) => {
                                                const isChildActive = pathname.startsWith(child.link);

                                                return (
                                                    <Link
                                                        key={`mobile-child-${idx}-${cIdx}`}
                                                        href={child.link}
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                        className={`px-3 py-2 rounded-md text-base transition-colors
                                                            ${isChildActive
                                                                ? "text-golden-dark font-semibold bg-golden-dark10"
                                                                : "text-gray-600 dark:text-neutral-300 hover:text-golden-dark hover:bg-golden-dark10"
                                                            }`}
                                                    >
                                                        {child.name}
                                                    </Link>
                                                );
                                            })}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </MobileNavMenu>
            </MobileNav>
        </Navbar>
    );
}