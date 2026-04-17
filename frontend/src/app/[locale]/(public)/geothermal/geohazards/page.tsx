"use client";
import React from "react";
import { ShieldAlert, Mountain, Activity, LayoutGrid, Globe, HelpCircle, AlertCircle, Info } from "lucide-react";

const GeohazardsPage = () => {
    return (
        <div className="min-h-screen bg-neutral-900 text-white font-sans">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="flex flex-col lg:flex-row gap-16 mb-20">
                    <div className="lg:w-1/2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-500/20 text-red-500 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                            <ShieldAlert className="w-4 h-4" />
                            Monitoring & Safety
                        </div>
                        <h1 className="text-5xl font-bold mb-8 leading-tight">
                            Geohazards & <span className="text-red-500">Risk Studies</span>
                        </h1>
                        <p className="text-xl text-neutral-400 leading-relaxed mb-8">
                            Most geothermal prospects in Ethiopia are located in tectonically active areas.
                            Managing risks such as earthquakes, volcanism, and CO2 emissions is essential for safe infrastructure and communities.
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {[
                                { title: "Seismic Monitoring", icon: Activity },
                                { title: "Volcanic Surveillance", icon: Mountain },
                                { title: "Gas Monitoring", icon: Globe },
                                { title: "Hazard Zoning", icon: LayoutGrid },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-4 bg-neutral-800/50 p-4 rounded-xl border border-neutral-700 hover:border-red-500/30 transition-all group">
                                    <item.icon className="w-6 h-6 text-red-500 group-hover:scale-110 transition-transform" />
                                    <span className="font-semibold">{item.title}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="lg:w-1/2 flex items-center">
                        <div className="bg-neutral-800 p-8 rounded-3xl border border-neutral-700 shadow-2xl relative overflow-hidden group">
                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-red-500/10 rounded-full blur-3xl group-hover:bg-red-500/20 transition-all" />
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <AlertCircle className="text-red-500" />
                                Active Monitoring Projects
                            </h3>
                            <div className="space-y-6">
                                {[
                                    { name: "ER-OS Seismic Network", status: "Active", loc: "Main Ethiopian Rift" },
                                    { name: "Satellite InSAR Monitoring", status: "Active", loc: "National Coverage" },
                                    { name: "Volcanic Gas Sampling", status: "Seasonal", loc: "Dallol & Erta Ale" },
                                ].map((proj, i) => (
                                    <div key={i} className="flex justify-between items-center p-4 bg-neutral-900 rounded-xl">
                                        <div>
                                            <p className="font-bold">{proj.name}</p>
                                            <p className="text-xs text-neutral-500">{proj.loc}</p>
                                        </div>
                                        <span className={`px-2 py-1 rounded-md text-[10px] uppercase font-bold ${proj.status === 'Active' ? 'bg-green-500/10 text-green-500' : 'bg-amber-500/10 text-amber-500'}`}>
                                            {proj.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    <div className="bg-neutral-800/40 p-8 rounded-2xl border border-neutral-700 border-l-4 border-l-red-500 hover:bg-neutral-800 transition-colors">
                        <div className="text-red-500 mb-6"><HelpCircle className="w-10 h-10" /></div>
                        <h3 className="text-xl font-bold mb-4">Earthquake Safety</h3>
                        <p className="text-neutral-500 text-sm leading-relaxed">Implementing building codes and early warning systems for the highly populated Rift regions.</p>
                    </div>
                    <div className="bg-neutral-800/40 p-8 rounded-2xl border border-neutral-700 border-l-4 border-l-red-500 hover:bg-neutral-800 transition-colors">
                        <div className="text-red-500 mb-6"><Info className="w-10 h-10" /></div>
                        <h3 className="text-xl font-bold mb-4">Landslide Prevention</h3>
                        <p className="text-neutral-500 text-sm leading-relaxed">Mapping slope stability in mountainous geothermal areas to protect road and energy infrastructure.</p>
                    </div>
                    <div className="bg-neutral-800/40 p-8 rounded-2xl border border-neutral-700 border-l-4 border-l-red-500 hover:bg-neutral-800 transition-colors">
                        <div className="text-red-500 mb-6"><Activity className="w-10 h-10" /></div>
                        <h3 className="text-xl font-bold mb-4">Induced Seismicity</h3>
                        <p className="text-neutral-500 text-sm leading-relaxed">Monitoring and managing micro-seismicity during geothermal fluid injection to ensure zero impact on structures.</p>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl">
                    <div>
                        <h2 className="text-3xl font-bold mb-2">Emergency Response Guidelines</h2>
                        <p className="text-red-100 italic">Protocols for developers and local governments in case of geological events.</p>
                    </div>
                    <button className="bg-white text-red-600 px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-red-50 transition-all flex items-center gap-2">
                        Download Guidelines (PDF)
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GeohazardsPage;
