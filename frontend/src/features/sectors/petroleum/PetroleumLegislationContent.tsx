"use client";

import React, { useMemo } from "react";
import { useGetPetroleumRegulationProcessesQuery } from "@/redux/api/petroleumRegulationProcessApi";
import { ChevronLeft, ChevronRight, ExternalLink, BookOpen, FileText, List, Scale } from "lucide-react";
import { ResourcePageSkeleton } from "@/components/skeletons";
import { getFileUrl } from "@/utils/fileUrl";
import PublicEmptyState from "@/components/common/PublicEmptyState";
import { useTranslations } from "next-intl";
import {
    PetroleumRegulation,
    PetroleumDirective,
    PetroleumRegulationAttachment,
} from "@/redux/types/petroleumRegulationProcess";

/* -----------------------------------------------------------------------
   Helpers
----------------------------------------------------------------------- */
const hasContent = (val: any) => {
    if (!val) return false;
    if (Array.isArray(val)) return val.length > 0;
    if (typeof val === "string") return val.trim().length > 0;
    return false;
};

/* -----------------------------------------------------------------------
   Sub-components
----------------------------------------------------------------------- */

/** Renders a single Regulation card */
function RegulationCard({ reg, index }: { reg: PetroleumRegulation; index: number }) {
    return (
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">
            {/* Header */}
            <div className="flex items-start gap-4 p-6 border-b border-gray-50">
                <span className="flex-shrink-0 w-9 h-9 rounded-full bg-[#094C81] flex items-center justify-center text-white font-bold text-sm shadow">
                    {index + 1}
                </span>
                <div className="flex-1 min-w-0">
                    {reg.title && (
                        <h3 className="text-lg font-semibold text-gray-900 leading-snug">{reg.title}</h3>
                    )}
                    {reg.description && (
                        <p className="mt-1 text-gray-600 text-sm leading-relaxed">{reg.description}</p>
                    )}
                </div>
            </div>

            {/* Body */}
            <div className="p-6 space-y-5">
                {/* Content (rich-text array) */}
                {hasContent(reg.content) && (
                    <div className="space-y-2">
                        {(reg.content as string[]).map((c, i) => (
                            <p key={i} className="text-gray-700 text-sm leading-relaxed">{c}</p>
                        ))}
                    </div>
                )}

                {/* Objectives */}
                {hasContent(reg.objectives) && (
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-1.5">
                            <BookOpen className="w-3.5 h-3.5" /> Objectives
                        </h4>
                        <ul className="space-y-1.5">
                            {(reg.objectives as string[]).map((o, i) => (
                                <li key={i} className="flex items-start gap-2 text-gray-700 text-sm">
                                    <ChevronRight className="w-4 h-4 text-[#094C81] flex-shrink-0 mt-0.5" />
                                    <span>{o}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Bullet points */}
                {hasContent(reg.bullet_points) && (
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 flex items-center gap-1.5">
                            <List className="w-3.5 h-3.5" /> Key Points
                        </h4>
                        <ul className="space-y-1.5">
                            {(reg.bullet_points as string[]).map((bp, i) => (
                                <li key={i} className="flex items-start gap-2 text-gray-700 text-sm">
                                    <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[#094C81] mt-2" />
                                    <span>{bp}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Steps (numbered list) */}
                {hasContent(reg.steps) && (
                    <div>
                        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">Steps</h4>
                        <ol className="space-y-2">
                            {(reg.steps as string[]).map((s, i) => (
                                <li key={i} className="flex items-start gap-3 text-gray-700 text-sm">
                                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center mt-0.5">
                                        {i + 1}
                                    </span>
                                    <span>{s}</span>
                                </li>
                            ))}
                        </ol>
                    </div>
                )}
            </div>
        </div>
    );
}

/** Renders the directives section */
function DirectivesSection({ directives }: { directives: PetroleumDirective[] }) {
    const main = directives.filter((d) => d.type === "main");
    const sub = directives.filter((d) => d.type === "sub");

    return (
        <div className="space-y-6">
            {/* Main directives */}
            {main.length > 0 && (
                <div className="space-y-4">
                    {main.map((d) => (
                        <div key={d.petroleum_directive_id} className="bg-[#094C81] text-white rounded-2xl p-6 shadow">
                            <h3 className="text-xl font-bold mb-2">{d.title}</h3>
                            {d.description && <p className="text-blue-100 leading-relaxed">{d.description}</p>}
                            {d.action_label && d.action && (
                                <a
                                    href={d.action}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 mt-4 bg-white text-[#094C81] font-semibold text-sm px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                                >
                                    {d.action_label}
                                    <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Sub directives */}
            {sub.length > 0 && (
                <div className="grid sm:grid-cols-2 gap-4">
                    {sub.map((d) => (
                        <div
                            key={d.petroleum_directive_id}
                            className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <h4 className="font-semibold text-gray-900 mb-1.5">{d.title}</h4>
                            {d.description && <p className="text-gray-600 text-sm leading-relaxed">{d.description}</p>}
                            {d.action_label && d.action && (
                                <a
                                    href={d.action}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 mt-3 text-[#094C81] font-medium text-sm hover:underline"
                                >
                                    {d.action_label}
                                    <ExternalLink className="w-3.5 h-3.5" />
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

/** Renders the downloadable attachments sidebar block */
function AttachmentsBlock({ attachments }: { attachments: PetroleumRegulationAttachment[] }) {
    if (!attachments.length) return null;
    return (
        <div className="bg-white rounded-2xl shadow border border-gray-100 overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#094C81]" />
                <h3 className="text-base font-bold text-gray-900">Downloads</h3>
            </div>
            <div className="p-4 space-y-2">
                {attachments.map((att) => {
                    const filePath = att.attachment?.file_path;
                    return (
                        <a
                            key={att.petroleum_regulation_attachment_id}
                            href={filePath ? getFileUrl(filePath) : "#"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-between p-3 rounded-xl border border-transparent hover:border-blue-100 hover:bg-blue-50 transition-all gap-3"
                        >
                            <span className="text-sm font-medium text-gray-800 leading-snug group-hover:text-[#094C81]">
                                {att.label || att.attachment?.original_name || "Document"}
                            </span>
                            <span className="flex-shrink-0 text-xs font-bold uppercase tracking-wide text-gray-400 group-hover:text-[#094C81]">
                                {att.attachment?.mime_type?.split("/")[1]?.toUpperCase() || "FILE"}
                            </span>
                        </a>
                    );
                })}
            </div>
        </div>
    );
}

/* -----------------------------------------------------------------------
   Main export
----------------------------------------------------------------------- */
export default function PetroleumLegislationContent() {
    const { data = [], isLoading } = useGetPetroleumRegulationProcessesQuery({ published: true });
    const t = useTranslations("empty_state");

    const publishedProcess = useMemo(() => data[0] ?? null, [data]);

    if (isLoading) {
        return <ResourcePageSkeleton />;
    }

    if (!publishedProcess) {
        return (
            <PublicEmptyState title={t("petroleum_legislation_title")} icon={Scale} />
        );
    }

    const { regulations = [], directives = [], attachments = [] } = publishedProcess;

    return (
        <div className="space-y-12 mt-10 pt-10 border-t">

            {/* REGULATIONS */}
            {regulations.length > 0 && (
                <section className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-1 h-8 rounded-full bg-[#094C81]" />
                        <h2 className="text-2xl font-bold text-gray-900">Regulations</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        {[...regulations]
                            .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
                            .map((reg, i) => (
                                <RegulationCard key={reg.petroleum_regulation_id} reg={reg} index={i} />
                            ))}
                    </div>
                </section>
            )}

            {/* DIRECTIVES */}
            {directives.length > 0 && (
                <section className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="w-1 h-8 rounded-full bg-[#094C81]" />
                        <h2 className="text-2xl font-bold text-gray-900">Directives</h2>
                    </div>
                    <DirectivesSection
                        directives={[...directives].sort((a, b) => (a.order ?? 0) - (b.order ?? 0))}
                    />
                </section>
            )}

            {/* ATTACHMENTS — inline below directives */}
            {attachments.length > 0 && (
                <section>
                    <AttachmentsBlock attachments={attachments} />
                </section>
            )}
        </div>
    );
}
