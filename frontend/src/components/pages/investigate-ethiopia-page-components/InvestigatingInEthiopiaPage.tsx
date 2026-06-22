"use client";

import React from 'react';
import PageHeader from '@/components/pages/home-page-components/PageHeader';
import * as LucideIcons from 'lucide-react';
import {
    Briefcase,
    ExternalLink,
    Loader2,
} from 'lucide-react';
import { useGetInvestigateEthiopiasQuery } from '@/redux/api/investigateEthiopiaApi';
import { getFileUrl } from '@/utils/fileUrl';
import PublicEmptyState from '@/components/common/PublicEmptyState';
import { useTranslations } from 'next-intl';

const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
    const IconComponent = (LucideIcons as any)[name];
    if (!IconComponent) return <Briefcase className={className} />;
    return <IconComponent className={className} />;
};

const InvestigatingInEthiopiaPage = () => {
    const { data: records, isLoading } = useGetInvestigateEthiopiasQuery();
    const t = useTranslations("empty_state");

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin text-golden-dark" />
            </div>
        );
    }

    const data = records && records.length > 0 ? records[0] : null;

    if (!data) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center px-6">
                <PublicEmptyState title={t("investment_title")} icon={Briefcase} />
            </div>
        );
    }

    const headline = data.headlines?.[0];
    const autonomyHeadline = data.autonomy?.[0];
    const minerals = data.strategic_minerals || [];
    const institutions = data.autonomous_institutions || [];
    const ambition = data.ambition || [];
    const proclamations = data.global_proclamation || [];
    const actions = data.investigation_action || [];
    const strategicPillars = data.strategic_pillars || [];

    return (
        <main className="min-h-screen bg-white pb-20">
            <PageHeader
                title={"Investing in Ethiopia"}
                icon={<DynamicIcon name={"Briefcase"} />}
                description={"Your gateway to sustainable mining and petroleum opportunities"}
            />

            {/* About Section */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-3xl font-bold text-teal-900 mb-6 relative inline-block">
                                    {headline?.title}
                                    <span className="absolute -bottom-2 left-0 w-20 h-1 bg-golden-dark rounded-full"></span>
                                </h2>
                                {headline?.description && <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-line mb-6">
                                    {headline?.description}
                                </p>}
                                <p className="text-gray-600 text-lg leading-relaxed whitespace-pre-line">
                                    {headline?.content}
                                </p>
                            </div>

                            {minerals.map((mineral, idx) => (
                                <div key={idx} className="bg-golden-dark/5 p-8 rounded-3xl border border-golden-dark/10">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                        <DynamicIcon name={mineral.icon || "Gem"} className="text-golden-dark w-6 h-6" />
                                        {mineral.title}
                                    </h3>
                                    {mineral.description && (
                                        <p className="text-gray-600 mb-4 italic">
                                            {mineral.description}
                                        </p>
                                    )}
                                    <div className="flex flex-wrap gap-2">
                                        {(mineral.tags || []).map((tag) => (
                                            <span key={tag} className="bg-white px-4 py-2 rounded-full text-sm font-medium text-gray-700 shadow-sm border border-gray-100">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="space-y-6">
                            <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:shadow-md transition-shadow">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">
                                    {autonomyHeadline?.title || "Autonomous Institutions"}
                                </h3>
                                {autonomyHeadline?.description && (
                                    <p className="text-gray-600 mb-6">{autonomyHeadline.description}</p>
                                )}
                                <div className="space-y-6">
                                    {institutions.map((inst, idx) => (
                                        <div key={idx} className="flex gap-4">
                                            <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center shrink-0">
                                                <DynamicIcon name={inst.icon || "Globe2"} className="text-golden-dark w-6 h-6" />
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <h4 className="font-bold text-gray-900">{inst.title}</h4>
                                                    {inst.link && (
                                                        <a href={inst.link} target="_blank" rel="noopener noreferrer" className="text-golden-dark hover:text-golden-darkHover">
                                                            <ExternalLink className="w-4 h-4" />
                                                        </a>
                                                    )}
                                                </div>
                                                <p className="text-sm text-gray-600">{inst.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {strategicPillars.map((pillar, idx) => (
                                <div key={idx} className="p-8 bg-[#073954] text-white rounded-3xl shadow-lg">
                                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                        <DynamicIcon name={pillar.icon || "Leaf"} className="text-golden-light w-6 h-6" />
                                        {pillar.title}
                                    </h3>
                                    <p className="text-white/80 leading-relaxed">
                                        {pillar.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>


            {/* Partnerships Section */}
            <section className="py-24 px-6 overflow-hidden bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
                            <DynamicIcon name={ambition[0]?.icon || "Globe"} className="text-golden-dark w-6 h-6" />
                            {ambition[0]?.title || ""}
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
                            {ambition[0]?.description || ""}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {proclamations.map((proc, index) => (
                            <div key={index} className="flex flex-col items-center text-center p-10 bg-gray-50 rounded-3xl hover:bg-white hover:shadow-2xl transition-all border border-transparent hover:border-gray-100 group">
                                <div className="relative w-full aspect-[16/9] mb-8 overflow-hidden rounded-2xl bg-white shadow-inner flex items-center justify-center border border-gray-50">
                                    <img
                                        src={getFileUrl(proc?.attachment?.file_path)}
                                        alt={proc?.title}
                                        className="h-full w-full object-contain transition-all duration-500 scale-90 group-hover:scale-110"
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{proc?.title}</h3>
                                <p className="text-gray-600 leading-relaxed text-sm">{proc?.description}</p>
                            </div>
                        ))}
                    </div>


                </div>
            </section>

            {/* Final CTA */}
            <section className="mx-6">
                {actions.length > 0 ? (
                    <div className="space-y-6">
                        {actions.map((cta, idx) => (
                            <div key={idx} className="max-w-7xl mx-auto p-12 bg-[#073954] rounded-[3rem] shadow-xl relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-golden-dark/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700"></div>
                                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                                    <div className="text-white text-center md:text-left">
                                        <h2 className="text-3xl font-bold mb-2">{cta.title}</h2>
                                        <p className="text-white/70 text-lg max-w-xl">{cta.description}</p>
                                    </div>
                                    <a
                                        href={cta.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-golden-dark text-white px-10 py-5 rounded-full font-bold hover:bg-golden-darkHover transition-all shadow-[0_10px_40px_-10px_rgba(191,153,69,0.5)] whitespace-nowrap"
                                    >
                                        {cta.action || "Learn More"}
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    null
                )}
            </section>
        </main>
    );
};

export default InvestigatingInEthiopiaPage;