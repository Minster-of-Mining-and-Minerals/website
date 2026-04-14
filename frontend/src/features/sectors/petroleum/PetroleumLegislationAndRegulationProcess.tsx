"use client";
import React from "react";
import { FileText, Download } from "lucide-react";
import { useGetPetroleumRegulationProcessesQuery } from "@/redux/api/petroleumRegulationProcessApi";
import { getFileUrl } from "@/utils/fileUrl";

const PetroleumLegislationAndRegulationProcess = () => {
    const { data: processes, isLoading, error } = useGetPetroleumRegulationProcessesQuery({ published: true });

    // Get the first published process
    const processData = processes?.[0];

    if (isLoading) {
        return (
            <div className="container mx-auto py-12 flex justify-center items-center min-h-[400px]">
                <div className="text-gray-500">Loading legislation data...</div>
            </div>
        );
    }

    if (error || !processData) {
        return (
            <div className="container mx-auto py-12 flex justify-center items-center min-h-[400px]">
                <div className="text-red-500">Failed to load legislation data. Please try again later.</div>
            </div>
        );
    }

    // Sort regulations by order
    const sortedRegulations = [...processData.regulations].sort((a, b) => a.order - b.order);

    // Separate directives by type
    const mainDirectives = processData.directives?.filter(d => d.type === "main") || [];
    const subDirectives = processData.directives?.filter(d => d.type === "sub") || [];

    // Get attachments for the sidebar
    const attachments = processData.attachments || [];

    // Helper function to render bullet points
    const renderBulletPoints = (bulletPoints) => {
        if (!bulletPoints || bulletPoints.length === 0) return null;
        return (
            <ul className="grid md:grid-cols-2 gap-y-2 gap-x-6 list-disc pl-5 text-gray-700">
                {bulletPoints.map((point, index) => (
                    <li key={index} className="pl-1">{point.text || point}</li>
                ))}
            </ul>
        );
    };

    // Helper function to render steps
    const renderSteps = (steps) => {
        if (!steps || steps.length === 0) return null;
        return (
            <ul className="space-y-4">
                {steps.map((step, index) => (
                    <li key={index} className="flex gap-4 items-start bg-golden-dark10 p-4 rounded-xl">
                        <span className="flex-shrink-0 w-8 h-8 rounded-full bg-golden-dark20 flex items-center justify-center text-golden-dark font-bold text-sm">
                            {step.order || index + 1}
                        </span>
                        <p className="text-gray-700 leading-relaxed">{step.description}</p>
                    </li>
                ))}
            </ul>
        );
    };

    // Helper function to render objectives
    const renderObjectives = (objectives) => {
        if (!objectives || objectives.length === 0) return null;

        // Check if objectives have both title and description (structured content)
        const hasBothTitleAndDescription = objectives.some(obj => obj.title && obj.title.trim() !== "" && obj.description);

        if (hasBothTitleAndDescription) {
            // Render as italic cards with both title and description
            return (
                <div className="space-y-4">
                    {objectives.map((obj, idx) => (
                        <div key={idx} className="italic text-gray-600 bg-gray-50 p-4 rounded-lg border-l-4 border-golden-dark20">
                            {obj.title && <h4 className="font-semibold mb-2 text-gray-800">{obj.title}</h4>}
                            <p>{obj.description}</p>
                        </div>
                    ))}
                </div>
            );
        }

        // If only description exists (single paragraph style)
        if (objectives.length === 1 && !objectives[0].title) {
            return (
                <p className="italic text-gray-600 bg-gray-50 p-4 rounded-lg border-l-4 border-golden-dark20">
                    {objectives[0].description}
                </p>
            );
        }

        // For multiple objectives without titles, render as italic list
        return (
            <div className="space-y-3">
                {objectives.map((obj, idx) => (
                    <p key={idx} className="italic text-gray-600 bg-gray-50 p-4 rounded-lg border-l-4 border-golden-dark20">
                        {obj.description}
                    </p>
                ))}
            </div>
        );
    };



    return (
        <div className="container mx-auto py-12">
            <div className="grid lg:grid-cols-3 gap-12">
                {/* Main Content (Left, 2/3) */}
                <div className="lg:col-span-2 space-y-12">
                    {/* Loop through all regulations and render dynamically */}
                    {sortedRegulations.map((regulation, index) => {
                        const isFirst = index === 0;
                        const hasBulletPoints = regulation.bullet_points && regulation.bullet_points.length > 0;
                        const hasSteps = regulation.steps && regulation.steps.length > 0;
                        const hasObjectives = regulation.objectives && regulation.objectives.length > 0;

                        return (
                            <section key={regulation.petroleum_regulation_id || index} className={!isFirst ? "pt-6 border-t" : ""}>
                                {/* Title - different styling for first vs others */}
                                {isFirst ? (
                                    <h1 className="text-3xl font-bold text-golden-dark mb-6">{regulation.title}</h1>
                                ) : (
                                    <h2 className="text-2xl font-semibold text-golden-dark border-b border-golden-dark20 pb-2 mb-4">{regulation.title}</h2>
                                )}

                                {/* Description */}
                                {regulation.description && (
                                    <div className="space-y-4 text-gray-700 leading-relaxed mb-4">
                                        {regulation.description.split('\n\n').map((paragraph, idx) => (
                                            <p key={idx}>{paragraph}</p>
                                        ))}
                                    </div>
                                )}

                                {/* Objectives */}
                                {hasObjectives && renderObjectives(regulation.objectives)}

                                {/* Bullet Points */}
                                {hasBulletPoints && renderBulletPoints(regulation.bullet_points)}

                                {/* Steps */}
                                {hasSteps && renderSteps(regulation.steps)}
                            </section>
                        );
                    })}

                    {/* Reference Section from Directive */}
                    {mainDirectives && mainDirectives.map((directive, index) => (
                        <section key={directive.petroleum_directive_id || index} className="bg-gray-900 text-white p-6 border rounded-2xl shadow-xl">
                            {directive.title && <p className="text-xl font-medium text-gray-200">{directive.title}</p>}
                            {directive.description && <p className="text-lg font-medium text-gray-500">{directive.description}</p>}
                        </section>
                    ))}
                </div>

                {/* Sidebar (Right, 1/3) */}
                <div className="lg:col-span-1">
                    <div className="sticky top-24 space-y-8">
                        {/* Attachments Section */}
                        {attachments.length > 0 && (
                            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                                <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
                                    <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                        <FileText className="w-5 h-5 text-golden-dark" />
                                        Important Documents
                                        {attachments.length > 5 && (
                                            <span className="text-sm font-normal text-gray-500 ml-2">
                                                ({attachments.length} documents)
                                            </span>
                                        )}
                                    </h3>
                                </div>
                                <div className={`p-4 space-y-2 ${attachments.length > 5 ? 'max-h-[400px] overflow-y-auto' : ''}`}>
                                    {attachments.map((doc, index) => {
                                        const filePath = doc.attachment?.file_path;
                                        return (
                                            <a
                                                key={doc.petroleum_regulation_attachment_id || index}
                                                href={filePath ? getFileUrl(filePath) : "#"}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group flex flex-col p-3 rounded-xl hover:bg-golden-dark10 transition-all border border-transparent hover:border-golden-dark20"
                                            >
                                                <div className="flex items-start justify-between gap-3">
                                                    <span className="text-sm font-medium text-gray-800 leading-snug group-hover:text-golden-dark">
                                                        {doc.label}
                                                    </span>
                                                    <div className="flex-shrink-0 p-2 rounded-lg bg-gray-100 group-hover:bg-golden-dark text-gray-500 group-hover:text-white transition-colors">
                                                        <Download className="w-4 h-4" />
                                                    </div>
                                                </div>
                                                <span className="mt-1 text-[10px] uppercase tracking-wider font-bold text-gray-400 group-hover:text-golden-dark60">
                                                    {doc.attachment?.file_name?.split('.').pop() || 'PDF'}
                                                </span>
                                            </a>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Sub Directives (Contact/Help Cards) */}
                        {subDirectives.map((directive, index) => (
                            <div key={directive.petroleum_directive_id || index} className="bg-gray-50 rounded-2xl p-6 shadow-sm border border-gray-100">
                                <h4 className="text-lg font-bold mb-2 text-golden-dark">{directive.title}</h4>
                                <p className="text-sm text-gray-600 mb-4">{directive.description}</p>
                                {directive.action_label && directive.action && (
                                    <a
                                        href={directive.action}
                                        target={directive.action.startsWith('http') ? '_blank' : '_self'}
                                        rel={directive.action.startsWith('http') ? 'noopener noreferrer' : ''}
                                        className="block w-full py-3 bg-golden-dark text-white font-bold rounded-xl hover:bg-golden-darkHover transition-colors text-center shadow-md"
                                    >
                                        {directive.action_label}
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PetroleumLegislationAndRegulationProcess;