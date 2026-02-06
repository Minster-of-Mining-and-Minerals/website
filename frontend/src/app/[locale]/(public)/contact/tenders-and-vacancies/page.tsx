"use client";

import React, { useState } from "react";
import { Calendar, FileText, ExternalLink } from "lucide-react";

const tendersData = [
    {
        title: "Gold Exploration Project Tender",
        description:
            "Invitation for bids for gold exploration in Amhara region. Interested companies must submit technical and financial proposals.",
        deadline: "2026-03-15",
        category: "Mining Project",
        type: "tender",
        link: "#",
    },
    {
        title: "Environmental Impact Assessment Consultant",
        description:
            "Hiring consultants for conducting EIA studies for mining projects across Oromia region.",
        deadline: "2026-03-22",
        category: "Consultancy",
        type: "tender",
        link: "#",
    },
    {
        title: "Mining Equipment Supply",
        description:
            "Open tender for the supply of modern mining equipment to federal and regional offices.",
        deadline: "2026-04-05",
        category: "Supply",
        type: "tender",
        link: "#",
    },
    {
        title: "Community Engagement Officer",
        description:
            "Vacancy for a Community Engagement Officer to oversee stakeholder relations in mining projects.",
        deadline: "2026-03-30",
        category: "Job Vacancy",
        type: "vacancy",
        link: "#",
    },
];

const TenderAndVacanciesPage = () => {
    const [activeTab, setActiveTab] = useState<"tender" | "vacancy">("tender");

    const filteredData = tendersData.filter(
        (item) => item.type === activeTab
    );

    return (
        <section className="container max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-2xl sm:text-3xl font-bold text-golden-dark mb-4">
                Tenders & Vacancies
            </h1>

            <p className="text-gray-600 mb-6 max-w-2xl">
                Browse the latest tenders and job vacancies from the Ministry of
                Mines and Petroleum.
            </p>

            {/* Tabs */}
            <div className="flex gap-2 mb-8">
                <button
                    onClick={() => setActiveTab("tender")}
                    className={`px-5 py-2 rounded-md text-sm font-medium transition
                        ${activeTab === "tender"
                            ? "bg-golden-dark text-white"
                            : "text-gray-600 hover:bg-golden-dark20"
                        }`}
                >
                    Tenders
                </button>

                <button
                    onClick={() => setActiveTab("vacancy")}
                    className={`px-5 py-2 rounded-md text-sm font-medium transition
                        ${activeTab === "vacancy"
                            ? "bg-golden-dark text-white"
                            : "text-gray-600 hover:bg-golden-dark20"
                        }`}
                >
                    Vacancies
                </button>
            </div>

            {/* Content */}
            {filteredData.length === 0 ? (
                <p className="text-gray-500">No records available.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredData.map((item, index) => (
                        <div
                            key={index}
                            className="border border-gray-200 bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition"
                        >
                            <h2 className="text-lg font-semibold text-golden-dark mb-2 flex items-center gap-2">
                                <FileText size={18} /> {item.title}
                            </h2>
                            <p className="text-gray-700 mb-3">
                                {item.description}
                            </p>
                            <p className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                                <Calendar size={16} /> Deadline: {item.deadline}
                            </p>
                            <p className="text-sm text-gray-500 mb-3">
                                Category: {item.category}
                            </p>
                            {item.link && (
                                <a
                                    href={item.link}
                                    target="_blank"
                                    className="inline-flex items-center gap-2 text-golden-dark font-medium hover:underline"
                                >
                                    View Details <ExternalLink size={14} />
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
};

export default TenderAndVacanciesPage;