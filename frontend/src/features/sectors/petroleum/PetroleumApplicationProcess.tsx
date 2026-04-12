"use client";

import React, { useMemo } from "react";
import { useGetPetroleumProcessesQuery } from "@/redux/api/petroleumProcessApi";
import { Loader2 } from "lucide-react";
import { getFileUrl } from "@/utils/fileUrl";

const hasRealContent = (html: string) => {
    if (!html) return false;
    const trimmed = html.trim();
    if (trimmed === "<p></p>" || trimmed === "<p><br></p>" || trimmed === "") return false;
    const text = trimmed.replace(/<[^>]*>/g, "").trim();
    return text.length > 0;
};

export default function PetroleumApplicationProcess() {
    const { data, isLoading } = useGetPetroleumProcessesQuery();

    const publishedProcess = useMemo(() => {
        return data?.find((p) => p.published === true);
    }, [data]);

    const process_blocks = publishedProcess?.process_blocks ?? [];
    const process_steps = publishedProcess?.process_steps ?? [];

    const validContentSteps = useMemo(() => {
        return process_steps.filter((step) => hasRealContent(step.content));
    }, [process_steps]);

    if (isLoading) {
        return (
            <div className="flex h-[50vh] items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-[#094C81]" />
            </div>
        );
    }

    if (!publishedProcess) {
        return (
            <div className="container mx-auto py-20 text-center space-y-4">
                <h1 className="text-3xl font-bold text-gray-800">
                    No Petroleum Process Published
                </h1>
                <p className="text-gray-500">
                    Please check back later for updates.
                </p>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-10 space-y-12">
            {/* HEADER */}
            <div className="space-y-4">
                <h1 className="text-3xl font-bold text-[#094C81]">
                    {publishedProcess.title}
                </h1>
                {publishedProcess.description && (
                    <p className="text-gray-700 leading-relaxed text-lg">
                        {publishedProcess.description}
                    </p>
                )}
            </div>

            {/* MAP */}
            {process_blocks?.[0]?.attachments?.length > 0 && (
                <div className="relative w-full h-[450px] rounded-xl overflow-hidden shadow-md border border-gray-100">
                    <img
                        src={getFileUrl(
                            process_blocks[0].attachments[0].attachment?.file_path || ""
                        )}
                        alt="Map"
                        className="w-full h-full object-cover mt-0 bg-white"
                    />
                </div>
            )}

            {/* PROCESS BLOCKS */}
            {process_blocks.length > 0 && (
                <section className="space-y-12 w-full max-w-full overflow-hidden">
                    {process_blocks.map((block) => (
                        <div
                            key={block.process_block_id}
                            className="space-y-6 w-full max-w-full overflow-hidden"
                        >
                            <h2 className="text-2xl font-bold text-[#094C81] border-b pb-2 break-words">
                                {block.title}
                            </h2>

                            {block.description && (
                                <p className="text-gray-700 text-lg leading-relaxed break-words">
                                    {block.description}
                                </p>
                            )}

                            {block.content && (
                                <div
                                    className="prose prose-blue max-w-full text-gray-700 break-words overflow-hidden"
                                    dangerouslySetInnerHTML={{ __html: block.content }}
                                />
                            )}
                        </div>
                    ))}
                </section>
            )}

            {/* SECTION A — TITLES + STEPS */}
            {process_steps.length > 0 && (
                <section className="space-y-12 pt-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {process_steps.map((process) => (
                            <div
                                key={process.process_step_id}
                                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#094C81] to-blue-400" />

                                <h3 className="text-2xl font-bold text-[#094C81] mb-4">
                                    {process.title}
                                </h3>

                                {process.description && (
                                    <p className="text-gray-600 mb-6">{process.description}</p>
                                )}

                                {process.steps?.length > 0 && (
                                    <div className="relative">
                                        {/* Center line - hidden on mobile */}
                                        <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-0.5 h-full bg-blue-200"></div>

                                        <div className="relative space-y-8">
                                            {process.steps.map((step, sIndex) => (
                                                <div
                                                    key={step.step_id}
                                                    className={`relative flex flex-col md:flex-row ${sIndex % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                                                        }`}
                                                >
                                                    {/* Step circle */}
                                                    <div className="absolute md:left-1/2 left-0 md:-translate-x-1/2 -translate-y-1/2 z-10">
                                                        <div className="w-8 h-8 rounded-full bg-[#094C81] border-4 border-white text-white flex items-center justify-center font-bold shadow-md">
                                                            {sIndex + 1}
                                                        </div>
                                                    </div>

                                                    {/* Content box */}
                                                    <div
                                                        className={`w-full md:w-5/12 mt-8 md:mt-0 ${sIndex % 2 === 0 ? "md:pr-4" : "md:pl-4"
                                                            }`}
                                                    >
                                                        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
                                                            <div className="flex gap-4 items-center">
                                                                {step.attachment && (
                                                                    <div className="flex-shrink-0">
                                                                        <img
                                                                            src={getFileUrl(step.attachment.file_path)}
                                                                            className="w-16 h-16 rounded-full object-cover"
                                                                            alt=""
                                                                        />
                                                                    </div>
                                                                )}
                                                                <p className="text-gray-800 font-medium flex-1">
                                                                    {step.description}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {/* Spacer only on desktop */}
                                                    <div className="hidden md:block w-5/12"></div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* SECTION B — CONTENT ONLY */}
            {validContentSteps.length > 0 && (
                <section className="space-y-12 pt-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {validContentSteps.map((process) => (
                            <div
                                key={process.process_step_id}
                                className="prose prose-sm text-gray-600 border-l-4 border-slate-200 pl-4 overflow-hidden break-words"
                            >
                                <div
                                    className="max-w-full overflow-x-auto prose-img:max-w-full prose-img:h-auto"
                                    dangerouslySetInnerHTML={{ __html: process.content }}
                                />
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}