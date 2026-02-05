"use client";

import React from "react";
import Marquee from "react-fast-marquee";

const logos = [
    "https://nomadsinn.com/momp/wp-content/uploads/2019/10/CIRDI-FOOTER1.png",
    "https://nomadsinn.com/momp/wp-content/uploads/2019/10/momplogo.png",
    "https://nomadsinn.com/momp/wp-content/uploads/2019/10/gse.jpeg",
    // "/factory3.jpg",
    // "/factory2.jpg",
    // "/factory1.jpg",
    // "/home-1.jpg",
    // "/home-2.jpg",
    // "/home-3.jpg",
    // "/home-4.jpg",
];

type PartnersSectionProps = {
    speed?: number; // higher = faster (react-fast-marquee logic)
};

const PartnersSection: React.FC<PartnersSectionProps> = ({ speed = 50 }) => {
    return (
        <section className="w-full max-w-7xl pb-28 overflow-hidden">
            {/* Header */}
            <div className="mb-10 px-4">
                <h2 className="text-2xl sm:text-3xl font-bold text-golden-dark">
                    Our Partners
                </h2>
                <div className="mt-2 h-1 w-20 bg-golden-dark rounded-full"></div>
                <p className="mt-3 text-gray-600 max-w-2xl">
                    We collaborate with trusted national and international partners to
                    support sustainable industrial and economic development.
                </p>
            </div>

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
                        <img
                            src={logo}
                            alt={`Partner ${index + 1}`}
                            className="h-24 md:h-36 w-auto object-contain cursor-pointer"
                        />
                    </div>
                ))}
            </Marquee>
        </section>
    );
};

export default PartnersSection;