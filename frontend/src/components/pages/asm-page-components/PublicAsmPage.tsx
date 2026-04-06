"use client";
import Image from "next/image";
import React from "react";
import * as LucideIcons from "lucide-react";
import {
    FileText,
    Leaf,
    Users,
    Globe,
    TrendingUp,
    ShieldCheck,
    Target,
    Cpu,
    Gem,
    HandIcon,
    Loader2
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useGetASMsQuery } from "@/redux/api/asmApi";
import { getFileUrl } from "@/utils/fileUrl";

const RenderIcon = ({ name, className }: { name?: string; className?: string }) => {
    if (!name) return null;
    const Icon = (LucideIcons as any)[name];
    if (!Icon) return null;
    return <Icon className={className} />;
};

const PublicAsmPage = () => {
    const { data: asms = [], isLoading } = useGetASMsQuery();
    const asm = asms[0];

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 gap-4 min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-teal-600" />
                <p className="text-gray-500 animate-pulse">Loading ASM data...</p>
            </div>
        );
    }

    if (!asm) {
        return (
            <div className="container max-w-7xl mx-auto px-6 py-16 text-center text-gray-500">
                No ASM information available at the moment.
            </div>
        );
    }

    // Mapping dynamic data
    const headline = asm.headlines?.[0] || {
        title: "Artisanal Mining Today and in History",
        content: `Ethiopia’s long history of artisanal mining spans three millennia. The gold deposits in Ethiopia’s rivers, for example, have been exploited for thousands of years by small scale miners.
        Some historians have estimated that the oldest mine in the world, dating back more than 6,000 years, was in western Ethiopia near the Sudanese border.
        Today, artisanal and small scale mining (ASM) happens all around the country and still plays an extremely important role in Ethiopia.`
    };

    const economicImpact = asm.economic_impact || [];
    const impactContribution = asm.impact_contribution || [];
    const strategicObjective = asm.strategic_objective || [];
    const strategicPillars = asm.strategic_pillars || [];
    const previews = asm.previews || [];
    const sidebarDocs = asm.attachments || [];
    const keyInitiatives = asm.key_initiatives || [];
    const objectives = asm.objectives || [];

    return (
        <div className="container max-w-7xl mx-auto px-6 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-16">

                    {/* History & Context */}
                    <section className="space-y-6">
                        <div className="flex flex-row items-center gap-3">
                            <div className="p-2 text-teal-600 bg-teal-50 rounded-lg">
                                <TrendingUp className="w-6 h-6" />
                            </div>
                            <div className="text-3xl flex font-bold text-gray-900 tracking-tight">
                                {headline.title}
                            </div>
                        </div>
                        <div className="prose prose-lg text-gray-600 max-w-none space-y-4">
                            <div dangerouslySetInnerHTML={{ __html: headline.content || "" }} />
                        </div>
                    </section>

                    {/* Economic Impact Stats */}
                    {economicImpact.length > 0 && (
                        <section className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
                            <h3 className="text-xl font-bold mb-8 text-gray-800 flex items-center gap-2">
                                <div className="text-teal-600 mb-1">
                                    <RenderIcon name={economicImpact[0].icon} className="w-5 h-5" />
                                </div>
                                {economicImpact[0].title}
                            </h3>
                            {impactContribution.length > 0 && <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {impactContribution.map((stat: any, idx: number) => (
                                    <div key={idx} className="space-y-2">
                                        <div className="text-teal-600 mb-1">
                                            <RenderIcon name={stat.icon} className="w-5 h-5" />
                                        </div>
                                        <div className="text-3xl font-bold text-gray-900">{stat.title}</div>
                                        <div className="text-sm text-gray-600 leading-snug">{stat.description}</div>
                                    </div>
                                ))}
                            </div>}
                            {economicImpact[0]?.foot_note && (
                                <div className="mt-8 p-4 bg-golden-dark10 rounded-lg text-sm text-golden-dark border">
                                    <strong>Note:</strong> {economicImpact[0].foot_note}
                                </div>
                            )}
                        </section>
                    )}

                    {/* Strategy Objectives */}
                    {strategicObjective.length > 0 && (
                        <section className="space-y-8">
                            <div>
                                <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-4">{strategicObjective[0].title}</h2>
                                <p className="text-gray-600">{strategicObjective[0].description}</p>
                            </div>
                            {strategicPillars.length > 0 && <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {strategicPillars.map((obj: any, idx: number) => (
                                    <Card key={idx} className="border-none shadow-sm bg-white hover:shadow-md transition-shadow group">
                                        <CardContent className="p-6">
                                            <div className="mb-4 duration-300">
                                                <RenderIcon name={obj.icon} className="w-8 h-8 text-teal-600" />
                                            </div>
                                            <h4 className="text-xl font-bold mb-2 text-gray-900">{obj.title}</h4>
                                            <p className="text-gray-600 text-sm leading-relaxed">{obj.description}</p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>}
                            {keyInitiatives.length > 0 &&
                                keyInitiatives.map((keyInitiative: any, idx: number) => (
                                    <div className="flex items-start gap-4 p-6 bg-amber-50 rounded-xl border border-amber-100">
                                        <Target className="w-6 h-6 text-amber-600 shrink-0 mt-1" />
                                        <div>
                                            <h4 className="font-bold text-amber-900 mb-1">{keyInitiative.title}</h4>
                                            <p className="text-amber-800 text-sm">
                                                {keyInitiative.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                        </section>
                    )}

                    {objectives.length > 0 &&
                        <section className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
                            {objectives.map((obj: any, idx: number) =>

                                <div className="space-y-4">
                                    <h3 className="text-2xl font-bold text-gray-900">{obj.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {obj.description}
                                    </p>
                                </div>
                            )}
                        </section>
                    }


                </div>

                {/* Sidebar Area */}
                <div className="space-y-8">

                    {/* Important Documents */}
                    {sidebarDocs.length > 0 && (
                        <section className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-teal-700" />
                                Important Documents
                            </h3>

                            <div
                                className={`space-y-4 ${sidebarDocs.length > 5 ? "max-h-[360px] overflow-y-auto hide-scrollbar pr-2" : ""
                                    }`}
                            >
                                {sidebarDocs.map((doc: any, idx: number) => (
                                    <a
                                        key={idx}
                                        href={getFileUrl(doc.attachment?.file_path || doc.file_path || "#")}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group block p-4 bg-white rounded-lg border border-gray-200 hover:border-teal-500 hover:shadow-sm transition-all"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="space-y-1">
                                                <p className="text-sm font-semibold text-gray-900 group-hover:text-teal-700 transition-colors">
                                                    {doc.label || "Document"}
                                                </p>
                                                <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase tracking-wider">
                                                    <Badge
                                                        variant="outline"
                                                        className="text-[10px] px-1.5 py-0 group-hover:border-teal-200 group-hover:text-teal-700"
                                                    >
                                                        PDF
                                                    </Badge>
                                                    <span>Download</span>
                                                </div>
                                            </div>

                                            <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-teal-50 transition-colors">
                                                <FileText className="w-4 h-4 text-gray-400 group-hover:text-teal-600" />
                                            </div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </section>
                    )}

                    {previews.length > 0 && (
                        <section className="space-y-6 pt-8">
                            {previews.map((preview: any, idx: number) => {
                                const isHighlight = idx === 0;
                                if (isHighlight) {
                                    return (
                                        <section
                                            key={idx}
                                            className="bg-golden-dark10 rounded-xl p-6 border relative overflow-hidden"
                                        >
                                            <div className="relative z-10">
                                                <h3 className="font-bold text-teal-900 mb-2">
                                                    {preview.title}
                                                </h3>

                                                <p className="text-sm text-teal-800/80 leading-relaxed mb-4">
                                                    {preview.description}
                                                </p>

                                                {preview.attachment?.file_path && (
                                                    <img
                                                        src={getFileUrl(preview.attachment.file_path)}
                                                        alt={preview.title}
                                                        className="rounded-lg shadow-sm border border-teal-200/50 w-full"
                                                    />
                                                )}
                                            </div>

                                            <div className="absolute -right-8 -bottom-8 opacity-10">
                                                <Gem className="w-32 h-32 text-teal-900" />
                                            </div>
                                        </section>
                                    );
                                }

                                // Standard Card (like Indigenous Knowledge style)
                                return (
                                    <section
                                        key={idx}
                                        className="p-6 border border-slate-200 rounded-xl"
                                    >
                                        <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                                            <RenderIcon
                                                name={preview.icon}
                                                className="w-5 h-5 text-amber-600"
                                            />
                                            {preview.title}
                                        </h3>

                                        <p className="text-sm text-gray-600 leading-relaxed">
                                            {preview.description}
                                        </p>

                                        {preview.attachment?.file_path && (
                                            <img
                                                src={getFileUrl(preview.attachment.file_path)}
                                                alt={preview.title}
                                                className="mt-4 rounded-lg shadow-sm w-full"
                                            />
                                        )}
                                    </section>
                                );
                            })}
                        </section>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PublicAsmPage;