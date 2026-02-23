"use client";

import React, { useState, useEffect } from "react";
import {
    FileCheck,
    Map,
    FlaskConical,
    Droplets,
    TrendingUp,
    ShieldCheck,
    LucideIcon
} from "lucide-react";
import ServiceCard from "./ServiceCard";

const iconMap: Record<string, LucideIcon> = {
    licensing: FileCheck,
    geology: Map,
    laboratory: FlaskConical,
    petroleum: Droplets,
    investment: TrendingUp,
    regulation: ShieldCheck,
};

const initialServices = [
    {
        id: "licensing",
        title: "Mineral Licensing",
        description: "Facilitating the issuance of exploration and mining licenses for investors.",
        iconName: "licensing",
    },
    {
        id: "geology",
        title: "Geological Information",
        description: "Providing access to reliable geological and geochemical data and maps.",
        iconName: "geology",
    },
    {
        id: "laboratory",
        title: "Laboratory Services",
        description: "Conducting mineral analysis, physical tests, and chemical evaluations.",
        iconName: "laboratory",
    },
    {
        id: "petroleum",
        title: "Petroleum Support",
        description: "Overseeing and supporting oil and gas exploration activities across the country.",
        iconName: "petroleum",
    },
    {
        id: "investment",
        title: "Investment Promotion",
        description: "Promoting Ethiopia's vast mineral potential to global and local investors.",
        iconName: "investment",
    },
    {
        id: "regulation",
        title: "Environmental Regulation",
        description: "Ensuring resource extraction adheres to strict environmental and safety standards.",
        iconName: "regulation",
    },
];

const ServicesList = () => {
    const [services, setServices] = useState(initialServices);

    useEffect(() => {
        const saved = localStorage.getItem("services_data");
        if (saved) {
            try {
                setServices(JSON.parse(saved));
            } catch (e) {
                console.error("Error parsing services data:", e);
                setServices(initialServices);
            }
        }
    }, []);

    return (
        <section className="py-20 px-6 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service) => (
                    <ServiceCard
                        key={service.id}
                        title={service.title}
                        description={service.description}
                        icon={iconMap[service.iconName] || FileCheck}
                    />
                ))}
            </div>
        </section>
    );
};

export default ServicesList;
