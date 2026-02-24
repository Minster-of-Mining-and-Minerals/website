"use client";

import React from 'react';
import PageHeader from '@/components/pages/home-page-components/PageHeader';
import {
    Gem,
    TrendingUp,
    Settings2,
    Factory,
    Briefcase,
    Globe2,
    Leaf,
    Globe,
    ExternalLink
} from 'lucide-react';

const InvestigatingInEthiopiaPage = () => {
    const visionItems = [
        { icon: TrendingUp, text: "Increase investment in the sector" },
        { icon: Settings2, text: "Build the organizational and technical capacity of our institutions" },
        { icon: Factory, text: "Enable value addition and facilitate the industrialization of Ethiopia’s economy" },
        { icon: Briefcase, text: "Create opportunities for quality direct and indirect jobs in the sector" },
        { icon: Gem, text: "Improve internal revenue and increase foreign exchange earnings" },
    ];

    const partnerships = [
        {
            title: "Global: UN SDGs",
            image: "https://nomadsinn.com/momp/wp-content/uploads/2020/01/Picture1.png",
            description: "Supporting the United Nations Sustainable Development Goals (SDGs)."
        },
        {
            title: "Continental: AU Agenda 2063",
            image: "https://nomadsinn.com/momp/wp-content/uploads/2020/01/Picture3.png",
            description: "Building 'The Africa We Want', CTFA, and the Africa Mining Vision."
        },
        {
            title: "Regional: IGAD & COMESA",
            image: "https://nomadsinn.com/momp/wp-content/uploads/2020/01/Picture4.png",
            description: "Member of the Intergovernmental Authority on Development and COMESA."
        }
    ];

    return (
        <main className="min-h-screen bg-white pb-20">
            <PageHeader
                title="Investing in Ethiopia"
                icon={<Briefcase />}
                description="Your gateway to sustainable mining and petroleum opportunities"
            />

            {/* About Section */}
            <section className="py-20 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        <div className="space-y-8">
                            <div>
                                <h2 className="text-3xl font-bold text-teal-900 mb-6 relative inline-block">
                                    About Ministry of Mines (MOM)
                                    <span className="absolute -bottom-2 left-0 w-20 h-1 bg-golden-dark rounded-full"></span>
                                </h2>
                                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                    The Ministry of Mines and Petroleum was reestablished by the Proclamation 1097/2018 as a regulatory organ of the Mines and Petroleum Sector of the country including the granting of exploration and Mining licenses.
                                </p>
                                <p className="text-gray-600 text-lg leading-relaxed">
                                    As one of the priority sectors for the homegrown economic reform agenda of the country, the ministry is encouraging private sector investment, streamlining bureaucratic and regulatory procedures, and introducing a digital mining cadaster system.
                                </p>
                            </div>

                            <div className="bg-golden-dark/5 p-8 rounded-3xl border border-golden-dark/10">
                                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <Gem className="text-golden-dark" />
                                    Strategic Minerals
                                </h3>
                                <p className="text-gray-600 mb-4 italic">
                                    Promoting strategic minerals such as gold, gemstones, tantalum, lithium, potash, iron ore, and industrial minerals.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {["Gold", "Opal", "Emerald", "Sapphire", "Tantalum", "Lithium", "Potash", "Iron Ore", "Petroleum"].map((tag) => (
                                        <span key={tag} className="bg-white px-4 py-2 rounded-full text-sm font-medium text-gray-700 shadow-sm border border-gray-100">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="p-8 bg-gray-50 rounded-3xl border border-gray-100 hover:shadow-md transition-shadow">
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Autonomous Institutions</h3>
                                <div className="space-y-6">
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center shrink-0">
                                            <Globe2 className="text-golden-dark" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900">GSE</h4>
                                            <p className="text-sm text-gray-600">Geological Survey of Ethiopia focusing on strengthening the generation and dissemination of geoscience data, drilling and laboratory analysis.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4">
                                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center justify-center shrink-0">
                                            <Factory className="text-golden-dark" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900">EMPBC</h4>
                                            <p className="text-sm text-gray-600">The Ethiopian Mineral, Petroleum and Biofuel Corporations (EMPBC) engaged in the commercial activity of mining, petroleum and bio-fuel sectors.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 bg-[#073954] text-white rounded-3xl shadow-lg">
                                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                    <Leaf className="text-golden-light" />
                                    Sustainability First
                                </h3>
                                <p className="text-white/80 leading-relaxed">
                                    Facilitating the positive co-existence of mining operations and agricultural production is a top priority for the Government of Ethiopia. We are working diligently by building global partnerships.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* Partnerships Section */}
            <section className="py-24 px-6 overflow-hidden bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
                            <Globe className="text-golden-dark" />
                            Global & Continental Ambitions
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
                            The Ministry's work is firmly guided by international, continental and national ambitions for building 'The Africa We Want'.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {partnerships.map((partner, index) => (
                            <div key={index} className="flex flex-col items-center text-center p-10 bg-gray-50 rounded-3xl hover:bg-white hover:shadow-2xl transition-all border border-transparent hover:border-gray-100 group">
                                <div className="relative w-full aspect-[16/9] mb-8 overflow-hidden rounded-2xl bg-white shadow-inner flex items-center justify-center p-6 border border-gray-50">
                                    <img
                                        src={partner.image}
                                        alt={partner.title}
                                        className="h-full w-auto object-contain transition-all duration-500 scale-90 group-hover:scale-110"
                                    />
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{partner.title}</h3>
                                <p className="text-gray-600 leading-relaxed text-sm">{partner.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="mx-6">
                <div className="max-w-7xl mx-auto p-12 bg-[#073954] rounded-[3rem] shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-golden-dark/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-700"></div>
                    <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="text-white text-center md:text-left">
                            <h2 className="text-3xl font-bold mb-2">Empowering Sustainable Growth</h2>
                            <p className="text-white/70 text-lg max-w-xl">Join us in transforming Ethiopia into a priority destination for global mining and petroleum investors.</p>
                        </div>
                        <button className="bg-golden-dark text-white px-10 py-5 rounded-full font-bold hover:bg-golden-darkHover transition-all shadow-[0_10px_40px_-10px_rgba(191,153,69,0.5)] whitespace-nowrap">
                            Partner With Us
                        </button>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default InvestigatingInEthiopiaPage;