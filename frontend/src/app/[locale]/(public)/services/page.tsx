"use client";

import React from 'react';
import { useTranslations } from 'next-intl';
import ServicesList from '@/components/pages/services-page-components/ServicesList';
import ProcessSection from '@/components/pages/services-page-components/ProcessSection';
import ExcellenceSection from '@/components/pages/services-page-components/ExcellenceSection';

const ServicesPage = () => {
    const t = useTranslations("services_page");

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Page Header */}
            <div className="relative h-[40vh] w-full flex items-center justify-center overflow-hidden">
                <img
                    src="/home-3.jpg" // Using an existing high-quality image from the project
                    alt="Services Header"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60" />

                <div className="relative z-10 text-center px-6 max-w-4xl">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        {t("title")}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
                        {t("subtitle")}
                    </p>
                </div>
            </div>

            {/* Services List Grid */}
            <ServicesList />

            {/* Expansion: Process Section */}
            <ProcessSection />

            {/* Expansion: Excellence Section */}
            <ExcellenceSection />

            {/* Call to Action Section (Optional but adds 'project idea' feel) */}
            {/* <section className="bg-golden-dark py-16 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="text-white">
                        <h2 className="text-3xl font-bold mb-2">Need more information?</h2>
                        <p className="text-white/80">Our experts are ready to assist you with any inquiries regarding our services.</p>
                    </div>
                    <button className="bg-white text-golden-dark px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors">
                        Contact Us
                    </button>
                </div>
            </section> */}
        </main>
    );
};

export default ServicesPage;