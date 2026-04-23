"use client";

import {
    Navbar,
    NavBody,
    NavItems,
    MobileNav,
    NavbarLogo,
    MobileNavHeader,
    MobileNavToggle,
    MobileNavMenu,
} from "@/components/ui/resizable-navbar";

import { useState, useMemo } from "react";
import { IconX } from "@tabler/icons-react";
import { usePathname } from "@/i18n/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Link from "next/link";

import { useGetRoutesQuery } from "@/redux/api/routeApi";

interface RouteTranslation {
    language_code: string;
    label: string;
}

interface Route {
    route_id: string;
    path: string | null;
    parent_id: string | null;
    order: number;
    is_active: boolean;
    show_in_navbar: boolean;
    translations: RouteTranslation[];
    children?: Route[];
}

interface NavItem {
    name: string;
    link?: string;
    children?: NavItem[];
}

export default function PublicNavbar() {
    const pathname = usePathname();

    const [openMobileIndex, setOpenMobileIndex] = useState<number | null>(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const { data: routes = [] } = useGetRoutesQuery();

    // ✅ detect language safely (fallback en)
    const locale = useMemo(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("NEXT_LOCALE") || "en";
        }
        return "en";
    }, []);

    // =============================
    // BUILD NAV ITEMS (NO DUPLICATES)
    // =============================
    const navItems = useMemo(() => {
        const getLabel = (translations: RouteTranslation[]) =>
            translations?.find((t) => t.language_code === locale)?.label || "";

        // Create a Set to track route IDs that have been processed as children
        const processedChildIds = new Set<string>();

        // First, collect all parent routes that have children
        const parentRoutes = routes.filter((route: Route) =>
            route.is_active &&
            route.show_in_navbar &&
            route.children &&
            route.children.length > 0
        );

        // Mark all child route IDs from parent routes
        parentRoutes.forEach((route: Route) => {
            route.children?.forEach((child: Route) => {
                if (child.is_active && child.show_in_navbar) {
                    processedChildIds.add(child.route_id);
                }
            });
        });

        // Build nav items from parent routes (with children)
        const navItemsFromParents = parentRoutes.map((route: Route) => {
            const label = getLabel(route.translations);

            const children = route.children
                ?.filter((child: Route) => child.is_active && child.show_in_navbar)
                .map((child: Route) => ({
                    name: getLabel(child.translations),
                    link: child.path || "#",
                })) || [];

            return {
                name: label,
                children,
            };
        });

        // Collect root-level routes (no parent) that are NOT already processed as children
        const rootRoutes = routes.filter((route: Route) =>
            route.is_active &&
            route.show_in_navbar &&
            route.parent_id === null &&
            (!route.children || route.children.length === 0) && // No children
            !processedChildIds.has(route.route_id) // Not a child of any parent
        );

        // Add root-level flat routes
        const navItemsFromRoots = rootRoutes.map((route: Route) => ({
            name: getLabel(route.translations),
            link: route.path || "#",
        }));

        // Combine and sort by order
        const allNavItems = [...navItemsFromParents, ...navItemsFromRoots];

        // Sort by the original order from routes
        const getOrder = (item: NavItem) => {
            if (item.children) {
                // Find parent route order
                const parentRoute = parentRoutes.find(r => getLabel(r.translations) === item.name);
                return parentRoute?.order || 999;
            } else {
                // Find root route order
                const rootRoute = rootRoutes.find(r => (r.path || "#") === item.link);
                return rootRoute?.order || 999;
            }
        };

        return allNavItems.sort((a, b) => (getOrder(a) - getOrder(b)));
    }, [routes, locale]);

    return (
        <Navbar className="lg:py-3 z-[1000]">
            {/* ================= DESKTOP ================= */}
            <NavBody>
                <NavbarLogo />
                <NavItems items={navItems} />
            </NavBody>

            {/* ================= MOBILE ================= */}
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

                    {navItems.map((item: NavItem, idx: number) => {
                        const isOpen = openMobileIndex === idx;

                        const isActive = item.link
                            ? pathname === item.link || pathname.startsWith(item.link + "/")
                            : false;

                        return (
                            <div key={idx} className="flex flex-col">
                                {/* ================= PARENT ================= */}
                                {item.children ? (
                                    <button
                                        onClick={() =>
                                            setOpenMobileIndex(isOpen ? null : idx)
                                        }
                                        className={`flex w-full items-center justify-between text-lg font-medium px-3 py-2 rounded-lg transition-colors
                                            ${isActive
                                                ? "text-golden-dark font-semibold bg-golden-dark20"
                                                : "text-gray-600 hover:text-golden-dark hover:bg-golden-dark10"
                                            }`}
                                    >
                                        <span>{item.name}</span>
                                        <ChevronDown
                                            className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                                        />
                                    </button>
                                ) : (
                                    <Link
                                        href={item.link || "#"}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`flex w-full px-3 py-2 rounded-lg transition-colors
                                            ${isActive
                                                ? "text-golden-dark font-semibold bg-golden-dark20"
                                                : "text-gray-600 hover:text-golden-dark hover:bg-golden-dark10"
                                            }`}
                                    >
                                        {item.name}
                                    </Link>
                                )}

                                {/* ================= CHILDREN ================= */}
                                <AnimatePresence>
                                    {item.children && isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.25 }}
                                            className="ml-6 mt-1 flex flex-col gap-1 overflow-hidden"
                                        >
                                            {item.children.map((child: NavItem, cIdx: number) => {
                                                const isChildActive = child.link
                                                    ? pathname === child.link || pathname.startsWith(child.link + "/")
                                                    : false;

                                                return (
                                                    <Link
                                                        key={cIdx}
                                                        href={child.link || "#"}
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                        className={`px-3 py-2 rounded-md text-base transition-colors
                                                            ${isChildActive
                                                                ? "text-golden-dark font-semibold bg-golden-dark10"
                                                                : "text-gray-600 hover:text-golden-dark hover:bg-golden-dark10"
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