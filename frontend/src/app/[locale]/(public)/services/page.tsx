"use client";

import React from 'react';
import { useTranslations } from 'next-intl';
import ServicesList from '@/components/pages/services-page-components/ServicesList';
import ExcellenceSection from '@/components/pages/services-page-components/ExcellenceSection';
import PageHeader from '@/components/pages/home-page-components/PageHeader';
import { MonitorCog } from 'lucide-react';

const ServicesPage = () => {
    const t = useTranslations("services_page");

    return (
        <main className="min-h-screen bg-gray-50">
            {/* Page Header */}
            <PageHeader
                title="Services"
                icon={<MonitorCog />}
                description="Services offered by the Ministry of Mines"
            />

            {/* Services List Grid */}
            <ServicesList />

            {/* Expansion: Process Section
            <ProcessSection /> */}

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