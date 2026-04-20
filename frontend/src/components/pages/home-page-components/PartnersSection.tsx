"use client";

import React, { useState, useEffect } from "react";
import Marquee from "react-fast-marquee";

<<<<<<< HEAD
import { useGetPartnersQuery } from "@/redux/api/partnerApi";
import { getFileUrl } from "@/utils/fileUrl";
=======
const DEFAULT_LOGOS = [
    "https://nomadsinn.com/momp/wp-content/uploads/2019/10/CIRDI-FOOTER1.png",
    "https://nomadsinn.com/momp/wp-content/uploads/2019/10/momplogo.png",
    "https://nomadsinn.com/momp/wp-content/uploads/2019/10/gse.jpeg",

];
>>>>>>> c6b5a12ca2fb87bcbe1c0e8702430b6289687674

const DEFAULT_HEADER = {
    title: "Our Partners",
    description: "We collaborate with trusted national and international partners to support sustainable industrial and economic development."
};

type PartnersSectionProps = {
    speed?: number; // higher = faster (react-fast-marquee logic)
};

type PartnerHeader = {
    title: string;
    description: string;
};

const PartnersSection: React.FC<PartnersSectionProps> = ({ speed = 50 }) => {
<<<<<<< HEAD
    const { data: apiPartners, isLoading } = useGetPartnersQuery();
    const [logos, setLogos] = useState<string[]>([]);
    const [header, setHeader] = useState<PartnerHeader | null>(null);

    useEffect(() => {
        if (apiPartners && apiPartners.length > 0) {
            const firstPartner = apiPartners[0];

            // Set header data if available
            if (firstPartner.title || firstPartner.description) {
                setHeader({
                    title: firstPartner.title || "",
                    description: firstPartner.description || "",
                });
            }

            // Set logos from attachments
            if (firstPartner.attachments && firstPartner.attachments.length > 0) {
                const apiLogos = firstPartner.attachments
                    .map((a: any) => a.attachment?.file_path ? getFileUrl(a.attachment.file_path) : "")
                    .filter((url: string) => url !== "");
                setLogos(apiLogos);
            }
        }
    }, [apiPartners]);

    // Show loading state
    if (isLoading) {
        return (
            <div className="w-full max-w-7xl flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-golden-dark"></div>
            </div>
        );
    }

    // Don't render if no logos or no header data is available
    if (logos.length === 0 || !header || (!header.title && !header.description)) {
        return null;
    }
=======
    const [logos, setLogos] = useState<string[]>(DEFAULT_LOGOS);
    const [header, setHeader] = useState(DEFAULT_HEADER);

    useEffect(() => {
        const savedLogos = localStorage.getItem("home_partner_logos");
        const savedHeader = localStorage.getItem("home_partner_header");
        if (savedLogos) {
            try {
                setLogos(JSON.parse(savedLogos));
            } catch (e) {
                console.error("Failed to parse partner logos", e);
            }
        }
        if (savedHeader) {
            try {
                setHeader(JSON.parse(savedHeader));
            } catch (e) {
                console.error("Failed to parse partner header", e);
            }
        }
    }, []);

    if (logos.length === 0) return null;
>>>>>>> c6b5a12ca2fb87bcbe1c0e8702430b6289687674

    return (
        <section className="w-full max-w-7xl pb-28 overflow-hidden">
            {/* Header */}
<<<<<<< HEAD
            {header.title && (
                <div className="mb-10 px-4">
                    <h2 className="text-2xl sm:text-3xl font-bold text-golden-dark">
                        {header.title}
                    </h2>
                    <div className="mt-2 h-1 w-20 bg-golden-dark rounded-full"></div>
                    {header.description && (
                        <p className="mt-3 text-gray-600 max-w-2xl">
                            {header.description}
                        </p>
                    )}
                </div>
            )}
=======
            <div className="mb-10 px-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-golden-dark">
                    {header.title}
                </h2>
                <div className="mt-2 h-1 w-20 bg-golden-dark rounded-full"></div>
                <p className="mt-3 text-gray-600 max-w-2xl">
                    {header.description}
                </p>
            </div>
>>>>>>> c6b5a12ca2fb87bcbe1c0e8702430b6289687674

            {/* Marquee */}
            <Marquee
                speed={speed}
                pauseOnHover
                gradient={false}
                className="overflow-hidden"
            >
                {logos.map((logo, index) => (
                    <div
                        key={index}
                        className="mx-8 flex items-center justify-center md:min-w-[200px]"
                    >
                        {logo && (
                            <img
                                src={logo}
                                alt={`Partner ${index + 1}`}
                                className="h-24 md:h-36 w-auto object-contain cursor-pointer"
                            />
                        )}
                    </div>
                ))}
            </Marquee>
        </section>
    );
};

export default PartnersSection;