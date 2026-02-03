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
import { usePathname } from "@/i18n/navigation"; // ✅ add this

export default function PublicNavbar() {
    const t = useTranslations();
    const pathname = usePathname(); // current route

    const navItems = [
        { name: t("nav.home"), link: "/" },
        { name: t("nav.mining"), link: "/mining" },
        { name: t("nav.about"), link: "/about" },
        { name: t("nav.services"), link: "/services" },
        { name: t("nav.news"), link: "/news" },
        { name: t("nav.contact"), link: "/contact" },
    ];

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    return (
        <Navbar className="lg:py-3">
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

                        const isActive =
                            item.link === "/"
                                ? pathname === "/"
                                : pathname.startsWith(item.link);// ✅ detect active

                        return (
                            <a
                                key={`mobile-link-${idx}`}
                                href={item.link}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className={`text-lg font-medium transition-colors px-3 py-2 rounded-lg ${isActive
                                    ? "text-golden-dark dark:text-white font-semibold border border-golden-dark30  border-golden-dark bg-golden-dark20"
                                    : "text-gray-600 dark:text-neutral-200 hover:text-golden-dark hover:bg-golden-dark10"
                                    }`}
                            >
                                {item.name}
                            </a>
                        );
                    })}
                </MobileNavMenu>
            </MobileNav>
        </Navbar>
    );
}
