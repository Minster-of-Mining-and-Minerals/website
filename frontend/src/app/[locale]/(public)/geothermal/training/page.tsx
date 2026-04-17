"use client";
import React from "react";
import { GraduationCap, Users, BookOpen, Presentation, Calendar, Award, Globe, Microscope, Briefcase, CheckCircle } from "lucide-react";

/**
 * Training & Capacity Building Page
 * Details the educational and professional development programs for the geothermal sector.
 */
const GeothermalTrainingPage = () => {
    const programs = [
        {
            title: "Geothermal Exploration & Development",
            weeks: "6 Months",
            type: "Advanced Diploma",
            desc: "Comprehensive course covering geology, geochemistry, and geophysics specific to Rift geothermal systems.",
            icon: Microscope,
            bg: "bg-blue-50"
        },
        {
            title: "Drilling Engineering for Geothermal Wells",
            weeks: "12 Weeks",
            type: "Technical Certification",
            desc: "Focuses on high-temperature drilling challenges, cementing, and well completion techniques.",
            icon: Briefcase,
            bg: "bg-amber-50"
        },
        {
            title: "Environmental & Social Risk Management",
            weeks: "4 Weeks",
            type: "Professional Seminar",
            desc: "Training on international standards for E&S compliance in large-scale energy projects.",
            icon: Globe,
            bg: "bg-emerald-50"
        },
        {
            title: "Reservoir Engineering & Simulation",
            weeks: "8 Weeks",
            type: "Specialized Training",
            desc: "Advanced modeling using TOUGH2 and other industry-standard software for resource management.",
            icon: Presentation,
            bg: "bg-purple-50"
        }
    ];

    return (
        <div className="bg-white min-h-screen">
            <div className="max-w-7xl mx-auto px-6 py-12">
                
                {/* Hero Section */}
                <div className="bg-neutral-900 rounded-[3rem] p-8 md:p-16 text-white mb-20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/2 h-full opacity-20 pointer-events-none">
                        <svg viewBox="0 0 400 400" className="w-full h-full text-golden-dark fill-current">
                            <path d="M0,200 Q100,0 200,200 T400,200" fill="none" stroke="currentColor" strokeWidth="2" />
                            <circle cx="200" cy="200" r="100" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="5,5" />
                        </svg>
                    </div>

                    <div className="relative z-10 max-w-2xl">
                        <div className="flex items-center gap-3 mb-6 text-golden-dark">
                            <GraduationCap className="w-10 h-10" />
                            <span className="font-bold tracking-widest uppercase text-sm">Empowering Local Expertise</span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">Training & <span className="text-golden-dark">Capacity Building</span></h1>
                        <p className="text-neutral-400 text-lg leading-relaxed mb-8">
                            Our mission is to build a world-class domestic workforce capable of leading Ethiopia's geothermal energy transition. 
                            We collaborate with international institutions to provide cutting-edge training.
                        </p>
                        <div className="flex gap-4">
                            <button className="bg-golden-dark text-white px-8 py-3 rounded-2xl font-bold hover:bg-golden transition-all shadow-lg shadow-golden-dark/20">
                                View 2024 Schedule
                            </button>
                            <button className="bg-white/10 text-white border border-white/20 px-8 py-3 rounded-2xl font-bold hover:bg-white/20 transition-all backdrop-blur-sm">
                                Register Interest
                            </button>
                        </div>
                    </div>
                </div>

                {/* Key Pillars */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4 font-serif italic">Our Core Training Pillars</h2>
                    <div className="w-24 h-1 bg-golden-dark mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
                    {programs.map((prog, index) => (
                        <div key={index} className="flex flex-col h-full bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all hover:-translate-y-1">
                            <div className={`p-4 ${prog.bg} rounded-2xl w-fit mb-6`}>
                                <prog.icon className="w-6 h-6 text-gray-700" />
                            </div>
                            <div className="flex-1">
                                <div className="flex justify-between items-start mb-3">
                                    <h3 className="font-bold text-gray-900 text-lg leading-tight">{prog.title}</h3>
                                    <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-1 rounded-md font-bold uppercase whitespace-nowrap ml-2">
                                        {prog.weeks}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-500 mb-4">{prog.desc}</p>
                            </div>
                            <div className="pt-4 border-t border-gray-50 mt-4">
                                <span className="text-xs font-bold text-golden-dark tracking-wide uppercase italic">{prog.type}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Highlights Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20">
                    <div className="lg:col-span-12">
                        <div className="bg-gray-50 p-8 md:p-12 rounded-[3rem] border border-gray-100">
                             <div className="flex flex-col md:flex-row gap-12">
                                <div className="md:w-1/2">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                        <Award className="text-golden-dark" />
                                        Certified Excellence
                                    </h3>
                                    <p className="text-gray-600 mb-8">
                                        Participants who complete our long-term programs receive certification recognized by the Ministry of Mines and Petroleum and our international partners.
                                    </p>
                                    <div className="space-y-4">
                                        {[
                                            "Internship opportunities with IPPs (Independent Power Producers)",
                                            "Access to specialized geothermal software licenses",
                                            "Practical field exploration experience",
                                            "Alumni network & career support"
                                        ].map((item, i) => (
                                            <div key={i} className="flex items-start gap-3">
                                                <CheckCircle className="w-5 h-5 text-golden-dark flex-shrink-0 mt-0.5" />
                                                <span className="text-sm text-gray-700 font-medium">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="md:w-1/2 space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="bg-white p-6 rounded-3xl border border-gray-100 flex flex-col items-center text-center shadow-sm">
                                            <p className="text-4xl font-bold text-gray-900 mb-1 font-serif">500+</p>
                                            <p className="text-xs text-gray-400 font-bold uppercase">Professionals Trained</p>
                                        </div>
                                        <div className="bg-white p-6 rounded-3xl border border-gray-100 flex flex-col items-center text-center shadow-sm">
                                            <p className="text-4xl font-bold text-gray-900 mb-1 font-serif">15</p>
                                            <p className="text-xs text-gray-400 font-bold uppercase">Partner Institutions</p>
                                        </div>
                                        <div className="bg-white p-6 rounded-3xl border border-gray-100 flex flex-col items-center text-center shadow-sm">
                                            <p className="text-4xl font-bold text-gray-900 mb-1 font-serif">20</p>
                                            <p className="text-xs text-gray-400 font-bold uppercase">Field Projects</p>
                                        </div>
                                        <div className="bg-white p-6 rounded-3xl border border-gray-100 flex flex-col items-center text-center shadow-sm">
                                            <p className="text-4xl font-bold text-gray-900 mb-1 font-serif">85%</p>
                                            <p className="text-xs text-gray-400 font-bold uppercase">Employment Rate</p>
                                        </div>
                                    </div>
                                    <div className="bg-golden-dark text-white p-6 rounded-3xl shadow-lg mt-4">
                                        <div className="flex items-center gap-3 mb-2">
                                            <Calendar className="w-5 h-5" />
                                            <h4 className="font-bold">Next Open Enrollment</h4>
                                        </div>
                                        <p className="text-sm text-golden-bg/80">Batch 12: August 15th, 2024</p>
                                        <p className="text-xs mt-2 opacity-60">*Applications close July 20th</p>
                                    </div>
                                </div>
                             </div>
                        </div>
                    </div>
                </div>

                {/* International Partners */}
                <div className="text-center">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-8">Our Academic & Strategic Partners</p>
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-40 grayscale group-hover:grayscale-0 transition-all">
                        <div className="font-bold text-2xl text-gray-400">UNU-GTP</div>
                        <div className="font-bold text-2xl text-gray-400">JICA</div>
                        <div className="font-bold text-2xl text-gray-400">USAID</div>
                        <div className="font-bold text-2xl text-gray-400">AU-GRMF</div>
                        <div className="font-bold text-2xl text-gray-400">World Bank</div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default GeothermalTrainingPage;
