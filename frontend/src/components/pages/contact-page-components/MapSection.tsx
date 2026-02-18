"use client";

import React from "react";
import { MapPin } from "lucide-react";

const MapSection = () => {
    return (
        <section className="container max-w-7xl mx-auto px-4 py-16">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-golden-dark flex items-center gap-2">
                    <MapPin className="text-golden-dark" />
                    Office Location
                </h2>
                <p className="text-gray-600 mt-2 max-w-2xl">
                    Find the Ministry of Mines and Petroleum Federal Office on the map below.
                </p>
            </div>

            <div className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
                <iframe
                    title="MoMP Location Map"
                    src="https://www.google.com/maps?q=4%20Kilo%20Addis%20Ababa%20Ethiopia&output=embed"
                    className="w-full h-[350px] border-0"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>
        </section>
    );
};

export default MapSection;