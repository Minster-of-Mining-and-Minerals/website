"use client";
import React from "react";
import { Droplets, Waves, Activity, MapPin, Wind, Thermometer, Database, CheckCircle2 } from "lucide-react";

const HydrogeologyPage = () => {
    return (
        <div className="min-h-screen bg-white">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="flex flex-col md:flex-row gap-12 items-center mb-16">
                    <div className="md:w-1/2">
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 font-serif">
                            Hydrogeology & <span className="text-blue-600">Thermal Springs</span>
                        </h1>
                        <p className="text-lg text-gray-600 leading-relaxed mb-8">
                            Ethiopia is rich in thermal manifestations across the Main Ethiopian Rift. 
                            Understanding the interaction between groundwater systems and subsurface heat is 
                            crucial for both geothermal exploration and sustainable water management.
                        </p>
                        <div className="space-y-4">
                            {[
                                "Isotopic analysis of geothermal fluids",
                                "Thermal spring temperature monitoring",
                                "Recharge area identification",
                                "Subsurface fluid flow modeling"
                            ].map((text, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <CheckCircle2 className="w-5 h-5 text-blue-500" />
                                    <span className="text-gray-700 font-medium">{text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="md:w-1/2">
                        <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
                            <img 
                                src="/home-2.jpg" 
                                alt="Thermal Springs" 
                                className="w-full h-[400px] object-cover group-hover:scale-110 transition-transform duration-700" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/40 to-transparent" />
                            <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/90 backdrop-blur rounded-2xl shadow-lg">
                                <p className="text-sm font-bold text-blue-700 uppercase tracking-widest mb-1">Observation Focus</p>
                                <p className="text-gray-800 text-sm italic">"Mapping high-temperature springs helps delineate boiling zones within the Rift's convective systems."</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                    {[
                        { icon: Thermometer, title: "Heat Discharge", desc: "Estimating total thermal energy lost through surface springs.", color: "text-red-500", bg: "bg-red-50" },
                        { icon: Waves, title: "Fluid Salinity", desc: "Chemical signatures indicate the depth and origin of geothermal water.", color: "text-blue-500", bg: "bg-blue-50" },
                        { icon: MapPin, title: "Spring Mapping", desc: "DGPS located catalogue of over 700 thermal sites in Ethiopia.", color: "text-green-500", bg: "bg-green-50" },
                        { icon: Wind, title: "Fumarole Analysis", desc: "Measuring steam and gas output for non-condensable gas assessment.", color: "text-amber-500", bg: "bg-amber-50" },
                    ].map((card, i) => (
                        <div key={i} className="p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className={`p-3 rounded-xl ${card.bg} ${card.color} w-fit mb-4`}>
                                <card.icon className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">{card.title}</h3>
                            <p className="text-sm text-gray-500">{card.desc}</p>
                        </div>
                    ))}
                </div>

                <div className="bg-blue-600 rounded-3xl p-8 md:p-12 text-white flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="max-w-xl">
                        <h2 className="text-3xl font-bold mb-4 italic">Hydrogeological Atlas</h2>
                        <p className="text-blue-100 mb-6">Explore our latest publication on the thermal waters of Ethiopia, featuring chemical analyses and spatial distribution of major geothermal systems.</p>
                        <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:bg-blue-50 transition-all flex items-center gap-2">
                             <Database className="w-5 h-5" />
                             Download Atlas (PDF)
                        </button>
                    </div>
                    <div className="bg-blue-500/30 p-8 rounded-2xl backdrop-blur-sm border border-white/20">
                        <div className="text-center">
                            <Thermometer className="w-12 h-12 mx-auto mb-4 text-white" />
                            <p className="text-4xl font-bold mb-1">98°C</p>
                            <p className="text-sm font-medium text-blue-100">Max Spring Temp Recorded</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HydrogeologyPage;
