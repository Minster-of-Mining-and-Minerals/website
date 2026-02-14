"use client";

import React from "react";
import { useTranslations } from "next-intl";
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

const ServicesList = () => {
    const t = useTranslations("services_page");

    const serviceKeys = [
        "licensing",
        "geology",
        "laboratory",
        "petroleum",
        "investment",
        "regulation"
    ];

    return (
        <section className="py-20 px-6 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {serviceKeys.map((key) => (
                    <ServiceCard
                        key={key}
                        title={t(`items.${key}.title`)}
                        description={t(`items.${key}.description`)}
                        icon={iconMap[key]}
                    />
                ))}
            </div>
        </section>
    );
};

export default ServicesList;
