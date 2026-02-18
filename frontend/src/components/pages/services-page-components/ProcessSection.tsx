"use client";

import React from "react";
import { useTranslations } from "next-intl";

const ProcessSection = () => {
    const t = useTranslations("services_page.process");

    return (
        <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-16">
                    <div className="max-w-2xl">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            {t("title")}
                        </h2>
                        <p className="text-gray-600">
                            {t("subtitle")}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[0, 1, 2, 3].map((index) => (
                        <div key={index} className="relative group">
                            {/* Step Number */}
                            <div className="text-6xl font-black text-gray-200 group-hover:text-golden-classic/20 transition-colors duration-300 absolute -top-8 -left-2 z-0">
                                0{index + 1}
                            </div>

                            <div className="relative z-10 pt-4">
                                <h3 className="text-xl font-bold text-gray-900 mb-3">
                                    {t(`steps.${index}.title`)}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {t(`steps.${index}.description`)}
                                </p>
                            </div>

                            {/* Connector line for desktop */}
                            {index < 3 && (
                                <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-[2px] bg-gray-200" />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProcessSection;
