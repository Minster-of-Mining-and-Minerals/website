"use client";
import React from "react";
import { BookOpen, Newspaper, Microscope, Globe, Search, Download, ExternalLink, Calendar } from "lucide-react";

const GeothermalResearchPage = () => {
    return (
        <div className="min-h-screen bg-gray-50/50 py-12 px-6">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 underline decoration-golden-dark decoration-4 underline-offset-8">
                        Research & <span className="text-golden-dark">Publications</span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Advancing the science of geothermal energy through collaborative research, technical studies, and international publications.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                    <div className="lg:col-span-2 space-y-8">
                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <BookOpen className="text-golden-dark" />
                                Latest Technical Reports
                            </h2>
                            <div className="space-y-4">
                                {[
                                    { title: "Stratigraphy & Heat Source Identification in Tendaho Graben", date: "Jan 2024", author: "GIE/UNU", tag: "Geology" },
                                    { title: "Geochemical Signatures of Thermal Waters in Southern Rift Valley", date: "Nov 2023", author: "Ministry Research Team", tag: "Geochem" },
                                    { title: "Seismic Tomography for Geothermal Reservoir Imaging at Corbetti", date: "Aug 2023", author: "International Collaboration", tag: "Geophysics" },
                                ].map((doc, i) => (
                                    <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex justify-between items-center group">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2">
                                                <span className="text-[10px] font-bold text-golden-dark bg-golden-bg/20 px-2 py-0.5 rounded tracking-tighter uppercase">{doc.tag}</span>
                                                <p className="text-xs text-gray-400 font-medium">{doc.date}</p>
                                            </div>
                                            <h3 className="font-bold text-gray-800 group-hover:text-golden-dark transition-colors">{doc.title}</h3>
                                            <p className="text-xs text-gray-500 italic">By: {doc.author}</p>
                                        </div>
                                        <button className="p-3 bg-gray-50 text-gray-400 rounded-xl group-hover:bg-golden-dark group-hover:text-white transition-all">
                                            <Download className="w-5 h-5" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                <Microscope className="text-golden-dark" />
                                Ongoing Research Areas
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {[
                                    "Hydrothermal Alteration Minerology",
                                    "Direct Heat Use in Agriculture",
                                    "Regional Crustal Thickness Modeling",
                                    "Isotope Geochemistry Mapping",
                                    "Renewable Energy Cost Analysis",
                                    "Reservoir Reinjection Strategies"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-gray-100">
                                        <div className="w-2 h-2 bg-golden-dark rounded-full" />
                                        <span className="text-sm font-medium text-gray-700">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>

                    <div className="space-y-8">
                        <div className="bg-golden-dark text-white p-8 rounded-3xl shadow-xl">
                            <h3 className="text-xl font-bold mb-4">Submit a Proposal</h3>
                            <p className="text-sm text-golden-bg/80 leading-relaxed mb-6">
                                We welcome research proposals from universities and independent researchers interested in Ethiopia's geothermal systems.
                            </p>
                            <ul className="text-xs space-y-3 mb-8">
                                <li className="flex items-center gap-2">✔ Access to sample archives</li>
                                <li className="flex items-center gap-2">✔ Collaborative field logistics</li>
                                <li className="flex items-center gap-2">✔ Data sharing agreements</li>
                            </ul>
                            <button className="w-full bg-white text-golden-dark font-bold py-3 rounded-xl hover:bg-gray-50 transition-colors">
                                Apply Now
                            </button>
                        </div>

                        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm underline-offset-2">
                             <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-golden-dark" />
                                Upcoming Symposiums
                             </h4>
                             <div className="space-y-4">
                                <div className="border-l-4 border-golden-dark pl-4 py-1">
                                    <p className="text-xs text-gray-400">June 12-14, 2024</p>
                                    <p className="text-sm font-bold text-gray-800">East African Geothermal Forum</p>
                                </div>
                                <div className="border-l-4 border-gray-200 pl-4 py-1">
                                    <p className="text-xs text-gray-400">Sept 05, 2024</p>
                                    <p className="text-sm font-bold text-gray-800">Geoscience Data Summit</p>
                                </div>
                             </div>
                        </div>
                    </div>
                </div>

                <div className="text-center p-12 bg-gray-100/50 rounded-3xl border border-dashed border-gray-300">
                    <p className="text-gray-500 font-medium mb-4 italic">"Fostering knowledge is the first step to energy independence."</p>
                    <div className="flex justify-center gap-4">
                        <span className="text-xs text-gray-400">© 2024 Ministry Research Dept.</span>
                        <span className="text-xs text-gray-400 hover:text-golden-dark cursor-pointer flex items-center gap-1">Open Data License <ExternalLink className="w-3 h-3" /></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GeothermalResearchPage;
