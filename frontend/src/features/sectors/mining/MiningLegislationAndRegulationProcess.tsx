"use client";
import * as LucideIcons from "lucide-react";
import { CheckCircle, Download, FileText, Scale } from "lucide-react";
import { useGetMiningRegulationProcessesQuery } from "@/redux/api/miningRegulationProcessApi";
import { getFileUrl } from "@/utils/fileUrl";
import PublicEmptyState from "@/components/common/PublicEmptyState";
import { useTranslations } from "next-intl";

// Helper function for formatting bytes
const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

const DynamicIcon = ({ name, className }: { name: string; className?: string }) => {
    const IconComponent = (LucideIcons as any)[name];
    if (!IconComponent) return <FileText className={className} />;
    return <IconComponent className={className} />;
};

const MiningLegislationAndRegulationProcess = () => {
    const { data: processes, isLoading, error } = useGetMiningRegulationProcessesQuery({ published: true });
    const t = useTranslations("empty_state");

    // Get the first published process
    const processData = processes?.[0];

    if (isLoading) {
        return (
            <div className="container mx-auto py-12 flex justify-center items-center min-h-[400px]">
                <div className="text-gray-500 animate-pulse">Loading mining legislation data...</div>
            </div>
        );
    }

    if (error || !processData) {
        return (
            <div className="container mx-auto py-12 flex justify-center items-center min-h-[400px]">
                <PublicEmptyState
                    title={t("mining_legislation_title")}
                    description={error ? t("error_description") : undefined}
                    icon={Scale}
                />
            </div>
        );
    }

    // Collect all attachments for the sidebar
    const allAttachments = processData.guidelines?.flatMap(g =>
        (g.attachments || []).map(a => ({
            ...a,
            guidelineTitle: g.title
        }))
    ) || [];

    return (
        <div className="w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header Section */}
            <div className="mb-10 text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    {processData.title}
                </h1>
                {processData.description && (
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        {processData.description}
                    </p>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column - Main Content (8/12) */}
                <div className="lg:col-span-8 space-y-12">

                    {/* 1. Frameworks Section */}
                    {processData.frameworks && processData.frameworks.length > 0 && (
                        <div className="space-y-8">
                            {processData.frameworks.map((framework, index) => (
                                <div key={framework.mining_framework_id || index} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden group hover:shadow-xl transition-all duration-300">
                                    <div className="relative h-80 w-full overflow-hidden">
                                        {framework.attachment ? (
                                            <img
                                                src={getFileUrl(framework.attachment.file_path || framework.attachment.file_url || "")}
                                                alt={framework.title}
                                                className="w-full h-full mt-0 object-cover group-hover:scale-105 transition-transform duration-700"
                                            />
                                        ) : (
                                            <div className="absolute inset-0 bg-gradient-to-br from-golden-dark to-golden-light flex items-center justify-center">
                                                <Scale className="w-20 h-20 text-white/20" />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                                        <div className="absolute bottom-8 left-8 right-8">
                                            <div className="inline-block px-3 py-1 rounded-full bg-golden-bg/20 backdrop-blur-md text-golden-dark text-xs font-bold tracking-wider uppercase mb-3 border border-golden-dark20">
                                                Official Framework
                                            </div>
                                        </div>
                                        {framework.attachment_overlay_text && (
                                            <div
                                                className="absolute top-6 right-6 px-4 py-2 rounded-xl backdrop-blur-md border font-bold text-sm shadow-2xl"
                                                style={{
                                                    backgroundColor: `${framework.attachment_overlay_color || '#ffffff'}22`,
                                                    borderColor: `${framework.attachment_overlay_color || '#ffffff'}44`,
                                                    color: framework.attachment_overlay_color || '#ffffff'
                                                }}
                                            >
                                                {framework.attachment_overlay_text}
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-8">
                                        <div className="prose prose-slate max-w-none mb-8">
                                            <p className='text-lg text-gray-600 leading-relaxed font-medium mb-6'>
                                                {framework.title}
                                            </p>
                                            <p className="text-md text-gray-600">
                                                {framework.description}
                                            </p>
                                        </div>

                                        {framework.objectives && framework.objectives.length > 0 && (
                                            <div className="grid md:grid-cols-2 gap-4">
                                                {framework.objectives.map((objective, idx) => (
                                                    <div key={idx} className="flex items-start gap-3 bg-golden-bg/5 p-4 rounded-xl border border-golden-bg/10 hover:border-golden-bg/20 transition-colors">
                                                        <div className="mt-1 p-1 bg-green-100 rounded-full flex-shrink-0">
                                                            <CheckCircle className="w-4 h-4 text-green-600" />
                                                        </div>
                                                        <span className="text-gray-700 leading-snug">{objective}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* 2. Services Section */}
                    {processData.services && processData.services.length > 0 && (
                        <div className="space-y-10 ">
                            {processData.services.map((service, sIndex) => (
                                <div key={service.mining_service_id || sIndex}>
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="h-0.5 flex-1 bg-golden-dark20"></div>
                                        <h3 className="text-3xl font-bold text-gray-900 px-4">
                                            {service.title}
                                        </h3>
                                        <div className="h-0.5 flex-1 bg-golden-dark20"></div>
                                    </div>
                                    <p className="text-gray-600 mb-8 max-w-2xl text-center mx-auto italic">
                                        {service.description}
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {service.service_cards?.map((card, cIndex) => (
                                            <div
                                                key={card.mining_service_card_id || cIndex}
                                                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-golden-dark transition-all duration-300 group"
                                            >
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className="p-3 bg-golden-bg/10 rounded-xl group-hover:bg-golden-dark group-hover:text-white transition-colors duration-300">
                                                        <DynamicIcon name={card.icon || "FileText"} className="w-6 h-6" />
                                                    </div>
                                                    {card.sub_title && (
                                                        <div
                                                            className="px-3 py-1 rounded-full text-xs font-bold tracking-wide border shadow-sm"
                                                            style={{
                                                                backgroundColor: `${card.sub_title_color || '#094C81'}15`,
                                                                color: card.sub_title_color || '#094C81',
                                                                borderColor: `${card.sub_title_color || '#094C81'}30`
                                                            }}
                                                        >
                                                            {card.sub_title}
                                                        </div>
                                                    )}
                                                </div>

                                                <h4 className="font-bold text-xl text-gray-900 mb-3 group-hover:text-golden-dark transition-colors">
                                                    {card.title}
                                                </h4>

                                                <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                                                    {card.description}
                                                </p>

                                                {card.requirements && card.requirements.length > 0 && (
                                                    <div className="space-y-3 pt-4 border-t border-gray-50">
                                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                                                            Key Requirements
                                                        </p>
                                                        <div className="grid gap-2">
                                                            {card.requirements.map((req, idx) => (
                                                                <div key={idx} className="flex items-center gap-3">
                                                                    <div className="w-1.5 h-1.5 bg-golden-dark rounded-full"></div>
                                                                    <span className="text-sm text-gray-700 font-medium">{req}</span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Right Column - Sidebar (4/12) */}
                <div className="lg:col-span-4 space-y-8">
                    {/* 2. Guidelines / Key Legislation Blocks */}
                    {processData.guidelines && processData.guidelines.length > 0 && (
                        <div className="space-y-6 pt-4">
                            {processData.guidelines.map((guideline, index) => (
                                <div key={guideline.mining_guideline_id || index} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 shadow-md">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 bg-golden-dark text-white rounded-lg shadow-lg">
                                            <DynamicIcon name={guideline.icon || "Scale"} className="w-5 h-5" />
                                        </div>
                                        <h3 className="text-xl font-bold text-gray-900 m-0">
                                            {guideline.title}
                                        </h3>
                                    </div>

                                    {guideline.description && (
                                        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                                            {guideline.description}
                                        </p>
                                    )}

                                    {guideline.contents && guideline.contents.length > 0 && (
                                        <div className="space-y-4">
                                            {guideline.contents.map((content, cIdx) => (
                                                <div
                                                    key={content.mining_guideline_content_id || cIdx}
                                                    className={`p-4 rounded-xl border transition-all duration-300 ${content.type === 'card'
                                                        ? 'bg-white border-golden-dark20 shadow-sm'
                                                        : 'bg-transparent border-gray-100'
                                                        }`}
                                                >
                                                    <div className="flex items-center gap-3 mb-2">
                                                        <DynamicIcon name={content.icon || "Info"} className="w-4 h-4 text-golden-dark" />
                                                        <h4 className="font-bold text-sm text-gray-900 m-0">
                                                            {content.title}
                                                        </h4>
                                                    </div>
                                                    <p className="text-xs text-gray-600 leading-relaxed pl-7">
                                                        {content.description}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* Attachments - Now using same UI as top section */}
                                    {guideline.attachments && guideline.attachments.length > 0 && (
                                        <div className="mt-6 pt-6 border-t border-gray-100">
                                            <div className="space-y-3 max-h-96 overflow-y-auto pr-1 custom-scrollbar">
                                                {guideline.attachments.slice(0, 5).map((attachment, idx) => {
                                                    const filePath =
                                                        attachment?.attachment?.file_path ||
                                                        attachment?.attachment?.file_url;
                                                    return (
                                                        <a
                                                            key={attachment.mining_guideline_attachment_id || idx}
                                                            href={filePath ? getFileUrl(filePath) : "#"}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="group flex items-start justify-between p-3 rounded-xl hover:bg-gray-100 transition-all border border-gray-100 hover:border-golden-dark20"
                                                        >
                                                            <div className="space-y-1 flex-1">
                                                                <span className="text-sm font-semibold text-gray-800 group-hover:text-golden-dark transition-colors block">
                                                                    {attachment.title || attachment.label}
                                                                </span>
                                                                <div className="flex flex-wrap gap-2 items-center">
                                                                    {attachment.file_type && (
                                                                        <span className="text-[10px] text-gray-400 uppercase font-bold">
                                                                            {attachment.file_type}
                                                                        </span>
                                                                    )}
                                                                    {attachment.file_size && (
                                                                        <span className="text-[10px] text-gray-400">
                                                                            • {formatBytes(attachment.file_size)}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <div className="flex-shrink-0 ml-3 p-2 rounded-lg bg-gray-100 group-hover:bg-golden-dark text-gray-500 group-hover:text-white transition-all duration-300">
                                                                <Download className="w-4 h-4" />
                                                            </div>
                                                        </a>
                                                    );
                                                })}
                                            </div>
                                            {guideline.attachments.length > 5 && (
                                                <div className="mt-3 text-center">
                                                    <button
                                                        onClick={() => {
                                                            // You can implement a "View All" modal or expand functionality here
                                                            console.log("View all attachments");
                                                        }}
                                                        className="text-xs text-golden-dark hover:text-golden-darker font-medium transition-colors"
                                                    >
                                                        + {guideline.attachments.length - 5} more attachments
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MiningLegislationAndRegulationProcess;