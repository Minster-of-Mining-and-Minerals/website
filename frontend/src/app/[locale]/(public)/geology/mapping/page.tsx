"use client";
import React, { useState } from "react";
import { Map, Layers, Compass, Drill, Filter, Globe, Shield, Droplets, Building, Mountain, Satellite, Database, Target, BarChart3, Download, Eye, ChevronDown } from "lucide-react";

const GeologicalMappingPage = () => {
    const [activeTab, setActiveTab] = useState("overview");

    const tabs = [
        { id: "overview", label: "Overview", icon: Globe },
        { id: "importance", label: "Importance", icon: Target },
        { id: "types", label: "Map Types", icon: Layers },
        { id: "data", label: "Data Collection", icon: Database },
        { id: "applications", label: "Applications", icon: BarChart3 },
    ];

    const mapTypes = [
        {
            title: "Regional Geological Maps",
            scale: "1:250,000",
            description: "Broad-scale maps covering large areas, showing rock types, structures, and major geological features.",
            color: "bg-blue-100 text-blue-700",
            icon: Map,
        },
        {
            title: "Detailed Geological Maps",
            scale: "1:50,000",
            description: "High-resolution maps for specific areas, used in mineral exploration and infrastructure planning.",
            color: "bg-green-100 text-green-700",
            icon: Compass,
        },
        {
            title: "Geohazard Maps",
            scale: "Various Scales",
            description: "Identify areas prone to earthquakes, landslides, and other geological hazards.",
            color: "bg-red-100 text-red-700",
            icon: Shield,
        },
        {
            title: "Mineral Resource Maps",
            scale: "1:100,000",
            description: "Show distribution of mineral deposits and potential mining areas across Ethiopia.",
            color: "bg-amber-100 text-amber-700",
            icon: Mountain,
        },
        {
            title: "Hydrogeological Maps",
            scale: "1:250,000",
            description: "Illustrate groundwater resources, aquifers, and water-bearing formations.",
            color: "bg-cyan-100 text-cyan-700",
            icon: Droplets,
        },
        {
            title: "Engineering Geological Maps",
            scale: "1:25,000",
            description: "Essential for construction projects, showing soil properties and rock strength.",
            color: "bg-purple-100 text-purple-700",
            icon: Building,
        },
    ];

    const dataCollectionMethods = [
        {
            method: "Field Surveys",
            description: "Geologists conduct ground-based observations, sample collection, and measurements.",
            icon: Compass,
            color: "bg-emerald-50 border-emerald-200",
        },
        {
            method: "Remote Sensing",
            description: "Satellite imagery and aerial photography to identify geological features from above.",
            icon: Satellite,
            color: "bg-blue-50 border-blue-200",
        },
        {
            method: "Geophysical Surveys",
            description: "Using magnetic, gravity, and seismic methods to study subsurface structures.",
            icon: Filter,
            color: "bg-purple-50 border-purple-200",
        },
        {
            method: "Drilling & Sampling",
            description: "Core drilling to obtain rock samples from various depths for laboratory analysis.",
            icon: Drill,
            color: "bg-amber-50 border-amber-200",
        },
    ];

    const applications = [
        {
            sector: "Mining & Mineral Exploration",
            description: "Identify mineral deposits, plan exploration activities, and assess resource potential.",
            examples: ["Gold exploration", "Gemstone mapping", "Industrial minerals assessment"],
            icon: Mountain,
            color: "from-amber-100 to-amber-50",
        },
        {
            sector: "Infrastructure Development",
            description: "Site selection for roads, dams, bridges, and urban development projects.",
            examples: ["Road construction", "Dam site evaluation", "Building foundation studies"],
            icon: Building,
            color: "from-blue-100 to-blue-50",
        },
        {
            sector: "Water Resource Management",
            description: "Identify groundwater sources and manage water resources sustainably.",
            examples: ["Well siting", "Aquifer mapping", "Water supply planning"],
            icon: Droplets,
            color: "from-cyan-100 to-cyan-50",
        },
        {
            sector: "Environmental Management",
            description: "Assess environmental impacts and identify geological hazards.",
            examples: ["Landslide risk assessment", "Soil erosion studies", "Contamination mapping"],
            icon: Shield,
            color: "from-emerald-100 to-emerald-50",
        },
        {
            sector: "Agriculture & Land Use",
            description: "Soil characterization and land capability assessment for agricultural planning.",
            examples: ["Soil fertility mapping", "Land use planning", "Irrigation planning"],
            icon: Globe,
            color: "from-green-100 to-green-50",
        },
        {
            sector: "Energy Resources",
            description: "Exploration for geothermal energy and petroleum resources.",
            examples: ["Geothermal site selection", "Oil & gas exploration", "Renewable energy planning"],
            icon: Filter,
            color: "from-orange-100 to-orange-50",
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
                                Geological <span className="text-golden-dark">Mapping</span> in Ethiopia
                            </h1>
                            <p className="text-gray-600 text-lg mb-6 max-w-3xl">
                                Comprehensive geological mapping is fundamental to understanding Ethiopia&apos;s
                                subsurface resources, supporting sustainable development and economic growth.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <button className="px-6 py-3 bg-golden-dark text-white rounded-lg hover:bg-golden-dark/90 transition-colors font-medium flex items-center gap-2">
                                    <Download className="w-5 h-5" />
                                    Download Maps
                                </button>
                                <button className="px-6 py-3 bg-white text-golden-dark rounded-lg hover:bg-gray-50 transition-colors font-medium border border-golden-dark/30 flex items-center gap-2">
                                    <Eye className="w-5 h-5" />
                                    View Interactive Maps
                                </button>
                            </div>
                        </div>
                        <div className="lg:w-1/3">
                            <div className="bg-gradient-to-br from-teal-50 to-white rounded-2xl shadow-xl p-6 border border-teal-100">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="bg-teal-100 p-3 rounded-xl">
                                        <Map className="w-8 h-8 text-teal-600" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">Quick Facts</h3>
                                        <p className="text-sm text-gray-600">Geological Survey of Ethiopia</p>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                                        <span className="text-gray-600">Maps Produced</span>
                                        <span className="font-bold text-gray-900">500+</span>
                                    </div>
                                    <div className="flex justify-between items-center pb-2 border-b border-gray-100">
                                        <span className="text-gray-600">Coverage</span>
                                        <span className="font-bold text-gray-900">65%</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600">Data Points</span>
                                        <span className="font-bold text-gray-900">1M+</span>
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
                    {/* Overview Section */}
                    {activeTab === "overview" && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                                <div className="flex items-center gap-3 mb-6">
                                    <Globe className="w-8 h-8 text-golden-dark" />
                                    <h2 className="text-2xl font-bold text-gray-900">What is Geological Mapping?</h2>
                                </div>
                                <p className="text-gray-700 text-lg leading-relaxed mb-6">
                                    Geological mapping is the systematic process of recording geological information
                                    on a map, including rock types, geological structures, mineral occurrences, and
                                    surface features. It provides a visual representation of the Earth&apos;s subsurface
                                    composition and history.
                                </p>
                                <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-6 border border-blue-100">
                                    <h3 className="font-bold text-gray-800 mb-3">Key Objectives</h3>
                                    <ul className="space-y-2">
                                        <li className="flex items-start gap-2">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                            <span>Document Ethiopia&apos;s geological heritage</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                            <span>Identify mineral and energy resources</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                            <span>Support infrastructure planning and development</span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                                            <span>Assess geological hazards and risks</span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="space-y-6">
                                <div className="bg-gradient-to-br from-amber-50 to-white rounded-2xl shadow-lg p-6 border border-amber-100">
                                    <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                        <Target className="w-6 h-6 text-amber-600" />
                                        Ethiopia&apos;s Geological Context
                                    </h3>
                                    <p className="text-gray-700 mb-4">
                                        Ethiopia possesses diverse geology ranging from ancient Precambrian rocks
                                        to recent volcanic formations, including the East African Rift System,
                                        making geological mapping particularly important for resource discovery
                                        and hazard assessment.
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        <span className="px-3 py-1 bg-amber-100 text-amber-700 text-sm rounded-full">
                                            East African Rift
                                        </span>
                                        <span className="px-3 py-1 bg-amber-100 text-amber-700 text-sm rounded-full">
                                            Volcanic Formations
                                        </span>
                                        <span className="px-3 py-1 bg-amber-100 text-amber-700 text-sm rounded-full">
                                            Mineral Belts
                                        </span>
                                    </div>
                                </div>
                                <div className="bg-gradient-to-br from-emerald-50 to-white rounded-2xl shadow-lg p-6 border border-emerald-100">
                                    <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                                        <Database className="w-6 h-6 text-emerald-600" />
                                        Mapping Progress
                                    </h3>
                                    <div className="space-y-4">
                                        <div>
                                            <div className="flex justify-between mb-1">
                                                <span className="text-sm text-gray-600">Regional Mapping Coverage</span>
                                                <span className="text-sm font-medium text-emerald-700">65%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div className="bg-emerald-600 h-2 rounded-full" style={{ width: "65%" }}></div>
                                            </div>
                                        </div>
                                        <div>
                                            <div className="flex justify-between mb-1">
                                                <span className="text-sm text-gray-600">Detailed Mapping Coverage</span>
                                                <span className="text-sm font-medium text-emerald-700">35%</span>
                                            </div>
                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                <div className="bg-emerald-600 h-2 rounded-full" style={{ width: "35%" }}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Importance Section */}
                    {activeTab === "importance" && (
                        <div className="space-y-8">
                            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                                    <Target className="w-8 h-8 text-golden-dark" />
                                    Importance of Geological Mapping in Ethiopia
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {[
                                        {
                                            title: "Economic Development",
                                            description: "Identifies mineral resources that can drive industrialization and create employment opportunities.",
                                            stats: "Potential for $10B+ in mineral exports"
                                        },
                                        {
                                            title: "Infrastructure Planning",
                                            description: "Essential for safe and cost-effective construction of roads, dams, and urban infrastructure.",
                                            stats: "Reduces construction costs by 20-30%"
                                        },
                                        {
                                            title: "Water Security",
                                            description: "Maps groundwater resources crucial for agriculture and domestic water supply.",
                                            stats: "Supports 80% of rural water supply"
                                        },
                                        {
                                            title: "Hazard Mitigation",
                                            description: "Identifies earthquake, landslide, and volcanic hazard zones for risk management.",
                                            stats: "Protects 5M+ people in hazard zones"
                                        },
                                    ].map((item, index) => (
                                        <div key={index} className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-6 border border-gray-200">
                                            <h3 className="font-bold text-gray-800 mb-3">{item.title}</h3>
                                            <p className="text-gray-700 text-sm mb-4">{item.description}</p>
                                            <div className="text-sm font-medium text-golden-dark bg-golden-dark/10 px-3 py-1 rounded-full inline-block">
                                                {item.stats}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Map Types Section */}
                    {activeTab === "types" && (
                        <div className="space-y-8">
                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-3">Types of Geological Maps Produced</h2>
                                <p className="text-gray-600">Specialized maps for different applications and scales</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {mapTypes.map((type, index) => {
                                    const Icon = type.icon;
                                    return (
                                        <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow">
                                            <div className={`${type.color} p-4 flex items-center gap-3`}>
                                                <Icon className="w-6 h-6" />
                                                <div>
                                                    <h3 className="font-bold">{type.title}</h3>
                                                    <p className="text-sm opacity-90">Scale: {type.scale}</p>
                                                </div>
                                            </div>
                                            <div className="p-5">
                                                <p className="text-gray-700 mb-4">{type.description}</p>
                                                <button className="text-sm text-golden-dark hover:text-golden-dark/80 font-medium flex items-center gap-1">
                                                    View Sample
                                                    <ChevronDown className="w-4 h-4 rotate-270" />
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {/* Data Collection Section */}
                    {activeTab === "data" && (
                        <div className="space-y-8">
                            <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-200">
                                <h2 className="text-2xl font-bold text-gray-900 mb-8">How Geological Data is Collected</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {dataCollectionMethods.map((method, index) => {
                                        const Icon = method.icon;
                                        return (
                                            <div key={index} className={`rounded-xl p-6 border ${method.color}`}>
                                                <div className="flex items-center gap-3 mb-4">
                                                    <div className="p-2 bg-white rounded-lg shadow-sm">
                                                        <Icon className="w-6 h-6 text-gray-700" />
                                                    </div>
                                                    <h3 className="font-bold text-gray-800">{method.method}</h3>
                                                </div>
                                                <p className="text-gray-700 text-sm">{method.description}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                                <div className="mt-8 bg-gradient-to-r from-gray-50 to-teal-50 rounded-xl p-6 border border-gray-200">
                                    <h3 className="font-bold text-gray-800 mb-4">Technology Integration</h3>
                                    <div className="flex flex-wrap gap-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                                            <span className="text-sm text-gray-700">GIS Technology</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                                            <span className="text-sm text-gray-700">Remote Sensing</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                                            <span className="text-sm text-gray-700">GPS Mapping</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                                            <span className="text-sm text-gray-700">Digital Databases</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Applications Section */}
                    {activeTab === "applications" && (
                        <div className="space-y-8">
                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-bold text-gray-900 mb-3">Applications of Geological Mapping</h2>
                                <p className="text-gray-600">How geological data supports various sectors in Ethiopia</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {applications.map((app, index) => {
                                    const Icon = app.icon;
                                    return (
                                        <div key={index} className={`bg-gradient-to-br ${app.color} to-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all hover:-translate-y-1`}>
                                            <div className="p-6">
                                                <div className="flex items-center gap-3 mb-4">
                                                    <div className="p-2 bg-white rounded-lg shadow-sm">
                                                        <Icon className="w-6 h-6 text-gray-700" />
                                                    </div>
                                                    <h3 className="font-bold text-gray-800">{app.sector}</h3>
                                                </div>
                                                <p className="text-gray-700 mb-4 text-sm">{app.description}</p>
                                                <div className="space-y-2">
                                                    <h4 className="font-medium text-gray-800 text-sm">Examples:</h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {app.examples.map((example, idx) => (
                                                            <span key={idx} className="px-3 py-1 bg-white/50 text-gray-700 text-xs rounded-full">
                                                                {example}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}
                </div>

                {/* CTA Section */}
                <div className="mt-16 bg-gradient-to-r from-golden-dark/10 to-teal-50 rounded-2xl p-8 text-center border border-golden-dark/20">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">Access Geological Data</h3>
                    <p className="text-gray-600 max-w-2xl mx-auto mb-6">
                        Explore Ethiopia&apos;s geological resources through our comprehensive mapping services.
                        Contact us for custom mapping solutions or access our public datasets.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <button className="px-6 py-3 bg-golden-dark text-white rounded-lg hover:bg-golden-dark/90 transition-colors font-medium shadow-md">
                            Request Mapping Services
                        </button>
                        <button className="px-6 py-3 bg-white text-golden-dark rounded-lg hover:bg-gray-50 transition-colors font-medium border border-golden-dark/30 shadow-sm">
                            Browse Public Data
                        </button>
                        <button className="px-6 py-3 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium border border-gray-300 shadow-sm">
                            Contact Geological Experts
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GeologicalMappingPage;