"use client";

import { useMemo } from "react";
import Link from "next/link";
import {
    Facebook,
    Twitter,
    Linkedin,
    Youtube,
    Instagram,
    Link as LinkIcon
} from "lucide-react";
import { IconBrandTelegram, IconBrandTiktok } from "@tabler/icons-react";
import { useGetFootersQuery } from "@/redux/api/footerApi";
import { useGetAttachmentsQuery } from "@/redux/api/attachementApi";
import { useGetSocialMediasQuery } from "@/redux/api/socialMediaApi";
import { getImageUrl } from "@/utils/fileUrl";

// Map icon names to actual components
const ICON_MAP: Record<string, any> = {
    Facebook: Facebook,
    Twitter: Twitter,
    Linkedin: Linkedin,
    Youtube: Youtube,
    Instagram: Instagram,
    Telegram: IconBrandTelegram,
    Tiktok: IconBrandTiktok,
    // Add more mappings as needed
};

// Helper function to get icon component by name
const getIconComponent = (iconName: string) => {
    // Remove "Lucide" prefix if present (e.g., "LucideYoutube" -> "Youtube")
    const cleanIconName = iconName.replace(/^Lucide/, '');
    const IconComponent = ICON_MAP[cleanIconName];
    return IconComponent || LinkIcon; // Fallback to LinkIcon if not found
};

const DEFAULT_FOOTER_DATA = {
    about: {
        logo: "/logo-only.png",
        title: "Ministry of Mines",
    },
    sections: [
        {
            id: "quick-links",
            title: "Quick Links",
            links: [
                { id: "1-1", label: "Mining Sector", href: "/mining" },
                { id: "1-2", label: "Services", href: "/services" },
                { id: "1-3", label: "News & Updates", href: "/news" },
            ],
        },
        {
            id: "resources",
            title: "Resources",
            links: [
                { id: "2-1", label: "Licensing & Legislation", href: "/mining/licensing-and-legislation" },
                { id: "2-2", label: "Mining Data", href: "/mining/data" },
                { id: "2-3", label: "Gemstones", href: "/mining/gemstones" },
                { id: "2-4", label: "Application Portal", href: "/mining/application-portal" },
            ],
        },
        {
            id: "contact",
            title: "Contact",
            links: [
                { id: "3-1", label: "Federal Office", href: "/offices/federal" },
                { id: "3-2", label: "Regional Offices", href: "/offices/regional" },
                { id: "3-3", label: "FAQ", href: "/faq" },
                { id: "3-4", label: "Stakeholder Consultations", href: "/stakeholder-consultations" },
                { id: "3-5", label: "Tenders and Vacancies", href: "/contact/tenders-and-vacancies" },
                { id: "3-6", label: "Feedback and Complaints", href: "/feedback-and-complaints" },
            ],
        },
    ],
    copyright: `© ${new Date().getFullYear()} Ministry of Mines – Ethiopia. All rights reserved.`,
};

const Footer = () => {
    const { data: footers } = useGetFootersQuery();
    const { data: socialMedias = [] } = useGetSocialMediasQuery();
    const { data: attachmentsResponse } = useGetAttachmentsQuery();

    const footerData = useMemo(() => {
        if (!footers?.length) {
            return DEFAULT_FOOTER_DATA;
        }

        const f = footers[0];

        let logoUrl = DEFAULT_FOOTER_DATA.about.logo;
        if (f.attachment?.file_path) {
            logoUrl = getImageUrl(f.attachment, "thumb");
        }

        const mappedSections = (f.sections || []).map((s: any, sectionIndex: number) => ({
            id: s.footer_section_id || `section-${sectionIndex}`,
            title: s.section_name,
            links: (s.links || []).map((l: any, linkIndex: number) => ({
                id: l.footer_section_link_id || `${sectionIndex}-${linkIndex}`,
                label: l.label,
                href: l.url,
            })),
        }));

        const sections =
            mappedSections.length >= 3
                ? mappedSections.slice(0, 3)
                : [
                      ...mappedSections,
                      ...DEFAULT_FOOTER_DATA.sections.slice(mappedSections.length),
                  ];

        return {
            about: {
                logo: logoUrl,
                title: f.title || DEFAULT_FOOTER_DATA.about.title,
            },
            sections,
            copyright: f.text || DEFAULT_FOOTER_DATA.copyright,
        };
    }, [footers, attachmentsResponse]);

    const socialLinks = useMemo(
        () =>
            socialMedias.map((social: any) => ({
                id: social.social_media_id,
                platform_name: social.platform_name,
                icon: social.icon,
                url: social.url,
            })),
        [socialMedias]
    );

    return (
        <footer className="bg-gray-800 bg-blur-md text-gray-300">
            {/* Top section */}
            <div className="max-w-7xl mx-auto px-6 py-6 md:py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* About */}
                <div className="flex justify-left items-start">
                    <div className="flex flex-col gap- justify-center items-center" >
                        <img src={footerData.about.logo} alt="Logo" width={100} height={100} />
                        <h3 className="text-base font-semibold text-golden-dark mb-4 text-center">
                            {footerData.about.title}
                        </h3>

                    </div>
                </div>

                {/* Dynamic Sections (Quick Links, Resources, Contact) */}
                {footerData.sections.map((section) => (
                    <div key={section.id}>
                        <h3 className="text-lg font-semibold text-white mb-4">
                            {section.title}
                        </h3>
                        <ul className="space-y-2 text-sm">
                            {section.links.map((link) => (
                                <li key={link.id}>
                                    <Link href={link.href} className="hover:text-golden-dark transition-colors">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Bottom bar */}
            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-6 pb-5 flex flex-col md:flex-row items-center justify-between text-sm pt-5">
                    {/* Social Links - Dynamic from API */}
                    <div className="flex gap-4 justify-left w-full md:w-fit mb-4 md:mb-0">
                        {socialLinks.length > 0 ? (
                            // Display dynamic social links from API
                            socialLinks.map((social) => {
                                const IconComponent = getIconComponent(social.icon);
                                return (
                                    <a
                                        key={social.id}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="hover:text-golden-dark transition-colors"
                                        aria-label={social.platform_name}
                                    >
                                        <IconComponent className="w-5 h-5" />
                                    </a>
                                );
                            })
                        ) : (
                            // Display default/static social links if no API data
                            <>
                                <a href="#" className="hover:text-golden-dark transition-colors">
                                    <Facebook className="w-5 h-5" />
                                </a>
                                <a href="#" className="hover:text-golden-dark transition-colors">
                                    <Twitter className="w-5 h-5" />
                                </a>
                                <a href="#" className="hover:text-golden-dark transition-colors">
                                    <Linkedin className="w-5 h-5" />
                                </a>
                                <a href="#" className="hover:text-golden-dark transition-colors">
                                    <Youtube className="w-5 h-5" />
                                </a>
                                <a href="#" className="hover:text-golden-dark transition-colors">
                                    <Instagram className="w-5 h-5" />
                                </a>
                            </>
                        )}
                    </div>

                    <p className="text-center w-full md:w-fit opacity-80">
                        {footerData.copyright}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;