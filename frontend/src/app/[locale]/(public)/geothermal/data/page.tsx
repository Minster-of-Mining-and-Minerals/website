"use client";
import React from "react";
import { Database, FileText, Download, Share2, Search, Table, Map, History } from "lucide-react";

const GeothermalDataPage = () => {
    return (
        <div className="min-h-screen bg-gray-50/30 py-8">
            <div className="max-w-7xl mx-auto px-4">
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Geothermal Data & Archives</h1>
                    <p className="text-gray-600 text-lg max-w-3xl">
                        Access Ethiopia's comprehensive database of geothermal reports, technical data, and historical exploration archives.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                        <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl mb-4">
                            <FileText className="w-8 h-8" />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">Technical Reports</h3>
                        <p className="text-sm text-gray-500 mb-4">Over 50 years of exploration documents from international and local missions.</p>
                        <button className="text-blue-600 font-medium text-sm flex items-center gap-1 hover:underline">
                            Browse Catalogue
                        </button>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                        <div className="p-4 bg-amber-50 text-amber-600 rounded-2xl mb-4">
                            <Map className="w-8 h-8" />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">High-Res Maps</h3>
                        <p className="text-sm text-gray-500 mb-4">Digital GIS maps showing thermal zones, fault systems, and well locations.</p>
                        <button className="text-amber-600 font-medium text-sm flex items-center gap-1 hover:underline">
                            View Map Gallery
                        </button>
                    </div>
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
                        <div className="p-4 bg-green-50 text-green-600 rounded-2xl mb-4">
                            <Table className="w-8 h-8" />
                        </div>
                        <h3 className="font-bold text-gray-900 mb-2">Well Data</h3>
                        <p className="text-sm text-gray-500 mb-4">Permeability, temperature profiles, and geochemical signatures of test wells.</p>
                        <button className="text-green-600 font-medium text-sm flex items-center gap-1 hover:underline">
                            Access Databases
                        </button>
                    </div>
                </div>

                <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-200">
                    <div className="p-8 border-b border-gray-100 bg-gray-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                                <Database className="text-golden-dark" />
                                Data Categories
                            </h2>
                        </div>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input 
                                type="text" 
                                placeholder="Search archives..." 
                                className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-golden-dark/20 w-full md:w-64"
                            />
                        </div>
                    </div>
                    <div className="p-0">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 text-gray-500 text-xs uppercase tracking-wider">
                                <tr>
                                    <th className="px-8 py-4 font-semibold">Data Package</th>
                                    <th className="px-8 py-4 font-semibold">Format</th>
                                    <th className="px-8 py-4 font-semibold">Last Updated</th>
                                    <th className="px-8 py-4 font-semibold">Type</th>
                                    <th className="px-8 py-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {[
                                    { name: "Main Ethiopian Rift (MER) Geo-Atlas", format: "PDF/Shapefile", date: "Jan 2024", type: "Regional Data" },
                                    { name: "Lakes District Geochemical Surveys", format: "Excel/CSV", date: "Oct 2023", type: "Geochem" },
                                    { name: "Aluto-Langano Drilling Log Pack", format: "PDF", date: "Dec 2023", type: "Drilling" },
                                    { name: "Volcanic Centers Magnetic Survey", format: "GIS", date: "Aug 2023", type: "Geophysics" },
                                    { name: "National Geothermal Potential Map", format: "TIFF/PDF", date: "Mar 2024", type: "General" },
                                ].map((row, i) => (
                                    <tr key={i} className="hover:bg-gray-50 transition-colors group">
                                        <td className="px-8 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-gray-100 rounded group-hover:bg-golden-dark group-hover:text-white transition-colors">
                                                    <FileText className="w-4 h-4" />
                                                </div>
                                                <span className="font-medium text-gray-800">{row.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-4 text-sm text-gray-500">{row.format}</td>
                                        <td className="px-8 py-4 text-sm text-gray-500">{row.date}</td>
                                        <td className="px-8 py-4 text-sm">
                                            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">{row.type}</span>
                                        </td>
                                        <td className="px-8 py-4 text-right">
                                            <button className="p-2 text-gray-400 hover:text-golden-dark">
                                                <Download className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <div className="mt-12 bg-golden-metallic/5 rounded-2xl p-8 border border-golden-metallic text-center">
                    <Share2 className="w-10 h-10 text-golden-dark mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Request Specialized Data</h3>
                    <p className="text-gray-600 max-w-2xl mx-auto mb-6">
                        Custom data packages for specific concession areas can be requested via our official portal. 
                        Digital data is available to licensed exploration companies.
                    </p>
                    <button className="bg-golden-dark text-white px-8 py-3 rounded-xl hover:bg-golden font-bold transition-all shadow-lg">
                        Submit Data Request
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GeothermalDataPage;
