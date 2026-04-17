"use client";
import React, { useState } from "react";
import { Zap, Activity, BarChart3, Globe, Target, Shield, Droplets, Map, CheckCircle, Download, Eye, ChevronDown, Flame } from "lucide-react";

const GeothermalResourcesPage = () => {
    const [activeTab, setActiveTab] = useState("potential");

    const tabs = [
        { id: "potential", label: "Energy Potential", icon: Zap },
        { id: "prospects", label: "Key Prospects", icon: Map },
        { id: "assessment", label: "Assessment Methods", icon: Activity },
        { id: "investment", label: "Investment Ready", icon: Target },
    ];

    const prospects = [
        {
            title: "Aluto-Langano",
            status: "In Expansion",
            capacity: "Currently 7.3 MW (Expanding to 70+ MW)",
            description: "The most advanced geothermal project in Ethiopia, located in the Central Rift Valley.",
            color: "bg-red-100 text-red-700",
            icon: Flame,
        },
        {
            title: "Corbetti",
            status: "Under Development",
            capacity: "Planned 500 MW",
            description: "A large-scale caldera project with high-temperature volcanic systems.",
            color: "bg-orange-100 text-orange-700",
            icon: Zap,
        },
        {
            title: "Tulu Moye",
            status: "Advanced Exploration",
            capacity: "Phase 1: 50 MW (Target: 150 MW)",
            description: "A major prospect characterized by high-temperature reservoirs and extensive recent faulting.",
            color: "bg-amber-100 text-amber-700",
            icon: Activity,
        },
        {
            title: "Tendaho",
            status: "Pilot Stage",
            capacity: "High Potential Shallow Reservoir",
            description: "Located in the Afar region, this prospect offers unique shallow heat resources.",
            color: "bg-blue-100 text-blue-700",
            icon: Droplets,
        },
        {
            title: "Dallol / Danakil",
            status: "Early Exploration",
            capacity: "Direct Use & Power Potential",
            description: "Hypersaline thermal systems with high enthalpy potential in the Danakil Depression.",
            color: "bg-teal-100 text-teal-700",
            icon: Globe,
        },
        {
            title: "Abaya & Fantale",
            status: "Site Characterization",
            capacity: "Estimated 100+ MW each",
            description: "Promising volcanic complexes with strong surface manifestations.",
            color: "bg-purple-100 text-purple-700",
            icon: Map,
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Hero Section */}
                <div className="mb-12">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-10">
                        <div className="lg:w-2/3">
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                                Geothermal <span className="text-golden-dark">Resource</span> Assessment
                            </h1>
                            <p className="text-gray-600 text-lg mb-6 max-w-3xl">
                                Ethiopia is one of the few countries in the world with the potential to generate thousands of megawatts of baseload power from geothermal heat.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <button className="px-6 py-3 bg-golden-dark text-white rounded-lg hover:bg-golden-dark/90 transition-colors font-medium flex items-center gap-2">
                                    <Download className="w-5 h-5" />
                                    Download Resource Atlas
                                </button>
                                <button className="px-6 py-3 bg-white text-golden-dark rounded-lg hover:bg-gray-50 transition-colors font-medium border border-golden-dark/30 flex items-center gap-2">
                                    <Eye className="w-5 h-5" />
                                    Explore Prospect Map
                                </button>
                            </div>
                        </div>
                        <div className="lg:w-1/3">
                            <div className="bg-gradient-to-br from-orange-50 to-white rounded-2xl shadow-xl p-6 border border-orange-100">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-orange-100 p-3 rounded-xl">
                                        <Zap className="w-8 h-8 text-orange-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">Ethiopia's Potential</h3>
                                        <p className="text-sm text-gray-600">Geothermal Sector Highlights</p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                                        <span className="text-gray-600">Est. Total Potential</span>
                                        <span className="font-bold text-gray-900">10,000+ MW</span>
                                    </div>
                                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                                        <span className="text-gray-600">Identified Prospects</span>
                                        <span className="font-bold text-gray-900">22+</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Global Ranking</span>
                                        <span className="font-bold text-gray-900">Top 10 Potential</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Tabs */}
                    <div className="flex overflow-x-auto py-2 gap-2 mb-8">
                        {tabs.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-4 py-3 rounded-xl flex items-center gap-2 whitespace-nowrap transition-all ${isActive
                                            ? "bg-golden-dark text-white shadow-md"
                                            : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                                        }`}
                                >
                                    <Icon className="w-5 h-5" />
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Content Sections */}
                <div className="space-y-12">
                    {activeTab === "potential" && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                                <div className="flex items-center gap-3 mb-6">
                                    <Globe className="w-8 h-8 text-golden-dark" />
                                    <h2 className="text-2xl font-bold text-gray-900">The Geothermal Advantage</h2>
                                </div>
                                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                                    Unlike hydro or wind power, geothermal energy provides constant, predictable baseload power 24/7. 
                                    Ethiopia's location along the East African Rift ensures a consistent heat supply from the Earth's mantle, 
                                    making it the ultimate renewable energy backbone for the nation.
                                </p>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                                        <p className="text-sm text-green-700 font-bold mb-1">Carbon Free</p>
                                        <p className="text-xs text-green-600">Zero-emission power generation.</p>
                                    </div>
                                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                                        <p className="text-sm text-blue-700 font-bold mb-1">95% Uptime</p>
                                        <p className="text-xs text-blue-600">Highest capacity factor of all renewables.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="bg-gradient-to-br from-amber-50 to-white rounded-2xl shadow-lg p-6 border border-amber-100">
                                    <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                        <Target className="w-6 h-6 text-amber-600" />
                                        National Targets
                                    </h3>
                                    <p className="text-gray-700 mb-4">
                                        The Ministry of Mines and Petroleum is committed to integrating 2,500 MW of geothermal capacity 
                                        into the national grid by 2030, reducing dependency on seasonal hydro resources.
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-3 py-1 bg-amber-100 text-amber-700 text-sm rounded-full">
                                            Energy Diversification
                                        </span>
                                        <span className="px-3 py-1 bg-amber-100 text-amber-700 text-sm rounded-full">
                                            Climate Resilience
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "prospects" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {prospects.map((prospect, index) => {
                                const Icon = prospect.icon;
                                return (
                                    <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow">
                                        <div className={`${prospect.color} p-4 flex items-center gap-3`}>
                                            <Icon className="w-6 h-6" />
                                            <div>
                                                <h3 className="font-bold">{prospect.title}</h3>
                                                <p className="text-xs opacity-90">{prospect.status}</p>
                                            </div>
                                        </div>
                                        <div className="p-5">
                                            <div className="mb-3">
                                                <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Estimated Capacity</span>
                                                <p className="text-gray-900 font-bold">{prospect.capacity}</p>
                                            </div>
                                            <p className="text-gray-700 text-sm mb-4">{prospect.description}</p>
                                            <button className="text-sm text-golden-dark hover:text-golden-dark/80 font-medium flex items-center gap-1">
                                                View Technical Brief
                                                <ChevronDown className="w-4 h-4 rotate-270" />
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {activeTab === "assessment" && (
                        <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                            <h2 className="text-2xl font-bold text-gray-900 mb-8">How We Assess Geothermal Resources</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <div className="flex gap-4">
                                        <div className="p-2 bg-golden-bg/20 rounded-lg h-fit text-golden-dark">01</div>
                                        <div>
                                            <h4 className="font-bold text-gray-800">Surface Exploration</h4>
                                            <p className="text-gray-600 text-sm">Detailed geological mapping and geochemical analysis of surface manifestations (springs, geysers) to estimate subsurface temperatures.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="p-2 bg-golden-bg/20 rounded-lg h-fit text-golden-dark">02</div>
                                        <div>
                                            <h4 className="font-bold text-gray-800">Geophysical Surveys</h4>
                                            <p className="text-gray-600 text-sm">Magnetotelluric (MT) and Gravity surveys to visualize the subsurface plumbing and locate the reservoir cap rock and heat source.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="p-2 bg-golden-bg/20 rounded-lg h-fit text-golden-dark">03</div>
                                        <div>
                                            <h4 className="font-bold text-gray-800">Exploration Well Drilling</h4>
                                            <p className="text-gray-600 text-sm">Targeted drilling to verify reservoir conditions, fluid chemistry, and permeability.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 italic text-gray-600 text-sm flex items-center">
                                    "Our assessment protocols follow international geothermal reporting codes e.g., UNFC-2009 for geothermal specifications, ensuring data bankability for international financiers."
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "investment" && (
                        <div className="bg-gradient-to-br from-golden-dark/5 to-white rounded-2xl shadow-lg p-8 border border-golden-dark/10">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Ready for Investment</h2>
                            <p className="text-gray-700 mb-8">The Ministry has identified several targets with mature data packages ready for private-public partnerships or independent power producing (IPP) agreements.</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
                                {[
                                    "Stable Policy Framework",
                                    "Defined PPA Structures",
                                    "De-risked Pre-exploration Data",
                                    "Guaranteed Grid Integration"
                                ].map((item, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <CheckCircle className="text-green-500 w-5 h-5 flex-shrink-0" />
                                        <span className="font-medium text-gray-800">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer Section */}
                <div className="mt-16 text-center border-t border-gray-100 pt-12">
                    <p className="text-gray-500 text-sm italic">For detailed reservoir data and exploration permits, please visit the Licensing Section.</p>
                </div>
            </div>
        </div>
    );
};

export default GeothermalResourcesPage;
