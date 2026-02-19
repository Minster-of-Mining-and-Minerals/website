"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { ShieldCheck, Zap, Users } from "lucide-react";

const ExcellenceSection = () => {
    const t = useTranslations("services_page.excellence");

    const icons = [ShieldCheck, Zap, Users];

    return (
        <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        {t("title")}
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        {t("subtitle")}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {[0, 1, 2].map((index) => {
                        const Icon = icons[index];
                        return (
                            <div key={index} className="flex flex-col items-center text-center">
                                <div className="w-16 h-16 bg-golden-classic/10 rounded-full flex items-center justify-center mb-6">
                                    <Icon className="w-8 h-8 text-golden-classic" />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    {t(`features.${index}.title`)}
                                </h3>
                                <p className="text-gray-600">
                                    {t(`features.${index}.description`)}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default ExcellenceSection;
