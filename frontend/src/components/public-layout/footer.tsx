"use client";

<<<<<<< HEAD
import { useState, useEffect } from "react";
=======
import React, { useState, useEffect } from "react";
>>>>>>> c6b5a12ca2fb87bcbe1c0e8702430b6289687674
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
                { id: "3-5", label: "Tenders and Vacancies", href: "/tenders-and-vacancies" },
                { id: "3-6", label: "Feedback and Complaints", href: "/feedback-and-complaints" },
            ],
        },
    ],
    copyright: `© ${new Date().getFullYear()} Ministry of Mines – Ethiopia. All rights reserved.`,
};

const ICON_MAP: Record<string, any> = {
    facebook: Facebook,
    twitter: Twitter,
    linkedin: Linkedin,
    youtube: Youtube,
    instagram: Instagram,
    telegram: IconBrandTelegram,
    tiktok: IconBrandTiktok,
    other: LinkIcon,
};

// Social links are now static/not managed via admin
const STATIC_SOCIALS = [
    { id: "s1", platform: "Facebook", icon: "facebook", url: "#" },
    { id: "s2", platform: "Twitter", icon: "twitter", url: "#" },
    { id: "s3", platform: "LinkedIn", icon: "linkedin", url: "#" },
    { id: "s4", platform: "YouTube", icon: "youtube", url: "#" },
    { id: "s5", platform: "Instagram", icon: "instagram", url: "#" },
];

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
                { id: "3-5", label: "Tenders and Vacancies", href: "/tenders-and-vacancies" },
                { id: "3-6", label: "Feedback and Complaints", href: "/feedback-and-complaints" },
            ],
        },
    ],
    copyright: `© ${new Date().getFullYear()} Ministry of Mines – Ethiopia. All rights reserved.`,
};

const Footer = () => {
<<<<<<< HEAD
    const { data: footers, isLoading: isFootersLoading } = useGetFootersQuery();
    const { data: socialMedias = [], isLoading: isSocialLoading, isError: isSocialError } = useGetSocialMediasQuery();
    const { data: attachmentsResponse } = useGetAttachmentsQuery();

    // Fallback data structure for safety
    const [footerData, setFooterData] = useState(DEFAULT_FOOTER_DATA);
    const [socialLinks, setSocialLinks] = useState<any[]>([]);

    useEffect(() => {
        if (footers && footers.length > 0) {
            const f = footers[0]; // Assuming we're using the latest one

            // Resolve Logo URL if attachment_id exists
            let logoUrl = DEFAULT_FOOTER_DATA.about.logo;
            if (f.attachment?.file_path) {
                logoUrl = `${process.env.NEXT_PUBLIC_BASE}/${f.attachment.file_path.replace(/\\/g, "/")}`;
            }

            // Map Sections to match existing UI structure (title, links, id)
            const mappedSections = (f.sections || []).map((s: any) => ({
                id: s.footer_section_id || crypto.randomUUID(),
                title: s.section_name,
                links: (s.links || []).map((l: any) => ({
                    id: crypto.randomUUID(),
                    label: l.label,
                    href: l.url,
                })),
            }));

            // If fewer than 3 sections, pad with defaults
            if (mappedSections.length < 3) {
                const defaults = DEFAULT_FOOTER_DATA.sections.slice(mappedSections.length);
                mappedSections.push(...defaults);
            }

            setFooterData({
                about: {
                    logo: logoUrl,
                    title: f.title || DEFAULT_FOOTER_DATA.about.title,
                },
                sections: mappedSections.slice(0, 3),
                copyright: f.text || DEFAULT_FOOTER_DATA.copyright,
            });
        }
    }, [footers, attachmentsResponse]);

    // Transform social media data for display
    useEffect(() => {
        if (socialMedias && socialMedias.length > 0) {
            const transformedLinks = socialMedias.map((social: any) => ({
                id: social.social_media_id,
                platform_name: social.platform_name,
                icon: social.icon,
                url: social.url,
            }));
            setSocialLinks(transformedLinks);
        } else {
            setSocialLinks([]);
        }
    }, [socialMedias]);
=======
    const [footerData, setFooterData] = useState(DEFAULT_FOOTER_DATA);

    useEffect(() => {
        const savedData = localStorage.getItem("dynamic_footer_data");
        if (savedData) {
            try {
                setFooterData(JSON.parse(savedData));
            } catch (e) {
                console.error("Failed to parse footer data", e);
            }
        }
    }, []);
>>>>>>> c6b5a12ca2fb87bcbe1c0e8702430b6289687674

    return (
        <footer className="bg-gray-800 bg-blur-md text-gray-300">
            {/* Top section */}
            <div className="max-w-7xl mx-auto px-6 py-6 md:py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* About */}
                <div className="flex justify-left items-start">
                    <div className="flex flex-col gap- justify-center items-center" >
<<<<<<< HEAD
                        <img src={footerData.about.logo} alt="Logo" width={100} height={100} />
=======
                        <Image src={footerData.about.logo} alt="Logo" width={100} height={100} />
>>>>>>> c6b5a12ca2fb87bcbe1c0e8702430b6289687674
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
<<<<<<< HEAD
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
=======
                <div className="max-w-7xl mx-auto px-6 pb-5 flex flex-col  md:flex-row items-center justify-between text-sm pt-5">
                    {/* Social (Static) */}
                    <div className="flex gap-4  justify-left w-full md:w-fit mb-4 md:mb-0">
                        {STATIC_SOCIALS.map((social) => {
                            const Icon = ICON_MAP[social.icon] || LinkIcon;
                            return (
                                <a key={social.id} href={social.url} className="hover:text-golden-dark transition-colors">
                                    <Icon className="w-5 h-5" />
                                </a>
                            );
                        })}
>>>>>>> c6b5a12ca2fb87bcbe1c0e8702430b6289687674
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